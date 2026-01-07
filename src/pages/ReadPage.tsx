import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { quranPages, getPageByNumber, getJuzForPage } from "@/data/pages";
import { surahs } from "@/data/surahs";
import { Book, ZoomIn, ZoomOut, Search, Info, Volume2, ChevronDown, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, sanitizeArabicText } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { initializeVersesData, getBundledVerses, isBundledDataLoaded } from "@/services/bundledDataLoader";

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
  // Optional: allow parent to control font size (for tablet header controls)
  fontSizeIndex?: number;
  onFontSizeIndexChange?: (index: number) => void;
}

// Font size presets
export const FONT_SIZES = [24, 28, 32, 36, 40, 44, 48, 52];
export const DEFAULT_FONT_INDEX = 2; // 32px default

// In-memory cache for loaded verses (persists across navigation)
const versesCache = new Map<number, Verse[]>();

const ReadPage = ({
  language,
  readingMode = "normal",
  arabicFont = "amiri",
  onArabicFontChange,
  fontSizeIndex: controlledFontSizeIndex,
  onFontSizeIndexChange,
}: ReadPageProps) => {
  const { pageNumber } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPage = parseInt(pageNumber || "1");
  
  // Get target verse from URL query param (format: surah:verse)
  const targetVerseParam = searchParams.get("verse");
  const targetVerse = targetVerseParam ? {
    surah: parseInt(targetVerseParam.split(":")[0]),
    verse: parseInt(targetVerseParam.split(":")[1])
  } : null;
  
  // Store loaded pages data
  const [loadedPages, setLoadedPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(initialPage);
  const [highlightedVerse, setHighlightedVerse] = useState<string | null>(null);

  // Keep currentVisiblePage in sync when navigating directly to a page URL
  useEffect(() => {
    setCurrentVisiblePage(initialPage);
  }, [initialPage]);
  
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

  // Ensure we land on the requested page after refresh (avoid snapping back to page 1)
  const didScrollToInitialRef = useRef(false);
  useEffect(() => {
    didScrollToInitialRef.current = false;
  }, [initialPage]);

  useEffect(() => {
    if (loading) return;
    if (didScrollToInitialRef.current) return;

    const container = contentRef.current;
    const el = pageRefs.current[initialPage];
    if (!container || !el) return;

    didScrollToInitialRef.current = true;

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "auto", block: "start" });
      
      // If we have a target verse from URL, scroll to and highlight it
      if (targetVerse) {
        setTimeout(() => {
          const verseKey = `${initialPage}-${targetVerse.surah}-${targetVerse.verse}`;
          const verseEl = verseRefs.current[verseKey];
          if (verseEl) {
            verseEl.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedVerse(verseKey);
            // Remove highlight after 3 seconds
            setTimeout(() => setHighlightedVerse(null), 3000);
          }
        }, 300);
      }
    });
  }, [loading, loadedPages, initialPage, targetVerse]);

  // Font zoom state - use controlled mode if parent provides props
  const [internalFontSizeIndex, setInternalFontSizeIndex] = useState(() => {
    const saved = localStorage.getItem("quran-font-size-index");
    return saved ? parseInt(saved) : DEFAULT_FONT_INDEX;
  });

  // Use controlled value if provided, otherwise use internal state
  const fontSizeIndex = controlledFontSizeIndex !== undefined ? controlledFontSizeIndex : internalFontSizeIndex;
  const setFontSizeIndex = onFontSizeIndexChange || setInternalFontSizeIndex;

  const [showZoomIndicator, setShowZoomIndicator] = useState(false);

  // Touch gesture refs for pinch zoom
  const initialPinchDistance = useRef<number>(0);
  const isPinching = useRef<boolean>(false);

  const currentFontSize = FONT_SIZES[fontSizeIndex];
  const currentPageData = getPageByNumber(currentVisiblePage);
  const juzNumber = getJuzForPage(currentVisiblePage);

  // Save font size preference (only for internal state mode)
  useEffect(() => {
    if (controlledFontSizeIndex === undefined) {
      localStorage.setItem("quran-font-size-index", fontSizeIndex.toString());
    }
  }, [fontSizeIndex, controlledFontSizeIndex]);

  // Save last read page
  // - Always persist the current URL page on entry/refresh
  // - Then keep updating as the user scrolls
  useEffect(() => {
    if (!Number.isFinite(initialPage)) return;
    localStorage.setItem("quran-last-read-page", String(initialPage));
  }, [initialPage]);

  // Save last read page (debounced to prevent rapid updates)
  const lastSavedPage = useRef<number | null>(null);
  useEffect(() => {
    if (lastSavedPage.current === currentVisiblePage) return;
    lastSavedPage.current = currentVisiblePage;
    localStorage.setItem("quran-last-read-page", currentVisiblePage.toString());
  }, [currentVisiblePage]);

  // Auto-save reading position as user scrolls (track most visible verse)
  const verseObserverRef = useRef<IntersectionObserver | null>(null);
  const lastAutoSavedVerse = useRef<string | null>(null);
  
  // Set up verse visibility tracking for auto-save
  useEffect(() => {
    if (loading) return;
    
    const visibleVerses = new Map<string, number>();
    
    verseObserverRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const verseKey = entry.target.getAttribute('data-verse-key');
          if (!verseKey) continue;
          
          if (entry.isIntersecting) {
            visibleVerses.set(verseKey, entry.intersectionRatio);
          } else {
            visibleVerses.delete(verseKey);
          }
        }
        
        // Find the most visible verse
        let bestKey: string | null = null;
        let bestRatio = 0;
        for (const [key, ratio] of visibleVerses.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestKey = key;
          }
        }
        
        // Auto-save if we have a clearly visible verse (>50% visible)
        if (bestKey && bestRatio > 0.5 && lastAutoSavedVerse.current !== bestKey) {
          lastAutoSavedVerse.current = bestKey;
          setLastReadVerse(bestKey);
          localStorage.setItem("quran-last-read-verse", bestKey);
          const versePage = bestKey.split("-")[0];
          if (versePage) localStorage.setItem("quran-last-read-page", versePage);
          window.dispatchEvent(new CustomEvent("quran:lastReadChanged", { detail: { verseKey: bestKey } }));
        }
      },
      {
        root: contentRef.current,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );
    
    // Observe all verse elements
    Object.values(verseRefs.current).forEach((el) => {
      if (el) verseObserverRef.current?.observe(el);
    });
    
    return () => {
      verseObserverRef.current?.disconnect();
    };
  }, [loading, loadedPages]);


  // Handle verse click - mark as last read (with toast feedback)
  const handleVerseClick = useCallback((pageNum: number, surahNumber: number, verseNumber: number) => {
    const verseKey = `${pageNum}-${surahNumber}-${verseNumber}`;
    setLastReadVerse(verseKey);
    localStorage.setItem("quran-last-read-verse", verseKey);
    localStorage.setItem("quran-last-read-page", String(pageNum));
    lastAutoSavedVerse.current = verseKey; // Sync with auto-save
    window.dispatchEvent(new CustomEvent("quran:lastReadChanged", { detail: { verseKey } }));
    toast.success(
      language === "bn" 
        ? `সূরা ${surahNumber}:${verseNumber} সংরক্ষিত` 
        : `Saved ${surahNumber}:${verseNumber}`,
      { duration: 1000, className: language === "bn" ? "font-bengali text-sm" : "text-sm" }
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

  // Use the unified sanitizer from utils

  // Get primary surah for current page - memoize to ensure updates
  const primarySurah = currentPageData 
    ? surahs.find(s => s.number === currentPageData.startSurah) 
    : surahs[0];

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

  // Calculate expected verse count for a page based on page data
  const calculateExpectedVerseCount = useCallback((pageData: ReturnType<typeof getPageByNumber>): number => {
    if (!pageData) return 0;

    const getSurahTotalVerses = (surahNumber: number) => {
      return surahs.find((s) => s.number === surahNumber)?.totalVerses ?? 0;
    };

    if (pageData.startSurah === pageData.endSurah) {
      return pageData.endVerse - pageData.startVerse + 1;
    }

    let count = 0;
    for (let surah = pageData.startSurah; surah <= pageData.endSurah; surah++) {
      const total = getSurahTotalVerses(surah);
      if (!total) return 0;

      const start = surah === pageData.startSurah ? pageData.startVerse : 1;
      const end = surah === pageData.endSurah ? pageData.endVerse : total;
      count += end - start + 1;
    }

    return count;
  }, []);

  // Fetch verses from Supabase database
  const fetchVersesFromSupabase = useCallback(async (pageData: ReturnType<typeof getPageByNumber>): Promise<Verse[]> => {
    if (!pageData) return [];
    
    try {
      let verses: Verse[] = [];
      
      if (pageData.startSurah === pageData.endSurah) {
        const { data, error } = await supabase
          .from("verses")
          .select("surah_number, verse_number, arabic")
          .eq("surah_number", pageData.startSurah)
          .gte("verse_number", pageData.startVerse)
          .lte("verse_number", pageData.endVerse)
          .order("verse_number", { ascending: true });

        if (error) throw error;
        verses = data || [];
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
          verses = allVerses.filter(v => {
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
      
      return verses;
    } catch (error) {
      console.error("Error fetching verses from Supabase:", error);
      return [];
    }
  }, []);

  // Fetch verses for a specific page (with caching) - uses bundled data first, falls back to Supabase
  const fetchVersesForPage = useCallback(async (pageNum: number): Promise<Verse[]> => {
    // Check cache first
    if (versesCache.has(pageNum)) {
      return versesCache.get(pageNum)!;
    }

    const pageData = getPageByNumber(pageNum);
    if (!pageData) return [];

    // Calculate expected verse count for this page
    const expectedCount = pageData.startSurah === pageData.endSurah 
      ? pageData.endVerse - pageData.startVerse + 1
      : calculateExpectedVerseCount(pageData);

    // Try bundled data first (works offline)
    let bundledVerses: Verse[] = [];
    try {
      await initializeVersesData();
      
      if (isBundledDataLoaded()) {
        // Collect verses from all surahs in this page
        for (let surahNum = pageData.startSurah; surahNum <= pageData.endSurah; surahNum++) {
          const surahVerses = getBundledVerses(surahNum);
          
          const filtered = surahVerses.filter(v => {
            if (surahNum === pageData.startSurah && surahNum === pageData.endSurah) {
              return v.verseNumber >= pageData.startVerse && v.verseNumber <= pageData.endVerse;
            }
            if (surahNum === pageData.startSurah) {
              return v.verseNumber >= pageData.startVerse;
            }
            if (surahNum === pageData.endSurah) {
              return v.verseNumber <= pageData.endVerse;
            }
            return true;
          }).map(v => ({
            surah_number: v.surahNumber,
            verse_number: v.verseNumber,
            arabic: v.arabic
          }));
          
          bundledVerses.push(...filtered);
        }
        
        // Sort by surah and verse number to ensure correct order
        bundledVerses.sort((a, b) => {
          if (a.surah_number !== b.surah_number) return a.surah_number - b.surah_number;
          return a.verse_number - b.verse_number;
        });
        
        // Verify bundled data completeness
        const validateBundledVerses = () => {
          if (bundledVerses.length !== expectedCount) return false;

          for (let surahNum = pageData.startSurah; surahNum <= pageData.endSurah; surahNum++) {
            const start = surahNum === pageData.startSurah ? pageData.startVerse : 1;
            const end = surahNum === pageData.endSurah ? pageData.endVerse : (surahs.find(s => s.number === surahNum)?.totalVerses ?? 0);
            if (!end) return false;

            const slice = bundledVerses
              .filter(v => v.surah_number === surahNum)
              .sort((a, b) => a.verse_number - b.verse_number);

            const expectedSliceCount = end - start + 1;
            if (slice.length !== expectedSliceCount) return false;

            for (let i = 0; i < slice.length; i++) {
              if (slice[i].verse_number !== start + i) return false;
            }
          }

          return true;
        };

        if (validateBundledVerses()) {
          versesCache.set(pageNum, bundledVerses);
          return bundledVerses;
        }

        console.log(
          `Page ${pageNum}: Bundled data incomplete (got ${bundledVerses.length}, expected ${expectedCount}), falling back to database`
        );
      }
    } catch (error) {
      console.log("Bundled data not available, trying Supabase:", error);
    }

    // Fallback to Supabase if bundled data is incomplete or not available
    const supabaseVerses = await fetchVersesFromSupabase(pageData);
    
    if (supabaseVerses.length > 0) {
      versesCache.set(pageNum, supabaseVerses);
      return supabaseVerses;
    }
    
    // If Supabase also fails, return whatever bundled data we have
    if (bundledVerses.length > 0) {
      versesCache.set(pageNum, bundledVerses);
      return bundledVerses;
    }
    
    return [];
  }, [calculateExpectedVerseCount, fetchVersesFromSupabase]);

  // Load initial pages
  useEffect(() => {
    const loadInitialPages = async () => {
      setLoading(true);

      try {
        // Load a smaller window: just the target page + 1 page after for faster initial render
        const startPage = Math.max(initialPage - 1, 1);
        const endPage = Math.min(initialPage + 1, 604);
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

        // Fetch all pages in parallel for faster loading
        const pagesData = await Promise.all(
          pageNumbers.map(async (pageNum) => {
            try {
              const verses = await fetchVersesForPage(pageNum);
              return {
                pageNumber: pageNum,
                verses,
                juzNumber: getJuzForPage(pageNum),
              };
            } catch (e) {
              console.error(`Failed to load page ${pageNum}:`, e);
              return {
                pageNumber: pageNum,
                verses: [],
                juzNumber: getJuzForPage(pageNum),
              };
            }
          })
        );

        setLoadedPages(pagesData);
      } catch (error) {
        console.error("Failed to load initial pages:", error);
        toast.error(language === "bn" ? "পেজ লোড করতে সমস্যা হচ্ছে" : "Failed to load pages");
        setLoadedPages([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPages();
  }, [initialPage, fetchVersesForPage, language]);

  // Preload next 3 pages in background for smoother scrolling
  useEffect(() => {
    if (loading || loadedPages.length === 0) return;

    const lastLoadedPage = loadedPages[loadedPages.length - 1]?.pageNumber || 0;
    const pagesToPreload: number[] = [];
    
    for (let i = lastLoadedPage + 1; i <= Math.min(lastLoadedPage + 3, 604); i++) {
      if (!versesCache.has(i)) pagesToPreload.push(i);
    }

    // Preload in background (don't await, just cache)
    pagesToPreload.forEach((pageNum) => {
      fetchVersesForPage(pageNum); // This will cache the result
    });
  }, [loading, loadedPages, fetchVersesForPage]);

  const loadMorePagesDown = useCallback(async () => {
    if (loadingMore || loadedPages.length === 0) return;
    
    const lastPage = loadedPages[loadedPages.length - 1]?.pageNumber || 0;
    if (lastPage >= 604) return;

    setLoadingMore(true);
    
    // Build list of pages to load
    const pageNumbers: number[] = [];
    for (let i = lastPage + 1; i <= Math.min(lastPage + 3, 604); i++) {
      if (!loadedPages.some(p => p.pageNumber === i)) pageNumbers.push(i);
    }

    // Fetch in parallel
    const newPages = await Promise.all(
      pageNumbers.map(async (pageNum) => {
        const verses = await fetchVersesForPage(pageNum);
        return { pageNumber: pageNum, verses, juzNumber: getJuzForPage(pageNum) };
      })
    );
    
    if (newPages.length > 0) {
      setLoadedPages(prev => [...prev, ...newPages]);
    }
    setLoadingMore(false);
  }, [loadedPages, loadingMore, fetchVersesForPage]);

  // Load more pages when scrolling up
  const loadMorePagesUp = useCallback(async () => {
    if (loadingMore || loadedPages.length === 0) return;

    const firstPage = loadedPages[0]?.pageNumber || 1;
    if (firstPage <= 1) return;

    const container = contentRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    setLoadingMore(true);
    
    // Build list of pages to load
    const pageNumbers: number[] = [];
    for (let i = Math.max(firstPage - 3, 1); i < firstPage; i++) {
      if (!loadedPages.some(p => p.pageNumber === i)) pageNumbers.push(i);
    }

    // Fetch in parallel
    const newPages = await Promise.all(
      pageNumbers.map(async (pageNum) => {
        const verses = await fetchVersesForPage(pageNum);
        return { pageNumber: pageNum, verses, juzNumber: getJuzForPage(pageNum) };
      })
    );

    if (newPages.length > 0) {
      setLoadedPages((prev) => [...newPages, ...prev]);
    }

    // Preserve visual position when prepending content
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const c = contentRef.current;
        if (!c) return;
        const newScrollHeight = c.scrollHeight;
        const diff = newScrollHeight - prevScrollHeight;
        if (diff > 0) c.scrollTop += diff;
      });
    });

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
        // Don't auto-prepend pages on initial mount; it can pull us back to page 1
        // before we scroll to the requested page.
        if (!didScrollToInitialRef.current) return;

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

  // Keep track of intersection ratios per page so we can reliably pick the most visible page
  const visibilityByPageRef = useRef<Record<number, number>>({});

  // Track which page is currently visible (within the scroll container)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    // Reset visibility state whenever the rendered pages window changes
    visibilityByPageRef.current = {};

    const rootEl = contentRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const pageNum = Number(el.dataset.page || 1);
          visibilityByPageRef.current[pageNum] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        }

        // Pick the page with the highest visible ratio
        let bestPage = initialPage;
        let bestRatio = 0;
        for (const [pageStr, ratio] of Object.entries(visibilityByPageRef.current)) {
          const p = Number(pageStr);
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestPage = p;
          }
        }

        // Ignore tiny intersections (prevents sticky headers / borders from biasing the result)
        if (bestRatio < 0.15) return;

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setCurrentVisiblePage((prev) => (prev !== bestPage ? bestPage : prev));
        }, 150);
      },
      {
        root: rootEl,
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9],
      }
    );

    // Observe all loaded page elements
    Object.values(pageRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observerRef.current?.disconnect();
    };
  }, [loadedPages, initialPage]);

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
      {/* Top Header Bar - Mobile/Tablet */}
      <header className={cn(
        "sticky top-0 z-10 backdrop-blur border-b border-border/50 lg:hidden",
        readingMode === "sepia" ? "bg-[hsl(35,30%,94%)]/95" : "bg-background/95"
      )}>
        <div className="flex items-center justify-between px-3 py-2.5 max-w-4xl mx-auto">
          {/* Surah Selector */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-muted/50 px-2.5 py-1.5 rounded-lg transition-colors -ml-1">
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary",
                  language === "bn" && "font-bengali"
                )}>
                  {formatNum(primarySurah?.number || 1, language)}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-foreground leading-tight font-arabic">
                    {primarySurah?.nameArabic}
                  </span>
                  <span className={cn(
                    "text-xs text-muted-foreground leading-tight",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? primarySurah?.nameBengali : primarySurah?.nameEnglish}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
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
                              <p className="text-lg text-foreground font-arabic">
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

          {/* Page/Juz Info */}
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex flex-col items-end text-right",
              language === "bn" && "font-bengali"
            )}>
              <span className="text-xs text-muted-foreground">
                {language === "bn" ? `পারা ${formatNum(juzNumber, language)}` : `Juz ${juzNumber}`}
              </span>
              <span className="text-sm font-medium text-foreground">
                {language === "bn" 
                  ? `পৃষ্ঠা ${formatNum(currentVisiblePage, language)}`
                  : `Page ${currentVisiblePage}`
                }
              </span>
            </div>
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
                                  className="text-foreground surah-title-text font-arabic"
                                  style={{ fontSize: `${currentFontSize + 8}px` }}
                                >
                                  {surah?.nameArabic}
                                </h1>
                              </div>
                            </div>


                            {/* Bismillah */}
                            {parseInt(surahNum) !== 9 && parseInt(surahNum) !== 1 && (
                              <p 
                                className="text-foreground/80 mt-8 bismillah-text font-arabic"
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
                            const isHighlighted = highlightedVerse === verseKey;
                            
                            return (
                              <span 
                                key={verseKey} 
                                ref={(el) => { verseRefs.current[verseKey] = el; }}
                                data-verse-key={verseKey}
                                className={cn(
                                  "inline cursor-pointer rounded transition-all duration-300",
                                  isLastRead && "bg-primary/20 px-1",
                                  isHighlighted && "bg-primary/30 px-1 ring-2 ring-primary/50 animate-pulse"
                                )}
                                onClick={() => handleVerseClick(pageData.pageNumber, verse.surah_number, verse.verse_number)}
                              >
                              <span 
                                className="text-foreground font-arabic"
                                style={{ fontSize: `${currentFontSize}px` }}
                              >
                                  {sanitizeArabicText(verse.arabic)}
                                </span>
                                {/* Decorative Verse Number */}
                                <span 
                                  className="verse-number-circle inline-flex items-center justify-center mx-2 font-arabic leading-none"
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
