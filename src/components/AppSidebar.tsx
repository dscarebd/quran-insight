import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bookmark, ChevronRight } from "lucide-react";
import { surahs } from "@/data/surahs";
import appLogo from "@/assets/app-logo.png";
import { paras } from "@/data/paras";
import { cn, formatNumber } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  language: "bn" | "en";
  activeTab: "search" | "bookmarks";
  onTabChange: (tab: "search" | "bookmarks") => void;
}

type ViewMode = "surah" | "para";

export const AppSidebar = ({ language, activeTab, onTabChange }: AppSidebarProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("surah");
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const surahRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});
  const paraRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});
  const hasScrolledRef = useRef(false);

  // Extract current surah/para number from URL
  const surahMatch = location.pathname.match(/\/surah\/(\d+)/);
  const paraMatch = location.pathname.match(/\/para\/(\d+)/);
  const currentSurahNumber = surahMatch ? parseInt(surahMatch[1], 10) : null;
  const currentParaNumber = paraMatch ? parseInt(paraMatch[1], 10) : null;

  // Scroll to active surah/para when component mounts or URL changes
  useEffect(() => {
    // Small delay to ensure refs are set
    const timer = setTimeout(() => {
      if (currentSurahNumber && surahRefs.current[currentSurahNumber]) {
        surahRefs.current[currentSurahNumber]?.scrollIntoView({
          block: "center",
          behavior: "auto"
        });
      } else if (currentParaNumber && paraRefs.current[currentParaNumber]) {
        paraRefs.current[currentParaNumber]?.scrollIntoView({
          block: "center",
          behavior: "auto"
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentSurahNumber, currentParaNumber]);

  const filteredSurahs = surahs.filter((surah) => {
    const query = searchQuery.toLowerCase();
    return (
      surah.nameEnglish.toLowerCase().includes(query) ||
      surah.nameBengali.includes(query) ||
      surah.nameArabic.includes(query) ||
      surah.number.toString().includes(query)
    );
  });

  const filteredParas = paras.filter((para) => {
    const query = searchQuery.toLowerCase();
    return (
      para.nameEnglish.toLowerCase().includes(query) ||
      para.nameBengali.includes(query) ||
      para.nameArabic.includes(query) ||
      para.number.toString().includes(query)
    );
  });

  const handleSurahClick = (surahNumber: number) => {
    navigate(`/surah/${surahNumber}`);
  };

  const handleParaClick = (paraNumber: number) => {
    navigate(`/para/${paraNumber}`);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-0">
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-sidebar-border px-3 py-3">
          <img src={appLogo} alt="Quran Insight" className="h-9 w-9 shrink-0 rounded-lg" />
          {!isCollapsed && (
            <span className="text-lg font-semibold text-primary">Quran Insight</span>
          )}
        </div>

        {/* Navigation Tabs */}
        {!isCollapsed && (
          <div className="flex gap-1 border-b border-sidebar-border p-2">
            <button
              onClick={() => onTabChange("search")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeTab === "search"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Search className="h-4 w-4" />
              <span className={language === "bn" ? "font-bengali" : ""}>{language === "bn" ? "অনুসন্ধান" : "Search"}</span>
            </button>
            <button
              onClick={() => navigate("/bookmarks")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === "/bookmarks"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Bookmark className="h-4 w-4" />
              <span className={language === "bn" ? "font-bengali" : ""}>{language === "bn" ? "বুকমার্ক" : "Bookmarks"}</span>
            </button>
          </div>
        )}

        {/* Collapsed state icons */}
        {isCollapsed && (
          <div className="flex flex-col gap-1 border-b border-sidebar-border p-2">
            <button
              onClick={() => onTabChange("search")}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                activeTab === "search"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={language === "bn" ? "অনুসন্ধান" : "Search"}
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/bookmarks")}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                location.pathname === "/bookmarks"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={language === "bn" ? "বুকমার্ক" : "Bookmarks"}
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {activeTab === "search" && (
          <SidebarGroup className="p-0">
            {/* View Mode Toggle */}
            {!isCollapsed && (
              <>
                <div className="flex border-b border-sidebar-border">
                  <button
                    onClick={() => setViewMode("surah")}
                    className={cn(
                      "flex-1 py-3 text-sm font-medium transition-colors",
                      viewMode === "surah"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    >
                      <span className={language === "bn" ? "font-bengali" : ""}>{language === "bn" ? "সূরা" : "Surah"}</span>
                    </button>
                  <button
                    onClick={() => setViewMode("para")}
                    className={cn(
                      "flex-1 py-3 text-sm font-medium transition-colors",
                      viewMode === "para"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    >
                      <span className={language === "bn" ? "font-bengali" : ""}>{language === "bn" ? "পারা" : "Para"}</span>
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === "bn" ? "খোঁজা হচ্ছে..." : "Search..."}
                      className={cn(
                        "w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        language === "bn" && "font-bengali placeholder:font-bengali"
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Surah/Para List */}
            <SidebarGroupContent className={cn(!isCollapsed && "px-2 pb-4")}>
              <SidebarMenu>
                {viewMode === "surah" ? (
                  filteredSurahs.map((surah) => (
                    <SidebarMenuItem 
                      key={surah.number}
                      ref={(el) => { surahRefs.current[surah.number] = el; }}
                    >
                      <SidebarMenuButton
                        onClick={() => handleSurahClick(surah.number)}
                        isActive={currentSurahNumber === surah.number}
                        tooltip={`${surah.number}. ${surah.nameEnglish}`}
                        className="group h-auto py-2"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground font-bengali">
                          {formatNumber(surah.number, language)}
                        </div>
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className={cn("font-medium truncate", language === "bn" && "font-bengali")}>
                                  {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                                </span>
                                <span className="font-arabic text-sm text-muted-foreground shrink-0">
                                  {surah.nameArabic}
                                </span>
                              </div>
                              <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                                {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                          </>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  filteredParas.map((para) => (
                    <SidebarMenuItem 
                      key={para.number}
                      ref={(el) => { paraRefs.current[para.number] = el; }}
                    >
                      <SidebarMenuButton
                        onClick={() => handleParaClick(para.number)}
                        isActive={currentParaNumber === para.number}
                        tooltip={`${para.number}. ${para.nameEnglish}`}
                        className="group h-auto py-2"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground font-bengali">
                          {formatNumber(para.number, language)}
                        </div>
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className={cn("font-medium truncate", language === "bn" && "font-bengali")}>
                                  {language === "bn" ? para.nameBengali : para.nameEnglish}
                                </span>
                                <span className="font-arabic text-sm text-muted-foreground shrink-0">
                                  {para.nameArabic}
                                </span>
                              </div>
                              <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                                {language === "bn" 
                                  ? `সূরা ${formatNumber(para.startSurah, language)}:${formatNumber(para.startVerse, language)} - ${formatNumber(para.endSurah, language)}:${formatNumber(para.endVerse, language)}`
                                  : `Surah ${para.startSurah}:${para.startVerse} - ${para.endSurah}:${para.endVerse}`}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                          </>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {activeTab === "bookmarks" && !isCollapsed && (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <Bookmark className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn"
                ? "এখনও কোনো বুকমার্ক নেই"
                : "No bookmarks yet"}
            </p>
            <p className={cn("mt-1 text-xs text-muted-foreground/70", language === "bn" && "font-bengali")}>
              {language === "bn"
                ? "আয়াত সংরক্ষণ করতে বুকমার্ক করুন"
                : "Bookmark verses to save them here"}
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
