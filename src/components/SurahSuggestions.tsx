import { useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, ChevronRight } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { surahs, Surah } from "@/data/surahs";
import { fuzzySearchSurahs } from "@/utils/fuzzySearch";

interface SurahSuggestionsProps {
  query: string;
  language: Language;
  isVisible: boolean;
  onSelect?: (surah: Surah) => void;
  onClose?: () => void;
  maxResults?: number;
  className?: string;
}

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
                  {surah.nameArabic}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {surah.nameEnglish}
                </span>
                <span className="text-sm font-bengali text-muted-foreground">
                  ({surah.nameBengali})
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                <span>{surah.meaningEnglish}</span>
                <span className="font-bengali"> • {surah.meaningBengali}</span>
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
