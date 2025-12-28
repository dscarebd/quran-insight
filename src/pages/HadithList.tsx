import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, Book, Search } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Scroll to top when page loads
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

interface HadithListProps {
  language: Language;
}

interface HadithBook {
  id: string;
  slug: string;
  name_arabic: string;
  name_english: string;
  name_bengali: string;
  total_hadiths: number;
  icon: string;
  display_order: number;
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

const HadithList = ({ language }: HadithListProps) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<HadithBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useScrollToTop();

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("hadith_books")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching hadith books:", error);
      } else {
        setBooks(data || []);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className={cn(
                "text-lg sm:text-xl font-semibold text-foreground mb-1",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "হাদিস সংকলন" : "Hadith Collections"}
              </h1>
              <p className={cn(
                "text-sm text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" 
                  ? "দশটি হাদিস সংকলন"
                  : "Ten hadith collections"}
              </p>
            </div>
            <Button
              onClick={() => navigate("/hadith-search")}
              variant="outline"
              className="shrink-0"
            >
              <Search className="h-4 w-4 mr-2" />
              {language === "bn" ? "অনুসন্ধান" : "Search"}
            </Button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => navigate(`/hadith/${book.slug}`)}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-5 text-left transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
                bookGradients[book.slug] || "from-gray-500 to-gray-600"
              )} />

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110",
                  bookGradients[book.slug] || "from-gray-500 to-gray-600"
                )}>
                  <Book className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={cn(
                      "font-semibold text-base text-foreground truncate",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? book.name_bengali : book.name_english}
                    </h3>
                    <span className="font-arabic text-base text-muted-foreground shrink-0">
                      {book.name_arabic}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm text-muted-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" 
                      ? `${formatNumber(book.total_hadiths, language)} হাদিস`
                      : `${formatNumber(book.total_hadiths, language)} Hadiths`}
                  </p>
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className={cn(
              "text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" 
                ? "কোনো হাদিস গ্রন্থ পাওয়া যায়নি"
                : "No hadith books found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithList;
