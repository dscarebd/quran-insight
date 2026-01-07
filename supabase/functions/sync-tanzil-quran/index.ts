import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MismatchReport {
  surah_number: number;
  verse_number: number;
  tanzil_text: string;
  db_text: string;
  status: 'mismatch' | 'missing' | 'updated';
}

// Normalize Arabic text for comparison
function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFC')
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove diacritics for comparison
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse Tanzil XML format
function parseTanzilXml(xmlText: string): Map<string, string> {
  const verses = new Map<string, string>();
  
  // Match each sura
  const suraRegex = /<sura\s+index="(\d+)"[^>]*>([\s\S]*?)<\/sura>/g;
  let suraMatch;
  
  while ((suraMatch = suraRegex.exec(xmlText)) !== null) {
    const surahNumber = parseInt(suraMatch[1]);
    const suraContent = suraMatch[2];
    
    // Match each aya within the sura
    const ayaRegex = /<aya\s+index="(\d+)"\s+text="([^"]+)"[^>]*\/>/g;
    let ayaMatch;
    
    while ((ayaMatch = ayaRegex.exec(suraContent)) !== null) {
      const verseNumber = parseInt(ayaMatch[1]);
      const verseText = ayaMatch[2]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      
      verses.set(`${surahNumber}:${verseNumber}`, verseText);
    }
  }
  
  return verses;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const dryRun = url.searchParams.get('dry_run') !== 'false';
    const surahFilter = url.searchParams.get('surah');

    console.log(`Starting Tanzil sync - dry_run: ${dryRun}, surah filter: ${surahFilter || 'all'}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch Tanzil XML (Uthmani text)
    console.log('Fetching Tanzil.net Uthmani Quran XML...');
    const tanzilUrl = 'https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=xml&marks=true';
    
    const tanzilResponse = await fetch(tanzilUrl, {
      headers: {
        'User-Agent': 'QuranApp/1.0 (Tanzil Data Sync)',
        'Accept': 'application/xml, text/xml, */*'
      }
    });
    
    if (!tanzilResponse.ok) {
      throw new Error(`Failed to fetch Tanzil data: ${tanzilResponse.status} ${tanzilResponse.statusText}`);
    }
    
    const xmlText = await tanzilResponse.text();
    console.log(`Received ${xmlText.length} bytes from Tanzil.net`);
    
    // Parse XML
    const tanzilVerses = parseTanzilXml(xmlText);
    console.log(`Parsed ${tanzilVerses.size} verses from Tanzil XML`);
    
    if (tanzilVerses.size < 6200) {
      throw new Error(`Expected 6236 verses, but only parsed ${tanzilVerses.size}. XML parsing may have failed.`);
    }

    // Fetch all verses from database
    let dbQuery = supabase
      .from('verses')
      .select('surah_number, verse_number, arabic')
      .order('surah_number')
      .order('verse_number');
    
    if (surahFilter) {
      dbQuery = dbQuery.eq('surah_number', parseInt(surahFilter));
    }
    
    const { data: dbVerses, error: dbError } = await dbQuery;
    
    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    console.log(`Fetched ${dbVerses?.length || 0} verses from database`);

    const mismatches: MismatchReport[] = [];
    const missing: MismatchReport[] = [];
    let matchCount = 0;
    let updateCount = 0;

    // Compare each verse
    for (const dbVerse of dbVerses || []) {
      const key = `${dbVerse.surah_number}:${dbVerse.verse_number}`;
      const tanzilText = tanzilVerses.get(key);
      
      if (!tanzilText) {
        missing.push({
          surah_number: dbVerse.surah_number,
          verse_number: dbVerse.verse_number,
          tanzil_text: '',
          db_text: dbVerse.arabic || '',
          status: 'missing'
        });
        continue;
      }
      
      // Compare normalized versions
      const normalizedTanzil = normalizeArabic(tanzilText);
      const normalizedDb = normalizeArabic(dbVerse.arabic || '');
      
      if (normalizedTanzil !== normalizedDb) {
        // Check if it's a real mismatch or just formatting
        if (tanzilText !== dbVerse.arabic) {
          mismatches.push({
            surah_number: dbVerse.surah_number,
            verse_number: dbVerse.verse_number,
            tanzil_text: tanzilText,
            db_text: dbVerse.arabic || '',
            status: 'mismatch'
          });
          
          // Update if not dry run
          if (!dryRun) {
            const { error: updateError } = await supabase
              .from('verses')
              .update({ arabic: tanzilText, updated_at: new Date().toISOString() })
              .eq('surah_number', dbVerse.surah_number)
              .eq('verse_number', dbVerse.verse_number);
            
            if (updateError) {
              console.error(`Failed to update ${key}: ${updateError.message}`);
            } else {
              updateCount++;
              mismatches[mismatches.length - 1].status = 'updated';
            }
          }
        } else {
          matchCount++;
        }
      } else {
        matchCount++;
      }
    }

    // Check for verses in Tanzil but not in DB
    const dbVerseKeys = new Set((dbVerses || []).map(v => `${v.surah_number}:${v.verse_number}`));
    for (const [key, text] of tanzilVerses) {
      if (!dbVerseKeys.has(key)) {
        const [surah, verse] = key.split(':').map(Number);
        if (!surahFilter || surah === parseInt(surahFilter)) {
          missing.push({
            surah_number: surah,
            verse_number: verse,
            tanzil_text: text,
            db_text: '',
            status: 'missing'
          });
        }
      }
    }

    const result = {
      success: true,
      dry_run: dryRun,
      surah_filter: surahFilter || 'all',
      tanzil_verses_count: tanzilVerses.size,
      db_verses_count: dbVerses?.length || 0,
      matches: matchCount,
      mismatches: mismatches.length,
      missing_in_tanzil: missing.filter(m => !m.tanzil_text).length,
      missing_in_db: missing.filter(m => !m.db_text).length,
      updated: updateCount,
      mismatch_details: mismatches.slice(0, 50), // Limit details to first 50
      missing_details: missing.slice(0, 20),
    };

    console.log(`Sync complete: ${matchCount} matches, ${mismatches.length} mismatches, ${updateCount} updated`);

    return new Response(JSON.stringify(result, null, 2), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Tanzil sync error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
