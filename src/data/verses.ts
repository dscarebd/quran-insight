export interface Verse {
  surahNumber: number;
  verseNumber: number;
  arabic: string;
  bengali: string;
  english: string;
  tafsirBengali?: string;
  tafsirEnglish?: string;
}

// Surah Al-Fatiha (1)
export const surahFatihaVerses: Verse[] = [
  {
    surahNumber: 1, verseNumber: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bengali: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে।",
    english: "In the name of Allah, the Most Gracious, the Most Merciful.",
    tafsirBengali: "এই আয়াতে আল্লাহর দুটি মহান গুণের উল্লেখ করা হয়েছে: রাহমান এবং রাহীম।",
    tafsirEnglish: "This verse mentions two great attributes of Allah: Ar-Rahman and Ar-Raheem."
  },
  {
    surahNumber: 1, verseNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    bengali: "সকল প্রশংসা আল্লাহর জন্য, যিনি সমগ্র বিশ্বের প্রতিপালক।",
    english: "All praise is due to Allah, the Lord of all the worlds.",
    tafsirBengali: "এই আয়াতে আল্লাহ তাআলার প্রশংসা করা হয়েছে এবং তাঁকে 'রব্বুল আলামীন' বলা হয়েছে।",
    tafsirEnglish: "In this verse, Allah is praised and referred to as 'Rabbul Aalameen'."
  },
  {
    surahNumber: 1, verseNumber: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    bengali: "পরম করুণাময়, অসীম দয়ালু।",
    english: "The Most Gracious, the Most Merciful.",
    tafsirBengali: "আবারও আল্লাহর রহমতের গুণাবলী উল্লেখ করা হয়েছে।",
    tafsirEnglish: "This verse again mentions Allah's attributes of mercy."
  },
  {
    surahNumber: 1, verseNumber: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    bengali: "বিচার দিবসের মালিক।",
    english: "Master of the Day of Judgment.",
    tafsirBengali: "আল্লাহকে কিয়ামতের দিনের মালিক বলা হয়েছে।",
    tafsirEnglish: "Allah is described as the Master of the Day of Judgment."
  },
  {
    surahNumber: 1, verseNumber: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    bengali: "আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমারই কাছে সাহায্য চাই।",
    english: "You alone we worship, and You alone we ask for help.",
    tafsirBengali: "এটি তাওহীদের মূল ভিত্তি।",
    tafsirEnglish: "This is the foundation of Tawheed."
  },
  {
    surahNumber: 1, verseNumber: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    bengali: "আমাদের সরল পথ দেখাও।",
    english: "Guide us to the straight path.",
    tafsirBengali: "মানুষের সবচেয়ে গুরুত্বপূর্ণ দোয়া।",
    tafsirEnglish: "The most important supplication for mankind."
  },
  {
    surahNumber: 1, verseNumber: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    bengali: "তাদের পথ, যাদের তুমি নিয়ামত দিয়েছ, তাদের পথ নয় যাদের প্রতি তোমার ক্রোধ নাযিল হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।",
    english: "The path of those upon whom You have bestowed Your favor, not of those who have earned Your anger or of those who have gone astray.",
    tafsirBengali: "তিন ধরনের মানুষের উল্লেখ রয়েছে এই আয়াতে।",
    tafsirEnglish: "This verse mentions three types of people."
  }
];

