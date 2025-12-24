import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  language: "bn" | "en";
  onToggle: (lang: "bn" | "en") => void;
}

export const LanguageToggle = ({ language, onToggle }: LanguageToggleProps) => {
  return (
    <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
      <button
        onClick={() => onToggle("bn")}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          language === "bn"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="font-bengali">বাংলা</span>
        </button>
      <button
        onClick={() => onToggle("en")}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        English
      </button>
    </div>
  );
};
