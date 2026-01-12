import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { surahs } from "@/data/surahs";
import { duaCategories } from "@/data/duas";
import { getAllVerses, getHadithsByBook, getAllMasail, getAllDuas, LocalHadith, LocalMasail, LocalDua } from "@/services/offlineDataService";

const CACHE_KEY = "ai_search_cache";
const CACHE_EXPIRY_HOURS = 24;

// All hadith book slugs for offline search
const HADITH_BOOKS = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah", "malik"];

export interface SearchResult {
  type: "verse" | "hadith" | "dua" | "surah" | "masail";
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  arabic?: string;
  reference: string;
  link: string;
}

export interface AISearchResponse {
  answer: string;
  references: {
    verses: any[];
    hadiths: any[];
    duas: any[];
  };
  results: SearchResult[];
  isOffline: boolean;
  isCached?: boolean;
}

interface CachedSearch {
  query: string;
  language: Language;
  response: AISearchResponse;
  timestamp: number;
}

interface SearchCache {
  searches: CachedSearch[];
}

// Cache helpers
const getSearchCache = (): SearchCache => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error("Error reading search cache:", e);
  }
  return { searches: [] };
};

const saveToCache = (query: string, language: Language, response: AISearchResponse) => {
  try {
    const cache = getSearchCache();
    const normalizedQuery = query.toLowerCase().trim();
    
    // Remove old entry for same query if exists
    cache.searches = cache.searches.filter(
      s => !(s.query.toLowerCase().trim() === normalizedQuery && s.language === language)
    );
    
    // Add new entry
    cache.searches.push({
      query: normalizedQuery,
      language,
      response: { ...response, isCached: true },
      timestamp: Date.now()
    });
    
    // Keep only last 50 searches and remove expired ones
    const expiryTime = Date.now() - (CACHE_EXPIRY_HOURS * 60 * 60 * 1000);
    cache.searches = cache.searches
      .filter(s => s.timestamp > expiryTime)
      .slice(-50);
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error("Error saving to search cache:", e);
  }
};

const getFromCache = (query: string, language: Language): AISearchResponse | null => {
  try {
    const cache = getSearchCache();
    const normalizedQuery = query.toLowerCase().trim();
    const expiryTime = Date.now() - (CACHE_EXPIRY_HOURS * 60 * 60 * 1000);
    
    const cached = cache.searches.find(
      s => s.query === normalizedQuery && 
           s.language === language && 
           s.timestamp > expiryTime
    );
    
    if (cached) {
      return { ...cached.response, isCached: true };
    }
  } catch (e) {
    console.error("Error getting from search cache:", e);
  }
  return null;
};

// Check if user is online
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Helper to calculate relevance score
const calculateRelevance = (text: string, searchTerms: string[]): number => {
  if (!text) return 0;
  const lowerText = text.toLowerCase();
  let score = 0;
  
  for (const term of searchTerms) {
    if (lowerText.includes(term)) {
      score += 1;
      // Bonus for exact word match
      if (new RegExp(`\\b${term}\\b`, 'i').test(text)) {
        score += 0.5;
      }
    }
  }
  return score;
};

