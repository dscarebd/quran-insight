import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tarteel.ai CDN for QPC V1 glyph data
const V1_SCRIPT_CDN = 'https://api.quran.com/api/v4/quran/verses/qpc_uthmani_hafs';

interface QuranComWord {
  id: number;
  position: number;
  text_uthmani: string;
  text: string; // This is the QPC glyph text
  page_number: number;
  line_number: number;
  audio_url?: string;
  char_type_name: string;
}

interface QuranComVerse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  page_number: number;
  juz_number: number;
  hizb_number: number;
  words: QuranComWord[];
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { surahNumber, startSurah, endSurah } = await req.json();
    
    console.log('Starting V1 glyph import...');
    
    const results: { surah: number; verses: number; success: boolean; error?: string }[] = [];
    
    // Determine which surahs to process
    const surahs: number[] = [];
    if (surahNumber) {
      surahs.push(surahNumber);
    } else {
      const start = startSurah || 1;
      const end = endSurah || 114;
      for (let s = start; s <= end; s++) {
        surahs.push(s);
      }
    }
    
    for (const surah of surahs) {
      try {
        console.log(`Fetching V1 data for Surah ${surah}...`);
        
        // Fetch from quran.com API with QPC text
        const apiUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surah}?words=true&per_page=300&word_fields=text,page_number`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        
        const data: QuranComResponse = await response.json();
        
        console.log(`Got ${data.verses.length} verses for Surah ${surah}`);
        
        // Process each verse
        const updates: { surahNumber: number; verseNumber: number; textV1: string; pageNumber: number }[] = [];
        
        for (const verse of data.verses) {
          const [, verseNum] = verse.verse_key.split(':');
          
          // Build V1 text from words (using the 'text' field which contains QPC glyphs)
          // Filter out 'end' type words (verse markers) and join with space
          const v1Words = verse.words
            .filter(w => w.char_type_name === 'word')
            .map(w => w.text);
          
          const textV1 = v1Words.join(' ');
          
          updates.push({
            surahNumber: surah,
            verseNumber: parseInt(verseNum),
            textV1,
            pageNumber: verse.page_number,
          });
        }
        
        // Update verses in database
        for (const update of updates) {
          const { error } = await supabase
            .from('verses')
            .update({
              text_v1: update.textV1,
              page_number: update.pageNumber,
            })
            .eq('surah_number', update.surahNumber)
            .eq('verse_number', update.verseNumber);
            
          if (error) {
            console.error(`Error updating verse ${update.surahNumber}:${update.verseNumber}:`, error);
          }
        }
        
        results.push({ surah, verses: updates.length, success: true });
        console.log(`✓ Updated ${updates.length} verses for Surah ${surah}`);
        
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200));
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error processing Surah ${surah}:`, error);
        results.push({ surah, verses: 0, success: false, error: errorMessage });
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    const totalVerses = results.reduce((sum, r) => sum + r.verses, 0);
    
    return new Response(JSON.stringify({
      success: true,
      message: `Imported V1 glyphs for ${successCount}/${surahs.length} surahs (${totalVerses} verses)`,
      results,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in import-v1-glyphs function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
