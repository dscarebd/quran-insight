import { useNavigate } from "react-router-dom";
import { HandHeart, CalendarDays, Clock, Sparkles, BookOpen } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { duaCategories } from "@/data/duas";
import { getUpcomingEventsCount } from "@/data/islamicCalendar";
import { Language } from "@/types/language";

interface QuickAccessCardsProps {
  language: Language;
}

// Calculate total duas count
const getTotalDuasCount = () => {
  return duaCategories.reduce((total, category) => total + category.duas.length, 0);
};

export const QuickAccessCards = ({ language }: QuickAccessCardsProps) => {
  const navigate = useNavigate();
  const duaCount = getTotalDuasCount();
  const calendarEventsCount = getUpcomingEventsCount();

  const quickLinks = [
    {
      id: "names",
      icon: Sparkles,
      labelEn: "99 Names of Allah",
      labelBn: "আল্লাহর ৯৯ নাম",
      descEn: "Beautiful names with meanings",
      descBn: "সুন্দর নামসমূহ ও অর্থ",
      path: "/names-of-allah",
      gradient: "from-sky-500 to-blue-600",
      count: 99,
    },
    {
      id: "hadith",
      icon: BookOpen,
      labelEn: "Hadith",
      labelBn: "হাদিস",
      descEn: "Authentic hadith collections",
      descBn: "প্রামাণিক হাদিস সংকলন",
      path: "/hadith",
      gradient: "from-emerald-500 to-teal-600",
      count: 6,
    },
    {
      id: "prayer-calendar",
      icon: Clock,
      secondIcon: CalendarDays,
      labelEn: "Prayer & Calendar",
      labelBn: "নামাজ ও ক্যালেন্ডার",
      descEn: "Prayer times & Islamic calendar",
      descBn: "নামাজের সময় ও ইসলামিক ক্যালেন্ডার",
      path: "/prayer-times",
      secondPath: "/islamic-calendar",
      gradient: "from-violet-500 to-purple-600",
      count: 5,
      secondCount: calendarEventsCount,
    },
    {
      id: "dua",
      icon: HandHeart,
      labelEn: "Daily Duas",
      labelBn: "দৈনিক দোয়া",
      descEn: "Authentic prayers and supplications",
      descBn: "প্রামাণিক দোয়া ও মোনাজাত",
      path: "/daily-dua",
      gradient: "from-amber-500 to-orange-600",
      count: duaCount,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {quickLinks.map((link) => {
        const Icon = link.icon;
        const SecondIcon = (link as any).secondIcon;
        const secondPath = (link as any).secondPath;
        
        // Combined card with two sections
        if (secondPath) {
          return (
            <div
              key={link.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border text-left transition-all duration-300 hover:shadow-elevated"
            >
              {/* Gradient overlay on hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br pointer-events-none",
                link.gradient
              )} />
              
              {/* Two clickable sections */}
              <div className="flex flex-col divide-y divide-border">
                {/* Prayer Times section */}
                <button
                  onClick={() => navigate(link.path)}
                  className="flex items-center gap-3 p-3 sm:p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className={cn(
                    "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md",
                    link.gradient
                  )}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={cn(
                      "font-semibold text-sm text-foreground truncate",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? "নামাজের সময়" : "Prayer Times"}
                    </h3>
                    <p className={cn(
                      "text-xs text-muted-foreground truncate",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? "অবস্থান ভিত্তিক নামাজের সময়সূচী" : "Location-based prayer schedule"}
                    </p>
                  </div>
                </button>
                
                {/* Islamic Calendar section */}
                <button
                  onClick={() => navigate(secondPath)}
                  className="flex items-center gap-3 p-3 sm:p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className={cn(
                    "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md",
                    "from-rose-500 to-pink-600"
                  )}>
                    <SecondIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={cn(
                      "font-semibold text-sm text-foreground truncate",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? "ইসলামিক ক্যালেন্ডার" : "Islamic Calendar"}
                    </h3>
                    <p className={cn(
                      "text-xs text-muted-foreground truncate",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === "bn" ? "ছুটি ও ইসলামিক অনুষ্ঠান" : "Holidays & Islamic occasions"}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          );
        }
        
        // Regular single card
        return (
          <button
            key={link.id}
            onClick={() => navigate(link.path)}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border p-4 sm:p-5 text-left transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
          >
            {/* Gradient overlay on hover */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
              link.gradient
            )} />
            
            {/* Icon */}
            <div className={cn(
              "mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110",
              link.gradient
            )}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            
            {/* Content */}
            <h3 className={cn(
              "font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? link.labelBn : link.labelEn}
            </h3>
            <p className={cn(
              "text-xs sm:text-sm text-muted-foreground line-clamp-2 hidden sm:block",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? link.descBn : link.descEn}
            </p>
          </button>
        );
      })}
    </div>
  );
};
