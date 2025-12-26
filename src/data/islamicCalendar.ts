export interface IslamicEvent {
  id: string;
  hijriDay: number;
  hijriMonth: number; // 1-12
  nameEn: string;
  nameBn: string;
  nameHi: string;
  nameAr: string;
  descriptionEn: string;
  descriptionBn: string;
  descriptionHi: string;
  category: 'eid' | 'fasting' | 'night' | 'sacred' | 'historical' | 'sunnah';
}

// Hijri month names
export const hijriMonths = {
  en: [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhul Qa\'dah', 'Dhul Hijjah'
  ],
  bn: [
    'মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি',
    'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান',
    'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ'
  ],
  hi: [
    'मुहर्रम', 'सफ़र', 'रबीउल अव्वल', 'रबीउस सानी',
    'जमादिउल अव्वल', 'जमादिउस सानी', 'रजब', 'शाबान',
    'रमज़ान', 'शव्वाल', 'ज़िलक़ाद', 'ज़िलहिज्जा'
  ],
  ar: [
    'ٱلْمُحَرَّم', 'صَفَر', 'رَبِيع ٱلْأَوَّل', 'رَبِيع ٱلثَّانِي',
    'جُمَادَىٰ ٱلْأُولَىٰ', 'جُمَادَىٰ ٱلثَّانِيَة', 'رَجَب', 'شَعْبَان',
    'رَمَضَان', 'شَوَّال', 'ذُو ٱلْقَعْدَة', 'ذُو ٱلْحِجَّة'
  ]
};

// Bengali numerals
export const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export const toBengaliNumber = (num: number): string => {
  return num.toString().split('').map(d => bengaliNumerals[parseInt(d)] || d).join('');
};

export const toArabicNumber = (num: number): string => {
  return num.toString().split('').map(d => arabicNumerals[parseInt(d)] || d).join('');
};

// Bengali month names for Gregorian calendar
export const bengaliMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

