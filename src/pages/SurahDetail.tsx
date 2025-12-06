import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Play, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { surahs } from "@/data/surahs";
import { getVersesBySurah, Verse } from "@/data/verses";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <p className="mb-2 font-bengali text-base leading-relaxed text-foreground sm:text-lg">
        {language === "bn" ? verse.bengali : verse.english}
      </p>

      {/* Tafsir Toggle */}
      {(verse.tafsirBengali || verse.tafsirEnglish) && (
        <div className="mt-4 border-t border-border pt-4">
          <button
            onClick={() => setShowTafsir(!showTafsir)}
            className="flex w-full items-center justify-between text-sm font-medium text-primary hover:text-primary/80"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {language === "bn" ? "তাফসীর দেখুন" : "View Tafsir"}
            </span>
            {showTafsir ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {showTafsir && (
            <div className="mt-3 rounded-lg bg-accent/50 p-4 text-sm leading-relaxed text-muted-foreground">
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

  const surahNum = parseInt(surahNumber || "1", 10);
  const surah = surahs.find(s => s.number === surahNum);
  const verses = getVersesBySurah(surahNum);

  const prevSurah = surahs.find(s => s.number === surahNum - 1);
  const nextSurah = surahs.find(s => s.number === surahNum + 1);

  if (!surah) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
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
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{language === "bn" ? "ফিরে যান" : "Back"}</span>
          </Button>

          {/* Surah Navigation for Mobile */}
          <div className="flex items-center gap-1 sm:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => prevSurah && navigate(`/surah/${prevSurah.number}`)}
              disabled={!prevSurah}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[3rem] text-center text-sm font-medium">
              {surahNum}/114
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => nextSurah && navigate(`/surah/${nextSurah.number}`)}
              disabled={!nextSurah}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

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
              বাংলা
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
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            <span>{surah.revelationType === "Meccan" ? (language === "bn" ? "মক্কী" : "Meccan") : (language === "bn" ? "মাদানী" : "Medinan")}</span>
            <span>•</span>
            <span>{surah.totalVerses} {language === "bn" ? "আয়াত" : "verses"}</span>
          </div>
          
          <h1 className="mb-1 font-arabic text-4xl text-foreground sm:text-5xl">
            {surah.nameArabic}
          </h1>
          <h2 className="mb-2 font-bengali text-xl font-semibold text-foreground">
            {language === "bn" ? surah.nameBengali : surah.nameEnglish}
          </h2>
          <p className="text-muted-foreground">
            {language === "bn" ? surah.meaningBengali : surah.meaningEnglish}
          </p>
        </div>
      </div>

      {/* Verses List */}
      <div className="mx-auto max-w-4xl px-3 py-6 pb-24 sm:pb-6 sm:px-4 md:px-6">
        {verses.length > 0 ? (
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
            <h3 className="mb-2 font-bengali text-lg font-semibold text-foreground">
              {language === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "bn" 
                ? "এই সূরার আয়াতগুলো শীঘ্রই যোগ করা হবে।" 
                : "Verses for this Surah will be added soon."}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => prevSurah && navigate(`/surah/${prevSurah.number}`)}
            disabled={!prevSurah}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">
                {language === "bn" ? "পূর্ববর্তী" : "Previous"}
              </div>
              {prevSurah && (
                <div className="text-xs font-medium truncate max-w-[80px]">
                  {language === "bn" ? prevSurah.nameBengali : prevSurah.nameEnglish}
                </div>
              )}
            </div>
          </Button>

          <div className="text-center">
            <div className="text-xs text-muted-foreground">
              {language === "bn" ? "সূরা" : "Surah"}
            </div>
            <div className="text-sm font-semibold">{surahNum}/114</div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => nextSurah && navigate(`/surah/${nextSurah.number}`)}
            disabled={!nextSurah}
            className="gap-2"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground">
                {language === "bn" ? "পরবর্তী" : "Next"}
              </div>
              {nextSurah && (
                <div className="text-xs font-medium truncate max-w-[80px]">
                  {language === "bn" ? nextSurah.nameBengali : nextSurah.nameEnglish}
                </div>
              )}
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;