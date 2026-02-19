import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Search, Loader2, BookOpen, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { useBookById } from "@/hooks/useBookLibrary";
import { getReadingProgress } from "@/services/pdfStorageService";
import { PDFViewer } from "@/components/PDFViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { quranPages } from "@/data/pages";

interface DirectPDFReaderProps {
  language: Language;
}

// Compute surah → first Mushaf page mapping from quranPages data
const surahToPage: Record<number, number> = {};
for (const page of quranPages) {
  if (!surahToPage[page.startSurah]) {
    surahToPage[page.startSurah] = page.pageNumber;
  }
}

// Build a sorted list of [surahNumber, startPage] for reverse lookup
const surahPageEntries = Object.entries(surahToPage)
  .map(([s, p]) => ({ surah: Number(s), page: p }))
  .sort((a, b) => a.page - b.page);

// Given a mushaf page number, return the surah number active on that page
const getSurahFromPage = (page: number): number => {
  let currentSurah = 1;
  for (const entry of surahPageEntries) {
    if (entry.page <= page) currentSurah = entry.surah;
    else break;
  }
  return currentSurah;
};

// Compute para start page (approximate: para 1 = page 1, para N ~ page (N-1)*20 + 1)
// We use a simple approximation since para pages depend on the specific PDF layout
const paraToPage: Record<number, number> = {
  1: 1, 2: 22, 3: 42, 4: 62, 5: 82, 6: 102, 7: 121, 8: 142,
  9: 162, 10: 182, 11: 201, 12: 222, 13: 242, 14: 262, 15: 282,
  16: 302, 17: 322, 18: 342, 19: 362, 20: 382, 21: 402, 22: 422,
  23: 442, 24: 462, 25: 482, 26: 502, 27: 522, 28: 542, 29: 562, 30: 582,
};

