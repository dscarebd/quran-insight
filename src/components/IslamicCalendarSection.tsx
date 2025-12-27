import { useState } from "react";
import { CalendarDays, Moon, Star, Sparkles, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  islamicEvents,
  hijriMonths,
  categoryLabels,
  IslamicEvent,
  getCurrentHijriDate,
  hijriToGregorian,
  getUpcomingEvents,
  toBengaliNumber,
  toArabicNumber,
  bengaliMonths,
  bengaliDays,
  englishDays,
  sunnahFastingInfo
} from "@/data/islamicCalendar";

interface IslamicCalendarSectionProps {
  language: Language;
}

const getCategoryColor = (category: IslamicEvent['category']) => {
  switch (category) {
    case 'eid': return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
    case 'fasting': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400';
    case 'night': return 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400';
    case 'sacred': return 'bg-rose-500/20 text-rose-600 dark:text-rose-400';
    case 'historical': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
    case 'sunnah': return 'bg-teal-500/20 text-teal-600 dark:text-teal-400';
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

const IslamicCalendarSection = ({ language }: IslamicCalendarSectionProps) => {
  const currentHijri = getCurrentHijriDate();
  const [selectedHijriYear, setSelectedHijriYear] = useState(currentHijri.year);
  const [selectedHijriMonth, setSelectedHijriMonth] = useState(currentHijri.month);
  
  const upcomingEvents = getUpcomingEvents(5);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sectionTitle = {
    en: 'Islamic Calendar',
    bn: 'ইসলামিক ক্যালেন্ডার',
    hi: 'इस्लामी कैलेंडर'
  };
  
  const currentDateLabel = {
    en: "Today's Date",
    bn: 'আজকের তারিখ',
    hi: 'आज की तारीख'
  };
  
  const upcomingLabel = {
    en: 'Upcoming Events',
    bn: 'আসন্ন অনুষ্ঠান',
    hi: 'आगामी कार्यक्रम'
  };

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

  // Generate calendar days for the selected month
  const generateCalendarDays = () => {
    const days: Array<{
      hijriDay: number;
      gregorianDate: Date;
      events: IslamicEvent[];
    }> = [];

    for (let day = 1; day <= 30; day++) {
      const gregorianDate = hijriToGregorian(selectedHijriYear, selectedHijriMonth, day);
      const events = islamicEvents.filter(
        e => e.hijriDay === day && e.hijriMonth === selectedHijriMonth
      );
      days.push({ hijriDay: day, gregorianDate, events });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const firstDayOfWeek = calendarDays[0]?.gregorianDate.getDay() || 0;

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedHijriMonth === 1) {
        setSelectedHijriMonth(12);
        setSelectedHijriYear(y => y - 1);
      } else {
        setSelectedHijriMonth(m => m - 1);
      }
    } else {
      if (selectedHijriMonth === 12) {
        setSelectedHijriMonth(1);
        setSelectedHijriYear(y => y + 1);
      } else {
        setSelectedHijriMonth(m => m + 1);
      }
    }
  };

  const goToCurrentMonth = () => {
    const current = getCurrentHijriDate();
    setSelectedHijriYear(current.year);
    setSelectedHijriMonth(current.month);
  };

  const isCurrentMonth = selectedHijriMonth === currentHijri.month && selectedHijriYear === currentHijri.year;

  return (
    <div className="mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shrink-0">
          <CalendarDays className="h-5 w-5" />
        </div>
        <h2 className={cn(
          "text-xl font-bold text-foreground",
          language === "bn" && "font-bengali"
        )}>
          {sectionTitle[language]}
        </h2>
      </div>

      {/* Current Date Display */}
      <Card className="mb-4 bg-gradient-to-br from-rose-500/10 to-pink-500/5 border-rose-500/20">
        <CardContent className="p-3">
          <p className={cn(
            "text-xs text-muted-foreground mb-2 text-center",
            language === "bn" && "font-bengali"
          )}>
            {currentDateLabel[language]}
          </p>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-lg bg-background/50">
              <p className="text-[10px] text-muted-foreground mb-0.5">English</p>
              <p className="text-xs font-semibold text-foreground">
                {today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-background/50">
              <p className="text-[10px] text-muted-foreground mb-0.5 font-bengali">বাংলা (হিজরি)</p>
              <p className="text-xs font-semibold text-primary font-bengali">
                {toBengaliNumber(currentHijri.day)} {hijriMonths.bn[currentHijri.month - 1]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <CardTitle className={cn(
                "text-base",
                language === "bn" && "font-bengali"
              )}>
                {language === 'bn' 
                  ? `${hijriMonths.bn[selectedHijriMonth - 1]} ${toBengaliNumber(selectedHijriYear)}`
                  : `${hijriMonths.en[selectedHijriMonth - 1]} ${selectedHijriYear} AH`
                }
              </CardTitle>
              <p className="text-xs text-primary/80" dir="rtl">
                {hijriMonths.ar[selectedHijriMonth - 1]} {toArabicNumber(selectedHijriYear)} هـ
              </p>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {!isCurrentMonth && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goToCurrentMonth}
              className={cn(
                "mt-2 mx-auto block text-xs",
                language === "bn" && "font-bengali"
              )}
            >
              {language === 'bn' ? 'আজকে যান' : 'Go to Today'}
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {(language === 'bn' ? bengaliDays : englishDays).map((day, i) => (
              <div key={i} className={cn(
                "text-center text-[10px] font-medium text-muted-foreground py-1",
                language === "bn" && "font-bengali"
              )}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for alignment */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-1" />
            ))}
            
            {calendarDays.map((day, index) => {
              const isToday = day.gregorianDate.toDateString() === today.toDateString();
              const hasEvent = day.events.length > 0;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "p-1 rounded-lg text-center min-h-[50px] transition-colors relative",
                    isToday && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1 ring-offset-background",
                    hasEvent && !isToday && "bg-accent/50",
                    !isToday && !hasEvent && "hover:bg-muted/50"
                  )}
                >
                  {/* Hijri Day */}
                  <div className={cn(
                    "text-xs font-bold",
                    !isToday && "text-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === 'bn' ? toBengaliNumber(day.hijriDay) : day.hijriDay}
                  </div>
                  
                  {/* Arabic numeral */}
                  <div className={cn(
                    "text-[9px]",
                    isToday ? "text-primary-foreground/70" : "text-muted-foreground"
                  )} dir="rtl">
                    {toArabicNumber(day.hijriDay)}
                  </div>
                  
                  {/* Event Indicators */}
                  {hasEvent && (
                    <div className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                      {day.events.slice(0, 2).map((event, ei) => (
                        <div
                          key={ei}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            event.category === 'eid' && 'bg-emerald-400',
                            event.category === 'fasting' && 'bg-amber-400',
                            event.category === 'night' && 'bg-indigo-400',
                            event.category === 'sacred' && 'bg-rose-400',
                            event.category === 'historical' && 'bg-blue-400',
                            event.category === 'sunnah' && 'bg-teal-400'
                          )}
                          title={language === 'bn' ? event.nameBn : event.nameEn}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className={cn(
              "flex flex-wrap gap-2 justify-center text-[10px]",
              language === "bn" && "font-bengali"
            )}>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-muted-foreground">{categoryLabels[language].eid}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-muted-foreground">{categoryLabels[language].fasting}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-muted-foreground">{categoryLabels[language].night}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={cn(
            "text-base flex items-center gap-2",
            language === "bn" && "font-bengali"
          )}>
            <Star className="w-4 h-4 text-amber-400" />
            {upcomingLabel[language]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcomingEvents.map((event, index) => {
            const CategoryIcon = getCategoryIcon(event.category);
            const eventName = language === 'bn' ? event.nameBn : language === 'hi' ? event.nameHi : event.nameEn;
            
            return (
              <div
                key={`${event.id}-${index}`}
                className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-1 rounded-md shrink-0",
                    getCategoryColor(event.category)
                  )}>
                    <CategoryIcon className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-medium text-foreground text-xs truncate",
                      language === "bn" && "font-bengali"
                    )}>
                      {eventName}
                    </h3>
                    <p className={cn(
                      "text-[10px] text-muted-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {formatHijriDate(event.hijriDay, event.hijriMonth, event.hijriYear, language)}
                    </p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium shrink-0",
                    event.daysUntil === 0 && 'text-emerald-500',
                    event.daysUntil > 0 && event.daysUntil <= 7 && 'text-amber-500',
                    event.daysUntil > 7 && 'text-muted-foreground',
                    language === "bn" && "font-bengali"
                  )}>
                    {event.daysUntil === 0 
                      ? (language === 'bn' ? 'আজ!' : 'Today!')
                      : language === 'bn' 
                        ? `${toBengaliNumber(event.daysUntil)} দিন`
                        : `${event.daysUntil}d`
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default IslamicCalendarSection;
