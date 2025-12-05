import { Settings } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

interface HeaderProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 px-6 py-3 backdrop-blur-sm">
      <div className="w-24" /> {/* Spacer for centering */}
      
      <LanguageToggle language={language} onToggle={onLanguageChange} />
      
      <div className="flex w-24 justify-end">
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
