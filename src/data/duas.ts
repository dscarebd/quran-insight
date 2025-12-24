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
  {
    id: "morning",
    nameEnglish: "Morning Duas",
    nameBengali: "সকালের দোয়া",
    icon: "Sunrise",
    duas: [
      {
        id: "morning-1",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
        bengali: "আমরা সকালে উপনীত হলাম এবং সকালে উপনীত হল আল্লাহর রাজত্ব। সমস্ত প্রশংসা আল্লাহর জন্য। একমাত্র আল্লাহ ছাড়া কোন ইলাহ নেই, তাঁর কোন শরীক নেই।",
        english: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        reference: "Muslim"
      },
      {
        id: "morning-2",
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        bengali: "হে আল্লাহ! তোমারই অনুগ্রহে আমরা সকালে উপনীত হয়েছি, তোমারই অনুগ্রহে সন্ধ্যায় উপনীত হই, তোমারই ইচ্ছায় জীবিত থাকি, তোমারই ইচ্ছায় মৃত্যুবরণ করি এবং তোমার কাছেই পুনরুত্থিত হব।",
        english: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
        reference: "Tirmidhi"
      },
      {
        id: "morning-3",
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        bengali: "আল্লাহ পবিত্র এবং তাঁর জন্যই সকল প্রশংসা।",
        english: "Glory is to Allah and praise is to Him. (100 times)",
        reference: "Bukhari, Muslim"
      }
    ]
  },
  {
    id: "evening",
    nameEnglish: "Evening Duas",
    nameBengali: "সন্ধ্যার দোয়া",
    icon: "Sunset",
    duas: [
      {
        id: "evening-1",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং সন্ধ্যায় উপনীত হল আল্লাহর রাজত্ব। সমস্ত প্রশংসা আল্লাহর জন্য। একমাত্র আল্লাহ ছাড়া কোন ইলাহ নেই, তাঁর কোন শরীক নেই।",
        english: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        reference: "Muslim"
      },
      {
        id: "evening-2",
        arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
        bengali: "হে আল্লাহ! তোমারই অনুগ্রহে আমরা সন্ধ্যায় উপনীত হয়েছি, তোমারই অনুগ্রহে সকালে উপনীত হই, তোমারই ইচ্ছায় জীবিত থাকি, তোমারই ইচ্ছায় মৃত্যুবরণ করি এবং তোমার কাছেই প্রত্যাবর্তন।",
        english: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die and unto You is our return.",
        reference: "Tirmidhi"
      }
    ]
  },
  {
    id: "before-sleep",
    nameEnglish: "Before Sleeping",
    nameBengali: "ঘুমানোর আগে",
    icon: "Moon",
    duas: [
      {
        id: "sleep-1",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        bengali: "হে আল্লাহ! তোমার নামে মৃত্যুবরণ করি এবং জীবিত হই।",
        english: "In Your name O Allah, I die and I live.",
        reference: "Bukhari"
      },
      {
        id: "sleep-2",
        arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
        bengali: "হে আল্লাহ! যেদিন তুমি তোমার বান্দাদের পুনরুত্থিত করবে সেদিন আমাকে তোমার আযাব থেকে রক্ষা কর।",
        english: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
        reference: "Abu Dawud, Tirmidhi"
      },
      {
        id: "sleep-3",
        arabic: "اللَّهُمَّ بِاسْـمِكَ أَمُوتُ وَأَحْيَا",
        bengali: "হে আল্লাহ! তোমার নামেই আমি মৃত্যুবরণ করি এবং জীবিত থাকি।",
        english: "O Allah, in Your name I die and I live.",
        reference: "Bukhari"
      }
    ]
  },
  {
    id: "after-waking",
    nameEnglish: "After Waking Up",
    nameBengali: "ঘুম থেকে উঠে",
    icon: "Sun",
    duas: [
      {
        id: "wake-1",
        arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        bengali: "সমস্ত প্রশংসা সেই আল্লাহর জন্য যিনি মৃত্যুর পর আমাদের জীবিত করেছেন এবং তাঁরই কাছে পুনরুত্থান।",
        english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
        reference: "Bukhari"
      }
    ]
  },
  {
    id: "before-eating",
    nameEnglish: "Before Eating",
    nameBengali: "খাওয়ার আগে",
    icon: "Utensils",
    duas: [
      {
        id: "eat-before-1",
        arabic: "بِسْمِ اللهِ",
        bengali: "আল্লাহর নামে (শুরু করছি)।",
        english: "In the name of Allah.",
        reference: "Abu Dawud, Tirmidhi"
      },
      {
        id: "eat-before-2",
        arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
        bengali: "আল্লাহর নামে এবং আল্লাহর বরকতে (শুরু করছি)।",
        english: "In the name of Allah and with the blessings of Allah.",
        reference: "Abu Dawud"
      }
    ]
  },
  {
    id: "after-eating",
    nameEnglish: "After Eating",
    nameBengali: "খাওয়ার পরে",
    icon: "UtensilsCrossed",
    duas: [
      {
        id: "eat-after-1",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন ও পান করালেন এবং আমাদেরকে মুসলিম বানিয়েছেন।",
        english: "All praise is for Allah who fed us and gave us drink, and made us Muslims.",
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "entering-masjid",
    nameEnglish: "Entering Masjid",
    nameBengali: "মসজিদে প্রবেশ",
    icon: "Building",
    duas: [
      {
        id: "masjid-enter-1",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        bengali: "হে আল্লাহ! আমার জন্য তোমার রহমতের দরজাসমূহ খুলে দাও।",
        english: "O Allah, open the gates of Your mercy for me.",
        reference: "Muslim"
      },
      {
        id: "masjid-enter-2",
        arabic: "أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ",
        bengali: "আমি মহান আল্লাহর, তাঁর সম্মানিত চেহারার এবং তাঁর চিরন্তন কর্তৃত্বের আশ্রয় নিচ্ছি বিতাড়িত শয়তান থেকে।",
        english: "I take refuge with Allah, The Supreme and with His Noble Face, and His eternal authority from the accursed devil.",
        reference: "Abu Dawud"
      }
    ]
  },
  {
    id: "leaving-masjid",
    nameEnglish: "Leaving Masjid",
    nameBengali: "মসজিদ থেকে বের হওয়া",
    icon: "DoorOpen",
    duas: [
      {
        id: "masjid-leave-1",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তোমার অনুগ্রহ প্রার্থনা করি।",
        english: "O Allah, I ask You from Your favor.",
        reference: "Muslim"
      }
    ]
  },
  {
    id: "before-travel",
    nameEnglish: "Before Traveling",
    nameBengali: "সফরে বের হওয়ার আগে",
    icon: "Plane",
    duas: [
      {
        id: "travel-before-1",
        arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        bengali: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। পবিত্র সেই সত্তা যিনি একে আমাদের বশীভূত করে দিয়েছেন, অন্যথায় আমরা একে বশ করতে সক্ষম ছিলাম না। আর নিশ্চয়ই আমরা আমাদের রবের কাছে প্রত্যাবর্তনকারী।",
        english: "Allah is the greatest, Allah is the greatest, Allah is the greatest. How perfect He is, The One Who has placed this at our service, and we ourselves would not have been capable of that, and to our Lord is our final destiny.",
        reference: "Muslim, Tirmidhi"
      }
    ]
  },
  {
    id: "during-travel",
    nameEnglish: "During Travel",
    nameBengali: "সফরের সময়",
    icon: "Car",
    duas: [
      {
        id: "travel-during-1",
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى",
        bengali: "হে আল্লাহ! আমরা আমাদের এই সফরে তোমার কাছে নেকী ও তাকওয়া এবং এমন আমল প্রার্থনা করছি যা তুমি পছন্দ কর।",
        english: "O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You.",
        reference: "Muslim"
      }
    ]
  },
  {
    id: "entering-home",
    nameEnglish: "Entering Home",
    nameBengali: "ঘরে প্রবেশ",
    icon: "Home",
    duas: [
      {
        id: "home-enter-1",
        arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا",
        bengali: "আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে আমরা বের হলাম এবং আমাদের রব আল্লাহর উপর আমরা ভরসা করলাম।",
        english: "In the name of Allah we enter and in the name of Allah we leave, and upon our Lord we place our trust.",
        reference: "Abu Dawud"
      }
    ]
  },
  {
    id: "leaving-home",
    nameEnglish: "Leaving Home",
    nameBengali: "ঘর থেকে বের হওয়া",
    icon: "LogOut",
    duas: [
      {
        id: "home-leave-1",
        arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
        bengali: "আল্লাহর নামে (বের হচ্ছি), আল্লাহর উপর ভরসা করলাম, আল্লাহর সাহায্য ছাড়া কোন উপায় নেই এবং কোন শক্তি নেই।",
        english: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "before-wudu",
    nameEnglish: "Before Wudu",
    nameBengali: "অযুর আগে",
    icon: "Droplets",
    duas: [
      {
        id: "wudu-before-1",
        arabic: "بِسْمِ اللهِ",
        bengali: "আল্লাহর নামে (শুরু করছি)।",
        english: "In the name of Allah.",
        reference: "Abu Dawud, Ibn Majah"
      }
    ]
  },
  {
    id: "after-wudu",
    nameEnglish: "After Wudu",
    nameBengali: "অযুর পরে",
    icon: "Sparkles",
    duas: [
      {
        id: "wudu-after-1",
        arabic: "أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ",
        bengali: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই। আমি আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মাদ তাঁর বান্দা ও রাসূল।",
        english: "I bear witness that none has the right to be worshipped except Allah, alone, without partner, and I bear witness that Muhammad is His slave and Messenger.",
        reference: "Muslim"
      },
      {
        id: "wudu-after-2",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
        bengali: "হে আল্লাহ! আমাকে তাওবাকারীদের অন্তর্ভুক্ত কর এবং পবিত্রতা অর্জনকারীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make me of those who return to You often in repentance and make me of those who remain clean and pure.",
        reference: "Tirmidhi"
      }
    ]
  },
  {
    id: "entering-bathroom",
    nameEnglish: "Entering Bathroom",
    nameBengali: "বাথরুমে প্রবেশ",
    icon: "Bath",
    duas: [
      {
        id: "bathroom-enter-1",
        arabic: "بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
        bengali: "আল্লাহর নামে (প্রবেশ করছি)। হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই পুরুষ ও মহিলা শয়তান থেকে।",
        english: "In the name of Allah. O Allah, I take refuge with You from all evil and evil-doers.",
        reference: "Bukhari, Muslim"
      }
    ]
  },
  {
    id: "leaving-bathroom",
    nameEnglish: "Leaving Bathroom",
    nameBengali: "বাথরুম থেকে বের হওয়া",
    icon: "DoorClosed",
    duas: [
      {
        id: "bathroom-leave-1",
        arabic: "غُفْرَانَكَ",
        bengali: "(হে আল্লাহ!) তোমার ক্ষমা চাই।",
        english: "(O Allah) I seek Your forgiveness.",
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "during-rain",
    nameEnglish: "During Rain",
    nameBengali: "বৃষ্টির সময়",
    icon: "CloudRain",
    duas: [
      {
        id: "rain-1",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        bengali: "হে আল্লাহ! উপকারী বৃষ্টি বর্ষণ কর।",
        english: "O Allah, may it be a beneficial rain.",
        reference: "Bukhari"
      },
      {
        id: "rain-2",
        arabic: "مُطِرْنَا بِفَضْلِ اللهِ وَرَحْمَتِهِ",
        bengali: "আল্লাহর অনুগ্রহ ও রহমতে আমাদের উপর বৃষ্টি বর্ষিত হয়েছে।",
        english: "We have been given rain by the grace and mercy of Allah.",
        reference: "Bukhari, Muslim"
      }
    ]
  },
  {
    id: "when-sick",
    nameEnglish: "When Sick",
    nameBengali: "অসুস্থতায়",
    icon: "Heart",
    duas: [
      {
        id: "sick-1",
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
        bengali: "হে আল্লাহ! মানুষের রব! কষ্ট দূর কর, আরোগ্য দান কর। তুমিই আরোগ্যদানকারী। তোমার আরোগ্য ছাড়া কোন আরোগ্য নেই। এমন আরোগ্য দান কর যা কোন রোগ অবশিষ্ট রাখে না।",
        english: "O Allah, Lord of mankind, remove the affliction. Cure him, You are the One who cures. There is no cure except Your cure. Grant a cure that leaves no illness.",
        reference: "Bukhari, Muslim"
      },
      {
        id: "sick-2",
        arabic: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        bengali: "আমি মহান আল্লাহর কাছে, যিনি মহান আরশের রব, তোমাকে সুস্থ করার জন্য দোয়া করি। (৭ বার)",
        english: "I ask Allah, the Mighty, the Lord of the Mighty Throne, to cure you. (7 times)",
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "istikhara",
    nameEnglish: "Istikhara",
    nameBengali: "ইস্তেখারা",
    icon: "HelpCircle",
    duas: [
      {
        id: "istikhara-1",
        arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ، وَتَعْلَمُ وَلاَ أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ",
        bengali: "হে আল্লাহ! আমি তোমার জ্ঞানের মাধ্যমে তোমার কাছে কল্যাণ চাই, তোমার ক্ষমতার মাধ্যমে শক্তি চাই এবং তোমার মহান অনুগ্রহ থেকে চাই। কেননা, তুমি সক্ষম আর আমি সক্ষম নই, তুমি জান আর আমি জানি না এবং তুমিই গায়েবের জ্ঞাতা।",
        english: "O Allah, I seek Your guidance by virtue of Your knowledge, and I seek ability by virtue of Your power, and I ask You of Your great bounty. You have power; I have none. And You know; I know not. You are the Knower of hidden things.",
        reference: "Bukhari"
      }
    ]
  },
  {
    id: "forgiveness",
    nameEnglish: "Seeking Forgiveness",
    nameBengali: "ক্ষমা প্রার্থনা",
    icon: "RefreshCw",
    duas: [
      {
        id: "forgive-1",
        arabic: "أَسْتَغْفِرُ اللهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই, যিনি ছাড়া কোন ইলাহ নেই, তিনি চিরঞ্জীব, চিরস্থায়ী এবং আমি তাঁর কাছে তাওবা করছি।",
        english: "I seek the forgiveness of Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence, and I repent to Him.",
        reference: "Abu Dawud, Tirmidhi"
      },
      {
        id: "forgive-2",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
        bengali: "হে আল্লাহ! তুমি আমার রব। তুমি ছাড়া কোন ইলাহ নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা। আমি সাধ্যমত তোমার প্রতিশ্রুতি ও অঙ্গীকারের উপর আছি।",
        english: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide to Your covenant and promise as best I can.",
        reference: "Bukhari"
      },
      {
        id: "forgive-3",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর এবং আমার তাওবা কবুল কর। নিশ্চয়ই তুমি তাওবা কবুলকারী, দয়ালু।",
        english: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
        reference: "Tirmidhi"
      }
    ]
  }
];

export const getDuaCategory = (categoryId: string): DuaCategory | undefined => {
  return duaCategories.find(cat => cat.id === categoryId);
};
