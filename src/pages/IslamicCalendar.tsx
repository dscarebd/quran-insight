import { useEffect } from "react";
import { CalendarDays, Moon, Star, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Badge } from "@/components/ui/badge";
import {
  hijriMonths,
  categoryLabels,
  IslamicEvent,
  getCurrentHijriDate,
  getUpcomingEvents,
  toBengaliNumber,
  bengaliMonths,
} from "@/data/islamicCalendar";

interface IslamicCalendarProps {
  language: Language;
}

const getCategoryColor = (category: IslamicEvent['category']) => {
  switch (category) {
    case 'eid': return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    case 'fasting': return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
    case 'night': return 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30';
    case 'sacred': return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';
    case 'historical': return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
    case 'sunnah': return 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getCategoryIconBg = (category: IslamicEvent['category']) => {
  switch (category) {
    case 'eid': return 'bg-emerald-500/15 text-emerald-500';
    case 'fasting': return 'bg-amber-500/15 text-amber-500';
    case 'night': return 'bg-indigo-500/15 text-indigo-500';
    case 'sacred': return 'bg-rose-500/15 text-rose-500';
    case 'historical': return 'bg-blue-500/15 text-blue-500';
    case 'sunnah': return 'bg-teal-500/15 text-teal-500';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getCategoryIcon = (category: IslamicEvent['category']) => {
  switch (category) {
    case 'eid': return Sparkles;
    case 'fasting': return Moon;
    case 'night': return Star;
    case 'sacred': return CalendarDays;
    case 'historical': return CalendarDays;
    case 'sunnah': return Heart;
    default: return CalendarDays;
  }
};

const IslamicCalendar = ({ language }: IslamicCalendarProps) => {
  const currentHijri = getCurrentHijriDate();
  const upcomingEvents = getUpcomingEvents(20);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatGregorianDate = (date: Date, lang: Language) => {
    if (lang === 'bn') {
      const day = toBengaliNumber(date.getDate());
      const month = bengaliMonths[date.getMonth()];
      const year = toBengaliNumber(date.getFullYear());
      return `${day} ${month}, ${year}`;
    }
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatHijriDate = (day: number, month: number, year: number, lang: Language) => {
    if (lang === 'bn') {
      return `${toBengaliNumber(day)} ${hijriMonths.bn[month - 1]}, ${toBengaliNumber(year)} হিজরি`;
    }
    return `${day} ${hijriMonths.en[month - 1]}, ${year} AH`;
  };

  const pageTitle = language === 'bn' ? 'ইসলামিক ক্যালেন্ডার' : 'Islamic Calendar';
  const upcomingLabel = language === 'bn' ? 'আসন্ন অনুষ্ঠান' : 'Upcoming Events';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-md shrink-0">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <h1 className={cn(
                "text-lg font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {pageTitle}
              </h1>
              <p className={cn(
                "text-xs text-muted-foreground font-bengali"
              )}>
                {toBengaliNumber(currentHijri.day)} {hijriMonths.bn[currentHijri.month - 1]}, {toBengaliNumber(currentHijri.year)} হিজরি
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Section Title */}
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h2 className={cn(
            "text-xl font-bold text-foreground",
            language === "bn" && "font-bengali"
          )}>
            {upcomingLabel}
          </h2>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => {
            const CategoryIcon = getCategoryIcon(event.category);
            const eventName = language === 'bn' ? event.nameBn : event.nameEn;
            const categoryLabel = categoryLabels[language][event.category];

            return (
              <div
                key={`${event.id}-${index}`}
                className="bg-card border border-border rounded-2xl p-4 shadow-sm"
              >
                {/* Top row: icon + name + badge */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl shrink-0",
                    getCategoryIconBg(event.category)
                  )}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={cn(
                        "font-bold text-foreground text-base leading-tight",
                        language === "bn" && "font-bengali"
                      )}>
                        {eventName}
                      </h3>
                      <Badge className={cn(
                        "text-[10px] shrink-0 border",
                        getCategoryColor(event.category),
                        language === "bn" && "font-bengali"
                      )}>
                        {categoryLabel}
                      </Badge>
                    </div>
                    {/* Arabic name */}
                    <p className="text-xs text-primary/70 mt-0.5" dir="rtl">
                      {event.nameAr}
                    </p>
                  </div>
                </div>

                {/* Dates */}
                <div className={cn(
                  "space-y-1 text-sm mb-3",
                  language === "bn" && "font-bengali"
                )}>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="font-semibold text-foreground w-14 shrink-0">
                      {language === 'bn' ? 'হিজরি:' : 'Hijri:'}
                    </span>
                    {formatHijriDate(event.hijriDay, event.hijriMonth, event.hijriYear, language)}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="font-semibold text-foreground w-14 shrink-0">
                      {language === 'bn' ? 'ইংরেজি:' : 'Gregorian:'}
                    </span>
                    {formatGregorianDate(event.gregorianDate, language)}
                  </div>
                </div>

                {/* Days until */}
                <div className="pt-2 border-t border-border/60">
                  <span className={cn(
                    "text-sm font-semibold",
                    event.daysUntil === 0 && 'text-emerald-500',
                    event.daysUntil > 0 && event.daysUntil <= 7 && 'text-amber-500',
                    event.daysUntil > 7 && 'text-muted-foreground',
                    language === "bn" && "font-bengali"
                  )}>
                    {event.daysUntil === 0
                      ? (language === 'bn' ? '🎉 আজ!' : '🎉 Today!')
                      : event.daysUntil === 1
                        ? (language === 'bn' ? 'আগামীকাল' : 'Tomorrow')
                        : language === 'bn'
                          ? `${toBengaliNumber(event.daysUntil)} দিন বাকি`
                          : `${event.daysUntil} days away`
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IslamicCalendar;
