import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MobileNavFooter } from "@/components/MobileNavFooter";

interface SettingsProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

const Settings = ({ language, onLanguageChange }: SettingsProps) => {
  const navigate = useNavigate();

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
      <div className="mx-auto max-w-2xl p-4 pb-20 md:pb-4">
        {/* Language Section */}
        <section className="mb-6">
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

        {/* About Section */}
        <section>
          <h2 className={cn(
            "mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "সম্পর্কে" : "About"}
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
