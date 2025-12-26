import { useNavigate } from "react-router-dom";
import { Book, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { surahs } from "@/data/surahs";
import { cn, formatNumber } from "@/lib/utils";

interface SurahListProps {
  language: "bn" | "en";
}

const SurahList = ({ language }: SurahListProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = surahs.filter((surah) => {
    const query = searchQuery.toLowerCase();
    return (
      surah.nameEnglish.toLowerCase().includes(query) ||
      surah.nameBengali.includes(query) ||
      surah.nameArabic.includes(query) ||
      surah.number.toString().includes(query) ||
      surah.meaningEnglish.toLowerCase().includes(query) ||
      surah.meaningBengali.includes(query)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Book className="h-5 w-5" />
            </div>
            <h1 className={cn(
              "text-2xl lg:text-3xl font-bold text-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "সূরা সমূহ" : "All Surahs"}
            </h1>
          </div>
          <p className={cn(
            "text-muted-foreground ml-13",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? "পবিত্র কুরআনের ১১৪টি সূরা" 
              : "114 chapters of the Holy Quran"}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "bn" ? "সূরা খুঁজুন..." : "Search surah..."}
              className={cn(
                "w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                language === "bn" && "font-bengali placeholder:font-bengali"
              )}
            />
          </div>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-primary/30"
            >
              {/* Number badge */}
              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                {formatNumber(surah.number, language)}
              </div>

              {/* Arabic name */}
              <p className="font-arabic text-xl text-foreground mb-2 pr-10">
                {surah.nameArabic}
              </p>

              {/* Name */}
              <h3 className={cn(
                "font-semibold text-foreground mb-1",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? surah.nameBengali : surah.nameEnglish}
              </h3>

              {/* Meaning */}
              <p className={cn(
                "text-sm text-muted-foreground mb-3",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
              </p>

              {/* Meta info */}
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-xs text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" 
                    ? `${formatNumber(surah.totalVerses, language)} আয়াত` 
                    : `${surah.totalVerses} verses`}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {/* No results */}
        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className={cn(
              "text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "কোনো সূরা পাওয়া যায়নি" : "No surahs found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahList;
