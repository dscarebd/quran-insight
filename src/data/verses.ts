export interface Verse {
  surahNumber: number;
  verseNumber: number;
  arabic: string;
  bengali: string;
  english: string;
  tafsirBengali?: string;
  tafsirEnglish?: string;
}

// Sample verses for Surah Al-Fatiha (complete)
export const surahFatihaVerses: Verse[] = [
  {
    surahNumber: 1,
    verseNumber: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bengali: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে।",
    english: "In the name of Allah, the Most Gracious, the Most Merciful.",
    tafsirBengali: "এই আয়াতে আল্লাহর দুটি মহান গুণের উল্লেখ করা হয়েছে: রাহমান (পরম করুণাময়) এবং রাহীম (অসীম দয়ালু)। রাহমান শব্দটি আল্লাহর সাধারণ রহমতকে বোঝায় যা সকল সৃষ্টির জন্য প্রযোজ্য, আর রাহীম শব্দটি বিশেষ রহমতকে বোঝায় যা বিশেষত মুমিনদের জন্য।",
    tafsirEnglish: "This verse mentions two great attributes of Allah: Ar-Rahman (The Most Gracious) and Ar-Raheem (The Most Merciful). Ar-Rahman refers to Allah's general mercy that encompasses all creation, while Ar-Raheem refers to His special mercy that is specifically for the believers."
  },
  {
    surahNumber: 1,
    verseNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    bengali: "সকল প্রশংসা আল্লাহর জন্য, যিনি সমগ্র বিশ্বের প্রতিপালক।",
    english: "All praise is due to Allah, the Lord of all the worlds.",
    tafsirBengali: "এই আয়াতে আল্লাহ তাআলার প্রশংসা করা হয়েছে এবং তাঁকে 'রব্বুল আলামীন' বলা হয়েছে। 'রব' শব্দের অর্থ হলো প্রতিপালক, মালিক এবং পরিচালক। 'আলামীন' শব্দটি সকল সৃষ্টিকে অন্তর্ভুক্ত করে - মানুষ, জিন, ফেরেশতা এবং অন্যান্য সকল সৃষ্টি।",
    tafsirEnglish: "In this verse, Allah is praised and referred to as 'Rabbul Aalameen'. The word 'Rabb' means Lord, Master, and Sustainer. 'Aalameen' encompasses all of creation - humans, jinn, angels, and all other creatures."
  },
  {
    surahNumber: 1,
    verseNumber: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    bengali: "পরম করুণাময়, অসীম দয়ালু।",
    english: "The Most Gracious, the Most Merciful.",
    tafsirBengali: "এই আয়াতে আবারও আল্লাহর রহমতের গুণাবলী উল্লেখ করা হয়েছে, যা এই গুণগুলির গুরুত্ব তুলে ধরে। আল্লাহর রহমত তাঁর ক্রোধকে অতিক্রম করে।",
    tafsirEnglish: "This verse again mentions Allah's attributes of mercy, emphasizing their importance. Allah's mercy precedes His wrath."
  },
  {
    surahNumber: 1,
    verseNumber: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    bengali: "বিচার দিবসের মালিক।",
    english: "Master of the Day of Judgment.",
    tafsirBengali: "এই আয়াতে আল্লাহকে কিয়ামতের দিনের মালিক বলা হয়েছে। সেদিন কোনো সৃষ্টি কোনো কিছুর মালিক থাকবে না, সব কিছুর মালিকানা একমাত্র আল্লাহর হাতে থাকবে। এটি আমাদের স্মরণ করিয়ে দেয় যে আমরা আমাদের কাজের জন্য জবাবদিহি করব।",
    tafsirEnglish: "In this verse, Allah is described as the Master of the Day of Judgment. On that day, no creation will own anything, and all ownership will belong solely to Allah. This reminds us that we will be held accountable for our deeds."
  },
  {
    surahNumber: 1,
    verseNumber: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    bengali: "আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমারই কাছে সাহায্য চাই।",
    english: "You alone we worship, and You alone we ask for help.",
    tafsirBengali: "এই আয়াতটি তাওহীদের (একত্ববাদের) মূল ভিত্তি। এখানে দুটি গুরুত্বপূর্ণ বিষয় রয়েছে: প্রথমত, একমাত্র আল্লাহর ইবাদত করা এবং দ্বিতীয়ত, একমাত্র আল্লাহর কাছে সাহায্য চাওয়া। এটি শিরক থেকে মুক্ত থাকার ঘোষণা।",
    tafsirEnglish: "This verse is the foundation of Tawheed (monotheism). It contains two important aspects: first, worshipping Allah alone, and second, seeking help from Allah alone. It is a declaration of being free from shirk (polytheism)."
  },
  {
    surahNumber: 1,
    verseNumber: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    bengali: "আমাদের সরল পথ দেখাও।",
    english: "Guide us to the straight path.",
    tafsirBengali: "এটি মানুষের সবচেয়ে গুরুত্বপূর্ণ দোয়া। 'সিরাতুল মুস্তাকিম' হলো সেই সরল পথ যা আল্লাহর সন্তুষ্টি এবং জান্নাতের দিকে নিয়ে যায়। এই পথ হলো ইসলাম, কুরআন এবং রাসূল (সাঃ) এর সুন্নাহ অনুসরণ করা।",
    tafsirEnglish: "This is the most important supplication for mankind. 'Sirat al-Mustaqeem' is the straight path that leads to Allah's pleasure and Paradise. This path is Islam, following the Quran and the Sunnah of the Prophet (PBUH)."
  },
  {
    surahNumber: 1,
    verseNumber: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    bengali: "তাদের পথ, যাদের তুমি নিয়ামত দিয়েছ, তাদের পথ নয় যাদের প্রতি তোমার ক্রোধ নাযিল হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।",
    english: "The path of those upon whom You have bestowed Your favor, not of those who have earned Your anger or of those who have gone astray.",
    tafsirBengali: "এই আয়াতে তিন ধরনের মানুষের উল্লেখ রয়েছে: (১) যাদের উপর আল্লাহর নিয়ামত রয়েছে - নবী, সিদ্দীক, শহীদ এবং সালেহীন; (২) যাদের উপর আল্লাহর ক্রোধ নাযিল হয়েছে - যারা সত্য জানা সত্ত্বেও অনুসরণ করেনি; (৩) পথভ্রষ্টরা - যারা অজ্ঞতাবশত সত্য থেকে বিচ্যুত হয়েছে।",
    tafsirEnglish: "This verse mentions three types of people: (1) Those upon whom Allah has bestowed His favor - the prophets, the truthful, the martyrs, and the righteous; (2) Those who earned Allah's anger - those who knew the truth but did not follow it; (3) Those who went astray - those who deviated from the truth due to ignorance."
  }
];

// Get verses by Surah number
export const getVersesBySurah = (surahNumber: number): Verse[] => {
  // Currently only Al-Fatiha has full data
  if (surahNumber === 1) {
    return surahFatihaVerses;
  }
  // Return empty array for other surahs (to be populated later)
  return [];
};
