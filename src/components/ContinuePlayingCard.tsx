import { Play, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { LastPlayedPosition } from "@/hooks/useLastPlayedPosition";
import { surahs } from "@/data/surahs";
import { getReciterById } from "@/data/reciters";

interface ContinuePlayingCardProps {
  position: LastPlayedPosition;
  language: Language;
  onResume: () => void;
  onDismiss: () => void;
}

// Helper to format time ago
function getTimeAgo(timestamp: number, language: Language): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  const toBn = (n: number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return n.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
  };
  
  if (seconds < 60) {
    return language === "bn" ? "এইমাত্র" : "Just now";
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return language === "bn" 
      ? `${toBn(minutes)} মিনিট আগে` 
      : `${minutes} min ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return language === "bn" 
      ? `${toBn(hours)} ঘণ্টা আগে` 
      : `${hours}h ago`;
  }
  
  const days = Math.floor(hours / 24);
  return language === "bn" 
    ? `${toBn(days)} দিন আগে` 
    : `${days}d ago`;
}

export const ContinuePlayingCard = ({
  position,
  language,
  onResume,
  onDismiss,
}: ContinuePlayingCardProps) => {
  const surah = surahs.find(s => s.number === position.surahNumber);
  const reciter = getReciterById(position.reciterId);

  if (!surah) return null;

  const timeAgo = getTimeAgo(position.timestamp, language);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/10 p-4 shadow-sm">
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-4">
        {/* Play button */}
        <Button
          onClick={onResume}
          size="icon"
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex-shrink-0"
        >
          <Play className="h-6 w-6 ml-0.5" />
        </Button>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-6">
          <p className={cn(
            "text-xs text-muted-foreground mb-1 flex items-center gap-1",
            language === "bn" && "font-bengali"
          )}>
            <Clock className="h-3 w-3" />
            {language === "bn" ? "শোনা চালিয়ে যান" : "Continue listening"}
            <span className="text-muted-foreground/60">· {timeAgo}</span>
          </p>
          
          <h3 className="font-arabic text-lg text-foreground mb-0.5 truncate">
            {surah.nameArabic}
          </h3>
          
          <p className={cn(
            "text-sm font-medium text-foreground truncate",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? surah.nameBengali : surah.nameEnglish}
            <span className="text-muted-foreground font-normal">
              {" · "}
              {language === "bn" ? "আয়াত" : "Verse"} {formatNumber(position.verseNumber, language)}
            </span>
          </p>
          
          <p className={cn(
            "text-xs text-muted-foreground mt-1 truncate",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? reciter?.nameBengali : reciter?.nameEnglish}
          </p>
        </div>
      </div>
    </div>
  );
};
