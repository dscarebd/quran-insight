import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {/* Hide sidebar trigger on mobile */}
        <SidebarTrigger className="hidden md:flex h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
      </div>
      
      {/* Show language toggle only on desktop */}
      <div className="hidden md:block">
        <LanguageToggle language={language} onToggle={onLanguageChange} />
      </div>
      
      {/* Mobile: Show app title */}
      <h1 className="md:hidden text-lg font-semibold text-primary">AI Tafsir</h1>
      
      {/* Settings button - hidden on mobile (use bottom nav instead) */}
      <div className="hidden md:flex items-center gap-2">
        <button 
          onClick={() => navigate("/settings")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
      
      {/* Empty div on mobile for flex spacing */}
      <div className="md:hidden w-9" />
    </header>
  );
};
