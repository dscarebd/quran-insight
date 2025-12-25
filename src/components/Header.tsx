import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import appLogo from "@/assets/app-logo.png";

interface HeaderProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 backdrop-blur-md">
      {/* Desktop: Show sidebar trigger */}
      <div className="hidden md:flex items-center gap-2">
        <SidebarTrigger className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
      </div>
      
      {/* Show language toggle only on desktop */}
      <div className="hidden md:block">
        <LanguageToggle language={language} onToggle={onLanguageChange} />
      </div>
      
      {/* Mobile: Show logo and app title (logo on left) */}
      <div className="md:hidden flex items-center gap-2">
        <img src={appLogo} alt="Quran Insight" className="h-8 w-8 rounded-lg" />
        <h1 className="text-xl font-semibold text-primary">Quran Insight</h1>
      </div>
      
      {/* Desktop: Settings button, Mobile: Bookmark button */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate("/bookmarks")}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