// Surah Al-Ikhlas (112)
export const surahIkhlasVerses: Verse[] = [
  {
    surahNumber: 112, verseNumber: 1,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    bengali: "বলুন, তিনি আল্লাহ, এক।",
    english: "Say, He is Allah, [who is] One.",
    tafsirBengali: "এই আয়াতে আল্লাহর একত্ববাদের ঘোষণা দেওয়া হয়েছে। আল্লাহ এক এবং অদ্বিতীয়।",
    tafsirEnglish: "This verse declares the Oneness of Allah. Allah is One and Unique."
  },
  {
    surahNumber: 112, verseNumber: 2,
    arabic: "اللَّهُ الصَّمَدُ",
    bengali: "আল্লাহ অমুখাপেক্ষী।",
    english: "Allah, the Eternal Refuge.",
    tafsirBengali: "আস-সামাদ অর্থ হলো যিনি কারো মুখাপেক্ষী নন কিন্তু সকলেই তাঁর মুখাপেক্ষী।",
    tafsirEnglish: "As-Samad means the One who is not dependent on anyone but everyone is dependent on Him."
  },
  {
    surahNumber: 112, verseNumber: 3,
    arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    bengali: "তিনি কাউকে জন্ম দেননি এবং কেউ তাঁকে জন্ম দেয়নি।",
    english: "He neither begets nor is born.",
    tafsirBengali: "আল্লাহর কোনো সন্তান নেই এবং তাঁরও কোনো পিতা-মাতা নেই।",
    tafsirEnglish: "Allah has no offspring and He has no parents."
  },
  {
    surahNumber: 112, verseNumber: 4,
    arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    bengali: "এবং তাঁর সমকক্ষ কেউ নেই।",
    english: "Nor is there to Him any equivalent.",
    tafsirBengali: "আল্লাহর সমকক্ষ বা সমতুল্য কেউ নেই।",
    tafsirEnglish: "There is no one equal to or comparable to Allah."
  }
];

// Surah Al-Falaq (113)
export const surahFalaqVerses: Verse[] = [
  {
    surahNumber: 113, verseNumber: 1,
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
    bengali: "বলুন, আমি আশ্রয় গ্রহণ করছি প্রভাতের রবের।",
    english: "Say, I seek refuge in the Lord of daybreak.",
    tafsirBengali: "এই সূরায় আল্লাহর কাছে আশ্রয় প্রার্থনা করা হয়েছে।",
    tafsirEnglish: "This surah seeks protection from Allah."
  },
  {
    surahNumber: 113, verseNumber: 2,
    arabic: "مِن شَرِّ مَا خَلَقَ",
    bengali: "তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে।",
    english: "From the evil of that which He created.",
    tafsirBengali: "সমস্ত সৃষ্টির অনিষ্ট থেকে আশ্রয় চাওয়া হয়েছে।",
    tafsirEnglish: "Seeking protection from the evil of all creation."
  },
  {
    surahNumber: 113, verseNumber: 3,
    arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
    bengali: "এবং অন্ধকার রাতের অনিষ্ট থেকে যখন তা ঘনিয়ে আসে।",
    english: "And from the evil of darkness when it settles.",
    tafsirBengali: "রাতের অন্ধকারে অনেক অনিষ্ট লুকিয়ে থাকে।",
    tafsirEnglish: "Many evils lurk in the darkness of night."
  },
  {
    surahNumber: 113, verseNumber: 4,
    arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
    bengali: "এবং গিরায় ফুঁক দেয়া জাদুকরণীদের অনিষ্ট থেকে।",
    english: "And from the evil of the blowers in knots.",
    tafsirBengali: "জাদু ও তন্ত্র-মন্ত্রের অনিষ্ট থেকে আশ্রয় চাওয়া হয়েছে।",
    tafsirEnglish: "Seeking protection from the evil of sorcery."
  },
  {
    surahNumber: 113, verseNumber: 5,
    arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    bengali: "এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে।",
    english: "And from the evil of an envier when he envies.",
    tafsirBengali: "হিংসা একটি মারাত্মক রোগ যা থেকে আশ্রয় চাইতে হবে।",
    tafsirEnglish: "Envy is a dangerous disease from which one must seek refuge."
  }
];

