import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import HadithChapterNav from "@/components/HadithChapterNav";

interface HadithDetailProps {
  language: Language;
  arabicFont: "amiri" | "uthmani";
}

interface HadithBook {
  id: string;
  slug: string;
  name_arabic: string;
  name_english: string;
  name_bengali: string;
  total_hadiths: number;
}

interface Hadith {
  id: string;
  book_slug: string;
  hadith_number: number;
  arabic: string | null;
  english: string | null;
  bengali: string | null;
  narrator_english: string | null;
  narrator_bengali: string | null;
  grade: string | null;
  grade_bengali: string | null;
  chapter_number: number | null;
  chapter_name_english: string | null;
  chapter_name_bengali: string | null;
}

interface Chapter {
  chapter_number: number;
  chapter_name_english: string | null;
  chapter_name_bengali: string | null;
  hadith_count: number;
}

const HADITHS_PER_PAGE = 20;

const gradeColors: Record<string, string> = {
  sahih: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  hasan: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  daif: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  "da'eef": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

const HadithDetail = ({ language, arabicFont }: HadithDetailProps) => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const [searchParams] = useSearchParams();
  const targetHadithNumber = searchParams.get("hadith");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [book, setBook] = useState<HadithBook | null>(null);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedHadiths, setExpandedHadiths] = useState<Set<string>>(new Set());
  const [highlightedHadith, setHighlightedHadith] = useState<number | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hadithRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Fetch book info
  useEffect(() => {
    const fetchBook = async () => {
      if (!bookSlug) return;
      
      const { data, error } = await supabase
        .from("hadith_books")
        .select("*")
        .eq("slug", bookSlug)
        .maybeSingle();

      if (error) {
        console.error("Error fetching book:", error);
      } else {
        setBook(data);
      }
    };

    fetchBook();
  }, [bookSlug]);

  // Fetch chapters
  useEffect(() => {
    const fetchChapters = async () => {
      if (!bookSlug) return;

      const translationColumn = language === "bn" ? "bengali" : "english";

      const { data, error } = await supabase
        .from("hadiths")
        .select("chapter_number, chapter_name_english, chapter_name_bengali")
        .eq("book_slug", bookSlug)
        .not(translationColumn, "is", null)
        .not("chapter_number", "is", null);

      if (error) {
        console.error("Error fetching chapters:", error);
        return;
      }

      // Group by chapter and count
      const chapterMap = new Map<number, Chapter>();
      data?.forEach((h) => {
        if (h.chapter_number !== null) {
          const existing = chapterMap.get(h.chapter_number);
          if (existing) {
            existing.hadith_count++;
          } else {
            chapterMap.set(h.chapter_number, {
              chapter_number: h.chapter_number,
              chapter_name_english: h.chapter_name_english,
              chapter_name_bengali: h.chapter_name_bengali,
              hadith_count: 1,
            });
          }
        }
      });

      const sortedChapters = Array.from(chapterMap.values()).sort(
        (a, b) => a.chapter_number - b.chapter_number
      );
      setChapters(sortedChapters);
    };

    fetchChapters();
  }, [bookSlug, language]);

  // Fetch hadiths - only those with translation in selected language
  const fetchHadiths = useCallback(async (pageNum: number, reset = false, chapterNum: number | null = null) => {
    if (!bookSlug) return;

    const from = (pageNum - 1) * HADITHS_PER_PAGE;
    const to = from + HADITHS_PER_PAGE - 1;

    // Filter by selected language translation availability
    const translationColumn = language === "bn" ? "bengali" : "english";

    let query = supabase
      .from("hadiths")
      .select("*")
      .eq("book_slug", bookSlug)
      .not(translationColumn, "is", null);

    // Filter by chapter if selected
    if (chapterNum !== null) {
      query = query.eq("chapter_number", chapterNum);
    }

    const { data, error } = await query
      .order("hadith_number", { ascending: true })
      .range(from, to);

    if (error) {
      console.error("Error fetching hadiths:", error);
    } else {
      if (reset) {
        setHadiths(data || []);
      } else {
        setHadiths(prev => [...prev, ...(data || [])]);
      }
      setHasMore((data?.length || 0) === HADITHS_PER_PAGE);
    }
  }, [bookSlug, language]);

  // Fetch specific hadith if target is provided
  const fetchTargetHadith = useCallback(async () => {
    if (!bookSlug || !targetHadithNumber) return null;

    const hadithNum = parseInt(targetHadithNumber, 10);
    if (isNaN(hadithNum)) return null;

    const translationColumn = language === "bn" ? "bengali" : "english";

    const { data, error } = await supabase
      .from("hadiths")
      .select("*")
      .eq("book_slug", bookSlug)
      .eq("hadith_number", hadithNum)
      .not(translationColumn, "is", null)
      .maybeSingle();

    if (error) {
      console.error("Error fetching target hadith:", error);
      return null;
    }

    return data;
  }, [bookSlug, targetHadithNumber, language]);

  // Initial fetch and refetch when language or chapter changes
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setPage(1);

      // If target hadith is specified, fetch it first
      if (targetHadithNumber) {
        const targetHadith = await fetchTargetHadith();
        if (targetHadith) {
          // Set the hadith and highlight it
          setHadiths([targetHadith]);
          setHighlightedHadith(targetHadith.hadith_number);
          setExpandedHadiths(new Set([targetHadith.id]));
          setHasMore(true);
          setIsLoading(false);
          
          // Scroll to the hadith after render
          setTimeout(() => {
            const element = hadithRefs.current.get(targetHadith.hadith_number);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
          return;
        }
      }

      await fetchHadiths(1, true, selectedChapter);
      setIsLoading(false);
    };
    init();
  }, [fetchHadiths, fetchTargetHadith, language, selectedChapter, targetHadithNumber]);

  // Handle chapter selection
  const handleChapterSelect = (chapterNumber: number | null) => {
    setSelectedChapter(chapterNumber);
    setPage(1);
    setHadiths([]);
  };

  // Fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !bookSlug) return;

      const { data } = await supabase
        .from("hadith_bookmarks")
        .select("hadith_number")
        .eq("user_id", user.id)
        .eq("book_slug", bookSlug);

      if (data) {
        setBookmarks(new Set(data.map(b => `${bookSlug}-${b.hadith_number}`)));
      }
    };

    fetchBookmarks();
  }, [user, bookSlug]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          setIsLoadingMore(true);
          const nextPage = page + 1;
          setPage(nextPage);
          fetchHadiths(nextPage, false, selectedChapter).finally(() => setIsLoadingMore(false));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isLoading, page, fetchHadiths, selectedChapter]);

  const toggleBookmark = async (hadith: Hadith) => {
    if (!user) {
      toast({
        title: language === "bn" ? "লগইন করুন" : "Please login",
        description: language === "bn" 
          ? "বুকমার্ক করতে লগইন করুন"
          : "Login to bookmark hadiths",
      });
      return;
    }

    const key = `${bookSlug}-${hadith.hadith_number}`;
    const isBookmarked = bookmarks.has(key);

    if (isBookmarked) {
      const { error } = await supabase
        .from("hadith_bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("book_slug", bookSlug)
        .eq("hadith_number", hadith.hadith_number);

      if (!error) {
        setBookmarks(prev => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        toast({
          title: language === "bn" ? "বুকমার্ক সরানো হয়েছে" : "Bookmark removed",
        });
      }
    } else {
      const { error } = await supabase
        .from("hadith_bookmarks")
        .insert({
          user_id: user.id,
          book_slug: bookSlug!,
          hadith_number: hadith.hadith_number,
        });

      if (!error) {
        setBookmarks(prev => new Set([...prev, key]));
        toast({
          title: language === "bn" ? "বুকমার্ক যোগ করা হয়েছে" : "Bookmark added",
        });
      }
    }
  };

  const toggleExpanded = (hadithId: string) => {
    setExpandedHadiths(prev => {
      const next = new Set(prev);
      if (next.has(hadithId)) {
        next.delete(hadithId);
      } else {
        next.add(hadithId);
      }
      return next;
    });
  };

  const shareHadith = async (hadith: Hadith) => {
    const text = `${hadith.arabic || ""}\n\n${language === "bn" ? hadith.bengali : hadith.english}\n\n— ${book?.name_english} ${hadith.hadith_number}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (e) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard",
      });
    }
  };

  const getGradeClass = (grade: string | null) => {
    if (!grade) return gradeColors.default;
    const lowerGrade = grade.toLowerCase();
    if (lowerGrade.includes("sahih") || lowerGrade.includes("সহীহ")) return gradeColors.sahih;
    if (lowerGrade.includes("hasan") || lowerGrade.includes("হাসান")) return gradeColors.hasan;
    if (lowerGrade.includes("daif") || lowerGrade.includes("da'eef") || lowerGrade.includes("দাঈফ")) return gradeColors.daif;
    return gradeColors.default;
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-8 w-64 mb-6" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl mb-4" />
          ))}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? "গ্রন্থ পাওয়া যায়নি" : "Book not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/hadith")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className={cn(
              "font-semibold text-lg truncate",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? book.name_bengali : book.name_english}
            </h1>
            <p className="text-sm text-muted-foreground font-arabic">
              {book.name_arabic}
            </p>
          </div>
        </div>
        {/* Chapter Navigation */}
        {chapters.length > 0 && (
          <div className="mx-auto max-w-3xl mt-3">
            <HadithChapterNav
              chapters={chapters}
              selectedChapter={selectedChapter}
              onSelectChapter={handleChapterSelect}
              language={language}
            />
          </div>
        )}
      </div>

      {/* Hadiths List */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {hadiths.map((hadith) => {
            const key = `${bookSlug}-${hadith.hadith_number}`;
            const isBookmarked = bookmarks.has(key);
            const isExpanded = expandedHadiths.has(hadith.id);
            const translation = language === "bn" ? hadith.bengali : hadith.english;
            const isLong = (translation?.length || 0) > 300;
            const isHighlighted = highlightedHadith === hadith.hadith_number;

            return (
              <div
                key={hadith.id}
                ref={(el) => {
                  if (el) hadithRefs.current.set(hadith.hadith_number, el);
                }}
                className={cn(
                  "rounded-xl border bg-card p-4 sm:p-5 transition-all",
                  isHighlighted 
                    ? "border-primary ring-2 ring-primary/20 shadow-lg" 
                    : "border-border"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary",
                      language === "bn" && "font-bengali"
                    )}>
                      {formatNumber(hadith.hadith_number, language)}
                    </span>
                    {hadith.grade && (
                      <Badge variant="secondary" className={cn("text-xs", getGradeClass(hadith.grade))}>
                        {language === "bn" && hadith.grade_bengali ? hadith.grade_bengali : hadith.grade}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => shareHadith(hadith)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn("h-8 w-8", isBookmarked && "text-primary")}
                      onClick={() => toggleBookmark(hadith)}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Narrator */}
                {(hadith.narrator_english || hadith.narrator_bengali) && (
                  <p className={cn(
                    "text-sm text-muted-foreground mb-3",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" && hadith.narrator_bengali 
                      ? hadith.narrator_bengali 
                      : hadith.narrator_english}
                  </p>
                )}

                {/* Arabic Text */}
                {hadith.arabic && (
                  <p className={cn(
                    "text-right text-xl leading-loose mb-4 text-foreground",
                    arabicFont === "uthmani" ? "font-uthmani" : "font-amiri"
                  )}>
                    {hadith.arabic}
                  </p>
                )}

                {/* Translation */}
                {translation && (
                  <div>
                    <p className={cn(
                      "text-foreground leading-relaxed",
                      language === "bn" && "font-bengali",
                      isLong && !isExpanded && "line-clamp-4"
                    )}>
                      {translation}
                    </p>
                    {isLong && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-primary"
                        onClick={() => toggleExpanded(hadith.id)}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            {language === "bn" ? "কম দেখুন" : "Show less"}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            {language === "bn" ? "আরও দেখুন" : "Show more"}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}

                {/* Chapter */}
                {(hadith.chapter_name_english || hadith.chapter_name_bengali) && (
                  <p className={cn(
                    "text-xs text-muted-foreground mt-3 pt-3 border-t border-border",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" 
                      ? `অধ্যায়: ${hadith.chapter_name_bengali || hadith.chapter_name_english}`
                      : `Chapter: ${hadith.chapter_name_english || hadith.chapter_name_bengali}`}
                  </p>
                )}
              </div>
            );
          })}

          {/* Load More */}
          <div ref={loadMoreRef} className="py-8 flex justify-center">
            {isLoadingMore && (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            )}
            {!hasMore && hadiths.length > 0 && (
              <p className={cn(
                "text-sm text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "সব হাদিস দেখানো হয়েছে" : "All hadiths shown"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithDetail;