export const bengaliDays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
export const englishDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const islamicEvents: IslamicEvent[] = [
  // Muharram (Month 1)
  {
    id: 'new-year',
    hijriDay: 1,
    hijriMonth: 1,
    nameEn: 'Islamic New Year',
    nameBn: 'ইসলামিক নববর্ষ',
    nameHi: 'इस्लामी नया साल',
    nameAr: 'رأس السنة الهجرية',
    descriptionEn: 'Beginning of the new Islamic Hijri year',
    descriptionBn: 'নতুন ইসলামিক হিজরি বছরের শুরু',
    descriptionHi: 'नए इस्लामी हिजरी वर्ष की शुरुआत',
    category: 'sacred'
  },
  {
    id: 'ashura',
    hijriDay: 10,
    hijriMonth: 1,
    nameEn: 'Day of Ashura',
    nameBn: 'আশুরা',
    nameHi: 'आशूरा का दिन',
    nameAr: 'يوم عاشوراء',
    descriptionEn: 'Commemorates the martyrdom of Imam Hussain (RA)',
    descriptionBn: 'ইমাম হোসাইন (রা.) এর শাহাদাত স্মরণ',
    descriptionHi: 'इमाम हुसैन (रज़ि.) की शहादत की याद',
    category: 'fasting'
  },

  // Rabi al-Awwal (Month 3)
  {
    id: 'mawlid',
    hijriDay: 12,
    hijriMonth: 3,
    nameEn: 'Mawlid an-Nabi',
    nameBn: 'ঈদে মিলাদুন্নবী',
    nameHi: 'ईद मिलाद-उन-नबी',
    nameAr: 'المولد النبوي',
    descriptionEn: 'Birthday of Prophet Muhammad (PBUH)',
    descriptionBn: 'রাসূলুল্লাহ (সা.) এর জন্মদিন',
    descriptionHi: 'पैगंबर मुहम्मद (स.) का जन्मदिन',
    category: 'sacred'
  },

  // Rajab (Month 7)
  {
    id: 'isra-miraj',
    hijriDay: 27,
    hijriMonth: 7,
    nameEn: 'Shab-e-Meraj (Isra and Mi\'raj)',
    nameBn: 'শবে মেরাজ',
    nameHi: 'शब-ए-मेराज',
    nameAr: 'ليلة الإسراء والمعراج',
    descriptionEn: 'Night Journey and Ascension of Prophet (PBUH)',
    descriptionBn: 'রাসূল (সা.) এর রাত্রি ভ্রমণ ও ঊর্ধ্বারোহণ',
    descriptionHi: 'पैगंबर (स.) की रात की यात्रा और स्वर्गारोहण',
    category: 'night'
  },

  // Sha'ban (Month 8)
  {
    id: 'shab-e-barat',
    hijriDay: 15,
    hijriMonth: 8,
    nameEn: 'Shab-e-Barat (Mid-Sha\'ban)',
    nameBn: 'শবে বরাত',
    nameHi: 'शब-ए-बारात',
    nameAr: 'ليلة البراءة',
    descriptionEn: 'Night of Forgiveness - prayers and worship',
    descriptionBn: 'মাগফিরাতের রাত - দোয়া ও ইবাদত',
    descriptionHi: 'क्षमा की रात - प्रार्थना और इबादत',
    category: 'night'
  },

  // Ramadan (Month 9)
  {
    id: 'ramadan-start',
    hijriDay: 1,
    hijriMonth: 9,
    nameEn: 'Beginning of Ramadan',
    nameBn: 'রমজান শুরু',
    nameHi: 'रमज़ान की शुरुआत',
    nameAr: 'بداية رمضان',
    descriptionEn: 'Start of the blessed month of fasting',
    descriptionBn: 'পবিত্র রোজার মাসের শুরু',
    descriptionHi: 'पवित्र रोज़े के महीने की शुरुआत',
    category: 'fasting'
  },
  {
    id: 'laylatul-qadr',
    hijriDay: 27,
    hijriMonth: 9,
    nameEn: 'Laylatul Qadr (Night of Power)',
    nameBn: 'লাইলাতুল কদর',
    nameHi: 'लैलतुल क़द्र',
    nameAr: 'ليلة القدر',
    descriptionEn: 'The most blessed night, better than a thousand months',
    descriptionBn: 'সবচেয়ে বরকতময় রাত, হাজার মাসের চেয়ে উত্তম',
    descriptionHi: 'सबसे बरकत वाली रात, हज़ार महीनों से बेहतर',
    category: 'night'
  },

  // Shawwal (Month 10)
  {
    id: 'eid-ul-fitr',
    hijriDay: 1,
    hijriMonth: 10,
    nameEn: 'Eid-ul-Fitr',
    nameBn: 'ঈদুল ফিতর',
    nameHi: 'ईद-उल-फ़ित्र',
    nameAr: 'عيد الفطر',
    descriptionEn: 'Festival of Breaking the Fast after Ramadan',
    descriptionBn: 'রমজানের পর রোজা ভাঙার উৎসব',
    descriptionHi: 'रमज़ान के बाद रोज़ा तोड़ने का त्योहार',
    category: 'eid'
  },

  // Shawwal (Month 10) - Six Days of Shawwal
  {
    id: 'six-shawwal-start',
    hijriDay: 2,
    hijriMonth: 10,
    nameEn: 'Six Days of Shawwal Begin',
    nameBn: 'শাওয়ালের ছয় রোজা শুরু',
    nameHi: 'शव्वाल के छह रोज़े शुरू',
    nameAr: 'صيام ستة من شوال',
    descriptionEn: 'Sunnah to fast 6 days after Eid - equals reward of fasting whole year',
    descriptionBn: 'ঈদের পর ৬ দিন রোজা রাখা সুন্নত - সারা বছর রোজার সমান সওয়াব',
    descriptionHi: 'ईद के बाद 6 दिन रोज़ा रखना सुन्नत - पूरे साल के रोज़े का सवाब',
    category: 'sunnah'
  },

  // Dhul Hijjah (Month 12)
  {
    id: 'first-dhul-hijjah',
    hijriDay: 1,
    hijriMonth: 12,
    nameEn: 'First 10 Days of Dhul Hijjah Begin',
    nameBn: 'জিলহজের প্রথম ১০ দিন শুরু',
    nameHi: 'ज़िलहिज्जा के पहले 10 दिन',
    nameAr: 'عشر ذي الحجة',
    descriptionEn: 'Most blessed days of the year - fasting and good deeds highly recommended',
    descriptionBn: 'বছরের সবচেয়ে বরকতময় দিন - রোজা ও ইবাদত অত্যন্ত পুণ্যময়',
    descriptionHi: 'साल के सबसे बरकत वाले दिन - रोज़ा और इबादत अत्यंत पुण्यकारी',
    category: 'sacred'
  },
  {
    id: 'day-of-arafah',
    hijriDay: 9,
    hijriMonth: 12,
    nameEn: 'Day of Arafah',
    nameBn: 'আরাফাত দিবস',
    nameHi: 'अराफ़ात का दिन',
    nameAr: 'يوم عرفة',
    descriptionEn: 'Most important day of Hajj - fasting expiates sins of 2 years',
    descriptionBn: 'হজের সবচেয়ে গুরুত্বপূর্ণ দিন - রোজায় ২ বছরের গুনাহ মাফ',
    descriptionHi: 'हज का सबसे महत्वपूर्ण दिन - रोज़े से 2 साल के गुनाह माफ़',
    category: 'fasting'
  },
  {
    id: 'eid-ul-adha',
    hijriDay: 10,
    hijriMonth: 12,
    nameEn: 'Eid-ul-Adha',
    nameBn: 'ঈদুল আযহা (কোরবানি)',
    nameHi: 'ईद-उल-अज़हा (क़ुर्बानी)',
    nameAr: 'عيد الأضحى',
    descriptionEn: 'Festival of Sacrifice - commemorates Ibrahim\'s devotion',
    descriptionBn: 'কোরবানির ঈদ - ইব্রাহীম (আ.) এর আত্মত্যাগের স্মরণ',
    descriptionHi: 'क़ुर्बानी का त्योहार - इब्राहीम (अ.) की भक्ति की याद',
    category: 'eid'
  },
  {
    id: 'days-of-tashreeq',
    hijriDay: 11,
    hijriMonth: 12,
    nameEn: 'Days of Tashreeq Begin',
    nameBn: 'আইয়ামে তাশরীক শুরু',
    nameHi: 'अय्यामे तशरीक़ की शुरुआत',
    nameAr: 'أيام التشريق',
    descriptionEn: 'Three days of celebration after Eid-ul-Adha (11-13 Dhul Hijjah)',
    descriptionBn: 'ঈদুল আযহার পর তিন দিন উদযাপন (১১-১৩ জিলহজ)',
    descriptionHi: 'ईद-उल-अज़हा के बाद तीन दिन का जश्न (11-13 ज़िलहिज्जा)',
    category: 'eid'
  }
];

