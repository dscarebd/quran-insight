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
  const [method, setMethod] = useState<CalculationMethod>('IFB');
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

  // Auto-detect calculation method based on coordinates
  const getMethodForLocation = (lat: number, lon: number): CalculationMethod => {
    // Bangladesh: lat ~20-27, lon ~88-93
    if (lat >= 20 && lat <= 27 && lon >= 88 && lon <= 93) return 'IFB';
    
    // Singapore: lat ~1-2, lon ~103-105
    if (lat >= 1 && lat <= 2 && lon >= 103 && lon <= 105) return 'MUIS';
    
    // France: lat ~41-51, lon ~-5 to 10
    if (lat >= 41 && lat <= 51 && lon >= -5 && lon <= 10) return 'UOIF';
    
    // Arabian Peninsula (Saudi, UAE, Qatar, etc.): lat ~12-32, lon ~34-60
    if (lat >= 12 && lat <= 32 && lon >= 34 && lon <= 60) return 'Makkah';
    
    // North America (USA, Canada): lat ~25-72, lon ~-170 to -50
    if (lat >= 25 && lat <= 72 && lon >= -170 && lon <= -50) return 'ISNA';
    
    // Pakistan/India/Afghanistan: lat ~8-37, lon ~60-97 (excluding Bangladesh)
    if (lat >= 8 && lat <= 37 && lon >= 60 && lon <= 97) return 'Karachi';
    
    // Egypt/North Africa: lat ~22-37, lon ~-17 to 35
    if (lat >= 22 && lat <= 37 && lon >= -17 && lon <= 35) return 'Egypt';
    
    // Default to Muslim World League for other regions (Europe, Far East, etc.)
    return 'MWL';
  };

  // Get user's location
  const getUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            city: language === 'bn' ? 'আপনার অবস্থান' : 'Your Location'
          });
          setSelectedCity('custom');
          
          // Auto-detect and set calculation method based on location
          const detectedMethod = getMethodForLocation(latitude, longitude);
          setMethod(detectedMethod);
          
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

  // Bangladesh cities for auto-selecting IFB method
  const bangladeshCities = ['dhaka', 'chittagong', 'sylhet', 'rajshahi'];
  
  // Saudi/Gulf cities for Makkah method
  const saudiCities = ['makkah', 'medina', 'riyadh', 'jeddah'];

  // Handle city change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city !== 'custom' && defaultLocations[city]) {
      setLocation(defaultLocations[city]);
      // Auto-select method based on city
      if (bangladeshCities.includes(city)) {
        setMethod('IFB');
      } else if (saudiCities.includes(city)) {
        setMethod('Makkah');
      }
    }
  };

  const formatTimeDisplay = (time: string, lang: Language) => {
    if (time === '--:--') return time;
    
    // Parse 12-hour format: "5:15 AM" or "7:30 PM"
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time;
    
    const hours = parseInt(match[1], 10);
    let minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    
    // Safety check - minutes should never be >= 60
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

  const cityNames: Record<string, { en: string; bn: string; tz: string }> = {
    // UTC-12 to UTC-1
    baker: { en: 'Baker Island', bn: 'বেকার আইল্যান্ড', tz: '-12:00' },
    samoa: { en: 'Samoa', bn: 'সামোয়া', tz: '-11:00' },
    honolulu: { en: 'Honolulu', bn: 'হনলুলু', tz: '-10:00' },
    anchorage: { en: 'Anchorage', bn: 'অ্যাঙ্কোরেজ', tz: '-09:00' },
    losangeles: { en: 'Los Angeles', bn: 'লস এঞ্জেলেস', tz: '-08:00' },
    denver: { en: 'Denver', bn: 'ডেনভার', tz: '-07:00' },
    chicago: { en: 'Chicago', bn: 'শিকাগো', tz: '-06:00' },
    newyork: { en: 'New York', bn: 'নিউ ইয়র্ক', tz: '-05:00' },
    toronto: { en: 'Toronto', bn: 'টরন্টো', tz: '-05:00' },
    caracas: { en: 'Caracas', bn: 'কারাকাস', tz: '-04:00' },
    saopaulo: { en: 'São Paulo', bn: 'সাও পাওলো', tz: '-03:00' },
    atlantic: { en: 'Atlantic', bn: 'আটলান্টিক', tz: '-02:00' },
    azores: { en: 'Azores', bn: 'আজোরেস', tz: '-01:00' },
    // UTC+0
    london: { en: 'London', bn: 'লন্ডন', tz: '+00:00' },
    // UTC+1 to UTC+6
    paris: { en: 'Paris', bn: 'প্যারিস', tz: '+01:00' },
    cairo: { en: 'Cairo', bn: 'কায়রো', tz: '+02:00' },
    istanbul: { en: 'Istanbul', bn: 'ইস্তাম্বুল', tz: '+03:00' },
    makkah: { en: 'Makkah', bn: 'মক্কা', tz: '+03:00' },
    madinah: { en: 'Madinah', bn: 'মদিনা', tz: '+03:00' },
    dubai: { en: 'Dubai', bn: 'দুবাই', tz: '+04:00' },
    karachi: { en: 'Karachi', bn: 'করাচি', tz: '+05:00' },
    kolkata: { en: 'Kolkata', bn: 'কলকাতা', tz: '+05:30' },
    mumbai: { en: 'Mumbai', bn: 'মুম্বাই', tz: '+05:30' },
    delhi: { en: 'Delhi', bn: 'দিল্লি', tz: '+05:30' },
    kathmandu: { en: 'Kathmandu', bn: 'কাঠমান্ডু', tz: '+05:45' },
    dhaka: { en: 'Dhaka', bn: 'ঢাকা', tz: '+06:00' },
    chittagong: { en: 'Chittagong', bn: 'চট্টগ্রাম', tz: '+06:00' },
    sylhet: { en: 'Sylhet', bn: 'সিলেট', tz: '+06:00' },
    rajshahi: { en: 'Rajshahi', bn: 'রাজশাহী', tz: '+06:00' },
    // UTC+7 to UTC+14
    yangon: { en: 'Yangon', bn: 'ইয়াঙ্গুন', tz: '+06:30' },
    bangkok: { en: 'Bangkok', bn: 'ব্যাংকক', tz: '+07:00' },
    jakarta: { en: 'Jakarta', bn: 'জাকার্তা', tz: '+07:00' },
    singapore: { en: 'Singapore', bn: 'সিঙ্গাপুর', tz: '+08:00' },
    kualalumpur: { en: 'Kuala Lumpur', bn: 'কুয়ালালামপুর', tz: '+08:00' },
    hongkong: { en: 'Hong Kong', bn: 'হংকং', tz: '+08:00' },
    beijing: { en: 'Beijing', bn: 'বেইজিং', tz: '+08:00' },
    tokyo: { en: 'Tokyo', bn: 'টোকিও', tz: '+09:00' },
    seoul: { en: 'Seoul', bn: 'সিউল', tz: '+09:00' },
    sydney: { en: 'Sydney', bn: 'সিডনি', tz: '+11:00' },
    melbourne: { en: 'Melbourne', bn: 'মেলবোর্ন', tz: '+11:00' },
    fiji: { en: 'Fiji', bn: 'ফিজি', tz: '+12:00' },
    auckland: { en: 'Auckland', bn: 'অকল্যান্ড', tz: '+13:00' },
    samoa_east: { en: 'Samoa (East)', bn: 'সামোয়া (পূর্ব)', tz: '+14:00' },
    custom: { en: 'Your Location', bn: 'আপনার অবস্থান', tz: '' },
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

        {/* Location & Settings */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Row 1: Location & Calculation Method - 50/50 */}
            <div className="grid grid-cols-2 gap-3">
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
                    {Object.keys(cityNames).filter(c => c !== 'custom' || selectedCity === 'custom').map(city => {
                      const cityData = cityNames[city];
                      const name = language === 'bn' ? cityData.bn : cityData.en;
                      const tzDisplay = cityData.tz ? ` (${cityData.tz})` : '';
                      return (
                        <SelectItem key={city} value={city}>
                          {name}{tzDisplay}
                        </SelectItem>
                      );
                    })}
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
                    <SelectItem value="IFB">{language === 'bn' ? 'ইসলামিক ফাউন্ডেশন বাংলাদেশ' : 'Islamic Foundation Bangladesh'}</SelectItem>
                    <SelectItem value="Karachi">{language === 'bn' ? 'করাচি বিশ্ববিদ্যালয়' : 'University of Karachi'}</SelectItem>
                    <SelectItem value="MWL">{language === 'bn' ? 'মুসলিম ওয়ার্ল্ড লীগ' : 'Muslim World League'}</SelectItem>
                    <SelectItem value="ISNA">{language === 'bn' ? 'ইসলামিক সোসাইটি অফ নর্থ আমেরিকা' : 'ISNA (North America)'}</SelectItem>
                    <SelectItem value="Egypt">{language === 'bn' ? 'মিশর জেনারেল অথরিটি' : 'Egyptian General Authority'}</SelectItem>
                    <SelectItem value="Makkah">{language === 'bn' ? 'উম্মুল কুরা (মক্কা)' : 'Umm al-Qura (Makkah)'}</SelectItem>
                    <SelectItem value="UOIF">{language === 'bn' ? 'ফ্রান্স ইসলামিক সংগঠন' : 'UOIF (France)'}</SelectItem>
                    <SelectItem value="MUIS">{language === 'bn' ? 'সিঙ্গাপুর ইসলামিক কাউন্সিল' : 'MUIS (Singapore)'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Use Location Button - Full Width */}
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
                    
                    {/* Time - Show range in one line or single time */}
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
                {location.city || (language === 'bn' ? 'অজানা অবস্থান' : 'Unknown Location')}
              </span>
              <span className="text-xs">
                ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'bn' 
                ? 'হিসাব পদ্ধতি: হানাফি' 
                : 'Calculation Method: Hanafi'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrayerTimesPage;