// Surah An-Nas (114)
export const surahNasVerses: Verse[] = [
  {
    surahNumber: 114, verseNumber: 1,
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    bengali: "বলুন, আমি আশ্রয় গ্রহণ করছি মানুষের রবের।",
    english: "Say, I seek refuge in the Lord of mankind.",
    tafsirBengali: "আল্লাহকে মানুষের রব হিসেবে সম্বোধন করা হয়েছে।",
    tafsirEnglish: "Allah is addressed as the Lord of mankind."
  },
  {
    surahNumber: 114, verseNumber: 2,
    arabic: "مَلِكِ النَّاسِ",
    bengali: "মানুষের মালিক।",
    english: "The Sovereign of mankind.",
    tafsirBengali: "আল্লাহই সমস্ত মানুষের প্রকৃত মালিক ও শাসক।",
    tafsirEnglish: "Allah is the true Owner and Ruler of all mankind."
  },
  {
    surahNumber: 114, verseNumber: 3,
    arabic: "إِلَٰهِ النَّاسِ",
    bengali: "মানুষের ইলাহ।",
    english: "The God of mankind.",
    tafsirBengali: "একমাত্র আল্লাহই মানুষের উপাস্য।",
    tafsirEnglish: "Only Allah is the deity worthy of worship for mankind."
  },
  {
    surahNumber: 114, verseNumber: 4,
    arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    bengali: "কুমন্ত্রণাদাতার অনিষ্ট থেকে, যে আত্মগোপন করে।",
    english: "From the evil of the retreating whisperer.",
    tafsirBengali: "শয়তানের কুমন্ত্রণা থেকে আশ্রয় চাওয়া হয়েছে।",
    tafsirEnglish: "Seeking protection from Satan's whispers."
  },
  {
    surahNumber: 114, verseNumber: 5,
    arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    bengali: "যে মানুষের অন্তরে কুমন্ত্রণা দেয়।",
    english: "Who whispers [evil] into the breasts of mankind.",
    tafsirBengali: "শয়তান মানুষের মনে খারাপ চিন্তা ঢুকিয়ে দেয়।",
    tafsirEnglish: "Satan injects evil thoughts into people's minds."
  },
  {
    surahNumber: 114, verseNumber: 6,
    arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
    bengali: "জিন ও মানুষের মধ্য থেকে।",
    english: "From among the jinn and mankind.",
    tafsirBengali: "শয়তান জিন এবং মানুষ উভয় থেকেই হতে পারে।",
    tafsirEnglish: "Satan can be from both jinn and humans."
  }
];

// Surah Al-Kawthar (108)
export const surahKawtharVerses: Verse[] = [
  {
    surahNumber: 108, verseNumber: 1,
    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    bengali: "নিশ্চয়ই আমি আপনাকে কাউসার দান করেছি।",
    english: "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
    tafsirBengali: "কাউসার জান্নাতের একটি নহর, এটি রাসূল (সা.) কে দেওয়া হয়েছে।",
    tafsirEnglish: "Al-Kawthar is a river in Paradise given to the Prophet (PBUH)."
  },
  {
    surahNumber: 108, verseNumber: 2,
    arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
    bengali: "অতএব, আপনার রবের উদ্দেশ্যে নামায পড়ুন এবং কুরবানী করুন।",
    english: "So pray to your Lord and sacrifice [to Him alone].",
    tafsirBengali: "আল্লাহর জন্য নামায ও কুরবানীর নির্দেশ দেওয়া হয়েছে।",
    tafsirEnglish: "Command to pray and sacrifice for Allah alone."
  },
  {
    surahNumber: 108, verseNumber: 3,
    arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
    bengali: "নিশ্চয়ই আপনার প্রতি বিদ্বেষ পোষণকারীই নির্বংশ।",
    english: "Indeed, your enemy is the one cut off.",
    tafsirBengali: "যারা রাসূল (সা.) এর শত্রু, তারাই প্রকৃত লাঞ্ছিত।",
    tafsirEnglish: "Those who hate the Prophet are the ones truly cut off."
  }
];

