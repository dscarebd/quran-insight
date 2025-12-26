import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Book, BookOpen, HandHeart, Bookmark, Settings, BookText, ChevronRight, Search } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import appLogo from "@/assets/app-logo.png";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DesktopHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const DesktopHeader = ({ language, onLanguageChange }: DesktopHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quranSheetOpen, setQuranSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"surah" | "para">("surah");
  const [surahSearch, setSurahSearch] = useState("");
  const [paraSearch, setParaSearch] = useState("");
  const surahListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const paraListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Get current surah/para from URL for highlighting
  const surahMatch = location.pathname.match(/\/surah\/(\d+)/);
  const paraMatch = location.pathname.match(/\/para\/(\d+)/);
  const currentSurahNumber = surahMatch ? parseInt(surahMatch[1], 10) : null;
  const currentParaNumber = paraMatch ? parseInt(paraMatch[1], 10) : null;

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

  // Scroll to current surah when sheet opens
  useEffect(() => {
    if (quranSheetOpen && activeTab === "surah" && currentSurahNumber && !surahSearch) {
      const timer = setTimeout(() => {
        const element = surahListRefs.current[currentSurahNumber];
        if (element) {
          element.scrollIntoView({ behavior: 'instant', block: 'center' });
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
          element.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [quranSheetOpen, activeTab, currentParaNumber, paraSearch]);

  const handleSurahClick = (surahNumber: number) => {
    setQuranSheetOpen(false);
    navigate(`/surah/${surahNumber}`);
  };

  const handleParaClick = (paraNumber: number) => {
    setQuranSheetOpen(false);
    navigate(`/para/${paraNumber}`);
  };

  const handleReadClick = () => {
    navigate("/read");
  };

  const navItems = [
    { 
      path: "/", 
      labelEn: "Home", 
      labelBn: "হোম",
      icon: BookOpen,
      action: () => navigate("/"),
    },
    { 
      path: "/surah", 
      labelEn: "Quran", 
      labelBn: "কুরআন",
      icon: Book,
      matchPattern: /^\/surah|^\/para/,
      action: () => {
        setSurahSearch("");
        setParaSearch("");
        setQuranSheetOpen(true);
      },
    },
    { 
      path: "/read", 
      labelEn: "Read", 
      labelBn: "পড়ুন",
      icon: BookText,
      matchPattern: /^\/read/,
      action: handleReadClick,
    },
    { 
      path: "/dua", 
      labelEn: "Dua", 
      labelBn: "দোয়া",
      icon: HandHeart,
      action: () => navigate("/dua"),
    },
    { 
      path: "/bookmarks", 
      labelEn: "Bookmarks", 
      labelBn: "বুকমার্ক",
      icon: Bookmark,
      action: () => navigate("/bookmarks"),
    },
    { 
      path: "/settings", 
      labelEn: "Settings", 
      labelBn: "সেটিংস",
      icon: Settings,
      action: () => navigate("/settings"),
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.matchPattern) {
      return item.matchPattern.test(location.pathname);
    }
    return location.pathname === item.path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 hidden lg:block border-b border-border bg-card/98 backdrop-blur-md">
        {/* Ornamental border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img 
                  src={appLogo} 
                  alt="Quran Insight" 
                  className="h-10 w-10 rounded-xl shadow-md transition-transform group-hover:scale-105" 
                />
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
              <div className="flex flex-col items-start">
                <span className={cn(
                  "text-xl font-bold text-primary tracking-tight",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
                </span>
                <span className={cn(
                  "text-[10px] text-muted-foreground font-medium tracking-widest",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? "সহজে কুরআন শিখুন" : "For Learning Quran Easily"}
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <button
                    key={item.path}
                    onClick={item.action}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? item.labelBn : item.labelEn}
                    </span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary via-primary to-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center gap-4">
              <LanguageToggle language={language} onToggle={onLanguageChange} />
            </div>
          </div>
        </div>
        
        {/* Bottom ornamental line */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </header>

      {/* Quran Sheet with Tabs for Surah and Para */}
      <Sheet open={quranSheetOpen} onOpenChange={setQuranSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] px-0">
          <SheetHeader className="px-6 pb-4 border-b border-border">
            <SheetTitle className={cn("text-left", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কুরআন" : "Quran"}
            </SheetTitle>
          </SheetHeader>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "surah" | "para")} className="flex flex-col h-[calc(100vh-100px)]">
            <TabsList className="grid w-full grid-cols-2 mx-6 mt-4" style={{ width: 'calc(100% - 48px)' }}>
              <TabsTrigger value="surah" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "সূরা" : "Surah"}
              </TabsTrigger>
              <TabsTrigger value="para" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "পারা" : "Para"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="surah" className="flex-1 mt-0 overflow-hidden">
              <div className="px-6 py-4">
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
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="py-2">
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      ref={(el) => { surahListRefs.current[surah.number] = el; }}
                      onClick={() => handleSurahClick(surah.number)}
                      className={cn(
                        "flex items-center gap-3 w-full px-6 py-3 transition-colors",
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
                          {formatNumber(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="para" className="flex-1 mt-0 overflow-hidden">
              <div className="px-6 py-4">
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
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="py-2">
                  {filteredParas.map((para) => (
                    <button
                      key={para.number}
                      ref={(el) => { paraListRefs.current[para.number] = el; }}
                      onClick={() => handleParaClick(para.number)}
                      className={cn(
                        "flex items-center gap-3 w-full px-6 py-3 transition-colors",
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
                          {language === "bn"
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