const DirectPDFReader = ({ language }: DirectPDFReaderProps) => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: bookLoading } = useBookById(bookId);

  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [navSheetOpen, setNavSheetOpen] = useState(false);
  const [navTab, setNavTab] = useState<"page" | "surah" | "para">("page");
  const [pageInput, setPageInput] = useState("1");
  const [surahSearch, setSurahSearch] = useState("");
  const [paraSearch, setParaSearch] = useState("");
  const surahItemRefs = useRef<Record<number, HTMLButtonElement | null>>({});


  const isBn = language === "bn";

  // Load initial reading progress then stream PDF
  useEffect(() => {
    if (!book) return;

    const load = async () => {
      setIsLoadingPdf(true);
      setLoadError(null);

      try {
        // Restore reading progress
        const progress = await getReadingProgress(book.id);
        const startPage = progress?.current_page || 1;
        setCurrentPage(startPage);
        setPageInput(String(startPage));

        // Stream PDF directly from URL
        const response = await fetch(book.pdf_url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        setPdfBlob(blob);
      } catch (err) {
        console.error("Failed to load PDF:", err);
        setLoadError(isBn ? "পিডিএফ লোড করতে ব্যর্থ হয়েছে" : "Failed to load PDF");
      } finally {
        setIsLoadingPdf(false);
      }
    };

    load();
  }, [book]);

  const handlePageChange = useCallback((page: number, total: number) => {
    setCurrentPage(page);
    setPageInput(String(page));
    setTotalPages(total);
  }, []);

  const navigateToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages || 99999));
    setCurrentPage(clamped);
    setPageInput(String(clamped));
    setNavSheetOpen(false);
  };

  const filteredSurahs = useMemo(() => {
    const q = surahSearch.toLowerCase().trim();
    if (!q) return surahs;
    return surahs.filter(s =>
      s.nameEnglish.toLowerCase().includes(q) ||
      s.nameBengali.includes(q) ||
      String(s.number).includes(q)
    );
  }, [surahSearch]);

  const filteredParas = useMemo(() => {
    const q = paraSearch.toLowerCase().trim();
    if (!q) return paras;
    return paras.filter(p =>
      p.nameEnglish.toLowerCase().includes(q) ||
      p.nameBengali.includes(q) ||
      String(p.number).includes(q)
    );
  }, [paraSearch]);

  const currentSurahNumber = useMemo(() => getSurahFromPage(currentPage), [currentPage]);

  const jumpToCurrentSurah = useCallback(() => {
    setSurahSearch("");
    setTimeout(() => {
      const el = surahItemRefs.current[currentSurahNumber];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, [currentSurahNumber]);

  const toBengali = (n: number) =>
    String(n).split("").map(d => "০১২৩৪৫৬৭৮৯"[parseInt(d)] ?? d).join("");

  const formatNum = (n: number) => isBn ? toBengali(n) : String(n);


  if (bookLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background gap-4 px-4">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
        <p className={cn("text-muted-foreground text-center", isBn && "font-bengali")}>
          {isBn ? "বইটি পাওয়া যায়নি" : "Book not found"}
        </p>
        <Button variant="outline" onClick={() => navigate("/read")}>
          {isBn ? "ফিরে যান" : "Go Back"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate("/read")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-semibold truncate leading-tight", isBn && "font-bengali")}>
            {isBn ? book.title_bengali : book.title_english}
          </p>
          {totalPages > 0 && (
            <p className="text-xs text-muted-foreground">
              {formatNum(currentPage)} / {formatNum(totalPages)}
            </p>
          )}
        </div>

        {/* Navigation Sheet Trigger */}
        <Sheet open={navSheetOpen} onOpenChange={setNavSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
              <Navigation className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl px-0 flex flex-col">
            <SheetHeader className="px-4 pb-3 border-b border-border shrink-0">
              <SheetTitle className={cn("text-center", isBn && "font-bengali")}>
                {isBn ? "নেভিগেশন" : "Navigation"}
              </SheetTitle>
            </SheetHeader>

            <Tabs value={navTab} onValueChange={(v) => setNavTab(v as "page" | "surah" | "para")} className="flex flex-col flex-1 min-h-0">
              <TabsList className="grid w-full grid-cols-3 mx-4 mt-3" style={{ width: "calc(100% - 32px)" }}>
                <TabsTrigger value="page" className={isBn ? "font-bengali" : ""}>
                  {isBn ? "পৃষ্ঠা" : "Page"}
                </TabsTrigger>
                <TabsTrigger value="surah" className={isBn ? "font-bengali" : ""}>
                  {isBn ? "সূরা" : "Surah"}
                </TabsTrigger>
                <TabsTrigger value="para" className={isBn ? "font-bengali" : ""}>
                  {isBn ? "পারা" : "Para"}
                </TabsTrigger>
              </TabsList>

              {/* Page Tab */}
              <TabsContent value="page" className="flex-1 px-4 py-4 space-y-6">
                <div>
                  <p className={cn("text-sm text-muted-foreground mb-3", isBn && "font-bengali")}>
                    {isBn ? "পৃষ্ঠা নম্বর লিখুন" : "Enter page number"}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={pageInput}
                      min={1}
                      max={totalPages || undefined}
                      onChange={(e) => setPageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const n = parseInt(pageInput, 10);
                          if (!isNaN(n)) navigateToPage(n);
                        }
                      }}
                      className="flex-1 text-center"
                    />
                    <Button onClick={() => {
                      const n = parseInt(pageInput, 10);
                      if (!isNaN(n)) navigateToPage(n);
                    }} className={isBn ? "font-bengali" : ""}>
                      {isBn ? "যান" : "Go"}
                    </Button>
                  </div>
                </div>

                {totalPages > 0 && (
                  <div className="space-y-2">
                    <p className={cn("text-sm text-muted-foreground", isBn && "font-bengali")}>
                      {isBn ? `পৃষ্ঠা ${formatNum(currentPage)} / ${formatNum(totalPages)}` : `Page ${currentPage} of ${totalPages}`}
                    </p>
                    <Slider
                      value={[currentPage]}
                      min={1}
                      max={totalPages}
                      step={1}
                      onValueChange={([v]) => {
                        setCurrentPage(v);
                        setPageInput(String(v));
                      }}
                      onValueCommit={([v]) => navigateToPage(v)}
                    />
                  </div>
                )}
              </TabsContent>

              {/* Surah Tab */}
              <TabsContent value="surah" className="flex-1 mt-0 overflow-hidden flex flex-col">
                <div className="px-4 py-3 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={surahSearch}
                      onChange={(e) => setSurahSearch(e.target.value)}
                      placeholder={isBn ? "সূরা খুঁজুন..." : "Search surah..."}
                      className={cn("pl-9", isBn && "font-bengali placeholder:font-bengali")}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={jumpToCurrentSurah}
                    className={cn("w-full gap-2 text-primary border-primary/30 hover:bg-primary/5", isBn && "font-bengali")}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {isBn
                      ? `বর্তমান সূরায় যান (${filteredSurahs.find(s => s.number === currentSurahNumber) ? (isBn ? filteredSurahs.find(s => s.number === currentSurahNumber)!.nameBengali : filteredSurahs.find(s => s.number === currentSurahNumber)!.nameEnglish) : ""})`
                      : `Jump to current: ${surahs.find(s => s.number === currentSurahNumber)?.nameEnglish ?? ""}`}
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="py-1">
                    {filteredSurahs.map((surah) => {
                      const page = surahToPage[surah.number];
                      const isCurrent = surah.number === currentSurahNumber;
                      return (
                        <button
                          key={surah.number}
                          ref={(el) => { surahItemRefs.current[surah.number] = el; }}
                          onClick={() => page && navigateToPage(page)}
                          disabled={!page}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-2.5 transition-colors text-left disabled:opacity-40",
                            isCurrent ? "bg-primary/10 hover:bg-primary/15" : "hover:bg-muted"
                          )}
                        >
                          <div className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold font-bengali",
                            isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {formatNum(surah.number)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium truncate", isBn && "font-bengali", isCurrent && "text-primary font-semibold")}>
                              {isBn ? surah.nameBengali : surah.nameEnglish}
                            </p>
                            <p className="text-xs text-muted-foreground font-arabic">
                              {surah.nameArabic}
                            </p>
                          </div>
                          {page && (
                            <span className={cn("text-xs shrink-0 font-bengali", isCurrent ? "text-primary font-medium" : "text-muted-foreground")}>
                              {isBn ? `পৃ. ${formatNum(page)}` : `p. ${page}`}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Para Tab */}
              <TabsContent value="para" className="flex-1 mt-0 overflow-hidden flex flex-col">
                <div className="px-4 py-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={paraSearch}
                      onChange={(e) => setParaSearch(e.target.value)}
                      placeholder={isBn ? "পারা খুঁজুন..." : "Search para..."}
                      className={cn("pl-9", isBn && "font-bengali placeholder:font-bengali")}
                    />
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="py-1">
                    {filteredParas.map((para) => {
                      const page = paraToPage[para.number];
                      return (
                        <button
                          key={para.number}
                          onClick={() => page && navigateToPage(page)}
                          className="flex items-center gap-3 w-full px-4 py-2.5 transition-colors hover:bg-muted text-left"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground font-bengali">
                            {formatNum(para.number)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium truncate", isBn && "font-bengali")}>
                              {isBn ? para.nameBengali : para.nameEnglish}
                            </p>
                            <p className="text-xs text-muted-foreground font-arabic">
                              {para.nameArabic}
                            </p>
                          </div>
                          {page && (
                            <span className="text-xs text-muted-foreground shrink-0 font-bengali">
                              {isBn ? `পৃ. ${formatNum(page)}` : `p. ${page}`}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {(isLoadingPdf || bookLoading) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className={cn("text-sm text-muted-foreground", isBn && "font-bengali")}>
              {isBn ? "পিডিএফ লোড হচ্ছে..." : "Loading PDF..."}
            </p>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background z-10 px-8">
            <BookOpen className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className={cn("text-muted-foreground text-center", isBn && "font-bengali")}>
              {loadError}
            </p>
            <Button variant="outline" onClick={() => navigate("/read")}>
              {isBn ? "ফিরে যান" : "Go Back"}
            </Button>
          </div>
        )}

        {pdfBlob && !loadError && (
          <PDFViewer
            pdfBlob={pdfBlob}
            bookId={book.id}
            initialPage={currentPage}
            language={language}
            onPageChange={handlePageChange}
            controlledPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default DirectPDFReader;
