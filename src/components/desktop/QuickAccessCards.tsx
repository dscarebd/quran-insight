import { useNavigate } from "react-router-dom";
import { HandHeart, Clock, Sparkles, Bookmark } from "lucide-react";
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
      id: "prayer-calendar",
      icon: Clock,
      labelEn: "Prayer & Calendar",
      labelBn: "নামাজ ও ক্যালেন্ডার",
      descEn: "Prayer times & Islamic events",
      descBn: "নামাজের সময় ও ইসলামিক দিনপঞ্জী",
      path: "/prayer-times",
      gradient: "from-violet-500 to-purple-600",
      count: 5,
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
    {
      id: "bookmarks",
      icon: Bookmark,
      labelEn: "Bookmarks",
      labelBn: "বুকমার্ক",
      descEn: "Your saved verses & duas",
      descBn: "আপনার সংরক্ষিত আয়াত ও দোয়া",
      path: "/bookmarks",
      gradient: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-4">
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <button
            key={link.id}
            onClick={() => navigate(link.path)}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border p-3 sm:p-4 md:p-5 text-left transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 min-w-0"
          >
            {/* Gradient overlay on hover */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
              link.gradient
            )} />
            
            {/* Icon */}
            <div className={cn(
              "mb-2 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110 shrink-0",
              link.gradient
            )}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>
            
            {/* Content */}
            <h3 className={cn(
              "font-semibold text-scale-sm text-foreground mb-0.5 sm:mb-1 truncate",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? link.labelBn : link.labelEn}
            </h3>
            <p className={cn(
              "text-scale-xs text-muted-foreground line-clamp-2 hidden sm:block",
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
