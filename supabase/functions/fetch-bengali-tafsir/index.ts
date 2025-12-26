import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TafheemAyah {
  sura_no: number;
  aya_no: number;
  content_arabic: string;
  content_bn: string;
  content_en: string;
  note_arabic?: string;
  note_bn?: string;
  note_en?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { startSurah, endSurah, surahNumber } = await req.json();
    
    let surahsToProcess: number[] = [];
    
    if (surahNumber) {
      surahsToProcess = [surahNumber];
    } else if (startSurah && endSurah) {
      for (let i = startSurah; i <= endSurah; i++) {
        surahsToProcess.push(i);
      }
    } else {
      // Default to first 10 surahs if not specified
      for (let i = 1; i <= 10; i++) {
        surahsToProcess.push(i);
      }
    }

    console.log(`Fetching Bengali tafsir for surahs: ${surahsToProcess.join(", ")}`);

    let totalUpdated = 0;
    const errors: string[] = [];

    for (const surahNum of surahsToProcess) {
      try {
        // Get total pages for this surah - the API uses pagination
        const surahListUrl = "https://alquranbd.com/api/tafheem/sura/list";
        const surahListResponse = await fetch(surahListUrl);
        
        if (!surahListResponse.ok) {
          console.error(`Failed to fetch surah list: ${surahListResponse.status}`);
          errors.push(`Surah ${surahNum}: Failed to fetch surah list`);
          continue;
        }

        const surahList = await surahListResponse.json();
        const surahInfo = surahList.find((s: any) => s.sura_no === surahNum);
        
        if (!surahInfo) {
          console.error(`Surah ${surahNum} not found in list`);
          errors.push(`Surah ${surahNum}: Not found in API`);
          continue;
        }

        const totalPages = Math.ceil(surahInfo.totalAyat / 10); // API returns ~10 ayahs per page
        console.log(`Surah ${surahNum}: ${surahInfo.totalAyat} ayahs, ${totalPages} pages`);

        // Fetch all pages for this surah
        for (let page = 1; page <= totalPages + 1; page++) {
          const url = `https://alquranbd.com/api/tafheem/suraData/${surahNum}/${page}`;
          console.log(`Fetching: ${url}`);
          
          const response = await fetch(url);
          
          if (!response.ok) {
            console.error(`API error for Surah ${surahNum} page ${page}: ${response.status}`);
            continue;
          }

          const data: TafheemAyah[] = await response.json();
          
          if (!Array.isArray(data) || data.length === 0) {
            console.log(`No more data for Surah ${surahNum} page ${page}`);
            break;
          }

          console.log(`Got ${data.length} ayahs for Surah ${surahNum} page ${page}`);

          // Update each verse with the Bengali tafsir/note
          for (const ayah of data) {
            // The note_bn field contains the tafsir in Bengali
            const tafsirText = ayah.note_bn || "";
            
            if (tafsirText && tafsirText.trim() !== "") {
              // Clean HTML tags
              const cleanedTafsir = tafsirText.replace(/<[^>]*>/g, '').trim();
              
              if (cleanedTafsir.length > 0) {
                const { error: updateError } = await supabase
                  .from("verses")
                  .update({ tafsir_bengali: cleanedTafsir })
                  .eq("surah_number", ayah.sura_no)
                  .eq("verse_number", ayah.aya_no);

                if (updateError) {
                  console.error(`Error updating ${ayah.sura_no}:${ayah.aya_no}: ${updateError.message}`);
                  errors.push(`${ayah.sura_no}:${ayah.aya_no}: ${updateError.message}`);
                } else {
                  totalUpdated++;
                }
              }
            }
          }
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        console.log(`Completed Surah ${surahNum}, total updated so far: ${totalUpdated}`);
        
        // Delay between surahs
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (surahError) {
        console.error(`Error processing Surah ${surahNum}:`, surahError);
        errors.push(`Surah ${surahNum}: ${surahError instanceof Error ? surahError.message : "Unknown error"}`);
      }
    }

    const result = {
      success: true,
      message: `Updated ${totalUpdated} verses with Bengali tafsir (Tafhimul Quran) from ${surahsToProcess.length} surah(s)`,
      totalUpdated,
      surahsProcessed: surahsToProcess.length,
      errors: errors.length > 0 ? errors : undefined,
    };

    console.log("Final result:", JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in fetch-bengali-tafsir:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});