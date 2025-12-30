import { useState, useEffect } from "react";
import { Copy, Check, HandHeart, ChevronRight, ArrowLeft } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { dailyDuaCategories, DailyDuaCategory, DailyDua } from "@/data/dailyDuas";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shrink-0">
              <HandHeart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
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
          </div>
        </div>
      </div>

      {/* Categories Grid */}
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
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

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
                  onClick={() => setSelectedDua(dua)}
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
