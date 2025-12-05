import { useState } from "react";
import { Search, BookOpen, Bookmark, ChevronRight } from "lucide-react";
import { surahs } from "@/data/surahs";
import { cn } from "@/lib/utils";

interface SidebarProps {
  language: "bn" | "en";
  activeTab: "search" | "bookmarks";
  onTabChange: (tab: "search" | "bookmarks") => void;
}

type ViewMode = "surah" | "para";

export const Sidebar = ({ language, activeTab, onTabChange }: SidebarProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("surah");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

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
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BookOpen className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold text-primary">AI Tafsir</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 border-b border-border p-2">
        <button
          onClick={() => onTabChange("search")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "search"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Bookmark className="h-4 w-4" />
          {language === "bn" ? "বুকমার্ক" : "Bookmarks"}
        </button>
      </div>

      {activeTab === "search" && (
        <>
          {/* View Mode Toggle */}
          <div className="flex border-b border-border">
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

          {/* Surah List */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {filteredSurahs.map((surah) => (
              <div
                key={surah.number}
                onClick={() => setSelectedSurah(surah.number)}
                className={cn(
                  "surah-item group",
                  selectedSurah === surah.number && "active"
                )}
              >
                <div className="surah-number">{surah.number}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">
                      {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                    </span>
                    <span className="font-arabic text-sm text-muted-foreground">
                      {surah.nameArabic}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "bookmarks" && (
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
    </aside>
  );
};
