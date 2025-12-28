import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

declare const EdgeRuntime: {
  waitUntil: (promise: Promise<unknown>) => void;
};

// Bengali API book mappings (hadithbangla uses different folder names)
const BOOK_MAPPINGS: Record<string, { folder: string; totalHadiths: number }> = {
  bukhari: { folder: "Bukhari", totalHadiths: 7563 },
  muslim: { folder: "Muslim", totalHadiths: 3032 },
  abudawud: { folder: "AbuDaud", totalHadiths: 3998 },
  tirmidhi: { folder: "At-tirmizi", totalHadiths: 3956 },
  nasai: { folder: "Al-Nasai", totalHadiths: 5662 },
  ibnmajah: { folder: "Ibne-Mazah", totalHadiths: 4342 },
};

interface BengaliHadithResponse {
  hadith: {
    hadith_id: number;
    narrator: string;
    bn: string;
    chapter_no?: number;
    chapter_name?: string;
  };
}

async function importBengaliHadiths(bookSlug: string, supabaseUrl: string, supabaseKey: string) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const bookMapping = BOOK_MAPPINGS[bookSlug];
  
  if (!bookMapping) {
    console.error(`[Bengali] Invalid book slug: ${bookSlug}`);
    return;
  }

  console.log(`[Bengali] Starting import for ${bookSlug}, folder: ${bookMapping.folder}`);

  const batchSize = 50;
  let updatedCount = 0;

  for (let startId = 1; startId <= bookMapping.totalHadiths; startId += batchSize) {
    const endId = Math.min(startId + batchSize - 1, bookMapping.totalHadiths);
    const updates: Array<{
      hadith_number: number;
      bengali: string | null;
      narrator_bengali: string | null;
      chapter_name_bengali?: string | null;
      chapter_number?: number | null;
    }> = [];

    // Fetch hadiths in parallel (10 at a time)
    for (let id = startId; id <= endId; id += 10) {
      const promises = [];
      for (let i = id; i < Math.min(id + 10, endId + 1); i++) {
        const apiUrl = `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookMapping.folder}/hadith/${i}.json`;
        promises.push(
          fetch(apiUrl, {
            headers: { "Accept": "application/json", "User-Agent": "QuranInsight/1.0" },
          })
            .then((res) => (res.ok ? res.json() : null))
            .then((data: BengaliHadithResponse | null) => {
              if (data?.hadith) {
                updates.push({
                  hadith_number: data.hadith.hadith_id || i,
                  bengali: data.hadith.bn || null,
                  narrator_bengali: data.hadith.narrator || null,
                  chapter_name_bengali: data.hadith.chapter_name || null,
                  chapter_number: data.hadith.chapter_no ?? null,
                });
              }
            })
            .catch((err) => console.error(`[Bengali] Error fetching hadith ${i}:`, err))
        );
      }
      await Promise.all(promises);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Update hadiths with Bengali translations + Bengali chapter names
    for (const update of updates) {
      const updatePayload: Record<string, unknown> = {
        bengali: update.bengali,
        narrator_bengali: update.narrator_bengali,
      };

      if (update.chapter_name_bengali) {
        updatePayload.chapter_name_bengali = update.chapter_name_bengali;
      }

      // Only set chapter_number if the API provides it (avoid overwriting existing data with null)
      if (typeof update.chapter_number === "number") {
        updatePayload.chapter_number = update.chapter_number;
      }

      const { error } = await supabase
        .from("hadiths")
        .update(updatePayload)
        .eq("book_slug", bookSlug)
        .eq("hadith_number", update.hadith_number);

      if (error) {
        console.error(`[Bengali] Update error for hadith ${update.hadith_number}:`, error);
      } else {
        updatedCount++;
      }
    }

    console.log(`[Bengali] Updated ${bookSlug} hadiths ${startId}-${endId}, total updated: ${updatedCount}`);
  }

  console.log(`[Bengali] Completed import for ${bookSlug}, total updated: ${updatedCount}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const { bookSlug, fullImport = false } = await req.json();

    if (!bookSlug || !BOOK_MAPPINGS[bookSlug]) {
      return new Response(
        JSON.stringify({ error: "Invalid book slug. Valid options: " + Object.keys(BOOK_MAPPINGS).join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (fullImport) {
      console.log(`[Bengali] Starting full background import for ${bookSlug}`);
      EdgeRuntime.waitUntil(importBengaliHadiths(bookSlug, supabaseUrl, supabaseKey));

      return new Response(
        JSON.stringify({
          success: true,
          message: `Started Bengali translation import for ${bookSlug} in background.`,
          backgroundImport: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For non-background mode, do a small batch and return
    const supabase = createClient(supabaseUrl, supabaseKey);
    const bookMapping = BOOK_MAPPINGS[bookSlug];

    // Fetch first 10 hadiths as a test
    const updates: Array<{
      hadith_number: number;
      bengali: string | null;
      narrator_bengali: string | null;
      chapter_name_bengali?: string | null;
      chapter_number?: number | null;
    }> = [];

    for (let i = 1; i <= 10; i++) {
      try {
        const apiUrl = `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookMapping.folder}/hadith/${i}.json`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data: BengaliHadithResponse = await response.json();
          if (data?.hadith) {
            updates.push({
              hadith_number: data.hadith.hadith_id || i,
              bengali: data.hadith.bn || null,
              narrator_bengali: data.hadith.narrator || null,
              chapter_name_bengali: data.hadith.chapter_name || null,
              chapter_number: data.hadith.chapter_no ?? null,
            });
          }
        }
      } catch (err) {
        console.error(`Error fetching hadith ${i}:`, err);
      }
    }

    let updatedCount = 0;
    for (const update of updates) {
      const updatePayload: Record<string, unknown> = {
        bengali: update.bengali,
        narrator_bengali: update.narrator_bengali,
      };

      if (update.chapter_name_bengali) {
        updatePayload.chapter_name_bengali = update.chapter_name_bengali;
      }

      if (typeof update.chapter_number === "number") {
        updatePayload.chapter_number = update.chapter_number;
      }

      const { error } = await supabase
        .from("hadiths")
        .update(updatePayload)
        .eq("book_slug", bookSlug)
        .eq("hadith_number", update.hadith_number);

      if (!error) updatedCount++;
    }

    return new Response(
      JSON.stringify({
        success: true,
        updated: updatedCount,
        message: `Updated ${updatedCount} hadiths with Bengali translations`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in import-bengali-hadiths:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
