import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { paras } from "@/data/paras";
import { surahs } from "@/data/surahs";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ParaDetailProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

const ParaDetail = ({ language, onLanguageChange }: ParaDetailProps) => {
  const { paraNumber } = useParams<{ paraNumber: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [paraSheetOpen, setParaSheetOpen] = useState(false);
  const [paraSearchQuery, setParaSearchQuery] = useState("");

  const paraNum = parseInt(paraNumber || "1", 10);
  const para = paras.find(p => p.number === paraNum);

  const prevPara = paras.find(p => p.number === paraNum - 1);
  const nextPara = paras.find(p => p.number === paraNum + 1);

  const filteredParas = useMemo(() => {
    if (!paraSearchQuery.trim()) return paras;
    const query = paraSearchQuery.toLowerCase();
    return paras.filter(p => 
      p.nameBengali.toLowerCase().includes(query) ||
      p.nameEnglish.toLowerCase().includes(query) ||
      p.nameArabic.includes(query) ||
      p.number.toString().includes(query)
    );
  }, [paraSearchQuery]);

  const handleParaClick = (paraNumber: number) => {
    navigate(`/para/${paraNumber}`);
    setParaSheetOpen(false);
    setParaSearchQuery("");
  };

  const handleBack = () => {
    if (isMobile) {
      setParaSheetOpen(true);
    } else {
      navigate("/");
    }
  };

  if (!para) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? "পারা পাওয়া যায়নি" : "Para not found"}
        </p>
      </div>
    );
  }

  // Get surahs included in this para
  const includedSurahs = surahs.filter(
    surah => surah.number >= para.startSurah && surah.number <= para.endSurah
  );

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className={language === "bn" ? "font-bengali" : ""}>{language === "bn" ? "ফিরে যান" : "Back"}</span>
          </Button>

          {/* Language Toggle */}
          <div className="flex rounded-full bg-secondary p-1">
            <button
              onClick={() => onLanguageChange("bn")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                language === "bn"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="font-bengali">বাংলা</span>
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* Para Info Banner */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/30 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-4">
            <div className={cn("mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary", language === "bn" && "font-bengali")}>
              <span>{language === "bn" ? "পারা" : "Para"} {formatNumber(para.number, language)}/{formatNumber(30, language)}</span>
            </div>
          </div>
          
          {/* Para Name with Navigation */}
          <div className="flex items-center justify-center gap-4">
            {/* Previous Para */}
            <button
              onClick={() => prevPara && navigate(`/para/${prevPara.number}`)}
              disabled={!prevPara}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all",
                prevPara 
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className={cn("text-xs font-medium hidden sm:block", language === "bn" && "font-bengali")}>
                {prevPara ? (language === "bn" ? prevPara.nameBengali : prevPara.nameEnglish) : ""}
              </span>
              <span className={cn("text-xs sm:hidden", language === "bn" && "font-bengali")}>
                {prevPara ? formatNumber(prevPara.number, language) : ""}
              </span>
            </button>

            {/* Current Para Name */}
            <div className="text-center">
              <h1 className="mb-1 font-arabic text-4xl text-foreground sm:text-5xl">
                {para.nameArabic}
              </h1>
              <h2 className={cn("text-xl font-semibold text-foreground", language === "bn" && "font-bengali")}>
                {language === "bn" ? para.nameBengali : para.nameEnglish}
              </h2>
            </div>

            {/* Next Para */}
            <button
              onClick={() => nextPara && navigate(`/para/${nextPara.number}`)}
              disabled={!nextPara}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all",
                nextPara 
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-5 w-5" />
              <span className={cn("text-xs font-medium hidden sm:block", language === "bn" && "font-bengali")}>
                {nextPara ? (language === "bn" ? nextPara.nameBengali : nextPara.nameEnglish) : ""}
              </span>
              <span className={cn("text-xs sm:hidden", language === "bn" && "font-bengali")}>
                {nextPara ? formatNumber(nextPara.number, language) : ""}
              </span>
            </button>
          </div>

          <p className={cn("text-center mt-2 text-muted-foreground", language === "bn" && "font-bengali")}>
            {language === "bn" 
              ? `সূরা ${formatNumber(para.startSurah, language)} আয়াত ${formatNumber(para.startVerse, language)} থেকে সূরা ${formatNumber(para.endSurah, language)} আয়াত ${formatNumber(para.endVerse, language)} পর্যন্ত`
              : `From Surah ${para.startSurah} Verse ${para.startVerse} to Surah ${para.endSurah} Verse ${para.endVerse}`}
          </p>
        </div>
      </div>

      {/* Included Surahs */}
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6">
        <h3 className={cn("mb-4 text-lg font-semibold text-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? "এই পারায় অন্তর্ভুক্ত সূরাসমূহ" : "Surahs in this Para"}
        </h3>
        
        <div className="grid gap-3 sm:grid-cols-2">
          {includedSurahs.map((surah, index) => (
            <button
              key={surah.number}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="animate-fade-in flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary", language === "bn" && "font-bengali")}>
                {formatNumber(surah.number, language)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("font-medium truncate text-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                  </span>
                  <span className="font-arabic text-sm text-muted-foreground shrink-0">
                    {surah.nameArabic}
                  </span>
                </div>
                <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                  {formatNumber(surah.totalVerses, language)} {language === "bn" ? "আয়াত" : "verses"} • {surah.revelationType === "Meccan" ? (language === "bn" ? "মক্কী" : "Meccan") : (language === "bn" ? "মাদানী" : "Medinan")}
                </span>
              </div>
            </button>
          ))}
        </div>

        {includedSurahs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কোনো সূরা পাওয়া যায়নি" : "No surahs found"}
            </p>
          </div>
        )}
      </div>

      {/* Para List Sheet for Mobile */}
      <Sheet open={paraSheetOpen} onOpenChange={setParaSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "পারা নির্বাচন করুন" : "Select Para"}
            </SheetTitle>
          </SheetHeader>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={language === "bn" ? "পারা খুঁজুন..." : "Search para..."}
              value={paraSearchQuery}
              onChange={(e) => setParaSearchQuery(e.target.value)}
              className={cn("pl-9", language === "bn" && "font-bengali")}
            />
          </div>
          
          {/* Para List */}
          <ScrollArea className="h-[calc(80vh-140px)]">
            <div className="space-y-2 pr-4">
              {filteredParas.map((p) => (
                <button
                  key={p.number}
                  onClick={() => handleParaClick(p.number)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    p.number === paraNum
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                    p.number === paraNum
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}>
                    {formatNumber(p.number, language)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn("font-medium truncate", language === "bn" && "font-bengali")}>
                      {language === "bn" ? p.nameBengali : p.nameEnglish}
                    </div>
                    <div className={cn(
                      "text-xs truncate",
                      p.number === paraNum ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {p.nameArabic}
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

export default ParaDetail;