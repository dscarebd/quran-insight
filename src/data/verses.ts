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

// Surah Al-Aadiyaat (100)
export const surahAadiyaatVerses: Verse[] = [
  {
    surahNumber: 100, verseNumber: 1,
    arabic: "وَالْعَادِيَاتِ ضَبْحًا",
    bengali: "শপথ সেই অশ্বগুলোর, যারা হাঁপাতে হাঁপাতে ছুটে চলে।",
    english: "By the racers, panting.",
    tafsirBengali: "আল্লাহ জিহাদে ব্যবহৃত ঘোড়াগুলোর শপথ করছেন যারা দ্রুত ছুটে চলে এবং হাঁপায়। এটি জিহাদের গুরুত্ব এবং আল্লাহর পথে সংগ্রামের মর্যাদা বোঝায়।",
    tafsirEnglish: "Allah swears by the horses used in jihad that run swiftly and pant. This indicates the importance of jihad and the honor of striving in Allah's way."
  },
  {
    surahNumber: 100, verseNumber: 2,
    arabic: "فَالْمُورِيَاتِ قَدْحًا",
    bengali: "অতঃপর যারা (পাথরে খুর মেরে) আগুন ঝরায়।",
    english: "And the producers of sparks [when] striking.",
    tafsirBengali: "ঘোড়ার খুর পাথরে লেগে যখন স্ফুলিঙ্গ বের হয়। এটি তাদের গতি ও শক্তির প্রমাণ।",
    tafsirEnglish: "When the horses' hooves strike against stones, sparks fly. This demonstrates their speed and power."
  },
  {
    surahNumber: 100, verseNumber: 3,
    arabic: "فَالْمُغِيرَاتِ صُبْحًا",
    bengali: "অতঃপর যারা ভোরবেলা আক্রমণ করে।",
    english: "And the chargers at dawn.",
    tafsirBengali: "ভোরবেলা শত্রুর উপর আক্রমণ করা যুদ্ধের একটি কৌশল ছিল।",
    tafsirEnglish: "Attacking enemies at dawn was a military strategy in warfare."
  },
  {
    surahNumber: 100, verseNumber: 4,
    arabic: "فَأَثَرْنَ بِهِ نَقْعًا",
    bengali: "অতঃপর তার দ্বারা ধুলো উড়ায়।",
    english: "And stirring up thereby [clouds of] dust.",
    tafsirBengali: "ঘোড়াগুলো দৌড়ানোর সময় ধুলোর মেঘ তৈরি করে। এটি যুদ্ধক্ষেত্রের দৃশ্য বর্ণনা করছে।",
    tafsirEnglish: "The horses create clouds of dust while running. This describes the battlefield scene."
  },
  {
    surahNumber: 100, verseNumber: 5,
    arabic: "فَوَسَطْنَ بِهِ جَمْعًا",
    bengali: "অতঃপর তার দ্বারা শত্রুদলের মধ্যে ঢুকে পড়ে।",
    english: "Arriving thereby in the center collectively.",
    tafsirBengali: "ঘোড়াগুলো শত্রু সেনাদলের মাঝখানে ঢুকে পড়ে। এটি বীরত্ব ও সাহসিকতার প্রতীক।",
    tafsirEnglish: "The horses penetrate into the middle of enemy forces. This symbolizes bravery and courage."
  },
  {
    surahNumber: 100, verseNumber: 6,
    arabic: "إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ",
    bengali: "নিশ্চয়ই মানুষ তার রবের প্রতি অকৃতজ্ঞ।",
    english: "Indeed mankind, to his Lord, is ungrateful.",
    tafsirBengali: "মানুষ আল্লাহর অসংখ্য নিয়ামত পাওয়া সত্ত্বেও অকৃতজ্ঞ। সে বিপদে পড়লে আল্লাহকে ডাকে কিন্তু সুখে ভুলে যায়।",
    tafsirEnglish: "Despite receiving countless blessings from Allah, man is ungrateful. He calls upon Allah in distress but forgets Him in comfort."
  },
  {
    surahNumber: 100, verseNumber: 7,
    arabic: "وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ",
    bengali: "এবং সে নিজেই এর সাক্ষী।",
    english: "And indeed, he is to that a witness.",
    tafsirBengali: "মানুষ নিজেই তার অকৃতজ্ঞতার সাক্ষী। তার বিবেক জানে যে সে আল্লাহর নিয়ামতের শুকরিয়া আদায় করে না।",
    tafsirEnglish: "Man himself is a witness to his ingratitude. His conscience knows that he does not give thanks for Allah's blessings."
  },
  {
    surahNumber: 100, verseNumber: 8,
    arabic: "وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ",
    bengali: "এবং সে ধন-সম্পদের ভালোবাসায় অত্যন্ত আসক্ত।",
    english: "And indeed he is, in love of wealth, intense.",
    tafsirBengali: "মানুষ ধন-সম্পদের প্রতি অত্যন্ত লোভী। এই লোভ তাকে আখিরাতের কথা ভুলিয়ে দেয়।",
    tafsirEnglish: "Man is extremely greedy for wealth. This greed makes him forget the Hereafter."
  },
  {
    surahNumber: 100, verseNumber: 9,
    arabic: "أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ",
    bengali: "সে কি জানে না যখন কবরে যা আছে তা উত্থিত করা হবে?",
    english: "But does he not know that when the contents of the graves are scattered.",
    tafsirBengali: "কিয়ামতের দিন কবর থেকে সকল মানুষকে পুনরুত্থিত করা হবে হিসাব-নিকাশের জন্য।",
    tafsirEnglish: "On the Day of Judgment, all people will be resurrected from their graves for accountability."
  },
  {
    surahNumber: 100, verseNumber: 10,
    arabic: "وَحُصِّلَ مَا فِي الصُّدُورِ",
    bengali: "এবং অন্তরে যা আছে তা প্রকাশ করা হবে?",
    english: "And that within the breasts is obtained.",
    tafsirBengali: "অন্তরের সব গোপন বিষয় প্রকাশ করা হবে। কোনো কিছুই লুকানো থাকবে না।",
    tafsirEnglish: "All secrets of the heart will be revealed. Nothing will remain hidden."
  },
  {
    surahNumber: 100, verseNumber: 11,
    arabic: "إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ",
    bengali: "নিশ্চয়ই সেদিন তাদের রব তাদের সম্পর্কে সম্যক অবগত।",
    english: "Indeed, their Lord with them, that Day, is [fully] Aware.",
    tafsirBengali: "আল্লাহ সেদিন সবকিছু জানবেন এবং প্রত্যেককে তার কর্ম অনুযায়ী বিচার করবেন।",
    tafsirEnglish: "Allah will know everything that Day and will judge everyone according to their deeds."
  }
];

