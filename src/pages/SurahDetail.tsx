import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Bookmark, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { surahs } from "@/data/surahs";
import { Verse } from "@/data/verses";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { useLocalBookmarks } from "@/hooks/useLocalBookmarks";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Language } from "@/types/language";
import { getVerses } from "@/services/bundledDataService";

interface SurahDetailProps {
  language: Language;
  readingMode?: "normal" | "sepia";
  arabicFont?: "amiri" | "uthmani";
}

interface VerseCardProps {
  verse: Verse;
  language: Language;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (surahNumber: number, verseNumber: number) => void;
  arabicFont?: "amiri" | "uthmani";
}

const VerseCard = ({ verse, language, index, isBookmarked, onToggleBookmark, arabicFont = "amiri" }: VerseCardProps) => {
  const [showTafsir, setShowTafsir] = useState(false);

  const handleBookmarkClick = () => {
    onToggleBookmark(verse.surahNumber, verse.verseNumber);
  };

  return (
    <div 
      className="verse-card mb-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Verse Number Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold font-bengali">
          {formatNumber(verse.verseNumber, language)}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-9 w-9 transition-colors",
              isBookmarked 
                ? "text-primary hover:text-primary/80" 
                : "text-muted-foreground hover:text-primary"
            )}
            onClick={handleBookmarkClick}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
          </Button>
        </div>
      </div>

      {/* Arabic Text */}
      <p className={cn("mb-4 text-right text-2xl leading-loose text-foreground sm:text-3xl", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")}>
        {verse.arabic}
      </p>

      {/* Translation */}
      <p className={cn("mb-2 text-base leading-relaxed text-foreground sm:text-lg", language === "bn" && "font-bengali")}>
        {language === "bn" ? verse.bengali : verse.english}
      </p>

      {/* Tafsir Toggle */}
      {(verse.tafsirBengali || verse.tafsirEnglish) && (
        <div className="mt-4 border-t border-border pt-4">
          <button
            onClick={() => setShowTafsir(!showTafsir)}
            className="flex w-full items-center justify-between text-sm font-medium text-primary hover:text-primary/80"
          >
            <span className={cn("flex items-center gap-2", language === "bn" && "font-bengali")}>
              <BookOpen className="h-4 w-4" />
              {language === "bn" ? "তাফসীর দেখুন" : "View Tafsir"}
            </span>
            {showTafsir ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {showTafsir && (
            <div className={cn("mt-3 rounded-lg bg-accent/50 p-4 text-sm leading-relaxed text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? verse.tafsirBengali : verse.tafsirEnglish}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Cache for storing previously fetched verses
const versesCache = new Map<number, Verse[]>();

const SurahDetail = ({ language, readingMode = "normal", arabicFont = "amiri" }: SurahDetailProps) => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isBookmarked, toggleBookmark, getBookmarkedVerseKeys } = useLocalBookmarks();
  const [surahSheetOpen, setSurahSheetOpen] = useState(false);
  const [surahSearchQuery, setSurahSearchQuery] = useState("");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const surahListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const surahNum = parseInt(surahNumber || "1", 10);
  const surah = surahs.find(s => s.number === surahNum);

  const prevSurah = surahs.find(s => s.number === surahNum - 1);
  const nextSurah = surahs.find(s => s.number === surahNum + 1);

  // Scroll to current surah when sheet opens
  useEffect(() => {
    if (surahSheetOpen && !surahSearchQuery) {
      // Wait for sheet animation and content to render
      const timer = setTimeout(() => {
        const element = surahListRefs.current[surahNum];
        if (element) {
          element.scrollIntoView({
            behavior: 'instant',
            block: 'center'
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [surahSheetOpen, surahNum, surahSearchQuery]);

  // Fetch verses - uses bundled data service (offline-first)
  useEffect(() => {
    const fetchVerses = async () => {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Check memory cache first
      if (versesCache.has(surahNum)) {
        setVerses(versesCache.get(surahNum)!);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsTransitioning(false), 50);
        return;
      }

      if (verses.length === 0) setIsLoading(true);
      
      try {
        // Use bundled data service (handles memory cache -> IndexedDB -> Supabase fallback)
        const localVerses = await getVerses(surahNum);
        setVerses(localVerses);
        versesCache.set(surahNum, localVerses);
      } catch (error) {
        console.error('Error fetching verses:', error);
        setVerses([]);
      }
      
      setIsLoading(false);
      setTimeout(() => setIsTransitioning(false), 50);
    };

    fetchVerses();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [surahNum]);

  // Scroll to verse if hash is present
  useEffect(() => {
    if (!isLoading && verses.length > 0 && location.hash) {
      const match = location.hash.match(/#verse-(\d+)/);
      if (match) {
        const verseNumber = parseInt(match[1], 10);
        setTimeout(() => {
          if (verseRefs.current[verseNumber]) {
            verseRefs.current[verseNumber]?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
            // Highlight the verse
            setHighlightedVerse(verseNumber);
            // Remove highlight after animation
            setTimeout(() => {
              setHighlightedVerse(null);
            }, 2000);
          }
        }, 100);
      }
    }
  }, [isLoading, verses, location.hash]);

  const handleToggleBookmark = (surahNumber: number, verseNumber: number) => {
    toggleBookmark(surahNumber, verseNumber, language);
  };

  const filteredSurahs = useMemo(() => {
    if (!surahSearchQuery.trim()) return surahs;
    const query = surahSearchQuery.toLowerCase();
    return surahs.filter(s => 
      s.nameBengali.toLowerCase().includes(query) ||
      s.nameEnglish.toLowerCase().includes(query) ||
      s.nameArabic.includes(query) ||
      s.number.toString().includes(query)
    );
  }, [surahSearchQuery]);

  const handleSurahClick = (surahNumber: number) => {
    navigate(`/surah/${surahNumber}`);
    setSurahSheetOpen(false);
    setSurahSearchQuery("");
  };

  const handleBack = () => {
    if (isMobile) {
      setSurahSheetOpen(true);
    } else {
      navigate("/");
    }
  };

  if (!surah) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? "সূরা পাওয়া যায়নি" : "Surah not found"}
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen islamic-pattern",
      readingMode === "sepia" ? "sepia" : "bg-background"
    )}>
      {/* Surah Info Banner */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/30 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-4">
            <div className={cn("mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary", language === "bn" && "font-bengali")}>
              <span>{surah.revelationType === "Meccan" ? (language === "bn" ? "মক্কী" : "Meccan") : (language === "bn" ? "মাদানী" : "Medinan")}</span>
              <span>•</span>
              <span>{formatNumber(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}</span>
            </div>
          </div>
          
          {/* Surah Name with Navigation */}
          <div className="flex items-center justify-center gap-4">
            {/* Previous Surah */}
            <button
              onClick={() => prevSurah && navigate(`/surah/${prevSurah.number}`)}
              disabled={!prevSurah}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all",
                prevSurah 
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className={cn("text-xs font-medium hidden sm:block", language === "bn" && "font-bengali")}>
                {prevSurah ? (language === "bn" ? prevSurah.nameBengali : prevSurah.nameEnglish) : ""}
              </span>
              <span className={cn("text-xs sm:hidden", language === "bn" && "font-bengali")}>
                {prevSurah ? formatNumber(prevSurah.number, language) : ""}
              </span>
            </button>

            {/* Current Surah Name */}
            <div className="text-center">
              <h1 className={cn("mb-1 text-4xl text-foreground sm:text-5xl", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")}>
                {surah.nameArabic}
              </h1>
              <h2 className={cn("text-xl font-semibold text-foreground", language === "bn" && "font-bengali")}>
                {language === "bn" ? surah.nameBengali : surah.nameEnglish}
              </h2>
            </div>

            {/* Next Surah */}
            <button
              onClick={() => nextSurah && navigate(`/surah/${nextSurah.number}`)}
              disabled={!nextSurah}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all",
                nextSurah 
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-5 w-5" />
              <span className={cn("text-xs font-medium hidden sm:block", language === "bn" && "font-bengali")}>
                {nextSurah ? (language === "bn" ? nextSurah.nameBengali : nextSurah.nameEnglish) : ""}
              </span>
              <span className={cn("text-xs sm:hidden", language === "bn" && "font-bengali")}>
                {nextSurah ? formatNumber(nextSurah.number, language) : ""}
              </span>
            </button>
          </div>

          <p className={cn("text-center mt-2 text-muted-foreground", language === "bn" && "font-bengali")}>
            {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
          </p>
        </div>
      </div>

      {/* Verses List */}
      <div className={cn(
        "mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6 transition-opacity duration-200",
        isTransitioning ? "opacity-0" : "opacity-100"
      )}>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : verses.length > 0 ? (
          verses.map((verse, index) => (
            <div
              key={verse.verseNumber}
              ref={(el) => { verseRefs.current[verse.verseNumber] = el; }}
              id={`verse-${verse.verseNumber}`}
              className={cn(
                "rounded-2xl transition-all duration-300",
                highlightedVerse === verse.verseNumber && "animate-highlight ring-2 ring-primary/50"
              )}
            >
              <VerseCard 
                verse={verse} 
                language={language}
                index={index}
                isBookmarked={isBookmarked(verse.surahNumber, verse.verseNumber)}
                onToggleBookmark={handleToggleBookmark}
                arabicFont={arabicFont}
              />
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className={cn("mb-2 text-lg font-semibold text-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
            </h3>
            <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? "এই সূরার আয়াতগুলো শীঘ্রই যোগ করা হবে।" 
                : "Verses for this Surah will be added soon."}
            </p>
          </div>
        )}
      </div>

      {/* Surah List Sheet for Mobile */}
      <Sheet open={surahSheetOpen} onOpenChange={setSurahSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "সূরা নির্বাচন করুন" : "Select Surah"}
            </SheetTitle>
          </SheetHeader>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={language === "bn" ? "সূরা খুঁজুন..." : "Search surah..."}
              value={surahSearchQuery}
              onChange={(e) => setSurahSearchQuery(e.target.value)}
              className={cn("pl-9", language === "bn" && "font-bengali")}
            />
          </div>
          
          {/* Surah List */}
          <ScrollArea className="h-[calc(80vh-140px)]">
            <div className="space-y-2 pr-4">
              {filteredSurahs.map((s) => (
                <button
                  key={s.number}
                  ref={(el) => { surahListRefs.current[s.number] = el; }}
                  onClick={() => handleSurahClick(s.number)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    s.number === surahNum
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold font-bengali",
                    s.number === surahNum
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}>
                    {formatNumber(s.number, language)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn("font-medium truncate", language === "bn" && "font-bengali")}>
                      {language === "bn" ? s.nameBengali : s.nameEnglish}
                    </div>
                    <div className={cn(
                      "text-xs truncate font-bengali",
                      s.number === surahNum ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {s.nameArabic} • {formatNumber(s.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SurahDetail;