// Offline search using local data + IndexedDB
const searchLocalData = async (query: string, language: Language): Promise<SearchResult[]> => {
  const results: SearchResult[] = [];
  const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  
  if (searchTerms.length === 0) return results;

  // 1. Search surahs (static data)
  surahs.forEach(surah => {
    const matchesName = searchTerms.some(term => 
      surah.nameEnglish.toLowerCase().includes(term) ||
      surah.nameBengali.includes(term) ||
      surah.meaningEnglish.toLowerCase().includes(term) ||
      surah.meaningBengali.includes(term)
    );
    
    if (matchesName) {
      results.push({
        type: "surah",
        title: surah.nameEnglish,
        titleBn: surah.nameBengali,
        content: `${surah.meaningEnglish} - ${surah.totalVerses} verses`,
        contentBn: `${surah.meaningBengali} - ${surah.totalVerses} আয়াত`,
        arabic: surah.nameArabic,
        reference: `Surah ${surah.number}`,
        link: `/surah/${surah.number}`
      });
    }
  });

  // 2. Search IndexedDB duas first (has more complete data from database)
  try {
    const indexedDuas = await getAllDuas();
    const matchedDuas: { dua: LocalDua; score: number }[] = [];
    
    indexedDuas.forEach(dua => {
      const score = calculateRelevance(dua.title_english, searchTerms) +
                    calculateRelevance(dua.title_bengali, searchTerms) +
                    calculateRelevance(dua.english, searchTerms) +
                    calculateRelevance(dua.bengali, searchTerms);
      if (score > 0) {
        matchedDuas.push({ dua, score });
      }
    });
    
    // Sort by relevance and take top 5
    matchedDuas
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .forEach(({ dua }) => {
        results.push({
          type: "dua",
          title: dua.title_english,
          titleBn: dua.title_bengali,
          content: dua.english.substring(0, 150) + (dua.english.length > 150 ? "..." : ""),
          contentBn: dua.bengali.substring(0, 150) + (dua.bengali.length > 150 ? "..." : ""),
          arabic: dua.arabic,
          reference: dua.reference || dua.category_id,
          link: `/dua?category=${dua.category_id}`
        });
      });
  } catch (e) {
    console.log("IndexedDB duas not available, falling back to static data:", e);
    
    // 2b. Fallback to static duas data if IndexedDB is empty
    duaCategories.forEach(category => {
      category.duas.forEach(dua => {
        const matchesDua = searchTerms.some(term =>
          (dua.titleEnglish?.toLowerCase().includes(term)) ||
          (dua.titleBengali?.includes(term)) ||
          dua.english.toLowerCase().includes(term) ||
          dua.bengali.includes(term)
        );

        if (matchesDua) {
          results.push({
            type: "dua",
            title: dua.titleEnglish || category.nameEnglish,
            titleBn: dua.titleBengali || category.nameBengali,
            content: dua.english.substring(0, 150) + (dua.english.length > 150 ? "..." : ""),
            contentBn: dua.bengali.substring(0, 150) + (dua.bengali.length > 150 ? "..." : ""),
            arabic: dua.arabic,
            reference: dua.reference || category.nameEnglish,
            link: `/dua?category=${category.id}`
          });
        }
      });
    });
  }

  // 3. Search IndexedDB verses
  try {
    const verses = await getAllVerses();
    const matchedVerses: { verse: any; score: number }[] = [];
    
    verses.forEach(verse => {
      const score = calculateRelevance(verse.bengali, searchTerms) + 
                    calculateRelevance(verse.english, searchTerms);
      if (score > 0) {
        matchedVerses.push({ verse, score });
      }
    });
    
    // Sort by relevance and take top 5
    matchedVerses
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .forEach(({ verse }) => {
        results.push({
          type: "verse",
          title: `Surah ${verse.surahNumber}, Verse ${verse.verseNumber}`,
          titleBn: `সূরা ${verse.surahNumber}, আয়াত ${verse.verseNumber}`,
          content: verse.english?.substring(0, 150) + (verse.english?.length > 150 ? "..." : "") || "",
          contentBn: verse.bengali?.substring(0, 150) + (verse.bengali?.length > 150 ? "..." : "") || "",
          arabic: verse.arabic,
          reference: `${verse.surahNumber}:${verse.verseNumber}`,
          link: `/surah/${verse.surahNumber}?verse=${verse.verseNumber}`
        });
      });
  } catch (e) {
    console.log("Verses not available offline:", e);
  }

  // 4. Search IndexedDB hadiths
  try {
    const matchedHadiths: { hadith: LocalHadith; score: number; bookSlug: string }[] = [];
    
    for (const bookSlug of HADITH_BOOKS) {
      try {
        const hadiths = await getHadithsByBook(bookSlug);
        hadiths.forEach(hadith => {
          const score = calculateRelevance(hadith.bengali || "", searchTerms) + 
                        calculateRelevance(hadith.english || "", searchTerms);
          if (score > 0) {
            matchedHadiths.push({ hadith, score, bookSlug });
          }
        });
      } catch (e) {
        // Book not available offline
      }
    }
    
    // Sort by relevance and take top 5
    matchedHadiths
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .forEach(({ hadith, bookSlug }) => {
        const bookName = bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1);
        results.push({
          type: "hadith",
          title: `${bookName}, Hadith ${hadith.hadith_number}`,
          titleBn: `${bookName}, হাদিস ${hadith.hadith_number}`,
          content: hadith.english?.substring(0, 150) + (hadith.english && hadith.english.length > 150 ? "..." : "") || "",
          contentBn: hadith.bengali?.substring(0, 150) + (hadith.bengali && hadith.bengali.length > 150 ? "..." : "") || "",
          arabic: hadith.arabic || undefined,
          reference: hadith.grade || "",
          link: `/hadith/${bookSlug}?hadith=${hadith.hadith_number}`
        });
      });
  } catch (e) {
    console.log("Hadiths not available offline:", e);
  }

  // 5. Search IndexedDB masail
  try {
    const masailList = await getAllMasail();
    const matchedMasail: { masail: LocalMasail; score: number }[] = [];
    
    masailList.forEach(masail => {
      const score = calculateRelevance(masail.title, searchTerms) + 
                    calculateRelevance(masail.question || "", searchTerms) +
                    calculateRelevance(masail.answer, searchTerms);
      if (score > 0) {
        matchedMasail.push({ masail, score });
      }
    });
    
    // Sort by relevance and take top 5
    matchedMasail
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .forEach(({ masail }) => {
        results.push({
          type: "masail",
          title: masail.title,
          titleBn: masail.title,
          content: masail.answer?.substring(0, 150) + (masail.answer?.length > 150 ? "..." : "") || "",
          contentBn: masail.answer?.substring(0, 150) + (masail.answer?.length > 150 ? "..." : "") || "",
          reference: masail.category || "",
          link: `/masail/${masail.id}`
        });
      });
  } catch (e) {
    console.log("Masail not available offline:", e);
  }

  return results.slice(0, 20);
};

