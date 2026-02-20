import { useState, useEffect, useMemo } from "react";
import { Clock, MapPin, RefreshCw, Sunrise, Sun, Sunset, Moon, Crosshair, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import {
  calculatePrayerTimes,
  getNextPrayer,
  getTimeRemaining,
  prayerNames,
  defaultLocations,
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
import { toBengaliNumber, getCurrentHijriDate, hijriMonths } from "@/data/islamicCalendar";
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
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; totalMinutes: number } | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Auto-detect location on first load
  useEffect(() => {
    const hasManualLocation = localStorage.getItem('prayerTimesBDLocation');
    if (!hasManualLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, city: language === 'bn' ? 'আপনার অবস্থান' : 'Your Location' });
          setSelectedCity('custom');
        },
        () => { /* fallback to default Dhaka */ }
      );
    }
  }, []);

  // Bangladesh hierarchical location selection
  const [selectedDivision, setSelectedDivision] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesBDLocation');
    if (saved) { try { return JSON.parse(saved).divisionId || defaultBangladeshLocation.divisionId; } catch { return defaultBangladeshLocation.divisionId; } }
    return defaultBangladeshLocation.divisionId;
  });
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesBDLocation');
    if (saved) { try { return JSON.parse(saved).districtId || defaultBangladeshLocation.districtId; } catch { return defaultBangladeshLocation.districtId; } }
    return defaultBangladeshLocation.districtId;
  });
  const [selectedUpazila, setSelectedUpazila] = useState<string>(() => {
    const saved = localStorage.getItem('prayerTimesBDLocation');
    if (saved) { try { return JSON.parse(saved).upazilaId || defaultBangladeshLocation.upazilaId; } catch { return defaultBangladeshLocation.upazilaId; } }
    return defaultBangladeshLocation.upazilaId;
  });
  const [useBangladeshLocation, setUseBangladeshLocation] = useState(false);

  const getDistricts = () => getDivisionById(selectedDivision)?.districts || [];
  const getUpazilas = () => getDistrictById(selectedDivision, selectedDistrict)?.upazilas || [];
  const getCurrentUpazila = () => getUpazilaById(selectedDivision, selectedDistrict, selectedUpazila);

  const handleDivisionChange = (divisionId: string) => {
    setSelectedDivision(divisionId);
    const division = getDivisionById(divisionId);
    if (division && division.districts.length > 0) {
      const firstDistrict = division.districts[0];
      setSelectedDistrict(firstDistrict.id);
      if (firstDistrict.upazilas.length > 0) setSelectedUpazila(firstDistrict.upazilas[0].id);
    }
  };
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId);
    const district = getDistrictById(selectedDivision, districtId);
    if (district && district.upazilas.length > 0) setSelectedUpazila(district.upazilas[0].id);
  };
  const handleUpazilaChange = (upazilaId: string) => {
    setSelectedUpazila(upazilaId);
    setTimeout(() => setUseBangladeshLocation(false), 300);
  };

  useEffect(() => {
    if (useBangladeshLocation) {
      localStorage.setItem('prayerTimesBDLocation', JSON.stringify({ divisionId: selectedDivision, districtId: selectedDistrict, upazilaId: selectedUpazila }));
    }
  }, [selectedDivision, selectedDistrict, selectedUpazila, useBangladeshLocation]);

  useEffect(() => {
    if (useBangladeshLocation) {
      const upazila = getCurrentUpazila();
      if (upazila) {
        setLocation({ latitude: upazila.latitude, longitude: upazila.longitude, city: language === 'bn' ? upazila.name_bn : upazila.name_en });
        setSelectedCity('custom');
      }
    }
  }, [selectedUpazila, selectedDistrict, selectedDivision, useBangladeshLocation, language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (nextPrayer) setTimeRemaining(getTimeRemaining(nextPrayer.time));
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer]);

  useEffect(() => {
    const times = calculatePrayerTimes(location, new Date(), 'IFB');
    setPrayerTimes(times);
    const next = getNextPrayer(times);
    setNextPrayer(next);
    if (next) setTimeRemaining(getTimeRemaining(next.time));
    setCurrentPrayer(getCurrentRunningPrayer(times));
  }, [location]);

  const getCurrentRunningPrayer = (times: PrayerTimesType) => {
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
      if (endMins < startMins) {
        if (currentMinutes >= startMins || currentMinutes < endMins)
          return { name: prayer.name, time: prayer.start, endTime: prayer.end, nameAr: prayer.nameAr, nameBn: prayer.nameBn };
      } else {
        if (currentMinutes >= startMins && currentMinutes < endMins)
          return { name: prayer.name, time: prayer.start, endTime: prayer.end, nameAr: prayer.nameAr, nameBn: prayer.nameBn };
      }
    }
    return null;
  };

  const getUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, city: language === 'bn' ? 'আপনার অবস্থান' : 'Your Location' });
          setSelectedCity('custom');
          setUseBangladeshLocation(false);
          setIsLoading(false);
          toast.success(language === 'bn' ? 'অবস্থান পাওয়া গেছে' : 'Location found');
        },
        () => { setIsLoading(false); toast.error(language === 'bn' ? 'অবস্থান পাওয়া যায়নি' : 'Could not get location'); }
      );
    } else { setIsLoading(false); toast.error(language === 'bn' ? 'জিওলোকেশন সাপোর্ট নেই' : 'Geolocation not supported'); }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setUseBangladeshLocation(false);
    if (city !== 'custom' && defaultLocations[city]) setLocation(defaultLocations[city]);
  };

  const enableBangladeshLocation = () => {
    setUseBangladeshLocation(true);
    const upazila = getCurrentUpazila();
    if (upazila) {
      setLocation({ latitude: upazila.latitude, longitude: upazila.longitude, city: language === 'bn' ? upazila.name_bn : upazila.name_en });
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
    if (minutes >= 60) minutes = minutes % 60;
    if (lang === 'bn') {
      const minStr = minutes < 10 ? '০' + toBengaliNumber(minutes) : toBengaliNumber(minutes);
      return `${toBengaliNumber(hours)}:${minStr} ${period}`;
    }
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Short format for the list (no AM/PM for cleaner look)
  const formatTimeShort = (time: string) => {
    if (time === '--:--') return time;
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time;
    const hours = parseInt(match[1], 10);
    let minutes = parseInt(match[2], 10);
    if (minutes >= 60) minutes = minutes % 60;
    if (language === 'bn') {
      const minStr = minutes < 10 ? '০' + toBengaliNumber(minutes) : toBengaliNumber(minutes);
      return `${toBengaliNumber(hours)}:${minStr}`;
    }
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const cityNames: Record<string, { en: string; bn: string; tz: string }> = {
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
    london: { en: 'London', bn: 'লন্ডন', tz: '+00:00' },
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

  // Hijri date
  const hijriDate = useMemo(() => getCurrentHijriDate(), []);
  const hijriMonthName = language === 'bn' ? hijriMonths.bn[hijriDate.month - 1] : hijriMonths.en[hijriDate.month - 1];
  const hijriDay = language === 'bn' ? toBengaliNumber(hijriDate.day) : hijriDate.day;

  // Day name
  const dayNames = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    bn: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
  };
  const today = new Date();
  const dayName = language === 'bn' ? dayNames.bn[today.getDay()] : dayNames.en[today.getDay()];
  const gregDate = language === 'bn'
    ? `${toBengaliNumber(today.getDate())} ${['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'][today.getMonth()]}`
    : `${today.getDate()} ${['January','February','March','April','May','June','July','August','September','October','November','December'][today.getMonth()]}`;

  // Helper to convert a 2-digit string to Bengali
  const toBn2 = (num: number) => {
    const str = num.toString().padStart(2, '0');
    return language === 'bn' ? str.split('').map(d => '০১২৩৪৫৬৭৮৯'[parseInt(d)] || d).join('') : str;
  };

  // Parse time helper (reusable)
  const parseTimeToMins = (timeStr: string): number => {
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

  // Waqt countdown display (for current prayer ending / next prayer starting)
  const countdownDisplay = useMemo(() => {
    if (!timeRemaining) return { h: toBn2(0), m: toBn2(0), s: toBn2(0) };
    const now = new Date();
    const secs = 59 - now.getSeconds();
    return { h: toBn2(timeRemaining.hours), m: toBn2(timeRemaining.minutes), s: toBn2(secs < 0 ? 0 : secs) };
  }, [timeRemaining, currentTime, language]);

  // Iftar countdown (time remaining until Maghrib)
  const iftarCountdown = useMemo(() => {
    if (!prayerTimes) return { h: toBn2(0), m: toBn2(0), s: toBn2(0), passed: true };
    const maghribMins = parseTimeToMins(prayerTimes.maghrib.start);
    if (maghribMins < 0) return { h: toBn2(0), m: toBn2(0), s: toBn2(0), passed: true };
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const currentSecs = now.getSeconds();
    if (currentMins >= maghribMins) return { h: toBn2(0), m: toBn2(0), s: toBn2(0), passed: true };
    const totalSecsLeft = (maghribMins - currentMins) * 60 - currentSecs;
    const h = Math.floor(totalSecsLeft / 3600);
    const m = Math.floor((totalSecsLeft % 3600) / 60);
    const s = totalSecsLeft % 60;
    return { h: toBn2(h), m: toBn2(m), s: toBn2(s < 0 ? 0 : s), passed: false };
  }, [prayerTimes, currentTime, language]);

  // Is it Ramadan?
  const isRamadan = hijriDate.month === 9;

  // Prohibited prayer times (calculated from sunrise, dhuhr, maghrib)
  const prohibitedTimes = useMemo(() => {
    if (!prayerTimes) return null;
    const sunriseMins = parseTimeToMins(prayerTimes.sunrise);
    const dhuhrMins = parseTimeToMins(prayerTimes.dhuhr.start);
    const maghribMins = parseTimeToMins(prayerTimes.maghrib.start);
    if (sunriseMins < 0 || dhuhrMins < 0 || maghribMins < 0) return null;

    // Helper to format minutes back to time string
    const minsToTime = (totalMins: number) => {
      let h = Math.floor(totalMins / 60) % 24;
      const m = totalMins % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      let h12 = h % 12;
      if (h12 === 0) h12 = 12;
      const timeStr = `${h12}:${m.toString().padStart(2, '0')} ${period}`;
      return formatTimeShort(timeStr);
    };

    return {
      morning: { start: minsToTime(sunriseMins), end: minsToTime(sunriseMins + 15) },
      noon: { start: minsToTime(dhuhrMins - 3), end: minsToTime(dhuhrMins) },
      evening: { start: minsToTime(maghribMins - 15), end: minsToTime(maghribMins) },
    };
  }, [prayerTimes, language]);

  // Calculate progress for the circular countdown
  const countdownProgress = useMemo(() => {
    if (!currentPrayer || !prayerTimes) return 0;
    const startMins = parseTimeToMins(currentPrayer.time);
    let endMins = parseTimeToMins(currentPrayer.endTime);
    if (endMins < startMins) endMins += 24 * 60;
    const totalDuration = endMins - startMins;
    const now = new Date();
    let currentMins = now.getHours() * 60 + now.getMinutes();
    if (currentMins < startMins) currentMins += 24 * 60;
    const elapsed = currentMins - startMins;
    return totalDuration > 0 ? Math.min((elapsed / totalDuration) * 100, 100) : 0;
  }, [currentPrayer, prayerTimes, currentTime]);

  // Prayer list for the right side
  const prayerList = useMemo(() => {
    if (!prayerTimes) return [];
    const keys: (keyof typeof prayerNames)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    return keys.map(key => {
      const names = prayerNames[key];
      const timeData = prayerTimes[key] as PrayerTimeRange;
      const isCurrent = currentPrayer?.name.toLowerCase() === key;
      // Check if it's Friday for Dhuhr -> Jumu'ah
      const isFriday = today.getDay() === 5;
      const displayName = key === 'dhuhr' && isFriday
        ? (language === 'bn' ? 'জুমু\'আ' : 'Jumu\'ah')
        : (language === 'bn' ? names.bn : names.en);
      return { key, name: displayName, start: timeData.start, end: timeData.end, isCurrent };
    });
  }, [prayerTimes, currentPrayer, language]);

  // SVG circular progress
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (countdownProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background">
      {/* Location Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className={cn("text-sm font-medium text-foreground truncate", language === 'bn' && 'font-bengali')}>
              {location.city || (language === 'bn' ? 'ঢাকা' : 'Dhaka')}
            </span>
            <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
          </div>
          <Button variant="ghost" size="icon" onClick={getUserLocation} disabled={isLoading} className="h-8 w-8 shrink-0">
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">

        {/* Hijri Date Header */}
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/70 p-5 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn("text-2xl font-bold", language === 'bn' && 'font-bengali')}>
                {hijriDay} {hijriMonthName}
              </h1>
              <p className={cn("text-sm opacity-90", language === 'bn' && 'font-bengali')}>
                {dayName} - {gregDate}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <Sunrise className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="text-lg font-bold">{prayerTimes ? formatTimeShort(prayerTimes.sunrise) : '--:--'}</p>
                <p className="text-[10px] opacity-70">{language === 'bn' ? 'সূর্যোদয়' : 'Sunrise'}</p>
              </div>
              <div className="text-center">
                <Sunset className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="text-lg font-bold">{prayerTimes ? formatTimeShort(prayerTimes.maghrib.start) : '--:--'}</p>
                <p className="text-[10px] opacity-70">{language === 'bn' ? 'সূর্যাস্ত' : 'Sunset'}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Main Content: Countdown + Prayer List */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Countdown Circle */}
              <div className="flex flex-col items-center justify-center p-6 md:p-8 md:border-r border-border">
                {currentPrayer ? (
                  <>
                    <h2 className={cn("text-xl font-bold text-primary mb-1", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? currentPrayer.nameBn : currentPrayer.name}
                    </h2>
                    <p className={cn("text-xs text-muted-foreground mb-6", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? 'ওয়াক্ত শেষ হবে' : 'Waqt ends in'}
                    </p>
                  </>
                ) : nextPrayer ? (
                  <>
                    <h2 className={cn("text-xl font-bold text-primary mb-1", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? nextPrayer.nameBn : nextPrayer.name}
                    </h2>
                    <p className={cn("text-xs text-muted-foreground mb-6", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? 'পরবর্তী নামাজ' : 'Next Prayer'}
                    </p>
                  </>
                ) : null}

                {/* Circular Progress */}
                <div className="relative w-44 h-44 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle cx="80" cy="80" r={circleRadius} fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                    {/* Progress arc */}
                    <circle
                      cx="80" cy="80" r={circleRadius}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  {/* Countdown text in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary tabular-nums tracking-wider">
                      {countdownDisplay.h}:{countdownDisplay.m}:{countdownDisplay.s}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Prayer Times List */}
              <div className="flex flex-col">
                {prayerList.map((prayer, idx) => (
                  <div key={prayer.key}>
                    <div
                      className={cn(
                        "flex items-center justify-between px-5 py-3.5 transition-colors",
                        prayer.isCurrent
                          ? "bg-gradient-to-r from-primary/20 to-primary/10"
                          : "hover:bg-muted/30"
                      )}
                    >
                      <span className={cn(
                        "font-semibold text-sm",
                        prayer.isCurrent ? "text-primary" : "text-foreground",
                        language === 'bn' && 'font-bengali'
                      )}>
                        {prayer.name}
                      </span>
                      <span className={cn(
                        "font-bold text-sm tabular-nums",
                        prayer.isCurrent ? "text-primary" : "text-foreground"
                      )}>
                        {formatTimeShort(prayer.start)} - {formatTimeShort(prayer.end)}
                      </span>
                    </div>
                    {idx < prayerList.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Cards: Sehri & Iftar (only during Ramadan) */}
        {prayerTimes && (
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-primary/15 p-4 text-center">
              <p className="text-lg font-bold text-primary">{formatTimeShort(prayerTimes.fajr.start)}</p>
              <p className={cn("text-xs text-muted-foreground", language === 'bn' && 'font-bengali')}>
                {language === 'bn' ? 'সেহরি শেষ' : 'Sehri ends'}
              </p>
            </div>
            <div className="rounded-xl bg-primary/15 p-4 text-center">
              <p className="text-lg font-bold text-primary">{formatTimeShort(prayerTimes.maghrib.start)}</p>
              <p className={cn("text-xs text-muted-foreground", language === 'bn' && 'font-bengali')}>
                {language === 'bn' ? 'ইফতার শুরু' : 'Iftar starts'}
              </p>
            </div>
            <div className="rounded-xl bg-primary/15 p-4 text-center">
              <p className="text-lg font-bold text-primary tabular-nums">
                {iftarCountdown.passed
                  ? (language === 'bn' ? 'ইফতার হয়েছে' : 'Iftar passed')
                  : `${iftarCountdown.h}:${iftarCountdown.m}:${iftarCountdown.s}`
                }
              </p>
              <p className={cn("text-xs text-muted-foreground", language === 'bn' && 'font-bengali')}>
                {language === 'bn' ? 'ইফতার বাকি' : 'Iftar left'}
              </p>
            </div>
          </div>
        )}

        {/* Prohibited Prayer Times */}
        {prohibitedTimes && (
          <Card>
            <CardContent className="p-4">
              <h3 className={cn("font-semibold text-sm text-foreground mb-3", language === 'bn' && 'font-bengali')}>
                {language === 'bn' ? 'নিষিদ্ধ নামাজের সময়' : 'Prohibited Prayer Times'}
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm text-muted-foreground", language === 'bn' && 'font-bengali')}>
                    {language === 'bn' ? 'সকাল:' : 'Morning:'}
                  </span>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {prohibitedTimes.morning.start} - {prohibitedTimes.morning.end}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm text-muted-foreground", language === 'bn' && 'font-bengali')}>
                    {language === 'bn' ? 'দুপুর:' : 'Noon:'}
                  </span>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {prohibitedTimes.noon.start} - {prohibitedTimes.noon.end}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm text-muted-foreground", language === 'bn' && 'font-bengali')}>
                    {language === 'bn' ? 'সন্ধ্যা:' : 'Evening:'}
                  </span>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {prohibitedTimes.evening.start} - {prohibitedTimes.evening.end}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calculation Method Info */}
        <div className="text-center py-2">
          <p className={cn("text-xs text-muted-foreground", language === 'bn' && 'font-bengali')}>
            {language === 'bn' 
              ? 'হিসাব পদ্ধতি: ইসলামিক ফাউন্ডেশন বাংলাদেশ (হানাফি)' 
              : 'Calculation: Islamic Foundation Bangladesh (Hanafi)'
            }
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrayerTimesPage;