// Surah Al-Asr (103)
export const surahAsrVerses: Verse[] = [
  {
    surahNumber: 103, verseNumber: 1,
    arabic: "وَالْعَصْرِ",
    bengali: "সময়ের শপথ।",
    english: "By time.",
    tafsirBengali: "আল্লাহ সময়ের শপথ করেছেন কারণ এটি অত্যন্ত মূল্যবান।",
    tafsirEnglish: "Allah swears by time because it is extremely valuable."
  },
  {
    surahNumber: 103, verseNumber: 2,
    arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    bengali: "নিশ্চয়ই মানুষ ক্ষতিগ্রস্ত।",
    english: "Indeed, mankind is in loss.",
    tafsirBengali: "সাধারণভাবে সব মানুষই ক্ষতিতে রয়েছে।",
    tafsirEnglish: "Generally, all mankind is in a state of loss."
  },
  {
    surahNumber: 103, verseNumber: 3,
    arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    bengali: "কিন্তু তারা ছাড়া যারা ঈমান এনেছে, সৎকর্ম করেছে এবং পরস্পরকে সত্যের উপদেশ দিয়েছে ও ধৈর্যের উপদেশ দিয়েছে।",
    english: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
    tafsirBengali: "চারটি গুণ যা মানুষকে ক্ষতি থেকে বাঁচায়: ঈমান, সৎকর্ম, সত্যের উপদেশ এবং ধৈর্যের উপদেশ।",
    tafsirEnglish: "Four qualities that save people from loss: faith, good deeds, advising truth, and advising patience."
  }
];

// Surah Al-Kafirun (109)
export const surahKafirunVerses: Verse[] = [
  {
    surahNumber: 109, verseNumber: 1,
    arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ",
    bengali: "বলুন, হে কাফেরগণ!",
    english: "Say, O disbelievers.",
    tafsirBengali: "কাফেরদের সাথে স্পষ্ট ভাষায় কথা বলার নির্দেশ।",
    tafsirEnglish: "Command to address the disbelievers clearly."
  },
  {
    surahNumber: 109, verseNumber: 2,
    arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ",
    bengali: "আমি তার ইবাদত করি না যার ইবাদত তোমরা কর।",
    english: "I do not worship what you worship.",
    tafsirBengali: "মুসলিমরা শুধু আল্লাহর ইবাদত করে, অন্য কিছুর নয়।",
    tafsirEnglish: "Muslims worship only Allah, nothing else."
  },
  {
    surahNumber: 109, verseNumber: 3,
    arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
    bengali: "এবং তোমরাও তাঁর ইবাদতকারী নও যাঁর ইবাদত আমি করি।",
    english: "Nor are you worshippers of what I worship.",
    tafsirBengali: "কাফেররা আল্লাহর সত্যিকার ইবাদত করে না।",
    tafsirEnglish: "The disbelievers do not truly worship Allah."
  },
  {
    surahNumber: 109, verseNumber: 4,
    arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
    bengali: "এবং আমি তার ইবাদতকারী নই যার ইবাদত তোমরা করে আসছ।",
    english: "Nor will I be a worshipper of what you worship.",
    tafsirBengali: "ভবিষ্যতেও কখনো শিরক করা হবে না।",
    tafsirEnglish: "There will never be any compromise with shirk in the future."
  },
  {
    surahNumber: 109, verseNumber: 5,
    arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
    bengali: "এবং তোমরাও তাঁর ইবাদতকারী হবে না যাঁর ইবাদত আমি করি।",
    english: "Nor will you be worshippers of what I worship.",
    tafsirBengali: "কাফেররা তাদের পথ থেকে সরবে না।",
    tafsirEnglish: "The disbelievers will not change their ways."
  },
  {
    surahNumber: 109, verseNumber: 6,
    arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
    bengali: "তোমাদের দ্বীন তোমাদের জন্য এবং আমার দ্বীন আমার জন্য।",
    english: "For you is your religion, and for me is my religion.",
    tafsirBengali: "ধর্মীয় স্বাধীনতার ঘোষণা - প্রত্যেকে তার নিজের দ্বীনের জন্য দায়ী।",
    tafsirEnglish: "Declaration of religious freedom - everyone is responsible for their own religion."
  }
];

