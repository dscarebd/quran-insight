import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight, Bookmark } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface DailyVerseProps {
  language: Language;
}

interface CachedVerse {
  date: string;
  verse: {
    surahNumber: number;
    verseNumber: number;
    arabic: string;
    english: string;
    bengali: string;
    surahNameEnglish: string;
    surahNameBengali: string;
  };
}

const CACHE_KEY = 'daily-verse-cache';

export const DailyVerse = ({ language }: DailyVerseProps) => {
  const [verse, setVerse] = useState<CachedVerse['verse'] | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDailyVerse = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsedCache: CachedVerse = JSON.parse(cached);
          if (parsedCache.date === today && parsedCache.verse) {
            setVerse(parsedCache.verse);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // Fetch from database
      try {
        // Get total verse count
        const { count } = await supabase
          .from('verses')
          .select('*', { count: 'exact', head: true });

        if (!count) {
          setIsLoading(false);
          return;
        }

        // Get a deterministic "random" verse based on day of year
        const dayOfYear = Math.floor(
          (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
        );
        const verseIndex = dayOfYear % count;

        // Fetch the verse
        const { data: verseData, error: verseError } = await supabase
          .from('verses')
          .select('surah_number, verse_number, arabic, english, bengali')
          .range(verseIndex, verseIndex)
          .maybeSingle();

        if (verseError || !verseData) {
          console.error('Error fetching verse:', verseError);
          setIsLoading(false);
          return;
        }

        // Fetch surah info
        const { data: surahData, error: surahError } = await supabase
          .from('surahs')
          .select('name_english, name_bengali')
          .eq('number', verseData.surah_number)
          .maybeSingle();

        if (surahError) {
          console.error('Error fetching surah:', surahError);
        }

        const verseToCache: CachedVerse['verse'] = {
          surahNumber: verseData.surah_number,
          verseNumber: verseData.verse_number,
          arabic: verseData.arabic,
          english: verseData.english,
          bengali: verseData.bengali,
          surahNameEnglish: surahData?.name_english || `Surah ${verseData.surah_number}`,
          surahNameBengali: surahData?.name_bengali || `সূরা ${verseData.surah_number}`,
        };

        // Cache the verse
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          date: today,
          verse: verseToCache,
        }));

        setVerse(verseToCache);
      } catch (error) {
        console.error('Error fetching daily verse:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  const handleReferenceClick = () => {
    if (verse) {
      navigate(`/surah/${verse.surahNumber}#verse-${verse.verseNumber}`);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="mb-4 flex items-center justify-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
            {language === "bn" ? "আজকের আয়াত" : "Verse of the Day"}
          </span>
        </div>
        <div className="verse-card">
          <Skeleton className="mx-auto mb-4 h-8 w-3/4" />
          <Skeleton className="mx-auto mb-4 h-16 w-full" />
          <Skeleton className="mx-auto h-10 w-40" />
        </div>
      </div>
    );
  }

  if (!verse) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
      {/* Label */}
      <div className="mb-4 flex items-center justify-center gap-2 text-primary">
        <Sparkles className="h-4 w-4" />
        <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
          {language === "bn" ? "আজকের আয়াত" : "Verse of the Day"}
        </span>
      </div>

      {/* Verse Card */}
      <div className="verse-card group">
        {/* Bookmark Button */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-primary group-hover:opacity-100"
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
        </button>

        {/* Arabic Text */}
        <p className="mb-4 text-center font-arabic text-scale-arabic-xl text-foreground">
          {verse.arabic}
        </p>

        {/* Translation */}
        <p className={cn("mb-4 text-center text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? verse.bengali : verse.english}
        </p>

        {/* Reference */}
        <button 
          onClick={handleReferenceClick}
          className={cn(
            "mx-auto flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
            language === "bn" && "font-bengali"
          )}
        >
          {language === "bn" 
            ? `${verse.surahNameBengali}: ${formatNumber(verse.verseNumber, language)}` 
            : `${verse.surahNameEnglish}: ${verse.verseNumber}`}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
