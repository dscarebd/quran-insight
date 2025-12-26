import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Verse {
  id: number;
  surah_number: number;
  verse_number: number;
  arabic: string;
  bengali: string;
  english: string;
  tafsir_bengali: string | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { surahNumber, startSurah, endSurah, batchSize: requestedBatchSize = 5, maxVersesPerCall = 50 } = await req.json();

    let surahs: number[] = [];
    
    if (surahNumber) {
      surahs = [surahNumber];
    } else if (startSurah && endSurah) {
      for (let i = startSurah; i <= endSurah; i++) {
        surahs.push(i);
      }
    } else {
      // Default: process all surahs
      for (let i = 1; i <= 114; i++) {
        surahs.push(i);
      }
    }

    console.log(`Processing surahs: ${surahs.join(', ')}`);

    let totalGenerated = 0;
    const errors: string[] = [];

    for (const surah of surahs) {
      console.log(`Fetching verses without tafsir for Surah ${surah}...`);
      
      // Get verses without Bengali tafsir
      const { data: verses, error: fetchError } = await supabase
        .from('verses')
        .select('*')
        .eq('surah_number', surah)
        .is('tafsir_bengali', null)
        .order('verse_number');

      if (fetchError) {
        console.error(`Error fetching verses for Surah ${surah}:`, fetchError);
        errors.push(`Surah ${surah}: ${fetchError.message}`);
        continue;
      }

      if (!verses || verses.length === 0) {
        console.log(`Surah ${surah}: All verses already have Bengali tafsir`);
        continue;
      }

      console.log(`Surah ${surah}: Found ${verses.length} verses without tafsir`);

      // Limit verses processed per call to avoid timeout (default 50)
      const versesToProcess = verses.slice(0, maxVersesPerCall);
      console.log(`Processing ${versesToProcess.length} verses (limited by maxVersesPerCall: ${maxVersesPerCall})`);
      
      // Use requested batch size (default 5)
      const batchSize = requestedBatchSize;

      // Process in batches to avoid timeout
      for (let i = 0; i < versesToProcess.length; i += batchSize) {
        const batch = versesToProcess.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} verses)...`);

        const batchPromises = batch.map(async (verse: Verse) => {
          try {
            const tafsir = await generateTafsirForVerse(verse, LOVABLE_API_KEY);
            if (tafsir) {
              const { error: updateError } = await supabase
                .from('verses')
                .update({ tafsir_bengali: tafsir })
                .eq('id', verse.id);

              if (updateError) {
                console.error(`Failed to update verse ${verse.surah_number}:${verse.verse_number}:`, updateError);
                return false;
              }
              console.log(`Generated tafsir for ${verse.surah_number}:${verse.verse_number}`);
              return true;
            }
            return false;
          } catch (e) {
            console.error(`Error generating tafsir for ${verse.surah_number}:${verse.verse_number}:`, e);
            return false;
          }
        });

        const results = await Promise.all(batchPromises);
        totalGenerated += results.filter(Boolean).length;

        // Small delay between batches to avoid rate limiting
        if (i + batchSize < versesToProcess.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      console.log(`Completed Surah ${surah}, total generated so far: ${totalGenerated}`);
    }

    const result = {
      success: true,
      message: `Generated Bengali tafsir for ${totalGenerated} verses`,
      totalGenerated,
      surahsProcessed: surahs.length,
      errors: errors.length > 0 ? errors : undefined
    };

    console.log('Final result:', JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-tafsir function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateTafsirForVerse(verse: Verse, apiKey: string): Promise<string | null> {
  const prompt = `You are a Quran tafsir (exegesis) expert. Generate a brief, authentic Bengali tafsir for the following Quranic verse. The tafsir should be educational, scholarly, and accessible to general readers.

Surah ${verse.surah_number}, Verse ${verse.verse_number}

Arabic: ${verse.arabic}

Bengali Translation: ${verse.bengali}

English Translation: ${verse.english}

Please provide a concise Bengali tafsir (explanation/commentary) for this verse. Include:
1. The context and meaning of the verse
2. Key lessons or messages
3. Any relevant historical context if applicable

Write ONLY in Bengali. Keep it between 100-300 words. Do not include any English text in your response.`;

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.log('Rate limited, waiting before retry...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        // Retry once
        const retryResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'user', content: prompt }
            ],
          }),
        });
        if (!retryResponse.ok) {
          throw new Error(`AI API error after retry: ${retryResponse.status}`);
        }
        const retryData = await retryResponse.json();
        return retryData.choices?.[0]?.message?.content || null;
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('Error calling AI API:', error);
    return null;
  }
}
