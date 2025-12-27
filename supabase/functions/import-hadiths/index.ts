import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HadithBanglaResponse {
  status: number;
  hadiths: Array<{
    id: number;
    book_key: string;
    book_name: string;
    chapter_no: string;
    chapter: string;
    section_no: string;
    section: string;
    hadith_no: string;
    hadith_english: string;
    narrator: string;
    narrator_bengali: string;
    ar: string;
    bn: string;
    note: string;
    grade: string;
    grade_bn: string;
  }>;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const BOOK_MAPPINGS: Record<string, { slug: string; apiKey: string }> = {
  bukhari: { slug: "bukhari", apiKey: "bukhari" },
  muslim: { slug: "muslim", apiKey: "muslim" },
  abudawud: { slug: "abudawud", apiKey: "abudawud" },
  tirmidhi: { slug: "tirmidhi", apiKey: "tirmidhi" },
  nasai: { slug: "nasai", apiKey: "nasai" },
  ibnmajah: { slug: "ibnmajah", apiKey: "ibnmajah" },
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { bookSlug, page = 1, perPage = 100 } = await req.json();

    if (!bookSlug || !BOOK_MAPPINGS[bookSlug]) {
      return new Response(
        JSON.stringify({ error: "Invalid book slug. Valid options: " + Object.keys(BOOK_MAPPINGS).join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const bookMapping = BOOK_MAPPINGS[bookSlug];
    console.log(`Fetching hadiths from ${bookSlug}, page ${page}, perPage ${perPage}`);

    // Fetch from hadithbangla API (has Bengali, Arabic, and English)
    const apiUrl = `https://hadithbangla.com/api/v1/hadith?book=${bookMapping.apiKey}&page=${page}&limit=${perPage}`;
    console.log(`Fetching from: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "QuranInsight/1.0",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: `API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data: HadithBanglaResponse = await response.json();
    console.log(`Received ${data.hadiths?.length || 0} hadiths`);

    if (!data.hadiths || data.hadiths.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "No hadiths found for this page",
          pagination: data.pagination,
          imported: 0
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Transform and prepare hadiths for insertion
    const hadithsToInsert = data.hadiths.map((hadith) => ({
      book_slug: bookSlug,
      hadith_number: parseInt(hadith.hadith_no) || hadith.id,
      arabic: hadith.ar || null,
      english: hadith.hadith_english || null,
      bengali: hadith.bn || null,
      narrator_english: hadith.narrator || null,
      narrator_bengali: hadith.narrator_bengali || null,
      grade: hadith.grade || null,
      grade_bengali: hadith.grade_bn || null,
      chapter_number: hadith.chapter_no ? parseInt(hadith.chapter_no) : null,
      chapter_name_english: hadith.chapter || null,
      chapter_name_bengali: hadith.section || null,
    }));

    // Upsert hadiths (insert or update on conflict)
    const { data: insertedData, error: insertError } = await supabase
      .from("hadiths")
      .upsert(hadithsToInsert, { 
        onConflict: "book_slug,hadith_number",
        ignoreDuplicates: false 
      })
      .select("id");

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update the total count in hadith_books
    const { count } = await supabase
      .from("hadiths")
      .select("id", { count: "exact", head: true })
      .eq("book_slug", bookSlug);

    if (count !== null) {
      await supabase
        .from("hadith_books")
        .update({ total_hadiths: count })
        .eq("slug", bookSlug);
    }

    console.log(`Successfully imported ${insertedData?.length || 0} hadiths`);

    return new Response(
      JSON.stringify({
        success: true,
        imported: insertedData?.length || 0,
        pagination: data.pagination,
        totalInBook: count,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in import-hadiths:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
