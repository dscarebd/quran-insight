import { Play, Pause, SkipBack, SkipForward, X, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { surahs } from "@/data/surahs";
import { reciters, getReciterById } from "@/data/reciters";

interface AudioPlayerBarProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentSurah: number | null;
  currentVerse: number | null;
  progress: number;
  duration: number;
  reciterId: string;
  language: Language;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onClose: () => void;
  canPlayPrevious: boolean;
  canPlayNext: boolean;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const AudioPlayerBar = ({
  isPlaying,
  isLoading,
  currentSurah,
  currentVerse,
  progress,
  duration,
  reciterId,
  language,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onClose,
  canPlayPrevious,
  canPlayNext
}: AudioPlayerBarProps) => {
  if (currentSurah === null || currentVerse === null) return null;

  const surah = surahs.find(s => s.number === currentSurah);
  const reciter = getReciterById(reciterId);

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg shadow-lg md:bottom-0">
      <div className="mx-auto max-w-4xl px-3 py-2">
        {/* Progress Bar */}
        <div className="mb-2">
          <Slider
            value={[progress]}
            max={duration || 100}
            step={0.1}
            onValueChange={(value) => onSeek(value[0])}
            className="w-full h-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Verse Info */}
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-sm font-medium truncate",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? surah?.nameBengali : surah?.nameEnglish} • {language === "bn" ? "আয়াত" : "Verse"} {formatNumber(currentVerse, language)}
            </p>
            <p className={cn(
              "text-xs text-muted-foreground truncate",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? reciter?.nameBengali : reciter?.nameEnglish}
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onPrevious}
              disabled={!canPlayPrevious || isLoading}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={onPlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onNext}
              disabled={!canPlayNext || isLoading}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
