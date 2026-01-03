import { useRef } from "react";
import { Info, Moon, Sun, BookOpen, Type, ChevronRight, FileText, ChevronDown, Globe, Palette, Shield, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import annurLogo from "@/assets/annur-digital-logo.jpeg";
import appLogo from "@/assets/app-logo.png";
import { Language, t, languageNames } from "@/types/language";
import { useArabicFontSize } from "@/hooks/useArabicFontSize";

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
  const { arabicFontSize, setArabicFontSize, minArabicFontSize, maxArabicFontSize } = useArabicFontSize();

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
    <div className="bg-background">
      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 pt-3 pb-4 lg:pb-3 space-y-4">
          
          {/* User Card Section */}
          <section>
            <h2 className={cn(
              "mb-2 text-base font-medium text-muted-foreground tracking-wider",
              language === "bn" ? "font-bengali" : "font-sans"
            )}>
              {language === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
            </h2>
            <div className="rounded-lg border border-border bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={appLogo} 
                    alt="Quran Insight" 
                    className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? "কুরআন ইনসাইট" : "Quran Insight"}
                    </h3>
                    <p className={cn("text-sm text-muted-foreground leading-tight", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" 
                        ? <>কুরআন বোঝার জন্য আপনার AI বন্ধু। উম্মাহর জন্য ❤️ দিয়ে তৈরি</> 
                        : <>Your AI friend for Understand Qur'an. Made with ❤️ for Ummah</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Language Dropdown */}
          <section>
            <h2 className={cn(
              "mb-2 text-base font-medium text-muted-foreground tracking-wider",
              language === "bn" ? "font-bengali" : "font-sans"
            )}>
              {language === "bn" ? "ভাষা" : "Language"}
            </h2>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="rounded-lg border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors">
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                          {t("appLanguage", language)}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                          {languageNames[language].native}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 rounded-lg border border-border bg-card p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onLanguageChange("bn")}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2 py-2 transition-colors text-sm",
                        language === "bn" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      )}
                    >
                      <span className="font-bengali">ব</span>
                      <p className="font-bengali font-medium">বাংলা</p>
                      {language === "bn" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                    <button
                      onClick={() => onLanguageChange("en")}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2 py-2 transition-colors text-sm",
                        language === "en" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      )}
                    >
                      <span className="font-medium">A</span>
                      <p className="font-medium">English</p>
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
              "mb-2 text-base font-medium text-muted-foreground tracking-wider",
              language === "bn" ? "font-bengali" : "font-sans"
            )}>
              {language === "bn" ? "থিম" : "Theme"}
            </h2>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="rounded-lg border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors">
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Palette className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                          {language === "bn" ? "থিম ও রিডিং মোড" : "Theme & Reading Mode"}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                          {theme === "light" 
                            ? (language === "bn" ? "লাইট" : "Light")
                            : (language === "bn" ? "ডার্ক" : "Dark")}
                          {" • "}
                          {readingMode === "normal"
                            ? (language === "bn" ? "সাধারণ" : "Normal")
                            : (language === "bn" ? "সেপিয়া" : "Sepia")}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-3 rounded-lg border border-border bg-card p-3">
                  {/* App Theme */}
                  <div>
                    <p className={cn("text-sm font-medium text-muted-foreground mb-1.5", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? "অ্যাপ থিম" : "App Theme"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={cn(
                            "flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2 py-2 transition-colors text-sm",
                            theme === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                          )}
                        >
                          <option.icon className="h-3.5 w-3.5" />
                          <p className={cn("font-medium", language === "bn" ? "font-bengali" : "font-sans")}>
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
                    <p className={cn("text-sm font-medium text-muted-foreground mb-1.5", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? "রিডিং মোড" : "Reading Mode"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {readingModeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => onReadingModeChange?.(option.value as "normal" | "sepia")}
                          className={cn(
                            "flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2 py-2 transition-colors text-sm",
                            readingMode === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                          )}
                        >
                          <option.icon className="h-3.5 w-3.5" />
                          <p className={cn("font-medium", language === "bn" ? "font-bengali" : "font-sans")}>
                            {language === "bn" ? option.labelBn : option.labelEn}
                          </p>
                          {readingMode === option.value && (
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                    <p className={cn("mt-1.5 text-xs text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
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
              "mb-2 text-base font-medium text-muted-foreground tracking-wider",
              language === "bn" ? "font-bengali" : "font-sans"
            )}>
              {language === "bn" ? "ফন্ট সেটিংস" : "Font Settings"}
            </h2>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="rounded-lg border border-border bg-card overflow-hidden text-left hover:bg-muted/50 transition-colors">
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Type className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                          {language === "bn" ? "ফন্ট ও সাইজ" : "Font & Size"}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                          {language === "bn" 
                            ? `আমিরী • আরবি ${arabicFontSize}px • অ্যাপ ${fontSize}px` 
                            : `Amiri • Arabic ${arabicFontSize}px • App ${fontSize}px`}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-3 rounded-lg border border-border bg-card p-3">
                  {/* Arabic Font Size Slider */}
                  <div>
                    <p className={cn("text-sm font-medium text-muted-foreground mb-1.5", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? "আরবি ফন্ট সাইজ" : "Arabic Font Size"}
                    </p>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={cn("text-xs text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                        {language === "bn" ? "ছোট" : "Small"}
                      </span>
                      <span className="text-sm font-semibold text-primary">{arabicFontSize}px</span>
                      <span className={cn("text-xs text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                        {language === "bn" ? "বড়" : "Large"}
                      </span>
                    </div>
                    <Slider
                      value={[arabicFontSize]}
                      onValueChange={(value) => setArabicFontSize(value[0])}
                      min={minArabicFontSize}
                      max={maxArabicFontSize}
                      step={2}
                      className="w-full"
                    />
                    {/* Preview */}
                    <div className="mt-2 p-2 rounded-md bg-muted/50 border border-border">
                      <p 
                        className={cn("text-center text-foreground leading-relaxed", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")}
                        style={{ fontSize: `${arabicFontSize}px` }}
                      >
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                    </div>
                  </div>

                  {/* App Font Size Slider */}
                  <div>
                    <p className={cn("text-sm font-medium text-muted-foreground mb-1.5", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? "অ্যাপ ফন্ট সাইজ" : "App Font Size"}
                    </p>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={cn("text-xs text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                        {language === "bn" ? "ছোট" : "Small"}
                      </span>
                      <span className="text-sm font-semibold text-primary">{fontSize}px</span>
                      <span className={cn("text-xs text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
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

          {/* Owner & Developer Information */}
          <section>
            <h2 className={cn(
              "mb-2 text-base font-medium text-muted-foreground tracking-wider",
              language === "bn" ? "font-bengali" : "font-sans"
            )}>
              {language === "bn" ? "মালিক ও ডেভেলপার তথ্য" : "Owner & Developer Info"}
            </h2>
            <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
              {/* Owner */}
              <button
                onClick={() => navigate("/owner")}
                className="w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn("text-base font-semibold truncate", language === "bn" ? "font-bengali" : "font-sans")}>
                        DIGITAL EXPERTISE HUB LIMITED
                      </h3>
                      <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                        {language === "bn" 
                          ? "অ্যাপ মালিকানা" 
                          : "App Ownership"}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </button>

              {/* Developer */}
              <button
                onClick={() => navigate("/developer")}
                className="w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={language === "bn" ? "অ্যাডমিন লগইন খুলুন" : "Open admin login"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeveloperLogoClick();
                      }}
                      className="h-10 w-10 rounded-full border border-primary/20 overflow-hidden cursor-pointer select-none"
                    >
                      <img
                        src={annurLogo}
                        alt="An-Nur Digital"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </button>
                    <div className="flex-1">
                      <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                        An-Nur Digital
                      </h3>
                      <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                        {language === "bn" 
                          ? "ওয়ার্ডপ্রেস ও সফটওয়্যার ডিজাইনার" 
                          : "WordPress & Software Designer"}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* About Section */}
          <section>
            <h2 className={cn(
              "mb-2 text-base font-medium text-muted-foreground tracking-wider",
              language === "bn" ? "font-bengali" : "font-sans"
            )}>
              {language === "bn" ? "অ্যাপ তথ্য" : "App Info"}
            </h2>
            <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
              <button
                onClick={() => navigate("/sources-credits")}
                className="flex items-center gap-3 px-3 py-2.5 w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className={cn("text-base font-medium", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" ? "সূত্র ও কৃতজ্ঞতা" : "Sources & Credits"}
                  </p>
                  <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" ? "কুরআন, দোয়া ও হাদিসের উৎস" : "Quran, Dua & Hadith sources"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => navigate("/privacy-policy")}
                className="flex items-center gap-3 px-3 py-2.5 w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className={cn("text-base font-medium", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                  </p>
                  <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" ? "আপনার তথ্য কীভাবে সুরক্ষিত" : "How your data is protected"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </section>
        </div>
      </div>
  );
};

export default Settings;
