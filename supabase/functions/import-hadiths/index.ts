import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Using hadithapi.pages.dev - free, no API key required
const BOOK_MAPPINGS: Record<string, { slug: string; apiName: string; totalHadiths: number }> = {
  bukhari: { slug: "bukhari", apiName: "bukhari", totalHadiths: 7563 },
  muslim: { slug: "muslim", apiName: "muslim", totalHadiths: 3032 },
  abudawud: { slug: "abudawud", apiName: "abudawud", totalHadiths: 3998 },
  tirmidhi: { slug: "tirmidhi", apiName: "tirmidhi", totalHadiths: 3956 },
  nasai: { slug: "nasai", apiName: "nasai", totalHadiths: 5662 },
  ibnmajah: { slug: "ibnmajah", apiName: "ibnmajah", totalHadiths: 4342 },
};

interface HadithApiResponse {
  id: number;
  header: string;
  hadith_english: string;
  hadith_arabic: string;
  book: string;
  chapter_title: string;
  refno: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { bookSlug, startId = 1, batchSize = 100 } = await req.json();

    if (!bookSlug || !BOOK_MAPPINGS[bookSlug]) {
      return new Response(
        JSON.stringify({ error: "Invalid book slug. Valid options: " + Object.keys(BOOK_MAPPINGS).join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const bookMapping = BOOK_MAPPINGS[bookSlug];
    const endId = Math.min(startId + batchSize - 1, bookMapping.totalHadiths);
    
    console.log(`Fetching hadiths from ${bookSlug}, IDs ${startId} to ${endId}`);

    const hadithsToInsert: Array<{
      book_slug: string;
      hadith_number: number;
      arabic: string | null;
      english: string | null;
      bengali: string | null;
      narrator_english: string | null;
      narrator_bengali: string | null;
      grade: string | null;
      grade_bengali: string | null;
      chapter_number: number | null;
      chapter_name_english: string | null;
      chapter_name_bengali: string | null;
    }> = [];

    // Fetch hadiths one by one (API returns single hadith)
    const fetchPromises: Promise<void>[] = [];
    
    for (let id = startId; id <= endId; id++) {
      const promise = (async () => {
        try {
          const apiUrl = `https://hadithapi.pages.dev/api/${bookMapping.apiName}/${id}`;
          const response = await fetch(apiUrl, {
            headers: {
              "Accept": "application/json",
              "User-Agent": "QuranInsight/1.0",
            },
          });

          if (response.ok) {
            const hadith: HadithApiResponse = await response.json();
            
            hadithsToInsert.push({
              book_slug: bookSlug,
              hadith_number: id,
              arabic: hadith.hadith_arabic || null,
              english: hadith.hadith_english || null,
              bengali: null, // API doesn't provide Bengali, we'll add later
              narrator_english: hadith.header || null,
              narrator_bengali: null,
              grade: null,
              grade_bengali: null,
              chapter_number: null,
              chapter_name_english: hadith.chapter_title || null,
              chapter_name_bengali: null,
            });
          }
        } catch (err) {
          console.error(`Error fetching hadith ${id}:`, err);
        }
      })();
      fetchPromises.push(promise);
      
      // Add small delay every 10 requests to avoid rate limiting
      if (fetchPromises.length % 10 === 0) {
        await Promise.all(fetchPromises);
        fetchPromises.length = 0;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // Wait for remaining promises
    await Promise.all(fetchPromises);

    console.log(`Fetched ${hadithsToInsert.length} hadiths`);

    if (hadithsToInsert.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "No hadiths found for this range",
          imported: 0,
          nextStartId: endId + 1,
          hasMore: endId < bookMapping.totalHadiths,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
        startId,
        endId,
        nextStartId: endId + 1,
        hasMore: endId < bookMapping.totalHadiths,
        totalInBook: count,
        expectedTotal: bookMapping.totalHadiths,
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