// Surah Al-Qaari'a (101)
export const surahQaariaVerses: Verse[] = [
  {
    surahNumber: 101, verseNumber: 1,
    arabic: "الْقَارِعَةُ",
    bengali: "মহাবিপদ।",
    english: "The Striking Calamity.",
    tafsirBengali: "কারিয়া কিয়ামতের একটি নাম। এটি এমন এক মহাবিপদ যা সবকিছু তছনছ করে দেবে।",
    tafsirEnglish: "Al-Qaari'a is one of the names of the Day of Judgment. It is a great calamity that will destroy everything."
  },
  {
    surahNumber: 101, verseNumber: 2,
    arabic: "مَا الْقَارِعَةُ",
    bengali: "মহাবিপদ কী?",
    english: "What is the Striking Calamity?",
    tafsirBengali: "এই প্রশ্নের মাধ্যমে কিয়ামতের ভয়াবহতা তুলে ধরা হয়েছে।",
    tafsirEnglish: "This question emphasizes the severity of the Day of Judgment."
  },
  {
    surahNumber: 101, verseNumber: 3,
    arabic: "وَمَا أَدْرَاكَ مَا الْقَارِعَةُ",
    bengali: "আপনি কি জানেন মহাবিপদ কী?",
    english: "And what can make you know what is the Striking Calamity?",
    tafsirBengali: "এই প্রশ্ন আরও জোর দিয়ে বোঝাচ্ছে যে এর ভয়াবহতা মানুষের কল্পনার বাইরে।",
    tafsirEnglish: "This question further emphasizes that its severity is beyond human imagination."
  },
  {
    surahNumber: 101, verseNumber: 4,
    arabic: "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ",
    bengali: "সেদিন মানুষ হবে বিক্ষিপ্ত পতঙ্গের মতো।",
    english: "It is the Day when people will be like moths, dispersed.",
    tafsirBengali: "কিয়ামতের দিন মানুষ এতটাই ভীত ও বিচলিত হবে যে তারা আলোর দিকে ছুটে যাওয়া পতঙ্গের মতো ছড়িয়ে-ছিটিয়ে থাকবে।",
    tafsirEnglish: "On the Day of Judgment, people will be so frightened and disturbed that they will be scattered like moths rushing towards light."
  },
  {
    surahNumber: 101, verseNumber: 5,
    arabic: "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ",
    bengali: "এবং পাহাড়গুলো হবে ধুনিত রঙিন পশমের মতো।",
    english: "And the mountains will be like wool, fluffed up.",
    tafsirBengali: "বিশাল পাহাড়গুলোও সেদিন ধুনা তুলার মতো হালকা হয়ে উড়তে থাকবে। এটি কিয়ামতের প্রচণ্ডতা বোঝায়।",
    tafsirEnglish: "Even the massive mountains will become light like carded wool and fly about. This shows the intensity of the Day of Judgment."
  },
  {
    surahNumber: 101, verseNumber: 6,
    arabic: "فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ",
    bengali: "অতঃপর যার পাল্লা ভারী হবে।",
    english: "Then as for one whose scales are heavy [with good deeds].",
    tafsirBengali: "যাদের নেক আমলের পাল্লা ভারী হবে তারা সফল হবে।",
    tafsirEnglish: "Those whose scales are heavy with good deeds will be successful."
  },
  {
    surahNumber: 101, verseNumber: 7,
    arabic: "فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ",
    bengali: "সে সন্তোষজনক জীবনে থাকবে।",
    english: "He will be in a pleasant life.",
    tafsirBengali: "তারা জান্নাতে সুখী ও সন্তুষ্ট জীবন যাপন করবে।",
    tafsirEnglish: "They will live a happy and satisfied life in Paradise."
  },
  {
    surahNumber: 101, verseNumber: 8,
    arabic: "وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ",
    bengali: "এবং যার পাল্লা হালকা হবে।",
    english: "But as for one whose scales are light.",
    tafsirBengali: "যাদের নেক আমলের পাল্লা হালকা হবে তাদের পরিণতি ভয়াবহ।",
    tafsirEnglish: "Those whose scales of good deeds are light will face a terrible fate."
  },
  {
    surahNumber: 101, verseNumber: 9,
    arabic: "فَأُمُّهُ هَاوِيَةٌ",
    bengali: "তার আশ্রয়স্থল হবে হাবিয়া।",
    english: "His refuge will be an abyss.",
    tafsirBengali: "হাবিয়া জাহান্নামের গভীরতম স্তর। 'উম্মুহু' বলে বোঝানো হয়েছে যে জাহান্নাম তার জন্য মায়ের কোলের মতো আশ্রয়স্থল হবে।",
    tafsirEnglish: "Hawiyah is the deepest level of Hell. 'His mother' is used to indicate that Hell will be his shelter like a mother's lap."
  },
  {
    surahNumber: 101, verseNumber: 10,
    arabic: "وَمَا أَدْرَاكَ مَا هِيَهْ",
    bengali: "আপনি কি জানেন তা কী?",
    english: "And what can make you know what that is?",
    tafsirBengali: "হাবিয়ার ভয়াবহতা সম্পর্কে প্রশ্ন করা হয়েছে।",
    tafsirEnglish: "A question about the severity of Hawiyah."
  },
  {
    surahNumber: 101, verseNumber: 11,
    arabic: "نَارٌ حَامِيَةٌ",
    bengali: "এটা উত্তপ্ত আগুন।",
    english: "It is a Fire, intensely hot.",
    tafsirBengali: "হাবিয়া হলো অত্যন্ত উত্তপ্ত আগুন যার তাপ অসহনীয়।",
    tafsirEnglish: "Hawiyah is an extremely hot fire whose heat is unbearable."
  }
];