// Category labels for display
export const categoryLabels = {
  en: {
    eid: 'Eid',
    fasting: 'Fasting',
    night: 'Night of Worship',
    sacred: 'Sacred Day',
    historical: 'Historical',
    sunnah: 'Sunnah'
  },
  bn: {
    eid: 'ঈদ',
    fasting: 'রোজা',
    night: 'ইবাদতের রাত',
    sacred: 'পবিত্র দিন',
    historical: 'ঐতিহাসিক',
    sunnah: 'সুন্নত'
  },
  hi: {
    eid: 'ईद',
    fasting: 'रोज़ा',
    night: 'इबादत की रात',
    sacred: 'पवित्र दिन',
    historical: 'ऐतिहासिक',
    sunnah: 'सुन्नत'
  }
};

// Sunnah fasting information (weekly/monthly)
export const sunnahFastingInfo = {
  en: {
    weekly: {
      title: 'Weekly Sunnah Fasting',
      days: ['Monday', 'Thursday'],
      description: 'Prophet Muhammad (PBUH) used to fast on Mondays and Thursdays. Deeds are presented to Allah on these days.'
    },
    monthly: {
      title: 'Ayyam al-Beed (White Days)',
      days: '13th, 14th, 15th of each Hijri month',
      description: 'Three days of fasting each lunar month - equal to fasting the whole month.'
    }
  },
  bn: {
    weekly: {
      title: 'সাপ্তাহিক সুন্নত রোজা',
      days: ['সোমবার', 'বৃহস্পতিবার'],
      description: 'রাসূল (সা.) সোমবার ও বৃহস্পতিবার রোজা রাখতেন। এই দিনগুলোতে আমল আল্লাহর কাছে পেশ করা হয়।'
    },
    monthly: {
      title: 'আইয়ামে বীজ (চাঁদনি রাতের দিন)',
      days: 'প্রতি হিজরি মাসের ১৩, ১৪, ১৫ তারিখ',
      description: 'প্রতি চন্দ্র মাসে তিন দিন রোজা - পুরো মাস রোজার সমান।'
    }
  },
  hi: {
    weekly: {
      title: 'साप्ताहिक सुन्नत रोज़ा',
      days: ['सोमवार', 'गुरुवार'],
      description: 'रसूल (स.) सोमवार और गुरुवार को रोज़ा रखते थे। इन दिनों अमल अल्लाह के सामने पेश होते हैं।'
    },
    monthly: {
      title: 'अय्यामे बीज़ (चांदनी रातों के दिन)',
      days: 'हर हिजरी महीने की 13, 14, 15 तारीख',
      description: 'हर चंद्र महीने में तीन दिन का रोज़ा - पूरे महीने के रोज़े के बराबर।'
    }
  }
};

