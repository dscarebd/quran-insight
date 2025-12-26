import { ArrowLeft, Type, TextCursor } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Slider } from "@/components/ui/slider";

interface FontSettingsProps {
  language: "bn" | "en";
  arabicFont: "amiri" | "uthmani";
  onArabicFontChange: (font: "amiri" | "uthmani") => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const FontSettings = ({ 
  language, 
  arabicFont, 
  onArabicFontChange, 
  fontSize, 
  onFontSizeChange 
}: FontSettingsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
              {language === "bn" ? "ফন্ট সেটিংস" : "Font Settings"}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl p-4 pb-24 space-y-6">
          
          {/* Arabic Font Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-5 w-5 text-primary" />
              <h2 className={cn(
                "text-sm font-medium text-muted-foreground uppercase tracking-wider",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "আরবি ফন্ট" : "Arabic Font"}
              </h2>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => onArabicFontChange("amiri")}
                className={cn(
                  "w-full flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors text-left",
                  arabicFont === "amiri" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted/50">
                  <span className="font-arabic text-2xl text-foreground">بِسْمِ</span>
                </div>
                <div className="flex-1">
                  <h3 className={cn("text-sm font-semibold", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "আমিরী" : "Amiri"}
                  </h3>
                  <p className={cn("text-xs text-muted-foreground mt-1", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "ক্লাসিক আরবি ক্যালিগ্রাফি স্টাইল" : "Classic Arabic calligraphy style"}
                  </p>
                </div>
                {arabicFont === "amiri" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </button>

              <button
                onClick={() => onArabicFontChange("uthmani")}
                className={cn(
                  "w-full flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors text-left",
                  arabicFont === "uthmani" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted/50">
                  <span className="font-uthmani text-2xl text-foreground">بِسْمِ</span>
                </div>
                <div className="flex-1">
                  <h3 className={cn("text-sm font-semibold", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "উসমানী" : "Uthmani"}
                  </h3>
                  <p className={cn("text-xs text-muted-foreground mt-1", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "মদিনা মুশহাফ স্টাইল" : "Madinah Mushaf style"}
                  </p>
                </div>
                {arabicFont === "uthmani" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </button>
            </div>
            <p className={cn("mt-3 text-xs text-muted-foreground text-center", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কুরআন ও দোয়ার আরবি লেখার জন্য" : "For Arabic text in Quran & Duas"}
            </p>
          </section>

          {/* Font Size Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TextCursor className="h-5 w-5 text-primary" />
              <h2 className={cn(
                "text-sm font-medium text-muted-foreground uppercase tracking-wider",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "ফন্ট সাইজ" : "Font Size"}
              </h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "ছোট" : "Small"}
                </span>
                <span className="text-lg font-semibold text-primary">{fontSize}px</span>
                <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "বড়" : "Large"}
                </span>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => onFontSizeChange(value[0])}
                min={15}
                max={20}
                step={1}
                className="w-full"
              />
              <p className={cn("mt-4 text-xs text-muted-foreground text-center", language === "bn" && "font-bengali")}>
                {language === "bn" ? "পুরো অ্যাপের টেক্সট সাইজ পরিবর্তন করুন" : "Adjust text size across the entire app"}
              </p>
            </div>
          </section>

          {/* Preview Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-5 w-5 text-primary" />
              <h2 className={cn(
                "text-sm font-medium text-muted-foreground uppercase tracking-wider",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "প্রিভিউ" : "Preview"}
              </h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="text-center">
                <p className={cn(
                  "text-2xl leading-relaxed",
                  arabicFont === "amiri" ? "font-arabic" : "font-uthmani"
                )}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className={cn("text-sm text-muted-foreground text-center", language === "bn" && "font-bengali")} style={{ fontSize: `${fontSize}px` }}>
                  {language === "bn" 
                    ? "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে" 
                    : "In the name of Allah, the Most Gracious, the Most Merciful"}
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
      <MobileNavFooter language={language} />
    </>
  );
};

export default FontSettings;
