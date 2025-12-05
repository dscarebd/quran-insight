import { Settings, Menu } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
      </div>
      
      <LanguageToggle language={language} onToggle={onLanguageChange} />
      
      <div className="flex items-center gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