// Surah An-Nasr (110)
export const surahNasrVerses: Verse[] = [
  {
    surahNumber: 110, verseNumber: 1,
    arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
    bengali: "যখন আল্লাহর সাহায্য ও বিজয় আসবে।",
    english: "When the victory of Allah has come and the conquest.",
    tafsirBengali: "মক্কা বিজয়ের ইঙ্গিত দেওয়া হয়েছে।",
    tafsirEnglish: "Reference to the conquest of Makkah."
  },
  {
    surahNumber: 110, verseNumber: 2,
    arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
    bengali: "এবং আপনি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবেন।",
    english: "And you see the people entering into the religion of Allah in multitudes.",
    tafsirBengali: "মক্কা বিজয়ের পর মানুষ দলে দলে ইসলাম গ্রহণ করেছিল।",
    tafsirEnglish: "After the conquest of Makkah, people embraced Islam in large numbers."
  },
  {
    surahNumber: 110, verseNumber: 3,
    arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
    bengali: "তখন আপনার রবের প্রশংসা সহকারে তাসবীহ পাঠ করুন এবং তাঁর কাছে ক্ষমা চান। নিশ্চয়ই তিনি তাওবা কবুলকারী।",
    english: "Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of Repentance.",
    tafsirBengali: "বিজয়ের পরও বিনয় ও ক্ষমা প্রার্থনার নির্দেশ।",
    tafsirEnglish: "Command to remain humble and seek forgiveness even after victory."
  }
];

// Surah Al-Masad (111)
export const surahMasadVerses: Verse[] = [
  {
    surahNumber: 111, verseNumber: 1,
    arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
    bengali: "আবু লাহাবের দুই হাত ধ্বংস হোক এবং সে ধ্বংস হোক।",
    english: "May the hands of Abu Lahab be ruined, and ruined is he.",
    tafsirBengali: "আবু লাহাব ছিল রাসূল (সা.) এর চাচা এবং ইসলামের কট্টর শত্রু।",
    tafsirEnglish: "Abu Lahab was the Prophet's uncle and a staunch enemy of Islam."
  },
  {
    surahNumber: 111, verseNumber: 2,
    arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ",
    bengali: "তার ধন-সম্পদ ও তার উপার্জন তার কোনো কাজে আসেনি।",
    english: "His wealth will not avail him or that which he gained.",
    tafsirBengali: "দুনিয়ার ধন-সম্পদ আখিরাতে কোনো কাজে আসবে না।",
    tafsirEnglish: "Worldly wealth will be of no use in the Hereafter."
  },
  {
    surahNumber: 111, verseNumber: 3,
    arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ",
    bengali: "সে অচিরেই লেলিহান আগুনে প্রবেশ করবে।",
    english: "He will [enter to] burn in a Fire of [blazing] flame.",
    tafsirBengali: "আবু লাহাবের পরিণতি জাহান্নামের আগুন।",
    tafsirEnglish: "Abu Lahab's fate is the fire of Hell."
  },
  {
    surahNumber: 111, verseNumber: 4,
    arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ",
    bengali: "এবং তার স্ত্রী, কাঠ বহনকারিণী।",
    english: "And his wife [as well] - the carrier of firewood.",
    tafsirBengali: "তার স্ত্রী উম্মে জামীলও ইসলামের শত্রু ছিল।",
    tafsirEnglish: "His wife Umm Jameel was also an enemy of Islam."
  },
  {
    surahNumber: 111, verseNumber: 5,
    arabic: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ",
    bengali: "তার গলায় খেজুরের আঁশের রশি থাকবে।",
    english: "Around her neck is a rope of [twisted] fiber.",
    tafsirBengali: "জাহান্নামে তার শাস্তির বর্ণনা।",
    tafsirEnglish: "Description of her punishment in Hell."
  }
];

