import { useRef } from "react";
import { Info, Moon, Sun, BookOpen, Type, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Slider } from "@/components/ui/slider";
import annurLogo from "@/assets/annur-digital-logo.jpeg";
import appLogo from "@/assets/app-logo.png";

interface SettingsProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
  readingMode?: "normal" | "sepia";
  onReadingModeChange?: (mode: "normal" | "sepia") => void;
  arabicFont?: "amiri" | "uthmani";
  onArabicFontChange?: (font: "amiri" | "uthmani") => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}

const Settings = ({ language, onLanguageChange, readingMode = "normal", onReadingModeChange, arabicFont = "amiri", onArabicFontChange, fontSize = 16, onFontSizeChange }: SettingsProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Easter egg: 7 clicks on developer logo navigates to admin (no time restriction)
  const clickCountRef = useRef(0);

  const handleDeveloperLogoClick = () => {
    clickCountRef.current += 1;

    if (clickCountRef.current >= 7) {
      clickCountRef.current = 0;
      toast.success(language === "bn" ? "অ্যাডমিন লগইনে যাচ্ছি…" : "Opening admin login…");
      navigate("/auth");
    }
  };

  const themeOptions = [
    { value: "light", labelEn: "Light", labelBn: "লাইট", icon: Sun },
    { value: "dark", labelEn: "Dark", labelBn: "ডার্ক", icon: Moon },
  ];

  const readingModeOptions = [
    { value: "normal", labelEn: "Normal", labelBn: "সাধারণ", icon: Sun },
    { value: "sepia", labelEn: "Sepia", labelBn: "সেপিয়া", icon: BookOpen },
  ];

  return (
    <>
      <div className="min-h-screen bg-background">

        {/* Content */}
        <div className="mx-auto max-w-2xl p-4 pb-4 space-y-6">
          
          {/* User Card Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
            </h2>
            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <img 
                    src={appLogo} 
                    alt="Quran Insight" 
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <h3 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
                    </h3>
                    <p className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                      {language === "bn" 
                        ? <>কুরআন বোঝার জন্য আপনার AI বন্ধু।<br />উম্মাহর জন্য ❤️ দিয়ে তৈরি</> 
                        : <>Your AI friend for Understand Qur'an.<br />Made with ❤️ for Ummah</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Language Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ভাষা" : "Language"}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onLanguageChange("bn")}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-2 py-2.5 transition-colors",
                  language === "bn" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <span className="font-bengali text-xs">ব</span>
                <p className="font-bengali text-xs font-medium">বাংলা</p>
                {language === "bn" && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
              <button
                onClick={() => onLanguageChange("en")}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-2 py-2.5 transition-colors",
                  language === "en" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <span className="text-xs font-medium">A</span>
                <p className="text-xs font-medium">English</p>
                {language === "en" && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            </div>
          </section>

          {/* Theme Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "থিম" : "Theme"}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-2 py-2.5 transition-colors",
                    theme === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  <p className={cn("text-xs font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? option.labelBn : option.labelEn}
                  </p>
                  {theme === option.value && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Reading Mode Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "রিডিং মোড" : "Reading Mode"}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {readingModeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onReadingModeChange?.(option.value as "normal" | "sepia")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-2 py-2.5 transition-colors",
                    readingMode === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  <p className={cn("text-xs font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? option.labelBn : option.labelEn}
                  </p>
                  {readingMode === option.value && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
            <p className={cn("mt-2 text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "শুধুমাত্র পড়ার পৃষ্ঠায় প্রযোজ্য" : "Applies only to reading pages"}
            </p>
          </section>

          {/* Arabic Font Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "আরবি ফন্ট" : "Arabic Font"}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onArabicFontChange?.("amiri")}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-4 transition-colors",
                  arabicFont === "amiri" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <span className="font-arabic text-xl text-foreground">بِسْمِ</span>
                <div className="flex items-center gap-1.5">
                  <Type className="h-3.5 w-3.5" />
                  <p className={cn("text-xs font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "আমিরী" : "Amiri"}
                  </p>
                  {arabicFont === "amiri" && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </div>
              </button>
              <button
                onClick={() => onArabicFontChange?.("uthmani")}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-4 transition-colors",
                  arabicFont === "uthmani" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <span className="font-uthmani text-xl text-foreground">بِسْمِ</span>
                <div className="flex items-center gap-1.5">
                  <Type className="h-3.5 w-3.5" />
                  <p className={cn("text-xs font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "উসমানী" : "Uthmani"}
                  </p>
                  {arabicFont === "uthmani" && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </div>
              </button>
            </div>
            <p className={cn("mt-2 text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কুরআন ও দোয়ার আরবি লেখার জন্য" : "For Arabic text in Quran & Duas"}
            </p>
          </section>

          {/* Font Size Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ফন্ট সাইজ" : "Font Size"}
            </h2>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "ছোট" : "Small"}
                </span>
                <span className="text-sm font-semibold text-primary">{fontSize}px</span>
                <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "বড়" : "Large"}
                </span>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => onFontSizeChange?.(value[0])}
                min={15}
                max={20}
                step={1}
                className="w-full"
              />
              <p className={cn("mt-3 text-xs text-muted-foreground text-center", language === "bn" && "font-bengali")}>
                {language === "bn" ? "পুরো অ্যাপের টেক্সট সাইজ পরিবর্তন করুন" : "Adjust text size across the entire app"}
              </p>
            </div>
          </section>
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ডেভেলপার" : "Developer"}
            </h2>
            <button
              onClick={() => navigate("/developer")}
              className="w-full rounded-xl border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors"
            >
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    aria-label={language === "bn" ? "অ্যাডমিন লগইন খুলুন" : "Open admin login"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeveloperLogoClick();
                    }}
                    className="h-14 w-14 rounded-full border-2 border-primary/20 overflow-hidden cursor-pointer select-none"
                  >
                    <img
                      src={annurLogo}
                      alt="An-Nur Digital"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </button>
                  <div className="flex-1">
                    <h3 className={cn("text-sm font-semibold", language === "bn" && "font-bengali")}>
                      An-Nur Digital
                    </h3>
                    <p className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                      {language === "bn" 
                        ? "ওয়ার্ডপ্রেস ও সফটওয়্যার ডিজাইনার" 
                        : "WordPress & Software Designer"}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </button>
          </section>

          {/* About Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "অ্যাপ তথ্য" : "App Info"}
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "bn" ? "সংস্করণ ৩.২.০" : "Version 3.2.0"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/sources-credits")}
                className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "সূত্র ও কৃতজ্ঞতা" : "Sources & Credits"}
                  </p>
                  <p className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "কুরআন, দোয়া ও হাদিসের উৎস" : "Quran, Dua & Hadith sources"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </section>
        </div>
      </div>
      <MobileNavFooter language={language} />
    </>
  );
};

export default Settings;
