import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HandHeart, ChevronRight, Heart, Copy, Check, Volume2, VolumeX, Loader2 } from "lucide-react";
import { duaCategories, Dua, DuaCategory } from "@/data/duas";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface DailyDuaProps {
  language: "bn" | "en";
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
  const { play, stop, isPlaying, isLoading } = useTextToSpeech(language);

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

  const handleViewAll = () => {
    navigate("/dua");
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

  const handlePlayAudio = () => {
    if (!duaData) return;
    const textToRead = `${duaData.dua.arabic}. ${language === "bn" ? duaData.dua.bengali : duaData.dua.english}`;
    play(textToRead);
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
        {/* Action Buttons */}
        <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
          {/* TTS Button */}
          <button
            onClick={handlePlayAudio}
            disabled={isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-all hover:bg-background hover:text-primary disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPlaying ? (
              <VolumeX className="h-4 w-4 text-primary" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-all hover:bg-background hover:text-primary"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

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
            onClick={handleViewAll}
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
