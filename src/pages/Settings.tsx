import { ArrowLeft, Info, Moon, Sun, Monitor, Code, ExternalLink, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SettingsProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

const Settings = ({ language, onLanguageChange }: SettingsProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", labelEn: "Light", labelBn: "লাইট", icon: Sun },
    { value: "dark", labelEn: "Dark", labelBn: "ডার্ক", icon: Moon },
    { value: "system", labelEn: "System", labelBn: "সিস্টেম", icon: Monitor },
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
            {language === "bn" ? "সেটিংস" : "Settings"}
          </h1>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-2xl p-4 pb-20 md:pb-4 space-y-6">
          
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
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=AI%20Tafsir" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">AT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "AI তাফসির" : "AI Tafsir"}
                    </h3>
                    <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                      {language === "bn" 
                        ? "কুরআন অধ্যয়নের জন্য আপনার AI সহযোগী" 
                        : "Your AI companion for Quran study"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" 
                      ? "ভালোবাসার সাথে তৈরি" 
                      : "Made with love"}
                  </span>
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
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => onLanguageChange("bn")}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3.5 transition-colors",
                  language === "bn" ? "bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="font-bengali text-lg">ব</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bengali font-medium">বাংলা</p>
                    <p className="text-sm text-muted-foreground">Bengali</p>
                  </div>
                </div>
                {language === "bn" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </button>
              <Separator />
              <button
                onClick={() => onLanguageChange("en")}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3.5 transition-colors",
                  language === "en" ? "bg-primary/5" : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-lg font-medium">A</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">English</p>
                    <p className="text-sm text-muted-foreground">ইংরেজি</p>
                  </div>
                </div>
                {language === "en" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
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
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {themeOptions.map((option, index) => (
                <div key={option.value}>
                  {index > 0 && <Separator />}
                  <button
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3.5 transition-colors",
                      theme === option.value ? "bg-primary/5" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <option.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className={cn("font-medium", language === "bn" && "font-bengali")}>
                          {language === "bn" ? option.labelBn : option.labelEn}
                        </p>
                      </div>
                    </div>
                    {theme === option.value && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Developer Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ডেভেলপার" : "Developer"}
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn("font-semibold", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "ডেভেলপার টিম" : "Developer Team"}
                    </h3>
                    <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                      {language === "bn" 
                        ? "আমাদের সাথে যোগাযোগ করুন" 
                        : "Get in touch with us"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "গিটহাব" : "GitHub"}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                  <a
                    href="mailto:developer@aitafsir.com"
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
                      {language === "bn" ? "ইমেইল" : "Email"}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section>
            <h2 className={cn(
              "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
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
                  <p className={cn("font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "AI তাফসির" : "AI Tafsir"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "bn" ? "সংস্করণ ১.০.০" : "Version 1.0.0"}
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
