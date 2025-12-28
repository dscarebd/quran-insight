import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { getPageByNumber } from "@/data/pages";

import { Language } from "@/types/language";

interface ContinueReadingProps {
  language: Language;
}

export const ContinueReading = ({ language }: ContinueReadingProps) => {
  const navigate = useNavigate();
  const [lastRead, setLastRead] = useState<{
    page: number;
    surahNumber: number;
    verseNumber: number;
  } | null>(null);

  const readLastReadFromStorage = useCallback(() => {
    const lastReadPageStr = localStorage.getItem("quran-last-read-page");
    const lastReadVerse = localStorage.getItem("quran-last-read-verse");

    let page = lastReadPageStr ? parseInt(lastReadPageStr) : NaN;
    let versePage: number | null = null;
    let verseSurah: number | null = null;
    let verseNumber: number | null = null;

    if (lastReadVerse) {
      const parts = lastReadVerse.split("-");
      if (parts.length >= 3) {
        const p = parseInt(parts[0]);
        const s = parseInt(parts[1]);
        const v = parseInt(parts[2]);
        if (Number.isFinite(p) && Number.isFinite(s) && Number.isFinite(v)) {
          versePage = p;
          verseSurah = s;
          verseNumber = v;
        }
      }
    }

    // Prefer verse page when available (it is the most precise)
    if (versePage !== null) page = versePage;
    if (!Number.isFinite(page)) {
      setLastRead(null);
      return;
    }

    const pageData = getPageByNumber(page);
    const surahNumber = verseSurah ?? pageData?.startSurah ?? 1;
    const vNum = verseNumber ?? pageData?.startVerse ?? 1;

    setLastRead({ page, surahNumber, verseNumber: vNum });
  }, []);

  useEffect(() => {
    readLastReadFromStorage();

    const handler = () => readLastReadFromStorage();
    window.addEventListener("quran:lastReadChanged", handler as EventListener);
    window.addEventListener("storage", handler);
    window.addEventListener("focus", handler);

    return () => {
      window.removeEventListener("quran:lastReadChanged", handler as EventListener);
      window.removeEventListener("storage", handler);
      window.removeEventListener("focus", handler);
    };
  }, [readLastReadFromStorage]);


  if (!lastRead) return null;

  const surah = surahs.find((s) => s.number === lastRead.surahNumber);
  if (!surah) return null;

  const handleContinue = () => {
    // Navigate to exact page with verse info for scrolling/highlighting
    const verseParam = `${lastRead.surahNumber}:${lastRead.verseNumber}`;
    navigate(`/read/${lastRead.page}?verse=${verseParam}`);
  };

  return (
    <div className="mt-6 lg:hidden">
      <button
        onClick={handleContinue}
        className="w-full flex items-center gap-3 p-3 bg-card hover:bg-card/90 border border-border shadow-lg rounded-xl transition-all duration-200 group"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        
        <div className="flex-1 text-left min-w-0">
          <p className={cn(
            "text-xs text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "পড়া চালিয়ে যান" : "Continue Reading"}
          </p>
          <p className={cn(
            "font-semibold text-foreground truncate text-sm",
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
        
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>
    </div>
  );
};
