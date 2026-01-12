// Bundled Data Loader - Loads data from JSON files bundled with the APK
// This ensures 100% offline functionality from first launch

import { Verse } from "@/data/verses";
import { LocalHadith, LocalMasail } from "./offlineDataService";
import { hadithBooks } from "@/data/hadithBooks";

// Types for bundled duas
export interface BundledDua {
  dua_id: string;
  category_id: string;
  title_english: string;
  title_bengali: string;
  title_hindi: string;
  arabic: string;
  english: string;
  bengali: string;
  hindi: string;
  transliteration: string;
  transliteration_bengali: string;
  transliteration_hindi: string;
  reference: string;
}

export interface BundledDuaCategory {
  category_id: string;
  name_english: string;
  name_bengali: string;
  name_hindi: string;
  icon: string;
  display_order: number;
}

// Re-export LocalMasail type for consistency
export type BundledMasail = LocalMasail;

// Memory cache for loaded data
let versesData: Verse[] | null = null;
let hadithsData: LocalHadith[] | null = null;
let duasData: BundledDua[] | null = null;
let duaCategoriesData: BundledDuaCategory[] | null = null;
let masailData: BundledMasail[] | null = null;

// Separate loading state for verses, hadiths, duas and masail
let isVersesLoading = false;
let isHadithsLoading = false;
let isDuasLoading = false;
let isMasailLoading = false;
let versesLoadPromise: Promise<void> | null = null;
let hadithsLoadPromise: Promise<void> | null = null;
let duasLoadPromise: Promise<void> | null = null;
let masailLoadPromise: Promise<void> | null = null;

// Indexed caches for fast lookups
const versesBySurah = new Map<number, Verse[]>();
const hadithsByBook = new Map<string, LocalHadith[]>();
const duasByCategory = new Map<string, BundledDua[]>();
const masailByCategory = new Map<string, BundledMasail[]>();
const masailByAuthor = new Map<string, BundledMasail[]>();

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

// Define which books are split into multiple parts
const splitBooks: Record<string, number> = {
  bukhari: 2, // hadiths-bukhari-1.json, hadiths-bukhari-2.json
  muslim: 2,  // hadiths-muslim-1.json, hadiths-muslim-2.json
};

// Load hadiths for a single book (or book part)
const loadSingleHadithFile = async (filePath: string): Promise<LocalHadith[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.log(`Hadith file not found: ${filePath}`);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(`Error loading hadiths from ${filePath}:`, error);
    return [];
  }
};

// Load hadiths from multiple book-specific JSON files
const loadHadithsFromJson = async (): Promise<LocalHadith[]> => {
  const allHadiths: LocalHadith[] = [];
  
  // Build list of files to load
  const filesToLoad: string[] = [];
  
  hadithBooks.forEach((book) => {
    const numParts = splitBooks[book.slug];
    
    if (numParts) {
      // Split book - load each part
      for (let part = 1; part <= numParts; part++) {
        filesToLoad.push(`/data/hadiths-${book.slug}-${part}.json`);
      }
    } else {
      // Single file book
      filesToLoad.push(`/data/hadiths-${book.slug}.json`);
    }
  });

  // Load all files in parallel
  const results = await Promise.all(filesToLoad.map(loadSingleHadithFile));
  
  // Merge all hadiths
  results.forEach(bookHadiths => {
    allHadiths.push(...bookHadiths);
  });

  return allHadiths;
};

// Initialize ONLY verses data (fast - ~500ms-1s)
export const initializeVersesData = async (): Promise<void> => {
  if (versesData) {
    return; // Already loaded
  }
  
  if (isVersesLoading && versesLoadPromise) {
    return versesLoadPromise; // Return existing promise
  }
  
  isVersesLoading = true;
  
  versesLoadPromise = (async () => {
    console.log('Loading verses data...');
    const startTime = performance.now();
    
    const verses = await loadVersesFromCsv();
    versesData = verses;
    
    // Build indexed cache
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
    
    const loadTime = Math.round(performance.now() - startTime);
    console.log(`Loaded ${verses.length} verses in ${loadTime}ms`);
    isVersesLoading = false;
  })();
  
  return versesLoadPromise;
};

