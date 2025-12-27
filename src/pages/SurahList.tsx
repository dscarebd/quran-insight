import { useNavigate } from "react-router-dom";
import { Book, ChevronRight, Search, Layers } from "lucide-react";
import { useState } from "react";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SurahListProps {
  language: Language;
}

const SurahList = ({ language }: SurahListProps) => {
  const navigate = useNavigate();
  const [surahSearch, setSurahSearch] = useState("");
  const [paraSearch, setParaSearch] = useState("");

  const filteredSurahs = surahs.filter((surah) => {
    const query = surahSearch.toLowerCase();
    return (
      surah.nameEnglish.toLowerCase().includes(query) ||
      surah.nameBengali.includes(query) ||
      surah.nameArabic.includes(query) ||
      surah.number.toString().includes(query) ||
      surah.meaningEnglish.toLowerCase().includes(query) ||
      surah.meaningBengali.includes(query)
    );
  });

  const filteredParas = paras.filter((para) => {
    const query = paraSearch.toLowerCase();
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
              {language === "bn" ? "পবিত্র কুরআন" : "Holy Quran"}
            </h1>
          </div>
          <p className={cn(
            "text-muted-foreground lg:ml-13",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? "সূরা বা পারা দিয়ে পড়ুন" 
              : "Browse by Surah or Para"}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="surah" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="surah" className={cn("gap-2", language === "bn" && "font-bengali")}>
              <Book className="h-4 w-4" />
              {language === "bn" ? "সূরা" : "Surah"}
              <span className="text-xs text-muted-foreground">(114)</span>
            </TabsTrigger>
            <TabsTrigger value="para" className={cn("gap-2", language === "bn" && "font-bengali")}>
              <Layers className="h-4 w-4" />
              {language === "bn" ? "পারা" : "Para"}
              <span className="text-xs text-muted-foreground">(30)</span>
            </TabsTrigger>
          </TabsList>

          {/* Surah Tab */}
          <TabsContent value="surah" className="mt-0">
            {/* Search */}
            <div className="relative w-full lg:w-80 mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={surahSearch}
                onChange={(e) => setSurahSearch(e.target.value)}
                placeholder={language === "bn" ? "সূরা খুঁজুন..." : "Search surah..."}
                className={cn(
                  "w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                  language === "bn" && "font-bengali placeholder:font-bengali"
                )}
              />
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
          </TabsContent>

          {/* Para Tab */}
          <TabsContent value="para" className="mt-0">
            {/* Search */}
            <div className="relative w-full lg:w-80 mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={paraSearch}
                onChange={(e) => setParaSearch(e.target.value)}
                placeholder={language === "bn" ? "পারা খুঁজুন..." : "Search para..."}
                className={cn(
                  "w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                  language === "bn" && "font-bengali placeholder:font-bengali"
                )}
              />
            </div>

            {/* Para Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredParas.map((para) => (
                <button
                  key={para.number}
                  onClick={() => navigate(`/para/${para.number}`)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-primary/30"
                >
                  {/* Number badge */}
                  <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
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
                      ? `সূরা ${formatNumber(para.startSurah, language)} - ${formatNumber(para.endSurah, language)}`
                      : `Surah ${para.startSurah} - ${para.endSurah}`}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-xs text-muted-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn"
                        ? `আয়াত ${formatNumber(para.startVerse, language)} - ${formatNumber(para.endVerse, language)}`
                        : `Verse ${para.startVerse} - ${para.endVerse}`}
                    </span>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SurahList;
