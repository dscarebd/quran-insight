import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function verifyAdminRole(supabase: any, authHeader: string): Promise<{ isAdmin: boolean; error?: string }> {
  try {
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return { isAdmin: false, error: 'Invalid or expired token' };
    }

    const { data: hasRole, error: roleError } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError) {
      console.error('Role check error:', roleError);
      return { isAdmin: false, error: 'Failed to verify admin role' };
    }

    return { isAdmin: !!hasRole };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { isAdmin: false, error: 'Authentication failed' };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // Create client with anon key for auth verification
    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    
    // Verify admin role
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { isAdmin, error: authError } = await verifyAdminRole(authClient, authHeader);
    if (!isAdmin) {
      console.log('Admin access denied:', authError);
      return new Response(
        JSON.stringify({ error: authError || "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log('Admin access verified, proceeding with import...');
    
    // Use service role client for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse CSV from request body
    const { csvData } = await req.json();
    
    if (!csvData) {
      return new Response(
        JSON.stringify({ error: "No CSV data provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Starting import process...");

    // Get ALL existing verses using pagination to avoid 1000 row limit
    const existingSet = new Set<string>();
    let page = 0;
    const pageSize = 1000;
    
    while (true) {
      const { data: existingVerses, error: fetchError } = await supabase
        .from('verses')
        .select('surah_number, verse_number')
        .range(page * pageSize, (page + 1) * pageSize - 1);
      
      if (fetchError) {
        console.error('Error fetching existing verses:', fetchError);
        throw new Error(`Failed to fetch existing verses: ${fetchError.message}`);
      }
      
      if (!existingVerses || existingVerses.length === 0) break;
      
      existingVerses.forEach(v => {
        existingSet.add(`${v.surah_number}-${v.verse_number}`);
      });
      
      console.log(`Fetched page ${page + 1}, got ${existingVerses.length} verses, total: ${existingSet.size}`);
      
      if (existingVerses.length < pageSize) break;
      page++;
    }

    console.log(`Total existing verses: ${existingSet.size}`);

    // Parse the CSV data
    const lines = csvData.split('\n');
    console.log(`CSV has ${lines.length} lines`);
    
    const versesToInsert: any[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      // Parse CSV line properly handling quoted strings
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ';' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      // Map values to columns: id;surah_number;verse_number;arabic;bengali;english;tafsir_bengali;tafsir_english
      const surah_number = parseInt(values[1]);
      const verse_number = parseInt(values[2]);
      const arabic = values[3];
      const bengali = values[4];
      const english = values[5];
      const tafsir_bengali = values[6] || null;
      const tafsir_english = values[7] || null;
      
      // Skip if already exists
      const key = `${surah_number}-${verse_number}`;
      if (existingSet.has(key)) {
        continue;
      }
      
      if (surah_number && verse_number && arabic && bengali && english) {
        versesToInsert.push({
          surah_number,
          verse_number,
          arabic,
          bengali,
          english,
          tafsir_bengali,
          tafsir_english,
        });
      }
    }

    console.log(`Verses to insert: ${versesToInsert.length}`);

    // Insert in batches of 50 (smaller batches for reliability)
    let inserted = 0;
    const batchSize = 50;
    
    for (let i = 0; i < versesToInsert.length; i += batchSize) {
      const batch = versesToInsert.slice(i, i + batchSize);
      const { error } = await supabase.from('verses').insert(batch);
      if (error) {
        console.error(`Insert error at batch ${i / batchSize}:`, error);
        throw new Error(`Insert failed: ${error.message}`);
      }
      inserted += batch.length;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}, total inserted: ${inserted}`);
    }

    console.log(`Import complete. Inserted ${inserted} new verses.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Imported ${inserted} new verses`,
        total_in_csv: lines.length - 1,
        already_existed: existingSet.size
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