// Initialize ONLY hadiths data (slower - ~2-5s)
export const initializeHadithsData = async (): Promise<void> => {
  if (hadithsData) {
    return; // Already loaded
  }
  
  if (isHadithsLoading && hadithsLoadPromise) {
    return hadithsLoadPromise; // Return existing promise
  }
  
  isHadithsLoading = true;
  
  hadithsLoadPromise = (async () => {
    console.log('Loading hadiths data...');
    const startTime = performance.now();
    
    const hadiths = await loadHadithsFromJson();
    hadithsData = hadiths;
    
    // Build indexed cache
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
    
    const loadTime = Math.round(performance.now() - startTime);
    console.log(`Loaded ${hadiths.length} hadiths in ${loadTime}ms`);
    isHadithsLoading = false;
  })();
  
  return hadithsLoadPromise;
};

// Load duas from JSON files
const loadDuasFromJson = async (): Promise<{ duas: BundledDua[]; categories: BundledDuaCategory[] }> => {
  try {
    const [duasResponse, categoriesResponse] = await Promise.all([
      fetch('/data/duas-complete.json'),
      fetch('/data/duas-categories.json')
    ]);
    
    if (!duasResponse.ok || !categoriesResponse.ok) {
      console.error('Failed to load duas JSON files');
      return { duas: [], categories: [] };
    }
    
    const duas = await duasResponse.json();
    const categories = await categoriesResponse.json();
    
    return { 
      duas: Array.isArray(duas) ? duas : [], 
      categories: Array.isArray(categories) ? categories : [] 
    };
  } catch (error) {
    console.error('Error loading duas from JSON:', error);
    return { duas: [], categories: [] };
  }
};

// Initialize ONLY duas data
export const initializeDuasData = async (): Promise<void> => {
  if (duasData) {
    return; // Already loaded
  }
  
  if (isDuasLoading && duasLoadPromise) {
    return duasLoadPromise; // Return existing promise
  }
  
  isDuasLoading = true;
  
  duasLoadPromise = (async () => {
    console.log('Loading duas data...');
    const startTime = performance.now();
    
    const { duas, categories } = await loadDuasFromJson();
    duasData = duas;
    duaCategoriesData = categories;
    
    // Build indexed cache by category
    duas.forEach(dua => {
      const existing = duasByCategory.get(dua.category_id) || [];
      existing.push(dua);
      duasByCategory.set(dua.category_id, existing);
    });
    
    const loadTime = Math.round(performance.now() - startTime);
    console.log(`Loaded ${duas.length} duas and ${categories.length} categories in ${loadTime}ms`);
    isDuasLoading = false;
  })();
  
  return duasLoadPromise;
};

