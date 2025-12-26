// Prayer Times Calculation based on sun position
// Using commonly accepted calculation methods

export interface PrayerTimeRange {
  start: string;
  end: string;
}

export interface PrayerTimes {
  fajr: PrayerTimeRange;
  sunrise: string;  // Single time, not a range
  dhuhr: PrayerTimeRange;
  asr: PrayerTimeRange;
  maghrib: PrayerTimeRange;
  isha: PrayerTimeRange;
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
}

// Calculation methods
export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'IFB';

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
  IFB: { fajrAngle: 18, ishaAngle: 18 },      // Islamic Foundation Bangladesh
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
  const d = jd - 2451545.0; // Days since J2000.0
  
  // Mean longitude of the sun
  const L = (280.46646 + 0.9856474 * d) % 360;
  
  // Mean anomaly of the sun
  const g = toRadians((357.5291 + 0.98560028 * d) % 360);
  
  // Ecliptic longitude
  const lambda = toRadians(L + 1.9148 * Math.sin(g) + 0.02 * Math.sin(2 * g));
  
  // Obliquity of the ecliptic
  const epsilon = toRadians(23.439 - 0.0000004 * d);
  
  // Sun's declination
  const declination = toDegrees(Math.asin(Math.sin(epsilon) * Math.sin(lambda)));
  
  // Equation of time (in minutes)
  const y = Math.tan(epsilon / 2) * Math.tan(epsilon / 2);
  const L_rad = toRadians(L);
  const eot = 4 * toDegrees(
    y * Math.sin(2 * L_rad) -
    2 * 0.0167 * Math.sin(g) +
    4 * 0.0167 * y * Math.sin(g) * Math.cos(2 * L_rad) -
    0.5 * y * y * Math.sin(4 * L_rad) -
    1.25 * 0.0167 * 0.0167 * Math.sin(2 * g)
  );
  
  // Convert equation of time from minutes to hours
  const equationOfTime = eot / 60;
  
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

// Format time as HH:MM AM/PM (12-hour format)
const formatTime = (hours: number): string => {
  if (isNaN(hours)) return '--:--';
  
  let h = hours;
  if (h < 0) h += 24;
  if (h >= 24) h -= 24;
  
  let hour24 = Math.floor(h);
  let minute = Math.round((h - hour24) * 60);
  
  // Handle minute overflow (when rounding produces 60)
  if (minute >= 60) {
    minute = 0;
    hour24 += 1;
    if (hour24 >= 24) hour24 = 0;
  }
  
  // Convert to 12-hour format
  const period = hour24 >= 12 ? 'PM' : 'AM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
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
  
  // Asr - Using Hanafi method (shadow = 2x object height + noon shadow)
  const noonShadow = Math.abs(Math.tan(toRadians(latitude - declination)));
  const asrAngle = toDegrees(Math.atan(1 / (2 + noonShadow)));
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
  
  // Calculate next day's Fajr for Isha end time
  const nextDayJd = getJulianDay(new Date(date.getTime() + 24 * 60 * 60 * 1000));
  const nextDaySun = getSunPosition(nextDayJd);
  const nextFajr = getPrayerTime(latitude, nextDaySun.declination, params.fajrAngle, nextDaySun.equationOfTime, longitude, timezone, true);

  return {
    fajr: { start: formatTime(fajr), end: formatTime(sunrise) },
    sunrise: formatTime(sunrise),
    dhuhr: { start: formatTime(dhuhr), end: formatTime(asr) },
    asr: { start: formatTime(asr), end: formatTime(maghrib) },
    maghrib: { start: formatTime(maghrib), end: formatTime(isha) },
    isha: { start: formatTime(isha), end: formatTime(nextFajr) },
  };
};

// Helper to parse 12-hour time format to minutes
const parseTimeToMinutes = (timeStr: string): number => {
  if (timeStr === '--:--') return -1;
  
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return -1;
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return hours * 60 + minutes;
};

// Get next prayer from current time
export const getNextPrayer = (times: PrayerTimes): { name: string; time: string; nameAr: string; nameBn: string } | null => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayers = [
    { name: 'Fajr', nameAr: 'الفجر', nameBn: 'ফজর', time: times.fajr.start },
    { name: 'Sunrise', nameAr: 'الشروق', nameBn: 'সূর্যোদয়', time: times.sunrise },
    { name: 'Dhuhr', nameAr: 'الظهر', nameBn: 'যোহর', time: times.dhuhr.start },
    { name: 'Asr', nameAr: 'العصر', nameBn: 'আসর', time: times.asr.start },
    { name: 'Maghrib', nameAr: 'المغرب', nameBn: 'মাগরিব', time: times.maghrib.start },
    { name: 'Isha', nameAr: 'العشاء', nameBn: 'ইশা', time: times.isha.start },
  ];
  
  for (const prayer of prayers) {
    const prayerMinutes = parseTimeToMinutes(prayer.time);
    if (prayerMinutes < 0) continue;
    
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
  
  const match = prayerTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  const now = new Date();
  let prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);
  
  // If prayer time has passed, it's for tomorrow
  if (prayerDate <= now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }
  
  const diffMs = prayerDate.getTime() - now.getTime();
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const remainingHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  
  return { hours: remainingHours, minutes: remainingMinutes, totalMinutes };
};
