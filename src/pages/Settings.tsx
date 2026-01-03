import { useRef } from "react";
import { Info, Moon, Sun, BookOpen, Type, ChevronRight, FileText, ChevronDown, Globe, Palette, Shield, Building2 } from "lucide-react";
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
                            ? `আমিরী • আরবি ${arabicFontSize}px • অ্যাপ ${fontSize}px` 
                            : `Amiri • Arabic ${arabicFontSize}px • App ${fontSize}px`}
                        </p>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-4 rounded-xl border border-border bg-card p-4">
                  {/* Arabic Font Size Slider */}
                  <div>
                    <p className={cn("text-xs font-medium text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "আরবি ফন্ট সাইজ" : "Arabic Font Size"}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
                        {language === "bn" ? "ছোট" : "Small"}
                      </span>
                      <span className="text-sm font-semibold text-primary">{arabicFontSize}px</span>
                      <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
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
                    <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
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
                    <p className={cn("text-xs font-medium text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "অ্যাপ ফন্ট সাইজ" : "App Font Size"}
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

          {/* Owner & Developer Information */}
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "মালিক ও ডেভেলপার তথ্য" : "Owner & Developer Info"}
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
              {/* Owner */}
              <button
                onClick={() => navigate("/owner")}
                className="w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                      <Building2 className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold truncate">
                        Developer Resource Community
                      </h3>
                      <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                        {language === "bn" 
                          ? "অ্যাপ মালিক" 
                          : "App Owner"}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </button>

              {/* Developer */}
              <button
                onClick={() => navigate("/developer")}
                className="w-full text-left hover:bg-muted/50 transition-colors"
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
            </div>
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
              <button
                onClick={() => navigate("/privacy-policy")}
                className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className={cn("text-base font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                  </p>
                  <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "আপনার তথ্য কীভাবে সুরক্ষিত" : "How your data is protected"}
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
