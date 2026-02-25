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
export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'IFB' | 'UOIF' | 'MUIS';

interface MethodParams {
  fajrAngle: number;
  ishaAngle: number;
  ishaMinutes?: number;
}

const calculationMethods: Record<CalculationMethod, MethodParams> = {
  MWL: { fajrAngle: 18, ishaAngle: 17 },      // Muslim World League - Europe, Far East, Parts of USA
  ISNA: { fajrAngle: 15, ishaAngle: 15 },     // Islamic Society of North America - USA, Canada, UK
  Egypt: { fajrAngle: 19.5, ishaAngle: 17.5 }, // Egyptian General Authority - Africa, Syria, Iraq, Lebanon, Malaysia
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, ishaMinutes: 90 }, // Umm al-Qura - Arabian Peninsula
  Karachi: { fajrAngle: 18, ishaAngle: 18 },  // University of Islamic Sciences - Pakistan, India, Afghanistan
  IFB: { fajrAngle: 18, ishaAngle: 18 },      // Islamic Foundation Bangladesh
  UOIF: { fajrAngle: 12, ishaAngle: 12 },     // Union des Organisations Islamiques de France
  MUIS: { fajrAngle: 20, ishaAngle: 18 },     // Majlis Ugama Islam Singapura - Singapore
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

// Normalize angle to 0-360 range
const fixAngle = (a: number): number => {
  a = a - 360 * Math.floor(a / 360);
  return a < 0 ? a + 360 : a;
};

// Normalize hour to 0-24 range
const fixHour = (a: number): number => {
  a = a - 24 * Math.floor(a / 24);
  return a < 0 ? a + 24 : a;
};

