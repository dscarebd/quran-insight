import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { paras } from "@/data/paras";
import { surahs } from "@/data/surahs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ParaDetail = () => {
  const { paraNumber } = useParams<{ paraNumber: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  const paraNum = parseInt(paraNumber || "1", 10);
  const para = paras.find(p => p.number === paraNum);

  if (!para) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          {language === "bn" ? "পারা পাওয়া যায়নি" : "Para not found"}
        </p>
      </div>
    );
  }

  // Get surahs included in this para
  const includedSurahs = surahs.filter(
    surah => surah.number >= para.startSurah && surah.number <= para.endSurah
  );

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
            {language === "bn" ? "ফিরে যান" : "Back"}
          </Button>

          {/* Language Toggle */}
          <div className="flex rounded-full bg-secondary p-1">
            <button
              onClick={() => setLanguage("bn")}
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
              onClick={() => setLanguage("en")}
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

      {/* Para Info Banner */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/30 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            <span>{language === "bn" ? "পারা" : "Para"} {para.number}</span>
          </div>
          
          <h1 className="mb-1 font-arabic text-4xl text-foreground sm:text-5xl">
            {para.nameArabic}
          </h1>
          <h2 className="mb-2 font-bengali text-xl font-semibold text-foreground">
            {language === "bn" ? para.nameBengali : para.nameEnglish}
          </h2>
          <p className="text-muted-foreground">
            {language === "bn" 
              ? `সূরা ${para.startSurah} আয়াত ${para.startVerse} থেকে সূরা ${para.endSurah} আয়াত ${para.endVerse} পর্যন্ত`
              : `From Surah ${para.startSurah} Verse ${para.startVerse} to Surah ${para.endSurah} Verse ${para.endVerse}`}
          </p>
        </div>
      </div>

      {/* Included Surahs */}
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6">
        <h3 className="mb-4 font-bengali text-lg font-semibold text-foreground">
          {language === "bn" ? "এই পারায় অন্তর্ভুক্ত সূরাসমূহ" : "Surahs in this Para"}
        </h3>
        
        <div className="grid gap-3 sm:grid-cols-2">
          {includedSurahs.map((surah, index) => (
            <button
              key={surah.number}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="animate-fade-in flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                {surah.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium truncate text-foreground">
                    {language === "bn" ? surah.nameBengali : surah.nameEnglish}
                  </span>
                  <span className="font-arabic text-sm text-muted-foreground shrink-0">
                    {surah.nameArabic}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {surah.totalVerses} {language === "bn" ? "আয়াত" : "verses"} • {surah.revelationType === "Meccan" ? (language === "bn" ? "মক্কী" : "Meccan") : (language === "bn" ? "মাদানী" : "Medinan")}
                </span>
              </div>
            </button>
          ))}
        </div>

        {includedSurahs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {language === "bn" ? "কোনো সূরা পাওয়া যায়নি" : "No surahs found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParaDetail;
