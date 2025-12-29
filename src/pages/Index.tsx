import { useState, useEffect, useCallback } from "react";
import { ContinueReading } from "@/components/ContinueReading";
import { DesktopHeroSearch } from "@/components/desktop/DesktopHeroSearch";
import { QuickAccessCards } from "@/components/desktop/QuickAccessCards";
import { DesktopDailyContent } from "@/components/desktop/DesktopDailyContent";
import { AISearchResults } from "@/components/AISearchResults";
import { useAISearch } from "@/hooks/useAISearch";
import { useToast } from "@/hooks/use-toast";
import { Language } from "@/types/language";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface IndexProps {
  language: Language;
}

const Index = ({ language }: IndexProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { search, clear, isLoading, error, response, isOnline } = useAISearch();
  const { toast } = useToast();

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    clear();
  }, [clear]);

  // Listen for home navigation event to clear search
  useEffect(() => {
    const handleClearSearch = () => clearSearch();
    window.addEventListener("clear-home-search", handleClearSearch);
    return () => window.removeEventListener("clear-home-search", handleClearSearch);
  }, [clearSearch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast, language]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await search(query, language);
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden max-w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 overflow-hidden">
        {/* Hero Search Section */}
        <DesktopHeroSearch
          language={language}
          onSearch={handleSearch}
          isLoading={isLoading}
          hasResults={!!searchQuery}
          onClear={clearSearch}
        />
        
        {/* Continue Reading - after hero, before quick access (mobile/tablet only) */}
        <ContinueReading language={language} />
        
        {/* Search Results */}
        {searchQuery && (
          <div className="mt-6 sm:mt-8">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <div className="grid gap-3">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>
            ) : response ? (
              <AISearchResults response={response} language={language} />
            ) : null}
          </div>
        )}
        
        {!searchQuery && (
          <>
            {/* Quick Access Cards */}
            <div className="mt-8 sm:mt-10">
              <h2 className={cn(
                "mb-4 sm:mb-6 text-scale-lg font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "দ্রুত প্রবেশ" : "Quick Access"}
              </h2>
              <QuickAccessCards language={language} />
            </div>
            
            {/* Daily Content */}
            <div className="mt-8 sm:mt-10">
              <h2 className={cn(
                "mb-4 sm:mb-6 text-scale-lg font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "আজকের আয়াত, দোয়া ও হাদিস" : "Today's Verse, Dua & Hadith"}
              </h2>
              <DesktopDailyContent language={language} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;