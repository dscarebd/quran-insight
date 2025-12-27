import { useNavigate, useLocation } from "react-router-dom";
import { Book, BookOpen, HandHeart, Bookmark, Settings, BookText } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import appLogo from "@/assets/app-logo.png";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";

interface DesktopHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const DesktopHeader = ({ language, onLanguageChange }: DesktopHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      path: "/", 
      labelEn: "Home", 
      labelBn: "হোম",
      icon: BookOpen,
      action: () => navigate("/"),
    },
    { 
      path: "/surah", 
      labelEn: "Quran", 
      labelBn: "কুরআন",
      icon: Book,
      matchPattern: /^\/surah|^\/para/,
      action: () => navigate("/surah"),
    },
    { 
      path: "/read", 
      labelEn: "Read", 
      labelBn: "পড়ুন",
      icon: BookText,
      matchPattern: /^\/read/,
      action: () => navigate("/read"),
    },
    { 
      path: "/dua", 
      labelEn: "Dua", 
      labelBn: "দোয়া",
      icon: HandHeart,
      action: () => navigate("/dua"),
    },
    { 
      path: "/bookmarks", 
      labelEn: "Bookmarks", 
      labelBn: "বুকমার্ক",
      icon: Bookmark,
      action: () => navigate("/bookmarks"),
    },
    { 
      path: "/settings", 
      labelEn: "Settings", 
      labelBn: "সেটিংস",
      icon: Settings,
      action: () => navigate("/settings"),
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.matchPattern) {
      return item.matchPattern.test(location.pathname);
    }
    return location.pathname === item.path;
  };

  return (
    <header className="sticky top-0 z-50 hidden lg:block border-b border-border bg-card/98 backdrop-blur-md">
      {/* Ornamental border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <img 
                src={appLogo} 
                alt="Quran Insight" 
                className="h-10 w-10 rounded-xl shadow-md transition-transform group-hover:scale-105" 
              />
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="flex flex-col items-start">
              <span className={cn(
                "text-xl font-bold text-primary tracking-tight",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
              </span>
              <span className={cn(
                "text-[10px] text-muted-foreground font-medium tracking-widest",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "সহজে কুরআন শিখুন" : "For Learning Quran Easily"}
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <button
                  key={item.path}
                  onClick={item.action}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? item.labelBn : item.labelEn}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary via-primary to-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center gap-4">
            <LanguageToggle language={language} onToggle={onLanguageChange} />
          </div>
        </div>
      </div>
      
      {/* Bottom ornamental line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  );
};