// Surah Al-Fil (105)
export const surahFilVerses: Verse[] = [
  {
    surahNumber: 105, verseNumber: 1,
    arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ",
    bengali: "আপনি কি দেখেননি আপনার রব হাতিওয়ালাদের সাথে কীরূপ আচরণ করেছেন?",
    english: "Have you not considered how your Lord dealt with the companions of the elephant?",
    tafsirBengali: "আবরাহার হাতি বাহিনীর ঘটনা উল্লেখ করা হয়েছে।",
    tafsirEnglish: "Reference to the incident of Abraha's elephant army."
  },
  {
    surahNumber: 105, verseNumber: 2,
    arabic: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ",
    bengali: "তিনি কি তাদের ষড়যন্ত্র নস্যাৎ করে দেননি?",
    english: "Did He not make their plan into misguidance?",
    tafsirBengali: "আল্লাহ তাদের পরিকল্পনা ব্যর্থ করে দিয়েছিলেন।",
    tafsirEnglish: "Allah made their plans completely fail."
  },
  {
    surahNumber: 105, verseNumber: 3,
    arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ",
    bengali: "এবং তাদের উপর ঝাঁকে ঝাঁকে পাখি পাঠিয়েছেন।",
    english: "And He sent against them birds in flocks.",
    tafsirBengali: "আল্লাহ আবাবীল পাখি পাঠিয়েছিলেন।",
    tafsirEnglish: "Allah sent the Ababil birds."
  },
  {
    surahNumber: 105, verseNumber: 4,
    arabic: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ",
    bengali: "যারা তাদের উপর পোড়া মাটির পাথর নিক্ষেপ করছিল।",
    english: "Striking them with stones of hard clay.",
    tafsirBengali: "পাখিরা পোড়া মাটির পাথর নিক্ষেপ করেছিল।",
    tafsirEnglish: "The birds pelted them with stones of baked clay."
  },
  {
    surahNumber: 105, verseNumber: 5,
    arabic: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ",
    bengali: "অতঃপর তিনি তাদেরকে ভক্ষিত তৃণের ন্যায় করে দিলেন।",
    english: "And He made them like eaten straw.",
    tafsirBengali: "তাদের সম্পূর্ণ ধ্বংস করা হয়েছিল।",
    tafsirEnglish: "They were completely destroyed."
  }
];

// Surah Quraysh (106)
export const surahQurayshVerses: Verse[] = [
  {
    surahNumber: 106, verseNumber: 1,
    arabic: "لِإِيلَافِ قُرَيْشٍ",
    bengali: "কুরাইশদের অভ্যাসের জন্য।",
    english: "For the accustomed security of the Quraysh.",
    tafsirBengali: "কুরাইশদের বাণিজ্য যাত্রার অভ্যাসের কথা বলা হয়েছে।",
    tafsirEnglish: "Reference to the trading journeys of the Quraysh."
  },
  {
    surahNumber: 106, verseNumber: 2,
    arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
    bengali: "তাদের শীত ও গ্রীষ্মের ভ্রমণের অভ্যাসের জন্য।",
    english: "Their accustomed caravan in the winter and summer.",
    tafsirBengali: "শীতে ইয়েমেনে এবং গ্রীষ্মে সিরিয়ায় বাণিজ্য করত।",
    tafsirEnglish: "They traded in Yemen in winter and Syria in summer."
  },
  {
    surahNumber: 106, verseNumber: 3,
    arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ",
    bengali: "অতএব, তারা যেন এই ঘরের রবের ইবাদত করে।",
    english: "Let them worship the Lord of this House.",
    tafsirBengali: "কাবার রব আল্লাহর ইবাদত করার নির্দেশ।",
    tafsirEnglish: "Command to worship Allah, the Lord of the Kaaba."
  },
  {
    surahNumber: 106, verseNumber: 4,
    arabic: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
    bengali: "যিনি তাদেরকে ক্ষুধায় আহার দিয়েছেন এবং ভয় থেকে নিরাপদ করেছেন।",
    english: "Who has fed them, [saving them] from hunger and made them safe, [saving them] from fear.",
    tafsirBengali: "আল্লাহ তাদের খাদ্য ও নিরাপত্তা দিয়েছেন।",
    tafsirEnglish: "Allah provided them with food and security."
  }
];

