import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Layers, Bookmark, ChevronRight, Search, BookText } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface MobileNavFooterProps {
  language: "bn" | "en";
}

export const MobileNavFooter = ({ language }: MobileNavFooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSheet, setActiveSheet] = useState<"surah" | "para" | null>(null);
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
      action: () => navigate("/"),
    },
    {
      icon: BookOpen,
      labelEn: "Surahs",
      labelBn: "সূরা",
      path: "/surah",
      isActive: location.pathname.startsWith("/surah"),
      action: () => {
        setSurahSearch("");
        setActiveSheet("surah");
      },
    },
    {
      icon: BookText,
      labelEn: "Read",
      labelBn: "পড়ুন",
      path: "/read",
      isActive: location.pathname.startsWith("/read"),
      action: () => {
        const lastReadPage = localStorage.getItem("quran-last-read-page") || "1";
        navigate(`/read/${lastReadPage}`);
      },
    },
    {
      icon: Layers,
      labelEn: "Paras",
      labelBn: "পারা",
      path: "/para",
      isActive: location.pathname.startsWith("/para"),
      action: () => {
        setParaSearch("");
        setActiveSheet("para");
      },
    },
    {
      icon: Bookmark,
      labelEn: "Bookmarks",
      labelBn: "বুকমার্ক",
      path: "/bookmarks",
      isActive: location.pathname === "/bookmarks",
      action: () => navigate("/bookmarks"),
    },
  ];

  const handleSurahClick = (surahNumber: number) => {
    setActiveSheet(null);
    navigate(`/surah/${surahNumber}`);
  };

  const handleParaClick = (paraNumber: number) => {
    setActiveSheet(null);
    navigate(`/para/${paraNumber}`);
  };

  // Get current surah/para from URL for highlighting
  const surahMatch = location.pathname.match(/\/surah\/(\d+)/);
  const paraMatch = location.pathname.match(/\/para\/(\d+)/);
  const currentSurahNumber = surahMatch ? parseInt(surahMatch[1], 10) : null;
  const currentParaNumber = paraMatch ? parseInt(paraMatch[1], 10) : null;

  // Scroll to current surah when sheet opens
  useEffect(() => {
    if (activeSheet === "surah" && currentSurahNumber && !surahSearch) {
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
  }, [activeSheet, currentSurahNumber, surahSearch]);

  // Scroll to current para when sheet opens
  useEffect(() => {
    if (activeSheet === "para" && currentParaNumber && !paraSearch) {
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
  }, [activeSheet, currentParaNumber, paraSearch]);

  // Filter surahs based on search
  const filteredSurahs = useMemo(() => {
    const query = surahSearch.toLowerCase().trim();
    if (!query) return surahs;
    return surahs.filter((surah) =>
      surah.nameEnglish.toLowerCase().includes(query) ||
      surah.nameBengali.includes(query) ||
      surah.nameArabic.includes(query) ||
      surah.number.toString().includes(query)
    );
  }, [surahSearch]);

  // Filter paras based on search
  const filteredParas = useMemo(() => {
    const query = paraSearch.toLowerCase().trim();
    if (!query) return paras;
    return paras.filter((para) =>
      para.nameEnglish.toLowerCase().includes(query) ||
      para.nameBengali.includes(query) ||
      para.nameArabic.includes(query) ||
      para.number.toString().includes(query)
    );
  }, [paraSearch]);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={item.action}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                item.isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  item.isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  language === "bn" && "font-bengali"
                )}
              >
                {language === "bn" ? item.labelBn : item.labelEn}
              </span>
            </button>
          ))}
        </div>
        {/* Safe area padding for iOS devices */}
        <div className="h-safe-area-inset-bottom bg-background" />
      </nav>

      {/* Surah List Sheet */}
      <Sheet open={activeSheet === "surah"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border space-y-3">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "সূরা নির্বাচন করুন" : "Select Surah"}
            </SheetTitle>
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
          </SheetHeader>
          <ScrollArea className="h-[calc(75vh-110px)]">
            <div className="py-2">
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
                      <span className={cn("font-medium truncate", language === "bn" && "font-bengali")}>
                        {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                      </span>
                      <span className="font-arabic text-sm text-muted-foreground shrink-0">
                        {surah.nameArabic}
                      </span>
                    </div>
                    <span className={cn("text-xs text-muted-foreground font-bengali")}>
                      {surah.nameArabic} • {formatNumber(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Para List Sheet */}
      <Sheet open={activeSheet === "para"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border space-y-3">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "পারা নির্বাচন করুন" : "Select Para"}
            </SheetTitle>
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
          </SheetHeader>
          <ScrollArea className="h-[calc(75vh-110px)]">
            <div className="py-2">
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
                      <span className={cn("font-medium truncate", language === "bn" && "font-bengali")}>
                        {language === "bn" ? para.nameBengali : para.nameEnglish}
                      </span>
                      <span className="font-arabic text-sm text-muted-foreground shrink-0">
                        {para.nameArabic}
                      </span>
                    </div>
                    <span className={cn("text-xs text-muted-foreground font-bengali")}>
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
        </SheetContent>
      </Sheet>
    </>
  );
};
