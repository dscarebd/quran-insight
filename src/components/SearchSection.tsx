import { useState } from "react";
import { Search, Mic, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type GPTModel = "gpt-4o-mini" | "gpt-4o" | "gpt-4-turbo";

interface SearchSectionProps {
  language: "bn" | "en";
  onSearch: (query: string, model: GPTModel) => void;
  isLoading?: boolean;
}

const models: { id: GPTModel; name: string; description: string }[] = [
  { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Fast & cost-effective" },
  { id: "gpt-4o", name: "GPT-4o", description: "Higher quality" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Complex reasoning" },
];

export const SearchSection = ({ language, onSearch, isLoading }: SearchSectionProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedModel, setSelectedModel] = useState<GPTModel>("gpt-4o-mini");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), selectedModel);
    }
  };

  const selectedModelInfo = models.find(m => m.id === selectedModel);

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
      <h1 className={cn("mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl md:text-5xl", language === "bn" && "font-bengali")}>
        {language === "bn" ? "কুরআন জিজ্ঞাসা করুন" : "Ask the Quran"}
      </h1>
      <p className={cn("mb-4 px-2 text-center text-sm text-muted-foreground sm:mb-6 sm:px-0 sm:text-base", language === "bn" && "font-bengali")}>
        {language === "bn"
          ? "বাংলা বা ইংরেজিতে অনুসন্ধান করুন। এআই এর মাধ্যমে জানুন সঠিক তথ্য।"
          : "Search in Bengali or English. Get accurate information through AI."}
      </p>

      {/* Model Selector */}
      <div className="mb-4 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent">
            <span className="text-muted-foreground">{language === "bn" ? "মডেল:" : "Model:"}</span>
            <span className="font-medium">{selectedModelInfo?.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={cn(
                  "flex flex-col items-start gap-0.5 cursor-pointer",
                  selectedModel === model.id && "bg-accent"
                )}
              >
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div
          className={cn(
            "relative flex items-center rounded-full border-2 bg-card transition-all duration-300",
            isFocused
              ? "border-primary shadow-glow ring-2 ring-primary/20"
              : "border-border shadow-card hover:border-primary/30"
          )}
        >
          {/* Decorative accent line */}
          <div className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-300",
            isFocused ? "w-3/4 opacity-100" : "w-0 opacity-0"
          )} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholderText}
            className={cn(
              "min-w-0 flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none sm:px-6 sm:py-4 sm:text-lg font-bengali placeholder:font-bengali",
              "placeholder:text-muted-foreground"
            )}
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
