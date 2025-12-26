import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { quranPages, getPageByNumber, getJuzForPage } from "@/data/pages";
import { surahs } from "@/data/surahs";
import { Book, ZoomIn, ZoomOut, Search, Info, Volume2, ChevronDown, Type } from "lucide-react";
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

interface PageData {
  pageNumber: number;
  verses: Verse[];
  juzNumber: number;
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
  const initialPage = parseInt(pageNumber || "1");
  
  // Store loaded pages data
  const [loadedPages, setLoadedPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(initialPage);
  
  const [pageSearch, setPageSearch] = useState("");
  const [surahSearch, setSurahSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectorTab, setSelectorTab] = useState<"page" | "surah">("surah");
  
  // Last read verse state
  const [lastReadVerse, setLastReadVerse] = useState<string | null>(() => {
    const saved = localStorage.getItem("quran-last-read-verse");
    return saved || null;
  });
  
  // Refs
  const verseRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  
  const pageListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const surahListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Font zoom state
  const [fontSizeIndex, setFontSizeIndex] = useState(() => {
    const saved = localStorage.getItem("quran-font-size-index");
    return saved ? parseInt(saved) : DEFAULT_FONT_INDEX;
  });
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);

  // Touch gesture refs for pinch zoom
  const initialPinchDistance = useRef<number>(0);
  const isPinching = useRef<boolean>(false);

  const currentFontSize = FONT_SIZES[fontSizeIndex];
  const currentPageData = getPageByNumber(currentVisiblePage);
  const juzNumber = getJuzForPage(currentVisiblePage);

  // Save font size preference
  useEffect(() => {
    localStorage.setItem("quran-font-size-index", fontSizeIndex.toString());
  }, [fontSizeIndex]);

  // Save last read page (debounced to prevent rapid updates)
  const lastSavedPage = useRef(currentVisiblePage);
  useEffect(() => {
    if (currentVisiblePage !== lastSavedPage.current) {
      lastSavedPage.current = currentVisiblePage;
      localStorage.setItem("quran-last-read-page", currentVisiblePage.toString());
    }
  }, [currentVisiblePage]);

