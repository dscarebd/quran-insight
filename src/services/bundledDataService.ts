// Bundled Data Service - Uses bundled JSON/CSV files with fallback to Supabase
// This service ensures 100% offline functionality from first launch

import { Verse } from "@/data/verses";
import { LocalHadith } from "./offlineDataService";
import { 
  initializeBundledData,
  initializeVersesData,
  initializeHadithsData,
  getBundledVerses,
  getBundledHadiths,
  getRandomBundledVerse,
  getRandomBundledHadith,
  isBundledDataLoaded,
  isHadithsDataLoaded,
  getAllBundledVerses,
  getAllBundledHadiths
} from "./bundledDataLoader";
import { supabase } from "@/integrations/supabase/client";
import { surahs } from "@/data/surahs";
import { hadithBooks } from "@/data/hadithBooks";

// Get verses for a surah - uses bundled data with Supabase fallback
export const getVerses = async (surahNumber: number): Promise<Verse[]> => {
  // Only load verses data (fast ~500ms), don't wait for hadiths
  await initializeVersesData();
  
  // Get from bundled data
  const verses = getBundledVerses(surahNumber);
  
  if (verses.length > 0) {
    return verses;
  }
  
  // Fallback to Supabase if bundled data not available
  try {
    const { data, error } = await supabase
      .from("verses")
      .select("surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english")
      .eq("surah_number", surahNumber)
      .order("verse_number", { ascending: true });

    if (error) throw error;
    if (!data) return [];

    return data.map(v => ({
      surahNumber: v.surah_number,
      verseNumber: v.verse_number,
      arabic: v.arabic,
      bengali: v.bengali,
      english: v.english,
      tafsirBengali: v.tafsir_bengali || undefined,
      tafsirEnglish: v.tafsir_english || undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch verses from Supabase:", error);
    return [];
  }
};

// Get hadiths for a book - uses bundled data with Supabase fallback
export const getHadiths = async (bookSlug: string): Promise<LocalHadith[]> => {
  // Only load hadiths data, don't wait for verses
  await initializeHadithsData();
  
  // Get from bundled data
  const hadiths = getBundledHadiths(bookSlug);
  
  if (hadiths.length > 0) {
    return hadiths;
  }
  
  // Fallback to Supabase if bundled data not available
  try {
    const allHadiths: LocalHadith[] = [];
    let offset = 0;
    const batchSize = 1000;

    while (true) {
      const { data, error } = await supabase
        .from("hadiths")
        .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
        .eq("book_slug", bookSlug)
        .order("hadith_number", { ascending: true })
        .range(offset, offset + batchSize - 1);

      if (error) throw error;
      if (!data || data.length === 0) break;

      allHadiths.push(...(data as LocalHadith[]));
      offset += data.length;

      if (data.length < batchSize) break;
    }

    return allHadiths;
  } catch (error) {
    console.error("Failed to fetch hadiths from Supabase:", error);
    return [];
  }
};

// Get a random verse for daily content
export const getRandomVerse = async (dayOfYear: number): Promise<Verse | null> => {
  await initializeVersesData();
  
  const verse = getRandomBundledVerse(dayOfYear);
  if (verse) return verse;
  
  // Fallback to Supabase
  try {
    const { count } = await supabase
      .from('verses')
      .select('*', { count: 'exact', head: true });
    
    if (!count) return null;
    
    const index = dayOfYear % count;
    const { data } = await supabase
      .from('verses')
      .select('surah_number, verse_number, arabic, bengali, english, tafsir_bengali, tafsir_english')
      .range(index, index)
      .maybeSingle();
    
    if (!data) return null;
    
    return {
      surahNumber: data.surah_number,
      verseNumber: data.verse_number,
      arabic: data.arabic,
      bengali: data.bengali,
      english: data.english,
      tafsirBengali: data.tafsir_bengali || undefined,
      tafsirEnglish: data.tafsir_english || undefined,
    };
  } catch {
    return null;
  }
};

// Get a random hadith for daily content
export const getRandomHadith = async (dayOfYear: number): Promise<LocalHadith | null> => {
  await initializeHadithsData();
  
  const hadith = getRandomBundledHadith(dayOfYear);
  if (hadith) return hadith;
  
  // Fallback to Supabase
  try {
    const { count } = await supabase
      .from('hadiths')
      .select('*', { count: 'exact', head: true });
    
    if (!count) return null;
    
    const index = dayOfYear % count;
    const { data } = await supabase
      .from('hadiths')
      .select('book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali')
      .range(index, index)
      .maybeSingle();
    
    if (!data) return null;
    
    return data as LocalHadith;
  } catch {
    return null;
  }
};

// Check if bundled data is loaded
export const isDataLoaded = (): boolean => {
  return isBundledDataLoaded();
};

// Check if hadith data is loaded
export const isHadithDataLoaded = (): boolean => {
  return isHadithsDataLoaded();
};

// Get all verses (for search)
export const getAllVerses = async (): Promise<Verse[]> => {
  await initializeVersesData();
  return getAllBundledVerses();
};

// Get all hadiths (for search)
export const getAllHadiths = async (): Promise<LocalHadith[]> => {
  await initializeHadithsData();
  return getAllBundledHadiths();
};

// Backward compatibility - no-op since we use bundled data
export const syncAllDataInBackground = async (): Promise<void> => {
  await initializeBundledData();
};

// Clear memory cache (no-op, memory cache is in bundledDataLoader)
export const clearMemoryCache = () => {
  // Bundled data loader doesn't support clearing yet
};
