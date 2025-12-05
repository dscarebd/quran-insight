import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SearchSection } from "@/components/SearchSection";
import { DailyVerse } from "@/components/DailyVerse";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    
    // Simulate search - in production, this would call an AI API
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: language === "bn" ? "অনুসন্ধান সম্পন্ন" : "Search Complete",
        description: language === "bn" 
          ? `"${query}" এর জন্য ফলাফল খুঁজে পাওয়া গেছে।` 
          : `Results found for "${query}".`,
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        language={language}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto islamic-pattern">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <SearchSection
              language={language}
              onSearch={handleSearch}
              isLoading={isSearching}
            />
            
            <DailyVerse language={language} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
