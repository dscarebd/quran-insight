// Prayer Times Calculation based on sun position
// Using commonly accepted calculation methods

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
}

// Calculation methods
export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi';

interface MethodParams {
  fajrAngle: number;
  ishaAngle: number;
  ishaMinutes?: number;
}

const calculationMethods: Record<CalculationMethod, MethodParams> = {
  MWL: { fajrAngle: 18, ishaAngle: 17 },      // Muslim World League
  ISNA: { fajrAngle: 15, ishaAngle: 15 },     // Islamic Society of North America
  Egypt: { fajrAngle: 19.5, ishaAngle: 17.5 }, // Egyptian General Authority
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, ishaMinutes: 90 }, // Umm al-Qura, Makkah
  Karachi: { fajrAngle: 18, ishaAngle: 18 },  // University of Islamic Sciences, Karachi
};

// Convert degrees to radians
const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

// Convert radians to degrees
const toDegrees = (radians: number): number => (radians * 180) / Math.PI;

// Calculate the Julian Day Number
const getJulianDay = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let y = year;
  let m = month;
  
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
};

// Calculate sun's equation of time and declination
const getSunPosition = (jd: number): { declination: number; equationOfTime: number } => {
  const d = jd - 2451545.0;
  const g = 357.529 + 0.98560028 * d;
  const q = 280.459 + 0.98564736 * d;
  const l = q + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g));
  const e = 23.439 - 0.00000036 * d;
  const ra = toDegrees(Math.atan2(Math.cos(toRadians(e)) * Math.sin(toRadians(l)), Math.cos(toRadians(l)))) / 15;
  const declination = toDegrees(Math.asin(Math.sin(toRadians(e)) * Math.sin(toRadians(l))));
  const equationOfTime = q / 15 - (ra < 0 ? ra + 24 : ra);
  
  return { declination, equationOfTime };
};

// Calculate the time of a specific prayer
const getPrayerTime = (
  latitude: number,
  declination: number,
  angle: number,
  equationOfTime: number,
  longitude: number,
  timezone: number,
  isMorning: boolean
): number => {
  const cosAngle = (-Math.sin(toRadians(angle)) - Math.sin(toRadians(latitude)) * Math.sin(toRadians(declination))) /
    (Math.cos(toRadians(latitude)) * Math.cos(toRadians(declination)));
  
  if (cosAngle > 1 || cosAngle < -1) return NaN;
  
  const hourAngle = toDegrees(Math.acos(cosAngle)) / 15;
  const midday = 12 + timezone - longitude / 15 - equationOfTime;
  
  return isMorning ? midday - hourAngle : midday + hourAngle;
};

// Format time as HH:MM
const formatTime = (hours: number): string => {
  if (isNaN(hours)) return '--:--';
  
  let h = hours;
  if (h < 0) h += 24;
  if (h >= 24) h -= 24;
  
  const hour = Math.floor(h);
  const minute = Math.round((h - hour) * 60);
  
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// Calculate prayer times for a given location and date
export const calculatePrayerTimes = (
  location: Location,
  date: Date = new Date(),
  method: CalculationMethod = 'MWL'
): PrayerTimes => {
  const { latitude, longitude } = location;
  const timezone = -date.getTimezoneOffset() / 60;
  const jd = getJulianDay(date);
  const { declination, equationOfTime } = getSunPosition(jd);
  const params = calculationMethods[method];
  
  // Calculate midday (Dhuhr)
  const midday = 12 + timezone - longitude / 15 - equationOfTime;
  
  // Calculate sunrise and sunset
  const sunrise = getPrayerTime(latitude, declination, 0.833, equationOfTime, longitude, timezone, true);
  const sunset = getPrayerTime(latitude, declination, 0.833, equationOfTime, longitude, timezone, false);
  
  // Fajr
  const fajr = getPrayerTime(latitude, declination, params.fajrAngle, equationOfTime, longitude, timezone, true);
  
  // Dhuhr (add a few minutes after midday)
  const dhuhr = midday + 1 / 60; // 1 minute after midday
  
  // Asr (Hanafi: shadow = 2x object + noon shadow, Shafi: shadow = 1x object + noon shadow)
  // Using Shafi method by default
  const noonShadow = Math.abs(Math.tan(toRadians(latitude - declination)));
  const asrAngle = toDegrees(Math.atan(1 / (1 + noonShadow)));
  const asr = getPrayerTime(latitude, declination, asrAngle, equationOfTime, longitude, timezone, false);
  
  // Maghrib (at sunset)
  const maghrib = sunset;
  
  // Isha
  let isha: number;
  if (params.ishaMinutes) {
    isha = sunset + params.ishaMinutes / 60;
  } else {
    isha = getPrayerTime(latitude, declination, params.ishaAngle, equationOfTime, longitude, timezone, false);
  }
  
  return {
    fajr: formatTime(fajr),
    sunrise: formatTime(sunrise),
    dhuhr: formatTime(dhuhr),
    asr: formatTime(asr),
    maghrib: formatTime(maghrib),
    isha: formatTime(isha),
  };
};

// Get next prayer from current time
export const getNextPrayer = (times: PrayerTimes): { name: string; time: string; nameAr: string; nameBn: string } | null => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayers = [
    { name: 'Fajr', nameAr: 'الفجر', nameBn: 'ফজর', time: times.fajr },
    { name: 'Sunrise', nameAr: 'الشروق', nameBn: 'সূর্যোদয়', time: times.sunrise },
    { name: 'Dhuhr', nameAr: 'الظهر', nameBn: 'যোহর', time: times.dhuhr },
    { name: 'Asr', nameAr: 'العصر', nameBn: 'আসর', time: times.asr },
    { name: 'Maghrib', nameAr: 'المغرب', nameBn: 'মাগরিব', time: times.maghrib },
    { name: 'Isha', nameAr: 'العشاء', nameBn: 'ইশা', time: times.isha },
  ];
  
  for (const prayer of prayers) {
    if (prayer.time === '--:--') continue;
    const [h, m] = prayer.time.split(':').map(Number);
    const prayerMinutes = h * 60 + m;
    
    if (prayerMinutes > currentTime) {
      return prayer;
    }
  }
  
  // If all prayers passed, next is Fajr (tomorrow)
  return prayers[0];
};