// =============================================
// Hijri to Gregorian Conversion
// =============================================

// Reference date: 1 Muharram 1446 = July 7, 2024
const REFERENCE_HIJRI = { year: 1446, month: 1, day: 1 };
const REFERENCE_GREGORIAN = new Date(2024, 6, 7); // July 7, 2024

// Average length of a Hijri month and year
const HIJRI_MONTH_LENGTH = 29.530589;
const HIJRI_YEAR_LENGTH = 354.36667;

export const hijriToGregorian = (hijriYear: number, hijriMonth: number, hijriDay: number): Date => {
  const yearDiff = hijriYear - REFERENCE_HIJRI.year;
  const monthDiff = hijriMonth - REFERENCE_HIJRI.month;
  const dayDiff = hijriDay - REFERENCE_HIJRI.day;
  
  const totalDays = Math.round(
    yearDiff * HIJRI_YEAR_LENGTH + 
    monthDiff * HIJRI_MONTH_LENGTH + 
    dayDiff
  );
  
  const result = new Date(REFERENCE_GREGORIAN);
  result.setDate(result.getDate() + totalDays);
  return result;
};

export const gregorianToHijri = (date: Date): { year: number; month: number; day: number } => {
  const diffTime = date.getTime() - REFERENCE_GREGORIAN.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  let totalDays = diffDays;
  let hijriYear = REFERENCE_HIJRI.year;
  let hijriMonth = REFERENCE_HIJRI.month;
  let hijriDay = REFERENCE_HIJRI.day;
  
  // Add/subtract years
  while (totalDays >= HIJRI_YEAR_LENGTH) {
    totalDays -= HIJRI_YEAR_LENGTH;
    hijriYear++;
  }
  while (totalDays < 0) {
    totalDays += HIJRI_YEAR_LENGTH;
    hijriYear--;
  }
  
  // Add months
  while (totalDays >= HIJRI_MONTH_LENGTH) {
    totalDays -= HIJRI_MONTH_LENGTH;
    hijriMonth++;
    if (hijriMonth > 12) {
      hijriMonth = 1;
      hijriYear++;
    }
  }
  
  hijriDay = Math.round(totalDays) + 1;
  
  // Normalize
  if (hijriDay > 30) {
    hijriDay = 1;
    hijriMonth++;
    if (hijriMonth > 12) {
      hijriMonth = 1;
      hijriYear++;
    }
  }
  if (hijriDay < 1) hijriDay = 1;
  
  return { year: hijriYear, month: hijriMonth, day: hijriDay };
};

export const getCurrentHijriDate = (): { year: number; month: number; day: number } => {
  return gregorianToHijri(new Date());
};

export const getEventGregorianDate = (event: IslamicEvent, hijriYear: number): Date => {
  return hijriToGregorian(hijriYear, event.hijriMonth, event.hijriDay);
};

// Get upcoming events with their Gregorian dates
export const getUpcomingEvents = (count: number = 10): Array<IslamicEvent & { gregorianDate: Date; daysUntil: number; hijriYear: number }> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentHijri = getCurrentHijriDate();
  
  const eventsWithDates = islamicEvents.flatMap(event => {
    // Check this year and next year
    return [currentHijri.year, currentHijri.year + 1].map(year => {
      const gregorianDate = getEventGregorianDate(event, year);
      gregorianDate.setHours(0, 0, 0, 0);
      const daysUntil = Math.ceil((gregorianDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return { ...event, gregorianDate, daysUntil, hijriYear: year };
    });
  });
  
  return eventsWithDates
    .filter(e => e.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, count);
};

// Get upcoming events count (for display in cards)
export const getUpcomingEventsCount = (): number => {
  return getUpcomingEvents(30).filter(e => e.daysUntil <= 30).length;
};
