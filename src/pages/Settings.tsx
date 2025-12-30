import { useRef } from "react";
import { Info, Moon, Sun, BookOpen, Type, ChevronRight, FileText, ChevronDown, Globe, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import annurLogo from "@/assets/annur-digital-logo.jpeg";
import appLogo from "@/assets/app-logo.png";
import { Language, t, languageNames } from "@/types/language";

interface SettingsProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  readingMode?: "normal" | "sepia";
  onReadingModeChange?: (mode: "normal" | "sepia") => void;
  arabicFont?: "amiri" | "uthmani";
  onArabicFontChange?: (font: "amiri" | "uthmani") => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}

const Settings = ({ language, onLanguageChange, readingMode = "normal", onReadingModeChange, arabicFont = "amiri", onArabicFontChange, fontSize = 17, onFontSizeChange }: SettingsProps) => {
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
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
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

          {/* Language Dropdown */}
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ভাষা" : "Language"}
            </h2>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="rounded-xl border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={cn("text-base font-semibold", language === "bn" && "font-bengali")}>
                          {t("appLanguage", language)}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                          {languageNames[language].native}
                        </p>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 rounded-xl border border-border bg-card p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onLanguageChange("bn")}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-3 transition-colors",
                        language === "bn" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      )}
                    >
                      <span className="font-bengali text-sm">ব</span>
                      <p className="font-bengali text-sm font-medium">বাংলা</p>
                      {language === "bn" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                    <button
                      onClick={() => onLanguageChange("en")}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-3 transition-colors",
                        language === "en" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      )}
                    >
                      <span className="text-sm font-medium">A</span>
                      <p className="text-sm font-medium">English</p>
                      {language === "en" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Theme & Reading Mode Dropdown */}
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "থিম" : "Theme"}
            </h2>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="rounded-xl border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Palette className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={cn("text-base font-semibold", language === "bn" && "font-bengali")}>
                          {language === "bn" ? "থিম ও রিডিং মোড" : "Theme & Reading Mode"}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                          {theme === "light" 
                            ? (language === "bn" ? "লাইট" : "Light")
                            : (language === "bn" ? "ডার্ক" : "Dark")}
                          {" • "}
                          {readingMode === "normal"
                            ? (language === "bn" ? "সাধারণ" : "Normal")
                            : (language === "bn" ? "সেপিয়া" : "Sepia")}
                        </p>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-4 rounded-xl border border-border bg-card p-4">
                  {/* App Theme */}
                  <div>
                    <p className={cn("text-xs font-medium text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "অ্যাপ থিম" : "App Theme"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={cn(
                            "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-3 transition-colors",
                            theme === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                          )}
                        >
                          <option.icon className="h-4 w-4" />
                          <p className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
                            {language === "bn" ? option.labelBn : option.labelEn}
                          </p>
                          {theme === option.value && (
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reading Mode */}
                  <div>
                    <p className={cn("text-xs font-medium text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "রিডিং মোড" : "Reading Mode"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {readingModeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => onReadingModeChange?.(option.value as "normal" | "sepia")}
                          className={cn(
                            "flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-3 transition-colors",
                            readingMode === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                          )}
                        >
                          <option.icon className="h-4 w-4" />
                          <p className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
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
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Font Settings Dropdown */}
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ফন্ট সেটিংস" : "Font Settings"}
            </h2>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="rounded-xl border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Type className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={cn("text-base font-semibold", language === "bn" && "font-bengali")}>
                          {language === "bn" ? "ফন্ট ও সাইজ" : "Font & Size"}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                          {language === "bn" 
                            ? `${arabicFont === "amiri" ? "আমিরী" : "উসমানী"} • ${fontSize}px` 
                            : `${arabicFont === "amiri" ? "Amiri" : "Uthmani"} • ${fontSize}px`}
                        </p>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-4 rounded-xl border border-border bg-card p-4">
                  {/* Arabic Font Selection */}
                  <div>
                    <p className={cn("text-xs font-medium text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "আরবি ফন্ট" : "Arabic Font"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onArabicFontChange?.("amiri")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-3 transition-colors",
                          arabicFont === "amiri" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                        )}
                      >
                        <span className="font-arabic text-lg text-foreground">بِسْمِ</span>
                        <div className="flex items-center gap-1.5">
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
                          "flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-3 transition-colors",
                          arabicFont === "uthmani" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                        )}
                      >
                        <span className="font-uthmani text-lg text-foreground">بِسْمِ</span>
                        <div className="flex items-center gap-1.5">
                          <p className={cn("text-xs font-medium", language === "bn" && "font-bengali")}>
                            {language === "bn" ? "উসমানী" : "Uthmani"}
                          </p>
                          {arabicFont === "uthmani" && (
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Font Size Slider */}
                  <div>
                    <p className={cn("text-xs font-medium text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "ফন্ট সাইজ" : "Font Size"}
                    </p>
                    <div className="flex items-center justify-between mb-2">
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
                      max={22}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ডেভেলপার তথ্য" : "Developer Information"}
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
                    <h3 className={cn("text-base font-semibold", language === "bn" && "font-bengali")}>
                      An-Nur Digital
                    </h3>
                    <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
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
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
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
                  <p className={cn("text-base font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
                  </p>
                  <p className="text-sm text-muted-foreground">
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
                  <p className={cn("text-base font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "সূত্র ও কৃতজ্ঞতা" : "Sources & Credits"}
                  </p>
                  <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
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
