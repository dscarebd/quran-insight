import { useState, useEffect } from "react";
import { Clock, MapPin, RefreshCw, Sunrise, Sun, Sunset, Moon, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IslamicCalendarSection from "@/components/IslamicCalendarSection";
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
import {
  bangladeshDivisions,
  getDivisionById,
  getDistrictById,
  getUpazilaById,
  defaultBangladeshLocation,
} from "@/data/bangladeshLocations";
import { toBengaliNumber } from "@/data/islamicCalendar";
import { toast } from "sonner";

interface PrayerTimesProps {
  language: Language;
}

const PrayerTimesPage = ({ language }: PrayerTimesProps) => {
  const [location, setLocation] = useState<Location>(defaultLocations.dhaka);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; nameAr: string; nameBn: string } | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<{ name: string; time: string; endTime: string; nameAr: string; nameBn: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('dhaka');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number } | null>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Bangladesh hierarchical location selection (replaces calculation method)
  const [selectedDivision, setSelectedDivision] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesBDLocation');
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
    const saved = localStorage.getItem('prayerTimesBDLocation');
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
    const saved = localStorage.getItem('prayerTimesBDLocation');
    if (saved) {
      try {
        return JSON.parse(saved).upazilaId || defaultBangladeshLocation.upazilaId;
      } catch {
        return defaultBangladeshLocation.upazilaId;
      }
    }
    return defaultBangladeshLocation.upazilaId;
  });

  // Track if using Bangladesh location
  const [useBangladeshLocation, setUseBangladeshLocation] = useState(false);

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

  const useLocationLabel = {
    en: 'Use My Location',
    bn: 'আমার অবস্থান ব্যবহার করুন',
    hi: 'मेरा स्थान उपयोग करें'
  };

  const bdLocationLabel = {
    en: 'Bangladesh Location (Detailed)',
    bn: 'বাংলাদেশ অবস্থান (বিস্তারিত)',
    hi: 'बांग्लादेश स्थान (विस्तृत)'
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

  // Handle upazila change - auto close after selection
  const handleUpazilaChange = (upazilaId: string) => {
    setSelectedUpazila(upazilaId);
    // Auto close the dropdown after a brief delay
    setTimeout(() => {
      setUseBangladeshLocation(false);
    }, 300);
  };

  // Save Bangladesh location to localStorage
  useEffect(() => {
    if (useBangladeshLocation) {
      localStorage.setItem('prayerTimesBDLocation', JSON.stringify({
        divisionId: selectedDivision,
        districtId: selectedDistrict,
        upazilaId: selectedUpazila
      }));
    }
  }, [selectedDivision, selectedDistrict, selectedUpazila, useBangladeshLocation]);

  // Update location when Bangladesh upazila changes
  useEffect(() => {
    if (useBangladeshLocation) {
      const upazila = getCurrentUpazila();
      if (upazila) {
        setLocation({
          latitude: upazila.latitude,
          longitude: upazila.longitude,
          city: language === 'bn' ? upazila.name_bn : upazila.name_en
        });
        setSelectedCity('custom');
      }
    }
  }, [selectedUpazila, selectedDistrict, selectedDivision, useBangladeshLocation, language]);

  // Get current running prayer based on current time
  const getCurrentRunningPrayer = (times: PrayerTimesType): { name: string; time: string; endTime: string; nameAr: string; nameBn: string } | null => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const parseTime = (timeStr: string): number => {
      if (timeStr === '--:--') return -1;
      const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return -1;
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3].toUpperCase();
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const prayers = [
      { key: 'fajr', name: 'Fajr', nameAr: 'الفجر', nameBn: 'ফজর', start: times.fajr.start, end: times.fajr.end },
      { key: 'dhuhr', name: 'Dhuhr', nameAr: 'الظهر', nameBn: 'যোহর', start: times.dhuhr.start, end: times.dhuhr.end },
      { key: 'asr', name: 'Asr', nameAr: 'العصر', nameBn: 'আসর', start: times.asr.start, end: times.asr.end },
      { key: 'maghrib', name: 'Maghrib', nameAr: 'المغرب', nameBn: 'মাগরিব', start: times.maghrib.start, end: times.maghrib.end },
      { key: 'isha', name: 'Isha', nameAr: 'العشاء', nameBn: 'ইশা', start: times.isha.start, end: times.isha.end },
    ];

    for (const prayer of prayers) {
      const startMins = parseTime(prayer.start);
      let endMins = parseTime(prayer.end);
      
      // Handle overnight (Isha to Fajr)
      if (endMins < startMins) {
        // If current time is after start OR before end (next day)
        if (currentMinutes >= startMins || currentMinutes < endMins) {
          return { name: prayer.name, time: prayer.start, endTime: prayer.end, nameAr: prayer.nameAr, nameBn: prayer.nameBn };
        }
      } else {
        if (currentMinutes >= startMins && currentMinutes < endMins) {
          return { name: prayer.name, time: prayer.start, endTime: prayer.end, nameAr: prayer.nameAr, nameBn: prayer.nameBn };
        }
      }
    }
    
    return null;
  };

  // Calculate prayer times when location changes (always use IFB for Bangladesh)
  useEffect(() => {
    const times = calculatePrayerTimes(location, new Date(), 'IFB');
    setPrayerTimes(times);
    const next = getNextPrayer(times);
    setNextPrayer(next);
    if (next) {
      setTimeRemaining(getTimeRemaining(next.time));
    }
    
    // Get current running prayer
    const current = getCurrentRunningPrayer(times);
    setCurrentPrayer(current);
  }, [location]);

  // Update current time every second for countdown and current prayer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (prayerTimes) {
        // Update time remaining
        const next = getNextPrayer(prayerTimes);
        if (next) {
          setNextPrayer(next);
          setTimeRemaining(getTimeRemaining(next.time));
        }
        // Update current prayer
        const current = getCurrentRunningPrayer(prayerTimes);
        setCurrentPrayer(current);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  // Get user's location via GPS
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
          setUseBangladeshLocation(false);
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
    setUseBangladeshLocation(false);
    if (city !== 'custom' && defaultLocations[city]) {
      setLocation(defaultLocations[city]);
    }
  };

  // Enable Bangladesh detailed location
  const enableBangladeshLocation = () => {
    setUseBangladeshLocation(true);
    const upazila = getCurrentUpazila();
    if (upazila) {
      setLocation({
        latitude: upazila.latitude,
        longitude: upazila.longitude,
        city: language === 'bn' ? upazila.name_bn : upazila.name_en
      });
      setSelectedCity('custom');
    }
  };

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
                "text-lg sm:text-xl font-semibold text-foreground truncate",
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
          "text-lg sm:text-xl font-semibold text-foreground mb-2",
          language === "bn" && "font-bengali"
        )}>
          {pageTitle[language]}
        </h1>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-6 max-w-4xl">

        {/* Location & Settings */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* All 3 controls in 1 row on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-3">
              {/* City Selection - Desktop only */}
              <div className="hidden lg:block lg:flex-1">
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

              {/* Bangladesh Location Button - Desktop */}
              <div className="hidden lg:block lg:flex-1">
                <Button
                  variant={useBangladeshLocation ? "default" : "outline"}
                  onClick={enableBangladeshLocation}
                  className={cn(
                    "w-full h-10",
                    language === "bn" && "font-bengali"
                  )}
                >
                  <MapPin className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate">
                    {getCurrentUpazila() 
                      ? (language === 'bn' ? getCurrentUpazila()?.name_bn : getCurrentUpazila()?.name_en)
                      : bdLocationLabel[language]
                    }
                  </span>
                </Button>
              </div>

              {/* GPS Location Button - Desktop */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={getUserLocation}
                  disabled={isLoading}
                  className="h-10 w-10"
                  title={useLocationLabel[language]}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Crosshair className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Mobile: Bangladesh button + GPS button inline */}
              <div className="flex lg:hidden gap-2">
                <Button
                  variant={useBangladeshLocation ? "default" : "outline"}
                  onClick={enableBangladeshLocation}
                  className={cn(
                    "flex-1 h-10",
                    language === "bn" && "font-bengali"
                  )}
                >
                  <MapPin className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate">
                    {getCurrentUpazila() 
                      ? (language === 'bn' ? getCurrentUpazila()?.name_bn : getCurrentUpazila()?.name_en)
                      : bdLocationLabel[language]
                    }
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={getUserLocation}
                  disabled={isLoading}
                  className="h-10 w-10 shrink-0"
                  title={useLocationLabel[language]}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Crosshair className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Bangladesh Cascading Dropdowns - Full Width Below */}
            {useBangladeshLocation && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 pt-4 border-t">
                {/* Division */}
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

                {/* District */}
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

                {/* Upazila */}
                <div>
                  <label className={cn(
                    "text-sm font-medium text-muted-foreground mb-2 block",
                    language === "bn" && "font-bengali"
                  )}>
                    {upazilaLabel[language]}
                  </label>
                  <Select value={selectedUpazila} onValueChange={handleUpazilaChange}>
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current & Next Prayer Card */}
        {(currentPrayer || nextPrayer) && (
          <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className={cn(
                "flex items-center gap-4",
                currentPrayer && nextPrayer ? "justify-between" : "justify-center"
              )}>
                {/* Current Running Prayer */}
                {currentPrayer && (
                  <div className={cn("flex items-center gap-3", !nextPrayer && "text-center flex-col")}>
                    <div>
                      <p className={cn(
                        "text-xs text-muted-foreground",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === 'bn' ? 'চলমান নামাজ' : 'Current Prayer'}
                      </p>
                      <div className={cn("flex items-center gap-1.5", !nextPrayer && "justify-center")}>
                        <span className={cn(
                          "text-base font-bold text-emerald-600 dark:text-emerald-400",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === 'bn' ? currentPrayer.nameBn : currentPrayer.name}
                        </span>
                        <span className="text-sm text-emerald-600 dark:text-emerald-400" dir="rtl">
                          {currentPrayer.nameAr}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm font-medium text-emerald-600 dark:text-emerald-400",
                        language === "bn" && "font-bengali"
                      )}>
                        {formatTimeDisplay(currentPrayer.time, language)} - {formatTimeDisplay(currentPrayer.endTime, language)}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Next Prayer */}
                {nextPrayer && (
                  <div className={cn(!currentPrayer ? "text-center" : "text-right")}>
                    <p className={cn(
                      "text-xs text-muted-foreground",
                      language === "bn" && "font-bengali"
                    )}>
                      {nextPrayerLabel[language]}
                    </p>
                    <div className={cn("flex items-center gap-1.5", !currentPrayer ? "justify-center" : "justify-end")}>
                      <span className={cn(
                        "text-base font-bold text-primary",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === 'bn' ? nextPrayer.nameBn : nextPrayer.name}
                      </span>
                      <span className="text-sm text-primary" dir="rtl">
                        {nextPrayer.nameAr}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm font-medium text-primary",
                      language === "bn" && "font-bengali"
                    )}>
                      {formatTimeDisplay(nextPrayer.time, language)}
                    </p>
                    {timeRemaining && (
                      <p className={cn(
                        "text-xs text-muted-foreground animate-pulse",
                        language === "bn" && "font-bengali"
                      )}>
                        {formatTimeRemaining(timeRemaining, language)}
                      </p>
                    )}
                  </div>
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
              const isCurrentPrayer = currentPrayer?.name.toLowerCase() === prayerKey;
              
              const isRange = typeof timeData === 'object' && 'start' in timeData;
              const startTime = isRange ? (timeData as PrayerTimeRange).start : (timeData as string);
              const endTime = isRange ? (timeData as PrayerTimeRange).end : null;
              
              return (
                <Card
                  key={prayerKey}
                  className={cn(
                    "transition-all duration-300",
                    isCurrentPrayer && "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background"
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
                {location.city || (language === 'bn' ? 'অজানা অবস্থান' : 'Unknown Location')}
              </span>
              <span className="text-xs">
                ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'bn' 
                ? 'হিসাব পদ্ধতি: ইসলামিক ফাউন্ডেশন বাংলাদেশ (হানাফি)' 
                : 'Calculation Method: Islamic Foundation Bangladesh (Hanafi)'
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
