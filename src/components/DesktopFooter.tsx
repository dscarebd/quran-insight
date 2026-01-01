import { Language } from "@/types/language";
import { cn, formatNumber } from "@/lib/utils";

interface DesktopFooterProps {
  language: Language;
}

export const DesktopFooter = ({ language }: DesktopFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden lg:block border-t border-border bg-background/95">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row h-auto lg:h-14 py-3 lg:py-0 items-center justify-between gap-3 lg:gap-0">
          <p className={cn(
            "text-xs lg:text-sm text-muted-foreground text-center",
            language === "bn" && "font-bengali"
          )}>
            © {formatNumber(currentYear, language)} {language === "bn" ? "কুরআন ইনসাইট। সর্বস্বত্ব সংরক্ষিত।" : "Quran Insight. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};
