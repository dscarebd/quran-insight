import { useNavigate } from "react-router-dom";
import { Book, ChevronRight, Search, Layers, HelpCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fuzzySearchSurahs, fuzzySearchParas, getClosestSurahMatches, getClosestParaMatches, Para } from "@/utils/fuzzySearch";

interface SurahListProps {
  language: Language;
}

const SurahList = ({ language }: SurahListProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"surah" | "para">("surah");
  const [surahSearch, setSurahSearch] = useState("");
  const [paraSearch, setParaSearch] = useState("");

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use fuzzy search for surahs with "Did you mean..." fallback
  const { filteredSurahs, didYouMeanSurahs } = useMemo(() => {
    const query = surahSearch.trim();
    if (!query) return { filteredSurahs: surahs, didYouMeanSurahs: [] };
    
    const results = fuzzySearchSurahs(surahs, query);
    if (results.length > 0) {
      return { filteredSurahs: results, didYouMeanSurahs: [] };
    }
    
    // No matches - get closest for "Did you mean..."
    if (query.length >= 2) {
      const closest = getClosestSurahMatches(surahs, query, 5);
      return { filteredSurahs: [], didYouMeanSurahs: closest.map(c => c.surah) };
    }
    
    return { filteredSurahs: [], didYouMeanSurahs: [] };
  }, [surahSearch]);

  // Use fuzzy search for paras with "Did you mean..." fallback
  const { filteredParas, didYouMeanParas } = useMemo(() => {
    const query = paraSearch.trim();
    if (!query) return { filteredParas: paras, didYouMeanParas: [] };
    
    const results = fuzzySearchParas(paras as Para[], query);
    if (results.length > 0) {
      return { filteredParas: results, didYouMeanParas: [] };
    }
    
    // No matches - get closest for "Did you mean..."
    if (query.length >= 2) {
      const closest = getClosestParaMatches(paras as Para[], query, 5);
      return { filteredParas: [], didYouMeanParas: closest.map(c => c.para) };
    }
    
    return { filteredParas: [], didYouMeanParas: [] };
  }, [paraSearch]);

  const currentSearch = activeTab === "surah" ? surahSearch : paraSearch;
  const setCurrentSearch = activeTab === "surah" ? setSurahSearch : setParaSearch;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-8">
        {/* Tabs wrapper */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "surah" | "para")} className="w-full">
          {/* Header with Tabs and Search on right for desktop */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left: Title */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Book className="h-5 w-5" />
                  </div>
                  <h1 className={cn(
                    "text-lg sm:text-xl font-semibold text-foreground",
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

              {/* Right: Tabs and Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <TabsList className="grid w-full sm:w-auto grid-cols-2">
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
                
                {/* Search */}
                <div className="relative w-full sm:w-64 lg:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={currentSearch}
                    onChange={(e) => setCurrentSearch(e.target.value)}
                    placeholder={activeTab === "surah" 
                      ? (language === "bn" ? "সূরা খুঁজুন..." : "Search surah...")
                      : (language === "bn" ? "পারা খুঁজুন..." : "Search para...")}
                    className={cn(
                      "w-full rounded-xl border border-input bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                      language === "bn" && "font-bengali placeholder:font-bengali"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Surah Tab */}
          <TabsContent value="surah" className="mt-0">
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
                    "font-semibold text-sm text-foreground mb-1",
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

            {/* Did you mean section */}
            {filteredSurahs.length === 0 && didYouMeanSurahs.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <p className={cn(
                    "text-sm font-medium text-amber-700 dark:text-amber-300",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "আপনি কি খুঁজছেন?" : "Did you mean..."}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {didYouMeanSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => navigate(`/surah/${surah.number}`)}
                      className="group relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 p-4 text-left transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-amber-300 dark:hover:border-amber-700"
                    >
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40 text-sm font-semibold text-amber-700 dark:text-amber-300">
                        {formatNumber(surah.number, language)}
                      </div>
                      <p className="font-arabic text-xl text-foreground mb-2 pr-10">
                        {surah.nameArabic}
                      </p>
                      <h3 className={cn(
                        "font-semibold text-sm text-foreground mb-1",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                      </h3>
                      <p className={cn(
                        "text-sm text-muted-foreground mb-3",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-xs text-muted-foreground",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === "bn" 
                            ? `${formatNumber(surah.totalVerses, language)} আয়াত` 
                            : `${surah.totalVerses} verses`}
                        </span>
                        <ChevronRight className="h-4 w-4 text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {filteredSurahs.length === 0 && didYouMeanSurahs.length === 0 && surahSearch.trim().length >= 2 && (
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
                    "font-semibold text-sm text-foreground mb-1",
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

            {/* Did you mean section for Paras */}
            {filteredParas.length === 0 && didYouMeanParas.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <p className={cn(
                    "text-sm font-medium text-amber-700 dark:text-amber-300",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "আপনি কি খুঁজছেন?" : "Did you mean..."}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {didYouMeanParas.map((para) => (
                    <button
                      key={para.number}
                      onClick={() => navigate(`/para/${para.number}`)}
                      className="group relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 p-4 text-left transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-amber-300 dark:hover:border-amber-700"
                    >
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40 text-sm font-semibold text-amber-700 dark:text-amber-300">
                        {formatNumber(para.number, language)}
                      </div>
                      <p className="font-arabic text-xl text-foreground mb-2 pr-10">
                        {para.nameArabic}
                      </p>
                      <h3 className={cn(
                        "font-semibold text-sm text-foreground mb-1",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? para.nameBengali : para.nameEnglish}
                      </h3>
                      <p className={cn(
                        "text-sm text-muted-foreground mb-3",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn"
                          ? `সূরা ${formatNumber(para.startSurah, language)} - ${formatNumber(para.endSurah, language)}`
                          : `Surah ${para.startSurah} - ${para.endSurah}`}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-xs text-muted-foreground",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === "bn"
                            ? `আয়াত ${formatNumber(para.startVerse, language)} - ${formatNumber(para.endVerse, language)}`
                            : `Verse ${para.startVerse} - ${para.endVerse}`}
                        </span>
                        <ChevronRight className="h-4 w-4 text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {filteredParas.length === 0 && didYouMeanParas.length === 0 && paraSearch.trim().length >= 2 && (
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
