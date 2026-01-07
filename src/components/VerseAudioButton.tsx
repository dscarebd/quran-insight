import { Play, Pause, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerseAudioButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  isCurrentVerse: boolean;
  onClick: () => void;
}

export const VerseAudioButton = ({
  isPlaying,
  isLoading,
  isCurrentVerse,
  onClick
}: VerseAudioButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 transition-colors",
        isCurrentVerse && isPlaying
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground hover:text-primary"
      )}
      onClick={onClick}
    >
      {isLoading && isCurrentVerse ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying && isCurrentVerse ? (
        <Pause className="h-4 w-4 fill-current" />
      ) : (
        <Play className="h-4 w-4" />
      )}
    </Button>
  );
};
