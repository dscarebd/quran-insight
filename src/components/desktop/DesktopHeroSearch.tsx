import { useState, useEffect, useRef } from "react";
import { Search, Mic, MicOff, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";

interface DesktopHeroSearchProps {
  language: Language;
  onSearch: (query: string) => void;
  isLoading?: boolean;
  hasResults?: boolean;
  onClear?: () => void;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const DesktopHeroSearch = ({ language, onSearch, isLoading, hasResults, onClear }: DesktopHeroSearchProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

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
        setIsListening(false);
        if (event.error === "not-allowed") {
          toast.error(language === "bn" ? "মাইক্রোফোন অনুমতি দিন" : "Please allow microphone access");
        } else if (event.error !== "aborted") {
          toast.error(language === "bn" ? "ভয়েস সার্চে সমস্যা হয়েছে" : "Voice search error");
        }
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => recognitionRef.current?.abort();
  }, [language]);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === "bn" ? "bn-BD" : "en-US";
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
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
        toast.info(language === "bn" ? "শুনছি... বলুন" : "Listening... speak now", { duration: 2000 });
      } catch {
        toast.error(language === "bn" ? "ভয়েস সার্চ শুরু করতে সমস্যা" : "Failed to start voice search");
      }
    }
  };

  // Collapsed mode when there are results
  if (hasResults) {
    return (
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-emerald-700 p-3 sm:p-4">
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0l40 40-40 40L0 40 40 0zm0 10L10 40l30 30 30-30-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Compact Search Form */}
        <form onSubmit={handleSubmit} className="relative z-10 mx-auto max-w-2xl">
          <div
            className={cn(
              "relative flex items-center rounded-full bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-lg",
              isFocused && "ring-4 ring-gold/30",
              isListening && "ring-4 ring-red-500/30"
            )}
          >
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={language === "bn" ? "আবার অনুসন্ধান করুন..." : "Search again..."}
              className={cn(
                "min-w-0 flex-1 bg-transparent pl-10 pr-2 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none",
                "placeholder:text-muted-foreground font-bengali placeholder:font-bengali"
              )}
              disabled={isLoading}
            />
            
            <div className="flex items-center gap-1 pr-1.5 shrink-0">
              {(query || hasResults) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    onClear?.();
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              <button
                type="button"
                onClick={toggleVoiceSearch}
                disabled={isLoading}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full transition-all shrink-0",
                  isListening 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all shrink-0",
                  isLoading || !query.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 hover:shadow-lg active:scale-95"
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
  }

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-primary to-emerald-700 p-5 sm:p-8 lg:p-12">
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0l40 40-40 40L0 40 40 0zm0 10L10 40l30 30 30-30-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            <div className="absolute -right-1 -top-1 h-3 w-3 sm:h-4 sm:w-4 animate-pulse rounded-full bg-white shadow-lg" />
          </div>
        </div>

        {/* Title */}
        <h1 className={cn(
          "mb-2 sm:mb-3 text-center text-scale-2xl font-bold text-white",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
        </h1>
        <p className={cn(
          "mb-5 sm:mb-8 text-center text-scale-sm text-white/80 max-w-xl mx-auto px-2",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn"
            ? "বাংলা বা ইংরেজিতে অনুসন্ধান করুন। এআই এর মাধ্যমে জানুন সঠিক তথ্য।"
            : "Search in Bengali or English. Get accurate information through AI."}
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div
            className={cn(
              "relative flex items-center rounded-full bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-lg",
              isFocused && "ring-4 ring-gold/30",
              isListening && "ring-4 ring-red-500/30"
            )}
          >
            <Search className="absolute left-4 sm:left-5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={language === "bn" ? "উদাহরণ: নামাজ সম্পর্কে কুরআন কি বলে?" : "Example: What does Quran say about prayer?"}
              className={cn(
                "min-w-0 flex-1 bg-transparent pl-11 sm:pl-14 pr-2 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base text-foreground focus:outline-none",
                "placeholder:text-muted-foreground font-bengali placeholder:font-bengali"
              )}
              disabled={isLoading}
            />
            
            <div className="flex items-center gap-1 sm:gap-1.5 pr-1.5 sm:pr-2 shrink-0">
              {/* Clear button */}
              {(query || hasResults) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    onClear?.();
                  }}
                  className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              <button
                type="button"
                onClick={toggleVoiceSearch}
                disabled={isLoading}
                className={cn(
                  "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all shrink-0",
                  isListening 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className={cn(
                  "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all shrink-0",
                  isLoading || !query.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 hover:shadow-lg active:scale-95"
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
    </div>
  );
};
