import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuranComVerse {
  id: number;
  verse_key: string;
  verse_number: number;
  text_uthmani: string;
  page_number: number;
  juz_number: number;
  hizb_number: number;
}

interface QuranComResponse {
  verses: QuranComVerse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

interface MismatchReport {
  surah_number: number;
  verse_number: number;
  page_number: number;
  our_arabic: string;
  quran_com_arabic: string;
  status: "updated" | "missing_in_db" | "mismatch";
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const startPage = parseInt(url.searchParams.get("start_page") || "1");
    const endPage = parseInt(url.searchParams.get("end_page") || "604");
    const dryRun = url.searchParams.get("dry_run") === "true";

    console.log(`Starting Quran sync: pages ${startPage}-${endPage}, dryRun=${dryRun}`);

    const mismatches: MismatchReport[] = [];
    let totalVersesFetched = 0;
    let totalUpdated = 0;
    let totalMissingInDb = 0;

    // Process pages in batches to avoid rate limits
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      console.log(`Processing page ${pageNum}/${endPage}...`);

      try {
        // Fetch all verses for this page from Quran.com API
        // Using per_page=50 (max) and paginating if needed
        let allPageVerses: QuranComVerse[] = [];
        let apiPage = 1;
        let hasMore = true;

        while (hasMore) {
          const apiUrl = `https://api.quran.com/api/v4/verses/by_page/${pageNum}?words=false&per_page=50&page=${apiPage}&fields=text_uthmani,verse_key,page_number`;
          
          const response = await fetch(apiUrl, {
            headers: {
              "Accept": "application/json",
              "User-Agent": "QuranInsight/1.0",
            },
          });

          if (!response.ok) {
            console.error(`API error for page ${pageNum}: ${response.status}`);
            break;
          }

          const data: QuranComResponse = await response.json();
          allPageVerses.push(...data.verses);
          totalVersesFetched += data.verses.length;

          hasMore = data.pagination.next_page !== null;
          apiPage++;

          // Small delay to avoid rate limiting
          if (hasMore) {
            await delay(100);
          }
        }

        // Compare each verse with our database
        for (const qcVerse of allPageVerses) {
          const [surahStr, verseStr] = qcVerse.verse_key.split(":");
          const surahNumber = parseInt(surahStr);
          const verseNumber = parseInt(verseStr);
          const quranComArabic = qcVerse.text_uthmani;

          // Fetch our verse from database
          const { data: ourVerse, error } = await supabase
            .from("verses")
            .select("id, arabic")
            .eq("surah_number", surahNumber)
            .eq("verse_number", verseNumber)
            .single();

          if (error || !ourVerse) {
            mismatches.push({
              surah_number: surahNumber,
              verse_number: verseNumber,
              page_number: pageNum,
              our_arabic: "",
              quran_com_arabic: quranComArabic,
              status: "missing_in_db",
            });
            totalMissingInDb++;
            continue;
          }

          // Normalize for comparison (trim whitespace)
          const ourArabicNormalized = ourVerse.arabic.trim();
          const qcArabicNormalized = quranComArabic.trim();

          if (ourArabicNormalized !== qcArabicNormalized) {
            mismatches.push({
              surah_number: surahNumber,
              verse_number: verseNumber,
              page_number: pageNum,
              our_arabic: ourVerse.arabic,
              quran_com_arabic: quranComArabic,
              status: dryRun ? "mismatch" : "updated",
            });

            if (!dryRun) {
              // Update the verse in our database
              const { error: updateError } = await supabase
                .from("verses")
                .update({ arabic: quranComArabic, updated_at: new Date().toISOString() })
                .eq("id", ourVerse.id);

              if (updateError) {
                console.error(`Failed to update verse ${surahNumber}:${verseNumber}:`, updateError);
              } else {
                totalUpdated++;
              }
            }
          }
        }

        // Rate limit: wait between pages
        if (pageNum < endPage) {
          await delay(200);
        }

      } catch (pageError) {
        console.error(`Error processing page ${pageNum}:`, pageError);
      }
    }

    const summary = {
      pages_scanned: endPage - startPage + 1,
      total_verses_fetched: totalVersesFetched,
      total_mismatches: mismatches.length,
      total_updated: totalUpdated,
      total_missing_in_db: totalMissingInDb,
      dry_run: dryRun,
      mismatches: mismatches.slice(0, 100), // Limit response size
      has_more_mismatches: mismatches.length > 100,
    };

    console.log(`Sync complete: ${totalVersesFetched} verses, ${mismatches.length} mismatches, ${totalUpdated} updated`);

    return new Response(JSON.stringify(summary, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Sync error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
