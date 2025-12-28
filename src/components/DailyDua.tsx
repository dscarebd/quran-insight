import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HandHeart, ChevronRight, Heart, Copy, Check } from "lucide-react";
import { duaCategories, Dua, DuaCategory } from "@/data/duas";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";

interface DailyDuaProps {
  language: Language;
}

// Get all duas from all categories
const getAllDuas = (): { dua: Dua; category: DuaCategory }[] => {
  const allDuas: { dua: Dua; category: DuaCategory }[] = [];
  duaCategories.forEach(category => {
    category.duas.forEach(dua => {
      allDuas.push({ dua, category });
    });
  });
  return allDuas;
};

export const DailyDua = ({ language }: DailyDuaProps) => {
  const [duaData, setDuaData] = useState<{ dua: Dua; category: DuaCategory } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const allDuas = getAllDuas();
    if (allDuas.length === 0) return;
    
    // Get a "random" dua based on the day
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const duaIndex = dayOfYear % allDuas.length;
    setDuaData(allDuas[duaIndex]);
  }, []);

  const handleViewDua = () => {
    if (duaData) {
      navigate(`/dua/${duaData.category.id}?dua=${duaData.dua.id}`);
    }
  };

  const handleViewAll = () => {
    navigate("/daily-dua");
  };

  const handleCopy = async () => {
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

  if (!duaData) return null;

  const { dua, category } = duaData;

  return (
    <div className="mx-auto mt-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
      {/* Label */}
      <div className="mb-4 flex items-center justify-center gap-2 text-primary">
        <HandHeart className="h-4 w-4" />
        <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
          {language === "bn" ? "আজকের দোয়া" : "Dua of the Day"}
        </span>
      </div>

      {/* Dua Card */}
      <div className="verse-card group relative">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-primary group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>

        {/* Title */}
        {(dua.titleBengali || dua.titleEnglish) && (
          <p className={cn(
            "mb-3 text-center text-sm font-medium text-primary",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? dua.titleBengali : dua.titleEnglish}
          </p>
        )}

        {/* Arabic Text */}
        <p className="mb-4 text-center font-arabic text-2xl leading-loose text-foreground md:text-3xl">
          {dua.arabic}
        </p>

        {/* Translation */}
        <p className={cn("mb-4 text-center text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? dua.bengali : dua.english}
        </p>

        {/* Reference & Category */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {dua.reference && (
            <span className={cn(
              "rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {dua.reference}
            </span>
          )}
          <button 
            onClick={handleViewDua}
            className={cn(
              "flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
              language === "bn" && "font-bengali"
            )}
          >
            {language === "bn" ? "সব দোয়া দেখুন" : "View All Duas"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
