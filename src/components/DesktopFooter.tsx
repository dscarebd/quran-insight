import { Language } from "@/types/language";
import { cn } from "@/lib/utils";

interface DesktopFooterProps {
  language: Language;
}

export const DesktopFooter = ({ language }: DesktopFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed left-0 right-0 z-40 bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] border-t border-border bg-background/95 lg:static lg:bottom-auto">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row h-auto lg:h-14 py-3 lg:py-0 items-center justify-between gap-3 lg:gap-0">
          {/* Copyright Text */}
          <p className={cn(
            "text-xs lg:text-sm text-muted-foreground text-center lg:text-left",
            language === "bn" && "font-bengali"
          )}>
            © {currentYear} {language === "bn" ? "কুরআন ইনসাইট। সর্বস্বত্ব সংরক্ষিত।" : "Quran Insight. All rights reserved."}
          </p>

          {/* App Store Links */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center lg:justify-end">
            <span className={cn(
              "text-xs sm:text-sm text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ডাউনলোড করুন:" : "Available on:"}
            </span>
            <a
              href="https://play.google.com/store/apps/details?id=com.annur.quraninsight"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Download on Google Play"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-7 sm:h-9"
              />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Download on App Store"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-7 sm:h-9"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
