// Bundled Data Loader - Loads data from JSON files bundled with the APK
// This ensures 100% offline functionality from first launch

import { Verse } from "@/data/verses";
import { LocalHadith } from "./offlineDataService";
import { hadithBooks } from "@/data/hadithBooks";

// Memory cache for loaded data
let versesData: Verse[] | null = null;
let hadithsData: LocalHadith[] | null = null;
let isLoading = false;
let loadPromise: Promise<void> | null = null;

// Indexed caches for fast lookups
const versesBySurah = new Map<number, Verse[]>();
const hadithsByBook = new Map<string, LocalHadith[]>();

// Parse CSV data to Verse objects
const parseVersesCsv = (csvText: string): Verse[] => {
  const lines = csvText.trim().split('\n');
  const verses: Verse[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // CSV parsing with semicolon delimiter and handling quoted fields
    const fields = parseCsvLine(line, ';');
    if (fields.length < 6) continue;
    
    const [, surahNumber, verseNumber, arabic, bengali, english, tafsirBengali, tafsirEnglish] = fields;
    
    verses.push({
      surahNumber: parseInt(surahNumber, 10),
      verseNumber: parseInt(verseNumber, 10),
      arabic: arabic || '',
      bengali: bengali || '',
      english: english || '',
      tafsirBengali: tafsirBengali || undefined,
      tafsirEnglish: tafsirEnglish || undefined,
    });
  }
  
  return verses;
};

// Parse a CSV line handling quoted fields
const parseCsvLine = (line: string, delimiter: string): string[] => {
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
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

// Load verses from CSV file
const loadVersesFromCsv = async (): Promise<Verse[]> => {
  try {
    const response = await fetch('/data/verses-complete.csv');
    if (!response.ok) {
      console.error('Failed to load verses CSV:', response.status);
      return [];
    }
    
    const csvText = await response.text();
    return parseVersesCsv(csvText);
  } catch (error) {
    console.error('Error loading verses from CSV:', error);
    return [];
  }
};

// Load hadiths from multiple book-specific JSON files
const loadHadithsFromJson = async (): Promise<LocalHadith[]> => {
  const allHadiths: LocalHadith[] = [];
  
  // Load each book's JSON file in parallel
  const loadPromises = hadithBooks.map(async (book) => {
    try {
      const response = await fetch(`/data/hadiths-${book.slug}.json`);
      if (!response.ok) {
        console.log(`Hadith file for ${book.slug} not found`);
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.log(`Error loading hadiths for ${book.slug}:`, error);
      return [];
    }
  });

  const results = await Promise.all(loadPromises);
  
  // Merge all hadiths
  results.forEach(bookHadiths => {
    allHadiths.push(...bookHadiths);
  });

  return allHadiths;
};

// Initialize data loading
export const initializeBundledData = async (): Promise<void> => {
  if (versesData && hadithsData) {
    return; // Already loaded
  }
  
  if (isLoading && loadPromise) {
    return loadPromise; // Return existing promise
  }
  
  isLoading = true;
  
  loadPromise = (async () => {
    console.log('Loading bundled data...');
    
    // Load both datasets in parallel
    const [verses, hadiths] = await Promise.all([
      loadVersesFromCsv(),
      loadHadithsFromJson()
    ]);
    
    versesData = verses;
    hadithsData = hadiths;
    
    // Build indexed caches
    verses.forEach(verse => {
      const existing = versesBySurah.get(verse.surahNumber) || [];
      existing.push(verse);
      versesBySurah.set(verse.surahNumber, existing);
    });
    
    // Sort verses by verse number within each surah
    versesBySurah.forEach((verses, surahNum) => {
      verses.sort((a, b) => a.verseNumber - b.verseNumber);
      versesBySurah.set(surahNum, verses);
    });
    
    hadiths.forEach(hadith => {
      const existing = hadithsByBook.get(hadith.book_slug) || [];
      existing.push(hadith);
      hadithsByBook.set(hadith.book_slug, existing);
    });
    
    // Sort hadiths by number within each book
    hadithsByBook.forEach((hadiths, bookSlug) => {
      hadiths.sort((a, b) => a.hadith_number - b.hadith_number);
      hadithsByBook.set(bookSlug, hadiths);
    });
    
    console.log(`Loaded ${verses.length} verses and ${hadiths.length} hadiths from bundled data`);
    isLoading = false;
  })();
  
  return loadPromise;
};

// Get verses for a specific surah
export const getBundledVerses = (surahNumber: number): Verse[] => {
  return versesBySurah.get(surahNumber) || [];
};

// Get hadiths for a specific book
export const getBundledHadiths = (bookSlug: string): LocalHadith[] => {
  return hadithsByBook.get(bookSlug) || [];
};

// Get all verses (for search, etc.)
export const getAllBundledVerses = (): Verse[] => {
  return versesData || [];
};

// Get all hadiths (for search, etc.)
export const getAllBundledHadiths = (): LocalHadith[] => {
  return hadithsData || [];
};

// Get a random verse for daily content
export const getRandomBundledVerse = (dayOfYear: number): Verse | null => {
  if (!versesData || versesData.length === 0) return null;
  const index = dayOfYear % versesData.length;
  return versesData[index];
};

// Get a random hadith for daily content
export const getRandomBundledHadith = (dayOfYear: number): LocalHadith | null => {
  if (!hadithsData || hadithsData.length === 0) return null;
  const index = dayOfYear % hadithsData.length;
  return hadithsData[index];
};

// Check if bundled data is loaded
export const isBundledDataLoaded = (): boolean => {
  return versesData !== null && versesData.length > 0;
};

// Check if hadiths are loaded
export const isHadithsDataLoaded = (): boolean => {
  return hadithsData !== null && hadithsData.length > 0;
};

// Get loading status
export const getBundledDataStatus = (): { versesCount: number; hadithsCount: number; isLoading: boolean } => {
  return {
    versesCount: versesData?.length || 0,
    hadithsCount: hadithsData?.length || 0,
    isLoading
  };
};
