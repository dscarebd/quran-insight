import { useNavigate } from "react-router-dom";
import { Sparkles, HandHeart, ChevronRight, Copy, Check, BookOpen } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { useDailyContent } from "@/hooks/useDailyContent";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DesktopDailyContentProps {
  language: Language;
}

// Book gradient/color mapping for hadith
const bookGradients: Record<string, string> = {
  bukhari: "from-emerald-500/20 to-transparent",
  muslim: "from-blue-500/20 to-transparent",
  tirmidhi: "from-purple-500/20 to-transparent",
  abudawud: "from-orange-500/20 to-transparent",
  nasai: "from-cyan-500/20 to-transparent",
  ibnmajah: "from-rose-500/20 to-transparent",
};

const bookIconColors: Record<string, string> = {
  bukhari: "text-emerald-600 bg-emerald-500/10",
  muslim: "text-blue-600 bg-blue-500/10",
  tirmidhi: "text-purple-600 bg-purple-500/10",
  abudawud: "text-orange-600 bg-orange-500/10",
  nasai: "text-cyan-600 bg-cyan-500/10",
  ibnmajah: "text-rose-600 bg-rose-500/10",
};

export const DesktopDailyContent = ({ language }: DesktopDailyContentProps) => {
  const navigate = useNavigate();
  const { verse, dua, hadith, isLoading } = useDailyContent();
  const [isDuaCopied, setIsDuaCopied] = useState(false);
  const [isHadithCopied, setIsHadithCopied] = useState(false);

  const handleCopyDua = async () => {
    if (!dua) return;
    const textToCopy = `${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n(${dua.reference})` : ""}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsDuaCopied(true);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setIsDuaCopied(false), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  const handleCopyHadith = async () => {
    if (!hadith) return;
    const textToCopy = `${hadith.arabic || ""}\n\n${language === "bn" ? hadith.bengali : hadith.english}\n\n— ${language === "bn" ? hadith.book_name_bengali : hadith.book_name_english}, Hadith ${hadith.hadith_number}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsHadithCopied(true);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setIsHadithCopied(false), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="mx-auto mb-4 h-16 w-full" />
            <Skeleton className="mx-auto mb-4 h-12 w-full" />
            <Skeleton className="mx-auto h-8 w-32 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const hadithGradient = hadith ? bookGradients[hadith.book_slug] || "from-primary/20 to-transparent" : "";
  const hadithIconColor = hadith ? bookIconColors[hadith.book_slug] || "text-primary bg-primary/10" : "";

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
      {/* Daily Verse Card */}
      {verse && (
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:scale-[1.02]">
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
            onClick={() => navigate(`/surah/${verse.surahNumber}#verse-${verse.verseNumber}`)}
            className={cn(
              "mx-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
              language === "bn" && "font-bengali"
            )}
          >
            {language === "bn" 
              ? `${verse.surahNameBengali}: ${formatNumber(verse.verseNumber, language)}` 
              : `${verse.surahNameEnglish}: ${verse.verseNumber}`}
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}

      {/* Daily Dua Card */}
      {dua && (
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:scale-[1.02]">
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
              {isDuaCopied ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
          </div>
          
          {/* Title */}
          {(dua.title_bengali || dua.title_english) && (
            <p className={cn(
              "mb-2 sm:mb-3 text-center text-xs sm:text-sm font-medium text-gold-dark",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? dua.title_bengali : dua.title_english}
            </p>
          )}
          
          {/* Arabic */}
          <p className="mb-3 sm:mb-4 text-center font-uthmani text-xl sm:text-2xl leading-loose text-foreground">
            {dua.arabic}
          </p>
          
          {/* Translation */}
          <p className={cn(
            "mb-3 sm:mb-4 text-center text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? dua.bengali : dua.english}
          </p>

          {/* Reference note for general supplications */}
          {dua.reference && (dua.reference === "দোয়া সংকলন" || dua.reference === "সাধারণ প্রার্থনা - জায়েয দোয়া") && (
            <p className={cn(
              "mb-2 text-[9px] sm:text-[10px] text-muted-foreground/60 text-center",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" 
                ? "সাধারণ প্রার্থনা - জায়েয" 
                : "General permissible prayer"}
            </p>
          )}
          
          {/* View All */}
          <button 
            onClick={() => navigate("/daily-dua")}
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

      {/* Hadith of the Day Card */}
      {hadith && (
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:scale-[1.02]">
          {/* Decorative corner */}
          <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl", hadithGradient)} />
          
          {/* Header */}
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn("flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg", hadithIconColor)}>
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <span className={cn("text-sm sm:text-base font-medium text-foreground", language === "bn" && "font-bengali")}>
                {language === "bn" ? "আজকের হাদিস" : "Hadith of the Day"}
              </span>
            </div>
            <button
              onClick={handleCopyHadith}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {isHadithCopied ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
          </div>
          
          {/* Book name */}
          <p className={cn(
            "mb-2 sm:mb-3 text-center text-xs sm:text-sm font-medium text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? hadith.book_name_bengali : hadith.book_name_english}
          </p>
          
          {/* Arabic */}
          {hadith.arabic && (
            <p className="mb-3 sm:mb-4 text-center font-uthmani text-xl sm:text-2xl leading-loose text-foreground line-clamp-2">
              {hadith.arabic}
            </p>
          )}
          
          {/* Translation */}
          <p className={cn(
            "mb-3 sm:mb-4 text-center text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? hadith.bengali : hadith.english}
          </p>

          {/* Grade badge */}
          {(hadith.grade || hadith.grade_bengali) && (
            <div className="mb-3 flex justify-center">
              <span className={cn(
                "rounded-full bg-muted px-2 py-0.5 text-[10px] sm:text-xs text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? hadith.grade_bengali || hadith.grade : hadith.grade}
              </span>
            </div>
          )}
          
          {/* View More */}
          <button 
            onClick={() => navigate(`/hadith/${hadith.book_slug}/${hadith.hadith_number}`)}
            className={cn(
              "mx-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
              language === "bn" && "font-bengali"
            )}
          >
            {language === "bn" ? "আরো হাদিস দেখুন" : "More Hadiths"}
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
