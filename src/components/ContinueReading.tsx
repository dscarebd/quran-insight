import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { quranPages, getPageByNumber } from "@/data/pages";

interface ContinueReadingProps {
  language: "bn" | "en";
}

export const ContinueReading = ({ language }: ContinueReadingProps) => {
  const navigate = useNavigate();
  const [lastRead, setLastRead] = useState<{
    page: number;
    surahNumber: number;
    verseNumber: number;
  } | null>(null);

  useEffect(() => {
    const lastReadPage = localStorage.getItem("quran-last-read-page");
    const lastReadVerse = localStorage.getItem("quran-last-read-verse");
    
    if (lastReadPage) {
      const page = parseInt(lastReadPage);
      const pageData = getPageByNumber(page);
      
      let surahNumber = pageData?.startSurah || 1;
      let verseNumber = pageData?.startVerse || 1;
      
      // If we have a more specific last read verse, use it
      if (lastReadVerse) {
        const parts = lastReadVerse.split("-");
        if (parts.length >= 3) {
          surahNumber = parseInt(parts[1]);
          verseNumber = parseInt(parts[2]);
        }
      }
      
      setLastRead({
        page,
        surahNumber,
        verseNumber,
      });
    }
  }, []);

  if (!lastRead) return null;

  const surah = surahs.find(s => s.number === lastRead.surahNumber);
  if (!surah) return null;

  const handleContinue = () => {
    navigate(`/read/${lastRead.page}`);
  };

  return (
    <button
      onClick={handleContinue}
      className="w-full flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-all duration-200 group mb-6"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <BookOpen className="h-6 w-6" />
      </div>
      
      <div className="flex-1 text-left min-w-0">
        <p className={cn(
          "text-sm text-muted-foreground",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "পড়া চালিয়ে যান" : "Continue Reading"}
        </p>
        <p className={cn(
          "font-semibold text-foreground truncate",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? surah.nameBengali : surah.nameEnglish}
        </p>
        <p className={cn(
          "text-xs text-muted-foreground",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" 
            ? `আয়াত ${formatNumber(lastRead.verseNumber, language)}`
            : `Verse ${lastRead.verseNumber}`
          }
        </p>
      </div>
      
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
        <ChevronRight className="h-5 w-5" />
      </div>
    </button>
  );
};
