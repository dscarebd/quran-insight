import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

declare const EdgeRuntime: {
  waitUntil: (promise: Promise<unknown>) => void;
};

// Book mappings for fawazahmed0/hadith-api
// API: https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/
const BOOK_MAPPINGS: Record<string, { 
  apiName: string; 
  displayName: string;
  hasBengali: boolean;
}> = {
  bukhari: { apiName: "bukhari", displayName: "Sahih al-Bukhari", hasBengali: true },
  muslim: { apiName: "muslim", displayName: "Sahih Muslim", hasBengali: true },
  abudawud: { apiName: "abudawud", displayName: "Sunan Abu Dawud", hasBengali: true },
  tirmidhi: { apiName: "tirmidhi", displayName: "Jami at-Tirmidhi", hasBengali: true },
  nasai: { apiName: "nasai", displayName: "Sunan an-Nasa'i", hasBengali: true },
  ibnmajah: { apiName: "ibnmajah", displayName: "Sunan Ibn Majah", hasBengali: true },
  malik: { apiName: "malik", displayName: "Muwatta Malik", hasBengali: true },
  nawawi: { apiName: "nawawi40", displayName: "Forty Hadith Nawawi", hasBengali: true },
  qudsi: { apiName: "qudsi40", displayName: "Forty Hadith Qudsi", hasBengali: false },
  dehlawi: { apiName: "dehlawi", displayName: "Forty Hadith Shah Waliullah Dehlawi", hasBengali: false },
};

interface HadithData {
  hadiths: Array<{
    hadithnumber: number;
    text: string;
    grades?: Array<{ name: string; grade: string }>;
  }>;
}

async function fetchBookData(bookApiName: string, language: string): Promise<HadithData | null> {
  const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";
  const langPrefix = language === "arabic" ? "ara" : language === "english" ? "eng" : "ben";
  const url = `${baseUrl}/${langPrefix}-${bookApiName}.json`;
  
  console.log(`Fetching ${language} data from: ${url}`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`No ${language} data found for ${bookApiName}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${language} for ${bookApiName}:`, error);
    return null;
  }
}

