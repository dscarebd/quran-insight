import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getRandomVerse, getRandomHadith } from "@/services/bundledDataService";
import { surahs } from "@/data/surahs";
import { hadithBooks } from "@/data/hadithBooks";

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

      // Try to get verse from local data first
      let finalVerse: DailyVerse | null = null;
      try {
        const localVerse = await getRandomVerse(dayOfYear);
        if (localVerse) {
          const surah = surahs.find(s => s.number === localVerse.surahNumber);
          finalVerse = {
            surahNumber: localVerse.surahNumber,
            verseNumber: localVerse.verseNumber,
            arabic: localVerse.arabic,
            english: localVerse.english,
            bengali: localVerse.bengali,
            surahNameEnglish: surah?.nameEnglish || `Surah ${localVerse.surahNumber}`,
            surahNameBengali: surah?.nameBengali || `সূরা ${localVerse.surahNumber}`,
          };
        }
      } catch (error) {
        console.error("Error getting local verse:", error);
      }

      // Try to get hadith from local data first
      let finalHadith: DailyHadith | null = null;
      try {
        const localHadith = await getRandomHadith(dayOfYear);
        if (localHadith) {
          const book = hadithBooks.find(b => b.slug === localHadith.book_slug);
          finalHadith = {
            id: `${localHadith.book_slug}-${localHadith.hadith_number}`,
            hadith_number: localHadith.hadith_number,
            book_slug: localHadith.book_slug,
            arabic: localHadith.arabic,
            english: localHadith.english,
            bengali: localHadith.bengali,
            narrator_english: localHadith.narrator_english,
            narrator_bengali: localHadith.narrator_bengali,
            grade: localHadith.grade,
            grade_bengali: localHadith.grade_bengali,
            book_name_english: book?.name_english || localHadith.book_slug,
            book_name_bengali: book?.name_bengali || localHadith.book_slug,
            book_name_arabic: book?.name_arabic || "",
          };
        }
      } catch (error) {
        console.error("Error getting local hadith:", error);
      }

      // If no local data, fall back to Supabase
      if (!finalVerse || !finalHadith) {
        try {
          // Fetch counts
          const [verseCountResult, duaCountResult, hadithCountResult] = await Promise.all([
            !finalVerse ? supabase.from('verses').select('*', { count: 'exact', head: true }) : Promise.resolve({ count: 0 }),
            supabase.from('duas').select('*', { count: 'exact', head: true }),
            !finalHadith ? supabase.from('hadiths').select('*', { count: 'exact', head: true }) : Promise.resolve({ count: 0 }),
          ]);

          const verseCount = (verseCountResult as any).count || 0;
          const duaCount = duaCountResult.count || 0;
          const hadithCount = (hadithCountResult as any).count || 0;

          // Calculate indices
          const verseIndex = verseCount > 0 ? dayOfYear % verseCount : 0;
          const duaIndex = duaCount > 0 ? dayOfYear % duaCount : 0;
          const hadithIndex = hadithCount > 0 ? dayOfYear % hadithCount : 0;

          // Fetch content
          const [verseResult, duaResult, hadithResult] = await Promise.all([
            !finalVerse && verseCount > 0
              ? supabase.from('verses').select('surah_number, verse_number, arabic, english, bengali').range(verseIndex, verseIndex).maybeSingle()
              : Promise.resolve({ data: null }),
            duaCount > 0
              ? supabase.from('duas').select('id, dua_id, category_id, title_english, title_bengali, arabic, english, bengali, reference').order('category_id').order('dua_id').range(duaIndex, duaIndex).maybeSingle()
              : Promise.resolve({ data: null }),
            !finalHadith && hadithCount > 0
              ? supabase.from('hadiths').select('id, hadith_number, book_slug, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali').range(hadithIndex, hadithIndex).maybeSingle()
              : Promise.resolve({ data: null }),
          ]);

          // Process verse
          if (!finalVerse && verseResult.data) {
            const surah = surahs.find(s => s.number === verseResult.data.surah_number);
            finalVerse = {
              surahNumber: verseResult.data.surah_number,
              verseNumber: verseResult.data.verse_number,
              arabic: verseResult.data.arabic,
              english: verseResult.data.english,
              bengali: verseResult.data.bengali,
              surahNameEnglish: surah?.nameEnglish || `Surah ${verseResult.data.surah_number}`,
              surahNameBengali: surah?.nameBengali || `সূরা ${verseResult.data.surah_number}`,
            };
          }

          // Process dua
          if (duaResult.data) {
            const { data: categoryData } = await supabase
              .from('dua_categories')
              .select('name_english, name_bengali')
              .eq('category_id', duaResult.data.category_id)
              .maybeSingle();

            if (categoryData) {
              setDua({
                ...duaResult.data,
                category_name_english: categoryData.name_english,
                category_name_bengali: categoryData.name_bengali,
              });
            }
          }

          // Process hadith
          if (!finalHadith && hadithResult.data) {
            const book = hadithBooks.find(b => b.slug === hadithResult.data.book_slug);
            finalHadith = {
              ...hadithResult.data,
              book_name_english: book?.name_english || hadithResult.data.book_slug,
              book_name_bengali: book?.name_bengali || hadithResult.data.book_slug,
              book_name_arabic: book?.name_arabic || "",
            };
          }
        } catch (error) {
          console.error("Supabase fallback error:", error);
        }
      }

      // Cache all content
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          date: today,
          verse: finalVerse,
          dua: dua,
          hadith: finalHadith,
        }));
      } catch {
        // Cache write failed, continue anyway
      }

      setVerse(finalVerse);
      setHadith(finalHadith);
      setIsLoading(false);
    };

    fetchAllContent();
  }, []);

  return { verse, dua, hadith, isLoading };
};