// Surah At-Takaathur (102)
export const surahTakaathurVerses: Verse[] = [
  {
    surahNumber: 102, verseNumber: 1,
    arabic: "أَلْهَاكُمُ التَّكَاثُرُ",
    bengali: "প্রাচুর্যের প্রতিযোগিতা তোমাদের গাফেল করে রেখেছে।",
    english: "Competition in [worldly] increase diverts you.",
    tafsirBengali: "মানুষ ধন-সম্পদ, সন্তান-সন্ততি এবং পার্থিব জিনিসের প্রতিযোগিতায় এতটাই মত্ত যে আখিরাতের কথা ভুলে গেছে।",
    tafsirEnglish: "People are so engrossed in competing for wealth, children and worldly things that they have forgotten the Hereafter."
  },
  {
    surahNumber: 102, verseNumber: 2,
    arabic: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ",
    bengali: "যতক্ষণ না তোমরা কবরে পৌঁছে যাও।",
    english: "Until you visit the graveyards.",
    tafsirBengali: "এই প্রতিযোগিতা চলতেই থাকে মৃত্যু পর্যন্ত। তখন বুঝতে পারে যে সব কিছু ফেলে যেতে হবে।",
    tafsirEnglish: "This competition continues until death. Only then does one realize that everything must be left behind."
  },
  {
    surahNumber: 102, verseNumber: 3,
    arabic: "كَلَّا سَوْفَ تَعْلَمُونَ",
    bengali: "কখনো না! তোমরা শীঘ্রই জানতে পারবে।",
    english: "No! You are going to know.",
    tafsirBengali: "এটি সতর্কতা যে মৃত্যুর পর সত্য জানা যাবে।",
    tafsirEnglish: "This is a warning that the truth will be known after death."
  },
  {
    surahNumber: 102, verseNumber: 4,
    arabic: "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ",
    bengali: "আবারও বলছি, কখনো না! তোমরা শীঘ্রই জানতে পারবে।",
    english: "Then no! You are going to know.",
    tafsirBengali: "এই সতর্কতা আবার পুনরাবৃত্তি করা হয়েছে জোর দেওয়ার জন্য।",
    tafsirEnglish: "This warning is repeated for emphasis."
  },
  {
    surahNumber: 102, verseNumber: 5,
    arabic: "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ",
    bengali: "কখনো না! যদি তোমরা নিশ্চিত জ্ঞানে জানতে।",
    english: "No! If you only knew with knowledge of certainty.",
    tafsirBengali: "যদি তারা আখিরাতের বাস্তবতা সম্পর্কে নিশ্চিতভাবে জানত, তাহলে তাদের আচরণ ভিন্ন হত।",
    tafsirEnglish: "If they knew the reality of the Hereafter with certainty, their behavior would be different."
  },
  {
    surahNumber: 102, verseNumber: 6,
    arabic: "لَتَرَوُنَّ الْجَحِيمَ",
    bengali: "তোমরা অবশ্যই জাহান্নাম দেখবে।",
    english: "You will surely see the Hellfire.",
    tafsirBengali: "কিয়ামতের দিন সবাই জাহান্নাম দেখতে পাবে।",
    tafsirEnglish: "On the Day of Judgment, everyone will see Hellfire."
  },
  {
    surahNumber: 102, verseNumber: 7,
    arabic: "ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ",
    bengali: "অতঃপর তোমরা তা নিশ্চিত চোখে দেখবে।",
    english: "Then you will surely see it with the eye of certainty.",
    tafsirBengali: "স্বচক্ষে জাহান্নাম দেখা হবে, তখন আর কোনো সন্দেহ থাকবে না।",
    tafsirEnglish: "Hellfire will be seen with one's own eyes, then there will be no doubt left."
  },
  {
    surahNumber: 102, verseNumber: 8,
    arabic: "ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ",
    bengali: "অতঃপর সেদিন তোমাদের নিয়ামত সম্পর্কে জিজ্ঞাসা করা হবে।",
    english: "Then you will surely be asked that Day about pleasure.",
    tafsirBengali: "আল্লাহ প্রদত্ত প্রতিটি নিয়ামত সম্পর্কে জিজ্ঞাসা করা হবে - সুস্বাস্থ্য, নিরাপত্তা, খাদ্য, পানীয় সবকিছু। এগুলো কীভাবে ব্যবহার করা হয়েছে তার হিসাব দিতে হবে।",
    tafsirEnglish: "You will be asked about every blessing Allah gave - health, security, food, drink, everything. You will have to account for how these were used."
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

// Surah Al-Humaza (104)
export const surahHumazaVerses: Verse[] = [
  {
    surahNumber: 104, verseNumber: 1,
    arabic: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ",
    bengali: "দুর্ভোগ প্রত্যেক পরনিন্দাকারী ও দোষান্বেষীর জন্য।",
    english: "Woe to every scorner and mocker.",
    tafsirBengali: "হুমাযা অর্থ যে ব্যক্তি অন্যদের দোষ খুঁজে বেড়ায় এবং লুমাযা অর্থ যে পেছনে গীবত করে। এই সূরায় তাদের কঠোর শাস্তির কথা বলা হয়েছে। এটি এমন ব্যক্তিদের প্রতি সতর্কতা যারা অন্যদের সম্মানহানি করে এবং তাদের দোষ-ত্রুটি প্রকাশ করে বেড়ায়।",
    tafsirEnglish: "Humaza means one who constantly finds faults in others, and Lumaza means one who backbites. This surah warns of severe punishment for such people. It is a warning to those who harm others' honor and expose their faults."
  },
  {
    surahNumber: 104, verseNumber: 2,
    arabic: "الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ",
    bengali: "যে সম্পদ জমা করেছে এবং তা গুণে গুণে রাখে।",
    english: "Who collects wealth and [continuously] counts it.",
    tafsirBengali: "এই ব্যক্তি শুধু ধন-সম্পদ জমা করতে এবং তা গুণতে ব্যস্ত থাকে। সে আল্লাহর পথে খরচ করে না এবং গরীব-দুঃখীদের সাহায্য করে না। সম্পদের প্রতি তার অত্যধিক মোহ তাকে আখিরাতের কথা ভুলিয়ে দিয়েছে।",
    tafsirEnglish: "This person is obsessed with accumulating and counting wealth. He does not spend in Allah's way and does not help the poor. His excessive love for wealth has made him forget the Hereafter."
  },
  {
    surahNumber: 104, verseNumber: 3,
    arabic: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ",
    bengali: "সে মনে করে যে তার সম্পদ তাকে অমর করে রাখবে।",
    english: "He thinks that his wealth will make him immortal.",
    tafsirBengali: "এই মূর্খ ব্যক্তি মনে করে যে তার জমানো সম্পদ তাকে মৃত্যু থেকে বাঁচাবে বা চিরস্থায়ী করবে। কিন্তু মৃত্যু সবার জন্য অবধারিত এবং সম্পদ কোনো কাজে আসবে না।",
    tafsirEnglish: "This foolish person thinks his accumulated wealth will save him from death or make him live forever. But death is inevitable for everyone and wealth will be of no use."
  },
  {
    surahNumber: 104, verseNumber: 4,
    arabic: "كَلَّا ۖ لَيُنبَذَنَّ فِي الْحُطَمَةِ",
    bengali: "কখনো না! সে অবশ্যই নিক্ষিপ্ত হবে হুতামায়।",
    english: "No! He will surely be thrown into the Crusher.",
    tafsirBengali: "আল্লাহ তার ধারণা খণ্ডন করছেন এবং বলছেন যে সে অবশ্যই হুতামায় (জাহান্নামের একটি স্তর) নিক্ষিপ্ত হবে। হুতামা এমন আগুন যা সবকিছু চূর্ণ-বিচূর্ণ করে দেয়।",
    tafsirEnglish: "Allah refutes his assumption and says he will surely be thrown into Hutama (a level of Hell). Hutama is a fire that crushes and shatters everything."
  },
  {
    surahNumber: 104, verseNumber: 5,
    arabic: "وَمَا أَدْرَاكَ مَا الْحُطَمَةُ",
    bengali: "আপনি কি জানেন হুতামা কী?",
    english: "And what can make you know what is the Crusher?",
    tafsirBengali: "এই প্রশ্নের মাধ্যমে হুতামার ভয়াবহতা তুলে ধরা হয়েছে। এটি এত ভয়ঙ্কর যে মানুষের পক্ষে তা কল্পনা করাও সম্ভব নয়।",
    tafsirEnglish: "This question highlights the severity of Hutama. It is so terrifying that humans cannot even imagine it."
  },
  {
    surahNumber: 104, verseNumber: 6,
    arabic: "نَارُ اللَّهِ الْمُوقَدَةُ",
    bengali: "এটা আল্লাহর প্রজ্বলিত আগুন।",
    english: "It is the fire of Allah, [eternally] fueled.",
    tafsirBengali: "এই আগুন আল্লাহর প্রজ্বলিত আগুন যা কখনো নিভে না। দুনিয়ার আগুন থেকে এটি সত্তর গুণ বেশি তীব্র এবং এর জ্বালানি হলো মানুষ ও পাথর।",
    tafsirEnglish: "This is Allah's kindled fire that never extinguishes. It is seventy times more intense than worldly fire and its fuel is men and stones."
  },
  {
    surahNumber: 104, verseNumber: 7,
    arabic: "الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ",
    bengali: "যা হৃদয় পর্যন্ত পৌঁছে যায়।",
    english: "Which mounts directed at the hearts.",
    tafsirBengali: "এই আগুন শুধু শরীরের বাইরের অংশ পোড়ায় না, বরং এটি অন্তর পর্যন্ত পৌঁছে যায়। কারণ অন্তরেই কুফর, অহংকার এবং পাপের উৎস ছিল।",
    tafsirEnglish: "This fire does not just burn the outer body, but reaches the heart. Because the heart was the source of disbelief, arrogance and sin."
  },
  {
    surahNumber: 104, verseNumber: 8,
    arabic: "إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ",
    bengali: "নিশ্চয়ই এটা তাদের উপর আবদ্ধ থাকবে।",
    english: "Indeed, it [i.e., Hellfire] will be closed down upon them.",
    tafsirBengali: "জাহান্নামের দরজা তাদের উপর বন্ধ করে দেওয়া হবে। তারা সেখান থেকে বের হতে পারবে না এবং তাদের শাস্তি চিরস্থায়ী হবে।",
    tafsirEnglish: "The gates of Hell will be closed upon them. They will not be able to escape and their punishment will be eternal."
  },
  {
    surahNumber: 104, verseNumber: 9,
    arabic: "فِي عَمَدٍ مُّمَدَّدَةٍ",
    bengali: "দীর্ঘায়িত স্তম্ভসমূহে।",
    english: "In extended columns.",
    tafsirBengali: "তাদেরকে লম্বা লম্বা স্তম্ভে বেঁধে রাখা হবে যাতে তারা পালাতে না পারে। এটি তাদের অসহায়ত্ব এবং শাস্তির তীব্রতা বোঝায়।",
    tafsirEnglish: "They will be bound to extended pillars so they cannot escape. This signifies their helplessness and the intensity of their punishment."
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
  100: surahAadiyaatVerses,
  101: surahQaariaVerses,
  102: surahTakaathurVerses,
  103: surahAsrVerses,
  104: surahHumazaVerses,
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
