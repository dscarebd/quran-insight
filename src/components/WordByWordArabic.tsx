import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface WordByWordArabicProps {
  text: string;
  fontSize: number;
  isPlaying: boolean;
  isCurrentVerse: boolean;
  progress: number;
  duration: number;
}

// Split Arabic text into words, preserving diacritics
const splitArabicWords = (text: string): string[] => {
  // Split by spaces but keep the words intact with their diacritics
  return text.split(/\s+/).filter(word => word.length > 0);
};

export const WordByWordArabic = ({
  text,
  fontSize,
  isPlaying,
  isCurrentVerse,
  progress,
  duration,
}: WordByWordArabicProps) => {
  const words = useMemo(() => splitArabicWords(text), [text]);
  
  // Calculate which word is currently being spoken
  const currentWordIndex = useMemo(() => {
    if (!isCurrentVerse || !isPlaying || duration === 0 || words.length === 0) {
      return -1;
    }
    
    // Calculate word index based on progress
    const progressRatio = progress / duration;
    const wordIndex = Math.floor(progressRatio * words.length);
    
    // Clamp to valid range
    return Math.min(wordIndex, words.length - 1);
  }, [isCurrentVerse, isPlaying, progress, duration, words.length]);

  // If not playing this verse, show plain text
  if (!isCurrentVerse || !isPlaying) {
    return (
      <p 
        className="mb-4 text-right leading-[2.2] text-foreground font-arabic"
        style={{ fontSize: `${fontSize}px` }}
        dir="rtl"
      >
        {text}
      </p>
    );
  }

  return (
    <p 
      className="mb-4 text-right leading-[2.2] font-arabic flex flex-wrap justify-end gap-x-2 gap-y-1"
      style={{ fontSize: `${fontSize}px` }}
      dir="rtl"
    >
      {words.map((word, index) => {
        const isCurrentWord = index === currentWordIndex;
        const isPastWord = index < currentWordIndex;
        
        return (
          <span
            key={index}
            className={cn(
              "transition-all duration-150 rounded px-1 -mx-1",
              isCurrentWord && "bg-primary/30 text-primary scale-105 font-semibold",
              isPastWord && "text-muted-foreground/70",
              !isCurrentWord && !isPastWord && "text-foreground"
            )}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

