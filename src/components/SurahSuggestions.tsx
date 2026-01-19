import { useMemo, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Book, ChevronRight } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { surahs, Surah } from "@/data/surahs";
import { fuzzySearchSurahs, normalizeText } from "@/utils/fuzzySearch";

interface SurahSuggestionsProps {
  query: string;
  language: Language;
  isVisible: boolean;
  onSelect?: (surah: Surah) => void;
  onClose?: () => void;
  maxResults?: number;
  className?: string;
}

/**
 * Highlights matching parts of text based on the search query
 */
const highlightMatch = (text: string, query: string): ReactNode => {
  if (!text || !query || query.length < 2) return text;

  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  
  // Find the start index of the match in normalized text
  const matchIndex = normalizedText.indexOf(normalizedQuery);
  
  if (matchIndex === -1) {
    // Try to find partial matches at word boundaries
    const words = normalizedQuery.split(/\s+/);
    let result: ReactNode[] = [];
    let lastIndex = 0;
    let hasMatch = false;
    
    for (const word of words) {
      if (word.length < 2) continue;
      const wordIndex = normalizedText.indexOf(word);
      if (wordIndex !== -1) {
        hasMatch = true;
        // Map back to original text positions (approximate)
        const ratio = text.length / normalizedText.length;
        const origStart = Math.floor(wordIndex * ratio);
        const origEnd = Math.min(text.length, Math.ceil((wordIndex + word.length) * ratio));
        
        if (origStart > lastIndex) {
          result.push(text.substring(lastIndex, origStart));
        }
        result.push(
          <mark key={wordIndex} className="bg-primary/20 text-primary font-medium rounded px-0.5">
            {text.substring(origStart, origEnd)}
          </mark>
        );
        lastIndex = origEnd;
      }
    }
    
    if (hasMatch) {
      if (lastIndex < text.length) {
        result.push(text.substring(lastIndex));
      }
      return result;
    }
    return text;
  }

  // Map normalized positions back to original text (approximate for most cases)
  const ratio = text.length / normalizedText.length;
  const origStart = Math.floor(matchIndex * ratio);
  const origEnd = Math.min(text.length, Math.ceil((matchIndex + normalizedQuery.length) * ratio));

  return (
    <>
      {text.substring(0, origStart)}
      <mark className="bg-primary/20 text-primary font-medium rounded px-0.5">
        {text.substring(origStart, origEnd)}
      </mark>
      {text.substring(origEnd)}
    </>
  );
};

export const SurahSuggestions = ({
  query,
  language,
  isVisible,
  onSelect,
  onClose,
  maxResults = 5,
  className,
}: SurahSuggestionsProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fuzzy search for matching surahs
  const suggestions = useMemo(() => {
    if (!query || query.trim().length < 2) return [];
    return fuzzySearchSurahs(surahs, query.trim()).slice(0, maxResults);
  }, [query, maxResults]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isVisible && suggestions.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, suggestions.length, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  const handleSurahClick = (surah: Surah) => {
    if (onSelect) {
      onSelect(surah);
    } else {
      navigate(`/surah/${surah.number}`);
    }
    onClose?.();
  };

  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute z-50 left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-3 py-2 bg-muted/50 border-b border-border">
        <p className={cn(
          "text-xs text-muted-foreground flex items-center gap-1.5",
          language === "bn" && "font-bengali"
        )}>
          <Book className="h-3 w-3" />
          {language === "bn" ? "সূরা পরামর্শ" : "Surah Suggestions"}
        </p>
      </div>

      {/* Suggestions list */}
      <div className="max-h-72 overflow-y-auto">
        {suggestions.map((surah, index) => (
          <button
            key={surah.number}
            onClick={() => handleSurahClick(surah)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/50",
              index !== suggestions.length - 1 && "border-b border-border/50"
            )}
          >
            {/* Number badge */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {formatNumber(surah.number, language)}
            </div>

            {/* Surah info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-arabic text-base text-foreground">
                  {highlightMatch(surah.nameArabic, query)}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {highlightMatch(surah.nameEnglish, query)}
                </span>
                <span className="text-sm font-bengali text-muted-foreground">
                  ({highlightMatch(surah.nameBengali, query)})
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                <span>{highlightMatch(surah.meaningEnglish, query)}</span>
                <span className="font-bengali"> • {highlightMatch(surah.meaningBengali, query)}</span>
                <span>
                  {" · "}
                  {language === "bn" 
                    ? `${formatNumber(surah.totalVerses, language)} আয়াত`
                    : `${surah.totalVerses} verses`}
                </span>
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-3 py-2 bg-muted/30 border-t border-border">
        <p className={cn(
          "text-xs text-muted-foreground text-center",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" 
            ? "সূরায় যেতে ক্লিক করুন বা AI সার্চের জন্য Enter চাপুন"
            : "Click to go to surah or press Enter for AI search"}
        </p>
      </div>
    </div>
  );
};
