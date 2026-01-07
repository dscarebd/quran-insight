import { Bookmark, ZoomIn, ZoomOut, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import appLogo from "@/assets/app-logo.png";
import { Language, t } from "@/types/language";
import { ArabicFontType } from "@/types/quranV1";
import { cn } from "@/lib/utils";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  // ReadPage controls (optional, only passed when on ReadPage)
  arabicFont?: ArabicFontType;
  onArabicFontChange?: (font: ArabicFontType) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  canZoomIn?: boolean;
  canZoomOut?: boolean;
}

export const Header = ({
  language,
  onLanguageChange,
  arabicFont,
  onArabicFontChange,
  onZoomIn,
  onZoomOut,
  canZoomIn = true,
  canZoomOut = true,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the ReadPage
  const isReadPage = location.pathname.startsWith("/read");

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/95 px-3 sm:px-4 py-3 backdrop-blur-md overflow-hidden max-w-full">
      {/* Desktop: Show sidebar trigger */}
      <div className="hidden lg:flex items-center gap-2 shrink-0">
        <SidebarTrigger className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
      </div>
      
      {/* Show language toggle only on desktop */}
      <div className="hidden lg:block shrink-0">
        <LanguageToggle language={language} onToggle={onLanguageChange} />
      </div>
      
      {/* Mobile/Tablet: Show logo and app title (logo on left) */}
      <div className="lg:hidden flex items-center gap-2 min-w-0 shrink">
        <img src={appLogo} alt="Quran Insight" className="h-8 w-8 rounded-lg shrink-0" />
        <h1 className={cn(
          "text-[22px] sm:text-2xl font-semibold text-primary truncate",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
        </h1>
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Tablet-only ReadPage controls (visible on sm-lg, hidden on mobile xs and desktop lg+) */}
        {isReadPage && onZoomIn && onZoomOut && onArabicFontChange && (
          <div className="hidden sm:flex lg:hidden items-center gap-1">
            {/* Zoom Controls */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomOut}
              disabled={!canZoomOut}
              className="h-8 w-8"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomIn}
              disabled={!canZoomIn}
              className="h-8 w-8"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {/* Font Switch */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden ml-1">
              <button
                onClick={() => onArabicFontChange("uthmani")}
                className={cn(
                  "px-2 py-1 text-xs transition-colors",
                  arabicFont === "uthmani" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                Uthmani
              </button>
              <button
                onClick={() => onArabicFontChange("amiri")}
                className={cn(
                  "px-2 py-1 text-xs transition-colors",
                  arabicFont === "amiri" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                Amiri
              </button>
            </div>
          </div>
        )}

        
        {/* Settings button (Mobile/Tablet) */}
        <button 
          onClick={() => navigate("/settings")}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
