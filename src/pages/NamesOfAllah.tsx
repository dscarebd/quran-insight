import { useState, useEffect } from "react";
import { Search, Star, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { allahNames, AllahName } from "@/data/allahNames";
import { Language } from "@/types/language";

interface NamesOfAllahProps {
  language: Language;
  arabicFont?: string;
}

const NamesOfAllah = ({ language, arabicFont = "amiri" }: NamesOfAllahProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredNames = allahNames.filter((name) => {
    const query = searchQuery.toLowerCase();
    return (
      name.arabic.includes(searchQuery) ||
      name.transliteration.toLowerCase().includes(query) ||
      name.transliterationBn.includes(searchQuery) ||
      name.meaningEn.toLowerCase().includes(query) ||
      name.meaningBn.includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shrink-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className={cn(
                "text-lg sm:text-xl font-semibold text-foreground truncate",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "আল্লাহর ৯৯ নাম" : "99 Names of Allah"}
              </h1>
              <p className={cn(
                "text-xs sm:text-sm text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "আসমাউল হুসনা" : "Asma ul Husna"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">{filteredNames.length}</span>
            </div>
          </div>

          {/* Search */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={language === "bn" ? "নাম খুঁজুন..." : "Search names..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-9 pr-9",
                language === "bn" && "font-bengali"
              )}
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
      </div>

      {/* Names Grid */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredNames.map((name) => (
            <button
              key={name.id}
              onClick={() => setSelectedName(name)}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-4 text-center transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:border-primary/30"
            >
              {/* Number badge */}
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{name.id}</span>
              </div>


              {/* Arabic Name */}
              <div className="text-scale-arabic-lg mb-2 mt-4 text-foreground font-arabic">
                {name.arabic}
              </div>

              {/* Transliteration */}
              <div className={cn(
                "text-sm font-medium text-muted-foreground mb-1",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? name.transliterationBn : name.transliteration}
              </div>

              {/* Meaning */}
              <div className={cn(
                "text-xs text-muted-foreground line-clamp-1",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? name.meaningBn : name.meaningEn}
              </div>
            </button>
          ))}
        </div>

        {filteredNames.length === 0 && (
          <div className="text-center py-12">
            <p className={cn(
              "text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}
            </p>
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedName} onOpenChange={(open) => !open && setSelectedName(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          {selectedName && (
            <>
              <SheetHeader className="text-center pb-4 border-b border-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    #{selectedName.id}
                  </span>
                </div>
                <SheetTitle className="text-scale-arabic-xl font-arabic">
                  {selectedName.arabic}
                </SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-6 overflow-y-auto">
                {/* Transliteration */}
                <div className="space-y-3">
                  <h3 className={cn(
                    "text-sm font-semibold text-muted-foreground uppercase tracking-wide",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "উচ্চারণ" : "Transliteration"}
                  </h3>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className={cn(
                      "text-lg font-medium",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? selectedName.transliterationBn : selectedName.transliteration}
                    </p>
                  </div>
                </div>

                {/* Meaning */}
                <div className="space-y-3">
                  <h3 className={cn(
                    "text-sm font-semibold text-muted-foreground uppercase tracking-wide",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "অর্থ" : "Meaning"}
                  </h3>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className={cn(
                      "text-xl font-medium text-primary",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? selectedName.meaningBn : selectedName.meaningEn}
                    </p>
                  </div>
                </div>

              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NamesOfAllah;
