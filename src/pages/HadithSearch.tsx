import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Book, Loader2, X, BookOpen, Sparkles } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HadithSearchProps {
  language: Language;
  arabicFont: "amiri" | "uthmani";
}

interface HadithBook {
  slug: string;
  name_english: string;
  name_bengali: string;
  name_arabic: string;
}

interface SearchResult {
  id: string;
  book_slug: string;
  hadith_number: number;
  arabic: string | null;
  english: string | null;
  bengali: string | null;
  grade: string | null;
}

const bookGradients: Record<string, string> = {
  bukhari: "from-emerald-500 to-teal-600",
  muslim: "from-blue-500 to-indigo-600",
  abudawud: "from-violet-500 to-purple-600",
  tirmidhi: "from-amber-500 to-orange-600",
  nasai: "from-rose-500 to-pink-600",
  ibnmajah: "from-cyan-500 to-sky-600",
  malik: "from-lime-500 to-green-600",
  nawawi: "from-fuchsia-500 to-pink-600",
  qudsi: "from-indigo-500 to-violet-600",
  dehlawi: "from-teal-500 to-cyan-600",
};

const gradeColors: Record<string, string> = {
  sahih: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  hasan: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  daif: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

const RESULTS_PER_PAGE = 20;

const HadithSearch = ({ language, arabicFont }: HadithSearchProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<string>("all");
  const [books, setBooks] = useState<HadithBook[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);
  const [aiExplanation, setAiExplanation] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await supabase
        .from("hadith_books")
        .select("slug, name_english, name_bengali, name_arabic")
        .order("display_order", { ascending: true });
      
      if (data) {
        setBooks(data);
      }
    };
    fetchBooks();
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchHadiths = useCallback(async (searchQuery: string, bookFilter: string, pageNum: number, reset = true) => {
    if (!searchQuery.trim()) return;

    if (reset) {
      setIsLoading(true);
      setResults([]);
      setAiExplanation("");
    } else {
      setIsLoadingMore(true);
    }

    const trimmedQuery = searchQuery.trim();
    
    // Check if query is a number and a specific book is selected - direct lookup
    const isNumericQuery = /^\d+$/.test(trimmedQuery);
    if (isNumericQuery && bookFilter !== "all") {
      const hadithNumber = parseInt(trimmedQuery, 10);
      
      const { data, error } = await supabase
        .from("hadiths")
        .select("id, book_slug, hadith_number, arabic, english, bengali, grade")
        .eq("book_slug", bookFilter)
        .eq("hadith_number", hadithNumber)
        .maybeSingle();

      if (error) {
        console.error("Direct lookup error:", error);
      } else if (data) {
        setResults([data]);
        setAiExplanation("");
        setHasMore(false);
        setHasSearched(true);
        setIsLoading(false);
        return;
      }
      // If no result found, fall through to regular search
    }

    // AI Search mode
    if (isAiMode && reset) {
      try {
        const { data, error } = await supabase.functions.invoke("hadith-ai-search", {
          body: { query: searchQuery.trim(), language, bookFilter }
        });

        if (error) throw error;

        if (data.error) {
          toast({
            variant: "destructive",
            title: language === "bn" ? "ত্রুটি" : "Error",
            description: data.error
          });
          setIsLoading(false);
          setHasSearched(true);
          return;
        }

        setResults(data.hadiths || []);
        setAiExplanation(data.explanation || "");
        setHasMore(false); // AI search doesn't paginate
        setHasSearched(true);
        setIsLoading(false);
        return;
      } catch (err) {
        console.error("AI search error:", err);
        toast({
          variant: "destructive",
          title: language === "bn" ? "AI অনুসন্ধান ব্যর্থ" : "AI Search Failed",
          description: language === "bn" ? "সাধারণ অনুসন্ধান ব্যবহার করা হচ্ছে" : "Falling back to regular search"
        });
        // Fall through to regular search
      }
    }

    // Regular search
    const from = (pageNum - 1) * RESULTS_PER_PAGE;
    const to = from + RESULTS_PER_PAGE - 1;

    let queryBuilder = supabase
      .from("hadiths")
      .select("id, book_slug, hadith_number, arabic, english, bengali, grade")
      .or(`arabic.ilike.%${trimmedQuery}%,english.ilike.%${trimmedQuery}%,bengali.ilike.%${trimmedQuery}%`)
      .order("book_slug", { ascending: true })
      .order("hadith_number", { ascending: true })
      .range(from, to);

    if (bookFilter !== "all") {
      queryBuilder = queryBuilder.eq("book_slug", bookFilter);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error("Search error:", error);
    } else {
      if (reset) {
        setResults(data || []);
      } else {
        setResults(prev => [...prev, ...(data || [])]);
      }
      setHasMore((data?.length || 0) === RESULTS_PER_PAGE);
    }

    setHasSearched(true);
    setIsLoading(false);
    setIsLoadingMore(false);
  }, [isAiMode, language, toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    searchHadiths(query, selectedBook, 1, true);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setAiExplanation("");
    inputRef.current?.focus();
  };

  const handleBookChange = (value: string) => {
    setSelectedBook(value);
    if (hasSearched && query.trim()) {
      setPage(1);
      searchHadiths(query, value, 1, true);
    }
  };

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading && hasSearched) {
          const nextPage = page + 1;
          setPage(nextPage);
          searchHadiths(query, selectedBook, nextPage, false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isLoading, page, query, selectedBook, hasSearched, searchHadiths]);

  const getBookName = (slug: string) => {
    const book = books.find(b => b.slug === slug);
    if (!book) return slug;
    return language === "bn" ? book.name_bengali : book.name_english;
  };

  const getGradeClass = (grade: string | null) => {
    if (!grade) return gradeColors.default;
    const lowerGrade = grade.toLowerCase();
    if (lowerGrade.includes("sahih")) return gradeColors.sahih;
    if (lowerGrade.includes("hasan")) return gradeColors.hasan;
    if (lowerGrade.includes("daif") || lowerGrade.includes("da'eef")) return gradeColors.daif;
    return gradeColors.default;
  };

  const highlightMatch = (text: string | null, searchTerm: string) => {
    if (!text || !searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/hadith")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className={cn(
              "font-semibold text-lg",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "হাদিস অনুসন্ধান" : "Hadith Search"}
            </h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === "bn" ? "হাদিস অনুসন্ধান করুন..." : "Search hadiths..."}
                className={cn(
                  "pl-10 pr-10",
                  language === "bn" && "font-bengali"
                )}
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Select value={selectedBook} onValueChange={handleBookChange}>
                <SelectTrigger className={cn("flex-1", language === "bn" && "font-bengali")}>
                  <SelectValue placeholder={language === "bn" ? "সব গ্রন্থ" : "All books"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className={cn(language === "bn" && "font-bengali")}>
                    {language === "bn" ? "সব গ্রন্থ" : "All books"}
                  </SelectItem>
                  {books.map((book) => (
                    <SelectItem key={book.slug} value={book.slug} className={cn(language === "bn" && "font-bengali")}>
                      {language === "bn" ? book.name_bengali : book.name_english}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant={isAiMode ? "default" : "outline"}
                size="icon"
                onClick={() => setIsAiMode(!isAiMode)}
                className={cn(
                  "shrink-0 transition-all",
                  isAiMode && "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                )}
                title={language === "bn" ? "AI অনুসন্ধান" : "AI Search"}
              >
                <Sparkles className="h-4 w-4" />
              </Button>

              <Button type="submit" disabled={!query.trim() || isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {isAiMode && (
              <p className={cn(
                "text-xs text-muted-foreground flex items-center gap-1.5",
                language === "bn" && "font-bengali"
              )}>
                <Sparkles className="h-3 w-3 text-violet-500" />
                {language === "bn" 
                  ? "AI সক্রিয়: প্রশ্ন করুন যেমন 'নামাজের গুরুত্ব' বা 'সততার হাদিস'"
                  : "AI enabled: Ask questions like 'importance of prayer' or 'hadiths about honesty'"}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : hasSearched && results.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className={cn(
                "text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" 
                  ? `"${query}" এর জন্য কোনো হাদিস পাওয়া যায়নি`
                  : `No hadiths found for "${query}"`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {hasSearched && results.length > 0 && (
                <div className="space-y-2">
                  <p className={cn(
                    "text-sm text-muted-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" 
                      ? `"${query}" এর জন্য ফলাফল`
                      : `Results for "${query}"`}
                  </p>
                  
                  {aiExplanation && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800">
                      <Sparkles className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                      <p className={cn(
                        "text-sm text-violet-700 dark:text-violet-300",
                        language === "bn" && "font-bengali"
                      )}>
                        {aiExplanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {results.map((result) => {
                const translation = language === "bn" ? result.bengali : result.english;

                return (
                  <button
                    key={result.id}
                    onClick={() => navigate(`/hadith/${result.book_slug}?hadith=${result.hadith_number}`)}
                    className="w-full text-left rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white text-sm",
                          bookGradients[result.book_slug] || "from-gray-500 to-gray-600"
                        )}>
                          <Book className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={cn(
                            "font-medium text-sm",
                            language === "bn" && "font-bengali"
                          )}>
                            {getBookName(result.book_slug)}
                          </p>
                          <p className={cn(
                            "text-xs text-muted-foreground",
                            language === "bn" && "font-bengali"
                          )}>
                            {language === "bn" 
                              ? `হাদিস ${formatNumber(result.hadith_number, language)}`
                              : `Hadith ${formatNumber(result.hadith_number, language)}`}
                          </p>
                        </div>
                      </div>
                      {result.grade && (
                        <Badge variant="secondary" className={cn("text-xs shrink-0", getGradeClass(result.grade))}>
                          {result.grade}
                        </Badge>
                      )}
                    </div>

                    {/* Arabic Text */}
                    {result.arabic && (
                      <p className="text-right text-lg leading-loose mb-3 text-foreground line-clamp-2 font-arabic">
                        {highlightMatch(result.arabic, query)}
                      </p>
                    )}

                    {/* Translation */}
                    {translation && (
                      <p className={cn(
                        "text-foreground text-sm leading-relaxed line-clamp-3",
                        language === "bn" && "font-bengali"
                      )}>
                        {highlightMatch(translation, query)}
                      </p>
                    )}
                  </button>
                );
              })}

              {/* Load More */}
              <div ref={loadMoreRef} className="py-8 flex justify-center">
                {isLoadingMore && (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                )}
                {!hasMore && results.length > 0 && (
                  <p className={cn(
                    "text-sm text-muted-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "সব ফলাফল দেখানো হয়েছে" : "All results shown"}
                  </p>
                )}
              </div>
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className={cn(
                "text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" 
                  ? "হাদিস অনুসন্ধান করতে উপরে টাইপ করুন"
                  : "Type above to search hadiths"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HadithSearch;
