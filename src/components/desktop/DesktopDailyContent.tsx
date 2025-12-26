import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, HandHeart, ChevronRight, Copy, Check } from "lucide-react";
import { dailyVerses } from "@/data/surahs";
import { duaCategories, Dua, DuaCategory } from "@/data/duas";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DesktopDailyContentProps {
  language: "bn" | "en";
}

const getAllDuas = (): { dua: Dua; category: DuaCategory }[] => {
  const allDuas: { dua: Dua; category: DuaCategory }[] = [];
  duaCategories.forEach(category => {
    category.duas.forEach(dua => {
      allDuas.push({ dua, category });
    });
  });
  return allDuas;
};

export const DesktopDailyContent = ({ language }: DesktopDailyContentProps) => {
  const navigate = useNavigate();
  const [verse, setVerse] = useState(dailyVerses[0]);
  const [duaData, setDuaData] = useState<{ dua: Dua; category: DuaCategory } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    
    // Daily verse
    const verseIndex = dayOfYear % dailyVerses.length;
    setVerse(dailyVerses[verseIndex]);
    
    // Daily dua
    const allDuas = getAllDuas();
    if (allDuas.length > 0) {
      const duaIndex = dayOfYear % allDuas.length;
      setDuaData(allDuas[duaIndex]);
    }
  }, []);

  const handleCopyDua = async () => {
    if (!duaData) return;
    const textToCopy = `${duaData.dua.arabic}\n\n${duaData.dua.bengali}\n\n${duaData.dua.english}${duaData.dua.reference ? `\n\n(${duaData.dua.reference})` : ""}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      {/* Daily Verse Card */}
      <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all hover:shadow-elevated">
        {/* Decorative corner */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
        
        {/* Header */}
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <span className={cn("text-sm sm:text-base font-medium", language === "bn" && "font-bengali")}>
              {language === "bn" ? "আজকের আয়াত" : "Verse of the Day"}
            </span>
          </div>
          <div className="h-px flex-1 mx-3 sm:mx-4 bg-gradient-to-r from-border via-gold/30 to-border" />
        </div>
        
        {/* Arabic */}
        <p className="mb-3 sm:mb-4 text-center font-uthmani text-xl sm:text-2xl leading-loose text-foreground">
          {verse.arabic}
        </p>
        
        {/* Translation */}
        <p className={cn(
          "mb-3 sm:mb-4 text-center text-sm sm:text-base text-muted-foreground leading-relaxed",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? verse.bengali : verse.english}
        </p>
        
        {/* Reference */}
        <button 
          onClick={() => navigate(`/surah/${verse.surahNumber}?verse=${verse.verseNumber}`)}
          className={cn(
            "mx-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
            language === "bn" && "font-bengali"
          )}
        >
          {language === "bn" ? verse.referenceBengali : verse.referenceEnglish}
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>

      {/* Daily Dua Card */}
      {duaData && (
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all hover:shadow-elevated">
          {/* Decorative corner */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-2xl" />
          
          {/* Header */}
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gold-dark">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gold/10">
                <HandHeart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <span className={cn("text-sm sm:text-base font-medium text-foreground", language === "bn" && "font-bengali")}>
                {language === "bn" ? "আজকের দোয়া" : "Dua of the Day"}
              </span>
            </div>
            <button
              onClick={handleCopyDua}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
          </div>
          
          {/* Title */}
          {(duaData.dua.titleBengali || duaData.dua.titleEnglish) && (
            <p className={cn(
              "mb-2 sm:mb-3 text-center text-xs sm:text-sm font-medium text-gold-dark",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? duaData.dua.titleBengali : duaData.dua.titleEnglish}
            </p>
          )}
          
          {/* Arabic */}
          <p className="mb-3 sm:mb-4 text-center font-uthmani text-xl sm:text-2xl leading-loose text-foreground">
            {duaData.dua.arabic}
          </p>
          
          {/* Translation */}
          <p className={cn(
            "mb-3 sm:mb-4 text-center text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? duaData.dua.bengali : duaData.dua.english}
          </p>
          
          {/* View All */}
          <button 
            onClick={() => navigate("/dua")}
            className={cn(
              "mx-auto flex items-center gap-1.5 rounded-full bg-gold/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gold-dark transition-colors hover:bg-gold hover:text-white",
              language === "bn" && "font-bengali"
            )}
          >
            {language === "bn" ? "সব দোয়া দেখুন" : "View All Duas"}
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
