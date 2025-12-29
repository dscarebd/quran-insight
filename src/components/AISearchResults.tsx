import { useNavigate } from "react-router-dom";
import { Book, BookOpen, HandHeart, FileText, Sparkles, WifiOff, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { AISearchResponse, SearchResult } from "@/hooks/useAISearch";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface AISearchResultsProps {
  response: AISearchResponse;
  language: Language;
}

const getIcon = (type: SearchResult["type"]) => {
  switch (type) {
    case "verse":
      return BookOpen;
    case "hadith":
      return Book;
    case "dua":
      return HandHeart;
    case "surah":
      return FileText;
    default:
      return BookOpen;
  }
};

const getTypeLabel = (type: SearchResult["type"], language: Language) => {
  const labels = {
    verse: { en: "Quran Verse", bn: "কুরআনের আয়াত" },
    hadith: { en: "Hadith", bn: "হাদিস" },
    dua: { en: "Dua", bn: "দোয়া" },
    surah: { en: "Surah", bn: "সূরা" },
  };
  return language === "bn" ? labels[type].bn : labels[type].en;
};

const getTypeColor = (type: SearchResult["type"]) => {
  switch (type) {
    case "verse":
      return "bg-primary/10 text-primary";
    case "hadith":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "dua":
      return "bg-gold/10 text-gold-dark";
    case "surah":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const AISearchResults = ({ response, language }: AISearchResultsProps) => {
  const navigate = useNavigate();

  // Get top verses from references for dedicated verse section
  const relevantVerses = response.references?.verses?.slice(0, 3) || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Offline indicator */}
      {response.isOffline && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-amber-600 dark:text-amber-400">
          <WifiOff className="h-4 w-4 shrink-0" />
          <span className={cn("text-sm", language === "bn" && "font-bengali")}>
            {language === "bn" 
              ? "অফলাইন মোড - স্থানীয় ডেটা থেকে ফলাফল"
              : "Offline mode - Results from local data"}
          </span>
        </div>
      )}

      {/* AI Answer */}
      {response.answer && !response.isOffline && (
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className={cn(
              "text-base font-semibold text-foreground pt-1",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "AI উত্তর" : "AI Answer"}
            </h3>
          </div>
          <div className={cn(
            "prose prose-sm max-w-none dark:prose-invert",
            "prose-p:text-muted-foreground prose-p:leading-relaxed",
            "prose-strong:text-foreground",
            "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            <ReactMarkdown>{response.answer}</ReactMarkdown>
          </div>
        </Card>
      )}

      {/* Offline message */}
      {response.isOffline && (
        <Card className="p-4 sm:p-6 bg-muted/50">
          <p className={cn(
            "text-sm text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            {response.answer}
          </p>
        </Card>
      )}

      {/* Relevant Quran Verses Section */}
      {relevantVerses.length > 0 && !response.isOffline && (
        <div>
          <h3 className={cn(
            "text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2",
            language === "bn" && "font-bengali"
          )}>
            <BookOpen className="h-4 w-4 text-primary" />
            {language === "bn" ? "সম্পর্কিত কুরআনের আয়াত" : "Related Quran Verses"}
          </h3>
          
          <div className="space-y-3">
            {relevantVerses.map((verse: any, index: number) => (
              <button
                key={`verse-${verse.surah_number}-${verse.verse_number}-${index}`}
                onClick={() => navigate(`/surah/${verse.surah_number}?verse=${verse.verse_number}`)}
                className="group w-full text-left rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-primary/40"
              >
                {/* Surah and Verse Reference */}
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" 
                      ? `সূরা ${verse.surah_number}, আয়াত ${verse.verse_number}`
                      : `Surah ${verse.surah_number}, Verse ${verse.verse_number}`}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Arabic Text */}
                {verse.arabic && (
                  <p className="font-arabic text-xl sm:text-2xl text-foreground leading-loose mb-4 text-right" dir="rtl">
                    {verse.arabic}
                  </p>
                )}

                {/* Translation */}
                <p className={cn(
                  "text-sm text-muted-foreground leading-relaxed",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? verse.bengali : verse.english}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {response.results.length > 0 && (
        <div>
          <h3 className={cn(
            "text-sm font-medium text-muted-foreground mb-3",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? `${response.results.length}টি সম্পর্কিত ফলাফল`
              : `${response.results.length} Related Results`}
          </h3>
          
          <div className="grid gap-3 sm:gap-4">
            {response.results.map((result, index) => {
              const Icon = getIcon(result.type);
              
              return (
                <button
                  key={`${result.type}-${index}`}
                  onClick={() => navigate(result.link)}
                  className="group text-left rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      getTypeColor(result.type)
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Type badge and title */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          getTypeColor(result.type)
                        )}>
                          {getTypeLabel(result.type, language)}
                        </span>
                      </div>
                      
                      <h4 className={cn(
                        "font-medium text-foreground mb-1 line-clamp-1",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? result.titleBn : result.title}
                      </h4>

                      {/* Arabic text */}
                      {result.arabic && (
                        <p className="font-arabic text-base text-foreground/80 mb-2 line-clamp-1 text-right" dir="rtl">
                          {result.arabic}
                        </p>
                      )}

                      {/* Translation */}
                      <p className={cn(
                        "text-sm text-muted-foreground line-clamp-2",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? result.contentBn : result.content}
                      </p>

                      {/* Reference */}
                      {result.reference && (
                        <p className={cn(
                          "text-xs text-muted-foreground/70 mt-2",
                          language === "bn" && "font-bengali"
                        )}>
                          {result.reference}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {response.results.length === 0 && !response.answer && (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className={cn(
            "text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? "কোনো ফলাফল পাওয়া যায়নি"
              : "No results found"}
          </p>
        </div>
      )}
    </div>
  );
};