import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFontSize } from "@/hooks/useFontSize";
import { Home, BookOpen, ChevronRight, Search, BookText, HandHelping, ScrollText, HelpCircle } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Language, t } from "@/types/language";
import { 
  fuzzySearchSurahs, 
  fuzzySearchParas, 
  getClosestSurahMatches, 
  getClosestParaMatches,
  Para 
} from "@/utils/fuzzySearch";

interface MobileNavFooterProps {
  language: Language;
}

export const MobileNavFooter = ({ language }: MobileNavFooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fontSize } = useFontSize();
  const [quranSheetOpen, setQuranSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"surah" | "para">("surah");
  const [surahSearch, setSurahSearch] = useState("");
  const [paraSearch, setParaSearch] = useState("");
  const surahListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const paraListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const navItems = [
    {
      icon: Home,
      labelEn: "Home",
      labelBn: "হোম",
      path: "/",
      isActive: location.pathname === "/",
      action: () => {
        window.dispatchEvent(new CustomEvent("clear-home-search"));
        navigate("/");
      },
    },
    {
      icon: BookOpen,
      labelEn: "Quran",
      labelBn: "কুরআন",
      path: "/surah",
      isActive: location.pathname.startsWith("/surah") || location.pathname.startsWith("/para"),
      action: () => {
        setSurahSearch("");
        setParaSearch("");
        setQuranSheetOpen(true);
      },
    },
    {
      icon: BookText,
      labelEn: "Read",
      labelBn: "পড়ুন",
      path: "/read",
      isActive: location.pathname.startsWith("/read"),
      action: () => {
        navigate("/read");
      },
    },
    {
      icon: ScrollText,
      labelEn: "Hadith",
      labelBn: "হাদিস",
      path: "/hadith",
      isActive: location.pathname.startsWith("/hadith"),
      action: () => navigate("/hadith"),
    },
    {
      icon: HandHelping,
      labelEn: "Dua",
      labelBn: "দোয়া",
      path: "/dua",
      isActive: location.pathname.startsWith("/dua"),
      action: () => navigate("/dua"),
    },
  ];

  const handleSurahClick = (surahNumber: number) => {
    setQuranSheetOpen(false);
    navigate(`/surah/${surahNumber}`);
  };

  const handleParaClick = (paraNumber: number) => {
    setQuranSheetOpen(false);
    navigate(`/para/${paraNumber}`);
  };

  // Get current surah/para from URL for highlighting
  const surahMatch = location.pathname.match(/\/surah\/(\d+)/);
  const paraMatch = location.pathname.match(/\/para\/(\d+)/);
  const currentSurahNumber = surahMatch ? parseInt(surahMatch[1], 10) : null;
  const currentParaNumber = paraMatch ? parseInt(paraMatch[1], 10) : null;

  // Scroll to current surah when sheet opens
  useEffect(() => {
    if (quranSheetOpen && activeTab === "surah" && currentSurahNumber && !surahSearch) {
      const timer = setTimeout(() => {
        const element = surahListRefs.current[currentSurahNumber];
        if (element) {
          element.scrollIntoView({
            behavior: 'instant',
            block: 'center'
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [quranSheetOpen, activeTab, currentSurahNumber, surahSearch]);

  // Scroll to current para when sheet opens
  useEffect(() => {
    if (quranSheetOpen && activeTab === "para" && currentParaNumber && !paraSearch) {
      const timer = setTimeout(() => {
        const element = paraListRefs.current[currentParaNumber];
        if (element) {
          element.scrollIntoView({
            behavior: 'instant',
            block: 'center'
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [quranSheetOpen, activeTab, currentParaNumber, paraSearch]);

  // Filter surahs based on fuzzy search with "Did you mean..." fallback
  const { filteredSurahs, didYouMeanSurahs } = useMemo(() => {
    const query = surahSearch.trim();
    if (!query) return { filteredSurahs: surahs, didYouMeanSurahs: [] };
    
    const results = fuzzySearchSurahs(surahs, query);
    if (results.length > 0) {
      return { filteredSurahs: results, didYouMeanSurahs: [] };
    }
    
    // No matches - get closest for "Did you mean..."
    if (query.length >= 2) {
      const closest = getClosestSurahMatches(surahs, query, 5);
      return { filteredSurahs: [], didYouMeanSurahs: closest.map(c => c.surah) };
    }
    
    return { filteredSurahs: [], didYouMeanSurahs: [] };
  }, [surahSearch]);

  // Filter paras based on fuzzy search with "Did you mean..." fallback
  const { filteredParas, didYouMeanParas } = useMemo(() => {
    const query = paraSearch.trim();
    if (!query) return { filteredParas: paras, didYouMeanParas: [] };
    
    const results = fuzzySearchParas(paras as Para[], query);
    if (results.length > 0) {
      return { filteredParas: results, didYouMeanParas: [] };
    }
    
    // No matches - get closest for "Did you mean..."
    if (query.length >= 2) {
      const closest = getClosestParaMatches(paras as Para[], query, 5);
      return { filteredParas: [], didYouMeanParas: closest.map(c => c.para) };
    }
    
    return { filteredParas: [], didYouMeanParas: [] };
  }, [paraSearch]);

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm lg:hidden overflow-hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-5 py-1.5 sm:py-2 px-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={item.action}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-1.5 sm:py-2 rounded-lg transition-colors min-w-0",
                item.isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform",
                  item.isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "font-medium truncate max-w-full px-0.5",
                  language === "bn" && "font-bengali"
                )}
                style={{ fontSize: `${Math.max(fontSize - 4, 11)}px` }}
              >
                {language === "bn" ? item.labelBn : item.labelEn}
              </span>
            </button>
          ))}
        </div>
      </nav>
      {/* Quran Sheet with Tabs for Surah and Para */}
      <Sheet open={quranSheetOpen} onOpenChange={setQuranSheetOpen}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কুরআন" : "Quran"}
            </SheetTitle>
          </SheetHeader>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "surah" | "para")} className="flex flex-col h-[calc(75vh-60px)]">
            <TabsList className="grid w-full grid-cols-2 mx-4 mt-3" style={{ width: 'calc(100% - 32px)' }}>
              <TabsTrigger value="surah" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "সূরা" : "Surah"}
              </TabsTrigger>
              <TabsTrigger value="para" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "পারা" : "Para"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="surah" className="flex-1 mt-0 overflow-hidden">
              <div className="px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={surahSearch}
                    onChange={(e) => setSurahSearch(e.target.value)}
                    placeholder={language === "bn" ? "সূরা খুঁজুন..." : "Search surah..."}
                    className={cn(
                      "pl-9",
                      language === "bn" && "font-bengali placeholder:font-bengali"
                    )}
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(75vh-200px)]">
                <div className="py-2">
                  {/* Did you mean section */}
                  {filteredSurahs.length === 0 && didYouMeanSurahs.length > 0 && (
                    <>
                      <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
                        <p className={cn(
                          "text-sm flex items-center gap-1.5 text-amber-700 dark:text-amber-300",
                          language === "bn" && "font-bengali"
                        )}>
                          <HelpCircle className="h-4 w-4" />
                          {language === "bn" ? "আপনি কি খুঁজছেন?" : "Did you mean..."}
                        </p>
                      </div>
                      {didYouMeanSurahs.map((surah) => (
                        <button
                          key={surah.number}
                          onClick={() => handleSurahClick(surah.number)}
                          className="flex items-center gap-3 w-full px-4 py-3 transition-colors hover:bg-amber-50/50 dark:hover:bg-amber-900/30"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold font-bengali bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                            {formatNumber(surah.number, language)}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between gap-2">
                              <span className={cn("font-medium text-base truncate", language === "bn" && "font-bengali")}>
                                {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                              </span>
                              <span className="font-arabic text-sm text-muted-foreground shrink-0">
                                {surah.nameArabic}
                              </span>
                            </div>
                            <span className={cn("text-sm text-muted-foreground font-bengali")}>
                              {surah.nameArabic} • {formatNumber(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        </button>
                      ))}
                    </>
                  )}
                  
                  {/* No results message */}
                  {filteredSurahs.length === 0 && didYouMeanSurahs.length === 0 && surahSearch.trim().length >= 2 && (
                    <div className="text-center py-8 px-4">
                      <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                        {language === "bn" ? "কোনো সূরা পাওয়া যায়নি" : "No surahs found"}
                      </p>
                    </div>
                  )}
                  
                  {/* Regular surah list */}
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      ref={(el) => { surahListRefs.current[surah.number] = el; }}
                      onClick={() => handleSurahClick(surah.number)}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 transition-colors",
                        currentSurahNumber === surah.number
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold font-bengali",
                        currentSurahNumber === surah.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {formatNumber(surah.number, language)}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn("font-medium text-base truncate", language === "bn" && "font-bengali")}>
                            {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                          </span>
                          <span className="font-arabic text-sm text-muted-foreground shrink-0">
                            {surah.nameArabic}
                          </span>
                        </div>
                        <span className={cn("text-sm text-muted-foreground font-bengali")}>
                          {surah.nameArabic} • {formatNumber(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="para" className="flex-1 mt-0 overflow-hidden">
              <div className="px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={paraSearch}
                    onChange={(e) => setParaSearch(e.target.value)}
                    placeholder={language === "bn" ? "পারা খুঁজুন..." : "Search para..."}
                    className={cn(
                      "pl-9",
                      language === "bn" && "font-bengali placeholder:font-bengali"
                    )}
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(75vh-200px)]">
                <div className="py-2">
                  {/* Did you mean section */}
                  {filteredParas.length === 0 && didYouMeanParas.length > 0 && (
                    <>
                      <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
                        <p className={cn(
                          "text-sm flex items-center gap-1.5 text-amber-700 dark:text-amber-300",
                          language === "bn" && "font-bengali"
                        )}>
                          <HelpCircle className="h-4 w-4" />
                          {language === "bn" ? "আপনি কি খুঁজছেন?" : "Did you mean..."}
                        </p>
                      </div>
                      {didYouMeanParas.map((para) => (
                        <button
                          key={para.number}
                          onClick={() => handleParaClick(para.number)}
                          className="flex items-center gap-3 w-full px-4 py-3 transition-colors hover:bg-amber-50/50 dark:hover:bg-amber-900/30"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold font-bengali bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                            {formatNumber(para.number, language)}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between gap-2">
                              <span className={cn("font-medium text-base truncate", language === "bn" && "font-bengali")}>
                                {language === "bn" ? para.nameBengali : para.nameEnglish}
                              </span>
                              <span className="font-arabic text-sm text-muted-foreground shrink-0">
                                {para.nameArabic}
                              </span>
                            </div>
                            <span className={cn("text-sm text-muted-foreground font-bengali")}>
                              {para.nameArabic} • {language === "bn"
                                ? `সূরা ${formatNumber(para.startSurah, language)}:${formatNumber(para.startVerse, language)} - ${formatNumber(para.endSurah, language)}:${formatNumber(para.endVerse, language)}`
                                : `Surah ${para.startSurah}:${para.startVerse} - ${para.endSurah}:${para.endVerse}`}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        </button>
                      ))}
                    </>
                  )}
                  
                  {/* No results message */}
                  {filteredParas.length === 0 && didYouMeanParas.length === 0 && paraSearch.trim().length >= 2 && (
                    <div className="text-center py-8 px-4">
                      <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                        {language === "bn" ? "কোনো পারা পাওয়া যায়নি" : "No paras found"}
                      </p>
                    </div>
                  )}
                  
                  {/* Regular para list */}
                  {filteredParas.map((para) => (
                    <button
                      key={para.number}
                      ref={(el) => { paraListRefs.current[para.number] = el; }}
                      onClick={() => handleParaClick(para.number)}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 transition-colors",
                        currentParaNumber === para.number
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold font-bengali",
                        currentParaNumber === para.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {formatNumber(para.number, language)}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn("font-medium text-base truncate", language === "bn" && "font-bengali")}>
                            {language === "bn" ? para.nameBengali : para.nameEnglish}
                          </span>
                          <span className="font-arabic text-sm text-muted-foreground shrink-0">
                            {para.nameArabic}
                          </span>
                        </div>
                        <span className={cn("text-sm text-muted-foreground font-bengali")}>
                          {para.nameArabic} • {language === "bn"
                            ? `সূরা ${formatNumber(para.startSurah, language)}:${formatNumber(para.startVerse, language)} - ${formatNumber(para.endSurah, language)}:${formatNumber(para.endVerse, language)}`
                            : `Surah ${para.startSurah}:${para.startVerse} - ${para.endSurah}:${para.endVerse}`}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
};
