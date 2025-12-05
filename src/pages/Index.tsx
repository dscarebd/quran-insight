import { useState, useRef } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SearchSection } from "@/components/SearchSection";
import { DailyVerse } from "@/components/DailyVerse";
import { SearchResults } from "@/components/SearchResults";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (query: string) => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setIsSearching(true);
    setSearchQuery(query);
    setAiResponse("");

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
      
      console.error("Search error:", error);
      setIsSearching(false);
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: error instanceof Error ? error.message : "Failed to search",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar
        language={language}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <SidebarInset>
        {/* Header */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden islamic-pattern">
          <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6 md:py-12">
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
            
            {!searchQuery && <DailyVerse language={language} />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;
