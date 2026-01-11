// Background sync service to download all data to IndexedDB
import { supabase } from "@/integrations/supabase/client";
import { 
  saveVerses, 
  saveHadiths,
  saveMasail,
  getVerseCount, 
  getHadithCount,
  getMasailCount,
  setMetadata, 
  getMetadata,
  LocalHadith,
  LocalMasail
} from "./offlineDataService";
import { Verse } from "@/data/verses";

const BATCH_SIZE = 500;
const SYNC_KEY = "last-sync-time";
const MASAIL_SYNC_KEY = "last-masail-sync";

export interface SyncProgress {
  type: "verses" | "hadiths" | "masail";
  current: number;
  total: number;
  status: "syncing" | "complete" | "error";
}

type ProgressCallback = (progress: SyncProgress) => void;

export const syncAllData = async (onProgress?: ProgressCallback): Promise<void> => {
  try {
    // Check if we need to sync
    const lastSync = await getMetadata(SYNC_KEY);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // If synced within last 24 hours, skip
    if (lastSync && (now - lastSync) < oneDay) {
      const verseCount = await getVerseCount();
      const hadithCount = await getHadithCount();
      if (verseCount >= 6200 && hadithCount >= 36000) {
        console.log("Data already synced within 24 hours");
        return;
      }
    }

    // Sync verses
    await syncVerses(onProgress);
    
    // Sync hadiths
    await syncHadiths(onProgress);

    // Update sync time
    await setMetadata(SYNC_KEY, now);
    console.log("Data sync complete");
  } catch (error) {
    console.error("Sync error:", error);
    throw error;
  }
};

const syncVerses = async (onProgress?: ProgressCallback): Promise<void> => {
  // Get total count
  const { count: totalVerses } = await supabase
    .from("verses")
    .select("*", { count: "exact", head: true });

  if (!totalVerses) return;

  // Check if we already have all verses
  const existingCount = await getVerseCount();
  if (existingCount >= totalVerses) {
    onProgress?.({ type: "verses", current: totalVerses, total: totalVerses, status: "complete" });
    return;
  }

  let offset = 0;
  while (offset < totalVerses) {
    const { data, error } = await supabase
      .from("verses")
      .select("surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english")
      .order("surah_number", { ascending: true })
      .order("verse_number", { ascending: true })
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    // Map to Verse format
    const verses: Verse[] = data.map(v => ({
      surahNumber: v.surah_number,
      verseNumber: v.verse_number,
      arabic: v.arabic,
      bengali: v.bengali,
      english: v.english,
      tafsirBengali: v.tafsir_bengali || undefined,
      tafsirEnglish: v.tafsir_english || undefined,
    }));

    await saveVerses(verses);
    offset += data.length;
    
    onProgress?.({ 
      type: "verses", 
      current: Math.min(offset, totalVerses), 
      total: totalVerses, 
      status: "syncing" 
    });
  }

  onProgress?.({ type: "verses", current: totalVerses, total: totalVerses, status: "complete" });
};

const syncHadiths = async (onProgress?: ProgressCallback): Promise<void> => {
  // Get total count
  const { count: totalHadiths } = await supabase
    .from("hadiths")
    .select("*", { count: "exact", head: true });

  if (!totalHadiths) return;

  // Check if we already have all hadiths
  const existingCount = await getHadithCount();
  if (existingCount >= totalHadiths) {
    onProgress?.({ type: "hadiths", current: totalHadiths, total: totalHadiths, status: "complete" });
    return;
  }

  let offset = 0;
  while (offset < totalHadiths) {
    const { data, error } = await supabase
      .from("hadiths")
      .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
      .order("book_slug", { ascending: true })
      .order("hadith_number", { ascending: true })
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    await saveHadiths(data as LocalHadith[]);
    offset += data.length;
    
    onProgress?.({ 
      type: "hadiths", 
      current: Math.min(offset, totalHadiths), 
      total: totalHadiths, 
      status: "syncing" 
    });
  }

  onProgress?.({ type: "hadiths", current: totalHadiths, total: totalHadiths, status: "complete" });
};

// Sync a single surah's verses (for on-demand loading)
export const syncSurahVerses = async (surahNumber: number): Promise<Verse[]> => {
  const { data, error } = await supabase
    .from("verses")
    .select("surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english")
    .eq("surah_number", surahNumber)
    .order("verse_number", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  const verses: Verse[] = data.map(v => ({
    surahNumber: v.surah_number,
    verseNumber: v.verse_number,
    arabic: v.arabic,
    bengali: v.bengali,
    english: v.english,
    tafsirBengali: v.tafsir_bengali || undefined,
    tafsirEnglish: v.tafsir_english || undefined,
  }));

  // Save to IndexedDB for offline use
  await saveVerses(verses);

  return verses;
};

// Sync a single book's hadiths (for on-demand loading)
export const syncBookHadiths = async (bookSlug: string): Promise<LocalHadith[]> => {
  const allHadiths: LocalHadith[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from("hadiths")
      .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
      .eq("book_slug", bookSlug)
      .order("hadith_number", { ascending: true })
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    allHadiths.push(...(data as LocalHadith[]));
    offset += data.length;

    if (data.length < BATCH_SIZE) break;
  }

  // Save to IndexedDB for offline use
  await saveHadiths(allHadiths);

  return allHadiths;
};

// Sync masail - smart sync using updated_at for incremental updates
export const syncMasail = async (onProgress?: ProgressCallback): Promise<{
  synced: number;
  isOffline: boolean;
}> => {
  // Check online status
  if (!navigator.onLine) {
    return { synced: 0, isOffline: true };
  }

  try {
    // Get last sync timestamp
    const lastSync = await getMetadata(MASAIL_SYNC_KEY);
    
    // Build query - fetch all if first time, or only updated records
    let query = supabase
      .from("masail")
      .select("*")
      .order("updated_at", { ascending: true });
    
    if (lastSync) {
      query = query.gt("updated_at", lastSync);
    }

    // Get total count for progress
    const { count: totalCount } = await supabase
      .from("masail")
      .select("*", { count: "exact", head: true });

    // Fetch in batches
    const allMasail: LocalMasail[] = [];
    let offset = 0;

    while (true) {
      const { data, error } = await query.range(offset, offset + BATCH_SIZE - 1);

      if (error) throw error;
      if (!data || data.length === 0) break;

      allMasail.push(...(data as LocalMasail[]));
      offset += data.length;

      onProgress?.({
        type: "masail",
        current: offset,
        total: totalCount || offset,
        status: "syncing"
      });

      if (data.length < BATCH_SIZE) break;
    }

    if (allMasail.length > 0) {
      // Save to IndexedDB
      await saveMasail(allMasail);
      
      // Update last sync time to the most recent updated_at
      const latestUpdate = allMasail[allMasail.length - 1].updated_at;
      await setMetadata(MASAIL_SYNC_KEY, latestUpdate);
    }

    onProgress?.({
      type: "masail",
      current: totalCount || allMasail.length,
      total: totalCount || allMasail.length,
      status: "complete"
    });

    console.log(`Masail sync complete: ${allMasail.length} records synced`);
    return { synced: allMasail.length, isOffline: false };
  } catch (error) {
    console.error("Masail sync error:", error);
    onProgress?.({
      type: "masail",
      current: 0,
      total: 0,
      status: "error"
    });
    throw error;
  }
};

// Get last masail sync time
export const getLastMasailSync = async (): Promise<string | null> => {
  return await getMetadata(MASAIL_SYNC_KEY);
};