export const useAISearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AISearchResponse | null>(null);
  const isOnline = useOnlineStatus();

  const search = useCallback(async (query: string, language: Language) => {
    if (!query.trim()) {
      setError(language === "bn" ? "অনুসন্ধান শব্দ লিখুন" : "Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check cache first (works both online and offline)
      const cachedResponse = getFromCache(query, language);
      if (cachedResponse) {
        console.log("Returning cached search result");
        setResponse(cachedResponse);
        setIsLoading(false);
        return;
      }

      // If offline and no cache, use local data only
      if (!isOnline) {
        console.log("Offline mode: searching local data");
        const localResults = await searchLocalData(query, language);
        
        const offlineResponse: AISearchResponse = {
          answer: language === "bn" 
            ? "আপনি বর্তমানে অফলাইন। স্থানীয় ডেটা থেকে ফলাফল দেখানো হচ্ছে।"
            : "You are currently offline. Showing results from local data.",
          references: { verses: [], hadiths: [], duas: [] },
          results: localResults,
          isOffline: true
        };
        
        setResponse(offlineResponse);
        setIsLoading(false);
        return;
      }

      // Online: use AI search
      const { data, error: fnError } = await supabase.functions.invoke('ai-search', {
        body: { query, language }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        // Fallback to local search on AI error
        console.log("AI search failed, falling back to local search:", data.error);
        const localResults = await searchLocalData(query, language);
        
        const fallbackResponse: AISearchResponse = {
          answer: language === "bn"
            ? "AI সার্চ সাময়িকভাবে অনুপলব্ধ। স্থানীয় ফলাফল দেখানো হচ্ছে।"
            : "AI search temporarily unavailable. Showing local results.",
          references: { verses: [], hadiths: [], duas: [] },
          results: localResults,
          isOffline: true
        };
        
        setResponse(fallbackResponse);
        return;
      }

      // Convert API references to SearchResult format
      const results: SearchResult[] = [];

      // Add verses
      data.references?.verses?.forEach((v: any) => {
        results.push({
          type: "verse",
          title: `Surah ${v.surah_number}, Verse ${v.verse_number}`,
          titleBn: `সূরা ${v.surah_number}, আয়াত ${v.verse_number}`,
          content: v.english?.substring(0, 200) + "..." || "",
          contentBn: v.bengali?.substring(0, 200) + "..." || "",
          arabic: v.arabic,
          reference: `${v.surah_number}:${v.verse_number}`,
          link: `/surah/${v.surah_number}?verse=${v.verse_number}`
        });
      });

      // Add hadiths
      data.references?.hadiths?.forEach((h: any) => {
        results.push({
          type: "hadith",
          title: `${h.book_slug}, Hadith ${h.hadith_number}`,
          titleBn: `${h.book_slug}, হাদিস ${h.hadith_number}`,
          content: h.english?.substring(0, 200) + "..." || "",
          contentBn: h.bengali?.substring(0, 200) + "..." || "",
          arabic: h.arabic,
          reference: h.grade || "",
          link: `/hadith/${h.book_slug}?hadith=${h.hadith_number}`
        });
      });

      // Add duas
      data.references?.duas?.forEach((d: any) => {
        results.push({
          type: "dua",
          title: d.title_english || "Dua",
          titleBn: d.title_bengali || "দোয়া",
          content: d.english?.substring(0, 200) + "..." || "",
          contentBn: d.bengali?.substring(0, 200) + "..." || "",
          arabic: d.arabic,
          reference: d.category_id,
          link: `/dua?category=${d.category_id}`
        });
      });

      const aiResponse: AISearchResponse = {
        answer: data.answer,
        references: data.references,
        results,
        isOffline: false
      };

      // Cache the successful AI response
      saveToCache(query, language, aiResponse);
      
      setResponse(aiResponse);

    } catch (err) {
      console.error("Search error:", err);
      
      // Check cache again as fallback
      const cachedResponse = getFromCache(query, language);
      if (cachedResponse) {
        setResponse(cachedResponse);
        return;
      }
      
      // Fallback to local search on any error
      const localResults = await searchLocalData(query, language);
      
      if (localResults.length > 0) {
        setResponse({
          answer: language === "bn"
            ? "অনলাইন সার্চ ব্যর্থ হয়েছে। স্থানীয় ফলাফল দেখানো হচ্ছে।"
            : "Online search failed. Showing local results.",
          references: { verses: [], hadiths: [], duas: [] },
          results: localResults,
          isOffline: true
        });
      } else {
        setError(
          language === "bn"
            ? "অনুসন্ধান করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
            : "Search failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);

  const clear = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    search,
    clear,
    isLoading,
    error,
    response,
    isOnline
  };
};