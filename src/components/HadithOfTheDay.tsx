import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";

interface HadithOfTheDayProps {
  language: Language;
  arabicFont?: "amiri" | "uthmani";
  compact?: boolean;
}

interface Hadith {
  id: string;
  book_slug: string;
  hadith_number: number;
  arabic: string | null;
  english: string | null;
  bengali: string | null;
  grade: string | null;
}

interface HadithBook {
  slug: string;
  name_english: string;
  name_bengali: string;
  name_arabic: string;
}

const bookGradients: Record<string, string> = {
  bukhari: "from-emerald-500/20 to-teal-600/20",
  muslim: "from-blue-500/20 to-indigo-600/20",
  abudawud: "from-violet-500/20 to-purple-600/20",
  tirmidhi: "from-amber-500/20 to-orange-600/20",
  nasai: "from-rose-500/20 to-pink-600/20",
  ibnmajah: "from-cyan-500/20 to-sky-600/20",
  malik: "from-lime-500/20 to-green-600/20",
  nawawi: "from-fuchsia-500/20 to-pink-600/20",
  qudsi: "from-indigo-500/20 to-violet-600/20",
  dehlawi: "from-teal-500/20 to-cyan-600/20",
};

const bookIconColors: Record<string, string> = {
  bukhari: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  muslim: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  abudawud: "text-violet-600 bg-violet-100 dark:bg-violet-900/30",
  tirmidhi: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
  nasai: "text-rose-600 bg-rose-100 dark:bg-rose-900/30",
  ibnmajah: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30",
  malik: "text-lime-600 bg-lime-100 dark:bg-lime-900/30",
  nawawi: "text-fuchsia-600 bg-fuchsia-100 dark:bg-fuchsia-900/30",
  qudsi: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30",
  dehlawi: "text-teal-600 bg-teal-100 dark:bg-teal-900/30",
};

export const HadithOfTheDay = ({ language, arabicFont = "uthmani", compact = false }: HadithOfTheDayProps) => {
  const navigate = useNavigate();
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [book, setBook] = useState<HadithBook | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHadithOfTheDay = async () => {
      setIsLoading(true);
      
      // Get a deterministic "random" hadith based on the day
      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
      );

      // Fetch total count of hadiths
      const { count } = await supabase
        .from("hadiths")
        .select("id", { count: "exact", head: true });

      if (!count || count === 0) {
        setIsLoading(false);
        return;
      }

      // Get a hadith based on day of year
      const offset = dayOfYear % count;

      const { data: hadithData } = await supabase
        .from("hadiths")
        .select("id, book_slug, hadith_number, arabic, english, bengali, grade")
        .not("arabic", "is", null)
        .order("book_slug", { ascending: true })
        .order("hadith_number", { ascending: true })
        .range(offset, offset)
        .maybeSingle();

      if (hadithData) {
        setHadith(hadithData);

        // Fetch book info
        const { data: bookData } = await supabase
          .from("hadith_books")
          .select("slug, name_english, name_bengali, name_arabic")
          .eq("slug", hadithData.book_slug)
          .maybeSingle();

        if (bookData) {
          setBook(bookData);
        }
      }

      setIsLoading(false);
    };

    fetchHadithOfTheDay();
  }, []);

  const handleCopy = async () => {
    if (!hadith || !book) return;
    
    const bookName = language === "bn" ? book.name_bengali : book.name_english;
    const translation = language === "bn" ? hadith.bengali : hadith.english;
    const textToCopy = `${hadith.arabic || ""}\n\n${translation || ""}\n\n— ${bookName}, Hadith ${hadith.hadith_number}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  if (isLoading) {
    return (
      <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 animate-pulse">
        <div className="h-8 w-32 bg-muted rounded mb-4" />
        <div className="h-16 bg-muted rounded mb-4" />
        <div className="h-12 bg-muted rounded" />
      </div>
    );
  }

  if (!hadith || !book) {
    return null;
  }

  const translation = language === "bn" ? hadith.bengali : hadith.english;
  const bookName = language === "bn" ? book.name_bengali : book.name_english;
  const iconColorClass = bookIconColors[book.slug] || "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
  const gradientClass = bookGradients[book.slug] || "from-gray-500/20 to-gray-600/20";

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all hover:shadow-elevated">
      {/* Decorative corner */}
      <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl", gradientClass)} />
      
      {/* Header */}
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg", iconColorClass)}>
            <Book className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <span className={cn("text-sm sm:text-base font-medium text-foreground", language === "bn" && "font-bengali")}>
            {language === "bn" ? "আজকের হাদিস" : "Hadith of the Day"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {isCopied ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        </button>
      </div>
      
      {/* Source */}
      <p className={cn(
        "mb-2 sm:mb-3 text-center text-xs sm:text-sm font-medium",
        iconColorClass.split(" ")[0],
        language === "bn" && "font-bengali"
      )}>
        {bookName} — {language === "bn" ? `হাদিস ${hadith.hadith_number}` : `Hadith ${hadith.hadith_number}`}
      </p>
      
      {/* Arabic */}
      {hadith.arabic && (
        <p className={cn(
          "mb-3 sm:mb-4 text-center text-xl sm:text-2xl leading-loose text-foreground",
          arabicFont === "uthmani" ? "font-uthmani" : "font-amiri",
          compact && "line-clamp-2"
        )}>
          {hadith.arabic}
        </p>
      )}
      
      {/* Translation */}
      {translation && (
        <p className={cn(
          "mb-3 sm:mb-4 text-center text-sm sm:text-base text-muted-foreground leading-relaxed",
          language === "bn" && "font-bengali",
          compact ? "line-clamp-3" : "line-clamp-4"
        )}>
          {translation}
        </p>
      )}
      
      {/* View More */}
      <button 
        onClick={() => navigate(`/hadith/${book.slug}`)}
        className={cn(
          "mx-auto flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors",
          iconColorClass,
          "hover:opacity-80",
          language === "bn" && "font-bengali"
        )}
      >
        {language === "bn" ? "আরও হাদিস" : "More Hadiths"}
        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>
    </div>
  );
};
