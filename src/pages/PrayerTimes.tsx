import { useState, useEffect } from "react";
import { Clock, MapPin, RefreshCw, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  calculatePrayerTimes,
  getNextPrayer,
  getTimeRemaining,
  prayerNames,
  defaultLocations,
  PrayerTimes as PrayerTimesType,
  PrayerTimeRange,
  Location,
  CalculationMethod
} from "@/data/prayerTimes";
import { toBengaliNumber } from "@/data/islamicCalendar";
import { toast } from "sonner";

interface PrayerTimesProps {
  language: Language;
}

const PrayerTimesPage = ({ language }: PrayerTimesProps) => {
  const [location, setLocation] = useState<Location>(defaultLocations.dhaka);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; nameAr: string; nameBn: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('dhaka');
  const [method, setMethod] = useState<CalculationMethod>('Karachi');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number } | null>(null);

  const pageTitle = {
    en: 'Prayer Times',
    bn: 'নামাজের সময়',
    hi: 'नमाज़ का समय'
  };

  const locationLabel = {
    en: 'Location',
    bn: 'অবস্থান',
    hi: 'स्थान'
  };

  const methodLabel = {
    en: 'Calculation Method',
    bn: 'হিসাব পদ্ধতি',
    hi: 'गणना विधि'
  };

  const nextPrayerLabel = {
    en: 'Next Prayer',
    bn: 'পরবর্তী নামাজ',
    hi: 'अगली नमाज़'
  };

  const useLocationLabel = {
    en: 'Use My Location',
    bn: 'আমার অবস্থান ব্যবহার করুন',
    hi: 'मेरा स्थान उपयोग करें'
  };

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (nextPrayer) {
        const remaining = getTimeRemaining(nextPrayer.time);
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer]);

  // Calculate prayer times when location or method changes
  useEffect(() => {
    const times = calculatePrayerTimes(location, new Date(), method);
    setPrayerTimes(times);
    const next = getNextPrayer(times);
    setNextPrayer(next);
    if (next) {
      setTimeRemaining(getTimeRemaining(next.time));
    }
  }, [location, method]);

  // Get user's location
  const getUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: language === 'bn' ? 'আপনার অবস্থান' : 'Your Location'
          });
          setSelectedCity('custom');
          setIsLoading(false);
          toast.success(language === 'bn' ? 'অবস্থান পাওয়া গেছে' : 'Location found');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLoading(false);
          toast.error(language === 'bn' ? 'অবস্থান পাওয়া যায়নি' : 'Could not get location');
        }
      );
    } else {
      setIsLoading(false);
      toast.error(language === 'bn' ? 'জিওলোকেশন সাপোর্ট নেই' : 'Geolocation not supported');
    }
  };

  // Handle city change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city !== 'custom' && defaultLocations[city]) {
      setLocation(defaultLocations[city]);
    }
  };

  const formatTimeDisplay = (time: string, lang: Language) => {
    if (time === '--:--') return time;
    
    // Parse 12-hour format: "5:15 AM" or "7:30 PM"
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time;
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    
    if (lang === 'bn') {
      const periodBn = period === 'AM' ? 'AM' : 'PM';
      return `${toBengaliNumber(hours)}:${toBengaliNumber(minutes).padStart(2, '০')} ${periodBn}`;
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

  const cityNames: Record<string, { en: string; bn: string }> = {
    dhaka: { en: 'Dhaka', bn: 'ঢাকা' },
    chittagong: { en: 'Chittagong', bn: 'চট্টগ্রাম' },
    sylhet: { en: 'Sylhet', bn: 'সিলেট' },
    rajshahi: { en: 'Rajshahi', bn: 'রাজশাহী' },
    kolkata: { en: 'Kolkata', bn: 'কলকাতা' },
    mumbai: { en: 'Mumbai', bn: 'মুম্বাই' },
    delhi: { en: 'Delhi', bn: 'দিল্লি' },
    makkah: { en: 'Makkah', bn: 'মক্কা' },
    madinah: { en: 'Madinah', bn: 'মদিনা' },
    dubai: { en: 'Dubai', bn: 'দুবাই' },
    cairo: { en: 'Cairo', bn: 'কায়রো' },
    istanbul: { en: 'Istanbul', bn: 'ইস্তাম্বুল' },
    jakarta: { en: 'Jakarta', bn: 'জাকার্তা' },
    kualalumpur: { en: 'Kuala Lumpur', bn: 'কুয়ালালামপুর' },
    london: { en: 'London', bn: 'লন্ডন' },
    newyork: { en: 'New York', bn: 'নিউ ইয়র্ক' },
    toronto: { en: 'Toronto', bn: 'টরন্টো' },
    sydney: { en: 'Sydney', bn: 'সিডনি' },
    custom: { en: 'Your Location', bn: 'আপনার অবস্থান' },
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
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

        {/* Location & Settings */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {/* City Selection */}
              <div>
                <label className={cn(
                  "text-sm font-medium text-muted-foreground mb-2 block",
                  language === "bn" && "font-bengali"
                )}>
                  {locationLabel[language]}
                </label>
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cityNames).filter(c => c !== 'custom' || selectedCity === 'custom').map(city => (
                      <SelectItem key={city} value={city}>
                        {language === 'bn' ? cityNames[city].bn : cityNames[city].en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calculation Method */}
              <div>
                <label className={cn(
                  "text-sm font-medium text-muted-foreground mb-2 block",
                  language === "bn" && "font-bengali"
                )}>
                  {methodLabel[language]}
                </label>
                <Select value={method} onValueChange={(v) => setMethod(v as CalculationMethod)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MWL">Muslim World League</SelectItem>
                    <SelectItem value="ISNA">ISNA</SelectItem>
                    <SelectItem value="Egypt">Egypt</SelectItem>
                    <SelectItem value="Makkah">Umm al-Qura (Makkah)</SelectItem>
                    <SelectItem value="Karachi">Karachi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Use Location Button */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={getUserLocation}
                  disabled={isLoading}
                  className={cn(
                    "w-full",
                    language === "bn" && "font-bengali"
                  )}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-2" />
                  )}
                  {useLocationLabel[language]}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Prayer Card */}
        {nextPrayer && (
          <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className={cn(
                "text-sm text-muted-foreground mb-2",
                language === "bn" && "font-bengali"
              )}>
                {nextPrayerLabel[language]}
              </p>
              <div className="flex items-center justify-center gap-3">
                <h2 className={cn(
                  "text-3xl font-bold text-primary",
                  language === "bn" && "font-bengali"
                )}>
                  {language === 'bn' ? nextPrayer.nameBn : nextPrayer.name}
                </h2>
                <span className="text-xl text-primary" dir="rtl">
                  {nextPrayer.nameAr}
                </span>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-2">
                {formatTimeDisplay(nextPrayer.time, language)}
              </p>
              {/* Time Remaining Countdown */}
              {timeRemaining && (
                <p className={cn(
                  "text-sm text-muted-foreground mt-2 animate-pulse",
                  language === "bn" && "font-bengali"
                )}>
                  {formatTimeRemaining(timeRemaining, language)}
                </p>
              )}
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
              
              // Check if it's a range or single time (sunrise)
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
                    
                    {/* Time - Show range or single time */}
                    {isRange && endTime ? (
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-foreground">
                          {formatTimeDisplay(startTime, language)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'bn' ? 'থেকে' : 'to'}
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {formatTimeDisplay(endTime, language)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-foreground">
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
                {location.city || (language === 'bn' ? 'অজানা অবস্থান' : 'Unknown Location')}
              </span>
              <span className="text-xs">
                ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'bn' 
                ? `হিসাব পদ্ধতি: ${method}` 
                : `Calculation Method: ${method}`
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrayerTimesPage;
