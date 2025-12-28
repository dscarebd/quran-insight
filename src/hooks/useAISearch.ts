import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { surahs } from "@/data/surahs";
import { duaCategories } from "@/data/duas";

export interface SearchResult {
  type: "verse" | "hadith" | "dua" | "surah";
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
}

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

// Offline search using local data
const searchLocalData = (query: string, language: Language): SearchResult[] => {
  const results: SearchResult[] = [];
  const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  
  if (searchTerms.length === 0) return results;

  // Search surahs
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

  // Search duas
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
          content: dua.english.substring(0, 150) + "...",
          contentBn: dua.bengali.substring(0, 150) + "...",
          arabic: dua.arabic,
          reference: dua.reference || category.nameEnglish,
          link: `/dua?category=${category.id}`
        });
      }
    });
  });

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
      // If offline, use local data only
      if (!isOnline) {
        console.log("Offline mode: searching local data");
        const localResults = searchLocalData(query, language);
        
        setResponse({
          answer: language === "bn" 
            ? "আপনি বর্তমানে অফলাইন। স্থানীয় ডেটা থেকে ফলাফল দেখানো হচ্ছে।"
            : "You are currently offline. Showing results from local data.",
          references: { verses: [], hadiths: [], duas: [] },
          results: localResults,
          isOffline: true
        });
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
        const localResults = searchLocalData(query, language);
        
        setResponse({
          answer: language === "bn"
            ? "AI সার্চ সাময়িকভাবে অনুপলব্ধ। স্থানীয় ফলাফল দেখানো হচ্ছে।"
            : "AI search temporarily unavailable. Showing local results.",
          references: { verses: [], hadiths: [], duas: [] },
          results: localResults,
          isOffline: true
        });
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

      setResponse({
        answer: data.answer,
        references: data.references,
        results,
        isOffline: false
      });

    } catch (err) {
      console.error("Search error:", err);
      
      // Fallback to local search on any error
      const localResults = searchLocalData(query, language);
      
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