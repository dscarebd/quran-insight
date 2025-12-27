import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Parse semicolon-delimited CSV line (handles quoted fields)
const parseSemicolonCsvLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { 
        current += '"'; 
        i++; 
      } else { 
        inQuotes = !inQuotes; 
      }
    } else if (char === ';' && !inQuotes) { 
      result.push(current); 
      current = ''; 
    } else { 
      current += char; 
    }
  }
  result.push(current);
  return result;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { csvData, startSurah, endSurah } = await req.json();

    if (!csvData) {
      throw new Error("CSV data is required");
    }

    const surahStart = startSurah || 1;
    const surahEnd = endSurah || 114;

    console.log(`Starting tafsir import for Surahs ${surahStart}-${surahEnd}...`);
    
    // Parse semicolon-delimited CSV
    const lines = csvData.split('\n').filter((line: string) => line.trim());
    const headers = parseSemicolonCsvLine(lines[0]);
    
    console.log("CSV headers:", headers);
    
    // Find column indices
    const surahIdx = headers.findIndex((h: string) => h.toLowerCase().includes('surah'));
    const verseIdx = headers.findIndex((h: string) => h.toLowerCase().includes('verse') || h.toLowerCase().includes('ayah'));
    const tafsirBengaliIdx = headers.findIndex((h: string) => h.toLowerCase().includes('tafsir_bengali') || h.toLowerCase().includes('tafsir_bn'));
    const tafsirEnglishIdx = headers.findIndex((h: string) => h.toLowerCase().includes('tafsir_english') || h.toLowerCase().includes('tafsir_en'));
    
    console.log(`Column indices - surah: ${surahIdx}, verse: ${verseIdx}, tafsir_bengali: ${tafsirBengaliIdx}, tafsir_english: ${tafsirEnglishIdx}`);
    
    if (surahIdx === -1 || verseIdx === -1) {
      throw new Error("Invalid CSV format. Required columns: surah_number (or surah), verse_number (or ayah)");
    }

    // Parse rows for the specified surah range only
    const tafsirData: { 
      surah_number: number; 
      verse_number: number; 
      tafsir_bengali?: string;
      tafsir_english?: string;
    }[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseSemicolonCsvLine(lines[i]);
      const surah = parseInt(values[surahIdx]);
      const verse = parseInt(values[verseIdx]);
      
      if (isNaN(surah) || isNaN(verse)) continue;
      
      // Filter by surah range
      if (surah < surahStart || surah > surahEnd) continue;
      
      const tafsirBengali = tafsirBengaliIdx !== -1 ? values[tafsirBengaliIdx]?.trim() : undefined;
      const tafsirEnglish = tafsirEnglishIdx !== -1 ? values[tafsirEnglishIdx]?.trim() : undefined;
      
      // Only add if at least one tafsir is present
      if ((tafsirBengali && tafsirBengali.length > 0) || (tafsirEnglish && tafsirEnglish.length > 0)) {
        tafsirData.push({
          surah_number: surah,
          verse_number: verse,
          tafsir_bengali: tafsirBengali || undefined,
          tafsir_english: tafsirEnglish || undefined,
        });
      }
    }

    console.log(`Found ${tafsirData.length} verses with tafsir data for Surahs ${surahStart}-${surahEnd}`);
    
    let updatedBengali = 0;
    let updatedEnglish = 0;
    let errors: string[] = [];
    const batchSize = 50;
    
    // Process in batches
    for (let i = 0; i < tafsirData.length; i += batchSize) {
      const batch = tafsirData.slice(i, i + batchSize);
      
      for (const item of batch) {
        const updateData: { tafsir_bengali?: string; tafsir_english?: string } = {};
        
        if (item.tafsir_bengali) {
          updateData.tafsir_bengali = item.tafsir_bengali;
        }
        if (item.tafsir_english) {
          updateData.tafsir_english = item.tafsir_english;
        }
        
        if (Object.keys(updateData).length === 0) continue;
        
        const { error } = await supabase
          .from('verses')
          .update(updateData)
          .eq('surah_number', item.surah_number)
          .eq('verse_number', item.verse_number);
        
        if (error) {
          errors.push(`${item.surah_number}:${item.verse_number}: ${error.message}`);
        } else {
          if (item.tafsir_bengali) updatedBengali++;
          if (item.tafsir_english) updatedEnglish++;
        }
      }
      
      console.log(`Processed ${Math.min(i + batchSize, tafsirData.length)}/${tafsirData.length} verses`);
    }

    const message = `Surahs ${surahStart}-${surahEnd}: ${updatedBengali} Bengali, ${updatedEnglish} English`;
    console.log(message);

    return new Response(
      JSON.stringify({
        success: true,
        message,
        updatedBengali,
        updatedEnglish,
        totalProcessed: tafsirData.length,
        surahRange: { start: surahStart, end: surahEnd },
        errors: errors.length > 0 ? errors.slice(0, 10) : undefined
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error("Import error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
