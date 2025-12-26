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

interface IslamicCalendarProps {
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

const IslamicCalendar = ({ language }: IslamicCalendarProps) => {
  const currentHijri = getCurrentHijriDate();
  const [selectedHijriYear, setSelectedHijriYear] = useState(currentHijri.year);
  const [selectedHijriMonth, setSelectedHijriMonth] = useState(currentHijri.month);
  
  const upcomingEvents = getUpcomingEvents(10);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pageTitle = {
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

  const formatArabicHijriDate = (day: number, month: number, year: number) => {
    return `${toArabicNumber(day)} ${hijriMonths.ar[month - 1]} ${toArabicNumber(year)} هـ`;
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
    <div className="min-h-screen bg-background">
      {/* Sticky Header for Mobile/Tablet */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border lg:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shrink-0">
              <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className={cn(
                "text-lg sm:text-xl font-bold text-foreground truncate",
                language === "bn" && "font-bengali",
                language === "hi" && "font-hindi"
              )}>
                {pageTitle[language]}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block text-center py-6">
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

      <div className="container mx-auto px-4 py-4 lg:py-6 max-w-6xl">

        {/* Current Date Display - Compact for Mobile */}
        <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-3 sm:p-4">
            <p className={cn(
              "text-xs sm:text-sm text-muted-foreground mb-2 text-center",
              language === "bn" && "font-bengali",
              language === "hi" && "font-hindi"
            )}>
              {currentDateLabel[language]}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
              {/* English/Gregorian */}
              <div className="p-2 sm:p-3 rounded-lg bg-background/50">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">English</p>
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  {today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              
              {/* Bengali/Hijri */}
              <div className="p-2 sm:p-3 rounded-lg bg-background/50">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1 font-bengali">বাংলা (হিজরি)</p>
                <p className="text-xs sm:text-sm font-semibold text-primary font-bengali">
                  {toBengaliNumber(currentHijri.day)} {hijriMonths.bn[currentHijri.month - 1]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Full Calendar */}
          <div className="lg:col-span-2">
            <Card>
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
                      "text-lg",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === 'bn' 
                        ? `${hijriMonths.bn[selectedHijriMonth - 1]} ${toBengaliNumber(selectedHijriYear)}`
                        : `${hijriMonths.en[selectedHijriMonth - 1]} ${selectedHijriYear} AH`
                      }
                    </CardTitle>
                    <p className="text-sm text-primary/80" dir="rtl">
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
                      "text-center text-xs font-medium text-muted-foreground py-2",
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
                    <div key={`empty-${i}`} className="p-2" />
                  ))}
                  
                  {calendarDays.map((day, index) => {
                    const isToday = day.gregorianDate.toDateString() === today.toDateString();
                    const hasEvent = day.events.length > 0;
                    
                    return (
                      <div
                        key={index}
                        className={cn(
                          "p-1 sm:p-2 rounded-lg text-center min-h-[60px] sm:min-h-[80px] transition-colors relative",
                          isToday && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background",
                          hasEvent && !isToday && "bg-accent/50",
                          !isToday && !hasEvent && "hover:bg-muted/50"
                        )}
                      >
                        {/* Hijri Day */}
                        <div className={cn(
                          "text-sm sm:text-base font-bold",
                          !isToday && "text-foreground",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === 'bn' ? toBengaliNumber(day.hijriDay) : day.hijriDay}
                        </div>
                        
                        {/* Arabic numeral */}
                        <div className={cn(
                          "text-[10px] sm:text-xs",
                          isToday ? "text-primary-foreground/70" : "text-muted-foreground"
                        )} dir="rtl">
                          {toArabicNumber(day.hijriDay)}
                        </div>
                        
                        {/* Gregorian Date */}
                        <div className={cn(
                          "text-[9px] sm:text-[10px]",
                          isToday ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                          {language === 'bn' 
                            ? `${toBengaliNumber(day.gregorianDate.getDate())} ${bengaliMonths[day.gregorianDate.getMonth()].slice(0, 3)}`
                            : `${day.gregorianDate.getDate()} ${day.gregorianDate.toLocaleDateString('en', { month: 'short' })}`
                          }
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
                <div className="mt-4 pt-4 border-t border-border">
                  <div className={cn(
                    "flex flex-wrap gap-3 justify-center text-xs",
                    language === "bn" && "font-bengali"
                  )}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-muted-foreground">{categoryLabels[language].eid}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-muted-foreground">{categoryLabels[language].fasting}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-muted-foreground">{categoryLabels[language].night}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="text-muted-foreground">{categoryLabels[language].sacred}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <span className="text-muted-foreground">{categoryLabels[language].sunnah}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={cn(
                  "text-lg flex items-center gap-2",
                  language === "bn" && "font-bengali"
                )}>
                  <Star className="w-5 h-5 text-amber-400" />
                  {upcomingLabel[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                {upcomingEvents.map((event, index) => {
                  const CategoryIcon = getCategoryIcon(event.category);
                  const eventName = language === 'bn' ? event.nameBn : language === 'hi' ? event.nameHi : event.nameEn;
                  const categoryLabel = categoryLabels[language][event.category];
                  
                  return (
                    <div
                      key={`${event.id}-${index}`}
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className={cn(
                          "p-1.5 rounded-lg shrink-0",
                          getCategoryColor(event.category)
                        )}>
                          <CategoryIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "font-semibold text-foreground text-sm",
                            language === "bn" && "font-bengali"
                          )}>
                            {eventName}
                          </h3>
                          <p className="text-xs text-primary/80" dir="rtl">
                            {event.nameAr}
                          </p>
                        </div>
                        <Badge variant="outline" className={cn(
                          "text-[10px] shrink-0",
                          getCategoryColor(event.category),
                          language === "bn" && "font-bengali"
                        )}>
                          {categoryLabel}
                        </Badge>
                      </div>
                      
                      {/* Dates */}
                      <div className={cn(
                        "space-y-1 text-xs mb-2",
                        language === "bn" && "font-bengali"
                      )}>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {language === 'bn' ? 'হিজরি:' : 'Hijri:'}
                          </span>
                          {formatHijriDate(event.hijriDay, event.hijriMonth, event.hijriYear, language)}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {language === 'bn' ? 'ইংরেজি:' : 'Gregorian:'}
                          </span>
                          {formatGregorianDate(event.gregorianDate, language)}
                        </div>
                      </div>
                      
                      {/* Days Until */}
                      <div className="pt-2 border-t border-border/50">
                        <span className={cn(
                          "text-xs font-medium",
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Events by Month */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className={cn(
              "text-lg",
              language === "bn" && "font-bengali"
            )}>
              {language === 'bn' ? 'মাস অনুযায়ী সকল ইসলামিক দিবস' : 'All Islamic Events by Month'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 12 }, (_, monthIndex) => {
                const monthEvents = islamicEvents.filter(e => e.hijriMonth === monthIndex + 1);
                if (monthEvents.length === 0) return null;
                
                return (
                  <div key={monthIndex} className="p-3 rounded-lg bg-muted/20 border border-border/50">
                    <h4 className={cn(
                      "font-semibold text-foreground mb-3 flex items-center justify-between",
                      language === "bn" && "font-bengali"
                    )}>
                      <span>{language === 'bn' ? hijriMonths.bn[monthIndex] : hijriMonths.en[monthIndex]}</span>
                      <span className="text-xs text-primary/60" dir="rtl">
                        {hijriMonths.ar[monthIndex]}
                      </span>
                    </h4>
                    <div className="space-y-2">
                      {monthEvents.map((event) => {
                        const gregorianDate = hijriToGregorian(currentHijri.year, event.hijriMonth, event.hijriDay);
                        return (
                          <div key={event.id} className="text-sm">
                            <div className={cn(
                              "flex items-center gap-2",
                              language === "bn" && "font-bengali"
                            )}>
                              <span className="font-medium text-primary w-6">
                                {language === 'bn' ? toBengaliNumber(event.hijriDay) : event.hijriDay}
                              </span>
                              <span className="text-foreground">
                                {language === 'bn' ? event.nameBn : event.nameEn}
                              </span>
                            </div>
                            <div className={cn(
                              "text-xs text-muted-foreground ml-8",
                              language === "bn" && "font-bengali"
                            )}>
                              ≈ {formatGregorianDate(gregorianDate, language)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sunnah Fasting Information */}
        <Card className="mt-6 bg-gradient-to-br from-teal-500/10 to-emerald-500/5 border-teal-500/20">
          <CardHeader>
            <CardTitle className={cn(
              "text-lg flex items-center gap-2",
              language === "bn" && "font-bengali"
            )}>
              <Heart className="w-5 h-5 text-teal-500" />
              {sunnahFastingInfo[language].weekly.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Fasting */}
              <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="w-5 h-5 text-teal-500" />
                  <h4 className={cn(
                    "font-semibold text-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {sunnahFastingInfo[language].weekly.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {sunnahFastingInfo[language].weekly.days.map((day, i) => (
                    <Badge key={i} variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30">
                      {day}
                    </Badge>
                  ))}
                </div>
                <p className={cn(
                  "text-sm text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {sunnahFastingInfo[language].weekly.description}
                </p>
              </div>

              {/* Monthly Fasting (Ayyam al-Beed) */}
              <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-teal-500" />
                  <h4 className={cn(
                    "font-semibold text-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {sunnahFastingInfo[language].monthly.title}
                  </h4>
                </div>
                <Badge variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30 mb-3">
                  {sunnahFastingInfo[language].monthly.days}
                </Badge>
                <p className={cn(
                  "text-sm text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {sunnahFastingInfo[language].monthly.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IslamicCalendar;
