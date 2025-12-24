import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Layers, Bookmark, ChevronRight, X } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileNavFooterProps {
  language: "bn" | "en";
}

export const MobileNavFooter = ({ language }: MobileNavFooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSheet, setActiveSheet] = useState<"surah" | "para" | null>(null);

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
      action: () => setActiveSheet("surah"),
    },
    {
      icon: Layers,
      labelEn: "Paras",
      labelBn: "পারা",
      path: "/para",
      isActive: location.pathname.startsWith("/para"),
      action: () => setActiveSheet("para"),
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
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-2 border-b border-border">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "সূরা নির্বাচন করুন" : "Select Surah"}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(70vh-60px)]">
            <div className="py-2">
              {surahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => handleSurahClick(surah.number)}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 transition-colors",
                    currentSurahNumber === surah.number
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold",
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
                    <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                      {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
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
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-2 border-b border-border">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "পারা নির্বাচন করুন" : "Select Para"}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(70vh-60px)]">
            <div className="py-2">
              {paras.map((para) => (
                <button
                  key={para.number}
                  onClick={() => handleParaClick(para.number)}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 transition-colors",
                    currentParaNumber === para.number
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold",
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
                    <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
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
        </SheetContent>
      </Sheet>
    </>
  );
};
