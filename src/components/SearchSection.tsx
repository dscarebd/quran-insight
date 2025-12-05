import { useState } from "react";
import { Search, Mic, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchSectionProps {
  language: "bn" | "en";
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchSection = ({ language, onSearch, isLoading }: SearchSectionProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const placeholderText = language === "bn" 
    ? "উদাহরণ: ধৈর্য্য সম্পর্কে কুরআন কি বলে?" 
    : "Example: What does Quran say about patience?";

  return (
    <div className="animate-slide-up">
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="animate-float relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-glow">
          <Sparkles className="h-10 w-10 text-primary-foreground" />
          <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-gold" />
        </div>
      </div>

      {/* Title */}
      <h1 className="mb-3 text-center font-bengali text-4xl font-bold text-foreground md:text-5xl">
        {language === "bn" ? "কুরআন জিজ্ঞাসা করুন" : "Ask the Quran"}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {language === "bn"
          ? "বাংলা বা ইংরেজিতে অনুসন্ধান করুন। এআই এর মাধ্যমে জানুন সঠিক তথ্য।"
          : "Search in Bengali or English. Get accurate information through AI."}
      </p>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div
          className={cn(
            "relative flex items-center rounded-full border-2 bg-card transition-all duration-300",
            isFocused
              ? "border-primary shadow-glow"
              : "border-border shadow-card hover:border-primary/30"
          )}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholderText}
            className="flex-1 bg-transparent px-6 py-4 text-lg placeholder:text-muted-foreground focus:outline-none"
            disabled={isLoading}
          />
          
          <div className="flex items-center gap-2 pr-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              title={language === "bn" ? "ভয়েস সার্চ" : "Voice search"}
            >
              <Mic className="h-5 w-5" />
            </button>
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all",
                isLoading || !query.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-glow active:scale-95"
              )}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
