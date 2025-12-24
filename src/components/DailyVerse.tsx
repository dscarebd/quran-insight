import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight, Bookmark, Volume2, VolumeX, Loader2 } from "lucide-react";
import { dailyVerses } from "@/data/surahs";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface DailyVerseProps {
  language: "bn" | "en";
}

export const DailyVerse = ({ language }: DailyVerseProps) => {
  const [verse, setVerse] = useState(dailyVerses[0]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  const { play, stop, isPlaying, isLoading } = useTextToSpeech(language);

  useEffect(() => {
    // Get a "random" verse based on the day
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const verseIndex = dayOfYear % dailyVerses.length;
    setVerse(dailyVerses[verseIndex]);
  }, []);

  const handleReferenceClick = () => {
    navigate(`/surah/${verse.surahNumber}?verse=${verse.verseNumber}`);
  };

  const handlePlayAudio = () => {
    const textToRead = `${verse.arabic}. ${language === "bn" ? verse.bengali : verse.english}`;
    play(textToRead);
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
      {/* Label */}
      <div className="mb-4 flex items-center justify-center gap-2 text-primary">
        <Sparkles className="h-4 w-4" />
        <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
          {language === "bn" ? "আজকের আয়াত" : "Verse of the Day"}
        </span>
      </div>

      {/* Verse Card */}
      <div className="verse-card group">
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
          {/* Bookmark Button */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-all hover:bg-background hover:text-primary"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>

        {/* Arabic Text */}
        <p className="mb-4 text-center font-arabic text-2xl leading-loose text-foreground md:text-3xl">
          {verse.arabic}
        </p>

        {/* Translation */}
        <p className={cn("mb-4 text-center text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? verse.bengali : verse.english}
        </p>

        {/* Reference */}
        <button 
          onClick={handleReferenceClick}
          className={cn(
            "mx-auto flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
            language === "bn" && "font-bengali"
          )}
        >
          {language === "bn" ? verse.referenceBengali : verse.referenceEnglish}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
