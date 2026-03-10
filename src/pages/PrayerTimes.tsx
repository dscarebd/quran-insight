import { useState, useEffect, useMemo, useRef } from "react";
import { Clock, MapPin, RefreshCw, Sunrise, Sun, Sunset, Moon, Crosshair, ChevronDown, Globe, Flag } from "lucide-react";
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
import { getCurrentPosition } from "@/utils/geolocation";

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
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationTab, setLocationTab] = useState<'bangladesh' | 'world'>('bangladesh');
  const locationPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Auto-detect location on first load
  useEffect(() => {
    const hasManualLocation = localStorage.getItem('prayerTimesBDLocation');
    const savedLat = localStorage.getItem('prayer-lat');
    const savedLng = localStorage.getItem('prayer-lng');
    const savedCity = localStorage.getItem('prayer-city');

    if (hasManualLocation) {
      // Use saved Bangladesh location
      setUseBangladeshLocation(true);
    } else if (savedLat && savedLng) {
      // Use saved GPS location
      setLocation({ latitude: parseFloat(savedLat), longitude: parseFloat(savedLng), city: savedCity || (language === 'bn' ? 'আপনার অবস্থান' : 'Your Location') });
      setSelectedCity('custom');
    } else {
      // Try GPS (works on both web and native APK)
      getCurrentPosition().then(async ({ latitude, longitude }) => {
        let cityName = language === 'bn' ? 'আপনার অবস্থান' : 'Your Location';
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${language === 'bn' ? 'bn' : 'en'}`);
          if (res.ok) {
            const data = await res.json();
            const addr = data.address;
            cityName = addr?.city || addr?.town || addr?.village || addr?.county || addr?.state || cityName;
          }
        } catch { /* ignore */ }
        setLocation({ latitude, longitude, city: cityName });
        setSelectedCity('custom');
        localStorage.setItem('prayer-lat', String(latitude));
        localStorage.setItem('prayer-lng', String(longitude));
        localStorage.setItem('prayer-city', cityName);
      }).catch(() => { /* fallback to default Dhaka */ });
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
    enableBangladeshLocation();
    setTimeout(() => setShowLocationPicker(false), 300);
  };

  // Close location picker on outside click (ignore Select portaled content)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside a Radix Select portal
      if (target.closest('[data-radix-popper-content-wrapper]') || target.closest('[role="listbox"]') || target.closest('[role="option"]')) {
        return;
      }
      if (locationPickerRef.current && !locationPickerRef.current.contains(target)) {
        setShowLocationPicker(false);
      }
    };
    if (showLocationPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLocationPicker]);

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

  const getUserLocation = async () => {
    setIsLoading(true);
    try {
      const { latitude, longitude } = await getCurrentPosition();
      let cityName = language === 'bn' ? 'আপনার অবস্থান' : 'Your Location';

      // Reverse geocode to get city name
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${language === 'bn' ? 'bn' : 'en'}`);
        if (res.ok) {
          const data = await res.json();
          const addr = data.address;
          cityName = addr?.city || addr?.town || addr?.village || addr?.county || addr?.state || cityName;
        }
      } catch {
        // Keep default name on fetch failure
      }

      setLocation({ latitude, longitude, city: cityName });
      setSelectedCity('custom');
      setUseBangladeshLocation(false);

      // Save GPS location for persistence
      localStorage.setItem('prayer-lat', String(latitude));
      localStorage.setItem('prayer-lng', String(longitude));
      localStorage.setItem('prayer-city', cityName);
      localStorage.removeItem('prayerTimesBDLocation');

      setIsLoading(false);
      toast.success(language === 'bn' ? `অবস্থান পাওয়া গেছে: ${cityName}` : `Location found: ${cityName}`);
    } catch (err: any) {
      setIsLoading(false);
      if (err?.message === 'PERMISSION_DENIED') {
        toast.error(language === 'bn' ? 'অবস্থান অনুমতি প্রত্যাখ্যাত। সেটিংস থেকে অনুমতি দিন।' : 'Location permission denied. Please allow in settings.');
      } else if (err?.message === 'TIMEOUT') {
        toast.error(language === 'bn' ? 'অবস্থান খুঁজতে সময় শেষ হয়েছে' : 'Location request timed out');
      } else {
        toast.error(language === 'bn' ? 'অবস্থান পাওয়া যায়নি' : 'Could not get location');
      }
    }
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
    // Americas
    newyork: { en: 'New York', bn: 'নিউ ইয়র্ক', tz: '-05:00' },
    toronto: { en: 'Toronto', bn: 'টরন্টো', tz: '-05:00' },
    chicago: { en: 'Chicago', bn: 'শিকাগো', tz: '-06:00' },
    losangeles: { en: 'Los Angeles', bn: 'লস এঞ্জেলেস', tz: '-08:00' },
    houston: { en: 'Houston', bn: 'হিউস্টন', tz: '-06:00' },
    detroit: { en: 'Detroit', bn: 'ডেট্রয়েট', tz: '-05:00' },
    washington: { en: 'Washington DC', bn: 'ওয়াশিংটন ডিসি', tz: '-05:00' },
    montreal: { en: 'Montreal', bn: 'মন্ট্রিল', tz: '-05:00' },
    saopaulo: { en: 'São Paulo', bn: 'সাও পাওলো', tz: '-03:00' },
    buenosaires: { en: 'Buenos Aires', bn: 'বুয়েনস আইরেস', tz: '-03:00' },
    // Europe
    london: { en: 'London', bn: 'লন্ডন', tz: '+00:00' },
    birmingham: { en: 'Birmingham', bn: 'বার্মিংহাম', tz: '+00:00' },
    paris: { en: 'Paris', bn: 'প্যারিস', tz: '+01:00' },
    berlin: { en: 'Berlin', bn: 'বার্লিন', tz: '+01:00' },
    amsterdam: { en: 'Amsterdam', bn: 'আমস্টারডাম', tz: '+01:00' },
    brussels: { en: 'Brussels', bn: 'ব্রাসেলস', tz: '+01:00' },
    rome: { en: 'Rome', bn: 'রোম', tz: '+01:00' },
    madrid: { en: 'Madrid', bn: 'মাদ্রিদ', tz: '+01:00' },
    vienna: { en: 'Vienna', bn: 'ভিয়েনা', tz: '+01:00' },
    moscow: { en: 'Moscow', bn: 'মস্কো', tz: '+03:00' },
    istanbul: { en: 'Istanbul', bn: 'ইস্তাম্বুল', tz: '+03:00' },
    ankara: { en: 'Ankara', bn: 'আঙ্কারা', tz: '+03:00' },
    athens: { en: 'Athens', bn: 'এথেন্স', tz: '+02:00' },
    stockholm: { en: 'Stockholm', bn: 'স্টকহোম', tz: '+01:00' },
    oslo: { en: 'Oslo', bn: 'অসলো', tz: '+01:00' },
    // Middle East
    makkah: { en: 'Makkah', bn: 'মক্কা', tz: '+03:00' },
    madinah: { en: 'Madinah', bn: 'মদিনা', tz: '+03:00' },
    riyadh: { en: 'Riyadh', bn: 'রিয়াদ', tz: '+03:00' },
    jeddah: { en: 'Jeddah', bn: 'জেদ্দা', tz: '+03:00' },
    dubai: { en: 'Dubai', bn: 'দুবাই', tz: '+04:00' },
    abudhabi: { en: 'Abu Dhabi', bn: 'আবু ধাবি', tz: '+04:00' },
    doha: { en: 'Doha', bn: 'দোহা', tz: '+03:00' },
    kuwait: { en: 'Kuwait City', bn: 'কুয়েত সিটি', tz: '+03:00' },
    muscat: { en: 'Muscat', bn: 'মাসকাট', tz: '+04:00' },
    manama: { en: 'Manama', bn: 'মানামা', tz: '+03:00' },
    baghdad: { en: 'Baghdad', bn: 'বাগদাদ', tz: '+03:00' },
    tehran: { en: 'Tehran', bn: 'তেহরান', tz: '+03:30' },
    amman: { en: 'Amman', bn: 'আম্মান', tz: '+03:00' },
    beirut: { en: 'Beirut', bn: 'বৈরুত', tz: '+02:00' },
    jerusalem: { en: 'Jerusalem', bn: 'জেরুজালেম', tz: '+02:00' },
    cairo: { en: 'Cairo', bn: 'কায়রো', tz: '+02:00' },
    alexandria: { en: 'Alexandria', bn: 'আলেকজান্দ্রিয়া', tz: '+02:00' },
    // Africa
    casablanca: { en: 'Casablanca', bn: 'কাসাব্লাঙ্কা', tz: '+01:00' },
    tunis: { en: 'Tunis', bn: 'তিউনিস', tz: '+01:00' },
    algiers: { en: 'Algiers', bn: 'আলজিয়ার্স', tz: '+01:00' },
    tripoli: { en: 'Tripoli', bn: 'ত্রিপোলি', tz: '+02:00' },
    khartoum: { en: 'Khartoum', bn: 'খার্তুম', tz: '+02:00' },
    lagos: { en: 'Lagos', bn: 'লাগোস', tz: '+01:00' },
    nairobi: { en: 'Nairobi', bn: 'নাইরোবি', tz: '+03:00' },
    johannesburg: { en: 'Johannesburg', bn: 'জোহানেসবার্গ', tz: '+02:00' },
    addisababa: { en: 'Addis Ababa', bn: 'আদ্দিস আবাবা', tz: '+03:00' },
    dakar: { en: 'Dakar', bn: 'ডাকার', tz: '+00:00' },
    // South Asia
    dhaka: { en: 'Dhaka', bn: 'ঢাকা', tz: '+06:00' },
    chittagong: { en: 'Chittagong', bn: 'চট্টগ্রাম', tz: '+06:00' },
    sylhet: { en: 'Sylhet', bn: 'সিলেট', tz: '+06:00' },
    rajshahi: { en: 'Rajshahi', bn: 'রাজশাহী', tz: '+06:00' },
    khulna: { en: 'Khulna', bn: 'খুলনা', tz: '+06:00' },
    barishal: { en: 'Barishal', bn: 'বরিশাল', tz: '+06:00' },
    rangpur: { en: 'Rangpur', bn: 'রংপুর', tz: '+06:00' },
    mymensingh: { en: 'Mymensingh', bn: 'ময়মনসিংহ', tz: '+06:00' },
    kolkata: { en: 'Kolkata', bn: 'কলকাতা', tz: '+05:30' },
    mumbai: { en: 'Mumbai', bn: 'মুম্বাই', tz: '+05:30' },
    delhi: { en: 'Delhi', bn: 'দিল্লি', tz: '+05:30' },
    hyderabad: { en: 'Hyderabad', bn: 'হায়দরাবাদ', tz: '+05:30' },
    lucknow: { en: 'Lucknow', bn: 'লখনৌ', tz: '+05:30' },
    chennai: { en: 'Chennai', bn: 'চেন্নাই', tz: '+05:30' },
    karachi: { en: 'Karachi', bn: 'করাচি', tz: '+05:00' },
    lahore: { en: 'Lahore', bn: 'লাহোর', tz: '+05:00' },
    islamabad: { en: 'Islamabad', bn: 'ইসলামাবাদ', tz: '+05:00' },
    kathmandu: { en: 'Kathmandu', bn: 'কাঠমান্ডু', tz: '+05:45' },
    colombo: { en: 'Colombo', bn: 'কলম্বো', tz: '+05:30' },
    kabul: { en: 'Kabul', bn: 'কাবুল', tz: '+04:30' },
    tashkent: { en: 'Tashkent', bn: 'তাশখন্দ', tz: '+05:00' },
    // East & Southeast Asia
    kualalumpur: { en: 'Kuala Lumpur', bn: 'কুয়ালালামপুর', tz: '+08:00' },
    jakarta: { en: 'Jakarta', bn: 'জাকার্তা', tz: '+07:00' },
    singapore: { en: 'Singapore', bn: 'সিঙ্গাপুর', tz: '+08:00' },
    bangkok: { en: 'Bangkok', bn: 'ব্যাংকক', tz: '+07:00' },
    yangon: { en: 'Yangon', bn: 'ইয়াঙ্গুন', tz: '+06:30' },
    beijing: { en: 'Beijing', bn: 'বেইজিং', tz: '+08:00' },
    hongkong: { en: 'Hong Kong', bn: 'হংকং', tz: '+08:00' },
    tokyo: { en: 'Tokyo', bn: 'টোকিও', tz: '+09:00' },
    seoul: { en: 'Seoul', bn: 'সিউল', tz: '+09:00' },
    manila: { en: 'Manila', bn: 'ম্যানিলা', tz: '+08:00' },
    // Oceania
    sydney: { en: 'Sydney', bn: 'সিডনি', tz: '+11:00' },
    melbourne: { en: 'Melbourne', bn: 'মেলবোর্ন', tz: '+11:00' },
    auckland: { en: 'Auckland', bn: 'অকল্যান্ড', tz: '+13:00' },
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
    const totalMins = (timeRemaining.hours * 60) + timeRemaining.minutes;
    const isUrgent = totalMins < 15;
    return { h: toBn2(timeRemaining.hours), m: toBn2(timeRemaining.minutes), s: toBn2(secs < 0 ? 0 : secs), isUrgent };
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
  const circleRadius = 62;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (countdownProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background">
      {/* Location Bar */}
      <div className="bg-card border-b border-border" ref={locationPickerRef}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="flex items-center gap-2 flex-1 min-w-0 text-left"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className={cn("text-sm font-medium text-foreground truncate", language === 'bn' && 'font-bengali')}>
              {useBangladeshLocation ? (() => {
                const upazila = getCurrentUpazila();
                const district = getDistrictById(selectedDivision, selectedDistrict);
                if (upazila && district) {
                  return language === 'bn' 
                    ? `${upazila.name_bn}, ${district.name_bn}` 
                    : `${upazila.name_en}, ${district.name_en}`;
                }
                return location.city || (language === 'bn' ? 'ঢাকা' : 'Dhaka');
              })() : (location.city || (language === 'bn' ? 'ঢাকা' : 'Dhaka'))}
            </span>
            <ChevronDown className={cn("w-3 h-3 text-muted-foreground shrink-0 transition-transform", showLocationPicker && "rotate-180")} />
          </button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); getUserLocation(); setShowLocationPicker(false); }} disabled={isLoading} className="h-8 w-8 shrink-0">
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
          </Button>
        </div>

        {/* Location Picker Panel */}
        {showLocationPicker && (
          <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pb-4 space-y-3 border-t border-border pt-3">
            {/* Tab Toggle */}
            <div className="flex gap-2">
              <Button
                variant={locationTab === 'bangladesh' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocationTab('bangladesh')}
                className="flex-1 gap-1.5"
              >
                <Flag className="w-3.5 h-3.5" />
                {language === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
              </Button>
              <Button
                variant={locationTab === 'world' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocationTab('world')}
                className="flex-1 gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                {language === 'bn' ? 'বিশ্ব' : 'World'}
              </Button>
            </div>

            {locationTab === 'bangladesh' ? (
              <div className="space-y-2.5">
                {/* Division */}
                <div>
                  <label className={cn("text-xs text-muted-foreground mb-1 block", language === 'bn' && 'font-bengali')}>
                    {language === 'bn' ? 'বিভাগ' : 'Division'}
                  </label>
                  <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                    <SelectTrigger className="h-9 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-[100]">
                      {bangladeshDivisions.map(div => (
                        <SelectItem key={div.id} value={div.id}>
                          {language === 'bn' ? div.name_bn : div.name_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* District */}
                <div>
                  <label className={cn("text-xs text-muted-foreground mb-1 block", language === 'bn' && 'font-bengali')}>
                    {language === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                    <SelectTrigger className="h-9 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-[100] max-h-60">
                      {getDistricts().map(dist => (
                        <SelectItem key={dist.id} value={dist.id}>
                          {language === 'bn' ? dist.name_bn : dist.name_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Upazila */}
                <div>
                  <label className={cn("text-xs text-muted-foreground mb-1 block", language === 'bn' && 'font-bengali')}>
                    {language === 'bn' ? 'উপজেলা' : 'Upazila'}
                  </label>
                  <Select value={selectedUpazila} onValueChange={handleUpazilaChange}>
                    <SelectTrigger className="h-9 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-[100] max-h-60">
                      {getUpazilas().map(upz => (
                        <SelectItem key={upz.id} value={upz.id}>
                          {language === 'bn' ? upz.name_bn : upz.name_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div>
                <label className={cn("text-xs text-muted-foreground mb-1 block", language === 'bn' && 'font-bengali')}>
                  {language === 'bn' ? 'শহর নির্বাচন করুন' : 'Select City'}
                </label>
                <Select value={selectedCity} onValueChange={(city) => { handleCityChange(city); setShowLocationPicker(false); }}>
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-[100] max-h-60">
                    {Object.entries(cityNames).filter(([key]) => key !== 'custom').map(([key, val]) => (
                      <SelectItem key={key} value={key}>
                        {language === 'bn' ? val.bn : val.en} ({val.tz})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 space-y-3">

        {/* Hijri Date Header */}
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/70 px-4 py-3 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn("text-base font-bold", language === 'bn' && 'font-bengali')}>
                {hijriDay} {hijriMonthName}
              </h1>
              <p className={cn("text-xs opacity-90", language === 'bn' && 'font-bengali')}>
                {dayName} - {gregDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <Sunrise className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
                <p className="text-sm font-bold">{prayerTimes ? formatTimeShort(prayerTimes.sunrise) : '--:--'}</p>
                <p className="text-[9px] opacity-70">{language === 'bn' ? 'সূর্যোদয়' : 'Sunrise'}</p>
              </div>
              <div className="text-center">
                <Sunset className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
                <p className="text-sm font-bold">{prayerTimes ? formatTimeShort(prayerTimes.maghrib.start) : '--:--'}</p>
                <p className="text-[9px] opacity-70">{language === 'bn' ? 'সূর্যাস্ত' : 'Sunset'}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Main Content: Countdown + Prayer List */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Countdown Circle */}
              <div className="flex flex-col items-center justify-center p-4 md:p-5 md:border-r border-border">
                {currentPrayer ? (
                  <>
                    <h2 className={cn("text-sm font-bold text-primary mb-0.5", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? currentPrayer.nameBn : currentPrayer.name}
                    </h2>
                    <p className={cn("text-[11px] text-muted-foreground mb-3", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? 'ওয়াক্ত শেষ হবে' : 'Waqt ends in'}
                    </p>
                  </>
                ) : nextPrayer ? (
                  <>
                    <h2 className={cn("text-sm font-bold text-primary mb-0.5", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? nextPrayer.nameBn : nextPrayer.name}
                    </h2>
                    <p className={cn("text-[11px] text-muted-foreground mb-3", language === 'bn' && 'font-bengali')}>
                      {language === 'bn' ? 'পরবর্তী নামাজ' : 'Next Prayer'}
                    </p>
                  </>
                ) : null}

                {/* Circular Progress - 3D embossed style */}
                <div className="relative w-44 h-44 mb-2">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                  {/* Inner shadow ring for 3D depth */}
                  <div 
                    className="absolute inset-2 rounded-full bg-card"
                    style={{ boxShadow: 'inset 0 4px 15px hsl(var(--foreground) / 0.15), inset 0 -2px 8px hsl(var(--primary) / 0.1), 0 2px 10px hsl(var(--foreground) / 0.08)' }}
                  />
                  <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] -rotate-90" viewBox="0 0 144 144">
                    {/* Background track */}
                    <circle cx="72" cy="72" r={circleRadius} fill="none" stroke="hsl(var(--muted))" strokeWidth="7" strokeOpacity="0.5" />
                    {/* Progress arc */}
                    <circle
                      cx="72" cy="72" r={circleRadius}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000"
                      style={{ filter: 'drop-shadow(0 0 4px hsl(var(--primary) / 0.4))' }}
                    />
                    {/* Indicator dot at progress end */}
                  </svg>
                  {/* Countdown text in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn("text-xl font-bold tabular-nums tracking-wider", countdownDisplay.isUrgent ? "text-destructive" : "text-primary")}>
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
                        "flex items-center justify-between px-4 py-3 transition-colors",
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
            <div className="rounded-xl bg-primary/15 p-3 text-center">
              <p className="text-sm font-bold text-primary">{formatTimeShort(prayerTimes.fajr.start)}</p>
              <p className={cn("text-xs text-muted-foreground", language === 'bn' && 'font-bengali')}>
                {language === 'bn' ? 'সেহরি শেষ' : 'Sehri ends'}
              </p>
            </div>
            <div className="rounded-xl bg-primary/15 p-3 text-center">
              <p className="text-sm font-bold text-primary">{formatTimeShort(prayerTimes.maghrib.start)}</p>
              <p className={cn("text-xs text-muted-foreground", language === 'bn' && 'font-bengali')}>
                {language === 'bn' ? 'ইফতার শুরু' : 'Iftar starts'}
              </p>
            </div>
            <div className="rounded-xl bg-primary/15 p-3 text-center">
              <p className="text-sm font-bold text-primary tabular-nums">
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
