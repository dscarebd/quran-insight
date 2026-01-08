import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuranComWord {
  id: number;
  position: number;
  text: string;
  text_uthmani: string;
  verse_key: string;
  page_number: number;
  line_number: number;
  char_type_name: string;
}

interface QuranComVerse {
  id: number;
  verse_key: string;
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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { startPage, endPage } = await req.json();
    
    const start = startPage || 1;
    const end = endPage || 604;
    
    console.log(`Importing mushaf words for pages ${start} to ${end}`);
    
    let totalWordsImported = 0;
    const errors: string[] = [];

    for (let pageNum = start; pageNum <= end; pageNum++) {
      try {
        console.log(`Fetching page ${pageNum}...`);
        
        // Fetch verses with words for this page from quran.com API
        const response = await fetch(
          `https://api.quran.com/api/v4/verses/by_page/${pageNum}?words=true&word_fields=text,line_number,page_number,char_type_name&per_page=50`,
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: QuranComResponse = await response.json();
        
        // Delete existing words for this page
        await supabase
          .from('mushaf_words')
          .delete()
          .eq('page_number', pageNum);

        // Process all words from all verses on this page
        const wordsToInsert: any[] = [];
        
        for (const verse of data.verses) {
          const [surahNumber, verseNumber] = verse.verse_key.split(':').map(Number);
          
          for (const word of verse.words) {
            // Include all words and end markers (for ornate verse numbers)
            wordsToInsert.push({
              page_number: word.page_number,
              line_number: word.line_number,
              surah_number: surahNumber,
              verse_number: verseNumber,
              word_position: word.position,
              text_v1: word.text, // V1 glyph text
              verse_key: verse.verse_key,
              char_type: word.char_type_name,
            });
          }
        }

        if (wordsToInsert.length > 0) {
          const { error } = await supabase
            .from('mushaf_words')
            .insert(wordsToInsert);

          if (error) {
            throw new Error(`Insert error: ${error.message}`);
          }
          
          totalWordsImported += wordsToInsert.length;
          console.log(`Page ${pageNum}: Imported ${wordsToInsert.length} words`);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error: unknown) {
        const errorMsg = `Page ${pageNum}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalWordsImported,
        pagesProcessed: end - start + 1,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in import-mushaf-words:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
