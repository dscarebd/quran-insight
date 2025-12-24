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

interface QuranApiResponse {
  verses: QuranVerse[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { surahNumber, startSurah, endSurah } = await req.json();
    
    let surahsToProcess: number[] = [];
    
    if (surahNumber) {
      surahsToProcess = [surahNumber];
    } else if (startSurah && endSurah) {
      for (let i = startSurah; i <= endSurah; i++) {
        surahsToProcess.push(i);
      }
    } else {
      // Default: process all 114 surahs
      for (let i = 1; i <= 114; i++) {
        surahsToProcess.push(i);
      }
    }

    console.log(`Processing surahs: ${surahsToProcess.join(", ")}`);

    let totalUpdated = 0;
    const errors: string[] = [];

    for (const surah of surahsToProcess) {
      try {
        console.log(`Fetching Surah ${surah} from Quran.com API...`);
        
        // Fetch from Quran.com API
        const apiUrl = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surah}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API error for Surah ${surah}: ${response.status} - ${errorText}`);
          errors.push(`Surah ${surah}: API error ${response.status}`);
          continue;
        }

        const data: QuranApiResponse = await response.json();
        console.log(`Received ${data.verses.length} verses for Surah ${surah}`);

        // Update each verse in the database
        for (const verse of data.verses) {
          // verse_key format is "surah:verse" e.g., "2:255"
          const [surahNum, verseNum] = verse.verse_key.split(":").map(Number);
          
          const { error: updateError } = await supabase
            .from("verses")
            .update({ arabic: verse.text_uthmani })
            .eq("surah_number", surahNum)
            .eq("verse_number", verseNum);

          if (updateError) {
            console.error(`Error updating ${surahNum}:${verseNum}: ${updateError.message}`);
            errors.push(`${surahNum}:${verseNum}: ${updateError.message}`);
          } else {
            totalUpdated++;
          }
        }

        console.log(`Completed Surah ${surah}, total updated so far: ${totalUpdated}`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (surahError) {
        console.error(`Error processing Surah ${surah}:`, surahError);
        errors.push(`Surah ${surah}: ${surahError instanceof Error ? surahError.message : "Unknown error"}`);
      }
    }

    const result = {
      success: true,
      message: `Updated ${totalUpdated} verses from ${surahsToProcess.length} surah(s)`,
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
