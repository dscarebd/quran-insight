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
        <section className="animate-fade-in">
          <button
            onClick={() => navigate(`/read/${lastReadPage}`)}
            className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-md hover:-translate-y-1 text-left"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className={cn(
                "text-xs font-medium text-muted-foreground truncate uppercase tracking-wide",
                isBn && "font-bengali normal-case tracking-normal"
              )}>
                {isBn ? "মাসহাফ পাঠক" : "Mushaf Reader"}
              </p>
              <p className={cn(
                "font-semibold text-foreground truncate text-sm sm:text-base leading-tight",
                isBn && "font-bengali"
              )}>
                {isBn ? "অ্যাপে পড়ুন" : "Read in the App"}
              </p>
              <p className={cn("text-muted-foreground font-normal text-xs truncate mt-0.5", isBn && "font-bengali")}>
                {isBn ? "হিফয মাসহাফ সহ সম্পূর্ণ কুরআন" : "Full Quran with Hifz Mushaf"}
              </p>
            </div>
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-all duration-300">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </button>
        </section>

        {/* PDF Books Section */}
        <section>
          <h2 className={cn("text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", isBn && "font-bengali")}>
            {isBn ? "ইসলামিক বই সমূহ" : "Islamic Books"}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border bg-card">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-2 space-y-1.5">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-2.5 w-2/3" />
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => navigate(`/read/pdf/${book.id}`)}
                  className="overflow-hidden border border-border bg-card text-left hover:border-primary/50 active:scale-[0.97] transition-all shadow-sm hover:shadow-md"
                >
                  {/* Cover Image */}
                  <div className="relative w-full aspect-square bg-muted overflow-hidden">
                    {book.cover_image_url ? (
                      <img
                        src={book.cover_image_url}
                        alt={isBn ? book.title_bengali : book.title_english}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                        <BookText className="h-6 w-6 text-primary/50" />
                      </div>
                    )}
                    {book.is_featured && (
                      <div className="absolute top-1 right-1">
                        <Badge className="bg-amber-500 text-white border-0 text-[10px] px-1 py-0 flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-current" />
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-1.5">
                    <p className={cn(
                      "text-xs font-semibold text-foreground leading-tight line-clamp-2",
                      isBn && "font-bengali"
                    )}>
                      {isBn ? book.title_bengali : book.title_english}
                    </p>
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
