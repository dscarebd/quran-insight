import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Play, Bookmark, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { surahs } from "@/data/surahs";
import { Verse } from "@/data/verses";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";

interface SurahDetailProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

const VerseCard = ({ verse, language, index }: { verse: Verse; language: "bn" | "en"; index: number }) => {
  const [showTafsir, setShowTafsir] = useState(false);

  return (
    <div 
      className="verse-card mb-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Verse Number Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
          {verse.verseNumber}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Arabic Text */}
      <p className="mb-4 text-right font-arabic text-2xl leading-loose text-foreground sm:text-3xl">
        {verse.arabic}
      </p>

      {/* Translation */}
      <p className={cn("mb-2 text-base leading-relaxed text-foreground sm:text-lg", language === "bn" && "font-bengali")}>
        {language === "bn" ? verse.bengali : verse.english}
      </p>

      {/* Tafsir Toggle */}
      {(verse.tafsirBengali || verse.tafsirEnglish) && (
        <div className="mt-4 border-t border-border pt-4">
          <button
            onClick={() => setShowTafsir(!showTafsir)}
            className="flex w-full items-center justify-between text-sm font-medium text-primary hover:text-primary/80"
          >
            <span className={cn("flex items-center gap-2", language === "bn" && "font-bengali")}>
              <BookOpen className="h-4 w-4" />
              {language === "bn" ? "তাফসীর দেখুন" : "View Tafsir"}
            </span>
            {showTafsir ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {showTafsir && (
            <div className={cn("mt-3 rounded-lg bg-accent/50 p-4 text-sm leading-relaxed text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? verse.tafsirBengali : verse.tafsirEnglish}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SurahDetail = ({ language, onLanguageChange }: SurahDetailProps) => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const surahNum = parseInt(surahNumber || "1", 10);
  const surah = surahs.find(s => s.number === surahNum);

  const prevSurah = surahs.find(s => s.number === surahNum - 1);
  const nextSurah = surahs.find(s => s.number === surahNum + 1);

  useEffect(() => {
    const fetchVerses = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('verses')
        .select('*')
        .eq('surah_number', surahNum)
        .order('verse_number', { ascending: true });

      if (error) {
        console.error('Error fetching verses:', error);
        setVerses([]);
      } else {
        // Map database fields to Verse interface
        const mappedVerses: Verse[] = (data || []).map(v => ({
          surahNumber: v.surah_number,
          verseNumber: v.verse_number,
          arabic: v.arabic,
          bengali: v.bengali,
          english: v.english,
          tafsirBengali: v.tafsir_bengali || undefined,
          tafsirEnglish: v.tafsir_english || undefined,
        }));
        setVerses(mappedVerses);
      }
      setIsLoading(false);
    };

    fetchVerses();
  }, [surahNum]);

  const handleBack = () => {
    if (isMobile) {
      setOpenMobile(true);
    } else {
      navigate("/");
    }
  };

  if (!surah) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? "সূরা পাওয়া যায়নি" : "Surah not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className={language === "bn" ? "font-bengali" : ""}>{language === "bn" ? "ফিরে যান" : "Back"}</span>
          </Button>

          {/* Language Toggle */}
          <div className="flex rounded-full bg-secondary p-1">
            <button
              onClick={() => onLanguageChange("bn")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                language === "bn"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="font-bengali">বাংলা</span>
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* Surah Info Banner */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/30 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-4">
            <div className={cn("mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary", language === "bn" && "font-bengali")}>
              <span>{surah.revelationType === "Meccan" ? (language === "bn" ? "মক্কী" : "Meccan") : (language === "bn" ? "মাদানী" : "Medinan")}</span>
              <span>•</span>
              <span>{surah.totalVerses} {language === "bn" ? "আয়াত" : "verses"}</span>
            </div>
          </div>
          
          {/* Surah Name with Navigation */}
          <div className="flex items-center justify-center gap-4">
            {/* Previous Surah */}
            <button
              onClick={() => prevSurah && navigate(`/surah/${prevSurah.number}`)}
              disabled={!prevSurah}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all",
                prevSurah 
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className={cn("text-xs font-medium hidden sm:block", language === "bn" && "font-bengali")}>
                {prevSurah ? (language === "bn" ? prevSurah.nameBengali : prevSurah.nameEnglish) : ""}
              </span>
              <span className="text-xs sm:hidden">
                {prevSurah?.number || ""}
              </span>
            </button>

            {/* Current Surah Name */}
            <div className="text-center">
              <h1 className="mb-1 font-arabic text-4xl text-foreground sm:text-5xl">
                {surah.nameArabic}
              </h1>
              <h2 className={cn("text-xl font-semibold text-foreground", language === "bn" && "font-bengali")}>
                {language === "bn" ? surah.nameBengali : surah.nameEnglish}
              </h2>
            </div>

            {/* Next Surah */}
            <button
              onClick={() => nextSurah && navigate(`/surah/${nextSurah.number}`)}
              disabled={!nextSurah}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all",
                nextSurah 
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-5 w-5" />
              <span className={cn("text-xs font-medium hidden sm:block", language === "bn" && "font-bengali")}>
                {nextSurah ? (language === "bn" ? nextSurah.nameBengali : nextSurah.nameEnglish) : ""}
              </span>
              <span className="text-xs sm:hidden">
                {nextSurah?.number || ""}
              </span>
            </button>
          </div>

          <p className={cn("text-center mt-2 text-muted-foreground", language === "bn" && "font-bengali")}>
            {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
          </p>
        </div>
      </div>

      {/* Verses List */}
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : verses.length > 0 ? (
          verses.map((verse, index) => (
            <VerseCard 
              key={verse.verseNumber} 
              verse={verse} 
              language={language}
              index={index}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className={cn("mb-2 text-lg font-semibold text-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
            </h3>
            <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? "এই সূরার আয়াতগুলো শীঘ্রই যোগ করা হবে।" 
                : "Verses for this Surah will be added soon."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahDetail;