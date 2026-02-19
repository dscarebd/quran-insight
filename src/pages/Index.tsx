import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ContinuePlayingCard } from "@/components/ContinuePlayingCard";
import { DesktopHeroSearch } from "@/components/desktop/DesktopHeroSearch";
import { QuickAccessCards } from "@/components/desktop/QuickAccessCards";
import { DesktopDailyContent } from "@/components/desktop/DesktopDailyContent";
import { AISearchResults } from "@/components/AISearchResults";
import { useAISearch } from "@/hooks/useAISearch";
import { useLastPlayedPosition } from "@/hooks/useLastPlayedPosition";
import { useToast } from "@/hooks/use-toast";
import { Language } from "@/types/language";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { BookOpen, ChevronRight } from "lucide-react";

interface IndexProps {
  language: Language;
}

// Read last-read surah info from localStorage
function useLastReadSurah() {
  const [lastRead, setLastRead] = useState<{ pageNum: number; surahNumber: number; verseNumber: number } | null>(() => {
    try {
      const raw = localStorage.getItem("quran-last-read-verse");
      if (!raw) return null;
      const parts = raw.split("-");
      if (parts.length < 3) return null;
      return {
        pageNum: parseInt(parts[0]),
        surahNumber: parseInt(parts[1]),
        verseNumber: parseInt(parts[2]),
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const verseKey = (e as CustomEvent).detail?.verseKey as string | undefined;
      if (!verseKey) return;
      const parts = verseKey.split("-");
      if (parts.length < 3) return;
      setLastRead({
        pageNum: parseInt(parts[0]),
        surahNumber: parseInt(parts[1]),
        verseNumber: parseInt(parts[2]),
      });
    };
    window.addEventListener("quran:lastReadChanged", handler);
    return () => window.removeEventListener("quran:lastReadChanged", handler);
  }, []);

  return lastRead;
}

const Index = ({ language }: IndexProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { search, clear, isLoading, error, response, isOnline } = useAISearch();
  const { lastPosition, hasLastPosition, clearPosition } = useLastPlayedPosition();
  const { toast } = useToast();
  const lastReadSurah = useLastReadSurah();

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    clear();
  }, [clear]);

  useEffect(() => {
    const handleClearSearch = () => clearSearch();
    window.addEventListener("clear-home-search", handleClearSearch);
    return () => window.removeEventListener("clear-home-search", handleClearSearch);
  }, [clearSearch]);

  useEffect(() => {
    if (error) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast, language]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await search(query, language);
  };

  const handleResumePlayback = () => {
    if (lastPosition) {
      navigate(`/surah/${lastPosition.surahNumber}#verse-${lastPosition.verseNumber}`);
      clearPosition();
    }
  };

  const surahInfo = lastReadSurah
    ? surahs.find((s) => s.number === lastReadSurah.surahNumber)
    : null;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden max-w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 overflow-hidden">
        {/* Hero Search Section */}
        <DesktopHeroSearch
          language={language}
          onSearch={handleSearch}
          isLoading={isLoading}
          hasResults={!!searchQuery}
          onClear={clearSearch}
          isOnline={isOnline}
        />

        {/* Continue Playing Audio Card */}
        {!searchQuery && hasLastPosition && lastPosition && (
          <div className="mt-6">
            <ContinuePlayingCard
              position={lastPosition}
              language={language}
              onResume={handleResumePlayback}
              onDismiss={clearPosition}
            />
          </div>
        )}

        {/* Last Read Surah Card */}
        {!searchQuery && surahInfo && lastReadSurah && (
          <div className="mt-6 animate-fade-in">
            <button
              onClick={() => navigate(`/read/${lastReadSurah.pageNum}?verse=${lastReadSurah.surahNumber}:${lastReadSurah.verseNumber}`)}
              className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="flex-1 text-left min-w-0 overflow-hidden">
                <p className={cn(
                  "text-xs font-medium text-muted-foreground truncate uppercase tracking-wide",
                  language === "bn" && "font-bengali normal-case tracking-normal"
                )}>
                  {language === "bn" ? "পড়া চালিয়ে যান" : "Continue Reading"}
                </p>
                <p className={cn(
                  "font-semibold text-foreground truncate text-sm sm:text-base leading-tight",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? surahInfo.nameBengali : surahInfo.nameEnglish}
                  <span className="text-muted-foreground font-normal text-xs sm:text-sm">
                    {" · "}
                    {language === "bn" ? "আয়াত" : "Verse"}{" "}
                    {language === "bn"
                      ? lastReadSurah.verseNumber.toString().split("").map(d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]).join("")
                      : lastReadSurah.verseNumber}
                  </span>
                </p>
              </div>

              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-all duration-300">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </button>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-6 sm:mt-8">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <div className="grid gap-3">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>
            ) : response ? (
              <AISearchResults response={response} language={language} />
            ) : null}
          </div>
        )}

        {!searchQuery && (
          <>
            {/* Quick Access Cards */}
            <div className="mt-8 sm:mt-10">
              <h2 className={cn(
                "mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "দ্রুত প্রবেশ" : "Quick Access"}
              </h2>
              <QuickAccessCards language={language} />
            </div>

            {/* Daily Content */}
            <div className="mt-8 sm:mt-10">
              <h2 className={cn(
                "mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "আজকের আয়াত, দোয়া ও হাদিস" : "Today's Verse, Dua & Hadith"}
              </h2>
              <DesktopDailyContent language={language} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
