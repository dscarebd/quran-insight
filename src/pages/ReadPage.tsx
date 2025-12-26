import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { quranPages, getPageByNumber, getJuzForPage } from "@/data/pages";
import { surahs } from "@/data/surahs";
import { ChevronLeft, ChevronRight, Book, ZoomIn, ZoomOut, Search, Info, Volume2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Language } from "@/types/language";

interface Verse {
  surah_number: number;
  verse_number: number;
  arabic: string;
}

interface ReadPageProps {
  language: Language;
  readingMode?: "normal" | "sepia";
  arabicFont?: "amiri" | "uthmani";
  onArabicFontChange?: (font: "amiri" | "uthmani") => void;
}

// Font size presets
const FONT_SIZES = [24, 28, 32, 36, 40, 44, 48, 52];
const DEFAULT_FONT_INDEX = 2; // 32px default

const ReadPage = ({ language, readingMode = "normal", arabicFont = "amiri", onArabicFontChange }: ReadPageProps) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(pageNumber || "1");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSearch, setPageSearch] = useState("");
  const [surahSearch, setSurahSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectorTab, setSelectorTab] = useState<"page" | "surah">("page");
  
  // Last read verse state
  const [lastReadVerse, setLastReadVerse] = useState<string | null>(() => {
    const saved = localStorage.getItem("quran-last-read-verse");
    return saved || null;
  });
  
  // Verse refs for scrolling to last read
  const verseRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});
  
  // Font zoom state
  const [fontSizeIndex, setFontSizeIndex] = useState(() => {
    const saved = localStorage.getItem("quran-font-size-index");
    return saved ? parseInt(saved) : DEFAULT_FONT_INDEX;
  });
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);

  // Touch gesture refs
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const initialPinchDistance = useRef<number>(0);
  const isPinching = useRef<boolean>(false);
  
  const pageListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const surahListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const pageData = getPageByNumber(currentPage);
  const juzNumber = getJuzForPage(currentPage);
  const currentFontSize = FONT_SIZES[fontSizeIndex];

  // Save font size preference
  useEffect(() => {
    localStorage.setItem("quran-font-size-index", fontSizeIndex.toString());
  }, [fontSizeIndex]);

  // Save last read page
  useEffect(() => {
    localStorage.setItem("quran-last-read-page", currentPage.toString());
  }, [currentPage]);

  // Scroll to last read verse on page load
  useEffect(() => {
    if (!loading && lastReadVerse && verses.length > 0) {
      const [savedPage, savedSurah, savedVerse] = lastReadVerse.split("-");
      if (parseInt(savedPage) === currentPage) {
        const verseKey = `${savedSurah}-${savedVerse}`;
        const timer = setTimeout(() => {
          const element = verseRefs.current[verseKey];
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, lastReadVerse, verses, currentPage]);

  // Handle verse click - mark as last read
  const handleVerseClick = useCallback((surahNumber: number, verseNumber: number) => {
    const verseKey = `${currentPage}-${surahNumber}-${verseNumber}`;
    setLastReadVerse(verseKey);
    localStorage.setItem("quran-last-read-verse", verseKey);
    toast.success(
      language === "bn" 
        ? `সূরা ${surahNumber}, আয়াত ${verseNumber} - শেষ পঠিত হিসেবে সংরক্ষিত` 
        : `Surah ${surahNumber}, Verse ${verseNumber} - Saved as last read`,
      { className: language === "bn" ? "font-bengali" : "" }
    );
  }, [currentPage, language]);

  // Scroll to current page/surah when sheet opens
  useEffect(() => {
    if (sheetOpen && !pageSearch && !surahSearch) {
      const timer = setTimeout(() => {
        if (selectorTab === "page") {
          const element = pageListRefs.current[currentPage];
          if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        } else {
          const currentSurahNum = pageData?.startSurah || 1;
          const element = surahListRefs.current[currentSurahNum];
          if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sheetOpen, currentPage, pageSearch, surahSearch, selectorTab, pageData]);

  // Format number based on language
  const formatNum = (num: number, lang: Language): string => {
    if (lang === "bn") {
      const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return num.toString().split("").map(d => bengaliNumerals[parseInt(d)]).join("");
    }
    if (lang === "hi") {
      const hindiNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return num.toString().split("").map(d => hindiNumerals[parseInt(d)]).join("");
    }
    return num.toString();
  };

  // Convert to Arabic numerals
  const toArabicNumerals = (num: number): string => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num.toString().split("").map(d => arabicNumerals[parseInt(d)]).join("");
  };

  // Get primary surah for current page
  const getPrimarySurah = () => {
    if (!pageData) return null;
    return surahs.find(s => s.number === pageData.startSurah);
  };

  // Zoom functions
  const zoomIn = useCallback(() => {
    if (fontSizeIndex < FONT_SIZES.length - 1) {
      setFontSizeIndex(prev => prev + 1);
      setShowZoomIndicator(true);
      setTimeout(() => setShowZoomIndicator(false), 1500);
    }
  }, [fontSizeIndex]);

  const zoomOut = useCallback(() => {
    if (fontSizeIndex > 0) {
      setFontSizeIndex(prev => prev - 1);
      setShowZoomIndicator(true);
      setTimeout(() => setShowZoomIndicator(false), 1500);
    }
  }, [fontSizeIndex]);

  // Navigate to page
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= 604) {
      navigate(`/read/${page}`);
    }
  }, [navigate]);

  // Touch event handlers for swipe and pinch zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      isPinching.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      const diff = currentDistance - initialPinchDistance.current;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          zoomIn();
        } else {
          zoomOut();
        }
        initialPinchDistance.current = currentDistance;
      }
    }
  }, [zoomIn, zoomOut]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isPinching.current) {
      isPinching.current = false;
      return;
    }

    if (e.changedTouches.length === 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;

      if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX > 0) {
          goToPage(currentPage - 1);
        } else {
          goToPage(currentPage + 1);
        }
      }
    }
  }, [currentPage, goToPage]);

  // Fetch verses for current page
  useEffect(() => {
    const fetchVerses = async () => {
      if (!pageData) return;
      
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          // Use anonymous access
        }

        let query = supabase
          .from("verses")
          .select("surah_number, verse_number, arabic")
          .order("surah_number", { ascending: true })
          .order("verse_number", { ascending: true });

        if (pageData.startSurah === pageData.endSurah) {
          query = query
            .eq("surah_number", pageData.startSurah)
            .gte("verse_number", pageData.startVerse)
            .lte("verse_number", pageData.endVerse);
        } else {
          const { data: allVerses, error: allVersesError } = await supabase
            .from("verses")
            .select("surah_number, verse_number, arabic")
            .gte("surah_number", pageData.startSurah)
            .lte("surah_number", pageData.endSurah)
            .order("surah_number", { ascending: true })
            .order("verse_number", { ascending: true });

          if (allVersesError) {
            console.error("Error fetching verses:", allVersesError);
            setLoading(false);
            return;
          }

          if (allVerses) {
            const filteredVerses = allVerses.filter(v => {
              if (v.surah_number === pageData.startSurah) {
                return v.verse_number >= pageData.startVerse;
              }
              if (v.surah_number === pageData.endSurah) {
                return v.verse_number <= pageData.endVerse;
              }
              return true;
            });
            setVerses(filteredVerses);
            setLoading(false);
            return;
          }
        }

        const { data, error } = await query;
        if (error) {
          console.error("Error fetching verses:", error);
        } else {
          setVerses(data || []);
        }
      } catch (error) {
        console.error("Error fetching verses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [currentPage, pageData]);

  // Filter pages for search
  const filteredPages = quranPages.filter(p => 
    p.pageNumber.toString().includes(pageSearch)
  );

  // Filter surahs for search
  const filteredSurahs = surahs.filter(s => {
    if (!surahSearch.trim()) return true;
    const query = surahSearch.toLowerCase();
    return (
      s.number.toString().includes(query) ||
      s.nameArabic.includes(query) ||
      s.nameBengali.toLowerCase().includes(query) ||
      s.nameEnglish.toLowerCase().includes(query)
    );
  });

  // Get the first page of a surah
  const getSurahStartPage = (surahNumber: number): number => {
    const page = quranPages.find(p => p.startSurah === surahNumber && p.startVerse === 1);
    if (page) return page.pageNumber;
    const fallbackPage = quranPages.find(p => p.startSurah <= surahNumber && p.endSurah >= surahNumber);
    return fallbackPage?.pageNumber || 1;
  };

  // Group verses by surah for display
  const versesBySurah = verses.reduce((acc, verse) => {
    if (!acc[verse.surah_number]) {
      acc[verse.surah_number] = [];
    }
    acc[verse.surah_number].push(verse);
    return acc;
  }, {} as Record<number, Verse[]>);

  const primarySurah = getPrimarySurah();

  // Get next/previous surah info
  const getNextSurah = () => {
    if (!pageData) return null;
    return surahs.find(s => s.number === pageData.endSurah + 1);
  };

  const navigateToNextSurah = () => {
    const nextSurah = getNextSurah();
    if (nextSurah) {
      const startPage = getSurahStartPage(nextSurah.number);
      goToPage(startPage);
    }
  };

  const navigateToSurahStart = () => {
    if (primarySurah) {
      const startPage = getSurahStartPage(primarySurah.number);
      goToPage(startPage);
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      readingMode === "sepia" ? "sepia" : "bg-background"
    )}>
      {/* Top Header Bar */}
      <header className={cn(
        "sticky top-0 z-10 backdrop-blur border-b border-border/50",
        readingMode === "sepia" ? "bg-[hsl(35,30%,94%)]/95" : "bg-background/95"
      )}>
        <div className="flex items-center justify-between px-4 py-2 max-w-4xl mx-auto">
          {/* Surah Selector */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-muted/50 px-3 py-1.5 rounded-lg transition-colors">
                <span className={cn(
                  "text-sm font-medium",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? primarySurah?.nameBengali : primarySurah?.nameEnglish}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl px-0">
              <SheetHeader className="px-4 pb-3 border-b border-border">
                <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "নির্বাচন করুন" : "Select"}
                </SheetTitle>
              </SheetHeader>
              
              <Tabs value={selectorTab} onValueChange={(v) => setSelectorTab(v as "page" | "surah")} className="flex flex-col h-[calc(80vh-60px)]">
                <div className="px-4 pt-3">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="surah" className={cn(language === "bn" && "font-bengali")}>
                      {language === "bn" ? "সূরা" : "Surah"}
                    </TabsTrigger>
                    <TabsTrigger value="page" className={cn(language === "bn" && "font-bengali")}>
                      {language === "bn" ? "পৃষ্ঠা" : "Page"}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="surah" className="flex-1 mt-0 overflow-hidden">
                  <div className="px-4 py-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder={language === "bn" ? "সূরা খুঁজুন..." : "Search surah..."}
                        value={surahSearch}
                        onChange={(e) => setSurahSearch(e.target.value)}
                        className={cn("pl-9", language === "bn" && "font-bengali")}
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(80vh-200px)]">
                    <div className="py-1">
                      {filteredSurahs.map((surah) => {
                        const isCurrentSurah = pageData && surah.number >= pageData.startSurah && surah.number <= pageData.endSurah;
                        return (
                          <button
                            key={surah.number}
                            ref={(el) => {
                              surahListRefs.current[surah.number] = el;
                            }}
                            onClick={() => {
                              const startPage = getSurahStartPage(surah.number);
                              goToPage(startPage);
                              setSheetOpen(false);
                              setSurahSearch("");
                            }}
                            className={cn(
                              "flex items-center gap-3 w-full px-4 py-3 transition-colors hover:bg-muted border-b border-border/50 last:border-b-0",
                              isCurrentSurah && "bg-primary/10"
                            )}
                          >
                            <div className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold font-bengali",
                              isCurrentSurah ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                              {formatNum(surah.number, language)}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <p className={cn("text-lg text-foreground", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")}>
                                {surah.nameArabic}
                              </p>
                              <p className={cn(
                                "text-xs text-muted-foreground",
                                language === "bn" && "font-bengali"
                              )}>
                                {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                                <span className="mx-1">•</span>
                                {formatNum(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="page" className="flex-1 mt-0 overflow-hidden">
                  <div className="px-4 py-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder={language === "bn" ? "পৃষ্ঠা নম্বর খুঁজুন..." : "Search page number..."}
                        value={pageSearch}
                        onChange={(e) => setPageSearch(e.target.value)}
                        className={cn("pl-9", language === "bn" && "font-bengali")}
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(80vh-200px)]">
                    <div className="p-2 grid grid-cols-5 gap-2">
                      {filteredPages.map((page) => (
                        <Button
                          key={page.pageNumber}
                          ref={(el) => {
                            pageListRefs.current[page.pageNumber] = el;
                          }}
                          variant={page.pageNumber === currentPage ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "h-10 text-sm font-bengali",
                            page.pageNumber === currentPage && "bg-primary text-primary-foreground"
                          )}
                          onClick={() => {
                            goToPage(page.pageNumber);
                            setSheetOpen(false);
                            setPageSearch("");
                          }}
                        >
                          {formatNum(page.pageNumber, language)}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>

          {/* Page/Juz Info */}
          <span className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
            {language === "bn" 
              ? `পারা ${formatNum(juzNumber, language)} - পৃষ্ঠা ${formatNum(currentPage, language)}`
              : `Juz ${juzNumber} - Page ${currentPage}`
            }
          </span>
        </div>
      </header>

      {/* Zoom Indicator */}
      {showZoomIndicator && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-foreground/90 text-background px-4 py-2 rounded-full animate-fade-in">
          <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
            {language === "bn" ? `ফন্ট: ${currentFontSize}px` : `Font: ${currentFontSize}px`}
          </span>
        </div>
      )}

      {/* Main Content */}
      <main 
        ref={contentRef}
        className="flex-1 overflow-auto pb-32 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {loading ? (
          <div className="p-6 space-y-4 max-w-4xl mx-auto">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {Object.entries(versesBySurah).map(([surahNum, surahVerses]) => {
              const surah = surahs.find(s => s.number === parseInt(surahNum));
              const isStartOfSurah = surahVerses[0]?.verse_number === 1;

              return (
                <div key={surahNum} className="mb-8">
                  {/* Surah Title Header */}
                  {isStartOfSurah && (
                    <div className="py-8 text-center">
                      {/* Decorative Surah Title */}
                      <div className="relative inline-block">
                        <div className="surah-title-frame px-8 py-4">
                          <h1 
                            className={cn(
                              "text-foreground surah-title-text",
                              arabicFont === "uthmani" ? "font-uthmani" : "font-arabic"
                            )}
                            style={{ fontSize: `${currentFontSize + 8}px` }}
                          >
                            {surah?.nameArabic}
                          </h1>
                        </div>
                      </div>

                      {/* Info Buttons */}
                      <div className="flex items-center justify-center gap-6 mt-6 px-4">
                        <button className={cn(
                          "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                          language === "bn" && "font-bengali"
                        )}>
                          <Info className="h-4 w-4" />
                          {language === "bn" ? "সূরা তথ্য" : "Surah Info"}
                        </button>
                        <button className={cn(
                          "flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors",
                          language === "bn" && "font-bengali"
                        )}>
                          <Volume2 className="h-4 w-4" />
                          {language === "bn" ? "অডিও চালান" : "Play Audio"}
                        </button>
                      </div>

                      {/* Bismillah */}
                      {parseInt(surahNum) !== 9 && parseInt(surahNum) !== 1 && (
                        <p 
                          className={cn(
                            "text-foreground/80 mt-8 bismillah-text",
                            arabicFont === "uthmani" ? "font-uthmani" : "font-arabic"
                          )}
                          dir="rtl"
                          style={{ fontSize: `${currentFontSize}px` }}
                        >
                          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                      )}
                    </div>
                  )}

                  {/* Continuous Arabic Verses */}
                  <div 
                    className="text-center px-4 sm:px-8 md:px-12" 
                    dir="rtl"
                    style={{ lineHeight: currentFontSize > 40 ? 3.2 : 2.8 }}
                  >
                    {surahVerses.map((verse) => {
                      const verseKey = `${verse.surah_number}-${verse.verse_number}`;
                      const isLastRead = lastReadVerse === `${currentPage}-${verseKey}`;
                      
                      return (
                        <span 
                          key={verseKey} 
                          ref={(el) => { verseRefs.current[verseKey] = el; }}
                          className={cn(
                            "inline cursor-pointer rounded transition-all duration-300",
                            isLastRead && "bg-primary/20 px-1"
                          )}
                          onClick={() => handleVerseClick(verse.surah_number, verse.verse_number)}
                        >
                          <span 
                            className={cn(
                              "text-foreground",
                              arabicFont === "uthmani" ? "font-uthmani" : "font-arabic"
                            )}
                            style={{ fontSize: `${currentFontSize}px` }}
                          >
                            {verse.arabic}
                          </span>
                          {/* Decorative Verse Number */}
                          <span 
                            className="verse-number-circle inline-flex items-center justify-center mx-2"
                            style={{ 
                              width: `${currentFontSize * 1.2}px`, 
                              height: `${currentFontSize * 1.2}px`,
                              fontSize: `${currentFontSize * 0.5}px`
                            }}
                          >
                            {toArabicNumerals(verse.verse_number)}
                          </span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Page Number Indicator */}
                  <div className="text-center mt-8 text-muted-foreground text-sm">
                    {formatNum(currentPage, language)}
                  </div>
                </div>
              );
            })}

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 py-8 px-4">
              <Button
                variant="outline"
                size="sm"
                onClick={navigateToSurahStart}
                className={cn("gap-2", language === "bn" && "font-bengali")}
              >
                {language === "bn" ? "সুরার শুরু" : "Surah Start"}
              </Button>
              {getNextSurah() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToNextSurah}
                  className={cn("gap-2", language === "bn" && "font-bengali")}
                >
                  {language === "bn" ? "পরবর্তী সূরা" : "Next Surah"}
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Fixed Side Navigation (Desktop) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= 604}
          className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur"
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Fixed Zoom Controls (Desktop) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={zoomIn}
          disabled={fontSizeIndex >= FONT_SIZES.length - 1}
          className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={zoomOut}
          disabled={fontSizeIndex <= 0}
          className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <footer className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur border-t border-border md:hidden z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            disabled={fontSizeIndex <= 0}
            className="h-10 w-10"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= 604}
            className={cn("gap-2", language === "bn" && "font-bengali")}
          >
            <ChevronLeft className="h-4 w-4" />
            {language === "bn" ? "পরবর্তী" : "Next"}
          </Button>

          <button 
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
              {formatNum(currentPage, language)}
            </span>
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn("gap-2", language === "bn" && "font-bengali")}
          >
            {language === "bn" ? "পূর্ববর্তী" : "Prev"}
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            disabled={fontSizeIndex >= FONT_SIZES.length - 1}
            className="h-10 w-10"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ReadPage;