// Surah Al-Ma'un (107)
export const surahMaunVerses: Verse[] = [
  {
    surahNumber: 107, verseNumber: 1,
    arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ",
    bengali: "আপনি কি দেখেছেন তাকে যে দ্বীনকে মিথ্যা বলে?",
    english: "Have you seen the one who denies the Recompense?",
    tafsirBengali: "কিয়ামতকে অস্বীকারকারীদের কথা বলা হয়েছে।",
    tafsirEnglish: "Reference to those who deny the Day of Judgment."
  },
  {
    surahNumber: 107, verseNumber: 2,
    arabic: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ",
    bengali: "সে-ই এতীমকে ধাক্কা দেয়।",
    english: "For that is the one who drives away the orphan.",
    tafsirBengali: "এতীমদের প্রতি নির্দয় আচরণ করে।",
    tafsirEnglish: "They treat orphans harshly."
  },
  {
    surahNumber: 107, verseNumber: 3,
    arabic: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
    bengali: "এবং মিসকীনকে খাদ্যদানে উৎসাহিত করে না।",
    english: "And does not encourage the feeding of the poor.",
    tafsirBengali: "গরীবদের সাহায্য করতে উৎসাহিত করে না।",
    tafsirEnglish: "Does not encourage helping the poor."
  },
  {
    surahNumber: 107, verseNumber: 4,
    arabic: "فَوَيْلٌ لِّلْمُصَلِّينَ",
    bengali: "অতএব, দুর্ভোগ সেই নামাযীদের জন্য।",
    english: "So woe to those who pray.",
    tafsirBengali: "যারা নামাযে অমনোযোগী।",
    tafsirEnglish: "Those who are heedless of their prayer."
  },
  {
    surahNumber: 107, verseNumber: 5,
    arabic: "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ",
    bengali: "যারা তাদের নামাযে অমনোযোগী।",
    english: "[But] who are heedless of their prayer.",
    tafsirBengali: "নামায সময়মতো পড়ে না বা গুরুত্ব দেয় না।",
    tafsirEnglish: "They do not pray on time or give importance to it."
  },
  {
    surahNumber: 107, verseNumber: 6,
    arabic: "الَّذِينَ هُمْ يُرَاءُونَ",
    bengali: "যারা লোক দেখানোর জন্য করে।",
    english: "Those who make show [of their deeds].",
    tafsirBengali: "রিয়া বা লোক দেখানো ইবাদত।",
    tafsirEnglish: "Showing off in worship."
  },
  {
    surahNumber: 107, verseNumber: 7,
    arabic: "وَيَمْنَعُونَ الْمَاعُونَ",
    bengali: "এবং ছোট-খাট সাহায্য দানে বিরত থাকে।",
    english: "And withhold [simple] assistance.",
    tafsirBengali: "ছোট ছোট সাহায্যও করতে চায় না।",
    tafsirEnglish: "They refuse even small acts of kindness."
  }
];

// All verses collection
const allVerses: { [key: number]: Verse[] } = {
  1: surahFatihaVerses,
  103: surahAsrVerses,
  105: surahFilVerses,
  106: surahQurayshVerses,
  107: surahMaunVerses,
  108: surahKawtharVerses,
  109: surahKafirunVerses,
  110: surahNasrVerses,
  111: surahMasadVerses,
  112: surahIkhlasVerses,
  113: surahFalaqVerses,
  114: surahNasVerses,
};

// Get verses by Surah number
export const getVersesBySurah = (surahNumber: number): Verse[] => {
  return allVerses[surahNumber] || [];
};
