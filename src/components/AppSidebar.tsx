import { useState } from "react";
import { Search, BookOpen, Bookmark, ChevronRight } from "lucide-react";
import { surahs } from "@/data/surahs";
import { cn } from "@/lib/utils";
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
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const filteredSurahs = surahs.filter((surah) => {
    const query = searchQuery.toLowerCase();
    return (
      surah.nameEnglish.toLowerCase().includes(query) ||
      surah.nameBengali.includes(query) ||
      surah.nameArabic.includes(query) ||
      surah.number.toString().includes(query)
    );
  });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-0">
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-sidebar-border px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-primary">AI Tafsir</span>
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
              {language === "bn" ? "এআই অনুসন্ধান" : "AI Search"}
            </button>
            <button
              onClick={() => onTabChange("bookmarks")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeTab === "bookmarks"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Bookmark className="h-4 w-4" />
              {language === "bn" ? "বুকমার্ক" : "Bookmarks"}
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
              title={language === "bn" ? "এআই অনুসন্ধান" : "AI Search"}
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => onTabChange("bookmarks")}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                activeTab === "bookmarks"
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
                    {language === "bn" ? "সূরা" : "Surah"}
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
                    {language === "bn" ? "পারা" : "Para"}
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
                      placeholder={language === "bn" ? "খুঁজ হচ্ছে..." : "Search..."}
                      className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Surah List */}
            <SidebarGroupContent className={cn(!isCollapsed && "px-2 pb-4")}>
              <SidebarMenu>
                {filteredSurahs.map((surah) => (
                  <SidebarMenuItem key={surah.number}>
                    <SidebarMenuButton
                      onClick={() => setSelectedSurah(surah.number)}
                      isActive={selectedSurah === surah.number}
                      tooltip={`${surah.number}. ${surah.nameEnglish}`}
                      className="group h-auto py-2"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
                        {surah.number}
                      </div>
                      {!isCollapsed && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium truncate">
                                {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                              </span>
                              <span className="font-arabic text-sm text-muted-foreground shrink-0">
                                {surah.nameArabic}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {activeTab === "bookmarks" && !isCollapsed && (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <Bookmark className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {language === "bn"
                ? "এখনও কোনো বুকমার্ক নেই"
                : "No bookmarks yet"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
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
