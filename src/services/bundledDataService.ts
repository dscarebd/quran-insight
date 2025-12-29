// Bundled Data Service - Uses IndexedDB with pre-population from Supabase
// This service ensures data is available offline after first sync

import { Verse } from "@/data/verses";
import { 
  getVersesBySurah, 
  saveVerses, 
  getVerseCount,
  getHadithsByBook,
  saveHadiths,
  getHadithCount,
  LocalHadith,
  setMetadata,
  getMetadata
} from "./offlineDataService";
import { supabase } from "@/integrations/supabase/client";
import { surahs } from "@/data/surahs";
import { hadithBooks } from "@/data/hadithBooks";

const BATCH_SIZE = 1000;
const VERSES_SYNC_KEY = "verses-synced";
const HADITHS_SYNC_KEY = "hadiths-synced";

// Cache for verses to avoid repeated IndexedDB lookups
const versesMemoryCache = new Map<number, Verse[]>();
const hadithsMemoryCache = new Map<string, LocalHadith[]>();

// Get verses for a surah - memory cache first, then IndexedDB, then sync if needed
export const getVerses = async (surahNumber: number): Promise<Verse[]> => {
  // Check memory cache
  if (versesMemoryCache.has(surahNumber)) {
    return versesMemoryCache.get(surahNumber)!;
  }

  // Try IndexedDB
  let verses = await getVersesBySurah(surahNumber);
  
  if (verses.length === 0) {
    // Need to sync this surah from Supabase
    verses = await syncSurahFromSupabase(surahNumber);
  }

  // Cache in memory
  versesMemoryCache.set(surahNumber, verses);
  return verses;
};

// Get hadiths for a book - memory cache first, then IndexedDB, then sync if needed
export const getHadiths = async (bookSlug: string): Promise<LocalHadith[]> => {
  // Check memory cache
  if (hadithsMemoryCache.has(bookSlug)) {
    return hadithsMemoryCache.get(bookSlug)!;
  }

  // Try IndexedDB
  let hadiths = await getHadithsByBook(bookSlug);
  
  if (hadiths.length === 0) {
    // Need to sync this book from Supabase
    hadiths = await syncBookFromSupabase(bookSlug);
  }

  // Cache in memory
  hadithsMemoryCache.set(bookSlug, hadiths);
  return hadiths;
};

// Sync a single surah's verses from Supabase
const syncSurahFromSupabase = async (surahNumber: number): Promise<Verse[]> => {
  try {
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

    // Save to IndexedDB
    await saveVerses(verses);
    return verses;
  } catch (error) {
    console.error("Failed to sync surah:", error);
    return [];
  }
};

// Sync a single book's hadiths from Supabase
const syncBookFromSupabase = async (bookSlug: string): Promise<LocalHadith[]> => {
  try {
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

    // Save to IndexedDB
    await saveHadiths(allHadiths);
    return allHadiths;
  } catch (error) {
    console.error("Failed to sync book:", error);
    return [];
  }
};

// Background sync all data (called on app startup)
export const syncAllDataInBackground = async (): Promise<void> => {
  // Check if already synced
  const versesSynced = await getMetadata(VERSES_SYNC_KEY);
  const hadithsSynced = await getMetadata(HADITHS_SYNC_KEY);

  if (versesSynced && hadithsSynced) {
    console.log("Data already synced");
    return;
  }

  // Check current counts
  const verseCount = await getVerseCount();
  const hadithCount = await getHadithCount();

  // Sync verses if needed
  if (verseCount < 6200) {
    console.log("Starting background verse sync...");
    await syncAllVerses();
    await setMetadata(VERSES_SYNC_KEY, true);
  }

  // Sync hadiths if needed
  if (hadithCount < 36000) {
    console.log("Starting background hadith sync...");
    await syncAllHadiths();
    await setMetadata(HADITHS_SYNC_KEY, true);
  }
};

// Sync all verses in batches
const syncAllVerses = async (): Promise<void> => {
  let offset = 0;
  
  while (true) {
    const { data, error } = await supabase
      .from("verses")
      .select("surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english")
      .order("surah_number", { ascending: true })
      .order("verse_number", { ascending: true })
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) {
      console.error("Verse sync error:", error);
      break;
    }
    if (!data || data.length === 0) break;

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
    console.log(`Synced ${offset} verses...`);

    if (data.length < BATCH_SIZE) break;
  }
};

// Sync all hadiths in batches
const syncAllHadiths = async (): Promise<void> => {
  let offset = 0;
  
  while (true) {
    const { data, error } = await supabase
      .from("hadiths")
      .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
      .order("book_slug", { ascending: true })
      .order("hadith_number", { ascending: true })
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) {
      console.error("Hadith sync error:", error);
      break;
    }
    if (!data || data.length === 0) break;

    await saveHadiths(data as LocalHadith[]);
    offset += data.length;
    console.log(`Synced ${offset} hadiths...`);

    if (data.length < BATCH_SIZE) break;
  }
};

// Get a random verse for daily content (from local data)
export const getRandomVerse = async (dayOfYear: number): Promise<Verse | null> => {
  const verseCount = await getVerseCount();
  if (verseCount === 0) {
    // Try to sync first surah at least
    const verses = await getVerses(1);
    if (verses.length > 0) {
      return verses[dayOfYear % verses.length];
    }
    return null;
  }

  // Calculate which surah and verse based on day of year
  const totalVerses = 6236;
  const verseIndex = dayOfYear % Math.min(verseCount, totalVerses);
  
  // Find surah for this verse index
  let currentIndex = 0;
  for (const surah of surahs) {
    if (currentIndex + surah.totalVerses > verseIndex) {
      const verseNumber = verseIndex - currentIndex + 1;
      const verses = await getVerses(surah.number);
      const verse = verses.find(v => v.verseNumber === verseNumber);
      return verse || verses[0] || null;
    }
    currentIndex += surah.totalVerses;
  }

  return null;
};

// Get a random hadith for daily content (from local data)
export const getRandomHadith = async (dayOfYear: number): Promise<LocalHadith | null> => {
  const hadithCount = await getHadithCount();
  if (hadithCount === 0) {
    // Try to sync a small book first
    const hadiths = await getHadiths("nawawi");
    if (hadiths.length > 0) {
      return hadiths[dayOfYear % hadiths.length];
    }
    return null;
  }

  // Select a book based on day of year
  const bookIndex = dayOfYear % hadithBooks.length;
  const book = hadithBooks[bookIndex];
  const hadiths = await getHadiths(book.slug);
  
  if (hadiths.length > 0) {
    const hadithIndex = dayOfYear % hadiths.length;
    return hadiths[hadithIndex];
  }

  return null;
};

// Clear memory cache (useful when testing)
export const clearMemoryCache = () => {
  versesMemoryCache.clear();
  hadithsMemoryCache.clear();
};
