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
  const { bookmarks, isBookmarked, toggleBookmark, loading: bookmarksLoading } = useLocalDuaBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | null>(null);
  const [selectedDua, setSelectedDua] = useState<DuaType | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
                    {/* Dua Title */}
                    {(dua.titleBengali || dua.titleEnglish) && (
                      <p className={cn(
                        "text-sm font-medium text-foreground mb-1",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? dua.titleBengali : dua.titleEnglish}
                      </p>
                    )}
                    <p className="font-arabic text-base text-foreground line-clamp-1 text-right" dir="rtl">
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

              {/* Action Buttons at Bottom */}
              {selectedDua && (
                <div className="space-y-3">
                  {/* Share Buttons Row */}
                  <div className="flex gap-2">
                    {/* WhatsApp Share */}
                    <button
                      onClick={() => handleWhatsAppShare(selectedDua)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors",
                        "bg-[#25D366] text-white hover:bg-[#20BD5A]",
                        language === "bn" && "font-bengali"
                      )}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>{language === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp"}</span>
                    </button>

                    {/* Facebook Share */}
                    <button
                      onClick={() => handleFacebookShare(selectedDua)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors",
                        "bg-[#1877F2] text-white hover:bg-[#166FE5]",
                        language === "bn" && "font-bengali"
                      )}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>{language === "bn" ? "ফেসবুক" : "Facebook"}</span>
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
