import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse CSV from request body
    const { csvData } = await req.json();
    
    if (!csvData) {
      return new Response(
        JSON.stringify({ error: "No CSV data provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the CSV data
    const lines = csvData.split('\n');
    const header = lines[0].split(';');
    
    // Get existing verses to avoid duplicates
    const { data: existingVerses } = await supabase
      .from('verses')
      .select('surah_number, verse_number');
    
    const existingSet = new Set(
      existingVerses?.map(v => `${v.surah_number}-${v.verse_number}`) || []
    );

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
      
      // Map values to columns
      const surah_number = parseInt(values[1]);
      const verse_number = parseInt(values[2]);
      const arabic = values[3];
      const bengali = values[4];
      const english = values[5];
      const tafsir_bengali = values[6] || null;
      const tafsir_english = values[7] || null;
      
      // Skip if already exists
      if (existingSet.has(`${surah_number}-${verse_number}`)) {
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

    // Insert in batches of 100
    let inserted = 0;
    const batchSize = 100;
    
    for (let i = 0; i < versesToInsert.length; i += batchSize) {
      const batch = versesToInsert.slice(i, i + batchSize);
      const { error } = await supabase.from('verses').insert(batch);
      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
      inserted += batch.length;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Imported ${inserted} new verses`,
        total_in_csv: lines.length - 1,
        already_existed: lines.length - 1 - inserted
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
