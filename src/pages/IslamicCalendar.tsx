import { CalendarDays, Moon, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { islamicEvents, hijriMonths, categoryLabels, IslamicEvent } from "@/data/islamicCalendar";

interface IslamicCalendarProps {
  language: Language;
}

// Simple Hijri date calculation (approximate)
const getApproximateHijriDate = (): { day: number; month: number; year: number } => {
  const today = new Date();
  // Islamic calendar epoch: July 16, 622 CE (Julian)
  const hijriEpoch = new Date(622, 6, 16);
  const daysSinceEpoch = Math.floor((today.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
  
  // Average lunar month is approximately 29.53 days
  // Hijri year is approximately 354.36667 days
  const hijriYear = Math.floor(daysSinceEpoch / 354.36667) + 1;
  const daysInCurrentYear = daysSinceEpoch % 354.36667;
  const hijriMonth = Math.floor(daysInCurrentYear / 29.53) + 1;
  const hijriDay = Math.floor(daysInCurrentYear % 29.53) + 1;
  
  return {
    day: Math.min(hijriDay, 30),
    month: Math.min(hijriMonth, 12),
    year: hijriYear
  };
};

// Sort events by proximity to current Hijri date
const getSortedEvents = (currentHijri: { day: number; month: number }): IslamicEvent[] => {
  return [...islamicEvents].sort((a, b) => {
    const getDaysUntil = (event: IslamicEvent) => {
      let days = (event.hijriMonth - currentHijri.month) * 30 + (event.hijriDay - currentHijri.day);
      if (days < 0) days += 360; // Next year
      return days;
    };
    return getDaysUntil(a) - getDaysUntil(b);
  });
};

const getCategoryColor = (category: IslamicEvent['category']) => {
  switch (category) {
    case 'eid': return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
    case 'fasting': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400';
    case 'night': return 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400';
    case 'sacred': return 'bg-rose-500/20 text-rose-600 dark:text-rose-400';
    case 'historical': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
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
    default: return CalendarDays;
  }
};

const IslamicCalendar = ({ language }: IslamicCalendarProps) => {
  const currentHijri = getApproximateHijriDate();
  const sortedEvents = getSortedEvents(currentHijri);
  
  const pageTitle = {
    en: 'Islamic Calendar',
    bn: 'ইসলামিক ক্যালেন্ডার',
    hi: 'इस्लामी कैलेंडर'
  };
  
  const currentDateLabel = {
    en: 'Current Hijri Date (Approximate)',
    bn: 'বর্তমান হিজরি তারিখ (আনুমানিক)',
    hi: 'वर्तमान हिजरी तारीख (अनुमानित)'
  };
  
  const upcomingLabel = {
    en: 'Upcoming Islamic Events',
    bn: 'আসন্ন ইসলামিক অনুষ্ঠান',
    hi: 'आगामी इस्लामी कार्यक्रम'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg mb-4">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h1 className={cn(
            "text-2xl sm:text-3xl font-bold text-foreground mb-2",
            language === "bn" && "font-bengali",
            language === "hi" && "font-hindi"
          )}>
            {pageTitle[language]}
          </h1>
        </div>

        {/* Current Hijri Date Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 text-center">
          <p className={cn(
            "text-sm text-muted-foreground mb-2",
            language === "bn" && "font-bengali",
            language === "hi" && "font-hindi"
          )}>
            {currentDateLabel[language]}
          </p>
          <p className={cn(
            "text-2xl sm:text-3xl font-bold text-foreground",
            language === "bn" && "font-bengali",
            language === "hi" && "font-hindi"
          )}>
            {currentHijri.day} {hijriMonths[language][currentHijri.month - 1]}, {currentHijri.year} AH
          </p>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-6">
          <h2 className={cn(
            "text-lg sm:text-xl font-semibold text-foreground mb-4",
            language === "bn" && "font-bengali",
            language === "hi" && "font-hindi"
          )}>
            {upcomingLabel[language]}
          </h2>
        </div>

        {/* Events Grid */}
        <div className="space-y-4">
          {sortedEvents.map((event) => {
            const CategoryIcon = getCategoryIcon(event.category);
            const eventName = language === 'bn' ? event.nameBn : language === 'hi' ? event.nameHi : event.nameEn;
            const eventDesc = language === 'bn' ? event.descriptionBn : language === 'hi' ? event.descriptionHi : event.descriptionEn;
            const categoryLabel = categoryLabels[language][event.category];
            const monthName = hijriMonths[language][event.hijriMonth - 1];
            
            return (
              <div
                key={event.id}
                className="bg-card border border-border rounded-xl p-4 sm:p-5 hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                    getCategoryColor(event.category)
                  )}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={cn(
                        "font-semibold text-foreground",
                        language === "bn" && "font-bengali",
                        language === "hi" && "font-hindi"
                      )}>
                        {eventName}
                      </h3>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full flex-shrink-0",
                        getCategoryColor(event.category),
                        language === "bn" && "font-bengali",
                        language === "hi" && "font-hindi"
                      )}>
                        {categoryLabel}
                      </span>
                    </div>
                    
                    <p className={cn(
                      "text-sm text-primary font-medium mb-2",
                      language === "bn" && "font-bengali",
                      language === "hi" && "font-hindi"
                    )}>
                      {event.hijriDay} {monthName}
                    </p>
                    
                    <p className={cn(
                      "text-sm text-muted-foreground",
                      language === "bn" && "font-bengali",
                      language === "hi" && "font-hindi"
                    )}>
                      {eventDesc}
                    </p>
                  </div>
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
