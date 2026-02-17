import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, GraduationCap, Award } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { getPageByNumber } from "@/data/pages";
import { Progress } from "@/components/ui/progress";
import { Language } from "@/types/language";

interface LmsContinueCourse {
  courseId: string;
  courseName: string;
  courseBn: string;
  completedLessons: number;
  totalLessons: number;
  hasCertificate: boolean;
}

interface ContinueReadingProps {
  language: Language;
  lmsContinueCourse?: LmsContinueCourse | null;
}

export const ContinueReading = ({ language, lmsContinueCourse }: ContinueReadingProps) => {
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

  // If LMS course is available, show that instead
  if (lmsContinueCourse) {
    const progress = lmsContinueCourse.totalLessons > 0
      ? Math.round((lmsContinueCourse.completedLessons / lmsContinueCourse.totalLessons) * 100)
      : 0;

    return (
      <div className="mt-6 animate-fade-in">
        <button
          onClick={() =>
            navigate(
              lmsContinueCourse.hasCertificate
                ? `/courses/${lmsContinueCourse.courseId}/certificate`
                : `/courses/${lmsContinueCourse.courseId}`
            )
          }
          className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-card hover:bg-card/90 border border-border shadow-lg rounded-xl transition-all duration-200 group overflow-hidden"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {lmsContinueCourse.hasCertificate ? (
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </div>

          <div className="flex-1 text-left min-w-0 overflow-hidden">
            <p className={cn("text-sm sm:text-base text-muted-foreground truncate", language === "bn" && "font-bengali")}>
              {lmsContinueCourse.hasCertificate
                ? language === "bn" ? "সার্টিফিকেট দেখুন" : "View Certificate"
                : language === "bn" ? "শিখতে থাকুন" : "Continue Learning"}
            </p>
            <p className={cn("font-semibold text-foreground truncate text-base sm:text-lg", language === "bn" && "font-bengali")}>
              {language === "bn" ? lmsContinueCourse.courseBn : lmsContinueCourse.courseName}
            </p>
            {!lmsContinueCourse.hasCertificate && (
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progress} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground shrink-0">{progress}%</span>
              </div>
            )}
          </div>

          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </button>
      </div>
    );
  }

  if (!lastRead) {
    // Default: show "Start Learning" card linking to /courses
    return (
      <div className="mt-6 animate-fade-in">
        <button
          onClick={() => navigate("/courses")}
          className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-card hover:bg-card/90 border border-border shadow-lg rounded-xl transition-all duration-200 group overflow-hidden"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex-1 text-left min-w-0 overflow-hidden">
            <p className={cn("text-sm sm:text-base text-muted-foreground truncate", language === "bn" && "font-bengali")}>
              {language === "bn" ? "এখনই শুরু করুন" : "Start Learning"}
            </p>
            <p className={cn("font-semibold text-foreground truncate text-sm sm:text-base", language === "bn" && "font-bengali")}>
              {language === "bn" ? "৩০ দিনে কুরআন শিখুন" : "Learn Quran in 30 Days"}
            </p>
          </div>
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </button>
      </div>
    );
  }

  const surah = surahs.find((s) => s.number === lastRead.surahNumber);
  if (!surah) return null;

  const handleContinue = () => {
    const verseParam = `${lastRead.surahNumber}:${lastRead.verseNumber}`;
    navigate(`/read/${lastRead.page}?verse=${verseParam}`);
  };

  return (
    <div className="mt-6 animate-fade-in">
      <button
        onClick={handleContinue}
        className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-card hover:bg-card/90 border border-border shadow-lg rounded-xl transition-all duration-200 group overflow-hidden"
      >
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        
        <div className="flex-1 text-left min-w-0 overflow-hidden">
          <p className={cn(
            "text-sm sm:text-base text-muted-foreground truncate",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "পড়া চালিয়ে যান" : "Continue Reading"}
          </p>
          <p className={cn(
            "font-semibold text-foreground truncate text-base sm:text-lg",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? surah.nameBengali : surah.nameEnglish}
          </p>
          <p className={cn(
            "text-sm sm:text-base text-muted-foreground truncate",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? `আয়াত ${formatNumber(lastRead.verseNumber, language)}`
              : `Verse ${lastRead.verseNumber}`
            }
          </p>
        </div>
        
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </button>
    </div>
  );
};
