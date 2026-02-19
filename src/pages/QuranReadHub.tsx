import { useNavigate } from "react-router-dom";
import { BookOpen, BookText, ChevronRight, BookMarked, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { useBookLibrary } from "@/hooks/useBookLibrary";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface QuranReadHubProps {
  language: Language;
}

const QuranReadHub = ({ language }: QuranReadHubProps) => {
  const navigate = useNavigate();
  const { data: books, isLoading } = useBookLibrary();

  const lastReadPage = localStorage.getItem("quran-last-read-page") || "1";

  const isBn = language === "bn";

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 py-4 space-y-6">
        {/* Read in the App Card */}
        <section>
          <h2 className={cn("text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", isBn && "font-bengali")}>
            {isBn ? "মাসহাফ পাঠক" : "Mushaf Reader"}
          </h2>
          <button
            onClick={() => navigate(`/read/${lastReadPage}`)}
            className="w-full rounded-2xl bg-primary text-primary-foreground p-5 flex items-center gap-4 shadow-lg hover:opacity-90 active:scale-[0.98] transition-all text-left"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/20">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-lg font-bold leading-tight", isBn && "font-bengali")}>
                {isBn ? "অ্যাপে পড়ুন" : "Read in the App"}
              </p>
              <p className={cn("text-sm text-primary-foreground/70 mt-0.5", isBn && "font-bengali")}>
                {isBn ? "হিফয মাসহাফ সহ সম্পূর্ণ কুরআন" : "Full Quran with Hifz Mushaf"}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary-foreground/70 shrink-0" />
          </button>
        </section>

        {/* PDF Books Section */}
        <section>
          <h2 className={cn("text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", isBn && "font-bengali")}>
            {isBn ? "ইসলামিক বই সমূহ" : "Islamic Books"}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border bg-card">
                  <Skeleton className="w-full aspect-[3/4]" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : !books || books.length === 0 ? (
            <div className={cn(
              "text-center py-12 text-muted-foreground",
              isBn && "font-bengali"
            )}>
              <BookMarked className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>{isBn ? "কোনো বই পাওয়া যায়নি" : "No books available"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => navigate(`/read/pdf/${book.id}`)}
                  className="rounded-xl overflow-hidden border border-border bg-card text-left hover:border-primary/50 active:scale-[0.97] transition-all shadow-sm hover:shadow-md"
                >
                  {/* Cover Image */}
                  <div className="relative w-full aspect-[3/4] bg-muted overflow-hidden">
                    {book.cover_image_url ? (
                      <img
                        src={book.cover_image_url}
                        alt={isBn ? book.title_bengali : book.title_english}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-primary/20">
                        <BookText className="h-10 w-10 text-primary/50" />
                      </div>
                    )}
                    {book.is_featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-amber-500 text-white border-0 text-xs px-1.5 py-0.5 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-2.5 space-y-0.5">
                    <p className={cn(
                      "text-sm font-semibold text-foreground leading-tight line-clamp-2",
                      isBn && "font-bengali"
                    )}>
                      {isBn ? book.title_bengali : book.title_english}
                    </p>
                    {(isBn ? book.author_bengali : book.author_english) && (
                      <p className={cn(
                        "text-xs text-muted-foreground truncate",
                        isBn && "font-bengali"
                      )}>
                        {isBn ? book.author_bengali : book.author_english}
                      </p>
                    )}
                    <div className={cn(
                      "flex items-center gap-1 mt-1.5",
                    )}>
                      <span className={cn(
                        "text-xs font-medium text-primary",
                        isBn && "font-bengali"
                      )}>
                        {isBn ? "পড়ুন →" : "Read →"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default QuranReadHub;
