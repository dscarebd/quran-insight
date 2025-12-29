import { useState, useEffect } from "react";
import { getRandomVerse, getRandomHadith } from "@/services/bundledDataService";
import { surahs } from "@/data/surahs";
import { hadithBooks } from "@/data/hadithBooks";
import { duaCategories } from "@/data/duas";

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

const CACHE_KEY = 'daily-content-cache-v3'; // v3 for fully offline version

const getTodayKey = () => new Date().toISOString().split('T')[0];

const getDayOfYear = () => {
  const today = new Date();
  return Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
};

// Get random dua from local data based on day of year
const getRandomLocalDua = (dayOfYear: number): DailyDua | null => {
  // Flatten all duas from all categories
  const allDuas = duaCategories.flatMap(category => 
    category.duas.map(dua => ({
      id: dua.id,
      dua_id: dua.id,
      category_id: category.id,
      title_english: dua.titleEnglish || '',
      title_bengali: dua.titleBengali || '',
      arabic: dua.arabic,
      english: dua.english,
      bengali: dua.bengali,
      reference: dua.reference || null,
      category_name_english: category.nameEnglish,
      category_name_bengali: category.nameBengali,
    }))
  );
  
  if (allDuas.length === 0) return null;
  const index = dayOfYear % allDuas.length;
  return allDuas[index];
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

      // Get verse from local data
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

      // Get dua from local data
      let finalDua: DailyDua | null = null;
      try {
        finalDua = getRandomLocalDua(dayOfYear);
      } catch (error) {
        console.error("Error getting local dua:", error);
      }

      // Get hadith from local data
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

      // Update state
      setVerse(finalVerse);
      setDua(finalDua);
      setHadith(finalHadith);

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

      setIsLoading(false);
    };

    fetchAllContent();
  }, []);

  return { verse, dua, hadith, isLoading };
};
