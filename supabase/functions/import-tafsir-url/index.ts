import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Parse semicolon-delimited CSV line (handles quoted fields)
const parseSemicolonCsvLine = (line: string): string[] => {
  const result: string[] = [];
  let current = "";
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
    } else if (char === ";" && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const csvData: string | undefined = body.csvData;
    const startSurah: number = body.startSurah ?? 1;
    const endSurah: number = body.endSurah ?? 114;

    if (!csvData) {
      throw new Error("csvData is required");
    }

    console.log(`Starting tafsir import for Surahs ${startSurah}-${endSurah}...`);

    const lines = csvData.split("\n").filter((l) => l.trim());
    if (lines.length < 2) throw new Error("CSV is empty");

    const headers = parseSemicolonCsvLine(lines[0]);
    console.log("CSV headers:", headers);

    const surahIdx = headers.findIndex((h) => h.toLowerCase().includes("surah"));
    const verseIdx = headers.findIndex((h) => h.toLowerCase().includes("verse") || h.toLowerCase().includes("ayah"));
    const tafsirBengaliIdx = headers.findIndex((h) => h.toLowerCase().includes("tafsir_bengali") || h.toLowerCase().includes("tafsir_bn"));
    const tafsirEnglishIdx = headers.findIndex((h) => h.toLowerCase().includes("tafsir_english") || h.toLowerCase().includes("tafsir_en"));

    console.log(
      `Column indices - surah: ${surahIdx}, verse: ${verseIdx}, tafsir_bengali: ${tafsirBengaliIdx}, tafsir_english: ${tafsirEnglishIdx}`,
    );

    if (surahIdx === -1 || verseIdx === -1) {
      throw new Error("Invalid CSV format. Required columns: surah_number, verse_number");
    }

    type UpdateItem = { surah_number: number; verse_number: number; tafsir_bengali?: string; tafsir_english?: string };

    const updates: UpdateItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseSemicolonCsvLine(lines[i]);
      const surah = parseInt(values[surahIdx], 10);
      const verse = parseInt(values[verseIdx], 10);

      if (isNaN(surah) || isNaN(verse)) continue;
      if (surah < startSurah || surah > endSurah) continue;

      const bn = tafsirBengaliIdx !== -1 ? values[tafsirBengaliIdx]?.trim() : undefined;
      const en = tafsirEnglishIdx !== -1 ? values[tafsirEnglishIdx]?.trim() : undefined;

      if ((bn && bn.length > 0) || (en && en.length > 0)) {
        updates.push({
          surah_number: surah,
          verse_number: verse,
          tafsir_bengali: bn && bn.length > 0 ? bn : undefined,
          tafsir_english: en && en.length > 0 ? en : undefined,
        });
      }
    }

    console.log(`Prepared ${updates.length} tafsir updates for Surahs ${startSurah}-${endSurah}`);

    let updatedBengali = 0;
    let updatedEnglish = 0;
    const errors: string[] = [];

    // Process in batches of 50 for speed
    const batchSize = 50;
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);

      // Use Promise.all for parallel updates within batch
      const results = await Promise.all(
        batch.map(async (item) => {
          const updateData: { tafsir_bengali?: string; tafsir_english?: string } = {};
          if (item.tafsir_bengali) updateData.tafsir_bengali = item.tafsir_bengali;
          if (item.tafsir_english) updateData.tafsir_english = item.tafsir_english;

          const { error } = await supabase
            .from("verses")
            .update(updateData)
            .eq("surah_number", item.surah_number)
            .eq("verse_number", item.verse_number);

          return { item, error };
        })
      );

      for (const r of results) {
        if (r.error) {
          errors.push(`${r.item.surah_number}:${r.item.verse_number}: ${r.error.message}`);
        } else {
          if (r.item.tafsir_bengali) updatedBengali++;
          if (r.item.tafsir_english) updatedEnglish++;
        }
      }

      console.log(`Processed ${Math.min(i + batchSize, updates.length)}/${updates.length} verses`);
    }

    const message = `Surahs ${startSurah}-${endSurah}: ${updatedBengali} Bengali, ${updatedEnglish} English`;
    console.log(message);

    return new Response(
      JSON.stringify({
        success: errors.length === 0,
        message,
        updatedBengali,
        updatedEnglish,
        totalProcessed: updates.length,
        surahRange: { start: startSurah, end: endSurah },
        errors: errors.length ? errors.slice(0, 10) : undefined,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    console.error("Import error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
