export interface Dua {
  id: string;
  arabic: string;
  bengali: string;
  english: string;
  reference?: string;
}

export interface DuaCategory {
  id: string;
  nameEnglish: string;
  nameBengali: string;
  icon: string;
  duas: Dua[];
}

export const duaCategories: DuaCategory[] = [
  // ============ PHASE 1: Core Daily Duas (5 Categories) ============
  
  // 1. Daily Life Duas
  {
    id: "daily-life",
    nameEnglish: "Daily Life Duas",
    nameBengali: "দৈনন্দিন দোয়া",
    icon: "Calendar",
    duas: [
      {
        id: "daily-1",
        arabic: "بِسْمِ اللهِ",
        bengali: "আল্লাহর নামে শুরু করছি।",
        english: "In the name of Allah.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "daily-2",
        arabic: "الْحَمْدُ لِلَّهِ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য।",
        english: "All praise is due to Allah.",
        reference: "সূরা ফাতিহা ১:২"
      },
      {
        id: "daily-3",
        arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
        bengali: "আল্লাহর নামে এবং আল্লাহর বরকতে শুরু করছি।",
        english: "In the name of Allah and with the blessings of Allah.",
        reference: "আবু দাউদ"
      },
      {
        id: "daily-4",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং মুসলিম বানিয়েছেন।",
        english: "All praise is for Allah who fed us and gave us drink, and made us Muslims.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "daily-5",
        arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
        bengali: "আল্লাহর নামে বের হচ্ছি, আল্লাহর উপর ভরসা করলাম, আল্লাহর সাহায্য ছাড়া কোন উপায় নেই এবং কোন শক্তি নেই।",
        english: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "daily-6",
        arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا",
        bengali: "আল্লাহর নামে প্রবেশ করলাম, আল্লাহর নামে বের হলাম এবং আমাদের রব আল্লাহর উপর ভরসা করলাম।",
        english: "In the name of Allah we enter and in the name of Allah we leave, and upon our Lord we place our trust.",
        reference: "আবু দাউদ"
      }
    ]
  },

  // 2. Morning & Evening Duas (Adhkar)
  {
    id: "morning-evening",
    nameEnglish: "Morning & Evening Adhkar",
    nameBengali: "সকাল-সন্ধ্যার যিকর",
    icon: "Sun",
    duas: [
      {
        id: "adhkar-1",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
        bengali: "আমরা সকালে উপনীত হলাম এবং সকালে উপনীত হল আল্লাহর রাজত্ব। সমস্ত প্রশংসা আল্লাহর জন্য। একমাত্র আল্লাহ ছাড়া কোন ইলাহ নেই, তাঁর কোন শরীক নেই।",
        english: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "adhkar-2",
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        bengali: "হে আল্লাহ! তোমার অনুগ্রহে আমরা সকালে উপনীত হয়েছি, তোমার অনুগ্রহে সন্ধ্যায় উপনীত হই, তোমার ইচ্ছায় জীবিত থাকি, তোমার ইচ্ছায় মৃত্যুবরণ করি এবং তোমার কাছেই পুনরুত্থিত হব।",
        english: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
        reference: "তিরমিযী"
      },
      {
        id: "adhkar-3",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং সন্ধ্যায় উপনীত হল আল্লাহর রাজত্ব। সমস্ত প্রশংসা আল্লাহর জন্য। একমাত্র আল্লাহ ছাড়া কোন ইলাহ নেই, তাঁর কোন শরীক নেই।",
        english: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "adhkar-4",
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        bengali: "আল্লাহ পবিত্র এবং তাঁর জন্যই সকল প্রশংসা। (১০০ বার পড়ুন)",
        english: "Glory is to Allah and praise is to Him. (Recite 100 times)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "adhkar-5",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই, প্রশংসাও তাঁর এবং তিনি সবকিছুর উপর ক্ষমতাবান। (১০ বার বা ১০০ বার)",
        english: "None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things omnipotent. (10 or 100 times)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "adhkar-6",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দুনিয়া ও আখিরাতে সুস্থতা প্রার্থনা করি।",
        english: "O Allah, I ask You for well-being in this world and the Hereafter.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "adhkar-7",
        arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        bengali: "সমস্ত প্রশংসা সেই আল্লাহর জন্য যিনি মৃত্যুর পর আমাদের জীবিত করেছেন এবং তাঁরই কাছে পুনরুত্থান।",
        english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "adhkar-8",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        bengali: "হে আল্লাহ! তোমার নামে মৃত্যুবরণ করি এবং জীবিত হই।",
        english: "In Your name O Allah, I die and I live.",
        reference: "সহীহ বুখারী"
      }
    ]
  },

  // 3. Forgiveness & Repentance
  {
    id: "forgiveness",
    nameEnglish: "Forgiveness & Repentance",
    nameBengali: "ইসতিগফার ও তাওবা",
    icon: "HeartHandshake",
    duas: [
      {
        id: "forgive-1",
        arabic: "أَسْتَغْفِرُ اللهَ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই।",
        english: "I seek forgiveness from Allah.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgive-2",
        arabic: "أَسْتَغْفِرُ اللهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই, যিনি ছাড়া কোন ইলাহ নেই, তিনি চিরঞ্জীব, সবকিছুর ধারক এবং তাঁর কাছেই তাওবা করছি।",
        english: "I seek forgiveness from Allah, besides whom there is none worthy of worship, the Ever Living, the Self-Subsisting, and I repent to Him.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "forgive-3",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
        bengali: "হে আল্লাহ! তুমি আমার রব, তুমি ছাড়া কোন ইলাহ নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা। আমি সাধ্যমত তোমার সাথে কৃত অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে তোমার আশ্রয় চাই। আমি আমার প্রতি তোমার নিয়ামতের স্বীকৃতি দিচ্ছি এবং আমার গুনাহের স্বীকৃতি দিচ্ছি। অতএব, তুমি আমাকে ক্ষমা কর, কেননা তুমি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না।",
        english: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave. I keep Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your blessings upon me and I acknowledge my sins. So forgive me, for none forgives sins but You.",
        reference: "সহীহ বুখারী (সাইয়িদুল ইসতিগফার)"
      },
      {
        id: "forgive-4",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর এবং আমার তাওবা কবুল কর। নিশ্চয়ই তুমি তাওবা কবুলকারী, অতি দয়ালু।",
        english: "My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of repentance, the Most Merciful.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "forgive-5",
        arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        bengali: "হে আমাদের রব! আমরা নিজেদের প্রতি যুলুম করেছি। তুমি যদি আমাদের ক্ষমা না কর এবং রহম না কর তাহলে আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
        english: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
        reference: "সূরা আরাফ ৭:২৩"
      },
      {
        id: "forgive-6",
        arabic: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
        bengali: "হে আমার রব! আমি নিজের প্রতি যুলুম করেছি, অতএব আমাকে ক্ষমা কর।",
        english: "My Lord, indeed I have wronged myself, so forgive me.",
        reference: "সূরা কাসাস ২৮:১৬"
      }
    ]
  },

  // 4. Protection & Safety Duas
  {
    id: "protection",
    nameEnglish: "Protection & Safety",
    nameBengali: "হিফাজতের দোয়া",
    icon: "Shield",
    duas: [
      {
        id: "protect-1",
        arabic: "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        bengali: "আল্লাহর নামে, যাঁর নামের সাথে আসমান ও জমিনে কোন কিছুই ক্ষতি করতে পারে না এবং তিনি সর্বশ্রোতা, সর্বজ্ঞ। (৩ বার পড়ুন)",
        english: "In the name of Allah, with whose name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing. (Recite 3 times)",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "protect-2",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই। (৩ বার পড়ুন)",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created. (Recite 3 times)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "protect-3",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        bengali: "হে আল্লাহ! আমি তোমার আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অক্ষমতা ও অলসতা থেকে, কাপুরুষতা ও কৃপণতা থেকে এবং ঋণের বোঝা ও মানুষের দমন থেকে।",
        english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "protect-4",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        bengali: "হে আল্লাহ! আমাকে হিফাজত কর আমার সামনে থেকে, পেছন থেকে, ডান দিক থেকে, বাম দিক থেকে এবং উপর থেকে। আমি তোমার মহত্ত্বের আশ্রয় নিচ্ছি যেন আমাকে নিচ থেকে হঠাৎ ধ্বংস করা না হয়।",
        english: "O Allah, protect me from my front, from behind me, from my right, from my left, and from above me, and I seek refuge in Your Greatness from being unexpectedly destroyed from beneath me.",
        reference: "আবু দাউদ, ইবনে মাজাহ"
      },
      {
        id: "protect-5",
        arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই।",
        english: "I seek refuge in Allah from the accursed Satan.",
        reference: "সূরা নাহল ১৬:৯৮"
      },
      {
        id: "protect-6",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই আমার নফসের অনিষ্ট থেকে এবং প্রতিটি প্রাণীর অনিষ্ট থেকে যার নিয়ন্ত্রণ তোমার হাতে।",
        english: "O Allah, I seek refuge in You from the evil of my soul and from the evil of every creature whose forelock is in Your Hand.",
        reference: "তিরমিযী"
      }
    ]
  },

  // 5. Duas from the Qur'an
  {
    id: "quran-duas",
    nameEnglish: "Duas from the Qur'an",
    nameBengali: "কুরআনের দোয়া",
    icon: "BookOpen",
    duas: [
      {
        id: "quran-1",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং আমাদেরকে জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "quran-2",
        arabic: "رَبَّنَا لاَ تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا، رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا، رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَاقَةَ لَنَا بِهِ، وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا، أَنتَ مَوْلاَنَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        bengali: "হে আমাদের রব! আমরা যদি ভুলে যাই অথবা ভুল করি তাহলে আমাদের পাকড়াও করো না। হে আমাদের রব! আমাদের পূর্ববর্তীদের উপর যেমন বোঝা চাপিয়েছিলে আমাদের উপর তেমন বোঝা চাপিও না। হে আমাদের রব! আমাদের সামর্থ্যের বাইরে কিছু আমাদের উপর চাপিও না। আমাদের মাফ কর, আমাদের ক্ষমা কর এবং আমাদের প্রতি দয়া কর। তুমিই আমাদের অভিভাবক। অতএব, কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।",
        english: "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.",
        reference: "সূরা বাকারা ২:২৮৬"
      },
      {
        id: "quran-3",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي، يَفْقَهُوا قَوْلِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও, আমার কাজ সহজ করে দাও এবং আমার জিহ্বার জড়তা দূর করে দাও, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "My Lord, expand for me my breast, ease my task for me, and untie the knot from my tongue, that they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৫-২৮"
      },
      {
        id: "quran-4",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দাও।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "quran-5",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "quran-6",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        bengali: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দাও, আমাদের পা স্থির রাখ এবং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।",
        english: "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
        reference: "সূরা বাকারা ২:২৫০"
      },
      {
        id: "quran-7",
        arabic: "رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
        bengali: "হে আমাদের রব! হিদায়াত দেওয়ার পর আমাদের অন্তরকে বক্র করো না এবং তোমার পক্ষ থেকে আমাদেরকে রহমত দান কর। নিশ্চয়ই তুমি মহাদাতা।",
        english: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "quran-8",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        bengali: "হে আমাদের রব! আমাদের গুনাহ ক্ষমা কর এবং আমাদের কাজে যে সীমালঙ্ঘন হয়েছে তা মাফ কর, আমাদের পা স্থির রাখ এবং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।",
        english: "Our Lord, forgive us our sins and the excess in our affairs and plant firmly our feet and give us victory over the disbelieving people.",
        reference: "সূরা আলে ইমরান ৩:১৪৭"
      }
    ]
  }
];

export const getDuaCategory = (categoryId: string): DuaCategory | undefined => {
  return duaCategories.find(category => category.id === categoryId);
};
