export interface IslamicEvent {
  id: string;
  hijriDay: number;
  hijriMonth: number; // 1-12
  nameEn: string;
  nameBn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionBn: string;
  descriptionHi: string;
  category: 'eid' | 'fasting' | 'night' | 'sacred' | 'historical';
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
  ]
};

export const islamicEvents: IslamicEvent[] = [
  // Muharram (Month 1)
  {
    id: 'new-year',
    hijriDay: 1,
    hijriMonth: 1,
    nameEn: 'Islamic New Year',
    nameBn: 'ইসলামিক নববর্ষ',
    nameHi: 'इस्लामी नया साल',
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
    descriptionEn: 'Festival of Breaking the Fast after Ramadan',
    descriptionBn: 'রমজানের পর রোজা ভাঙার উৎসব',
    descriptionHi: 'रमज़ान के बाद रोज़ा तोड़ने का त्योहार',
    category: 'eid'
  },

  // Dhul Hijjah (Month 12)
  {
    id: 'first-dhul-hijjah',
    hijriDay: 1,
    hijriMonth: 12,
    nameEn: 'Start of Dhul Hijjah',
    nameBn: 'জিলহজ মাস শুরু',
    nameHi: 'ज़िलहिज्जा की शुरुआत',
    descriptionEn: 'Beginning of the sacred month of Hajj',
    descriptionBn: 'পবিত্র হজ মাসের শুরু',
    descriptionHi: 'पवित्र हज महीने की शुरुआत',
    category: 'sacred'
  },
  {
    id: 'day-of-arafah',
    hijriDay: 9,
    hijriMonth: 12,
    nameEn: 'Day of Arafah',
    nameBn: 'আরাফাত দিবস',
    nameHi: 'अराफ़ात का दिन',
    descriptionEn: 'Most important day of Hajj - fasting is highly recommended',
    descriptionBn: 'হজের সবচেয়ে গুরুত্বপূর্ণ দিন - রোজা রাখা অত্যন্ত পুণ্যময়',
    descriptionHi: 'हज का सबसे महत्वपूर्ण दिन - रोज़ा रखना अत्यंत पुण्यकारी',
    category: 'fasting'
  },
  {
    id: 'eid-ul-adha',
    hijriDay: 10,
    hijriMonth: 12,
    nameEn: 'Eid-ul-Adha',
    nameBn: 'ঈদুল আযহা (কোরবানি)',
    nameHi: 'ईद-उल-अज़हा (क़ुर्बानी)',
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
    historical: 'Historical'
  },
  bn: {
    eid: 'ঈদ',
    fasting: 'রোজা',
    night: 'ইবাদতের রাত',
    sacred: 'পবিত্র দিন',
    historical: 'ঐতিহাসিক'
  },
  hi: {
    eid: 'ईद',
    fasting: 'रोज़ा',
    night: 'इबादत की रात',
    sacred: 'पवित्र दिन',
    historical: 'ऐतिहासिक'
  }
};

// Get upcoming events count (approximate - for display purposes)
export const getUpcomingEventsCount = (): number => {
  // Return total events as they all occur within a year
  return islamicEvents.length;
};
