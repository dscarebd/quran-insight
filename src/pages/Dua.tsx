import { useState } from "react";
import { ArrowLeft, ChevronRight, Search, Heart, Copy, Check, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn, formatNumber } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { duaCategories, DuaCategory, Dua as DuaType } from "@/data/duas";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalDuaBookmarks } from "@/hooks/useLocalDuaBookmarks";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";

interface DuaProps {
  language: "bn" | "en";
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

const Dua = ({ language, arabicFont = "amiri" }: DuaProps) => {
  const navigate = useNavigate();
  const { bookmarks, isBookmarked, toggleBookmark, loading: bookmarksLoading } = useLocalDuaBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | null>(null);
  const [selectedDua, setSelectedDua] = useState<DuaType | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check if a dua matches the search query
  const duaMatchesSearch = (dua: DuaType, query: string): boolean => {
    const lowerQuery = query.toLowerCase();
    return (
      // Search in titles
      (dua.titleBengali?.includes(query) || false) ||
      (dua.titleEnglish?.toLowerCase().includes(lowerQuery) || false) ||
      // Search in Arabic text
      dua.arabic.includes(query) ||
      // Search in translations
      dua.bengali.includes(query) ||
      dua.english.toLowerCase().includes(lowerQuery) ||
      // Search in transliterations
      (dua.transliteration?.toLowerCase().includes(lowerQuery) || false) ||
      (dua.transliterationBengali?.includes(query) || false) ||
      // Search in reference
      (dua.reference?.includes(query) || false)
    );
  };

  // Get search results - matching duas from all categories
  const searchResults = searchQuery.trim() ? duaCategories.flatMap(category => 
    category.duas
      .filter(dua => duaMatchesSearch(dua, searchQuery.trim()))
      .map(dua => ({ dua, category }))
  ).slice(0, 50) : []; // Limit to 50 results for performance

  // Filter categories based on search (for category grid view when no specific dua matches)
  const filteredCategories = duaCategories.filter(category => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    // Show category if name matches OR if any dua in it matches
    return (
      category.nameEnglish.toLowerCase().includes(query) ||
      category.nameBengali.includes(query) ||
      category.duas.some(dua => duaMatchesSearch(dua, searchQuery.trim()))
    );
  });

  // Determine if we should show search results or categories
  const showSearchResults = searchQuery.trim().length >= 2 && searchResults.length > 0;

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

