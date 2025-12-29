import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DailyVerse {
  surahNumber: number;
  verseNumber: number;
  arabic: string;
  english: string;
  bengali: string;
  surahNameEnglish: string;
  surahNameBengali: string;
}

interface DailyDua {
  id: string;
  dua_id: string;
  category_id: string;
  title_english: string;
  title_bengali: string;
  arabic: string;
  english: string;
  bengali: string;
  reference: string | null;
  category_name_english: string;
  category_name_bengali: string;
}

interface DailyHadith {
  id: string;
  hadith_number: number;
  book_slug: string;
  arabic: string | null;
  english: string | null;
  bengali: string | null;
  narrator_english: string | null;
  narrator_bengali: string | null;
  grade: string | null;
  grade_bengali: string | null;
  book_name_english: string;
  book_name_bengali: string;
  book_name_arabic: string;
}

interface DailyContentCache {
  date: string;
  verse: DailyVerse | null;
  dua: DailyDua | null;
  hadith: DailyHadith | null;
}

const CACHE_KEY = 'daily-content-cache';

const getTodayKey = () => new Date().toISOString().split('T')[0];

const getDayOfYear = () => {
  const today = new Date();
  return Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
};

export const useDailyContent = () => {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [dua, setDua] = useState<DailyDua | null>(null);
  const [hadith, setHadith] = useState<DailyHadith | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      const today = getTodayKey();
      const dayOfYear = getDayOfYear();

      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache: DailyContentCache = JSON.parse(cached);
          if (parsedCache.date === today) {
            setVerse(parsedCache.verse);
            setDua(parsedCache.dua);
            setHadith(parsedCache.hadith);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }

      // Fetch all counts in parallel
      const [verseCountResult, duaCountResult, hadithCountResult] = await Promise.all([
        supabase.from('verses').select('*', { count: 'exact', head: true }),
        supabase.from('duas').select('*', { count: 'exact', head: true }),
        supabase.from('hadiths').select('*', { count: 'exact', head: true }),
      ]);

      const verseCount = verseCountResult.count || 0;
      const duaCount = duaCountResult.count || 0;
      const hadithCount = hadithCountResult.count || 0;

      // Calculate indices
      const verseIndex = verseCount > 0 ? dayOfYear % verseCount : 0;
      const duaIndex = duaCount > 0 ? dayOfYear % duaCount : 0;
      const hadithIndex = hadithCount > 0 ? dayOfYear % hadithCount : 0;

      // Fetch all content in parallel
      const [verseResult, duaResult, hadithResult] = await Promise.all([
        verseCount > 0
          ? supabase
              .from('verses')
              .select('surah_number, verse_number, arabic, english, bengali')
              .range(verseIndex, verseIndex)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
        duaCount > 0
          ? supabase
              .from('duas')
              .select('id, dua_id, category_id, title_english, title_bengali, arabic, english, bengali, reference')
              .order('category_id', { ascending: true })
              .order('dua_id', { ascending: true })
              .range(duaIndex, duaIndex)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
        hadithCount > 0
          ? supabase
              .from('hadiths')
              .select('id, hadith_number, book_slug, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali')
              .range(hadithIndex, hadithIndex)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
      ]);

      // Fetch related data (surah info, category info, book info) in parallel
      const surahPromise = verseResult.data
        ? supabase
            .from('surahs')
            .select('name_english, name_bengali')
            .eq('number', verseResult.data.surah_number)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null });

      const categoryPromise = duaResult.data
        ? supabase
            .from('dua_categories')
            .select('name_english, name_bengali')
            .eq('category_id', duaResult.data.category_id)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null });

      const bookPromise = hadithResult.data
        ? supabase
            .from('hadith_books')
            .select('name_english, name_bengali, name_arabic')
            .eq('slug', hadithResult.data.book_slug)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null });

      const [surahResult, categoryResult, bookResult] = await Promise.all([
        surahPromise,
        categoryPromise,
        bookPromise,
      ]);

      // Build final data
      let finalVerse: DailyVerse | null = null;
      let finalDua: DailyDua | null = null;
      let finalHadith: DailyHadith | null = null;

      if (verseResult.data) {
        finalVerse = {
          surahNumber: verseResult.data.surah_number,
          verseNumber: verseResult.data.verse_number,
          arabic: verseResult.data.arabic,
          english: verseResult.data.english,
          bengali: verseResult.data.bengali,
          surahNameEnglish: surahResult.data?.name_english || `Surah ${verseResult.data.surah_number}`,
          surahNameBengali: surahResult.data?.name_bengali || `সূরা ${verseResult.data.surah_number}`,
        };
      }

      if (duaResult.data && categoryResult.data) {
        finalDua = {
          ...duaResult.data,
          category_name_english: categoryResult.data.name_english,
          category_name_bengali: categoryResult.data.name_bengali,
        };
      }

      if (hadithResult.data && bookResult.data) {
        finalHadith = {
          ...hadithResult.data,
          book_name_english: bookResult.data.name_english,
          book_name_bengali: bookResult.data.name_bengali,
          book_name_arabic: bookResult.data.name_arabic,
        };
      }

      // Cache all content
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          date: today,
          verse: finalVerse,
          dua: finalDua,
          hadith: finalHadith,
        }));
      } catch {
        // Cache write failed, continue anyway
      }

      setVerse(finalVerse);
      setDua(finalDua);
      setHadith(finalHadith);
      setIsLoading(false);
    };

    fetchAllContent();
  }, []);

  return { verse, dua, hadith, isLoading };
};