// Prayer names in different languages
export const prayerNames = {
  fajr: { en: 'Fajr', bn: 'ফজর', ar: 'الفجر', hi: 'फज्र' },
  sunrise: { en: 'Sunrise', bn: 'সূর্যোদয়', ar: 'الشروق', hi: 'सूर्योदय' },
  dhuhr: { en: 'Dhuhr', bn: 'যোহর', ar: 'الظهر', hi: 'ज़ुहर' },
  asr: { en: 'Asr', bn: 'আসর', ar: 'العصر', hi: 'अस्र' },
  maghrib: { en: 'Maghrib', bn: 'মাগরিব', ar: 'المغرب', hi: 'मग़रिब' },
  isha: { en: 'Isha', bn: 'ইশা', ar: 'العشاء', hi: 'इशा' },
};

// Default locations
export const defaultLocations: Record<string, Location> = {
  dhaka: { latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' },
  chittagong: { latitude: 22.3569, longitude: 91.7832, city: 'Chittagong' },
  sylhet: { latitude: 24.8949, longitude: 91.8687, city: 'Sylhet' },
  rajshahi: { latitude: 24.3745, longitude: 88.6042, city: 'Rajshahi' },
  kolkata: { latitude: 22.5726, longitude: 88.3639, city: 'Kolkata' },
  mumbai: { latitude: 19.0760, longitude: 72.8777, city: 'Mumbai' },
  delhi: { latitude: 28.7041, longitude: 77.1025, city: 'Delhi' },
  makkah: { latitude: 21.4225, longitude: 39.8262, city: 'Makkah' },
  madinah: { latitude: 24.5247, longitude: 39.5692, city: 'Madinah' },
  dubai: { latitude: 25.2048, longitude: 55.2708, city: 'Dubai' },
  cairo: { latitude: 30.0444, longitude: 31.2357, city: 'Cairo' },
  istanbul: { latitude: 41.0082, longitude: 28.9784, city: 'Istanbul' },
  jakarta: { latitude: -6.2088, longitude: 106.8456, city: 'Jakarta' },
  kualalumpur: { latitude: 3.1390, longitude: 101.6869, city: 'Kuala Lumpur' },
  london: { latitude: 51.5074, longitude: -0.1278, city: 'London' },
  newyork: { latitude: 40.7128, longitude: -74.0060, city: 'New York' },
  toronto: { latitude: 43.6532, longitude: -79.3832, city: 'Toronto' },
  sydney: { latitude: -33.8688, longitude: 151.2093, city: 'Sydney' },
};

// Get time remaining until next prayer
export const getTimeRemaining = (prayerTime: string): { hours: number; minutes: number; totalMinutes: number } | null => {
  if (prayerTime === '--:--') return null;
  
  const now = new Date();
  const [h, m] = prayerTime.split(':').map(Number);
  
  let prayerDate = new Date();
  prayerDate.setHours(h, m, 0, 0);
  
  // If prayer time has passed, it's for tomorrow
  if (prayerDate <= now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }
  
  const diffMs = prayerDate.getTime() - now.getTime();
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return { hours, minutes, totalMinutes };
};
