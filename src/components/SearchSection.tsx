import { useState, useEffect, useRef } from "react";
import { Search, Mic, MicOff, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SearchSectionProps {
  language: "bn" | "en";
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

// Check if browser supports speech recognition
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const SearchSection = ({ language, onSearch, isLoading }: SearchSectionProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === "bn" ? "bn-BD" : "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setQuery(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          toast.error(language === "bn" ? "মাইক্রোফোন অনুমতি দিন" : "Please allow microphone access");
        } else if (event.error !== "aborted") {
          toast.error(language === "bn" ? "ভয়েস সার্চে সমস্যা হয়েছে" : "Voice search error");
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === "bn" ? "bn-BD" : "en-US";
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const toggleVoiceSearch = () => {
    if (!SpeechRecognition) {
      toast.error(language === "bn" ? "আপনার ব্রাউজার ভয়েস সার্চ সাপোর্ট করে না" : "Your browser doesn't support voice search");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        toast.info(language === "bn" ? "শুনছি... বলুন" : "Listening... speak now", {
          duration: 2000,
        });
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast.error(language === "bn" ? "ভয়েস সার্চ শুরু করতে সমস্যা" : "Failed to start voice search");
      }
    }
  };

  const placeholderText = language === "bn" 
    ? "উদাহরণ: নামাজ সম্পর্কে কুরআন কি বলে?" 
    : "Example: What does Quran say about prayer?";

  return (
    <div className="animate-slide-up">
      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div className="animate-float relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-glow">
          <Sparkles className="h-7 w-7 text-primary-foreground" />
          <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-gold" />
        </div>
      </div>

      {/* Title */}
      <h1 className={cn("mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl md:text-5xl", language === "bn" && "font-bengali")}>
        {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
      </h1>
      <p className={cn("mb-6 px-2 text-center text-sm text-muted-foreground sm:mb-8 sm:px-0 sm:text-base", language === "bn" && "font-bengali")}>
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
              ? "border-primary shadow-glow ring-2 ring-primary/20"
              : "border-border shadow-card hover:border-primary/30",
            isListening && "border-red-500 ring-2 ring-red-500/20"
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
              onClick={toggleVoiceSearch}
              disabled={isLoading}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                isListening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={language === "bn" ? (isListening ? "থামান" : "ভয়েস সার্চ") : (isListening ? "Stop" : "Voice search")}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all",
                isLoading || !query.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-glow active:scale-95"
              )}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