async function importAllHadiths(
  bookSlug: string,
  supabaseUrl: string,
  supabaseKey: string
) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const bookConfig = BOOK_MAPPINGS[bookSlug];
  
  if (!bookConfig) {
    console.error(`Unknown book slug: ${bookSlug}`);
    return;
  }

  console.log(`Starting full import for ${bookSlug} (${bookConfig.displayName})`);

  try {
    // Fetch all languages in parallel
    const [arabicData, englishData, bengaliData] = await Promise.all([
      fetchBookData(bookConfig.apiName, "arabic"),
      fetchBookData(bookConfig.apiName, "english"),
      bookConfig.hasBengali ? fetchBookData(bookConfig.apiName, "bengali") : Promise.resolve(null),
    ]);

    if (!arabicData && !englishData) {
      console.error(`No data found for ${bookSlug}`);
      return;
    }

    // Use Arabic as the primary source, fall back to English
    const primaryData = arabicData || englishData;
    if (!primaryData) {
      console.error(`No primary data for ${bookSlug}`);
      return;
    }

    console.log(`Found ${primaryData.hadiths.length} hadiths for ${bookSlug}`);

    // Create a map of hadiths by number for each language
    const arabicMap = new Map(arabicData?.hadiths.map(h => [h.hadithnumber, h]) || []);
    const englishMap = new Map(englishData?.hadiths.map(h => [h.hadithnumber, h]) || []);
    const bengaliMap = new Map(bengaliData?.hadiths.map(h => [h.hadithnumber, h]) || []);

    // Process in batches of 100
    const batchSize = 100;
    const allHadithNumbers = [...new Set([
      ...(arabicData?.hadiths.map(h => h.hadithnumber) || []),
      ...(englishData?.hadiths.map(h => h.hadithnumber) || []),
    ])].sort((a, b) => a - b);

    console.log(`Processing ${allHadithNumbers.length} unique hadiths`);

    for (let i = 0; i < allHadithNumbers.length; i += batchSize) {
      const batch = allHadithNumbers.slice(i, i + batchSize);
      
      const hadithsToInsert = batch.map(hadithNumber => {
        const arabicHadith = arabicMap.get(hadithNumber);
        const englishHadith = englishMap.get(hadithNumber);
        const bengaliHadith = bengaliMap.get(hadithNumber);

        // Get grade from English data (usually has grades)
        const grade = englishHadith?.grades?.[0]?.grade || null;

        return {
          book_slug: bookSlug,
          hadith_number: hadithNumber,
          arabic: arabicHadith?.text || null,
          english: englishHadith?.text || null,
          bengali: bengaliHadith?.text || null,
          grade: grade,
        };
      });

      const { error } = await supabase
        .from("hadiths")
        .upsert(hadithsToInsert, { 
          onConflict: "book_slug,hadith_number",
          ignoreDuplicates: false 
        });

      if (error) {
        console.error(`Error upserting batch at index ${i}:`, error);
      } else {
        console.log(`Imported batch ${i + 1}-${Math.min(i + batchSize, allHadithNumbers.length)} of ${allHadithNumbers.length}`);
      }
    }

    // Update total count in hadith_books
    const { error: updateError } = await supabase
      .from("hadith_books")
      .update({ total_hadiths: allHadithNumbers.length })
      .eq("slug", bookSlug);

    if (updateError) {
      console.error(`Error updating total count:`, updateError);
    }

    console.log(`✅ Completed import for ${bookSlug}: ${allHadithNumbers.length} hadiths`);
  } catch (error) {
    console.error(`Error in importAllHadiths for ${bookSlug}:`, error);
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookSlug, fullImport } = await req.json();

    if (!bookSlug || !BOOK_MAPPINGS[bookSlug]) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid book slug",
          validSlugs: Object.keys(BOOK_MAPPINGS)
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Always run as full import in background
    if (fullImport !== false) {
      EdgeRuntime.waitUntil(importAllHadiths(bookSlug, supabaseUrl, supabaseKey));
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `Background import started for ${bookSlug}`,
          bookSlug,
          hasBengali: BOOK_MAPPINGS[bookSlug].hasBengali,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For non-background (testing), run synchronously with limited data
    const supabase = createClient(supabaseUrl, supabaseKey);
    const bookConfig = BOOK_MAPPINGS[bookSlug];

    const [arabicData, englishData, bengaliData] = await Promise.all([
      fetchBookData(bookConfig.apiName, "arabic"),
      fetchBookData(bookConfig.apiName, "english"),
      bookConfig.hasBengali ? fetchBookData(bookConfig.apiName, "bengali") : Promise.resolve(null),
    ]);

    // Just insert first 10 for testing
    const testHadiths = (arabicData?.hadiths || englishData?.hadiths || []).slice(0, 10);
    const arabicMap = new Map(arabicData?.hadiths.map(h => [h.hadithnumber, h]) || []);
    const englishMap = new Map(englishData?.hadiths.map(h => [h.hadithnumber, h]) || []);
    const bengaliMap = new Map(bengaliData?.hadiths.map(h => [h.hadithnumber, h]) || []);

    const hadithsToInsert = testHadiths.map(h => ({
      book_slug: bookSlug,
      hadith_number: h.hadithnumber,
      arabic: arabicMap.get(h.hadithnumber)?.text || null,
      english: englishMap.get(h.hadithnumber)?.text || null,
      bengali: bengaliMap.get(h.hadithnumber)?.text || null,
      grade: englishMap.get(h.hadithnumber)?.grades?.[0]?.grade || null,
    }));

    const { error } = await supabase
      .from("hadiths")
      .upsert(hadithsToInsert, { 
        onConflict: "book_slug,hadith_number",
        ignoreDuplicates: false 
      });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        imported: testHadiths.length,
        message: `Test import: ${testHadiths.length} hadiths for ${bookSlug}`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
