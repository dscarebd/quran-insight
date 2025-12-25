export interface Dua {
  id: string;
  titleBengali?: string;
  titleEnglish?: string;
  arabic: string;
  transliteration?: string;
  transliterationBengali?: string;
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
        titleBengali: "রাগ নিয়ন্ত্রণের দোয়া",
        titleEnglish: "Anger Control",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaytanir-rajim",
        bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই",
        english: "I seek refuge in Allah from the accursed Satan",
        reference: "সহীহ বুখারী, হাদিস নং ৩২৮২"
      },
      {
        id: "daily-2",
        titleBengali: "খাবার শুরুর দোয়া",
        titleEnglish: "Before Eating",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        bengali: "আল্লাহর নামে (খাবার শুরু করছি)",
        english: "In the name of Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২০১৮"
      },
      {
        id: "daily-3",
        titleBengali: "খাবার শেষে দোয়া",
        titleEnglish: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا",
        transliteration: "Alhamdulillahilladhi at'amani hadha",
        bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাকে এই খাবার দিয়েছেন",
        english: "Praise be to Allah who fed me this",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৫৮"
      },
      {
        id: "daily-4",
        titleBengali: "ঘুমানোর আগে দোয়া",
        titleEnglish: "Before Sleeping",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        bengali: "হে আল্লাহ আপনার নামে আমি ঘুমাই ও জাগি",
        english: "In Your name I die and live",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩২৪"
      },
      {
        id: "daily-5",
        titleBengali: "ঘুম থেকে ওঠার দোয়া",
        titleEnglish: "After Waking Up",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا",
        transliteration: "Alhamdulillahil-ladhi ahyana",
        bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের জীবিত করেছেন",
        english: "Praise be to Allah who gave us life",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩১২"
      },
      {
        id: "daily-6",
        titleBengali: "টয়লেটে প্রবেশের দোয়া",
        titleEnglish: "Entering Toilet",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ",
        transliteration: "Allahumma inni a'udhu bika minal-khubthi",
        bengali: "হে আল্লাহ অপবিত্রতা থেকে আপনার আশ্রয় চাই",
        english: "O Allah I seek refuge in You from impurity",
        reference: "সহীহ বুখারী, হাদিস নং ১৪২"
      },
      {
        id: "daily-7",
        titleBengali: "টয়লেট থেকে বের হওয়ার দোয়া",
        titleEnglish: "Leaving Toilet",
        arabic: "غُفْرَانَكَ",
        transliteration: "Ghufranak",
        bengali: "হে আল্লাহ আপনার ক্ষমা চাই",
        english: "I seek Your forgiveness",
        reference: "সুনান আবু দাউদ, হাদিস নং ৩০"
      },
      {
        id: "daily-8",
        titleBengali: "বাড়ি থেকে বের হওয়ার দোয়া",
        titleEnglish: "Leaving Home",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Bismillahi tawakkaltu 'alallah",
        bengali: "আল্লাহর উপর ভরসা করে বের হচ্ছি",
        english: "In the name of Allah I trust in Allah",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৫"
      },
      {
        id: "daily-9",
        titleBengali: "বাড়িতে প্রবেশের দোয়া",
        titleEnglish: "Entering Home",
        arabic: "بِسْمِ اللَّهِ وَلَجْنَا",
        transliteration: "Bismillahi walajna",
        bengali: "আল্লাহর নামে আমরা ঘরে প্রবেশ করছি",
        english: "In the name of Allah we enter",
        reference: "সহীহ মুসলিম, হাদিস নং ২০১৮"
      },
      {
        id: "daily-10",
        titleBengali: "মসজিদে প্রবেশের দোয়া",
        titleEnglish: "Entering Mosque",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration: "Allahumma iftah li abwaba rahmatik",
        bengali: "হে আল্লাহ আপনার রহমতের দরজা খুলে দিন",
        english: "O Allah open the doors of Your mercy",
        reference: "সহীহ মুসলিম, হাদিস নং ৭১৩"
      },
      {
        id: "daily-11",
        titleBengali: "মসজিদ থেকে বের হওয়ার দোয়া",
        titleEnglish: "Leaving Mosque",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliteration: "Allahumma inni as'aluka min fadlik",
        bengali: "হে আল্লাহ আপনার অনুগ্রহ চাই",
        english: "O Allah, I ask You from Your bounty",
        reference: "সহীহ মুসলিম, হাদিস নং ৭১৩"
      },
      {
        id: "daily-12",
        titleBengali: "পড়াশোনার দোয়া",
        titleEnglish: "Before Study",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        bengali: "হে আমার রব আমাকে জ্ঞান বাড়িয়ে দিন",
        english: "My Lord, increase me in knowledge",
        reference: "আল-কুরআন, সূরা তা-হা ২০:১১৪"
      },
      {
        id: "daily-13",
        titleBengali: "ভয় লাগলে দোয়া",
        titleEnglish: "When Afraid",
        arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        transliteration: "Hasbunallahu wa ni'mal wakil",
        bengali: "আল্লাহই আমাদের জন্য যথেষ্ট",
        english: "Allah is sufficient for us",
        reference: "আল-কুরআন, সূরা আলে ইমরান ৩:১৭৩"
      },
      {
        id: "daily-14",
        titleBengali: "দুশ্চিন্তা দূর করার দোয়া",
        titleEnglish: "Anxiety Relief",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        bengali: "হে আল্লাহ দুশ্চিন্তা ও দুঃখ থেকে রক্ষা করুন",
        english: "O Allah, protect me from anxiety and sorrow",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "daily-15",
        titleBengali: "বৃষ্টি হলে দোয়া",
        titleEnglish: "During Rain",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        transliteration: "Allahumma sayyiban nafi'a",
        bengali: "হে আল্লাহ একে কল্যাণকর বৃষ্টি বানান",
        english: "O Allah, make it a beneficial rain",
        reference: "সহীহ বুখারী, হাদিস নং ১০৩২"
      },
      {
        id: "daily-16",
        titleBengali: "বৃষ্টির পর দোয়া",
        titleEnglish: "After Rain",
        arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
        transliteration: "Mutirna bifadlillahi wa rahmatih",
        bengali: "আমরা আল্লাহর অনুগ্রহে বৃষ্টি পেয়েছি",
        english: "We were given rain by Allah's grace",
        reference: "সহীহ বুখারী, হাদিস নং ৮৪৬"
      },
      {
        id: "daily-17",
        titleBengali: "সফর শুরুর দোয়া",
        titleEnglish: "Travel Start",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
        transliteration: "Subhanalladhi sakhkhara lana hadha",
        bengali: "যিনি এটি আমাদের অধীন করেছেন তিনি পবিত্র",
        english: "Glory be to Him who subjected this to us",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২"
      },
      {
        id: "daily-18",
        titleBengali: "সফর শেষে দোয়া",
        titleEnglish: "Return from Travel",
        arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ",
        transliteration: "Ayibuna ta'ibuna 'abidun",
        bengali: "আমরা প্রত্যাবর্তনকারী ও তওবাকারী",
        english: "We return repentant worshippers",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪৪"
      },
      {
        id: "daily-19",
        titleBengali: "ঋণ থেকে মুক্তির দোয়া",
        titleEnglish: "Debt Relief",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ",
        transliteration: "Allahummak-fini bihalalik",
        bengali: "হে আল্লাহ হালাল দিয়ে আমাকে যথেষ্ট করুন",
        english: "O Allah, suffice me with what is lawful",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৬৩"
      },
      {
        id: "daily-20",
        titleBengali: "কষ্টে পড়লে দোয়া",
        titleEnglish: "Distress",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ",
        transliteration: "La ilaha illa anta subhanak",
        bengali: "আপনি ছাড়া কোনো উপাস্য নেই",
        english: "None has the right to be worshipped but You",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫০৫"
      },
      {
        id: "daily-21",
        titleBengali: "সাধারণ ক্ষমা প্রার্থনার দোয়া",
        titleEnglish: "General Forgiveness",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",
        transliteration: "Rabbi'ghfir li wa tub 'alayya",
        bengali: "হে আমার রব আমাকে ক্ষমা করুন ও আমার তওবা কবুল করুন",
        english: "My Lord forgive me and accept my repentance",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৩৪"
      },
      {
        id: "daily-22",
        titleBengali: "অকল্যাণ থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Evil",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ",
        transliteration: "Allahumma inni a'udhu bika min sharri ma khalaqt",
        bengali: "হে আল্লাহ আপনার সৃষ্ট সব অকল্যাণ থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from the evil of what You created",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৮"
      },
      {
        id: "daily-23",
        titleBengali: "উত্তম চরিত্রের দোয়া",
        titleEnglish: "Good Character",
        arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ",
        transliteration: "Allahumma ihdini li-ahsanil-akhlaq",
        bengali: "হে আল্লাহ আমাকে উত্তম চরিত্র দান করুন",
        english: "O Allah guide me to the best manners",
        reference: "সহীহ মুসলিম, হাদিস নং ৭৭১"
      },
      {
        id: "daily-24",
        titleBengali: "ধৈর্যের দোয়া",
        titleEnglish: "Patience",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
        transliteration: "Rabbana afrigh 'alayna sabra",
        bengali: "হে আমাদের রব আমাদের ওপর ধৈর্য ঢেলে দিন",
        english: "Our Lord pour patience upon us",
        reference: "আল-কুরআন, সূরা বাকারা ২:২৫০"
      },
      {
        id: "daily-25",
        titleBengali: "হেদায়াতের দোয়া",
        titleEnglish: "Guidance",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinas-siratal-mustaqim",
        bengali: "আমাদের সরল পথে পরিচালিত করুন",
        english: "Guide us to the straight path",
        reference: "আল-কুরআন, সূরা ফাতিহা ১:৬"
      },
      {
        id: "daily-26",
        titleBengali: "রাতে নিরাপত্তার দোয়া",
        titleEnglish: "Night Protection",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ",
        transliteration: "A'udhu bikalimatillahit-tammati",
        bengali: "আমি আল্লাহর পূর্ণ বাক্যের আশ্রয় চাই",
        english: "I seek refuge in the perfect words of Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৯"
      },
      {
        id: "daily-27",
        titleBengali: "সুস্থতার দোয়া",
        titleEnglish: "Health and Wellness",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي",
        transliteration: "Allahumma 'afini fi badani",
        bengali: "হে আল্লাহ আমার শরীরে সুস্থতা দান করুন",
        english: "O Allah grant me health in my body",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৯৯"
      },
      {
        id: "daily-28",
        titleBengali: "কৃতজ্ঞতার দোয়া",
        titleEnglish: "Gratitude",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ",
        transliteration: "Allahumma a'inni 'ala dhikrika",
        bengali: "হে আল্লাহ আপনার স্মরণে আমাকে সাহায্য করুন",
        english: "O Allah help me to remember You",
        reference: "সুনান আবু দাউদ, হাদিস নং ১৫২২"
      },
      {
        id: "daily-29",
        titleBengali: "হিংসা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Envy",
        arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration: "Wa min sharri hasidin idha hasad",
        bengali: "হিংসুকের অনিষ্ট থেকে আমাদের রক্ষা করুন",
        english: "From the evil of an envier when he envies",
        reference: "আল-কুরআন, সূরা ফালাক ১১৩:৫"
      },
      {
        id: "daily-30",
        titleBengali: "আল্লাহর উপর ভরসার দোয়া",
        titleEnglish: "Trust in Allah",
        arabic: "تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Tawakkaltu 'alallah",
        bengali: "আমি আল্লাহর ওপর ভরসা করেছি",
        english: "I place my trust in Allah",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৫"
      },
      {
        id: "daily-31",
        titleBengali: "সুন্দর পরিণতির দোয়া",
        titleEnglish: "Good Ending",
        arabic: "اللَّهُمَّ اخْتِمْ لَنَا بِالصَّالِحَاتِ",
        transliteration: "Allahumma ikhtim lana bis-salihat",
        bengali: "হে আল্লাহ আমাদের শেষটা নেক আমল দিয়ে করুন",
        english: "O Allah grant us a righteous ending",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১২১৭৩"
      },
      {
        id: "daily-32",
        titleBengali: "পরিবারের জন্য দোয়া",
        titleEnglish: "Family Prayer",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ",
        transliteration: "Rabbi'j'alni muqimas-salah",
        bengali: "হে আমার রব আমাকে নামাজ কায়েমকারী করুন",
        english: "My Lord make me an establisher of prayer",
        reference: "আল-কুরআন, সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "daily-33",
        titleBengali: "ঋণ থেকে আশ্রয়ের দোয়া",
        titleEnglish: "Protection from Debt",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَغْرَمِ",
        transliteration: "Allahumma inni a'udhu bika minal-maghram",
        bengali: "হে আল্লাহ ঋণের বোঝা থেকে রক্ষা করুন",
        english: "O Allah protect me from debt",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "daily-34",
        titleBengali: "তৃপ্তির দোয়া",
        titleEnglish: "Contentment",
        arabic: "اللَّهُمَّ قَنِّعْنِي بِمَا رَزَقْتَنِي",
        transliteration: "Allahumma qanni'ni bima razaqtani",
        bengali: "হে আল্লাহ যা দিয়েছেন তাতে আমাকে সন্তুষ্ট করুন",
        english: "O Allah make me content with what You gave",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৩১১৯"
      },
      {
        id: "daily-35",
        titleBengali: "হিংসা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Envy",
        arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration: "Wa min sharri hasidin idha hasad",
        bengali: "হিংসুকের অনিষ্ট থেকে আমাদের রক্ষা করুন",
        english: "From the evil of an envier when he envies",
        reference: "আল-কুরআন, সূরা ফালাক ১১৩:৫"
      },
      {
        id: "daily-36",
        titleBengali: "হালাল রিজিকের দোয়া",
        titleEnglish: "Halal Provision",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا",
        transliteration: "Allahumma inni as'aluka rizqan tayyiba",
        bengali: "হে আল্লাহ আমাকে হালাল রিজিক দিন",
        english: "O Allah grant me lawful provision",
        reference: "সুনান ইবনে মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "daily-37",
        titleBengali: "ভ্রান্তি থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Misguidance",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا",
        transliteration: "Rabbana la tuzigh qulubana",
        bengali: "হে আমাদের রব আমাদের হৃদয়কে বিচ্যুত করবেন না",
        english: "Our Lord do not deviate our hearts",
        reference: "আল-কুরআন, সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "daily-38",
        titleBengali: "আল্লাহর ওপর ভরসার দোয়া",
        titleEnglish: "Trust in Allah",
        arabic: "تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Tawakkaltu 'alallah",
        bengali: "আমি আল্লাহর ওপর ভরসা করেছি",
        english: "I place my trust in Allah",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৫"
      },
      {
        id: "daily-39",
        titleBengali: "হৃদয় পবিত্রতার দোয়া",
        titleEnglish: "Purification of Heart",
        arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي",
        transliteration: "Allahumma tahhir qalbi",
        bengali: "হে আল্লাহ আমার হৃদয় পবিত্র করুন",
        english: "O Allah purify my heart",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৭৮৯৬"
      },
      {
        id: "daily-40",
        titleBengali: "সকালের নিরাপত্তার দোয়া",
        titleEnglish: "Morning Protection",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal-mulku lillah",
        bengali: "আমরা সকালে উপনীত হলাম—সব কর্তৃত্ব আল্লাহর",
        english: "We have entered the morning and all dominion belongs to Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩"
      },
      {
        id: "daily-41",
        titleBengali: "সন্ধ্যার নিরাপত্তার দোয়া",
        titleEnglish: "Evening Protection",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        transliteration: "Amsayna wa amsal-mulku lillah",
        bengali: "আমরা সন্ধ্যায় উপনীত হলাম—সব কর্তৃত্ব আল্লাহর",
        english: "We have entered the evening and all dominion belongs to Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩"
      },
      {
        id: "daily-42",
        titleBengali: "জাহান্নাম থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        transliteration: "Allahumma ajirni minan-nar",
        bengali: "হে আল্লাহ আমাকে জাহান্নাম থেকে রক্ষা করুন",
        english: "O Allah protect me from Hellfire",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৯"
      },
      {
        id: "daily-43",
        titleBengali: "ঈমানের সাথে মৃত্যুর দোয়া",
        titleEnglish: "Good Death",
        arabic: "اللَّهُمَّ تَوَفَّنِي مُسْلِمًا",
        transliteration: "Allahumma tawaffani musliman",
        bengali: "হে আল্লাহ আমাকে মুসলিম অবস্থায় মৃত্যু দিন",
        english: "O Allah let me die as a Muslim",
        reference: "আল-কুরআন, সূরা ইউসুফ ১২:১০১"
      },
      {
        id: "daily-44",
        titleBengali: "হঠাৎ মৃত্যুর আশ্রয়",
        titleEnglish: "Protection from Sudden Death",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مَوْتِ الْفُجْأَةِ",
        transliteration: "Allahumma inni a'udhu bika min mawt-il-fuja'ah",
        bengali: "হে আল্লাহ হঠাৎ মৃত্যু থেকে আমাকে রক্ষা করুন",
        english: "O Allah I seek refuge in You from sudden death",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১২১৬৫"
      },
      {
        id: "daily-45",
        titleBengali: "হৃদয়ে নূরের দোয়া",
        titleEnglish: "Light in Heart",
        arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا",
        transliteration: "Allahumma-j'al fi qalbi noora",
        bengali: "হে আল্লাহ আমার হৃদয়ে নূর দান করুন",
        english: "O Allah place light in my heart",
        reference: "সহীহ মুসলিম, হাদিস নং ৭৬৩"
      },
      {
        id: "daily-46",
        titleBengali: "নজর লাগা থেকে রক্ষা",
        titleEnglish: "Protection from Evil Eye",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ",
        transliteration: "A'udhu bikalimatillahit-tammati",
        bengali: "আমি আল্লাহর পূর্ণ বাক্যের আশ্রয় চাই",
        english: "I seek refuge in the perfect words of Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৯"
      },
      {
        id: "daily-47",
        titleBengali: "দুশ্চিন্তা দূর করার দোয়া",
        titleEnglish: "Relief from Worry",
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahla",
        bengali: "হে আল্লাহ আপনি সহজ না করলে কিছুই সহজ নয়",
        english: "O Allah nothing is easy except what You make easy",
        reference: "ইবনে হিব্বান, হাদিস নং ২৪২৭"
      },
      {
        id: "daily-48",
        titleBengali: "গুনাহ থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Sin",
        arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ",
        transliteration: "Allahumma ba'id bayni wa bayna khatayaya",
        bengali: "হে আল্লাহ আমার ও আমার গুনাহর মাঝে দূরত্ব সৃষ্টি করুন",
        english: "O Allah distance me from my sins",
        reference: "সহীহ বুখারী, হাদিস নং ৭৪৪"
      },
      {
        id: "daily-49",
        titleBengali: "ঈমান মজবুত করার দোয়া",
        titleEnglish: "Strong Faith",
        arabic: "اللَّهُمَّ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        transliteration: "Allahumma thabbit qalbi 'ala dinik",
        bengali: "হে আল্লাহ আমার হৃদয়কে আপনার দ্বীনের ওপর স্থির রাখুন",
        english: "O Allah keep my heart firm upon Your religion",
        reference: "সুনান তিরমিযী, হাদিস নং ২১৪০"
      },
      {
        id: "daily-50",
        titleBengali: "জান্নাত প্রার্থনার দোয়া",
        titleEnglish: "Jannah Prayer",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
        transliteration: "Allahumma inni as'alukal-jannah",
        bengali: "হে আল্লাহ আমি আপনার কাছে জান্নাত চাই",
        english: "O Allah I ask You for Paradise",
        reference: "সুনান আবু দাউদ, হাদিস নং ৭৯২"
      }
    ]
  },

  // 2. Morning & Evening Dhikr (সকাল-সন্ধ্যার যিকর)
  {
    id: "morning-evening",
    nameEnglish: "Morning & Evening Dhikr",
    nameBengali: "সকাল-সন্ধ্যার যিকর",
    icon: "Sunrise",
    duas: [
      { id: "me-001", titleBengali: "সকালের ঘোষণা", titleEnglish: "Morning Declaration", arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ", transliteration: "Asbahna wa asbahal-mulku lillah", transliterationBengali: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ", bengali: "আমরা সকালে উপনীত হয়েছি এবং সমস্ত কর্তৃত্ব আল্লাহর", english: "We have entered the morning and all dominion belongs to Allah", reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩" },
      { id: "me-002", titleBengali: "সন্ধ্যার ঘোষণা", titleEnglish: "Evening Declaration", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ", transliteration: "Amsayna wa amsal-mulku lillah", transliterationBengali: "আমসাইনা ওয়া আমসাল মুলকু লিল্লাহ", bengali: "আমরা সন্ধ্যায় উপনীত হয়েছি এবং সমস্ত কর্তৃত্ব আল্লাহর", english: "We have entered the evening and all dominion belongs to Allah", reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩" },
      { id: "me-003", titleBengali: "নিরাপত্তার দোয়া", titleEnglish: "Protection Dua", arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ", transliteration: "Bismillahil-ladhi la yadurru", transliterationBengali: "বিসমিল্লাহিল্লাজি লা ইয়াদুর্রু", bengali: "আল্লাহর নামে—যাঁর নামে কিছুই ক্ষতি করতে পারে না", english: "In the name of Allah with whose name nothing can harm", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৮৮" },
      { id: "me-004", titleBengali: "সুস্থতার দোয়া", titleEnglish: "Wellbeing Dua", arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي", transliteration: "Allahumma 'afini fi badani", transliterationBengali: "আল্লাহুম্মা আফিনি ফি বাদানি", bengali: "হে আল্লাহ আমার শরীরে সুস্থতা দিন", english: "O Allah grant me health in my body", reference: "সুনান তিরমিযী, হাদিস নং ৩৪৯৯" },
      { id: "me-005", titleBengali: "ঈমান রক্ষার দোয়া", titleEnglish: "Faith Protection", arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي", transliteration: "Ya Muqallibal-qulub thabbit qalbi", transliterationBengali: "ইয়া মুকাল্লিবাল কুলুব সাব্বিত কালবি", bengali: "হে হৃদয় পরিবর্তনকারী, আমার হৃদয়কে স্থির রাখুন", english: "O Turner of hearts keep my heart firm", reference: "সুনান তিরমিযী, হাদিস নং ২১৪০" },
      { id: "me-006", titleBengali: "ক্ষমা প্রার্থনা", titleEnglish: "Seeking Forgiveness", arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", transliteration: "Astaghfirullaha wa atubu ilayh", transliterationBengali: "আস্তাগফিরুল্লাহা ওয়া আতুবু ইলাইহ", bengali: "আমি আল্লাহর কাছে ক্ষমা চাই ও তাঁর দিকে ফিরে আসি", english: "I seek forgiveness from Allah and repent to Him", reference: "সহীহ মুসলিম, হাদিস নং ২৭০২" },
      { id: "me-007", titleBengali: "কৃতজ্ঞতার দোয়া", titleEnglish: "Gratitude", arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ", transliteration: "Allahumma ma asbaha bi min ni'mah", transliterationBengali: "আল্লাহুম্মা মা আসবাহা বি মিন নি'মাহ", bengali: "আমার উপর যে সকল নিয়ামত এসেছে তা আপনার পক্ষ থেকে", english: "Whatever blessing I have is from You", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৩" },
      { id: "me-008", titleBengali: "অকল্যাণ থেকে রক্ষা", titleEnglish: "Protection from Evil", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ", transliteration: "A'udhu bikalimatillahit-tammati", transliterationBengali: "আউযু বিকালিমাতিল্লাহিত্তাম্মাত", bengali: "আমি আল্লাহর পরিপূর্ণ বাক্যের আশ্রয় চাই", english: "I seek refuge in the perfect words of Allah", reference: "সহীহ মুসলিম, হাদিস নং ২৭০৯" },
      { id: "me-009", titleBengali: "হৃদয়ের শান্তির দোয়া", titleEnglish: "Peace of Heart", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا", transliteration: "Allahumma inni as'aluka 'ilman nafi'a", transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা ইলমান নাফিআ", bengali: "হে আল্লাহ উপকারী জ্ঞান দান করুন", english: "O Allah grant me beneficial knowledge", reference: "সুনান ইবনে মাজাহ, হাদিস নং ৯২৫" },
      { id: "me-010", titleBengali: "পূর্ণ ভরসার দোয়া", titleEnglish: "Complete Reliance", arabic: "رَضِيتُ بِاللَّهِ رَبًّا", transliteration: "Raditu billahi rabba", transliterationBengali: "রাদিতু বিল্লাহি রাব্বা", bengali: "আমি আল্লাহকে রব হিসেবে সন্তুষ্টভাবে গ্রহণ করেছি", english: "I am pleased with Allah as my Lord", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭২" },
      { id: "me-011", titleBengali: "আয়াতুল কুরসি", titleEnglish: "Ayat al-Kursi", arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum", transliterationBengali: "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়্যুল কাইয়্যুম", bengali: "আল্লাহ ছাড়া কোনো উপাস্য নেই—তিনি চিরঞ্জীব ও সবকিছুর ধারক", english: "Allah—there is no deity except Him, the Ever-Living, the Sustainer", reference: "আল-কুরআন, সূরা বাকারা ২:২৫৫" },
      { id: "me-012", titleBengali: "সূরা ইখলাস", titleEnglish: "Surah Ikhlas", arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwallahu ahad", transliterationBengali: "কুল হুয়াল্লাহু আহাদ", bengali: "বলুন—তিনি আল্লাহ, একক", english: "Say: He is Allah, the One", reference: "আল-কুরআন, সূরা ইখলাস ১১২" },
      { id: "me-013", titleBengali: "সূরা ফালাক", titleEnglish: "Surah Falaq", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'udhu birabbil-falaq", transliterationBengali: "কুল আউযু বিরাব্বিল ফালাক", bengali: "আমি ফালাকের রবের আশ্রয় চাই", english: "Say: I seek refuge in the Lord of daybreak", reference: "আল-কুরআন, সূরা ফালাক ১১৩" },
      { id: "me-014", titleBengali: "সূরা নাস", titleEnglish: "Surah Nas", arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'udhu birabbin-nas", transliterationBengali: "কুল আউযু বিরাব্বিন্নাস", bengali: "আমি মানুষের রবের আশ্রয় চাই", english: "Say: I seek refuge in the Lord of mankind", reference: "আল-কুরআন, সূরা নাস ১১৪" },
      { id: "me-015", titleBengali: "সাইয়্যিদুল ইস্তিগফার", titleEnglish: "Sayyidul Istighfar", arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ", transliteration: "Allahumma anta rabbi la ilaha illa anta", transliterationBengali: "আল্লাহুম্মা আনতা রাব্বি লা ইলাহা ইল্লা আনতা", bengali: "হে আল্লাহ আপনি আমার রব—আপনি ছাড়া কোনো উপাস্য নেই", english: "O Allah You are my Lord; there is no deity except You", reference: "সহীহ বুখারী, হাদিস নং ৬৩০৬" },
      { id: "me-016", titleBengali: "পূর্ণ সুস্থতার দোয়া", titleEnglish: "Complete Wellbeing", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyah", transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকাল আফওয়া ওয়াল আফিয়াহ", bengali: "হে আল্লাহ আমি ক্ষমা ও সুস্থতা চাই", english: "O Allah I ask You for pardon and wellbeing", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৪" },
      { id: "me-017", titleBengali: "দিন শুরুর দোয়া", titleEnglish: "Day Beginning", arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا", transliteration: "Allahumma bika asbahna wa bika amsayna", transliterationBengali: "আল্লাহুম্মা বিকা আসবাহনা ওয়া বিকা আমসাইনা", bengali: "হে আল্লাহ আপনার মাধ্যমেই আমরা সকাল ও সন্ধ্যায় পৌঁছি", english: "O Allah by You we enter the morning and evening", reference: "সুনান তিরমিযী, হাদিস নং ৩৩৯১" },
      { id: "me-018", titleBengali: "কুফর ও দারিদ্র্য থেকে রক্ষা", titleEnglish: "Protection from Disbelief", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ", transliteration: "Allahumma inni a'udhu bika minal-kufri wal-faqr", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল কুফরি ওয়াল ফাকর", bengali: "হে আল্লাহ কুফর ও দারিদ্র্য থেকে রক্ষা করুন", english: "O Allah I seek refuge in You from disbelief and poverty", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯০" },
      { id: "me-019", titleBengali: "তাসবীহ ও হামদ", titleEnglish: "Glorification", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", transliteration: "Subhanallahi wa bihamdihi", transliterationBengali: "সুবহানাল্লাহি ওয়া বিহামদিহি", bengali: "আল্লাহ পবিত্র—তাঁরই প্রশংসা", english: "Glory be to Allah and praise is His", reference: "সহীহ মুসলিম, হাদিস নং ২৬৯২" },
      { id: "me-020", titleBengali: "দিনের কল্যাণ প্রার্থনা", titleEnglish: "Seeking Good of the Day", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ", transliteration: "Allahumma inni as'aluka khayra hadhal-yawm", transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা খাইরা হাযাল ইয়াউম", bengali: "হে আল্লাহ এই দিনের কল্যাণ চাই", english: "O Allah I ask You for the good of this day", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৮৪" },
      { id: "me-021", titleBengali: "পরিবারের নিরাপত্তার দোয়া", titleEnglish: "Seeking Protection for Family", arabic: "اللَّهُمَّ احْفَظْنِي وَأَهْلِي", transliteration: "Allahumma ihfazni wa ahli", transliterationBengali: "আল্লাহুম্মা ইহফাজনি ওয়া আহলি", bengali: "হে আল্লাহ আমাকে ও আমার পরিবারকে হেফাজত করুন", english: "O Allah protect me and my family", reference: "মুসনাদ আহমাদ, হাদিস নং ২০৩৪৫" },
      { id: "me-022", titleBengali: "হঠাৎ বিপদ থেকে রক্ষা", titleEnglish: "Protection from Sudden Trials", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتَنِ الْمَحْيَا", transliteration: "Allahumma inni a'udhu bika min fitanil-mahya", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন ফিতানিল মাহইয়া", bengali: "হে আল্লাহ দুনিয়ার ফিতনা থেকে আমাকে রক্ষা করুন", english: "O Allah protect me from trials of life", reference: "সহীহ মুসলিম, হাদিস নং ২৮৬৭" },
      { id: "me-023", titleBengali: "শয়তান থেকে রক্ষার দোয়া", titleEnglish: "Protection from Shaytan", arabic: "وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ", transliteration: "Wa a'udhu bika rabbi an yahdurun", transliterationBengali: "ওয়া আউযু বিকা রাব্বি আইঁ ইয়াহদুরুন", bengali: "হে আমার রব, শয়তানদের উপস্থিতি থেকে রক্ষা করুন", english: "And I seek refuge in You my Lord from their presence", reference: "আল-কুরআন, সূরা মুমিনুন ২৩:৯৮" },
      { id: "me-024", titleBengali: "উত্তম রিজিকের দোয়া", titleEnglish: "Good Provision", arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ", transliteration: "Allahumma-kfini bihalalika 'an haramika", transliterationBengali: "আল্লাহুম্মা কফিনি বিহালালিকা আন হারামিকা", bengali: "হে আল্লাহ হালাল দ্বারা আমাকে যথেষ্ট করুন", english: "O Allah suffice me with lawful provision", reference: "সুনান তিরমিযী, হাদিস নং ৩৫৬৩" },
      { id: "me-025", titleBengali: "চোখ ও কানের হেফাজত", titleEnglish: "Protection of Sight and Hearing", arabic: "اللَّهُمَّ مَتِّعْنِي بِسَمْعِي وَبَصَرِي", transliteration: "Allahumma matti'ni bisam'i wa basari", transliterationBengali: "আল্লাহুম্মা মাত্তি'নি বিসামই ওয়া বাসারি", bengali: "হে আল্লাহ আমার শ্রবণ ও দৃষ্টিকে রক্ষা করুন", english: "O Allah preserve my hearing and sight", reference: "সুনান তিরমিযী, হাদিস নং ৩৫০২" },
      { id: "me-026", titleBengali: "দিনের সুন্দর সমাপ্তির দোয়া", titleEnglish: "Asking for Good End of Day", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ", transliteration: "Allahumma inni as'aluka khayra ma fi hadhal-yawm", transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা খাইরা মা ফি হাজাল ইয়াউম", bengali: "হে আল্লাহ আজকের দিনের কল্যাণ চাই", english: "O Allah I ask You for the good within this day", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৮৪" },
      { id: "me-027", titleBengali: "অকল্যাণকর জ্ঞান থেকে রক্ষা", titleEnglish: "Protection from Knowledge without Benefit", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ", transliteration: "Allahumma inni a'udhu bika min 'ilmin la yanfa'", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন ইলমিল লা ইয়ানফা", bengali: "হে আল্লাহ উপকারহীন জ্ঞান থেকে রক্ষা করুন", english: "O Allah protect me from knowledge that does not benefit", reference: "সহীহ মুসলিম, হাদিস নং ২৭২২" },
      { id: "me-028", titleBengali: "মন্দ কাজ থেকে রক্ষা", titleEnglish: "Protection from Evil Deeds", arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَأَعِذْنِي مِنْ شَرِّ نَفْسِي", transliteration: "Allahumma alhimni rushdi wa a'idhni min sharri nafsi", transliterationBengali: "আল্লাহুম্মা আলহিমনি রুশদি ওয়া আইযনি মিন শাররি নাফসি", bengali: "হে আল্লাহ সঠিক পথ অনুপ্রাণিত করুন ও নফসের অনিষ্ট থেকে রক্ষা করুন", english: "O Allah inspire me with guidance and protect me from my soul's evil", reference: "সহীহ মুসলিম, হাদিস নং ২৭২১" },
      { id: "me-029", titleBengali: "ক্ষতি থেকে রক্ষা", titleEnglish: "Protection from Loss", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ", transliteration: "Allahumma inni a'udhu bika minal-faqr", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল ফাকর", bengali: "হে আল্লাহ দারিদ্র্য থেকে আমাকে রক্ষা করুন", english: "O Allah protect me from poverty", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯০" },
      { id: "me-030", titleBengali: "আল্লাহর প্রতি আশা", titleEnglish: "Hope in Allah", arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ", transliteration: "Hasbiyallahu la ilaha illa Huwa", transliterationBengali: "হাসবিয়াল্লাহু লা ইলাহা ইল্লা হুয়া", bengali: "আল্লাহই আমার জন্য যথেষ্ট—তিনি ছাড়া কোনো উপাস্য নেই", english: "Allah is sufficient for me; there is no deity except Him", reference: "আল-কুরআন, সূরা তাওবাহ ৯:১২৯" },
      { id: "me-031", titleBengali: "শির্ক থেকে রক্ষার দোয়া", titleEnglish: "Protection from Shirk", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ شَيْئًا", transliteration: "Allahumma inni a'udhu bika an ushrika bika shay'an", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা আন উশরিকা বিকা শাইআন", bengali: "হে আল্লাহ জেনে বা না জেনে আপনার সাথে শরিক করা থেকে আমি আপনার আশ্রয় চাই", english: "O Allah I seek refuge in You from associating anything with You", reference: "মুসনাদ আহমাদ, হাদিস নং ১৯১৬০" },
      { id: "me-032", titleBengali: "আল্লাহর সন্তুষ্টি প্রার্থনা", titleEnglish: "Seeking Allah's Pleasure", arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا", transliteration: "Raditu billahi rabban wa bil-Islami dina", transliterationBengali: "রাদিতু বিল্লাহি রাব্বান ওয়া বিল ইসলামি দিনা", bengali: "আমি আল্লাহকে রব ও ইসলামকে দ্বীন হিসেবে সন্তুষ্টচিত্তে গ্রহণ করেছি", english: "I am pleased with Allah as my Lord and Islam as my religion", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭২" },
      { id: "me-033", titleBengali: "উদ্বেগ ও দুশ্চিন্তা থেকে রক্ষা", titleEnglish: "Protection from Anxiety", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ", transliteration: "Allahumma inni a'udhu bika minal-hamm", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল হাম্ম", bengali: "হে আল্লাহ দুশ্চিন্তা থেকে আমাকে রক্ষা করুন", english: "O Allah I seek refuge in You from anxiety", reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯" },
      { id: "me-034", titleBengali: "অলসতা থেকে রক্ষার দোয়া", titleEnglish: "Protection from Laziness", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ", transliteration: "Allahumma inni a'udhu bika minal-kasal", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল কাসাল", bengali: "হে আল্লাহ অলসতা থেকে আমাকে রক্ষা করুন", english: "O Allah I seek refuge in You from laziness", reference: "সহীহ মুসলিম, হাদিস নং ২৭০৬" },
      { id: "me-035", titleBengali: "উপকারী আমলের দোয়া", titleEnglish: "Seeking Beneficial Deeds", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عَمَلًا صَالِحًا", transliteration: "Allahumma inni as'aluka 'amalan saliha", transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা আমালান সালিহা", bengali: "হে আল্লাহ আমাকে সৎ আমল দান করুন", english: "O Allah I ask You for righteous deeds", reference: "মুসনাদ আহমাদ, হাদিস নং ১৭১১৮" },
      { id: "me-036", titleBengali: "হঠাৎ ক্ষতি থেকে রক্ষা", titleEnglish: "Protection from Sudden Harm", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ الْفُجَاءَةِ", transliteration: "Allahumma inni a'udhu bika min shar-ril-fuja'ah", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন শাররিল ফুজাআহ", bengali: "হে আল্লাহ হঠাৎ বিপদ থেকে আমাকে রক্ষা করুন", english: "O Allah protect me from sudden harm", reference: "মুসনাদ আহমাদ, হাদিস নং ১২১৬৫" },
      { id: "me-037", titleBengali: "নূরের দোয়া", titleEnglish: "Asking for Light", arabic: "اللَّهُمَّ اجْعَلْ لِي نُورًا", transliteration: "Allahumma-j'al li noora", transliterationBengali: "আল্লাহুম্মা ইজআল লি নূরা", bengali: "হে আল্লাহ আমাকে নূর দান করুন", english: "O Allah grant me light", reference: "সহীহ মুসলিম, হাদিস নং ৭৬৩" },
      { id: "me-038", titleBengali: "হৃদয় বিচ্যুতি থেকে রক্ষা", titleEnglish: "Protection from Heart Deviation", arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا", transliteration: "Rabbana la tuzigh qulubana", transliterationBengali: "রাব্বানা লা তুযিগ কুলুবানা", bengali: "হে আমাদের রব আমাদের হৃদয়কে বিচ্যুত করবেন না", english: "Our Lord do not let our hearts deviate", reference: "আল-কুরআন, সূরা আলে ইমরান ৩:৮" },
      { id: "me-039", titleBengali: "আল্লাহর সাহায্য প্রার্থনা", titleEnglish: "Seeking Allah's Help", arabic: "اللَّهُمَّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ", transliteration: "Allahumma a'inni wa la tu'in 'alayya", transliterationBengali: "আল্লাহুম্মা আইন্নি ওয়া লা তুইন আলাইয়া", bengali: "হে আল্লাহ আমাকে সাহায্য করুন—আমার বিরুদ্ধে কাউকে সাহায্য করবেন না", english: "O Allah help me and do not help against me", reference: "সুনান আবু দাউদ, হাদিস নং ১৫১১" },
      { id: "me-040", titleBengali: "প্রশংসার মাধ্যমে শেষ", titleEnglish: "Ending with Praise", arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ", transliteration: "Alhamdulillahi 'ala kulli hal", transliterationBengali: "আলহামদুলিল্লাহি আলা কুল্লি হাল", bengali: "সব অবস্থায় আল্লাহরই প্রশংসা", english: "Praise be to Allah in every situation", reference: "সুনান ইবনে মাজাহ, হাদিস নং ৩৮০৩" },
      { id: "me-041", titleBengali: "ঈমান হেফাজতের দোয়া", titleEnglish: "Protection of Faith", arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا", transliteration: "Rabbana amanna faghfir lana", transliterationBengali: "রাব্বানা আমান্না ফাগফির লানা", bengali: "হে আমাদের রব আমরা ঈমান এনেছি—আমাদের ক্ষমা করুন", english: "Our Lord, we have believed, so forgive us", reference: "আল-কুরআন, সূরা আলে ইমরান ৩:১৬" },
      { id: "me-042", titleBengali: "হৃদয় কঠোরতা থেকে রক্ষা", titleEnglish: "Protection from Heart Hardness", arabic: "اللَّهُمَّ لَا تَجْعَلْ قُلُوبَنَا قَاسِيَةً", transliteration: "Allahumma la taj'al qulubana qasiyah", transliterationBengali: "আল্লাহুম্মা লা তাজআল কুলুবানা কাসিয়াহ", bengali: "হে আল্লাহ আমাদের হৃদয় কঠোর করবেন না", english: "O Allah do not make our hearts hard", reference: "মুসনাদ আহমাদ, হাদিস নং ২৩৪১৫" },
      { id: "me-043", titleBengali: "ফিতনা থেকে রক্ষার দোয়া", titleEnglish: "Protection from Fitnah", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ", transliteration: "Allahumma inni as'alukath-thabata fil-amr", transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকাস সাবাতা ফিল আমর", bengali: "হে আল্লাহ দ্বীনের বিষয়ে আমাকে অবিচল রাখুন", english: "O Allah I ask You for steadfastness in faith", reference: "মুসনাদ আহমাদ, হাদিস নং ১৭১৬৩" },
      { id: "me-044", titleBengali: "হেদায়াত হারানো থেকে রক্ষা", titleEnglish: "Protection from Loss of Guidance", arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا", transliteration: "Rabbi la tadharni fardan", transliterationBengali: "রাব্বি লা তাযারনি ফারদান", bengali: "হে আমার রব আমাকে একা ছেড়ে দেবেন না", english: "My Lord, do not leave me alone", reference: "আল-কুরআন, সূরা আম্বিয়া ২১:৮৯" },
      { id: "me-045", titleBengali: "উত্তম কথার দোয়া", titleEnglish: "Good Speech", arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَقْوَالِ", transliteration: "Allahumma ihdini li-ahsanil-aqwal", transliterationBengali: "আল্লাহুম্মা ইহদিনি লি আহসানিল আকওয়াল", bengali: "হে আল্লাহ আমাকে উত্তম কথায় পরিচালিত করুন", english: "O Allah guide me to the best speech", reference: "সহীহ মুসলিম, হাদিস নং ৭৭১" },
      { id: "me-046", titleBengali: "অনুশোচনা থেকে রক্ষা", titleEnglish: "Protection from Regret", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ", transliteration: "Allahumma inni a'udhu bika minal-'ajz", transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল আজজ", bengali: "হে আল্লাহ অক্ষমতা থেকে আমাকে রক্ষা করুন", english: "O Allah protect me from incapacity", reference: "সহীহ মুসলিম, হাদিস নং ২৭০৬" },
      { id: "me-047", titleBengali: "সময় বরকতের দোয়া", titleEnglish: "Protection of Time", arabic: "اللَّهُمَّ بَارِكْ لِي فِي يَوْمِي", transliteration: "Allahumma barik li fi yawmi", transliterationBengali: "আল্লাহুম্মা বারিক লি ফি ইয়াওমি", bengali: "হে আল্লাহ আমার দিনে বরকত দান করুন", english: "O Allah bless my day", reference: "মুসনাদ আহমাদ, হাদিস নং ২০৫৯৩" },
      { id: "me-048", titleBengali: "ভুল সিদ্ধান্ত থেকে রক্ষা", titleEnglish: "Protection from Wrong Decisions", arabic: "اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا", transliteration: "Allahumma arinal-haqqa haqqan", transliterationBengali: "আল্লাহুম্মা আরিনাল হাক্কা হাক্কান", bengali: "হে আল্লাহ আমাদের সত্যকে সত্য হিসেবে দেখান", english: "O Allah show us the truth as truth", reference: "ইবনে হিব্বান, হাদিস নং ২৪৫৭" },
      { id: "me-049", titleBengali: "হৃদয়ের প্রশান্তি", titleEnglish: "Peaceful Heart", arabic: "رَبِّ اشْرَحْ لِي صَدْرِي", transliteration: "Rabbishrah li sadri", transliterationBengali: "রাব্বিশরাহ লি সদরি", bengali: "হে আমার রব আমার অন্তর প্রশস্ত করুন", english: "My Lord expand my chest", reference: "আল-কুরআন, সূরা তা-হা ২০:২৫" },
      { id: "me-050", titleBengali: "আখিরাতের আশার দোয়া", titleEnglish: "Hope for Akhirah", arabic: "اللَّهُمَّ اجْعَلْ خَيْرَ أَيَّامِنَا آخِرَهَا", transliteration: "Allahumma-j'al khayra ayyamina akhiraha", transliterationBengali: "আল্লাহুম্মা ইজআল খাইরা আইয়ামিনা আখিরাহা", bengali: "হে আল্লাহ আমাদের শেষ দিনগুলোকে শ্রেষ্ঠ করুন", english: "O Allah make the best of our days the last of them", reference: "মুসনাদ আহমাদ, হাদিস নং ১৭১১৮" }
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
        id: "protection-1",
        titleBengali: "শয়তান থেকে রক্ষা",
        titleEnglish: "Protection from Satan",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaitanir-rajim",
        transliterationBengali: "আ'ঊযু বিল্লাহি মিনাশ শাইতানির রাজীম",
        bengali: "আমি অভিশপ্ত শয়তান থেকে আল্লাহর কাছে আশ্রয় চাই",
        english: "I seek refuge in Allah from the accursed Satan",
        reference: "সূরা আন-নাহল ১৬:৯৮"
      },
      {
        id: "protection-2",
        titleBengali: "সাধারণ নিরাপত্তার দোয়া",
        titleEnglish: "General Protection",
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ",
        transliteration: "Bismillahil-ladhi la yadurru",
        transliterationBengali: "বিসমিল্লাহিল্লাজি লা ইয়াদুর্রু",
        bengali: "আল্লাহর নামে—যাঁর নামে কিছুই ক্ষতি করতে পারে না",
        english: "In the name of Allah with whose name nothing can harm",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৮৮"
      },
      {
        id: "protection-3",
        titleBengali: "সব অনিষ্ট থেকে রক্ষা",
        titleEnglish: "Protection from All Evil",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ",
        transliteration: "A'udhu bikalimatillahit-tammati",
        transliterationBengali: "আ'ঊযু বিকালিমাতিল্লাহিত্তাম্মাত",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাক্যের আশ্রয় চাই",
        english: "I seek refuge in the perfect words of Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৯"
      },
      {
        id: "protection-4",
        titleBengali: "আয়াতুল কুরসি",
        titleEnglish: "Ayat al-Kursi",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum",
        transliterationBengali: "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়্যুল কাইয়্যুম",
        bengali: "আল্লাহ ছাড়া কোনো উপাস্য নেই—তিনি চিরঞ্জীব ও সবকিছুর ধারক",
        english: "Allah—there is no deity except Him, the Ever-Living",
        reference: "সূরা আল-বাকারা ২:২৫৫"
      },
      {
        id: "protection-5",
        titleBengali: "হিংসা থেকে রক্ষা",
        titleEnglish: "Protection from Envy",
        arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration: "Wa min sharri hasidin idha hasad",
        transliterationBengali: "ওয়া মিন শাররি হাসিদিন ইযা হাসাদ",
        bengali: "হিংসুকের অনিষ্ট থেকে আশ্রয় চাই",
        english: "From the evil of an envier when he envies",
        reference: "সূরা আল-ফালাক ১১৩:৫"
      },
      {
        id: "protection-6",
        titleBengali: "ওয়াসওয়াসা থেকে রক্ষা",
        titleEnglish: "Protection from Whisperings",
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration: "Qul a'udhu birabbin-nas",
        transliterationBengali: "কুল আ'ঊযু বিরাব্বিন্নাস",
        bengali: "আমি মানুষের রবের আশ্রয় চাই",
        english: "Say: I seek refuge in the Lord of mankind",
        reference: "সূরা আন-নাস ১১৪:১"
      },
      {
        id: "protection-7",
        titleBengali: "ভয় থেকে রক্ষা",
        titleEnglish: "Protection from Fear",
        arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        transliteration: "Hasbunallahu wa ni'mal wakil",
        transliterationBengali: "হাসবুনাল্লাহু ওয়া নি'মাল ওয়াকিল",
        bengali: "আল্লাহই আমাদের জন্য যথেষ্ট",
        english: "Allah is sufficient for us",
        reference: "সূরা আলে ইমরান ৩:১৭৩"
      },
      {
        id: "protection-8",
        titleBengali: "ক্ষতিকর মানুষের থেকে রক্ষা",
        titleEnglish: "Protection from Harmful People",
        arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
        transliteration: "Allahumma-kfinihim bima shi'ta",
        transliterationBengali: "আল্লাহুম্মা কফিনিহিম বিমা শি'তা",
        bengali: "হে আল্লাহ আপনি যেভাবে চান আমাকে তাদের থেকে রক্ষা করুন",
        english: "O Allah suffice me against them as You wish",
        reference: "সহীহ মুসলিম, হাদিস নং ৩০০৫"
      },
      {
        id: "protection-9",
        titleBengali: "দারিদ্র্য থেকে রক্ষা",
        titleEnglish: "Protection from Poverty",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
        transliteration: "Allahumma inni a'udhu bika minal-faqr",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিনাল ফাকর",
        bengali: "হে আল্লাহ দারিদ্র্য থেকে আমাকে রক্ষা করুন",
        english: "O Allah I seek refuge in You from poverty",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯০"
      },
      {
        id: "protection-10",
        titleBengali: "ভ্রান্তি থেকে রক্ষা",
        titleEnglish: "Protection from Misguidance",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا",
        transliteration: "Rabbana la tuzigh qulubana",
        transliterationBengali: "রাব্বানা লা তুযিগ কুলুবানা",
        bengali: "হে আমাদের রব আমাদের হৃদয়কে বিচ্যুত করবেন না",
        english: "Our Lord do not let our hearts deviate",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "protection-11",
        titleBengali: "জাহান্নাম থেকে রক্ষা",
        titleEnglish: "Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        transliteration: "Allahumma ajirni minan-nar",
        transliterationBengali: "আল্লাহুম্মা আজিরনি মিনান নার",
        bengali: "হে আল্লাহ আমাকে জাহান্নাম থেকে রক্ষা করুন",
        english: "O Allah protect me from Hellfire",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৯"
      },
      {
        id: "protection-12",
        titleBengali: "হঠাৎ মৃত্যু থেকে রক্ষা",
        titleEnglish: "Protection from Sudden Death",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مَوْتِ الْفُجْأَةِ",
        transliteration: "Allahumma inni a'udhu bika min mawtil-fuja'ah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিন মাউতিল ফুজাআহ",
        bengali: "হে আল্লাহ হঠাৎ মৃত্যু থেকে আমাকে রক্ষা করুন",
        english: "O Allah I seek refuge in You from sudden death",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১২১৬৫"
      },
      {
        id: "protection-13",
        titleBengali: "জাদু থেকে রক্ষা",
        titleEnglish: "Protection from Black Magic",
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        transliteration: "Qul a'udhu birabbil-falaq",
        transliterationBengali: "কুল আ'ঊযু বিরাব্বিল ফালাক",
        bengali: "আমি ফালাকের রবের আশ্রয় চাই",
        english: "Say: I seek refuge in the Lord of daybreak",
        reference: "সূরা আল-ফালাক ১১৩:১"
      },
      {
        id: "protection-14",
        titleBengali: "জিনের কুমন্ত্রণা থেকে রক্ষা",
        titleEnglish: "Protection from Whispering Jinn",
        arabic: "وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ",
        transliteration: "Wa a'udhu bika rabbi an yahdurun",
        transliterationBengali: "ওয়া আ'ঊযু বিকা রাব্বি আইঁ ইয়াহদুরুন",
        bengali: "হে আমার রব জিনদের উপস্থিতি থেকে আমাকে রক্ষা করুন",
        english: "And I seek refuge in You my Lord from their presence",
        reference: "সূরা আল-মু'মিনুন ২৩:৯৮"
      },
      {
        id: "protection-15",
        titleBengali: "কুফর থেকে রক্ষা",
        titleEnglish: "Protection from Disbelief",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ",
        transliteration: "Allahumma inni a'udhu bika minal-kufr",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিনাল কুফর",
        bengali: "হে আল্লাহ কুফর থেকে আমাকে রক্ষা করুন",
        english: "O Allah I seek refuge in You from disbelief",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯০"
      },
      {
        id: "protection-16",
        titleBengali: "ঋণের চাপ থেকে রক্ষা",
        titleEnglish: "Protection from Debt Stress",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَغْرَمِ",
        transliteration: "Allahumma inni a'udhu bika minal-maghram",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিনাল মাগরাম",
        bengali: "হে আল্লাহ ঋণের বোঝা থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from debt burden",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "protection-17",
        titleBengali: "দুর্বলতা থেকে রক্ষা",
        titleEnglish: "Protection from Weakness",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ",
        transliteration: "Allahumma inni a'udhu bika minal-'ajz",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিনাল আজজ",
        bengali: "হে আল্লাহ দুর্বলতা থেকে আমাকে রক্ষা করুন",
        english: "O Allah I seek refuge in You from weakness",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৬"
      },
      {
        id: "protection-18",
        titleBengali: "ভয় ও দুঃখ থেকে রক্ষা",
        titleEnglish: "Protection from Fear and Grief",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিনাল হাম্মি ওয়াল হাজান",
        bengali: "হে আল্লাহ দুশ্চিন্তা ও দুঃখ থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from anxiety and grief",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "protection-19",
        titleBengali: "অহংকার থেকে রক্ষা",
        titleEnglish: "Protection from Arrogance",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكِبْرِ",
        transliteration: "Allahumma inni a'udhu bika minal-kibr",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আ'ঊযু বিকা মিনাল কিবর",
        bengali: "হে আল্লাহ অহংকার থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from arrogance",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৪৪০৯"
      },
      {
        id: "protection-20",
        titleBengali: "সন্তানদের হেফাজত",
        titleEnglish: "Protection of Children",
        arabic: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ",
        transliteration: "Ua'idukuma bikalimatillahit-tammah",
        transliterationBengali: "উ'ঈযুকুমা বিকালিমাতিল্লাহিত্তাম্মাহ",
        bengali: "আমি তোমাদের আল্লাহর পরিপূর্ণ বাক্যের আশ্রয়ে দিচ্ছি",
        english: "I seek protection for you in Allah's perfect words",
        reference: "সহীহ বুখারী, হাদিস নং ৩৩৭১"
      },
      {
        id: "protection-21",
        titleBengali: "চারদিক থেকে রক্ষা",
        titleEnglish: "Protection from All Sides",
        arabic: "رَبَّنَا احْفَظْنَا مِنْ بَيْنِ أَيْدِينَا وَمِنْ خَلْفِنَا",
        transliteration: "Rabbana ihfazna min bayni aydina wa min khalfina",
        transliterationBengali: "রাব্বানা ইহফাজনা মিন বাইনি আইদিনা ওয়া মিন খালফিনা",
        bengali: "হে আমাদের রব আমাদের সামনে ও পেছন থেকে হেফাজত করুন",
        english: "Our Lord protect us from before us and behind us",
        reference: "সূরা ইয়াসিন ৩৬:৯"
      },
      {
        id: "protection-22",
        titleBengali: "নিজ নফসের অনিষ্ট থেকে রক্ষা",
        titleEnglish: "Protection from Evil of Self",
        arabic: "اللَّهُمَّ قِنِي شَرَّ نَفْسِي",
        transliteration: "Allahumma qini sharra nafsi",
        transliterationBengali: "আল্লাহুম্মা কিনি শাররা নাফসি",
        bengali: "হে আল্লাহ আমার নফসের অনিষ্ট থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from the evil of my soul",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১৯৬৫৯"
      },
      {
        id: "protection-23",
        titleBengali: "অকল্যাণকর কথা থেকে রক্ষা",
        titleEnglish: "Protection from Harmful Speech",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَاحْلُلْ عُقْدَةً",
        transliteration: "Rabbishrah li sadri wahlul 'uqdah",
        transliterationBengali: "রাব্বিশরাহ লি সদরি ওয়াহলুল উকদাহ",
        bengali: "হে আমার রব আমার অন্তর প্রশস্ত করুন ও জিহ্বার জড়তা দূর করুন",
        english: "My Lord expand my chest and loosen my tongue",
        reference: "সূরা ত্বহা ২০:২৫–২৭"
      },
      {
        id: "protection-24",
        titleBengali: "জালিমদের থেকে রক্ষা",
        titleEnglish: "Protection from Oppressors",
        arabic: "رَبَّنَا نَجِّنَا مِنَ الْقَوْمِ الظَّالِمِينَ",
        transliteration: "Rabbana najjina minal-qawmiz-zalimin",
        transliterationBengali: "রাব্বানা নাজ্জিনা মিনাল কাওমিজ জালিমিন",
        bengali: "হে আমাদের রব জালিম সম্প্রদায় থেকে আমাদের উদ্ধার করুন",
        english: "Our Lord save us from the wrongdoing people",
        reference: "সূরা আল-কাসাস ২৮:২১"
      },
      {
        id: "protection-25",
        titleBengali: "ঈমান নষ্ট হওয়া থেকে রক্ষা",
        titleEnglish: "Protection from Loss of Faith",
        arabic: "رَبِّ لَا تُزِغْ قَلْبِي بَعْدَ إِذْ هَدَيْتَنِي",
        transliteration: "Rabbi la tuzigh qalbi ba'da idh hadaytani",
        transliterationBengali: "রাব্বি লা তুযিগ কালবি বা'দা ইয হাদাইতানি",
        bengali: "হে আমার রব হেদায়াতের পর আমার হৃদয় বিচ্যুত করবেন না",
        english: "My Lord do not let my heart deviate after guidance",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "protection-26",
        titleBengali: "গোপন অনিষ্ট থেকে রক্ষা",
        titleEnglish: "Protection from Hidden Evil",
        arabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        transliteration: "Wa min sharri ghasiqin idha waqab",
        transliterationBengali: "ওয়া মিন শাররি গাসিকিন ইযা ওয়াকাব",
        bengali: "অন্ধকারের অনিষ্ট থেকে আশ্রয় চাই",
        english: "From the evil of darkness when it settles",
        reference: "সূরা আল-ফালাক ১১৩:৩"
      },
      {
        id: "protection-27",
        titleBengali: "দুর্ঘটনা থেকে রক্ষা",
        titleEnglish: "Protection from Accidents",
        arabic: "اللَّهُمَّ سَلِّمْنِي وَسَلِّمْ أَهْلِي",
        transliteration: "Allahumma sallimni wa sallim ahli",
        transliterationBengali: "আল্লাহুম্মা সাল্লিমনি ওয়া সাল্লিম আহলি",
        bengali: "হে আল্লাহ আমাকে ও আমার পরিবারকে নিরাপদ রাখুন",
        english: "O Allah keep me and my family safe",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২০৪৬৫"
      },
      {
        id: "protection-28",
        titleBengali: "খারাপ পরিণতি থেকে রক্ষা",
        titleEnglish: "Protection from Bad End",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ سُوءِ الْخَاتِمَةِ",
        transliteration: "Allahumma inni a'udhu bika min su'il-khatimah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন সুইল খাতিমাহ",
        bengali: "হে আল্লাহ খারাপ পরিণতি থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from a bad ending",
        reference: "ইবনে মাজাহ, হাদিস নং ৩৮৪৫"
      },
      {
        id: "protection-29",
        titleBengali: "ক্ষতিকর জিন থেকে রক্ষা",
        titleEnglish: "Protection from Harmful Jinn",
        arabic: "قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ",
        transliteration: "Qul uhiya ilayya annahu istama'a nafar",
        transliterationBengali: "কুল উহিয়া ইলাইয়া আন্নাহু ইস্তামা'আ নাফার",
        bengali: "বলুন—আমার কাছে ওহী এসেছে যে একদল জিন শুনেছে",
        english: "Say: It has been revealed that a group of jinn listened",
        reference: "সূরা আল-জিন ৭২:১"
      },
      {
        id: "protection-30",
        titleBengali: "পূর্ণাঙ্গ নিরাপত্তার দোয়া",
        titleEnglish: "Complete Protection Dua",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنْ كُلِّ سُوءٍ",
        transliteration: "Allahumma ihfazni min kulli su'",
        transliterationBengali: "আল্লাহুম্মা ইহফাজনি মিন কুল্লি সু'",
        bengali: "হে আল্লাহ সব ধরনের অনিষ্ট থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from every evil",
        reference: "তাবারানী আল-আওসাত, হাদিস নং ৫২৫৭"
      },
      {
        id: "protection-31",
        titleBengali: "ভুল পথে যাওয়া থেকে রক্ষা",
        titleEnglish: "Protection from Wrong Path",
        arabic: "رَبِّ أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ",
        transliteration: "Rabbi a'udhu bika an adilla aw udalla",
        transliterationBengali: "রাব্বি আউযু বিকা আন আদিল্লা আও উদাল্লা",
        bengali: "হে আমার রব আমি পথভ্রষ্ট হওয়া বা কাউকে পথভ্রষ্ট করা থেকে আপনার আশ্রয় চাই",
        english: "My Lord I seek refuge in You from going astray or causing misguidance",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৪"
      },
      {
        id: "protection-32",
        titleBengali: "বিপদ থেকে রক্ষা",
        titleEnglish: "Protection from Calamity",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ",
        transliteration: "Allahumma inni a'udhu bika min jahdil-bala",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন জাহদিল বালা",
        bengali: "হে আল্লাহ কঠিন বিপদ থেকে আমাকে রক্ষা করুন",
        english: "O Allah I seek refuge in You from severe calamity",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৪৭"
      },
      {
        id: "protection-33",
        titleBengali: "শত্রুর ষড়যন্ত্র থেকে রক্ষা",
        titleEnglish: "Protection from Enemy Plot",
        arabic: "وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ",
        transliteration: "Wa ufawwidu amri ilallah",
        transliterationBengali: "ওয়া উফাওবিদু আমরি ইলাল্লাহ",
        bengali: "আমি আমার সমস্ত বিষয় আল্লাহর কাছে সোপর্দ করি",
        english: "I entrust my affair to Allah",
        reference: "সূরা গাফির ৪০:৪৪"
      },
      {
        id: "protection-34",
        titleBengali: "খারাপ সঙ্গ থেকে রক্ষা",
        titleEnglish: "Protection from Harmful Company",
        arabic: "رَبِّ نَجِّنِي مِنَ الْقَوْمِ الْمُفْسِدِينَ",
        transliteration: "Rabbi najjini minal-qawmil-mufsidin",
        transliterationBengali: "রাব্বি নাজ্জিনি মিনাল কাওমিল মুফসিদিন",
        bengali: "হে আমার রব আমাকে বিপথগামী লোকদের থেকে উদ্ধার করুন",
        english: "My Lord save me from the corrupt people",
        reference: "সূরা আল-কাসাস ২৮:২৫"
      },
      {
        id: "protection-35",
        titleBengali: "হঠাৎ রাগ থেকে রক্ষা",
        titleEnglish: "Protection from Sudden Anger",
        arabic: "اللَّهُمَّ اذْهَبْ غَيْظَ قَلْبِي",
        transliteration: "Allahumma adhhib ghayza qalbi",
        transliterationBengali: "আল্লাহুম্মা আজহিব গাইযা কালবি",
        bengali: "হে আল্লাহ আমার হৃদয়ের ক্রোধ দূর করে দিন",
        english: "O Allah remove the anger of my heart",
        reference: "সুনান আবু দাউদ, হাদিস নং ৪৭৮২"
      },
      {
        id: "protection-36",
        titleBengali: "খারাপ নিয়ত থেকে রক্ষা",
        titleEnglish: "Protection from Ill Intent",
        arabic: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ",
        transliteration: "Rabbi a'udhu bika min hamazatish-shayatin",
        transliterationBengali: "রাব্বি আউযু বিকা মিন হামাজাতিশ শাইয়াতিন",
        bengali: "হে আমার রব আমি শয়তানের প্ররোচনা থেকে আপনার আশ্রয় চাই",
        english: "My Lord I seek refuge in You from the incitements of devils",
        reference: "সূরা আল-মু'মিনুন ২৩:৯৭"
      },
      {
        id: "protection-37",
        titleBengali: "মন্দ জিহ্বা থেকে রক্ষা",
        titleEnglish: "Protection from Evil Tongue",
        arabic: "اللَّهُمَّ احْفَظْ لِسَانِي",
        transliteration: "Allahumma ihfaz lisani",
        transliterationBengali: "আল্লাহুম্মা ইহফাজ লিসানি",
        bengali: "হে আল্লাহ আমার জিহ্বা হেফাজত করুন",
        english: "O Allah guard my tongue",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৩৫০২"
      },
      {
        id: "protection-38",
        titleBengali: "ক্ষতি ও ধ্বংস থেকে রক্ষা",
        titleEnglish: "Protection from Loss and Damage",
        arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا",
        transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
        transliterationBengali: "রাব্বানা লা তু'আখিযনা ইন নাসিনা আও আখতা'না",
        bengali: "হে আমাদের রব ভুল বা বিস্মৃতির কারণে আমাদের পাকড়াও করবেন না",
        english: "Our Lord do not take us to task if we forget or err",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "protection-39",
        titleBengali: "রাতের ভয় থেকে রক্ষা",
        titleEnglish: "Protection from Night Terrors",
        arabic: "سَلَامٌ قَوْلًا مِنْ رَبٍّ رَحِيمٍ",
        transliteration: "Salamun qawlan min Rabbir Rahim",
        transliterationBengali: "সালামুন কাওলান মিন রাব্বির রাহিম",
        bengali: "পরম দয়ালু রবের পক্ষ থেকে শান্তির বাণী",
        english: "Peace—a word from a Merciful Lord",
        reference: "সূরা ইয়াসিন ৩৬:৫৮"
      },
      {
        id: "protection-40",
        titleBengali: "সব ক্ষতিকর বিষয় থেকে রক্ষা",
        titleEnglish: "Protection from Everything Harmful",
        arabic: "اللَّهُمَّ اكْفِنِي شَرَّ مَا أَخَافُ",
        transliteration: "Allahumma-kfini sharra ma akhaf",
        transliterationBengali: "আল্লাহুম্মা কফিনি শাররা মা আখাফ",
        bengali: "হে আল্লাহ যেটা আমি ভয় করি তার অনিষ্ট থেকে আমাকে যথেষ্ট করুন",
        english: "O Allah suffice me against the evil of what I fear",
        reference: "তাবারানী আল-কাবীর, হাদিস নং ১১৮২১"
      },
      {
        id: "protection-41",
        titleBengali: "নিজেকে নিয়ন্ত্রণ হারানো থেকে রক্ষা",
        titleEnglish: "Protection from Loss of Control",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا مُطْمَئِنَّةً",
        transliteration: "Allahumma inni as'aluka nafsan mutma'innah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা নাফসান মুতমাইন্নাহ",
        bengali: "হে আল্লাহ আমাকে প্রশান্ত আত্মা দান করুন",
        english: "O Allah I ask You for a tranquil soul",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১৭১২০"
      },
      {
        id: "protection-42",
        titleBengali: "লজ্জাজনক কাজ থেকে রক্ষা",
        titleEnglish: "Protection from Shameful Deeds",
        arabic: "اللَّهُمَّ اسْتُرْ عَوْرَاتِنَا",
        transliteration: "Allahummas-tur 'awratina",
        transliterationBengali: "আল্লাহুম্মাসতুর আউরাতিনা",
        bengali: "হে আল্লাহ আমাদের লজ্জাস্থানসমূহ আড়াল করুন",
        english: "O Allah conceal our faults",
        reference: "সুনান আবু দাউদ, হাদিস নং ৪০১৯"
      },
      {
        id: "protection-43",
        titleBengali: "মিথ্যা অপবাদ থেকে রক্ষা",
        titleEnglish: "Protection from False Accusation",
        arabic: "رَبِّ نَجِّنِي وَأَهْلِي مِمَّا يَعْمَلُونَ",
        transliteration: "Rabbi najjini wa ahli mimma ya'malun",
        transliterationBengali: "রাব্বি নাজ্জিনি ওয়া আহলি মিম্মা ইয়া'মালুন",
        bengali: "হে আমার রব আমাকে ও আমার পরিবারকে তাদের কাজ থেকে উদ্ধার করুন",
        english: "My Lord save me and my family from what they do",
        reference: "সূরা আশ-শু'আরা ২৬:১৬৯"
      },
      {
        id: "protection-44",
        titleBengali: "লোভ থেকে রক্ষা",
        titleEnglish: "Protection from Greed",
        arabic: "وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
        transliteration: "Wa man yuqa shuhha nafsihi fa ula'ika humul-muflihun",
        transliterationBengali: "ওয়া মান ইউকা শুহহা নাফসিহি ফা উলাইকা হুমুল মুফলিহুন",
        bengali: "যাকে তার আত্মার লোভ থেকে রক্ষা করা হয় সেই সফল",
        english: "And whoever is protected from the greed of his soul—those are the successful",
        reference: "সূরা আল-হাশর ৫৯:৯"
      },
      {
        id: "protection-45",
        titleBengali: "ক্ষতিকর কামনা থেকে রক্ষা",
        titleEnglish: "Protection from Harmful Desire",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي وَبَصَرِي",
        transliteration: "Allahumma inni a'udhu bika min sharri sam'i wa basari",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন শাররি সাম'ই ওয়া বাসারি",
        bengali: "হে আল্লাহ আমার কান ও চোখের অনিষ্ট থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from the evil of my hearing and sight",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৩৩৪৭"
      },
      {
        id: "protection-46",
        titleBengali: "গুনাহের পরিবেশ থেকে রক্ষা",
        titleEnglish: "Protection from Sinful Environment",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ",
        transliteration: "Rabbi adkhilni mudkhala sidq",
        transliterationBengali: "রাব্বি আদখিলনি মুদখালা সিদক",
        bengali: "হে আমার রব আমাকে সঠিক প্রবেশ দান করুন",
        english: "My Lord grant me a sound entrance",
        reference: "সূরা আল-ইসরা ১৭:৮০"
      },
      {
        id: "protection-47",
        titleBengali: "বিশ্বাসঘাতকতা থেকে রক্ষা",
        titleEnglish: "Protection from Betrayal",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخِيَانَةِ",
        transliteration: "Allahumma inni a'udhu bika minal-khiyanah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল খিয়ানাহ",
        bengali: "হে আল্লাহ বিশ্বাসঘাতকতা থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from betrayal",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২২৯৮০"
      },
      {
        id: "protection-48",
        titleBengali: "ক্ষমতার বাইরে পরীক্ষার হাত থেকে রক্ষা",
        titleEnglish: "Protection from Being Tested Beyond Capacity",
        arabic: "رَبَّنَا لَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ",
        transliteration: "Rabbana la tuhammilna ma la taqata lana bih",
        transliterationBengali: "রাব্বানা লা তুহাম্মিলনা মা লা তাকাতা লানা বিহ",
        bengali: "হে আমাদের রব আমাদের ওপর এমন বোঝা চাপাবেন না যা বহন করার ক্ষমতা আমাদের নেই",
        english: "Our Lord do not burden us beyond our capacity",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "protection-49",
        titleBengali: "হঠাৎ মানসিক যন্ত্রণা থেকে রক্ষা",
        titleEnglish: "Protection from Sudden Anguish",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَآبَةِ",
        transliteration: "Allahumma inni a'udhu bika minal-ka'abah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল কা'আবাহ",
        bengali: "হে আল্লাহ গভীর দুশ্চিন্তা থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from deep distress",
        reference: "তাবারানী আল-আওসাত, হাদিস নং ৬২৩৪"
      },
      {
        id: "protection-50",
        titleBengali: "আল্লাহর মাধ্যমে পূর্ণ নিরাপত্তা",
        titleEnglish: "Complete Protection by Allah",
        arabic: "حَسْبِيَ اللَّهُ وَنِعْمَ الْحَفِيظُ",
        transliteration: "Hasbiyallahu wa ni'mal-hafiz",
        transliterationBengali: "হাসবিয়াল্লাহু ওয়া নি'মাল হাফিজ",
        bengali: "আল্লাহই আমার জন্য যথেষ্ট এবং তিনিই সর্বোত্তম রক্ষক",
        english: "Allah is sufficient for me and He is the best Protector",
        reference: "সূরা হূদ ১১:৫৬"
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
      },
      {
        id: "quran-11",
        titleBengali: "নূহ (আ.) এর দোয়া",
        titleEnglish: "Dua of Nuh",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
        transliteration: "Rabbi-ghfir li wa li walidayya",
        transliterationBengali: "রাব্বিগফির লি ওয়া লি ওয়ালিদাইয়্যা",
        bengali: "হে আমার রব আমাকে ও আমার পিতামাতাকে ক্ষমা করুন",
        english: "My Lord forgive me and my parents",
        reference: "সূরা নূহ ৭১:২৮"
      },
      {
        id: "quran-12",
        titleBengali: "ইবরাহিম (আ.) এর দোয়া",
        titleEnglish: "Dua of Ibrahim",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ",
        transliteration: "Rabbij'alni muqimas-salah",
        transliterationBengali: "রাব্বিজআলনি মুকীমাস সালাহ",
        bengali: "হে আমার রব আমাকে নামাজ কায়েমকারী করুন",
        english: "My Lord make me an establisher of prayer",
        reference: "সূরা ইবরাহিম ১৪:৪০"
      },
      {
        id: "quran-13",
        titleBengali: "জ্ঞান বৃদ্ধির দোয়া",
        titleEnglish: "Dua for Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        transliterationBengali: "রাব্বি যিদনি ইলমা",
        bengali: "হে আমার রব আমার জ্ঞান বৃদ্ধি করুন",
        english: "My Lord increase me in knowledge",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "quran-14",
        titleBengali: "আদম (আ.) এর দোয়া",
        titleEnglish: "Dua of Adam",
        arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا",
        transliteration: "Rabbana zalamna anfusana",
        transliterationBengali: "রাব্বানা যালামনা আনফুসানা",
        bengali: "হে আমাদের রব আমরা নিজেদের প্রতি জুলুম করেছি",
        english: "Our Lord we have wronged ourselves",
        reference: "সূরা আল-আ'রাফ ৭:২৩"
      },
      {
        id: "quran-15",
        titleBengali: "ক্ষমা প্রার্থনার দোয়া",
        titleEnglish: "Dua for Forgiveness",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا",
        transliteration: "Rabbana-ghfir lana dhunubana",
        transliterationBengali: "রাব্বানাগফির লানা যুনুবানা",
        bengali: "হে আমাদের রব আমাদের গুনাহ ক্ষমা করুন",
        english: "Our Lord forgive us our sins",
        reference: "সূরা আলে ইমরান ৩:১৬"
      },
      {
        id: "quran-16",
        titleBengali: "অটলতার দোয়া",
        titleEnglish: "Dua for Steadfastness",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا",
        transliteration: "Rabbana la tuzigh qulubana",
        transliterationBengali: "রাব্বানা লা তুযিগ কুলুবানা",
        bengali: "হে আমাদের রব আমাদের হৃদয় বিচ্যুত করবেন না",
        english: "Our Lord do not let our hearts deviate",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "quran-17",
        titleBengali: "মূসা (আ.) এর দোয়া",
        titleEnglish: "Dua of Musa",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
        transliteration: "Rabbishrah li sadri",
        transliterationBengali: "রাব্বিশরাহ লি সদরি",
        bengali: "হে আমার রব আমার অন্তর প্রশস্ত করুন",
        english: "My Lord expand my chest",
        reference: "সূরা ত্বহা ২০:২৫"
      },
      {
        id: "quran-18",
        titleBengali: "পিতামাতার জন্য দোয়া",
        titleEnglish: "Dua for Parents",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-hamhuma kama rabbayani saghira",
        transliterationBengali: "রাব্বিরহামহুমা কামা রাব্বায়ানি সাগীরা",
        bengali: "হে আমার রব তাদের প্রতি দয়া করুন যেমন তারা আমাকে ছোটবেলায় লালন করেছেন",
        english: "My Lord have mercy on them as they raised me when small",
        reference: "সূরা আল-ইসরা ১৭:২৪"
      },
      {
        id: "quran-19",
        titleBengali: "সফলতার দোয়া",
        titleEnglish: "Dua for Success",
        arabic: "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً",
        transliteration: "Rabbana atina min ladunka rahmah",
        transliterationBengali: "রাব্বানা আতিনা মিন লাদুনকা রাহমাহ",
        bengali: "হে আমাদের রব আপনার পক্ষ থেকে আমাদের দয়া দান করুন",
        english: "Our Lord grant us mercy from Yourself",
        reference: "সূরা আল-কাহফ ১৮:১০"
      },
      {
        id: "quran-20",
        titleBengali: "নিরাপত্তার দোয়া",
        titleEnglish: "Dua for Protection",
        arabic: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ",
        transliteration: "Rabbi a'udhu bika min hamazatish-shayatin",
        transliterationBengali: "রাব্বি আউযু বিকা মিন হামাজাতিশ শাইয়াতিন",
        bengali: "হে আমার রব আমি শয়তানের কুমন্ত্রণা থেকে আপনার আশ্রয় চাই",
        english: "My Lord I seek refuge in You from the incitements of devils",
        reference: "সূরা আল-মু'মিনুন ২৩:৯৭"
      },
      {
        id: "quran-21",
        titleBengali: "দুনিয়া ও আখিরাতের কল্যাণের দোয়া",
        titleEnglish: "Dua for Good in This World and Hereafter",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
        transliteration: "Rabbana atina fid-dunya hasanah",
        transliterationBengali: "রাব্বানা আতিনা ফিদ্দুনিয়া হাসানাহ",
        bengali: "হে আমাদের রব আমাদের দুনিয়াতে কল্যাণ দান করুন",
        english: "Our Lord grant us good in this world",
        reference: "সূরা আল-বাকারা ২:২০১"
      },
      {
        id: "quran-22",
        titleBengali: "আমল কবুলের দোয়া",
        titleEnglish: "Dua for Acceptance of Deeds",
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا",
        transliteration: "Rabbana taqabbal minna",
        transliterationBengali: "রাব্বানা তাকাব্বাল মিন্না",
        bengali: "হে আমাদের রব আমাদের থেকে কবুল করুন",
        english: "Our Lord accept from us",
        reference: "সূরা আল-বাকারা ২:১২৭"
      },
      {
        id: "quran-23",
        titleBengali: "হেদায়াতের দোয়া",
        titleEnglish: "Dua for Guidance",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinas-siratal-mustaqim",
        transliterationBengali: "ইহদিনাস সিরাতাল মুস্তাকীম",
        bengali: "আমাদের সরল পথে পরিচালিত করুন",
        english: "Guide us to the straight path",
        reference: "সূরা আল-ফাতিহা ১:৬"
      },
      {
        id: "quran-24",
        titleBengali: "ধৈর্যের দোয়া",
        titleEnglish: "Dua for Patience",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
        transliteration: "Rabbana afrigh 'alayna sabra",
        transliterationBengali: "রাব্বানা আফরিগ আলাইনা সাবরা",
        bengali: "হে আমাদের রব আমাদের ওপর ধৈর্য ঢেলে দিন",
        english: "Our Lord pour upon us patience",
        reference: "সূরা আল-বাকারা ২:২৫০"
      },
      {
        id: "quran-25",
        titleBengali: "জাহান্নাম থেকে রক্ষার দোয়া",
        titleEnglish: "Dua for Protection from Hellfire",
        arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ",
        transliteration: "Rabbana-srif 'anna 'adhaba jahannam",
        transliterationBengali: "রাব্বানাসরিফ আন্না আজাবা জাহান্নাম",
        bengali: "হে আমাদের রব জাহান্নামের শাস্তি থেকে আমাদের ফিরিয়ে নিন",
        english: "Our Lord turn away from us the punishment of Hell",
        reference: "সূরা আল-ফুরকান ২৫:৬৫"
      },
      {
        id: "quran-26",
        titleBengali: "সৎ সন্তানের দোয়া",
        titleEnglish: "Dua for Righteous Offspring",
        arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
        transliteration: "Rabbi hab li minas-salihin",
        transliterationBengali: "রাব্বি হাব লি মিনাস সালিহীন",
        bengali: "হে আমার রব আমাকে সৎ সন্তান দান করুন",
        english: "My Lord grant me from among the righteous",
        reference: "সূরা আস-সাফফাত ৩৭:১০০"
      },
      {
        id: "quran-27",
        titleBengali: "সহজতার দোয়া",
        titleEnglish: "Dua for Ease",
        arabic: "رَبِّ يَسِّرْ وَلَا تُعَسِّرْ",
        transliteration: "Rabbi yassir wa la tu'assir",
        transliterationBengali: "রাব্বি ইয়াসসির ওয়া লা তুআসসির",
        bengali: "হে আমার রব সহজ করে দিন—কঠিন করবেন না",
        english: "My Lord make it easy and do not make it difficult",
        reference: "সূরা ত্বহা ২০:২৬"
      },
      {
        id: "quran-28",
        titleBengali: "অটল পায়ের দোয়া",
        titleEnglish: "Dua for Firm Steps",
        arabic: "رَبَّنَا ثَبِّتْ أَقْدَامَنَا",
        transliteration: "Rabbana thabbit aqdamana",
        transliterationBengali: "রাব্বানা সাব্বিত আকদামানা",
        bengali: "হে আমাদের রব আমাদের পা অবিচল রাখুন",
        english: "Our Lord make our steps firm",
        reference: "সূরা আল-আনফাল ৮:১১"
      },
      {
        id: "quran-29",
        titleBengali: "রহমত ও হেদায়াতের দোয়া",
        titleEnglish: "Dua for Mercy and Guidance",
        arabic: "رَبَّنَا اغْفِرْ لَنَا وَارْحَمْنَا",
        transliteration: "Rabbana-ghfir lana warhamna",
        transliterationBengali: "রাব্বানাগফির লানা ওয়ারহামনা",
        bengali: "হে আমাদের রব আমাদের ক্ষমা করুন ও দয়া করুন",
        english: "Our Lord forgive us and have mercy on us",
        reference: "সূরা আল-আ'রাফ ৭:১৫১"
      },
      {
        id: "quran-30",
        titleBengali: "নূরের দোয়া",
        titleEnglish: "Dua for Light",
        arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا",
        transliteration: "Rabbana atmim lana nurana",
        transliterationBengali: "রাব্বানা আত্মিম লানা নূরানা",
        bengali: "হে আমাদের রব আমাদের নূর পূর্ণ করে দিন",
        english: "Our Lord perfect for us our light",
        reference: "সূরা আত-তাহরীম ৬৬:৮"
      },
      {
        id: "quran-31",
        titleBengali: "সহজতা ও ক্ষমার দোয়া",
        titleEnglish: "Dua for Ease and Forgiveness",
        arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
        transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
        transliterationBengali: "রাব্বানা লা তু'আখিযনা ইন নাসিনা আও আখতা'না",
        bengali: "হে আমাদের রব ভুল বা বিস্মৃতির কারণে আমাদের পাকড়াও করবেন না",
        english: "Our Lord do not take us to task if we forget or err",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "quran-32",
        titleBengali: "যাকারিয়া (আ.) এর দোয়া",
        titleEnglish: "Dua of Zakariyya",
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً",
        transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibah",
        transliterationBengali: "রাব্বি হাব লি মিন লাদুনকা যুররিয়্যাতান ত্বইয়্যিবাহ",
        bengali: "হে আমার রব আপনার পক্ষ থেকে আমাকে পবিত্র সন্তান দান করুন",
        english: "My Lord grant me from Yourself a good offspring",
        reference: "সূরা আলে ইমরান ৩:৩৮"
      },
      {
        id: "quran-33",
        titleBengali: "সত্য আত্মসমর্পণের দোয়া",
        titleEnglish: "Dua for True Submission",
        arabic: "رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ",
        transliteration: "Rabbana amanna bima anzalta",
        transliterationBengali: "রাব্বানা আমান্না বিমা আনজালতা",
        bengali: "হে আমাদের রব আপনি যা নাজিল করেছেন তাতে আমরা ঈমান এনেছি",
        english: "Our Lord we believe in what You have revealed",
        reference: "সূরা আলে ইমরান ৩:৫৩"
      },
      {
        id: "quran-34",
        titleBengali: "ঈসা (আ.) এর দোয়া",
        titleEnglish: "Dua of Isa",
        arabic: "اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً",
        transliteration: "Allahumma rabbana anzil 'alayna ma'idah",
        transliterationBengali: "আল্লাহুম্মা রাব্বানা আনজিল আলাইনা মায়িদাহ",
        bengali: "হে আল্লাহ আমাদের রব আমাদের জন্য আসমান থেকে খাদ্য নাজিল করুন",
        english: "O Allah our Lord send down to us a table from heaven",
        reference: "সূরা আল-মায়িদা ৫:১১৪"
      },
      {
        id: "quran-35",
        titleBengali: "মৃত্যুর সময় ধৈর্যের দোয়া",
        titleEnglish: "Dua for Patience at Death",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
        transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimin",
        transliterationBengali: "রাব্বানা আফরিগ আলাইনা সাবরান ওয়া তাওয়াফ্ফানা মুসলিমীন",
        bengali: "হে আমাদের রব আমাদের ওপর ধৈর্য ঢেলে দিন এবং মুসলিম অবস্থায় মৃত্যু দিন",
        english: "Our Lord pour upon us patience and cause us to die as Muslims",
        reference: "সূরা আল-আ'রাফ ৭:১২৬"
      },
      {
        id: "quran-36",
        titleBengali: "সুন্দর পরিণতির দোয়া",
        titleEnglish: "Dua for a Righteous End",
        arabic: "تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        transliteration: "Tawaffani musliman wa alhiqni bis-salihin",
        transliterationBengali: "তাওয়াফ্ফানি মুসলিমা ওয়া আলহিকনি বিস্সালিহীন",
        bengali: "হে আল্লাহ আমাকে মুসলিম অবস্থায় মৃত্যু দিন এবং সৎকর্মশীলদের সাথে যুক্ত করুন",
        english: "Cause me to die as a Muslim and join me with the righteous",
        reference: "সূরা ইউসুফ ১২:১০১"
      },
      {
        id: "quran-37",
        titleBengali: "পিতামাতা ও মুমিনদের জন্য দোয়া",
        titleEnglish: "Dua for Parents and Believers",
        arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ",
        transliteration: "Rabbana-ghfir li wa li walidayya walil-mu'minin",
        transliterationBengali: "রাব্বানাগফির লি ওয়া লি ওয়ালিদাইয়্যা ওয়ালিল মু'মিনীন",
        bengali: "হে আমাদের রব আমাকে আমার পিতামাতাকে ও সকল মুমিনকে ক্ষমা করুন",
        english: "Our Lord forgive me and my parents and the believers",
        reference: "সূরা ইবরাহিম ১৪:৪১"
      },
      {
        id: "quran-38",
        titleBengali: "আইয়ূব (আ.) এর দোয়া",
        titleEnglish: "Dua of Ayyub",
        arabic: "رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
        transliteration: "Rabbi inni massaniyad-durru wa anta arhamur-rahimin",
        transliterationBengali: "রাব্বি ইন্নি মাস্সানিয়াদ্দুর্রু ওয়া আনতা আরহামুর রাহিমীন",
        bengali: "হে আমার রব আমাকে কষ্ট স্পর্শ করেছে আর আপনি সর্বাধিক দয়ালু",
        english: "Indeed adversity has touched me and You are the Most Merciful",
        reference: "সূরা আল-আম্বিয়া ২১:৮৩"
      },
      {
        id: "quran-39",
        titleBengali: "ইউনুস (আ.) এর দোয়া",
        titleEnglish: "Dua of Yunus",
        arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        transliterationBengali: "লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নি কুনতু মিনাজ জালিমীন",
        bengali: "আপনি ছাড়া কোনো উপাস্য নেই—আমি অবশ্যই জালিম ছিলাম",
        english: "There is no deity except You; I was indeed among the wrongdoers",
        reference: "সূরা আল-আম্বিয়া ২১:৮৭"
      },
      {
        id: "quran-40",
        titleBengali: "মূসা (আ.) এর দোয়া",
        titleEnglish: "Dua of Musa",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
        transliterationBengali: "রাব্বি ইন্নি লিমা আনজালতা ইলাইয়া মিন খাইরিন ফাকীর",
        bengali: "হে আমার রব আপনি যে কল্যাণ নাজিল করবেন আমি তার মুখাপেক্ষী",
        english: "My Lord indeed I am in need of whatever good You send down to me",
        reference: "সূরা আল-কাসাস ২৮:২৪"
      },
      {
        id: "quran-41",
        titleBengali: "তওবা কবুলের দোয়া",
        titleEnglish: "Dua for Acceptance of Repentance",
        arabic: "رَبَّنَا تَقَبَّلْ تَوْبَتَنَا",
        transliteration: "Rabbana taqabbal tawbatana",
        transliterationBengali: "রাব্বানা তাকাব্বাল তাওবাতানা",
        bengali: "হে আমাদের রব আমাদের তওবা কবুল করুন",
        english: "Our Lord accept our repentance",
        reference: "সূরা আল-বাকারা ২:১২৮"
      },
      {
        id: "quran-42",
        titleBengali: "কিয়ামতের দিনে রহমতের দোয়া",
        titleEnglish: "Dua for Mercy on Judgment Day",
        arabic: "رَبَّنَا لَا تُخْزِنَا يَوْمَ الْقِيَامَةِ",
        transliteration: "Rabbana la tukhzina yawmal-qiyamah",
        transliterationBengali: "রাব্বানা লা তুখযিনা ইয়াওমাল কিয়ামাহ",
        bengali: "হে আমাদের রব কিয়ামতের দিনে আমাদের লাঞ্ছিত করবেন না",
        english: "Our Lord do not disgrace us on the Day of Resurrection",
        reference: "সূরা আলে ইমরান ৩:৯"
      },
      {
        id: "quran-43",
        titleBengali: "কৃতজ্ঞতার দোয়া",
        titleEnglish: "Dua for Gratitude",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
        transliteration: "Rabbi awzi'ni an ashkura ni'matak",
        transliterationBengali: "রাব্বি আওযি'নি আন আশকুরা নি'মাতাক",
        bengali: "হে আমার রব আমাকে আপনার নিয়ামতের কৃতজ্ঞতা আদায়ে সক্ষম করুন",
        english: "My Lord enable me to be grateful for Your favor",
        reference: "সূরা আন-নামল ২৭:১৯"
      },
      {
        id: "quran-44",
        titleBengali: "আগুনের শাস্তি থেকে রক্ষা",
        titleEnglish: "Dua for Safety from Fire",
        arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ",
        transliteration: "Rabbana-srif 'anna 'adhaba jahannam",
        transliterationBengali: "রাব্বানাসরিফ আন্না আজাবা জাহান্নাম",
        bengali: "হে আমাদের রব জাহান্নামের শাস্তি থেকে আমাদের ফিরিয়ে নিন",
        english: "Our Lord turn away from us the punishment of Hell",
        reference: "সূরা আল-ফুরকান ২৫:৬৫"
      },
      {
        id: "quran-45",
        titleBengali: "ঈমান দৃঢ়তার দোয়া",
        titleEnglish: "Dua for Firm Faith",
        arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا",
        transliteration: "Rabbana amanna faghfir lana",
        transliterationBengali: "রাব্বানা আমান্না ফাগফির লানা",
        bengali: "হে আমাদের রব আমরা ঈমান এনেছি—আমাদের ক্ষমা করুন",
        english: "Our Lord, we have believed, so forgive us",
        reference: "সূরা আলে ইমরান ৩:১৬"
      },
      {
        id: "quran-46",
        titleBengali: "আল্লাহর উপর ভরসার দোয়া",
        titleEnglish: "Dua for Trust in Allah",
        arabic: "رَبَّنَا عَلَيْكَ تَوَكَّلْنَا",
        transliteration: "Rabbana 'alayka tawakkalna",
        transliterationBengali: "রাব্বানা আলাইকা তাওয়াক্কালনা",
        bengali: "হে আমাদের রব আপনার উপরই আমরা ভরসা করেছি",
        english: "Our Lord, upon You we have relied",
        reference: "সূরা ইউনুস ১০:৮৫"
      },
      {
        id: "quran-47",
        titleBengali: "নূর ও ক্ষমার দোয়া",
        titleEnglish: "Dua for Light and Forgiveness",
        arabic: "رَبَّنَا اغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ",
        transliteration: "Rabbana-ghfir lana warhamna wa anta khayrur-rahimin",
        transliterationBengali: "রাব্বানাগফির লানা ওয়ারহামনা ওয়া আনতা খাইরুর রাহিমীন",
        bengali: "হে আমাদের রব আমাদের ক্ষমা করুন ও দয়া করুন—আপনিই শ্রেষ্ঠ দয়ালু",
        english: "Our Lord forgive us and have mercy on us; You are the Best of the merciful",
        reference: "সূরা আল-মু'মিনুন ২৩:১০৯"
      },
      {
        id: "quran-48",
        titleBengali: "জালিমদের অন্তর্ভুক্ত হওয়া থেকে রক্ষা",
        titleEnglish: "Dua for Safety from Wrongdoing",
        arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
        transliteration: "Rabbana la taj'alna ma'al-qawmiz-zalimin",
        transliterationBengali: "রাব্বানা লা তাজআলনা মা'আল কাওমিজ জালিমীন",
        bengali: "হে আমাদের রব আমাদের জালিমদের সাথে অন্তর্ভুক্ত করবেন না",
        english: "Our Lord do not place us among the wrongdoing people",
        reference: "সূরা আল-আ'রাফ ৭:৪৭"
      },
      {
        id: "quran-49",
        titleBengali: "সৎকর্মের দোয়া",
        titleEnglish: "Dua for Good Deeds",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ",
        transliteration: "Rabbi adkhilni mudkhala sidq",
        transliterationBengali: "রাব্বি আদখিলনি মুদখালা সিদক",
        bengali: "হে আমার রব আমাকে সৎ প্রবেশ দান করুন",
        english: "My Lord grant me a sound entrance",
        reference: "সূরা আল-ইসরা ১৭:৮০"
      },
      {
        id: "quran-50",
        titleBengali: "পূর্ণ সফলতার দোয়া",
        titleEnglish: "Dua for Complete Success",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun",
        transliterationBengali: "রাব্বানা হাব লানা মিন আজওয়াজিনা ওয়া যুররিয়্যাতিনা কুররাতা আ'ইউন",
        bengali: "হে আমাদের রব আমাদের স্ত্রী ও সন্তানদের চোখের শীতলতা দান করুন",
        english: "Our Lord grant us from our spouses and offspring comfort to our eyes",
        reference: "সূরা আল-ফুরকান ২৫:৭৪"
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
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২১"
      },
      {
        id: "sunnah-2",
        titleBengali: "উপকারী জ্ঞানের দোয়া",
        titleEnglish: "For Beneficial Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল প্রার্থনা করি।",
        english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "ইবনে মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "sunnah-3",
        titleBengali: "দ্বীন-দুনিয়া-আখিরাত সংশোধন",
        titleEnglish: "For Rectifying All Affairs",
        arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
        bengali: "হে আল্লাহ! আমার দ্বীনকে সংশোধন করে দাও যা আমার সকল বিষয়ের রক্ষাকবচ। আমার দুনিয়াকে সংশোধন করে দাও যেখানে আমার জীবিকা। আমার আখিরাতকে সংশোধন করে দাও যেখানে আমার প্রত্যাবর্তন।",
        english: "O Allah, set right for me my religion which is the safeguard of my affairs. Set right for me my worldly life wherein is my livelihood. Set right for me my Hereafter which is my return.",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২০"
      },
      {
        id: "sunnah-4",
        titleBengali: "নিয়ামত রক্ষার দোয়া",
        titleEnglish: "Protection of Blessings",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيعِ سَخَطِكَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই তোমার নিয়ামত চলে যাওয়া থেকে, তোমার দেওয়া সুস্থতা বদলে যাওয়া থেকে, আকস্মিক আযাব থেকে এবং তোমার সকল অসন্তুষ্টি থেকে।",
        english: "O Allah, I seek refuge in You from the removal of Your blessings, the change of Your protection, Your sudden punishment, and all of Your displeasure.",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭৩৯"
      },
      {
        id: "sunnah-5",
        titleBengali: "যিকর-শুকর-ইবাদতের দোয়া",
        titleEnglish: "For Remembrance & Worship",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        bengali: "হে আল্লাহ! তোমার যিকর, শুকর এবং সুন্দরভাবে তোমার ইবাদত করতে আমাকে সাহায্য কর।",
        english: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        reference: "আবু দাউদ, হাদিস নং ১৫২২; নাসাঈ, হাদিস নং ১৩০৩"
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
      },
      {
        id: "sunnah-11",
        titleBengali: "সকালের যিকির",
        titleEnglish: "Morning Remembrance",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal-mulku lillah",
        transliterationBengali: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ",
        bengali: "আমরা সকালে উপনীত হলাম এবং সমস্ত কর্তৃত্ব আল্লাহর",
        english: "We have entered the morning and all dominion belongs to Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩"
      },
      {
        id: "sunnah-12",
        titleBengali: "সন্ধ্যার যিকির",
        titleEnglish: "Evening Remembrance",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        transliteration: "Amsayna wa amsal-mulku lillah",
        transliterationBengali: "আমসাইনা ওয়া আমসাল মুলকু লিল্লাহ",
        bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং সমস্ত কর্তৃত্ব আল্লাহর",
        english: "We have entered the evening and all dominion belongs to Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩"
      },
      {
        id: "sunnah-13",
        titleBengali: "ক্ষমা প্রার্থনার দোয়া",
        titleEnglish: "Seeking Forgiveness",
        arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullaha wa atubu ilayh",
        transliterationBengali: "আস্তাগফিরুল্লাহা ওয়া আতুবু ইলাইহ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই ও তাঁর দিকে ফিরে যাই",
        english: "I seek forgiveness from Allah and repent to Him",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০২"
      },
      {
        id: "sunnah-14",
        titleBengali: "আল্লাহর নামে নিরাপত্তা",
        titleEnglish: "Protection in Allah's Name",
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ",
        transliteration: "Bismillahil-ladhi la yadurru",
        transliterationBengali: "বিসমিল্লাহিল্লাজি লা ইয়াদুর্রু",
        bengali: "আল্লাহর নামে যাঁর নামে কিছুই ক্ষতি করতে পারে না",
        english: "In the name of Allah with whose name nothing can harm",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৮৮"
      },
      {
        id: "sunnah-15",
        titleBengali: "সুস্থতার দোয়া",
        titleEnglish: "Wellbeing Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
        transliteration: "Allahumma inni as'alukal-'afiyah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকাল আফিয়াহ",
        bengali: "হে আল্লাহ আমি আপনার কাছে সুস্থতা চাই",
        english: "O Allah I ask You for wellbeing",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৯৯"
      },
      {
        id: "sunnah-16",
        titleBengali: "দুশ্চিন্তা থেকে রক্ষা",
        titleEnglish: "Protection from Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল হাম্মি ওয়াল হাজান",
        bengali: "হে আল্লাহ দুশ্চিন্তা ও দুঃখ থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from anxiety and grief",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "sunnah-17",
        titleBengali: "অলসতা থেকে রক্ষা",
        titleEnglish: "Protection from Laziness",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ",
        transliteration: "Allahumma inni a'udhu bika minal-kasal",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল কাসাল",
        bengali: "হে আল্লাহ অলসতা থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from laziness",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৬"
      },
      {
        id: "sunnah-18",
        titleBengali: "আল্লাহর উপর ভরসা",
        titleEnglish: "Trust in Allah",
        arabic: "تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Tawakkaltu 'alallah",
        transliterationBengali: "তাওয়াক্কালতু আলাল্লাহ",
        bengali: "আমি আল্লাহর উপর ভরসা করেছি",
        english: "I place my trust in Allah",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৫"
      },
      {
        id: "sunnah-19",
        titleBengali: "উপকারী জ্ঞানের দোয়া",
        titleEnglish: "Seeking Beneficial Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'a",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা ইলমান নাফিআ",
        bengali: "হে আল্লাহ আমাকে উপকারী জ্ঞান দান করুন",
        english: "O Allah grant me beneficial knowledge",
        reference: "সুনান ইবনে মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "sunnah-20",
        titleBengali: "নিয়ামতের কৃতজ্ঞতা",
        titleEnglish: "Gratitude for Blessings",
        arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ",
        transliteration: "Allahumma ma asbaha bi min ni'mah",
        transliterationBengali: "আল্লাহুম্মা মা আসবাহা বি মিন নি'মাহ",
        bengali: "আমার উপর যে সকল নিয়ামত এসেছে তা আপনার পক্ষ থেকে",
        english: "Whatever blessing I have is from You",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৩"
      },
      {
        id: "sunnah-21",
        titleBengali: "ঘরে প্রবেশের দোয়া",
        titleEnglish: "Entering Home Dua",
        arabic: "بِسْمِ اللَّهِ وَلَجْنَا",
        transliteration: "Bismillahi walajna",
        transliterationBengali: "বিসমিল্লাহি ওয়ালাজনা",
        bengali: "আল্লাহর নামে আমরা প্রবেশ করলাম",
        english: "In the name of Allah we enter",
        reference: "সহীহ মুসলিম, হাদিস নং ২০১৮"
      },
      {
        id: "sunnah-22",
        titleBengali: "বাড়ি থেকে বের হওয়ার দোয়া",
        titleEnglish: "Leaving Home Dua",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Bismillahi tawakkaltu 'alallah",
        transliterationBengali: "বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহ",
        bengali: "আল্লাহর নামে বের হলাম ও তাঁর উপর ভরসা করলাম",
        english: "In the name of Allah, I trust in Allah",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৫"
      },
      {
        id: "sunnah-23",
        titleBengali: "খাওয়ার আগে দোয়া",
        titleEnglish: "Before Eating Dua",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        transliterationBengali: "বিসমিল্লাহ",
        bengali: "আল্লাহর নামে শুরু করছি",
        english: "In the name of Allah",
        reference: "সহীহ বুখারী, হাদিস নং ৫৩৭৬"
      },
      {
        id: "sunnah-24",
        titleBengali: "খাওয়ার পর দোয়া",
        titleEnglish: "After Eating Dua",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي",
        transliteration: "Alhamdulillahil-ladhi at'amani",
        transliterationBengali: "আলহামদুলিল্লাহিল্লাজি আত'আমানি",
        bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাকে খাবার দিলেন",
        english: "Praise be to Allah who fed me",
        reference: "সুনান আবু দাউদ, হাদিস নং ৪০২৩"
      },
      {
        id: "sunnah-25",
        titleBengali: "ঘুমের আগে দোয়া",
        titleEnglish: "Before Sleeping Dua",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        transliterationBengali: "বিসমিকা আল্লাহুম্মা আমুতু ওয়া আহইয়া",
        bengali: "হে আল্লাহ আপনার নামেই আমি মরি ও বাঁচি",
        english: "In Your name O Allah I die and I live",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩২৪"
      },
      {
        id: "sunnah-26",
        titleBengali: "ঘুম থেকে উঠার দোয়া",
        titleEnglish: "Waking Up Dua",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا",
        transliteration: "Alhamdulillahil-ladhi ahyana",
        transliterationBengali: "আলহামদুল্লাহিল্লাজি আহইয়ানা",
        bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের জীবন ফিরিয়ে দিলেন",
        english: "Praise be to Allah who gave us life",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩১২"
      },
      {
        id: "sunnah-27",
        titleBengali: "টয়লেটে প্রবেশের দোয়া",
        titleEnglish: "Entering Toilet Dua",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ",
        transliteration: "Allahumma inni a'udhu bika minal-khubuthi",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল খুবুথি",
        bengali: "হে আল্লাহ অপবিত্রতা থেকে আপনার আশ্রয় চাই",
        english: "O Allah I seek refuge in You from impurity",
        reference: "সহীহ বুখারী, হাদিস নং ১৪২"
      },
      {
        id: "sunnah-28",
        titleBengali: "টয়লেট থেকে বের হওয়ার দোয়া",
        titleEnglish: "Leaving Toilet Dua",
        arabic: "غُفْرَانَكَ",
        transliteration: "Ghufranak",
        transliterationBengali: "গুফরানাক",
        bengali: "হে আল্লাহ আপনার ক্ষমা চাই",
        english: "I seek Your forgiveness",
        reference: "সুনান আবু দাউদ, হাদিস নং ৩০"
      },
      {
        id: "sunnah-29",
        titleBengali: "ভালো কিছু দেখলে দোয়া",
        titleEnglish: "Seeing Something Good",
        arabic: "اللَّهُمَّ بَارِكْ فِيهِ",
        transliteration: "Allahumma barik fihi",
        transliterationBengali: "আল্লাহুম্মা বারিক ফিহি",
        bengali: "হে আল্লাহ এতে বরকত দিন",
        english: "O Allah bless it",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১৫৭২৯"
      },
      {
        id: "sunnah-30",
        titleBengali: "সফরের দোয়া",
        titleEnglish: "Travel Dua",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
        transliteration: "Subhanalladhi sakhkhara lana hadha",
        transliterationBengali: "সুবহানাল্লাজি সাখখারা লানা হাজা",
        bengali: "পবিত্র তিনি যিনি আমাদের জন্য এটি বশীভূত করেছেন",
        english: "Glory be to Him who subjected this to us",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২"
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
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২২"
      },
      {
        id: "knowledge-9",
        titleBengali: "কুরআন মুখস্থের দোয়া",
        titleEnglish: "For Quran Memorization",
        arabic: "اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً",
        bengali: "হে আল্লাহ! কুরআনের মাধ্যমে আমার উপর রহম কর এবং এটিকে আমার জন্য ইমাম, নূর, হিদায়াত ও রহমত বানাও।",
        english: "O Allah, have mercy on me through the Quran, and make it for me a leader, light, guidance, and mercy.",
        reference: "তাবারানী, আল-মুজামুল কাবীর"
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
        reference: "ইবনে মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "rizq-2",
        titleBengali: "হালাল রিজিকের দোয়া",
        titleEnglish: "For Halal Sustenance",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহ দিয়ে আমাকে তোমা ছাড়া অন্যদের থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all those besides You by Your bounty.",
        reference: "তিরমিযী, হাদিস নং ৩৫৬৩"
      },
      {
        id: "rizq-3",
        titleBengali: "দারিদ্র্য থেকে আশ্রয়",
        titleEnglish: "Refuge from Poverty",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ، وَالْقِلَّةِ، وَالذِّلَّةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দারিদ্র্য, অভাব এবং অপমান থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from poverty, scarcity, and humiliation.",
        reference: "আবু দাউদ, হাদিস নং ১৫৪৪"
      },
      {
        id: "rizq-4",
        titleBengali: "রিজিকে বরকতের দোয়া",
        titleEnglish: "Blessings in Provision",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আল্লাহ! তুমি আমাদেরকে যা রিজিক দিয়েছ তাতে বরকত দাও এবং জাহান্নামের আযাব থেকে আমাদের রক্ষা কর।",
        english: "O Allah, bless us in what You have provided us and protect us from the punishment of the Fire.",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭৩৪"
      },
      {
        id: "rizq-5",
        titleBengali: "রিজিক প্রশস্ত করার দোয়া",
        titleEnglish: "For Expanded Provision",
        arabic: "اللَّهُمَّ أَوْسِعْ لِي فِي رِزْقِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي",
        bengali: "হে আল্লাহ! আমার রিজিক প্রশস্ত কর এবং তুমি আমাকে যা দিয়েছ তাতে বরকত দাও।",
        english: "O Allah, expand my provision and bless me in what You have given me.",
        reference: "তাবারানী, আল-মুজামুল আওসাত"
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
        reference: "তাবারানী, আল-মুজামুল কাবীর"
      },
      {
        id: "rizq-8",
        titleBengali: "ঋণ মুক্তির দোয়া",
        titleEnglish: "For Removing Debt",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহে আমাকে তোমা ছাড়া সবার থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all besides You through Your bounty.",
        reference: "তিরমিযী, হাদিস নং ৩৫৬৩"
      },
      {
        id: "rizq-9",
        titleBengali: "রিজিকে প্রাচুর্যের দোয়া",
        titleEnglish: "For Abundance in Sustenance",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, প্রশস্ত রিজিক এবং কবুলযোগ্য আমল চাই।",
        english: "O Allah, I ask You for beneficial knowledge, abundant provision, and accepted deeds.",
        reference: "ইবনে মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "rizq-10",
        titleBengali: "উপার্জনে বরকতের দোয়া",
        titleEnglish: "For Barakah in Earnings",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي كَسْبِي وَفِيمَا رَزَقْتَنِي وَاجْعَلْهُ حَلاَلاً طَيِّبًا",
        bengali: "হে আল্লাহ! আমার উপার্জনে এবং তুমি আমাকে যা রিজিক দিয়েছ তাতে বরকত দাও এবং তা হালাল ও পবিত্র কর।",
        english: "O Allah, bless me in my earnings and in what You have provided me, and make it lawful and pure.",
        reference: "বায়হাকী, শুআবুল ঈমান"
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
        reference: "সহীহ বুখারী, হাদিস নং ৫৬৭৫; সহীহ মুসলিম, হাদিস নং ২১৯১"
      },
      {
        id: "health-2",
        titleBengali: "অসুস্থ ব্যক্তির জন্য দোয়া",
        titleEnglish: "For the Sick Person",
        arabic: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        bengali: "আমি মহান আল্লাহর কাছে প্রার্থনা করি, যিনি মহান আরশের রব, তিনি যেন তোমাকে সুস্থ করে দেন। (৭ বার পড়ুন)",
        english: "I ask Allah, the Mighty, the Lord of the Mighty Throne, to cure you. (Recite 7 times)",
        reference: "আবু দাউদ, হাদিস নং ৩১০৬; তিরমিযী, হাদিস নং ২০৮৩"
      },
      {
        id: "health-3",
        titleBengali: "ঝাড়ফুঁকের দোয়া (রুকইয়াহ)",
        titleEnglish: "Ruqyah for Healing",
        arabic: "بِسْمِ اللهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللهُ يَشْفِيكَ، بِسْمِ اللهِ أَرْقِيكَ",
        bengali: "আল্লাহর নামে তোমাকে ঝাড়ফুঁক করছি, প্রতিটি কষ্টদায়ক বিষয় থেকে, প্রতিটি হিংসুক আত্মা বা বদনজর থেকে। আল্লাহ তোমাকে সুস্থ করুন, আল্লাহর নামে তোমাকে ঝাড়ফুঁক করছি।",
        english: "In the name of Allah I perform ruqyah for you, from everything that is harming you, from the evil of every soul or envious eye. May Allah cure you, in the name of Allah I perform ruqyah for you.",
        reference: "সহীহ মুসলিম, হাদিস নং ২১৮৬"
      },
      {
        id: "health-4",
        titleBengali: "শরীর-কান-চোখের সুস্থতা",
        titleEnglish: "Health of Body, Hearing & Sight",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
        bengali: "হে আল্লাহ! আমার শরীরে সুস্থতা দাও। হে আল্লাহ! আমার শ্রবণশক্তিতে সুস্থতা দাও। হে আল্লাহ! আমার দৃষ্টিশক্তিতে সুস্থতা দাও।",
        english: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.",
        reference: "আবু দাউদ, হাদিস নং ৫০৯০"
      },
      {
        id: "health-5",
        titleBengali: "ব্যথা থেকে আশ্রয়",
        titleEnglish: "Relief from Pain",
        arabic: "أَعُوذُ بِعِزَّةِ اللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        bengali: "আমি আল্লাহর ইজ্জত ও কুদরতের আশ্রয় নিচ্ছি আমার অনুভূত ও আশঙ্কিত অনিষ্ট থেকে। (৭ বার পড়ুন)",
        english: "I seek refuge in the might of Allah and His power from the evil of what I feel and fear. (Recite 7 times)",
        reference: "সহীহ মুসলিম, হাদিস নং ২২০২"
      },
      {
        id: "health-6",
        titleBengali: "দুনিয়া-আখিরাতে সুস্থতা",
        titleEnglish: "Well-being in Both Worlds",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে দুনিয়া ও আখিরাতে সুস্থতা প্রার্থনা করি।",
        english: "O Allah, I ask You for well-being in this world and the Hereafter.",
        reference: "ইবনে মাজাহ, হাদিস নং ৩৮৭১"
      },
      {
        id: "health-7",
        titleBengali: "অসুস্থকে দেখতে যাওয়ার দোয়া",
        titleEnglish: "When Visiting the Sick",
        arabic: "لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ",
        bengali: "ভয় নেই, ইনশাআল্লাহ এটি পবিত্রতা (গুনাহ মাফের মাধ্যম)।",
        english: "No harm, it is a purification (from sins) if Allah wills.",
        reference: "সহীহ বুখারী, হাদিস নং ৩৬১৬"
      },
      {
        id: "health-8",
        titleBengali: "সম্পূর্ণ সুস্থতার দোয়া",
        titleEnglish: "For Complete Recovery",
        arabic: "اللَّهُمَّ اشْفِهِ، اللَّهُمَّ عَافِهِ",
        bengali: "হে আল্লাহ! তাকে সুস্থ কর। হে আল্লাহ! তাকে সুস্থতা দান কর।",
        english: "O Allah, cure him. O Allah, grant him well-being.",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১৫৪৬৮"
      },
      {
        id: "health-9",
        titleBengali: "ব্যথা দূর করার দোয়া",
        titleEnglish: "For Removing Pain",
        arabic: "بِسْمِ اللهِ ثَلاَثًا، وَقُلْ سَبْعَ مَرَّاتٍ: أَعُوذُ بِاللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        bengali: "আল্লাহর নামে (৩ বার)। তারপর বলুন (৭ বার): আমি আল্লাহ ও তাঁর কুদরতের আশ্রয় নিচ্ছি আমার অনুভূত ও আশঙ্কিত ক্ষতি থেকে।",
        english: "In the name of Allah (3 times). Then say (7 times): I seek refuge in Allah and His power from the evil of what I feel and fear.",
        reference: "সহীহ মুসলিম, হাদিস নং ২২০২"
      },
      {
        id: "health-10",
        titleBengali: "মানসিক স্বাস্থ্যের দোয়া",
        titleEnglish: "For Mental Health",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই শ্বেতী, উন্মাদনা, কুষ্ঠ এবং মন্দ রোগসমূহ থেকে।",
        english: "O Allah, I seek refuge in You from vitiligo, madness, leprosy, and from evil diseases.",
        reference: "আবু দাউদ, হাদিস নং ১৫৫৪"
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
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৪৬; সহীহ মুসলিম, হাদিস নং ২৭৩০"
      },
      {
        id: "stress-2",
        titleBengali: "দুশ্চিন্তা থেকে আশ্রয়",
        titleEnglish: "Refuge from Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        bengali: "হে আল্লাহ! আমি তোমার আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অক্ষমতা ও অলসতা থেকে, কাপুরুষতা ও কৃপণতা থেকে এবং ঋণের বোঝা ও মানুষের দমন থেকে।",
        english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৩"
      },
      {
        id: "stress-3",
        titleBengali: "রহমত ও সাহায্যের দোয়া",
        titleEnglish: "For Mercy & Help",
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لاَ إِلَهَ إِلاَّ أَنْتَ",
        bengali: "হে আল্লাহ! আমি তোমার রহমতের আশা করি। এক পলকের জন্যও আমাকে আমার নিজের উপর ছেড়ে দিও না এবং আমার সব বিষয় ঠিক করে দাও। তুমি ছাড়া কোন ইলাহ নেই।",
        english: "O Allah, I hope for Your mercy. Do not leave me to myself even for the blink of an eye. Correct all of my affairs for me. There is no deity except You.",
        reference: "আবু দাউদ, হাদিস নং ৫০৯০"
      },
      {
        id: "stress-4",
        titleBengali: "সাহায্য প্রার্থনা",
        titleEnglish: "Seeking Divine Help",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help.",
        reference: "তিরমিযী, হাদিস নং ৩৫২৪"
      },
      {
        id: "stress-5",
        titleBengali: "আল্লাহই যথেষ্ট",
        titleEnglish: "Allah is Sufficient",
        arabic: "حَسْبِيَ اللهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        bengali: "আল্লাহই আমার জন্য যথেষ্ট, তিনি ছাড়া কোন ইলাহ নেই। তাঁর উপরই আমি ভরসা করি এবং তিনি মহান আরশের রব। (৭ বার পড়ুন)",
        english: "Allah is sufficient for me. There is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne. (Recite 7 times)",
        reference: "আবু দাউদ, হাদিস নং ৫০৮১"
      },
      {
        id: "stress-6",
        titleBengali: "দুঃখ দূর করার দোয়া",
        titleEnglish: "Removing Grief & Sorrow",
        arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ",
        bengali: "হে আল্লাহ! আমি তোমার বান্দা, তোমার বান্দার সন্তান, তোমার বান্দির সন্তান। আমার কপাল তোমার হাতে, তোমার নির্দেশ আমার উপর কার্যকর, তোমার ফায়সালা আমার জন্য ন্যায়সঙ্গত।",
        english: "O Allah, I am Your slave, son of Your male slave, son of Your female slave. My forelock is in Your Hand. Your command concerning me prevails, and Your judgment concerning me is just.",
        reference: "মুসনাদ আহমাদ, হাদিস নং ৩৭১২"
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
        reference: "সহীহ মুসলিম, হাদিস নং ৭৬৩"
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
        reference: "আবু দাউদ, হাদিস নং ৫০৯৫; তিরমিযী, হাদিস নং ৩৪২৬"
      },
      {
        id: "work-2",
        titleBengali: "সফলতার দোয়া",
        titleEnglish: "For Success",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল চাই।",
        english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reference: "ইবনে মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "work-3",
        titleBengali: "কাজ সহজ করার দোয়া",
        titleEnglish: "For Easy Tasks",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً",
        bengali: "হে আল্লাহ! কোন কাজ সহজ নয় যতক্ষণ না তুমি তা সহজ কর। তুমি চাইলে কঠিন কাজকেও সহজ করে দাও।",
        english: "O Allah, nothing is easy except what You make easy, and You can make the difficult easy if You wish.",
        reference: "ইবনে হিব্বান, হাদিস নং ৯৭৪"
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
        reference: "তাবারানী, আল-মুজামুল কাবীর"
      },
      {
        id: "work-6",
        titleBengali: "ভালো সহকর্মীর জন্য দোয়া",
        titleEnglish: "For Good Colleagues",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর এবং আমাদের পারস্পরিক সম্পর্ক ঠিক করে দাও।",
        english: "O Allah, bring love between our hearts and rectify our mutual relations.",
        reference: "আবু দাউদ, হাদিস নং ৯৬৯"
      },
      {
        id: "work-7",
        titleBengali: "পদোন্নতির জন্য দোয়া",
        titleEnglish: "For Promotion & Growth",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ",
        bengali: "হে আল্লাহ! আমি তোমার অনুগ্রহ ও রহমত চাই।",
        english: "O Allah, I ask You from Your bounty and mercy.",
        reference: "তাবারানী, আল-মুজামুল আওসাত"
      },
      {
        id: "work-8",
        titleBengali: "সিদ্ধান্ত নেওয়ার দোয়া",
        titleEnglish: "For Making Decisions",
        arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
        bengali: "হে আল্লাহ! আমার জন্য যা কল্যাণকর তা নির্ধারণ কর এবং আমার জন্য তা পছন্দ কর।",
        english: "O Allah, decree what is good for me and choose it for me.",
        reference: "তিরমিযী, হাদিস নং ৩৫১৬"
      },
      {
        id: "work-9",
        titleBengali: "মিটিংয়ের আগে দোয়া",
        titleEnglish: "Before Meeting",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        bengali: "হে আল্লাহ! তোমার যিকর, শুকর এবং সুন্দরভাবে তোমার ইবাদত করতে আমাকে সাহায্য কর।",
        english: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        reference: "আবু দাউদ, হাদিস নং ১৫২২; নাসাঈ, হাদিস নং ১৩০৩"
      },
      {
        id: "work-10",
        titleBengali: "কাজ শেষের দোয়া",
        titleEnglish: "After Completing Work",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        bengali: "সকল প্রশংসা আল্লাহর জন্য যাঁর অনুগ্রহে সকল ভালো কাজ সম্পন্ন হয়।",
        english: "All praise is for Allah by whose grace all good things are completed.",
        reference: "ইবনে মাজাহ, হাদিস নং ৩৮০৩"
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
        reference: "আবু দাউদ, হাদিস নং ৯৬৯"
      },
      {
        id: "family-5",
        titleBengali: "বরকতের দোয়া",
        titleEnglish: "Prayer for Blessings",
        arabic: "اللَّهُمَّ بَارِكْ لَهُ، وَبَارِكْ عَلَيْهِ",
        bengali: "হে আল্লাহ! তার জন্য বরকত দাও এবং তার উপর বরকত দাও।",
        english: "O Allah, bless him and send blessings upon him.",
        reference: "নাসাঈ, হাদিস নং ৯২৯৮"
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
        reference: "আবু দাউদ, হাদিস নং ৯৬৯"
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
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-2",
        arabic: "بَارَكَ اللهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        bengali: "আল্লাহ তোমার জন্য বরকত দিন, তোমার উপর বরকত দিন এবং তোমাদের উভয়কে কল্যাণের মধ্যে একত্রিত করুন।",
        english: "May Allah bless you, and shower His blessings upon you, and join you both in goodness.",
        reference: "আবু দাউদ, হাদিস নং ২১৩০; তিরমিযী, হাদিস নং ১০৯১"
      },
      {
        id: "marriage-3",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِهِمَا كَمَا أَلَّفْتَ بَيْنَ قُلُوبِ آدَمَ وَحَوَّاءَ",
        bengali: "হে আল্লাহ! তাদের অন্তরে ভালোবাসা সৃষ্টি কর যেমন তুমি আদম ও হাওয়ার অন্তরে ভালোবাসা সৃষ্টি করেছিলে।",
        english: "O Allah, create love between their hearts as You created love between the hearts of Adam and Hawwa (Eve).",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-4",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তার কল্যাণ চাই এবং তাকে যে স্বভাবে সৃষ্টি করেছ তার কল্যাণ চাই। আমি তার অনিষ্ট থেকে এবং তাকে যে স্বভাবে সৃষ্টি করেছ তার অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for her goodness and the goodness You have created in her, and I seek refuge in You from her evil and the evil You have created in her.",
        reference: "আবু দাউদ, হাদিস নং ২১৬০"
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
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-7",
        titleBengali: "বাসর রাতের দোয়া",
        titleEnglish: "First Night Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তার কল্যাণ চাই এবং তুমি তাকে যে স্বভাবে সৃষ্টি করেছ তার কল্যাণ চাই। আর তার অনিষ্ট থেকে এবং তুমি তাকে যে স্বভাবে সৃষ্টি করেছ তার অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for her goodness and the goodness upon which You have created her, and I seek refuge in You from her evil and the evil upon which You have created her.",
        reference: "আবু দাউদ, হাদিস নং ২১৬০; ইবনে মাজাহ, হাদিস নং ১৯১৮"
      },
      {
        id: "marriage-8",
        titleBengali: "দাম্পত্য ভালোবাসার দোয়া",
        titleEnglish: "For Marital Love",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরের মধ্যে ভালোবাসা সৃষ্টি কর এবং আমাদের পারস্পরিক সম্পর্ক সংশোধন করে দাও।",
        english: "O Allah, bring love between our hearts and rectify our mutual relations.",
        reference: "সহীহ মুসলিম, হাদিস নং ৫৩৮"
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
        reference: "সহীহ বুখারী, হাদিস নং ৩৩৭১"
      },
      {
        id: "children-7",
        titleBengali: "নবজাতকের জন্য দোয়া",
        titleEnglish: "For Newborn Baby",
        arabic: "بَارَكَ اللهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
        bengali: "আল্লাহ তোমাকে যা দান করেছেন তাতে বরকত দিন। তুমি দাতার শুকরিয়া আদায় কর। সে যেন পূর্ণ যৌবনে পৌঁছে এবং তুমি তার সদ্ব্যবহার পাও।",
        english: "May Allah bless you in what He has given you, may you give thanks to the Giver, may he reach full maturity, and may you be blessed with his righteousness.",
        reference: "ইবনে সুন্নী, আমালুল ইয়াওমি ওয়াল লাইলাহ"
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
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৪৩৯২"
      },
      {
        id: "children-10",
        titleBengali: "কিশোর সন্তানের জন্য দোয়া",
        titleEnglish: "For Teenage Children",
        arabic: "اللَّهُمَّ اهْدِ أَوْلاَدِي وَثَبِّتْهُمْ عَلَى الْحَقِّ وَاجْعَلْهُمْ مِنَ الصَّالِحِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের হিদায়াত দাও, তাদের সত্যের উপর অটল রাখ এবং তাদের নেককারদের অন্তর্ভুক্ত কর।",
        english: "O Allah, guide my children, keep them firm upon the truth, and make them among the righteous.",
        reference: "হিসনুল মুসলিম"
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
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২; তিরমিযী, হাদিস নং ৩৪৪৬"
      },
      {
        id: "travel-2",
        titleBengali: "সফরে নেকীর দোয়া",
        titleEnglish: "For Goodness in Travel",
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى",
        bengali: "হে আল্লাহ! আমরা আমাদের এই সফরে তোমার কাছে নেকী ও তাকওয়া এবং এমন আমল প্রার্থনা করছি যা তুমি পছন্দ কর।",
        english: "O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You.",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২"
      },
      {
        id: "travel-3",
        titleBengali: "সফর সহজ করার দোয়া",
        titleEnglish: "For Easy Journey",
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
        bengali: "হে আল্লাহ! আমাদের এই সফর আমাদের জন্য সহজ করে দাও এবং এর দূরত্ব সংক্ষেপ করে দাও।",
        english: "O Allah, make this journey easy for us and shorten its distance for us.",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২"
      },
      {
        id: "travel-4",
        titleBengali: "আল্লাহকে সাথী করার দোয়া",
        titleEnglish: "Allah as Companion",
        arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الأَهْلِ",
        bengali: "হে আল্লাহ! তুমি সফরে আমার সাথী এবং পরিবারে আমার প্রতিনিধি।",
        english: "O Allah, You are the Companion on the journey and the Guardian of the family.",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২"
      },
      {
        id: "travel-5",
        titleBengali: "নতুন জায়গায় নামার দোয়া",
        titleEnglish: "When Stopping at a Place",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই। (নতুন জায়গায় নামার সময়)",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created. (When stopping at a new place)",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০৮"
      },
      {
        id: "travel-6",
        titleBengali: "সফর থেকে ফেরার দোয়া",
        titleEnglish: "When Returning from Travel",
        arabic: "آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ",
        bengali: "আমরা প্রত্যাবর্তনকারী, তাওবাকারী, ইবাদতকারী এবং আমাদের রবের প্রশংসাকারী। (সফর থেকে ফেরার সময়)",
        english: "We are returning, repenting, worshipping, and praising our Lord. (When returning from travel)",
        reference: "সহীহ বুখারী, হাদিস নং ১৭৯৭; সহীহ মুসলিম, হাদিস নং ১৩৪২"
      },
      {
        id: "travel-7",
        titleBengali: "বিমান/দীর্ঘ সফরের আগে দোয়া",
        titleEnglish: "Before Flight/Long Journey",
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
        bengali: "হে আল্লাহ! আমাদের এই সফরকে সহজ করে দাও এবং এর দূরত্ব আমাদের জন্য কমিয়ে দাও।",
        english: "O Allah, make this journey of ours easy and shorten its distance for us.",
        reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২"
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
        reference: "তাবারানী, আল-মুজামুল কাবীর"
      },
      {
        id: "travel-10",
        titleBengali: "হজ্জ/উমরার দোয়া",
        titleEnglish: "For Hajj/Umrah",
        arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
        bengali: "আমি হাজির হে আল্লাহ! আমি হাজির। আমি হাজির, তোমার কোন শরীক নেই, আমি হাজির। নিশ্চয়ই সকল প্রশংসা, নিয়ামত এবং রাজত্ব তোমারই, তোমার কোন শরীক নেই।",
        english: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner.",
        reference: "সহীহ বুখারী, হাদিস নং ১৫৪৯; সহীহ মুসলিম, হাদিস নং ১১৮৪"
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
        reference: "সহীহ মুসলিম, হাদিস নং ৯১৮"
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
        reference: "সহীহ বুখারী, হাদিস নং ৪২০৫; সহীহ মুসলিম, হাদিস নং ২৭০৪"
      },
      {
        id: "hardship-4",
        titleBengali: "কঠিন বিপদ থেকে আশ্রয়",
        titleEnglish: "Refuge from Severe Trials",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلاَءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الأَعْدَاءِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে আশ্রয় চাই কঠিন বিপদ থেকে, দুর্ভাগ্যে পতিত হওয়া থেকে, মন্দ তাকদীর থেকে এবং শত্রুদের আনন্দ থেকে।",
        english: "O Allah, I seek refuge in You from severe trials, from falling into misfortune, from bad fate, and from the gloating of enemies.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৬১৬; সহীহ মুসলিম, হাদিস নং ২৭০৭"
      },
      {
        id: "hardship-5",
        titleBengali: "কঠিনকে সহজ করার দোয়া",
        titleEnglish: "Making Difficulties Easy",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
        bengali: "হে আল্লাহ! তুমি যা সহজ কর তা ছাড়া কিছুই সহজ নয়। তুমি চাইলে কঠিন বিষয়কেও সহজ করে দাও।",
        english: "O Allah, there is nothing easy except what You make easy. And You make the difficult easy if You wish.",
        reference: "ইবনে হিব্বান, হাদিস নং ৯৭৪"
      },
      {
        id: "hardship-6",
        titleBengali: "সাহায্য প্রার্থনার দোয়া",
        titleEnglish: "Seeking Allah's Help",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি। আমার সব বিষয় ঠিক করে দাও এবং এক পলকের জন্যও আমাকে আমার উপর ছেড়ে দিও না।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Correct all of my affairs for me and do not leave me to myself even for the blink of an eye.",
        reference: "মুসতাদরাক হাকিম, হাদিস নং ১৯৮৯"
      },
      {
        id: "hardship-7",
        titleBengali: "প্রাকৃতিক দুর্যোগে দোয়া",
        titleEnglish: "During Natural Disaster",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে এর কল্যাণ, এর মধ্যে যা আছে তার কল্যাণ এবং যে উদ্দেশ্যে একে পাঠানো হয়েছে তার কল্যাণ চাই। আর তোমার কাছে আশ্রয় চাই এর অনিষ্ট থেকে, এর মধ্যে যা আছে তার অনিষ্ট থেকে এবং যে উদ্দেশ্যে একে পাঠানো হয়েছে তার অনিষ্ট থেকে।",
        english: "O Allah, I ask You for its good, the good in it, and the good for which it was sent. I seek refuge in You from its evil, the evil in it, and the evil for which it was sent.",
        reference: "সহীহ মুসলিম, হাদিস নং ৮৯৯"
      },
      {
        id: "hardship-8",
        titleBengali: "আর্থিক সংকটে দোয়া",
        titleEnglish: "During Financial Hardship",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে আমাকে হারাম থেকে বাঁচাও এবং তোমার অনুগ্রহে আমাকে তোমা ছাড়া সবার থেকে মুক্ত রাখ।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and make me independent of all besides You through Your bounty.",
        reference: "তিরমিযী, হাদিস নং ৩৫৬৩"
      },
      {
        id: "hardship-9",
        titleBengali: "কাউকে হারানোর পর দোয়া",
        titleEnglish: "After Losing Someone",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        bengali: "নিশ্চয়ই আমরা আল্লাহর জন্য এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে। হে আল্লাহ! আমার এই বিপদে আমাকে সওয়াব দাও এবং এর বিনিময়ে আমাকে এর চেয়ে উত্তম কিছু দাও।",
        english: "Indeed we belong to Allah and to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.",
        reference: "সহীহ মুসলিম, হাদিস নং ৯১৮"
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
        reference: "আবু দাউদ, হাদিস নং ৫০৭৯"
      },
      {
        id: "akhirah-3",
        titleBengali: "জাহান্নাম থেকে রক্ষা",
        titleEnglish: "Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        bengali: "হে আল্লাহ! আমাকে জাহান্নাম থেকে রক্ষা কর। (৭ বার পড়ুন)",
        english: "O Allah, save me from the Fire. (Recite 7 times)",
        reference: "আবু দাউদ, হাদিস নং ৫০৭৯"
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
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৫১০২"
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
        reference: "সহীহ বুখারী, হাদিস নং ৬৬০ (সংশ্লিষ্ট হাদীস থেকে)"
      },
      {
        id: "akhirah-8",
        titleBengali: "পুলসিরাত পার হওয়ার দোয়া",
        titleEnglish: "For Crossing Sirat",
        arabic: "اللَّهُمَّ سَلِّمْنِي مِنَ الصِّرَاطِ وَأَجِزْنِي عَلَيْهِ بِسَلاَمٍ",
        bengali: "হে আল্লাহ! আমাকে পুলসিরাত থেকে নিরাপদে রাখ এবং শান্তির সাথে তা পার করাও।",
        english: "O Allah, keep me safe on the Sirat and let me pass over it in peace.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "akhirah-9",
        titleBengali: "জান্নাতুল ফিরদাউসের দোয়া",
        titleEnglish: "For Firdaus",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْفِرْدَوْسَ الأَعْلَى مِنَ الْجَنَّةِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে জান্নাতের সর্বোচ্চ ফিরদাউস চাই।",
        english: "O Allah, I ask You for the highest Firdaus of Paradise.",
        reference: "সহীহ বুখারী, হাদিস নং ২৭৯০"
      },
      {
        id: "akhirah-10",
        titleBengali: "আল্লাহকে দেখার দোয়া",
        titleEnglish: "For Seeing Allah",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ لَذَّةَ النَّظَرِ إِلَى وَجْهِكَ وَالشَّوْقَ إِلَى لِقَائِكَ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তোমার চেহারার দিকে তাকানোর স্বাদ এবং তোমার সাক্ষাতের আকাঙ্ক্ষা চাই।",
        english: "O Allah, I ask You for the pleasure of looking at Your Face and the longing to meet You.",
        reference: "নাসাঈ, হাদিস নং ১৩০৫"
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
        reference: "সহীহ মুসলিম, হাদিস নং ৯৬৩"
      },
      {
        id: "death-2",
        titleBengali: "সকলের মাগফিরাতের দোয়া",
        titleEnglish: "Forgiveness for All",
        arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا",
        bengali: "হে আল্লাহ! আমাদের জীবিত ও মৃত, উপস্থিত ও অনুপস্থিত, ছোট ও বড় এবং পুরুষ ও নারী সকলকে ক্ষমা কর।",
        english: "O Allah, forgive our living and our dead, those present and those absent, our young and our old, our males and our females.",
        reference: "ইবনে মাজাহ, হাদিস নং ১৪৯৮; আবু দাউদ, হাদিস নং ৩২০১"
      },
      {
        id: "death-3",
        titleBengali: "ঈমানের উপর মৃত্যু কামনা",
        titleEnglish: "For Death on Faith",
        arabic: "اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلاَمِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ",
        bengali: "হে আল্লাহ! আমাদের মধ্যে যাকে তুমি জীবিত রাখ তাকে ইসলামের উপর জীবিত রাখ এবং যাকে মৃত্যু দাও তাকে ঈমানের উপর মৃত্যু দাও।",
        english: "O Allah, whoever You keep alive from among us, let him live upon Islam, and whoever You cause to die, let him die upon faith.",
        reference: "ইবনে মাজাহ, হাদিস নং ১৪৯৮; আবু দাউদ, হাদিস নং ৩২০১"
      },
      {
        id: "death-4",
        titleBengali: "মৃত্যুর পর সওয়াবের দোয়া",
        titleEnglish: "For Reward After Death",
        arabic: "اللَّهُمَّ لاَ تَحْرِمْنَا أَجْرَهُ، وَلاَ تَفْتِنَّا بَعْدَهُ",
        bengali: "হে আল্লাহ! আমাদেরকে তার সওয়াব থেকে বঞ্চিত করো না এবং তার পরে আমাদেরকে ফিতনায় ফেলো না।",
        english: "O Allah, do not deprive us of his reward and do not put us in trial after him.",
        reference: "সহীহ মুসলিম, হাদিস নং ৯২০"
      },
      {
        id: "death-5",
        titleBengali: "জান্নাতে প্রবেশের দোয়া",
        titleEnglish: "Admission to Paradise",
        arabic: "اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ",
        bengali: "হে আল্লাহ! তার ঘরের বদলে তাকে উত্তম ঘর দাও, তার পরিবারের বদলে উত্তম পরিবার দাও এবং তাকে জান্নাতে প্রবেশ করাও।",
        english: "O Allah, replace his home with a better home, and his family with a better family, and admit him to Paradise.",
        reference: "সহীহ মুসলিম, হাদিস নং ৯৬৩"
      },
      {
        id: "death-6",
        titleBengali: "কবরের ফিতনা থেকে রক্ষা",
        titleEnglish: "Protection in the Grave",
        arabic: "اللَّهُمَّ إِنَّ فُلاَنَ بْنَ فُلاَنٍ فِي ذِمَّتِكَ وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ",
        bengali: "হে আল্লাহ! অমুকের সন্তান অমুক তোমার জিম্মায় ও তোমার প্রতিবেশিত্বের রশিতে। তাকে কবরের ফিতনা ও জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "O Allah, so-and-so son of so-and-so is in Your protection and covenant. Protect him from the trial of the grave and the punishment of the Fire.",
        reference: "ইবনে মাজাহ, হাদিস নং ১৪৯৮; আবু দাউদ, হাদিস নং ৩২০২"
      },
      {
        id: "death-7",
        titleBengali: "মৃত ব্যক্তির চোখ বন্ধ করার সময়",
        titleEnglish: "When Closing Eyes of Deceased",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ",
        bengali: "হে আল্লাহ! তাকে ক্ষমা কর এবং হিদায়াতপ্রাপ্তদের মধ্যে তার মর্যাদা বৃদ্ধি কর। তার পরিবারে যারা থেকে গেল তাদের তার উত্তরসূরি বানাও।",
        english: "O Allah, forgive him and raise his rank among the rightly guided. Be a successor for his remaining family.",
        reference: "সহীহ মুসলিম, হাদিস নং ৯২০"
      },
      {
        id: "death-8",
        titleBengali: "কবরে দোয়া",
        titleEnglish: "Dua at Grave",
        arabic: "السَّلاَمُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللهُ بِكُمْ لاَحِقُونَ، نَسْأَلُ اللهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
        bengali: "শান্তি বর্ষিত হোক তোমাদের উপর, হে মুমিন ও মুসলিমদের আবাসের অধিবাসীগণ। ইনশাআল্লাহ আমরা তোমাদের সাথে মিলিত হব। আমরা আল্লাহর কাছে আমাদের এবং তোমাদের জন্য ক্ষমা ও সুস্থতা চাই।",
        english: "Peace be upon you, O inhabitants of the graves from among the believers and Muslims. Indeed, if Allah wills, we will join you. We ask Allah for well-being for us and for you.",
        reference: "সহীহ মুসলিম, হাদিস নং ৯৭৫"
      },
      {
        id: "death-9",
        titleBengali: "তালকীনের দোয়া",
        titleEnglish: "Talqeen Dua",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ، مُحَمَّدٌ رَسُولُ اللهِ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, মুহাম্মদ আল্লাহর রাসূল। (মৃত্যুপথযাত্রীকে স্মরণ করানো)",
        english: "There is no deity except Allah, Muhammad is the Messenger of Allah. (Remind the dying person)",
        reference: "সহীহ মুসলিম, হাদিস নং ৯১৬"
      },
      {
        id: "death-10",
        titleBengali: "শাহাদাতের দোয়া",
        titleEnglish: "For Martyrdom",
        arabic: "اللَّهُمَّ ارْزُقْنِي شَهَادَةً فِي سَبِيلِكَ وَاجْعَلْ مَوْتِي فِي بَلَدِ رَسُولِكَ",
        bengali: "হে আল্লাহ! আমাকে তোমার পথে শাহাদাত দান কর এবং আমার মৃত্যু তোমার রাসূলের শহরে হতে দাও।",
        english: "O Allah, grant me martyrdom in Your path and let my death be in the city of Your Messenger.",
        reference: "সহীহ বুখারী, হাদিস নং ১৮৯০"
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
        reference: "ফাতহুল বারী, ইবনে হাজার"
      },
      {
        id: "special-2",
        titleBengali: "জন্মদিনের দোয়া",
        titleEnglish: "Birthday Prayer",
        arabic: "اللَّهُمَّ بَارِكْ لَهُ فِيمَا رَزَقْتَهُ، وَتُبْ عَلَيْهِ، وَأَطِلْ عُمُرَهُ فِي طَاعَتِكَ",
        bengali: "হে আল্লাহ! তুমি তাকে যা দিয়েছ তাতে বরকত দাও, তার তাওবা কবুল কর এবং তোমার আনুগত্যে তার আয়ু দীর্ঘ কর। (জন্মদিনে)",
        english: "O Allah, bless him in what You have provided him, accept his repentance, and lengthen his life in Your obedience. (On birthday)",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "special-3",
        titleBengali: "নবজাতকের জন্য দোয়া",
        titleEnglish: "For Newborn Baby",
        arabic: "بَارَكَ اللهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
        bengali: "আল্লাহ তোমাকে যা দান করেছেন তাতে বরকত দিন। তুমি দাতার শুকরিয়া আদায় কর। সে যেন পূর্ণ বয়সে পৌঁছে এবং তুমি তার সেবা পাও। (নবজাতকের জন্য)",
        english: "May Allah bless you in what He has given you. May you give thanks to the Giver. May he reach maturity and may you be granted his righteousness. (For newborn)",
        reference: "নাসাঈ, হাদিস নং ১০৪৩১"
      },
      {
        id: "special-4",
        titleBengali: "নতুন বছর/রমজানের দোয়া",
        titleEnglish: "New Year/Ramadan Start",
        arabic: "اللَّهُمَّ اجْعَلْهُ يَوْمَ خَيْرٍ وَبَرَكَةٍ",
        bengali: "হে আল্লাহ! এই দিনকে কল্যাণ ও বরকতের দিন বানাও। (নতুন বছর/রমজান শুরু)",
        english: "O Allah, make this a day of goodness and blessings. (New year/Ramadan start)",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "special-5",
        titleBengali: "নতুন চাঁদ দেখার দোয়া",
        titleEnglish: "Upon Sighting New Moon",
        arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالإِيمَانِ، وَالسَّلاَمَةِ وَالإِسْلاَمِ، رَبِّي وَرَبُّكَ اللهُ",
        bengali: "হে আল্লাহ! এই চাঁদকে আমাদের উপর নিরাপত্তা, ঈমান, শান্তি ও ইসলামের সাথে উদিত কর। আমার ও তোমার রব আল্লাহ। (নতুন চাঁদ দেখলে)",
        english: "O Allah, let this moon appear on us with security, faith, safety and Islam. My Lord and your Lord is Allah. (Upon sighting the new moon)",
        reference: "তিরমিযী, হাদিস নং ৩৪৫১"
      },
      {
        id: "special-6",
        titleBengali: "বৃষ্টির দোয়া",
        titleEnglish: "Prayer During Rain",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        bengali: "হে আল্লাহ! উপকারী বৃষ্টি বর্ষণ কর। (বৃষ্টির সময়)",
        english: "O Allah, may it be a beneficial rain. (During rain)",
        reference: "সহীহ বুখারী, হাদিস নং ১০৩২"
      },
      {
        id: "special-7",
        titleBengali: "লাইলাতুল কদরের দোয়া",
        titleEnglish: "Laylatul Qadr Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        bengali: "হে আল্লাহ! নিশ্চয়ই তুমি ক্ষমাশীল, ক্ষমা করতে ভালোবাস, অতএব আমাকে ক্ষমা কর।",
        english: "O Allah, You are the Pardoner, You love to pardon, so pardon me.",
        reference: "তিরমিযী, হাদিস নং ৩৫১৩"
      },
      {
        id: "special-8",
        titleBengali: "আরাফাহ দিনের দোয়া",
        titleEnglish: "Arafah Day Dua",
        arabic: "لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই, প্রশংসাও তাঁর এবং তিনি সবকিছুর উপর ক্ষমতাবান।",
        english: "There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things omnipotent.",
        reference: "তিরমিযী, হাদিস নং ৩৫৮৫ (আরাফাহ দিনের শ্রেষ্ঠ দোয়া)"
      },
      {
        id: "special-9",
        titleBengali: "যিলহজ্জের প্রথম ১০ দিন",
        titleEnglish: "First 10 Days of Dhul Hijjah",
        arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، لاَ إِلَهَ إِلاَّ اللهُ، وَاللهُ أَكْبَرُ، اللهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ",
        bengali: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। আল্লাহ ছাড়া কোন ইলাহ নেই। আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড় এবং সকল প্রশংসা আল্লাহর।",
        english: "Allah is the greatest, Allah is the greatest. There is no deity except Allah. Allah is the greatest, Allah is the greatest, and to Allah belongs all praise.",
        reference: "দারাকুতনী, হাদিস নং ১৭৫৬ (তাকবীরে তাশরীক)"
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
  },

  // ============ Forgiveness/Tawbah Category ============
  {
    id: "forgiveness",
    nameEnglish: "Forgiveness & Tawbah",
    nameBengali: "ক্ষমা ও তাওবা",
    icon: "Heart",
    duas: [
      {
        id: "forgiveness-1",
        titleBengali: "সাইয়িদুল ইস্তিগফার",
        titleEnglish: "Master of Seeking Forgiveness",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa anta",
        transliterationBengali: "আল্লাহুম্মা আনতা রাব্বি লা ইলাহা ইল্লা আনতা, খালাক্বতানী ওয়া আনা 'আবদুকা, ওয়া আনা 'আলা 'আহদিকা ওয়া ওয়া'দিকা মাসতাতা'তু, আ'উযু বিকা মিন শাররি মা সানা'তু, আবূউ লাকা বিনি'মাতিকা 'আলাইয়্যা, ওয়া আবূউ বিযানবী ফাগফির লী ফা ইন্নাহু লা ইয়াগফিরুয-যুনূবা ইল্লা আনতা",
        bengali: "হে আল্লাহ! তুমিই আমার রব, তুমি ছাড়া কোনো ইলাহ নেই। তুমি আমাকে সৃষ্টি করেছ, আমি তোমার বান্দা। আমি যথাসাধ্য তোমার অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি যা করেছি তার অনিষ্ট থেকে তোমার কাছে আশ্রয় চাই। আমার উপর তোমার নিয়ামতের স্বীকৃতি দিচ্ছি এবং আমার গুনাহের স্বীকৃতি দিচ্ছি। অতএব আমাকে ক্ষমা করো, কারণ তুমি ছাড়া গুনাহ ক্ষমা করার কেউ নেই।",
        english: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am upon Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me and I acknowledge my sin, so forgive me, for none forgives sins but You.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩০৬"
      },
      {
        id: "forgiveness-2",
        titleBengali: "সংক্ষিপ্ত ইস্তিগফার",
        titleEnglish: "Short Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfirullah",
        transliterationBengali: "আস্তাগফিরুল্লাহ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই।",
        english: "I seek forgiveness from Allah.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-3",
        titleBengali: "তাওবার দোয়া",
        titleEnglish: "Dua for Repentance",
        arabic: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullahallazi la ilaha illa huwal hayyul qayyumu wa atubu ilayh",
        transliterationBengali: "আস্তাগফিরুল্লাহাল্লাযী লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল কাইয়্যূমু ওয়া আতূবু ইলাইহি",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই, যিনি ছাড়া কোনো ইলাহ নেই, যিনি চিরজীবী, সর্বসত্তার ধারক এবং আমি তাঁর কাছে তাওবা করছি।",
        english: "I seek forgiveness from Allah, there is no god but He, the Ever-Living, the Sustainer of existence, and I repent to Him.",
        reference: "সুনান আবু দাউদ, হাদিস নং ১৫১৭"
      },
      {
        id: "forgiveness-4",
        titleBengali: "রাসূল (সা.) এর ইস্তিগফার",
        titleEnglish: "Prophet's Istighfar",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Rabbighfir li wa tub 'alayya innaka antat-tawwabur-rahim",
        transliterationBengali: "রাব্বিগফির লী ওয়া তুব 'আলাইয়্যা ইন্নাকা আনতাত-তাওয়াবুর রাহীম",
        bengali: "হে আমার রব! আমাকে ক্ষমা করো এবং আমার তাওবা কবুল করো। নিশ্চয়ই তুমি তাওবা কবুলকারী, দয়ালু।",
        english: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of repentance, the Merciful.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৩৪"
      },
      {
        id: "forgiveness-5",
        titleBengali: "আদম (আ.) এর তাওবা",
        titleEnglish: "Adam's (AS) Repentance",
        arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        transliteration: "Rabbana zalamna anfusana wa illam taghfir lana wa tarhamna lanakoonanna minal-khasireen",
        transliterationBengali: "রাব্বানা যালামনা আনফুসানা ওয়া ইল্লাম তাগফির লানা ওয়া তারহামনা লানাকূনান্না মিনাল খাসিরীন",
        bengali: "হে আমাদের রব! আমরা নিজেদের প্রতি জুলুম করেছি। যদি তুমি আমাদের ক্ষমা না করো এবং দয়া না করো, তবে আমরা অবশ্যই ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
        english: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
        reference: "সূরা আল-আ'রাফ ৭:২৩"
      },
      {
        id: "forgiveness-6",
        titleBengali: "ইউনুস (আ.) এর দোয়া",
        titleEnglish: "Yunus's (AS) Dua",
        arabic: "لَّا إِلَـٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        transliterationBengali: "লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নী কুনতু মিনায-যালিমীন",
        bengali: "তুমি ছাড়া কোনো ইলাহ নেই। তুমি পবিত্র। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।",
        english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "সূরা আল-আম্বিয়া ২১:৮৭"
      },
      {
        id: "forgiveness-7",
        titleBengali: "মূসা (আ.) এর ইস্তিগফার",
        titleEnglish: "Musa's (AS) Istighfar",
        arabic: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
        transliteration: "Rabbi inni zalamtu nafsi faghfir li",
        transliterationBengali: "রাব্বি ইন্নী যালামতু নাফসী ফাগফির লী",
        bengali: "হে আমার রব! নিশ্চয়ই আমি নিজের উপর জুলুম করেছি, তাই আমাকে ক্ষমা করো।",
        english: "My Lord, indeed I have wronged myself, so forgive me.",
        reference: "সূরা আল-কাসাস ২৮:১৬"
      },
      {
        id: "forgiveness-8",
        titleBengali: "নূহ (আ.) এর দোয়া",
        titleEnglish: "Nuh's (AS) Dua",
        arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        transliteration: "Rabbighfir li wa liwalidayya wa liman dakhala baytiya mu'minan wa lilmu'minina wal mu'minat",
        transliterationBengali: "রাব্বিগফির লী ওয়া লিওয়ালিদাইয়্যা ওয়া লিমান দাখালা বাইতিয়া মু'মিনাও ওয়া লিলমু'মিনীনা ওয়াল মু'মিনাত",
        bengali: "হে আমার রব! আমাকে, আমার পিতা-মাতাকে, যে মুমিন হয়ে আমার ঘরে প্রবেশ করেছে তাকে এবং সকল মুমিন নর-নারীকে ক্ষমা করো।",
        english: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.",
        reference: "সূরা নূহ ৭১:২৮"
      },
      {
        id: "forgiveness-9",
        titleBengali: "গোপন গুনাহের ক্ষমা",
        titleEnglish: "Forgiveness for Hidden Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي",
        transliteration: "Allahummaghfir li khati'ati wa jahli wa israfi fi amri",
        transliterationBengali: "আল্লাহুম্মাগফির লী খাতী'আতী ওয়া জাহলী ওয়া ইসরাফী ফী আমরী",
        bengali: "হে আল্লাহ! আমার পাপ, আমার অজ্ঞতা এবং আমার কাজে সীমালংঘন ক্ষমা করো।",
        english: "O Allah, forgive my sins, my ignorance, and my transgression in my affairs.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৯৮"
      },
      {
        id: "forgiveness-10",
        titleBengali: "সকল গুনাহের ক্ষমা",
        titleEnglish: "Forgiveness for All Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
        transliteration: "Allahummaghfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa 'alaniyatahu wa sirrahu",
        transliterationBengali: "আল্লাহুম্মাগফির লী যানবী কুল্লাহু দিক্বক্বাহু ওয়া জিল্লাহু ওয়া আওওয়ালাহু ওয়া আখিরাহু ওয়া 'আলানিয়াতাহু ওয়া সিররাহু",
        bengali: "হে আল্লাহ! আমার সমস্ত গুনাহ ক্ষমা করো - ছোট-বড়, প্রথম-শেষ, প্রকাশ্য ও গোপন।",
        english: "O Allah, forgive me all my sins, small and great, first and last, open and secret.",
        reference: "সহীহ মুসলিম, হাদিস নং ৪৮৩"
      },
      {
        id: "forgiveness-11",
        titleBengali: "রাতের ইস্তিগফার",
        titleEnglish: "Night Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullaha wa atubu ilayh",
        transliterationBengali: "আস্তাগফিরুল্লাহা ওয়া আতূবু ইলাইহি",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তাওবা করি।",
        english: "I seek forgiveness from Allah and repent to Him.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩০৭"
      },
      {
        id: "forgiveness-12",
        titleBengali: "সালাতের পরের ইস্তিগফার",
        titleEnglish: "After Prayer Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ (৩ বার)",
        transliteration: "Astaghfirullah (3 times)",
        transliterationBengali: "আস্তাগফিরুল্লাহ (৩ বার)",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই। (৩ বার পড়তে হবে)",
        english: "I seek forgiveness from Allah. (Say 3 times)",
        reference: "সহীহ মুসলিম, হাদিস নং ৫৯১"
      },
      {
        id: "forgiveness-13",
        titleBengali: "মজলিসের কাফফারা",
        titleEnglish: "Expiation of Assembly",
        arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
        transliteration: "Subhanaka Allahumma wa bihamdika, ashhadu an la ilaha illa anta, astaghfiruka wa atubu ilayk",
        transliterationBengali: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা, আশহাদু আন লা ইলাহা ইল্লা আনতা, আস্তাগফিরুকা ওয়া আতূবু ইলাইক",
        bengali: "হে আল্লাহ! তোমার প্রশংসাসহ তোমার পবিত্রতা ঘোষণা করছি। আমি সাক্ষ্য দিচ্ছি যে তুমি ছাড়া কোনো ইলাহ নেই। আমি তোমার কাছে ক্ষমা চাই এবং তোমার কাছে তাওবা করি।",
        english: "Glory be to You, O Allah, and praise be to You. I bear witness that there is no god but You. I seek Your forgiveness and repent to You.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৩৩"
      },
      {
        id: "forgiveness-14",
        titleBengali: "জুলুমের ক্ষমা",
        titleEnglish: "Forgiveness for Oppression",
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration: "Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta, faghfir li maghfiratan min 'indika warhamni innaka antal-ghafurur-rahim",
        transliterationBengali: "আল্লাহুম্মা ইন্নী যালামতু নাফসী যুলমান কাসীরান ওয়া লা ইয়াগফিরুয-যুনূবা ইল্লা আনতা, ফাগফির লী মাগফিরাতাম মিন 'ইনদিকা ওয়ারহামনী ইন্নাকা আনতাল গাফূরুর রাহীম",
        bengali: "হে আল্লাহ! আমি নিজের উপর অনেক জুলুম করেছি। তুমি ছাড়া গুনাহ ক্ষমা করার কেউ নেই। তোমার পক্ষ থেকে আমাকে ক্ষমা করো এবং আমার প্রতি দয়া করো। নিশ্চয়ই তুমি ক্ষমাশীল, দয়ালু।",
        english: "O Allah, I have greatly wronged myself, and none forgives sins but You. Grant me forgiveness from You and have mercy on me. Indeed, You are the Forgiving, the Merciful.",
        reference: "সহীহ বুখারী, হাদিস নং ৮৩৪"
      },
      {
        id: "forgiveness-15",
        titleBengali: "পিতা-মাতার জন্য ক্ষমা",
        titleEnglish: "Forgiveness for Parents",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
        transliteration: "Rabbighfir li wa liwalidayya",
        transliterationBengali: "রাব্বিগফির লী ওয়া লিওয়ালিদাইয়্যা",
        bengali: "হে আমার রব! আমাকে এবং আমার পিতা-মাতাকে ক্ষমা করো।",
        english: "My Lord, forgive me and my parents.",
        reference: "সূরা ইবরাহীম ১৪:৪১"
      },
      {
        id: "forgiveness-16",
        titleBengali: "মুমিনদের জন্য ক্ষমা",
        titleEnglish: "Forgiveness for Believers",
        arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ",
        transliteration: "Rabbanagh fir lana wa li ikhwaninalladhina sabaquna bil-iman",
        transliterationBengali: "রাব্বানাগফির লানা ওয়া লি ইখওয়ানিনাল্লাযীনা সাবাকূনা বিল-ঈমান",
        bengali: "হে আমাদের রব! আমাদেরকে এবং ঈমানে আমাদের অগ্রবর্তী ভাইদেরকে ক্ষমা করো।",
        english: "Our Lord, forgive us and our brothers who preceded us in faith.",
        reference: "সূরা আল-হাশর ৫৯:১০"
      },
      {
        id: "forgiveness-17",
        titleBengali: "আখেরাতের ক্ষমা",
        titleEnglish: "Forgiveness in Hereafter",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ",
        transliteration: "Rabbanagh fir lana dhunubana wa kaffir 'anna sayyi'atina wa tawaffana ma'al abrar",
        transliterationBengali: "রাব্বানাগফির লানা যুনূবানা ওয়া কাফফির 'আন্না সাইয়্যি'আতিনা ওয়া তাওয়াফফানা মা'আল আবরার",
        bengali: "হে আমাদের রব! আমাদের গুনাহ ক্ষমা করো, আমাদের মন্দ কাজগুলো মুছে দাও এবং আমাদের মৃত্যু দাও নেককারদের সাথে।",
        english: "Our Lord, forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.",
        reference: "সূরা আলে ইমরান ৩:১৯৩"
      },
      {
        id: "forgiveness-18",
        titleBengali: "ভুলের ক্ষমা",
        titleEnglish: "Forgiveness for Mistakes",
        arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
        transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
        transliterationBengali: "রাব্বানা লা তু'আখিযনা ইন নাসীনা আও আখতা'না",
        bengali: "হে আমাদের রব! আমরা যদি ভুলে যাই বা ভুল করি তাহলে আমাদের পাকড়াও করো না।",
        english: "Our Lord, do not hold us accountable if we forget or make a mistake.",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "forgiveness-19",
        titleBengali: "বোঝা থেকে মুক্তি",
        titleEnglish: "Relief from Burden",
        arabic: "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
        transliteration: "Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alalladhina min qablina",
        transliterationBengali: "রাব্বানা ওয়া লা তাহমিল 'আলাইনা ইসরান কামা হামালতাহু 'আলাল্লাযীনা মিন কাবলিনা",
        bengali: "হে আমাদের রব! আমাদের পূর্ববর্তীদের উপর যেমন বোঝা চাপিয়েছিলে, আমাদের উপর তেমন বোঝা চাপিয়ে দিও না।",
        english: "Our Lord, and do not lay upon us a burden like that which You laid upon those before us.",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "forgiveness-20",
        titleBengali: "সাধ্যের বাইরে বোঝা না দেওয়া",
        titleEnglish: "Not Beyond Capacity",
        arabic: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ",
        transliteration: "Rabbana wa la tuhammilna ma la taqata lana bih",
        transliterationBengali: "রাব্বানা ওয়া লা তুহাম্মিলনা মা লা তাকাতা লানা বিহি",
        bengali: "হে আমাদের রব! আমাদের সাধ্যের বাইরে কোনো বোঝা আমাদের উপর চাপিয়ে দিও না।",
        english: "Our Lord, and burden us not with that which we have no ability to bear.",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "forgiveness-21",
        titleBengali: "ক্ষমা ও দয়া প্রার্থনা",
        titleEnglish: "Pardon and Mercy",
        arabic: "وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا",
        transliteration: "Wa'fu 'anna waghfir lana warhamna anta mawlana",
        transliterationBengali: "ওয়া'ফু 'আন্না ওয়াগফির লানা ওয়ারহামনা আনতা মাওলানা",
        bengali: "আমাদের মাফ করো, আমাদের ক্ষমা করো এবং আমাদের প্রতি দয়া করো। তুমিই আমাদের অভিভাবক।",
        english: "Pardon us, forgive us, and have mercy upon us. You are our Protector.",
        reference: "সূরা আল-বাকারা ২:২৮৬"
      },
      {
        id: "forgiveness-22",
        titleBengali: "হৃদয়ের বিচ্যুতি থেকে রক্ষা",
        titleEnglish: "Protection from Heart Deviation",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً",
        transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmah",
        transliterationBengali: "রাব্বানা লা তুযিগ কুলূবানা বা'দা ইয হাদাইতানা ওয়া হাব লানা মিন লাদুনকা রাহমাহ",
        bengali: "হে আমাদের রব! হেদায়েত দেওয়ার পর আমাদের হৃদয়কে বিপথগামী করো না এবং তোমার পক্ষ থেকে আমাদের রহমত দান করো।",
        english: "Our Lord, do not let our hearts deviate after You have guided us and grant us from Yourself mercy.",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "forgiveness-23",
        titleBengali: "দুনিয়া ও আখেরাতের কল্যাণ",
        titleEnglish: "Good in Both Worlds",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
        transliterationBengali: "রাব্বানা আতিনা ফিদ-দুনিয়া হাসানাতান ওয়া ফিল-আখিরাতি হাসানাতান ওয়া কিনা 'আযাবান-নার",
        bengali: "হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দাও, আখেরাতেও কল্যাণ দাও এবং জাহান্নামের আযাব থেকে রক্ষা করো।",
        english: "Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.",
        reference: "সূরা আল-বাকারা ২:২০১"
      },
      {
        id: "forgiveness-24",
        titleBengali: "ধৈর্য ও সাহায্য প্রার্থনা",
        titleEnglish: "Patience and Help",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
        transliterationBengali: "রাব্বানা আফরিগ 'আলাইনা সাবরান ওয়া সাব্বিত আকদামানা ওয়ানসুরনা 'আলাল-কাওমিল-কাফিরীন",
        bengali: "হে আমাদের রব! আমাদের ধৈর্য দান করো, আমাদের পা স্থির রাখো এবং কাফেরদের বিরুদ্ধে আমাদের সাহায্য করো।",
        english: "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
        reference: "সূরা আল-বাকারা ২:২৫০"
      },
      {
        id: "forgiveness-25",
        titleBengali: "সীমালংঘন থেকে ক্ষমা",
        titleEnglish: "Forgiveness for Excess",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا",
        transliteration: "Rabbanagh fir lana dhunubana wa israfana fi amrina",
        transliterationBengali: "রাব্বানাগফির লানা যুনূবানা ওয়া ইসরাফানা ফী আমরিনা",
        bengali: "হে আমাদের রব! আমাদের গুনাহ ক্ষমা করো এবং আমাদের কাজে সীমালংঘন ক্ষমা করো।",
        english: "Our Lord, forgive us our sins and the excess in our affairs.",
        reference: "সূরা আলে ইমরান ৩:১৪৭"
      },
      {
        id: "forgiveness-26",
        titleBengali: "জালিমদের সাথী না হওয়া",
        titleEnglish: "Not with Oppressors",
        arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
        transliteration: "Rabbana la taj'alna ma'al-qawmiz-zalimin",
        transliterationBengali: "রাব্বানা লা তাজ'আলনা মা'আল-কাওমিয-যালিমীন",
        bengali: "হে আমাদের রব! আমাদের জালিমদের সাথী করো না।",
        english: "Our Lord, do not place us with the wrongdoing people.",
        reference: "সূরা আল-আ'রাফ ৭:৪৭"
      },
      {
        id: "forgiveness-27",
        titleBengali: "কাফেরদের ফিতনা থেকে রক্ষা",
        titleEnglish: "Protection from Trial",
        arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلْقَوْمِ الظَّالِمِينَ",
        transliteration: "Rabbana la taj'alna fitnatal-lil-qawmiz-zalimin",
        transliterationBengali: "রাব্বানা লা তাজ'আলনা ফিতনাতাল লিল-কাওমিয-যালিমীন",
        bengali: "হে আমাদের রব! আমাদের জালিম সম্প্রদায়ের জন্য পরীক্ষার বস্তু বানিও না।",
        english: "Our Lord, do not make us a trial for the wrongdoing people.",
        reference: "সূরা ইউনুস ১০:৮৫"
      },
      {
        id: "forgiveness-28",
        titleBengali: "কাফেরদের থেকে রক্ষা",
        titleEnglish: "Rescue from Disbelievers",
        arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا",
        transliteration: "Rabbana la taj'alna fitnatal-lilladhina kafaru waghfir lana Rabbana",
        transliterationBengali: "রাব্বানা লা তাজ'আলনা ফিতনাতাল লিল্লাযীনা কাফারূ ওয়াগফির লানা রাব্বানা",
        bengali: "হে আমাদের রব! আমাদের কাফেরদের জন্য পরীক্ষার বস্তু বানিও না এবং আমাদের ক্ষমা করো, হে আমাদের রব!",
        english: "Our Lord, do not make us a trial for those who disbelieve and forgive us, our Lord.",
        reference: "সূরা আল-মুমতাহিনা ৬০:৫"
      },
      {
        id: "forgiveness-29",
        titleBengali: "নূরের পূর্ণতা",
        titleEnglish: "Complete Our Light",
        arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Rabbana atmim lana nurana waghfir lana innaka 'ala kulli shay'in qadir",
        transliterationBengali: "রাব্বানা আতমিম লানা নূরানা ওয়াগফির লানা ইন্নাকা 'আলা কুল্লি শাই'ইন কাদীর",
        bengali: "হে আমাদের রব! আমাদের নূর পূর্ণ করে দাও এবং আমাদের ক্ষমা করো। নিশ্চয়ই তুমি সবকিছুর উপর সর্বশক্তিমান।",
        english: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.",
        reference: "সূরা আত-তাহরীম ৬৬:৮"
      },
      {
        id: "forgiveness-30",
        titleBengali: "সৎকর্মশীলদের সাথে মৃত্যু",
        titleEnglish: "Death with Righteous",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        transliteration: "Rabbij'alni muqimas-salati wa min dhurriyyati Rabbana wa taqabbal du'a",
        transliterationBengali: "রাব্বিজ'আলনী মুকীমাস-সালাতি ওয়া মিন যুররিইয়াতী রাব্বানা ওয়া তাকাব্বাল দু'আ",
        bengali: "হে আমার রব! আমাকে সালাত কায়েমকারী বানাও এবং আমার বংশধরদেরও। হে আমাদের রব! আমার দোয়া কবুল করো।",
        english: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, accept my supplication.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "forgiveness-31",
        titleBengali: "হিসাবের দিনের ক্ষমা",
        titleEnglish: "Forgiveness on Day of Account",
        arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        transliteration: "Rabbanagh fir li wa liwalidayya wa lilmu'minina yawma yaqumul-hisab",
        transliterationBengali: "রাব্বানাগফির লী ওয়া লিওয়ালিদাইয়্যা ওয়া লিলমু'মিনীনা ইয়াওমা ইয়াকূমুল হিসাব",
        bengali: "হে আমাদের রব! হিসাবের দিন আমাকে, আমার পিতা-মাতাকে এবং সকল মুমিনকে ক্ষমা করো।",
        english: "Our Lord, forgive me and my parents and the believers on the Day when the account is established.",
        reference: "সূরা ইবরাহীম ১৪:৪১"
      },
      {
        id: "forgiveness-32",
        titleBengali: "ইমাম হওয়ার দোয়া",
        titleEnglish: "Leader of Righteous",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lilmuttaqina imama",
        transliterationBengali: "রাব্বানা হাব লানা মিন আযওয়াজিনা ওয়া যুররিইয়াতিনা কুররাতা আ'ইউনিন ওয়াজ'আলনা লিলমুত্তাকীনা ইমামা",
        bengali: "হে আমাদের রব! আমাদের স্ত্রী ও সন্তানদের থেকে আমাদের চোখের শীতলতা দান করো এবং আমাদের মুত্তাকীদের ইমাম বানাও।",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us leaders for the righteous.",
        reference: "সূরা আল-ফুরকান ২৫:৭৪"
      },
      {
        id: "forgiveness-33",
        titleBengali: "নামাযের পরে দোয়া",
        titleEnglish: "After Salah Dua",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
        transliterationBengali: "আল্লাহুম্মা আ'ইন্নী 'আলা যিকরিকা ওয়া শুকরিকা ওয়া হুসনি 'ইবাদাতিক",
        bengali: "হে আল্লাহ! তোমার যিকির, শুকরিয়া এবং সুন্দরভাবে ইবাদত করতে আমাকে সাহায্য করো।",
        english: "O Allah, help me in remembering You, thanking You, and worshipping You in the best manner.",
        reference: "সুনান আবু দাউদ, হাদিস নং ১৫২২"
      },
      {
        id: "forgiveness-34",
        titleBengali: "সকাল-সন্ধ্যার ইস্তিগফার",
        titleEnglish: "Morning-Evening Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullahul-'azim alladhi la ilaha illa huwal-hayyul-qayyum wa atubu ilayh",
        transliterationBengali: "আস্তাগফিরুল্লাহুল 'আযীম আল্লাযী লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল কাইয়্যূম ওয়া আতূবু ইলাইহি",
        bengali: "আমি মহান আল্লাহর কাছে ক্ষমা চাই, যিনি ছাড়া কোনো ইলাহ নেই, যিনি চিরজীবী, সর্বসত্তার ধারক এবং তাঁর কাছে তাওবা করি।",
        english: "I seek forgiveness from Allah the Almighty, there is no god but He, the Ever-Living, the Sustainer of existence, and I repent to Him.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৭৭"
      },
      {
        id: "forgiveness-35",
        titleBengali: "১০০ বার ইস্তিগফার",
        titleEnglish: "100 Times Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ (১০০ বার)",
        transliteration: "Astaghfirullaha wa atubu ilayh (100 times)",
        transliterationBengali: "আস্তাগফিরুল্লাহা ওয়া আতূবু ইলাইহি (১০০ বার)",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তাওবা করি। (দৈনিক ১০০ বার পড়ুন)",
        english: "I seek forgiveness from Allah and repent to Him. (Read 100 times daily)",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭০২"
      },
      {
        id: "forgiveness-36",
        titleBengali: "৭০ বার ইস্তিগফার",
        titleEnglish: "70 Times Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullaha Rabbi min kulli dhanbin wa atubu ilayh",
        transliterationBengali: "আস্তাগফিরুল্লাহা রাব্বী মিন কুল্লি যানবিন ওয়া আতূবু ইলাইহি",
        bengali: "আমি আমার রব আল্লাহর কাছে সব গুনাহ থেকে ক্ষমা চাই এবং তাঁর কাছে তাওবা করি।",
        english: "I seek forgiveness from Allah, my Lord, from every sin and I repent to Him.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "forgiveness-37",
        titleBengali: "গুনাহ মাফের সহজ দোয়া",
        titleEnglish: "Easy Forgiveness Dua",
        arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
        transliteration: "Rabbighfir warham wa anta khayrur-rahimin",
        transliterationBengali: "রাব্বিগফির ওয়ারহাম ওয়া আনতা খাইরুর-রাহিমীন",
        bengali: "হে আমার রব! ক্ষমা করো ও দয়া করো। তুমিই শ্রেষ্ঠ দয়ালু।",
        english: "My Lord, forgive and have mercy, and You are the best of the merciful.",
        reference: "সূরা আল-মু'মিনুন ২৩:১১৮"
      },
      {
        id: "forgiveness-38",
        titleBengali: "তাওবার পর দোয়া",
        titleEnglish: "After Repentance Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ تَوْبَةً نَصُوحًا",
        transliteration: "Allahumma inni as'aluka tawbatan nasuhan",
        transliterationBengali: "আল্লাহুম্মা ইন্নী আসআলুকা তাওবাতান নাসূহান",
        bengali: "হে আল্লাহ! আমি তোমার কাছে খাঁটি তাওবা চাই।",
        english: "O Allah, I ask You for a sincere repentance.",
        reference: "ইবনে মাজাহ"
      },
      {
        id: "forgiveness-39",
        titleBengali: "গুনাহ থেকে পাক হওয়া",
        titleEnglish: "Purification from Sins",
        arabic: "اللَّهُمَّ طَهِّرْنِي مِنَ الذُّنُوبِ وَالْخَطَايَا",
        transliteration: "Allahumma tahhirni minadh-dhunubi wal-khataya",
        transliterationBengali: "আল্লাহুম্মা তাহহিরনী মিনায-যুনূবি ওয়াল খাতায়া",
        bengali: "হে আল্লাহ! আমাকে গুনাহ ও পাপ থেকে পবিত্র করো।",
        english: "O Allah, purify me from sins and mistakes.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-40",
        titleBengali: "পাপ মোচনের দোয়া",
        titleEnglish: "Erasure of Sins",
        arabic: "اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        transliteration: "Allahummagh-sil khatayaya bil-ma'i wath-thalji wal-barad",
        transliterationBengali: "আল্লাহুম্মাগ-সিল খাতায়ায়া বিল-মা'ই ওয়াস-সালজি ওয়াল-বারাদ",
        bengali: "হে আল্লাহ! আমার পাপসমূহ পানি, বরফ ও শিশির দিয়ে ধুয়ে দাও।",
        english: "O Allah, wash away my sins with water, snow and hail.",
        reference: "সহীহ বুখারী ও মুসলিম"
      },
      {
        id: "forgiveness-41",
        titleBengali: "পূর্বের ও পরের গুনাহ মাফ",
        titleEnglish: "Past and Future Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ",
        transliteration: "Allahummaghfir li ma qaddamtu wa ma akhkhartu",
        transliterationBengali: "আল্লাহুম্মাগফির লী মা কাদ্দামতু ওয়া মা আখখারতু",
        bengali: "হে আল্লাহ! আমার পূর্বের ও পরের গুনাহ ক্ষমা করো।",
        english: "O Allah, forgive my past and future sins.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-42",
        titleBengali: "গোপন ও প্রকাশ্য গুনাহ মাফ",
        titleEnglish: "Hidden and Open Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لِي مَا أَسْرَرْتُ وَمَا أَعْلَنْتُ",
        transliteration: "Allahummaghfir li ma asrartu wa ma a'lantu",
        transliterationBengali: "আল্লাহুম্মাগফির লী মা আসরারতু ওয়া মা আ'লানতু",
        bengali: "হে আল্লাহ! আমার গোপন ও প্রকাশ্য গুনাহ ক্ষমা করো।",
        english: "O Allah, forgive my secret and open sins.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-43",
        titleBengali: "সীমালংঘনের ক্ষমা",
        titleEnglish: "Forgiveness for Transgression",
        arabic: "اللَّهُمَّ اغْفِرْ لِي مَا أَسْرَفْتُ وَمَا أَنتَ أَعْلَمُ بِهِ مِنِّي",
        transliteration: "Allahummaghfir li ma asraftu wa ma anta a'lamu bihi minni",
        transliterationBengali: "আল্লাহুম্মাগফির লী মা আসরাফতু ওয়া মা আনতা আ'লামু বিহী মিন্নী",
        bengali: "হে আল্লাহ! আমার সীমালংঘন ক্ষমা করো এবং যা তুমি আমার চেয়ে বেশি জানো তাও।",
        english: "O Allah, forgive my transgression and what You know better than me.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-44",
        titleBengali: "প্রথম ও শেষ গুনাহ মাফ",
        titleEnglish: "First and Last Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لِي أَوَّلَهُ وَآخِرَهُ",
        transliteration: "Allahummaghfir li awwalahu wa akhirahu",
        transliterationBengali: "আল্লাহুম্মাগফির লী আওওয়ালাহু ওয়া আখিরাহু",
        bengali: "হে আল্লাহ! আমার প্রথম ও শেষ গুনাহ ক্ষমা করো।",
        english: "O Allah, forgive my first and last sins.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-45",
        titleBengali: "আল্লাহর রহমতে আশা",
        titleEnglish: "Hope in Allah's Mercy",
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        transliteration: "Allahumma rahmataka arju fala takilni ila nafsi tarfata 'ayn",
        transliterationBengali: "আল্লাহুম্মা রাহমাতাকা আরজূ ফালা তাকিলনী ইলা নাফসী তারফাতা 'আইন",
        bengali: "হে আল্লাহ! তোমার রহমতের আশা করি, তাই আমাকে এক পলকের জন্যও আমার উপর ছেড়ে দিও না।",
        english: "O Allah, I hope for Your mercy, so do not leave me to myself even for the blink of an eye.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "forgiveness-46",
        titleBengali: "সব বিষয় ঠিক করার দোয়া",
        titleEnglish: "Rectify All Affairs",
        arabic: "وَأَصْلِحْ لِي شَأْنِي كُلَّهُ لَا إِلَهَ إِلَّا أَنتَ",
        transliteration: "Wa aslih li sha'ni kullahu la ilaha illa anta",
        transliterationBengali: "ওয়া আসলিহ লী শা'নী কুল্লাহু লা ইলাহা ইল্লা আনতা",
        bengali: "আমার সব বিষয় ঠিক করে দাও। তুমি ছাড়া কোনো ইলাহ নেই।",
        english: "And rectify all my affairs for me. There is no god but You.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "forgiveness-47",
        titleBengali: "আল্লাহর দরবারে প্রত্যাবর্তন",
        titleEnglish: "Return to Allah",
        arabic: "إِلَيْكَ أَتُوبُ وَإِلَيْكَ الْمَصِيرُ",
        transliteration: "Ilayka atubu wa ilaykal-masir",
        transliterationBengali: "ইলাইকা আতূবু ওয়া ইলাইকাল মাসীর",
        bengali: "তোমার কাছেই আমি তাওবা করি এবং তোমার কাছেই প্রত্যাবর্তন।",
        english: "To You I repent and to You is the return.",
        reference: "সূরা আত-তাগাবুন"
      },
      {
        id: "forgiveness-48",
        titleBengali: "ক্ষমা ও হেদায়েত",
        titleEnglish: "Forgiveness and Guidance",
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي وَاغْفِرْ لِي",
        transliteration: "Allahummah-dini wa saddidni waghfir li",
        transliterationBengali: "আল্লাহুম্মাহ-দিনী ওয়া সাদ্দিদনী ওয়াগফির লী",
        bengali: "হে আল্লাহ! আমাকে হেদায়েত দাও, সঠিক পথে রাখো এবং ক্ষমা করো।",
        english: "O Allah, guide me, keep me straight, and forgive me.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "forgiveness-49",
        titleBengali: "সম্পূর্ণ ক্ষমার দোয়া",
        titleEnglish: "Complete Forgiveness",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        transliterationBengali: "আল্লাহুম্মা ইন্নাকা 'আফুউউন তুহিব্বুল 'আফওয়া ফা'ফু 'আন্নী",
        bengali: "হে আল্লাহ! তুমি ক্ষমাশীল, ক্ষমা পছন্দ করো, তাই আমাকে ক্ষমা করো।",
        english: "O Allah, You are the Pardoner, You love to pardon, so pardon me.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫১৩"
      },
      {
        id: "forgiveness-50",
        titleBengali: "চূড়ান্ত তাওবার দোয়া",
        titleEnglish: "Ultimate Repentance Dua",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ عَلَيْكَ تَوَكَّلْتُ وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta 'alayka tawakkaltu wa anta Rabbul-'arshil-'azim",
        transliterationBengali: "আল্লাহুম্মা আনতা রাব্বী লা ইলাহা ইল্লা আনতা 'আলাইকা তাওয়াক্কালতু ওয়া আনতা রাব্বুল 'আরশিল 'আযীম",
        bengali: "হে আল্লাহ! তুমি আমার রব, তুমি ছাড়া কোনো ইলাহ নেই। তোমার উপরই ভরসা করলাম। তুমি মহান আরশের রব।",
        english: "O Allah, You are my Lord, there is no god but You. In You I have placed my trust and You are the Lord of the Mighty Throne.",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯০"
      }
    ]
  },
];

export const getDuaCategory = (categoryId: string): DuaCategory | undefined => {
  return duaCategories.find(category => category.id === categoryId);
};
