import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log("Starting complete verses export...");
    
    // Fetch all verses in batches, ordered by surah_number and verse_number
    const allVerses: any[] = [];
    const batchSize = 1000;
    let offset = 0;
    
    while (true) {
      console.log(`Fetching verses batch at offset ${offset}...`);
      
      const { data, error } = await supabase
        .from("verses")
        .select("id, surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english, created_at, updated_at")
        .order("surah_number", { ascending: true })
        .order("verse_number", { ascending: true })
        .range(offset, offset + batchSize - 1);
      
      if (error) {
        console.error("Database error:", error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log("No more verses to fetch");
        break;
      }
      
      allVerses.push(...data);
      console.log(`Fetched ${data.length} verses, total: ${allVerses.length}`);
      offset += data.length;
      
      if (data.length < batchSize) {
        console.log("Last batch fetched");
        break;
      }
    }
    
    console.log(`Total verses fetched: ${allVerses.length}`);
    
    // Verify verse counts per surah
    const surahCounts = new Map<number, number>();
    allVerses.forEach(v => {
      surahCounts.set(v.surah_number, (surahCounts.get(v.surah_number) || 0) + 1);
    });
    
    console.log("Surah counts verification:");
    console.log(`Surah 1: ${surahCounts.get(1)} verses (expected: 7)`);
    console.log(`Surah 2: ${surahCounts.get(2)} verses (expected: 286)`);
    console.log(`Surah 3: ${surahCounts.get(3)} verses (expected: 200)`);
    console.log(`Total surahs: ${surahCounts.size}`);
    
    // Helper function to escape CSV field
    const escapeField = (value: string | null): string => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      // If field contains semicolon, newline, or quote, wrap in quotes and escape inner quotes
      if (str.includes(';') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };
    
    // Build CSV content with semicolon delimiter
    const header = "id;surah_number;verse_number;arabic;bengali;english;tafsir_bengali;tafsir_english;created_at;updated_at";
    
    const rows = allVerses.map(v => {
      return [
        escapeField(String(v.id)),
        escapeField(String(v.surah_number)),
        escapeField(String(v.verse_number)),
        escapeField(v.arabic),
        escapeField(v.bengali),
        escapeField(v.english),
        escapeField(v.tafsir_bengali),
        escapeField(v.tafsir_english),
        escapeField(v.created_at),
        escapeField(v.updated_at)
      ].join(';');
    });
    
    const csvContent = header + '\n' + rows.join('\n');
    
    console.log(`CSV generated: ${csvContent.length} bytes, ${rows.length} data rows`);
    
    // Return CSV file
    return new Response(csvContent, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="verses-complete.csv"',
      },
    });
    
  } catch (error: unknown) {
    console.error("Export error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: "Failed to export verses"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
