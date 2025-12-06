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

// Surah Al-A'la (87)
export const surahAlaVerses: Verse[] = [
  { surahNumber: 87, verseNumber: 1, arabic: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", bengali: "তোমার সুমহান প্রতিপালকের নামের পবিত্রতা ঘোষণা কর।", english: "Exalt the name of your Lord, the Most High.", tafsirBengali: "আল্লাহর নামের তাসবীহ পড়ো এবং তাঁর পবিত্রতা বর্ণনা কর।", tafsirEnglish: "Glorify and praise the name of your Lord, the Most High." },
  { surahNumber: 87, verseNumber: 2, arabic: "الَّذِي خَلَقَ فَسَوَّىٰ", bengali: "যিনি সৃষ্টি করেছেন ও সুঠাম করেছেন।", english: "Who created and proportioned.", tafsirBengali: "আল্লাহ সব কিছু সৃষ্টি করেছেন এবং সুন্দরভাবে গঠন করেছেন।", tafsirEnglish: "Allah created everything and proportioned it perfectly." },
  { surahNumber: 87, verseNumber: 3, arabic: "وَالَّذِي قَدَّرَ فَهَدَىٰ", bengali: "এবং যিনি নির্ধারণ করেছেন ও পথ দেখিয়েছেন।", english: "And who destined and [then] guided.", tafsirBengali: "প্রতিটি সৃষ্টির জন্য তাকদীর নির্ধারণ করেছেন এবং সঠিক পথ দেখিয়েছেন।", tafsirEnglish: "He destined everything and guided each creation to its purpose." },
  { surahNumber: 87, verseNumber: 4, arabic: "وَالَّذِي أَخْرَجَ الْمَرْعَىٰ", bengali: "এবং যিনি তৃণভূমি উৎপন্ন করেছেন।", english: "And who brings out the pasture.", tafsirBengali: "আল্লাহ যমীন থেকে সবুজ ঘাস ও তৃণভূমি উৎপন্ন করেন।", tafsirEnglish: "Allah brings forth green pastures from the earth." },
  { surahNumber: 87, verseNumber: 5, arabic: "فَجَعَلَهُ غُثَاءً أَحْوَىٰ", bengali: "অতঃপর তাকে কালো আবর্জনায় পরিণত করেছেন।", english: "And [then] makes it black stubble.", tafsirBengali: "তারপর সেই সবুজ ঘাস শুকিয়ে কালো খড়ে পরিণত হয়।", tafsirEnglish: "Then He turns it into dry, dark stubble." },
  { surahNumber: 87, verseNumber: 6, arabic: "سَنُقْرِئُكَ فَلَا تَنسَىٰ", bengali: "আমি তোমাকে পড়াব, ফলে তুমি ভুলবে না।", english: "We will make you recite, and you will not forget.", tafsirBengali: "আল্লাহ রাসূল (সা.) কে কুরআন মুখস্থ করিয়ে দেবেন।", tafsirEnglish: "Allah will make the Prophet memorize the Quran." },
  { surahNumber: 87, verseNumber: 7, arabic: "إِلَّا مَا شَاءَ اللَّهُ ۚ إِنَّهُ يَعْلَمُ الْجَهْرَ وَمَا يَخْفَىٰ", bengali: "আল্লাহ যা চান তা ছাড়া। নিশ্চয়ই তিনি জানেন প্রকাশ্য ও গোপন বিষয়।", english: "Except what Allah wills. Indeed, He knows what is declared and what is hidden.", tafsirBengali: "আল্লাহ প্রকাশ্য ও গোপন সব কিছু জানেন।", tafsirEnglish: "Allah knows everything, open and hidden." },
  { surahNumber: 87, verseNumber: 8, arabic: "وَنُيَسِّرُكَ لِلْيُسْرَىٰ", bengali: "এবং আমি তোমাকে সহজ পথে পরিচালিত করব।", english: "And We will ease you toward ease.", tafsirBengali: "আল্লাহ রাসূল (সা.) এর জন্য সহজ করে দেবেন।", tafsirEnglish: "Allah will make things easy for the Prophet." },
  { surahNumber: 87, verseNumber: 9, arabic: "فَذَكِّرْ إِن نَّفَعَتِ الذِّكْرَىٰ", bengali: "অতএব, উপদেশ দাও যদি উপদেশ উপকারে আসে।", english: "So remind, if the reminder should benefit.", tafsirBengali: "মানুষদের উপদেশ দাও, যদি তা কাজে আসে।", tafsirEnglish: "Give reminders when it benefits people." },
  { surahNumber: 87, verseNumber: 10, arabic: "سَيَذَّكَّرُ مَن يَخْشَىٰ", bengali: "যে ভয় করে সে উপদেশ গ্রহণ করবে।", english: "He who fears [Allah] will be reminded.", tafsirBengali: "যে আল্লাহকে ভয় করে সে উপদেশ মানবে।", tafsirEnglish: "Those who fear Allah will heed the reminder." },
  { surahNumber: 87, verseNumber: 11, arabic: "وَيَتَجَنَّبُهَا الْأَشْقَى", bengali: "এবং চরম হতভাগ্য তা এড়িয়ে চলবে।", english: "But the wretched one will avoid it.", tafsirBengali: "দুর্ভাগা ব্যক্তি উপদেশ থেকে দূরে থাকবে।", tafsirEnglish: "The wretched will avoid the reminder." },
  { surahNumber: 87, verseNumber: 12, arabic: "الَّذِي يَصْلَى النَّارَ الْكُبْرَىٰ", bengali: "যে মহাআগুনে প্রবেশ করবে।", english: "Who will enter the great Fire.", tafsirBengali: "সে জাহান্নামের বড় আগুনে প্রবেশ করবে।", tafsirEnglish: "They will enter the great Fire of Hell." },
  { surahNumber: 87, verseNumber: 13, arabic: "ثُمَّ لَا يَمُوتُ فِيهَا وَلَا يَحْيَىٰ", bengali: "অতঃপর সে সেখানে মরবেও না, বাঁচবেও না।", english: "Neither dying therein nor living.", tafsirBengali: "সে মরবেও না যে শান্তি পাবে, বাঁচবেও না যে সুখে থাকবে।", tafsirEnglish: "Neither dying for relief nor living in comfort." },
  { surahNumber: 87, verseNumber: 14, arabic: "قَدْ أَفْلَحَ مَن تَزَكَّىٰ", bengali: "সফলকাম হয়েছে যে পরিশুদ্ধ হয়েছে।", english: "He has certainly succeeded who purifies himself.", tafsirBengali: "যে নিজেকে পাপ থেকে পবিত্র করেছে সে সফল।", tafsirEnglish: "Success is for those who purify themselves." },
  { surahNumber: 87, verseNumber: 15, arabic: "وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ", bengali: "এবং তার প্রতিপালকের নাম স্মরণ করেছে ও নামায পড়েছে।", english: "And mentions the name of his Lord and prays.", tafsirBengali: "আল্লাহর নাম স্মরণ করে এবং নামায আদায় করে।", tafsirEnglish: "Remembers Allah's name and prays regularly." },
  { surahNumber: 87, verseNumber: 16, arabic: "بَلْ تُؤْثِرُونَ الْحَيَاةَ الدُّنْيَا", bengali: "বরং তোমরা পার্থিব জীবনকে প্রাধান্য দাও।", english: "But you prefer the worldly life.", tafsirBengali: "তোমরা দুনিয়ার জীবনকে বেশি গুরুত্ব দাও।", tafsirEnglish: "You give preference to worldly life." },
  { surahNumber: 87, verseNumber: 17, arabic: "وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ", bengali: "অথচ আখিরাত উত্তম ও চিরস্থায়ী।", english: "While the Hereafter is better and more enduring.", tafsirBengali: "আখিরাতের জীবন অনেক বেশি ভালো এবং স্থায়ী।", tafsirEnglish: "The Hereafter is better and everlasting." },
  { surahNumber: 87, verseNumber: 18, arabic: "إِنَّ هَٰذَا لَفِي الصُّحُفِ الْأُولَىٰ", bengali: "নিশ্চয়ই এটি পূর্ববর্তী কিতাবসমূহে আছে।", english: "Indeed, this is in the former scriptures.", tafsirBengali: "এই শিক্ষা আগের কিতাবগুলোতেও ছিল।", tafsirEnglish: "This teaching was in earlier scriptures." },
  { surahNumber: 87, verseNumber: 19, arabic: "صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ", bengali: "ইব্রাহীম ও মূসার কিতাবসমূহে।", english: "The scriptures of Abraham and Moses.", tafsirBengali: "ইব্রাহীম ও মূসা (আ.) এর কিতাবে এই কথা ছিল।", tafsirEnglish: "In the scriptures of Abraham and Moses." }
];

// Surah Al-Ghashiya (88)
export const surahGhashiyaVerses: Verse[] = [
  { surahNumber: 88, verseNumber: 1, arabic: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ", bengali: "তোমার কাছে কি আচ্ছন্নকারী দিবসের সংবাদ এসেছে?", english: "Has there reached you the report of the Overwhelming?", tafsirBengali: "কিয়ামতের খবর কি তোমার কাছে এসেছে?", tafsirEnglish: "Have you heard about the Day of Judgment?" },
  { surahNumber: 88, verseNumber: 2, arabic: "وُجُوهٌ يَوْمَئِذٍ خَاشِعَةٌ", bengali: "সেদিন অনেক মুখমণ্ডল হবে ভীত-বিনীত।", english: "Some faces, that Day, will be humbled.", tafsirBengali: "অনেক চেহারা সেদিন লজ্জিত ও ভীত থাকবে।", tafsirEnglish: "Many faces will be humbled that Day." },
  { surahNumber: 88, verseNumber: 3, arabic: "عَامِلَةٌ نَّاصِبَةٌ", bengali: "ক্লান্ত, পরিশ্রান্ত।", english: "Working [hard] and exhausted.", tafsirBengali: "তারা কঠিন পরিশ্রম করেও ক্লান্ত থাকবে।", tafsirEnglish: "Toiling and exhausted from hard work." },
  { surahNumber: 88, verseNumber: 4, arabic: "تَصْلَىٰ نَارًا حَامِيَةً", bengali: "প্রবেশ করবে জ্বলন্ত আগুনে।", english: "They will enter a blazing Fire.", tafsirBengali: "তারা প্রচণ্ড গরম আগুনে প্রবেশ করবে।", tafsirEnglish: "They will enter an intensely hot Fire." },
  { surahNumber: 88, verseNumber: 5, arabic: "تُسْقَىٰ مِنْ عَيْنٍ آنِيَةٍ", bengali: "তাদের পান করানো হবে ফুটন্ত ঝর্ণা থেকে।", english: "They will be given drink from a boiling spring.", tafsirBengali: "তাদের ফুটন্ত পানি পান করানো হবে।", tafsirEnglish: "They will drink from a boiling spring." },
  { surahNumber: 88, verseNumber: 6, arabic: "لَّيْسَ لَهُمْ طَعَامٌ إِلَّا مِن ضَرِيعٍ", bengali: "কাঁটাযুক্ত ঘাস ছাড়া তাদের কোনো খাদ্য নেই।", english: "For them there is no food except from a poisonous, thorny plant.", tafsirBengali: "তাদের খাবার হবে বিষাক্ত কাঁটাযুক্ত উদ্ভিদ।", tafsirEnglish: "Their food is only poisonous thorny plants." },
  { surahNumber: 88, verseNumber: 7, arabic: "لَّا يُسْمِنُ وَلَا يُغْنِي مِن جُوعٍ", bengali: "যা পুষ্ট করবে না এবং ক্ষুধাও মেটাবে না।", english: "Which neither nourishes nor avails against hunger.", tafsirBengali: "এই খাবার না পুষ্টি দেবে, না ক্ষুধা মিটাবে।", tafsirEnglish: "It neither nourishes nor satisfies hunger." },
  { surahNumber: 88, verseNumber: 8, arabic: "وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ", bengali: "সেদিন অনেক মুখমণ্ডল হবে সতেজ।", english: "Other faces, that Day, will show pleasure.", tafsirBengali: "অনেক চেহারা সেদিন আনন্দিত ও সতেজ থাকবে।", tafsirEnglish: "Other faces will be radiant with pleasure." },
  { surahNumber: 88, verseNumber: 9, arabic: "لِّسَعْيِهَا رَاضِيَةٌ", bengali: "তাদের প্রচেষ্টায় সন্তুষ্ট।", english: "With their effort satisfied.", tafsirBengali: "তারা তাদের কাজের ফলে সন্তুষ্ট থাকবে।", tafsirEnglish: "Satisfied with their efforts and rewards." },
  { surahNumber: 88, verseNumber: 10, arabic: "فِي جَنَّةٍ عَالِيَةٍ", bengali: "উচ্চ মর্যাদার জান্নাতে।", english: "In an elevated garden.", tafsirBengali: "তারা উঁচু মর্যাদার জান্নাতে থাকবে।", tafsirEnglish: "In a lofty Paradise." },
  { surahNumber: 88, verseNumber: 11, arabic: "لَّا تَسْمَعُ فِيهَا لَاغِيَةً", bengali: "সেখানে কোনো অসার কথা শুনবে না।", english: "Wherein they will hear no unsuitable speech.", tafsirBengali: "জান্নাতে কোনো বাজে কথা শোনা যাবে না।", tafsirEnglish: "No vain or harmful speech in Paradise." },
  { surahNumber: 88, verseNumber: 12, arabic: "فِيهَا عَيْنٌ جَارِيَةٌ", bengali: "সেখানে আছে প্রবাহিত ঝর্ণা।", english: "Within it is a flowing spring.", tafsirBengali: "জান্নাতে প্রবাহমান ঝর্ণা আছে।", tafsirEnglish: "Flowing springs in Paradise." },
  { surahNumber: 88, verseNumber: 13, arabic: "فِيهَا سُرُرٌ مَّرْفُوعَةٌ", bengali: "সেখানে আছে সুউচ্চ আসন।", english: "Within it are raised couches.", tafsirBengali: "জান্নাতে উঁচু উঁচু আসন থাকবে।", tafsirEnglish: "Elevated couches in Paradise." },
  { surahNumber: 88, verseNumber: 14, arabic: "وَأَكْوَابٌ مَّوْضُوعَةٌ", bengali: "এবং রক্ষিত পানপাত্র।", english: "And cups put in place.", tafsirBengali: "পানীয়ের জন্য সাজানো পেয়ালা থাকবে।", tafsirEnglish: "Cups arranged and ready." },
  { surahNumber: 88, verseNumber: 15, arabic: "وَنَمَارِقُ مَصْفُوفَةٌ", bengali: "এবং সারি সারি গালিচা।", english: "And cushions lined up.", tafsirBengali: "সারি সারি বালিশ ও গালিচা থাকবে।", tafsirEnglish: "Cushions arranged in rows." },
  { surahNumber: 88, verseNumber: 16, arabic: "وَزَرَابِيُّ مَبْثُوثَةٌ", bengali: "এবং বিছানো কার্পেট।", english: "And carpets spread around.", tafsirBengali: "সুন্দর কার্পেট বিছানো থাকবে।", tafsirEnglish: "Beautiful carpets spread out." },
  { surahNumber: 88, verseNumber: 17, arabic: "أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ", bengali: "তারা কি উটের দিকে তাকায় না, কীভাবে সৃষ্টি করা হয়েছে?", english: "Do they not look at the camels - how they are created?", tafsirBengali: "উটের সৃষ্টিতে আল্লাহর কুদরত দেখ।", tafsirEnglish: "Observe the amazing creation of camels." },
  { surahNumber: 88, verseNumber: 18, arabic: "وَإِلَى السَّمَاءِ كَيْفَ رُفِعَتْ", bengali: "এবং আকাশের দিকে, কীভাবে উঁচু করা হয়েছে?", english: "And at the sky - how it is raised?", tafsirBengali: "আকাশ কীভাবে উঁচুতে ধরে রাখা হয়েছে?", tafsirEnglish: "How the sky is raised high?" },
  { surahNumber: 88, verseNumber: 19, arabic: "وَإِلَى الْجِبَالِ كَيْفَ نُصِبَتْ", bengali: "এবং পাহাড়ের দিকে, কীভাবে স্থাপন করা হয়েছে?", english: "And at the mountains - how they are erected?", tafsirBengali: "পাহাড় কীভাবে দৃঢ়ভাবে স্থাপন করা হয়েছে?", tafsirEnglish: "How the mountains are firmly fixed?" },
  { surahNumber: 88, verseNumber: 20, arabic: "وَإِلَى الْأَرْضِ كَيْفَ سُطِحَتْ", bengali: "এবং পৃথিবীর দিকে, কীভাবে বিস্তৃত করা হয়েছে?", english: "And at the earth - how it is spread out?", tafsirBengali: "পৃথিবী কীভাবে বিস্তীর্ণ করা হয়েছে?", tafsirEnglish: "How the earth is spread out?" },
  { surahNumber: 88, verseNumber: 21, arabic: "فَذَكِّرْ إِنَّمَا أَنتَ مُذَكِّرٌ", bengali: "অতএব, উপদেশ দাও, তুমি তো কেবল উপদেশদাতা।", english: "So remind, you are only a reminder.", tafsirBengali: "তোমার কাজ হলো উপদেশ দেওয়া।", tafsirEnglish: "Your duty is only to remind." },
  { surahNumber: 88, verseNumber: 22, arabic: "لَّسْتَ عَلَيْهِم بِمُصَيْطِرٍ", bengali: "তুমি তাদের উপর জবরদস্তিকারী নও।", english: "You are not over them a controller.", tafsirBengali: "তুমি তাদের উপর কর্তৃত্বশীল নও।", tafsirEnglish: "You have no authority to force them." },
  { surahNumber: 88, verseNumber: 23, arabic: "إِلَّا مَن تَوَلَّىٰ وَكَفَرَ", bengali: "তবে যে মুখ ফিরিয়ে নেয় ও কুফরি করে।", english: "However, he who turns away and disbelieves.", tafsirBengali: "যে সত্য থেকে মুখ ফিরায় এবং অস্বীকার করে।", tafsirEnglish: "But those who turn away and disbelieve." },
  { surahNumber: 88, verseNumber: 24, arabic: "فَيُعَذِّبُهُ اللَّهُ الْعَذَابَ الْأَكْبَرَ", bengali: "আল্লাহ তাকে মহাশাস্তি দেবেন।", english: "Then Allah will punish him with the greatest punishment.", tafsirBengali: "আল্লাহ তাকে কঠিন শাস্তি দেবেন।", tafsirEnglish: "Allah will give them the greatest punishment." },
  { surahNumber: 88, verseNumber: 25, arabic: "إِنَّ إِلَيْنَا إِيَابَهُمْ", bengali: "নিশ্চয়ই আমাদের কাছেই তাদের প্রত্যাবর্তন।", english: "Indeed, to Us is their return.", tafsirBengali: "তাদের সবাইকে আল্লাহর কাছে ফিরে যেতে হবে।", tafsirEnglish: "They will all return to Allah." },
  { surahNumber: 88, verseNumber: 26, arabic: "ثُمَّ إِنَّ عَلَيْنَا حِسَابَهُم", bengali: "অতঃপর তাদের হিসাব আমাদের দায়িত্বে।", english: "Then indeed, upon Us is their account.", tafsirBengali: "তাদের হিসাব নেওয়া আল্লাহর দায়িত্ব।", tafsirEnglish: "Taking their account is Allah's responsibility." }
];

// Surah Al-Fajr (89)
export const surahFajrVerses: Verse[] = [
  { surahNumber: 89, verseNumber: 1, arabic: "وَالْفَجْرِ", bengali: "শপথ ফজরের।", english: "By the dawn.", tafsirBengali: "আল্লাহ ফজরের সময়ের শপথ করেছেন।", tafsirEnglish: "Allah swears by the dawn." },
  { surahNumber: 89, verseNumber: 2, arabic: "وَلَيَالٍ عَشْرٍ", bengali: "এবং দশ রাতের।", english: "And [by] ten nights.", tafsirBengali: "জিলহজ্জের প্রথম দশ রাতের শপথ।", tafsirEnglish: "The first ten nights of Dhul Hijjah." },
  { surahNumber: 89, verseNumber: 3, arabic: "وَالشَّفْعِ وَالْوَتْرِ", bengali: "এবং জোড় ও বেজোড়ের।", english: "And [by] the even [number] and the odd.", tafsirBengali: "জোড় ও বেজোড় সংখ্যার শপথ।", tafsirEnglish: "By the even and the odd numbers." },
  { surahNumber: 89, verseNumber: 4, arabic: "وَاللَّيْلِ إِذَا يَسْرِ", bengali: "এবং রাতের, যখন তা চলে যায়।", english: "And [by] the night when it passes.", tafsirBengali: "রাতের শপথ যখন তা অতিবাহিত হয়।", tafsirEnglish: "By the night as it passes away." },
  { surahNumber: 89, verseNumber: 5, arabic: "هَلْ فِي ذَٰلِكَ قَسَمٌ لِّذِي حِجْرٍ", bengali: "এতে কি বুদ্ধিমানের জন্য শপথ আছে?", english: "Is there in that an oath for one of perception?", tafsirBengali: "বুদ্ধিমান মানুষের জন্য এতে চিন্তার বিষয় আছে।", tafsirEnglish: "Is this not sufficient evidence for the intelligent?" },
  { surahNumber: 89, verseNumber: 6, arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ", bengali: "তুমি কি দেখনি তোমার প্রতিপালক আদ জাতির সাথে কী করেছেন?", english: "Have you not considered how your Lord dealt with Aad?", tafsirBengali: "আদ জাতিকে আল্লাহ কীভাবে ধ্বংস করেছেন?", tafsirEnglish: "How did Allah deal with the people of Aad?" },
  { surahNumber: 89, verseNumber: 7, arabic: "إِرَمَ ذَاتِ الْعِمَادِ", bengali: "ইরাম, যাদের সুউচ্চ স্তম্ভ ছিল।", english: "[With] Iram - who had lofty pillars.", tafsirBengali: "ইরাম নগরী, যার উঁচু স্তম্ভ ছিল।", tafsirEnglish: "Iram with its lofty pillars." },
  { surahNumber: 89, verseNumber: 8, arabic: "الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ", bengali: "যার মতো কোনো দেশে সৃষ্টি হয়নি।", english: "The likes of which were not produced in [all] the lands.", tafsirBengali: "এমন নগরী পৃথিবীতে আর ছিল না।", tafsirEnglish: "No city like it was ever created." },
  { surahNumber: 89, verseNumber: 9, arabic: "وَثَمُودَ الَّذِينَ جَابُوا الصَّخْرَ بِالْوَادِ", bengali: "এবং সামুদ, যারা উপত্যকায় পাথর কেটে গৃহ নির্মাণ করেছিল।", english: "And [with] Thamud, who carved out the rocks in the valley.", tafsirBengali: "সামুদ জাতি পাথর কেটে ঘর বানাত।", tafsirEnglish: "Thamud who carved homes in rocks." },
  { surahNumber: 89, verseNumber: 10, arabic: "وَفِرْعَوْنَ ذِي الْأَوْتَادِ", bengali: "এবং ফেরাউন, যে বিশাল সেনাবাহিনীর অধিকারী ছিল।", english: "And [with] Pharaoh, owner of the stakes.", tafsirBengali: "ফেরাউন যার বিশাল সাম্রাজ্য ছিল।", tafsirEnglish: "Pharaoh with his mighty kingdom." },
  { surahNumber: 89, verseNumber: 11, arabic: "الَّذِينَ طَغَوْا فِي الْبِلَادِ", bengali: "যারা দেশে সীমালঙ্ঘন করেছিল।", english: "Who oppressed within the lands.", tafsirBengali: "তারা দেশে দেশে অত্যাচার করেছিল।", tafsirEnglish: "They transgressed in the lands." },
  { surahNumber: 89, verseNumber: 12, arabic: "فَأَكْثَرُوا فِيهَا الْفَسَادَ", bengali: "এবং সেখানে বিশৃঙ্খলা বাড়িয়ে দিয়েছিল।", english: "And increased therein the corruption.", tafsirBengali: "তারা পৃথিবীতে ফাসাদ বৃদ্ধি করেছিল।", tafsirEnglish: "They spread corruption in the land." },
  { surahNumber: 89, verseNumber: 13, arabic: "فَصَبَّ عَلَيْهِمْ رَبُّكَ سَوْطَ عَذَابٍ", bengali: "তাই তোমার প্রতিপালক তাদের উপর শাস্তির কশাঘাত করেছেন।", english: "So your Lord poured upon them a scourge of punishment.", tafsirBengali: "আল্লাহ তাদের উপর কঠিন শাস্তি নাযিল করলেন।", tafsirEnglish: "Allah poured severe punishment on them." },
  { surahNumber: 89, verseNumber: 14, arabic: "إِنَّ رَبَّكَ لَبِالْمِرْصَادِ", bengali: "নিশ্চয়ই তোমার প্রতিপালক সতর্ক প্রহরায় আছেন।", english: "Indeed, your Lord is in observation.", tafsirBengali: "আল্লাহ সব কিছু দেখছেন এবং হিসাব রাখছেন।", tafsirEnglish: "Allah is always watching and recording." },
  { surahNumber: 89, verseNumber: 15, arabic: "فَأَمَّا الْإِنسَانُ إِذَا مَا ابْتَلَاهُ رَبُّهُ فَأَكْرَمَهُ وَنَعَّمَهُ فَيَقُولُ رَبِّي أَكْرَمَنِ", bengali: "মানুষের অবস্থা এই যে, যখন তার প্রতিপালক তাকে পরীক্ষা করেন এবং সম্মান ও নিয়ামত দেন, সে বলে, 'আমার প্রতিপালক আমাকে সম্মানিত করেছেন।'", english: "And as for man, when his Lord tries him and is generous to him, he says, 'My Lord has honored me.'", tafsirBengali: "সম্পদ পেলে মানুষ মনে করে আল্লাহ তাকে সম্মান দিয়েছেন।", tafsirEnglish: "When blessed, man thinks he is honored." },
  { surahNumber: 89, verseNumber: 16, arabic: "وَأَمَّا إِذَا مَا ابْتَلَاهُ فَقَدَرَ عَلَيْهِ رِزْقَهُ فَيَقُولُ رَبِّي أَهَانَنِ", bengali: "আর যখন তাকে পরীক্ষা করেন এবং তার রিযিক সংকীর্ণ করেন, সে বলে, 'আমার প্রতিপালক আমাকে অপমান করেছেন।'", english: "But when He tries him and restricts his provision, he says, 'My Lord has humiliated me.'", tafsirBengali: "দারিদ্র্যে পড়লে মনে করে আল্লাহ অপমান করেছেন।", tafsirEnglish: "When tested with poverty, thinks he is disgraced." },
  { surahNumber: 89, verseNumber: 17, arabic: "كَلَّا ۖ بَل لَّا تُكْرِمُونَ الْيَتِيمَ", bengali: "কখনো না, বরং তোমরা এতীমকে সম্মান কর না।", english: "No! But you do not honor the orphan.", tafsirBengali: "তোমরা এতীমদের সম্মান দাও না।", tafsirEnglish: "You do not honor the orphans." },
  { surahNumber: 89, verseNumber: 18, arabic: "وَلَا تَحَاضُّونَ عَلَىٰ طَعَامِ الْمِسْكِينِ", bengali: "এবং মিসকীনকে খাওয়াতে পরস্পরকে উৎসাহিত কর না।", english: "And you do not encourage one another to feed the poor.", tafsirBengali: "গরীবদের খাওয়ানোর জন্য উৎসাহিত কর না।", tafsirEnglish: "You don't encourage feeding the poor." },
  { surahNumber: 89, verseNumber: 19, arabic: "وَتَأْكُلُونَ التُّرَاثَ أَكْلًا لَّمًّا", bengali: "এবং তোমরা উত্তরাধিকার সম্পদ সম্পূর্ণ গ্রাস কর।", english: "And you consume inheritance, devouring [it] altogether.", tafsirBengali: "উত্তরাধিকার সম্পদ লোভের সাথে গ্রাস কর।", tafsirEnglish: "You greedily consume inheritance." },
  { surahNumber: 89, verseNumber: 20, arabic: "وَتُحِبُّونَ الْمَالَ حُبًّا جَمًّا", bengali: "এবং তোমরা সম্পদকে অত্যধিক ভালোবাস।", english: "And you love wealth with immense love.", tafsirBengali: "তোমরা সম্পদের প্রতি অত্যন্ত লোভী।", tafsirEnglish: "You love wealth excessively." },
  { surahNumber: 89, verseNumber: 21, arabic: "كَلَّا إِذَا دُكَّتِ الْأَرْضُ دَكًّا دَكًّا", bengali: "কখনো না! যখন পৃথিবী চূর্ণ-বিচূর্ণ হবে।", english: "No! When the earth has been leveled.", tafsirBengali: "যখন কিয়ামতে পৃথিবী চূর্ণ হবে।", tafsirEnglish: "When the earth is completely leveled." },
  { surahNumber: 89, verseNumber: 22, arabic: "وَجَاءَ رَبُّكَ وَالْمَلَكُ صَفًّا صَفًّا", bengali: "এবং তোমার প্রতিপালক আসবেন এবং ফেরেশতারা সারিবদ্ধভাবে।", english: "And your Lord has come and the angels, rank upon rank.", tafsirBengali: "আল্লাহ ও ফেরেশতারা সারি সারি আসবেন।", tafsirEnglish: "Allah and angels come in rows." },
  { surahNumber: 89, verseNumber: 23, arabic: "وَجِيءَ يَوْمَئِذٍ بِجَهَنَّمَ ۚ يَوْمَئِذٍ يَتَذَكَّرُ الْإِنسَانُ وَأَنَّىٰ لَهُ الذِّكْرَىٰ", bengali: "সেদিন জাহান্নাম আনা হবে, সেদিন মানুষ স্মরণ করবে, কিন্তু স্মরণ তার কী কাজে আসবে?", english: "And brought [within view], that Day, is Hell - that Day, man will remember, but what good will it be?", tafsirBengali: "সেদিন মানুষ মনে করবে কিন্তু লাভ হবে না।", tafsirEnglish: "Man will remember but it will be too late." },
  { surahNumber: 89, verseNumber: 24, arabic: "يَقُولُ يَا لَيْتَنِي قَدَّمْتُ لِحَيَاتِي", bengali: "সে বলবে, 'হায়! আমি যদি আমার জীবনের জন্য আগে কিছু পাঠাতাম!'", english: "He will say, 'Oh, I wish I had sent ahead for my life.'", tafsirBengali: "মানুষ আফসোস করবে যে আগে সৎকাজ করা উচিত ছিল।", tafsirEnglish: "Man will regret not doing good deeds." },
  { surahNumber: 89, verseNumber: 25, arabic: "فَيَوْمَئِذٍ لَّا يُعَذِّبُ عَذَابَهُ أَحَدٌ", bengali: "সেদিন তাঁর শাস্তির মতো কেউ শাস্তি দেবে না।", english: "So on that Day, none will punish as He will punish.", tafsirBengali: "সেদিন আল্লাহর শাস্তির মতো কঠিন শাস্তি কেউ দিতে পারবে না।", tafsirEnglish: "No punishment like Allah's punishment." },
  { surahNumber: 89, verseNumber: 26, arabic: "وَلَا يُوثِقُ وَثَاقَهُ أَحَدٌ", bengali: "এবং তাঁর বাঁধনের মতো কেউ বাঁধতে পারবে না।", english: "And none will bind as He will bind.", tafsirBengali: "আল্লাহর বাঁধনের মতো শক্ত বাঁধন কেউ দিতে পারবে না।", tafsirEnglish: "No binding like Allah's binding." },
  { surahNumber: 89, verseNumber: 27, arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ", bengali: "হে প্রশান্ত আত্মা!", english: "O reassured soul.", tafsirBengali: "যে আত্মা আল্লাহর স্মরণে শান্ত।", tafsirEnglish: "The soul at peace with Allah." },
  { surahNumber: 89, verseNumber: 28, arabic: "ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً", bengali: "তোমার প্রতিপালকের কাছে ফিরে এসো সন্তুষ্ট ও সন্তুষ্টিপ্রাপ্ত হয়ে।", english: "Return to your Lord, well-pleased and pleasing.", tafsirBengali: "আল্লাহর কাছে সন্তুষ্ট হয়ে ফিরে যাও।", tafsirEnglish: "Return to Allah pleased and accepted." },
  { surahNumber: 89, verseNumber: 29, arabic: "فَادْخُلِي فِي عِبَادِي", bengali: "অতএব, আমার বান্দাদের মধ্যে প্রবেশ কর।", english: "And enter among My servants.", tafsirBengali: "আল্লাহর প্রিয় বান্দাদের সাথে যোগ দাও।", tafsirEnglish: "Join My righteous servants." },
  { surahNumber: 89, verseNumber: 30, arabic: "وَادْخُلِي جَنَّتِي", bengali: "এবং আমার জান্নাতে প্রবেশ কর।", english: "And enter My Paradise.", tafsirBengali: "আল্লাহর জান্নাতে প্রবেশ কর।", tafsirEnglish: "Enter My Paradise." }
];

// Surah Al-Balad (90)
export const surahBaladVerses: Verse[] = [
  { surahNumber: 90, verseNumber: 1, arabic: "لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ", bengali: "আমি এই নগরীর শপথ করছি।", english: "I swear by this city.", tafsirBengali: "আল্লাহ মক্কা নগরীর শপথ করেছেন।", tafsirEnglish: "Allah swears by the city of Makkah." },
  { surahNumber: 90, verseNumber: 2, arabic: "وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ", bengali: "এবং তুমি এই নগরীতে বসবাসকারী।", english: "And you, [O Muhammad], are free of restriction in this city.", tafsirBengali: "রাসূল (সা.) এই নগরীতে বসবাস করছেন।", tafsirEnglish: "The Prophet resides in this city." },
  { surahNumber: 90, verseNumber: 3, arabic: "وَوَالِدٍ وَمَا وَلَدَ", bengali: "এবং পিতা ও তার সন্তানের শপথ।", english: "And [by] the father and that which was born.", tafsirBengali: "পিতা ও সন্তানের শপথ।", tafsirEnglish: "By the father and offspring." },
  { surahNumber: 90, verseNumber: 4, arabic: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي كَبَدٍ", bengali: "অবশ্যই আমি মানুষকে কষ্টের মধ্যে সৃষ্টি করেছি।", english: "We have certainly created man into hardship.", tafsirBengali: "মানুষের জীবন কষ্টে পূর্ণ।", tafsirEnglish: "Man is created to face hardships." },
  { surahNumber: 90, verseNumber: 5, arabic: "أَيَحْسَبُ أَن لَّن يَقْدِرَ عَلَيْهِ أَحَدٌ", bengali: "সে কি মনে করে তার উপর কেউ ক্ষমতাবান হবে না?", english: "Does he think that never will anyone overcome him?", tafsirBengali: "মানুষ কি মনে করে কেউ তাকে ধরতে পারবে না?", tafsirEnglish: "Does man think no one has power over him?" },
  { surahNumber: 90, verseNumber: 6, arabic: "يَقُولُ أَهْلَكْتُ مَالًا لُّبَدًا", bengali: "সে বলে, 'আমি অঢেল সম্পদ ব্যয় করেছি।'", english: "He says, 'I have spent wealth in abundance.'", tafsirBengali: "সে গর্ব করে বলে অনেক সম্পদ খরচ করেছি।", tafsirEnglish: "He boasts of spending much wealth." },
  { surahNumber: 90, verseNumber: 7, arabic: "أَيَحْسَبُ أَن لَّمْ يَرَهُ أَحَدٌ", bengali: "সে কি মনে করে কেউ তাকে দেখেনি?", english: "Does he think that no one has seen him?", tafsirBengali: "সে কি ভাবে আল্লাহ দেখেননি?", tafsirEnglish: "Does he think Allah hasn't seen him?" },
  { surahNumber: 90, verseNumber: 8, arabic: "أَلَمْ نَجْعَل لَّهُ عَيْنَيْنِ", bengali: "আমি কি তাকে দুটি চোখ দিইনি?", english: "Have We not made for him two eyes?", tafsirBengali: "আমি তাকে দেখার জন্য দুই চোখ দিয়েছি।", tafsirEnglish: "We gave him two eyes to see." },
  { surahNumber: 90, verseNumber: 9, arabic: "وَلِسَانًا وَشَفَتَيْنِ", bengali: "এবং একটি জিহ্বা ও দুটি ঠোঁট।", english: "And a tongue and two lips.", tafsirBengali: "কথা বলার জন্য জিহ্বা ও ঠোঁট দিয়েছি।", tafsirEnglish: "A tongue and lips to speak." },
  { surahNumber: 90, verseNumber: 10, arabic: "وَهَدَيْنَاهُ النَّجْدَيْنِ", bengali: "এবং তাকে দুটি পথ দেখিয়েছি।", english: "And have shown him the two ways.", tafsirBengali: "ভালো ও মন্দ দুটি পথ দেখিয়েছি।", tafsirEnglish: "Shown him good and evil paths." },
  { surahNumber: 90, verseNumber: 11, arabic: "فَلَا اقْتَحَمَ الْعَقَبَةَ", bengali: "কিন্তু সে কঠিন গিরিপথ অতিক্রম করেনি।", english: "But he has not broken through the difficult pass.", tafsirBengali: "সে কঠিন কাজ করতে এগিয়ে আসেনি।", tafsirEnglish: "But he didn't attempt the steep path." },
  { surahNumber: 90, verseNumber: 12, arabic: "وَمَا أَدْرَاكَ مَا الْعَقَبَةُ", bengali: "তুমি কি জান কঠিন গিরিপথ কী?", english: "And what can make you know what is the difficult pass?", tafsirBengali: "এই কঠিন পথ কী তা জান?", tafsirEnglish: "What is this difficult pass?" },
  { surahNumber: 90, verseNumber: 13, arabic: "فَكُّ رَقَبَةٍ", bengali: "দাস মুক্ত করা।", english: "It is the freeing of a slave.", tafsirBengali: "দাস মুক্ত করা সওয়াবের কাজ।", tafsirEnglish: "Freeing a slave." },
  { surahNumber: 90, verseNumber: 14, arabic: "أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ", bengali: "অথবা দুর্ভিক্ষের দিনে খাওয়ানো।", english: "Or feeding on a day of severe hunger.", tafsirBengali: "ক্ষুধার দিনে খাওয়ানো।", tafsirEnglish: "Feeding during famine." },
  { surahNumber: 90, verseNumber: 15, arabic: "يَتِيمًا ذَا مَقْرَبَةٍ", bengali: "আত্মীয় এতীমকে।", english: "An orphan of near relationship.", tafsirBengali: "আত্মীয় এতীমকে খাওয়ানো।", tafsirEnglish: "Feeding orphan relatives." },
  { surahNumber: 90, verseNumber: 16, arabic: "أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ", bengali: "অথবা ধুলোমলিন মিসকীনকে।", english: "Or a needy person in misery.", tafsirBengali: "দরিদ্র অভাবী মানুষকে খাওয়ানো।", tafsirEnglish: "Feeding the destitute poor." },
  { surahNumber: 90, verseNumber: 17, arabic: "ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ", bengali: "অতঃপর সে তাদের অন্তর্ভুক্ত হওয়া যারা ঈমান এনেছে এবং পরস্পরকে ধৈর্য ও দয়ার উপদেশ দিয়েছে।", english: "And then being among those who believed and advised one another to patience and mercy.", tafsirBengali: "ঈমানদার হওয়া এবং ধৈর্য ও দয়ার উপদেশ দেওয়া।", tafsirEnglish: "Believing and advising patience and mercy." },
  { surahNumber: 90, verseNumber: 18, arabic: "أُولَٰئِكَ أَصْحَابُ الْمَيْمَنَةِ", bengali: "এরাই ডান দিকের লোক।", english: "Those are the companions of the right.", tafsirBengali: "এরা জান্নাতী, ডান দিকের মানুষ।", tafsirEnglish: "They are the people of the right." },
  { surahNumber: 90, verseNumber: 19, arabic: "وَالَّذِينَ كَفَرُوا بِآيَاتِنَا هُمْ أَصْحَابُ الْمَشْأَمَةِ", bengali: "এবং যারা আমার আয়াত অস্বীকার করেছে তারা বাম দিকের লোক।", english: "But they who disbelieved in Our signs - those are the companions of the left.", tafsirBengali: "যারা অস্বীকার করেছে তারা বাম দিকের।", tafsirEnglish: "Disbelievers are people of the left." },
  { surahNumber: 90, verseNumber: 20, arabic: "عَلَيْهِمْ نَارٌ مُّؤْصَدَةٌ", bengali: "তাদের উপর থাকবে বদ্ধ আগুন।", english: "Over them will be fire closed in.", tafsirBengali: "তাদের চারদিকে আগুন বেষ্টিত থাকবে।", tafsirEnglish: "Fire will close over them." }
];

// Surah Ash-Shams (91)
export const surahShamsVerses: Verse[] = [
  { surahNumber: 91, verseNumber: 1, arabic: "وَالشَّمْسِ وَضُحَاهَا", bengali: "শপথ সূর্যের ও তার আলোকের।", english: "By the sun and its brightness.", tafsirBengali: "আল্লাহ সূর্য ও তার আলোর শপথ করেছেন।", tafsirEnglish: "Allah swears by the sun and its light." },
  { surahNumber: 91, verseNumber: 2, arabic: "وَالْقَمَرِ إِذَا تَلَاهَا", bengali: "এবং চাঁদের, যখন তা সূর্যের পশ্চাতে আসে।", english: "And [by] the moon when it follows it.", tafsirBengali: "চাঁদ যখন সূর্যের পিছে আসে।", tafsirEnglish: "The moon when it follows the sun." },
  { surahNumber: 91, verseNumber: 3, arabic: "وَالنَّهَارِ إِذَا جَلَّاهَا", bengali: "এবং দিনের, যখন তা সূর্যকে প্রকাশ করে।", english: "And [by] the day when it displays it.", tafsirBengali: "দিন যখন সূর্যকে উজ্জ্বল করে।", tafsirEnglish: "The day when it reveals the sun." },
  { surahNumber: 91, verseNumber: 4, arabic: "وَاللَّيْلِ إِذَا يَغْشَاهَا", bengali: "এবং রাতের, যখন তা সূর্যকে ঢেকে দেয়।", english: "And [by] the night when it covers it.", tafsirBengali: "রাত যখন অন্ধকারে ঢেকে দেয়।", tafsirEnglish: "The night when it covers the sun." },
  { surahNumber: 91, verseNumber: 5, arabic: "وَالسَّمَاءِ وَمَا بَنَاهَا", bengali: "এবং আকাশের এবং যিনি তা নির্মাণ করেছেন।", english: "And [by] the sky and He who constructed it.", tafsirBengali: "আকাশ এবং এর নির্মাতার শপথ।", tafsirEnglish: "The sky and its Builder." },
  { surahNumber: 91, verseNumber: 6, arabic: "وَالْأَرْضِ وَمَا طَحَاهَا", bengali: "এবং পৃথিবীর এবং যিনি তা বিস্তৃত করেছেন।", english: "And [by] the earth and He who spread it.", tafsirBengali: "পৃথিবী এবং এর বিস্তারকারীর শপথ।", tafsirEnglish: "The earth and He who spread it." },
  { surahNumber: 91, verseNumber: 7, arabic: "وَنَفْسٍ وَمَا سَوَّاهَا", bengali: "এবং প্রাণের এবং যিনি তাকে সুঠাম করেছেন।", english: "And [by] the soul and He who proportioned it.", tafsirBengali: "আত্মা এবং এর সৃষ্টিকর্তার শপথ।", tafsirEnglish: "The soul and He who proportioned it." },
  { surahNumber: 91, verseNumber: 8, arabic: "فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا", bengali: "অতঃপর তাকে তার পাপ ও তাকওয়ার জ্ঞান দিয়েছেন।", english: "And inspired it with discernment of its wickedness and its righteousness.", tafsirBengali: "আল্লাহ মানুষকে ভালো-মন্দ চেনার ক্ষমতা দিয়েছেন।", tafsirEnglish: "Allah gave knowledge of good and evil." },
  { surahNumber: 91, verseNumber: 9, arabic: "قَدْ أَفْلَحَ مَن زَكَّاهَا", bengali: "যে তাকে পরিশুদ্ধ করেছে সে সফলকাম।", english: "He has succeeded who purifies it.", tafsirBengali: "যে নিজেকে পরিশুদ্ধ করে সে সফল।", tafsirEnglish: "Success is for those who purify their soul." },
  { surahNumber: 91, verseNumber: 10, arabic: "وَقَدْ خَابَ مَن دَسَّاهَا", bengali: "এবং যে তাকে কলুষিত করেছে সে ব্যর্থ।", english: "And he has failed who corrupts it.", tafsirBengali: "যে আত্মাকে কলুষিত করে সে ব্যর্থ।", tafsirEnglish: "Failure is for those who corrupt it." },
  { surahNumber: 91, verseNumber: 11, arabic: "كَذَّبَتْ ثَمُودُ بِطَغْوَاهَا", bengali: "সামুদ তাদের সীমালঙ্ঘনের কারণে মিথ্যারোপ করেছিল।", english: "Thamud denied by reason of their transgression.", tafsirBengali: "সামুদ জাতি অহংকারে সত্য অস্বীকার করেছিল।", tafsirEnglish: "Thamud denied due to their arrogance." },
  { surahNumber: 91, verseNumber: 12, arabic: "إِذِ انبَعَثَ أَشْقَاهَا", bengali: "যখন তাদের সবচেয়ে হতভাগ্য ব্যক্তি উঠে দাঁড়াল।", english: "When the most wretched of them was sent forth.", tafsirBengali: "তাদের সবচেয়ে দুর্ভাগা লোক অগ্রসর হল।", tafsirEnglish: "Their most wretched one arose." },
  { surahNumber: 91, verseNumber: 13, arabic: "فَقَالَ لَهُمْ رَسُولُ اللَّهِ نَاقَةَ اللَّهِ وَسُقْيَاهَا", bengali: "আল্লাহর রাসূল তাদের বললেন, 'আল্লাহর উটনী এবং তার পানি পানের ব্যবস্থা।'", english: "And the messenger of Allah said to them, '[Do not harm] the she-camel of Allah or her drink.'", tafsirBengali: "সালেহ (আ.) তাদের উটনী সম্পর্কে সতর্ক করলেন।", tafsirEnglish: "Saleh warned them about the she-camel." },
  { surahNumber: 91, verseNumber: 14, arabic: "فَكَذَّبُوهُ فَعَقَرُوهَا فَدَمْدَمَ عَلَيْهِمْ رَبُّهُم بِذَنبِهِمْ فَسَوَّاهَا", bengali: "তারা তাঁকে মিথ্যাবাদী বলল এবং উটনী হত্যা করল। তাদের প্রতিপালক তাদের পাপের কারণে তাদের ধ্বংস করলেন।", english: "But they denied him and hamstrung her. So their Lord brought down upon them destruction for their sin and made it equal.", tafsirBengali: "তারা উটনী হত্যা করল এবং আল্লাহ তাদের ধ্বংস করলেন।", tafsirEnglish: "They killed the camel and Allah destroyed them." },
  { surahNumber: 91, verseNumber: 15, arabic: "وَلَا يَخَافُ عُقْبَاهَا", bengali: "এবং তিনি এর পরিণতির ভয় করেন না।", english: "And He does not fear the consequence thereof.", tafsirBengali: "আল্লাহ কারো ভয় করেন না।", tafsirEnglish: "Allah fears no consequence." }
];

// Surah Al-Layl (92)
export const surahLaylVerses: Verse[] = [
  { surahNumber: 92, verseNumber: 1, arabic: "وَاللَّيْلِ إِذَا يَغْشَىٰ", bengali: "শপথ রাতের, যখন তা আচ্ছন্ন করে।", english: "By the night when it covers.", tafsirBengali: "আল্লাহ রাতের শপথ করেছেন।", tafsirEnglish: "Allah swears by the night." },
  { surahNumber: 92, verseNumber: 2, arabic: "وَالنَّهَارِ إِذَا تَجَلَّىٰ", bengali: "এবং দিনের, যখন তা উদ্ভাসিত হয়।", english: "And [by] the day when it appears.", tafsirBengali: "দিন যখন আলোকিত হয়।", tafsirEnglish: "By the day when it shines." },
  { surahNumber: 92, verseNumber: 3, arabic: "وَمَا خَلَقَ الذَّكَرَ وَالْأُنثَىٰ", bengali: "এবং যিনি পুরুষ ও নারী সৃষ্টি করেছেন।", english: "And [by] He who created the male and female.", tafsirBengali: "আল্লাহ পুরুষ ও নারী সৃষ্টি করেছেন।", tafsirEnglish: "He who created male and female." },
  { surahNumber: 92, verseNumber: 4, arabic: "إِنَّ سَعْيَكُمْ لَشَتَّىٰ", bengali: "নিশ্চয়ই তোমাদের কর্ম বিভিন্ন।", english: "Indeed, your efforts are diverse.", tafsirBengali: "মানুষের কাজকর্ম বিভিন্ন ধরনের।", tafsirEnglish: "Human efforts are diverse." },
  { surahNumber: 92, verseNumber: 5, arabic: "فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ", bengali: "যে দান করেছে এবং তাকওয়া অবলম্বন করেছে।", english: "As for he who gives and fears Allah.", tafsirBengali: "যে দান করে এবং আল্লাহকে ভয় করে।", tafsirEnglish: "He who gives and fears Allah." },
  { surahNumber: 92, verseNumber: 6, arabic: "وَصَدَّقَ بِالْحُسْنَىٰ", bengali: "এবং কল্যাণকে সত্য বলে মেনেছে।", english: "And believes in the best [reward].", tafsirBengali: "জান্নাতের প্রতিদানে বিশ্বাস করে।", tafsirEnglish: "Believes in the best reward." },
  { surahNumber: 92, verseNumber: 7, arabic: "فَسَنُيَسِّرُهُ لِلْيُسْرَىٰ", bengali: "আমি তাকে সহজ পথের জন্য সুগম করব।", english: "We will ease him toward ease.", tafsirBengali: "আমরা তাকে সহজ পথে চালাব।", tafsirEnglish: "We will make the easy path easy." },
  { surahNumber: 92, verseNumber: 8, arabic: "وَأَمَّا مَن بَخِلَ وَاسْتَغْنَىٰ", bengali: "আর যে কৃপণতা করেছে এবং নিজেকে অমুখাপেক্ষী মনে করেছে।", english: "But as for he who withholds and considers himself free of need.", tafsirBengali: "যে কৃপণ এবং অহংকারী।", tafsirEnglish: "He who is stingy and self-sufficient." },
  { surahNumber: 92, verseNumber: 9, arabic: "وَكَذَّبَ بِالْحُسْنَىٰ", bengali: "এবং কল্যাণকে মিথ্যা প্রতিপন্ন করেছে।", english: "And denies the best [reward].", tafsirBengali: "প্রতিদানকে অস্বীকার করে।", tafsirEnglish: "Denies the best reward." },
  { surahNumber: 92, verseNumber: 10, arabic: "فَسَنُيَسِّرُهُ لِلْعُسْرَىٰ", bengali: "আমি তাকে কঠিন পথের জন্য সুগম করব।", english: "We will ease him toward difficulty.", tafsirBengali: "আমরা তাকে কঠিন পথে চালাব।", tafsirEnglish: "We will make the hard path easy." },
  { surahNumber: 92, verseNumber: 11, arabic: "وَمَا يُغْنِي عَنْهُ مَالُهُ إِذَا تَرَدَّىٰ", bengali: "তার সম্পদ তার কাজে আসবে না যখন সে ধ্বংসে পতিত হবে।", english: "And what will his wealth avail him when he falls?", tafsirBengali: "মৃত্যুর সময় সম্পদ কাজে আসবে না।", tafsirEnglish: "Wealth won't help when he falls." },
  { surahNumber: 92, verseNumber: 12, arabic: "إِنَّ عَلَيْنَا لَلْهُدَىٰ", bengali: "নিশ্চয়ই পথ দেখানো আমাদের দায়িত্ব।", english: "Indeed, upon Us is guidance.", tafsirBengali: "সঠিক পথ দেখানো আল্লাহর দায়িত্ব।", tafsirEnglish: "Guidance is from Allah." },
  { surahNumber: 92, verseNumber: 13, arabic: "وَإِنَّ لَنَا لَلْآخِرَةَ وَالْأُولَىٰ", bengali: "এবং আখিরাত ও দুনিয়া আমাদেরই।", english: "And indeed, to Us belongs the Hereafter and the first.", tafsirBengali: "দুনিয়া ও আখিরাত আল্লাহর।", tafsirEnglish: "The Hereafter and this world belong to Allah." },
  { surahNumber: 92, verseNumber: 14, arabic: "فَأَنذَرْتُكُمْ نَارًا تَلَظَّىٰ", bengali: "তাই আমি তোমাদের প্রজ্বলিত আগুন সম্পর্কে সতর্ক করছি।", english: "So I have warned you of a Fire which is blazing.", tafsirBengali: "জ্বলন্ত আগুন সম্পর্কে সতর্ক করছি।", tafsirEnglish: "Warning about a blazing Fire." },
  { surahNumber: 92, verseNumber: 15, arabic: "لَا يَصْلَاهَا إِلَّا الْأَشْقَى", bengali: "চরম দুর্ভাগা ছাড়া কেউ তাতে প্রবেশ করবে না।", english: "None will burn therein except the most wretched one.", tafsirBengali: "শুধু চরম দুর্ভাগ্যরাই এতে প্রবেশ করবে।", tafsirEnglish: "Only the most wretched will enter." },
  { surahNumber: 92, verseNumber: 16, arabic: "الَّذِي كَذَّبَ وَتَوَلَّىٰ", bengali: "যে মিথ্যারোপ করেছে এবং মুখ ফিরিয়ে নিয়েছে।", english: "Who had denied and turned away.", tafsirBengali: "যে মিথ্যা বলেছে এবং ফিরে গেছে।", tafsirEnglish: "Who denied and turned away." },
  { surahNumber: 92, verseNumber: 17, arabic: "وَسَيُجَنَّبُهَا الْأَتْقَى", bengali: "এবং মুত্তাকীকে তা থেকে দূরে রাখা হবে।", english: "But the righteous one will avoid it.", tafsirBengali: "মুত্তাকী ব্যক্তিকে এ থেকে বাঁচানো হবে।", tafsirEnglish: "The righteous will be kept away." },
  { surahNumber: 92, verseNumber: 18, arabic: "الَّذِي يُؤْتِي مَالَهُ يَتَزَكَّىٰ", bengali: "যে তার সম্পদ দান করে পবিত্রতা অর্জনের জন্য।", english: "Who gives [from] his wealth to purify himself.", tafsirBengali: "যে পবিত্রতার জন্য সম্পদ দান করে।", tafsirEnglish: "Who gives wealth to purify himself." },
  { surahNumber: 92, verseNumber: 19, arabic: "وَمَا لِأَحَدٍ عِندَهُ مِن نِّعْمَةٍ تُجْزَىٰ", bengali: "তার কাছে কারো এমন কোনো অনুগ্রহ নেই যার প্রতিদান দিতে হবে।", english: "And not [giving] for anyone who has [done him] a favor to be rewarded.", tafsirBengali: "কোনো উপকারের বিনিময়ে নয়।", tafsirEnglish: "Not to repay anyone's favor." },
  { surahNumber: 92, verseNumber: 20, arabic: "إِلَّا ابْتِغَاءَ وَجْهِ رَبِّهِ الْأَعْلَىٰ", bengali: "বরং কেবল তার মহান প্রতিপালকের সন্তুষ্টি লাভের জন্য।", english: "But only seeking the countenance of his Lord, Most High.", tafsirBengali: "শুধু আল্লাহর সন্তুষ্টির জন্য।", tafsirEnglish: "Only seeking Allah's pleasure." },
  { surahNumber: 92, verseNumber: 21, arabic: "وَلَسَوْفَ يَرْضَىٰ", bengali: "এবং অচিরেই সে সন্তুষ্ট হবে।", english: "And he is going to be satisfied.", tafsirBengali: "সে অবশ্যই সন্তুষ্ট হবে।", tafsirEnglish: "He will surely be satisfied." }
];

// Surah Ad-Duha (93)
export const surahDuhaVerses: Verse[] = [
  { surahNumber: 93, verseNumber: 1, arabic: "وَالضُّحَىٰ", bengali: "শপথ পূর্বাহ্নের।", english: "By the morning brightness.", tafsirBengali: "আল্লাহ সকালের আলোর শপথ করেছেন।", tafsirEnglish: "Allah swears by the morning light." },
  { surahNumber: 93, verseNumber: 2, arabic: "وَاللَّيْلِ إِذَا سَجَىٰ", bengali: "এবং রাতের, যখন তা নিস্তব্ধ হয়।", english: "And [by] the night when it covers with darkness.", tafsirBengali: "রাত যখন শান্ত ও অন্ধকার হয়।", tafsirEnglish: "By the night when it is still." },
  { surahNumber: 93, verseNumber: 3, arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", bengali: "তোমার প্রতিপালক তোমাকে ত্যাগ করেননি এবং অসন্তুষ্ট হননি।", english: "Your Lord has not taken leave of you, nor has He detested [you].", tafsirBengali: "আল্লাহ রাসূল (সা.) কে ত্যাগ করেননি।", tafsirEnglish: "Allah has not abandoned the Prophet." },
  { surahNumber: 93, verseNumber: 4, arabic: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ", bengali: "এবং আখিরাত তোমার জন্য দুনিয়া থেকে উত্তম।", english: "And the Hereafter is better for you than the first [life].", tafsirBengali: "আখিরাত দুনিয়ার চেয়ে ভালো।", tafsirEnglish: "The Hereafter is better for you." },
  { surahNumber: 93, verseNumber: 5, arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", bengali: "এবং তোমার প্রতিপালক তোমাকে দেবেন, ফলে তুমি সন্তুষ্ট হবে।", english: "And your Lord is going to give you, and you will be satisfied.", tafsirBengali: "আল্লাহ এত দেবেন যে সন্তুষ্ট হয়ে যাবেন।", tafsirEnglish: "Allah will give until you are satisfied." },
  { surahNumber: 93, verseNumber: 6, arabic: "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ", bengali: "তিনি কি তোমাকে এতীম পাননি এবং আশ্রয় দেননি?", english: "Did He not find you an orphan and give [you] refuge?", tafsirBengali: "আল্লাহ এতীম অবস্থায় আশ্রয় দিয়েছেন।", tafsirEnglish: "Allah gave refuge when you were orphan." },
  { surahNumber: 93, verseNumber: 7, arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ", bengali: "এবং তোমাকে পথহারা পেয়েছেন, অতঃপর পথ দেখিয়েছেন।", english: "And He found you lost and guided [you].", tafsirBengali: "পথ না জানা অবস্থায় হেদায়েত দিয়েছেন।", tafsirEnglish: "Allah guided when you were unaware." },
  { surahNumber: 93, verseNumber: 8, arabic: "وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ", bengali: "এবং তোমাকে অভাবী পেয়েছেন, অতঃপর অভাবমুক্ত করেছেন।", english: "And He found you poor and made [you] self-sufficient.", tafsirBengali: "দরিদ্র অবস্থায় ধনী করে দিয়েছেন।", tafsirEnglish: "Allah enriched you from poverty." },
  { surahNumber: 93, verseNumber: 9, arabic: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ", bengali: "অতএব, এতীমের প্রতি কঠোর হয়ো না।", english: "So as for the orphan, do not oppress [him].", tafsirBengali: "এতীমের উপর জুলুম করো না।", tafsirEnglish: "Do not oppress orphans." },
  { surahNumber: 93, verseNumber: 10, arabic: "وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ", bengali: "এবং প্রার্থীকে ধমক দিও না।", english: "And as for the petitioner, do not repel [him].", tafsirBengali: "যে সাহায্য চায় তাকে ধমক দিও না।", tafsirEnglish: "Do not repel those who ask." },
  { surahNumber: 93, verseNumber: 11, arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", bengali: "এবং তোমার প্রতিপালকের নিয়ামতের কথা প্রচার কর।", english: "But as for the favor of your Lord, report [it].", tafsirBengali: "আল্লাহর নিয়ামতের কথা বল।", tafsirEnglish: "Proclaim the blessings of Allah." }
];

// Surah Ash-Sharh (94)
export const surahSharhVerses: Verse[] = [
  { surahNumber: 94, verseNumber: 1, arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", bengali: "আমি কি তোমার বক্ষ উন্মুক্ত করে দিইনি?", english: "Did We not expand for you your breast?", tafsirBengali: "আল্লাহ রাসূল (সা.) এর অন্তর প্রশস্ত করে দিয়েছেন।", tafsirEnglish: "Allah expanded the Prophet's heart." },
  { surahNumber: 94, verseNumber: 2, arabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ", bengali: "এবং তোমার থেকে তোমার বোঝা নামিয়ে দিয়েছি।", english: "And We removed from you your burden.", tafsirBengali: "রাসূল (সা.) এর বোঝা হালকা করে দিয়েছেন।", tafsirEnglish: "Allah removed the Prophet's burden." },
  { surahNumber: 94, verseNumber: 3, arabic: "الَّذِي أَنقَضَ ظَهْرَكَ", bengali: "যা তোমার পিঠ ভেঙে দিচ্ছিল।", english: "Which had weighed upon your back.", tafsirBengali: "যে বোঝা পিঠ ভারী করে দিয়েছিল।", tafsirEnglish: "Which was breaking your back." },
  { surahNumber: 94, verseNumber: 4, arabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", bengali: "এবং তোমার খ্যাতি উচ্চ করে দিয়েছি।", english: "And raised high for you your repute.", tafsirBengali: "রাসূল (সা.) এর নাম সুউচ্চ করে দিয়েছেন।", tafsirEnglish: "Allah raised the Prophet's name high." },
  { surahNumber: 94, verseNumber: 5, arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", bengali: "নিশ্চয়ই কষ্টের সাথে সহজতা আছে।", english: "For indeed, with hardship [will be] ease.", tafsirBengali: "প্রতিটি কষ্টের সাথে সহজতা আসে।", tafsirEnglish: "With every hardship comes ease." },
  { surahNumber: 94, verseNumber: 6, arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", bengali: "নিশ্চয়ই কষ্টের সাথে সহজতা আছে।", english: "Indeed, with hardship [will be] ease.", tafsirBengali: "আবারও বলা হচ্ছে - কষ্টের সাথে সহজতা।", tafsirEnglish: "Indeed, with hardship comes ease." },
  { surahNumber: 94, verseNumber: 7, arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", bengali: "অতএব, যখন তুমি অবসর পাও, তখন পরিশ্রম কর।", english: "So when you have finished [your duties], then stand up [for worship].", tafsirBengali: "অবসরে ইবাদতে মনোযোগ দাও।", tafsirEnglish: "When free, devote to worship." },
  { surahNumber: 94, verseNumber: 8, arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", bengali: "এবং তোমার প্রতিপালকের প্রতি মনোনিবেশ কর।", english: "And to your Lord direct [your] longing.", tafsirBengali: "আল্লাহর দিকে ধাবিত হও।", tafsirEnglish: "Turn your attention to your Lord." }
];

// Surah At-Tin (95)
export const surahTinVerses: Verse[] = [
  { surahNumber: 95, verseNumber: 1, arabic: "وَالتِّينِ وَالزَّيْتُونِ", bengali: "শপথ তীন ও যায়তুনের।", english: "By the fig and the olive.", tafsirBengali: "আল্লাহ তাআলা তীন ও যায়তুনের শপথ করেছেন। এগুলো বরকতময় ফল।", tafsirEnglish: "Allah swears by the fig and olive, blessed fruits from the lands of prophets." },
  { surahNumber: 95, verseNumber: 2, arabic: "وَطُورِ سِينِينَ", bengali: "শপথ সিনাই পর্বতের।", english: "And [by] Mount Sinai.", tafsirBengali: "তূর সীনীন হলো সিনাই পর্বত, যেখানে আল্লাহ মূসা (আ.) এর সাথে কথা বলেছিলেন।", tafsirEnglish: "Mount Sinai where Allah spoke to Moses and revealed the Torah." },
  { surahNumber: 95, verseNumber: 3, arabic: "وَهَٰذَا الْبَلَدِ الْأَمِينِ", bengali: "এবং এই নিরাপদ নগরীর (মক্কা)।", english: "And [by] this secure city [Makkah].", tafsirBengali: "মক্কা একটি নিরাপদ ও পবিত্র শহর যেখানে রাসূলুল্লাহ (সা.) জন্মগ্রহণ করেছেন।", tafsirEnglish: "Makkah, the sacred and safe city where the Prophet was born." },
  { surahNumber: 95, verseNumber: 4, arabic: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ", bengali: "অবশ্যই আমি মানুষকে সৃষ্টি করেছি সর্বোত্তম গঠনে।", english: "We have certainly created man in the best of stature.", tafsirBengali: "আল্লাহ মানুষকে সর্বোত্তম আকৃতিতে সৃষ্টি করেছেন - সোজা দেহ, সুন্দর অবয়ব, বুদ্ধি-বিবেক দিয়ে।", tafsirEnglish: "Allah created humans in the best form with upright stature, intellect, and consciousness." },
  { surahNumber: 95, verseNumber: 5, arabic: "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ", bengali: "অতঃপর আমি তাকে হীনতার হীনতম স্তরে ফিরিয়ে দিই।", english: "Then We return him to the lowest of the low.", tafsirBengali: "যখন মানুষ কুফরি করে, সে নীচতম অবস্থায় পতিত হয়।", tafsirEnglish: "When humans reject faith, they fall to the lowest of the low." },
  { surahNumber: 95, verseNumber: 6, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", bengali: "কিন্তু যারা ঈমান এনেছে এবং সৎকর্ম করেছে, তাদের জন্য রয়েছে অফুরন্ত পুরস্কার।", english: "Except for those who believe and do righteous deeds, for they will have a reward uninterrupted.", tafsirBengali: "যারা ঈমান আনে এবং সৎকাজ করে তারা এই অবনতি থেকে রক্ষা পাবে।", tafsirEnglish: "Those who believe and do good are saved and receive unending reward." },
  { surahNumber: 95, verseNumber: 7, arabic: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ", bengali: "অতঃপর কিসে তোমাকে বিচার দিবসে মিথ্যাবাদী করে?", english: "So what yet causes you to deny the Recompense?", tafsirBengali: "এই সব প্রমাণ দেখার পরও কেন বিচার দিবসকে অস্বীকার করো?", tafsirEnglish: "After all these proofs, what causes you to deny Judgment Day?" },
  { surahNumber: 95, verseNumber: 8, arabic: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", bengali: "আল্লাহ কি বিচারকদের মধ্যে শ্রেষ্ঠ বিচারক নন?", english: "Is not Allah the most just of judges?", tafsirBengali: "আল্লাহ সর্বশ্রেষ্ঠ বিচারক। তিনি অবশ্যই ন্যায়বিচার করবেন।", tafsirEnglish: "Allah is the best and most just of all judges." }
];

// Surah Al-Alaq (96)
export const surahAlaqVerses: Verse[] = [
  { surahNumber: 96, verseNumber: 1, arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", bengali: "পড় তোমার প্রতিপালকের নামে, যিনি সৃষ্টি করেছেন।", english: "Read in the name of your Lord who created.", tafsirBengali: "এটি সর্বপ্রথম নাযিলকৃত আয়াত। আল্লাহর নামে পড়ার নির্দেশ দেওয়া হয়েছে।", tafsirEnglish: "This is the first verse ever revealed, commanding to read in Allah's name." },
  { surahNumber: 96, verseNumber: 2, arabic: "خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ", bengali: "তিনি মানুষকে সৃষ্টি করেছেন জমাট রক্ত থেকে।", english: "Created man from a clinging substance.", tafsirBengali: "আল্লাহ মানুষকে ক্ষুদ্র অবস্থা থেকে পূর্ণাঙ্গ মানুষে পরিণত করেন।", tafsirEnglish: "Allah transforms humans from a tiny clot into complete beings." },
  { surahNumber: 96, verseNumber: 3, arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ", bengali: "পড়, তোমার প্রতিপালক মহিমান্বিত।", english: "Read, and your Lord is the most Generous.", tafsirBengali: "আল্লাহ সবচেয়ে বেশি সম্মানিত ও দয়ালু।", tafsirEnglish: "Allah is the Most Generous, giving abundantly." },
  { surahNumber: 96, verseNumber: 4, arabic: "الَّذِي عَلَّمَ بِالْقَلَمِ", bengali: "যিনি কলমের সাহায্যে শিক্ষা দিয়েছেন।", english: "Who taught by the pen.", tafsirBengali: "আল্লাহ মানুষকে কলম দিয়ে লেখা শিখিয়েছেন।", tafsirEnglish: "Allah taught humans through the pen." },
  { surahNumber: 96, verseNumber: 5, arabic: "عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ", bengali: "মানুষকে শিক্ষা দিয়েছেন যা সে জানত না।", english: "Taught man that which he knew not.", tafsirBengali: "মানুষের সব জ্ঞানের উৎস আল্লাহ।", tafsirEnglish: "Allah is the source of all human knowledge." },
  { surahNumber: 96, verseNumber: 6, arabic: "كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ", bengali: "কখনো না, মানুষ তো সীমালঙ্ঘন করে।", english: "No! [But] indeed, man transgresses.", tafsirBengali: "মানুষ আল্লাহর নিয়ামত পেয়ে অবাধ্য হয়।", tafsirEnglish: "Despite blessings, humans become disobedient." },
  { surahNumber: 96, verseNumber: 7, arabic: "أَن رَّآهُ اسْتَغْنَىٰ", bengali: "কারণ সে নিজেকে অভাবমুক্ত মনে করে।", english: "Because he sees himself self-sufficient.", tafsirBengali: "সম্পদশালী হলে মানুষ অহংকারী হয়ে যায়।", tafsirEnglish: "When wealthy, humans become arrogant." },
  { surahNumber: 96, verseNumber: 8, arabic: "إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ", bengali: "নিশ্চয়ই তোমার প্রতিপালকের কাছেই প্রত্যাবর্তন।", english: "Indeed, to your Lord is the return.", tafsirBengali: "সবাইকে আল্লাহর কাছে ফিরে যেতে হবে।", tafsirEnglish: "Everyone must return to Allah for judgment." },
  { surahNumber: 96, verseNumber: 9, arabic: "أَرَأَيْتَ الَّذِي يَنْهَىٰ", bengali: "তুমি কি তাকে দেখেছ, যে নিষেধ করে।", english: "Have you seen the one who forbids.", tafsirBengali: "এই আয়াত আবু জাহলের কথা বলা হয়েছে।", tafsirEnglish: "This refers to Abu Jahl who forbade worship." },
  { surahNumber: 96, verseNumber: 10, arabic: "عَبْدًا إِذَا صَلَّىٰ", bengali: "এক বান্দাকে যখন সে নামায পড়ে।", english: "A servant when he prays?", tafsirBengali: "রাসূলুল্লাহ (সা.) কে নামায পড়তে বাধা দিত।", tafsirEnglish: "They tried to prevent the Prophet from praying." },
  { surahNumber: 96, verseNumber: 11, arabic: "أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ", bengali: "তুমি কি দেখেছ, যদি সে হেদায়েতের ওপর থাকে।", english: "Have you seen if he is upon guidance.", tafsirBengali: "যদি নামাযী সঠিক পথে থাকেন, তাকে বাধা দেওয়া অন্যায়।", tafsirEnglish: "Preventing one on guidance is great injustice." },
  { surahNumber: 96, verseNumber: 12, arabic: "أَوْ أَمَرَ بِالتَّقْوَىٰ", bengali: "অথবা তাকওয়ার আদেশ দেয়।", english: "Or enjoins righteousness?", tafsirBengali: "আল্লাহভীতির আদেশ দেওয়া ভালো কাজ।", tafsirEnglish: "Enjoining righteousness is good work." },
  { surahNumber: 96, verseNumber: 13, arabic: "أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ", bengali: "তুমি কি দেখেছ, যদি সে মিথ্যা প্রতিপন্ন করে ও মুখ ফিরিয়ে নেয়।", english: "Have you seen if he denies and turns away?", tafsirBengali: "যে সত্যকে মিথ্যা বলে তার পরিণতি খারাপ।", tafsirEnglish: "Those who deny truth face consequences." },
  { surahNumber: 96, verseNumber: 14, arabic: "أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ", bengali: "সে কি জানে না যে, আল্লাহ দেখছেন?", english: "Does he not know that Allah sees?", tafsirBengali: "আল্লাহ সব দেখছেন, কিছুই গোপন নয়।", tafsirEnglish: "Allah sees everything, nothing is hidden." },
  { surahNumber: 96, verseNumber: 15, arabic: "كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ", bengali: "কখনো না, সে যদি বিরত না হয়, আমি অবশ্যই টেনে ধরব কপালের চুল।", english: "No! If he does not desist, We will surely drag him by the forelock.", tafsirBengali: "অপকর্ম থেকে বিরত না হলে শাস্তি হবে।", tafsirEnglish: "If he doesn't stop, he'll be dragged to Hell." },
  { surahNumber: 96, verseNumber: 16, arabic: "نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ", bengali: "মিথ্যাবাদী, পাপী কপাল।", english: "A lying, sinning forelock.", tafsirBengali: "এই ব্যক্তি মিথ্যা বলে এবং পাপ করে।", tafsirEnglish: "This person speaks lies and commits sins." },
  { surahNumber: 96, verseNumber: 17, arabic: "فَلْيَدْعُ نَادِيَهُ", bengali: "সে তার সভাসদদের ডাকুক।", english: "Then let him call his associates.", tafsirBengali: "তার সাথীদের ডাকুক, আল্লাহর বিরুদ্ধে পারবে না।", tafsirEnglish: "Let him call his helpers, they cannot help against Allah." },
  { surahNumber: 96, verseNumber: 18, arabic: "سَنَدْعُ الزَّبَانِيَةَ", bengali: "আমিও ডাকব জাহান্নামের প্রহরীদের।", english: "We will call the angels of Hell.", tafsirBengali: "আল্লাহ জাহান্নামের ফেরেশতাদের ডাকবেন।", tafsirEnglish: "Allah will call the fierce angels of Hell." },
  { surahNumber: 96, verseNumber: 19, arabic: "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب", bengali: "কখনো না, তুমি তার অনুসরণ করো না; সেজদা কর এবং নিকটবর্তী হও।", english: "No! Do not obey him. But prostrate and draw near [to Allah].", tafsirBengali: "কাফেরের কথা শুনবেন না, আল্লাহকে সেজদা করুন।", tafsirEnglish: "Do not obey disbelievers, prostrate to Allah." }
];

// Surah Al-Qadr (97)
export const surahQadrVerses: Verse[] = [
  { surahNumber: 97, verseNumber: 1, arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", bengali: "নিশ্চয়ই আমি এটি (কুরআন) নাযিল করেছি কদরের রাতে।", english: "Indeed, We sent the Quran down during the Night of Decree.", tafsirBengali: "আল্লাহ কুরআন লাইলাতুল কদরে নাযিল করেছেন।", tafsirEnglish: "Allah sent down the Quran on the Night of Decree." },
  { surahNumber: 97, verseNumber: 2, arabic: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", bengali: "তুমি কি জান কদরের রাত কী?", english: "And what can make you know what is the Night of Decree?", tafsirBengali: "এই রাতের মর্যাদা অতুলনীয়।", tafsirEnglish: "The magnificence of this night is immense." },
  { surahNumber: 97, verseNumber: 3, arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", bengali: "কদরের রাত হাজার মাস থেকেও উত্তম।", english: "The Night of Decree is better than a thousand months.", tafsirBengali: "এই একটি রাত হাজার মাস (৮৩+ বছর) থেকেও উত্তম।", tafsirEnglish: "This single night is better than 83+ years." },
  { surahNumber: 97, verseNumber: 4, arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَা بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", bengali: "এই রাতে ফেরেশতারা ও রূহ (জিব্রাঈল) অবতরণ করেন।", english: "The angels and the Spirit descend therein by permission of their Lord for every matter.", tafsirBengali: "অসংখ্য ফেরেশতা এবং জিব্রাঈল পৃথিবীতে নেমে আসেন।", tafsirEnglish: "Countless angels and Jibreel descend to earth." },
  { surahNumber: 97, verseNumber: 5, arabic: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", bengali: "এটি শান্তিময় ফজর উদয় হওয়া পর্যন্ত।", english: "Peace it is until the emergence of dawn.", tafsirBengali: "এই রাত শান্তি ও কল্যাণে পরিপূর্ণ ফজর পর্যন্ত।", tafsirEnglish: "This night is filled with peace until dawn." }
];

// Surah Al-Bayyina (98)
export const surahBayyinaVerses: Verse[] = [
  { surahNumber: 98, verseNumber: 1, arabic: "لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ", bengali: "আহলে কিতাব ও মুশরিকদের মধ্যে যারা কাফের, তারা বিরত হওয়ার নয় যতক্ষণ না স্পষ্ট প্রমাণ আসে।", english: "Those who disbelieved were not to be parted from disbelief until there came to them clear evidence.", tafsirBengali: "তারা স্পষ্ট প্রমাণ অর্থাৎ মুহাম্মাদ (সা.) আসার অপেক্ষায় ছিল।", tafsirEnglish: "They awaited the clear evidence - Muhammad (PBUH)." },
  { surahNumber: 98, verseNumber: 2, arabic: "رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً", bengali: "আল্লাহর পক্ষ থেকে একজন রাসূল, যিনি পবিত্র সহীফা পাঠ করেন।", english: "A Messenger from Allah, reciting purified scriptures.", tafsirBengali: "রাসূলুল্লাহ (সা.) পবিত্র কুরআন তিলাওয়াত করেন।", tafsirEnglish: "The Messenger recites the pure Quran." },
  { surahNumber: 98, verseNumber: 3, arabic: "فِيهَا كُتُبٌ قَيِّمَةٌ", bengali: "যাতে রয়েছে সঠিক বিধানসমূহ।", english: "Within which are correct writings.", tafsirBengali: "এতে সঠিক ও সুদৃঢ় বিধান রয়েছে।", tafsirEnglish: "It contains correct and upright laws." },
  { surahNumber: 98, verseNumber: 4, arabic: "وَمَا تَفَرَّقَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِن بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَةُ", bengali: "যাদেরকে কিতাব দেওয়া হয়েছিল, তারা স্পষ্ট প্রমাণ আসার পর বিভক্ত হয়েছে।", english: "Those who were given the Scripture became divided after clear evidence came.", tafsirBengali: "তারা হিংসা ও অহংকারের কারণে বিভক্ত হয়ে গেল।", tafsirEnglish: "They divided due to jealousy and arrogance." },
  { surahNumber: 98, verseNumber: 5, arabic: "وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ ۚ وَذَٰلِكَ دِينُ الْقَيِّمَةِ", bengali: "তাদেরকে কেবল এই নির্দেশ দেওয়া হয়েছিল যে, একনিষ্ঠভাবে আল্লাহর ইবাদত করবে, নামায কায়েম করবে এবং যাকাত দেবে।", english: "They were commanded to worship Allah sincerely, establish prayer and give zakah.", tafsirBengali: "এটাই সঠিক দীন যা সব নবী প্রচার করেছেন।", tafsirEnglish: "This is the correct religion all prophets preached." },
  { surahNumber: 98, verseNumber: 6, arabic: "إِنَّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ فِي نَارِ جَهَنَّمَ خَالِدِينَ فِيهَا ۚ أُولَٰئِكَ هُمْ شَرُّ الْبَرِيَّةِ", bengali: "যারা কুফরি করেছে, তারা জাহান্নামে চিরকাল থাকবে। এরাই সৃষ্টির নিকৃষ্টতম।", english: "Those who disbelieved will be in Hell forever. They are the worst of creatures.", tafsirBengali: "যারা জেনেশুনে সত্যকে প্রত্যাখ্যান করেছে তারা নিকৃষ্ট।", tafsirEnglish: "Those who knowingly rejected truth are the worst." },
  { surahNumber: 98, verseNumber: 7, arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ", bengali: "যারা ঈমান এনেছে এবং সৎকাজ করেছে, তারাই সৃষ্টির সেরা।", english: "Those who believed and did righteous deeds are the best of creatures.", tafsirBengali: "ঈমান ও সৎকাজের সমন্বয়ে মানুষ শ্রেষ্ঠ হয়।", tafsirEnglish: "Faith and good deeds make humans the best." },
  { surahNumber: 98, verseNumber: 8, arabic: "جَزَاؤُهُمْ عِندَ رَبِّهِمْ جَنَّاتُ عَدْنٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا ۖ رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ۚ ذَٰلِكَ لِمَنْ خَشِيَ رَبَّهُ", bengali: "তাদের পুরস্কার হলো স্থায়ী জান্নাত। আল্লাহ তাদের প্রতি সন্তুষ্ট এবং তারাও তাঁর প্রতি সন্তুষ্ট।", english: "Their reward is gardens of Eden with rivers flowing, Allah pleased with them and they with Him.", tafsirBengali: "সবচেয়ে বড় পুরস্কার হলো আল্লাহর সন্তুষ্টি।", tafsirEnglish: "The greatest reward is Allah's pleasure." }
];

// Surah Az-Zalzala (99)
export const surahZalzalaVerses: Verse[] = [
  { surahNumber: 99, verseNumber: 1, arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", bengali: "যখন পৃথিবী তার কম্পনে প্রকম্পিত হবে।", english: "When the earth is shaken with its final earthquake.", tafsirBengali: "কিয়ামতের দিন পৃথিবী ভয়ংকরভাবে কেঁপে উঠবে।", tafsirEnglish: "On Judgment Day, the earth will shake terribly." },
  { surahNumber: 99, verseNumber: 2, arabic: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", bengali: "এবং পৃথিবী তার ভারসমূহ বের করে দেবে।", english: "And the earth discharges its burdens.", tafsirBengali: "মৃতদেহ ও গোপন বিষয়গুলো বের হবে।", tafsirEnglish: "Dead bodies and hidden matters will emerge." },
  { surahNumber: 99, verseNumber: 3, arabic: "وَقَالَ الْإِنسَانُ مَا لَهَا", bengali: "এবং মানুষ বলবে, 'এর কী হলো?'", english: "And man says, 'What is wrong with it?'", tafsirBengali: "মানুষ হতভম্ব হয়ে জিজ্ঞেস করবে।", tafsirEnglish: "Humans will be shocked and confused." },
  { surahNumber: 99, verseNumber: 4, arabic: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", bengali: "সেদিন পৃথিবী তার সংবাদ বর্ণনা করবে।", english: "That Day, it will report its news.", tafsirBengali: "পৃথিবী সাক্ষ্য দেবে মানুষের কাজের।", tafsirEnglish: "The earth will testify about human deeds." },
  { surahNumber: 99, verseNumber: 5, arabic: "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", bengali: "কারণ তোমার প্রতিপালক তাকে নির্দেশ দেবেন।", english: "Because your Lord has commanded it.", tafsirBengali: "আল্লাহর আদেশে পৃথিবী কথা বলবে।", tafsirEnglish: "The earth speaks by Allah's command." },
  { surahNumber: 99, verseNumber: 6, arabic: "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ", bengali: "সেদিন মানুষ বিভিন্ন দলে বের হবে তাদের কর্মফল দেখতে।", english: "That Day, people will depart in groups to be shown their deeds.", tafsirBengali: "মানুষ বিভিন্ন দলে বিভক্ত হয়ে বের হবে।", tafsirEnglish: "People will emerge in separate groups." },
  { surahNumber: 99, verseNumber: 7, arabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", bengali: "যে অণু পরিমাণ ভালো কাজ করবে, সে তা দেখবে।", english: "So whoever does an atom's weight of good will see it.", tafsirBengali: "ক্ষুদ্রতম ভালো কাজও প্রতিদান পাবে।", tafsirEnglish: "Even the smallest good deed will be rewarded." },
  { surahNumber: 99, verseNumber: 8, arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", bengali: "এবং যে অণু পরিমাণ মন্দ কাজ করবে, সে তা দেখবে।", english: "And whoever does an atom's weight of evil will see it.", tafsirBengali: "ক্ষুদ্রতম পাপও হিসাবে আসবে।", tafsirEnglish: "Even the smallest sin will be accounted for." }
];

// Surah An-Nazi'at (79) - 46 verses
export const surahNaziatVerses: Verse[] = [
  { surahNumber: 79, verseNumber: 1, arabic: "وَالنَّازِعَاتِ غَرْقًا", bengali: "শপথ তাদের যারা শক্তভাবে টেনে বের করে।", english: "By those who extract with violence.", tafsirBengali: "ফেরেশতারা কাফেরদের রূহ কঠিনভাবে বের করে।", tafsirEnglish: "Angels extract souls of disbelievers harshly." },
  { surahNumber: 79, verseNumber: 2, arabic: "وَالنَّاشِطَاتِ نَشْطًا", bengali: "এবং তাদের যারা আলতো করে বের করে।", english: "And those who remove with ease.", tafsirBengali: "মুমিনদের রূহ আলতো করে বের করা হয়।", tafsirEnglish: "Souls of believers are removed gently." },
  { surahNumber: 79, verseNumber: 3, arabic: "وَالسَّابِحَاتِ سَبْحًا", bengali: "এবং তাদের যারা সাঁতার কাটে।", english: "And those who glide swimming.", tafsirBengali: "ফেরেশতারা মহাকাশে চলাচল করে।", tafsirEnglish: "Angels glide through the heavens." },
  { surahNumber: 79, verseNumber: 4, arabic: "فَالسَّابِقَاتِ سَبْقًا", bengali: "অতঃপর তাদের যারা দ্রুতগতিতে এগিয়ে যায়।", english: "And those who race each other in a race.", tafsirBengali: "ফেরেশতারা আল্লাহর হুকুম পালনে দ্রুত যায়।", tafsirEnglish: "Angels race to fulfill Allah's commands." },
  { surahNumber: 79, verseNumber: 5, arabic: "فَالْمُدَبِّرَاتِ أَمْرًا", bengali: "অতঃপর তাদের যারা কার্য পরিচালনা করে।", english: "And those who arrange each matter.", tafsirBengali: "ফেরেশতারা আল্লাহর আদেশে কাজ পরিচালনা করে।", tafsirEnglish: "Angels manage affairs by Allah's command." },
  { surahNumber: 79, verseNumber: 6, arabic: "يَوْمَ تَرْجُفُ الرَّاجِفَةُ", bengali: "যেদিন প্রকম্পনকারী প্রকম্পিত করবে।", english: "On the Day the first blast trembles.", tafsirBengali: "প্রথম শিঙ্গায় ফুঁক দেওয়ার দিন।", tafsirEnglish: "The Day of the first trumpet blast." },
  { surahNumber: 79, verseNumber: 7, arabic: "تَتْبَعُهَا الرَّادِفَةُ", bengali: "তার পরে আসবে দ্বিতীয়টি।", english: "Followed by the subsequent one.", tafsirBengali: "দ্বিতীয় শিঙ্গায় ফুঁক দেওয়া হবে।", tafsirEnglish: "The second trumpet blast will follow." },
  { surahNumber: 79, verseNumber: 8, arabic: "قُلُوبٌ يَوْمَئِذٍ وَاجِفَةٌ", bengali: "সেদিন অনেক হৃদয় ভীত-কম্পিত হবে।", english: "Hearts, that Day, will be pounding.", tafsirBengali: "সেদিন মানুষের হৃদয় ভয়ে কাঁপবে।", tafsirEnglish: "Hearts will tremble with fear that Day." },
  { surahNumber: 79, verseNumber: 9, arabic: "أَبْصَارُهَا خَاشِعَةٌ", bengali: "তাদের চোখ হবে অবনত।", english: "Their eyes humbled.", tafsirBengali: "তাদের চোখ ভয়ে নিচু হবে।", tafsirEnglish: "Their eyes will be downcast with fear." },
  { surahNumber: 79, verseNumber: 10, arabic: "يَقُولُونَ أَإِنَّا لَمَرْدُودُونَ فِي الْحَافِرَةِ", bengali: "তারা বলে, 'আমরা কি পূর্বের অবস্থায় ফিরে যাব?'", english: "They are saying, 'Will we indeed be returned to our former state?'", tafsirBengali: "কাফেররা পুনরুত্থান নিয়ে সন্দেহ করত।", tafsirEnglish: "Disbelievers doubted resurrection." },
  { surahNumber: 79, verseNumber: 11, arabic: "أَإِذَا كُنَّا عِظَامًا نَّخِرَةً", bengali: "যখন আমরা পচা হাড়ে পরিণত হব?", english: "Even when we are decayed bones?", tafsirBengali: "তারা ভাবত গলা হাড় থেকে কীভাবে জীবিত হবে।", tafsirEnglish: "They wondered how decayed bones could live again." },
  { surahNumber: 79, verseNumber: 12, arabic: "قَالُوا تِلْكَ إِذًا كَرَّةٌ خَاسِرَةٌ", bengali: "তারা বলে, 'তাহলে এটা তো ক্ষতিকর প্রত্যাবর্তন।'", english: "They say, 'That, then, would be a losing return.'", tafsirBengali: "তারা পুনরুত্থানকে ক্ষতিকর মনে করত।", tafsirEnglish: "They thought resurrection would be a loss for them." },
  { surahNumber: 79, verseNumber: 13, arabic: "فَإِنَّمَا هِيَ زَجْرَةٌ وَاحِدَةٌ", bengali: "এটা তো কেবল একটি বিকট আওয়াজ।", english: "Indeed, it will be but one shout.", tafsirBengali: "শুধু একটি আওয়াজে সব হয়ে যাবে।", tafsirEnglish: "It will happen with just one blast." },
  { surahNumber: 79, verseNumber: 14, arabic: "فَإِذَا هُم بِالسَّاهِرَةِ", bengali: "আর অমনি তারা মাটির উপর চলে আসবে।", english: "And suddenly they will be upon the earth's surface.", tafsirBengali: "হঠাৎ তারা জমিনের উপর দাঁড়িয়ে যাবে।", tafsirEnglish: "Suddenly they will be standing on the earth." },
  { surahNumber: 79, verseNumber: 15, arabic: "هَلْ أَتَاكَ حَدِيثُ مُوسَىٰ", bengali: "তোমার কাছে কি মূসার বৃত্তান্ত এসেছে?", english: "Has there reached you the story of Moses?", tafsirBengali: "মূসা (আ.) এর কাহিনী বর্ণনা করা হচ্ছে।", tafsirEnglish: "The story of Moses is being narrated." },
  { surahNumber: 79, verseNumber: 16, arabic: "إِذْ نَادَاهُ رَبُّهُ بِالْوَادِ الْمُقَدَّسِ طُوًى", bengali: "যখন তাঁর প্রতিপালক তাঁকে পবিত্র উপত্যকা তুয়ায় ডেকেছিলেন।", english: "When his Lord called to him in the sacred valley of Tuwa.", tafsirBengali: "আল্লাহ মূসাকে তুয়া উপত্যকায় ডেকেছিলেন।", tafsirEnglish: "Allah called Moses in the valley of Tuwa." },
  { surahNumber: 79, verseNumber: 17, arabic: "اذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ", bengali: "ফেরাউনের কাছে যাও, সে সীমালঙ্ঘন করেছে।", english: "Go to Pharaoh. Indeed, he has transgressed.", tafsirBengali: "মূসাকে ফেরাউনের কাছে পাঠানো হয়েছিল।", tafsirEnglish: "Moses was sent to Pharaoh who had transgressed." },
  { surahNumber: 79, verseNumber: 18, arabic: "فَقُلْ هَل لَّكَ إِلَىٰ أَن تَزَكَّىٰ", bengali: "বল, 'তুমি কি পবিত্র হতে চাও?'", english: "And say to him, 'Would you purify yourself?'", tafsirBengali: "মূসা ফেরাউনকে পরিশুদ্ধ হতে বলেছিলেন।", tafsirEnglish: "Moses asked Pharaoh to purify himself." },
  { surahNumber: 79, verseNumber: 19, arabic: "وَأَهْدِيَكَ إِلَىٰ رَبِّكَ فَتَخْشَىٰ", bengali: "এবং আমি তোমাকে তোমার প্রতিপালকের দিকে পথ দেখাব, যাতে তুমি ভয় কর।", english: "And let me guide you to your Lord so you would fear Him.", tafsirBengali: "মূসা তাকে সঠিক পথ দেখাতে চেয়েছিলেন।", tafsirEnglish: "Moses wanted to guide him to the right path." },
  { surahNumber: 79, verseNumber: 20, arabic: "فَأَرَاهُ الْآيَةَ الْكُبْرَىٰ", bengali: "অতঃপর সে তাকে বড় নিদর্শন দেখাল।", english: "And he showed him the greatest sign.", tafsirBengali: "মূসা তাকে বড় মুজিযা দেখিয়েছিলেন।", tafsirEnglish: "Moses showed him great miracles." },
  { surahNumber: 79, verseNumber: 21, arabic: "فَكَذَّبَ وَعَصَىٰ", bengali: "কিন্তু সে মিথ্যা প্রতিপন্ন করল এবং অবাধ্য হল।", english: "But he denied and disobeyed.", tafsirBengali: "ফেরাউন মিথ্যা বলল ও অমান্য করল।", tafsirEnglish: "Pharaoh denied and disobeyed." },
  { surahNumber: 79, verseNumber: 22, arabic: "ثُمَّ أَدْبَرَ يَسْعَىٰ", bengali: "তারপর সে পিছন ফিরে চলে গেল।", english: "Then he turned his back, striving.", tafsirBengali: "সে মুখ ফিরিয়ে চলে গেল।", tafsirEnglish: "He turned away in defiance." },
  { surahNumber: 79, verseNumber: 23, arabic: "فَحَشَرَ فَنَادَىٰ", bengali: "অতঃপর সে লোক জমায়েত করল এবং ঘোষণা দিল।", english: "And he gathered and called out.", tafsirBengali: "সে লোকদের জড়ো করে ঘোষণা দিল।", tafsirEnglish: "He gathered people and made a proclamation." },
  { surahNumber: 79, verseNumber: 24, arabic: "فَقَالَ أَنَا رَبُّكُمُ الْأَعْلَىٰ", bengali: "বলল, 'আমিই তোমাদের সর্বোচ্চ প্রভু।'", english: "And said, 'I am your most exalted lord.'", tafsirBengali: "ফেরাউন নিজেকে সর্বোচ্চ প্রভু দাবি করল।", tafsirEnglish: "Pharaoh claimed to be the highest lord." },
  { surahNumber: 79, verseNumber: 25, arabic: "فَأَخَذَهُ اللَّهُ نَكَالَ الْآخِرَةِ وَالْأُولَىٰ", bengali: "অতঃপর আল্লাহ তাকে পরকাল ও ইহকালের শাস্তিতে পাকড়াও করলেন।", english: "So Allah seized him with punishment for the last and the first.", tafsirBengali: "আল্লাহ তাকে দুনিয়া ও আখেরাতে শাস্তি দিলেন।", tafsirEnglish: "Allah punished him in this life and the next." },
  { surahNumber: 79, verseNumber: 26, arabic: "إِنَّ فِي ذَٰلِكَ لَعِبْرَةً لِّمَن يَخْشَىٰ", bengali: "নিশ্চয়ই এতে শিক্ষা রয়েছে যে ভয় করে তার জন্য।", english: "Indeed in that is a lesson for whoever fears.", tafsirBengali: "এতে ভয়কারীদের জন্য শিক্ষা আছে।", tafsirEnglish: "There is a lesson for those who fear Allah." },
  { surahNumber: 79, verseNumber: 27, arabic: "أَأَنتُمْ أَشَدُّ خَلْقًا أَمِ السَّمَاءُ ۚ بَنَاهَا", bengali: "তোমাদের সৃষ্টি কঠিন না আকাশের? তিনি তা নির্মাণ করেছেন।", english: "Are you a more difficult creation or is the heaven? Allah built it.", tafsirBengali: "আকাশ সৃষ্টি করা কঠিন, মানুষ নয়।", tafsirEnglish: "Creating the sky is harder than creating humans." },
  { surahNumber: 79, verseNumber: 28, arabic: "رَفَعَ سَمْكَهَا فَسَوَّاهَا", bengali: "তিনি তার ছাদ উঁচু করেছেন এবং তাকে সুবিন্যস্ত করেছেন।", english: "He raised its ceiling and proportioned it.", tafsirBengali: "আল্লাহ আকাশকে উঁচু ও সুন্দর করেছেন।", tafsirEnglish: "Allah raised and proportioned the sky." },
  { surahNumber: 79, verseNumber: 29, arabic: "وَأَغْطَشَ لَيْلَهَا وَأَخْرَجَ ضُحَاهَا", bengali: "তিনি তার রাতকে অন্ধকার করেছেন এবং দিনকে আলোকিত করেছেন।", english: "And He darkened its night and brought out its daylight.", tafsirBengali: "আল্লাহ রাত অন্ধকার ও দিন আলোকময় করেন।", tafsirEnglish: "Allah made night dark and day bright." },
  { surahNumber: 79, verseNumber: 30, arabic: "وَالْأَرْضَ بَعْدَ ذَٰلِكَ دَحَاهَا", bengali: "এবং এরপর পৃথিবীকে বিস্তৃত করেছেন।", english: "And after that He spread the earth.", tafsirBengali: "আল্লাহ পৃথিবীকে বিস্তৃত করেছেন।", tafsirEnglish: "Allah spread out the earth." },
  { surahNumber: 79, verseNumber: 31, arabic: "أَخْرَجَ مِنْهَا مَاءَهَا وَمَرْعَاهَا", bengali: "তা থেকে তার পানি ও চারণভূমি বের করেছেন।", english: "He extracted from it its water and its pasture.", tafsirBengali: "পৃথিবী থেকে পানি ও ঘাস বের করেছেন।", tafsirEnglish: "He brought forth water and vegetation." },
  { surahNumber: 79, verseNumber: 32, arabic: "وَالْجِبَالَ أَرْسَاهَا", bengali: "এবং পাহাড়গুলোকে দৃঢ়ভাবে স্থাপন করেছেন।", english: "And the mountains He set firmly.", tafsirBengali: "পাহাড়কে স্থির করে রেখেছেন।", tafsirEnglish: "He fixed the mountains firmly." },
  { surahNumber: 79, verseNumber: 33, arabic: "مَتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ", bengali: "তোমাদের ও তোমাদের পশুদের উপভোগের জন্য।", english: "As provision for you and your grazing livestock.", tafsirBengali: "এসব মানুষ ও পশুর জন্য।", tafsirEnglish: "These are for humans and animals." },
  { surahNumber: 79, verseNumber: 34, arabic: "فَإِذَا جَاءَتِ الطَّامَّةُ الْكُبْرَىٰ", bengali: "অতঃপর যখন মহাবিপদ আসবে।", english: "But when there comes the greatest catastrophe.", tafsirBengali: "কিয়ামতের মহা বিপদ আসবে।", tafsirEnglish: "The great catastrophe of Judgment Day will come." },
  { surahNumber: 79, verseNumber: 35, arabic: "يَوْمَ يَتَذَكَّرُ الْإِنسَانُ مَا سَعَىٰ", bengali: "সেদিন মানুষ তার কৃতকর্ম স্মরণ করবে।", english: "The Day when man will remember what he strove for.", tafsirBengali: "মানুষ তার কাজ মনে করবে।", tafsirEnglish: "Man will remember all his deeds." },
  { surahNumber: 79, verseNumber: 36, arabic: "وَبُرِّزَتِ الْجَحِيمُ لِمَن يَرَىٰ", bengali: "এবং জাহান্নাম দৃশ্যমান করা হবে।", english: "And Hellfire will be exposed for all to see.", tafsirBengali: "জাহান্নাম সবার সামনে প্রকাশ পাবে।", tafsirEnglish: "Hellfire will be visible to everyone." },
  { surahNumber: 79, verseNumber: 37, arabic: "فَأَمَّا مَن طَغَىٰ", bengali: "অতএব যে সীমালঙ্ঘন করেছে।", english: "So as for he who transgressed.", tafsirBengali: "যে অবাধ্যতা করেছে।", tafsirEnglish: "As for the one who transgressed." },
  { surahNumber: 79, verseNumber: 38, arabic: "وَآثَرَ الْحَيَاةَ الدُّنْيَا", bengali: "এবং পার্থিব জীবনকে প্রাধান্য দিয়েছে।", english: "And preferred the life of this world.", tafsirBengali: "যে দুনিয়াকে আখেরাতের উপর প্রাধান্য দিয়েছে।", tafsirEnglish: "One who preferred worldly life over the Hereafter." },
  { surahNumber: 79, verseNumber: 39, arabic: "فَإِنَّ الْجَحِيمَ هِيَ الْمَأْوَىٰ", bengali: "জাহান্নামই তার আবাসস্থল।", english: "Then indeed, Hellfire will be his refuge.", tafsirBengali: "তার ঠিকানা হবে জাহান্নাম।", tafsirEnglish: "Hellfire will be his abode." },
  { surahNumber: 79, verseNumber: 40, arabic: "وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْসَ عَنِ الْهَوَىٰ", bengali: "আর যে তার প্রতিপালকের সামনে দাঁড়ানোকে ভয় করেছে এবং প্রবৃত্তি থেকে নিজেকে বিরত রেখেছে।", english: "But as for he who feared standing before his Lord and prevented the soul from desire.", tafsirBengali: "যে আল্লাহকে ভয় করে কুপ্রবৃত্তি দমন করেছে।", tafsirEnglish: "One who feared Allah and restrained desires." },
  { surahNumber: 79, verseNumber: 41, arabic: "فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ", bengali: "জান্নাতই তার আবাসস্থল।", english: "Then indeed, Paradise will be his refuge.", tafsirBengali: "তার ঠিকানা হবে জান্নাত।", tafsirEnglish: "Paradise will be his abode." },
  { surahNumber: 79, verseNumber: 42, arabic: "يَسْأَلُونَكَ عَنِ السَّاعَةِ أَيَّانَ مُرْسَاهَا", bengali: "তারা তোমাকে জিজ্ঞেস করে কিয়ামত কখন হবে।", english: "They ask you about the Hour: when is its arrival?", tafsirBengali: "মানুষ কিয়ামতের সময় জানতে চায়।", tafsirEnglish: "People ask about when the Hour will come." },
  { surahNumber: 79, verseNumber: 43, arabic: "فِيمَ أَنتَ مِن ذِكْرَاهَا", bengali: "এ বিষয়ে তোমার কী জানা আছে?", english: "In what are you concerned with it?", tafsirBengali: "তুমি এ বিষয়ে কী জান?", tafsirEnglish: "What do you know about its timing?" },
  { surahNumber: 79, verseNumber: 44, arabic: "إِلَىٰ رَبِّكَ مُنتَهَاهَا", bengali: "এর চূড়ান্ত জ্ঞান তোমার প্রতিপালকের কাছে।", english: "To your Lord is its finality.", tafsirBengali: "কিয়ামতের জ্ঞান শুধু আল্লাহর কাছে।", tafsirEnglish: "Only Allah knows when it will occur." },
  { surahNumber: 79, verseNumber: 45, arabic: "إِنَّمَا أَنتَ مُنذِرُ مَن يَخْشَاهَا", bengali: "তুমি তো কেবল সতর্ককারী যে এটিকে ভয় করে।", english: "You are only a warner for those who fear it.", tafsirBengali: "তুমি শুধু ভয়কারীদের সতর্ক কর।", tafsirEnglish: "You only warn those who fear it." },
  { surahNumber: 79, verseNumber: 46, arabic: "كَأَنَّهُمْ يَوْمَ يَرَوْنَهَا لَمْ يَلْبَثُوا إِلَّا عَشِيَّةً أَوْ ضُحَاهَا", bengali: "যেদিন তারা তা দেখবে, মনে হবে তারা যেন এক সন্ধ্যা বা এক সকাল ছাড়া থাকেনি।", english: "It will be, on the Day they see it, as though they had not remained except for an afternoon or a morning.", tafsirBengali: "কিয়ামতের দিন মনে হবে দুনিয়ায় অল্প সময় ছিল।", tafsirEnglish: "On that Day, worldly life will seem very short." }
];

// Surah Abasa (80) - 42 verses
export const surahAbasaVerses: Verse[] = [
  { surahNumber: 80, verseNumber: 1, arabic: "عَبَسَ وَتَوَلَّىٰ", bengali: "সে ভ্রুকুটি করল এবং মুখ ফিরিয়ে নিল।", english: "He frowned and turned away.", tafsirBengali: "এক অন্ধ সাহাবী এলে নবী (সা.) মুখ ফিরিয়ে নিয়েছিলেন।", tafsirEnglish: "The Prophet turned away when a blind companion came." },
  { surahNumber: 80, verseNumber: 2, arabic: "أَن جَاءَهُ الْأَعْمَىٰ", bengali: "কারণ তার কাছে অন্ধ ব্যক্তি এসেছিল।", english: "Because there came to him the blind man.", tafsirBengali: "অন্ধ সাহাবী আবদুল্লাহ ইবনে উম্মে মাকতুম।", tafsirEnglish: "The blind companion was Abdullah ibn Umm Maktum." },
  { surahNumber: 80, verseNumber: 3, arabic: "وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ", bengali: "তুমি কি জান, সে হয়তো পরিশুদ্ধ হতো।", english: "But what would make you perceive that perhaps he might be purified?", tafsirBengali: "অন্ধ ব্যক্তি হয়তো পবিত্র হতে পারত।", tafsirEnglish: "The blind man might have been purified." },
  { surahNumber: 80, verseNumber: 4, arabic: "أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ", bengali: "অথবা উপদেশ গ্রহণ করত, আর উপদেশ তার উপকারে আসত।", english: "Or be reminded and the remembrance would benefit him.", tafsirBengali: "উপদেশ তার কাজে লাগত।", tafsirEnglish: "The reminder would have benefited him." },
  { surahNumber: 80, verseNumber: 5, arabic: "أَمَّا مَنِ اسْتَغْنَىٰ", bengali: "যে নিজেকে অভাবমুক্ত মনে করে।", english: "As for he who thinks himself without need.", tafsirBengali: "যে ধনী ও অহংকারী।", tafsirEnglish: "One who considers himself self-sufficient." },
  { surahNumber: 80, verseNumber: 6, arabic: "فَأَنتَ لَهُ تَصَدَّىٰ", bengali: "তুমি তার প্রতি মনোযোগ দিচ্ছ।", english: "To him you give attention.", tafsirBengali: "তুমি তার দিকে মনোযোগ দিচ্ছ।", tafsirEnglish: "You pay attention to him." },
  { surahNumber: 80, verseNumber: 7, arabic: "وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ", bengali: "অথচ সে পরিশুদ্ধ না হলে তোমার কোনো দায় নেই।", english: "And not upon you is any blame if he will not be purified.", tafsirBengali: "সে হেদায়েত না পেলে তোমার দোষ নেই।", tafsirEnglish: "You are not responsible if he doesn't become purified." },
  { surahNumber: 80, verseNumber: 8, arabic: "وَأَمَّا مَن جَاءَكَ يَسْعَىٰ", bengali: "আর যে তোমার কাছে দৌড়ে এসেছে।", english: "But as for he who came to you striving.", tafsirBengali: "যে আগ্রহ নিয়ে তোমার কাছে এসেছে।", tafsirEnglish: "One who came to you eagerly." },
  { surahNumber: 80, verseNumber: 9, arabic: "وَهُوَ يَخْشَىٰ", bengali: "এবং সে ভয় করে।", english: "While he fears [Allah].", tafsirBengali: "সে আল্লাহকে ভয় করে।", tafsirEnglish: "He fears Allah." },
  { surahNumber: 80, verseNumber: 10, arabic: "فَأَنتَ عَنْهُ تَلَهَّىٰ", bengali: "তুমি তার থেকে উদাসীন হচ্ছ।", english: "From him you are distracted.", tafsirBengali: "তুমি তার থেকে মুখ ফিরিয়ে নিচ্ছ।", tafsirEnglish: "You are turning away from him." },
  { surahNumber: 80, verseNumber: 11, arabic: "كَلَّا إِنَّهَا تَذْكِرَةٌ", bengali: "কখনো না, এটা তো এক উপদেশ।", english: "No! Indeed, this is a reminder.", tafsirBengali: "এটা একটি গুরুত্বপূর্ণ শিক্ষা।", tafsirEnglish: "This is an important lesson." },
  { surahNumber: 80, verseNumber: 12, arabic: "فَمَن شَاءَ ذَكَرَهُ", bengali: "যে চায় সে এটা স্মরণ রাখবে।", english: "So whoever wills may remember it.", tafsirBengali: "যে চায় সে উপদেশ গ্রহণ করবে।", tafsirEnglish: "Whoever wishes can take heed." },
  { surahNumber: 80, verseNumber: 13, arabic: "فِي صُحُفٍ مُّكَرَّمَةٍ", bengali: "এটা সম্মানিত সহীফায় লিপিবদ্ধ।", english: "In honored scriptures.", tafsirBengali: "কুরআন সম্মানিত কিতাবে লেখা।", tafsirEnglish: "The Quran is written in honored scriptures." },
  { surahNumber: 80, verseNumber: 14, arabic: "مَّرْفُوعَةٍ مُّطَهَّرَةٍ", bengali: "উচ্চ মর্যাদাসম্পন্ন, পবিত্র।", english: "Exalted and purified.", tafsirBengali: "এটা উচ্চ ও পবিত্র।", tafsirEnglish: "It is exalted and pure." },
  { surahNumber: 80, verseNumber: 15, arabic: "بِأَيْدِي سَفَرَةٍ", bengali: "লেখকদের হাতে।", english: "In the hands of scribes.", tafsirBengali: "ফেরেশতা লেখকদের হাতে।", tafsirEnglish: "In the hands of angel scribes." },
  { surahNumber: 80, verseNumber: 16, arabic: "كِرَامٍ بَرَرَةٍ", bengali: "সম্মানিত, পুণ্যবান।", english: "Noble and dutiful.", tafsirBengali: "তারা সম্মানিত ও সৎকর্মশীল ফেরেশতা।", tafsirEnglish: "They are noble and righteous angels." },
  { surahNumber: 80, verseNumber: 17, arabic: "قُتِلَ الْإِنسَانُ مَا أَكْفَرَهُ", bengali: "ধ্বংস হোক মানুষ! সে কতই না অকৃতজ্ঞ!", english: "Cursed is man; how disbelieving is he!", tafsirBengali: "মানুষ কত অকৃতজ্ঞ!", tafsirEnglish: "How ungrateful is man!" },
  { surahNumber: 80, verseNumber: 18, arabic: "مِنْ أَيِّ شَيْءٍ خَلَقَهُ", bengali: "তিনি তাকে কী থেকে সৃষ্টি করেছেন?", english: "From what substance did He create him?", tafsirBengali: "আল্লাহ মানুষকে কী থেকে বানিয়েছেন?", tafsirEnglish: "From what did Allah create man?" },
  { surahNumber: 80, verseNumber: 19, arabic: "مِن نُّطْفَةٍ خَلَقَهُ فَقَدَّرَهُ", bengali: "শুক্রবিন্দু থেকে তাকে সৃষ্টি করেছেন, অতঃপর তাকে সুপরিমিত করেছেন।", english: "From a sperm-drop He created him and destined for him.", tafsirBengali: "মানুষ শুক্রবিন্দু থেকে সৃষ্ট।", tafsirEnglish: "Man was created from a sperm-drop." },
  { surahNumber: 80, verseNumber: 20, arabic: "ثُمَّ السَّبِيلَ يَسَّرَهُ", bengali: "তারপর তার পথ সহজ করে দিয়েছেন।", english: "Then He eased the way for him.", tafsirBengali: "আল্লাহ মানুষের জন্য পথ সহজ করেছেন।", tafsirEnglish: "Allah made the path easy for him." },
  { surahNumber: 80, verseNumber: 21, arabic: "ثُمَّ أَمَاتَهُ فَأَقْبَرَهُ", bengali: "তারপর তাকে মৃত্যু দিয়েছেন ও কবরস্থ করেছেন।", english: "Then He causes his death and provides a grave for him.", tafsirBengali: "আল্লাহ মানুষকে মৃত্যু দেন ও কবরে রাখেন।", tafsirEnglish: "Allah causes death and burial." },
  { surahNumber: 80, verseNumber: 22, arabic: "ثُمَّ إِذَا شَاءَ أَنشَرَهُ", bengali: "তারপর যখন ইচ্ছা করবেন তাকে পুনরুত্থিত করবেন।", english: "Then when He wills, He will resurrect him.", tafsirBengali: "আল্লাহ যখন চাইবেন পুনরুত্থান করবেন।", tafsirEnglish: "Allah will resurrect when He wills." },
  { surahNumber: 80, verseNumber: 23, arabic: "كَلَّا لَمَّا يَقْضِ مَا أَمَرَهُ", bengali: "কখনো না, সে তার নির্দেশিত কাজ পূর্ণ করেনি।", english: "No! He has not yet fulfilled what He commanded him.", tafsirBengali: "মানুষ আল্লাহর আদেশ পালন করেনি।", tafsirEnglish: "Man has not fulfilled Allah's commands." },
  { surahNumber: 80, verseNumber: 24, arabic: "فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ", bengali: "মানুষ তার খাদ্যের প্রতি লক্ষ্য করুক।", english: "Then let man look at his food.", tafsirBengali: "মানুষ তার খাবারের উৎস চিন্তা করুক।", tafsirEnglish: "Let man reflect on his food." },
  { surahNumber: 80, verseNumber: 25, arabic: "أَنَّا صَبَبْنَا الْمَاءَ صَبًّا", bengali: "আমি প্রচুর পানি বর্ষণ করেছি।", english: "How We poured down water in torrents.", tafsirBengali: "আল্লাহ প্রচুর বৃষ্টি দেন।", tafsirEnglish: "Allah sends down abundant rain." },
  { surahNumber: 80, verseNumber: 26, arabic: "ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا", bengali: "তারপর মাটিকে বিদীর্ণ করেছি।", english: "Then We broke open the earth, splitting.", tafsirBengali: "মাটি ফেটে গাছ বের হয়।", tafsirEnglish: "The earth splits for plants to grow." },
  { surahNumber: 80, verseNumber: 27, arabic: "فَأَنبَتْنَا فِيهَا حَبًّا", bengali: "অতঃপর তাতে উৎপন্ন করেছি শস্য।", english: "And caused to grow within it grain.", tafsirBengali: "আল্লাহ শস্য উৎপন্ন করেন।", tafsirEnglish: "Allah grows grain." },
  { surahNumber: 80, verseNumber: 28, arabic: "وَعِنَبًا وَقَضْبًا", bengali: "এবং আঙ্গুর ও শাক-সবজি।", english: "And grapes and herbage.", tafsirBengali: "আঙ্গুর ও সবজি উৎপন্ন করেন।", tafsirEnglish: "Grapes and vegetables grow." },
  { surahNumber: 80, verseNumber: 29, arabic: "وَزَيْتُونًا وَنَخْلًا", bengali: "এবং যয়তুন ও খেজুর গাছ।", english: "And olive and palm trees.", tafsirBengali: "জয়তুন ও খেজুর গাছ সৃষ্টি করেন।", tafsirEnglish: "Olive and date palm trees grow." },
  { surahNumber: 80, verseNumber: 30, arabic: "وَحَدَائِقَ غُلْبًا", bengali: "এবং ঘন বাগান।", english: "And gardens of dense shrubbery.", tafsirBengali: "ঘন সবুজ বাগান সৃষ্টি করেন।", tafsirEnglish: "Dense gardens are created." },
  { surahNumber: 80, verseNumber: 31, arabic: "وَفَاكِهَةً وَأَبًّا", bengali: "এবং ফলমূল ও ঘাস।", english: "And fruit and grass.", tafsirBengali: "ফল ও পশুখাদ্য সৃষ্টি করেন।", tafsirEnglish: "Fruits and fodder are created." },
  { surahNumber: 80, verseNumber: 32, arabic: "مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ", bengali: "তোমাদের ও তোমাদের পশুদের জন্য উপভোগ্য।", english: "As provision for you and your grazing livestock.", tafsirBengali: "এসব মানুষ ও পশুদের জন্য।", tafsirEnglish: "These are for humans and animals." },
  { surahNumber: 80, verseNumber: 33, arabic: "فَإِذَا جَاءَتِ الصَّاخَّةُ", bengali: "অতঃপর যখন বধির করা বিকট শব্দ আসবে।", english: "But when there comes the Deafening Blast.", tafsirBengali: "কিয়ামতের ভয়ংকর শব্দ।", tafsirEnglish: "The deafening blast of Judgment Day." },
  { surahNumber: 80, verseNumber: 34, arabic: "يَوْمَ يَفِرُّ الْمَرْءُ مِنْ أَخِيهِ", bengali: "সেদিন মানুষ পালাবে তার ভাই থেকে।", english: "On the Day a man will flee from his brother.", tafsirBengali: "সেদিন মানুষ নিজ ভাই থেকে পালাবে।", tafsirEnglish: "That Day, man will flee from his brother." },
  { surahNumber: 80, verseNumber: 35, arabic: "وَأُمِّهِ وَأَبِيهِ", bengali: "এবং তার মা ও বাবা থেকে।", english: "And his mother and his father.", tafsirBengali: "এবং মা-বাবা থেকেও পালাবে।", tafsirEnglish: "And from mother and father." },
  { surahNumber: 80, verseNumber: 36, arabic: "وَصَاحِبَتِهِ وَبَنِيهِ", bengali: "এবং তার স্ত্রী ও সন্তানদের থেকে।", english: "And his wife and his children.", tafsirBengali: "স্ত্রী ও সন্তান থেকেও পালাবে।", tafsirEnglish: "And from wife and children." },
  { surahNumber: 80, verseNumber: 37, arabic: "لِكُلِّ امْرِئٍ مِّنْهُمْ يَوْمَئِذٍ شَأْنٌ يُغْنِيهِ", bengali: "সেদিন প্রত্যেকের নিজের চিন্তায় ব্যস্ত থাকবে।", english: "For every man, that Day, will be a matter to occupy him.", tafsirBengali: "প্রত্যেকে নিজের চিন্তায় মগ্ন থাকবে।", tafsirEnglish: "Everyone will be absorbed in their own concern." },
  { surahNumber: 80, verseNumber: 38, arabic: "وُجُوهٌ يَوْمَئِذٍ مُّسْفِرَةٌ", bengali: "সেদিন কিছু মুখ হবে উজ্জ্বল।", english: "Some faces, that Day, will be bright.", tafsirBengali: "মুমিনদের মুখ উজ্জ্বল হবে।", tafsirEnglish: "Believers' faces will be radiant." },
  { surahNumber: 80, verseNumber: 39, arabic: "ضَاحِكَةٌ مُّسْتَبْشِرَةٌ", bengali: "হাস্যোজ্জ্বল, আনন্দিত।", english: "Laughing, rejoicing at good news.", tafsirBengali: "তারা হাসবে ও আনন্দিত হবে।", tafsirEnglish: "They will laugh and rejoice." },
  { surahNumber: 80, verseNumber: 40, arabic: "وَوُجُوهٌ يَوْمَئِذٍ عَلَيْهَا غَبَرَةٌ", bengali: "এবং সেদিন কিছু মুখ হবে ধূলিমলিন।", english: "And some faces, that Day, will have upon them dust.", tafsirBengali: "কাফেরদের মুখ ধুলায় ঢাকা থাকবে।", tafsirEnglish: "Disbelievers' faces will be covered with dust." },
  { surahNumber: 80, verseNumber: 41, arabic: "تَرْهَقُهَا قَتَرَةٌ", bengali: "অন্ধকারে আচ্ছন্ন।", english: "Darkness will cover them.", tafsirBengali: "তাদের মুখ অন্ধকারে ঢাকা থাকবে।", tafsirEnglish: "Darkness will cover their faces." },
  { surahNumber: 80, verseNumber: 42, arabic: "أُولَٰئِكَ هُمُ الْكَفَرَةُ الْفَجَرَةُ", bengali: "এরাই কাফের, পাপী।", english: "Those are the disbelievers, the wicked ones.", tafsirBengali: "এরা কাফের ও পাপী।", tafsirEnglish: "These are the disbelievers and sinners." }
];

// Surah At-Takwir (81) - 29 verses
export const surahTakwirVerses: Verse[] = [
  { surahNumber: 81, verseNumber: 1, arabic: "إِذَا الشَّمْسُ كُوِّرَتْ", bengali: "যখন সূর্য আলোহীন হয়ে যাবে।", english: "When the sun is wrapped up [in darkness].", tafsirBengali: "কিয়ামতের দিন সূর্যের আলো নিভে যাবে।", tafsirEnglish: "On Judgment Day, the sun will lose its light." },
  { surahNumber: 81, verseNumber: 2, arabic: "وَإِذَا النُّجُومُ انكَدَرَتْ", bengali: "এবং যখন তারকারাজি খসে পড়বে।", english: "And when the stars fall, dispersing.", tafsirBengali: "তারাগুলো তাদের কক্ষপথ থেকে ছুটে পড়বে।", tafsirEnglish: "Stars will fall from their orbits." },
  { surahNumber: 81, verseNumber: 3, arabic: "وَإِذَا الْجِبَالُ سُيِّرَتْ", bengali: "এবং যখন পর্বতমালা চলমান করা হবে।", english: "And when the mountains are removed.", tafsirBengali: "পাহাড়গুলো ধূলিকণার মতো উড়ে যাবে।", tafsirEnglish: "Mountains will move like dust particles." },
  { surahNumber: 81, verseNumber: 4, arabic: "وَإِذَا الْعِشَارُ عُطِّلَتْ", bengali: "এবং যখন গর্ভবতী উষ্ট্রী উপেক্ষিত হবে।", english: "And when full-term she-camels are neglected.", tafsirBengali: "সবচেয়ে মূল্যবান সম্পদও সেদিন মূল্যহীন হবে।", tafsirEnglish: "Even the most valuable possessions will be worthless." },
  { surahNumber: 81, verseNumber: 5, arabic: "وَإِذَا الْوُحُوشُ حُشِرَتْ", bengali: "এবং যখন বন্য পশু একত্রিত করা হবে।", english: "And when the wild beasts are gathered.", tafsirBengali: "সব বন্য প্রাণী একত্রিত হবে বিচারের জন্য।", tafsirEnglish: "All wild animals will be gathered for judgment." },
  { surahNumber: 81, verseNumber: 6, arabic: "وَإِذَا الْبِحَارُ سُجِّرَتْ", bengali: "এবং যখন সমুদ্রগুলো উত্তাল করা হবে।", english: "And when the seas are filled with flame.", tafsirBengali: "সমুদ্র আগুনে পরিণত হবে।", tafsirEnglish: "The seas will be set ablaze." },
  { surahNumber: 81, verseNumber: 7, arabic: "وَإِذَا النُّفُوسُ زُوِّجَتْ", bengali: "এবং যখন আত্মাগুলো (দেহের সাথে) মিলিত হবে।", english: "And when the souls are paired.", tafsirBengali: "রূহ দেহের সাথে মিলিত হবে পুনরুত্থানে।", tafsirEnglish: "Souls will be reunited with bodies in resurrection." },
  { surahNumber: 81, verseNumber: 8, arabic: "وَإِذَا الْمَوْءُودَةُ سُئِلَتْ", bengali: "এবং যখন জীবন্ত কবর দেওয়া কন্যাকে জিজ্ঞেস করা হবে।", english: "And when the girl buried alive is asked.", tafsirBengali: "জাহেলিয়াতে কন্যা সন্তান জীবন্ত কবর দেওয়া হতো।", tafsirEnglish: "In pre-Islamic times, baby girls were buried alive." },
  { surahNumber: 81, verseNumber: 9, arabic: "بِأَيِّ ذَنبٍ قُتِلَتْ", bengali: "কোন অপরাধে তাকে হত্যা করা হয়েছিল?", english: "For what sin she was killed.", tafsirBengali: "নিরপরাধ কন্যাদের হত্যার জবাবদিহি হবে।", tafsirEnglish: "Justice will be served for innocent girls killed." },
  { surahNumber: 81, verseNumber: 10, arabic: "وَإِذَا الصُّحُفُ نُشِرَتْ", bengali: "এবং যখন আমলনামা উন্মুক্ত করা হবে।", english: "And when the pages are made public.", tafsirBengali: "প্রত্যেকের কর্মফল লিখিত আমলনামা প্রকাশ হবে।", tafsirEnglish: "Everyone's record of deeds will be revealed." },
  { surahNumber: 81, verseNumber: 11, arabic: "وَإِذَا السَّمَاءُ كُشِطَتْ", bengali: "এবং যখন আকাশ অপসারিত হবে।", english: "And when the sky is stripped away.", tafsirBengali: "আকাশ তার স্থান থেকে সরে যাবে।", tafsirEnglish: "The sky will be removed from its place." },
  { surahNumber: 81, verseNumber: 12, arabic: "وَإِذَا الْجَحِيمُ سُعِّرَتْ", bengali: "এবং যখন জাহান্নাম প্রজ্বলিত করা হবে।", english: "And when Hellfire is set ablaze.", tafsirBengali: "জাহান্নামকে আরও তীব্র করা হবে।", tafsirEnglish: "Hellfire will be intensified for wrongdoers." },
  { surahNumber: 81, verseNumber: 13, arabic: "وَإِذَا الْجَنَّةُ أُزْلِفَتْ", bengali: "এবং যখন জান্নাত নিকটবর্তী করা হবে।", english: "And when Paradise is brought near.", tafsirBengali: "মুমিনদের জন্য জান্নাত কাছে আনা হবে।", tafsirEnglish: "Paradise will be brought close for believers." },
  { surahNumber: 81, verseNumber: 14, arabic: "عَلِمَتْ نَفْسٌ مَّا أَحْضَرَتْ", bengali: "প্রতিটি আত্মা জানবে সে কী উপস্থিত করেছে।", english: "A soul will know what it has brought.", tafsirBengali: "প্রত্যেকে তার কৃতকর্ম জানতে পারবে।", tafsirEnglish: "Everyone will know their deeds that day." },
  { surahNumber: 81, verseNumber: 15, arabic: "فَلَا أُقْسِمُ بِالْخُنَّسِ", bengali: "আমি শপথ করি পশ্চাদগামী গ্রহগুলির।", english: "So I swear by the retreating stars.", tafsirBengali: "আল্লাহ গ্রহ-নক্ষত্রের শপথ করছেন।", tafsirEnglish: "Allah swears by the planets that retreat." },
  { surahNumber: 81, verseNumber: 16, arabic: "الْجَوَارِ الْكُنَّسِ", bengali: "যেগুলো বিচরণ করে এবং অদৃশ্য হয়।", english: "Those that run and disappear.", tafsirBengali: "গ্রহগুলো চলে এবং লুকিয়ে যায়।", tafsirEnglish: "Planets that orbit and become hidden." },
  { surahNumber: 81, verseNumber: 17, arabic: "وَاللَّيْلِ إِذَا عَسْعَسَ", bengali: "এবং রাতের শপথ যখন তা ঘনীভূত হয়।", english: "And by the night as it closes in.", tafsirBengali: "রাতের অন্ধকার গভীর হওয়ার শপথ।", tafsirEnglish: "The oath of night as darkness deepens." },
  { surahNumber: 81, verseNumber: 18, arabic: "وَالصُّبْحِ إِذَا تَنَفَّسَ", bengali: "এবং প্রভাতের শপথ যখন তা আলোকিত হয়।", english: "And by the dawn when it breathes.", tafsirBengali: "সকালের আলো ফোটার শপথ।", tafsirEnglish: "The oath of dawn as light breaks." },
  { surahNumber: 81, verseNumber: 19, arabic: "إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ", bengali: "নিশ্চয়ই এটি সম্মানিত রাসূলের বাণী।", english: "Indeed, it is the word of a noble messenger.", tafsirBengali: "কুরআন জিব্রাঈল (আ.) এর মাধ্যমে এসেছে।", tafsirEnglish: "The Quran came through Angel Jibreel." },
  { surahNumber: 81, verseNumber: 20, arabic: "ذِي قُوَّةٍ عِندَ ذِي الْعَرْشِ مَكِينٍ", bengali: "যিনি শক্তিশালী, আরশের মালিকের কাছে মর্যাদাবান।", english: "Who is powerful and with the Owner of the Throne, secure.", tafsirBengali: "জিব্রাঈল আল্লাহর কাছে উচ্চ মর্যাদার।", tafsirEnglish: "Jibreel has high status with Allah." },
  { surahNumber: 81, verseNumber: 21, arabic: "مُّطَاعٍ ثَمَّ أَمِينٍ", bengali: "সেখানে আনুগত্যপ্রাপ্ত, বিশ্বস্ত।", english: "Obeyed there [in the heavens] and trustworthy.", tafsirBengali: "ফেরেশতারা জিব্রাঈলের অনুগত এবং তিনি বিশ্বস্ত।", tafsirEnglish: "Angels obey Jibreel, and he is trustworthy." },
  { surahNumber: 81, verseNumber: 22, arabic: "وَمَا صَاحِبُكُم بِمَجْنُونٍ", bengali: "তোমাদের সঙ্গী (মুহাম্মাদ) পাগল নন।", english: "And your companion is not mad.", tafsirBengali: "মুহাম্মাদ (সা.) সুস্থ মস্তিষ্কের মানুষ।", tafsirEnglish: "Muhammad (PBUH) is of sound mind." },
  { surahNumber: 81, verseNumber: 23, arabic: "وَلَقَدْ رَآهُ بِالْأُفُقِ الْمُبِينِ", bengali: "তিনি তাকে সুস্পষ্ট দিগন্তে দেখেছেন।", english: "And he saw him on the clear horizon.", tafsirBengali: "রাসূল (সা.) জিব্রাঈলকে আকাশে দেখেছেন।", tafsirEnglish: "The Prophet saw Jibreel in the sky." },
  { surahNumber: 81, verseNumber: 24, arabic: "وَمَا هُوَ عَلَى الْغَيْبِ بِضَنِينٍ", bengali: "তিনি অদৃশ্যের জ্ঞানে কৃপণ নন।", english: "And he is not a withholder of the unseen.", tafsirBengali: "রাসূল (সা.) ওহী গোপন করেন না।", tafsirEnglish: "The Prophet does not withhold revelation." },
  { surahNumber: 81, verseNumber: 25, arabic: "وَمَا هُوَ بِقَوْلِ شَيْطَانٍ رَّجِيمٍ", bengali: "এটি বিতাড়িত শয়তানের কথা নয়।", english: "And it is not the word of an accursed devil.", tafsirBengali: "কুরআন শয়তানের কথা নয়, আল্লাহর বাণী।", tafsirEnglish: "The Quran is not from Satan, it's from Allah." },
  { surahNumber: 81, verseNumber: 26, arabic: "فَأَيْنَ تَذْهَبُونَ", bengali: "তাহলে তোমরা কোথায় যাচ্ছ?", english: "So where are you going?", tafsirBengali: "সত্য ছেড়ে তোমরা কোথায় যাচ্ছ?", tafsirEnglish: "Where are you going away from truth?" },
  { surahNumber: 81, verseNumber: 27, arabic: "إِنْ هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ", bengali: "এটা তো সারা বিশ্বের জন্য উপদেশ মাত্র।", english: "It is not except a reminder to the worlds.", tafsirBengali: "কুরআন সমগ্র বিশ্বের জন্য হেদায়েত।", tafsirEnglish: "The Quran is guidance for all creation." },
  { surahNumber: 81, verseNumber: 28, arabic: "لِمَن شَاءَ مِنكُمْ أَن يَسْتَقِيمَ", bengali: "তোমাদের মধ্যে যে সঠিক পথে চলতে চায় তার জন্য।", english: "For whoever wills among you to take a right course.", tafsirBengali: "যে সঠিক পথে চলতে চায় সে কুরআন অনুসরণ করুক।", tafsirEnglish: "Whoever wants guidance should follow the Quran." },
  { surahNumber: 81, verseNumber: 29, arabic: "وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ رَبُّ الْعَالَمِينَ", bengali: "তোমরা ইচ্ছা করতে পার না যদি না আল্লাহ ইচ্ছা করেন।", english: "And you do not will except that Allah wills, Lord of the worlds.", tafsirBengali: "সব কিছু আল্লাহর ইচ্ছাধীন।", tafsirEnglish: "Everything is under Allah's will." }
];

// Surah Al-Infitar (82) - 19 verses
export const surahInfitarVerses: Verse[] = [
  { surahNumber: 82, verseNumber: 1, arabic: "إِذَا السَّمَاءُ انفَطَرَتْ", bengali: "যখন আকাশ বিদীর্ণ হবে।", english: "When the sky breaks apart.", tafsirBengali: "কিয়ামতে আকাশ ফেটে যাবে।", tafsirEnglish: "On Judgment Day, the sky will split." },
  { surahNumber: 82, verseNumber: 2, arabic: "وَإِذَا الْكَوَاكِبُ انتَثَرَتْ", bengali: "এবং যখন তারকারাজি বিক্ষিপ্ত হবে।", english: "And when the stars fall, scattering.", tafsirBengali: "তারাগুলো ছিটকে পড়বে।", tafsirEnglish: "Stars will scatter and fall." },
  { surahNumber: 82, verseNumber: 3, arabic: "وَإِذَا الْبِحَارُ فُجِّرَتْ", bengali: "এবং যখন সমুদ্রগুলো উত্তাল করা হবে।", english: "And when the seas are erupted.", tafsirBengali: "সমুদ্র উপচে পড়বে বা আগুন ধরবে।", tafsirEnglish: "The seas will overflow or catch fire." },
  { surahNumber: 82, verseNumber: 4, arabic: "وَإِذَا الْقُبُورُ بُعْثِرَتْ", bengali: "এবং যখন কবরগুলো উল্টে দেওয়া হবে।", english: "And when the graves are turned over.", tafsirBengali: "কবর থেকে মৃতরা উঠে আসবে।", tafsirEnglish: "The dead will rise from their graves." },
  { surahNumber: 82, verseNumber: 5, arabic: "عَلِمَتْ نَفْسٌ مَّا قَدَّمَتْ وَأَخَّرَتْ", bengali: "প্রতিটি আত্মা জানবে সে কী করেছে এবং কী ছেড়ে দিয়েছে।", english: "A soul will know what it has put forward and left behind.", tafsirBengali: "ভালো-মন্দ সব কাজের হিসাব হবে।", tafsirEnglish: "All good and bad deeds will be accounted for." },
  { surahNumber: 82, verseNumber: 6, arabic: "يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ", bengali: "হে মানুষ! কিসে তোমাকে তোমার মহান প্রতিপালক সম্পর্কে বিভ্রান্ত করল?", english: "O mankind, what has deceived you concerning your Lord, the Generous?", tafsirBengali: "আল্লাহর করুণা পেয়ে মানুষ অবাধ্য হয়।", tafsirEnglish: "Despite Allah's blessings, humans become negligent." },
  { surahNumber: 82, verseNumber: 7, arabic: "الَّذِي خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ", bengali: "যিনি তোমাকে সৃষ্টি করেছেন, তোমাকে সুঠাম করেছেন এবং সুসম করেছেন।", english: "Who created you, proportioned you, and balanced you.", tafsirBengali: "আল্লাহ মানুষকে সুন্দর আকৃতিতে সৃষ্টি করেছেন।", tafsirEnglish: "Allah created humans in beautiful proportions." },
  { surahNumber: 82, verseNumber: 8, arabic: "فِي أَيِّ صُورَةٍ مَّا شَاءَ رَكَّبَكَ", bengali: "তিনি তোমাকে যে আকৃতিতে ইচ্ছা গঠন করেছেন।", english: "In whatever form He willed has He assembled you.", tafsirBengali: "আল্লাহ যেভাবে ইচ্ছা মানুষকে গঠন করেন।", tafsirEnglish: "Allah forms humans as He wills." },
  { surahNumber: 82, verseNumber: 9, arabic: "كَلَّا بَلْ تُكَذِّبُونَ بِالدِّينِ", bengali: "কখনো না, বরং তোমরা প্রতিদান দিবসকে মিথ্যা মনে কর।", english: "No! But you deny the Recompense.", tafsirBengali: "মানুষ বিচার দিবসকে অস্বীকার করে।", tafsirEnglish: "Humans deny the Day of Judgment." },
  { surahNumber: 82, verseNumber: 10, arabic: "وَإِنَّ عَلَيْكُمْ لَحَافِظِينَ", bengali: "অথচ তোমাদের ওপর অবশ্যই রক্ষক রয়েছে।", english: "And indeed, over you are keepers.", tafsirBengali: "ফেরেশতারা মানুষের কাজ লিপিবদ্ধ করেন।", tafsirEnglish: "Angels record all human deeds." },
  { surahNumber: 82, verseNumber: 11, arabic: "كِرَامًا كَاتِبِينَ", bengali: "সম্মানিত লেখকবৃন্দ।", english: "Noble and recording.", tafsirBengali: "এরা সম্মানিত কিরামান কাতিবীন।", tafsirEnglish: "They are the noble recording angels." },
  { surahNumber: 82, verseNumber: 12, arabic: "يَعْلَمُونَ مَا تَفْعَلُونَ", bengali: "তারা জানে তোমরা কী কর।", english: "They know whatever you do.", tafsirBengali: "ফেরেশতারা সব কাজ জানেন।", tafsirEnglish: "Angels know all that you do." },
  { surahNumber: 82, verseNumber: 13, arabic: "إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ", bengali: "নিশ্চয়ই পুণ্যবানরা থাকবে নেয়ামতে।", english: "Indeed, the righteous will be in pleasure.", tafsirBengali: "সৎকর্মশীলরা জান্নাতে সুখে থাকবে।", tafsirEnglish: "The righteous will enjoy bliss in Paradise." },
  { surahNumber: 82, verseNumber: 14, arabic: "وَإِنَّ الْفُجَّارَ لَفِي جَحِيمٍ", bengali: "এবং পাপীরা থাকবে জাহান্নামে।", english: "And indeed, the wicked will be in Hellfire.", tafsirBengali: "পাপীরা জাহান্নামে শাস্তি পাবে।", tafsirEnglish: "The wicked will suffer in Hellfire." },
  { surahNumber: 82, verseNumber: 15, arabic: "يَصْلَوْنَهَا يَوْمَ الدِّينِ", bengali: "তারা তাতে প্রবেশ করবে বিচার দিবসে।", english: "They will burn therein on the Day of Recompense.", tafsirBengali: "কিয়ামতের দিন তারা জাহান্নামে যাবে।", tafsirEnglish: "They will enter Hell on Judgment Day." },
  { surahNumber: 82, verseNumber: 16, arabic: "وَمَا هُمْ عَنْهَا بِغَائِبِينَ", bengali: "তারা তা থেকে অনুপস্থিত থাকতে পারবে না।", english: "And never therefrom will they be absent.", tafsirBengali: "জাহান্নাম থেকে পালানোর উপায় নেই।", tafsirEnglish: "There is no escape from Hellfire." },
  { surahNumber: 82, verseNumber: 17, arabic: "وَمَا أَدْرَاكَ مَا يَوْمُ الدِّينِ", bengali: "তুমি কি জান বিচার দিবস কী?", english: "And what can make you know what is the Day of Recompense?", tafsirBengali: "বিচার দিবসের ভয়াবহতা বর্ণনাতীত।", tafsirEnglish: "The severity of Judgment Day is beyond description." },
  { surahNumber: 82, verseNumber: 18, arabic: "ثُمَّ مَا أَدْرَاكَ مَا يَوْمُ الدِّينِ", bengali: "আবারও বলছি, তুমি কি জান বিচার দিবস কী?", english: "Then, what can make you know what is the Day of Recompense?", tafsirBengali: "পুনরায় জোর দেওয়া হচ্ছে এই দিনের গুরুত্বে।", tafsirEnglish: "Emphasis is repeated on the importance of this Day." },
  { surahNumber: 82, verseNumber: 19, arabic: "يَوْمَ لَا تَمْلِكُ نَفْسٌ لِّنَفْسٍ شَيْئًا ۖ وَالْأَمْرُ يَوْمَئِذٍ لِّلَّهِ", bengali: "সেদিন কেউ কারো কোনো উপকার করতে পারবে না। সেদিন সব ক্ষমতা হবে আল্লাহর।", english: "The Day when a soul will not possess anything for another soul, and the command that Day is with Allah.", tafsirBengali: "সেদিন শুধু আল্লাহর ফয়সালা চলবে।", tafsirEnglish: "That Day, only Allah's decision will prevail." }
];

// Surah Al-Mutaffifin (83) - 36 verses
export const surahMutaffifinVerses: Verse[] = [
  { surahNumber: 83, verseNumber: 1, arabic: "وَيْلٌ لِّلْمُطَفِّفِينَ", bengali: "ধ্বংস মাপে কম দানকারীদের জন্য।", english: "Woe to those who give less [than due].", tafsirBengali: "যারা ওজনে কম দেয় তাদের জন্য কঠিন শাস্তি।", tafsirEnglish: "Severe punishment for those who cheat in measurement." },
  { surahNumber: 83, verseNumber: 2, arabic: "الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ", bengali: "যারা মানুষের কাছ থেকে নেওয়ার সময় পূর্ণ নেয়।", english: "Who, when they take a measure from people, take in full.", tafsirBengali: "নিজের জন্য পুরোপুরি নেয়।", tafsirEnglish: "They take full measure for themselves." },
  { surahNumber: 83, verseNumber: 3, arabic: "وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ", bengali: "কিন্তু যখন তাদের মেপে বা ওজন করে দেয়, তখন কম দেয়।", english: "But if they give by measure or weight to them, they cause loss.", tafsirBengali: "অন্যদের দেওয়ার সময় কম দেয়।", tafsirEnglish: "They give less when measuring for others." },
  { surahNumber: 83, verseNumber: 4, arabic: "أَلَا يَظُنُّ أُولَٰئِكَ أَنَّهُم مَّبْعُوثُونَ", bengali: "তারা কি মনে করে না যে তারা পুনরুত্থিত হবে?", english: "Do they not think that they will be resurrected?", tafsirBengali: "তারা কি কিয়ামতে বিশ্বাস করে না?", tafsirEnglish: "Don't they believe in resurrection?" },
  { surahNumber: 83, verseNumber: 5, arabic: "لِيَوْمٍ عَظِيمٍ", bengali: "সেই মহান দিনে।", english: "For a tremendous Day.", tafsirBengali: "কিয়ামতের ভয়ংকর দিন।", tafsirEnglish: "The tremendous Day of Judgment." },
  { surahNumber: 83, verseNumber: 6, arabic: "يَوْمَ يَقُومُ النَّاسُ لِرَبِّ الْعَالَمِينَ", bengali: "যেদিন মানুষ দাঁড়াবে বিশ্বজগতের প্রতিপালকের সামনে।", english: "The Day when mankind will stand before the Lord of the worlds.", tafsirBengali: "সবাই আল্লাহর সামনে দাঁড়াবে।", tafsirEnglish: "All will stand before Allah for judgment." },
  { surahNumber: 83, verseNumber: 7, arabic: "كَلَّا إِنَّ كِتَابَ الْفُجَّارِ لَفِي سِجِّينٍ", bengali: "কখনো না, পাপীদের আমলনামা তো সিজ্জীনে।", english: "No! Indeed, the record of the wicked is in Sijjeen.", tafsirBengali: "পাপীদের আমলনামা নিম্নস্থানে রাখা হবে।", tafsirEnglish: "The record of sinners is kept in a lowly place." },
  { surahNumber: 83, verseNumber: 8, arabic: "وَمَا أَدْرَاكَ مَا سِجِّينٌ", bengali: "তুমি কি জান সিজ্জীন কী?", english: "And what can make you know what is Sijjeen?", tafsirBengali: "সিজ্জীন এক ভয়ংকর স্থান।", tafsirEnglish: "Sijjeen is a terrible place." },
  { surahNumber: 83, verseNumber: 9, arabic: "كِتَابٌ مَّرْقُومٌ", bengali: "এটা এক লিখিত কিতাব।", english: "It is a register inscribed.", tafsirBengali: "পাপীদের কাজ লিপিবদ্ধ আছে।", tafsirEnglish: "The deeds of sinners are recorded." },
  { surahNumber: 83, verseNumber: 10, arabic: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", bengali: "সেদিন ধ্বংস মিথ্যাবাদীদের জন্য।", english: "Woe, that Day, to the deniers.", tafsirBengali: "সত্য অস্বীকারকারীদের জন্য ধ্বংস।", tafsirEnglish: "Destruction awaits the deniers." },
  { surahNumber: 83, verseNumber: 11, arabic: "الَّذِينَ يُكَذِّبُونَ بِيَوْمِ الدِّينِ", bengali: "যারা বিচার দিবসকে মিথ্যা মনে করে।", english: "Who deny the Day of Recompense.", tafsirBengali: "যারা কিয়ামতে বিশ্বাস করে না।", tafsirEnglish: "Those who deny Judgment Day." },
  { surahNumber: 83, verseNumber: 12, arabic: "وَمَا يُكَذِّبُ بِهِ إِلَّا كُلُّ مُعْتَدٍ أَثِيمٍ", bengali: "কেবল সীমালঙ্ঘনকারী পাপীই এটিকে মিথ্যা মনে করে।", english: "And none deny it except every sinful transgressor.", tafsirBengali: "শুধু পাপীরাই কিয়ামত অস্বীকার করে।", tafsirEnglish: "Only sinful transgressors deny it." },
  { surahNumber: 83, verseNumber: 13, arabic: "إِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا قَالَ أَسَاطِيرُ الْأَوَّلِينَ", bengali: "যখন তার কাছে আমার আয়াত তিলাওয়াত করা হয়, সে বলে, 'এগুলো পূর্ববর্তীদের কিসসা।'", english: "When Our verses are recited to him, he says, 'Legends of the former peoples.'", tafsirBengali: "কাফেররা কুরআনকে পুরাণ কাহিনী বলে।", tafsirEnglish: "Disbelievers call the Quran ancient tales." },
  { surahNumber: 83, verseNumber: 14, arabic: "كَلَّا ۖ بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ", bengali: "কখনো না, বরং তাদের কৃতকর্ম তাদের হৃদয়ে মরিচা ধরিয়েছে।", english: "No! Rather, what they earned has covered their hearts.", tafsirBengali: "পাপ তাদের হৃদয়কে ঢেকে দিয়েছে।", tafsirEnglish: "Sins have covered their hearts." },
  { surahNumber: 83, verseNumber: 15, arabic: "كَلَّا إِنَّهُمْ عَن رَّبِّهِمْ يَوْمَئِذٍ لَّمَحْجُوبُونَ", bengali: "কখনো না, সেদিন তারা তাদের প্রতিপালক থেকে অবশ্যই বঞ্চিত থাকবে।", english: "No! Indeed, from their Lord, that Day, they will be veiled.", tafsirBengali: "কাফেররা আল্লাহর দর্শন থেকে বঞ্চিত হবে।", tafsirEnglish: "Disbelievers will be veiled from seeing Allah." },
  { surahNumber: 83, verseNumber: 16, arabic: "ثُمَّ إِنَّهُمْ لَصَالُو الْجَحِيمِ", bengali: "তারপর তারা অবশ্যই জাহান্নামে প্রবেশ করবে।", english: "Then indeed, they will burn in Hellfire.", tafsirBengali: "তারা জাহান্নামে জ্বলবে।", tafsirEnglish: "They will burn in Hellfire." },
  { surahNumber: 83, verseNumber: 17, arabic: "ثُمَّ يُقَالُ هَٰذَا الَّذِي كُنتُم بِهِ تُكَذِّبُونَ", bengali: "তারপর বলা হবে, 'এটাই তা যা তোমরা মিথ্যা মনে করতে।'", english: "Then it will be said, 'This is what you used to deny.'", tafsirBengali: "তাদের বলা হবে এটাই সেই শাস্তি যা তোমরা অস্বীকার করতে।", tafsirEnglish: "They will be told this is what they denied." },
  { surahNumber: 83, verseNumber: 18, arabic: "كَلَّا إِنَّ كِتَابَ الْأَبْرَارِ لَفِي عِلِّيِّينَ", bengali: "কখনো না, পুণ্যবানদের আমলনামা তো ইল্লিয়্যীনে।", english: "No! Indeed, the record of the righteous is in Illiyyeen.", tafsirBengali: "সৎকর্মশীলদের আমলনামা উচ্চস্থানে।", tafsirEnglish: "The record of the righteous is in a high place." },
  { surahNumber: 83, verseNumber: 19, arabic: "وَمَا أَدْرَاكَ مَا عِلِّيُّونَ", bengali: "তুমি কি জান ইল্লিয়্যীন কী?", english: "And what can make you know what is Illiyyeen?", tafsirBengali: "ইল্লিয়্যীন উচ্চ সম্মানের স্থান।", tafsirEnglish: "Illiyyeen is a place of high honor." },
  { surahNumber: 83, verseNumber: 20, arabic: "كِتَابٌ مَّرْقُومٌ", bengali: "এটা এক লিখিত কিতাব।", english: "It is a register inscribed.", tafsirBengali: "সৎকর্মশীলদের কাজ লিপিবদ্ধ আছে।", tafsirEnglish: "The deeds of the righteous are recorded." },
  { surahNumber: 83, verseNumber: 21, arabic: "يَشْهَدُهُ الْمُقَرَّبُونَ", bengali: "নৈকট্যপ্রাপ্তরা এটা প্রত্যক্ষ করে।", english: "Witnessed by those brought near.", tafsirBengali: "ফেরেশতারা এটা দেখেন।", tafsirEnglish: "The angels witness it." },
  { surahNumber: 83, verseNumber: 22, arabic: "إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ", bengali: "নিশ্চয়ই পুণ্যবানরা থাকবে নেয়ামতে।", english: "Indeed, the righteous will be in pleasure.", tafsirBengali: "সৎকর্মশীলরা জান্নাতে সুখে থাকবে।", tafsirEnglish: "The righteous will enjoy bliss in Paradise." },
  { surahNumber: 83, verseNumber: 23, arabic: "عَلَى الْأَرَائِكِ يَنظُرُونَ", bengali: "সুসজ্জিত আসনে বসে তারা দেখবে।", english: "On adorned couches, observing.", tafsirBengali: "তারা জান্নাতে সুন্দর আসনে বসবে।", tafsirEnglish: "They will sit on beautiful couches in Paradise." },
  { surahNumber: 83, verseNumber: 24, arabic: "تَعْرِفُ فِي وُجُوهِهِمْ نَضْرَةَ النَّعِيمِ", bengali: "তাদের চেহারায় তুমি দেখবে নেয়ামতের উজ্জ্বলতা।", english: "You will recognize in their faces the radiance of pleasure.", tafsirBengali: "তাদের মুখে সুখের ঔজ্জ্বল্য থাকবে।", tafsirEnglish: "Their faces will glow with pleasure." },
  { surahNumber: 83, verseNumber: 25, arabic: "يُسْقَوْنَ مِن رَّحِيقٍ مَّخْتُومٍ", bengali: "তাদের পান করানো হবে মোহরকৃত বিশুদ্ধ পানীয়।", english: "They will be given to drink pure sealed wine.", tafsirBengali: "তাদের জান্নাতে বিশেষ পানীয় দেওয়া হবে।", tafsirEnglish: "They will be given special sealed drinks in Paradise." },
  { surahNumber: 83, verseNumber: 26, arabic: "خِتَامُهُ مِسْكٌ ۚ وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ", bengali: "তার মোহর হবে মেশক। এ বিষয়ে প্রতিযোগীরা প্রতিযোগিতা করুক।", english: "The last of it is musk. So let the competitors compete.", tafsirBengali: "জান্নাতের পানীয়ের সুবাস মেশকের মতো।", tafsirEnglish: "Paradise drinks have the fragrance of musk." },
  { surahNumber: 83, verseNumber: 27, arabic: "وَمِزَاجُهُ مِن تَسْنِيمٍ", bengali: "এর মিশ্রণ হবে তাসনীম থেকে।", english: "And its mixture is of Tasneem.", tafsirBengali: "তাসনীম জান্নাতের উচ্চ ঝরনা।", tafsirEnglish: "Tasneem is a high spring in Paradise." },
  { surahNumber: 83, verseNumber: 28, arabic: "عَيْنًا يَشْرَبُ بِهَا الْمُقَرَّبُونَ", bengali: "এক ঝরনা যা থেকে নৈকট্যপ্রাপ্তরা পান করবে।", english: "A spring from which those near [to Allah] drink.", tafsirBengali: "আল্লাহর নিকটবর্তীরা এই ঝরনা থেকে পান করবে।", tafsirEnglish: "Those close to Allah will drink from this spring." },
  { surahNumber: 83, verseNumber: 29, arabic: "إِنَّ الَّذِينَ أَجْرَمُوا كَانُوا مِنَ الَّذِينَ آمَنُوا يَضْحَكُونَ", bengali: "অপরাধীরা বিশ্বাসীদের উপহাস করত।", english: "Indeed, those who committed crimes used to laugh at those who believed.", tafsirBengali: "দুনিয়ায় কাফেররা মুমিনদের ঠাট্টা করত।", tafsirEnglish: "In the world, disbelievers mocked believers." },
  { surahNumber: 83, verseNumber: 30, arabic: "وَإِذَا مَرُّوا بِهِمْ يَتَغَامَزُونَ", bengali: "এবং তাদের পাশ দিয়ে যাওয়ার সময় চোখ মটকাত।", english: "And when they passed by them, they winked at one another.", tafsirBengali: "মুমিনদের দেখলে ইশারায় ঠাট্টা করত।", tafsirEnglish: "They would wink mockingly at believers." },
  { surahNumber: 83, verseNumber: 31, arabic: "وَإِذَا انقَلَبُوا إِلَىٰ أَهْلِهِمُ انقَلَبُوا فَكِهِينَ", bengali: "এবং তাদের পরিবারে ফিরে গিয়ে আনন্দ করত।", english: "And when they returned to their people, they returned jesting.", tafsirBengali: "বাড়ি ফিরে মুমিনদের নিয়ে মজা করত।", tafsirEnglish: "They would go home joking about believers." },
  { surahNumber: 83, verseNumber: 32, arabic: "وَإِذَا رَأَوْهُمْ قَالُوا إِنَّ هَٰؤُلَاءِ لَضَالُّونَ", bengali: "এবং তাদের দেখলে বলত, 'এরা তো পথভ্রষ্ট।'", english: "And when they saw them, they said, 'Indeed, these are astray.'", tafsirBengali: "কাফেররা মুমিনদের পথভ্রষ্ট বলত।", tafsirEnglish: "Disbelievers called believers astray." },
  { surahNumber: 83, verseNumber: 33, arabic: "وَمَا أُرْسِلُوا عَلَيْهِمْ حَافِظِينَ", bengali: "অথচ তাদের এদের তত্ত্বাবধায়ক হিসেবে পাঠানো হয়নি।", english: "But they had not been sent as guardians over them.", tafsirBengali: "কাফেরদের মুমিনদের বিচার করার অধিকার নেই।", tafsirEnglish: "Disbelievers have no right to judge believers." },
  { surahNumber: 83, verseNumber: 34, arabic: "فَالْيَوْمَ الَّذِينَ آمَنُوا مِنَ الْكُفَّارِ يَضْحَكُونَ", bengali: "আজ বিশ্বাসীরা কাফেরদের উপহাস করবে।", english: "So today those who believed are laughing at the disbelievers.", tafsirBengali: "কিয়ামতে মুমিনরা কাফেরদের দেখে হাসবে।", tafsirEnglish: "On Judgment Day, believers will laugh at disbelievers." },
  { surahNumber: 83, verseNumber: 35, arabic: "عَلَى الْأَرَائِكِ يَنظُرُونَ", bengali: "সুসজ্জিত আসনে বসে তারা দেখবে।", english: "On adorned couches, observing.", tafsirBengali: "জান্নাতে বসে তারা দেখবে কাফেরদের পরিণতি।", tafsirEnglish: "From Paradise, they will watch the disbelievers' fate." },
  { surahNumber: 83, verseNumber: 36, arabic: "هَلْ ثُوِّبَ الْكُفَّارُ مَا كَانُوا يَفْعَلُونَ", bengali: "কাফেরদের তাদের কৃতকর্মের প্রতিদান দেওয়া হলো না?", english: "Have the disbelievers been rewarded for what they used to do?", tafsirBengali: "কাফেরদের প্রাপ্য শাস্তি দেওয়া হয়েছে।", tafsirEnglish: "The disbelievers have received their due punishment." }
];

// Surah Al-Inshiqaq (84) - 25 verses
export const surahInshiqaqVerses: Verse[] = [
  { surahNumber: 84, verseNumber: 1, arabic: "إِذَا السَّمَاءُ انشَقَّتْ", bengali: "যখন আকাশ বিদীর্ণ হবে।", english: "When the sky has split open.", tafsirBengali: "কিয়ামতে আকাশ ফেটে যাবে।", tafsirEnglish: "On Judgment Day, the sky will split." },
  { surahNumber: 84, verseNumber: 2, arabic: "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ", bengali: "এবং তার প্রতিপালকের আদেশ মান্য করবে, যা তার কর্তব্য।", english: "And has responded to its Lord and was obligated.", tafsirBengali: "আকাশ আল্লাহর হুকুম মানতে বাধ্য।", tafsirEnglish: "The sky must obey Allah's command." },
  { surahNumber: 84, verseNumber: 3, arabic: "وَإِذَا الْأَرْضُ مُدَّتْ", bengali: "এবং যখন পৃথিবী সম্প্রসারিত হবে।", english: "And when the earth has been extended.", tafsirBengali: "পৃথিবী সমতল করা হবে।", tafsirEnglish: "The earth will be flattened." },
  { surahNumber: 84, verseNumber: 4, arabic: "وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ", bengali: "এবং তার মধ্যে যা আছে তা বের করে দেবে ও খালি হয়ে যাবে।", english: "And has cast out that within it and relinquished.", tafsirBengali: "পৃথিবী মৃতদেহ ও গুপ্ত জিনিস বের করে দেবে।", tafsirEnglish: "The earth will expel bodies and hidden things." },
  { surahNumber: 84, verseNumber: 5, arabic: "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ", bengali: "এবং তার প্রতিপালকের আদেশ মান্য করবে, যা তার কর্তব্য।", english: "And has responded to its Lord and was obligated.", tafsirBengali: "পৃথিবী আল্লাহর হুকুম মানতে বাধ্য।", tafsirEnglish: "The earth must obey Allah's command." },
  { surahNumber: 84, verseNumber: 6, arabic: "يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ", bengali: "হে মানুষ! তুমি তোমার প্রতিপালকের দিকে কঠোর পরিশ্রম করছ, অতঃপর তাঁর সাথে সাক্ষাৎ করবে।", english: "O mankind, indeed you are laboring toward your Lord, and you will meet Him.", tafsirBengali: "মানুষ কাজ করে আল্লাহর দিকে এগিয়ে যাচ্ছে।", tafsirEnglish: "Humans work toward meeting Allah." },
  { surahNumber: 84, verseNumber: 7, arabic: "فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ", bengali: "অতএব যার আমলনামা ডান হাতে দেওয়া হবে।", english: "Then as for he who is given his record in his right hand.", tafsirBengali: "ডান হাতে আমলনামা পাওয়া সৌভাগ্যের চিহ্ন।", tafsirEnglish: "Receiving the record in the right hand is a sign of success." },
  { surahNumber: 84, verseNumber: 8, arabic: "فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا", bengali: "তার হিসাব সহজ হবে।", english: "He will be judged with an easy account.", tafsirBengali: "তার হিসাব-নিকাশ সহজ হবে।", tafsirEnglish: "His accounting will be easy." },
  { surahNumber: 84, verseNumber: 9, arabic: "وَيَنقَلِبُ إِلَىٰ أَهْلِهِ مَسْرُورًا", bengali: "এবং সে তার পরিবারের কাছে আনন্দে ফিরে যাবে।", english: "And return to his people in happiness.", tafsirBengali: "সে সুখে জান্নাতে তার পরিবারের কাছে যাবে।", tafsirEnglish: "He will return happily to his family in Paradise." },
  { surahNumber: 84, verseNumber: 10, arabic: "وَأَمَّا مَنْ أُوتِيَ كِتَابَهُ وَرَاءَ ظَهْرِهِ", bengali: "কিন্তু যার আমলনামা পিছন দিক থেকে দেওয়া হবে।", english: "But as for he who is given his record behind his back.", tafsirBengali: "বাম হাত পিঠের পেছনে দিয়ে আমলনামা দেওয়া হবে।", tafsirEnglish: "The record will be given from behind the back." },
  { surahNumber: 84, verseNumber: 11, arabic: "فَسَوْفَ يَدْعُو ثُبُورًا", bengali: "সে ধ্বংস কামনা করবে।", english: "He will cry out for destruction.", tafsirBengali: "সে মৃত্যু চাইবে যন্ত্রণা থেকে মুক্তির জন্য।", tafsirEnglish: "He will wish for death to escape torment." },
  { surahNumber: 84, verseNumber: 12, arabic: "وَيَصْلَىٰ سَعِيرًا", bengali: "এবং সে জ্বলন্ত আগুনে প্রবেশ করবে।", english: "And burn in a Blaze.", tafsirBengali: "সে জাহান্নামে জ্বলবে।", tafsirEnglish: "He will burn in Hellfire." },
  { surahNumber: 84, verseNumber: 13, arabic: "إِنَّهُ كَانَ فِي أَهْلِهِ مَسْرُورًا", bengali: "সে তার পরিবারে আনন্দে ছিল।", english: "Indeed, he had been among his people in happiness.", tafsirBengali: "দুনিয়ায় সে আনন্দে ছিল আল্লাহকে ভুলে।", tafsirEnglish: "In the world, he was happy forgetting Allah." },
  { surahNumber: 84, verseNumber: 14, arabic: "إِنَّهُ ظَنَّ أَن لَّن يَحُورَ", bengali: "সে মনে করত সে কখনো ফিরবে না।", english: "Indeed, he thought he would never return.", tafsirBengali: "সে ভাবত আল্লাহর কাছে ফিরতে হবে না।", tafsirEnglish: "He thought he would never return to Allah." },
  { surahNumber: 84, verseNumber: 15, arabic: "بَلَىٰ إِنَّ رَبَّهُ كَانَ بِهِ بَصِيرًا", bengali: "অবশ্যই, তার প্রতিপালক তাকে দেখছিলেন।", english: "But yes! Indeed, his Lord was ever Seeing of him.", tafsirBengali: "আল্লাহ সব সময় তাকে দেখছিলেন।", tafsirEnglish: "Allah was always watching him." },
  { surahNumber: 84, verseNumber: 16, arabic: "فَلَا أُقْسِمُ بِالشَّفَقِ", bengali: "আমি শপথ করি সন্ধ্যার লালিমার।", english: "So I swear by the twilight glow.", tafsirBengali: "আল্লাহ সন্ধ্যার লাল আকাশের শপথ করছেন।", tafsirEnglish: "Allah swears by the red twilight sky." },
  { surahNumber: 84, verseNumber: 17, arabic: "وَاللَّيْلِ وَمَا وَسَقَ", bengali: "এবং রাতের ও তা যা একত্রিত করে।", english: "And the night and what it envelops.", tafsirBengali: "রাত যখন সব কিছু ঢেকে দেয়।", tafsirEnglish: "The night when it covers everything." },
  { surahNumber: 84, verseNumber: 18, arabic: "وَالْقَمَرِ إِذَا اتَّسَقَ", bengali: "এবং চাঁদের যখন তা পূর্ণ হয়।", english: "And the moon when it becomes full.", tafsirBengali: "পূর্ণিমার চাঁদের শপথ।", tafsirEnglish: "The oath of the full moon." },
  { surahNumber: 84, verseNumber: 19, arabic: "لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ", bengali: "তোমরা অবশ্যই এক স্তর থেকে আরেক স্তরে আরোহণ করবে।", english: "You will surely experience state after state.", tafsirBengali: "জীবনের বিভিন্ন পর্যায় অতিক্রম করতে হবে।", tafsirEnglish: "You will go through different stages of life." },
  { surahNumber: 84, verseNumber: 20, arabic: "فَمَا لَهُمْ لَا يُؤْمِنُونَ", bengali: "তাদের কী হলো যে তারা বিশ্বাস করে না?", english: "So what is the matter with them that they do not believe?", tafsirBengali: "তারা কেন ঈমান আনছে না?", tafsirEnglish: "Why don't they believe?" },
  { surahNumber: 84, verseNumber: 21, arabic: "وَإِذَا قُرِئَ عَلَيْهِمُ الْقُرْآنُ لَا يَسْجُدُونَ ۩", bengali: "এবং তাদের সামনে কুরআন পাঠ করা হলে তারা সেজদা করে না।", english: "And when the Quran is recited to them, they do not prostrate.", tafsirBengali: "কুরআন শুনেও তারা আল্লাহর সামনে মাথা নত করে না।", tafsirEnglish: "They don't bow to Allah even when hearing the Quran." },
  { surahNumber: 84, verseNumber: 22, arabic: "بَلِ الَّذِينَ كَفَرُوا يُكَذِّبُونَ", bengali: "বরং কাফেররা মিথ্যা প্রতিপন্ন করে।", english: "But those who disbelieve deny.", tafsirBengali: "কাফেররা সত্যকে মিথ্যা বলে।", tafsirEnglish: "Disbelievers call the truth lies." },
  { surahNumber: 84, verseNumber: 23, arabic: "وَاللَّهُ أَعْلَمُ بِمَا يُوعُونَ", bengali: "আল্লাহ ভালো জানেন তারা কী গোপন রাখে।", english: "And Allah is most knowing of what they keep within themselves.", tafsirBengali: "আল্লাহ তাদের মনের কথা জানেন।", tafsirEnglish: "Allah knows what's in their hearts." },
  { surahNumber: 84, verseNumber: 24, arabic: "فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ", bengali: "তাদের সুসংবাদ দাও যন্ত্রণাদায়ক শাস্তির।", english: "So give them tidings of a painful punishment.", tafsirBengali: "তাদের জন্য কঠিন শাস্তি অপেক্ষা করছে।", tafsirEnglish: "A painful punishment awaits them." },
  { surahNumber: 84, verseNumber: 25, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", bengali: "তবে যারা ঈমান এনেছে ও সৎকাজ করেছে, তাদের জন্য রয়েছে অফুরন্ত পুরস্কার।", english: "Except for those who believe and do righteous deeds. For them is a reward uninterrupted.", tafsirBengali: "মুমিনদের পুরস্কার কখনো শেষ হবে না।", tafsirEnglish: "Believers will receive endless rewards." }
];

// Surah Al-Buruj (85) - 22 verses
export const surahBurujVerses: Verse[] = [
  { surahNumber: 85, verseNumber: 1, arabic: "وَالسَّمَاءِ ذَاتِ الْبُرُوجِ", bengali: "শপথ নক্ষত্রপুঞ্জ বিশিষ্ট আকাশের।", english: "By the sky containing great stars.", tafsirBengali: "আল্লাহ তারকা খচিত আকাশের শপথ করছেন।", tafsirEnglish: "Allah swears by the star-filled sky." },
  { surahNumber: 85, verseNumber: 2, arabic: "وَالْيَوْمِ الْمَوْعُودِ", bengali: "এবং প্রতিশ্রুত দিনের।", english: "And by the promised Day.", tafsirBengali: "কিয়ামতের দিনের শপথ।", tafsirEnglish: "The oath of the Day of Judgment." },
  { surahNumber: 85, verseNumber: 3, arabic: "وَشَاهِدٍ وَمَشْهُودٍ", bengali: "এবং সাক্ষী ও সাক্ষ্যদাতার।", english: "And by the witness and what is witnessed.", tafsirBengali: "সাক্ষী ও সাক্ষ্যের বিষয়বস্তুর শপথ।", tafsirEnglish: "The oath of the witness and what is witnessed." },
  { surahNumber: 85, verseNumber: 4, arabic: "قُتِلَ أَصْحَابُ الْأُخْدُودِ", bengali: "অভিশপ্ত হোক গর্তওয়ালারা।", english: "Cursed were the companions of the trench.", tafsirBengali: "গর্তে মুমিনদের পুড়িয়ে মারার গল্প বর্ণনা করা হচ্ছে।", tafsirEnglish: "The story of believers burned in a trench is mentioned." },
  { surahNumber: 85, verseNumber: 5, arabic: "النَّارِ ذَاتِ الْوَقُودِ", bengali: "ইন্ধনপূর্ণ আগুনের।", english: "The fire full of fuel.", tafsirBengali: "তারা বড় আগুন জ্বালিয়েছিল।", tafsirEnglish: "They lit a great fire." },
  { surahNumber: 85, verseNumber: 6, arabic: "إِذْ هُمْ عَلَيْهَا قُعُودٌ", bengali: "যখন তারা তার পাশে বসেছিল।", english: "When they were sitting near it.", tafsirBengali: "তারা আগুনের পাশে বসে ছিল।", tafsirEnglish: "They sat beside the fire." },
  { surahNumber: 85, verseNumber: 7, arabic: "وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ", bengali: "এবং তারা মুমিনদের সাথে যা করছিল তার সাক্ষী ছিল।", english: "And they witnessed what they were doing with the believers.", tafsirBengali: "তারা মুমিনদের পোড়ানো দেখছিল।", tafsirEnglish: "They watched the believers being burned." },
  { surahNumber: 85, verseNumber: 8, arabic: "وَمَا نَقَمُوا مِنْهُمْ إِلَّا أَن يُؤْمِنُوا بِاللَّهِ الْعَزِيزِ الْحَمِيدِ", bengali: "তাদের একমাত্র অপরাধ ছিল আল্লাহর প্রতি ঈমান আনা।", english: "Their only crime was that they believed in Allah, the Exalted, the Praiseworthy.", tafsirBengali: "মুমিনদের একমাত্র দোষ ছিল ঈমান।", tafsirEnglish: "The believers' only fault was their faith." },
  { surahNumber: 85, verseNumber: 9, arabic: "الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ", bengali: "যিনি আসমান ও জমিনের মালিক। আল্লাহ সব কিছুর সাক্ষী।", english: "To whom belongs the dominion of the heavens and earth. And Allah is Witness over all things.", tafsirBengali: "আল্লাহ সব কিছু দেখছেন ও জানেন।", tafsirEnglish: "Allah sees and knows everything." },
  { surahNumber: 85, verseNumber: 10, arabic: "إِنَّ الَّذِينَ فَتَنُوا الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ ثُمَّ لَمْ يَتُوبُوا فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ الْحَرِيقِ", bengali: "যারা মুমিন পুরুষ ও নারীদের নির্যাতন করেছে এবং তওবা করেনি, তাদের জন্য জাহান্নামের শাস্তি।", english: "Those who persecuted the believing men and women and did not repent will have the punishment of Hell.", tafsirBengali: "অত্যাচারীদের জন্য জাহান্নাম।", tafsirEnglish: "Hell awaits the oppressors." },
  { surahNumber: 85, verseNumber: 11, arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ۚ ذَٰلِكَ الْفَوْزُ الْكَبِيرُ", bengali: "যারা ঈমান এনেছে ও সৎকাজ করেছে, তাদের জন্য জান্নাত যার নিচে নদী প্রবাহিত। এটাই মহা সাফল্য।", english: "Those who believed and did righteous deeds will have gardens beneath which rivers flow. That is the great attainment.", tafsirBengali: "মুমিনদের জন্য জান্নাত।", tafsirEnglish: "Paradise awaits the believers." },
  { surahNumber: 85, verseNumber: 12, arabic: "إِنَّ بَطْشَ رَبِّكَ لَشَدِيدٌ", bengali: "নিশ্চয়ই তোমার প্রতিপালকের পাকড়াও অত্যন্ত কঠিন।", english: "Indeed, the vengeance of your Lord is severe.", tafsirBengali: "আল্লাহর শাস্তি অত্যন্ত কঠোর।", tafsirEnglish: "Allah's punishment is very severe." },
  { surahNumber: 85, verseNumber: 13, arabic: "إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ", bengali: "তিনিই সৃষ্টির সূচনা করেন এবং পুনরায় সৃষ্টি করবেন।", english: "Indeed, it is He who originates and repeats.", tafsirBengali: "আল্লাহ সৃষ্টি করেন এবং পুনরুত্থান করবেন।", tafsirEnglish: "Allah creates and will resurrect." },
  { surahNumber: 85, verseNumber: 14, arabic: "وَهُوَ الْغَفُورُ الْوَدُودُ", bengali: "তিনি ক্ষমাশীল, প্রেমময়।", english: "And He is the Forgiving, the Affectionate.", tafsirBengali: "আল্লাহ ক্ষমা করেন এবং ভালোবাসেন।", tafsirEnglish: "Allah forgives and loves." },
  { surahNumber: 85, verseNumber: 15, arabic: "ذُو الْعَرْشِ الْمَجِيدُ", bengali: "আরশের মালিক, মহিমান্বিত।", english: "Owner of the Throne, the Glorious.", tafsirBengali: "আল্লাহ আরশের মালিক এবং মহান।", tafsirEnglish: "Allah owns the Throne and is Glorious." },
  { surahNumber: 85, verseNumber: 16, arabic: "فَعَّالٌ لِّمَا يُرِيدُ", bengali: "তিনি যা ইচ্ছা তা করেন।", english: "Doer of what He intends.", tafsirBengali: "আল্লাহ যা চান তাই করেন।", tafsirEnglish: "Allah does whatever He wills." },
  { surahNumber: 85, verseNumber: 17, arabic: "هَلْ أَتَاكَ حَدِيثُ الْجُنُودِ", bengali: "তোমার কাছে কি বাহিনীগুলোর সংবাদ এসেছে?", english: "Has there reached you the story of the soldiers?", tafsirBengali: "আগের অবিশ্বাসী বাহিনীর কাহিনী।", tafsirEnglish: "The story of previous disbelieving armies." },
  { surahNumber: 85, verseNumber: 18, arabic: "فِرْعَوْنَ وَثَمُودَ", bengali: "ফেরাউন ও সামূদের।", english: "Of Pharaoh and Thamud?", tafsirBengali: "ফেরাউন ও সামূদ জাতির কাহিনী।", tafsirEnglish: "The story of Pharaoh and Thamud." },
  { surahNumber: 85, verseNumber: 19, arabic: "بَلِ الَّذِينَ كَفَرُوا فِي تَكْذِيبٍ", bengali: "বরং কাফেররা মিথ্যা প্রতিপন্ন করতেই থাকে।", english: "But those who disbelieve are in denial.", tafsirBengali: "কাফেররা সত্যকে অস্বীকার করতে থাকে।", tafsirEnglish: "Disbelievers continue to deny the truth." },
  { surahNumber: 85, verseNumber: 20, arabic: "وَاللَّهُ مِن وَرَائِهِم مُّحِيطٌ", bengali: "অথচ আল্লাহ তাদের চারপাশ থেকে পরিবেষ্টন করে আছেন।", english: "While Allah encompasses them from behind.", tafsirBengali: "আল্লাহ তাদের সব দিক থেকে ঘিরে রেখেছেন।", tafsirEnglish: "Allah surrounds them from all sides." },
  { surahNumber: 85, verseNumber: 21, arabic: "بَلْ هُوَ قُرْآنٌ مَّجِيدٌ", bengali: "বরং এটা মহিমান্বিত কুরআন।", english: "Rather, this is a glorious Quran.", tafsirBengali: "কুরআন অত্যন্ত সম্মানিত ও মহান।", tafsirEnglish: "The Quran is highly honored and great." },
  { surahNumber: 85, verseNumber: 22, arabic: "فِي لَوْحٍ مَّحْفُوظٍ", bengali: "সংরক্ষিত ফলকে।", english: "In a Preserved Slate.", tafsirBengali: "কুরআন লওহে মাহফুজে সংরক্ষিত।", tafsirEnglish: "The Quran is preserved in the Preserved Tablet." }
];

// Surah At-Tariq (86) - 17 verses
export const surahTariqVerses: Verse[] = [
  { surahNumber: 86, verseNumber: 1, arabic: "وَالسَّمَاءِ وَالطَّارِقِ", bengali: "শপথ আকাশের এবং রাতে আগমনকারীর।", english: "By the sky and the night comer.", tafsirBengali: "আল্লাহ আকাশ ও নক্ষত্রের শপথ করছেন।", tafsirEnglish: "Allah swears by the sky and the night star." },
  { surahNumber: 86, verseNumber: 2, arabic: "وَمَا أَدْرَاكَ مَا الطَّارِقُ", bengali: "তুমি কি জান রাতে আগমনকারী কী?", english: "And what can make you know what is the night comer?", tafsirBengali: "রাতে আগত তারার গুরুত্ব বর্ণনা।", tafsirEnglish: "The importance of the night star is described." },
  { surahNumber: 86, verseNumber: 3, arabic: "النَّجْمُ الثَّاقِبُ", bengali: "এটা উজ্জ্বল তারকা।", english: "It is the piercing star.", tafsirBengali: "এটা অত্যন্ত উজ্জ্বল, তীক্ষ্ণ আলোকযুক্ত তারা।", tafsirEnglish: "It is a bright, piercing star." },
  { surahNumber: 86, verseNumber: 4, arabic: "إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ", bengali: "প্রতিটি আত্মার ওপর অবশ্যই একজন রক্ষক রয়েছে।", english: "There is no soul but that it has a protector.", tafsirBengali: "প্রত্যেক মানুষের জন্য ফেরেশতা নিযুক্ত।", tafsirEnglish: "Every person has an angel assigned." },
  { surahNumber: 86, verseNumber: 5, arabic: "فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ", bengali: "মানুষ যেন দেখে সে কী থেকে সৃষ্ট।", english: "So let man observe from what he was created.", tafsirBengali: "মানুষ তার সৃষ্টি নিয়ে চিন্তা করুক।", tafsirEnglish: "Let man ponder his creation." },
  { surahNumber: 86, verseNumber: 6, arabic: "خُلِقَ مِن مَّاءٍ دَافِقٍ", bengali: "সে সৃষ্ট হয়েছে সবেগে নির্গত পানি থেকে।", english: "He was created from a fluid, ejected.", tafsirBengali: "মানুষ বীর্য থেকে সৃষ্ট।", tafsirEnglish: "Man was created from seminal fluid." },
  { surahNumber: 86, verseNumber: 7, arabic: "يَخْرُجُ مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ", bengali: "যা মেরুদণ্ড ও বুকের হাড়ের মধ্য থেকে বের হয়।", english: "Emerging from between the backbone and the ribs.", tafsirBengali: "এই পানি পিঠ ও বুকের মধ্য থেকে আসে।", tafsirEnglish: "This fluid comes from between the backbone and ribs." },
  { surahNumber: 86, verseNumber: 8, arabic: "إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ", bengali: "নিশ্চয়ই তিনি তাকে পুনরায় সৃষ্টি করতে সক্ষম।", english: "Indeed, He is Able to return him [to life].", tafsirBengali: "আল্লাহ মানুষকে পুনরুত্থিত করতে সক্ষম।", tafsirEnglish: "Allah is able to resurrect humans." },
  { surahNumber: 86, verseNumber: 9, arabic: "يَوْمَ تُبْلَى السَّرَائِرُ", bengali: "যেদিন গোপন বিষয়গুলো পরীক্ষা করা হবে।", english: "The Day when secrets will be examined.", tafsirBengali: "কিয়ামতে সব গোপন বিষয় প্রকাশ হবে।", tafsirEnglish: "On Judgment Day, all secrets will be revealed." },
  { surahNumber: 86, verseNumber: 10, arabic: "فَمَا لَهُ مِن قُوَّةٍ وَلَا نَاصِرٍ", bengali: "তখন তার কোনো শক্তি বা সাহায্যকারী থাকবে না।", english: "Then he will have no power or helper.", tafsirBengali: "সেদিন কেউ সাহায্য করতে পারবে না।", tafsirEnglish: "That Day, no one can help." },
  { surahNumber: 86, verseNumber: 11, arabic: "وَالسَّمَاءِ ذَاتِ الرَّجْعِ", bengali: "শপথ প্রত্যাবর্তনশীল আকাশের।", english: "By the sky which returns.", tafsirBengali: "আকাশ বৃষ্টি ফেরত পাঠায়।", tafsirEnglish: "The sky returns rain." },
  { surahNumber: 86, verseNumber: 12, arabic: "وَالْأَرْضِ ذَاتِ الصَّدْعِ", bengali: "এবং বিদীর্ণ পৃথিবীর।", english: "And the earth which cracks open.", tafsirBengali: "পৃথিবী ফেটে উদ্ভিদ বের হয়।", tafsirEnglish: "The earth cracks to bring forth plants." },
  { surahNumber: 86, verseNumber: 13, arabic: "إِنَّهُ لَقَوْلٌ فَصْلٌ", bengali: "নিশ্চয়ই এটা চূড়ান্ত কথা।", english: "Indeed, it is a decisive statement.", tafsirBengali: "কুরআন সত্য ও মিথ্যার পার্থক্যকারী।", tafsirEnglish: "The Quran distinguishes truth from falsehood." },
  { surahNumber: 86, verseNumber: 14, arabic: "وَمَا هُوَ بِالْهَزْلِ", bengali: "এটা কোনো হাসির বিষয় নয়।", english: "And it is not amusement.", tafsirBengali: "কুরআন গুরুত্বপূর্ণ, মজার বিষয় নয়।", tafsirEnglish: "The Quran is serious, not entertainment." },
  { surahNumber: 86, verseNumber: 15, arabic: "إِنَّهُمْ يَكِيدُونَ كَيْدًا", bengali: "তারা ষড়যন্ত্র করছে।", english: "Indeed, they are planning a plan.", tafsirBengali: "কাফেররা ইসলামের বিরুদ্ধে ষড়যন্ত্র করে।", tafsirEnglish: "Disbelievers plot against Islam." },
  { surahNumber: 86, verseNumber: 16, arabic: "وَأَكِيدُ كَيْدًا", bengali: "আমিও কৌশল করছি।", english: "But I am planning a plan.", tafsirBengali: "আল্লাহও তাদের বিরুদ্ধে কৌশল করেন।", tafsirEnglish: "Allah also plans against them." },
  { surahNumber: 86, verseNumber: 17, arabic: "فَمَهِّلِ الْكَافِرِينَ أَمْهِلْهُمْ رُوَيْدًا", bengali: "অতএব কাফেরদের অবকাশ দাও, তাদের কিছুকাল অবকাশ দাও।", english: "So allow time for the disbelievers. Leave them awhile.", tafsirBengali: "কাফেরদের কিছু সময় দাও, তারপর তাদের পরিণতি আসবে।", tafsirEnglish: "Give disbelievers time, then their fate will come." }
];

// All verses collection
const allVerses: { [key: number]: Verse[] } = {
  1: surahFatihaVerses,
  79: surahNaziatVerses,
  80: surahAbasaVerses,
  81: surahTakwirVerses,
  82: surahInfitarVerses,
  83: surahMutaffifinVerses,
  84: surahInshiqaqVerses,
  85: surahBurujVerses,
  86: surahTariqVerses,
  87: surahAlaVerses,
  88: surahGhashiyaVerses,
  89: surahFajrVerses,
  90: surahBaladVerses,
  91: surahShamsVerses,
  92: surahLaylVerses,
  93: surahDuhaVerses,
  94: surahSharhVerses,
  95: surahTinVerses,
  96: surahAlaqVerses,
  97: surahQadrVerses,
  98: surahBayyinaVerses,
  99: surahZalzalaVerses,
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
