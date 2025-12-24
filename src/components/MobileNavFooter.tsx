import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Layers, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavFooterProps {
  language: "bn" | "en";
}

export const MobileNavFooter = ({ language }: MobileNavFooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      labelEn: "Home",
      labelBn: "হোম",
      path: "/",
      isActive: location.pathname === "/",
    },
    {
      icon: BookOpen,
      labelEn: "Surahs",
      labelBn: "সূরা",
      path: "/surah/1",
      isActive: location.pathname.startsWith("/surah"),
    },
    {
      icon: Layers,
      labelEn: "Paras",
      labelBn: "পারা",
      path: "/para/1",
      isActive: location.pathname.startsWith("/para"),
    },
    {
      icon: Bookmark,
      labelEn: "Bookmarks",
      labelBn: "বুকমার্ক",
      path: "/bookmarks",
      isActive: location.pathname === "/bookmarks",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
              item.isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-transform",
                item.isActive && "scale-110"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                language === "bn" && "font-bengali"
              )}
            >
              {language === "bn" ? item.labelBn : item.labelEn}
            </span>
          </button>
        ))}
      </div>
      {/* Safe area padding for iOS devices */}
      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  );
};
