export interface Dua {
  id: string;
  titleBengali?: string;
  titleEnglish?: string;
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
        titleBengali: "কাজ শুরু করার দোয়া",
        titleEnglish: "Before Starting Any Task",
        arabic: "بِسْمِ اللهِ",
        bengali: "আল্লাহর নামে শুরু করছি।",
        english: "In the name of Allah.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "daily-2",
        titleBengali: "আল্লাহর প্রশংসা",
        titleEnglish: "Praising Allah",
        arabic: "الْحَمْدُ لِلَّهِ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য।",
        english: "All praise is due to Allah.",
        reference: "সূরা ফাতিহা ১:২"
      },
      {
        id: "daily-3",
        titleBengali: "বরকত সহ শুরু করার দোয়া",
        titleEnglish: "Starting with Blessings",
        arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
        bengali: "আল্লাহর নামে এবং আল্লাহর বরকতে শুরু করছি।",
        english: "In the name of Allah and with the blessings of Allah.",
        reference: "আবু দাউদ"
      },
      {
        id: "daily-4",
        titleBengali: "খাওয়ার পরের দোয়া",
        titleEnglish: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং মুসলিম বানিয়েছেন।",
        english: "All praise is for Allah who fed us and gave us drink, and made us Muslims.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "daily-5",
        titleBengali: "ঘর থেকে বের হওয়ার দোয়া",
        titleEnglish: "When Leaving Home",
        arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
        bengali: "আল্লাহর নামে বের হচ্ছি, আল্লাহর উপর ভরসা করলাম, আল্লাহর সাহায্য ছাড়া কোন উপায় নেই এবং কোন শক্তি নেই।",
        english: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "daily-6",
        titleBengali: "ঘরে প্রবেশের দোয়া",
        titleEnglish: "When Entering Home",
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
        titleBengali: "সকালের প্রথম যিকর",
        titleEnglish: "Morning Remembrance",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
        bengali: "আমরা সকালে উপনীত হলাম এবং সকালে উপনীত হল আল্লাহর রাজত্ব। সমস্ত প্রশংসা আল্লাহর জন্য। একমাত্র আল্লাহ ছাড়া কোন ইলাহ নেই, তাঁর কোন শরীক নেই।",
        english: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "adhkar-2",
        titleBengali: "সকালে আল্লাহর কাছে প্রার্থনা",
        titleEnglish: "Morning Supplication",
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        bengali: "হে আল্লাহ! তোমার অনুগ্রহে আমরা সকালে উপনীত হয়েছি, তোমার অনুগ্রহে সন্ধ্যায় উপনীত হই, তোমার ইচ্ছায় জীবিত থাকি, তোমার ইচ্ছায় মৃত্যুবরণ করি এবং তোমার কাছেই পুনরুত্থিত হব।",
        english: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
        reference: "তিরমিযী"
      },
      {
        id: "adhkar-3",
        titleBengali: "সন্ধ্যার প্রথম যিকর",
        titleEnglish: "Evening Remembrance",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং সন্ধ্যায় উপনীত হল আল্লাহর রাজত্ব। সমস্ত প্রশংসা আল্লাহর জন্য। একমাত্র আল্লাহ ছাড়া কোন ইলাহ নেই, তাঁর কোন শরীক নেই।",
        english: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "adhkar-4",
        titleBengali: "তাসবীহ (১০০ বার)",
        titleEnglish: "Tasbeeh (100 times)",
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        bengali: "আল্লাহ পবিত্র এবং তাঁর জন্যই সকল প্রশংসা। (১০০ বার পড়ুন)",
        english: "Glory is to Allah and praise is to Him. (Recite 100 times)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "adhkar-5",
        titleBengali: "তাওহীদের যিকর",
        titleEnglish: "Declaration of Tawheed",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই, প্রশংসাও তাঁর এবং তিনি সবকিছুর উপর ক্ষমতাবান। (১০ বার বা ১০০ বার)",
        english: "None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things omnipotent. (10 or 100 times)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "adhkar-6",
        titleBengali: "সুস্থতার দোয়া",
        titleEnglish: "Prayer for Well-being",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দুনিয়া ও আখিরাতে সুস্থতা প্রার্থনা করি।",
        english: "O Allah, I ask You for well-being in this world and the Hereafter.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "adhkar-7",
        titleBengali: "ঘুম থেকে জাগার দোয়া",
        titleEnglish: "Upon Waking Up",
        arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        bengali: "সমস্ত প্রশংসা সেই আল্লাহর জন্য যিনি মৃত্যুর পর আমাদের জীবিত করেছেন এবং তাঁরই কাছে পুনরুত্থান।",
        english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "adhkar-8",
        titleBengali: "ঘুমানোর আগে দোয়া",
        titleEnglish: "Before Sleeping",
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
        titleBengali: "সংক্ষিপ্ত ইসতিগফার",
        titleEnglish: "Short Istighfar",
        arabic: "أَسْتَغْفِرُ اللهَ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই।",
        english: "I seek forgiveness from Allah.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgive-2",
        titleBengali: "সম্পূর্ণ ইসতিগফার",
        titleEnglish: "Complete Istighfar",
        arabic: "أَسْتَغْفِرُ اللهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই, যিনি ছাড়া কোন ইলাহ নেই, তিনি চিরঞ্জীব, সবকিছুর ধারক এবং তাঁর কাছেই তাওবা করছি।",
        english: "I seek forgiveness from Allah, besides whom there is none worthy of worship, the Ever Living, the Self-Subsisting, and I repent to Him.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "forgive-3",
        titleBengali: "সাইয়িদুল ইসতিগফার",
        titleEnglish: "Master of Forgiveness",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
        bengali: "হে আল্লাহ! তুমি আমার রব, তুমি ছাড়া কোন ইলাহ নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা। আমি সাধ্যমত তোমার সাথে কৃত অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে তোমার আশ্রয় চাই। আমি আমার প্রতি তোমার নিয়ামতের স্বীকৃতি দিচ্ছি এবং আমার গুনাহের স্বীকৃতি দিচ্ছি। অতএব, তুমি আমাকে ক্ষমা কর, কেননা তুমি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না।",
        english: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave. I keep Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your blessings upon me and I acknowledge my sins. So forgive me, for none forgives sins but You.",
        reference: "সহীহ বুখারী (সাইয়িদুল ইসতিগফার)"
      },
      {
        id: "forgive-4",
        titleBengali: "তাওবার দোয়া",
        titleEnglish: "Prayer for Repentance",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর এবং আমার তাওবা কবুল কর। নিশ্চয়ই তুমি তাওবা কবুলকারী, অতি দয়ালু।",
        english: "My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of repentance, the Most Merciful.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "forgive-5",
        titleBengali: "আদম (আ.) এর দোয়া",
        titleEnglish: "Dua of Prophet Adam",
        arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        bengali: "হে আমাদের রব! আমরা নিজেদের প্রতি যুলুম করেছি। তুমি যদি আমাদের ক্ষমা না কর এবং রহম না কর তাহলে আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
        english: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
        reference: "সূরা আরাফ ৭:২৩"
      },
      {
        id: "forgive-6",
        titleBengali: "মূসা (আ.) এর দোয়া",
        titleEnglish: "Dua of Prophet Musa",
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
        titleBengali: "সকল ক্ষতি থেকে সুরক্ষা",
        titleEnglish: "Protection from All Harm",
        arabic: "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        bengali: "আল্লাহর নামে, যাঁর নামের সাথে আসমান ও জমিনে কোন কিছুই ক্ষতি করতে পারে না এবং তিনি সর্বশ্রোতা, সর্বজ্ঞ। (৩ বার পড়ুন)",
        english: "In the name of Allah, with whose name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing. (Recite 3 times)",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "protect-2",
        titleBengali: "সৃষ্টির অনিষ্ট থেকে আশ্রয়",
        titleEnglish: "Refuge from Evil of Creation",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই। (৩ বার পড়ুন)",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created. (Recite 3 times)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "protect-3",
        titleBengali: "দুশ্চিন্তা থেকে আশ্রয়",
        titleEnglish: "Protection from Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        bengali: "হে আল্লাহ! আমি তোমার আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অক্ষমতা ও অলসতা থেকে, কাপুরুষতা ও কৃপণতা থেকে এবং ঋণের বোঝা ও মানুষের দমন থেকে।",
        english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "protect-4",
        titleBengali: "চারদিক থেকে হিফাজত",
        titleEnglish: "Protection from All Sides",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        bengali: "হে আল্লাহ! আমাকে হিফাজত কর আমার সামনে থেকে, পেছন থেকে, ডান দিক থেকে, বাম দিক থেকে এবং উপর থেকে। আমি তোমার মহত্ত্বের আশ্রয় নিচ্ছি যেন আমাকে নিচ থেকে হঠাৎ ধ্বংস করা না হয়।",
        english: "O Allah, protect me from my front, from behind me, from my right, from my left, and from above me, and I seek refuge in Your Greatness from being unexpectedly destroyed from beneath me.",
        reference: "আবু দাউদ, ইবনে মাজাহ"
      },
      {
        id: "protect-5",
        titleBengali: "শয়তান থেকে আশ্রয়",
        titleEnglish: "Refuge from Satan",
        arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই।",
        english: "I seek refuge in Allah from the accursed Satan.",
        reference: "সূরা নাহল ১৬:৯৮"
      },
      {
        id: "protect-6",
        titleBengali: "নফস ও প্রাণীর অনিষ্ট থেকে",
        titleEnglish: "Protection from Self & Creatures",
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
  },

  // ============ PHASE 2: Spiritual & Knowledge Duas (5 Categories) ============

  // 6. Duas from the Sunnah (Hadith)
  {
    id: "sunnah-duas",
    nameEnglish: "Duas from the Sunnah",
    nameBengali: "হাদীসের দোয়া",
    icon: "BookMarked",
    duas: [
      {
        id: "sunnah-1",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        bengali: "হে আল্লাহ! আমি তোমার কাছে হিদায়াত, তাকওয়া, পবিত্রতা এবং অভাবমুক্তি প্রার্থনা করি।",
        english: "O Allah, I ask You for guidance, piety, chastity and self-sufficiency.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "sunnah-2",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল প্রার্থনা করি।",
        english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "sunnah-3",
        arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
        bengali: "হে আল্লাহ! আমার দ্বীনকে সংশোধন করে দাও যা আমার সকল বিষয়ের রক্ষাকবচ। আমার দুনিয়াকে সংশোধন করে দাও যেখানে আমার জীবিকা। আমার আখিরাতকে সংশোধন করে দাও যেখানে আমার প্রত্যাবর্তন।",
        english: "O Allah, set right for me my religion which is the safeguard of my affairs. Set right for me my worldly life wherein is my livelihood. Set right for me my Hereafter which is my return.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "sunnah-4",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيعِ سَخَطِكَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই তোমার নিয়ামত চলে যাওয়া থেকে, তোমার দেওয়া সুস্থতা বদলে যাওয়া থেকে, আকস্মিক আযাব থেকে এবং তোমার সকল অসন্তুষ্টি থেকে।",
        english: "O Allah, I seek refuge in You from the removal of Your blessings, the change of Your protection, Your sudden punishment, and all of Your displeasure.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "sunnah-5",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        bengali: "হে আল্লাহ! তোমার যিকর, শুকর এবং সুন্দরভাবে তোমার ইবাদত করতে আমাকে সাহায্য কর।",
        english: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        reference: "আবু দাউদ, নাসাঈ"
      },
      {
        id: "sunnah-6",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে সকল কল্যাণ প্রার্থনা করি, এখনকার এবং পরবর্তীর, যা আমি জানি এবং যা জানি না।",
        english: "O Allah, I ask You for all good, immediate and later, that which I know and that which I do not know.",
        reference: "ইবনে মাজাহ"
      }
    ]
  },

  // 7. Guidance & Iman Duas
  {
    id: "guidance-iman",
    nameEnglish: "Guidance & Iman",
    nameBengali: "ঈমান ও হিদায়াত",
    icon: "Compass",
    duas: [
      {
        id: "guidance-1",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        bengali: "আমাদেরকে সরল পথ দেখাও।",
        english: "Guide us to the straight path.",
        reference: "সূরা ফাতিহা ১:৬"
      },
      {
        id: "guidance-2",
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        bengali: "হে আল্লাহ! আমাকে হিদায়াত দাও এবং সঠিক পথে পরিচালিত কর।",
        english: "O Allah, guide me and keep me on the right path.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "guidance-3",
        arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        bengali: "হে অন্তর পরিবর্তনকারী! আমার অন্তরকে তোমার দ্বীনের উপর স্থির রাখ।",
        english: "O Turner of hearts, make my heart firm upon Your religion.",
        reference: "তিরমিযী"
      },
      {
        id: "guidance-4",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الأَمْرِ، وَالْعَزِيمَةَ عَلَى الرُّشْدِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দ্বীনের উপর অটল থাকা এবং সঠিক পথে চলার দৃঢ় সংকল্প প্রার্থনা করি।",
        english: "O Allah, I ask You for steadfastness in the matter and determination upon guidance.",
        reference: "নাসাঈ"
      },
      {
        id: "guidance-5",
        arabic: "اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ، وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ",
        bengali: "হে আল্লাহ! আমাদেরকে সত্যকে সত্য হিসেবে দেখাও এবং তা অনুসরণ করার তাওফীক দাও। বাতিলকে বাতিল হিসেবে দেখাও এবং তা থেকে বিরত থাকার তাওফীক দাও।",
        english: "O Allah, show us the truth as truth and grant us the ability to follow it. Show us falsehood as falsehood and grant us the ability to avoid it.",
        reference: "বায়হাকী"
      },
      {
        id: "guidance-6",
        arabic: "اللَّهُمَّ زَيِّنَّا بِزِينَةِ الإِيمَانِ وَاجْعَلْنَا هُدَاةً مُهْتَدِينَ",
        bengali: "হে আল্লাহ! আমাদেরকে ঈমানের সৌন্দর্যে সুশোভিত কর এবং আমাদেরকে হিদায়াতপ্রাপ্ত পথপ্রদর্শক বানাও।",
        english: "O Allah, beautify us with the adornment of faith and make us guides who are rightly guided.",
        reference: "নাসাঈ"
      }
    ]
  },

  // 8. Knowledge & Wisdom Duas
  {
    id: "knowledge-wisdom",
    nameEnglish: "Knowledge & Wisdom",
    nameBengali: "ইলমের দোয়া",
    icon: "GraduationCap",
    duas: [
      {
        id: "knowledge-1",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দাও।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "knowledge-2",
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا",
        bengali: "হে আল্লাহ! তুমি আমাকে যা শিখিয়েছ তা দিয়ে আমাকে উপকৃত কর, আমাকে এমন কিছু শেখাও যা আমার উপকারে আসবে এবং আমার জ্ঞান বৃদ্ধি কর।",
        english: "O Allah, benefit me with what You have taught me, teach me that which will benefit me, and increase me in knowledge.",
        reference: "তিরমিযী, ইবনে মাজাহ"
      },
      {
        id: "knowledge-3",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لاَ يَنْفَعُ",
        bengali: "হে আল্লাহ! আমি এমন জ্ঞান থেকে তোমার আশ্রয় চাই যা উপকারে আসে না।",
        english: "O Allah, I seek refuge in You from knowledge that does not benefit.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "knowledge-4",
        arabic: "اللَّهُمَّ فَقِّهْنِي فِي الدِّينِ",
        bengali: "হে আল্লাহ! আমাকে দ্বীনের গভীর জ্ঞান দান কর।",
        english: "O Allah, grant me understanding of the religion.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "knowledge-5",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي، يَفْقَهُوا قَوْلِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও, আমার কাজ সহজ করে দাও এবং আমার জিহ্বার জড়তা দূর করে দাও, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "My Lord, expand for me my breast, ease my task for me, and untie the knot from my tongue, that they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৫-২৮"
      },
      {
        id: "knowledge-6",
        arabic: "اللَّهُمَّ عَلِّمْنِي مَا جَهِلْتُ، وَذَكِّرْنِي مَا نَسِيتُ، وَافْتَحْ عَلَيَّ مِنْ فُتُوحِ الْعَارِفِينَ",
        bengali: "হে আল্লাহ! আমি যা জানি না তা শেখাও, যা ভুলে গেছি তা স্মরণ করিয়ে দাও এবং আমার জন্য জ্ঞানীদের মতো জ্ঞানের দরজা খুলে দাও।",
        english: "O Allah, teach me what I do not know, remind me of what I have forgotten, and open for me the openings of those who have knowledge.",
        reference: "আল-আযকার"
      }
    ]
  },

  // 9. Success & Ease Duas
  {
    id: "success-ease",
    nameEnglish: "Success & Ease",
    nameBengali: "সফলতার দোয়া",
    icon: "Trophy",
    duas: [
      {
        id: "success-1",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
        bengali: "হে আল্লাহ! তুমি যা সহজ কর তা ছাড়া কিছুই সহজ নয়। তুমি চাইলে কঠিন বিষয়কেও সহজ করে দাও।",
        english: "O Allah, there is nothing easy except what You make easy. And You make the difficult easy if You wish.",
        reference: "ইবনে হিব্বান"
      },
      {
        id: "success-2",
        arabic: "رَبِّ يَسِّرْ وَلاَ تُعَسِّرْ، وَتَمِّمْ بِالْخَيْرِ",
        bengali: "হে আমার রব! সহজ কর, কঠিন করো না এবং কল্যাণের সাথে সমাপ্ত কর।",
        english: "My Lord, make it easy and do not make it difficult, and complete it with goodness.",
        reference: "আল-আযকার"
      },
      {
        id: "success-3",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ التَّوْفِيقَ وَالسَّدَادَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তাওফীক ও সঠিক পথ প্রার্থনা করি।",
        english: "O Allah, I ask You for success and correct guidance.",
        reference: "তাবারানী"
      },
      {
        id: "success-4",
        arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        bengali: "হে আমাদের রব! তোমার পক্ষ থেকে আমাদের রহমত দাও এবং আমাদের কাজকে সঠিকভাবে পরিচালিত কর।",
        english: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
        reference: "সূরা কাহফ ১৮:১০"
      },
      {
        id: "success-5",
        arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
        bengali: "হে আল্লাহ! আমার জন্য যা ভালো তা নির্ধারণ কর এবং আমার জন্য তা বেছে নাও।",
        english: "O Allah, choose for me what is best and select it for me.",
        reference: "তিরমিযী"
      },
      {
        id: "success-6",
        arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي، وَأَعِذْنِي مِنْ شَرِّ نَفْسِي",
        bengali: "হে আল্লাহ! আমাকে সঠিক পথের ইলহাম দাও এবং আমার নফসের অনিষ্ট থেকে রক্ষা কর।",
        english: "O Allah, inspire me with right guidance and protect me from the evil of my soul.",
        reference: "তিরমিযী"
      }
    ]
  },

  // 10. Rizq & Wealth Duas
  {
    id: "rizq-wealth",
    nameEnglish: "Rizq & Wealth",
    nameBengali: "রিজিকের দোয়া",
    icon: "Wallet",
    duas: [
      {
        id: "rizq-1",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا، وَعِلْمًا نَافِعًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে পবিত্র রিজিক, উপকারী জ্ঞান এবং কবুলযোগ্য আমল প্রার্থনা করি।",
        english: "O Allah, I ask You for good provision, beneficial knowledge, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "rizq-2",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহ দিয়ে আমাকে তোমা ছাড়া অন্যদের থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all those besides You by Your bounty.",
        reference: "তিরমিযী"
      },
      {
        id: "rizq-3",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ، وَالْقِلَّةِ، وَالذِّلَّةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দারিদ্র্য, অভাব এবং অপমান থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from poverty, scarcity, and humiliation.",
        reference: "আবু দাউদ"
      },
      {
        id: "rizq-4",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আল্লাহ! তুমি আমাদেরকে যা রিজিক দিয়েছ তাতে বরকত দাও এবং জাহান্নামের আযাব থেকে আমাদের রক্ষা কর।",
        english: "O Allah, bless us in what You have provided us and protect us from the punishment of the Fire.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "rizq-5",
        arabic: "اللَّهُمَّ أَوْسِعْ لِي فِي رِزْقِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي",
        bengali: "হে আল্লাহ! আমার রিজিক প্রশস্ত কর এবং তুমি আমাকে যা দিয়েছ তাতে বরকত দাও।",
        english: "O Allah, expand my provision and bless me in what You have given me.",
        reference: "তাবারানী"
      },
      {
        id: "rizq-6",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        bengali: "হে আমার রব! তুমি আমার প্রতি যে কল্যাণ নাযিল করবে আমি তার মুখাপেক্ষী।",
        english: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
        reference: "সূরা কাসাস ২৮:২৪"
      }
    ]
  },

  // ============ PHASE 3: Health, Family & Emotional Duas (5 Categories) ============

  // 11. Health & Healing Duas
  {
    id: "health-healing",
    nameEnglish: "Health & Healing",
    nameBengali: "সুস্থতার দোয়া",
    icon: "Heart",
    duas: [
      {
        id: "health-1",
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
        bengali: "হে আল্লাহ! মানুষের রব! কষ্ট দূর কর, সুস্থতা দান কর। তুমিই সুস্থতা দানকারী। তোমার সুস্থতা ছাড়া কোন সুস্থতা নেই। এমন সুস্থতা দাও যা কোন রোগ রেখে যায় না।",
        english: "O Allah, Lord of mankind, remove the hardship. Cure, for You are the Healer. There is no cure except Your cure, a cure that leaves no illness.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "health-2",
        arabic: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        bengali: "আমি মহান আল্লাহর কাছে প্রার্থনা করি, যিনি মহান আরশের রব, তিনি যেন তোমাকে সুস্থ করে দেন। (৭ বার পড়ুন)",
        english: "I ask Allah, the Mighty, the Lord of the Mighty Throne, to cure you. (Recite 7 times)",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "health-3",
        arabic: "بِسْمِ اللهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللهُ يَشْفِيكَ، بِسْمِ اللهِ أَرْقِيكَ",
        bengali: "আল্লাহর নামে তোমাকে ঝাড়ফুঁক করছি, প্রতিটি কষ্টদায়ক বিষয় থেকে, প্রতিটি হিংসুক আত্মা বা বদনজর থেকে। আল্লাহ তোমাকে সুস্থ করুন, আল্লাহর নামে তোমাকে ঝাড়ফুঁক করছি।",
        english: "In the name of Allah I perform ruqyah for you, from everything that is harming you, from the evil of every soul or envious eye. May Allah cure you, in the name of Allah I perform ruqyah for you.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-4",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
        bengali: "হে আল্লাহ! আমার শরীরে সুস্থতা দাও। হে আল্লাহ! আমার শ্রবণশক্তিতে সুস্থতা দাও। হে আল্লাহ! আমার দৃষ্টিশক্তিতে সুস্থতা দাও।",
        english: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.",
        reference: "আবু দাউদ"
      },
      {
        id: "health-5",
        arabic: "أَعُوذُ بِعِزَّةِ اللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        bengali: "আমি আল্লাহর ইজ্জত ও কুদরতের আশ্রয় নিচ্ছি আমার অনুভূত ও আশঙ্কিত অনিষ্ট থেকে। (৭ বার পড়ুন)",
        english: "I seek refuge in the might of Allah and His power from the evil of what I feel and fear. (Recite 7 times)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-6",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দুনিয়া ও আখিরাতে সুস্থতা প্রার্থনা করি।",
        english: "O Allah, I ask You for well-being in this world and the Hereafter.",
        reference: "ইবনে মাজাহ"
      }
    ]
  },

  // 12. Stress, Anxiety & Sadness Duas
  {
    id: "stress-anxiety",
    nameEnglish: "Stress, Anxiety & Sadness",
    nameBengali: "দুশ্চিন্তার দোয়া",
    icon: "Brain",
    duas: [
      {
        id: "stress-1",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللهُ رَبُّ السَّمَوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি মহান, সহনশীল। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি মহান আরশের রব। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি আসমানসমূহের রব, জমিনের রব এবং সম্মানিত আরশের রব।",
        english: "There is no deity except Allah, the Magnificent, the Forbearing. There is no deity except Allah, Lord of the Mighty Throne. There is no deity except Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "stress-2",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        bengali: "হে আল্লাহ! আমি তোমার আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অক্ষমতা ও অলসতা থেকে, কাপুরুষতা ও কৃপণতা থেকে এবং ঋণের বোঝা ও মানুষের দমন থেকে।",
        english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "stress-3",
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لاَ إِلَهَ إِلاَّ أَنْتَ",
        bengali: "হে আল্লাহ! আমি তোমার রহমতের আশা করি। এক পলকের জন্যও আমাকে আমার নিজের উপর ছেড়ে দিও না এবং আমার সব বিষয় ঠিক করে দাও। তুমি ছাড়া কোন ইলাহ নেই।",
        english: "O Allah, I hope for Your mercy. Do not leave me to myself even for the blink of an eye. Correct all of my affairs for me. There is no deity except You.",
        reference: "আবু দাউদ"
      },
      {
        id: "stress-4",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help.",
        reference: "তিরমিযী"
      },
      {
        id: "stress-5",
        arabic: "حَسْبِيَ اللهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        bengali: "আল্লাহই আমার জন্য যথেষ্ট, তিনি ছাড়া কোন ইলাহ নেই। তাঁর উপরই আমি ভরসা করি এবং তিনি মহান আরশের রব। (৭ বার পড়ুন)",
        english: "Allah is sufficient for me. There is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne. (Recite 7 times)",
        reference: "আবু দাউদ"
      },
      {
        id: "stress-6",
        arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ",
        bengali: "হে আল্লাহ! আমি তোমার বান্দা, তোমার বান্দার সন্তান, তোমার বান্দির সন্তান। আমার কপাল তোমার হাতে, তোমার নির্দেশ আমার উপর কার্যকর, তোমার ফায়সালা আমার জন্য ন্যায়সঙ্গত।",
        english: "O Allah, I am Your slave, son of Your male slave, son of Your female slave. My forelock is in Your Hand. Your command concerning me prevails, and Your judgment concerning me is just.",
        reference: "মুসনাদ আহমাদ"
      }
    ]
  },

  // 13. Family & Relationships Duas
  {
    id: "family-relationships",
    nameEnglish: "Family & Relationships",
    nameBengali: "পরিবারের দোয়া",
    icon: "Users",
    duas: [
      {
        id: "family-1",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "family-2",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর, আমার পিতা-মাতাকে ক্ষমা কর, যারা মুমিন হয়ে আমার ঘরে প্রবেশ করে তাদের ক্ষমা কর এবং সকল মুমিন পুরুষ ও মুমিন নারীদের ক্ষমা কর।",
        english: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.",
        reference: "সূরা নূহ ৭১:২৮"
      },
      {
        id: "family-3",
        arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        bengali: "হে আমার রব! তাদের প্রতি রহম কর, যেমন তারা আমাকে শৈশবে লালন-পালন করেছেন।",
        english: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "সূরা ইসরা ১৭:২৪"
      },
      {
        id: "family-4",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلاَمِ",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর, আমাদের মধ্যকার সম্পর্ক ঠিক করে দাও এবং আমাদের শান্তির পথ দেখাও।",
        english: "O Allah, bring our hearts together, reconcile between us, and guide us to the ways of peace.",
        reference: "আবু দাউদ"
      },
      {
        id: "family-5",
        arabic: "اللَّهُمَّ بَارِكْ لَهُ، وَبَارِكْ عَلَيْهِ",
        bengali: "হে আল্লাহ! তার জন্য বরকত দাও এবং তার উপর বরকত দাও।",
        english: "O Allah, bless him and send blessings upon him.",
        reference: "নাসাঈ"
      },
      {
        id: "family-6",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
        bengali: "হে আমার রব! আমাকে সামর্থ্য দাও যেন আমি তোমার সেই নিয়ামতের শুকরিয়া আদায় করি যা তুমি আমাকে ও আমার পিতা-মাতাকে দান করেছ এবং আমি যেন এমন সৎকর্ম করি যা তুমি পছন্দ কর এবং আমার সন্তানদের মধ্যে আমার জন্য সংশোধন করে দাও।",
        english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And make righteous for me my offspring.",
        reference: "সূরা আহকাফ ৪৬:১৫"
      }
    ]
  },

  // 14. Marriage & Spouse Duas
  {
    id: "marriage-spouse",
    nameEnglish: "Marriage & Spouse",
    nameBengali: "বিবাহের দোয়া",
    icon: "HeartHandshake",
    duas: [
      {
        id: "marriage-1",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ زَوْجَةً صَالِحَةً تُعِينُنِي عَلَى أَمْرِ دُنْيَايَ وَآخِرَتِي",
        bengali: "হে আল্লাহ! আমি তোমার কাছে একজন নেক স্ত্রী/স্বামী প্রার্থনা করি যে আমার দুনিয়া ও আখিরাতের বিষয়ে আমাকে সাহায্য করবে।",
        english: "O Allah, I ask You for a righteous spouse who will help me in the matters of my worldly life and Hereafter.",
        reference: "আল-আযকার"
      },
      {
        id: "marriage-2",
        arabic: "بَارَكَ اللهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        bengali: "আল্লাহ তোমার জন্য বরকত দিন, তোমার উপর বরকত দিন এবং তোমাদের উভয়কে কল্যাণের মধ্যে একত্রিত করুন।",
        english: "May Allah bless you, and shower His blessings upon you, and join you both in goodness.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "marriage-3",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِهِمَا كَمَا أَلَّفْتَ بَيْنَ قُلُوبِ آدَمَ وَحَوَّاءَ",
        bengali: "হে আল্লাহ! তাদের অন্তরে ভালোবাসা সৃষ্টি কর যেমন তুমি আদম ও হাওয়ার অন্তরে ভালোবাসা সৃষ্টি করেছিলে।",
        english: "O Allah, create love between their hearts as You created love between the hearts of Adam and Hawwa (Eve).",
        reference: "আল-আযকার"
      },
      {
        id: "marriage-4",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তার কল্যাণ চাই এবং তাকে যে স্বভাবে সৃষ্টি করেছ তার কল্যাণ চাই। আমি তার অনিষ্ট থেকে এবং তাকে যে স্বভাবে সৃষ্টি করেছ তার অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for her goodness and the goodness You have created in her, and I seek refuge in You from her evil and the evil You have created in her.",
        reference: "আবু দাউদ"
      },
      {
        id: "marriage-5",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        bengali: "হে আমাদের রব! আমাদের স্ত্রী/স্বামী ও সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর।",
        english: "Our Lord, grant us from among our spouses and offspring comfort to our eyes.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "marriage-6",
        arabic: "اللَّهُمَّ ارْزُقْنِي زَوْجًا صَالِحًا يُعِينُنِي عَلَى طَاعَتِكَ",
        bengali: "হে আল্লাহ! আমাকে একজন নেক জীবনসঙ্গী দান কর যে তোমার আনুগত্যে আমাকে সাহায্য করবে।",
        english: "O Allah, grant me a righteous spouse who will help me in obeying You.",
        reference: "আল-আযকার"
      }
    ]
  },

  // 15. Children Duas
  {
    id: "children-duas",
    nameEnglish: "Children Duas",
    nameBengali: "সন্তানের দোয়া",
    icon: "Baby",
    duas: [
      {
        id: "children-1",
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
        bengali: "হে আমার রব! তোমার পক্ষ থেকে আমাকে পবিত্র সন্তান দান কর। নিশ্চয়ই তুমি দোয়া শ্রবণকারী।",
        english: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.",
        reference: "সূরা আলে ইমরান ৩:৩৮"
      },
      {
        id: "children-2",
        arabic: "رَبِّ لاَ تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
        bengali: "হে আমার রব! আমাকে একা রেখো না, তুমি তো সর্বোত্তম উত্তরাধিকারী।",
        english: "My Lord, do not leave me alone, and You are the best of inheritors.",
        reference: "সূরা আম্বিয়া ২১:৮৯"
      },
      {
        id: "children-3",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        bengali: "হে আমার রব! আমাকে সালাত কায়েমকারী বানাও এবং আমার বংশধরদেরকেও। হে আমাদের রব! আমার দোয়া কবুল কর।",
        english: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "children-4",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
        bengali: "হে আমার রব! আমাকে সামর্থ্য দাও যেন আমি তোমার নিয়ামতের শুকরিয়া আদায় করি এবং এমন সৎকর্ম করি যা তুমি পছন্দ কর এবং আমার সন্তানদের মধ্যে আমার জন্য সংশোধন করে দাও।",
        english: "My Lord, enable me to be grateful for Your favor and to do righteousness of which You approve. And make righteous for me my offspring.",
        reference: "সূরা আহকাফ ৪৬:১৫"
      },
      {
        id: "children-5",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রী ও সন্তানদের থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "children-6",
        arabic: "اللَّهُمَّ أَعِذْهُ بِكَلِمَاتِكَ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لاَمَّةٍ",
        bengali: "হে আল্লাহ! আমি তোমার পরিপূর্ণ বাণীসমূহের মাধ্যমে তাকে প্রতিটি শয়তান, বিষাক্ত প্রাণী এবং প্রতিটি ক্ষতিকর বদনজর থেকে তোমার আশ্রয়ে রাখছি।",
        english: "O Allah, I seek protection for him in Your perfect words from every devil and every poisonous creature, and from every evil eye.",
        reference: "সহীহ বুখারী"
      }
    ]
  },

  // ============ PHASE 4: Travel, Akhirah & Special Occasions (5 Categories) ============

  // 16. Travel Duas
  {
    id: "travel-duas",
    nameEnglish: "Travel Duas",
    nameBengali: "সফরের দোয়া",
    icon: "Plane",
    duas: [
      {
        id: "travel-1",
        arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        bengali: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। পবিত্র সেই সত্তা যিনি একে আমাদের বশীভূত করে দিয়েছেন, অন্যথায় আমরা একে বশ করতে সক্ষম ছিলাম না। আর নিশ্চয়ই আমরা আমাদের রবের কাছে প্রত্যাবর্তনকারী।",
        english: "Allah is the greatest, Allah is the greatest, Allah is the greatest. How perfect He is, The One Who has placed this at our service, and we ourselves would not have been capable of that, and to our Lord is our final destiny.",
        reference: "সহীহ মুসলিম, তিরমিযী"
      },
      {
        id: "travel-2",
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى",
        bengali: "হে আল্লাহ! আমরা আমাদের এই সফরে তোমার কাছে নেকী ও তাকওয়া এবং এমন আমল প্রার্থনা করছি যা তুমি পছন্দ কর।",
        english: "O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-3",
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
        bengali: "হে আল্লাহ! আমাদের এই সফর আমাদের জন্য সহজ করে দাও এবং এর দূরত্ব সংক্ষেপ করে দাও।",
        english: "O Allah, make this journey easy for us and shorten its distance for us.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-4",
        arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الأَهْلِ",
        bengali: "হে আল্লাহ! তুমি সফরে আমার সাথী এবং পরিবারে আমার প্রতিনিধি।",
        english: "O Allah, You are the Companion on the journey and the Guardian of the family.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-5",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই। (নতুন জায়গায় নামার সময়)",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created. (When stopping at a new place)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-6",
        arabic: "آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ",
        bengali: "আমরা প্রত্যাবর্তনকারী, তাওবাকারী, ইবাদতকারী এবং আমাদের রবের প্রশংসাকারী। (সফর থেকে ফেরার সময়)",
        english: "We are returning, repenting, worshipping, and praising our Lord. (When returning from travel)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      }
    ]
  },

  // 17. Fear, Hardship & Trials Duas
  {
    id: "fear-hardship",
    nameEnglish: "Fear, Hardship & Trials",
    nameBengali: "বিপদের দোয়া",
    icon: "AlertTriangle",
    duas: [
      {
        id: "hardship-1",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        bengali: "নিশ্চয়ই আমরা আল্লাহর জন্য এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে। হে আল্লাহ! আমার এই বিপদে আমাকে সওয়াব দাও এবং এর বিনিময়ে আমাকে এর চেয়ে উত্তম কিছু দাও।",
        english: "Indeed we belong to Allah and to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-2",
        arabic: "حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ",
        bengali: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতই না উত্তম অভিভাবক।",
        english: "Allah is sufficient for us and He is the best Disposer of affairs.",
        reference: "সূরা আলে ইমরান ৩:১৭৩"
      },
      {
        id: "hardship-3",
        arabic: "لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
        bengali: "আল্লাহর সাহায্য ছাড়া কোন উপায় নেই এবং কোন শক্তি নেই।",
        english: "There is no power and no strength except with Allah.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "hardship-4",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلاَءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الأَعْدَاءِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই কঠিন বিপদ থেকে, দুর্ভাগ্যে পতিত হওয়া থেকে, মন্দ তাকদীর থেকে এবং শত্রুদের আনন্দ থেকে।",
        english: "O Allah, I seek refuge in You from severe trials, from falling into misfortune, from bad fate, and from the gloating of enemies.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "hardship-5",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
        bengali: "হে আল্লাহ! তুমি যা সহজ কর তা ছাড়া কিছুই সহজ নয়। তুমি চাইলে কঠিন বিষয়কেও সহজ করে দাও।",
        english: "O Allah, there is nothing easy except what You make easy. And You make the difficult easy if You wish.",
        reference: "ইবনে হিব্বান"
      },
      {
        id: "hardship-6",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি। আমার সব বিষয় ঠিক করে দাও এবং এক পলকের জন্যও আমাকে আমার উপর ছেড়ে দিও না।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Correct all of my affairs for me and do not leave me to myself even for the blink of an eye.",
        reference: "মুসতাদরাক হাকিম"
      }
    ]
  },

  // 18. Hereafter & Akhirah Duas
  {
    id: "akhirah-duas",
    nameEnglish: "Hereafter & Akhirah",
    nameBengali: "আখিরাতের দোয়া",
    icon: "Sunrise",
    duas: [
      {
        id: "akhirah-1",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং আমাদেরকে জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "akhirah-2",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে জান্নাত প্রার্থনা করি এবং জাহান্নাম থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for Paradise and I seek refuge in You from the Fire.",
        reference: "আবু দাউদ"
      },
      {
        id: "akhirah-3",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        bengali: "হে আল্লাহ! আমাকে জাহান্নাম থেকে রক্ষা কর। (৭ বার পড়ুন)",
        english: "O Allah, save me from the Fire. (Recite 7 times)",
        reference: "আবু দাউদ"
      },
      {
        id: "akhirah-4",
        arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
        bengali: "হে আমাদের রব! জাহান্নামের আযাব আমাদের থেকে দূরে রাখ। নিশ্চয়ই এর আযাব অবিচ্ছেদ্য।",
        english: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.",
        reference: "সূরা ফুরকান ২৫:৬৫"
      },
      {
        id: "akhirah-5",
        arabic: "اللَّهُمَّ حَاسِبْنِي حِسَابًا يَسِيرًا",
        bengali: "হে আল্লাহ! আমার হিসাব সহজ করে দাও।",
        english: "O Allah, make my reckoning easy.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "akhirah-6",
        arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "হে আমাদের রব! আমাদের জন্য আমাদের নূর পূর্ণ করে দাও এবং আমাদের ক্ষমা কর। নিশ্চয়ই তুমি সবকিছুর উপর সক্ষম।",
        english: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.",
        reference: "সূরা তাহরীম ৬৬:৮"
      }
    ]
  },

  // 19. Death & Funeral Duas
  {
    id: "death-funeral",
    nameEnglish: "Death & Funeral",
    nameBengali: "মৃত্যু ও জানাজা",
    icon: "Moon",
    duas: [
      {
        id: "death-1",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        bengali: "হে আল্লাহ! তাকে ক্ষমা কর ও রহম কর। তাকে নিরাপদ রাখ ও মাফ কর। তার আতিথেয়তা সম্মানজনক কর, তার প্রবেশস্থান প্রশস্ত কর এবং তাকে পানি, বরফ ও শিশির দিয়ে ধৌত কর।",
        english: "O Allah, forgive him and have mercy on him. Keep him safe and pardon him. Honor his reception and make his entrance spacious. Wash him with water, snow and ice.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-2",
        arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا",
        bengali: "হে আল্লাহ! আমাদের জীবিত ও মৃত, উপস্থিত ও অনুপস্থিত, ছোট ও বড় এবং পুরুষ ও নারী সকলকে ক্ষমা কর।",
        english: "O Allah, forgive our living and our dead, those present and those absent, our young and our old, our males and our females.",
        reference: "ইবনে মাজাহ, আবু দাউদ"
      },
      {
        id: "death-3",
        arabic: "اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلاَمِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ",
        bengali: "হে আল্লাহ! আমাদের মধ্যে যাকে তুমি জীবিত রাখ তাকে ইসলামের উপর জীবিত রাখ এবং যাকে মৃত্যু দাও তাকে ঈমানের উপর মৃত্যু দাও।",
        english: "O Allah, whoever You keep alive from among us, let him live upon Islam, and whoever You cause to die, let him die upon faith.",
        reference: "ইবনে মাজাহ, আবু দাউদ"
      },
      {
        id: "death-4",
        arabic: "اللَّهُمَّ لاَ تَحْرِمْنَا أَجْرَهُ، وَلاَ تَفْتِنَّا بَعْدَهُ",
        bengali: "হে আল্লাহ! আমাদেরকে তার সওয়াব থেকে বঞ্চিত করো না এবং তার পরে আমাদেরকে ফিতনায় ফেলো না।",
        english: "O Allah, do not deprive us of his reward and do not put us in trial after him.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-5",
        arabic: "اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ",
        bengali: "হে আল্লাহ! তার ঘরের বদলে তাকে উত্তম ঘর দাও, তার পরিবারের বদলে উত্তম পরিবার দাও এবং তাকে জান্নাতে প্রবেশ করাও।",
        english: "O Allah, replace his home with a better home, and his family with a better family, and admit him to Paradise.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-6",
        arabic: "اللَّهُمَّ إِنَّ فُلاَنَ بْنَ فُلاَنٍ فِي ذِمَّتِكَ وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ",
        bengali: "হে আল্লাহ! অমুকের সন্তান অমুক তোমার জিম্মায় ও তোমার প্রতিবেশিত্বের রশিতে। তাকে কবরের ফিতনা ও জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "O Allah, so-and-so son of so-and-so is in Your protection and covenant. Protect him from the trial of the grave and the punishment of the Fire.",
        reference: "ইবনে মাজাহ, আবু দাউদ"
      }
    ]
  },

  // 20. Special Occasions Duas
  {
    id: "special-occasions",
    nameEnglish: "Special Occasions",
    nameBengali: "বিশেষ উপলক্ষ",
    icon: "Star",
    duas: [
      {
        id: "special-1",
        arabic: "تَقَبَّلَ اللهُ مِنَّا وَمِنْكُمْ",
        bengali: "আল্লাহ আমাদের ও আপনাদের থেকে কবুল করুন। (ঈদের দিনে)",
        english: "May Allah accept from us and from you. (On Eid day)",
        reference: "ফাতহুল বারী"
      },
      {
        id: "special-2",
        arabic: "اللَّهُمَّ بَارِكْ لَهُ فِيمَا رَزَقْتَهُ، وَتُبْ عَلَيْهِ، وَأَطِلْ عُمُرَهُ فِي طَاعَتِكَ",
        bengali: "হে আল্লাহ! তুমি তাকে যা দিয়েছ তাতে বরকত দাও, তার তাওবা কবুল কর এবং তোমার আনুগত্যে তার আয়ু দীর্ঘ কর। (জন্মদিনে)",
        english: "O Allah, bless him in what You have provided him, accept his repentance, and lengthen his life in Your obedience. (On birthday)",
        reference: "আল-আযকার"
      },
      {
        id: "special-3",
        arabic: "بَارَكَ اللهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
        bengali: "আল্লাহ তোমাকে যা দান করেছেন তাতে বরকত দিন। তুমি দাতার শুকরিয়া আদায় কর। সে যেন পূর্ণ বয়সে পৌঁছে এবং তুমি তার সেবা পাও। (নবজাতকের জন্য)",
        english: "May Allah bless you in what He has given you. May you give thanks to the Giver. May he reach maturity and may you be granted his righteousness. (For newborn)",
        reference: "নাসাঈ"
      },
      {
        id: "special-4",
        arabic: "اللَّهُمَّ اجْعَلْهُ يَوْمَ خَيْرٍ وَبَرَكَةٍ",
        bengali: "হে আল্লাহ! এই দিনকে কল্যাণ ও বরকতের দিন বানাও। (নতুন বছর/রমজান শুরু)",
        english: "O Allah, make this a day of goodness and blessings. (New year/Ramadan start)",
        reference: "আল-আযকার"
      },
      {
        id: "special-5",
        arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالإِيمَانِ، وَالسَّلاَمَةِ وَالإِسْلاَمِ، رَبِّي وَرَبُّكَ اللهُ",
        bengali: "হে আল্লাহ! এই চাঁদকে আমাদের উপর নিরাপত্তা, ঈমান, শান্তি ও ইসলামের সাথে উদিত কর। আমার ও তোমার রব আল্লাহ। (নতুন চাঁদ দেখলে)",
        english: "O Allah, let this moon appear on us with security, faith, safety and Islam. My Lord and your Lord is Allah. (Upon sighting the new moon)",
        reference: "তিরমিযী"
      },
      {
        id: "special-6",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        bengali: "হে আল্লাহ! উপকারী বৃষ্টি বর্ষণ কর। (বৃষ্টির সময়)",
        english: "O Allah, may it be a beneficial rain. (During rain)",
        reference: "সহীহ বুখারী"
      }
    ]
  }
];

export const getDuaCategory = (categoryId: string): DuaCategory | undefined => {
  return duaCategories.find(category => category.id === categoryId);
};
