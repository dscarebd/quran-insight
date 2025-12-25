import { useRef } from "react";
import { ArrowLeft, Info, Moon, Sun, BookOpen, Globe, Mail, Heart, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import annurLogo from "@/assets/annur-digital-logo.jpeg";
import appLogo from "@/assets/app-logo.png";

// Telegram SVG Icon Component
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

interface SettingsProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
  readingMode?: "normal" | "sepia";
  onReadingModeChange?: (mode: "normal" | "sepia") => void;
  arabicFont?: "amiri" | "uthmani";
  onArabicFontChange?: (font: "amiri" | "uthmani") => void;
}

const Settings = ({ language, onLanguageChange, readingMode = "normal", onReadingModeChange, arabicFont = "amiri", onArabicFontChange }: SettingsProps) => {
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
        <div className="mx-auto max-w-2xl p-4 pb-20 md:pb-4 space-y-6">
          
          {/* User Card Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
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
                        ? "কুরআন বোঝার জন্য আপনার AI বন্ধু। উম্মাহর জন্য ❤️ দিয়ে তৈরি" 
                        : "Your AI friend for Understand Qur'an. Made with ❤️ for Ummah"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Language Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
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
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
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
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
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
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
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
          <section>
            <h2 className={cn(
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ডেভেলপার" : "Developer"}
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    aria-label={language === "bn" ? "অ্যাডমিন লগইন খুলুন" : "Open admin login"}
                    onClick={handleDeveloperLogoClick}
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
                </div>
                <div className="mt-4 space-y-2">
                  {/* Website */}
                  <a
                    href="https://annurdigital.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className={cn("text-xs font-medium flex-1", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "ওয়েবসাইট" : "Website"}
                    </span>
                    <span className="text-xs text-muted-foreground">annurdigital.com</span>
                  </a>
                  
                  {/* Email */}
                  <a
                    href="mailto:support@annurdigital.com"
                    className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <Mail className="h-5 w-5 text-red-500" />
                    <span className={cn("text-xs font-medium flex-1", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "ইমেইল" : "Email"}
                    </span>
                    <span className="text-xs text-muted-foreground">support@annurdigital.com</span>
                  </a>
                  
                  {/* Telegram */}
                  <a
                    href="https://t.me/nuralamin_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <TelegramIcon className="h-5 w-5 text-[#0088cc]" />
                    <span className={cn("text-xs font-medium flex-1", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "টেলিগ্রাম" : "Telegram"}
                    </span>
                    <span className="text-xs text-muted-foreground">@nuralamin_official</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "অ্যাপ তথ্য" : "App Info"}
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
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
            </div>
          </section>
        </div>
      </div>
      <MobileNavFooter language={language} />
    </>
  );
};

export default Settings;
