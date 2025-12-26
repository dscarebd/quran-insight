import { cn } from "@/lib/utils";
import { Language, languageNames } from "@/types/language";

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

const languages: Language[] = ["bn", "en", "hi"];

export const LanguageToggle = ({ language, onToggle }: LanguageToggleProps) => {
  return (
    <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onToggle(lang)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
            language === lang
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className={lang === "bn" ? "font-bengali" : lang === "hi" ? "font-hindi" : ""}>
            {languageNames[lang].native}
          </span>
        </button>
      ))}
    </div>
  );
};
