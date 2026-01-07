import { Play, Pause, SkipBack, SkipForward, X, Loader2, Repeat, Repeat1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { surahs } from "@/data/surahs";
import { getReciterById } from "@/data/reciters";
import { RepeatMode } from "@/hooks/useQuranAudio";

interface AudioPlayerBarProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentSurah: number | null;
  currentVerse: number | null;
  progress: number;
  duration: number;
  reciterId: string;
  language: Language;
  repeatMode: RepeatMode;
  abRepeatStart: number | null;
  abRepeatEnd: number | null;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onClose: () => void;
  onCycleRepeat: () => void;
  canPlayPrevious: boolean;
  canPlayNext: boolean;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const getRepeatLabel = (mode: RepeatMode, language: Language): string => {
  switch (mode) {
    case "verse": return language === "bn" ? "আয়াত" : "Verse";
    case "surah": return language === "bn" ? "সূরা" : "Surah";
    case "ab": return "A-B";
    default: return "";
  }
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
  repeatMode,
  abRepeatStart,
  abRepeatEnd,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onClose,
  onCycleRepeat,
  canPlayPrevious,
  canPlayNext
}: AudioPlayerBarProps) => {
  if (currentSurah === null || currentVerse === null) return null;

  const surah = surahs.find(s => s.number === currentSurah);
  const reciter = getReciterById(reciterId);
  const isRepeating = repeatMode !== "none";

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
        <div className="flex items-center gap-2">
          {/* Verse Info */}
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-sm font-medium truncate",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? surah?.nameBengali : surah?.nameEnglish} • {language === "bn" ? "আয়াত" : "Verse"} {formatNumber(currentVerse, language)}
            </p>
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-xs text-muted-foreground truncate",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? reciter?.nameBengali : reciter?.nameEnglish}
              </p>
              {/* Repeat indicator */}
              {isRepeating && (
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium",
                  language === "bn" && "font-bengali"
                )}>
                  {repeatMode === "ab" && abRepeatStart !== null
                    ? `${formatNumber(abRepeatStart, language)}-${abRepeatEnd ? formatNumber(abRepeatEnd, language) : "?"}`
                    : getRepeatLabel(repeatMode, language)
                  }
                </span>
              )}
            </div>
          </div>

          {/* Repeat Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              isRepeating ? "text-primary" : "text-muted-foreground"
            )}
            onClick={onCycleRepeat}
          >
            {repeatMode === "verse" ? (
              <Repeat1 className="h-4 w-4" />
            ) : (
              <Repeat className={cn("h-4 w-4", repeatMode === "ab" && "text-primary")} />
            )}
          </Button>

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
