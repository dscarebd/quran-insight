import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { paras } from "@/data/paras";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";

interface ParaListProps {
  language: Language;
}

const ParaList = ({ language }: ParaListProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParas = paras.filter((para) => {
    const query = searchQuery.toLowerCase();
    return (
      para.nameEnglish.toLowerCase().includes(query) ||
      para.nameBengali.includes(query) ||
      para.nameArabic.includes(query) ||
      para.number.toString().includes(query)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-8">
        {/* Header with Search */}
        <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <h1 className={cn(
                "text-2xl lg:text-3xl font-bold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "পারা সমূহ" : "All Paras"}
              </h1>
            </div>
            <p className={cn(
              "text-muted-foreground lg:ml-13",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" 
                ? "পবিত্র কুরআনের ৩০টি পারা (জুয)" 
                : "30 Juz (parts) of the Holy Quran"}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "bn" ? "পারা খুঁজুন..." : "Search para..."}
              className={cn(
                "w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                language === "bn" && "font-bengali placeholder:font-bengali"
              )}
            />
          </div>
        </div>

        {/* Para Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredParas.map((para) => (
            <button
              key={para.number}
              onClick={() => navigate(`/para/${para.number}`)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-blue-500/30"
            >
              {/* Number badge */}
              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-600">
                {formatNumber(para.number, language)}
              </div>

              {/* Arabic name */}
              <p className="font-arabic text-xl text-foreground mb-2 pr-10">
                {para.nameArabic}
              </p>

              {/* Name */}
              <h3 className={cn(
                "font-semibold text-foreground mb-1",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? para.nameBengali : para.nameEnglish}
              </h3>

              {/* Range info */}
              <p className={cn(
                "text-sm text-muted-foreground mb-3",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" 
                  ? `সূরা ${formatNumber(para.startSurah, language)}:${formatNumber(para.startVerse, language)} - ${formatNumber(para.endSurah, language)}:${formatNumber(para.endVerse, language)}`
                  : `Surah ${para.startSurah}:${para.startVerse} - ${para.endSurah}:${para.endVerse}`}
              </p>

              {/* Arrow */}
              <div className="flex items-center justify-end">
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {/* No results */}
        {filteredParas.length === 0 && (
          <div className="text-center py-12">
            <p className={cn(
              "text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "কোনো পারা পাওয়া যায়নি" : "No paras found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParaList;
