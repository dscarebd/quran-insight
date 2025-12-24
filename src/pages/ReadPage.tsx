import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { quranPages, getPageByNumber, getJuzForPage } from "@/data/pages";
import { surahs } from "@/data/surahs";
import { ChevronLeft, ChevronRight, Book, List, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Verse {
  surah_number: number;
  verse_number: number;
  arabic: string;
}

interface ReadPageProps {
  language: "bn" | "en";
}

// Font size presets
const FONT_SIZES = [20, 24, 28, 32, 36, 40, 44, 48];
const DEFAULT_FONT_INDEX = 2; // 28px default

const ReadPage = ({ language }: ReadPageProps) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(pageNumber || "1");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSearch, setPageSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  
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

  const pageData = getPageByNumber(currentPage);
  const juzNumber = getJuzForPage(currentPage);
  const currentFontSize = FONT_SIZES[fontSizeIndex];

  // Save font size preference
  useEffect(() => {
    localStorage.setItem("quran-font-size-index", fontSizeIndex.toString());
  }, [fontSizeIndex]);

  // Format number based on language
  const formatNumber = (num: number, lang: "bn" | "en"): string => {
    if (lang === "bn") {
      const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return num.toString().split("").map(d => bengaliNumerals[parseInt(d)]).join("");
    }
    return num.toString();
  };

  // Get surah names for current page
  const getSurahNamesForPage = () => {
    if (!pageData) return "";
    const startSurah = surahs.find(s => s.number === pageData.startSurah);
    const endSurah = surahs.find(s => s.number === pageData.endSurah);
    
    if (pageData.startSurah === pageData.endSurah) {
      return startSurah?.nameArabic || "";
    }
    return `${startSurah?.nameArabic || ""} - ${endSurah?.nameArabic || ""}`;
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

  const resetZoom = useCallback(() => {
    setFontSizeIndex(DEFAULT_FONT_INDEX);
    setShowZoomIndicator(true);
    setTimeout(() => setShowZoomIndicator(false), 1500);
    toast.success(language === "bn" ? "ফন্ট সাইজ রিসেট হয়েছে" : "Font size reset");
  }, [language]);

  // Navigate to page
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= 604) {
      navigate(`/read/${page}`);
    }
  }, [navigate]);

  // Touch event handlers for swipe and pinch zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      isPinching.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      // Swipe start
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching.current) {
      // Pinch move - calculate new distance
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      const diff = currentDistance - initialPinchDistance.current;

      // Threshold for zoom change
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

      // Only handle horizontal swipes (ignore vertical scrolling)
      if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX > 0) {
          // Swipe right - previous page (RTL, so go to next page number for Arabic)
          goToPage(currentPage - 1);
        } else {
          // Swipe left - next page
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
          const { data: allVerses } = await supabase
            .from("verses")
            .select("surah_number, verse_number, arabic")
            .gte("surah_number", pageData.startSurah)
            .lte("surah_number", pageData.endSurah)
            .order("surah_number", { ascending: true })
            .order("verse_number", { ascending: true });

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
        if (error) throw error;
        setVerses(data || []);
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

  // Group verses by surah for display
  const versesBySurah = verses.reduce((acc, verse) => {
    if (!acc[verse.surah_number]) {
      acc[verse.surah_number] = [];
    }
    acc[verse.surah_number].push(verse);
    return acc;
  }, {} as Record<number, Verse[]>);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center">
            <span className="text-lg font-arabic text-foreground">
              {getSurahNamesForPage()}
            </span>
            <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? `পৃষ্ঠা ${formatNumber(currentPage, language)} • পারা ${formatNumber(juzNumber, language)}`
                : `Page ${currentPage} • Juz ${juzNumber}`
              }
            </span>
          </div>

          <div className="flex items-center gap-1">
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

            {/* Page Selector */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <List className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <SheetHeader className="p-4 border-b border-border">
                  <SheetTitle className={cn(language === "bn" && "font-bengali")}>
                    {language === "bn" ? "পৃষ্ঠা নির্বাচন করুন" : "Select Page"}
                  </SheetTitle>
                  <Input
                    placeholder={language === "bn" ? "পৃষ্ঠা নম্বর খুঁজুন..." : "Search page number..."}
                    value={pageSearch}
                    onChange={(e) => setPageSearch(e.target.value)}
                    className={cn("mt-2", language === "bn" && "font-bengali")}
                  />
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)]">
                  <div className="p-2 grid grid-cols-5 gap-2">
                    {filteredPages.map((page) => (
                      <Button
                        key={page.pageNumber}
                        variant={page.pageNumber === currentPage ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-10 text-sm font-bengali",
                          page.pageNumber === currentPage && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => {
                          goToPage(page.pageNumber);
                          setSheetOpen(false);
                        }}
                      >
                        {formatNumber(page.pageNumber, language)}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
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

      {/* Content - Arabic Only with Touch Gestures */}
      <main 
        ref={contentRef}
        className="flex-1 overflow-auto pb-24 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            {Object.entries(versesBySurah).map(([surahNum, surahVerses]) => {
              const surah = surahs.find(s => s.number === parseInt(surahNum));
              const isStartOfSurah = surahVerses[0]?.verse_number === 1;

              return (
                <div key={surahNum} className="mb-6">
                  {/* Surah Header (if starting new surah) */}
                  {isStartOfSurah && (
                    <div className="mb-6 text-center">
                      <div className="inline-block bg-card border border-border rounded-lg px-6 py-3 mb-4">
                        <h2 
                          className="font-arabic text-foreground"
                          style={{ fontSize: `${currentFontSize + 4}px` }}
                        >
                          {surah?.nameArabic}
                        </h2>
                        <p className={cn("text-sm text-muted-foreground mt-1", language === "bn" && "font-bengali")}>
                          {language === "bn" ? surah?.nameBengali : surah?.nameEnglish}
                        </p>
                      </div>
                      {/* Bismillah (except for Surah 9) */}
                      {parseInt(surahNum) !== 9 && parseInt(surahNum) !== 1 && (
                        <p 
                          className="font-arabic text-foreground/80 mb-4" 
                          dir="rtl"
                          style={{ fontSize: `${currentFontSize}px` }}
                        >
                          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                      )}
                    </div>
                  )}

                  {/* Verses - Continuous Arabic Text */}
                  <div 
                    className="text-right" 
                    dir="rtl"
                    style={{ lineHeight: currentFontSize > 36 ? 3.5 : 3 }}
                  >
                    {surahVerses.map((verse) => (
                      <span key={`${verse.surah_number}-${verse.verse_number}`} className="inline">
                        <span 
                          className="font-arabic text-foreground"
                          style={{ fontSize: `${currentFontSize}px` }}
                        >
                          {verse.arabic}
                        </span>
                        <span 
                          className="inline-flex items-center justify-center mx-1 text-primary font-arabic"
                          style={{ fontSize: `${currentFontSize * 0.7}px` }}
                        >
                          ﴿{formatNumber(verse.verse_number, "en").split("").map(d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]).join("")}﴾
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Swipe hint for mobile */}
            <div className="text-center text-muted-foreground text-xs mt-8 md:hidden">
              <p className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" 
                  ? "← → সোয়াইপ করে পৃষ্ঠা পরিবর্তন করুন • চিমটি দিয়ে জুম করুন"
                  : "Swipe ← → to change page • Pinch to zoom"
                }
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-screen-md mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= 604}
            className={cn("gap-2", language === "bn" && "font-bengali")}
          >
            <ChevronRight className="h-4 w-4" />
            {language === "bn" ? "পূর্ববর্তী" : "Previous"}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={resetZoom}
              className="h-8 w-8"
              title={language === "bn" ? "রিসেট" : "Reset zoom"}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
              {formatNumber(currentPage, language)} / {formatNumber(604, language)}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn("gap-2", language === "bn" && "font-bengali")}
          >
            {language === "bn" ? "পরবর্তী" : "Next"}
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ReadPage;
