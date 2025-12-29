import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HandHeart, ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";

interface DailyDuaProps {
  language: Language;
}

interface DuaData {
  id: string;
  dua_id: string;
  category_id: string;
  title_english: string;
  title_bengali: string;
  arabic: string;
  english: string;
  bengali: string;
  reference: string | null;
}

interface CategoryData {
  category_id: string;
  name_english: string;
  name_bengali: string;
}

export const DailyDua = ({ language }: DailyDuaProps) => {
  const [dua, setDua] = useState<DuaData | null>(null);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDailyDua = async () => {
      // Get today's date as a cache key
      const today = new Date();
      const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      const cacheKey = "dua-of-day-cache";
      
      // Try to get cached data
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { dateKey, duaData, categoryData } = JSON.parse(cached);
          if (dateKey === todayKey && duaData && categoryData) {
            setDua(duaData);
            setCategory(categoryData);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Cache read failed, continue with fetch
      }
      
      setIsLoading(true);
      
      // Get a deterministic "random" dua based on the day
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
      );

      // Fetch total count of duas
      const { count } = await supabase
        .from("duas")
        .select("id", { count: "exact", head: true });

      if (!count || count === 0) {
        setIsLoading(false);
        return;
      }

      // Get a dua based on day of year
      const offset = dayOfYear % count;

      const { data: duaData } = await supabase
        .from("duas")
        .select("id, dua_id, category_id, title_english, title_bengali, arabic, english, bengali, reference")
        .order("category_id", { ascending: true })
        .order("dua_id", { ascending: true })
        .range(offset, offset)
        .maybeSingle();

      if (duaData) {
        setDua(duaData);

        // Fetch category info
        const { data: categoryData } = await supabase
          .from("dua_categories")
          .select("category_id, name_english, name_bengali")
          .eq("category_id", duaData.category_id)
          .maybeSingle();

        if (categoryData) {
          setCategory(categoryData);
          
          // Cache the data for today
          try {
            localStorage.setItem(cacheKey, JSON.stringify({
              dateKey: todayKey,
              duaData,
              categoryData
            }));
          } catch {
            // Cache write failed, continue anyway
          }
        }
      }

      setIsLoading(false);
    };

    fetchDailyDua();
  }, []);

  const handleViewDua = () => {
    if (dua && category) {
      navigate(`/dua/${category.category_id}?dua=${dua.dua_id}`);
    }
  };

  const handleCopy = async () => {
    if (!dua) return;
    
    const textToCopy = `${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n(${dua.reference})` : ""}`;
    
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
      <div className="mx-auto mt-8 max-w-2xl animate-pulse">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
        <div className="verse-card">
          <div className="h-6 w-48 bg-muted rounded mx-auto mb-4" />
          <div className="h-16 bg-muted rounded mb-4" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!dua || !category) return null;

  return (
    <div className="mx-auto mt-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
      {/* Label */}
      <div className="mb-4 flex items-center justify-center gap-2 text-primary">
        <HandHeart className="h-4 w-4" />
        <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
          {language === "bn" ? "আজকের দোয়া" : "Dua of the Day"}
        </span>
      </div>

      {/* Dua Card */}
      <div className="verse-card group relative">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-primary group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>

        {/* Title */}
        {(dua.title_bengali || dua.title_english) && (
          <p className={cn(
            "mb-3 text-center text-sm font-medium text-primary",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? dua.title_bengali : dua.title_english}
          </p>
        )}

        {/* Arabic Text */}
        <p className="mb-4 text-center font-arabic text-scale-arabic-xl text-foreground">
          {dua.arabic}
        </p>

        {/* Translation */}
        <p className={cn("mb-4 text-center text-[9px] leading-tight text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? dua.bengali : dua.english}
        </p>

        {/* Reference & Category */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {dua.reference && (
              <span className={cn(
                "rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {dua.reference}
              </span>
            )}
          </div>
          {dua.reference && (dua.reference === "দোয়া সংকলন" || dua.reference === "সাধারণ প্রার্থনা - জায়েয দোয়া") && (
            <p className={cn(
              "text-[10px] text-muted-foreground/70 text-center max-w-xs",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" 
                ? "এটি একটি সাধারণ প্রার্থনা যা জায়েয।" 
                : "This is a general permissible prayer."}
            </p>
          )}
          <button 
            onClick={handleViewDua}
            className={cn(
              "flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
              language === "bn" && "font-bengali"
            )}
          >
            {language === "bn" ? "সব দোয়া দেখুন" : "View All Duas"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
