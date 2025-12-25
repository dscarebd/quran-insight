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
        titleBengali: "জ্ঞান বৃদ্ধির দোয়া",
        titleEnglish: "For Increasing Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব, আমার জ্ঞান বৃদ্ধি করে দিন।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা তা-হা ২০:১১৪"
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
      },
      {
        id: "daily-7",
        titleBengali: "টয়লেটে প্রবেশের দোয়া",
        titleEnglish: "When Entering Toilet",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে পুরুষ ও মহিলা জিন-শয়তান থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the male and female evil beings (devils).",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "daily-8",
        titleBengali: "টয়লেট থেকে বের হওয়ার দোয়া",
        titleEnglish: "When Leaving Toilet",
        arabic: "غُفْرَانَكَ",
        bengali: "হে আল্লাহ! আমি তোমার ক্ষমা চাই।",
        english: "I seek Your forgiveness.",
        reference: "আবু দাউদ, তিরমিযী, ইবনে মাজাহ"
      },
      {
        id: "daily-9",
        titleBengali: "খাওয়ার আগে দোয়া",
        titleEnglish: "Before Eating",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আল্লাহ, আমাদেরকে যা রিযিক দিয়েছেন তাতে বরকত দিন এবং জাহান্নামের আগুন থেকে রক্ষা করুন।",
        english: "O Allah, bless us in what You have provided us and protect us from the punishment of the Fire.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "daily-10",
        titleBengali: "নতুন কাপড় পরার দোয়া",
        titleEnglish: "When Wearing New Clothes",
        arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
        bengali: "হে আল্লাহ! তোমার জন্য সকল প্রশংসা। তুমি আমাকে এটি পরিয়েছ। আমি তোমার কাছে এর কল্যাণ এবং যে উদ্দেশ্যে এটি তৈরি হয়েছে তার কল্যাণ চাই। আমি তোমার কাছে এর অনিষ্ট এবং যে উদ্দেশ্যে এটি তৈরি হয়েছে তার অনিষ্ট থেকে আশ্রয় চাই।",
        english: "O Allah, praise is to You. You have clothed me with it. I ask You for its good and the good of what it was made for, and I seek refuge in You from its evil and the evil of what it was made for.",
        reference: "আবু দাউদ, তিরমিযী"
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
      },
      {
        id: "adhkar-9",
        titleBengali: "বদ নযর থেকে সুরক্ষা",
        titleEnglish: "Protection from Evil Eye",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে প্রত্যেক শয়তান ও বিষাক্ত প্রাণী থেকে এবং প্রত্যেক ক্ষতিকর চোখ (বদ নযর) থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from every devil, poisonous creature, and every evil eye.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "adhkar-10",
        titleBengali: "ঈমানের সাথে দিন শুরু",
        titleEnglish: "Starting Day with Faith",
        arabic: "أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
        bengali: "আমরা ইসলামের স্বভাবের উপর সকালে উপনীত হলাম, ইখলাসের কালিমার উপর, আমাদের নবী মুহাম্মদ (সা.) এর দ্বীনের উপর এবং আমাদের পিতা ইবরাহীম (আ.) এর মিল্লাতের উপর যিনি ছিলেন একনিষ্ঠ মুসলিম এবং মুশরিকদের অন্তর্ভুক্ত ছিলেন না।",
        english: "We have reached the morning upon the natural way of Islam, upon the word of sincerity, upon the religion of our Prophet Muhammad (ﷺ), and upon the way of our father Ibrahim who was a Muslim and was not of the polytheists.",
        reference: "মুসনাদে আহমাদ"
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
      },
      {
        id: "forgive-7",
        titleBengali: "ইউনুস (আ.) এর দোয়া",
        titleEnglish: "Dua of Prophet Yunus",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        bengali: "তুমি ছাড়া কোন ইলাহ নেই, তুমি পবিত্র। নিশ্চয়ই আমি যালিমদের অন্তর্ভুক্ত ছিলাম।",
        english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "সূরা আম্বিয়া ২১:৮৭"
      },
      {
        id: "forgive-8",
        titleBengali: "১০০ বার ইসতিগফার",
        titleEnglish: "100 Times Istighfar",
        arabic: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তাওবা করি। (প্রতিদিন ১০০ বার পড়ুন)",
        english: "I seek forgiveness from Allah and repent to Him. (Recite 100 times daily)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "forgive-9",
        titleBengali: "গোপন গুনাহের জন্য",
        titleEnglish: "For Hidden Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي",
        bengali: "হে আল্লাহ! আমার ভুল, অজ্ঞতা, কাজে সীমালঙ্ঘন এবং যা তুমি আমার চেয়ে ভালো জানো সেসব ক্ষমা কর।",
        english: "O Allah, forgive my sins, my ignorance, my excess in my affairs, and what You know better than me about myself.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "forgive-10",
        titleBengali: "রাতে ক্ষমা প্রার্থনা",
        titleEnglish: "Night Forgiveness Prayer",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        bengali: "হে আল্লাহ! নিশ্চয়ই তুমি ক্ষমাশীল, ক্ষমা করতে ভালোবাস, অতএব আমাকে ক্ষমা কর।",
        english: "O Allah, You are the Pardoner, You love to pardon, so pardon me.",
        reference: "তিরমিযী (লাইলাতুল কদরের দোয়া)"
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
      },
      {
        id: "protect-7",
        titleBengali: "হিংসা থেকে সুরক্ষা",
        titleEnglish: "Protection from Jealousy",
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        bengali: "বল, আমি আশ্রয় চাই প্রভাতের রবের, তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে, আঁধার রাতের অনিষ্ট থেকে যখন তা গভীর হয়, গিরায় ফুঁক দানকারিণীদের অনিষ্ট থেকে এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে।",
        english: "Say: I seek refuge in the Lord of daybreak, from the evil of that which He created, from the evil of darkness when it settles, from the evil of those who blow on knots, and from the evil of an envier when he envies.",
        reference: "সূরা ফালাক ১১৩:১-৫"
      },
      {
        id: "protect-8",
        titleBengali: "বিপদ-আপদ থেকে রক্ষা",
        titleEnglish: "Protection from Calamities",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই কঠিন বিপদ থেকে, দুর্ভাগ্যের শিকার হওয়া থেকে, মন্দ তাকদীর থেকে এবং শত্রুদের উপহাস থেকে।",
        english: "O Allah, I seek refuge in You from severe calamity, from misery, from bad fate, and from the mockery of enemies.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "protect-9",
        titleBengali: "রাতের সুরক্ষা দোয়া",
        titleEnglish: "Nighttime Protection",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে আশ্রয় চাই তাঁর ক্রোধ ও শাস্তি থেকে, তাঁর বান্দাদের অনিষ্ট থেকে এবং শয়তানদের প্ররোচনা ও তাদের উপস্থিতি থেকে।",
        english: "I seek refuge in the perfect words of Allah from His anger and punishment, from the evil of His servants, and from the whispers of the devils and their presence.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "protect-10",
        titleBengali: "জিন-শয়তান থেকে রক্ষা",
        titleEnglish: "Protection from Jinn & Devils",
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ",
        bengali: "বল, আমি আশ্রয় চাই মানুষের রবের, মানুষের অধিপতির, মানুষের ইলাহের, কুমন্ত্রণাদাতা আত্মগোপনকারীর অনিষ্ট থেকে, যে মানুষের অন্তরে কুমন্ত্রণা দেয়, জিন ও মানুষের মধ্য থেকে।",
        english: "Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the breasts of mankind, from among the jinn and mankind.",
        reference: "সূরা নাস ১১৪:১-৬"
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
        titleBengali: "দুনিয়া ও আখিরাতের কল্যাণ",
        titleEnglish: "Good in This World & Hereafter",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং আমাদেরকে জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "quran-2",
        titleBengali: "ভুল ও সীমালঙ্ঘন থেকে ক্ষমা",
        titleEnglish: "Forgiveness for Mistakes",
        arabic: "رَبَّنَا لاَ تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا، رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا، رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَاقَةَ لَنَا بِهِ، وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا، أَنتَ مَوْلاَنَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        bengali: "হে আমাদের রব! আমরা যদি ভুলে যাই অথবা ভুল করি তাহলে আমাদের পাকড়াও করো না। হে আমাদের রব! আমাদের পূর্ববর্তীদের উপর যেমন বোঝা চাপিয়েছিলে আমাদের উপর তেমন বোঝা চাপিও না। হে আমাদের রব! আমাদের সামর্থ্যের বাইরে কিছু আমাদের উপর চাপিও না। আমাদের মাফ কর, আমাদের ক্ষমা কর এবং আমাদের প্রতি দয়া কর। তুমিই আমাদের অভিভাবক। অতএব, কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।",
        english: "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.",
        reference: "সূরা বাকারা ২:২৮৬"
      },
      {
        id: "quran-3",
        titleBengali: "মূসা (আ.) এর কাজ সহজ করার দোয়া",
        titleEnglish: "Dua of Musa for Ease",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي، يَفْقَهُوا قَوْلِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও, আমার কাজ সহজ করে দাও এবং আমার জিহ্বার জড়তা দূর করে দাও, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "My Lord, expand for me my breast, ease my task for me, and untie the knot from my tongue, that they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৫-২৮"
      },
      {
        id: "quran-4",
        titleBengali: "জ্ঞান বৃদ্ধির দোয়া",
        titleEnglish: "Increase in Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দাও।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "quran-5",
        titleBengali: "সন্তান ও পরিবারের জন্য দোয়া",
        titleEnglish: "For Spouse & Children",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "quran-6",
        titleBengali: "ধৈর্য ও বিজয়ের দোয়া",
        titleEnglish: "For Patience & Victory",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        bengali: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দাও, আমাদের পা স্থির রাখ এবং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।",
        english: "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
        reference: "সূরা বাকারা ২:২৫০"
      },
      {
        id: "quran-7",
        titleBengali: "অন্তরের স্থিরতার দোয়া",
        titleEnglish: "Steadfastness of Heart",
        arabic: "رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
        bengali: "হে আমাদের রব! হিদায়াত দেওয়ার পর আমাদের অন্তরকে বক্র করো না এবং তোমার পক্ষ থেকে আমাদেরকে রহমত দান কর। নিশ্চয়ই তুমি মহাদাতা।",
        english: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "quran-8",
        titleBengali: "ক্ষমা ও সাহায্যের দোয়া",
        titleEnglish: "Forgiveness & Help",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        bengali: "হে আমাদের রব! আমাদের গুনাহ ক্ষমা কর এবং আমাদের কাজে যে সীমালঙ্ঘন হয়েছে তা মাফ কর, আমাদের পা স্থির রাখ এবং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।",
        english: "Our Lord, forgive us our sins and the excess in our affairs and plant firmly our feet and give us victory over the disbelieving people.",
        reference: "সূরা আলে ইমরান ৩:১৪৭"
      },
      {
        id: "quran-9",
        titleBengali: "সুলাইমান (আ.) এর শুকরিয়ার দোয়া",
        titleEnglish: "Dua of Sulaiman for Gratitude",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
        bengali: "হে আমার রব! আমাকে সামর্থ্য দাও যেন আমি তোমার নিয়ামতের শুকরিয়া আদায় করতে পারি যা তুমি আমাকে ও আমার পিতা-মাতাকে দান করেছ এবং যেন আমি এমন সৎকর্ম করতে পারি যা তুমি পছন্দ কর। আর তোমার রহমতে আমাকে তোমার সৎকর্মপরায়ণ বান্দাদের অন্তর্ভুক্ত কর।",
        english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants.",
        reference: "সূরা নামল ২৭:১৯"
      },
      {
        id: "quran-10",
        titleBengali: "ইবরাহীম (আ.) এর হিদায়াতের দোয়া",
        titleEnglish: "Dua of Ibrahim for Guidance",
        arabic: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
        bengali: "হে আমাদের রব! আমাদের উভয়কে তোমার অনুগত কর এবং আমাদের বংশধরদের মধ্যে থেকেও তোমার অনুগত একটি উম্মত তৈরি কর। আমাদেরকে ইবাদতের নিয়ম-কানুন শিখাও এবং আমাদের তাওবা কবুল কর। নিশ্চয়ই তুমি তাওবা কবুলকারী, অতি দয়ালু।",
        english: "Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You. And show us our rites and accept our repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
        reference: "সূরা বাকারা ২:১২৮"
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
        titleBengali: "হিদায়াত ও তাকওয়ার দোয়া",
        titleEnglish: "For Guidance & Piety",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        bengali: "হে আল্লাহ! আমি তোমার কাছে হিদায়াত, তাকওয়া, পবিত্রতা এবং অভাবমুক্তি প্রার্থনা করি।",
        english: "O Allah, I ask You for guidance, piety, chastity and self-sufficiency.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "sunnah-2",
        titleBengali: "উপকারী জ্ঞানের দোয়া",
        titleEnglish: "For Beneficial Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল প্রার্থনা করি।",
        english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "sunnah-3",
        titleBengali: "দ্বীন-দুনিয়া-আখিরাত সংশোধন",
        titleEnglish: "For Rectifying All Affairs",
        arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
        bengali: "হে আল্লাহ! আমার দ্বীনকে সংশোধন করে দাও যা আমার সকল বিষয়ের রক্ষাকবচ। আমার দুনিয়াকে সংশোধন করে দাও যেখানে আমার জীবিকা। আমার আখিরাতকে সংশোধন করে দাও যেখানে আমার প্রত্যাবর্তন।",
        english: "O Allah, set right for me my religion which is the safeguard of my affairs. Set right for me my worldly life wherein is my livelihood. Set right for me my Hereafter which is my return.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "sunnah-4",
        titleBengali: "নিয়ামত রক্ষার দোয়া",
        titleEnglish: "Protection of Blessings",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيعِ سَخَطِكَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই তোমার নিয়ামত চলে যাওয়া থেকে, তোমার দেওয়া সুস্থতা বদলে যাওয়া থেকে, আকস্মিক আযাব থেকে এবং তোমার সকল অসন্তুষ্টি থেকে।",
        english: "O Allah, I seek refuge in You from the removal of Your blessings, the change of Your protection, Your sudden punishment, and all of Your displeasure.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "sunnah-5",
        titleBengali: "যিকর-শুকর-ইবাদতের দোয়া",
        titleEnglish: "For Remembrance & Worship",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        bengali: "হে আল্লাহ! তোমার যিকর, শুকর এবং সুন্দরভাবে তোমার ইবাদত করতে আমাকে সাহায্য কর।",
        english: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        reference: "আবু দাউদ, নাসাঈ"
      },
      {
        id: "sunnah-6",
        titleBengali: "সকল কল্যাণের দোয়া",
        titleEnglish: "For All Goodness",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে সকল কল্যাণ প্রার্থনা করি, এখনকার এবং পরবর্তীর, যা আমি জানি এবং যা জানি না।",
        english: "O Allah, I ask You for all good, immediate and later, that which I know and that which I do not know.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "sunnah-7",
        titleBengali: "আয়নায় দেখার দোয়া",
        titleEnglish: "When Looking in Mirror",
        arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
        bengali: "হে আল্লাহ! তুমি আমার আকৃতি সুন্দর করেছ, আমার চরিত্রও সুন্দর করে দাও।",
        english: "O Allah, You have made my appearance beautiful, so make my character beautiful too.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "sunnah-8",
        titleBengali: "পছন্দনীয় কিছু দেখলে",
        titleEnglish: "When Seeing Something Liked",
        arabic: "اللَّهُمَّ بَارِكْ فِيهِ",
        bengali: "হে আল্লাহ! এতে বরকত দাও।",
        english: "O Allah, bless it.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "sunnah-9",
        titleBengali: "রাগের সময় দোয়া",
        titleEnglish: "When Angry",
        arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই।",
        english: "I seek refuge in Allah from the accursed Satan.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "sunnah-10",
        titleBengali: "সুসংবাদ পেলে",
        titleEnglish: "When Receiving Good News",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য যাঁর অনুগ্রহে সকল ভালো কাজ সম্পন্ন হয়।",
        english: "All praise is for Allah by whose grace all good things are completed.",
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
        titleBengali: "সরল পথের দোয়া",
        titleEnglish: "The Straight Path",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        bengali: "আমাদেরকে সরল পথ দেখাও।",
        english: "Guide us to the straight path.",
        reference: "সূরা ফাতিহা ১:৬"
      },
      {
        id: "guidance-2",
        titleBengali: "হিদায়াত ও সঠিক পথ",
        titleEnglish: "Guidance & Right Direction",
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        bengali: "হে আল্লাহ! আমাকে হিদায়াত দাও এবং সঠিক পথে পরিচালিত কর।",
        english: "O Allah, guide me and keep me on the right path.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "guidance-3",
        titleBengali: "অন্তর স্থির রাখার দোয়া",
        titleEnglish: "Steadfast Heart on Deen",
        arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        bengali: "হে অন্তর পরিবর্তনকারী! আমার অন্তরকে তোমার দ্বীনের উপর স্থির রাখ।",
        english: "O Turner of hearts, make my heart firm upon Your religion.",
        reference: "তিরমিযী"
      },
      {
        id: "guidance-4",
        titleBengali: "দ্বীনে স্থিরতার দোয়া",
        titleEnglish: "Steadfastness in Faith",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الأَمْرِ، وَالْعَزِيمَةَ عَلَى الرُّشْدِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দ্বীনে স্থিরতা এবং সঠিক পথে দৃঢ়তা প্রার্থনা করি।",
        english: "O Allah, I ask You for steadfastness in the matter and determination upon the right guidance.",
        reference: "তিরমিযী"
      },
      {
        id: "guidance-5",
        titleBengali: "ঈমান বৃদ্ধির দোয়া",
        titleEnglish: "Increase in Faith",
        arabic: "رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
        bengali: "হে আমাদের রব! হিদায়াত দেওয়ার পর আমাদের অন্তরকে বক্র করো না এবং তোমার পক্ষ থেকে আমাদেরকে রহমত দান কর। নিশ্চয়ই তুমি মহাদাতা।",
        english: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "guidance-6",
        titleBengali: "নূর ও হিদায়াতের দোয়া",
        titleEnglish: "For Light & Guidance",
        arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا",
        bengali: "হে আল্লাহ! আমার অন্তরে নূর দাও, আমার দৃষ্টিতে নূর দাও এবং আমার শ্রবণে নূর দাও।",
        english: "O Allah, place light in my heart, light in my sight, and light in my hearing.",
        reference: "তিরমিযী"
      },
      {
        id: "guidance-7",
        titleBengali: "মুসলিম হয়ে মৃত্যুর দোয়া",
        titleEnglish: "To Die as a Muslim",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَسْأَلَةِ وَخَيْرَ الدُّعَاءِ وَخَيْرَ النَّجَاحِ وَخَيْرَ الْعَمَلِ وَخَيْرَ الثَّوَابِ وَخَيْرَ الْحَيَاةِ وَخَيْرَ الْمَمَاتِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উত্তম প্রার্থনা, উত্তম দোয়া, উত্তম সাফল্য, উত্তম আমল, উত্তম প্রতিদান, উত্তম জীবন এবং উত্তম মৃত্যু চাই।",
        english: "O Allah, I ask You for the best of requests, the best of supplications, the best of success, the best of deeds, the best of reward, the best of life, and the best of death.",
        reference: "হাকেম"
      },
      {
        id: "guidance-8",
        titleBengali: "আল্লাহর ভালোবাসার দোয়া",
        titleEnglish: "For Love of Allah",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ، وَحُبَّ مَنْ يُحِبُّكَ، وَحُبَّ عَمَلٍ يُقَرِّبُنِي إِلَى حُبِّكَ",
        bengali: "হে আল্লাহ! আমি তোমার ভালোবাসা চাই, তোমাকে যারা ভালোবাসে তাদের ভালোবাসা চাই এবং এমন আমলের ভালোবাসা চাই যা আমাকে তোমার ভালোবাসার কাছে পৌঁছে দেবে।",
        english: "O Allah, I ask You for Your love, the love of those who love You, and the love of deeds that will bring me closer to Your love.",
        reference: "তিরমিযী"
      },
      {
        id: "guidance-9",
        titleBengali: "সৎ সঙ্গীর দোয়া",
        titleEnglish: "For Righteous Companions",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لاَ يَمْلِكُهَا إِلاَّ أَنْتَ",
        bengali: "হে আল্লাহ! আমি তোমার অনুগ্রহ ও রহমত প্রার্থনা করি, কারণ এগুলো একমাত্র তোমার হাতে।",
        english: "O Allah, I ask You from Your bounty and mercy, for none possesses them except You.",
        reference: "তাবারানী"
      },
      {
        id: "guidance-10",
        titleBengali: "ঈমান দৃঢ় করার দোয়া",
        titleEnglish: "For Firm Faith",
        arabic: "اللَّهُمَّ زَيِّنَّا بِزِينَةِ الإِيمَانِ وَاجْعَلْنَا هُدَاةً مُهْتَدِينَ",
        bengali: "হে আল্লাহ! আমাদেরকে ঈমানের সৌন্দর্যে সুসজ্জিত কর এবং আমাদেরকে হিদায়াতপ্রাপ্ত পথপ্রদর্শক বানাও।",
        english: "O Allah, adorn us with the beauty of faith and make us guides who are rightly guided.",
        reference: "নাসাঈ"
      }
    ]
  },

  // 8. Knowledge & Study Duas
  {
    id: "knowledge-study",
    nameEnglish: "Knowledge & Study",
    nameBengali: "জ্ঞান ও পড়াশোনার দোয়া",
    icon: "GraduationCap",
    duas: [
      {
        id: "knowledge-1",
        titleBengali: "জ্ঞান বৃদ্ধির দোয়া",
        titleEnglish: "Increase in Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দাও।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "knowledge-2",
        titleBengali: "পড়াশোনা শুরুর দোয়া",
        titleEnglish: "Before Starting Study",
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا",
        bengali: "হে আল্লাহ! তুমি আমাকে যা শিখিয়েছ তা দিয়ে আমাকে উপকৃত কর, আমাকে এমন কিছু শেখাও যা আমাকে উপকৃত করবে এবং আমার জ্ঞান বৃদ্ধি কর।",
        english: "O Allah, benefit me with what You have taught me, teach me that which will benefit me, and increase me in knowledge.",
        reference: "তিরমিযী, ইবনে মাজাহ"
      },
      {
        id: "knowledge-3",
        titleBengali: "পড়াশোনা শেষে দোয়া",
        titleEnglish: "After Completing Study",
        arabic: "اللَّهُمَّ إِنِّي أَسْتَوْدِعُكَ مَا قَرَأْتُ وَمَا حَفِظْتُ فَرُدَّهُ إِلَيَّ عِنْدَ حَاجَتِي",
        bengali: "হে আল্লাহ! আমি যা পড়েছি ও মুখস্থ করেছি তা তোমার কাছে গচ্ছিত রাখছি, প্রয়োজনের সময় তা আমাকে ফিরিয়ে দাও।",
        english: "O Allah, I entrust You with what I have read and memorized, return it to me when I need it.",
        reference: "ইবনে আসাকির"
      },
      {
        id: "knowledge-4",
        titleBengali: "বুঝার ক্ষমতার দোয়া",
        titleEnglish: "For Understanding",
        arabic: "اللَّهُمَّ فَهِّمْنِي فِي الدِّينِ وَعَلِّمْنِي التَّأْوِيلَ",
        bengali: "হে আল্লাহ! আমাকে দ্বীন বুঝার তাওফীক দাও এবং আমাকে ব্যাখ্যা শেখাও।",
        english: "O Allah, give me understanding in religion and teach me the interpretation.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "knowledge-5",
        titleBengali: "স্মৃতিশক্তির দোয়া",
        titleEnglish: "For Retaining Knowledge",
        arabic: "سُبْحَانَكَ لاَ عِلْمَ لَنَا إِلاَّ مَا عَلَّمْتَنَا إِنَّكَ أَنْتَ الْعَلِيمُ الْحَكِيمُ",
        bengali: "তুমি পবিত্র, তুমি আমাদের যা শিখিয়েছ তা ছাড়া আমাদের কোন জ্ঞান নেই। নিশ্চয়ই তুমি সর্বজ্ঞ, প্রজ্ঞাময়।",
        english: "Exalted are You; we have no knowledge except what You have taught us. Indeed, You are the Knowing, the Wise.",
        reference: "সূরা বাকারা ২:৩২"
      },
      {
        id: "knowledge-6",
        titleBengali: "পরীক্ষার আগে দোয়া",
        titleEnglish: "Before Exam",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও এবং আমার কাজ সহজ করে দাও।",
        english: "My Lord, expand for me my breast and ease my task for me.",
        reference: "সূরা ত্বহা ২০:২৫-২৬"
      },
      {
        id: "knowledge-7",
        titleBengali: "উপকারী জ্ঞানের দোয়া",
        titleEnglish: "For Beneficial Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল প্রার্থনা করি।",
        english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "knowledge-8",
        titleBengali: "অকল্যাণকর জ্ঞান থেকে আশ্রয়",
        titleEnglish: "Refuge from Useless Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لاَ يَنْفَعُ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে এমন জ্ঞান থেকে আশ্রয় চাই যা উপকারী নয়।",
        english: "O Allah, I seek refuge in You from knowledge that does not benefit.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "knowledge-9",
        titleBengali: "কুরআন মুখস্থের দোয়া",
        titleEnglish: "For Quran Memorization",
        arabic: "اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً",
        bengali: "হে আল্লাহ! কুরআনের মাধ্যমে আমার উপর রহম কর এবং এটিকে আমার জন্য ইমাম, নূর, হিদায়াত ও রহমত বানাও।",
        english: "O Allah, have mercy on me through the Quran, and make it for me a leader, light, guidance, and mercy.",
        reference: "তাবারানী"
      },
      {
        id: "knowledge-10",
        titleBengali: "হিকমত ও জ্ঞানের দোয়া",
        titleEnglish: "For Wisdom & Knowledge",
        arabic: "رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        bengali: "হে আমার রব! আমাকে হিকমত দান কর এবং আমাকে সৎকর্মশীলদের অন্তর্ভুক্ত কর।",
        english: "My Lord, grant me wisdom and join me with the righteous.",
        reference: "সূরা শুআরা ২৬:৮৩"
      }
    ]
  },

  // 9. Rizq & Wealth Duas
  {
    id: "rizq-wealth",
    nameEnglish: "Rizq & Wealth",
    nameBengali: "রিজিকের দোয়া",
    icon: "Wallet",
    duas: [
      {
        id: "rizq-1",
        titleBengali: "পবিত্র রিজিকের দোয়া",
        titleEnglish: "For Pure Provision",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا، وَعِلْمًا نَافِعًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে পবিত্র রিজিক, উপকারী জ্ঞান এবং কবুলযোগ্য আমল প্রার্থনা করি।",
        english: "O Allah, I ask You for good provision, beneficial knowledge, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "rizq-2",
        titleBengali: "হালাল রিজিকের দোয়া",
        titleEnglish: "For Halal Sustenance",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহ দিয়ে আমাকে তোমা ছাড়া অন্যদের থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all those besides You by Your bounty.",
        reference: "তিরমিযী"
      },
      {
        id: "rizq-3",
        titleBengali: "দারিদ্র্য থেকে আশ্রয়",
        titleEnglish: "Refuge from Poverty",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ، وَالْقِلَّةِ، وَالذِّلَّةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দারিদ্র্য, অভাব এবং অপমান থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from poverty, scarcity, and humiliation.",
        reference: "আবু দাউদ"
      },
      {
        id: "rizq-4",
        titleBengali: "রিজিকে বরকতের দোয়া",
        titleEnglish: "Blessings in Provision",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আল্লাহ! তুমি আমাদেরকে যা রিজিক দিয়েছ তাতে বরকত দাও এবং জাহান্নামের আযাব থেকে আমাদের রক্ষা কর।",
        english: "O Allah, bless us in what You have provided us and protect us from the punishment of the Fire.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "rizq-5",
        titleBengali: "রিজিক প্রশস্ত করার দোয়া",
        titleEnglish: "For Expanded Provision",
        arabic: "اللَّهُمَّ أَوْسِعْ لِي فِي رِزْقِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي",
        bengali: "হে আল্লাহ! আমার রিজিক প্রশস্ত কর এবং তুমি আমাকে যা দিয়েছ তাতে বরকত দাও।",
        english: "O Allah, expand my provision and bless me in what You have given me.",
        reference: "তাবারানী"
      },
      {
        id: "rizq-6",
        titleBengali: "মূসা (আ.) এর রিজিকের দোয়া",
        titleEnglish: "Dua of Musa for Good",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        bengali: "হে আমার রব! তুমি আমার প্রতি যে কল্যাণ নাযিল করবে আমি তার মুখাপেক্ষী।",
        english: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
        reference: "সূরা কাসাস ২৮:২৪"
      },
      {
        id: "rizq-7",
        titleBengali: "হালাল আয়ের দোয়া",
        titleEnglish: "For Halal Income",
        arabic: "اللَّهُمَّ ارْزُقْنِي رِزْقًا حَلاَلاً طَيِّبًا وَبَارِكْ لِي فِيهِ",
        bengali: "হে আল্লাহ! আমাকে হালাল ও পবিত্র রিজিক দান কর এবং তাতে বরকত দাও।",
        english: "O Allah, grant me lawful and pure provision and bless me in it.",
        reference: "তাবারানী"
      },
      {
        id: "rizq-8",
        titleBengali: "ঋণ মুক্তির দোয়া",
        titleEnglish: "For Removing Debt",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহে আমাকে তোমা ছাড়া সবার থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all besides You through Your bounty.",
        reference: "তিরমিযী"
      },
      {
        id: "rizq-9",
        titleBengali: "রিজিকে প্রাচুর্যের দোয়া",
        titleEnglish: "For Abundance in Sustenance",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, প্রশস্ত রিজিক এবং কবুলযোগ্য আমল চাই।",
        english: "O Allah, I ask You for beneficial knowledge, abundant provision, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "rizq-10",
        titleBengali: "উপার্জনে বরকতের দোয়া",
        titleEnglish: "For Barakah in Earnings",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي كَسْبِي وَفِيمَا رَزَقْتَنِي وَاجْعَلْهُ حَلاَلاً طَيِّبًا",
        bengali: "হে আল্লাহ! আমার উপার্জনে এবং তুমি আমাকে যা রিজিক দিয়েছ তাতে বরকত দাও এবং তা হালাল ও পবিত্র কর।",
        english: "O Allah, bless me in my earnings and in what You have provided me, and make it lawful and pure.",
        reference: "বায়হাকী"
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
        titleBengali: "রোগ সুস্থতার দোয়া",
        titleEnglish: "For Complete Healing",
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
        bengali: "হে আল্লাহ! মানুষের রব! কষ্ট দূর কর, সুস্থতা দান কর। তুমিই সুস্থতা দানকারী। তোমার সুস্থতা ছাড়া কোন সুস্থতা নেই। এমন সুস্থতা দাও যা কোন রোগ রেখে যায় না।",
        english: "O Allah, Lord of mankind, remove the hardship. Cure, for You are the Healer. There is no cure except Your cure, a cure that leaves no illness.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "health-2",
        titleBengali: "অসুস্থ ব্যক্তির জন্য দোয়া",
        titleEnglish: "For the Sick Person",
        arabic: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        bengali: "আমি মহান আল্লাহর কাছে প্রার্থনা করি, যিনি মহান আরশের রব, তিনি যেন তোমাকে সুস্থ করে দেন। (৭ বার পড়ুন)",
        english: "I ask Allah, the Mighty, the Lord of the Mighty Throne, to cure you. (Recite 7 times)",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "health-3",
        titleBengali: "ঝাড়ফুঁকের দোয়া (রুকইয়াহ)",
        titleEnglish: "Ruqyah for Healing",
        arabic: "بِسْمِ اللهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللهُ يَشْفِيكَ، بِسْمِ اللهِ أَرْقِيكَ",
        bengali: "আল্লাহর নামে তোমাকে ঝাড়ফুঁক করছি, প্রতিটি কষ্টদায়ক বিষয় থেকে, প্রতিটি হিংসুক আত্মা বা বদনজর থেকে। আল্লাহ তোমাকে সুস্থ করুন, আল্লাহর নামে তোমাকে ঝাড়ফুঁক করছি।",
        english: "In the name of Allah I perform ruqyah for you, from everything that is harming you, from the evil of every soul or envious eye. May Allah cure you, in the name of Allah I perform ruqyah for you.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-4",
        titleBengali: "শরীর-কান-চোখের সুস্থতা",
        titleEnglish: "Health of Body, Hearing & Sight",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
        bengali: "হে আল্লাহ! আমার শরীরে সুস্থতা দাও। হে আল্লাহ! আমার শ্রবণশক্তিতে সুস্থতা দাও। হে আল্লাহ! আমার দৃষ্টিশক্তিতে সুস্থতা দাও।",
        english: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.",
        reference: "আবু দাউদ"
      },
      {
        id: "health-5",
        titleBengali: "ব্যথা থেকে আশ্রয়",
        titleEnglish: "Relief from Pain",
        arabic: "أَعُوذُ بِعِزَّةِ اللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        bengali: "আমি আল্লাহর ইজ্জত ও কুদরতের আশ্রয় নিচ্ছি আমার অনুভূত ও আশঙ্কিত অনিষ্ট থেকে। (৭ বার পড়ুন)",
        english: "I seek refuge in the might of Allah and His power from the evil of what I feel and fear. (Recite 7 times)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-6",
        titleBengali: "দুনিয়া-আখিরাতে সুস্থতা",
        titleEnglish: "Well-being in Both Worlds",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দুনিয়া ও আখিরাতে সুস্থতা প্রার্থনা করি।",
        english: "O Allah, I ask You for well-being in this world and the Hereafter.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "health-7",
        titleBengali: "অসুস্থকে দেখতে যাওয়ার দোয়া",
        titleEnglish: "When Visiting the Sick",
        arabic: "لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ",
        bengali: "ভয় নেই, ইনশাআল্লাহ এটি পবিত্রতা (গুনাহ মাফের মাধ্যম)।",
        english: "No harm, it is a purification (from sins) if Allah wills.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "health-8",
        titleBengali: "সম্পূর্ণ সুস্থতার দোয়া",
        titleEnglish: "For Complete Recovery",
        arabic: "اللَّهُمَّ اشْفِهِ، اللَّهُمَّ عَافِهِ",
        bengali: "হে আল্লাহ! তাকে সুস্থ কর। হে আল্লাহ! তাকে সুস্থতা দান কর।",
        english: "O Allah, cure him. O Allah, grant him well-being.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "health-9",
        titleBengali: "ব্যথা দূর করার দোয়া",
        titleEnglish: "For Removing Pain",
        arabic: "بِسْمِ اللهِ ثَلاَثًا، وَقُلْ سَبْعَ مَرَّاتٍ: أَعُوذُ بِاللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        bengali: "আল্লাহর নামে (৩ বার)। তারপর বলুন (৭ বার): আমি আল্লাহ ও তাঁর কুদরতের আশ্রয় নিচ্ছি আমার অনুভূত ও আশঙ্কিত ক্ষতি থেকে।",
        english: "In the name of Allah (3 times). Then say (7 times): I seek refuge in Allah and His power from the evil of what I feel and fear.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-10",
        titleBengali: "মানসিক স্বাস্থ্যের দোয়া",
        titleEnglish: "For Mental Health",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই শ্বেতী, উন্মাদনা, কুষ্ঠ এবং মন্দ রোগসমূহ থেকে।",
        english: "O Allah, I seek refuge in You from vitiligo, madness, leprosy, and from evil diseases.",
        reference: "আবু দাউদ"
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
        titleBengali: "বিপদে পড়ার দোয়া",
        titleEnglish: "In Times of Distress",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللهُ رَبُّ السَّمَوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি মহান, সহনশীল। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি মহান আরশের রব। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি আসমানসমূহের রব, জমিনের রব এবং সম্মানিত আরশের রব।",
        english: "There is no deity except Allah, the Magnificent, the Forbearing. There is no deity except Allah, Lord of the Mighty Throne. There is no deity except Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "stress-2",
        titleBengali: "দুশ্চিন্তা থেকে আশ্রয়",
        titleEnglish: "Refuge from Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        bengali: "হে আল্লাহ! আমি তোমার আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অক্ষমতা ও অলসতা থেকে, কাপুরুষতা ও কৃপণতা থেকে এবং ঋণের বোঝা ও মানুষের দমন থেকে।",
        english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "stress-3",
        titleBengali: "রহমত ও সাহায্যের দোয়া",
        titleEnglish: "For Mercy & Help",
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لاَ إِلَهَ إِلاَّ أَنْتَ",
        bengali: "হে আল্লাহ! আমি তোমার রহমতের আশা করি। এক পলকের জন্যও আমাকে আমার নিজের উপর ছেড়ে দিও না এবং আমার সব বিষয় ঠিক করে দাও। তুমি ছাড়া কোন ইলাহ নেই।",
        english: "O Allah, I hope for Your mercy. Do not leave me to myself even for the blink of an eye. Correct all of my affairs for me. There is no deity except You.",
        reference: "আবু দাউদ"
      },
      {
        id: "stress-4",
        titleBengali: "সাহায্য প্রার্থনা",
        titleEnglish: "Seeking Divine Help",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help.",
        reference: "তিরমিযী"
      },
      {
        id: "stress-5",
        titleBengali: "আল্লাহই যথেষ্ট",
        titleEnglish: "Allah is Sufficient",
        arabic: "حَسْبِيَ اللهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        bengali: "আল্লাহই আমার জন্য যথেষ্ট, তিনি ছাড়া কোন ইলাহ নেই। তাঁর উপরই আমি ভরসা করি এবং তিনি মহান আরশের রব। (৭ বার পড়ুন)",
        english: "Allah is sufficient for me. There is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne. (Recite 7 times)",
        reference: "আবু দাউদ"
      },
      {
        id: "stress-6",
        titleBengali: "দুঃখ দূর করার দোয়া",
        titleEnglish: "Removing Grief & Sorrow",
        arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ",
        bengali: "হে আল্লাহ! আমি তোমার বান্দা, তোমার বান্দার সন্তান, তোমার বান্দির সন্তান। আমার কপাল তোমার হাতে, তোমার নির্দেশ আমার উপর কার্যকর, তোমার ফায়সালা আমার জন্য ন্যায়সঙ্গত।",
        english: "O Allah, I am Your slave, son of Your male slave, son of Your female slave. My forelock is in Your Hand. Your command concerning me prevails, and Your judgment concerning me is just.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "stress-7",
        titleBengali: "প্যানিক অ্যাটাকে দোয়া",
        titleEnglish: "During Panic Attacks",
        arabic: "لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        bengali: "তুমি ছাড়া কোন ইলাহ নেই, তুমি পবিত্র। নিশ্চয়ই আমি যালিমদের অন্তর্ভুক্ত ছিলাম।",
        english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "সূরা আম্বিয়া ২১:৮৭"
      },
      {
        id: "stress-8",
        titleBengali: "মনের শান্তির দোয়া",
        titleEnglish: "For Peace of Mind",
        arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي صَدْرِي نُورًا",
        bengali: "হে আল্লাহ! আমার অন্তরে নূর দাও এবং আমার বক্ষে নূর দাও।",
        english: "O Allah, place light in my heart and light in my chest.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "stress-9",
        titleBengali: "অভিভূত হলে দোয়া",
        titleEnglish: "When Overwhelmed",
        arabic: "حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ",
        bengali: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতই না উত্তম কর্মবিধায়ক।",
        english: "Allah is sufficient for us, and He is the best disposer of affairs.",
        reference: "সূরা আলে ইমরান ৩:১৭৩"
      },
      {
        id: "stress-10",
        titleBengali: "কঠিন কথোপকথনের আগে",
        titleEnglish: "Before Difficult Conversation",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও, আমার কাজ সহজ করে দাও এবং আমার জিহ্বার জড়তা দূর কর, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "My Lord, expand for me my breast, ease my task for me, and untie the knot from my tongue that they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৫-২৮"
      }
    ]
  },

  // 11. Work & Success Duas
  {
    id: "work-success",
    nameEnglish: "Work & Success",
    nameBengali: "কাজ ও সফলতার দোয়া",
    icon: "Briefcase",
    duas: [
      {
        id: "work-1",
        titleBengali: "কাজ শুরুর দোয়া",
        titleEnglish: "Starting Work",
        arabic: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
        bengali: "আল্লাহর নামে, আল্লাহর উপর ভরসা করলাম, আল্লাহর সাহায্য ছাড়া কোন উপায় নেই এবং কোন শক্তি নেই।",
        english: "In the name of Allah, I place my trust in Allah, there is no might nor power except with Allah.",
        reference: "আবু দাউদ, তিরমিযী"
      },
      {
        id: "work-2",
        titleBengali: "সফলতার দোয়া",
        titleEnglish: "For Success",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল চাই।",
        english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "work-3",
        titleBengali: "কাজ সহজ করার দোয়া",
        titleEnglish: "For Easy Tasks",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً",
        bengali: "হে আল্লাহ! কোন কাজ সহজ নয় যতক্ষণ না তুমি তা সহজ কর। তুমি চাইলে কঠিন কাজকেও সহজ করে দাও।",
        english: "O Allah, nothing is easy except what You make easy, and You can make the difficult easy if You wish.",
        reference: "ইবনে হিব্বান"
      },
      {
        id: "work-4",
        titleBengali: "ইন্টারভিউয়ের আগে দোয়া",
        titleEnglish: "Before Job Interview",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও, আমার কাজ সহজ করে দাও এবং আমার জিহ্বার জড়তা দূর কর, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "My Lord, expand for me my breast, ease my task for me, and untie the knot from my tongue that they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৫-২৮"
      },
      {
        id: "work-5",
        titleBengali: "ব্যবসায় সফলতার দোয়া",
        titleEnglish: "For Business Success",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي تِجَارَتِنَا وَأَصْلِحْ لَنَا أَمْرَنَا",
        bengali: "হে আল্লাহ! আমাদের ব্যবসায় বরকত দাও এবং আমাদের কাজ সঠিক করে দাও।",
        english: "O Allah, bless us in our trade and rectify our affairs.",
        reference: "তাবারানী"
      },
      {
        id: "work-6",
        titleBengali: "ভালো সহকর্মীর জন্য দোয়া",
        titleEnglish: "For Good Colleagues",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর এবং আমাদের পারস্পরিক সম্পর্ক ঠিক করে দাও।",
        english: "O Allah, bring love between our hearts and rectify our mutual relations.",
        reference: "আবু দাউদ"
      },
      {
        id: "work-7",
        titleBengali: "পদোন্নতির জন্য দোয়া",
        titleEnglish: "For Promotion & Growth",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ",
        bengali: "হে আল্লাহ! আমি তোমার অনুগ্রহ ও রহমত চাই।",
        english: "O Allah, I ask You from Your bounty and mercy.",
        reference: "তাবারানী"
      },
      {
        id: "work-8",
        titleBengali: "সিদ্ধান্ত নেওয়ার দোয়া",
        titleEnglish: "For Making Decisions",
        arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
        bengali: "হে আল্লাহ! আমার জন্য যা কল্যাণকর তা নির্ধারণ কর এবং আমার জন্য তা পছন্দ কর।",
        english: "O Allah, decree what is good for me and choose it for me.",
        reference: "তিরমিযী"
      },
      {
        id: "work-9",
        titleBengali: "মিটিংয়ের আগে দোয়া",
        titleEnglish: "Before Meeting",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        bengali: "হে আল্লাহ! তোমার যিকর, শুকর এবং সুন্দরভাবে তোমার ইবাদত করতে আমাকে সাহায্য কর।",
        english: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        reference: "আবু দাউদ, নাসাঈ"
      },
      {
        id: "work-10",
        titleBengali: "কাজ শেষের দোয়া",
        titleEnglish: "After Completing Work",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য যাঁর অনুগ্রহে সকল ভালো কাজ সম্পন্ন হয়।",
        english: "All praise is for Allah by whose grace all good things are completed.",
        reference: "ইবনে মাজাহ"
      }
    ]
  },

  // 12. Family & Relationships Duas
  {
    id: "family-relationships",
    nameEnglish: "Family & Relationships",
    nameBengali: "পরিবারের দোয়া",
    icon: "Users",
    duas: [
      {
        id: "family-1",
        titleBengali: "স্ত্রী-সন্তানের জন্য দোয়া",
        titleEnglish: "For Spouse & Children",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "family-2",
        titleBengali: "পিতা-মাতা ও মুমিনদের জন্য",
        titleEnglish: "For Parents & Believers",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর, আমার পিতা-মাতাকে ক্ষমা কর, যারা মুমিন হয়ে আমার ঘরে প্রবেশ করে তাদের ক্ষমা কর এবং সকল মুমিন পুরুষ ও মুমিন নারীদের ক্ষমা কর।",
        english: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.",
        reference: "সূরা নূহ ৭১:২৮"
      },
      {
        id: "family-3",
        titleBengali: "পিতা-মাতার জন্য রহমতের দোয়া",
        titleEnglish: "Mercy for Parents",
        arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        bengali: "হে আমার রব! তাদের প্রতি রহম কর, যেমন তারা আমাকে শৈশবে লালন-পালন করেছেন।",
        english: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "সূরা ইসরা ১৭:২৪"
      },
      {
        id: "family-4",
        titleBengali: "পরিবারে সম্প্রীতির দোয়া",
        titleEnglish: "Family Harmony",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلاَمِ",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর, আমাদের মধ্যকার সম্পর্ক ঠিক করে দাও এবং আমাদের শান্তির পথ দেখাও।",
        english: "O Allah, bring our hearts together, reconcile between us, and guide us to the ways of peace.",
        reference: "আবু দাউদ"
      },
      {
        id: "family-5",
        titleBengali: "বরকতের দোয়া",
        titleEnglish: "Prayer for Blessings",
        arabic: "اللَّهُمَّ بَارِكْ لَهُ، وَبَارِكْ عَلَيْهِ",
        bengali: "হে আল্লাহ! তার জন্য বরকত দাও এবং তার উপর বরকত দাও।",
        english: "O Allah, bless him and send blessings upon him.",
        reference: "নাসাঈ"
      },
      {
        id: "family-6",
        titleBengali: "নিয়ামতের শুকরিয়া ও সন্তান",
        titleEnglish: "Gratitude & Righteous Offspring",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
        bengali: "হে আমার রব! আমাকে সামর্থ্য দাও যেন আমি তোমার সেই নিয়ামতের শুকরিয়া আদায় করি যা তুমি আমাকে ও আমার পিতা-মাতাকে দান করেছ এবং আমি যেন এমন সৎকর্ম করি যা তুমি পছন্দ কর এবং আমার সন্তানদের মধ্যে আমার জন্য সংশোধন করে দাও।",
        english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And make righteous for me my offspring.",
        reference: "সূরা আহকাফ ৪৬:১৫"
      },
      {
        id: "family-7",
        titleBengali: "পারিবারিক মিলনের দোয়া",
        titleEnglish: "For Family Reconciliation",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا وَاهْدِنَا سُبُلَ السَّلاَمِ",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর, আমাদের পারস্পরিক সম্পর্ক ঠিক করে দাও এবং আমাদের শান্তির পথে পরিচালিত কর।",
        english: "O Allah, bring love between our hearts, rectify our mutual relations, and guide us to the paths of peace.",
        reference: "আবু দাউদ"
      },
      {
        id: "family-8",
        titleBengali: "শ্বশুরবাড়ির জন্য দোয়া",
        titleEnglish: "For In-Laws",
        arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا",
        bengali: "হে আমাদের রব! আমাদের ও আমাদের সেসব ভাইদের ক্ষমা কর যারা ঈমানের সাথে আমাদের অগ্রগামী হয়েছে এবং মুমিনদের প্রতি আমাদের অন্তরে কোন বিদ্বেষ রেখো না।",
        english: "Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts any resentment toward those who have believed.",
        reference: "সূরা হাশর ৫৯:১০"
      },
      {
        id: "family-9",
        titleBengali: "ভাই-বোনের জন্য দোয়া",
        titleEnglish: "For Siblings",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর, আমার পিতা-মাতাকে ক্ষমা কর, যারা মুমিন হয়ে আমার ঘরে প্রবেশ করে তাদের ক্ষমা কর এবং সকল মুমিন পুরুষ ও মুমিন নারীদের ক্ষমা কর।",
        english: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.",
        reference: "সূরা নূহ ৭১:২৮"
      },
      {
        id: "family-10",
        titleBengali: "পারিবারিক ঐক্যের দোয়া",
        titleEnglish: "For Family Unity",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
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
        titleBengali: "পরিবারের জন্য দোয়া",
        titleEnglish: "For Family Comfort",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        bengali: "হে আমাদের রব! আমাদের স্ত্রী/স্বামী ও সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর।",
        english: "Our Lord, grant us from among our spouses and offspring comfort to our eyes.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "marriage-6",
        titleBengali: "নেক জীবনসঙ্গীর জন্য দোয়া",
        titleEnglish: "For a Righteous Spouse",
        arabic: "اللَّهُمَّ ارْزُقْنِي زَوْجًا صَالِحًا يُعِينُنِي عَلَى طَاعَتِكَ",
        bengali: "হে আল্লাহ! আমাকে একজন নেক জীবনসঙ্গী দান কর যে তোমার আনুগত্যে আমাকে সাহায্য করবে।",
        english: "O Allah, grant me a righteous spouse who will help me in obeying You.",
        reference: "আল-আযকার"
      },
      {
        id: "marriage-7",
        titleBengali: "বাসর রাতের দোয়া",
        titleEnglish: "First Night Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তার কল্যাণ চাই এবং তুমি তাকে যে স্বভাবে সৃষ্টি করেছ তার কল্যাণ চাই। আর তার অনিষ্ট থেকে এবং তুমি তাকে যে স্বভাবে সৃষ্টি করেছ তার অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for her goodness and the goodness upon which You have created her, and I seek refuge in You from her evil and the evil upon which You have created her.",
        reference: "আবু দাউদ, ইবনে মাজাহ"
      },
      {
        id: "marriage-8",
        titleBengali: "দাম্পত্য ভালোবাসার দোয়া",
        titleEnglish: "For Marital Love",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরের মধ্যে ভালোবাসা সৃষ্টি কর এবং আমাদের পারস্পরিক সম্পর্ক সংশোধন করে দাও।",
        english: "O Allah, bring love between our hearts and rectify our mutual relations.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "marriage-9",
        titleBengali: "বিবাদ মীমাংসার দোয়া",
        titleEnglish: "For Resolving Disputes",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        bengali: "হে আমাদের রব! আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের চোখ শীতল কর।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "marriage-10",
        titleBengali: "সন্তান লাভের দোয়া",
        titleEnglish: "For Fertility & Children",
        arabic: "رَبِّ لاَ تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
        bengali: "হে আমার রব! আমাকে সন্তানহীন রেখো না, তুমিই তো সর্বোত্তম উত্তরাধিকারী।",
        english: "My Lord, do not leave me alone [with no heir], while You are the best of inheritors.",
        reference: "সূরা আম্বিয়া ২১:৮৯"
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
        titleBengali: "সন্তান চাওয়ার দোয়া",
        titleEnglish: "Asking for Offspring",
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
        bengali: "হে আমার রব! তোমার পক্ষ থেকে আমাকে পবিত্র সন্তান দান কর। নিশ্চয়ই তুমি দোয়া শ্রবণকারী।",
        english: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.",
        reference: "সূরা আলে ইমরান ৩:৩৮"
      },
      {
        id: "children-2",
        titleBengali: "সন্তানহীনতার দোয়া",
        titleEnglish: "For Not Being Alone",
        arabic: "رَبِّ لاَ تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
        bengali: "হে আমার রব! আমাকে একা রেখো না, তুমি তো সর্বোত্তম উত্তরাধিকারী।",
        english: "My Lord, do not leave me alone, and You are the best of inheritors.",
        reference: "সূরা আম্বিয়া ২১:৮৯"
      },
      {
        id: "children-3",
        titleBengali: "নামাজি সন্তানের জন্য দোয়া",
        titleEnglish: "For Praying Descendants",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        bengali: "হে আমার রব! আমাকে সালাত কায়েমকারী বানাও এবং আমার বংশধরদেরকেও। হে আমাদের রব! আমার দোয়া কবুল কর।",
        english: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "children-4",
        titleBengali: "সন্তানের সংশোধনের দোয়া",
        titleEnglish: "For Righteous Offspring",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
        bengali: "হে আমার রব! আমাকে সামর্থ্য দাও যেন আমি তোমার নিয়ামতের শুকরিয়া আদায় করি এবং এমন সৎকর্ম করি যা তুমি পছন্দ কর এবং আমার সন্তানদের মধ্যে আমার জন্য সংশোধন করে দাও।",
        english: "My Lord, enable me to be grateful for Your favor and to do righteousness of which You approve. And make righteous for me my offspring.",
        reference: "সূরা আহকাফ ৪৬:১৫"
      },
      {
        id: "children-5",
        titleBengali: "চোখের শীতলতার দোয়া",
        titleEnglish: "For Family as Comfort",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "হে আমাদের রব! আমাদের স্ত্রী ও সন্তানদের থেকে আমাদের চোখ শীতল কর এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "children-6",
        titleBengali: "সন্তানের সুরক্ষার দোয়া",
        titleEnglish: "Protection for Children",
        arabic: "اللَّهُمَّ أَعِذْهُ بِكَلِمَاتِكَ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لاَمَّةٍ",
        bengali: "হে আল্লাহ! আমি তোমার পরিপূর্ণ বাণীসমূহের মাধ্যমে তাকে প্রতিটি শয়তান, বিষাক্ত প্রাণী এবং প্রতিটি ক্ষতিকর বদনজর থেকে তোমার আশ্রয়ে রাখছি।",
        english: "O Allah, I seek protection for him in Your perfect words from every devil and every poisonous creature, and from every evil eye.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "children-7",
        titleBengali: "নবজাতকের জন্য দোয়া",
        titleEnglish: "For Newborn Baby",
        arabic: "بَارَكَ اللهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
        bengali: "আল্লাহ তোমাকে যা দান করেছেন তাতে বরকত দিন। তুমি দাতার শুকরিয়া আদায় কর। সে যেন পূর্ণ যৌবনে পৌঁছে এবং তুমি তার সদ্ব্যবহার পাও।",
        english: "May Allah bless you in what He has given you, may you give thanks to the Giver, may he reach full maturity, and may you be blessed with his righteousness.",
        reference: "ইবনে সুন্নী"
      },
      {
        id: "children-8",
        titleBengali: "সন্তানের শিক্ষার জন্য দোয়া",
        titleEnglish: "For Child's Education",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দাও। (সন্তানকে শেখান)",
        english: "My Lord, increase me in knowledge. (Teach to children)",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "children-9",
        titleBengali: "সন্তানের চরিত্রের জন্য দোয়া",
        titleEnglish: "For Child's Good Character",
        arabic: "اللَّهُمَّ حَسِّنْ خُلُقَهُ كَمَا حَسَّنْتَ خَلْقَهُ",
        bengali: "হে আল্লাহ! তার চরিত্র সুন্দর কর যেমন তুমি তার আকৃতি সুন্দর করেছ।",
        english: "O Allah, make his character beautiful just as You have made his appearance beautiful.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "children-10",
        titleBengali: "কিশোর সন্তানের জন্য দোয়া",
        titleEnglish: "For Teenage Children",
        arabic: "اللَّهُمَّ اهْدِ أَوْلاَدِي وَثَبِّتْهُمْ عَلَى الْحَقِّ وَاجْعَلْهُمْ مِنَ الصَّالِحِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের হিদায়াত দাও, তাদের সত্যের উপর অটল রাখ এবং তাদের নেককারদের অন্তর্ভুক্ত কর।",
        english: "O Allah, guide my children, keep them firm upon the truth, and make them among the righteous.",
        reference: "দোয়া সংকলন"
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
        titleBengali: "যানবাহনে চড়ার দোয়া",
        titleEnglish: "When Boarding a Vehicle",
        arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        bengali: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। পবিত্র সেই সত্তা যিনি একে আমাদের বশীভূত করে দিয়েছেন, অন্যথায় আমরা একে বশ করতে সক্ষম ছিলাম না। আর নিশ্চয়ই আমরা আমাদের রবের কাছে প্রত্যাবর্তনকারী।",
        english: "Allah is the greatest, Allah is the greatest, Allah is the greatest. How perfect He is, The One Who has placed this at our service, and we ourselves would not have been capable of that, and to our Lord is our final destiny.",
        reference: "সহীহ মুসলিম, তিরমিযী"
      },
      {
        id: "travel-2",
        titleBengali: "সফরে নেকীর দোয়া",
        titleEnglish: "For Goodness in Travel",
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى",
        bengali: "হে আল্লাহ! আমরা আমাদের এই সফরে তোমার কাছে নেকী ও তাকওয়া এবং এমন আমল প্রার্থনা করছি যা তুমি পছন্দ কর।",
        english: "O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-3",
        titleBengali: "সফর সহজ করার দোয়া",
        titleEnglish: "For Easy Journey",
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
        bengali: "হে আল্লাহ! আমাদের এই সফর আমাদের জন্য সহজ করে দাও এবং এর দূরত্ব সংক্ষেপ করে দাও।",
        english: "O Allah, make this journey easy for us and shorten its distance for us.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-4",
        titleBengali: "আল্লাহকে সাথী করার দোয়া",
        titleEnglish: "Allah as Companion",
        arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الأَهْلِ",
        bengali: "হে আল্লাহ! তুমি সফরে আমার সাথী এবং পরিবারে আমার প্রতিনিধি।",
        english: "O Allah, You are the Companion on the journey and the Guardian of the family.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-5",
        titleBengali: "নতুন জায়গায় নামার দোয়া",
        titleEnglish: "When Stopping at a Place",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই। (নতুন জায়গায় নামার সময়)",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created. (When stopping at a new place)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-6",
        titleBengali: "সফর থেকে ফেরার দোয়া",
        titleEnglish: "When Returning from Travel",
        arabic: "آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ",
        bengali: "আমরা প্রত্যাবর্তনকারী, তাওবাকারী, ইবাদতকারী এবং আমাদের রবের প্রশংসাকারী। (সফর থেকে ফেরার সময়)",
        english: "We are returning, repenting, worshipping, and praising our Lord. (When returning from travel)",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "travel-7",
        titleBengali: "বিমান/দীর্ঘ সফরের আগে দোয়া",
        titleEnglish: "Before Flight/Long Journey",
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
        bengali: "হে আল্লাহ! আমাদের এই সফরকে সহজ করে দাও এবং এর দূরত্ব আমাদের জন্য কমিয়ে দাও।",
        english: "O Allah, make this journey of ours easy and shorten its distance for us.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-8",
        titleBengali: "গাড়ির নিরাপত্তার দোয়া",
        titleEnglish: "For Safety of Vehicle",
        arabic: "بِسْمِ اللهِ مَجْرَاهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَّحِيمٌ",
        bengali: "আল্লাহর নামে এর চলা এবং থামা। নিশ্চয়ই আমার রব অতি ক্ষমাশীল, অতি দয়ালু।",
        english: "In the name of Allah is its course and its anchorage. Indeed, my Lord is Forgiving and Merciful.",
        reference: "সূরা হুদ ১১:৪১"
      },
      {
        id: "travel-9",
        titleBengali: "পথ হারালে দোয়া",
        titleEnglish: "When Lost",
        arabic: "يَا عِبَادَ اللهِ دُلُّونِي عَلَى الطَّرِيقِ",
        bengali: "হে আল্লাহর বান্দারা! আমাকে পথ দেখাও।",
        english: "O servants of Allah, guide me to the path.",
        reference: "তাবারানী"
      },
      {
        id: "travel-10",
        titleBengali: "হজ্জ/উমরার দোয়া",
        titleEnglish: "For Hajj/Umrah",
        arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
        bengali: "আমি হাজির হে আল্লাহ! আমি হাজির। আমি হাজির, তোমার কোন শরীক নেই, আমি হাজির। নিশ্চয়ই সকল প্রশংসা, নিয়ামত এবং রাজত্ব তোমারই, তোমার কোন শরীক নেই।",
        english: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner.",
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
        titleBengali: "বিপদে ধৈর্যের দোয়া",
        titleEnglish: "Patience in Calamity",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        bengali: "নিশ্চয়ই আমরা আল্লাহর জন্য এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে। হে আল্লাহ! আমার এই বিপদে আমাকে সওয়াব দাও এবং এর বিনিময়ে আমাকে এর চেয়ে উত্তম কিছু দাও।",
        english: "Indeed we belong to Allah and to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-2",
        titleBengali: "আল্লাহই যথেষ্ট",
        titleEnglish: "Allah is Sufficient",
        arabic: "حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ",
        bengali: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতই না উত্তম অভিভাবক।",
        english: "Allah is sufficient for us and He is the best Disposer of affairs.",
        reference: "সূরা আলে ইমরান ৩:১৭৩"
      },
      {
        id: "hardship-3",
        titleBengali: "শক্তি ও সামর্থ্যের দোয়া",
        titleEnglish: "Power Only with Allah",
        arabic: "لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
        bengali: "আল্লাহর সাহায্য ছাড়া কোন উপায় নেই এবং কোন শক্তি নেই।",
        english: "There is no power and no strength except with Allah.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "hardship-4",
        titleBengali: "কঠিন বিপদ থেকে আশ্রয়",
        titleEnglish: "Refuge from Severe Trials",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلاَءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الأَعْدَاءِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই কঠিন বিপদ থেকে, দুর্ভাগ্যে পতিত হওয়া থেকে, মন্দ তাকদীর থেকে এবং শত্রুদের আনন্দ থেকে।",
        english: "O Allah, I seek refuge in You from severe trials, from falling into misfortune, from bad fate, and from the gloating of enemies.",
        reference: "সহীহ বুখারী, সহীহ মুসলিম"
      },
      {
        id: "hardship-5",
        titleBengali: "কঠিনকে সহজ করার দোয়া",
        titleEnglish: "Making Difficulties Easy",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
        bengali: "হে আল্লাহ! তুমি যা সহজ কর তা ছাড়া কিছুই সহজ নয়। তুমি চাইলে কঠিন বিষয়কেও সহজ করে দাও।",
        english: "O Allah, there is nothing easy except what You make easy. And You make the difficult easy if You wish.",
        reference: "ইবনে হিব্বান"
      },
      {
        id: "hardship-6",
        titleBengali: "সাহায্য প্রার্থনার দোয়া",
        titleEnglish: "Seeking Allah's Help",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি। আমার সব বিষয় ঠিক করে দাও এবং এক পলকের জন্যও আমাকে আমার উপর ছেড়ে দিও না।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Correct all of my affairs for me and do not leave me to myself even for the blink of an eye.",
        reference: "মুসতাদরাক হাকিম"
      },
      {
        id: "hardship-7",
        titleBengali: "প্রাকৃতিক দুর্যোগে দোয়া",
        titleEnglish: "During Natural Disaster",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে এর কল্যাণ, এর মধ্যে যা আছে তার কল্যাণ এবং যে উদ্দেশ্যে একে পাঠানো হয়েছে তার কল্যাণ চাই। আর তোমার কাছে আশ্রয় চাই এর অনিষ্ট থেকে, এর মধ্যে যা আছে তার অনিষ্ট থেকে এবং যে উদ্দেশ্যে একে পাঠানো হয়েছে তার অনিষ্ট থেকে।",
        english: "O Allah, I ask You for its good, the good in it, and the good for which it was sent. I seek refuge in You from its evil, the evil in it, and the evil for which it was sent.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-8",
        titleBengali: "আর্থিক সংকটে দোয়া",
        titleEnglish: "During Financial Hardship",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহে আমাকে তোমা ছাড়া সবার থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all besides You through Your bounty.",
        reference: "তিরমিযী"
      },
      {
        id: "hardship-9",
        titleBengali: "কাউকে হারানোর পর দোয়া",
        titleEnglish: "After Losing Someone",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        bengali: "নিশ্চয়ই আমরা আল্লাহর জন্য এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে। হে আল্লাহ! আমার এই বিপদে আমাকে সওয়াব দাও এবং এর বিনিময়ে আমাকে এর চেয়ে উত্তম কিছু দাও।",
        english: "Indeed we belong to Allah and to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-10",
        titleBengali: "জুলুমের সময় দোয়া",
        titleEnglish: "During Persecution",
        arabic: "حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ، نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيرُ",
        bengali: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতই না উত্তম অভিভাবক। কত উত্তম মালিক এবং কত উত্তম সাহায্যকারী।",
        english: "Allah is sufficient for us and He is the best Disposer of affairs. What an excellent Protector and what an excellent Helper.",
        reference: "সূরা আলে ইমরান ৩:১৭৩, আনফাল ৮:৪০"
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
        titleBengali: "দুনিয়া ও আখিরাতের কল্যাণ",
        titleEnglish: "Good in Both Worlds",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং আমাদেরকে জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "akhirah-2",
        titleBengali: "জান্নাত প্রার্থনা",
        titleEnglish: "Asking for Paradise",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে জান্নাত প্রার্থনা করি এবং জাহান্নাম থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for Paradise and I seek refuge in You from the Fire.",
        reference: "আবু দাউদ"
      },
      {
        id: "akhirah-3",
        titleBengali: "জাহান্নাম থেকে রক্ষা",
        titleEnglish: "Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        bengali: "হে আল্লাহ! আমাকে জাহান্নাম থেকে রক্ষা কর। (৭ বার পড়ুন)",
        english: "O Allah, save me from the Fire. (Recite 7 times)",
        reference: "আবু দাউদ"
      },
      {
        id: "akhirah-4",
        titleBengali: "জাহান্নামের আযাব থেকে রক্ষা",
        titleEnglish: "Avert Hell's Punishment",
        arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
        bengali: "হে আমাদের রব! জাহান্নামের আযাব আমাদের থেকে দূরে রাখ। নিশ্চয়ই এর আযাব অবিচ্ছেদ্য।",
        english: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.",
        reference: "সূরা ফুরকান ২৫:৬৫"
      },
      {
        id: "akhirah-5",
        titleBengali: "সহজ হিসাবের দোয়া",
        titleEnglish: "For Easy Reckoning",
        arabic: "اللَّهُمَّ حَاسِبْنِي حِسَابًا يَسِيرًا",
        bengali: "হে আল্লাহ! আমার হিসাব সহজ করে দাও।",
        english: "O Allah, make my reckoning easy.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "akhirah-6",
        titleBengali: "নূর পূর্ণ করার দোয়া",
        titleEnglish: "For Complete Light",
        arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "হে আমাদের রব! আমাদের জন্য আমাদের নূর পূর্ণ করে দাও এবং আমাদের ক্ষমা কর। নিশ্চয়ই তুমি সবকিছুর উপর সক্ষম।",
        english: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.",
        reference: "সূরা তাহরীম ৬৬:৮"
      },
      {
        id: "akhirah-7",
        titleBengali: "কিয়ামতে ছায়ার দোয়া",
        titleEnglish: "For Shade on Judgment Day",
        arabic: "اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّكَ",
        bengali: "হে আল্লাহ! যেদিন তোমার ছায়া ছাড়া কোন ছায়া থাকবে না, সেদিন আমাকে তোমার আরশের ছায়ায় স্থান দাও।",
        english: "O Allah, shade me under the shade of Your Throne on the Day when there is no shade except Your shade.",
        reference: "সহীহ বুখারী (হাদীস থেকে)"
      },
      {
        id: "akhirah-8",
        titleBengali: "পুলসিরাত পার হওয়ার দোয়া",
        titleEnglish: "For Crossing Sirat",
        arabic: "اللَّهُمَّ سَلِّمْنِي مِنَ الصِّرَاطِ وَأَجِزْنِي عَلَيْهِ بِسَلاَمٍ",
        bengali: "হে আল্লাহ! আমাকে পুলসিরাত থেকে নিরাপদে রাখ এবং শান্তির সাথে তা পার করাও।",
        english: "O Allah, keep me safe on the Sirat and let me pass over it in peace.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-9",
        titleBengali: "জান্নাতুল ফিরদাউসের দোয়া",
        titleEnglish: "For Firdaus",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْفِرْدَوْسَ الأَعْلَى مِنَ الْجَنَّةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে জান্নাতের সর্বোচ্চ ফিরদাউস চাই।",
        english: "O Allah, I ask You for the highest Firdaus of Paradise.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "akhirah-10",
        titleBengali: "আল্লাহকে দেখার দোয়া",
        titleEnglish: "For Seeing Allah",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ لَذَّةَ النَّظَرِ إِلَى وَجْهِكَ وَالشَّوْقَ إِلَى لِقَائِكَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তোমার চেহারার দিকে তাকানোর স্বাদ এবং তোমার সাক্ষাতের আকাঙ্ক্ষা চাই।",
        english: "O Allah, I ask You for the pleasure of looking at Your Face and the longing to meet You.",
        reference: "নাসাঈ"
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
        titleBengali: "মৃত ব্যক্তির জন্য দোয়া",
        titleEnglish: "Prayer for the Deceased",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        bengali: "হে আল্লাহ! তাকে ক্ষমা কর ও রহম কর। তাকে নিরাপদ রাখ ও মাফ কর। তার আতিথেয়তা সম্মানজনক কর, তার প্রবেশস্থান প্রশস্ত কর এবং তাকে পানি, বরফ ও শিশির দিয়ে ধৌত কর।",
        english: "O Allah, forgive him and have mercy on him. Keep him safe and pardon him. Honor his reception and make his entrance spacious. Wash him with water, snow and ice.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-2",
        titleBengali: "সকলের মাগফিরাতের দোয়া",
        titleEnglish: "Forgiveness for All",
        arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا",
        bengali: "হে আল্লাহ! আমাদের জীবিত ও মৃত, উপস্থিত ও অনুপস্থিত, ছোট ও বড় এবং পুরুষ ও নারী সকলকে ক্ষমা কর।",
        english: "O Allah, forgive our living and our dead, those present and those absent, our young and our old, our males and our females.",
        reference: "ইবনে মাজাহ, আবু দাউদ"
      },
      {
        id: "death-3",
        titleBengali: "ঈমানের উপর মৃত্যু কামনা",
        titleEnglish: "For Death on Faith",
        arabic: "اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلاَمِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ",
        bengali: "হে আল্লাহ! আমাদের মধ্যে যাকে তুমি জীবিত রাখ তাকে ইসলামের উপর জীবিত রাখ এবং যাকে মৃত্যু দাও তাকে ঈমানের উপর মৃত্যু দাও।",
        english: "O Allah, whoever You keep alive from among us, let him live upon Islam, and whoever You cause to die, let him die upon faith.",
        reference: "ইবনে মাজাহ, আবু দাউদ"
      },
      {
        id: "death-4",
        titleBengali: "মৃত্যুর পর সওয়াবের দোয়া",
        titleEnglish: "For Reward After Death",
        arabic: "اللَّهُمَّ لاَ تَحْرِمْنَا أَجْرَهُ، وَلاَ تَفْتِنَّا بَعْدَهُ",
        bengali: "হে আল্লাহ! আমাদেরকে তার সওয়াব থেকে বঞ্চিত করো না এবং তার পরে আমাদেরকে ফিতনায় ফেলো না।",
        english: "O Allah, do not deprive us of his reward and do not put us in trial after him.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-5",
        titleBengali: "জান্নাতে প্রবেশের দোয়া",
        titleEnglish: "Admission to Paradise",
        arabic: "اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ",
        bengali: "হে আল্লাহ! তার ঘরের বদলে তাকে উত্তম ঘর দাও, তার পরিবারের বদলে উত্তম পরিবার দাও এবং তাকে জান্নাতে প্রবেশ করাও।",
        english: "O Allah, replace his home with a better home, and his family with a better family, and admit him to Paradise.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-6",
        titleBengali: "কবরের ফিতনা থেকে রক্ষা",
        titleEnglish: "Protection in the Grave",
        arabic: "اللَّهُمَّ إِنَّ فُلاَنَ بْنَ فُلاَنٍ فِي ذِمَّتِكَ وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ",
        bengali: "হে আল্লাহ! অমুকের সন্তান অমুক তোমার জিম্মায় ও তোমার প্রতিবেশিত্বের রশিতে। তাকে কবরের ফিতনা ও জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "O Allah, so-and-so son of so-and-so is in Your protection and covenant. Protect him from the trial of the grave and the punishment of the Fire.",
        reference: "ইবনে মাজাহ, আবু দাউদ"
      },
      {
        id: "death-7",
        titleBengali: "মৃত ব্যক্তির চোখ বন্ধ করার সময়",
        titleEnglish: "When Closing Eyes of Deceased",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ",
        bengali: "হে আল্লাহ! তাকে ক্ষমা কর এবং হিদায়াতপ্রাপ্তদের মধ্যে তার মর্যাদা বৃদ্ধি কর। তার পরিবারে যারা থেকে গেল তাদের তার উত্তরসূরি বানাও।",
        english: "O Allah, forgive him and raise his rank among the rightly guided. Be a successor for his remaining family.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-8",
        titleBengali: "কবরে দোয়া",
        titleEnglish: "Dua at Grave",
        arabic: "السَّلاَمُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللهُ بِكُمْ لاَحِقُونَ، نَسْأَلُ اللهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
        bengali: "শান্তি বর্ষিত হোক তোমাদের উপর, হে মুমিন ও মুসলিমদের আবাসের অধিবাসীগণ। ইনশাআল্লাহ আমরা তোমাদের সাথে মিলিত হব। আমরা আল্লাহর কাছে আমাদের এবং তোমাদের জন্য ক্ষমা ও সুস্থতা চাই।",
        english: "Peace be upon you, O inhabitants of the graves from among the believers and Muslims. Indeed, if Allah wills, we will join you. We ask Allah for well-being for us and for you.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-9",
        titleBengali: "তালকীনের দোয়া",
        titleEnglish: "Talqeen Dua",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ، مُحَمَّدٌ رَسُولُ اللهِ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, মুহাম্মদ আল্লাহর রাসূল। (মৃত্যুপথযাত্রীকে স্মরণ করানো)",
        english: "There is no deity except Allah, Muhammad is the Messenger of Allah. (Remind the dying person)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-10",
        titleBengali: "শাহাদাতের দোয়া",
        titleEnglish: "For Martyrdom",
        arabic: "اللَّهُمَّ ارْزُقْنِي شَهَادَةً فِي سَبِيلِكَ وَاجْعَلْ مَوْتِي فِي بَلَدِ رَسُولِكَ",
        bengali: "হে আল্লাহ! আমাকে তোমার পথে শাহাদাত দান কর এবং আমার মৃত্যু তোমার রাসূলের শহরে হতে দাও।",
        english: "O Allah, grant me martyrdom in Your path and let my death be in the city of Your Messenger.",
        reference: "সহীহ বুখারী"
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
        titleBengali: "ঈদের শুভেচ্ছা",
        titleEnglish: "Eid Greeting",
        arabic: "تَقَبَّلَ اللهُ مِنَّا وَمِنْكُمْ",
        bengali: "আল্লাহ আমাদের ও আপনাদের থেকে কবুল করুন। (ঈদের দিনে)",
        english: "May Allah accept from us and from you. (On Eid day)",
        reference: "ফাতহুল বারী"
      },
      {
        id: "special-2",
        titleBengali: "জন্মদিনের দোয়া",
        titleEnglish: "Birthday Prayer",
        arabic: "اللَّهُمَّ بَارِكْ لَهُ فِيمَا رَزَقْتَهُ، وَتُبْ عَلَيْهِ، وَأَطِلْ عُمُرَهُ فِي طَاعَتِكَ",
        bengali: "হে আল্লাহ! তুমি তাকে যা দিয়েছ তাতে বরকত দাও, তার তাওবা কবুল কর এবং তোমার আনুগত্যে তার আয়ু দীর্ঘ কর। (জন্মদিনে)",
        english: "O Allah, bless him in what You have provided him, accept his repentance, and lengthen his life in Your obedience. (On birthday)",
        reference: "আল-আযকার"
      },
      {
        id: "special-3",
        titleBengali: "নবজাতকের জন্য দোয়া",
        titleEnglish: "For Newborn Baby",
        arabic: "بَارَكَ اللهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
        bengali: "আল্লাহ তোমাকে যা দান করেছেন তাতে বরকত দিন। তুমি দাতার শুকরিয়া আদায় কর। সে যেন পূর্ণ বয়সে পৌঁছে এবং তুমি তার সেবা পাও। (নবজাতকের জন্য)",
        english: "May Allah bless you in what He has given you. May you give thanks to the Giver. May he reach maturity and may you be granted his righteousness. (For newborn)",
        reference: "নাসাঈ"
      },
      {
        id: "special-4",
        titleBengali: "নতুন বছর/রমজানের দোয়া",
        titleEnglish: "New Year/Ramadan Start",
        arabic: "اللَّهُمَّ اجْعَلْهُ يَوْمَ خَيْرٍ وَبَرَكَةٍ",
        bengali: "হে আল্লাহ! এই দিনকে কল্যাণ ও বরকতের দিন বানাও। (নতুন বছর/রমজান শুরু)",
        english: "O Allah, make this a day of goodness and blessings. (New year/Ramadan start)",
        reference: "আল-আযকার"
      },
      {
        id: "special-5",
        titleBengali: "নতুন চাঁদ দেখার দোয়া",
        titleEnglish: "Upon Sighting New Moon",
        arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالإِيمَانِ، وَالسَّلاَمَةِ وَالإِسْلاَمِ، رَبِّي وَرَبُّكَ اللهُ",
        bengali: "হে আল্লাহ! এই চাঁদকে আমাদের উপর নিরাপত্তা, ঈমান, শান্তি ও ইসলামের সাথে উদিত কর। আমার ও তোমার রব আল্লাহ। (নতুন চাঁদ দেখলে)",
        english: "O Allah, let this moon appear on us with security, faith, safety and Islam. My Lord and your Lord is Allah. (Upon sighting the new moon)",
        reference: "তিরমিযী"
      },
      {
        id: "special-6",
        titleBengali: "বৃষ্টির দোয়া",
        titleEnglish: "Prayer During Rain",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        bengali: "হে আল্লাহ! উপকারী বৃষ্টি বর্ষণ কর। (বৃষ্টির সময়)",
        english: "O Allah, may it be a beneficial rain. (During rain)",
        reference: "সহীহ বুখারী"
      },
      {
        id: "special-7",
        titleBengali: "লাইলাতুল কদরের দোয়া",
        titleEnglish: "Laylatul Qadr Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        bengali: "হে আল্লাহ! নিশ্চয়ই তুমি ক্ষমাশীল, ক্ষমা করতে ভালোবাস, অতএব আমাকে ক্ষমা কর।",
        english: "O Allah, You are the Pardoner, You love to pardon, so pardon me.",
        reference: "তিরমিযী"
      },
      {
        id: "special-8",
        titleBengali: "আরাফাহ দিনের দোয়া",
        titleEnglish: "Arafah Day Dua",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই, প্রশংসাও তাঁর এবং তিনি সবকিছুর উপর ক্ষমতাবান।",
        english: "There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things omnipotent.",
        reference: "তিরমিযী (আরাফাহ দিনের শ্রেষ্ঠ দোয়া)"
      },
      {
        id: "special-9",
        titleBengali: "যিলহজ্জের প্রথম ১০ দিন",
        titleEnglish: "First 10 Days of Dhul Hijjah",
        arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، لاَ إِلَهَ إِلاَّ اللهُ، وَاللهُ أَكْبَرُ، اللهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ",
        bengali: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। আল্লাহ ছাড়া কোন ইলাহ নেই। আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড় এবং সকল প্রশংসা আল্লাহর।",
        english: "Allah is the greatest, Allah is the greatest. There is no deity except Allah. Allah is the greatest, Allah is the greatest, and to Allah belongs all praise.",
        reference: "দারাকুতনী (তাকবীরে তাশরীক)"
      },
      {
        id: "special-10",
        titleBengali: "মিরাজ রজনীর দোয়া",
        titleEnglish: "Isra wal Miraj Night",
        arabic: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى",
        bengali: "পবিত্র সেই সত্তা যিনি তাঁর বান্দাকে রাতে মসজিদুল হারাম থেকে মসজিদুল আকসায় নিয়ে গিয়েছিলেন। (তিলাওয়াত ও দোয়া)",
        english: "Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa. (Recite and make dua)",
        reference: "সূরা ইসরা ১৭:১"
      }
    ]
  }
];

export const getDuaCategory = (categoryId: string): DuaCategory | undefined => {
  return duaCategories.find(category => category.id === categoryId);
};
