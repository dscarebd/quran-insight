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

const asInt = (val: string | undefined) => {
  if (!val) return NaN;
  const n = parseInt(val, 10);
  return Number.isFinite(n) ? n : NaN;
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
    const csvUrl: string | undefined = body.csvUrl;
    const csvData: string | undefined = body.csvData;
    const startSurah: number = body.startSurah ?? 1;
    const endSurah: number = body.endSurah ?? 114;

    if (!csvUrl && !csvData) {
      throw new Error("csvUrl or csvData is required");
    }

    console.log(`Starting tafsir import (URL-based) for Surahs ${startSurah}-${endSurah}...`);

    let csvText = csvData ?? "";
    if (!csvText && csvUrl) {
      console.log(`Fetching CSV from: ${csvUrl}`);
      const resp = await fetch(csvUrl);
      if (!resp.ok) throw new Error(`Failed to fetch CSV (${resp.status})`);
      csvText = await resp.text();
    }

    const lines = csvText.split("\n").filter((l) => l.trim());
    if (lines.length < 2) throw new Error("CSV is empty");

    const headers = parseSemicolonCsvLine(lines[0]);

    const idIdx = headers.findIndex((h) => h.toLowerCase() === "id");
    const surahIdx = headers.findIndex((h) => h.toLowerCase().includes("surah"));
    const verseIdx = headers.findIndex((h) => h.toLowerCase().includes("verse") || h.toLowerCase().includes("ayah"));
    const tafsirBengaliIdx = headers.findIndex((h) => h.toLowerCase().includes("tafsir_bengali") || h.toLowerCase().includes("tafsir_bn"));
    const tafsirEnglishIdx = headers.findIndex((h) => h.toLowerCase().includes("tafsir_english") || h.toLowerCase().includes("tafsir_en"));

    console.log(
      `Column indices - id: ${idIdx}, surah: ${surahIdx}, verse: ${verseIdx}, tafsir_bengali: ${tafsirBengaliIdx}, tafsir_english: ${tafsirEnglishIdx}`,
    );

    if (idIdx === -1) throw new Error("CSV missing required column: id");
    if (surahIdx === -1 || verseIdx === -1) {
      throw new Error("Invalid CSV format. Required columns: surah_number (or surah), verse_number (or ayah)");
    }

    type UpdateRow = { id: number; tafsir_bengali?: string | null; tafsir_english?: string | null };

    const updates: UpdateRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseSemicolonCsvLine(lines[i]);
      const id = asInt(values[idIdx]);
      const surah = asInt(values[surahIdx]);
      const verse = asInt(values[verseIdx]);

      if (Number.isNaN(id) || Number.isNaN(surah) || Number.isNaN(verse)) continue;
      if (surah < startSurah || surah > endSurah) continue;

      const bn = tafsirBengaliIdx !== -1 ? values[tafsirBengaliIdx]?.trim() : undefined;
      const en = tafsirEnglishIdx !== -1 ? values[tafsirEnglishIdx]?.trim() : undefined;

      if ((bn && bn.length > 0) || (en && en.length > 0)) {
        updates.push({
          id,
          tafsir_bengali: bn && bn.length > 0 ? bn : undefined,
          tafsir_english: en && en.length > 0 ? en : undefined,
        });
      }
    }

    console.log(`Prepared ${updates.length} tafsir updates for Surahs ${startSurah}-${endSurah}`);

    let updatedBengali = 0;
    let updatedEnglish = 0;
    const errors: string[] = [];

    const batchSize = 250;
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);

      // Counters (best-effort)
      for (const row of batch) {
        if (row.tafsir_bengali) updatedBengali++;
        if (row.tafsir_english) updatedEnglish++;
      }

      const { error } = await supabase
        .from("verses")
        .upsert(batch, { onConflict: "id", defaultToNull: false });

      if (error) {
        errors.push(error.message);
        console.error("Batch upsert error:", error);
      }

      console.log(`Upserted ${Math.min(i + batchSize, updates.length)}/${updates.length} rows`);
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
