import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuranVerse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}

interface TranslationVerse {
  resource_id: number;
  text: string;
}

interface TranslationResponse {
  translations: TranslationVerse[];
}

interface TafsirVerse {
  resource_id: number;
  text: string;
}

interface TafsirResponse {
  tafsirs: TafsirVerse[];
}

// Bengali character range check
function isBengaliText(text: string): boolean {
  if (!text || text.trim() === '') return false;
  // Bengali Unicode range: \u0980-\u09FF
  const bengaliRegex = /^[\u0980-\u09FF\s\d\.\,\!\?\-\:\;\(\)\[\]\"\'।॥]+/;
  return bengaliRegex.test(text.trim());
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { surahNumber, startSurah, endSurah, clearWrongTafsir, tafsirOnly } = await req.json();
    
    // Option to clear wrong language tafsir first
    if (clearWrongTafsir) {
      console.log("Clearing non-Bengali tafsir data...");
      
      // Fetch all verses with tafsir
      const { data: verses, error: fetchError } = await supabase
        .from("verses")
        .select("id, surah_number, verse_number, tafsir_bengali")
        .not("tafsir_bengali", "is", null);
      
      if (fetchError) {
        throw new Error(`Error fetching verses: ${fetchError.message}`);
      }

      let clearedCount = 0;
      for (const verse of verses || []) {
        if (verse.tafsir_bengali && !isBengaliText(verse.tafsir_bengali)) {
          const { error: updateError } = await supabase
            .from("verses")
            .update({ tafsir_bengali: null })
            .eq("id", verse.id);
          
          if (!updateError) {
            clearedCount++;
          }
        }
      }

      return new Response(JSON.stringify({
        success: true,
        message: `Cleared ${clearedCount} non-Bengali tafsir entries`,
        clearedCount
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    let surahsToProcess: number[] = [];
    
    if (surahNumber) {
      surahsToProcess = [surahNumber];
    } else if (startSurah && endSurah) {
      for (let i = startSurah; i <= endSurah; i++) {
        surahsToProcess.push(i);
      }
    } else {
      for (let i = 1; i <= 114; i++) {
        surahsToProcess.push(i);
      }
    }

    console.log(`Processing surahs: ${surahsToProcess.join(", ")}`);

    let totalUpdated = 0;
    const errors: string[] = [];

    // Translation IDs: 20 = Sahih International (English), 161 = Bengali (Taisirul Quran)
    // Tafsir ID: 164 = Tafsir Ibn Kathir (Bengali)
    const ENGLISH_TRANSLATION_ID = 20;
    const BENGALI_TRANSLATION_ID = 161;
    const BENGALI_TAFSIR_ID = 164;

    for (const surah of surahsToProcess) {
      try {
        console.log(`Fetching Surah ${surah} from Quran.com API...`);
        
        // If tafsirOnly mode, skip Arabic and translations
        let arabicData: { verses: QuranVerse[] } = { verses: [] };
        let englishData: TranslationResponse = { translations: [] };
        let bengaliData: TranslationResponse = { translations: [] };

        if (!tafsirOnly) {
          // Fetch Arabic text
          const arabicUrl = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surah}`;
          const arabicResponse = await fetch(arabicUrl);
          
          if (!arabicResponse.ok) {
            console.error(`Arabic API error for Surah ${surah}: ${arabicResponse.status}`);
            errors.push(`Surah ${surah}: Arabic API error ${arabicResponse.status}`);
            continue;
          }

          arabicData = await arabicResponse.json();
          console.log(`Received ${arabicData.verses.length} Arabic verses for Surah ${surah}`);

          // Fetch English translation
          const englishUrl = `https://api.quran.com/api/v4/quran/translations/${ENGLISH_TRANSLATION_ID}?chapter_number=${surah}`;
          const englishResponse = await fetch(englishUrl);
          englishData = englishResponse.ok ? await englishResponse.json() : { translations: [] };
          console.log(`Received ${englishData.translations?.length || 0} English translations`);

          // Fetch Bengali translation
          const bengaliUrl = `https://api.quran.com/api/v4/quran/translations/${BENGALI_TRANSLATION_ID}?chapter_number=${surah}`;
          const bengaliResponse = await fetch(bengaliUrl);
          bengaliData = bengaliResponse.ok ? await bengaliResponse.json() : { translations: [] };
          console.log(`Received ${bengaliData.translations?.length || 0} Bengali translations`);
        }

        // Fetch Bengali tafsir - use verse-by-verse API for better accuracy
        const bengaliTafsirUrl = `https://api.quran.com/api/v4/quran/tafsirs/${BENGALI_TAFSIR_ID}?chapter_number=${surah}`;
        const bengaliTafsirResponse = await fetch(bengaliTafsirUrl);
        const bengaliTafsirData: TafsirResponse = bengaliTafsirResponse.ok ? await bengaliTafsirResponse.json() : { tafsirs: [] };
        console.log(`Received ${bengaliTafsirData.tafsirs?.length || 0} Bengali tafsirs`);

        // Get verse count from database if in tafsirOnly mode
        let verseCount = arabicData.verses.length;
        if (tafsirOnly) {
          const { data: surahData } = await supabase
            .from("surahs")
            .select("total_verses")
            .eq("number", surah)
            .single();
          verseCount = surahData?.total_verses || bengaliTafsirData.tafsirs?.length || 0;
        }

        // Update each verse in the database
        for (let i = 0; i < verseCount; i++) {
          const surahNum = surah;
          const verseNum = i + 1;
          
          const updateData: Record<string, string | null> = {};

          if (!tafsirOnly) {
            const verse = arabicData.verses[i];
            if (verse) {
              updateData.arabic = verse.text_uthmani;
            }

            // Add English translation if available
            if (englishData.translations?.[i]?.text) {
              updateData.english = englishData.translations[i].text.replace(/<[^>]*>/g, '');
            }

            // Add Bengali translation if available
            if (bengaliData.translations?.[i]?.text) {
              updateData.bengali = bengaliData.translations[i].text.replace(/<[^>]*>/g, '');
            }
          }

          // Add Bengali tafsir if available AND it's actually Bengali text
          if (bengaliTafsirData.tafsirs?.[i]?.text) {
            const tafsirText = bengaliTafsirData.tafsirs[i].text.replace(/<[^>]*>/g, '');
            if (isBengaliText(tafsirText)) {
              updateData.tafsir_bengali = tafsirText;
            } else {
              console.log(`Skipping non-Bengali tafsir for ${surahNum}:${verseNum}`);
              updateData.tafsir_bengali = null; // Clear if not Bengali
            }
          }
          
          // Only update if we have data
          if (Object.keys(updateData).length > 0) {
            const { error: updateError } = await supabase
              .from("verses")
              .update(updateData)
              .eq("surah_number", surahNum)
              .eq("verse_number", verseNum);

            if (updateError) {
              console.error(`Error updating ${surahNum}:${verseNum}: ${updateError.message}`);
              errors.push(`${surahNum}:${verseNum}: ${updateError.message}`);
            } else {
              totalUpdated++;
            }
          }
        }

        console.log(`Completed Surah ${surah}, total updated so far: ${totalUpdated}`);
        
        // Delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (surahError) {
        console.error(`Error processing Surah ${surah}:`, surahError);
        errors.push(`Surah ${surah}: ${surahError instanceof Error ? surahError.message : "Unknown error"}`);
      }
    }

    const result = {
      success: true,
      message: tafsirOnly 
        ? `Updated ${totalUpdated} verses with Bengali tafsir from ${surahsToProcess.length} surah(s)`
        : `Updated ${totalUpdated} verses with Arabic, translations & tafsirs from ${surahsToProcess.length} surah(s)`,
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
    console.error("Error in update-arabic-verses:", error);
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