  const handleCopyDua = async (dua: DuaType) => {
    const textToCopy = `${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n(${dua.reference})` : ""}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(dua.id);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  const handleShareDua = async (dua: DuaType) => {
    const shareText = `${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n📖 ${dua.reference}` : ""}`;
    const shareTitle = language === "bn" ? (dua.titleBengali || "দোয়া") : (dua.titleEnglish || "Dua");
    
    // Check if Web Share API is supported and available
    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
        return; // Success - exit early
      } catch (error) {
        // User cancelled or share failed - continue to fallback for non-cancel errors
        if ((error as Error).name === "AbortError") {
          return; // User cancelled, no need for fallback
        }
      }
    }
    
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success(language === "bn" ? "কপি করা হয়েছে - এখন পেস্ট করে শেয়ার করুন" : "Copied! You can now paste and share");
    } catch (error) {
      // Final fallback using textarea
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success(language === "bn" ? "কপি করা হয়েছে - এখন পেস্ট করে শেয়ার করুন" : "Copied! You can now paste and share");
      } catch {
        toast.error(language === "bn" ? "শেয়ার করতে ব্যর্থ" : "Failed to share");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleWhatsAppShare = (dua: DuaType) => {
    const shareText = `*${language === "bn" ? (dua.titleBengali || "দোয়া") : (dua.titleEnglish || "Dua")}*\n\n${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n📖 ${dua.reference}` : ""}`;
    const encodedText = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleFacebookShare = (dua: DuaType) => {
    const shareText = `${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n📖 ${dua.reference}` : ""}`;
    const encodedText = encodeURIComponent(shareText);
    // Facebook doesn't support pre-filled text for privacy, so we'll copy to clipboard and open share dialog
    navigator.clipboard.writeText(shareText).then(() => {
      toast.success(language === "bn" ? "কপি হয়েছে! ফেসবুকে পেস্ট করুন" : "Copied! Paste on Facebook");
      window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`, '_blank', 'width=600,height=400');
    });
  };

  const handleTelegramShare = (dua: DuaType) => {
    const shareText = `*${language === "bn" ? (dua.titleBengali || "দোয়া") : (dua.titleEnglish || "Dua")}*\n\n${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n📖 ${dua.reference}` : ""}`;
    const encodedText = encodeURIComponent(shareText);
    window.open(`https://t.me/share/url?text=${encodedText}`, '_blank');
  };

  const handleTwitterShare = (dua: DuaType) => {
    const shareText = `${dua.arabic}\n\n${language === "bn" ? dua.bengali : dua.english}${dua.reference ? `\n\n📖 ${dua.reference}` : ""}`;
    const encodedText = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank', 'width=600,height=400');
  };

  const handleMessengerShare = (dua: DuaType) => {
    const shareText = `${dua.arabic}\n\n${dua.bengali}\n\n${dua.english}${dua.reference ? `\n\n📖 ${dua.reference}` : ""}`;
    navigator.clipboard.writeText(shareText).then(() => {
      toast.success(language === "bn" ? "কপি হয়েছে! মেসেঞ্জারে পেস্ট করুন" : "Copied! Paste on Messenger");
      window.open(`https://www.messenger.com/`, '_blank');
    });
  };

  return (
    <>
      <div className="min-h-screen bg-background">

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

            {/* Search Results */}
            {showSearchResults ? (
              <div className="p-4 pb-4">
                <p className={cn("text-sm text-muted-foreground mb-3", language === "bn" && "font-bengali")}>
                  {language === "bn" 
                    ? `${formatNumber(searchResults.length, language)}টি দোয়া পাওয়া গেছে` 
                    : `Found ${searchResults.length} duas`}
                </p>
                <div className="space-y-3">
                  {searchResults.map(({ dua, category }) => (
                    <button
                      key={`${category.id}-${dua.id}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedDua(dua);
                      }}
                      className="flex items-start gap-3 w-full p-4 rounded-xl border border-border bg-card transition-all hover:bg-accent text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <DynamicIcon name={category.icon} className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Dua Title */}
                        {(dua.titleBengali || dua.titleEnglish) && (
                          <p className={cn(
                            "text-sm font-medium text-foreground mb-1",
                            language === "bn" && "font-bengali"
                          )}>
                            {language === "bn" ? dua.titleBengali : dua.titleEnglish}
                          </p>
                        )}
                        <p className={cn("text-base text-foreground line-clamp-1 text-right", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")} dir="rtl">
                          {dua.arabic.length > 50 ? `${dua.arabic.substring(0, 50)}...` : dua.arabic}
                        </p>
                        <p className={cn(
                          "text-xs text-muted-foreground mt-1",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === "bn" ? category.nameBengali : category.nameEnglish}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleFavoriteClick(e, category.id, dua.id)}
                        className="shrink-0 p-2 rounded-full hover:bg-accent"
                      >
                        <Heart 
                          className={cn(
                            "h-5 w-5 transition-colors",
                            isBookmarked(category.id, dua.id) 
                              ? "text-red-500 fill-red-500" 
                              : "text-muted-foreground"
                          )} 
                        />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            ) : searchQuery.trim().length >= 2 && searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "কোন দোয়া পাওয়া যায়নি" : "No duas found"}
                </p>
                <p className={cn("text-sm text-muted-foreground/70 mt-1", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "অন্য শব্দ দিয়ে খুঁজুন" : "Try a different search term"}
                </p>
              </div>
            ) : (
              /* Categories Grid */
              <div className="p-4 pb-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="p-4 pb-4">
              {favoriteDuas.length === 0 ? (
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
                        <p className={cn("text-base text-foreground line-clamp-2 text-right", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")} dir="rtl">
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
                    {/* Dua Title */}
                    {(dua.titleBengali || dua.titleEnglish) && (
                      <p className={cn(
                        "text-sm font-medium text-foreground mb-1",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? dua.titleBengali : dua.titleEnglish}
                      </p>
                    )}
                    <p className={cn("text-base text-foreground line-clamp-1 text-right", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")} dir="rtl">
                      {dua.arabic.length > 50 ? `${dua.arabic.substring(0, 50)}...` : dua.arabic}
                    </p>
                    <p className={cn(
                      "text-xs text-muted-foreground mt-1 line-clamp-1",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" 
                        ? (dua.bengali.length > 40 ? `${dua.bengali.substring(0, 40)}...` : dua.bengali)
                        : (dua.english.length > 40 ? `${dua.english.substring(0, 40)}...` : dua.english)
                      }
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
            <div className="flex items-center justify-center gap-2">
              <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
                {selectedDua?.titleBengali || selectedDua?.titleEnglish 
                  ? (language === "bn" ? selectedDua?.titleBengali : selectedDua?.titleEnglish)
                  : (language === "bn" ? "দোয়া" : "Dua")
                }
              </SheetTitle>
              {selectedDua && selectedCategory && (
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
                <p className={cn("text-2xl leading-loose text-foreground text-center", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")} dir="rtl">
                  {selectedDua?.arabic}
                </p>
              </div>

              {/* Transliteration */}
              {(selectedDua?.transliteration || selectedDua?.transliterationBengali) && (
                <div className="space-y-2">
                  <h3 className={cn(
                    "text-sm font-medium text-muted-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "উচ্চারণ" : "Transliteration"}
                  </h3>
                  <p className={cn(
                    "text-base leading-relaxed text-foreground",
                    language === "bn" ? "font-bengali" : "italic"
                  )}>
                    {language === "bn" 
                      ? (selectedDua.transliterationBengali || selectedDua.transliteration)
                      : selectedDua.transliteration}
                  </p>
                </div>
              )}

              {/* Translation - Show only the selected language */}
              <div className="space-y-2">
                <h3 className={cn(
                  "text-sm font-medium text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? "বাংলা অনুবাদ" : "English Translation"}
                </h3>
                <p className={cn(
                  "text-base leading-relaxed text-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? selectedDua?.bengali : selectedDua?.english}
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

              {/* Action Buttons at Bottom */}
              {selectedDua && (
                <div className="space-y-3">
                  {/* Share Buttons Row - Icons Only */}
                  <div className="flex gap-3 justify-center">
                    {/* WhatsApp */}
                    <button
                      onClick={() => handleWhatsAppShare(selectedDua)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors"
                      title="WhatsApp"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>

                    {/* Messenger */}
                    <button
                      onClick={() => handleMessengerShare(selectedDua)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00B2FF] via-[#006AFF] to-[#A855F7] text-white hover:opacity-90 transition-opacity"
                      title="Messenger"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                      </svg>
                    </button>

                    {/* Facebook */}
                    <button
                      onClick={() => handleFacebookShare(selectedDua)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors"
                      title="Facebook"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>

                    {/* Telegram */}
                    <button
                      onClick={() => handleTelegramShare(selectedDua)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088CC] text-white hover:bg-[#0077B5] transition-colors"
                      title="Telegram"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </button>

                    {/* Twitter/X */}
                    <button
                      onClick={() => handleTwitterShare(selectedDua)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                      title="X (Twitter)"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                  </div>

                  {/* General Share Button */}
                  <button
                    onClick={() => handleShareDua(selectedDua)}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                      language === "bn" && "font-bengali"
                    )}
                  >
                    <Share2 className="h-5 w-5" />
                    <span>{language === "bn" ? "অন্যান্য অ্যাপে শেয়ার" : "Share to Other Apps"}</span>
                  </button>
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
