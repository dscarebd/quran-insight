import { useState, useEffect, useMemo } from "react";
import { Copy, Check, HandHeart, ChevronRight, ArrowLeft, Search, X, Bookmark, BookmarkCheck, Heart } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { dailyDuaCategories, DailyDuaCategory, DailyDua } from "@/data/dailyDuas";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useLocalDuaBookmarks } from "@/hooks/useLocalDuaBookmarks";
import * as LucideIcons from "lucide-react";

interface DailyDuaPageProps {
  language: Language;
  arabicFont?: "amiri" | "uthmani";
}

// Dynamic icon component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) {
    return <LucideIcons.HandHelping className={className} />;
  }
  return <IconComponent className={className} />;
};

const DailyDuaPage = ({ language, arabicFont = "amiri" }: DailyDuaPageProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DailyDuaCategory | null>(null);
  const [selectedDua, setSelectedDua] = useState<DailyDua | null>(null);
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<DailyDuaCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { bookmarks, isBookmarked, toggleBookmark } = useLocalDuaBookmarks();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = async (dua: DailyDua) => {
    const translitText = language === "bn" ? dua.transliterationBn : dua.transliteration;
    const refText = language === "bn" ? dua.referenceBn : dua.referenceEn;
    const textToCopy = `${dua.arabic}\n\n${translitText ? translitText + "\n\n" : ""}${language === "bn" ? dua.bengali : dua.english}${refText ? `\n\n(${refText})` : ""}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(dua.id);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  const getCategoryName = (category: DailyDuaCategory) => {
    return language === "bn" ? category.nameBengali : category.nameEnglish;
  };

  const getDuaTitle = (dua: DailyDua) => {
    return language === "bn" ? dua.titleBn : dua.titleEn;
  };

  const getDuaTranslation = (dua: DailyDua) => {
    return language === "bn" ? dua.bengali : dua.english;
  };

  const getDuaTransliteration = (dua: DailyDua) => {
    return language === "bn" ? dua.transliterationBn : dua.transliteration;
  };

  const getDuaReference = (dua: DailyDua) => {
    return language === "bn" ? dua.referenceBn : dua.referenceEn;
  };

  // Count total duas
  const totalDuas = dailyDuaCategories.reduce((sum, cat) => sum + cat.duas.length, 0);

  // Get bookmarked duas with their categories
  const bookmarkedDuas = useMemo(() => {
    const results: { dua: DailyDua; category: DailyDuaCategory }[] = [];
    
    bookmarks.forEach(bookmark => {
      dailyDuaCategories.forEach(category => {
        const dua = category.duas.find(d => d.id === bookmark.dua_id);
        if (dua) {
          results.push({ dua, category });
        }
      });
    });
    
    return results;
  }, [bookmarks]);

  // Search results - flatten all duas and filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const results: { dua: DailyDua; category: DailyDuaCategory }[] = [];
    
    dailyDuaCategories.forEach(category => {
      category.duas.forEach(dua => {
        const matchesTitle = dua.titleBn.toLowerCase().includes(query) || 
                            dua.titleEn.toLowerCase().includes(query);
        const matchesArabic = dua.arabic.includes(query);
        const matchesTranslation = dua.bengali.toLowerCase().includes(query) || 
                                   dua.english.toLowerCase().includes(query);
        const matchesCategory = category.nameBengali.toLowerCase().includes(query) || 
                               category.nameEnglish.toLowerCase().includes(query);
        
        if (matchesTitle || matchesArabic || matchesTranslation || matchesCategory) {
          results.push({ dua, category });
        }
      });
    });
    
    return results;
  }, [searchQuery]);

  const handleDuaSelect = (dua: DailyDua, category: DailyDuaCategory) => {
    setSelectedDua(dua);
    setSelectedDuaCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shrink-0">
              <HandHeart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex-1">
              <h1 className={cn(
                "text-xl font-bold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "দৈনিক দোয়া" : "Daily Duas"}
              </h1>
              <p className={cn(
                "text-sm text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" 
                  ? `${dailyDuaCategories.length}টি বিভাগ • ${totalDuas}টি দোয়া` 
                  : `${dailyDuaCategories.length} categories • ${totalDuas} duas`}
              </p>
            </div>
            <button
              onClick={() => {
                setShowFavorites(!showFavorites);
                setIsSearching(false);
                setSearchQuery("");
              }}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                showFavorites 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Heart className={cn("h-5 w-5", showFavorites && "fill-current")} />
            </button>
            <button
              onClick={() => {
                setIsSearching(!isSearching);
                setShowFavorites(false);
              }}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                isSearching 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              {isSearching ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Search Input */}
          {isSearching && (
            <div className="mt-3 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={language === "bn" ? "দোয়া খুঁজুন..." : "Search duas..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn("pl-10 pr-10", language === "bn" && "font-bengali")}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Favorites Section */}
      {showFavorites && !searchQuery.trim() && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <p className={cn(
            "text-sm text-muted-foreground mb-3",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? `${formatNumber(bookmarkedDuas.length, language)}টি প্রিয় দোয়া` 
              : `${bookmarkedDuas.length} favorite dua${bookmarkedDuas.length !== 1 ? 's' : ''}`}
          </p>
          
          {bookmarkedDuas.length > 0 ? (
            <div className="space-y-2">
              {bookmarkedDuas.map(({ dua, category }) => (
                <button
                  key={dua.id}
                  onClick={() => handleDuaSelect(dua, category)}
                  className="flex items-center gap-3 w-full p-3 rounded-xl border border-border bg-card transition-colors hover:bg-accent text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <DynamicIcon name={category.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium text-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {getDuaTitle(dua)}
                    </p>
                    <p className={cn(
                      "text-xs text-muted-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {getCategoryName(category)}
                    </p>
                  </div>
                  <Heart className="h-5 w-5 text-primary fill-primary shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className={cn(
                "text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "এখনো কোনো প্রিয় দোয়া নেই" : "No favorite duas yet"}
              </p>
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "দোয়া দেখে হার্ট আইকনে ক্লিক করুন" : "Tap the heart icon on any dua to save it"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <p className={cn(
            "text-sm text-muted-foreground mb-3",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? `${formatNumber(searchResults.length, language)}টি ফলাফল পাওয়া গেছে` 
              : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found`}
          </p>
          
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map(({ dua, category }) => (
                <button
                  key={dua.id}
                  onClick={() => handleDuaSelect(dua, category)}
                  className="flex items-center gap-3 w-full p-3 rounded-xl border border-border bg-card transition-colors hover:bg-accent text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <DynamicIcon name={category.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium text-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {getDuaTitle(dua)}
                    </p>
                    <p className={cn(
                      "text-xs text-muted-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {getCategoryName(category)}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className={cn(
                "text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "কোনো দোয়া পাওয়া যায়নি" : "No duas found"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Categories Grid - Hidden when searching or showing favorites */}
      {!searchQuery.trim() && !showFavorites && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {dailyDuaCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
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
                    {getCategoryName(category)}
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
      )}

      {/* Category Sheet */}
      <Sheet open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border pr-12">
            <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
              {selectedCategory ? getCategoryName(selectedCategory) : ""}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(85vh-70px)]">
            <div className="py-2">
              {selectedCategory?.duas.map((dua, index) => (
                <button
                  key={dua.id}
                  onClick={() => handleDuaSelect(dua, selectedCategory)}
                  className="flex items-center gap-3 w-full px-4 py-4 transition-colors hover:bg-muted border-b border-border/50 last:border-b-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary font-bengali">
                    {formatNumber(index + 1, language)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={cn(
                      "text-sm font-medium text-foreground mb-1",
                      language === "bn" && "font-bengali"
                    )}>
                      {getDuaTitle(dua)}
                    </p>
                    <p className={cn("text-base text-foreground line-clamp-1 text-right", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")} dir="rtl">
                      {dua.arabic.length > 50 ? `${dua.arabic.substring(0, 50)}...` : dua.arabic}
                    </p>
                  </div>
                  {isBookmarked(selectedCategory.id, dua.id) && (
                    <Heart className="h-4 w-4 text-primary fill-primary shrink-0" />
                  )}
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Dua Detail Sheet */}
      <Sheet open={!!selectedDua} onOpenChange={(open) => !open && setSelectedDua(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-3 border-b border-border pr-12">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
                  {selectedDua ? getDuaTitle(selectedDua) : ""}
                </SheetTitle>
              </div>
              {selectedDua && selectedDuaCategory && (
                <button
                  onClick={() => toggleBookmark(selectedDuaCategory.id, selectedDua.id)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                    isBookmarked(selectedDuaCategory.id, selectedDua.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isBookmarked(selectedDuaCategory.id, selectedDua.id) && "fill-current")} />
                </button>
              )}
              {selectedDua && (
                <button
                  onClick={() => handleCopy(selectedDua)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  {copiedId === selectedDua.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(90vh-70px)]">
            <div className="p-4 space-y-6">
              {/* Arabic */}
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                <p className={cn("text-2xl leading-loose text-foreground text-center", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")} dir="rtl">
                  {selectedDua?.arabic}
                </p>
              </div>

              {/* Transliteration */}
              {selectedDua && getDuaTransliteration(selectedDua) && (
                <div className="space-y-2">
                  <h3 className={cn(
                    "text-sm font-medium text-muted-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "উচ্চারণ" : "Transliteration"}
                  </h3>
                  <p className={cn(
                    "text-foreground",
                    language === "bn" ? "font-bengali" : "italic"
                  )}>
                    {getDuaTransliteration(selectedDua)}
                  </p>
                </div>
              )}

              {/* Translation */}
              <div className="space-y-2">
                <h3 className={cn(
                  "text-sm font-medium text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? "বাংলা অনুবাদ" : "English Translation"}
                </h3>
                <p className={cn(
                  "text-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {selectedDua ? getDuaTranslation(selectedDua) : ""}
                </p>
              </div>

              {/* Reference */}
              {selectedDua && getDuaReference(selectedDua) && (
                <div className="flex justify-center">
                  <span className={cn(
                    "text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "সূত্র: " : "Reference: "}{getDuaReference(selectedDua)}
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DailyDuaPage;
