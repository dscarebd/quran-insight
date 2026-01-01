import { Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { surahs } from "@/data/surahs";

interface SearchResultsProps {
  query: string;
  response: string;
  isLoading: boolean;
  language: Language;
}

// Helper to find surah number from name (Bengali or English)
const findSurahNumber = (name: string): number | null => {
  const normalizedName = name.trim().toLowerCase();
  const surah = surahs.find(s => 
    s.nameBengali.toLowerCase() === normalizedName ||
    s.nameEnglish.toLowerCase() === normalizedName ||
    s.nameBengali.toLowerCase().includes(normalizedName) ||
    s.nameEnglish.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(s.nameBengali.toLowerCase()) ||
    normalizedName.includes(s.nameEnglish.toLowerCase())
  );
  return surah?.number || null;
};

// Parse verse number from Bengali/English numerals
const parseVerseNumber = (text: string): number | null => {
  // Bengali numerals mapping
  const bengaliNumerals: { [key: string]: string } = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  
  let normalized = text;
  Object.entries(bengaliNumerals).forEach(([bn, en]) => {
    normalized = normalized.replace(new RegExp(bn, 'g'), en);
  });
  
  const match = normalized.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

export const SearchResults = ({ query, response, isLoading, language }: SearchResultsProps) => {
  const navigate = useNavigate();
  
  if (!query && !response) return null;

  // Parse reference and navigate
  const handleReferenceClick = (reference: string) => {
    // Try to extract surah name and verse number
    // Patterns: [সূরা X, আয়াত Y] or [X, আয়াত Y] or [Surah X, Verse Y]
    const surahVersePattern = /(?:সূরা\s*)?([^,\]]+?)(?:,\s*(?:আয়াত|Verse)\s*([০-৯\d]+))?/i;
    const hadithPattern = /(?:হাদিস|Hadith)\s*(?:নং|No\.?)?\s*([০-৯\d]+)/i;
    
    const hadithMatch = reference.match(hadithPattern);
    if (hadithMatch) {
      const hadithNum = parseVerseNumber(hadithMatch[1]);
      if (hadithNum) {
        // Navigate to hadith - default to bukhari if book not specified
        navigate(`/hadith/bukhari/${hadithNum}`);
        return;
      }
    }
    
    const match = reference.match(surahVersePattern);
    if (match) {
      const surahName = match[1]?.trim();
      const verseText = match[2];
      
      if (surahName) {
        const surahNumber = findSurahNumber(surahName);
        if (surahNumber) {
          const verseNumber = verseText ? parseVerseNumber(verseText) : null;
          const url = verseNumber 
            ? `/surah/${surahNumber}#verse-${verseNumber}`
            : `/surah/${surahNumber}`;
          navigate(url);
        }
      }
    }
  };

  return (
    <div className="mt-8 animate-fade-in">

      {/* User Query */}
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
          <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
            {language === "bn" ? "আপনি" : "You"}
          </span>
        </div>
        <div className="rounded-2xl bg-secondary px-4 py-3">
          <p className={cn("text-foreground", language === "bn" && "font-bengali")}>{query}</p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <div className="flex-1 overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 shadow-card">
          {isLoading && !response && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className={cn("text-sm", language === "bn" && "font-bengali")}>
                {language === "bn" ? "উত্তর খুঁজছি..." : "Searching for answer..."}
              </span>
            </div>
          )}
          
          {response && (
            <div className={cn("prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-muted", language === "bn" && "font-bengali")}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => {
                    // Process children to highlight surah/verse references in green
                    const processText = (text: string) => {
                      // Match references like [আল-আহযাব, আয়াত ৬৬] or [Surah ..., Verse ...]
                      const referencePattern = /(\[[^\]]*(?:সূরা|Surah|আয়াত|Verse|হাদিস|Hadith)[^\]]*\])/gi;
                      const parts = text.split(referencePattern);
                      
                      return parts.map((part, index) => {
                        // Check if this part is a reference (matches the pattern)
                        const isReference = /\[[^\]]*(?:সূরা|Surah|আয়াত|Verse|হাদিস|Hadith)[^\]]*\]/i.test(part);
                        if (isReference) {
                          return (
                            <span 
                              key={index} 
                              className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer hover:underline"
                              onClick={() => handleReferenceClick(part)}
                            >
                              {part}
                            </span>
                          );
                        }
                        return part;
                      });
                    };

                    const processChildren = (child: React.ReactNode): React.ReactNode => {
                      if (typeof child === 'string') {
                        return processText(child);
                      }
                      return child;
                    };

                    return (
                      <p className="mb-3 last:mb-0">
                        {Array.isArray(children) 
                          ? children.map((child, i) => <span key={i}>{processChildren(child)}</span>)
                          : processChildren(children)}
                      </p>
                    );
                  },
                  strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/50 bg-accent/30 pl-4 py-2 my-3 italic font-arabic text-lg">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1">{children}</ol>,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          )}

          {isLoading && response && (
            <span className="inline-block h-4 w-1 animate-pulse bg-primary ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};
