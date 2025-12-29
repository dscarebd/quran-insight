import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Allow both GET and POST for easier testing
    let type = "verses";
    if (req.method === "POST") {
      try {
        const body = await req.json();
        type = body.type || "verses";
      } catch {
        // Default to verses
      }
    } else {
      const url = new URL(req.url);
      type = url.searchParams.get("type") || "verses";
    }
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (type === "verses") {
      // Fetch all verses
      const allVerses: any[] = [];
      let offset = 0;
      const batchSize = 1000;

      while (true) {
        const { data, error } = await supabase
          .from("verses")
          .select("surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english")
          .order("surah_number", { ascending: true })
          .order("verse_number", { ascending: true })
          .range(offset, offset + batchSize - 1);

        if (error) throw error;
        if (!data || data.length === 0) break;

        allVerses.push(...data);
        offset += batchSize;

        if (data.length < batchSize) break;
      }

      // Format for TypeScript
      const formatted = allVerses.map(v => ({
        surahNumber: v.surah_number,
        verseNumber: v.verse_number,
        arabic: v.arabic,
        bengali: v.bengali,
        english: v.english,
        tafsirBengali: v.tafsir_bengali || undefined,
        tafsirEnglish: v.tafsir_english || undefined,
      }));

      return new Response(JSON.stringify(formatted), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "hadiths") {
      // Fetch all hadiths
      const allHadiths: any[] = [];
      let offset = 0;
      const batchSize = 1000;

      while (true) {
        const { data, error } = await supabase
          .from("hadiths")
          .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
          .order("book_slug", { ascending: true })
          .order("hadith_number", { ascending: true })
          .range(offset, offset + batchSize - 1);

        if (error) throw error;
        if (!data || data.length === 0) break;

        allHadiths.push(...data);
        offset += batchSize;

        if (data.length < batchSize) break;
      }

      return new Response(JSON.stringify(allHadiths), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid type. Use 'verses' or 'hadiths'" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Export error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