// Calculate sun's equation of time and declination using PrayTimes.org RA-based method
const getSunPosition = (jd: number): { declination: number; equationOfTime: number } => {
  const d = jd - 2451545.0; // Days since J2000.0
  
  // Mean longitude of the sun (corrected to 0-360)
  const L = fixAngle(280.46646 + 0.9856474 * d);
  
  // Mean anomaly of the sun
  const g = fixAngle(357.5291 + 0.98560028 * d);
  const gRad = toRadians(g);
  
  // Ecliptic longitude of the sun
  const eclipticLong = fixAngle(L + 1.9148 * Math.sin(gRad) + 0.02 * Math.sin(2 * gRad) + 0.0003 * Math.sin(3 * gRad));
  const lambdaRad = toRadians(eclipticLong);
  
  // Obliquity of the ecliptic
  const epsilon = 23.439 - 0.0000004 * d;
  const epsilonRad = toRadians(epsilon);
  
  // Sun's declination
  const declination = toDegrees(Math.asin(Math.sin(epsilonRad) * Math.sin(lambdaRad)));
  
  // Right Ascension (PrayTimes.org method)
  const RA = toDegrees(Math.atan2(Math.cos(epsilonRad) * Math.sin(lambdaRad), Math.cos(lambdaRad))) / 15;
  
  // Equation of Time = mean sun longitude / 15 - RA (in hours)
  const equationOfTime = fixHour(L / 15 - RA);
  
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
  if (isNaN(hours) || !isFinite(hours)) return '--:--';
  
  // Normalize hours to 0-24 range
  let h = hours;
  while (h < 0) h += 24;
  while (h >= 24) h -= 24;
  
  let hour24 = Math.floor(h);
  let minute = Math.floor((h - hour24) * 60); // Use floor instead of round to avoid 60
  
  // Ensure minute is valid (0-59)
  if (minute >= 60) {
    minute = 59;
  }
  if (minute < 0) {
    minute = 0;
  }
  
  // Ensure hour24 is valid (0-23)
  if (hour24 >= 24) hour24 = hour24 % 24;
  if (hour24 < 0) hour24 = 0;
  
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
  
  // Use location-based timezone (longitude / 15) instead of browser timezone
  // This ensures correct times regardless of where the user is viewing from
  const timezone = Math.round(longitude / 15);
  
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
  // Calculate Asr using shadow length ratio
  const asrShadowFactor = 2; // Hanafi uses 2, Shafi uses 1
  const asrCotAngle = asrShadowFactor + Math.tan(toRadians(Math.abs(latitude - declination)));
  const asrAngle = toDegrees(Math.atan(1 / asrCotAngle));
  
  // For Asr, we need the hour angle when sun altitude equals asrAngle
  const asrCosAngle = (Math.sin(toRadians(asrAngle)) - Math.sin(toRadians(latitude)) * Math.sin(toRadians(declination))) /
    (Math.cos(toRadians(latitude)) * Math.cos(toRadians(declination)));
  const asrHourAngle = Math.abs(asrCosAngle) <= 1 ? toDegrees(Math.acos(asrCosAngle)) / 15 : 3;
  const asr = midday + asrHourAngle;
  
  // Maghrib (sunset + 3 minute safety buffer, standard IFB practice)
  const maghribOffset = 3 / 60; // 3 minutes in hours
  const maghrib = sunset + maghribOffset;
  
  // Isha
  let isha: number;
  if (params.ishaMinutes) {
    isha = maghrib + params.ishaMinutes / 60;
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
  // Americas
  newyork: { latitude: 40.7128, longitude: -74.0060, city: 'New York' },
  toronto: { latitude: 43.6532, longitude: -79.3832, city: 'Toronto' },
  chicago: { latitude: 41.8781, longitude: -87.6298, city: 'Chicago' },
  losangeles: { latitude: 34.0522, longitude: -118.2437, city: 'Los Angeles' },
  houston: { latitude: 29.7604, longitude: -95.3698, city: 'Houston' },
  detroit: { latitude: 42.3314, longitude: -83.0458, city: 'Detroit' },
  washington: { latitude: 38.9072, longitude: -77.0369, city: 'Washington DC' },
  montreal: { latitude: 45.5017, longitude: -73.5673, city: 'Montreal' },
  saopaulo: { latitude: -23.5505, longitude: -46.6333, city: 'São Paulo' },
  buenosaires: { latitude: -34.6037, longitude: -58.3816, city: 'Buenos Aires' },

  // Europe
  london: { latitude: 51.5074, longitude: -0.1278, city: 'London' },
  birmingham: { latitude: 52.4862, longitude: -1.8904, city: 'Birmingham' },
  paris: { latitude: 48.8566, longitude: 2.3522, city: 'Paris' },
  berlin: { latitude: 52.5200, longitude: 13.4050, city: 'Berlin' },
  amsterdam: { latitude: 52.3676, longitude: 4.9041, city: 'Amsterdam' },
  brussels: { latitude: 50.8503, longitude: 4.3517, city: 'Brussels' },
  rome: { latitude: 41.9028, longitude: 12.4964, city: 'Rome' },
  madrid: { latitude: 40.4168, longitude: -3.7038, city: 'Madrid' },
  vienna: { latitude: 48.2082, longitude: 16.3738, city: 'Vienna' },
  moscow: { latitude: 55.7558, longitude: 37.6173, city: 'Moscow' },
  istanbul: { latitude: 41.0082, longitude: 28.9784, city: 'Istanbul' },
  ankara: { latitude: 39.9334, longitude: 32.8597, city: 'Ankara' },
  athens: { latitude: 37.9838, longitude: 23.7275, city: 'Athens' },
  stockholm: { latitude: 59.3293, longitude: 18.0686, city: 'Stockholm' },
  oslo: { latitude: 59.9139, longitude: 10.7522, city: 'Oslo' },

  // Middle East
  makkah: { latitude: 21.4225, longitude: 39.8262, city: 'Makkah' },
  madinah: { latitude: 24.5247, longitude: 39.5692, city: 'Madinah' },
  riyadh: { latitude: 24.7136, longitude: 46.6753, city: 'Riyadh' },
  jeddah: { latitude: 21.5433, longitude: 39.1728, city: 'Jeddah' },
  dubai: { latitude: 25.2048, longitude: 55.2708, city: 'Dubai' },
  abudhabi: { latitude: 24.4539, longitude: 54.3773, city: 'Abu Dhabi' },
  doha: { latitude: 25.2854, longitude: 51.5310, city: 'Doha' },
  kuwait: { latitude: 29.3759, longitude: 47.9774, city: 'Kuwait City' },
  muscat: { latitude: 23.5880, longitude: 58.3829, city: 'Muscat' },
  manama: { latitude: 26.2285, longitude: 50.5860, city: 'Manama' },
  baghdad: { latitude: 33.3152, longitude: 44.3661, city: 'Baghdad' },
  tehran: { latitude: 35.6892, longitude: 51.3890, city: 'Tehran' },
  amman: { latitude: 31.9454, longitude: 35.9284, city: 'Amman' },
  beirut: { latitude: 33.8938, longitude: 35.5018, city: 'Beirut' },
  jerusalem: { latitude: 31.7683, longitude: 35.2137, city: 'Jerusalem' },
  cairo: { latitude: 30.0444, longitude: 31.2357, city: 'Cairo' },
  alexandria: { latitude: 31.2001, longitude: 29.9187, city: 'Alexandria' },

  // Africa
  casablanca: { latitude: 33.5731, longitude: -7.5898, city: 'Casablanca' },
  tunis: { latitude: 36.8065, longitude: 10.1815, city: 'Tunis' },
  algiers: { latitude: 36.7538, longitude: 3.0588, city: 'Algiers' },
  tripoli: { latitude: 32.8872, longitude: 13.1913, city: 'Tripoli' },
  khartoum: { latitude: 15.5007, longitude: 32.5599, city: 'Khartoum' },
  lagos: { latitude: 6.5244, longitude: 3.3792, city: 'Lagos' },
  nairobi: { latitude: -1.2921, longitude: 36.8219, city: 'Nairobi' },
  johannesburg: { latitude: -26.2041, longitude: 28.0473, city: 'Johannesburg' },
  addisababa: { latitude: 9.0250, longitude: 38.7469, city: 'Addis Ababa' },
  dakar: { latitude: 14.7167, longitude: -17.4677, city: 'Dakar' },

  // South Asia
  dhaka: { latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' },
  chittagong: { latitude: 22.3569, longitude: 91.7832, city: 'Chittagong' },
  sylhet: { latitude: 24.8949, longitude: 91.8687, city: 'Sylhet' },
  rajshahi: { latitude: 24.3745, longitude: 88.6042, city: 'Rajshahi' },
  khulna: { latitude: 22.8456, longitude: 89.5403, city: 'Khulna' },
  barishal: { latitude: 22.7010, longitude: 90.3535, city: 'Barishal' },
  rangpur: { latitude: 25.7558, longitude: 89.2445, city: 'Rangpur' },
  mymensingh: { latitude: 24.7471, longitude: 90.4203, city: 'Mymensingh' },
  kolkata: { latitude: 22.5726, longitude: 88.3639, city: 'Kolkata' },
  mumbai: { latitude: 19.0760, longitude: 72.8777, city: 'Mumbai' },
  delhi: { latitude: 28.7041, longitude: 77.1025, city: 'Delhi' },
  hyderabad: { latitude: 17.3850, longitude: 78.4867, city: 'Hyderabad' },
  lucknow: { latitude: 26.8467, longitude: 80.9462, city: 'Lucknow' },
  chennai: { latitude: 13.0827, longitude: 80.2707, city: 'Chennai' },
  karachi: { latitude: 24.8607, longitude: 67.0011, city: 'Karachi' },
  lahore: { latitude: 31.5204, longitude: 74.3587, city: 'Lahore' },
  islamabad: { latitude: 33.6844, longitude: 73.0479, city: 'Islamabad' },
  kathmandu: { latitude: 27.7172, longitude: 85.3240, city: 'Kathmandu' },
  colombo: { latitude: 6.9271, longitude: 79.8612, city: 'Colombo' },
  kabul: { latitude: 34.5553, longitude: 69.2075, city: 'Kabul' },
  tashkent: { latitude: 41.2995, longitude: 69.2401, city: 'Tashkent' },

  // East & Southeast Asia
  kualalumpur: { latitude: 3.1390, longitude: 101.6869, city: 'Kuala Lumpur' },
  jakarta: { latitude: -6.2088, longitude: 106.8456, city: 'Jakarta' },
  singapore: { latitude: 1.3521, longitude: 103.8198, city: 'Singapore' },
  bangkok: { latitude: 13.7563, longitude: 100.5018, city: 'Bangkok' },
  yangon: { latitude: 16.8661, longitude: 96.1951, city: 'Yangon' },
  beijing: { latitude: 39.9042, longitude: 116.4074, city: 'Beijing' },
  hongkong: { latitude: 22.3193, longitude: 114.1694, city: 'Hong Kong' },
  tokyo: { latitude: 35.6762, longitude: 139.6503, city: 'Tokyo' },
  seoul: { latitude: 37.5665, longitude: 126.9780, city: 'Seoul' },
  manila: { latitude: 14.5995, longitude: 120.9842, city: 'Manila' },

  // Oceania
  sydney: { latitude: -33.8688, longitude: 151.2093, city: 'Sydney' },
  melbourne: { latitude: -37.8136, longitude: 144.9631, city: 'Melbourne' },
  auckland: { latitude: -36.8485, longitude: 174.7633, city: 'Auckland' },
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
