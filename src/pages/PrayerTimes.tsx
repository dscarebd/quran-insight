import { useState, useEffect } from "react";
import { Clock, MapPin, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IslamicCalendarSection from "@/components/IslamicCalendarSection";
import {
  calculatePrayerTimes,
  getNextPrayer,
  getTimeRemaining,
  prayerNames,
  PrayerTimes as PrayerTimesType,
  PrayerTimeRange,
  Location,
} from "@/data/prayerTimes";
import {
  bangladeshDivisions,
  getDivisionById,
  getDistrictById,
  getUpazilaById,
  defaultBangladeshLocation,
} from "@/data/bangladeshLocations";
import { toBengaliNumber } from "@/data/islamicCalendar";

interface PrayerTimesProps {
  language: Language;
}

const PrayerTimesPage = ({ language }: PrayerTimesProps) => {
  // Location state - Bangladesh hierarchical selection
  const [selectedDivision, setSelectedDivision] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesLocation');
    if (saved) {
      try {
        return JSON.parse(saved).divisionId || defaultBangladeshLocation.divisionId;
      } catch {
        return defaultBangladeshLocation.divisionId;
      }
    }
    return defaultBangladeshLocation.divisionId;
  });

  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesLocation');
    if (saved) {
      try {
        return JSON.parse(saved).districtId || defaultBangladeshLocation.districtId;
      } catch {
        return defaultBangladeshLocation.districtId;
      }
    }
    return defaultBangladeshLocation.districtId;
  });

  const [selectedUpazila, setSelectedUpazila] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesLocation');
    if (saved) {
      try {
        return JSON.parse(saved).upazilaId || defaultBangladeshLocation.upazilaId;
      } catch {
        return defaultBangladeshLocation.upazilaId;
      }
    }
    return defaultBangladeshLocation.upazilaId;
  });

  const [location, setLocation] = useState<Location>({ latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' });
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; nameAr: string; nameBn: string } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number } | null>(null);

  const pageTitle = {
    en: 'Prayer Times',
    bn: 'নামাজের সময়',
    hi: 'नमाज़ का समय'
  };

  const divisionLabel = {
    en: 'Division',
    bn: 'বিভাগ',
    hi: 'विभाग'
  };

  const districtLabel = {
    en: 'District',
    bn: 'জেলা',
    hi: 'जिला'
  };

  const upazilaLabel = {
    en: 'Upazila',
    bn: 'উপজেলা',
    hi: 'उपजिला'
  };

  const nextPrayerLabel = {
    en: 'Next Prayer',
    bn: 'পরবর্তী নামাজ',
    hi: 'अगली नमाज़'
  };

  // Get districts based on selected division
  const getDistricts = () => {
    const division = getDivisionById(selectedDivision);
    return division?.districts || [];
  };

  // Get upazilas based on selected district
  const getUpazilas = () => {
    const district = getDistrictById(selectedDivision, selectedDistrict);
    return district?.upazilas || [];
  };

  // Get current upazila data
  const getCurrentUpazila = () => {
    return getUpazilaById(selectedDivision, selectedDistrict, selectedUpazila);
  };

  // Handle division change
  const handleDivisionChange = (divisionId: string) => {
    setSelectedDivision(divisionId);
    const division = getDivisionById(divisionId);
    if (division && division.districts.length > 0) {
      const firstDistrict = division.districts[0];
      setSelectedDistrict(firstDistrict.id);
      if (firstDistrict.upazilas.length > 0) {
        setSelectedUpazila(firstDistrict.upazilas[0].id);
      }
    }
  };

  // Handle district change
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId);
    const district = getDistrictById(selectedDivision, districtId);
    if (district && district.upazilas.length > 0) {
      setSelectedUpazila(district.upazilas[0].id);
    }
  };

  // Save location to localStorage
  useEffect(() => {
    localStorage.setItem('prayerTimesLocation', JSON.stringify({
      divisionId: selectedDivision,
      districtId: selectedDistrict,
      upazilaId: selectedUpazila
    }));
  }, [selectedDivision, selectedDistrict, selectedUpazila]);

  // Update location when upazila changes
  useEffect(() => {
    const upazila = getCurrentUpazila();
    if (upazila) {
      setLocation({
        latitude: upazila.latitude,
        longitude: upazila.longitude,
        city: language === 'bn' ? upazila.name_bn : upazila.name_en
      });
    }
  }, [selectedUpazila, selectedDistrict, selectedDivision, language]);

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (nextPrayer) {
        const remaining = getTimeRemaining(nextPrayer.time);
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer]);

  // Calculate prayer times when location changes (always use IFB method for Bangladesh)
  useEffect(() => {
    const times = calculatePrayerTimes(location, new Date(), 'IFB');
    setPrayerTimes(times);
    const next = getNextPrayer(times);
    setNextPrayer(next);
    if (next) {
      setTimeRemaining(getTimeRemaining(next.time));
    }
  }, [location]);

  const formatTimeDisplay = (time: string, lang: Language) => {
    if (time === '--:--') return time;
    
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time;
    
    const hours = parseInt(match[1], 10);
    let minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    
    if (minutes >= 60) {
      minutes = minutes % 60;
    }
    
    if (lang === 'bn') {
      const periodBn = period === 'AM' ? 'AM' : 'PM';
      const minStr = minutes < 10 ? '০' + toBengaliNumber(minutes) : toBengaliNumber(minutes);
      return `${toBengaliNumber(hours)}:${minStr} ${periodBn}`;
    }
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getPrayerIcon = (prayerKey: string) => {
    switch (prayerKey) {
      case 'fajr': return <Moon className="w-5 h-5" />;
      case 'sunrise': return <Sunrise className="w-5 h-5" />;
      case 'dhuhr': return <Sun className="w-5 h-5" />;
      case 'asr': return <Sun className="w-5 h-5" />;
      case 'maghrib': return <Sunset className="w-5 h-5" />;
      case 'isha': return <Moon className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getPrayerGradient = (prayerKey: string) => {
    switch (prayerKey) {
      case 'fajr': return 'from-indigo-500 to-purple-600';
      case 'sunrise': return 'from-orange-400 to-yellow-500';
      case 'dhuhr': return 'from-yellow-400 to-amber-500';
      case 'asr': return 'from-amber-500 to-orange-500';
      case 'maghrib': return 'from-rose-500 to-pink-600';
      case 'isha': return 'from-blue-600 to-indigo-700';
      default: return 'from-primary to-primary';
    }
  };

  const formatTimeRemaining = (remaining: { hours: number; minutes: number } | null, lang: Language) => {
    if (!remaining) return '';
    const { hours, minutes } = remaining;
    if (lang === 'bn') {
      if (hours > 0) {
        return `${toBengaliNumber(hours)} ঘণ্টা ${toBengaliNumber(minutes)} মিনিট বাকি`;
      }
      return `${toBengaliNumber(minutes)} মিনিট বাকি`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  // Get current location display name
  const getLocationDisplayName = () => {
    const division = getDivisionById(selectedDivision);
    const district = getDistrictById(selectedDivision, selectedDistrict);
    const upazila = getCurrentUpazila();
    
    if (language === 'bn') {
      return `${upazila?.name_bn || ''}, ${district?.name_bn || ''}, ${division?.name_bn || ''}`;
    }
    return `${upazila?.name_en || ''}, ${district?.name_en || ''}, ${division?.name_en || ''}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header for Mobile/Tablet */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border lg:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shrink-0">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className={cn(
                "text-lg sm:text-xl font-bold text-foreground truncate",
                language === "bn" && "font-bengali"
              )}>
                {pageTitle[language]}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h1 className={cn(
          "text-2xl sm:text-3xl font-bold text-foreground mb-2",
          language === "bn" && "font-bengali"
        )}>
          {pageTitle[language]}
        </h1>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-6 max-w-4xl">

        {/* Location Selector - 3 Cascading Dropdowns */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Division Selector */}
            <div>
              <label className={cn(
                "text-sm font-medium text-muted-foreground mb-2 block",
                language === "bn" && "font-bengali"
              )}>
                {divisionLabel[language]}
              </label>
              <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bangladeshDivisions.map(division => (
                    <SelectItem key={division.id} value={division.id}>
                      {language === 'bn' ? division.name_bn : division.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Selector */}
            <div>
              <label className={cn(
                "text-sm font-medium text-muted-foreground mb-2 block",
                language === "bn" && "font-bengali"
              )}>
                {districtLabel[language]}
              </label>
              <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getDistricts().map(district => (
                    <SelectItem key={district.id} value={district.id}>
                      {language === 'bn' ? district.name_bn : district.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upazila Selector */}
            <div>
              <label className={cn(
                "text-sm font-medium text-muted-foreground mb-2 block",
                language === "bn" && "font-bengali"
              )}>
                {upazilaLabel[language]}
              </label>
              <Select value={selectedUpazila} onValueChange={setSelectedUpazila}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getUpazilas().map(upazila => (
                    <SelectItem key={upazila.id} value={upazila.id}>
                      {language === 'bn' ? upazila.name_bn : upazila.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Next Prayer Card */}
        {nextPrayer && (
          <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              {/* Row 1: Label + Prayer Name */}
              <div className="flex items-center justify-between">
                <p className={cn(
                  "text-sm text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {nextPrayerLabel[language]}
                </p>
                <div className="flex items-center gap-2">
                  <h2 className={cn(
                    "text-xl font-bold text-primary",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === 'bn' ? nextPrayer.nameBn : nextPrayer.name}
                  </h2>
                  <span className="text-lg text-primary" dir="rtl">
                    {nextPrayer.nameAr}
                  </span>
                </div>
              </div>
              {/* Row 2: Time + Remaining */}
              <div className="flex items-center justify-between mt-1">
                <p className="text-xl font-semibold text-foreground">
                  {formatTimeDisplay(nextPrayer.time, language)}
                </p>
                {timeRemaining && (
                  <p className={cn(
                    "text-sm text-muted-foreground animate-pulse",
                    language === "bn" && "font-bengali"
                  )}>
                    {formatTimeRemaining(timeRemaining, language)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prayer Times Grid */}
        {prayerTimes && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {(Object.keys(prayerNames) as Array<keyof typeof prayerNames>).map((prayerKey) => {
              const names = prayerNames[prayerKey];
              const timeData = prayerTimes[prayerKey];
              const isNextPrayer = nextPrayer?.name.toLowerCase() === prayerKey;
              
              const isRange = typeof timeData === 'object' && 'start' in timeData;
              const startTime = isRange ? (timeData as PrayerTimeRange).start : (timeData as string);
              const endTime = isRange ? (timeData as PrayerTimeRange).end : null;
              
              return (
                <Card
                  key={prayerKey}
                  className={cn(
                    "transition-all duration-300",
                    isNextPrayer && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  <CardContent className="p-4 text-center">
                    {/* Icon */}
                    <div className={cn(
                      "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                      getPrayerGradient(prayerKey)
                    )}>
                      {getPrayerIcon(prayerKey)}
                    </div>
                    
                    {/* Prayer Name */}
                    <h3 className={cn(
                      "font-semibold text-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {language === 'bn' ? names.bn : names.en}
                    </h3>
                    <p className="text-xs text-primary/70 mb-2" dir="rtl">
                      {names.ar}
                    </p>
                    
                    {/* Time */}
                    {isRange && endTime ? (
                      <p className="text-sm sm:text-base font-bold text-foreground whitespace-nowrap">
                        {formatTimeDisplay(startTime, language)} - {formatTimeDisplay(endTime, language)}
                      </p>
                    ) : (
                      <p className="text-base sm:text-lg font-bold text-foreground">
                        {formatTimeDisplay(startTime, language)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Current Location Info */}
        <Card className="mt-6">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className={cn(
                "text-sm",
                language === "bn" && "font-bengali"
              )}>
                {getLocationDisplayName()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ({location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°) •{' '}
              {language === 'bn' 
                ? 'ইসলামিক ফাউন্ডেশন বাংলাদেশ (হানাফি)' 
                : 'Islamic Foundation Bangladesh (Hanafi)'
              }
            </p>
          </CardContent>
        </Card>

        {/* Islamic Calendar Section */}
        <IslamicCalendarSection language={language} />
      </div>
    </div>
  );
};

export default PrayerTimesPage;
