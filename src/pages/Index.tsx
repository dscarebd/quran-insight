import { useState, useRef } from "react";
import { SearchSection } from "@/components/SearchSection";
import { DailyVerse } from "@/components/DailyVerse";
import { DailyDua } from "@/components/DailyDua";
import { SearchResults } from "@/components/SearchResults";
import { ContinueReading } from "@/components/ContinueReading";
import { DesktopHeroSearch } from "@/components/desktop/DesktopHeroSearch";
import { QuickAccessCards } from "@/components/desktop/QuickAccessCards";
import { DesktopDailyContent } from "@/components/desktop/DesktopDailyContent";
import { useToast } from "@/hooks/use-toast";
import { getVersesBySurah, Verse } from "@/data/verses";
import { surahs } from "@/data/surahs";
import { useIsMobile } from "@/hooks/use-mobile";

interface IndexProps {
  language: "bn" | "en";
}

const Index = ({ language }: IndexProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMobile = useIsMobile();

  // Offline search through local verses
  const searchOffline = (query: string): string => {
    const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    const results: { verse: Verse; surahName: string; score: number }[] = [];

    // Search through all surahs (1-114)
    for (let surahNum = 1; surahNum <= 114; surahNum++) {
      const verses = getVersesBySurah(surahNum);
      verses.forEach((verse) => {
        const surah = surahs.find(s => s.number === verse.surahNumber);
        const surahName = language === "bn" ? surah?.nameBengali : surah?.nameEnglish;
        
        // Search in bengali, english, and arabic text
        const textToSearch = `${verse.bengali} ${verse.english} ${verse.arabic}`.toLowerCase();
        
        let score = 0;
        searchTerms.forEach(term => {
          if (textToSearch.includes(term)) {
            score += 1;
          }
        });

        if (score > 0) {
          results.push({ verse, surahName: surahName || "", score });
        }
      });
    }

    // Sort by score (relevance) then by surah and verse number
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.verse.surahNumber !== b.verse.surahNumber) return a.verse.surahNumber - b.verse.surahNumber;
      return a.verse.verseNumber - b.verse.verseNumber;
    });

    // Take top 10 results
    const topResults = results.slice(0, 10);

    if (topResults.length === 0) {
      return language === "bn" 
        ? "দুঃখিত, আপনার অনুসন্ধানের সাথে মিলে যায় এমন কোনো আয়াত পাওয়া যায়নি।"
        : "Sorry, no verses found matching your search.";
    }

    // Format results as markdown
    let response = language === "bn" 
      ? `**"${query}" এর জন্য অফলাইন অনুসন্ধান ফলাফল:**\n\n`
      : `**Offline search results for "${query}":**\n\n`;

    topResults.forEach((result, index) => {
      const { verse, surahName } = result;
      response += `### ${index + 1}. ${surahName} (${verse.surahNumber}:${verse.verseNumber})\n\n`;
      response += `**${verse.arabic}**\n\n`;
      response += language === "bn" ? `${verse.bengali}\n\n` : `${verse.english}\n\n`;
      response += "---\n\n";
    });

    return response;
  };

  const handleSearch = async (query: string) => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setIsSearching(true);
    setSearchQuery(query);
    setAiResponse("");

    // Check if offline
    if (!navigator.onLine) {
      const offlineResults = searchOffline(query);
      setAiResponse(offlineResults);
      setIsSearching(false);
      toast({
        title: language === "bn" ? "অফলাইন মোড" : "Offline Mode",
        description: language === "bn" 
          ? "স্থানীয় আয়াত থেকে অনুসন্ধান করা হচ্ছে" 
          : "Searching from local verses",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quran-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ query, language }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              setAiResponse(fullResponse);
            }
          } catch {
            // Incomplete JSON, put back and wait for more
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsSearching(false);
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return;
      }
      
      // If network error, fall back to offline search
      if (error instanceof TypeError && error.message.includes("fetch")) {
        const offlineResults = searchOffline(query);
        setAiResponse(offlineResults);
        setIsSearching(false);
        toast({
          title: language === "bn" ? "অফলাইন মোড" : "Offline Mode",
          description: language === "bn" 
            ? "নেটওয়ার্ক ত্রুটি, স্থানীয় আয়াত থেকে অনুসন্ধান করা হচ্ছে" 
            : "Network error, searching from local verses",
        });
        return;
      }
      
      console.error("Search error:", error);
      setIsSearching(false);
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: error instanceof Error ? error.message : "Failed to search",
        variant: "destructive",
      });
    }
  };

  // Desktop layout
  if (!isMobile) {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-6 py-8 pb-24">
          {/* Hero Search Section */}
          <DesktopHeroSearch
            language={language}
            onSearch={handleSearch}
            isLoading={isSearching}
          />
          
          {/* Search Results */}
          <SearchResults
            query={searchQuery}
            response={aiResponse}
            isLoading={isSearching}
            language={language}
          />
          
          {!searchQuery && (
            <>
              {/* Quick Access Cards */}
              <div className="mt-10">
                <h2 className={`mb-6 text-xl font-semibold text-foreground ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "দ্রুত প্রবেশ" : "Quick Access"}
                </h2>
                <QuickAccessCards language={language} />
              </div>
              
              {/* Daily Content */}
              <div className="mt-10">
                <h2 className={`mb-6 text-xl font-semibold text-foreground ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "আজকের বিশেষ" : "Today's Featured"}
                </h2>
                <DesktopDailyContent language={language} />
              </div>
            </>
          )}
          
          <ContinueReading language={language} />
        </div>
      </div>
    );
  }

  // Mobile layout (existing)
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden islamic-pattern">
      <div className="mx-auto max-w-4xl px-3 py-6 pb-32 sm:px-4 md:px-6 md:py-12 md:pb-24">
        <SearchSection
          language={language}
          onSearch={handleSearch}
          isLoading={isSearching}
        />
        
        <SearchResults
          query={searchQuery}
          response={aiResponse}
          isLoading={isSearching}
          language={language}
        />
        
        {!searchQuery && (
          <>
            <DailyVerse language={language} />
            <DailyDua language={language} />
            <ContinueReading language={language} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;