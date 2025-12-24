import { useState } from "react";
import { ArrowLeft, ChevronRight, Search, Heart, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn, formatNumber } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { duaCategories, DuaCategory, Dua as DuaType } from "@/data/duas";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDuaBookmarks } from "@/hooks/useDuaBookmarks";
import { useAuth } from "@/hooks/useAuth";
import * as LucideIcons from "lucide-react";

interface DuaProps {
  language: "bn" | "en";
}

// Dynamic icon component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) {
    return <LucideIcons.HandHelping className={className} />;
  }
  return <IconComponent className={className} />;
};

const Dua = ({ language }: DuaProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookmarks, isBookmarked, toggleBookmark, loading: bookmarksLoading } = useDuaBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | null>(null);
  const [selectedDua, setSelectedDua] = useState<DuaType | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  // Filter categories based on search
  const filteredCategories = duaCategories.filter(category => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      category.nameEnglish.toLowerCase().includes(query) ||
      category.nameBengali.includes(query)
    );
  });

  // Get favorite duas with their category info
  const favoriteDuas = bookmarks.map(bookmark => {
    const category = duaCategories.find(c => c.id === bookmark.category_id);
    const dua = category?.duas.find(d => d.id === bookmark.dua_id);
    return dua ? { dua, category, bookmark } : null;
  }).filter(Boolean) as { dua: DuaType; category: DuaCategory; bookmark: { category_id: string; dua_id: string } }[];

  const handleCategoryClick = (category: DuaCategory) => {
    setSelectedCategory(category);
  };

  const handleDuaClick = (dua: DuaType) => {
    setSelectedDua(dua);
  };

  const handleFavoriteClick = (e: React.MouseEvent, categoryId: string, duaId: string) => {
    e.stopPropagation();
    toggleBookmark(categoryId, duaId);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
            {language === "bn" ? "দোয়া সমূহ" : "Duas"}
          </h1>
        </header>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "favorites")} className="w-full">
          <div className="px-4 pt-3">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="all" className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" ? "সব দোয়া" : "All Duas"}
              </TabsTrigger>
              <TabsTrigger value="favorites" className={cn("gap-1.5", language === "bn" && "font-bengali")}>
                <Heart className="h-4 w-4" />
                {language === "bn" ? "পছন্দের" : "Favorites"}
                {bookmarks.length > 0 && (
                  <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                    {bookmarks.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            {/* Search */}
            <div className="px-4 py-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === "bn" ? "দোয়া খুঁজুন..." : "Search duas..."}
                  className={cn(
                    "pl-9",
                    language === "bn" && "font-bengali placeholder:font-bengali"
                  )}
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="p-4 pb-20 md:pb-4">
              <div className="grid grid-cols-2 gap-3">
                {filteredCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:bg-accent hover:border-primary/30 animate-fade-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <DynamicIcon name={category.icon} className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className={cn(
                        "text-sm font-medium line-clamp-2",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? category.nameBengali : category.nameEnglish}
                      </p>
                      <p className={cn(
                        "text-xs text-muted-foreground mt-0.5",
                        language === "bn" && "font-bengali"
                      )}>
                        {formatNumber(category.duas.length, language)} {language === "bn" ? "দোয়া" : "duas"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="p-4 pb-20 md:pb-4">
              {!user ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "পছন্দের দোয়া সংরক্ষণ করতে লগইন করুন" : "Login to save favorite duas"}
                  </p>
                  <button
                    onClick={() => navigate("/auth")}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                  >
                    {language === "bn" ? "লগইন" : "Login"}
                  </button>
                </div>
              ) : favoriteDuas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "কোন পছন্দের দোয়া নেই" : "No favorite duas yet"}
                  </p>
                  <p className={cn("text-sm text-muted-foreground/70 mt-1", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "দোয়ায় হার্ট আইকনে ট্যাপ করে সংরক্ষণ করুন" : "Tap the heart icon on a dua to save it"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteDuas.map(({ dua, category, bookmark }) => (
                    <button
                      key={`${bookmark.category_id}-${bookmark.dua_id}`}
                      onClick={() => handleDuaClick(dua)}
                      className="flex items-start gap-3 w-full p-4 rounded-xl border border-border bg-card transition-all hover:bg-accent text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <DynamicIcon name={category.icon} className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-arabic text-base text-foreground line-clamp-2 text-right" dir="rtl">
                          {dua.arabic.substring(0, 60)}...
                        </p>
                        <p className={cn(
                          "text-xs text-muted-foreground mt-1.5",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === "bn" ? category.nameBengali : category.nameEnglish}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleFavoriteClick(e, bookmark.category_id, bookmark.dua_id)}
                        className="shrink-0 p-1"
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Category Sheet */}
      <Sheet open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? selectedCategory?.nameBengali : selectedCategory?.nameEnglish}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(85vh-70px)]">
            <div className="py-2">
              {selectedCategory?.duas.map((dua, index) => (
                <button
                  key={dua.id}
                  onClick={() => handleDuaClick(dua)}
                  className="flex items-center gap-3 w-full px-4 py-4 transition-colors hover:bg-muted border-b border-border/50 last:border-b-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary font-bengali">
                    {formatNumber(index + 1, language)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-arabic text-base text-foreground line-clamp-2 text-right" dir="rtl">
                      {dua.arabic.substring(0, 60)}...
                    </p>
                    <p className={cn(
                      "text-xs text-muted-foreground mt-1 line-clamp-1",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? dua.bengali.substring(0, 50) : dua.english.substring(0, 50)}...
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleFavoriteClick(e, selectedCategory.id, dua.id)}
                    className="shrink-0 p-2 rounded-full hover:bg-accent"
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isBookmarked(selectedCategory.id, dua.id) 
                          ? "text-red-500 fill-red-500" 
                          : "text-muted-foreground"
                      )} 
                    />
                  </button>
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Dua Detail Sheet */}
      <Sheet open={!!selectedDua} onOpenChange={(open) => !open && setSelectedDua(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border">
            <div className="flex items-center justify-center gap-3">
              <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
                {language === "bn" ? "দোয়া" : "Dua"}
              </SheetTitle>
              {selectedCategory && selectedDua && (
                <button
                  onClick={(e) => handleFavoriteClick(e, selectedCategory.id, selectedDua.id)}
                  className="p-2 rounded-full hover:bg-accent"
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isBookmarked(selectedCategory.id, selectedDua.id) 
                        ? "text-red-500 fill-red-500" 
                        : "text-muted-foreground"
                    )} 
                  />
                </button>
              )}
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(90vh-70px)]">
            <div className="p-4 space-y-6">
              {/* Arabic */}
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                <p className="font-arabic text-2xl leading-loose text-foreground text-center" dir="rtl">
                  {selectedDua?.arabic}
                </p>
              </div>

              {/* Bengali Translation */}
              <div className="space-y-2">
                <h3 className={cn(
                  "text-sm font-medium text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? "বাংলা অনুবাদ" : "Bengali Translation"}
                </h3>
                <p className="font-bengali text-base leading-relaxed text-foreground">
                  {selectedDua?.bengali}
                </p>
              </div>

              {/* English Translation */}
              <div className="space-y-2">
                <h3 className={cn(
                  "text-sm font-medium text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? "ইংরেজি অনুবাদ" : "English Translation"}
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  {selectedDua?.english}
                </p>
              </div>

              {/* Reference */}
              {selectedDua?.reference && (
                <div className="flex items-center justify-center">
                  <span className={cn(
                    "text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "সূত্র: " : "Reference: "}{selectedDua.reference}
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <MobileNavFooter language={language} />
    </>
  );
};

export default Dua;