  // Handle verse click - mark as last read
  const handleVerseClick = useCallback((pageNum: number, surahNumber: number, verseNumber: number) => {
    const verseKey = `${pageNum}-${surahNumber}-${verseNumber}`;
    setLastReadVerse(verseKey);
    localStorage.setItem("quran-last-read-verse", verseKey);
    toast.success(
      language === "bn" 
        ? `সূরা ${surahNumber}, আয়াত ${verseNumber} - শেষ পঠিত হিসেবে সংরক্ষিত` 
        : `Surah ${surahNumber}, Verse ${verseNumber} - Saved as last read`,
      { className: language === "bn" ? "font-bengali" : "" }
    );
  }, [language]);

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
    if (!currentPageData) return null;
    return surahs.find(s => s.number === currentPageData.startSurah);
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
      // Reset and load from new page
      setLoadedPages([]);
      setLoading(true);
      setCurrentVisiblePage(page);
      navigate(`/read/${page}`);
    }
  }, [navigate]);

  // Fetch verses for a specific page
  const fetchVersesForPage = useCallback(async (pageNum: number): Promise<Verse[]> => {
    const pageData = getPageByNumber(pageNum);
    if (!pageData) return [];

    try {
      if (pageData.startSurah === pageData.endSurah) {
        const { data, error } = await supabase
          .from("verses")
          .select("surah_number, verse_number, arabic")
          .eq("surah_number", pageData.startSurah)
          .gte("verse_number", pageData.startVerse)
          .lte("verse_number", pageData.endVerse)
          .order("verse_number", { ascending: true });

        if (error) throw error;
        return data || [];
      } else {
        const { data: allVerses, error } = await supabase
          .from("verses")
          .select("surah_number, verse_number, arabic")
          .gte("surah_number", pageData.startSurah)
          .lte("surah_number", pageData.endSurah)
          .order("surah_number", { ascending: true })
          .order("verse_number", { ascending: true });

        if (error) throw error;

        if (allVerses) {
          return allVerses.filter(v => {
            if (v.surah_number === pageData.startSurah) {
              return v.verse_number >= pageData.startVerse;
            }
            if (v.surah_number === pageData.endSurah) {
              return v.verse_number <= pageData.endVerse;
            }
            return true;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching verses for page", pageNum, error);
    }
    return [];
  }, []);

  // Load initial pages
  useEffect(() => {
    const loadInitialPages = async () => {
      setLoading(true);
      const pagesToLoad = [];
      
      // Load current page and a few ahead
      for (let i = initialPage; i <= Math.min(initialPage + 2, 604); i++) {
        const verses = await fetchVersesForPage(i);
        pagesToLoad.push({
          pageNumber: i,
          verses,
          juzNumber: getJuzForPage(i)
        });
      }
      
      setLoadedPages(pagesToLoad);
      setLoading(false);
    };

    loadInitialPages();
  }, [initialPage, fetchVersesForPage]);

  // Load more pages when scrolling down
  const loadMorePagesDown = useCallback(async () => {
    if (loadingMore || loadedPages.length === 0) return;
    
    const lastPage = loadedPages[loadedPages.length - 1]?.pageNumber || 0;
    if (lastPage >= 604) return;

    setLoadingMore(true);
    const newPages: PageData[] = [];
    
    for (let i = lastPage + 1; i <= Math.min(lastPage + 3, 604); i++) {
      const verses = await fetchVersesForPage(i);
      newPages.push({
        pageNumber: i,
        verses,
        juzNumber: getJuzForPage(i)
      });
    }
    
    setLoadedPages(prev => [...prev, ...newPages]);
    setLoadingMore(false);
  }, [loadedPages, loadingMore, fetchVersesForPage]);

  // Load more pages when scrolling up
  const loadMorePagesUp = useCallback(async () => {
    if (loadingMore || loadedPages.length === 0) return;
    
    const firstPage = loadedPages[0]?.pageNumber || 1;
    if (firstPage <= 1) return;

    setLoadingMore(true);
    const newPages: PageData[] = [];
    
    for (let i = Math.max(firstPage - 3, 1); i < firstPage; i++) {
      const verses = await fetchVersesForPage(i);
      newPages.push({
        pageNumber: i,
        verses,
        juzNumber: getJuzForPage(i)
      });
    }
    
    setLoadedPages(prev => [...newPages, ...prev]);
    setLoadingMore(false);
  }, [loadedPages, loadingMore, fetchVersesForPage]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePagesDown();
        }
      },
      { threshold: 0.1 }
    );

    const topObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePagesUp();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomSentinelRef.current) {
      bottomObserver.observe(bottomSentinelRef.current);
    }

    if (topSentinelRef.current) {
      topObserver.observe(topSentinelRef.current);
    }

    return () => {
      bottomObserver.disconnect();
      topObserver.disconnect();
    };
  }, [loadMorePagesDown, loadMorePagesUp]);

  // Track which page is currently visible (with debouncing)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the most visible entry
        const visibleEntry = entries.find(entry => entry.isIntersecting && entry.intersectionRatio > 0.3);
        if (visibleEntry) {
          const pageNum = parseInt(visibleEntry.target.getAttribute('data-page') || '1');
          // Debounce the update to prevent rapid changes
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setCurrentVisiblePage(prev => prev !== pageNum ? pageNum : prev);
          }, 200);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    // Observe all loaded page elements
    Object.values(pageRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
    };
  }, [loadedPages]);

  // Touch event handlers for pinch zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      isPinching.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      const diff = currentDistance - initialPinchDistance.current;

      if (Math.abs(diff) > 50) {
        if (diff > 0) zoomIn();
        else zoomOut();
        initialPinchDistance.current = currentDistance;
      }
    }
  }, [zoomIn, zoomOut]);

  const handleTouchEnd = useCallback(() => {
    isPinching.current = false;
  }, []);

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
  const groupVersesBySurah = (verses: Verse[]) => {
    return verses.reduce((acc, verse) => {
      if (!acc[verse.surah_number]) {
        acc[verse.surah_number] = [];
      }
      acc[verse.surah_number].push(verse);
      return acc;
    }, {} as Record<number, Verse[]>);
  };

  const primarySurah = getPrimarySurah();

  // Scroll to current page/surah when sheet opens
  useEffect(() => {
    if (sheetOpen && !pageSearch && !surahSearch) {
      const timer = setTimeout(() => {
        if (selectorTab === "page") {
          const element = pageListRefs.current[currentVisiblePage];
          if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        } else {
          const currentSurahNum = currentPageData?.startSurah || 1;
          const element = surahListRefs.current[currentSurahNum];
          if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sheetOpen, currentVisiblePage, pageSearch, surahSearch, selectorTab, currentPageData]);

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
                        const isCurrentSurah = currentPageData && surah.number >= currentPageData.startSurah && surah.number <= currentPageData.endSurah;
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
                          variant={page.pageNumber === currentVisiblePage ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "h-10 text-sm font-bengali",
                            page.pageNumber === currentVisiblePage && "bg-primary text-primary-foreground"
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

          {/* Tablet Controls - Font & Zoom (show on sm and md, hide on lg+) */}
          <div className="hidden sm:flex lg:hidden items-center gap-1">
            {/* Zoom Controls */}
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={fontSizeIndex <= 0}
              className="h-8 w-8"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={fontSizeIndex >= FONT_SIZES.length - 1}
              className="h-8 w-8"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {/* Font Switch */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden ml-2">
              <button
                onClick={() => onArabicFontChange?.("uthmani")}
                className={cn(
                  "px-2 py-1 text-xs transition-colors",
                  arabicFont === "uthmani" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                Uthmani
              </button>
              <button
                onClick={() => onArabicFontChange?.("amiri")}
                className={cn(
                  "px-2 py-1 text-xs transition-colors",
                  arabicFont === "amiri" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                Amiri
              </button>
            </div>
          </div>

          {/* Page/Juz Info (hide on tablet where controls are shown) */}
          <span className={cn("text-sm text-muted-foreground sm:hidden lg:block", language === "bn" && "font-bengali")}>
            {language === "bn" 
              ? `পারা ${formatNum(juzNumber, language)} - পৃষ্ঠা ${formatNum(currentVisiblePage, language)}`
              : `Juz ${juzNumber} - Page ${currentVisiblePage}`
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

      {/* Main Content with Infinite Scroll */}
      <main 
        ref={contentRef}
        className="flex-1 overflow-auto pb-24 touch-pan-y"
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
            {/* Top sentinel for loading previous pages */}
            <div ref={topSentinelRef} className="h-4" />
            
            {loadingMore && loadedPages[0]?.pageNumber > 1 && (
              <div className="flex justify-center py-4">
                <div className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
                </div>
              </div>
            )}

            {/* Render all loaded pages */}
            {loadedPages.map((pageData) => {
              const versesBySurah = groupVersesBySurah(pageData.verses);
              const pageInfo = getPageByNumber(pageData.pageNumber);
              
              return (
                <div 
                  key={pageData.pageNumber}
                  ref={(el) => { pageRefs.current[pageData.pageNumber] = el; }}
                  data-page={pageData.pageNumber}
                  className="border-b border-border/30 pb-8 mb-8"
                >
                  {Object.entries(versesBySurah).map(([surahNum, surahVerses]) => {
                    const surah = surahs.find(s => s.number === parseInt(surahNum));
                    const isStartOfSurah = surahVerses[0]?.verse_number === 1;

                    return (
                      <div key={`${pageData.pageNumber}-${surahNum}`} className="mb-6">
                        {/* Surah Title Header */}
                        {isStartOfSurah && (
                          <div className="py-8 text-center">
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
                            const verseKey = `${pageData.pageNumber}-${verse.surah_number}-${verse.verse_number}`;
                            const isLastRead = lastReadVerse === verseKey;
                            
                            return (
                              <span 
                                key={verseKey} 
                                ref={(el) => { verseRefs.current[verseKey] = el; }}
                                className={cn(
                                  "inline cursor-pointer rounded transition-all duration-300",
                                  isLastRead && "bg-primary/20 px-1"
                                )}
                                onClick={() => handleVerseClick(pageData.pageNumber, verse.surah_number, verse.verse_number)}
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
                      </div>
                    );
                  })}

                  {/* Page Number Indicator */}
                  <div className="text-center mt-6 text-muted-foreground text-sm">
                    <span className={cn(language === "bn" && "font-bengali")}>
                      {language === "bn" 
                        ? `পৃষ্ঠা ${formatNum(pageData.pageNumber, language)}`
                        : `Page ${pageData.pageNumber}`
                      }
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Bottom sentinel for loading more pages */}
            <div ref={bottomSentinelRef} className="h-4" />
            
            {loadingMore && (
              <div className="flex justify-center py-4">
                <div className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "আরো লোড হচ্ছে..." : "Loading more..."}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Fixed Zoom Controls (Desktop only - Left) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={zoomIn}
          disabled={fontSizeIndex >= FONT_SIZES.length - 1}
          className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur"
          title={language === "bn" ? "বড় করুন" : "Zoom In"}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={zoomOut}
          disabled={fontSizeIndex <= 0}
          className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur"
          title={language === "bn" ? "ছোট করুন" : "Zoom Out"}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Fixed Font Switch (Desktop only - Right) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
        <Button
          variant={arabicFont === "uthmani" ? "default" : "outline"}
          onClick={() => onArabicFontChange?.("uthmani")}
          className={cn(
            "h-10 px-4 rounded-lg backdrop-blur text-sm",
            arabicFont === "uthmani" ? "bg-primary text-primary-foreground" : "bg-background/80"
          )}
        >
          Uthmani
        </Button>
        <Button
          variant={arabicFont === "amiri" ? "default" : "outline"}
          onClick={() => onArabicFontChange?.("amiri")}
          className={cn(
            "h-10 px-4 rounded-lg backdrop-blur text-sm",
            arabicFont === "amiri" ? "bg-primary text-primary-foreground" : "bg-background/80"
          )}
        >
          Amiri
        </Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <footer className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur border-t border-border md:bottom-0 z-40">
        <div className="flex items-center justify-center gap-4 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            disabled={fontSizeIndex <= 0}
            className="h-10 w-10"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>

          <button 
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? `পৃষ্ঠা ${formatNum(currentVisiblePage, language)} / ${formatNum(604, language)}`
                : `Page ${currentVisiblePage} / 604`
              }
            </span>
          </button>

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