// Load masail from JSON file
const loadMasailFromJson = async (): Promise<BundledMasail[]> => {
  try {
    const response = await fetch('/data/masail-complete.json');
    if (!response.ok) {
      console.error('Failed to load masail JSON file');
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error loading masail from JSON:', error);
    return [];
  }
};

// Initialize ONLY masail data
export const initializeMasailData = async (): Promise<void> => {
  if (masailData) {
    return; // Already loaded
  }
  
  if (isMasailLoading && masailLoadPromise) {
    return masailLoadPromise; // Return existing promise
  }
  
  isMasailLoading = true;
  
  masailLoadPromise = (async () => {
    console.log('Loading masail data...');
    const startTime = performance.now();
    
    const masail = await loadMasailFromJson();
    masailData = masail;
    
    // Build indexed caches by category and author
    masail.forEach(m => {
      if (m.category) {
        const existingCategory = masailByCategory.get(m.category) || [];
        existingCategory.push(m);
        masailByCategory.set(m.category, existingCategory);
      }
      if (m.author) {
        const existingAuthor = masailByAuthor.get(m.author) || [];
        existingAuthor.push(m);
        masailByAuthor.set(m.author, existingAuthor);
      }
    });
    
    const loadTime = Math.round(performance.now() - startTime);
    console.log(`Loaded ${masail.length} masail in ${loadTime}ms`);
    isMasailLoading = false;
  })();
  
  return masailLoadPromise;
};

// Initialize ALL data (for backward compatibility and preloading)
export const initializeBundledData = async (): Promise<void> => {
  // Start all loads in parallel
  await Promise.all([
    initializeVersesData(),
    initializeHadithsData(),
    initializeDuasData(),
    initializeMasailData()
  ]);
};

// Get verses for a specific surah
export const getBundledVerses = (surahNumber: number): Verse[] => {
  return versesBySurah.get(surahNumber) || [];
};

// Get hadiths for a specific book
export const getBundledHadiths = (bookSlug: string): LocalHadith[] => {
  return hadithsByBook.get(bookSlug) || [];
};

// Get duas for a specific category
export const getBundledDuas = (categoryId: string): BundledDua[] => {
  return duasByCategory.get(categoryId) || [];
};

// Get all dua categories
export const getBundledDuaCategories = (): BundledDuaCategory[] => {
  return duaCategoriesData || [];
};

// Get all verses (for search, etc.)
export const getAllBundledVerses = (): Verse[] => {
  return versesData || [];
};

// Get all hadiths (for search, etc.)
export const getAllBundledHadiths = (): LocalHadith[] => {
  return hadithsData || [];
};

// Get all duas (for search, etc.)
export const getAllBundledDuas = (): BundledDua[] => {
  return duasData || [];
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

// Get a random dua for daily content
export const getRandomBundledDua = (dayOfYear: number): BundledDua | null => {
  if (!duasData || duasData.length === 0) return null;
  const index = dayOfYear % duasData.length;
  return duasData[index];
};

// Get masail for a specific category
export const getBundledMasailByCategory = (category: string): BundledMasail[] => {
  return masailByCategory.get(category) || [];
};

// Get masail for a specific author
export const getBundledMasailByAuthor = (author: string): BundledMasail[] => {
  return masailByAuthor.get(author) || [];
};

// Get all masail
export const getAllBundledMasail = (): BundledMasail[] => {
  return masailData || [];
};

// Get masail by ID
export const getBundledMasailById = (id: string): BundledMasail | null => {
  if (!masailData) return null;
  return masailData.find(m => m.id === id) || null;
};

// Get unique categories from masail
export const getBundledMasailCategories = (): string[] => {
  return Array.from(masailByCategory.keys()).sort();
};

// Get unique authors from masail
export const getBundledMasailAuthors = (): string[] => {
  return Array.from(masailByAuthor.keys()).sort();
};

// Check if bundled data is loaded
export const isBundledDataLoaded = (): boolean => {
  return versesData !== null && versesData.length > 0;
};

// Check if hadiths are loaded
export const isHadithsDataLoaded = (): boolean => {
  return hadithsData !== null && hadithsData.length > 0;
};

// Check if duas are loaded
export const isDuasDataLoaded = (): boolean => {
  return duasData !== null && duasData.length > 0;
};

// Check if masail are loaded
export const isMasailDataLoaded = (): boolean => {
  return masailData !== null && masailData.length > 0;
};

// Get loading status
export const getBundledDataStatus = (): { 
  versesCount: number; 
  hadithsCount: number; 
  duasCount: number;
  duaCategoriesCount: number;
  masailCount: number;
  isLoading: boolean;
} => {
  return {
    versesCount: versesData?.length || 0,
    hadithsCount: hadithsData?.length || 0,
    duasCount: duasData?.length || 0,
    duaCategoriesCount: duaCategoriesData?.length || 0,
    masailCount: masailData?.length || 0,
    isLoading: isVersesLoading || isHadithsLoading || isDuasLoading || isMasailLoading
  };
};

// Add new masail to the memory cache (for incremental sync)
export const addMasailToCache = (newMasail: BundledMasail[]): void => {
  if (!masailData) {
    masailData = [];
  }
  
  newMasail.forEach(m => {
    // Check if already exists
    const existingIndex = masailData!.findIndex(existing => existing.id === m.id);
    if (existingIndex >= 0) {
      // Update existing
      masailData![existingIndex] = m;
    } else {
      // Add new
      masailData!.push(m);
    }
    
    // Update category index
    if (m.category) {
      const existingCategory = masailByCategory.get(m.category) || [];
      const categoryIndex = existingCategory.findIndex(existing => existing.id === m.id);
      if (categoryIndex >= 0) {
        existingCategory[categoryIndex] = m;
      } else {
        existingCategory.push(m);
      }
      masailByCategory.set(m.category, existingCategory);
    }
    
    // Update author index
    if (m.author) {
      const existingAuthor = masailByAuthor.get(m.author) || [];
      const authorIndex = existingAuthor.findIndex(existing => existing.id === m.id);
      if (authorIndex >= 0) {
        existingAuthor[authorIndex] = m;
      } else {
        existingAuthor.push(m);
      }
      masailByAuthor.set(m.author, existingAuthor);
    }
  });
  
  // Sort by created_at descending
  masailData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};
