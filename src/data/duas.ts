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
        transliterationBengali: "আ'ঊযু বিল্লাহি মিনাশ শাইতানির রাজীম",
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
        transliterationBengali: "বিসমিল্লাহ",
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
        transliterationBengali: "আলহামদুলিল্লাহিল্লাযী আত'আমানী হাযা",
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
        transliterationBengali: "বিসমিকা আল্লাহুম্মা আমূতু ওয়া আহইয়া",
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
        transliterationBengali: "আলহামদুলিল্লাহিল্লাযী আহইয়ানা",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিনাল খুবুসি",
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
        transliterationBengali: "গুফরানাক",
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
        transliterationBengali: "বিসমিল্লাহি তাওয়াক্কালতু 'আলাল্লাহ",
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
        transliterationBengali: "বিসমিল্লাহি ওয়ালাজনা",
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
        transliterationBengali: "আল্লাহুম্মাফতাহ লী আবওয়াবা রাহমাতিক",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আসআলুকা মিন ফাদলিক",
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
        transliterationBengali: "রাব্বি যিদনী 'ইলমা",
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
        transliterationBengali: "হাসবুনাল্লাহু ওয়া নি'মাল ওয়াকীল",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিনাল হাম্মি ওয়াল হাযান",
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
        transliterationBengali: "আল্লাহুম্মা সাইয়্যিবান নাফি'আ",
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
        transliterationBengali: "মুতিরনা বিফাদলিল্লাহি ওয়া রাহমাতিহ",
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
        transliterationBengali: "সুবহানাল্লাযী সাখখারা লানা হাযা",
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
        transliterationBengali: "আয়িবূনা তা'ইবূনা 'আবিদূন",
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
        transliterationBengali: "আল্লাহুম্মাক ফিনী বিহালালিক",
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
        transliterationBengali: "লা ইলাহা ইল্লা আনতা সুবহানাক",
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
        transliterationBengali: "রাব্বিগফির লী ওয়া তুব 'আলাইয়্যা",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিন শাররি মা খালাক্বত",
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
        transliterationBengali: "আল্লাহুম্মা ইহদিনী লি আহসানিল আখলাক্ব",
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
        transliterationBengali: "রাব্বানা আফরিগ 'আলাইনা সাবরা",
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
        transliterationBengali: "ইহদিনাস সিরাতাল মুস্তাক্বীম",
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
        transliterationBengali: "আ'ঊযু বিকালিমাতিল্লাহিত তাম্মাত",
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
        transliterationBengali: "আল্লাহুম্মা 'আফিনী ফী বাদানী",
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
        transliterationBengali: "আল্লাহুম্মা আ'ইন্নী 'আলা যিকরিকা",
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
        transliterationBengali: "ওয়া মিন শাররি হাসিদিন ইযা হাসাদ",
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
        transliterationBengali: "তাওয়াক্কালতু 'আলাল্লাহ",
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
        transliterationBengali: "আল্লাহুম্মা ইখতিম লানা বিস সালিহাত",
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
        transliterationBengali: "রাব্বিজ'আলনী মুক্বীমাস সালাহ",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিনাল মাগরাম",
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
        transliterationBengali: "আল্লাহুম্মা ক্বান্নি'নী বিমা রাযাক্বতানী",
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
        transliterationBengali: "ওয়া মিন শাররি হাসিদিন ইযা হাসাদ",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আসআলুকা রিযক্বান তাইয়্যিবা",
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
        transliterationBengali: "রাব্বানা লা তুযিগ ক্বুলূবানা",
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
        transliterationBengali: "তাওয়াক্কালতু 'আলাল্লাহ",
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
        transliterationBengali: "আল্লাহুম্মা তাহহির ক্বালবী",
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
        transliterationBengali: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ",
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
        transliterationBengali: "আমসাইনা ওয়া আমসাল মুলকু লিল্লাহ",
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
        transliterationBengali: "আল্লাহুম্মা আজিরনী মিনান নার",
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
        transliterationBengali: "আল্লাহুম্মা তাওয়াফফানী মুসলিমান",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিন মাওতিল ফুজা'আহ",
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
        transliterationBengali: "আল্লাহুম্মা ইজ'আল ফী ক্বালবী নূরা",
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
        transliterationBengali: "আ'ঊযু বিকালিমাতিল্লাহিত তাম্মাত",
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
        transliterationBengali: "আল্লাহুম্মা লা সাহলা ইল্লা মা জা'আলতাহু সাহলা",
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
        transliterationBengali: "আল্লাহুম্মা বা'ইদ বাইনী ওয়া বাইনা খাতায়ায়া",
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
        transliterationBengali: "আল্লাহুম্মা সাব্বিত ক্বালবী 'আলা দীনিক",
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
        transliterationBengali: "আল্লাহুম্মা ইন্নী আসআলুকাল জান্নাহ",
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
      },
      {
        id: "sunnah-31",
        titleBengali: "মসজিদে প্রবেশের দোয়া",
        titleEnglish: "Entering Mosque Dua",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration: "Allahumma-ftah li abwaba rahmatik",
        transliterationBengali: "আল্লাহুম্মা ইফতাহ লি আবওয়াবা রাহমাতিক",
        bengali: "হে আল্লাহ আপনার রহমতের দরজাগুলো আমার জন্য খুলে দিন",
        english: "O Allah open for me the doors of Your mercy",
        reference: "সহীহ মুসলিম, হাদিস নং ৭১৩"
      },
      {
        id: "sunnah-32",
        titleBengali: "মসজিদ থেকে বের হওয়ার দোয়া",
        titleEnglish: "Leaving Mosque Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliteration: "Allahumma inni as'aluka min fadlik",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা মিন ফাদলিক",
        bengali: "হে আল্লাহ আমি আপনার অনুগ্রহ চাই",
        english: "O Allah I ask You for Your bounty",
        reference: "সহীহ মুসলিম, হাদিস নং ৭১৩"
      },
      {
        id: "sunnah-33",
        titleBengali: "আজানের পর দোয়া",
        titleEnglish: "Adhan After Dua",
        arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ",
        transliteration: "Allahumma rabba hadhihid-da'watit-tammah",
        transliterationBengali: "আল্লাহুম্মা রাব্বা হাজিহিদ্দা'ওয়াতিত্তাম্মাহ",
        bengali: "হে আল্লাহ এই পূর্ণ আহ্বানের রব",
        english: "O Allah, Lord of this perfect call",
        reference: "সহীহ বুখারী, হাদিস নং ৬১৪"
      },
      {
        id: "sunnah-34",
        titleBengali: "ওযুর পর দোয়া",
        titleEnglish: "After Wudu Dua",
        arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ",
        transliteration: "Ashhadu an la ilaha illallah",
        transliterationBengali: "আশহাদু আন লা ইলাহা ইল্লাল্লাহ",
        bengali: "আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো উপাস্য নেই",
        english: "I bear witness that none has the right to be worshipped but Allah",
        reference: "সহীহ মুসলিম, হাদিস নং ২৩৪"
      },
      {
        id: "sunnah-35",
        titleBengali: "ওযুর আগে দোয়া",
        titleEnglish: "Before Wudu Dua",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        transliterationBengali: "বিসমিল্লাহ",
        bengali: "আল্লাহর নামে শুরু করছি",
        english: "In the name of Allah",
        reference: "সুনান আবু দাউদ, হাদিস নং ১০১"
      },
      {
        id: "sunnah-36",
        titleBengali: "বাজারে প্রবেশের দোয়া",
        titleEnglish: "Entering Market Dua",
        arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ",
        transliteration: "La ilaha illallahu wahdah",
        transliterationBengali: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহ",
        bengali: "আল্লাহ ছাড়া কোনো উপাস্য নেই—তিনি একক",
        english: "There is no deity except Allah alone",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪২৮"
      },
      {
        id: "sunnah-37",
        titleBengali: "কঠিন সময়ের দোয়া",
        titleEnglish: "When Facing Difficulty",
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahla",
        transliterationBengali: "আল্লাহুম্মা লা সাহলা ইল্লা মা জা'আলতাহু সাহলা",
        bengali: "হে আল্লাহ আপনি সহজ না করলে কিছুই সহজ নয়",
        english: "O Allah nothing is easy except what You make easy",
        reference: "ইবন হিব্বান, হাদিস নং ২৪২৭"
      },
      {
        id: "sunnah-38",
        titleBengali: "রাগ নিয়ন্ত্রণের দোয়া",
        titleEnglish: "Anger Control Dua",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaitanir-rajim",
        transliterationBengali: "আউযু বিল্লাহি মিনাশ শাইতানির রাজীম",
        bengali: "আমি অভিশপ্ত শয়তান থেকে আল্লাহর আশ্রয় চাই",
        english: "I seek refuge in Allah from the accursed Satan",
        reference: "সহীহ বুখারী, হাদিস নং ৩২৮২"
      },
      {
        id: "sunnah-39",
        titleBengali: "চাঁদ দেখার দোয়া",
        titleEnglish: "Seeing the Crescent Moon",
        arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ",
        transliteration: "Allahumma ahillahu 'alayna bil-yumni wal-iman",
        transliterationBengali: "আল্লাহুম্মা আহিল্লাহু আলাইনা বিল-ইউমনি ওয়াল ইমান",
        bengali: "হে আল্লাহ এটি আমাদের জন্য কল্যাণ ও ঈমানসহ উদিত করুন",
        english: "O Allah let it appear upon us with goodness and faith",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৫১"
      },
      {
        id: "sunnah-40",
        titleBengali: "রোগী দেখার দোয়া",
        titleEnglish: "Visiting the Sick Dua",
        arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
        transliteration: "La ba'sa tahurun in sha Allah",
        transliterationBengali: "লা বা'সা তাহূরুন ইন শা আল্লাহ",
        bengali: "কোনো সমস্যা নেই—ইনশাআল্লাহ এটি পবিত্রতা",
        english: "No harm—if Allah wills, it is a purification",
        reference: "সহীহ বুখারী, হাদিস নং ৫৬৫৬"
      },
      {
        id: "sunnah-41",
        titleBengali: "হাঁচির পর দোয়া",
        titleEnglish: "After Sneezing",
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alhamdulillah",
        transliterationBengali: "আলহামদুলিল্লাহ",
        bengali: "সব প্রশংসা আল্লাহর",
        english: "All praise is for Allah",
        reference: "সহীহ বুখারী, হাদিস নং ৬২২৪"
      },
      {
        id: "sunnah-42",
        titleBengali: "হাঁচির জবাব",
        titleEnglish: "Reply to Sneezing",
        arabic: "يَرْحَمُكَ اللَّهُ",
        transliteration: "Yarhamukallah",
        transliterationBengali: "ইয়ারহামুকাল্লাহ",
        bengali: "আল্লাহ আপনাকে রহম করুন",
        english: "May Allah have mercy on you",
        reference: "সহীহ বুখারী, হাদিস নং ৬২২৪"
      },
      {
        id: "sunnah-43",
        titleBengali: "খারাপ চরিত্র থেকে রক্ষা",
        titleEnglish: "Protection from Bad Character",
        arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ",
        transliteration: "Allahumma ihdini li-ahsanil-akhlaq",
        transliterationBengali: "আল্লাহুম্মা ইহদিনি লি আহসানিল আখলাক",
        bengali: "হে আল্লাহ আমাকে উত্তম চরিত্রে পরিচালিত করুন",
        english: "O Allah guide me to the best of character",
        reference: "সহীহ মুসলিম, হাদিস নং ৭৭১"
      },
      {
        id: "sunnah-44",
        titleBengali: "স্বামী-স্ত্রীর সম্পর্কের আগে দোয়া",
        titleEnglish: "Before Sexual Relations",
        arabic: "بِسْمِ اللَّهِ اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ",
        transliteration: "Bismillahi Allahumma jannibnash-shaitan",
        transliterationBengali: "বিসমিল্লাহি আল্লাহুম্মা জান্নিবনাশ শাইতান",
        bengali: "হে আল্লাহ আমাদেরকে শয়তান থেকে দূরে রাখুন",
        english: "O Allah keep Satan away from us",
        reference: "সহীহ বুখারী, হাদিস নং ১৪১"
      },
      {
        id: "sunnah-45",
        titleBengali: "ঋণ ও গুনাহ থেকে রক্ষা",
        titleEnglish: "Protection from Debt and Sin",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ",
        transliteration: "Allahumma inni a'udhu bika minal-ma'tham wal-maghram",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল মা'সাম ওয়াল মাগরাম",
        bengali: "হে আল্লাহ গুনাহ ও ঋণের বোঝা থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from sin and debt",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "sunnah-46",
        titleBengali: "হঠাৎ রাগ থেকে রক্ষা",
        titleEnglish: "Protection from Sudden Anger",
        arabic: "اللَّهُمَّ اذْهِبْ غَيْظَ قَلْبِي",
        transliteration: "Allahumma adhhib ghayza qalbi",
        transliterationBengali: "আল্লাহুম্মা আজহিব গাইযা কালবি",
        bengali: "হে আল্লাহ আমার হৃদয়ের ক্রোধ দূর করুন",
        english: "O Allah remove the anger of my heart",
        reference: "সুনান আবু দাউদ, হাদিস নং ৪৭৮২"
      },
      {
        id: "sunnah-47",
        titleBengali: "ব্যথা লাগলে দোয়া",
        titleEnglish: "When Feeling Pain",
        arabic: "بِسْمِ اللَّهِ أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ",
        transliteration: "Bismillahi a'udhu bi'izzatillahi wa qudratih",
        transliterationBengali: "বিসমিল্লাহি আউযু বিইজ্জাতিল্লাহি ওয়া কুদরাতিহি",
        bengali: "আল্লাহর শক্তি ও ক্ষমতার আশ্রয় চাই",
        english: "I seek refuge in Allah's might and power",
        reference: "সহীহ মুসলিম, হাদিস নং ২২০২"
      },
      {
        id: "sunnah-48",
        titleBengali: "ফিতনা থেকে রক্ষা",
        titleEnglish: "Protection from Trials",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفِتَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-fitan",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল ফিতান",
        bengali: "হে আল্লাহ সব ফিতনা থেকে আমাকে রক্ষা করুন",
        english: "O Allah protect me from trials",
        reference: "সহীহ মুসলিম, হাদিস নং ২৮৬৭"
      },
      {
        id: "sunnah-49",
        titleBengali: "জীবনের সুন্দর সমাপ্তির দোয়া",
        titleEnglish: "Good Ending of Life",
        arabic: "اللَّهُمَّ اخْتِمْ لَنَا بِخَيْرٍ",
        transliteration: "Allahumma-khtim lana bikhayr",
        transliterationBengali: "আল্লাহুম্মা ইখতিম লানা বিখাইর",
        bengali: "হে আল্লাহ আমাদের শেষটা ভালো করুন",
        english: "O Allah grant us a good ending",
        reference: "মুসনাদ আহমাদ, হাদিস নং ১২১৭৩"
      },
      {
        id: "sunnah-50",
        titleBengali: "সমস্ত কল্যাণের দোয়া",
        titleEnglish: "Comprehensive Goodness",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ كُلِّ خَيْرٍ",
        transliteration: "Allahumma inni as'aluka min kulli khayr",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা মিন কুল্লি খাইর",
        bengali: "হে আল্লাহ আমি আপনার কাছে সব কল্যাণ চাই",
        english: "O Allah I ask You for all goodness",
        reference: "সুনান ইবন মাজাহ, হাদিস নং ৩৮৪৩"
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
      },
      {
        id: "guidance-11",
        titleBengali: "আল্লাহর উপর ভরসা",
        titleEnglish: "Trust in Allah",
        arabic: "وَتَوَكَّلْ عَلَى اللَّهِ",
        transliteration: "Wa tawakkal 'alallah",
        transliterationBengali: "ওয়া তাওয়াক্কাল আলাল্লাহ",
        bengali: "আল্লাহর উপর ভরসা কর",
        english: "And put your trust in Allah",
        reference: "সূরা আল-আহযাব ৩৩:৩"
      },
      {
        id: "guidance-12",
        titleBengali: "আল্লাহ যাকে চান হেদায়াত দেন",
        titleEnglish: "Allah Guides Whom He Wills",
        arabic: "وَاللَّهُ يَهْدِي مَنْ يَشَاءُ",
        transliteration: "Wallahu yahdi man yashaa",
        transliterationBengali: "ওয়াল্লাহু ইয়াহদি মান ইয়াশা",
        bengali: "আল্লাহ যাকে চান তাকে হেদায়াত দেন",
        english: "And Allah guides whom He wills",
        reference: "সূরা আল-বাকারা ২:২১৩"
      },
      {
        id: "guidance-13",
        titleBengali: "হেদায়াতের দোয়া",
        titleEnglish: "Prayer for Guidance",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinas-siratal-mustaqim",
        transliterationBengali: "ইহদিনাস সিরাতাল মুস্তাকীম",
        bengali: "আমাদের সরল পথে পরিচালিত করুন",
        english: "Guide us to the straight path",
        reference: "সূরা আল-ফাতিহা ১:৬"
      },
      {
        id: "guidance-14",
        titleBengali: "ঈমানের নূর",
        titleEnglish: "Light of Faith",
        arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
        transliteration: "Allahu nurus-samawati wal-ard",
        transliterationBengali: "আল্লাহু নূরুস সামাওয়াতি ওয়াল আরদ",
        bengali: "আল্লাহ আসমান ও জমিনের নূর",
        english: "Allah is the Light of the heavens and the earth",
        reference: "সূরা আন-নূর ২৪:৩৫"
      },
      {
        id: "guidance-15",
        titleBengali: "কুরআন হেদায়াত",
        titleEnglish: "Quran as Guidance",
        arabic: "هُدًى لِلْمُتَّقِينَ",
        transliteration: "Hudan lil-muttaqin",
        transliterationBengali: "হুদান লিল মুত্তাকীন",
        bengali: "এটি মুত্তাকীদের জন্য হেদায়াত",
        english: "It is guidance for the righteous",
        reference: "সূরা আল-বাকারা ২:২"
      },
      {
        id: "guidance-16",
        titleBengali: "শান্তির পথে হেদায়াত",
        titleEnglish: "Allah Leads to Peace",
        arabic: "وَيَهْدِي إِلَىٰ صِرَاطٍ مُسْتَقِيمٍ",
        transliteration: "Wa yahdi ila siratin mustaqim",
        transliterationBengali: "ওয়া ইয়াহদি ইলা সিরাতিন মুস্তাকীম",
        bengali: "তিনি সরল পথে পরিচালিত করেন",
        english: "And He guides to a straight path",
        reference: "সূরা ইউনুস ১০:২৫"
      },
      {
        id: "guidance-17",
        titleBengali: "ঈমানে দৃঢ়তা",
        titleEnglish: "Steadfast Faith",
        arabic: "يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا",
        transliteration: "Yuthabbitullahu alladhina amanu",
        transliterationBengali: "ইউসাব্বিতুল্লাহুল্লাজিনা আমানু",
        bengali: "আল্লাহ মুমিনদের দৃঢ় রাখেন",
        english: "Allah keeps firm those who believe",
        reference: "সূরা ইবরাহীম ১৪:২৭"
      },
      {
        id: "guidance-18",
        titleBengali: "ওহীর অনুসরণ",
        titleEnglish: "Follow Revelation",
        arabic: "اتَّبِعْ مَا أُوحِيَ إِلَيْكَ",
        transliteration: "Ittabi' ma uhiya ilayk",
        transliterationBengali: "ইত্তাবি মা উহিয়া ইলাইকা",
        bengali: "তোমার প্রতি যা ওহী করা হয়েছে তা অনুসরণ কর",
        english: "Follow what has been revealed to you",
        reference: "সূরা আল-আনআম ৬:১০৬"
      },
      {
        id: "guidance-19",
        titleBengali: "মুমিনদের জন্য ভয় নেই",
        titleEnglish: "No Fear for Believers",
        arabic: "فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
        transliteration: "Fala khawfun 'alayhim wa la hum yahzanun",
        transliterationBengali: "ফালা খাওফুন আলাইহিম ওয়ালা হুম ইয়াহযানুন",
        bengali: "তাদের কোনো ভয় নেই এবং তারা দুঃখিত হবে না",
        english: "No fear shall be upon them nor shall they grieve",
        reference: "সূরা আল-বাকারা ২:৩৮"
      },
      {
        id: "guidance-20",
        titleBengali: "হেদায়াতপ্রাপ্তদের প্রতি আল্লাহর ভালোবাসা",
        titleEnglish: "Allah Loves the Guided",
        arabic: "وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
        transliteration: "Wallahu yuhibbul-muhsinin",
        transliterationBengali: "ওয়াল্লাহু ইউহিব্বুল মুহসিনীন",
        bengali: "আল্লাহ সৎকর্মশীলদের ভালোবাসেন",
        english: "And Allah loves the doers of good",
        reference: "সূরা আলে ইমরান ৩:১৩৪"
      },
      {
        id: "guidance-21",
        titleBengali: "হৃদয় দৃঢ় রাখার দোয়া",
        titleEnglish: "Prayer for Steadfast Hearts",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا",
        transliteration: "Rabbana la tuzigh qulubana",
        transliterationBengali: "রাব্বানা লা তুযিগ কুলুবানা",
        bengali: "হে আমাদের রব আমাদের হৃদয়কে বিচ্যুত করবেন না",
        english: "Our Lord do not let our hearts deviate",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "guidance-22",
        titleBengali: "আল্লাহ ঈমানের দিকে পথ দেখান",
        titleEnglish: "Allah Guides to Faith",
        arabic: "يَهْدِي اللَّهُ لِنُورِهِ مَنْ يَشَاءُ",
        transliteration: "Yahdillahu linurihi man yashaa",
        transliterationBengali: "ইয়াহদিল্লাহু লিনূরিহি মান ইয়াশা",
        bengali: "আল্লাহ যাকে চান তাকে তাঁর নূরের দিকে পথ দেখান",
        english: "Allah guides to His light whom He wills",
        reference: "সূরা আন-নূর ২৪:৩৫"
      },
      {
        id: "guidance-23",
        titleBengali: "রহমত ও হিদায়াতের দোয়া",
        titleEnglish: "Supplication for Mercy and Guidance",
        arabic: "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً",
        transliteration: "Rabbana atina min ladunka rahmah",
        transliterationBengali: "রাব্বানা আতিনা মিন লাদুনকা রাহমাহ",
        bengali: "হে আমাদের রব আপনার পক্ষ থেকে আমাদের রহমত দান করুন",
        english: "Our Lord grant us mercy from Yourself",
        reference: "সূরা আল-কাহফ ১৮:১০"
      },
      {
        id: "guidance-24",
        titleBengali: "কুরআন পূর্ণ হিদায়াত",
        titleEnglish: "Quran as Complete Guidance",
        arabic: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
        transliteration: "Inna hadhal-qur'ana yahdi lillati hiya aqwam",
        transliterationBengali: "ইন্না হাযাল কুরআনা ইয়াহদি লিল্লাতি হিয়া আকওয়াম",
        bengali: "নিশ্চয় এই কুরআন সবচেয়ে সঠিক পথে হিদায়াত দেয়",
        english: "Indeed this Qur'an guides to what is most upright",
        reference: "সূরা আল-ইসরা ১৭:৯"
      },
      {
        id: "guidance-25",
        titleBengali: "সৎপথে থাকার দোয়া",
        titleEnglish: "Prayer for Righteousness",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ",
        transliteration: "Rabbi adkhilni mudkhala sidq",
        transliterationBengali: "রাব্বি আদখিলনি মুদখালা সিদক",
        bengali: "হে আমার রব আমাকে সত্য প্রবেশ দান করুন",
        english: "My Lord grant me a sound entrance",
        reference: "সূরা আল-ইসরা ১৭:৮০"
      },
      {
        id: "guidance-26",
        titleBengali: "আল্লাহ হিদায়াত বাড়ান",
        titleEnglish: "Allah Increases Guidance",
        arabic: "وَالَّذِينَ اهْتَدَوْا زَادَهُمْ هُدًى",
        transliteration: "Walladhina ihtadaw zadahum huda",
        transliterationBengali: "ওয়াল্লাজিনা ইহতাদাও জাদাহুম হুদা",
        bengali: "যারা হিদায়াতপ্রাপ্ত আল্লাহ তাদের হিদায়াত বৃদ্ধি করেন",
        english: "And those who are guided—He increases them in guidance",
        reference: "সূরা মুহাম্মাদ ৪৭:১৭"
      },
      {
        id: "guidance-27",
        titleBengali: "তাকওয়ার দোয়া",
        titleEnglish: "Supplication for Piety",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا",
        transliteration: "Rabbana-ghfir lana dhunubana wa kaffir 'anna sayyiatina",
        transliterationBengali: "রাব্বানাগফির লানা যুনুবানা ওয়া কাফফির আন্না সাইয়্যিআতিনা",
        bengali: "হে আমাদের রব আমাদের গুনাহ ক্ষমা করুন ও পাপ মুছে দিন",
        english: "Our Lord forgive our sins and remove our misdeeds",
        reference: "সূরা আলে ইমরান ৩:১৯৩"
      },
      {
        id: "guidance-28",
        titleBengali: "নূরের উপর নূর",
        titleEnglish: "Light upon Light",
        arabic: "نُورٌ عَلَىٰ نُورٍ",
        transliteration: "Nurun 'ala nur",
        transliterationBengali: "নূরুন আলা নূর",
        bengali: "নূরের উপর নূর",
        english: "Light upon light",
        reference: "সূরা আন-নূর ২৪:৩৫"
      },
      {
        id: "guidance-29",
        titleBengali: "সরল পথ অনুসরণ",
        titleEnglish: "Following the Straight Path",
        arabic: "وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا",
        transliteration: "Wa anna hadha sirati mustaqima",
        transliterationBengali: "ওয়া আন্না হাজা সিরাতি মুস্তাকীমা",
        bengali: "এটাই আমার সরল পথ",
        english: "And this is My straight path",
        reference: "সূরা আল-আনআম ৬:১৫৩"
      },
      {
        id: "guidance-30",
        titleBengali: "আল্লাহ সর্বোত্তম পথপ্রদর্শক",
        titleEnglish: "Allah is the Best Guide",
        arabic: "وَكَفَىٰ بِرَبِّكَ هَادِيًا وَنَصِيرًا",
        transliteration: "Wakafa birabbika hadiyan wa nasira",
        transliterationBengali: "ওয়া কাফা বিরাব্বিকা হাদিয়ান ওয়া নাসীরা",
        bengali: "তোমার রবই যথেষ্ট পথপ্রদর্শক ও সাহায্যকারী",
        english: "And sufficient is your Lord as a Guide and Helper",
        reference: "সূরা আল-ফুরকান ২৫:৩১"
      },
      {
        id: "guidance-31",
        titleBengali: "হিদায়াত ও রহমতের দোয়া",
        titleEnglish: "Prayer for Guidance and Mercy",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
        transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana",
        transliterationBengali: "রাব্বানা লা তুযিগ কুলুবানা বা'দা ইয হাদাইতানা",
        bengali: "হে আমাদের রব হিদায়াত দেওয়ার পর আমাদের হৃদয় বিচ্যুত করবেন না",
        english: "Our Lord do not let our hearts deviate after You have guided us",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "guidance-32",
        titleBengali: "সত্যের মাধ্যমে হিদায়াত",
        titleEnglish: "Allah Guides Through Truth",
        arabic: "وَيَهْدِي إِلَيْهِ مَنْ أَنَابَ",
        transliteration: "Wa yahdi ilayhi man anab",
        transliterationBengali: "ওয়া ইয়াহদি ইলাইহি মান আনাব",
        bengali: "যে আল্লাহর দিকে ফিরে আসে তিনি তাকে পথ দেখান",
        english: "And He guides to Himself whoever turns back",
        reference: "সূরা আর-রাদ ১৩:২৭"
      },
      {
        id: "guidance-33",
        titleBengali: "সরল পথের দোয়া",
        titleEnglish: "Prayer for Straight Path",
        arabic: "وَاهْدِنَا إِلَىٰ سَوَاءِ السَّبِيلِ",
        transliteration: "Wahdina ila sawa'is-sabil",
        transliterationBengali: "ওয়াহদিনা ইলা সাওয়া-ইস সাবিল",
        bengali: "আমাদের সঠিক পথে পরিচালিত করুন",
        english: "And guide us to the straight way",
        reference: "সূরা আল-মায়িদাহ ৫:১৬"
      },
      {
        id: "guidance-34",
        titleBengali: "হিদায়াতপ্রাপ্তদের প্রতি আল্লাহর ভালোবাসা",
        titleEnglish: "Allah Loves the Guided",
        arabic: "إِنَّ اللَّهَ يُحِبُّ الْمُتَّقِينَ",
        transliteration: "Inna Allaha yuhibbul-muttaqin",
        transliterationBengali: "ইন্নাল্লাহা ইউহিব্বুল মুত্তাকীন",
        bengali: "নিশ্চয় আল্লাহ মুত্তাকীদের ভালোবাসেন",
        english: "Indeed Allah loves the righteous",
        reference: "সূরা আত-তাওবাহ ৯:৪"
      },
      {
        id: "guidance-35",
        titleBengali: "অন্তরের নূরের দোয়া",
        titleEnglish: "Prayer for Inner Light",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
        transliteration: "Rabbishrah li sadri",
        transliterationBengali: "রাব্বিশরাহ লি সদরি",
        bengali: "হে আমার রব আমার অন্তর প্রশস্ত করুন",
        english: "My Lord expand for me my chest",
        reference: "সূরা ত্বহা ২০:২৫"
      },
      {
        id: "guidance-36",
        titleBengali: "ঈমান বৃদ্ধি করেন আল্লাহ",
        titleEnglish: "Allah Increases Faith",
        arabic: "وَيَزْدَادَ الَّذِينَ آمَنُوا إِيمَانًا",
        transliteration: "Wa yazdadal-ladhina amanu imanan",
        transliterationBengali: "ওয়া ইয়াজদাদাল্লাজিনা আমানু ঈমানান",
        bengali: "যাতে মুমিনদের ঈমান বৃদ্ধি পায়",
        english: "So that those who believe may increase in faith",
        reference: "সূরা আল-মুদ্দাসসির ৭৪:৩১"
      },
      {
        id: "guidance-37",
        titleBengali: "নেতৃত্বে তাকওয়ার দোয়া",
        titleEnglish: "Prayer for Pious Leadership",
        arabic: "وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Waj'alna lil-muttaqina imama",
        transliterationBengali: "ওয়াজ'আলনা লিল মুত্তাকীনা ইমামা",
        bengali: "আমাদের মুত্তাকীদের জন্য নেতা বানান",
        english: "And make us leaders for the righteous",
        reference: "সূরা আল-ফুরকান ২৫:৭৪"
      },
      {
        id: "guidance-38",
        titleBengali: "স্পষ্ট নিদর্শনে হিদায়াত",
        titleEnglish: "Allah Guides with Clear Signs",
        arabic: "قَدْ جَاءَكُمْ مِنَ اللَّهِ نُورٌ وَكِتَابٌ مُبِينٌ",
        transliteration: "Qad ja'akum minallahi nurun wa kitabun mubin",
        transliterationBengali: "ক্বাদ জা'আকুম মিনাল্লাহি নূরুন ওয়া কিতাবুম মুবীন",
        bengali: "আল্লাহর পক্ষ থেকে তোমাদের কাছে নূর ও স্পষ্ট কিতাব এসেছে",
        english: "There has come to you from Allah a light and a clear Book",
        reference: "সূরা আল-মায়িদাহ ৫:১৫"
      },
      {
        id: "guidance-39",
        titleBengali: "ভ্রান্তি থেকে রক্ষার দোয়া",
        titleEnglish: "Prayer to Avoid Misguidance",
        arabic: "وَلَا تَجْعَلْنَا مِنَ الضَّالِّينَ",
        transliteration: "Wala taj'alna minad-dallin",
        transliterationBengali: "ওয়ালা তাজ'আলনা মিনাদ দাল্লীন",
        bengali: "আমাদের পথভ্রষ্টদের অন্তর্ভুক্ত করবেন না",
        english: "And do not make us among those who go astray",
        reference: "সূরা আল-ফাতিহা ১:৭"
      },
      {
        id: "guidance-40",
        titleBengali: "আল্লাহই সর্বোত্তম পথপ্রদর্শক",
        titleEnglish: "Allah is the Best Guide",
        arabic: "إِنَّكَ تَهْدِي إِلَىٰ صِرَاطٍ مُسْتَقِيمٍ",
        transliteration: "Innaka tahdi ila siratin mustaqim",
        transliterationBengali: "ইন্নাকা তাহদি ইলা সিরাতিন মুস্তাকীম",
        bengali: "নিশ্চয় আপনি সরল পথে পথ দেখান",
        english: "Indeed, you guide to a straight path",
        reference: "সূরা আশ-শূরা ৪২:৫২"
      },
      {
        id: "guidance-41",
        titleBengali: "হিদায়াত একমাত্র আল্লাহর পক্ষ থেকে",
        titleEnglish: "Guidance is from Allah Alone",
        arabic: "إِنَّ الْهُدَىٰ هُدَى اللَّهِ",
        transliteration: "Innal-huda hudallah",
        transliterationBengali: "ইন্নাল হুদা হুদাল্লাহ",
        bengali: "নিশ্চয় প্রকৃত হিদায়াত আল্লাহর হিদায়াত",
        english: "Indeed the true guidance is the guidance of Allah",
        reference: "সূরা আল-বাকারা ২:১২০"
      },
      {
        id: "guidance-42",
        titleBengali: "ইসলামের জন্য অন্তর প্রশস্ত করা",
        titleEnglish: "Allah Opens the Heart to Islam",
        arabic: "فَمَن يُرِدِ اللَّهُ أَنْ يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ",
        transliteration: "Faman yuridillahu an yahdiyahu yashrah sadrahu lil-Islam",
        transliterationBengali: "ফামান ইউরিদিল্লাহু আন ইয়াহদিয়াহু ইয়াশরাহ সদরাহু লিল ইসলাম",
        bengali: "আল্লাহ যাকে হিদায়াত দিতে চান তার অন্তর ইসলাম গ্রহণের জন্য প্রশস্ত করেন",
        english: "Whomever Allah wills to guide, He opens his heart to Islam",
        reference: "সূরা আল-আনআম ৬:১২৫"
      },
      {
        id: "guidance-43",
        titleBengali: "তওবার মাধ্যমে হিদায়াত",
        titleEnglish: "Allah Guides Through Repentance",
        arabic: "وَاللَّهُ يَهْدِي مَن يَشَاءُ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
        transliteration: "Wallahu yahdi man yashaa ila siratin mustaqim",
        transliterationBengali: "ওয়াল্লাহু ইয়াহদি মান ইয়াশা ইলা সিরাতিন মুস্তাকীম",
        bengali: "আল্লাহ যাকে চান তাকে সরল পথে পরিচালিত করেন",
        english: "And Allah guides whom He wills to a straight path",
        reference: "সূরা ইউনুস ১০:২৫"
      },
      {
        id: "guidance-44",
        titleBengali: "কুরআনের মাধ্যমে হিদায়াত",
        titleEnglish: "Guidance Through the Quran",
        arabic: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
        transliteration: "Inna hadhal-qur'ana yahdi lillati hiya aqwam",
        transliterationBengali: "ইন্না হাযাল কুরআনা ইয়াহদি লিল্লাতি হিয়া আকওয়াম",
        bengali: "নিশ্চয় এই কুরআন সর্বাধিক সঠিক পথে হিদায়াত দেয়",
        english: "Indeed this Qur'an guides to what is most upright",
        reference: "সূরা আল-ইসরা ১৭:৯"
      },
      {
        id: "guidance-45",
        titleBengali: "মুমিনদের আল্লাহ হিদায়াত দেন",
        titleEnglish: "Allah Guides the Believers",
        arabic: "وَاللَّهُ هَادِي الَّذِينَ آمَنُوا",
        transliteration: "Wallahu hadil-ladhina amanu",
        transliterationBengali: "ওয়াল্লাহু হাদিল্লাজিনা আমানু",
        bengali: "আল্লাহ মুমিনদের পথপ্রদর্শক",
        english: "And Allah is the Guide of those who believe",
        reference: "সূরা মুহাম্মাদ ৪৭:১১"
      },
      {
        id: "guidance-46",
        titleBengali: "নূর ও ঈমানের মাধ্যমে হিদায়াত",
        titleEnglish: "Guidance Through Light and Faith",
        arabic: "فَآمِنُوا بِاللَّهِ وَرَسُولِهِ وَالنُّورِ",
        transliteration: "Fa aminu billahi wa rasulihi wan-nur",
        transliterationBengali: "ফা আমিনু বিল্লাহি ওয়া রাসূলিহি ওয়ান নূর",
        bengali: "আল্লাহ, তাঁর রাসূল ও নূরের প্রতি ঈমান আনো",
        english: "So believe in Allah and His Messenger and the Light",
        reference: "সূরা আত-তাগাবুন ৬৪:৮"
      },
      {
        id: "guidance-47",
        titleBengali: "রহমতের মাধ্যমে হিদায়াত",
        titleEnglish: "Allah Guides with His Mercy",
        arabic: "وَلَوْلَا فَضْلُ اللَّهِ عَلَيْكُمْ وَرَحْمَتُهُ",
        transliteration: "Wa lawla fadlullahi 'alaykum wa rahmatuh",
        transliterationBengali: "ওয়া লাওলা ফাদলুল্লাহি আলাইকুম ওয়া রহমাতুহু",
        bengali: "আল্লাহর অনুগ্রহ ও দয়া না থাকলে…",
        english: "And if not for the favor of Allah upon you and His mercy…",
        reference: "সূরা আন-নূর ২৪:২০"
      },
      {
        id: "guidance-48",
        titleBengali: "চেষ্টা করলে আল্লাহ হিদায়াত দেন",
        titleEnglish: "Allah Guides Those Who Strive",
        arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
        transliteration: "Walladhina jahadu fina lanahdiyannahum subulana",
        transliterationBengali: "ওয়াল্লাজিনা জাহাদু ফিনা লানাহদিয়ান্নাহুম সুবুলানা",
        bengali: "যারা আমাদের পথে চেষ্টা করে আমরা অবশ্যই তাদের পথ দেখাই",
        english: "Those who strive for Us—We will surely guide them to Our ways",
        reference: "সূরা আল-আনকাবুত ২৯:৬৯"
      },
      {
        id: "guidance-49",
        titleBengali: "কিতাবের মাধ্যমে হিদায়াত",
        titleEnglish: "Allah Guides by His Book",
        arabic: "يَهْدِي بِهِ اللَّهُ مَنِ اتَّبَعَ رِضْوَانَهُ",
        transliteration: "Yahdi bihillahu man ittaba'a ridwanah",
        transliterationBengali: "ইয়াহদি বিহিল্লাহু মান ইত্তাবা'আ রিদওয়ানাহু",
        bengali: "আল্লাহ এই কিতাব দ্বারা যাকে চান তাকে পথ দেখান",
        english: "Allah guides with it those who seek His pleasure",
        reference: "সূরা আল-মায়িদাহ ৫:১৬"
      },
      {
        id: "guidance-50",
        titleBengali: "আল্লাহই যথেষ্ট পথপ্রদর্শক",
        titleEnglish: "Allah is Sufficient as a Guide",
        arabic: "أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ",
        transliteration: "Alaysa Allahu bikafin 'abdah",
        transliterationBengali: "আলাইসাল্লাহু বিকাফিন আবদাহু",
        bengali: "আল্লাহ কি তাঁর বান্দার জন্য যথেষ্ট নন?",
        english: "Is not Allah sufficient for His servant?",
        reference: "সূরা আয-যুমার ৩৯:৩৬"
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
      },
      {
        id: "knowledge-11",
        titleBengali: "বুঝার ক্ষমতা বৃদ্ধির দোয়া",
        titleEnglish: "For Understanding",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        transliteration: "Rabbishrah li sadri wa yassir li amri",
        transliterationBengali: "রাব্বিশরাহ লি সদরি ওয়া ইয়াসসির লি আমরি",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করুন এবং আমার কাজ সহজ করুন",
        english: "My Lord, expand for me my chest and ease for me my task",
        reference: "সূরা ত্বহা ২০:২৫-২৬"
      },
      {
        id: "knowledge-12",
        titleBengali: "জিহ্বার জড়তা দূর করার দোয়া",
        titleEnglish: "For Clear Speech",
        arabic: "وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
        transliteration: "Wahlul 'uqdatan min lisani yafqahu qawli",
        transliterationBengali: "ওয়াহলুল উকদাতাম মিন লিসানি ইয়াফকাহু কাওলি",
        bengali: "আমার জিহ্বার জড়তা দূর করুন যাতে তারা আমার কথা বুঝতে পারে",
        english: "And untie the knot from my tongue that they may understand my speech",
        reference: "সূরা ত্বহা ২০:২৭-২৮"
      },
      {
        id: "knowledge-13",
        titleBengali: "উপকারী ইলমের দোয়া",
        titleEnglish: "For Beneficial Knowledge",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'a",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা ইলমান নাফিআ",
        bengali: "হে আল্লাহ! আমি আপনার কাছে উপকারী জ্ঞান চাই",
        english: "O Allah, I ask You for beneficial knowledge",
        reference: "সুনান ইবন মাজাহ, হাদিস নং ৯২৫"
      },
      {
        id: "knowledge-14",
        titleBengali: "অজ্ঞতা থেকে আশ্রয়ের দোয়া",
        titleEnglish: "Protection from Ignorance",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ",
        transliteration: "Allahumma inni a'udhu bika min 'ilmin la yanfa'",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন ইলমিন লা ইয়ানফা",
        bengali: "হে আল্লাহ! আমি অনুপকারী জ্ঞান থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from knowledge that does not benefit",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২২"
      },
      {
        id: "knowledge-15",
        titleBengali: "স্মরণশক্তির দোয়া",
        titleEnglish: "For Strong Memory",
        arabic: "اللَّهُمَّ ذَكِّرْنِي مِنْهُ مَا نَسِيتُ",
        transliteration: "Allahumma dhakkirni minhu ma nasit",
        transliterationBengali: "আল্লাহুম্মা জাক্কিরনি মিনহু মা নাসিত",
        bengali: "হে আল্লাহ! আমি যা ভুলে গেছি তা স্মরণ করিয়ে দিন",
        english: "O Allah, remind me of what I have forgotten",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "knowledge-16",
        titleBengali: "দ্বীনের জ্ঞানের দোয়া",
        titleEnglish: "For Religious Understanding",
        arabic: "اللَّهُمَّ فَقِّهْنِي فِي الدِّينِ",
        transliteration: "Allahumma faqqihni fid-din",
        transliterationBengali: "আল্লাহুম্মা ফাক্কিহনি ফিদ্দীন",
        bengali: "হে আল্লাহ! আমাকে দ্বীনের জ্ঞান দান করুন",
        english: "O Allah, grant me understanding in religion",
        reference: "সহীহ বুখারী, হাদিস নং ৭১"
      },
      {
        id: "knowledge-17",
        titleBengali: "কুরআন শেখার দোয়া",
        titleEnglish: "For Learning Quran",
        arabic: "اللَّهُمَّ عَلِّمْنِي الْقُرْآنَ",
        transliteration: "Allahumma 'allimnil-Qur'an",
        transliterationBengali: "আল্লাহুম্মা আল্লিমনিল কুরআন",
        bengali: "হে আল্লাহ! আমাকে কুরআন শেখান",
        english: "O Allah, teach me the Quran",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "knowledge-18",
        titleBengali: "কুরআন মুখস্থ করার দোয়া",
        titleEnglish: "For Memorizing Quran",
        arabic: "اللَّهُمَّ ارْزُقْنِي حِفْظَ الْقُرْآنِ",
        transliteration: "Allahumma-rzuqni hifzal-Qur'an",
        transliterationBengali: "আল্লাহুম্মারযুকনি হিফযাল কুরআন",
        bengali: "হে আল্লাহ! আমাকে কুরআন হিফয করার তাওফীক দিন",
        english: "O Allah, grant me the ability to memorize the Quran",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-19",
        titleBengali: "জ্ঞানের দরজা খোলার দোয়া",
        titleEnglish: "For Opening Knowledge Doors",
        arabic: "اللَّهُمَّ افْتَحْ عَلَيْنَا حِكْمَتَكَ",
        transliteration: "Allahumma-ftah 'alayna hikmatak",
        transliterationBengali: "আল্লাহুম্মাফতাহ আলাইনা হিকমাতাক",
        bengali: "হে আল্লাহ! আমাদের জন্য আপনার হিকমতের দরজা খুলে দিন",
        english: "O Allah, open for us Your wisdom",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "knowledge-20",
        titleBengali: "সত্য মিথ্যা পার্থক্য বোঝার দোয়া",
        titleEnglish: "For Discerning Truth",
        arabic: "اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ",
        transliteration: "Allahumma arinal-haqqa haqqan warzuqna ittiba'ah",
        transliterationBengali: "আল্লাহুম্মা আরিনাল হাক্কা হাক্কান ওয়ারযুকনা ইত্তিবাআহ",
        bengali: "হে আল্লাহ! আমাদের সত্যকে সত্য হিসেবে দেখান এবং তা অনুসরণ করার তাওফীক দিন",
        english: "O Allah, show us the truth as truth and grant us to follow it",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-21",
        titleBengali: "মিথ্যা থেকে দূরে থাকার দোয়া",
        titleEnglish: "For Avoiding Falsehood",
        arabic: "وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ",
        transliteration: "Wa arinal-batila batilan warzuqna ijtinabah",
        transliterationBengali: "ওয়া আরিনাল বাতিলা বাতিলান ওয়ারযুকনা ইজতিনাবাহ",
        bengali: "এবং মিথ্যাকে মিথ্যা হিসেবে দেখান এবং তা এড়িয়ে চলার তাওফীক দিন",
        english: "And show us falsehood as falsehood and grant us to avoid it",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-22",
        titleBengali: "ইলম শেখানোর দোয়া",
        titleEnglish: "For Teaching Knowledge",
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي",
        transliteration: "Allahumma-nfa'ni bima 'allamtani",
        transliterationBengali: "আল্লাহুম্মানফা'নি বিমা আল্লামতানি",
        bengali: "হে আল্লাহ! আপনি যা শিখিয়েছেন তা দিয়ে আমাকে উপকৃত করুন",
        english: "O Allah, benefit me with what You have taught me",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৯৯"
      },
      {
        id: "knowledge-23",
        titleBengali: "নতুন কিছু শেখার দোয়া",
        titleEnglish: "For Learning New Things",
        arabic: "وَعَلِّمْنِي مَا يَنْفَعُنِي",
        transliteration: "Wa 'allimni ma yanfa'uni",
        transliterationBengali: "ওয়া আল্লিমনি মা ইয়ানফাউনি",
        bengali: "এবং আমাকে এমন কিছু শেখান যা আমাকে উপকৃত করবে",
        english: "And teach me what will benefit me",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৯৯"
      },
      {
        id: "knowledge-24",
        titleBengali: "জ্ঞান বৃদ্ধির দোয়া",
        titleEnglish: "For More Knowledge",
        arabic: "وَزِدْنِي عِلْمًا",
        transliteration: "Wa zidni 'ilma",
        transliterationBengali: "ওয়া যিদনি ইলমা",
        bengali: "এবং আমার জ্ঞান বাড়িয়ে দিন",
        english: "And increase me in knowledge",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "knowledge-25",
        titleBengali: "গভীর জ্ঞানের দোয়া",
        titleEnglish: "For Deep Understanding",
        arabic: "رَبِّ زِدْنِي عِلْمًا وَفَهْمًا",
        transliteration: "Rabbi zidni 'ilman wa fahma",
        transliterationBengali: "রাব্বি যিদনি ইলমান ওয়া ফাহমা",
        bengali: "হে আমার রব! আমার জ্ঞান ও বোধশক্তি বাড়িয়ে দিন",
        english: "My Lord, increase me in knowledge and understanding",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-26",
        titleBengali: "পরীক্ষায় সফলতার দোয়া",
        titleEnglish: "For Exam Success",
        arabic: "رَبِّ يَسِّرْ وَلَا تُعَسِّرْ",
        transliteration: "Rabbi yassir wa la tu'assir",
        transliterationBengali: "রাব্বি ইয়াসসির ওয়ালা তুআসসির",
        bengali: "হে আমার রব! সহজ করুন, কঠিন করবেন না",
        english: "My Lord, make it easy and do not make it difficult",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-27",
        titleBengali: "শুভ পরিণাম লাভের দোয়া",
        titleEnglish: "For Good Outcome",
        arabic: "رَبِّ تَمِّمْ بِالْخَيْرِ",
        transliteration: "Rabbi tammim bil-khayr",
        transliterationBengali: "রাব্বি তাম্মিম বিল খাইর",
        bengali: "হে আমার রব! কল্যাণের সাথে সম্পন্ন করুন",
        english: "My Lord, complete it with good",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-28",
        titleBengali: "জ্ঞানীদের সাথে থাকার দোয়া",
        titleEnglish: "For Company of Scholars",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ الْعُلَمَاءِ الرَّبَّانِيِّينَ",
        transliteration: "Allahumma-j'alni minal-'ulama'ir-rabbaniyyin",
        transliterationBengali: "আল্লাহুম্মাজ'আলনি মিনাল উলামাইর রাব্বানিয়্যীন",
        bengali: "হে আল্লাহ! আমাকে রব্বানী আলেমদের অন্তর্ভুক্ত করুন",
        english: "O Allah, make me among the devoted scholars",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-29",
        titleBengali: "ইলম ধরে রাখার দোয়া",
        titleEnglish: "For Retaining Knowledge",
        arabic: "اللَّهُمَّ اجْعَلْ عِلْمِي فِي صَدْرِي",
        transliteration: "Allahumma-j'al 'ilmi fi sadri",
        transliterationBengali: "আল্লাহুম্মাজ'আল ইলমি ফি সদরি",
        bengali: "হে আল্লাহ! আমার জ্ঞান আমার অন্তরে রাখুন",
        english: "O Allah, place my knowledge in my heart",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-30",
        titleBengali: "ভালো শিক্ষকের দোয়া",
        titleEnglish: "For Good Teacher",
        arabic: "اللَّهُمَّ ارْزُقْنِي مُعَلِّمًا صَالِحًا",
        transliteration: "Allahumma-rzuqni mu'alliman saliha",
        transliterationBengali: "আল্লাহুম্মারযুকনি মু'আল্লিমান সালিহা",
        bengali: "হে আল্লাহ! আমাকে একজন ভালো শিক্ষক দান করুন",
        english: "O Allah, grant me a righteous teacher",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-31",
        titleBengali: "জ্ঞান প্রচারের দোয়া",
        titleEnglish: "For Spreading Knowledge",
        arabic: "اللَّهُمَّ اجْعَلْنِي مُبَلِّغًا لِعِلْمِكَ",
        transliteration: "Allahumma-j'alni muballighan li'ilmik",
        transliterationBengali: "আল্লাহুম্মাজ'আলনি মুবাল্লিগান লিইলমিক",
        bengali: "হে আল্লাহ! আমাকে আপনার জ্ঞান প্রচারকারী বানান",
        english: "O Allah, make me a conveyer of Your knowledge",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-32",
        titleBengali: "বই পড়ার আগে দোয়া",
        titleEnglish: "Before Reading Books",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ الْعِلْمِ",
        transliteration: "Allahumma-ftah li abwabal-'ilm",
        transliterationBengali: "আল্লাহুম্মাফতাহ লি আবওয়াবাল ইলম",
        bengali: "হে আল্লাহ! আমার জন্য জ্ঞানের দরজাগুলো খুলে দিন",
        english: "O Allah, open for me the doors of knowledge",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-33",
        titleBengali: "মনোযোগ বৃদ্ধির দোয়া",
        titleEnglish: "For Concentration",
        arabic: "اللَّهُمَّ اجْمَعْ قَلْبِي عَلَى طَاعَتِكَ",
        transliteration: "Allahumma-jma' qalbi 'ala ta'atik",
        transliterationBengali: "আল্লাহুম্মাজমা' কালবি আলা তাআতিক",
        bengali: "হে আল্লাহ! আমার অন্তরকে আপনার আনুগত্যে একাগ্র করুন",
        english: "O Allah, unite my heart upon Your obedience",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "knowledge-34",
        titleBengali: "ভুলে যাওয়া থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Forgetfulness",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ النِّسْيَانِ",
        transliteration: "Allahumma inni a'udhu bika minan-nisyan",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনান নিসইয়ান",
        bengali: "হে আল্লাহ! আমি ভুলে যাওয়া থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from forgetfulness",
        reference: "সহীহ বুখারী"
      },
      {
        id: "knowledge-35",
        titleBengali: "সঠিক সিদ্ধান্তের দোয়া",
        titleEnglish: "For Right Decisions",
        arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي",
        transliteration: "Allahumma alhimni rushdi",
        transliterationBengali: "আল্লাহুম্মা আলহিমনি রুশদি",
        bengali: "হে আল্লাহ! আমাকে সঠিক পথ অনুপ্রাণিত করুন",
        english: "O Allah, inspire me with right guidance",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "knowledge-36",
        titleBengali: "ক্লাসে যাওয়ার আগে দোয়া",
        titleEnglish: "Before Attending Class",
        arabic: "اللَّهُمَّ اجْعَلْ هَذَا الْمَجْلِسَ مُبَارَكًا",
        transliteration: "Allahumma-j'al hadhal-majlisa mubaraka",
        transliterationBengali: "আল্লাহুম্মাজ'আল হাযাল মাজলিসা মুবারাকা",
        bengali: "হে আল্লাহ! এই মজলিসকে বরকতময় করুন",
        english: "O Allah, make this gathering blessed",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-37",
        titleBengali: "মজলিস শেষে দোয়া",
        titleEnglish: "After Knowledge Gathering",
        arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ",
        transliteration: "Subhanaka Allahumma wa bihamdik",
        transliterationBengali: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিক",
        bengali: "হে আল্লাহ! আপনি পবিত্র এবং আপনার প্রশংসা",
        english: "Glory be to You O Allah and praise be to You",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "knowledge-38",
        titleBengali: "ইলমে দ্বীনের দোয়া",
        titleEnglish: "For Islamic Knowledge",
        arabic: "اللَّهُمَّ عَلِّمْنَا الْكِتَابَ وَالْحِكْمَةَ",
        transliteration: "Allahumma 'allimnal-kitaba wal-hikmah",
        transliterationBengali: "আল্লাহুম্মা আল্লিমনাল কিতাবা ওয়াল হিকমাহ",
        bengali: "হে আল্লাহ! আমাদের কিতাব ও হিকমত শেখান",
        english: "O Allah, teach us the Book and wisdom",
        reference: "সূরা আলে ইমরান ৩:১৬৪"
      },
      {
        id: "knowledge-39",
        titleBengali: "হাদীস শেখার দোয়া",
        titleEnglish: "For Learning Hadith",
        arabic: "اللَّهُمَّ ارْزُقْنِي حِفْظَ الْحَدِيثِ",
        transliteration: "Allahumma-rzuqni hifzal-hadith",
        transliterationBengali: "আল্লাহুম্মারযুকনি হিফযাল হাদীস",
        bengali: "হে আল্লাহ! আমাকে হাদীস মুখস্থ করার তাওফীক দিন",
        english: "O Allah, grant me the ability to memorize Hadith",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-40",
        titleBengali: "তাফসীর বোঝার দোয়া",
        titleEnglish: "For Understanding Tafsir",
        arabic: "اللَّهُمَّ فَهِّمْنِي تَفْسِيرَ كِتَابِكَ",
        transliteration: "Allahumma fahhimni tafsira kitabik",
        transliterationBengali: "আল্লাহুম্মা ফাহহিমনি তাফসীরা কিতাবিক",
        bengali: "হে আল্লাহ! আমাকে আপনার কিতাবের তাফসীর বুঝার তাওফীক দিন",
        english: "O Allah, grant me understanding of the interpretation of Your Book",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-41",
        titleBengali: "আরবী ভাষা শেখার দোয়া",
        titleEnglish: "For Learning Arabic",
        arabic: "اللَّهُمَّ عَلِّمْنِي اللُّغَةَ الْعَرَبِيَّةَ",
        transliteration: "Allahumma 'allimnillughat al-'arabiyyah",
        transliterationBengali: "আল্লাহুম্মা আল্লিমনিল লুগাতাল আরাবিয়্যাহ",
        bengali: "হে আল্লাহ! আমাকে আরবী ভাষা শেখান",
        english: "O Allah, teach me the Arabic language",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-42",
        titleBengali: "ফিকহ বোঝার দোয়া",
        titleEnglish: "For Understanding Fiqh",
        arabic: "اللَّهُمَّ فَقِّهْنِي فِي الدِّينِ وَعَلِّمْنِي التَّأْوِيلَ",
        transliteration: "Allahumma faqqihni fid-dini wa 'allimnit-ta'wil",
        transliterationBengali: "আল্লাহুম্মা ফাক্কিহনি ফিদ্দীনি ওয়া আল্লিমনিত তা'উইল",
        bengali: "হে আল্লাহ! আমাকে দ্বীনের ফিকহ ও ব্যাখ্যা শেখান",
        english: "O Allah, give me understanding in religion and teach me interpretation",
        reference: "সহীহ বুখারী, হাদিস নং ৭১"
      },
      {
        id: "knowledge-43",
        titleBengali: "আকীদা সংশোধনের দোয়া",
        titleEnglish: "For Correct Belief",
        arabic: "اللَّهُمَّ ثَبِّتْنِي عَلَى الْعَقِيدَةِ الصَّحِيحَةِ",
        transliteration: "Allahumma thabbitni 'alal-'aqidatis-sahihah",
        transliterationBengali: "আল্লাহুম্মা সাব্বিতনি আলাল আকীদাতিস সাহীহাহ",
        bengali: "হে আল্লাহ! আমাকে সঠিক আকীদায় দৃঢ় রাখুন",
        english: "O Allah, keep me firm upon the correct belief",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-44",
        titleBengali: "ইলমের বরকত লাভের দোয়া",
        titleEnglish: "For Blessings in Knowledge",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي عِلْمِي",
        transliteration: "Allahumma barik li fi 'ilmi",
        transliterationBengali: "আল্লাহুম্মা বারিক লি ফি ইলমি",
        bengali: "হে আল্লাহ! আমার জ্ঞানে বরকত দিন",
        english: "O Allah, bless me in my knowledge",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-45",
        titleBengali: "ইলম দিয়ে আমল করার দোয়া",
        titleEnglish: "For Acting Upon Knowledge",
        arabic: "اللَّهُمَّ ارْزُقْنِي الْعَمَلَ بِمَا عَلِمْتُ",
        transliteration: "Allahumma-rzuqnil-'amala bima 'alimt",
        transliterationBengali: "আল্লাহুম্মারযুকনিল আমালা বিমা আলিমত",
        bengali: "হে আল্লাহ! আমি যা শিখেছি সেই অনুযায়ী আমল করার তাওফীক দিন",
        english: "O Allah, grant me the ability to act upon what I have learned",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-46",
        titleBengali: "ইলম গোপন না রাখার দোয়া",
        titleEnglish: "For Sharing Knowledge",
        arabic: "اللَّهُمَّ اجْعَلْنِي مُعَلِّمًا لِلْخَيْرِ",
        transliteration: "Allahumma-j'alni mu'alliman lil-khayr",
        transliterationBengali: "আল্লাহুম্মাজ'আলনি মু'আল্লিমান লিল খাইর",
        bengali: "হে আল্লাহ! আমাকে কল্যাণের শিক্ষক বানান",
        english: "O Allah, make me a teacher of good",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "knowledge-47",
        titleBengali: "গবেষণার সফলতার দোয়া",
        titleEnglish: "For Research Success",
        arabic: "اللَّهُمَّ وَفِّقْنِي فِي بَحْثِي",
        transliteration: "Allahumma waffiqni fi bahsi",
        transliterationBengali: "আল্লাহুম্মা ওয়াফফিকনি ফি বাহসি",
        bengali: "হে আল্লাহ! আমার গবেষণায় সফলতা দিন",
        english: "O Allah, grant me success in my research",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-48",
        titleBengali: "ভালো ছাত্র হওয়ার দোয়া",
        titleEnglish: "For Being Good Student",
        arabic: "اللَّهُمَّ اجْعَلْنِي طَالِبَ عِلْمٍ صَادِقًا",
        transliteration: "Allahumma-j'alni taliba 'ilmin sadiqa",
        transliterationBengali: "আল্লাহুম্মাজ'আলনি তালিবা ইলমিন সাদিকা",
        bengali: "হে আল্লাহ! আমাকে সত্যনিষ্ঠ জ্ঞানার্থী বানান",
        english: "O Allah, make me a sincere student of knowledge",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-49",
        titleBengali: "ইলম থেকে বিচ্যুত না হওয়ার দোয়া",
        titleEnglish: "For Steadfastness in Knowledge",
        arabic: "اللَّهُمَّ لَا تَحْرِمْنِي مِنْ بَرَكَةِ الْعِلْمِ",
        transliteration: "Allahumma la tahrimni min barakatil-'ilm",
        transliterationBengali: "আল্লাহুম্মা লা তাহরিমনি মিন বারাকাতিল ইলম",
        bengali: "হে আল্লাহ! আমাকে জ্ঞানের বরকত থেকে বঞ্চিত করবেন না",
        english: "O Allah, do not deprive me of the blessings of knowledge",
        reference: "দোয়া সংকলন"
      },
      {
        id: "knowledge-50",
        titleBengali: "ইলমের মাধ্যমে জান্নাতের দোয়া",
        titleEnglish: "For Paradise Through Knowledge",
        arabic: "اللَّهُمَّ اجْعَلْ عِلْمِي حُجَّةً لِي لَا عَلَيَّ",
        transliteration: "Allahumma-j'al 'ilmi hujjatan li la 'alayya",
        transliterationBengali: "আল্লাহুম্মাজ'আল ইলমি হুজ্জাতান লি লা আলাইয়্যা",
        bengali: "হে আল্লাহ! আমার জ্ঞানকে আমার পক্ষে দলিল বানান, বিপক্ষে নয়",
        english: "O Allah, make my knowledge a proof for me, not against me",
        reference: "দোয়া সংকলন"
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
      },
      {
        id: "rizq-11",
        titleBengali: "প্রশস্ত রিজিকের দোয়া",
        titleEnglish: "For Abundant Provision",
        arabic: "اللَّهُمَّ أَوْسِعْ لِي فِي رِزْقِي",
        transliteration: "Allahumma awsi' li fi rizqi",
        transliterationBengali: "আল্লাহুম্মা আওসি' লি ফি রিযকি",
        bengali: "হে আল্লাহ! আমার রিজিক প্রশস্ত করে দিন",
        english: "O Allah, expand my provision",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-12",
        titleBengali: "ঋণ মুক্তির দোয়া",
        titleEnglish: "For Freedom from Debt",
        arabic: "اللَّهُمَّ اقْضِ عَنِّي الدَّيْنَ وَأَغْنِنِي مِنَ الْفَقْرِ",
        transliteration: "Allahumma-qdi 'annid-dayna wa aghnini minal-faqr",
        transliterationBengali: "আল্লাহুম্মাকদি আন্নিদ দাইনা ওয়া আগনিনি মিনাল ফাকর",
        bengali: "হে আল্লাহ! আমার ঋণ পরিশোধ করে দিন এবং আমাকে দারিদ্র্য থেকে মুক্ত করুন",
        english: "O Allah, settle my debt and free me from poverty",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "rizq-13",
        titleBengali: "ব্যবসায় বরকতের দোয়া",
        titleEnglish: "For Blessings in Business",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي تِجَارَتِي",
        transliteration: "Allahumma barik li fi tijarati",
        transliterationBengali: "আল্লাহুম্মা বারিক লি ফি তিজারাতি",
        bengali: "হে আল্লাহ! আমার ব্যবসায় বরকত দিন",
        english: "O Allah, bless my business",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-14",
        titleBengali: "চাকরিতে সফলতার দোয়া",
        titleEnglish: "For Success in Job",
        arabic: "اللَّهُمَّ وَفِّقْنِي فِي عَمَلِي",
        transliteration: "Allahumma waffiqni fi 'amali",
        transliterationBengali: "আল্লাহুম্মা ওয়াফফিকনি ফি আমালি",
        bengali: "হে আল্লাহ! আমার কাজে আমাকে সফল করুন",
        english: "O Allah, grant me success in my work",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-15",
        titleBengali: "হালাল রিজিকের দোয়া",
        titleEnglish: "For Halal Sustenance",
        arabic: "اللَّهُمَّ ارْزُقْنِي رِزْقًا حَلَالًا طَيِّبًا",
        transliteration: "Allahumma-rzuqni rizqan halalan tayyiba",
        transliterationBengali: "আল্লাহুম্মারযুকনি রিযকান হালালান তাইয়্যিবা",
        bengali: "হে আল্লাহ! আমাকে হালাল ও পবিত্র রিজিক দান করুন",
        english: "O Allah, grant me lawful and pure provision",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "rizq-16",
        titleBengali: "প্রাচুর্যের দোয়া",
        titleEnglish: "For Abundance",
        arabic: "اللَّهُمَّ أَكْثِرْ مَالِي وَوَلَدِي وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي",
        transliteration: "Allahumma akthir mali wa waladi wa barik li fima a'taytani",
        transliterationBengali: "আল্লাহুম্মা আকসির মালি ওয়া ওয়ালাদি ওয়া বারিক লি ফিমা আ'তাইতানি",
        bengali: "হে আল্লাহ! আমার সম্পদ ও সন্তান বাড়িয়ে দিন এবং আপনি যা দিয়েছেন তাতে বরকত দিন",
        english: "O Allah, increase my wealth and children and bless what You have given me",
        reference: "সহীহ বুখারী"
      },
      {
        id: "rizq-17",
        titleBengali: "সন্তুষ্টির দোয়া",
        titleEnglish: "For Contentment",
        arabic: "اللَّهُمَّ قَنِّعْنِي بِمَا رَزَقْتَنِي",
        transliteration: "Allahumma qanni'ni bima razaqtani",
        transliterationBengali: "আল্লাহুম্মা কান্নি'নি বিমা রাযাকতানি",
        bengali: "হে আল্লাহ! আপনি যা দিয়েছেন তাতে আমাকে সন্তুষ্ট করুন",
        english: "O Allah, make me content with what You have provided",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "rizq-18",
        titleBengali: "দারিদ্র্য থেকে আশ্রয়ের দোয়া",
        titleEnglish: "Protection from Poverty",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
        transliteration: "Allahumma inni a'udhu bika minal-faqr",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল ফাকর",
        bengali: "হে আল্লাহ! আমি দারিদ্র্য থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from poverty",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "rizq-19",
        titleBengali: "কৃপণতা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Miserliness",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ",
        transliteration: "Allahumma inni a'udhu bika minal-bukhl",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল বুখল",
        bengali: "হে আল্লাহ! আমি কৃপণতা থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from miserliness",
        reference: "সহীহ বুখারী"
      },
      {
        id: "rizq-20",
        titleBengali: "ঘরে বরকতের দোয়া",
        titleEnglish: "For Blessings at Home",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي بُيُوتِنَا",
        transliteration: "Allahumma barik lana fi buyutina",
        transliterationBengali: "আল্লাহুম্মা বারিক লানা ফি বুয়ুতিনা",
        bengali: "হে আল্লাহ! আমাদের ঘরে বরকত দিন",
        english: "O Allah, bless our homes",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-21",
        titleBengali: "খাদ্যে বরকতের দোয়া",
        titleEnglish: "For Blessings in Food",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي طَعَامِنَا",
        transliteration: "Allahumma barik lana fi ta'amina",
        transliterationBengali: "আল্লাহুম্মা বারিক লানা ফি তা'আমিনা",
        bengali: "হে আল্লাহ! আমাদের খাদ্যে বরকত দিন",
        english: "O Allah, bless our food",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "rizq-22",
        titleBengali: "পানিতে বরকতের দোয়া",
        titleEnglish: "For Blessings in Water",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي شَرَابِنَا",
        transliteration: "Allahumma barik lana fi sharabina",
        transliterationBengali: "আল্লাহুম্মা বারিক লানা ফি শারাবিনা",
        bengali: "হে আল্লাহ! আমাদের পানীয়তে বরকত দিন",
        english: "O Allah, bless our drinks",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-23",
        titleBengali: "রিজিকের দরজা খোলার দোয়া",
        titleEnglish: "For Opening Doors of Provision",
        arabic: "اللَّهُمَّ افْتَحْ لَنَا أَبْوَابَ رِزْقِكَ",
        transliteration: "Allahumma-ftah lana abwaba rizqik",
        transliterationBengali: "আল্লাহুম্মাফতাহ লানা আবওয়াবা রিযকিক",
        bengali: "হে আল্লাহ! আমাদের জন্য আপনার রিজিকের দরজাগুলো খুলে দিন",
        english: "O Allah, open for us the doors of Your provision",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-24",
        titleBengali: "উপার্জনে সহজতার দোয়া",
        titleEnglish: "For Ease in Earning",
        arabic: "اللَّهُمَّ يَسِّرْ لِي رِزْقِي",
        transliteration: "Allahumma yassir li rizqi",
        transliterationBengali: "আল্লাহুম্মা ইয়াসসির লি রিযকি",
        bengali: "হে আল্লাহ! আমার রিজিক সহজ করে দিন",
        english: "O Allah, make my provision easy",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-25",
        titleBengali: "সম্পদে বৃদ্ধির দোয়া",
        titleEnglish: "For Increase in Wealth",
        arabic: "رَبِّ زِدْنِي مَالًا وَعِلْمًا",
        transliteration: "Rabbi zidni malan wa 'ilma",
        transliterationBengali: "রাব্বি যিদনি মালান ওয়া ইলমা",
        bengali: "হে আমার রব! আমার সম্পদ ও জ্ঞান বাড়িয়ে দিন",
        english: "My Lord, increase me in wealth and knowledge",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-26",
        titleBengali: "স্বাবলম্বী হওয়ার দোয়া",
        titleEnglish: "For Self-Sufficiency",
        arabic: "اللَّهُمَّ أَغْنِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
        transliteration: "Allahumma aghnini bihalalika 'an haramik",
        transliterationBengali: "আল্লাহুম্মা আগনিনি বিহালালিকা আন হারামিক",
        bengali: "হে আল্লাহ! আপনার হালাল দিয়ে আমাকে হারাম থেকে মুক্ত করুন",
        english: "O Allah, make me self-sufficient with Your lawful against Your unlawful",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "rizq-27",
        titleBengali: "অন্যের মুখাপেক্ষী না হওয়ার দোয়া",
        titleEnglish: "For Independence from Others",
        arabic: "وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        transliteration: "Wa aghnini bifadlika 'amman siwak",
        transliterationBengali: "ওয়া আগনিনি বিফাদলিকা আম্মান সিওয়াক",
        bengali: "এবং আপনার অনুগ্রহে আমাকে অন্যদের থেকে মুক্ত রাখুন",
        english: "And make me independent of all besides You through Your bounty",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "rizq-28",
        titleBengali: "সকালে রিজিকের দোয়া",
        titleEnglish: "Morning Provision Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ وَرِزْقَهُ",
        transliteration: "Allahumma inni as'aluka khayra hadhal-yawmi wa rizqah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা খাইরা হাযাল ইয়াওমি ওয়া রিযকাহ",
        bengali: "হে আল্লাহ! আমি আজকের দিনের কল্যাণ ও রিজিক চাই",
        english: "O Allah, I ask You for the good and provision of this day",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "rizq-29",
        titleBengali: "বাজারে প্রবেশের দোয়া",
        titleEnglish: "Upon Entering Market",
        arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ",
        transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamd",
        transliterationBengali: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদ",
        bengali: "আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই, রাজত্ব তাঁরই এবং প্রশংসাও তাঁরই",
        english: "There is no deity except Allah alone with no partner. To Him belongs the dominion and praise",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "rizq-30",
        titleBengali: "কাজ শুরুর দোয়া",
        titleEnglish: "Before Starting Work",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Bismillahi tawakkaltu 'alallah",
        transliterationBengali: "বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহ",
        bengali: "আল্লাহর নামে শুরু করছি, আল্লাহর উপর ভরসা করছি",
        english: "In the name of Allah, I put my trust in Allah",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "rizq-31",
        titleBengali: "রিজিক বণ্টনে ভরসার দোয়া",
        titleEnglish: "Trust in Allah's Distribution",
        arabic: "اللَّهُمَّ إِنَّكَ خَيْرُ الرَّازِقِينَ",
        transliteration: "Allahumma innaka khayru-rraziqin",
        transliterationBengali: "আল্লাহুম্মা ইন্নাকা খাইরুর রাযিকীন",
        bengali: "হে আল্লাহ! নিশ্চয় আপনিই সর্বোত্তম রিজিকদাতা",
        english: "O Allah, indeed You are the Best of Providers",
        reference: "সূরা আল-জুমুআ ৬২:১১"
      },
      {
        id: "rizq-32",
        titleBengali: "সম্পদ রক্ষার দোয়া",
        titleEnglish: "For Protection of Wealth",
        arabic: "اللَّهُمَّ احْفَظْ مَالِي مِنَ الآفَاتِ",
        transliteration: "Allahumma-hfaz mali minal-afat",
        transliterationBengali: "আল্লাহুম্মাহফায মালি মিনাল আফাত",
        bengali: "হে আল্লাহ! আমার সম্পদকে বিপদ থেকে রক্ষা করুন",
        english: "O Allah, protect my wealth from calamities",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-33",
        titleBengali: "নিয়ামতের শুকরিয়া",
        titleEnglish: "For Gratitude of Blessings",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى شُكْرِ نِعْمَتِكَ",
        transliteration: "Allahumma a'inni 'ala shukri ni'matik",
        transliterationBengali: "আল্লাহুম্মা আইন্নি আলা শুকরি নি'মাতিক",
        bengali: "হে আল্লাহ! আপনার নিয়ামতের শুকরিয়া আদায়ে আমাকে সাহায্য করুন",
        english: "O Allah, help me to be grateful for Your blessings",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "rizq-34",
        titleBengali: "ফসলে বরকতের দোয়া",
        titleEnglish: "For Blessings in Crops",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي زَرْعِنَا",
        transliteration: "Allahumma barik lana fi zar'ina",
        transliterationBengali: "আল্লাহুম্মা বারিক লানা ফি যার'ইনা",
        bengali: "হে আল্লাহ! আমাদের ফসলে বরকত দিন",
        english: "O Allah, bless our crops",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-35",
        titleBengali: "গবাদি পশুতে বরকতের দোয়া",
        titleEnglish: "For Blessings in Livestock",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي مَوَاشِينَا",
        transliteration: "Allahumma barik lana fi mawashina",
        transliterationBengali: "আল্লাহুম্মা বারিক লানা ফি মাওয়াশিনা",
        bengali: "হে আল্লাহ! আমাদের গবাদি পশুতে বরকত দিন",
        english: "O Allah, bless our livestock",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-36",
        titleBengali: "অপচয় থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Waste",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الإِسْرَافِ",
        transliteration: "Allahumma inni a'udhu bika minal-israf",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল ইসরাফ",
        bengali: "হে আল্লাহ! আমি অপচয় থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from extravagance",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-37",
        titleBengali: "সঞ্চয়ে বরকতের দোয়া",
        titleEnglish: "For Blessings in Savings",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي مَا ادَّخَرْتُ",
        transliteration: "Allahumma barik li fi ma-ddakhart",
        transliterationBengali: "আল্লাহুম্মা বারিক লি ফি মাদ্দাখারত",
        bengali: "হে আল্লাহ! আমার সঞ্চয়ে বরকত দিন",
        english: "O Allah, bless what I have saved",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-38",
        titleBengali: "ভালো ক্রেতা পাওয়ার দোয়া",
        titleEnglish: "For Good Customers",
        arabic: "اللَّهُمَّ ارْزُقْنِي مُشْتَرِيًا صَادِقًا",
        transliteration: "Allahumma-rzuqni mushtariyan sadiqa",
        transliterationBengali: "আল্লাহুম্মারযুকনি মুশতারিয়ান সাদিকা",
        bengali: "হে আল্লাহ! আমাকে সৎ ক্রেতা দান করুন",
        english: "O Allah, grant me honest customers",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-39",
        titleBengali: "বেচাকেনায় সততার দোয়া",
        titleEnglish: "For Honesty in Trade",
        arabic: "اللَّهُمَّ اجْعَلْنِي تَاجِرًا صَدُوقًا",
        transliteration: "Allahumma-j'alni tajiran saduqa",
        transliterationBengali: "আল্লাহুম্মাজ'আলনি তাজিরান সাদূকা",
        bengali: "হে আল্লাহ! আমাকে সত্যবাদী ব্যবসায়ী বানান",
        english: "O Allah, make me a truthful trader",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "rizq-40",
        titleBengali: "প্রতারণা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Deception",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنَ الْغِشِّ",
        transliteration: "Allahumma-hfazni minal-ghish",
        transliterationBengali: "আল্লাহুম্মাহফাযনি মিনাল গিশ",
        bengali: "হে আল্লাহ! আমাকে প্রতারণা থেকে রক্ষা করুন",
        english: "O Allah, protect me from deception",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "rizq-41",
        titleBengali: "সুদ থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Usury",
        arabic: "اللَّهُمَّ جَنِّبْنِي الرِّبَا",
        transliteration: "Allahumma jannibni-rriba",
        transliterationBengali: "আল্লাহুম্মা জান্নিবনির রিবা",
        bengali: "হে আল্লাহ! আমাকে সুদ থেকে দূরে রাখুন",
        english: "O Allah, keep me away from usury",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-42",
        titleBengali: "হারাম থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Forbidden",
        arabic: "اللَّهُمَّ حَرِّمْ عَلَيَّ الْحَرَامَ",
        transliteration: "Allahumma harrim 'alayya-lharam",
        transliterationBengali: "আল্লাহুম্মা হাররিম আলাইয়্যাল হারাম",
        bengali: "হে আল্লাহ! হারামকে আমার উপর হারাম করে দিন",
        english: "O Allah, make forbidden things forbidden for me",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-43",
        titleBengali: "পরিবারের খরচ মেটানোর দোয়া",
        titleEnglish: "For Family Expenses",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى نَفَقَةِ أَهْلِي",
        transliteration: "Allahumma a'inni 'ala nafaqati ahli",
        transliterationBengali: "আল্লাহুম্মা আইন্নি আলা নাফাকাতি আহলি",
        bengali: "হে আল্লাহ! আমার পরিবারের খরচ মেটাতে আমাকে সাহায্য করুন",
        english: "O Allah, help me to provide for my family",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-44",
        titleBengali: "ঘরভাড়া মেটানোর দোয়া",
        titleEnglish: "For Paying Rent",
        arabic: "اللَّهُمَّ يَسِّرْ لِي أَدَاءَ حُقُوقِي",
        transliteration: "Allahumma yassir li ada'a huquqi",
        transliterationBengali: "আল্লাহুম্মা ইয়াসসির লি আদাআ হুকূকি",
        bengali: "হে আল্লাহ! আমার দায়িত্বগুলো পূরণ করা সহজ করুন",
        english: "O Allah, make it easy for me to fulfill my obligations",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-45",
        titleBengali: "নতুন চাকরির দোয়া",
        titleEnglish: "For New Job",
        arabic: "اللَّهُمَّ ارْزُقْنِي عَمَلًا صَالِحًا",
        transliteration: "Allahumma-rzuqni 'amalan saliha",
        transliterationBengali: "আল্লাহুম্মারযুকনি আমালান সালিহা",
        bengali: "হে আল্লাহ! আমাকে একটি ভালো কাজ দান করুন",
        english: "O Allah, grant me a good job",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-46",
        titleBengali: "প্রমোশনের দোয়া",
        titleEnglish: "For Promotion",
        arabic: "اللَّهُمَّ ارْفَعْ دَرَجَتِي فِي عَمَلِي",
        transliteration: "Allahumma-rfa' darajati fi 'amali",
        transliterationBengali: "আল্লাহুম্মারফা' দারাজাতি ফি আমালি",
        bengali: "হে আল্লাহ! আমার কাজে আমার মর্যাদা বাড়িয়ে দিন",
        english: "O Allah, elevate my rank in my work",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-47",
        titleBengali: "ভালো অংশীদার পাওয়ার দোয়া",
        titleEnglish: "For Good Business Partner",
        arabic: "اللَّهُمَّ ارْزُقْنِي شَرِيكًا صَالِحًا",
        transliteration: "Allahumma-rzuqni sharikan saliha",
        transliterationBengali: "আল্লাহুম্মারযুকনি শারীকান সালিহা",
        bengali: "হে আল্লাহ! আমাকে একজন ভালো ব্যবসায়িক অংশীদার দান করুন",
        english: "O Allah, grant me a righteous business partner",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-48",
        titleBengali: "বিনিয়োগে সফলতার দোয়া",
        titleEnglish: "For Success in Investment",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي اسْتِثْمَارِي",
        transliteration: "Allahumma barik li fi-stithmari",
        transliterationBengali: "আল্লাহুম্মা বারিক লি ফিস তিসমারি",
        bengali: "হে আল্লাহ! আমার বিনিয়োগে বরকত দিন",
        english: "O Allah, bless my investment",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-49",
        titleBengali: "ক্ষতি থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Loss",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنَ الْخَسَارَةِ",
        transliteration: "Allahumma-hfazni minal-khasarah",
        transliterationBengali: "আল্লাহুম্মাহফাযনি মিনাল খাসারাহ",
        bengali: "হে আল্লাহ! আমাকে ক্ষতি থেকে রক্ষা করুন",
        english: "O Allah, protect me from loss",
        reference: "দোয়া সংকলন"
      },
      {
        id: "rizq-50",
        titleBengali: "দুনিয়া ও আখিরাতে রিজিকের দোয়া",
        titleEnglish: "For Provision in Both Worlds",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanah",
        transliterationBengali: "রাব্বানা আতিনা ফিদ্দুনইয়া হাসানাতান ওয়া ফিল আখিরাতি হাসানাহ",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন",
        english: "Our Lord, give us good in this world and good in the Hereafter",
        reference: "সূরা আল-বাকারা ২:২০১"
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
      },
      {
        id: "health-11",
        titleBengali: "চোখের সুস্থতার দোয়া",
        titleEnglish: "For Eye Health",
        arabic: "اللَّهُمَّ مَتِّعْنِي بِسَمْعِي وَبَصَرِي",
        transliteration: "Allahumma matti'ni bisam'i wa basari",
        transliterationBengali: "আল্লাহুম্মা মাত্তি'নি বিসাম'ই ওয়া বাসারি",
        bengali: "হে আল্লাহ! আমাকে আমার শ্রবণ ও দৃষ্টিশক্তি দিয়ে উপকৃত করুন",
        english: "O Allah, let me benefit from my hearing and sight",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "health-12",
        titleBengali: "শরীরের সুস্থতার দোয়া",
        titleEnglish: "For Bodily Health",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي",
        transliteration: "Allahumma 'afini fi badani",
        transliterationBengali: "আল্লাহুম্মা আফিনি ফি বাদানি",
        bengali: "হে আল্লাহ! আমার শরীরে সুস্থতা দান করুন",
        english: "O Allah, grant me health in my body",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "health-13",
        titleBengali: "কানের সুস্থতার দোয়া",
        titleEnglish: "For Ear Health",
        arabic: "اللَّهُمَّ عَافِنِي فِي سَمْعِي",
        transliteration: "Allahumma 'afini fi sam'i",
        transliterationBengali: "আল্লাহুম্মা আফিনি ফি সাম'ই",
        bengali: "হে আল্লাহ! আমার শ্রবণশক্তিতে সুস্থতা দান করুন",
        english: "O Allah, grant me health in my hearing",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "health-14",
        titleBengali: "দৃষ্টিশক্তির দোয়া",
        titleEnglish: "For Vision",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَصَرِي",
        transliteration: "Allahumma 'afini fi basari",
        transliterationBengali: "আল্লাহুম্মা আফিনি ফি বাসারি",
        bengali: "হে আল্লাহ! আমার দৃষ্টিশক্তিতে সুস্থতা দান করুন",
        english: "O Allah, grant me health in my sight",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "health-15",
        titleBengali: "ব্যথা থেকে মুক্তির দোয়া",
        titleEnglish: "For Pain Relief",
        arabic: "بِسْمِ اللَّهِ أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        transliteration: "Bismillahi a'udhu bi'izzatillahi wa qudratihi min sharri ma ajidu wa uhadhir",
        transliterationBengali: "বিসমিল্লাহি আউযু বিইজ্জাতিল্লাহি ওয়া কুদরাতিহি মিন শাররি মা আজিদু ওয়া উহাযির",
        bengali: "আল্লাহর নামে, আমি আল্লাহর ইজ্জত ও কুদরতের আশ্রয় চাই যা আমি অনুভব করছি তার অনিষ্ট থেকে",
        english: "In the name of Allah, I seek refuge in Allah's might and power from the evil of what I feel and fear",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-16",
        titleBengali: "জ্বর থেকে মুক্তির দোয়া",
        titleEnglish: "For Fever Relief",
        arabic: "بِسْمِ اللَّهِ الْكَبِيرِ أَعُوذُ بِاللَّهِ الْعَظِيمِ مِنْ شَرِّ كُلِّ عِرْقٍ نَعَّارٍ",
        transliteration: "Bismillahil-kabir a'udhu billahil-'azim min sharri kulli 'irqin na'ar",
        transliterationBengali: "বিসমিল্লাহিল কাবীর আউযু বিল্লাহিল আযীম মিন শাররি কুল্লি ইরকিন না'আর",
        bengali: "মহান আল্লাহর নামে, আমি আল্লাহর আশ্রয় চাই প্রতিটি স্পন্দনশীল শিরার অনিষ্ট থেকে",
        english: "In the name of Allah the Great, I seek refuge in Allah from the evil of every pulsating vein",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "health-17",
        titleBengali: "মাথাব্যথার দোয়া",
        titleEnglish: "For Headache",
        arabic: "اللَّهُمَّ اشْفِنِي مِنَ الصُّدَاعِ",
        transliteration: "Allahumma-shfini minas-suda'",
        transliterationBengali: "আল্লাহুম্মাশফিনি মিনাস সুদা'",
        bengali: "হে আল্লাহ! আমাকে মাথাব্যথা থেকে সুস্থ করুন",
        english: "O Allah, cure me from headache",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-18",
        titleBengali: "পেটের অসুখের দোয়া",
        titleEnglish: "For Stomach Ailment",
        arabic: "اللَّهُمَّ اشْفِنِي مِنْ دَاءِ الْبَطْنِ",
        transliteration: "Allahumma-shfini min da'il-batn",
        transliterationBengali: "আল্লাহুম্মাশফিনি মিন দা'ইল বাতন",
        bengali: "হে আল্লাহ! আমাকে পেটের রোগ থেকে সুস্থ করুন",
        english: "O Allah, cure me from stomach disease",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-19",
        titleBengali: "হৃদরোগ থেকে রক্ষার দোয়া",
        titleEnglish: "For Heart Health",
        arabic: "اللَّهُمَّ اجْعَلْ قَلْبِي سَلِيمًا",
        transliteration: "Allahumma-j'al qalbi salima",
        transliterationBengali: "আল্লাহুম্মাজ'আল কালবি সালীমা",
        bengali: "হে আল্লাহ! আমার হৃদয়কে সুস্থ রাখুন",
        english: "O Allah, make my heart healthy",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-20",
        titleBengali: "ঘুমের সমস্যার দোয়া",
        titleEnglish: "For Sleep Problems",
        arabic: "اللَّهُمَّ ارْزُقْنِي نَوْمًا هَنِيئًا",
        transliteration: "Allahumma-rzuqni nawman hani'a",
        transliterationBengali: "আল্লাহুম্মারযুকনি নাওমান হানী'আ",
        bengali: "হে আল্লাহ! আমাকে প্রশান্তিময় ঘুম দান করুন",
        english: "O Allah, grant me peaceful sleep",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-21",
        titleBengali: "দীর্ঘ রোগ থেকে মুক্তির দোয়া",
        titleEnglish: "For Chronic Illness",
        arabic: "اللَّهُمَّ اشْفِ عَبْدَكَ يَنْكَأُ لَكَ عَدُوًّا أَوْ يَمْشِي لَكَ إِلَى صَلَاةٍ",
        transliteration: "Allahumma-shfi 'abdaka yanka'u laka 'aduwwan aw yamshi laka ila salah",
        transliterationBengali: "আল্লাহুম্মাশফি আবদাকা ইয়ানকাউ লাকা আদুওওয়ান আও ইয়ামশি লাকা ইলা সালাহ",
        bengali: "হে আল্লাহ! আপনার বান্দাকে সুস্থ করুন যে আপনার জন্য শত্রুকে প্রতিহত করবে বা সালাতে যাবে",
        english: "O Allah, heal Your servant who will fight Your enemy or walk to prayer for You",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "health-22",
        titleBengali: "অপারেশনের আগে দোয়া",
        titleEnglish: "Before Surgery",
        arabic: "اللَّهُمَّ سَهِّلْ عَلَيَّ وَاشْفِنِي",
        transliteration: "Allahumma sahhil 'alayya wa-shfini",
        transliterationBengali: "আল্লাহুম্মা সাহহিল আলাইয়্যা ওয়াশফিনি",
        bengali: "হে আল্লাহ! আমার জন্য সহজ করুন এবং আমাকে সুস্থ করুন",
        english: "O Allah, make it easy for me and heal me",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-23",
        titleBengali: "ওষুধ খাওয়ার সময় দোয়া",
        titleEnglish: "When Taking Medicine",
        arabic: "بِسْمِ اللَّهِ الشَّافِي",
        transliteration: "Bismillahish-shafi",
        transliterationBengali: "বিসমিল্লাহিশ শাফী",
        bengali: "সুস্থতা দানকারী আল্লাহর নামে",
        english: "In the name of Allah, the Healer",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-24",
        titleBengali: "ক্যান্সার থেকে আরোগ্যের দোয়া",
        titleEnglish: "For Cancer Recovery",
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ مُذْهِبَ الْبَأْسِ اشْفِ أَنْتَ الشَّافِي",
        transliteration: "Allahumma rabban-nasi mudhhibal-ba'si-shfi antash-shafi",
        transliterationBengali: "আল্লাহুম্মা রাব্বান নাসি মুযহিবাল বা'সিশফি আন্তাশ শাফী",
        bengali: "হে আল্লাহ! মানুষের রব, কষ্ট দূরকারী, সুস্থ করুন, আপনিই সুস্থকারী",
        english: "O Allah, Lord of mankind, remover of hardship, heal, You are the Healer",
        reference: "সহীহ বুখারী"
      },
      {
        id: "health-25",
        titleBengali: "ডায়াবেটিস নিয়ন্ত্রণের দোয়া",
        titleEnglish: "For Diabetes Control",
        arabic: "اللَّهُمَّ عَافِنِي مِنْ كُلِّ دَاءٍ",
        transliteration: "Allahumma 'afini min kulli da'",
        transliterationBengali: "আল্লাহুম্মা আফিনি মিন কুল্লি দা'",
        bengali: "হে আল্লাহ! আমাকে সব রোগ থেকে সুস্থ রাখুন",
        english: "O Allah, protect me from all diseases",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-26",
        titleBengali: "রক্তচাপ নিয়ন্ত্রণের দোয়া",
        titleEnglish: "For Blood Pressure",
        arabic: "اللَّهُمَّ اجْعَلْ جَسَدِي مُعْتَدِلًا",
        transliteration: "Allahumma-j'al jasadi mu'tadila",
        transliterationBengali: "আল্লাহুম্মাজ'আল জাসাদি মু'তাদিলা",
        bengali: "হে আল্লাহ! আমার শরীরকে সুষম রাখুন",
        english: "O Allah, make my body balanced",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-27",
        titleBengali: "অ্যালার্জি থেকে মুক্তির দোয়া",
        titleEnglish: "For Allergy Relief",
        arabic: "اللَّهُمَّ اكْفِنِي شَرَّ مَا خَلَقْتَ",
        transliteration: "Allahumma-kfini sharra ma khalaqt",
        transliterationBengali: "আল্লাহুম্মাকফিনি শাররা মা খালাকত",
        bengali: "হে আল্লাহ! আপনার সৃষ্টির অনিষ্ট থেকে আমাকে রক্ষা করুন",
        english: "O Allah, protect me from the harm of what You have created",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "health-28",
        titleBengali: "শ্বাসকষ্ট থেকে মুক্তির দোয়া",
        titleEnglish: "For Breathing Difficulty",
        arabic: "اللَّهُمَّ يَسِّرْ لِي نَفَسِي",
        transliteration: "Allahumma yassir li nafasi",
        transliterationBengali: "আল্লাহুম্মা ইয়াসসির লি নাফাসি",
        bengali: "হে আল্লাহ! আমার শ্বাস সহজ করুন",
        english: "O Allah, ease my breathing",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-29",
        titleBengali: "ত্বকের রোগের দোয়া",
        titleEnglish: "For Skin Disease",
        arabic: "اللَّهُمَّ اشْفِنِي مِنْ دَاءِ الْجِلْدِ",
        transliteration: "Allahumma-shfini min da'il-jild",
        transliterationBengali: "আল্লাহুম্মাশফিনি মিন দা'ইল জিলদ",
        bengali: "হে আল্লাহ! আমাকে ত্বকের রোগ থেকে সুস্থ করুন",
        english: "O Allah, cure me from skin disease",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-30",
        titleBengali: "হাড়ের সুস্থতার দোয়া",
        titleEnglish: "For Bone Health",
        arabic: "اللَّهُمَّ قَوِّ عِظَامِي",
        transliteration: "Allahumma qawwi 'izami",
        transliterationBengali: "আল্লাহুম্মা কাওউই ইযামি",
        bengali: "হে আল্লাহ! আমার হাড়গুলো মজবুত করুন",
        english: "O Allah, strengthen my bones",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-31",
        titleBengali: "পেশির শক্তির দোয়া",
        titleEnglish: "For Muscle Strength",
        arabic: "اللَّهُمَّ قَوِّ بَدَنِي",
        transliteration: "Allahumma qawwi badani",
        transliterationBengali: "আল্লাহুম্মা কাওউই বাদানি",
        bengali: "হে আল্লাহ! আমার শরীর শক্তিশালী করুন",
        english: "O Allah, strengthen my body",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-32",
        titleBengali: "দাঁতের সুস্থতার দোয়া",
        titleEnglish: "For Dental Health",
        arabic: "اللَّهُمَّ عَافِنِي فِي أَسْنَانِي",
        transliteration: "Allahumma 'afini fi asnani",
        transliterationBengali: "আল্লাহুম্মা আফিনি ফি আসনানি",
        bengali: "হে আল্লাহ! আমার দাঁতে সুস্থতা দান করুন",
        english: "O Allah, grant me health in my teeth",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-33",
        titleBengali: "কিডনির সুস্থতার দোয়া",
        titleEnglish: "For Kidney Health",
        arabic: "اللَّهُمَّ اشْفِ كُلْيَتَيَّ",
        transliteration: "Allahumma-shfi kulyatayya",
        transliterationBengali: "আল্লাহুম্মাশফি কুলইয়াতাইয়্যা",
        bengali: "হে আল্লাহ! আমার কিডনি সুস্থ করুন",
        english: "O Allah, heal my kidneys",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-34",
        titleBengali: "লিভারের সুস্থতার দোয়া",
        titleEnglish: "For Liver Health",
        arabic: "اللَّهُمَّ اشْفِ كَبِدِي",
        transliteration: "Allahumma-shfi kabidi",
        transliterationBengali: "আল্লাহুম্মাশফি কাবিদি",
        bengali: "হে আল্লাহ! আমার লিভার সুস্থ করুন",
        english: "O Allah, heal my liver",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-35",
        titleBengali: "স্নায়ুর সুস্থতার দোয়া",
        titleEnglish: "For Nerve Health",
        arabic: "اللَّهُمَّ اشْفِ أَعْصَابِي",
        transliteration: "Allahumma-shfi a'sabi",
        transliterationBengali: "আল্লাহুম্মাশফি আ'সাবি",
        bengali: "হে আল্লাহ! আমার স্নায়ু সুস্থ করুন",
        english: "O Allah, heal my nerves",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-36",
        titleBengali: "রোগ প্রতিরোধ ক্ষমতার দোয়া",
        titleEnglish: "For Immunity",
        arabic: "اللَّهُمَّ قَوِّ مَنَاعَتِي",
        transliteration: "Allahumma qawwi mana'ati",
        transliterationBengali: "আল্লাহুম্মা কাওউই মানাআতি",
        bengali: "হে আল্লাহ! আমার রোগ প্রতিরোধ ক্ষমতা বাড়িয়ে দিন",
        english: "O Allah, strengthen my immunity",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-37",
        titleBengali: "সংক্রমণ থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Infection",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنَ الْعَدْوَى",
        transliteration: "Allahumma-hfazni minal-'adwa",
        transliterationBengali: "আল্লাহুম্মাহফাযনি মিনাল আদওয়া",
        bengali: "হে আল্লাহ! আমাকে সংক্রমণ থেকে রক্ষা করুন",
        english: "O Allah, protect me from infection",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-38",
        titleBengali: "মহামারী থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Epidemic",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الطَّاعُونِ",
        transliteration: "Allahumma inni a'udhu bika minat-ta'un",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাত তা'উন",
        bengali: "হে আল্লাহ! আমি মহামারী থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from plague",
        reference: "সহীহ বুখারী"
      },
      {
        id: "health-39",
        titleBengali: "গর্ভবতী মায়ের দোয়া",
        titleEnglish: "For Pregnant Mother",
        arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
        transliteration: "Rabbi hab li minas-salihin",
        transliterationBengali: "রাব্বি হাব লি মিনাস সালিহীন",
        bengali: "হে আমার রব! আমাকে সৎকর্মশীল সন্তান দান করুন",
        english: "My Lord, grant me righteous offspring",
        reference: "সূরা আস-সাফফাত ৩৭:১০০"
      },
      {
        id: "health-40",
        titleBengali: "সুস্থ সন্তান প্রসবের দোয়া",
        titleEnglish: "For Safe Delivery",
        arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
        transliteration: "Rabbi la tadharnifardanwa anta khayrul-warithin",
        transliterationBengali: "রাব্বি লা তাযারনি ফারদান ওয়া আন্তা খাইরুল ওয়ারিসীন",
        bengali: "হে আমার রব! আমাকে সন্তানহীন রাখবেন না, আপনিই সর্বোত্তম উত্তরাধিকারী",
        english: "My Lord, do not leave me childless, and You are the Best of Inheritors",
        reference: "সূরা আল-আম্বিয়া ২১:৮৯"
      },
      {
        id: "health-41",
        titleBengali: "শিশুর সুস্থতার দোয়া",
        titleEnglish: "For Child's Health",
        arabic: "أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ",
        transliteration: "U'idhuka bikalimatillahit-tammati min kulli shaytanin wa hammah",
        transliterationBengali: "উঈযুকা বিকালিমাতিল্লাহিত তাম্মাতি মিন কুল্লি শাইতানিন ওয়া হাম্মাহ",
        bengali: "আল্লাহর পরিপূর্ণ কালামের দ্বারা তোমাকে আশ্রয় দিচ্ছি প্রতিটি শয়তান ও বিষাক্ত প্রাণী থেকে",
        english: "I seek protection for you with Allah's perfect words from every devil and poisonous creature",
        reference: "সহীহ বুখারী"
      },
      {
        id: "health-42",
        titleBengali: "বৃদ্ধ বয়সে সুস্থতার দোয়া",
        titleEnglish: "For Health in Old Age",
        arabic: "اللَّهُمَّ مَتِّعْنِي بِسَمْعِي وَبَصَرِي وَاجْعَلْهُمَا الْوَارِثَ مِنِّي",
        transliteration: "Allahumma matti'ni bisam'i wa basari waj'alhumal-waritha minni",
        transliterationBengali: "আল্লাহুম্মা মাত্তি'নি বিসাম'ই ওয়া বাসারি ওয়াজ'আলহুমাল ওয়ারিসা মিন্নি",
        bengali: "হে আল্লাহ! আমার শ্রবণ ও দৃষ্টি দিয়ে আমাকে উপকৃত করুন এবং মৃত্যু পর্যন্ত তা অটুট রাখুন",
        english: "O Allah, let me benefit from my hearing and sight and make them remain with me until I die",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "health-43",
        titleBengali: "পক্ষাঘাত থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Paralysis",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَالِجِ",
        transliteration: "Allahumma inni a'udhu bika minal-falij",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল ফালিজ",
        bengali: "হে আল্লাহ! আমি পক্ষাঘাত থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from paralysis",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-44",
        titleBengali: "অন্ধত্ব থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Blindness",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَمَى",
        transliteration: "Allahumma inni a'udhu bika minal-'ama",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল আমা",
        bengali: "হে আল্লাহ! আমি অন্ধত্ব থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from blindness",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-45",
        titleBengali: "বধিরতা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Deafness",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الصَّمَمِ",
        transliteration: "Allahumma inni a'udhu bika minas-samam",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাস সামাম",
        bengali: "হে আল্লাহ! আমি বধিরতা থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from deafness",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-46",
        titleBengali: "সুস্থ জীবনের দোয়া",
        titleEnglish: "For Healthy Life",
        arabic: "اللَّهُمَّ أَحْيِنِي مَا كَانَتِ الْحَيَاةُ خَيْرًا لِي",
        transliteration: "Allahumma ahyini ma kanatil-hayatu khayran li",
        transliterationBengali: "আল্লাহুম্মা আহয়িনি মা কানাতিল হায়াতু খাইরান লি",
        bengali: "হে আল্লাহ! যতদিন জীবন আমার জন্য কল্যাণকর ততদিন আমাকে বাঁচিয়ে রাখুন",
        english: "O Allah, keep me alive as long as life is good for me",
        reference: "সহীহ বুখারী"
      },
      {
        id: "health-47",
        titleBengali: "রোগ নিরাময়ে ধৈর্যের দোয়া",
        titleEnglish: "For Patience in Illness",
        arabic: "اللَّهُمَّ ارْزُقْنِي الصَّبْرَ عَلَى الْبَلَاءِ",
        transliteration: "Allahumma-rzuqnis-sabra 'alal-bala'",
        transliterationBengali: "আল্লাহুম্মারযুকনিস সাবরা আলাল বালা'",
        bengali: "হে আল্লাহ! বিপদে ধৈর্য ধারণ করার তাওফীক দিন",
        english: "O Allah, grant me patience during trials",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-48",
        titleBengali: "রোগে সওয়াব লাভের দোয়া",
        titleEnglish: "For Reward in Illness",
        arabic: "اللَّهُمَّ اجْعَلْ مَرَضِي كَفَّارَةً لِي",
        transliteration: "Allahumma-j'al maradi kaffaratan li",
        transliterationBengali: "আল্লাহুম্মাজ'আল মারাদি কাফফারাতান লি",
        bengali: "হে আল্লাহ! আমার রোগকে আমার গুনাহের কাফফারা বানান",
        english: "O Allah, make my illness an expiation for my sins",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "health-49",
        titleBengali: "দ্রুত সুস্থতার দোয়া",
        titleEnglish: "For Quick Recovery",
        arabic: "اللَّهُمَّ عَجِّلْ شِفَائِي",
        transliteration: "Allahumma 'ajjil shifa'i",
        transliterationBengali: "আল্লাহুম্মা আজ্জিল শিফা'ই",
        bengali: "হে আল্লাহ! আমার সুস্থতা দ্রুত করুন",
        english: "O Allah, hasten my recovery",
        reference: "দোয়া সংকলন"
      },
      {
        id: "health-50",
        titleBengali: "পূর্ণ সুস্থতার দোয়া",
        titleEnglish: "For Complete Healing",
        arabic: "اللَّهُمَّ اشْفِ شِفَاءً لَا يُغَادِرُ سَقَمًا",
        transliteration: "Allahumma-shfi shifa'an la yughadiru saqama",
        transliterationBengali: "আল্লাহুম্মাশফি শিফা'আন লা ইউগাদিরু সাকামা",
        bengali: "হে আল্লাহ! এমন সুস্থতা দান করুন যা কোনো রোগ অবশিষ্ট রাখে না",
        english: "O Allah, grant a healing that leaves no illness behind",
        reference: "সহীহ বুখারী"
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
      },
      {
        id: "stress-11",
        titleBengali: "মানসিক শান্তির দোয়া",
        titleEnglish: "For Mental Peace",
        arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا",
        transliteration: "Allahumma-j'al fi qalbi nura",
        transliterationBengali: "আল্লাহুম্মাজ'আল ফি কালবি নূরা",
        bengali: "হে আল্লাহ! আমার অন্তরে নূর দান করুন",
        english: "O Allah, place light in my heart",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "stress-12",
        titleBengali: "অস্থিরতা দূর করার দোয়া",
        titleEnglish: "For Removing Restlessness",
        arabic: "اللَّهُمَّ سَكِّنْ قَلْبِي",
        transliteration: "Allahumma sakkin qalbi",
        transliterationBengali: "আল্লাহুম্মা সাক্কিন কালবি",
        bengali: "হে আল্লাহ! আমার অন্তরকে শান্ত করুন",
        english: "O Allah, calm my heart",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-13",
        titleBengali: "ভয় দূর করার দোয়া",
        titleEnglish: "For Removing Fear",
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ",
        transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu",
        transliterationBengali: "হাসবিয়াল্লাহু লা ইলাহা ইল্লা হুওয়া আলাইহি তাওয়াক্কালতু",
        bengali: "আল্লাহই আমার জন্য যথেষ্ট, তিনি ছাড়া কোনো ইলাহ নেই, তাঁর উপরই আমি ভরসা করি",
        english: "Allah is sufficient for me, there is no deity except Him, upon Him I rely",
        reference: "সূরা তাওবা ৯:১২৯"
      },
      {
        id: "stress-14",
        titleBengali: "হতাশা থেকে মুক্তির দোয়া",
        titleEnglish: "For Relief from Despair",
        arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
        transliteration: "La taqnatu min rahmatillah",
        transliterationBengali: "লা তাকনাতু মিন রাহমাতিল্লাহ",
        bengali: "আল্লাহর রহমত থেকে নিরাশ হয়ো না",
        english: "Do not despair of the mercy of Allah",
        reference: "সূরা আয-যুমার ৩৯:৫৩"
      },
      {
        id: "stress-15",
        titleBengali: "অশান্তি থেকে আশ্রয়ের দোয়া",
        titleEnglish: "Refuge from Unrest",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْقَلَقِ",
        transliteration: "Allahumma inni a'udhu bika minal-qalaq",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল কালাক",
        bengali: "হে আল্লাহ! আমি অশান্তি থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from anxiety",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-16",
        titleBengali: "রাগ নিয়ন্ত্রণের দোয়া",
        titleEnglish: "For Anger Control",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaytanir-rajim",
        transliterationBengali: "আউযু বিল্লাহি মিনাশ শাইতানির রাজীম",
        bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই",
        english: "I seek refuge in Allah from the accursed Satan",
        reference: "সহীহ বুখারী"
      },
      {
        id: "stress-17",
        titleBengali: "চাপ কমানোর দোয়া",
        titleEnglish: "For Reducing Pressure",
        arabic: "اللَّهُمَّ خَفِّفْ عَنِّي",
        transliteration: "Allahumma khaffif 'anni",
        transliterationBengali: "আল্লাহুম্মা খাফফিফ আন্নি",
        bengali: "হে আল্লাহ! আমার বোঝা হালকা করুন",
        english: "O Allah, lighten my burden",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-18",
        titleBengali: "কান্নার সময় দোয়া",
        titleEnglish: "When Crying",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
        transliteration: "Inna lillahi wa inna ilayhi raji'un",
        transliterationBengali: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন",
        bengali: "নিশ্চয় আমরা আল্লাহর এবং তাঁর কাছেই আমরা ফিরে যাব",
        english: "Indeed, we belong to Allah and to Him we shall return",
        reference: "সূরা আল-বাকারা ২:১৫৬"
      },
      {
        id: "stress-19",
        titleBengali: "একাকীত্বে দোয়া",
        titleEnglish: "For Loneliness",
        arabic: "اللَّهُمَّ أَنْتَ جَلِيسِي فِي وَحْدَتِي",
        transliteration: "Allahumma anta jalisi fi wahdati",
        transliterationBengali: "আল্লাহুম্মা আন্তা জালীসি ফি ওয়াহদাতি",
        bengali: "হে আল্লাহ! আপনিই আমার একাকীত্বের সঙ্গী",
        english: "O Allah, You are my companion in my loneliness",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-20",
        titleBengali: "নিরাশা দূর করার দোয়া",
        titleEnglish: "For Removing Hopelessness",
        arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
        transliteration: "Wa la tay'asu min rawhillah",
        transliterationBengali: "ওয়ালা তাইআসু মিন রাওহিল্লাহ",
        bengali: "আল্লাহর রহমত থেকে নিরাশ হয়ো না",
        english: "Do not despair of relief from Allah",
        reference: "সূরা ইউসুফ ১২:৮৭"
      },
      {
        id: "stress-21",
        titleBengali: "কষ্টের সময় দোয়া",
        titleEnglish: "During Hardship",
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        transliteration: "Inna ma'al-'usri yusra",
        transliterationBengali: "ইন্না মাআল উসরি ইউসরা",
        bengali: "নিশ্চয় কষ্টের সাথে সুখ আছে",
        english: "Indeed, with hardship comes ease",
        reference: "সূরা আশ-শারহ ৯৪:৬"
      },
      {
        id: "stress-22",
        titleBengali: "সবর ধারণের দোয়া",
        titleEnglish: "For Patience",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
        transliteration: "Rabbana afrigh 'alayna sabra",
        transliterationBengali: "রাব্বানা আফরিগ আলাইনা সাবরা",
        bengali: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দিন",
        english: "Our Lord, pour upon us patience",
        reference: "সূরা আল-বাকারা ২:২৫০"
      },
      {
        id: "stress-23",
        titleBengali: "মন খারাপের সময় দোয়া",
        titleEnglish: "When Feeling Down",
        arabic: "اللَّهُمَّ فَرِّجْ هَمِّي",
        transliteration: "Allahumma farrij hammi",
        transliterationBengali: "আল্লাহুম্মা ফাররিজ হাম্মি",
        bengali: "হে আল্লাহ! আমার দুশ্চিন্তা দূর করুন",
        english: "O Allah, relieve my worry",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-24",
        titleBengali: "দুঃখ কমানোর দোয়া",
        titleEnglish: "For Reducing Sadness",
        arabic: "اللَّهُمَّ أَذْهِبْ حُزْنِي",
        transliteration: "Allahumma adhhib huzni",
        transliterationBengali: "আল্লাহুম্মা আজহিব হুযনি",
        bengali: "হে আল্লাহ! আমার দুঃখ দূর করুন",
        english: "O Allah, remove my sadness",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-25",
        titleBengali: "প্যানিক অ্যাটাকের সময় দোয়া",
        titleEnglish: "During Panic Attack",
        arabic: "لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        transliterationBengali: "লা ইলাহা ইল্লা আন্তা সুবহানাকা ইন্নি কুনতু মিনায যালিমীন",
        bengali: "আপনি ছাড়া কোনো ইলাহ নেই, আপনি পবিত্র, নিশ্চয় আমি যালিমদের অন্তর্ভুক্ত ছিলাম",
        english: "There is no deity except You, exalted are You, indeed I have been of the wrongdoers",
        reference: "সূরা আল-আম্বিয়া ২১:৮৭"
      },
      {
        id: "stress-26",
        titleBengali: "অতিরিক্ত চিন্তার সময় দোয়া",
        titleEnglish: "For Overthinking",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
        transliteration: "Allahumma-kfini bihalalika 'an haramik",
        transliterationBengali: "আল্লাহুম্মাকফিনি বিহালালিকা আন হারামিক",
        bengali: "হে আল্লাহ! আপনার হালাল দিয়ে হারাম থেকে আমাকে বাঁচান",
        english: "O Allah, suffice me with Your lawful against Your prohibited",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "stress-27",
        titleBengali: "মনোবল বাড়ানোর দোয়া",
        titleEnglish: "For Boosting Morale",
        arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ",
        transliteration: "Wa la tahinu wa la tahzanu wa antumul-a'lawna",
        transliterationBengali: "ওয়ালা তাহিনু ওয়ালা তাহযানু ওয়া আন্তুমুল আ'লাউন",
        bengali: "তোমরা দুর্বল হয়ো না এবং দুঃখ করো না, তোমরাই বিজয়ী",
        english: "Do not weaken and do not grieve, and you will be superior",
        reference: "সূরা আলে ইমরান ৩:১৩৯"
      },
      {
        id: "stress-28",
        titleBengali: "শক্তি চাওয়ার দোয়া",
        titleEnglish: "For Strength",
        arabic: "رَبِّ زِدْنِي قُوَّةً",
        transliteration: "Rabbi zidni quwwah",
        transliterationBengali: "রাব্বি যিদনি কুওওয়াহ",
        bengali: "হে আমার রব! আমার শক্তি বাড়িয়ে দিন",
        english: "My Lord, increase me in strength",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-29",
        titleBengali: "সাহস চাওয়ার দোয়া",
        titleEnglish: "For Courage",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ",
        transliteration: "Allahumma inni a'udhu bika minal-jubn",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল জুবন",
        bengali: "হে আল্লাহ! আমি কাপুরুষতা থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from cowardice",
        reference: "সহীহ বুখারী"
      },
      {
        id: "stress-30",
        titleBengali: "আত্মবিশ্বাস বাড়ানোর দোয়া",
        titleEnglish: "For Self-Confidence",
        arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        transliteration: "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada",
        transliterationBengali: "রাব্বানা আতিনা মিন লাদুনকা রাহমাতান ওয়া হাইয়ি' লানা মিন আমরিনা রাশাদা",
        bengali: "হে আমাদের রব! আপনার পক্ষ থেকে রহমত দিন এবং আমাদের কাজ সঠিক পথে পরিচালিত করুন",
        english: "Our Lord, grant us mercy from Yourself and facilitate for us right guidance",
        reference: "সূরা আল-কাহফ ১৮:১০"
      },
      {
        id: "stress-31",
        titleBengali: "নেতিবাচক চিন্তা দূর করার দোয়া",
        titleEnglish: "For Removing Negative Thoughts",
        arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ",
        transliteration: "Allahumma tahhir qalbi minan-nifaq",
        transliterationBengali: "আল্লাহুম্মা তাহহির কালবি মিনান নিফাক",
        bengali: "হে আল্লাহ! আমার অন্তরকে মুনাফিকি থেকে পবিত্র করুন",
        english: "O Allah, purify my heart from hypocrisy",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-32",
        titleBengali: "শয়তানের কুমন্ত্রণা থেকে আশ্রয়",
        titleEnglish: "Refuge from Whispers",
        arabic: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ",
        transliteration: "Rabbi a'udhu bika min hamazatish-shayatin",
        transliterationBengali: "রাব্বি আউযু বিকা মিন হামাযাতিশ শায়াতীন",
        bengali: "হে আমার রব! শয়তানের কুমন্ত্রণা থেকে আপনার আশ্রয় চাই",
        english: "My Lord, I seek refuge in You from the incitements of devils",
        reference: "সূরা আল-মুমিনুন ২৩:৯৭"
      },
      {
        id: "stress-33",
        titleBengali: "অসওয়াস থেকে আশ্রয়ের দোয়া",
        titleEnglish: "Refuge from Obsessive Thoughts",
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration: "Qul a'udhu birabbinnas",
        transliterationBengali: "কুল আউযু বিরাব্বিন নাস",
        bengali: "বলুন, আমি মানুষের রবের আশ্রয় নিচ্ছি",
        english: "Say, I seek refuge in the Lord of mankind",
        reference: "সূরা আন-নাস ১১৪:১"
      },
      {
        id: "stress-34",
        titleBengali: "মানসিক চাপে দোয়া",
        titleEnglish: "Under Mental Stress",
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahla",
        transliterationBengali: "আল্লাহুম্মা লা সাহলা ইল্লা মা জা'আলতাহু সাহলা",
        bengali: "হে আল্লাহ! আপনি সহজ না করলে কিছুই সহজ নয়",
        english: "O Allah, nothing is easy except what You make easy",
        reference: "ইবন হিব্বান"
      },
      {
        id: "stress-35",
        titleBengali: "কঠিন কাজে দোয়া",
        titleEnglish: "For Difficult Tasks",
        arabic: "وَأَنتَ إِن شِئْتَ جَعَلْتَ الْحَزْنَ سَهْلًا",
        transliteration: "Wa anta in shi'ta ja'altal-hazna sahla",
        transliterationBengali: "ওয়া আন্তা ইন শি'তা জাআলতাল হাযনা সাহলা",
        bengali: "আপনি চাইলে দুঃখকেও সহজ করতে পারেন",
        english: "And You, if You will, can make grief easy",
        reference: "ইবন হিব্বান"
      },
      {
        id: "stress-36",
        titleBengali: "বিষণ্নতা থেকে মুক্তির দোয়া",
        titleEnglish: "For Relief from Depression",
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        transliteration: "Allahumma rahmataka arju fala takilni ila nafsi tarfata 'ayn",
        transliterationBengali: "আল্লাহুম্মা রাহমাতাকা আরজু ফালা তাকিলনি ইলা নাফসি তারফাতা আইন",
        bengali: "হে আল্লাহ! আমি আপনার রহমতের আশা করি, এক মুহূর্তের জন্যও আমাকে নিজের উপর ছেড়ে দেবেন না",
        english: "O Allah, I hope for Your mercy, do not leave me to myself even for the blink of an eye",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "stress-37",
        titleBengali: "আল্লাহর সাহায্য চাওয়ার দোয়া",
        titleEnglish: "Seeking Allah's Help",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        transliteration: "Ya Hayyu ya Qayyumu birahmatika astaghith",
        transliterationBengali: "ইয়া হাইয়ু ইয়া কাইয়্যুমু বিরাহমাতিকা আস্তাগীস",
        bengali: "হে চিরঞ্জীব! হে সর্বসত্তার ধারক! আপনার রহমতের দ্বারা সাহায্য চাই",
        english: "O Ever-Living, O Sustainer, through Your mercy I seek help",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "stress-38",
        titleBengali: "দুঃস্বপ্ন দেখলে দোয়া",
        titleEnglish: "After Nightmare",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ",
        transliteration: "A'udhu bikalimatillahit-tammati min ghadabihi wa 'iqabih",
        transliterationBengali: "আউযু বিকালিমাতিল্লাহিত তাম্মাতি মিন গাদাবিহি ওয়া ইকাবিহ",
        bengali: "আল্লাহর পরিপূর্ণ কালামের দ্বারা তাঁর ক্রোধ ও শাস্তি থেকে আশ্রয় চাই",
        english: "I seek refuge in Allah's perfect words from His anger and punishment",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "stress-39",
        titleBengali: "ভবিষ্যত নিয়ে উদ্বেগে দোয়া",
        titleEnglish: "For Future Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَسْأَلَةِ",
        transliteration: "Allahumma inni as'aluka khayral-mas'alah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকা খাইরাল মাসআলাহ",
        bengali: "হে আল্লাহ! আমি আপনার কাছে উত্তম প্রার্থনা চাই",
        english: "O Allah, I ask You for the best of requests",
        reference: "মুস্তাদরাক হাকিম"
      },
      {
        id: "stress-40",
        titleBengali: "অতীত নিয়ে অনুশোচনায় দোয়া",
        titleEnglish: "For Past Regrets",
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ",
        transliteration: "Allahumma-ghfir li dhanbi kullah",
        transliterationBengali: "আল্লাহুম্মাগফির লি যানবি কুল্লাহু",
        bengali: "হে আল্লাহ! আমার সব গুনাহ ক্ষমা করুন",
        english: "O Allah, forgive all my sins",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "stress-41",
        titleBengali: "সম্পর্কের টানাপোড়েনে দোয়া",
        titleEnglish: "For Relationship Stress",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا",
        transliteration: "Allahumma allif bayna qulubina",
        transliterationBengali: "আল্লাহুম্মা আল্লিফ বাইনা কুলুবিনা",
        bengali: "হে আল্লাহ! আমাদের অন্তরগুলোর মধ্যে মিল করে দিন",
        english: "O Allah, unite our hearts",
        reference: "সূরা আল-আনফাল ৮:৬৩"
      },
      {
        id: "stress-42",
        titleBengali: "পরীক্ষার আগে উদ্বেগে দোয়া",
        titleEnglish: "For Exam Anxiety",
        arabic: "رَبِّ يَسِّرْ وَلَا تُعَسِّرْ",
        transliteration: "Rabbi yassir wa la tu'assir",
        transliterationBengali: "রাব্বি ইয়াসসির ওয়ালা তুআসসির",
        bengali: "হে আমার রব! সহজ করুন, কঠিন করবেন না",
        english: "My Lord, make it easy and do not make it difficult",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-43",
        titleBengali: "আর্থিক দুশ্চিন্তায় দোয়া",
        titleEnglish: "For Financial Worry",
        arabic: "اللَّهُمَّ اقْضِ عَنَّا الدَّيْنَ",
        transliteration: "Allahumma-qdi 'annad-dayn",
        transliterationBengali: "আল্লাহুম্মাকদি আন্নাদ দাইন",
        bengali: "হে আল্লাহ! আমাদের ঋণ পরিশোধ করে দিন",
        english: "O Allah, settle our debts",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "stress-44",
        titleBengali: "কাজের চাপে দোয়া",
        titleEnglish: "For Work Pressure",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي وَقْتِي",
        transliteration: "Allahumma barik li fi waqti",
        transliterationBengali: "আল্লাহুম্মা বারিক লি ফি ওয়াকতি",
        bengali: "হে আল্লাহ! আমার সময়ে বরকত দিন",
        english: "O Allah, bless my time",
        reference: "দোয়া সংকলন"
      },
      {
        id: "stress-45",
        titleBengali: "সিদ্ধান্তের দ্বিধায় দোয়া",
        titleEnglish: "For Decision Making",
        arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
        transliteration: "Allahumma khir li wa-khtar li",
        transliterationBengali: "আল্লাহুম্মা খির লি ওয়াখতার লি",
        bengali: "হে আল্লাহ! আমার জন্য ভালোটা বেছে নিন",
        english: "O Allah, choose for me and select for me",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "stress-46",
        titleBengali: "মানুষের কাছে অপমানিত হলে দোয়া",
        titleEnglish: "When Humiliated",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَهْرِ الرِّجَالِ",
        transliteration: "Allahumma inni a'udhu bika min qahrir-rijal",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিন কাহরির রিজাল",
        bengali: "হে আল্লাহ! মানুষের অপমান থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from being overpowered by people",
        reference: "সহীহ বুখারী"
      },
      {
        id: "stress-47",
        titleBengali: "হিংসা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Envy",
        arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration: "Wa min sharri hasidin idha hasad",
        transliterationBengali: "ওয়া মিন শাররি হাসিদিন ইযা হাসাদ",
        bengali: "হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে",
        english: "And from the evil of the envier when he envies",
        reference: "সূরা আল-ফালাক ১১৩:৫"
      },
      {
        id: "stress-48",
        titleBengali: "অবসাদ দূর করার দোয়া",
        titleEnglish: "For Removing Fatigue",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ",
        transliteration: "Allahumma inni a'udhu bika minal-kasal",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আউযু বিকা মিনাল কাসাল",
        bengali: "হে আল্লাহ! আমি অলসতা থেকে আপনার আশ্রয় চাই",
        english: "O Allah, I seek refuge in You from laziness",
        reference: "সহীহ বুখারী"
      },
      {
        id: "stress-49",
        titleBengali: "মনকে শক্তিশালী করার দোয়া",
        titleEnglish: "For Strengthening Mind",
        arabic: "اللَّهُمَّ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        transliteration: "Allahumma thabbit qalbi 'ala dinik",
        transliterationBengali: "আল্লাহুম্মা সাব্বিত কালবি আলা দীনিক",
        bengali: "হে আল্লাহ! আমার অন্তরকে আপনার দ্বীনের উপর দৃঢ় রাখুন",
        english: "O Allah, make my heart firm upon Your religion",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "stress-50",
        titleBengali: "সার্বিক সুখ-শান্তির দোয়া",
        titleEnglish: "For Overall Well-being",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah",
        transliterationBengali: "আল্লাহুম্মা ইন্নি আসআলুকাল আফওয়া ওয়াল আফিয়াতা ফিদ্দুনইয়া ওয়াল আখিরাহ",
        bengali: "হে আল্লাহ! আমি দুনিয়া ও আখিরাতে আপনার ক্ষমা ও নিরাপত্তা চাই",
        english: "O Allah, I ask You for pardon and well-being in this world and the Hereafter",
        reference: "সুনান ইবন মাজাহ"
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
      },
      {
        id: "work-11",
        titleBengali: "প্রকল্প শুরুর দোয়া",
        titleEnglish: "Starting New Project",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
        bengali: "হে আমার রব! আমাকে সত্যের সাথে প্রবেশ করাও এবং সত্যের সাথে বের কর, আর তোমার পক্ষ থেকে আমাকে সাহায্যকারী শক্তি দান কর।",
        english: "My Lord, cause me to enter a sound entrance and to exit a sound exit and grant me from Yourself a supporting authority.",
        reference: "সূরা ইসরা ১৭:৮০"
      },
      {
        id: "work-12",
        titleBengali: "কর্মক্ষমতা বৃদ্ধির দোয়া",
        titleEnglish: "For Productivity",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে অক্ষমতা ও আলস্য থেকে পানাহ চাই।",
        english: "O Allah, I seek refuge in You from inability and laziness.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "work-13",
        titleBengali: "নেতৃত্বের জন্য দোয়া",
        titleEnglish: "For Leadership",
        arabic: "رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        bengali: "হে আমার রব! আমাকে প্রজ্ঞা দান কর এবং আমাকে সৎকর্মশীলদের অন্তর্ভুক্ত কর।",
        english: "My Lord, grant me authority and join me with the righteous.",
        reference: "সূরা শুআরা ২৬:৮৩"
      },
      {
        id: "work-14",
        titleBengali: "কর্মস্থলে নিরাপত্তার দোয়া",
        titleEnglish: "For Workplace Safety",
        arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي",
        bengali: "হে আল্লাহ! আমাকে আমার সামনে, পেছনে, ডানে এবং বামে থেকে হেফাজত কর।",
        english: "O Allah, protect me from in front of me, from behind me, from my right, and from my left.",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৪"
      },
      {
        id: "work-15",
        titleBengali: "প্রতিযোগিতায় সফলতার দোয়া",
        titleEnglish: "For Competition Success",
        arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً",
        bengali: "হে আল্লাহ! কোন কাজ সহজ নয় যতক্ষণ না তুমি তা সহজ কর।",
        english: "O Allah, nothing is easy except what You make easy.",
        reference: "ইবনে হিব্বান, হাদিস নং ৯৭৪"
      },
      {
        id: "work-16",
        titleBengali: "বেতন বৃদ্ধির দোয়া",
        titleEnglish: "For Salary Increase",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        bengali: "হে আল্লাহ! তোমার হালাল দিয়ে হারাম থেকে আমাকে বাঁচাও এবং তোমার অনুগ্রহে তোমা ছাড়া অন্য সবার থেকে অমুখাপেক্ষী কর।",
        english: "O Allah, suffice me with Your lawful against Your prohibited and enrich me by Your bounty from others.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৬৩"
      },
      {
        id: "work-17",
        titleBengali: "নতুন চাকরির জন্য দোয়া",
        titleEnglish: "For New Job",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        bengali: "হে আল্লাহ! আমি তোমার অনুগ্রহ প্রার্থনা করি।",
        english: "O Allah, I ask You from Your bounty.",
        reference: "সূরা নিসা ৪:৩২"
      },
      {
        id: "work-18",
        titleBengali: "দক্ষতা বৃদ্ধির দোয়া",
        titleEnglish: "For Skill Development",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বাড়িয়ে দাও।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "work-19",
        titleBengali: "টিমওয়ার্কের দোয়া",
        titleEnglish: "For Teamwork",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর।",
        english: "O Allah, bring love between our hearts.",
        reference: "সূরা আনফাল ৮:৬৩"
      },
      {
        id: "work-20",
        titleBengali: "ন্যায়বিচারের দোয়া",
        titleEnglish: "For Fair Treatment",
        arabic: "رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنتَ خَيْرُ الْفَاتِحِينَ",
        bengali: "হে আমাদের রব! আমাদের ও আমাদের কওমের মধ্যে সত্যের ভিত্তিতে ফয়সালা করে দাও, তুমি উত্তম ফয়সালাকারী।",
        english: "Our Lord, decide between us and our people in truth, and You are the best of those who give decision.",
        reference: "সূরা আ'রাফ ৭:৮৯"
      },
      {
        id: "work-21",
        titleBengali: "ব্যবসায়িক চুক্তির দোয়া",
        titleEnglish: "For Business Deals",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا",
        bengali: "হে আল্লাহ! তুমি আমাদের যা দিয়েছ তাতে বরকত দাও।",
        english: "O Allah, bless us in what You have provided for us.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৫৫"
      },
      {
        id: "work-22",
        titleBengali: "সৃজনশীলতার দোয়া",
        titleEnglish: "For Creativity",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও।",
        english: "My Lord, expand for me my chest.",
        reference: "সূরা ত্বহা ২০:২৫"
      },
      {
        id: "work-23",
        titleBengali: "সময় ব্যবস্থাপনার দোয়া",
        titleEnglish: "For Time Management",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي أَوْقَاتِنَا",
        bengali: "হে আল্লাহ! আমাদের সময়ে বরকত দাও।",
        english: "O Allah, bless our time.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "work-24",
        titleBengali: "প্রেজেন্টেশনের দোয়া",
        titleEnglish: "For Presentations",
        arabic: "وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
        bengali: "এবং আমার জিহ্বার জড়তা দূর কর, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "And untie the knot from my tongue that they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৭-২৮"
      },
      {
        id: "work-25",
        titleBengali: "ক্লায়েন্ট সন্তুষ্টির দোয়া",
        titleEnglish: "For Client Satisfaction",
        arabic: "اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ",
        bengali: "হে আল্লাহ! সত্যকে সত্য হিসেবে দেখাও এবং তা অনুসরণের তাওফিক দাও।",
        english: "O Allah, show us the truth as truth and grant us to follow it.",
        reference: "ইমাম নববী, আল-আযকার"
      },
      {
        id: "work-26",
        titleBengali: "অফিস পলিটিক্স থেকে সুরক্ষা",
        titleEnglish: "Protection from Office Politics",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ",
        bengali: "হে আল্লাহ! আমি যা করেছি তার অনিষ্ট থেকে এবং যা করিনি তার অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the evil of what I have done and from the evil of what I have not done.",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭১৬"
      },
      {
        id: "work-27",
        titleBengali: "বস এর সাথে সম্পর্ক",
        titleEnglish: "For Good Relationship with Boss",
        arabic: "اللَّهُمَّ حَبِّبْنِي إِلَى خَلْقِكَ",
        bengali: "হে আল্লাহ! তোমার সৃষ্টির কাছে আমাকে প্রিয় করে দাও।",
        english: "O Allah, make me beloved to Your creation.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "work-28",
        titleBengali: "কাজের মানসিক চাপ দূরীকরণ",
        titleEnglish: "For Work Stress Relief",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        bengali: "হে আল্লাহ! আমি দুশ্চিন্তা ও দুঃখ থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from anxiety and sorrow.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৬৯"
      },
      {
        id: "work-29",
        titleBengali: "ফ্রিল্যান্সিং সফলতা",
        titleEnglish: "For Freelancing Success",
        arabic: "وَقُل رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ",
        bengali: "এবং বল, হে আমার রব! আমাকে বরকতময় স্থানে অবতরণ করাও এবং তুমি সর্বোত্তম অবতরণকারী।",
        english: "And say, 'My Lord, let me land at a blessed landing place, and You are the best to accommodate us.'",
        reference: "সূরা মুমিনূন ২৩:২৯"
      },
      {
        id: "work-30",
        titleBengali: "স্টার্টআপ সফলতা",
        titleEnglish: "For Startup Success",
        arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        bengali: "হে আমাদের রব! তোমার পক্ষ থেকে আমাদের রহমত দাও এবং আমাদের কাজে সঠিক পথ দেখাও।",
        english: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
        reference: "সূরা কাহফ ১৮:১০"
      },
      {
        id: "work-31",
        titleBengali: "লক্ষ্য অর্জনের দোয়া",
        titleEnglish: "For Achieving Goals",
        arabic: "اللَّهُمَّ يَسِّرْ وَلاَ تُعَسِّرْ",
        bengali: "হে আল্লাহ! সহজ কর, কঠিন করো না।",
        english: "O Allah, make it easy and do not make it difficult.",
        reference: "সহীহ বুখারী, হাদিস নং ৬১২৬"
      },
      {
        id: "work-32",
        titleBengali: "ক্যারিয়ার পরিবর্তনের দোয়া",
        titleEnglish: "For Career Change",
        arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
        bengali: "হে আল্লাহ! আমার জন্য কল্যাণকর নির্ধারণ কর এবং আমার জন্য পছন্দ কর।",
        english: "O Allah, decree what is good for me and choose it for me.",
        reference: "তিরমিযী, হাদিস নং ৩৫১৬"
      },
      {
        id: "work-33",
        titleBengali: "ইনোভেশনের দোয়া",
        titleEnglish: "For Innovation",
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً",
        bengali: "হে আমার রব! তোমার পক্ষ থেকে আমাকে পবিত্র সন্তান দান কর।",
        english: "My Lord, grant me from Yourself good offspring.",
        reference: "সূরা আলে ইমরান ৩:৩৮"
      },
      {
        id: "work-34",
        titleBengali: "ট্রেনিং সফলতা",
        titleEnglish: "For Training Success",
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي",
        bengali: "হে আল্লাহ! যা আমাকে শিখিয়েছ তা দ্বারা আমাকে উপকৃত কর এবং যা আমার উপকারে আসবে তা শেখাও।",
        english: "O Allah, benefit me from what You have taught me and teach me what will benefit me.",
        reference: "সুনান ইবনে মাজাহ, হাদিস নং ২৫১"
      },
      {
        id: "work-35",
        titleBengali: "ডেডলাইন পূরণের দোয়া",
        titleEnglish: "For Meeting Deadlines",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
        bengali: "হে আমার রব! আমাকে তাওফিক দাও যাতে তোমার নিয়ামতের শুকরিয়া আদায় করতে পারি।",
        english: "My Lord, enable me to be grateful for Your favor.",
        reference: "সূরা নামল ২৭:১৯"
      },
      {
        id: "work-36",
        titleBengali: "দূরবর্তী কাজের দোয়া",
        titleEnglish: "For Remote Work",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي عَمَلِي",
        bengali: "হে আল্লাহ! আমার কাজে বরকত দাও।",
        english: "O Allah, bless my work.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "work-37",
        titleBengali: "কাজের ভারসাম্যের দোয়া",
        titleEnglish: "For Work-Life Balance",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
        bengali: "হে আমাদের রব! দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও।",
        english: "Our Lord, give us good in this world and good in the Hereafter.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "work-38",
        titleBengali: "ইন্টারভিউ সফলতা",
        titleEnglish: "For Interview Success",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত কর এবং আমার কাজ সহজ করে দাও।",
        english: "My Lord, expand for me my chest and ease my task for me.",
        reference: "সূরা ত্বহা ২০:২৫-২৬"
      },
      {
        id: "work-39",
        titleBengali: "নেটওয়ার্কিং সফলতা",
        titleEnglish: "For Networking Success",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ",
        bengali: "হে আল্লাহ! আমাকে তোমার নেক বান্দাদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make me among Your righteous servants.",
        reference: "সূরা নামল ২৭:১৯"
      },
      {
        id: "work-40",
        titleBengali: "পেশাদারিত্বের দোয়া",
        titleEnglish: "For Professionalism",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        bengali: "হে আল্লাহ! আমি তোমার কাছে হেদায়েত, তাকওয়া, পবিত্রতা ও সচ্ছলতা চাই।",
        english: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২১"
      },
      {
        id: "work-41",
        titleBengali: "ব্যবসায়িক অংশীদারিত্ব",
        titleEnglish: "For Business Partnership",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর এবং আমাদের পারস্পরিক সম্পর্ক সংশোধন কর।",
        english: "O Allah, bring love between our hearts and rectify our mutual relations.",
        reference: "আবু দাউদ, হাদিস নং ৯৬৯"
      },
      {
        id: "work-42",
        titleBengali: "সম্মান অর্জনের দোয়া",
        titleEnglish: "For Gaining Respect",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
        bengali: "হে আল্লাহ! আমি দুনিয়া ও আখিরাতে তোমার কাছে সুস্থতা চাই।",
        english: "O Allah, I ask You for well-being in this world and the Hereafter.",
        reference: "সুনান ইবনে মাজাহ, হাদিস নং ৩৮৫১"
      },
      {
        id: "work-43",
        titleBengali: "প্রতিভা প্রকাশের দোয়া",
        titleEnglish: "For Showcasing Talent",
        arabic: "رَبِّ أَرِنِي كَيْفَ تُحْيِي الْمَوْتَىٰ",
        bengali: "হে আমার রব! আমাকে দেখাও কিভাবে তুমি মৃতদের জীবিত কর।",
        english: "My Lord, show me how You give life to the dead.",
        reference: "সূরা বাকারা ২:২৬০"
      },
      {
        id: "work-44",
        titleBengali: "সততার দোয়া",
        titleEnglish: "For Honesty in Work",
        arabic: "اللَّهُمَّ اجْعَلْنِي صَدُوقًا وَفِيًّا أَمِينًا",
        bengali: "হে আল্লাহ! আমাকে সত্যবাদী, বিশ্বস্ত ও আমানতদার বানাও।",
        english: "O Allah, make me truthful, loyal, and trustworthy.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "work-45",
        titleBengali: "ব্যবসায়িক সিদ্ধান্তের দোয়া",
        titleEnglish: "For Business Decisions",
        arabic: "وَشَاوِرْهُمْ فِي الْأَمْرِ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
        bengali: "এবং কাজে তাদের সাথে পরামর্শ কর, অতঃপর যখন দৃঢ় সংকল্প হও তখন আল্লাহর উপর ভরসা কর।",
        english: "And consult them in the matter. And when you have decided, then rely upon Allah.",
        reference: "সূরা আলে ইমরান ৩:১৫৯"
      },
      {
        id: "work-46",
        titleBengali: "প্রজেক্ট ম্যানেজমেন্ট",
        titleEnglish: "For Project Management",
        arabic: "رَبِّ أَتْمِمْ لِي نُورِي وَاغْفِرْ لِي",
        bengali: "হে আমার রব! আমার জন্য আমার নূর পূর্ণ করে দাও এবং আমাকে ক্ষমা কর।",
        english: "My Lord, perfect for me my light and forgive me.",
        reference: "সূরা তাহরীম ৬৬:৮"
      },
      {
        id: "work-47",
        titleBengali: "কর্মজীবী নারীদের দোয়া",
        titleEnglish: "For Working Women",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        bengali: "হে আমার রব! তুমি আমার প্রতি যে কল্যাণ নাযিল করবে আমি তার মুখাপেক্ষী।",
        english: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
        reference: "সূরা কাসাস ২৮:২৪"
      },
      {
        id: "work-48",
        titleBengali: "উদ্যোক্তাদের দোয়া",
        titleEnglish: "For Entrepreneurs",
        arabic: "رَبِّ انصُرْنِي بِمَا كَذَّبُونِ",
        bengali: "হে আমার রব! তারা আমাকে মিথ্যাবাদী বলেছে, তুমি আমাকে সাহায্য কর।",
        english: "My Lord, support me because they deny me.",
        reference: "সূরা মুমিনূন ২৩:২৬"
      },
      {
        id: "work-49",
        titleBengali: "কাজে মনোযোগের দোয়া",
        titleEnglish: "For Focus at Work",
        arabic: "اللَّهُمَّ اجْمَعْ قَلْبِي عَلَى طَاعَتِكَ",
        bengali: "হে আল্লাহ! তোমার আনুগত্যের উপর আমার অন্তরকে একত্রিত কর।",
        english: "O Allah, unite my heart upon obedience to You.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৯৯"
      },
      {
        id: "work-50",
        titleBengali: "কাজে ধৈর্যের দোয়া",
        titleEnglish: "For Patience at Work",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
        bengali: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দাও এবং আমাদের পা স্থির রাখ।",
        english: "Our Lord, pour upon us patience and plant firmly our feet.",
        reference: "সূরা বাকারা ২:২৫০"
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
      },
      {
        id: "family-11",
        titleBengali: "মা-বাবার জন্য দীর্ঘায়ু",
        titleEnglish: "For Parents' Long Life",
        arabic: "اللَّهُمَّ أَطِلْ عُمُرَ وَالِدَيَّ فِي طَاعَتِكَ",
        bengali: "হে আল্লাহ! তোমার আনুগত্যে আমার মা-বাবার জীবন দীর্ঘ কর।",
        english: "O Allah, extend my parents' lives in Your obedience.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-12",
        titleBengali: "সন্তানদের হেদায়েতের দোয়া",
        titleEnglish: "For Children's Guidance",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        bengali: "হে আমার রব! আমাকে এবং আমার বংশধরদের সালাত প্রতিষ্ঠাকারী বানাও, হে আমাদের রব! আমার দোয়া কবুল কর।",
        english: "My Lord, make me an establisher of prayer, and my descendants. Our Lord, accept my supplication.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "family-13",
        titleBengali: "পরিবারের রিজিকের দোয়া",
        titleEnglish: "For Family Provision",
        arabic: "اللَّهُمَّ ارْزُقْنِي وَعَائِلَتِي رِزْقًا حَلاَلاً طَيِّبًا",
        bengali: "হে আল্লাহ! আমাকে এবং আমার পরিবারকে হালাল ও পবিত্র রিজিক দান কর।",
        english: "O Allah, provide me and my family with halal and pure provision.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-14",
        titleBengali: "পরিবারের নিরাপত্তার দোয়া",
        titleEnglish: "For Family Protection",
        arabic: "اللَّهُمَّ احْفَظْ أَهْلِي وَذُرِّيَّتِي مِنْ كُلِّ سُوءٍ",
        bengali: "হে আল্লাহ! আমার পরিবার ও সন্তানদের সকল অনিষ্ট থেকে হেফাজত কর।",
        english: "O Allah, protect my family and offspring from all evil.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "family-15",
        titleBengali: "দাদা-দাদীর জন্য দোয়া",
        titleEnglish: "For Grandparents",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        bengali: "হে আমার রব! তাদের প্রতি রহম কর যেমন তারা আমাকে ছোটবেলায় লালন-পালন করেছেন।",
        english: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "সূরা ইসরা ১৭:২৪"
      },
      {
        id: "family-16",
        titleBengali: "চাচা-মামার জন্য দোয়া",
        titleEnglish: "For Uncles & Aunts",
        arabic: "اللَّهُمَّ بَارِكْ لَهُمْ وَاحْفَظْهُمْ",
        bengali: "হে আল্লাহ! তাদের জন্য বরকত দাও এবং তাদের হেফাজত কর।",
        english: "O Allah, bless them and protect them.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-17",
        titleBengali: "পরিবারে শান্তির দোয়া",
        titleEnglish: "For Family Peace",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ",
        bengali: "হে আমার রব! আমাকে সত্যের সাথে প্রবেশ করাও এবং সত্যের সাথে বের কর।",
        english: "My Lord, cause me to enter a sound entrance and to exit a sound exit.",
        reference: "সূরা ইসরা ১৭:৮০"
      },
      {
        id: "family-18",
        titleBengali: "আত্মীয়তা রক্ষার দোয়া",
        titleEnglish: "For Maintaining Kinship",
        arabic: "اللَّهُمَّ صِلْ مَنْ وَصَلَنِي وَاقْطَعْ مَنْ قَطَعَنِي",
        bengali: "হে আল্লাহ! যে আমার সাথে সম্পর্ক রাখে তার সাথে সম্পর্ক রাখ এবং যে সম্পর্ক ছিন্ন করে তার সম্পর্ক ছিন্ন কর।",
        english: "O Allah, maintain ties with whoever maintains ties with me and cut off whoever cuts me off.",
        reference: "সহীহ বুখারী, হাদিস নং ৫৯৮৮"
      },
      {
        id: "family-19",
        titleBengali: "পরিবারে বরকতের দোয়া",
        titleEnglish: "For Family Blessings",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي أَهْلِنَا وَأَوْلاَدِنَا",
        bengali: "হে আল্লাহ! আমাদের পরিবার ও সন্তানদের মধ্যে বরকত দাও।",
        english: "O Allah, bless us in our family and children.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-20",
        titleBengali: "মৃত পিতা-মাতার জন্য দোয়া",
        titleEnglish: "For Deceased Parents",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
        bengali: "হে আমার রব! আমাকে এবং আমার পিতা-মাতাকে ক্ষমা কর।",
        english: "My Lord, forgive me and my parents.",
        reference: "সূরা নূহ ৭১:২৮"
      },
      {
        id: "family-21",
        titleBengali: "সন্তানের সুস্থতার দোয়া",
        titleEnglish: "For Children's Health",
        arabic: "أُعِيذُكُمْ بِكَلِمَاتِ اللهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ",
        bengali: "আমি তোমাদের আল্লাহর পরিপূর্ণ কালেমার মাধ্যমে সকল শয়তান ও বিষাক্ত প্রাণী থেকে আশ্রয় দিচ্ছি।",
        english: "I seek protection for you with the perfect words of Allah from every devil and poisonous pest.",
        reference: "সহীহ বুখারী, হাদিস নং ৩৩৭১"
      },
      {
        id: "family-22",
        titleBengali: "পরিবারের ঈমানের দোয়া",
        titleEnglish: "For Family's Faith",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي",
        bengali: "হে আমার রব! আমাকে এবং আমার বংশধরদের সালাত প্রতিষ্ঠাকারী বানাও।",
        english: "My Lord, make me an establisher of prayer, and my descendants.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "family-23",
        titleBengali: "পরিবারে একতার দোয়া",
        titleEnglish: "For Family Togetherness",
        arabic: "وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        bengali: "এবং আমাদেরকে মুত্তাকীদের জন্য আদর্শ বানাও।",
        english: "And make us an example for the righteous.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "family-24",
        titleBengali: "বৃদ্ধ মা-বাবার সেবার দোয়া",
        titleEnglish: "For Serving Elderly Parents",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        bengali: "হে আমার রব! তাদের প্রতি রহম কর যেমন তারা আমাকে শৈশবে লালন-পালন করেছেন।",
        english: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "সূরা ইসরা ১৭:২৪"
      },
      {
        id: "family-25",
        titleBengali: "পরিবারে সুখের দোয়া",
        titleEnglish: "For Family Happiness",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
        bengali: "হে আমাদের রব! দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও।",
        english: "Our Lord, give us good in this world and good in the Hereafter.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "family-26",
        titleBengali: "সৎ সন্তানের দোয়া",
        titleEnglish: "For Righteous Children",
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
        bengali: "হে আমার রব! তোমার পক্ষ থেকে আমাকে পবিত্র সন্তান দান কর, নিশ্চয়ই তুমি দোয়া শ্রবণকারী।",
        english: "My Lord, grant me from Yourself good offspring. Indeed, You are the Hearer of supplication.",
        reference: "সূরা আলে ইমরান ৩:৩৮"
      },
      {
        id: "family-27",
        titleBengali: "পরিবারের হেদায়েতের দোয়া",
        titleEnglish: "For Family Guidance",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        bengali: "হে আমাদের রব! আমাদের স্ত্রী ও সন্তানদের থেকে আমাদের চোখ শীতল কর।",
        english: "Our Lord, grant us from among our spouses and offspring comfort to our eyes.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "family-28",
        titleBengali: "পরিবারে সম্মানের দোয়া",
        titleEnglish: "For Family Honor",
        arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        bengali: "হে আমাদের রব! তোমার পক্ষ থেকে আমাদের রহমত দাও এবং আমাদের কাজে সঠিক পথ দেখাও।",
        english: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
        reference: "সূরা কাহফ ১৮:১০"
      },
      {
        id: "family-29",
        titleBengali: "পরিবারে ক্ষমার দোয়া",
        titleEnglish: "For Family Forgiveness",
        arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ",
        bengali: "হে আমাদের রব! আমাদের ও আমাদের সেসব ভাইদের ক্ষমা কর যারা ঈমানের সাথে আমাদের অগ্রগামী হয়েছে।",
        english: "Our Lord, forgive us and our brothers who preceded us in faith.",
        reference: "সূরা হাশর ৫৯:১০"
      },
      {
        id: "family-30",
        titleBengali: "পরিবারে ধৈর্যের দোয়া",
        titleEnglish: "For Family Patience",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
        bengali: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দাও।",
        english: "Our Lord, pour upon us patience.",
        reference: "সূরা বাকারা ২:২৫০"
      },
      {
        id: "family-31",
        titleBengali: "পরিবারে তাকওয়ার দোয়া",
        titleEnglish: "For Family Piety",
        arabic: "رَبَّنَا اجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ",
        bengali: "হে আমাদের রব! আমাদেরকে তোমার অনুগত কর এবং আমাদের বংশধর থেকে তোমার অনুগত জাতি তৈরি কর।",
        english: "Our Lord, make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You.",
        reference: "সূরা বাকারা ২:১২৮"
      },
      {
        id: "family-32",
        titleBengali: "পরিবারে কৃতজ্ঞতার দোয়া",
        titleEnglish: "For Family Gratitude",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
        bengali: "হে আমার রব! আমাকে তাওফিক দাও যাতে আমি তোমার নিয়ামতের শুকরিয়া আদায় করতে পারি।",
        english: "My Lord, enable me to be grateful for Your favor.",
        reference: "সূরা নামল ২৭:১৯"
      },
      {
        id: "family-33",
        titleBengali: "পরিবারে সম্প্রীতি বৃদ্ধির দোয়া",
        titleEnglish: "For Increasing Family Harmony",
        arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا",
        bengali: "হে আল্লাহ! আমাদের অন্তরে ভালোবাসা সৃষ্টি কর।",
        english: "O Allah, bring love between our hearts.",
        reference: "সূরা আনফাল ৮:৬৩"
      },
      {
        id: "family-34",
        titleBengali: "পরিবারে নেয়ামতের দোয়া",
        titleEnglish: "For Family Blessings",
        arabic: "رَبِّ أَنْعِمْ عَلَيَّ وَعَلَى أَهْلِي",
        bengali: "হে আমার রব! আমার উপর এবং আমার পরিবারের উপর নিয়ামত দান কর।",
        english: "My Lord, bestow blessings upon me and upon my family.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-35",
        titleBengali: "পরিবারে সৎকর্মের দোয়া",
        titleEnglish: "For Family's Good Deeds",
        arabic: "وَأَن أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
        bengali: "এবং আমি যেন এমন সৎকর্ম করি যা তুমি পছন্দ কর এবং আমার সন্তানদের মধ্যে আমার জন্য সংশোধন করে দাও।",
        english: "And to do righteousness of which You approve. And make righteous for me my offspring.",
        reference: "সূরা আহকাফ ৪৬:১৫"
      },
      {
        id: "family-36",
        titleBengali: "পরিবারে শান্তি প্রতিষ্ঠার দোয়া",
        titleEnglish: "For Establishing Family Peace",
        arabic: "وَاهْدِنَا سُبُلَ السَّلاَمِ",
        bengali: "এবং আমাদের শান্তির পথে পরিচালিত কর।",
        english: "And guide us to the ways of peace.",
        reference: "আবু দাউদ, হাদিস নং ৯৬৯"
      },
      {
        id: "family-37",
        titleBengali: "পরিবারে বিশ্বাসের দোয়া",
        titleEnglish: "For Family Trust",
        arabic: "رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ",
        bengali: "হে আমাদের রব! তোমার উপরই আমরা ভরসা করেছি এবং তোমার দিকেই ফিরে এসেছি এবং তোমার কাছেই প্রত্যাবর্তন।",
        english: "Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.",
        reference: "সূরা মুমতাহিনা ৬০:৪"
      },
      {
        id: "family-38",
        titleBengali: "পরিবারে দোয়া কবুলের জন্য",
        titleEnglish: "For Acceptance of Family Prayers",
        arabic: "رَبَّنَا وَتَقَبَّلْ دُعَاءَ",
        bengali: "হে আমাদের রব! আমাদের দোয়া কবুল কর।",
        english: "Our Lord, accept our supplication.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "family-39",
        titleBengali: "পরিবারে সুরক্ষার দোয়া",
        titleEnglish: "For Family Safety",
        arabic: "رَبِّ احْفَظْنِي وَأَهْلِي مِنْ كُلِّ مَكْرُوهٍ",
        bengali: "হে আমার রব! আমাকে এবং আমার পরিবারকে সকল অপছন্দনীয় বিষয় থেকে রক্ষা কর।",
        english: "My Lord, protect me and my family from all that is disliked.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-40",
        titleBengali: "পরিবারে আখিরাতের সফলতার দোয়া",
        titleEnglish: "For Family's Success in Hereafter",
        arabic: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدتَّهُمْ",
        bengali: "হে আমাদের রব! তাদেরকে চিরস্থায়ী জান্নাতে প্রবেশ করাও যা তুমি তাদের ওয়াদা দিয়েছ।",
        english: "Our Lord, and admit them to gardens of perpetual residence which You have promised them.",
        reference: "সূরা গাফির ৪০:৮"
      },
      {
        id: "family-41",
        titleBengali: "পরিবারে সম্মান বৃদ্ধির দোয়া",
        titleEnglish: "For Increasing Family Honor",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
        bengali: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দাও।",
        english: "My Lord, expand for me my chest.",
        reference: "সূরা ত্বহা ২০:২৫"
      },
      {
        id: "family-42",
        titleBengali: "পরিবারে সন্তুষ্টির দোয়া",
        titleEnglish: "For Family Contentment",
        arabic: "اللَّهُمَّ قَنِّعْنِي بِمَا رَزَقْتَنِي",
        bengali: "হে আল্লাহ! তুমি যা দিয়েছ তাতে আমাকে সন্তুষ্ট কর।",
        english: "O Allah, make me content with what You have provided me.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৬৩"
      },
      {
        id: "family-43",
        titleBengali: "পরিবারে আমানতদারিতার দোয়া",
        titleEnglish: "For Family Trustworthiness",
        arabic: "اللَّهُمَّ اجْعَلْنَا أَوْفِيَاءَ أُمَنَاءَ",
        bengali: "হে আল্লাহ! আমাদেরকে বিশ্বস্ত ও আমানতদার বানাও।",
        english: "O Allah, make us loyal and trustworthy.",
        reference: "মুসনাদে আহমাদ"
      },
      {
        id: "family-44",
        titleBengali: "পরিবারে সৌহার্দ্যের দোয়া",
        titleEnglish: "For Family Cordiality",
        arabic: "وَلاَ تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا",
        bengali: "এবং মুমিনদের প্রতি আমাদের অন্তরে কোন বিদ্বেষ রেখো না।",
        english: "And put not in our hearts any resentment toward those who have believed.",
        reference: "সূরা হাশর ৫৯:১০"
      },
      {
        id: "family-45",
        titleBengali: "পরিবারে উত্তম আচরণের দোয়া",
        titleEnglish: "For Good Family Conduct",
        arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الأَخْلاَقِ",
        bengali: "হে আল্লাহ! আমাকে উত্তম চরিত্রের দিকে পরিচালিত কর।",
        english: "O Allah, guide me to the best of manners.",
        reference: "সহীহ মুসলিম, হাদিস নং ৭৭১"
      },
      {
        id: "family-46",
        titleBengali: "পরিবারে জ্ঞান বৃদ্ধির দোয়া",
        titleEnglish: "For Family's Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        bengali: "হে আমার রব! আমার জ্ঞান বাড়িয়ে দাও।",
        english: "My Lord, increase me in knowledge.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "family-47",
        titleBengali: "পরিবারে সাহায্যের দোয়া",
        titleEnglish: "For Family Support",
        arabic: "رَبِّ أَعِنِّي وَلاَ تُعِنْ عَلَيَّ",
        bengali: "হে আমার রব! আমাকে সাহায্য কর এবং আমার বিরুদ্ধে সাহায্য করো না।",
        english: "My Lord, help me and do not help against me.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৫৫১"
      },
      {
        id: "family-48",
        titleBengali: "পরিবারে উত্তম পরিণতির দোয়া",
        titleEnglish: "For Good Family Outcome",
        arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا",
        bengali: "হে আমাদের রব! আমাদের জন্য আমাদের নূর পূর্ণ করে দাও এবং আমাদের ক্ষমা কর।",
        english: "Our Lord, perfect for us our light and forgive us.",
        reference: "সূরা তাহরীম ৬৬:৮"
      },
      {
        id: "family-49",
        titleBengali: "পরিবারে সুখ সমৃদ্ধির দোয়া",
        titleEnglish: "For Family Prosperity",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আল্লাহ! তুমি আমাদের যা দিয়েছ তাতে বরকত দাও এবং জাহান্নামের আযাব থেকে আমাদের রক্ষা কর।",
        english: "O Allah, bless us in what You have provided for us and protect us from the punishment of the Fire.",
        reference: "সহীহ মুসলিম, হাদিস নং ২০৩৪"
      },
      {
        id: "family-50",
        titleBengali: "পরিবারের জন্য জান্নাতের দোয়া",
        titleEnglish: "For Family's Entry to Paradise",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        bengali: "হে আমার রব! আমাকে ক্ষমা কর, আমার পিতা-মাতাকে ক্ষমা কর, যারা মুমিন হয়ে আমার ঘরে প্রবেশ করে তাদের ক্ষমা কর এবং সকল মুমিন পুরুষ ও মুমিন নারীদের ক্ষমা কর।",
        english: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.",
        reference: "সূরা নূহ ৭১:২৮"
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
      },
      {
        id: "marriage-11",
        titleBengali: "বিয়ের প্রস্তাবের দোয়া",
        titleEnglish: "For Marriage Proposal",
        arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ",
        bengali: "হে আল্লাহ! আমি তোমার জ্ঞান দ্বারা কল্যাণ চাই, তোমার ক্ষমতা দ্বারা শক্তি চাই এবং তোমার মহান অনুগ্রহ থেকে প্রার্থনা করি।",
        english: "O Allah, I seek Your guidance through Your knowledge, I seek ability through Your power, and I ask from Your great bounty.",
        reference: "সহীহ বুখারী, হাদিস নং ১১৬২"
      },
      {
        id: "marriage-12",
        titleBengali: "বিবাহের শুভ সূচনার দোয়া",
        titleEnglish: "For Blessed Beginning",
        arabic: "اللَّهُمَّ اجْعَلْ هَذَا الزَّوَاجَ مُبَارَكًا وَارْزُقْنَا السَّعَادَةَ فِيهِ",
        bengali: "হে আল্লাহ! এই বিবাহকে বরকতময় কর এবং আমাদেরকে এতে সুখ দান কর।",
        english: "O Allah, make this marriage blessed and grant us happiness in it.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-13",
        titleBengali: "স্বামী-স্ত্রীর মিলনের দোয়া",
        titleEnglish: "For Intimacy",
        arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا",
        bengali: "আল্লাহর নামে। হে আল্লাহ! আমাদেরকে শয়তান থেকে দূরে রাখ এবং তুমি আমাদের যা দান কর তা থেকেও শয়তানকে দূরে রাখ।",
        english: "In the name of Allah. O Allah, keep the Satan away from us and keep the Satan away from what You bestow upon us.",
        reference: "সহীহ বুখারী, হাদিস নং ৬৩৮৮"
      },
      {
        id: "marriage-14",
        titleBengali: "দাম্পত্য শান্তির দোয়া",
        titleEnglish: "For Marital Peace",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও।",
        english: "Our Lord, give us good in this world and good in the Hereafter.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "marriage-15",
        titleBengali: "জীবনসঙ্গীর হেদায়েতের দোয়া",
        titleEnglish: "For Spouse's Guidance",
        arabic: "اللَّهُمَّ اهْدِ زَوْجِي وَاجْعَلْهُ مِنَ الصَّالِحِينَ",
        bengali: "হে আল্লাহ! আমার জীবনসঙ্গীকে হেদায়েত দাও এবং তাকে নেককারদের অন্তর্ভুক্ত কর।",
        english: "O Allah, guide my spouse and make them among the righteous.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-16",
        titleBengali: "দাম্পত্য বিশ্বাসের দোয়া",
        titleEnglish: "For Marital Trust",
        arabic: "اللَّهُمَّ أَصْلِحْ ذَاتَ بَيْنِنَا وَأَلِّفْ بَيْنَ قُلُوبِنَا",
        bengali: "হে আল্লাহ! আমাদের পারস্পরিক সম্পর্ক সংশোধন কর এবং আমাদের অন্তরে ভালোবাসা সৃষ্টি কর।",
        english: "O Allah, rectify our mutual relations and create love between our hearts.",
        reference: "সহীহ মুসলিম, হাদিস নং ৫৩৮"
      },
      {
        id: "marriage-17",
        titleBengali: "স্বামীর জন্য স্ত্রীর দোয়া",
        titleEnglish: "Wife's Dua for Husband",
        arabic: "اللَّهُمَّ بَارِكْ لِزَوْجِي فِي رِزْقِهِ وَعَمَلِهِ وَصِحَّتِهِ",
        bengali: "হে আল্লাহ! আমার স্বামীর রিযিক, কাজ ও স্বাস্থ্যে বরকত দাও।",
        english: "O Allah, bless my husband in his provision, work and health.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-18",
        titleBengali: "স্ত্রীর জন্য স্বামীর দোয়া",
        titleEnglish: "Husband's Dua for Wife",
        arabic: "اللَّهُمَّ احْفَظْ زَوْجَتِي وَبَارِكْ فِيهَا وَاجْعَلْهَا قُرَّةَ عَيْنِي",
        bengali: "হে আল্লাহ! আমার স্ত্রীকে হেফাজত কর, তার মধ্যে বরকত দাও এবং তাকে আমার চোখের শীতলতা কর।",
        english: "O Allah, protect my wife, bless her and make her the comfort of my eyes.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-19",
        titleBengali: "দাম্পত্য ক্ষমার দোয়া",
        titleEnglish: "For Marital Forgiveness",
        arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ",
        bengali: "হে আমাদের রব! আমাদের এবং আমাদের সেই ভাইদের ক্ষমা কর যারা ঈমানের সাথে আমাদের পূর্বে গত হয়েছে।",
        english: "Our Lord, forgive us and our brothers who preceded us in faith.",
        reference: "সূরা হাশর ৫৯:১০"
      },
      {
        id: "marriage-20",
        titleBengali: "বিবাহের স্থায়িত্বের দোয়া",
        titleEnglish: "For Marriage Stability",
        arabic: "اللَّهُمَّ ثَبِّتْ زَوَاجَنَا وَاحْفَظْهُ مِنْ كُلِّ شَرٍّ",
        bengali: "হে আল্লাহ! আমাদের বিবাহকে স্থায়ী কর এবং সকল অনিষ্ট থেকে হেফাজত কর।",
        english: "O Allah, make our marriage stable and protect it from all evil.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-21",
        titleBengali: "দাম্পত্য সম্মানের দোয়া",
        titleEnglish: "For Mutual Respect",
        arabic: "اللَّهُمَّ ارْزُقْنَا الْمَوَدَّةَ وَالرَّحْمَةَ وَالاحْتِرَامَ",
        bengali: "হে আল্লাহ! আমাদেরকে ভালোবাসা, দয়া ও সম্মান দান কর।",
        english: "O Allah, grant us love, mercy and mutual respect.",
        reference: "সূরা রূম ৩০:২১ থেকে অনুপ্রাণিত"
      },
      {
        id: "marriage-22",
        titleBengali: "বিবাহে সবরের দোয়া",
        titleEnglish: "For Patience in Marriage",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
        bengali: "হে আমাদের রব! আমাদের ধৈর্য দান কর এবং আমাদের পা স্থির রাখ।",
        english: "Our Lord, pour upon us patience and plant firmly our feet.",
        reference: "সূরা বাকারা ২:২৫০"
      },
      {
        id: "marriage-23",
        titleBengali: "দাম্পত্য কৃতজ্ঞতার দোয়া",
        titleEnglish: "For Marital Gratitude",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
        bengali: "হে আমার রব! আমাকে সামর্থ্য দাও যেন তোমার নিয়ামতের শুকরিয়া আদায় করতে পারি।",
        english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me.",
        reference: "সূরা আহকাফ ৪৬:১৫"
      },
      {
        id: "marriage-24",
        titleBengali: "স্বামী-স্ত্রীর সুখের দোয়া",
        titleEnglish: "For Couple's Happiness",
        arabic: "اللَّهُمَّ اجْعَلْنَا سُعَدَاءَ فِي زَوَاجِنَا وَارْزُقْنَا الْهَنَاءَ",
        bengali: "হে আল্লাহ! আমাদেরকে বিবাহে সুখী কর এবং আমাদের প্রশান্তি দান কর।",
        english: "O Allah, make us happy in our marriage and grant us tranquility.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-25",
        titleBengali: "দাম্পত্য সংকট নিরসনের দোয়া",
        titleEnglish: "For Resolving Marital Crisis",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        bengali: "তুমি ছাড়া কোন ইলাহ নেই, তুমি পবিত্র, নিশ্চয়ই আমি জালেমদের অন্তর্ভুক্ত ছিলাম।",
        english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "সূরা আম্বিয়া ২১:৮৭"
      },
      {
        id: "marriage-26",
        titleBengali: "দাম্পত্য যোগাযোগের দোয়া",
        titleEnglish: "For Better Communication",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي",
        bengali: "হে আমার রব! আমার বুক প্রশস্ত করে দাও, আমার কাজ সহজ কর এবং আমার জিহ্বার জড়তা দূর কর।",
        english: "My Lord, expand my chest, ease my task, and remove the impediment from my tongue.",
        reference: "সূরা ত্বহা ২০:২৫-২৭"
      },
      {
        id: "marriage-27",
        titleBengali: "জীবনসঙ্গীর সুরক্ষার দোয়া",
        titleEnglish: "For Spouse's Protection",
        arabic: "اللَّهُمَّ احْفَظْ زَوْجِي مِنْ بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِ وَعَنْ يَمِينِهِ وَعَنْ شِمَالِهِ",
        bengali: "হে আল্লাহ! আমার জীবনসঙ্গীকে সামনে, পেছনে, ডানে ও বামে সর্বদিক থেকে হেফাজত কর।",
        english: "O Allah, protect my spouse from front, behind, right and left.",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৭৪"
      },
      {
        id: "marriage-28",
        titleBengali: "বিবাহে বরকতের দোয়া",
        titleEnglish: "For Blessings in Marriage",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي زَوَاجِنَا وَاجْعَلْهُ سَبَبًا لِلْخَيْرِ",
        bengali: "হে আল্লাহ! আমাদের বিবাহে বরকত দাও এবং একে কল্যাণের কারণ বানাও।",
        english: "O Allah, bless our marriage and make it a means of goodness.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-29",
        titleBengali: "দাম্পত্য ঐক্যের দোয়া",
        titleEnglish: "For Marital Unity",
        arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
        bengali: "তোমরা সবাই আল্লাহর রজ্জু শক্ত করে ধর এবং বিভক্ত হয়ো না।",
        english: "And hold firmly to the rope of Allah all together and do not become divided.",
        reference: "সূরা আলে ইমরান ৩:১০৩"
      },
      {
        id: "marriage-30",
        titleBengali: "স্বামী-স্ত্রীর তাকওয়ার দোয়া",
        titleEnglish: "For Piety in Marriage",
        arabic: "اللَّهُمَّ اجْعَلْنَا مِنَ الْمُتَّقِينَ الَّذِينَ يَتَّقُونَ",
        bengali: "হে আল্লাহ! আমাদেরকে মুত্তাকীদের অন্তর্ভুক্ত কর যারা তাকওয়া অবলম্বন করে।",
        english: "O Allah, make us among the pious who practice righteousness.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-31",
        titleBengali: "বিবাহে সাফল্যের দোয়া",
        titleEnglish: "For Success in Marriage",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
        bengali: "হে আমাদের রব! আমাদের হেদায়েতের পর আমাদের অন্তর বক্র করো না।",
        english: "Our Lord, let not our hearts deviate after You have guided us.",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "marriage-32",
        titleBengali: "দাম্পত্য আনন্দের দোয়া",
        titleEnglish: "For Joy in Marriage",
        arabic: "اللَّهُمَّ ارْزُقْنَا الْفَرَحَ وَالسُّرُورَ فِي حَيَاتِنَا الزَّوْجِيَّةِ",
        bengali: "হে আল্লাহ! আমাদের দাম্পত্য জীবনে আনন্দ ও সুখ দান কর।",
        english: "O Allah, grant us joy and happiness in our married life.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-33",
        titleBengali: "স্বামী-স্ত্রীর দ্বীনের দোয়া",
        titleEnglish: "For Religious Marriage",
        arabic: "اللَّهُمَّ اجْعَلْ زَوَاجَنَا عِبَادَةً لَكَ",
        bengali: "হে আল্লাহ! আমাদের বিবাহকে তোমার ইবাদত বানাও।",
        english: "O Allah, make our marriage an act of worship to You.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-34",
        titleBengali: "দাম্পত্য বোঝাপড়ার দোয়া",
        titleEnglish: "For Mutual Understanding",
        arabic: "اللَّهُمَّ ارْزُقْنَا التَّفَاهُمَ وَالْمَحَبَّةَ",
        bengali: "হে আল্লাহ! আমাদেরকে পারস্পরিক বোঝাপড়া ও ভালোবাসা দান কর।",
        english: "O Allah, grant us mutual understanding and love.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-35",
        titleBengali: "বিবাহে রহমতের দোয়া",
        titleEnglish: "For Mercy in Marriage",
        arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً",
        bengali: "আর তাঁর নিদর্শনাবলীর মধ্যে রয়েছে যে, তিনি তোমাদের জন্য তোমাদের মধ্য থেকে স্ত্রী সৃষ্টি করেছেন যাতে তোমরা তাদের কাছে শান্তি পাও এবং তোমাদের মধ্যে ভালোবাসা ও দয়া সৃষ্টি করেছেন।",
        english: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you affection and mercy.",
        reference: "সূরা রূম ৩০:২১"
      },
      {
        id: "marriage-36",
        titleBengali: "স্বামী-স্ত্রীর আমানতের দোয়া",
        titleEnglish: "For Trust in Marriage",
        arabic: "اللَّهُمَّ اجْعَلْنَا أَمِينَيْنِ لِبَعْضِنَا الْبَعْضِ",
        bengali: "হে আল্লাহ! আমাদেরকে একে অপরের জন্য আমানতদার বানাও।",
        english: "O Allah, make us trustworthy for each other.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-37",
        titleBengali: "বিবাহে ইনসাফের দোয়া",
        titleEnglish: "For Justice in Marriage",
        arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ",
        bengali: "নিশ্চয়ই আল্লাহ ন্যায়পরায়ণতা ও সদাচরণের নির্দেশ দেন।",
        english: "Indeed, Allah orders justice and good conduct.",
        reference: "সূরা নাহল ১৬:৯০"
      },
      {
        id: "marriage-38",
        titleBengali: "দাম্পত্য সহনশীলতার দোয়া",
        titleEnglish: "For Marital Tolerance",
        arabic: "اللَّهُمَّ ارْزُقْنَا الصَّبْرَ وَالتَّسَامُحَ فِي زَوَاجِنَا",
        bengali: "হে আল্লাহ! আমাদের বিবাহে ধৈর্য ও সহনশীলতা দান কর।",
        english: "O Allah, grant us patience and tolerance in our marriage.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "marriage-39",
        titleBengali: "স্বামী-স্ত্রীর ইখলাসের দোয়া",
        titleEnglish: "For Sincerity in Marriage",
        arabic: "اللَّهُمَّ اجْعَلْ عَمَلَنَا خَالِصًا لِوَجْهِكَ الْكَرِيمِ",
        bengali: "হে আল্লাহ! আমাদের কাজকে তোমার মহান চেহারার জন্য একনিষ্ঠ কর।",
        english: "O Allah, make our deeds sincere for Your noble countenance.",
        reference: "হিসনুল মুসলিম"
      },
      {
        id: "marriage-40",
        titleBengali: "বিবাহে হেদায়েতের দোয়া",
        titleEnglish: "For Guidance in Marriage",
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        bengali: "আমাদেরকে সরল পথ দেখাও।",
        english: "Guide us to the straight path.",
        reference: "সূরা ফাতিহা ১:৬"
      },
      {
        id: "marriage-41",
        titleBengali: "দাম্পত্য সহযোগিতার দোয়া",
        titleEnglish: "For Cooperation in Marriage",
        arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى",
        bengali: "তোমরা নেকী ও তাকওয়ায় একে অপরকে সাহায্য কর।",
        english: "And cooperate in righteousness and piety.",
        reference: "সূরা মায়িদাহ ৫:২"
      },
      {
        id: "marriage-42",
        titleBengali: "স্বামী-স্ত্রীর ক্ষমার দোয়া",
        titleEnglish: "For Forgiveness Between Spouses",
        arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا",
        bengali: "হে আমাদের রব! আমাদের গুনাহ মাফ কর এবং আমাদের কাজে বাড়াবাড়ি ক্ষমা কর।",
        english: "Our Lord, forgive us our sins and our excesses in our affairs.",
        reference: "সূরা আলে ইমরান ৩:১৪৭"
      },
      {
        id: "marriage-43",
        titleBengali: "বিবাহে তাওবার দোয়া",
        titleEnglish: "For Repentance in Marriage",
        arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        bengali: "হে আমাদের রব! আমরা নিজেদের উপর জুলুম করেছি। তুমি যদি আমাদের ক্ষমা না কর এবং রহম না কর তবে অবশ্যই আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
        english: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
        reference: "সূরা আরাফ ৭:২৩"
      },
      {
        id: "marriage-44",
        titleBengali: "দাম্পত্য নিরাপত্তার দোয়া",
        titleEnglish: "For Security in Marriage",
        arabic: "اللَّهُمَّ اجْعَلْ بَيْتَنَا آمِنًا مُطْمَئِنًّا",
        bengali: "হে আল্লাহ! আমাদের ঘরকে নিরাপদ ও প্রশান্ত কর।",
        english: "O Allah, make our home safe and peaceful.",
        reference: "সূরা ইবরাহীম ১৪:৩৫ থেকে অনুপ্রাণিত"
      },
      {
        id: "marriage-45",
        titleBengali: "স্বামী-স্ত্রীর ইসলাহের দোয়া",
        titleEnglish: "For Self-Improvement in Marriage",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        bengali: "হে আমাদের রব! তোমার পক্ষ থেকে আমাদের রহমত দান কর এবং আমাদের কাজে সঠিক পথ প্রদর্শন কর।",
        english: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
        reference: "সূরা কাহফ ১৮:১০"
      },
      {
        id: "marriage-46",
        titleBengali: "বিবাহে সুখী জীবনের দোয়া",
        titleEnglish: "For Happy Married Life",
        arabic: "مَنْ عَمِلَ صَالِحًا مِنْ ذَكَرٍ أَوْ أُنْثَى وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً",
        bengali: "পুরুষ বা নারী যে কেউ সৎকর্ম করবে ঈমানদার অবস্থায়, আমি তাকে অবশ্যই পবিত্র জীবন দান করব।",
        english: "Whoever does righteousness, whether male or female, while being a believer - We will surely cause them to live a good life.",
        reference: "সূরা নাহল ১৬:৯৭"
      },
      {
        id: "marriage-47",
        titleBengali: "দাম্পত্য জান্নাতের দোয়া",
        titleEnglish: "For Paradise with Spouse",
        arabic: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدْتَهُمْ وَمَنْ صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ",
        bengali: "হে আমাদের রব! তাদেরকে এবং তাদের পিতামাতা, স্ত্রী ও সন্তানদের মধ্যে যারা সৎকর্মশীল তাদেরকে চিরস্থায়ী জান্নাতে প্রবেশ করাও।",
        english: "Our Lord, and admit them to gardens of perpetual residence which You have promised them and whoever was righteous among their fathers, their spouses and their offspring.",
        reference: "সূরা গাফির ৪০:৮"
      },
      {
        id: "marriage-48",
        titleBengali: "স্বামী-স্ত্রীর শোকরের দোয়া",
        titleEnglish: "For Gratitude in Marriage",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        bengali: "হে আল্লাহ! তোমার যিকর, শুকর এবং উত্তম ইবাদতে আমাকে সাহায্য কর।",
        english: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        reference: "আবু দাউদ, হাদিস নং ১৫২২"
      },
      {
        id: "marriage-49",
        titleBengali: "বিবাহে তাওয়াক্কুলের দোয়া",
        titleEnglish: "For Reliance on Allah in Marriage",
        arabic: "وَتَوَكَّلْ عَلَى اللَّهِ وَكَفَى بِاللَّهِ وَكِيلًا",
        bengali: "আল্লাহর উপর ভরসা কর এবং কর্মবিধায়ক হিসেবে আল্লাহই যথেষ্ট।",
        english: "And rely upon Allah; and sufficient is Allah as Disposer of affairs.",
        reference: "সূরা আহযাব ৩৩:৩"
      },
      {
        id: "marriage-50",
        titleBengali: "দাম্পত্য জীবনের পূর্ণতার দোয়া",
        titleEnglish: "For Completeness in Marriage",
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْنَا مِنْهُ وَمَا لَمْ نَعْلَمْ",
        bengali: "হে আল্লাহ! আমরা তোমার কাছে সকল কল্যাণ চাই, বর্তমানে ও ভবিষ্যতে, যা আমরা জানি এবং যা জানি না।",
        english: "O Allah, we ask You for all that is good, in this world and in the Hereafter, what we know and what we do not know.",
        reference: "সহীহ মুসলিম, হাদিস নং ২৭২৫"
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
      },
      {
        id: "children-11",
        titleBengali: "সন্তানের স্বাস্থ্যের জন্য দোয়া",
        titleEnglish: "For Child's Health",
        arabic: "اللَّهُمَّ عَافِ أَوْلَادِي فِي أَبْدَانِهِمْ وَأَسْمَاعِهِمْ وَأَبْصَارِهِمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের শরীর, শ্রবণ ও দৃষ্টিতে সুস্থতা দাও।",
        english: "O Allah, grant my children health in their bodies, hearing, and sight.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-12",
        titleBengali: "সন্তানের দ্বীনদারীর জন্য দোয়া",
        titleEnglish: "For Child's Religiousness",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنْ حُفَّاظِ كِتَابِكَ وَالْعَامِلِينَ بِهِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের তোমার কিতাবের হাফেজ ও আমলকারীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among the memorizers and practitioners of Your Book.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-13",
        titleBengali: "সন্তানের রিজিকের জন্য দোয়া",
        titleEnglish: "For Child's Provision",
        arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي رِزْقًا حَلَالًا طَيِّبًا مُبَارَكًا",
        bengali: "হে আল্লাহ! আমার সন্তানদের হালাল, পবিত্র ও বরকতময় রিজিক দান কর।",
        english: "O Allah, provide my children with halal, pure, and blessed provision.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-14",
        titleBengali: "সন্তানের বিদ্যা অর্জনের দোয়া",
        titleEnglish: "For Child's Learning",
        arabic: "اللَّهُمَّ عَلِّمْ أَوْلَادِي مَا يَنْفَعُهُمْ وَانْفَعْهُمْ بِمَا عَلَّمْتَهُمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের উপকারী জ্ঞান শেখাও এবং তাদের শেখানো জ্ঞান দ্বারা তাদের উপকৃত কর।",
        english: "O Allah, teach my children what benefits them and benefit them with what You have taught them.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "children-15",
        titleBengali: "সন্তানের বদনজর থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Evil Eye",
        arabic: "أُعِيذُ أَوْلَادِي بِكَلِمَاتِ اللهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ",
        bengali: "আমি আমার সন্তানদের আল্লাহর পরিপূর্ণ বাণী দিয়ে সকল শয়তান ও বিষাক্ত প্রাণী থেকে আশ্রয় দিচ্ছি।",
        english: "I seek refuge for my children in Allah's perfect words from every devil and poisonous creature.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "children-16",
        titleBengali: "সন্তানের আখলাকের জন্য দোয়া",
        titleEnglish: "For Child's Manners",
        arabic: "اللَّهُمَّ حَسِّنْ أَخْلَاقَ أَوْلَادِي وَزَيِّنْهُمْ بِالتَّقْوَى",
        bengali: "হে আল্লাহ! আমার সন্তানদের চরিত্র সুন্দর কর এবং তাকওয়া দিয়ে তাদের সজ্জিত কর।",
        english: "O Allah, beautify the character of my children and adorn them with piety.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-17",
        titleBengali: "সন্তানের নিরাপত্তার দোয়া",
        titleEnglish: "For Child's Safety",
        arabic: "اللَّهُمَّ احْفَظْ أَوْلَادِي مِنْ بَيْنِ أَيْدِيهِمْ وَمِنْ خَلْفِهِمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের সামনে ও পিছন থেকে রক্ষা কর।",
        english: "O Allah, protect my children from before them and from behind them.",
        reference: "সূরা বাকারা ২:২৫৫"
      },
      {
        id: "children-18",
        titleBengali: "সন্তানের সফলতার দোয়া",
        titleEnglish: "For Child's Success",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنَ الْمُفْلِحِينَ فِي الدُّنْيَا وَالآخِرَةِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের দুনিয়া ও আখিরাতে সফলকামদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among the successful in this world and the Hereafter.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-19",
        titleBengali: "সন্তানের ভবিষ্যতের জন্য দোয়া",
        titleEnglish: "For Child's Future",
        arabic: "اللَّهُمَّ اجْعَلْ مُسْتَقْبَلَ أَوْلَادِي خَيْرًا مِنْ حَاضِرِهِمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের ভবিষ্যত তাদের বর্তমানের চেয়ে উত্তম কর।",
        english: "O Allah, make the future of my children better than their present.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-20",
        titleBengali: "সন্তানের হেদায়েতের দোয়া",
        titleEnglish: "For Child's Guidance",
        arabic: "اللَّهُمَّ اهْدِ أَوْلَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের তোমার সরল পথে পরিচালিত কর।",
        english: "O Allah, guide my children to Your straight path.",
        reference: "সূরা ফাতিহা ১:৬"
      },
      {
        id: "children-21",
        titleBengali: "সন্তানের তাকওয়ার দোয়া",
        titleEnglish: "For Child's Piety",
        arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي التَّقْوَى وَالْهُدَى وَالْعَفَافَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের তাকওয়া, হেদায়েত ও পবিত্রতা দান কর।",
        english: "O Allah, grant my children piety, guidance, and chastity.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "children-22",
        titleBengali: "সন্তানের ইলম বৃদ্ধির দোয়া",
        titleEnglish: "For Increase in Child's Knowledge",
        arabic: "رَبِّ زِدْ أَوْلَادِي عِلْمًا وَفَهْمًا وَحِكْمَةً",
        bengali: "হে আমার রব! আমার সন্তানদের জ্ঞান, বুঝ ও প্রজ্ঞা বৃদ্ধি কর।",
        english: "My Lord, increase my children in knowledge, understanding, and wisdom.",
        reference: "সূরা ত্বহা ২০:১১৪"
      },
      {
        id: "children-23",
        titleBengali: "সন্তানের স্মৃতিশক্তির দোয়া",
        titleEnglish: "For Child's Memory",
        arabic: "اللَّهُمَّ قَوِّ حِفْظَ أَوْلَادِي وَذَاكِرَتَهُمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের মুখস্থ শক্তি ও স্মৃতিশক্তি শক্তিশালী কর।",
        english: "O Allah, strengthen the memorization and memory of my children.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-24",
        titleBengali: "সন্তানের বন্ধু নির্বাচনের দোয়া",
        titleEnglish: "For Child's Good Friends",
        arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي رُفَقَاءَ صَالِحِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের সৎ বন্ধু দান কর।",
        english: "O Allah, grant my children righteous companions.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-25",
        titleBengali: "সন্তানকে ফিতনা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Fitnah",
        arabic: "اللَّهُمَّ احْفَظْ أَوْلَادِي مِنْ فِتَنِ الدُّنْيَا",
        bengali: "হে আল্লাহ! আমার সন্তানদের দুনিয়ার ফিতনা থেকে রক্ষা কর।",
        english: "O Allah, protect my children from the trials of this world.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-26",
        titleBengali: "সন্তানের সততার দোয়া",
        titleEnglish: "For Child's Honesty",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنَ الصَّادِقِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের সত্যবাদীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among the truthful.",
        reference: "সূরা তাওবা ৯:১১৯"
      },
      {
        id: "children-27",
        titleBengali: "সন্তানের কৃতজ্ঞতার দোয়া",
        titleEnglish: "For Child's Gratitude",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنَ الشَّاكِرِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের কৃতজ্ঞদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among the grateful.",
        reference: "সূরা আরাফ ৭:১৪৪"
      },
      {
        id: "children-28",
        titleBengali: "সন্তানের সবরের দোয়া",
        titleEnglish: "For Child's Patience",
        arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي الصَّبْرَ الْجَمِيلَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের সুন্দর ধৈর্য দান কর।",
        english: "O Allah, grant my children beautiful patience.",
        reference: "সূরা ইউসুফ ১২:১৮"
      },
      {
        id: "children-29",
        titleBengali: "সন্তানের তাওবার দোয়া",
        titleEnglish: "For Child's Repentance",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنَ التَّوَّابِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের তাওবাকারীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among those who repent.",
        reference: "সূরা বাকারা ২:২২২"
      },
      {
        id: "children-30",
        titleBengali: "সন্তানের আমানতদারীর দোয়া",
        titleEnglish: "For Child's Trustworthiness",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي أُمَنَاءَ عَلَى أَمَانَاتِهِمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের তাদের আমানতের উপর আমানতদার বানাও।",
        english: "O Allah, make my children trustworthy in their trusts.",
        reference: "সূরা মুমিনুন ২৩:৮"
      },
      {
        id: "children-31",
        titleBengali: "সন্তানের আদব শেখানোর দোয়া",
        titleEnglish: "For Teaching Child Manners",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى تَأْدِيبِ أَوْلَادِي",
        bengali: "হে আল্লাহ! আমার সন্তানদের আদব শেখাতে আমাকে সাহায্য কর।",
        english: "O Allah, help me in disciplining my children with good manners.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-32",
        titleBengali: "সন্তানের বিয়ের জন্য দোয়া",
        titleEnglish: "For Child's Marriage",
        arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي أَزْوَاجًا صَالِحِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের সৎ স্ত্রী/স্বামী দান কর।",
        english: "O Allah, grant my children righteous spouses.",
        reference: "সূরা ফুরকান ২৫:৭৪"
      },
      {
        id: "children-33",
        titleBengali: "সন্তানের কুরআন ভালোবাসার দোয়া",
        titleEnglish: "For Child's Love of Quran",
        arabic: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قُلُوبِ أَوْلَادِي",
        bengali: "হে আল্লাহ! কুরআনকে আমার সন্তানদের অন্তরের বসন্ত বানাও।",
        english: "O Allah, make the Quran the spring of my children's hearts.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "children-34",
        titleBengali: "সন্তানের নামাজের জন্য দোয়া",
        titleEnglish: "For Child's Prayer",
        arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي",
        bengali: "হে আমার রব! আমাকে ও আমার সন্তানদের নামাজ কায়েমকারী বানাও।",
        english: "My Lord, make me an establisher of prayer, and from my descendants.",
        reference: "সূরা ইবরাহীম ১৪:৪০"
      },
      {
        id: "children-35",
        titleBengali: "সন্তানের দুষ্টু থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Bad Influence",
        arabic: "اللَّهُمَّ احْفَظْ أَوْلَادِي مِنْ قُرَنَاءِ السُّوءِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের খারাপ সঙ্গীদের থেকে রক্ষা কর।",
        english: "O Allah, protect my children from bad companions.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-36",
        titleBengali: "সন্তানের মেধা বিকাশের দোয়া",
        titleEnglish: "For Child's Intelligence",
        arabic: "اللَّهُمَّ افْتَحْ عَلَى أَوْلَادِي فُتُوحَ الْعَارِفِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের উপর জ্ঞানীদের জ্ঞানের দ্বার খুলে দাও।",
        english: "O Allah, open for my children the openings of the knowledgeable.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-37",
        titleBengali: "সন্তানের পরীক্ষায় সাফল্যের দোয়া",
        titleEnglish: "For Child's Exam Success",
        arabic: "اللَّهُمَّ يَسِّرْ لِأَوْلَادِي امْتِحَانَاتِهِمْ وَوَفِّقْهُمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের পরীক্ষা সহজ কর ও তাদের তাওফীক দাও।",
        english: "O Allah, ease the exams for my children and grant them success.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-38",
        titleBengali: "সন্তানের ভালো স্বভাবের দোয়া",
        titleEnglish: "For Child's Good Nature",
        arabic: "اللَّهُمَّ طَيِّبْ قُلُوبَ أَوْلَادِي وَأَلْسِنَتَهُمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের অন্তর ও জিহ্বা পবিত্র কর।",
        english: "O Allah, purify the hearts and tongues of my children.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-39",
        titleBengali: "সন্তানের বাবা-মার সেবার দোয়া",
        titleEnglish: "For Child's Service to Parents",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي بَارِّينَ بِوَالِدَيْهِمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের পিতা-মাতার প্রতি অনুগত বানাও।",
        english: "O Allah, make my children dutiful to their parents.",
        reference: "সূরা ইসরা ১৭:২৩"
      },
      {
        id: "children-40",
        titleBengali: "সন্তানের দ্বীনের উপর স্থিরতার দোয়া",
        titleEnglish: "For Child's Steadfastness",
        arabic: "اللَّهُمَّ ثَبِّتْ أَوْلَادِي عَلَى دِينِكَ حَتَّى يَلْقَوْكَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের তোমার সাথে সাক্ষাতের পূর্ব পর্যন্ত দ্বীনের উপর অটল রাখ।",
        english: "O Allah, keep my children steadfast on Your religion until they meet You.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-41",
        titleBengali: "সন্তানের ঈমান রক্ষার দোয়া",
        titleEnglish: "For Protecting Child's Faith",
        arabic: "اللَّهُمَّ احْفَظْ إِيمَانَ أَوْلَادِي مِنَ الشُّبُهَاتِ وَالشَّهَوَاتِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের ঈমান সন্দেহ ও কুপ্রবৃত্তি থেকে রক্ষা কর।",
        english: "O Allah, protect my children's faith from doubts and desires.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-42",
        titleBengali: "সন্তানের বিনয়ের দোয়া",
        titleEnglish: "For Child's Humility",
        arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي التَّوَاضُعَ وَنَقِّهِمْ مِنَ الْكِبْرِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের বিনয় দান কর এবং অহংকার থেকে তাদের পবিত্র কর।",
        english: "O Allah, grant my children humility and purify them from arrogance.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "children-43",
        titleBengali: "সন্তানের কাজে বরকতের দোয়া",
        titleEnglish: "For Blessings in Child's Work",
        arabic: "اللَّهُمَّ بَارِكْ لِأَوْلَادِي فِي أَعْمَالِهِمْ وَأَوْقَاتِهِمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের কাজে ও সময়ে বরকত দাও।",
        english: "O Allah, bless my children in their works and their time.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-44",
        titleBengali: "সন্তানের দুঃখ দূর করার দোয়া",
        titleEnglish: "For Removing Child's Worries",
        arabic: "اللَّهُمَّ أَذْهِبْ عَنْ أَوْلَادِي الْهَمَّ وَالْغَمَّ وَالْحُزْنَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের থেকে চিন্তা, দুশ্চিন্তা ও দুঃখ দূর কর।",
        english: "O Allah, remove from my children worry, distress, and grief.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "children-45",
        titleBengali: "সন্তানের জান্নাতের দোয়া",
        titleEnglish: "For Child's Paradise",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنْ أَهْلِ الْجَنَّةِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের জান্নাতবাসীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among the people of Paradise.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-46",
        titleBengali: "সন্তানের জাহান্নাম থেকে মুক্তির দোয়া",
        titleEnglish: "For Child's Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْ أَوْلَادِي مِنَ النَّارِ",
        bengali: "হে আল্লাহ! আমার সন্তানদের জাহান্নাম থেকে রক্ষা কর।",
        english: "O Allah, protect my children from the Fire.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "children-47",
        titleBengali: "সন্তানের সুস্থ মন-মস্তিষ্কের দোয়া",
        titleEnglish: "For Child's Mental Health",
        arabic: "اللَّهُمَّ اشْرَحْ صُدُورَ أَوْلَادِي وَيَسِّرْ أُمُورَهُمْ",
        bengali: "হে আল্লাহ! আমার সন্তানদের বুক প্রশস্ত কর এবং তাদের কাজ সহজ কর।",
        english: "O Allah, expand the chests of my children and ease their affairs.",
        reference: "সূরা ত্বহা ২০:২৫"
      },
      {
        id: "children-48",
        titleBengali: "সন্তানকে সদকায়ে জারিয়া বানানোর দোয়া",
        titleEnglish: "For Child as Ongoing Charity",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي صَدَقَةً جَارِيَةً لِي",
        bengali: "হে আল্লাহ! আমার সন্তানদের আমার জন্য সদকায়ে জারিয়া বানাও।",
        english: "O Allah, make my children an ongoing charity for me.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "children-49",
        titleBengali: "সন্তানের দোয়া কবুলের দোয়া",
        titleEnglish: "For Acceptance of Child's Prayers",
        arabic: "اللَّهُمَّ اسْتَجِبْ دُعَاءَ أَوْلَادِي وَلَا تَرُدَّهُمْ خَائِبِينَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের দোয়া কবুল কর এবং তাদের নিরাশ করে ফিরিও না।",
        english: "O Allah, accept my children's prayers and do not turn them back disappointed.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "children-50",
        titleBengali: "সন্তানের উম্মতে মুহাম্মাদী হওয়ার দোয়া",
        titleEnglish: "For Child as Part of Prophet's Ummah",
        arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنْ خَيْرِ أُمَّةِ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
        bengali: "হে আল্লাহ! আমার সন্তানদের মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) এর উম্মতের সেরাদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make my children among the best of the Ummah of Muhammad (peace be upon him).",
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
      },
      {
        id: "travel-11",
        titleBengali: "সফরে বরকতের দোয়া",
        titleEnglish: "For Blessings in Travel",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي سَفَرِنَا هَذَا",
        bengali: "হে আল্লাহ! আমাদের এই সফরে বরকত দাও।",
        english: "O Allah, bless us in this journey of ours.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-12",
        titleBengali: "সফরে নিরাপত্তার দোয়া",
        titleEnglish: "For Safety in Travel",
        arabic: "اللَّهُمَّ احْفَظْنَا فِي سَفَرِنَا وَفِي حَضَرِنَا",
        bengali: "হে আল্লাহ! আমাদের সফরে ও বাড়িতে রক্ষা কর।",
        english: "O Allah, protect us in our travel and at our residence.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-13",
        titleBengali: "ঘর থেকে বের হওয়ার দোয়া",
        titleEnglish: "When Leaving Home",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
        bengali: "আল্লাহর নামে, আল্লাহর উপর ভরসা করলাম। আল্লাহর সাহায্য ছাড়া কোনো উপায় ও শক্তি নেই।",
        english: "In the name of Allah, I place my trust in Allah. There is no might and no power except with Allah.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "travel-14",
        titleBengali: "পরিবারকে বিদায় জানানোর দোয়া",
        titleEnglish: "Farewell to Family",
        arabic: "أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لاَ تَضِيعُ وَدَائِعُهُ",
        bengali: "আমি তোমাদের সেই আল্লাহর কাছে সোপর্দ করছি যার আমানত কখনো নষ্ট হয় না।",
        english: "I entrust you to Allah, whose trusts are never lost.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "travel-15",
        titleBengali: "মুসাফিরকে বিদায় জানানোর দোয়া",
        titleEnglish: "Farewell to Traveler",
        arabic: "أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ",
        bengali: "আমি তোমার দ্বীন, আমানত ও শেষ আমলকে আল্লাহর কাছে সোপর্দ করছি।",
        english: "I entrust to Allah your religion, your trust, and your final deeds.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "travel-16",
        titleBengali: "সাগর/নদী পার হওয়ার দোয়া",
        titleEnglish: "When Crossing Water",
        arabic: "بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَّحِيمٌ",
        bengali: "আল্লাহর নামে এর চলা এবং থামা। নিশ্চয়ই আমার রব অতি ক্ষমাশীল, অতি দয়ালু।",
        english: "In the name of Allah is its course and its anchorage. Indeed, my Lord is Forgiving and Merciful.",
        reference: "সূরা হুদ ১১:৪১"
      },
      {
        id: "travel-17",
        titleBengali: "উঁচু জায়গায় উঠার সময়",
        titleEnglish: "When Ascending",
        arabic: "اللهُ أَكْبَرُ",
        bengali: "আল্লাহ সবচেয়ে বড়। (উঁচু জায়গায় উঠার সময়)",
        english: "Allah is the Greatest. (When ascending)",
        reference: "সহীহ বুখারী"
      },
      {
        id: "travel-18",
        titleBengali: "নিচু জায়গায় নামার সময়",
        titleEnglish: "When Descending",
        arabic: "سُبْحَانَ اللَّهِ",
        bengali: "আল্লাহ পবিত্র। (নিচু জায়গায় নামার সময়)",
        english: "Glory be to Allah. (When descending)",
        reference: "সহীহ বুখারী"
      },
      {
        id: "travel-19",
        titleBengali: "নতুন শহরে প্রবেশের দোয়া",
        titleEnglish: "When Entering a City",
        arabic: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ وَرَبَّ الأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا",
        bengali: "হে আল্লাহ! সাত আসমান ও যা তারা ছায়া দেয় তার রব, সাত জমিন ও যা তারা বহন করে তার রব, আমি তোমার কাছে এই শহরের কল্যাণ ও এর অধিবাসীদের কল্যাণ চাই।",
        english: "O Allah, Lord of the seven heavens and what they shade, Lord of the seven earths and what they carry, I ask You for the good of this town and the good of its people.",
        reference: "মুসতাদরাক হাকিম"
      },
      {
        id: "travel-20",
        titleBengali: "রাতে সফরের দোয়া",
        titleEnglish: "For Night Travel",
        arabic: "يَا أَرْضُ رَبِّي وَرَبُّكِ اللَّهُ",
        bengali: "হে জমিন! আমার রব এবং তোমার রব আল্লাহ।",
        english: "O earth, my Lord and your Lord is Allah.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "travel-21",
        titleBengali: "সফরে ক্লান্তি দূরের দোয়া",
        titleEnglish: "For Relief from Travel Fatigue",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى وَعْثَاءِ السَّفَرِ",
        bengali: "হে আল্লাহ! সফরের কষ্টে আমাকে সাহায্য কর।",
        english: "O Allah, help me with the hardship of travel.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-22",
        titleBengali: "একা সফরের দোয়া",
        titleEnglish: "For Traveling Alone",
        arabic: "اللَّهُمَّ أَنْتَ صَاحِبِي فِي السَّفَرِ",
        bengali: "হে আল্লাহ! তুমিই আমার সফরের সঙ্গী।",
        english: "O Allah, You are my companion in travel.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-23",
        titleBengali: "পরিবারের খবরের দোয়া",
        titleEnglish: "For News of Family",
        arabic: "اللَّهُمَّ احْفَظْ أَهْلِي فِي غَيْبَتِي",
        bengali: "হে আল্লাহ! আমার অনুপস্থিতিতে আমার পরিবারকে রক্ষা কর।",
        english: "O Allah, protect my family in my absence.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-24",
        titleBengali: "সফরে রিজিকের দোয়া",
        titleEnglish: "For Provision in Travel",
        arabic: "اللَّهُمَّ ارْزُقْنِي فِي سَفَرِي رِزْقًا حَلَالًا",
        bengali: "হে আল্লাহ! আমার সফরে আমাকে হালাল রিজিক দান কর।",
        english: "O Allah, provide me with halal provision in my travel.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-25",
        titleBengali: "সফরে স্বাস্থ্যের দোয়া",
        titleEnglish: "For Health in Travel",
        arabic: "اللَّهُمَّ عَافِنِي فِي سَفَرِي",
        bengali: "হে আল্লাহ! আমার সফরে আমাকে সুস্থতা দাও।",
        english: "O Allah, grant me health in my travel.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-26",
        titleBengali: "বিমানে উড্ডয়নের দোয়া",
        titleEnglish: "During Takeoff",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
        bengali: "পবিত্র সেই সত্তা যিনি একে আমাদের বশীভূত করে দিয়েছেন, অন্যথায় আমরা একে বশ করতে সক্ষম ছিলাম না।",
        english: "How perfect He is, The One Who has placed this at our service, and we ourselves would not have been capable of that.",
        reference: "সূরা যুখরুফ ৪৩:১৩"
      },
      {
        id: "travel-27",
        titleBengali: "বিমান অবতরণের দোয়া",
        titleEnglish: "During Landing",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        bengali: "সমস্ত প্রশংসা আল্লাহর জন্য যার অনুগ্রহে সকল ভালো কাজ সম্পন্ন হয়।",
        english: "All praise is for Allah, by Whose grace all good things are accomplished.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "travel-28",
        titleBengali: "ট্রেনে চড়ার দোয়া",
        titleEnglish: "When Boarding Train",
        arabic: "بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
        bengali: "আল্লাহর নামে এবং সমস্ত প্রশংসা আল্লাহর জন্য। পবিত্র সেই সত্তা যিনি একে আমাদের বশীভূত করেছেন।",
        english: "In the name of Allah, all praise is for Allah. Glory be to Him who has placed this at our service.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "travel-29",
        titleBengali: "নৌকায় চড়ার দোয়া",
        titleEnglish: "When Boarding Boat",
        arabic: "بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا",
        bengali: "আল্লাহর নামে এর চলা এবং থামা।",
        english: "In the name of Allah is its course and its anchorage.",
        reference: "সূরা হুদ ১১:৪১"
      },
      {
        id: "travel-30",
        titleBengali: "সফর শেষে শুকরিয়া",
        titleEnglish: "Gratitude After Travel",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي سَلَّمَنَا وَعَافَانَا",
        bengali: "সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাদের নিরাপদ ও সুস্থ রেখেছেন।",
        english: "All praise is for Allah who kept us safe and healthy.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-31",
        titleBengali: "বাড়ি ফেরার দোয়া",
        titleEnglish: "Upon Returning Home",
        arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
        bengali: "আমরা প্রত্যাবর্তনকারী, তাওবাকারী, ইবাদতকারী এবং আমাদের রবের প্রশংসাকারী।",
        english: "We are returning, repenting, worshipping, and praising our Lord.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-32",
        titleBengali: "হোটেলে প্রবেশের দোয়া",
        titleEnglish: "When Entering Hotel",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-33",
        titleBengali: "পথের নিরাপত্তার দোয়া",
        titleEnglish: "For Road Safety",
        arabic: "اللَّهُمَّ احْفَظْنِي فِي الطَّرِيقِ",
        bengali: "হে আল্লাহ! পথে আমাকে রক্ষা কর।",
        english: "O Allah, protect me on the road.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-34",
        titleBengali: "দুর্ঘটনা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Accidents",
        arabic: "اللَّهُمَّ سَلِّمْنَا مِنْ كُلِّ حَادِثٍ",
        bengali: "হে আল্লাহ! সকল দুর্ঘটনা থেকে আমাদের রক্ষা কর।",
        english: "O Allah, save us from every accident.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-35",
        titleBengali: "চোর-ডাকাত থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Thieves",
        arabic: "اللَّهُمَّ احْفَظْنَا مِنَ اللُّصُوصِ وَقُطَّاعِ الطَّرِيقِ",
        bengali: "হে আল্লাহ! চোর ও ডাকাতদের থেকে আমাদের রক্ষা কর।",
        english: "O Allah, protect us from thieves and highway robbers.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-36",
        titleBengali: "সফরের উদ্দেশ্য পূর্ণ হওয়ার দোয়া",
        titleEnglish: "For Fulfilling Travel Purpose",
        arabic: "اللَّهُمَّ يَسِّرْ لِي مَا سَافَرْتُ لَهُ",
        bengali: "হে আল্লাহ! যে উদ্দেশ্যে সফর করেছি তা আমার জন্য সহজ কর।",
        english: "O Allah, make easy for me what I have traveled for.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-37",
        titleBengali: "সফরে বদনজর থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Evil Eye in Travel",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ عَيْنٍ لَامَّةٍ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে প্রতিটি ক্ষতিকর বদনজর থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from every harmful evil eye.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "travel-38",
        titleBengali: "সফরে একাকীত্ব দূরের দোয়া",
        titleEnglish: "For Companionship in Travel",
        arabic: "اللَّهُمَّ آنِسْنِي فِي وَحْشَتِي",
        bengali: "হে আল্লাহ! আমার একাকীত্বে আমাকে সান্ত্বনা দাও।",
        english: "O Allah, comfort me in my loneliness.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-39",
        titleBengali: "সফরে খাবারের দোয়া",
        titleEnglish: "For Food in Travel",
        arabic: "اللَّهُمَّ ارْزُقْنَا طَعَامًا طَيِّبًا فِي سَفَرِنَا",
        bengali: "হে আল্লাহ! আমাদের সফরে ভালো খাবার দান কর।",
        english: "O Allah, provide us with good food in our travel.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-40",
        titleBengali: "সফরে বিশ্রামের দোয়া",
        titleEnglish: "For Rest in Travel",
        arabic: "اللَّهُمَّ أَرِحْنَا فِي سَفَرِنَا",
        bengali: "হে আল্লাহ! আমাদের সফরে বিশ্রাম দাও।",
        english: "O Allah, give us rest in our travel.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-41",
        titleBengali: "সফরে নামাজের দোয়া",
        titleEnglish: "For Prayer in Travel",
        arabic: "اللَّهُمَّ يَسِّرْ لِي الصَّلَاةَ فِي سَفَرِي",
        bengali: "হে আল্লাহ! আমার সফরে নামাজ সহজ কর।",
        english: "O Allah, make prayer easy for me in my travel.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "travel-42",
        titleBengali: "মক্কায় প্রবেশের দোয়া",
        titleEnglish: "When Entering Makkah",
        arabic: "اللَّهُمَّ هَذَا حَرَمُكَ وَأَمْنُكَ فَحَرِّمْنِي عَلَى النَّارِ",
        bengali: "হে আল্লাহ! এটা তোমার হারাম ও নিরাপত্তার স্থান, তাই আমাকে জাহান্নামের উপর হারাম কর।",
        english: "O Allah, this is Your sanctuary and place of safety, so make me forbidden to the Fire.",
        reference: "মুসতাদরাক হাকিম"
      },
      {
        id: "travel-43",
        titleBengali: "মদিনায় প্রবেশের দোয়া",
        titleEnglish: "When Entering Madinah",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        bengali: "হে আল্লাহ! তোমার রহমতের দরজাগুলো আমার জন্য খুলে দাও।",
        english: "O Allah, open for me the doors of Your mercy.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-44",
        titleBengali: "কাবা দেখার দোয়া",
        titleEnglish: "Upon Seeing the Kaaba",
        arabic: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً",
        bengali: "হে আল্লাহ! এই ঘরের সম্মান, মর্যাদা, মাহাত্ম্য ও ভয়-ভক্তি বৃদ্ধি কর।",
        english: "O Allah, increase this House in honor, esteem, nobility, and reverence.",
        reference: "বাইহাকী"
      },
      {
        id: "travel-45",
        titleBengali: "তাওয়াফের দোয়া",
        titleEnglish: "During Tawaf",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the Fire.",
        reference: "সূরা বাকারা ২:২০১"
      },
      {
        id: "travel-46",
        titleBengali: "সাফা-মারওয়ার দোয়া",
        titleEnglish: "At Safa and Marwa",
        arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
        bengali: "নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত।",
        english: "Indeed, Safa and Marwa are among the symbols of Allah.",
        reference: "সূরা বাকারা ২:১৫৮"
      },
      {
        id: "travel-47",
        titleBengali: "আরাফাতের দোয়া",
        titleEnglish: "At Arafat",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই, রাজত্ব তাঁরই, প্রশংসাও তাঁরই এবং তিনি সবকিছুর উপর ক্ষমতাবান।",
        english: "There is no deity except Allah alone with no partner. To Him belongs dominion and praise, and He is over all things Capable.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "travel-48",
        titleBengali: "মুজদালিফায় রাত্রিযাপনের দোয়া",
        titleEnglish: "At Muzdalifah",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ أَنْ تَرْزُقَنِي جَوَامِعَ الْخَيْرِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে সামগ্রিক কল্যাণ প্রার্থনা করছি।",
        english: "O Allah, I ask You to grant me comprehensive goodness.",
        reference: "মুসতাদরাক হাকিম"
      },
      {
        id: "travel-49",
        titleBengali: "মিনায় পাথর মারার দোয়া",
        titleEnglish: "When Throwing Stones at Mina",
        arabic: "اللَّهُ أَكْبَرُ",
        bengali: "আল্লাহ সবচেয়ে বড়। (প্রতিটি পাথর মারার সময়)",
        english: "Allah is the Greatest. (With each stone)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "travel-50",
        titleBengali: "যমযম পানির দোয়া",
        titleEnglish: "When Drinking Zamzam",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, প্রশস্ত রিজিক এবং সব রোগ থেকে আরোগ্য প্রার্থনা করছি।",
        english: "O Allah, I ask You for beneficial knowledge, abundant provision, and cure from every disease.",
        reference: "মুসতাদরাক হাকিম"
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
      },
      {
        id: "hardship-11",
        titleBengali: "ভয়ের সময় দোয়া",
        titleEnglish: "When Afraid",
        arabic: "اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ",
        bengali: "হে আল্লাহ! আমরা তোমাকে তাদের বিরুদ্ধে সামনে রাখছি এবং তাদের অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, we place You before them and we seek refuge in You from their evil.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-12",
        titleBengali: "দুশ্চিন্তা দূরের দোয়া",
        titleEnglish: "For Removing Worry",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        bengali: "হে আল্লাহ! আমি দুশ্চিন্তা ও দুঃখ থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from worry and grief.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-13",
        titleBengali: "অক্ষমতা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Incapacity",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
        bengali: "হে আল্লাহ! আমি অক্ষমতা ও অলসতা থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from incapacity and laziness.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-14",
        titleBengali: "কাপুরুষতা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Cowardice",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
        bengali: "হে আল্লাহ! আমি কাপুরুষতা ও কৃপণতা থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from cowardice and miserliness.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-15",
        titleBengali: "ঋণের বোঝা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Debt",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ ضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
        bengali: "হে আল্লাহ! আমি ঋণের বোঝা ও মানুষের আধিপত্য থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the burden of debt and the overpowering of men.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-16",
        titleBengali: "শত্রু থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Enemies",
        arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
        bengali: "হে আল্লাহ! তুমি যেভাবে চাও তাদের থেকে আমাকে রক্ষা কর।",
        english: "O Allah, suffice me against them however You will.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-17",
        titleBengali: "অত্যাচারীর বিরুদ্ধে দোয়া",
        titleEnglish: "Against Oppressors",
        arabic: "اللَّهُمَّ مُنْزِلَ الْكِتَابِ سَرِيعَ الْحِسَابِ اهْزِمِ الأَحْزَابَ",
        bengali: "হে আল্লাহ! কিতাব অবতীর্ণকারী, দ্রুত হিসাব গ্রহণকারী, দলগুলোকে পরাজিত কর।",
        english: "O Allah, Revealer of the Book, Swift in reckoning, defeat the confederates.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-18",
        titleBengali: "রোগ থেকে আরোগ্যের দোয়া",
        titleEnglish: "For Recovery from Illness",
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِهِ وَأَنْتَ الشَّافِي لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ",
        bengali: "হে আল্লাহ! মানুষের রব, কষ্ট দূর কর, তাকে আরোগ্য দাও। তুমিই আরোগ্যদানকারী, তোমার আরোগ্য ছাড়া কোনো আরোগ্য নেই।",
        english: "O Allah, Lord of mankind, remove the hardship and heal. You are the Healer, there is no healing except Your healing.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-19",
        titleBengali: "ব্যথায় পড়ার দোয়া",
        titleEnglish: "When in Pain",
        arabic: "أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
        bengali: "আমি আল্লাহর ইজ্জত ও কুদরতের আশ্রয় চাই আমি যা অনুভব করছি ও যা আশংকা করছি তার অনিষ্ট থেকে।",
        english: "I seek refuge in Allah's might and power from the evil of what I feel and what I fear.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-20",
        titleBengali: "বিপদ থেকে মুক্তির দোয়া",
        titleEnglish: "For Deliverance from Calamity",
        arabic: "لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        bengali: "তুমি ছাড়া কোনো ইলাহ নেই, তুমি পবিত্র, নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।",
        english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        reference: "সূরা আম্বিয়া ২১:৮৭"
      },
      {
        id: "hardship-21",
        titleBengali: "অসুস্থ ব্যক্তির জন্য দোয়া",
        titleEnglish: "For the Sick Person",
        arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        bengali: "আমি মহান আল্লাহর কাছে, মহান আরশের রবের কাছে প্রার্থনা করছি তিনি যেন তোমাকে আরোগ্য দান করেন।",
        english: "I ask Allah the Almighty, Lord of the Magnificent Throne, to cure you.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-22",
        titleBengali: "মৃত্যুর সময় দোয়া",
        titleEnglish: "At Time of Death",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى غَمَرَاتِ الْمَوْتِ وَسَكَرَاتِ الْمَوْتِ",
        bengali: "হে আল্লাহ! মৃত্যুর কষ্ট ও মৃত্যুর যন্ত্রণায় আমাকে সাহায্য কর।",
        english: "O Allah, help me with the agonies and throes of death.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "hardship-23",
        titleBengali: "কবরের আযাব থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Grave's Punishment",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
        bengali: "হে আল্লাহ! আমি কবরের আযাব থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the punishment of the grave.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-24",
        titleBengali: "দাজ্জালের ফিতনা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Dajjal's Trial",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        bengali: "হে আল্লাহ! আমি মাসীহ দাজ্জালের ফিতনা থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the trial of the Antichrist.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-25",
        titleBengali: "জীবন ও মৃত্যুর ফিতনা থেকে রক্ষা",
        titleEnglish: "Protection from Life's Trials",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
        bengali: "হে আল্লাহ! আমি জীবন ও মৃত্যুর ফিতনা থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the trials of life and death.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-26",
        titleBengali: "ঝড়ের সময় দোয়া",
        titleEnglish: "During Storm",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا",
        bengali: "হে আল্লাহ! আমি এর কল্যাণ চাই এবং এর অনিষ্ট থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I ask You for its good and I seek refuge in You from its evil.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-27",
        titleBengali: "বজ্রপাতের সময় দোয়া",
        titleEnglish: "During Thunder",
        arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلاَئِكَةُ مِنْ خِيفَتِهِ",
        bengali: "পবিত্র সেই সত্তা যার প্রশংসায় বজ্র তাসবীহ পাঠ করে এবং ফেরেশতারা তাঁর ভয়ে কাঁপে।",
        english: "Glory be to Him Whom thunder glorifies with His praise, and the angels from His fear.",
        reference: "মুওয়াত্তা ইমাম মালিক"
      },
      {
        id: "hardship-28",
        titleBengali: "বৃষ্টিতে দোয়া",
        titleEnglish: "During Rain",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        bengali: "হে আল্লাহ! উপকারী বৃষ্টি দাও।",
        english: "O Allah, make it beneficial rain.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-29",
        titleBengali: "অতিরিক্ত বৃষ্টিতে দোয়া",
        titleEnglish: "For Excessive Rain",
        arabic: "اللَّهُمَّ حَوَالَيْنَا وَلاَ عَلَيْنَا",
        bengali: "হে আল্লাহ! আমাদের আশেপাশে (বর্ষণ কর), আমাদের উপর নয়।",
        english: "O Allah, around us and not upon us.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-30",
        titleBengali: "দুর্ভিক্ষে দোয়া",
        titleEnglish: "During Famine",
        arabic: "اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا مَرِيعًا نَافِعًا غَيْرَ ضَارٍّ",
        bengali: "হে আল্লাহ! আমাদের সাহায্যকারী, সুস্বাদু, উর্বরকারী, উপকারী এবং ক্ষতিহীন বৃষ্টি দাও।",
        english: "O Allah, give us rain that is helping, pleasant, producing fertility, beneficial, and not harmful.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-31",
        titleBengali: "ভূমিকম্পে দোয়া",
        titleEnglish: "During Earthquake",
        arabic: "اللَّهُمَّ لَا تُهْلِكْنَا بِعَذَابِكَ وَلَا تُهْلِكْنَا قَبْلَهُ",
        bengali: "হে আল্লাহ! তোমার আযাব দিয়ে আমাদের ধ্বংস করো না এবং এর আগেও আমাদের ধ্বংস করো না।",
        english: "O Allah, do not destroy us with Your punishment and do not destroy us before it.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "hardship-32",
        titleBengali: "আগুন লাগলে দোয়া",
        titleEnglish: "During Fire",
        arabic: "اللهُ أَكْبَرُ",
        bengali: "আল্লাহ সবচেয়ে বড়। (আগুন দেখলে বলুন)",
        english: "Allah is the Greatest. (Say when seeing fire)",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "hardship-33",
        titleBengali: "বন্যায় দোয়া",
        titleEnglish: "During Flood",
        arabic: "اللَّهُمَّ سَلِّمْنَا مِنَ الْغَرَقِ",
        bengali: "হে আল্লাহ! ডুবে যাওয়া থেকে আমাদের রক্ষা কর।",
        english: "O Allah, save us from drowning.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "hardship-34",
        titleBengali: "মহামারীতে দোয়া",
        titleEnglish: "During Epidemic",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ وَالْجُنُونِ وَالْجُذَامِ وَمِنْ سَيِّئِ الأَسْقَامِ",
        bengali: "হে আল্লাহ! আমি শ্বেতরোগ, পাগলামি, কুষ্ঠরোগ এবং সব খারাপ রোগ থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from leprosy, madness, elephantiasis, and evil diseases.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-35",
        titleBengali: "দুঃস্বপ্ন দেখলে দোয়া",
        titleEnglish: "After Nightmare",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِينِ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর ক্রোধ, শাস্তি, তাঁর বান্দাদের অনিষ্ট এবং শয়তানের প্ররোচনা থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from His anger, punishment, evil of His servants, and from the whispers of devils.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-36",
        titleBengali: "ঘুমে ভয় পেলে দোয়া",
        titleEnglish: "When Afraid During Sleep",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ غَضَبِهِ وَشَرِّ عِبَادِهِ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীর মাধ্যমে তাঁর ক্রোধ ও তাঁর বান্দাদের অনিষ্ট থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from His anger and the evil of His servants.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "hardship-37",
        titleBengali: "একাকীত্বে দোয়া",
        titleEnglish: "During Loneliness",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        bengali: "হে চিরঞ্জীব! হে সবকিছুর ধারক! তোমার রহমতের মাধ্যমে আমি সাহায্য প্রার্থনা করি।",
        english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "hardship-38",
        titleBengali: "হতাশায় দোয়া",
        titleEnglish: "During Despair",
        arabic: "لاَ تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
        bengali: "আল্লাহর রহমত থেকে নিরাশ হয়ো না। নিশ্চয়ই আল্লাহ সমস্ত গুনাহ ক্ষমা করেন।",
        english: "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins.",
        reference: "সূরা যুমার ৩৯:৫৩"
      },
      {
        id: "hardship-39",
        titleBengali: "রাগের সময় দোয়া",
        titleEnglish: "When Angry",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই।",
        english: "I seek refuge in Allah from the accursed Satan.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-40",
        titleBengali: "ঘৃণা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Hatred",
        arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ الْغِلِّ وَالْحِقْدِ",
        bengali: "হে আল্লাহ! আমার অন্তরকে বিদ্বেষ ও ঘৃণা থেকে পবিত্র কর।",
        english: "O Allah, purify my heart from malice and hatred.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "hardship-41",
        titleBengali: "হিংসা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Envy",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْحَسَدِ",
        bengali: "হে আল্লাহ! আমি হিংসা থেকে তোমার আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from envy.",
        reference: "সূরা ফালাক ১১৩:৫"
      },
      {
        id: "hardship-42",
        titleBengali: "যাদু থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Magic",
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "বল, আমি ভোরের রবের আশ্রয় চাই, তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে।",
        english: "Say, I seek refuge in the Lord of daybreak, from the evil of that which He created.",
        reference: "সূরা ফালাক ১১৩:১-২"
      },
      {
        id: "hardship-43",
        titleBengali: "জিনের ক্ষতি থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Jinn",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির সকল অনিষ্ট থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "hardship-44",
        titleBengali: "বদনজর থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Evil Eye",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لاَمَّةٍ",
        bengali: "আমি আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে প্রতিটি শয়তান, বিষাক্ত প্রাণী এবং ক্ষতিকর বদনজর থেকে আশ্রয় চাই।",
        english: "I seek refuge in the perfect words of Allah from every devil, poisonous creature, and every harmful evil eye.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "hardship-45",
        titleBengali: "বিচার দিনের ভয়ে দোয়া",
        titleEnglish: "Fear of Judgment Day",
        arabic: "رَبَّنَا لاَ تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لاَ تُخْلِفُ الْمِيعَادَ",
        bengali: "হে আমাদের রব! কিয়ামতের দিন আমাদের লজ্জিত করো না। নিশ্চয়ই তুমি ওয়াদার খেলাফ কর না।",
        english: "Our Lord, do not disgrace us on the Day of Resurrection. Indeed, You do not fail in Your promise.",
        reference: "সূরা আলে ইমরান ৩:১৯৪"
      },
      {
        id: "hardship-46",
        titleBengali: "অপমান থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Disgrace",
        arabic: "رَبِّ لاَ تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ",
        bengali: "হে আমার রব! আমাকে একা রেখো না, তুমি তো সর্বোত্তম উত্তরাধিকারী।",
        english: "My Lord, do not leave me alone, and You are the best of inheritors.",
        reference: "সূরা আম্বিয়া ২১:৮৯"
      },
      {
        id: "hardship-47",
        titleBengali: "কঠিন পরীক্ষায় দোয়া",
        titleEnglish: "During Severe Test",
        arabic: "اللَّهُمَّ لاَ تَجْعَلْ مُصِيبَتَنَا فِي دِينِنَا",
        bengali: "হে আল্লাহ! আমাদের বিপদ আমাদের দ্বীনে দিও না।",
        english: "O Allah, do not make our calamity in our religion.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "hardship-48",
        titleBengali: "সবরের জন্য দোয়া",
        titleEnglish: "For Patience",
        arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
        bengali: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দাও এবং আমাদের মুসলিম হিসেবে মৃত্যু দাও।",
        english: "Our Lord, pour upon us patience and let us die as Muslims.",
        reference: "সূরা আরাফ ৭:১২৬"
      },
      {
        id: "hardship-49",
        titleBengali: "সুন্দর পরিণতির দোয়া",
        titleEnglish: "For Good End",
        arabic: "اللَّهُمَّ اجْعَلْ خَيْرَ أَعْمَالِنَا خَوَاتِيمَهَا",
        bengali: "হে আল্লাহ! আমাদের শেষ আমলকে সর্বোত্তম আমল বানাও।",
        english: "O Allah, make our best deeds our final deeds.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "hardship-50",
        titleBengali: "সব বিপদ থেকে মুক্তির সামগ্রিক দোয়া",
        titleEnglish: "Comprehensive Protection Dua",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ وَفُجَاءَةِ نِقْمَتِكَ وَجَمِيعِ سَخَطِكَ",
        bengali: "হে আল্লাহ! আমি তোমার নিয়ামত চলে যাওয়া থেকে, তোমার আফিয়াত পরিবর্তন থেকে, তোমার হঠাৎ শাস্তি থেকে এবং তোমার সকল অসন্তুষ্টি থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the decline of Your blessings, the change of Your protection, Your sudden punishment, and all of Your displeasure.",
        reference: "সহীহ মুসলিম"
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
      },
      {
        id: "akhirah-11",
        titleBengali: "হাউজে কাউসারের দোয়া",
        titleEnglish: "For Drink from Kawthar",
        arabic: "اللَّهُمَّ اسْقِنَا مِنْ حَوْضِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
        bengali: "হে আল্লাহ! আমাদের তোমার নবী মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) এর হাউজ থেকে পান করাও।",
        english: "O Allah, give us to drink from the pool of Your Prophet Muhammad (peace be upon him).",
        reference: "সহীহ বুখারী"
      },
      {
        id: "akhirah-12",
        titleBengali: "নবীজির প্রতিবেশী হওয়ার দোয়া",
        titleEnglish: "For Being Prophet's Neighbor",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِنْ جِيرَانِ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فِي الْجَنَّةِ",
        bengali: "হে আল্লাহ! আমাকে জান্নাতে মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) এর প্রতিবেশী বানাও।",
        english: "O Allah, make me among the neighbors of Muhammad (peace be upon him) in Paradise.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "akhirah-13",
        titleBengali: "নবীজির শাফায়াতের দোয়া",
        titleEnglish: "For Prophet's Intercession",
        arabic: "اللَّهُمَّ ارْزُقْنِي شَفَاعَةَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ يَوْمَ الْقِيَامَةِ",
        bengali: "হে আল্লাহ! আমাকে কিয়ামতের দিন মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) এর শাফায়াত দান কর।",
        english: "O Allah, grant me the intercession of Muhammad (peace be upon him) on the Day of Judgment.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "akhirah-14",
        titleBengali: "সুন্দর মৃত্যুর দোয়া",
        titleEnglish: "For Beautiful Death",
        arabic: "اللَّهُمَّ اجْعَلْ خَاتِمَتِي حُسْنًا",
        bengali: "হে আল্লাহ! আমার শেষ পরিণতি সুন্দর কর।",
        english: "O Allah, make my ending beautiful.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-15",
        titleBengali: "ঈমানের সাথে মৃত্যুর দোয়া",
        titleEnglish: "For Dying with Faith",
        arabic: "اللَّهُمَّ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        bengali: "হে আল্লাহ! আমাকে মুসলিম হিসেবে মৃত্যু দাও এবং সৎকর্মশীলদের সাথে মিলিত কর।",
        english: "O Allah, cause me to die as a Muslim and join me with the righteous.",
        reference: "সূরা ইউসুফ ১২:১০১"
      },
      {
        id: "akhirah-16",
        titleBengali: "কবরে সুখের দোয়া",
        titleEnglish: "For Comfort in Grave",
        arabic: "اللَّهُمَّ اجْعَلْ قَبْرِي رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ",
        bengali: "হে আল্লাহ! আমার কবরকে জান্নাতের বাগানসমূহের একটি বাগান বানাও।",
        english: "O Allah, make my grave a garden from the gardens of Paradise.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "akhirah-17",
        titleBengali: "কবরে আলোর দোয়া",
        titleEnglish: "For Light in Grave",
        arabic: "اللَّهُمَّ نَوِّرْ لِي قَبْرِي",
        bengali: "হে আল্লাহ! আমার কবরকে আলোকিত কর।",
        english: "O Allah, illuminate my grave.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-18",
        titleBengali: "কবরে প্রশস্ততার দোয়া",
        titleEnglish: "For Spacious Grave",
        arabic: "اللَّهُمَّ وَسِّعْ لِي فِي قَبْرِي",
        bengali: "হে আল্লাহ! আমার কবরকে প্রশস্ত কর।",
        english: "O Allah, make my grave spacious for me.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "akhirah-19",
        titleBengali: "মুনকার-নাকীরের প্রশ্নে সঠিক উত্তরের দোয়া",
        titleEnglish: "For Answering Angels' Questions",
        arabic: "اللَّهُمَّ ثَبِّتْنِي عِنْدَ سُؤَالِ الْمَلَكَيْنِ",
        bengali: "হে আল্লাহ! দুই ফেরেশতার প্রশ্নের সময় আমাকে স্থির রাখ।",
        english: "O Allah, keep me steadfast when the two angels question me.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-20",
        titleBengali: "হাশরের মাঠে সহজতার দোয়া",
        titleEnglish: "For Ease on Day of Gathering",
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيَّ يَوْمَ الْحَشْرِ",
        bengali: "হে আল্লাহ! হাশরের দিন আমার জন্য সহজ কর।",
        english: "O Allah, make the Day of Gathering easy for me.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-21",
        titleBengali: "আমলনামা ডান হাতে পাওয়ার দোয়া",
        titleEnglish: "For Receiving Book in Right Hand",
        arabic: "اللَّهُمَّ آتِنِي كِتَابِي بِيَمِينِي",
        bengali: "হে আল্লাহ! আমার আমলনামা আমার ডান হাতে দাও।",
        english: "O Allah, give me my book in my right hand.",
        reference: "সূরা হাক্কা ৬৯:১৯"
      },
      {
        id: "akhirah-22",
        titleBengali: "মিজানে ভালো আমল ভারী হওয়ার দোয়া",
        titleEnglish: "For Heavy Good Deeds on Scale",
        arabic: "اللَّهُمَّ ثَقِّلْ مَوَازِينِي بِالْحَسَنَاتِ",
        bengali: "হে আল্লাহ! ভালো কাজ দিয়ে আমার দাঁড়িপাল্লা ভারী কর।",
        english: "O Allah, make my scales heavy with good deeds.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-23",
        titleBengali: "পুলসিরাত বিদ্যুতের গতিতে পার হওয়ার দোয়া",
        titleEnglish: "For Quick Crossing of Sirat",
        arabic: "اللَّهُمَّ أَجِزْنِي عَلَى الصِّرَاطِ كَالْبَرْقِ",
        bengali: "হে আল্লাহ! আমাকে বিদ্যুতের মতো দ্রুত সিরাত পার করাও।",
        english: "O Allah, allow me to cross the Sirat like lightning.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-24",
        titleBengali: "জান্নাতের দরজা খোলার দোয়া",
        titleEnglish: "For Gates of Paradise to Open",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ جَنَّتِكَ",
        bengali: "হে আল্লাহ! তোমার জান্নাতের দরজাগুলো আমার জন্য খুলে দাও।",
        english: "O Allah, open the gates of Your Paradise for me.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "akhirah-25",
        titleBengali: "জান্নাতের আটটি দরজা দিয়ে প্রবেশের দোয়া",
        titleEnglish: "For Entry Through All Eight Gates",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِمَّنْ يُدْعَى مِنْ أَبْوَابِ الْجَنَّةِ كُلِّهَا",
        bengali: "হে আল্লাহ! আমাকে তাদের অন্তর্ভুক্ত কর যাদের জান্নাতের সকল দরজা থেকে ডাকা হবে।",
        english: "O Allah, make me among those who will be called from all the gates of Paradise.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "akhirah-26",
        titleBengali: "জান্নাতে পরিবারের সাথে মিলনের দোয়া",
        titleEnglish: "For Union with Family in Paradise",
        arabic: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدْتَهُمْ وَمَنْ صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ",
        bengali: "হে আমাদের রব! তাদেরকে চিরস্থায়ী জান্নাতে প্রবেশ করাও যার প্রতিশ্রুতি তুমি তাদের দিয়েছ এবং তাদের পিতৃপুরুষ, স্বামী-স্ত্রী ও সন্তানদের মধ্যে যারা সৎকর্মশীল তাদেরকেও।",
        english: "Our Lord, admit them to the Gardens of Eden which You have promised them and whoever was righteous among their fathers, spouses, and offspring.",
        reference: "সূরা গাফির ৪০:৮"
      },
      {
        id: "akhirah-27",
        titleBengali: "জান্নাতের নিয়ামতের দোয়া",
        titleEnglish: "For Blessings of Paradise",
        arabic: "اللَّهُمَّ ارْزُقْنَا نَعِيمَ الْجَنَّةِ الدَّائِمَ",
        bengali: "হে আল্লাহ! আমাদের জান্নাতের চিরস্থায়ী নিয়ামত দান কর।",
        english: "O Allah, grant us the everlasting blessings of Paradise.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-28",
        titleBengali: "জান্নাতের হুর পাওয়ার দোয়া",
        titleEnglish: "For Companions of Paradise",
        arabic: "وَحُورٌ عِينٌ كَأَمْثَالِ اللُّؤْلُؤِ الْمَكْنُونِ",
        bengali: "এবং তাদের জন্য রয়েছে বড় বড় চোখ বিশিষ্ট হুর, গুপ্ত মুক্তার মতো।",
        english: "And fair women with large, beautiful eyes, like pearls well-protected.",
        reference: "সূরা ওয়াকিয়া ৫৬:২২-২৩"
      },
      {
        id: "akhirah-29",
        titleBengali: "জান্নাতে প্রাসাদ পাওয়ার দোয়া",
        titleEnglish: "For Palace in Paradise",
        arabic: "اللَّهُمَّ ابْنِ لِي بَيْتًا فِي الْجَنَّةِ",
        bengali: "হে আল্লাহ! আমার জন্য জান্নাতে একটি ঘর নির্মাণ কর।",
        english: "O Allah, build for me a house in Paradise.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "akhirah-30",
        titleBengali: "জান্নাতের নদী পাওয়ার দোয়া",
        titleEnglish: "For Rivers of Paradise",
        arabic: "فِيهَا أَنْهَارٌ مِنْ مَاءٍ غَيْرِ آسِنٍ وَأَنْهَارٌ مِنْ لَبَنٍ لَمْ يَتَغَيَّرْ طَعْمُهُ",
        bengali: "তাতে আছে স্বচ্ছ পানির নদী, দুধের নদী যার স্বাদ পরিবর্তন হয় না।",
        english: "In it are rivers of water unaltered, rivers of milk the taste of which never changes.",
        reference: "সূরা মুহাম্মদ ৪৭:১৫"
      },
      {
        id: "akhirah-31",
        titleBengali: "জাহান্নামের শাস্তি থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Hell's Punishment",
        arabic: "رَبَّنَا إِنَّكَ مَنْ تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ",
        bengali: "হে আমাদের রব! তুমি যাকে জাহান্নামে প্রবেশ করাও তাকে তো লাঞ্ছিত করলে।",
        english: "Our Lord, indeed whoever You admit to the Fire, You have disgraced him.",
        reference: "সূরা আলে ইমরান ৩:১৯২"
      },
      {
        id: "akhirah-32",
        titleBengali: "জাহান্নামের আগুন থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Fire of Hell",
        arabic: "اللَّهُمَّ أَعِذْنِي مِنْ نَارِ جَهَنَّمَ",
        bengali: "হে আল্লাহ! আমাকে জাহান্নামের আগুন থেকে রক্ষা কর।",
        english: "O Allah, protect me from the fire of Hell.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "akhirah-33",
        titleBengali: "কিয়ামতের দিন লজ্জা থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Shame on Judgment Day",
        arabic: "رَبَّنَا لاَ تُخْزِنَا يَوْمَ الْقِيَامَةِ",
        bengali: "হে আমাদের রব! কিয়ামতের দিন আমাদের লজ্জিত করো না।",
        english: "Our Lord, do not disgrace us on the Day of Resurrection.",
        reference: "সূরা আলে ইমরান ৩:১৯৪"
      },
      {
        id: "akhirah-34",
        titleBengali: "আমলনামা মুছে না দেওয়ার দোয়া",
        titleEnglish: "For Deeds Not to Be Erased",
        arabic: "رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
        bengali: "হে আমাদের রব! হিদায়াত দেওয়ার পর আমাদের অন্তর বিপথগামী করো না।",
        english: "Our Lord, do not let our hearts deviate after You have guided us.",
        reference: "সূরা আলে ইমরান ৩:৮"
      },
      {
        id: "akhirah-35",
        titleBengali: "শেষ বিচারে সফলতার দোয়া",
        titleEnglish: "For Success in Final Judgment",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ الْفَائِزِينَ يَوْمَ الدِّينِ",
        bengali: "হে আল্লাহ! আমাকে বিচার দিনে সফলকামদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make me among the successful on the Day of Judgment.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-36",
        titleBengali: "জান্নাতে চিরকাল থাকার দোয়া",
        titleEnglish: "For Eternal Stay in Paradise",
        arabic: "خَالِدِينَ فِيهَا لاَ يَبْغُونَ عَنْهَا حِوَلًا",
        bengali: "তারা সেখানে চিরকাল থাকবে, সেখান থেকে স্থানান্তর চাইবে না।",
        english: "They will dwell therein forever, not desiring to be removed from it.",
        reference: "সূরা কাহফ ১৮:১০৮"
      },
      {
        id: "akhirah-37",
        titleBengali: "আল্লাহর সন্তুষ্টি লাভের দোয়া",
        titleEnglish: "For Allah's Pleasure",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ",
        bengali: "হে আল্লাহ! আমি তোমার সন্তুষ্টি ও জান্নাত চাই।",
        english: "O Allah, I ask You for Your pleasure and Paradise.",
        reference: "সুনান নাসাঈ"
      },
      {
        id: "akhirah-38",
        titleBengali: "আল্লাহর অসন্তুষ্টি থেকে রক্ষার দোয়া",
        titleEnglish: "Protection from Allah's Displeasure",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ",
        bengali: "হে আল্লাহ! আমি তোমার সন্তুষ্টির মাধ্যমে তোমার অসন্তুষ্টি থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in Your pleasure from Your displeasure.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "akhirah-39",
        titleBengali: "জান্নাতে সর্বোচ্চ মর্যাদার দোয়া",
        titleEnglish: "For Highest Rank in Paradise",
        arabic: "اللَّهُمَّ ارْفَعْ دَرَجَتِي فِي الْجَنَّةِ",
        bengali: "হে আল্লাহ! জান্নাতে আমার মর্যাদা উন্নীত কর।",
        english: "O Allah, raise my rank in Paradise.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-40",
        titleBengali: "জান্নাতে শান্তির দোয়া",
        titleEnglish: "For Peace in Paradise",
        arabic: "لَهُمْ دَارُ السَّلَامِ عِنْدَ رَبِّهِمْ",
        bengali: "তাদের জন্য রয়েছে তাদের রবের কাছে শান্তির আবাস।",
        english: "For them will be the Home of Peace with their Lord.",
        reference: "সূরা আনআম ৬:১২৭"
      },
      {
        id: "akhirah-41",
        titleBengali: "জান্নাতে ক্লান্তিহীন জীবনের দোয়া",
        titleEnglish: "For Life Without Fatigue",
        arabic: "لاَ يَمَسُّنَا فِيهَا نَصَبٌ وَلاَ يَمَسُّنَا فِيهَا لُغُوبٌ",
        bengali: "সেখানে আমাদের কোন ক্লান্তি স্পর্শ করবে না এবং কোন অবসাদও স্পর্শ করবে না।",
        english: "No fatigue will touch us therein, nor will weariness touch us therein.",
        reference: "সূরা ফাতির ৩৫:৩৫"
      },
      {
        id: "akhirah-42",
        titleBengali: "জান্নাতে চিরযৌবনের দোয়া",
        titleEnglish: "For Eternal Youth in Paradise",
        arabic: "وَيَطُوفُ عَلَيْهِمْ وِلْدَانٌ مُخَلَّدُونَ",
        bengali: "এবং তাদের চারপাশে ঘুরে বেড়াবে চিরকিশোরগণ।",
        english: "And there will circulate among them young boys made eternal.",
        reference: "সূরা ওয়াকিয়া ৫৬:১৭"
      },
      {
        id: "akhirah-43",
        titleBengali: "জান্নাতে ফলমূলের দোয়া",
        titleEnglish: "For Fruits of Paradise",
        arabic: "وَفَاكِهَةٍ مِمَّا يَتَخَيَّرُونَ",
        bengali: "এবং তারা যা পছন্দ করে সেই ফলমূল।",
        english: "And fruit of whatever they desire.",
        reference: "সূরা ওয়াকিয়া ৫৬:২০"
      },
      {
        id: "akhirah-44",
        titleBengali: "জান্নাতে পোশাকের দোয়া",
        titleEnglish: "For Garments of Paradise",
        arabic: "يُحَلَّوْنَ فِيهَا مِنْ أَسَاوِرَ مِنْ ذَهَبٍ وَيَلْبَسُونَ ثِيَابًا خُضْرًا مِنْ سُنْدُسٍ وَإِسْتَبْرَقٍ",
        bengali: "তাদের সোনার কাঁকন পরানো হবে এবং তারা সবুজ পোশাক পরবে সূক্ষ্ম ও মোটা রেশমের।",
        english: "They will be adorned therein with bracelets of gold and will wear green garments of fine silk and brocade.",
        reference: "সূরা কাহফ ১৮:৩১"
      },
      {
        id: "akhirah-45",
        titleBengali: "জান্নাতে সুখের দোয়া",
        titleEnglish: "For Happiness in Paradise",
        arabic: "فَادْخُلِي فِي عِبَادِي وَادْخُلِي جَنَّتِي",
        bengali: "আমার বান্দাদের মধ্যে শামিল হও এবং আমার জান্নাতে প্রবেশ কর।",
        english: "Enter among My servants and enter My Paradise.",
        reference: "সূরা ফজর ৮৯:২৯-৩০"
      },
      {
        id: "akhirah-46",
        titleBengali: "আখিরাতকে দুনিয়ার উপর প্রাধান্য দেওয়ার দোয়া",
        titleEnglish: "For Preferring Hereafter",
        arabic: "اللَّهُمَّ اجْعَلِ الآخِرَةَ أَحَبَّ إِلَيْنَا مِنَ الدُّنْيَا",
        bengali: "হে আল্লাহ! আখিরাতকে দুনিয়ার চেয়ে আমাদের কাছে প্রিয় বানাও।",
        english: "O Allah, make the Hereafter more beloved to us than this world.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-47",
        titleBengali: "মৃত্যুকে স্মরণ করার দোয়া",
        titleEnglish: "For Remembering Death",
        arabic: "اللَّهُمَّ اجْعَلْنِي مِمَّنْ يَذْكُرُ الْمَوْتَ",
        bengali: "হে আল্লাহ! আমাকে মৃত্যু স্মরণকারীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make me among those who remember death.",
        reference: "সুনান তিরমিযী"
      },
      {
        id: "akhirah-48",
        titleBengali: "আখিরাতের প্রস্তুতির দোয়া",
        titleEnglish: "For Preparing for Hereafter",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى الاسْتِعْدَادِ لِلآخِرَةِ",
        bengali: "হে আল্লাহ! আখিরাতের জন্য প্রস্তুতি নিতে আমাকে সাহায্য কর।",
        english: "O Allah, help me prepare for the Hereafter.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-49",
        titleBengali: "চিরস্থায়ী সুখের দোয়া",
        titleEnglish: "For Everlasting Happiness",
        arabic: "اللَّهُمَّ ارْزُقْنَا السَّعَادَةَ الأَبَدِيَّةَ فِي الآخِرَةِ",
        bengali: "হে আল্লাহ! আমাদের আখিরাতে চিরস্থায়ী সুখ দান কর।",
        english: "O Allah, grant us everlasting happiness in the Hereafter.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "akhirah-50",
        titleBengali: "সামগ্রিক আখিরাতের দোয়া",
        titleEnglish: "Comprehensive Hereafter Dua",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং আমাদেরকে জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
        reference: "সূরা বাকারা ২:২০১"
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
      },
      {
        id: "death-11",
        titleBengali: "মৃত্যুপথযাত্রীর কাছে পড়ার দোয়া",
        titleEnglish: "To Recite Near Dying Person",
        arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ",
        bengali: "আল্লাহ ছাড়া কোন ইলাহ নেই। (মৃত্যুপথযাত্রীকে স্মরণ করান)",
        english: "There is no deity except Allah. (Remind the dying person)",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-12",
        titleBengali: "মৃত্যুর পর পড়ার দোয়া",
        titleEnglish: "Upon Hearing of Death",
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
        bengali: "নিশ্চয়ই আমরা আল্লাহর জন্য এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে।",
        english: "Indeed we belong to Allah and to Him we shall return.",
        reference: "সূরা বাকারা ২:১৫৬"
      },
      {
        id: "death-13",
        titleBengali: "মৃত ব্যক্তির গুনাহ মাফের দোয়া",
        titleEnglish: "For Forgiveness of Deceased's Sins",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ ذُنُوبَهُ كُلَّهَا",
        bengali: "হে আল্লাহ! তার সমস্ত গুনাহ ক্ষমা কর।",
        english: "O Allah, forgive all of his sins.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-14",
        titleBengali: "মৃতকে পবিত্র করার দোয়া",
        titleEnglish: "For Purifying the Deceased",
        arabic: "اللَّهُمَّ نَقِّهِ مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ",
        bengali: "হে আল্লাহ! তাকে গুনাহ থেকে এমনভাবে পবিত্র কর যেমন সাদা কাপড় ময়লা থেকে পরিষ্কার করা হয়।",
        english: "O Allah, purify him from sins as a white cloth is purified from dirt.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-15",
        titleBengali: "মৃতের জন্য বরফ-পানি দিয়ে ধোয়ার দোয়া",
        titleEnglish: "For Washing with Cold Water",
        arabic: "اللَّهُمَّ اغْسِلْهُ بِمَاءٍ وَثَلْجٍ وَبَرَدٍ",
        bengali: "হে আল্লাহ! তাকে পানি, বরফ ও শিশির দিয়ে ধৌত কর।",
        english: "O Allah, wash him with water, snow, and hail.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-16",
        titleBengali: "মৃতের আতিথেয়তার দোয়া",
        titleEnglish: "For Honoring the Deceased",
        arabic: "اللَّهُمَّ أَكْرِمْ نُزُلَهُ",
        bengali: "হে আল্লাহ! তার আতিথেয়তা সম্মানজনক কর।",
        english: "O Allah, honor his reception.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-17",
        titleBengali: "মৃতের প্রবেশস্থান প্রশস্ত করার দোয়া",
        titleEnglish: "For Widening Entrance",
        arabic: "اللَّهُمَّ وَسِّعْ مُدْخَلَهُ",
        bengali: "হে আল্লাহ! তার প্রবেশস্থান প্রশস্ত কর।",
        english: "O Allah, make his entrance spacious.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-18",
        titleBengali: "মৃতকে উত্তম বিনিময় দেওয়ার দোয়া",
        titleEnglish: "For Better Replacement",
        arabic: "اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ",
        bengali: "হে আল্লাহ! তার ঘরের বদলে তাকে উত্তম ঘর দাও।",
        english: "O Allah, replace his home with a better home.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-19",
        titleBengali: "মৃতের পরিবারের জন্য দোয়া",
        titleEnglish: "For Deceased's Family",
        arabic: "اللَّهُمَّ اخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ",
        bengali: "হে আল্লাহ! তার পরিবারে যারা রয়ে গেল তাদের জন্য তার উত্তরসূরি হও।",
        english: "O Allah, be a successor to those he left behind.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-20",
        titleBengali: "জানাজার নামাজের দোয়া",
        titleEnglish: "Funeral Prayer Dua",
        arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا",
        bengali: "হে আল্লাহ! আমাদের জীবিত ও মৃতদের ক্ষমা কর।",
        english: "O Allah, forgive our living and our dead.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "death-21",
        titleBengali: "শিশুর জানাজার দোয়া",
        titleEnglish: "Funeral Prayer for Child",
        arabic: "اللَّهُمَّ اجْعَلْهُ فَرَطًا لِأَبَوَيْهِ وَسَلَفًا وَذُخْرًا",
        bengali: "হে আল্লাহ! তাকে তার পিতা-মাতার জন্য অগ্রগামী, পূর্বসূরি ও সঞ্চয় বানাও।",
        english: "O Allah, make him a forerunner, a predecessor, and a treasure for his parents.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "death-22",
        titleBengali: "শিশুকে শাফায়াতকারী বানানোর দোয়া",
        titleEnglish: "For Child's Intercession",
        arabic: "اللَّهُمَّ اجْعَلْهُ شَفِيعًا لِأَبَوَيْهِ",
        bengali: "হে আল্লাহ! তাকে তার পিতা-মাতার জন্য সুপারিশকারী বানাও।",
        english: "O Allah, make him an intercessor for his parents.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "death-23",
        titleBengali: "কবরে রাখার সময় দোয়া",
        titleEnglish: "When Placing in Grave",
        arabic: "بِسْمِ اللَّهِ وَعَلَى مِلَّةِ رَسُولِ اللَّهِ",
        bengali: "আল্লাহর নামে এবং আল্লাহর রাসূলের দ্বীনের উপর।",
        english: "In the name of Allah and upon the religion of the Messenger of Allah.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "death-24",
        titleBengali: "কবরে মাটি দেওয়ার দোয়া",
        titleEnglish: "When Putting Soil",
        arabic: "مِنْهَا خَلَقْنَاكُمْ وَفِيهَا نُعِيدُكُمْ وَمِنْهَا نُخْرِجُكُمْ تَارَةً أُخْرَى",
        bengali: "এ থেকেই আমরা তোমাদের সৃষ্টি করেছি, এতেই তোমাদের ফিরিয়ে দেব এবং এ থেকেই তোমাদের পুনরায় বের করব।",
        english: "From it We created you, and into it We will return you, and from it We will extract you another time.",
        reference: "সূরা ত্বহা ২০:৫৫"
      },
      {
        id: "death-25",
        titleBengali: "কবর জিয়ারতের দোয়া",
        titleEnglish: "Dua for Visiting Grave",
        arabic: "السَّلاَمُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ",
        bengali: "শান্তি বর্ষিত হোক তোমাদের উপর, হে মুমিন ও মুসলিমদের আবাসের অধিবাসীগণ।",
        english: "Peace be upon you, O inhabitants of the graves from among the believers and Muslims.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-26",
        titleBengali: "কবরবাসীদের জন্য মাগফিরাত",
        titleEnglish: "Forgiveness for Grave Dwellers",
        arabic: "نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
        bengali: "আমরা আল্লাহর কাছে আমাদের এবং তোমাদের জন্য ক্ষমা চাই।",
        english: "We ask Allah for well-being for us and for you.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-27",
        titleBengali: "কবরবাসীদের সাথে মিলিত হওয়ার দোয়া",
        titleEnglish: "For Joining Grave Dwellers",
        arabic: "وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لاَحِقُونَ",
        bengali: "ইনশাআল্লাহ আমরা তোমাদের সাথে মিলিত হব।",
        english: "Indeed, if Allah wills, we will join you.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-28",
        titleBengali: "মৃতের মর্যাদা বৃদ্ধির দোয়া",
        titleEnglish: "For Raising Deceased's Rank",
        arabic: "اللَّهُمَّ ارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ",
        bengali: "হে আল্লাহ! হিদায়াতপ্রাপ্তদের মধ্যে তার মর্যাদা বৃদ্ধি কর।",
        english: "O Allah, raise his rank among the rightly guided.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-29",
        titleBengali: "মৃতের জাহান্নাম থেকে রক্ষার দোয়া",
        titleEnglish: "Protecting Deceased from Hell",
        arabic: "اللَّهُمَّ أَعِذْهُ مِنْ عَذَابِ النَّارِ",
        bengali: "হে আল্লাহ! তাকে জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "O Allah, protect him from the punishment of the Fire.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-30",
        titleBengali: "মৃতের কবরের আযাব থেকে রক্ষার দোয়া",
        titleEnglish: "Protecting from Grave Punishment",
        arabic: "اللَّهُمَّ قِهِ عَذَابَ الْقَبْرِ",
        bengali: "হে আল্লাহ! তাকে কবরের আযাব থেকে রক্ষা কর।",
        english: "O Allah, protect him from the punishment of the grave.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "death-31",
        titleBengali: "মৃতের জান্নাতে প্রবেশের দোয়া",
        titleEnglish: "For Deceased's Entry to Paradise",
        arabic: "اللَّهُمَّ أَدْخِلْهُ الْجَنَّةَ",
        bengali: "হে আল্লাহ! তাকে জান্নাতে প্রবেশ করাও।",
        english: "O Allah, admit him to Paradise.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-32",
        titleBengali: "মৃতের জন্য রহমত চাওয়া",
        titleEnglish: "Seeking Mercy for Deceased",
        arabic: "اللَّهُمَّ ارْحَمْهُ بِرَحْمَتِكَ الْوَاسِعَةِ",
        bengali: "হে আল্লাহ! তোমার প্রশস্ত রহমত দিয়ে তাকে রহম কর।",
        english: "O Allah, have mercy on him with Your vast mercy.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-33",
        titleBengali: "মৃতের ঈমান ও আমল কবুলের দোয়া",
        titleEnglish: "For Accepting Deceased's Faith",
        arabic: "اللَّهُمَّ تَقَبَّلْ إِيمَانَهُ وَعَمَلَهُ",
        bengali: "হে আল্লাহ! তার ঈমান ও আমল কবুল কর।",
        english: "O Allah, accept his faith and deeds.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-34",
        titleBengali: "মৃতের সুন্দর পরিণতির দোয়া",
        titleEnglish: "For Deceased's Good End",
        arabic: "اللَّهُمَّ اخْتِمْ لَهُ بِخَيْرٍ",
        bengali: "হে আল্লাহ! তার পরিণতি ভালো কর।",
        english: "O Allah, make his end good.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-35",
        titleBengali: "মৃতের নূরের দোয়া",
        titleEnglish: "For Light in Deceased's Grave",
        arabic: "اللَّهُمَّ نَوِّرْ لَهُ قَبْرَهُ",
        bengali: "হে আল্লাহ! তার কবরকে আলোকিত কর।",
        english: "O Allah, illuminate his grave.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-36",
        titleBengali: "মৃতের সাথে সাক্ষাতের দোয়া",
        titleEnglish: "For Meeting Deceased in Paradise",
        arabic: "اللَّهُمَّ اجْمَعْنَا بِهِ فِي جَنَّاتِ النَّعِيمِ",
        bengali: "হে আল্লাহ! আমাদের তার সাথে জান্নাতুন নাঈমে একত্রিত কর।",
        english: "O Allah, unite us with him in the Gardens of Bliss.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-37",
        titleBengali: "মৃতের হিসাব সহজ করার দোয়া",
        titleEnglish: "For Easy Reckoning of Deceased",
        arabic: "اللَّهُمَّ حَاسِبْهُ حِسَابًا يَسِيرًا",
        bengali: "হে আল্লাহ! তার হিসাব সহজ কর।",
        english: "O Allah, make his reckoning easy.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "death-38",
        titleBengali: "মৃতের প্রশ্নে সঠিক উত্তরের দোয়া",
        titleEnglish: "For Answering Grave Questions",
        arabic: "اللَّهُمَّ ثَبِّتْهُ عِنْدَ سُؤَالِ الْمَلَكَيْنِ",
        bengali: "হে আল্লাহ! দুই ফেরেশতার প্রশ্নের সময় তাকে স্থির রাখ।",
        english: "O Allah, keep him steadfast when the two angels question him.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-39",
        titleBengali: "মৃত মহিলার জন্য দোয়া",
        titleEnglish: "For Deceased Woman",
        arabic: "اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا",
        bengali: "হে আল্লাহ! তাকে ক্ষমা কর ও রহম কর।",
        english: "O Allah, forgive her and have mercy on her.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-40",
        titleBengali: "মৃত পিতার জন্য দোয়া",
        titleEnglish: "For Deceased Father",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
        bengali: "হে আমার রব! আমাকে ও আমার পিতা-মাতাকে ক্ষমা কর।",
        english: "My Lord, forgive me and my parents.",
        reference: "সূরা ইবরাহীম ১৪:৪১"
      },
      {
        id: "death-41",
        titleBengali: "মৃত মাতার জন্য দোয়া",
        titleEnglish: "For Deceased Mother",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        bengali: "হে আমার রব! তাদের প্রতি রহম কর যেমন তারা আমাকে ছোটবেলায় লালন-পালন করেছেন।",
        english: "My Lord, have mercy upon them as they brought me up when I was small.",
        reference: "সূরা ইসরা ১৭:২৪"
      },
      {
        id: "death-42",
        titleBengali: "মৃত স্ত্রীর জন্য দোয়া",
        titleEnglish: "For Deceased Wife",
        arabic: "اللَّهُمَّ اغْفِرْ لِزَوْجَتِي وَارْحَمْهَا",
        bengali: "হে আল্লাহ! আমার স্ত্রীকে ক্ষমা কর ও রহম কর।",
        english: "O Allah, forgive my wife and have mercy on her.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-43",
        titleBengali: "মৃত স্বামীর জন্য দোয়া",
        titleEnglish: "For Deceased Husband",
        arabic: "اللَّهُمَّ اغْفِرْ لِزَوْجِي وَارْحَمْهُ",
        bengali: "হে আল্লাহ! আমার স্বামীকে ক্ষমা কর ও রহম কর।",
        english: "O Allah, forgive my husband and have mercy on him.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-44",
        titleBengali: "মৃত সন্তানের জন্য দোয়া",
        titleEnglish: "For Deceased Child",
        arabic: "اللَّهُمَّ اجْعَلْهُ ذُخْرًا لِوَالِدَيْهِ",
        bengali: "হে আল্লাহ! তাকে তার পিতা-মাতার জন্য সঞ্চয় বানাও।",
        english: "O Allah, make him a treasure for his parents.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "death-45",
        titleBengali: "মৃত ভাই/বোনের জন্য দোয়া",
        titleEnglish: "For Deceased Sibling",
        arabic: "اللَّهُمَّ اغْفِرْ لِأَخِي/أُخْتِي وَارْحَمْهُ/هَا",
        bengali: "হে আল্লাহ! আমার ভাই/বোনকে ক্ষমা কর ও রহম কর।",
        english: "O Allah, forgive my brother/sister and have mercy on him/her.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "death-46",
        titleBengali: "সব মৃত মুসলিমদের জন্য দোয়া",
        titleEnglish: "For All Deceased Muslims",
        arabic: "اللَّهُمَّ اغْفِرْ لِجَمِيعِ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ",
        bengali: "হে আল্লাহ! সকল মুসলিম পুরুষ ও নারীকে ক্ষমা কর।",
        english: "O Allah, forgive all Muslim men and women.",
        reference: "সুনান ইবনে মাজাহ"
      },
      {
        id: "death-47",
        titleBengali: "তা'যিয়ার দোয়া",
        titleEnglish: "Condolence Dua",
        arabic: "إِنَّ لِلَّهِ مَا أَخَذَ وَلَهُ مَا أَعْطَى وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى",
        bengali: "আল্লাহ যা নিয়েছেন তা তাঁরই এবং যা দিয়েছেন তাও তাঁর। তাঁর কাছে সবকিছুর একটি নির্ধারিত সময় আছে।",
        english: "Indeed, to Allah belongs what He has taken and to Him belongs what He has given. Everything has an appointed time with Him.",
        reference: "সহীহ বুখারী"
      },
      {
        id: "death-48",
        titleBengali: "সবর করার দোয়া",
        titleEnglish: "For Patience in Loss",
        arabic: "فَاصْبِرْ صَبْرًا جَمِيلًا",
        bengali: "সুতরাং সুন্দর ধৈর্য ধারণ কর।",
        english: "So be patient with gracious patience.",
        reference: "সূরা মাআরিজ ৭০:৫"
      },
      {
        id: "death-49",
        titleBengali: "মৃতের জন্য সদকায়ে জারিয়ার দোয়া",
        titleEnglish: "For Ongoing Charity for Deceased",
        arabic: "اللَّهُمَّ اجْعَلْ ثَوَابَ هَذَا الْعَمَلِ لَهُ",
        bengali: "হে আল্লাহ! এই কাজের সওয়াব তাকে পৌঁছে দাও।",
        english: "O Allah, let the reward of this deed reach him.",
        reference: "সহীহ মুসলিম"
      },
      {
        id: "death-50",
        titleBengali: "সামগ্রিক জানাজার দোয়া",
        titleEnglish: "Comprehensive Funeral Dua",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الأَبْيَضَ مِنَ الدَّنَسِ وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَعَذَابِ النَّارِ",
        bengali: "হে আল্লাহ! তাকে ক্ষমা কর, রহম কর, নিরাপদ রাখ, মাফ কর, সম্মানজনক আতিথেয়তা দাও, প্রবেশস্থান প্রশস্ত কর, পানি, বরফ ও শিশির দিয়ে ধৌত কর, গুনাহ থেকে পবিত্র কর যেমন সাদা কাপড় পরিষ্কার করা হয়, উত্তম ঘর ও পরিবার দাও, জান্নাতে প্রবেশ করাও এবং কবর ও জাহান্নামের আযাব থেকে রক্ষা কর।",
        english: "O Allah, forgive him, have mercy on him, keep him safe, pardon him, honor his reception, make his entrance spacious, wash him with water, snow and hail, purify him from sins as a white cloth is purified, replace his home and family with better ones, admit him to Paradise, and protect him from the punishment of the grave and Fire.",
        reference: "সহীহ মুসলিম"
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
      },
      {
        id: "special-11",
        titleBengali: "শবে বরাতের দোয়া",
        titleEnglish: "Shab-e-Barat Night",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        bengali: "হে আল্লাহ! নিশ্চয়ই তুমি ক্ষমাশীল, দয়ালু, ক্ষমা করতে ভালোবাস, অতএব আমাকে ক্ষমা কর। (শবে বরাতে)",
        english: "O Allah, You are Forgiving and Generous, You love to forgive, so forgive me. (On Shab-e-Barat)",
        reference: "তিরমিযী থেকে অনুসৃত"
      },
      {
        id: "special-12",
        titleBengali: "জুমুআর দিনের দোয়া",
        titleEnglish: "Friday Special Dua",
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        bengali: "হে আল্লাহ! মুহাম্মাদ ও তাঁর পরিবারের উপর রহমত বর্ষণ কর। (জুমুআর দিনে বেশি বেশি পড়ুন)",
        english: "O Allah, send blessings upon Muhammad and the family of Muhammad. (Recite abundantly on Friday)",
        reference: "সহীহ বুখারী, হাদিস নং ৩৩৭০"
      },
      {
        id: "special-13",
        titleBengali: "রজব মাসের দোয়া",
        titleEnglish: "Rajab Month Dua",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبٍ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ",
        bengali: "হে আল্লাহ! রজব ও শাবান মাসে আমাদের জন্য বরকত দাও এবং আমাদের রমজান পর্যন্ত পৌঁছাও।",
        english: "O Allah, bless us in Rajab and Sha'ban and let us reach Ramadan.",
        reference: "মুসনাদ আহমাদ, হাদিস নং ২৩৪৬"
      },
      {
        id: "special-14",
        titleBengali: "রমজানের শুরুতে দোয়া",
        titleEnglish: "Beginning of Ramadan",
        arabic: "اللَّهُمَّ سَلِّمْنِي لِرَمَضَانَ وَسَلِّمْ رَمَضَانَ لِي وَتَسَلَّمْهُ مِنِّي مُتَقَبَّلًا",
        bengali: "হে আল্লাহ! আমাকে রমজানের জন্য নিরাপদ রাখো, রমজানকে আমার জন্য নিরাপদ করো এবং তা আমার থেকে কবুল করো।",
        english: "O Allah, keep me safe for Ramadan, and keep Ramadan safe for me, and accept it from me.",
        reference: "কানযুল উম্মাল"
      },
      {
        id: "special-15",
        titleBengali: "ইফতারের দোয়া",
        titleEnglish: "Iftar Dua",
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        bengali: "তৃষ্ণা দূর হয়েছে, শিরা-উপশিরা সিক্ত হয়েছে এবং ইনশাআল্লাহ সওয়াব নির্ধারিত হয়েছে।",
        english: "The thirst has gone, the veins are moistened and the reward is confirmed, if Allah wills.",
        reference: "সুনান আবু দাউদ, হাদিস নং ২৩৫৭"
      },
      {
        id: "special-16",
        titleBengali: "সেহরীর দোয়া",
        titleEnglish: "Suhoor Intention",
        arabic: "نَوَيْتُ صَوْمَ غَدٍ مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللَّهُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        bengali: "আমি আগামীকাল পবিত্র রমজান মাসে তোমার জন্য ফরজ রোজা রাখার নিয়ত করছি, হে আল্লাহ! আমার থেকে কবুল করো, নিশ্চয়ই তুমি সর্বশ্রোতা, সর্বজ্ঞ।",
        english: "I intend to fast tomorrow in the blessed month of Ramadan as an obligation for You O Allah, so accept it from me, indeed You are the All-Hearing, All-Knowing.",
        reference: "ফিকহী কিতাবসমূহ"
      },
      {
        id: "special-17",
        titleBengali: "ঈদুল ফিতরের তাকবীর",
        titleEnglish: "Eid ul-Fitr Takbir",
        arabic: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
        bengali: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। আল্লাহ ছাড়া কোনো ইলাহ নেই। আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড় এবং সকল প্রশংসা আল্লাহর।",
        english: "Allah is the Greatest, Allah is the Greatest. There is no deity except Allah. Allah is the Greatest, Allah is the Greatest, and to Allah belongs all praise.",
        reference: "দারাকুতনী"
      },
      {
        id: "special-18",
        titleBengali: "কুরবানীর দোয়া",
        titleEnglish: "Qurbani Dua",
        arabic: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ اللَّهُمَّ تَقَبَّلْ مِنِّي",
        bengali: "আল্লাহর নামে, আল্লাহ সবচেয়ে বড়। হে আল্লাহ! আমার থেকে কবুল করো।",
        english: "In the name of Allah, Allah is the Greatest. O Allah, accept from me.",
        reference: "সহীহ মুসলিম, হাদিস নং ১৯৬৬"
      },
      {
        id: "special-19",
        titleBengali: "হজ্জের তালবিয়া",
        titleEnglish: "Hajj Talbiyah",
        arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
        bengali: "আমি হাজির হে আল্লাহ! আমি হাজির। আমি হাজির, তোমার কোনো শরীক নেই, আমি হাজির। নিশ্চয়ই সকল প্রশংসা, নিয়ামত ও রাজত্ব তোমার, তোমার কোনো শরীক নেই।",
        english: "Here I am O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, blessings and dominion are Yours, You have no partner.",
        reference: "সহীহ বুখারী, হাদিস নং ১৫৪৯"
      },
      {
        id: "special-20",
        titleBengali: "কাবা দর্শনের দোয়া",
        titleEnglish: "Upon Seeing Kaaba",
        arabic: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً",
        bengali: "হে আল্লাহ! এই ঘরের মর্যাদা, সম্মান, মাহাত্ম্য ও ভয়-ভীতি আরো বাড়িয়ে দাও। (কাবা দেখলে)",
        english: "O Allah, increase this House in honor, dignity, nobility and reverence. (Upon seeing the Kaaba)",
        reference: "শুআবুল ঈমান, বায়হাকী"
      },
      {
        id: "special-21",
        titleBengali: "তাওয়াফের দোয়া",
        titleEnglish: "Tawaf Dua",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bengali: "হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং জাহান্নামের আযাব থেকে রক্ষা কর। (রুকনে ইয়ামানী ও হাজরে আসওয়াদের মাঝে)",
        english: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire. (Between Rukn Yamani and Hajar Aswad)",
        reference: "সূরা আল-বাকারা ২:২০১"
      },
      {
        id: "special-22",
        titleBengali: "সাফা-মারওয়ার দোয়া",
        titleEnglish: "Safa Marwa Dua",
        arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
        bengali: "নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত। (সাই শুরুর আগে পড়ুন)",
        english: "Indeed, as-Safa and al-Marwah are among the symbols of Allah. (Recite before starting Sa'i)",
        reference: "সূরা আল-বাকারা ২:১৫৮"
      },
      {
        id: "special-23",
        titleBengali: "উমরাহর ইহরামের দোয়া",
        titleEnglish: "Umrah Ihram Dua",
        arabic: "اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي",
        bengali: "হে আল্লাহ! আমি উমরাহ করতে চাই, এটা আমার জন্য সহজ করো এবং আমার থেকে কবুল করো।",
        english: "O Allah, I intend Umrah, so make it easy for me and accept it from me.",
        reference: "মানাসিকুল হজ্জ"
      },
      {
        id: "special-24",
        titleBengali: "মিনায় অবস্থানের দোয়া",
        titleEnglish: "At Mina Dua",
        arabic: "اللَّهُمَّ هَذِهِ مِنًى فَامْنُنْ عَلَيَّ بِمَا مَنَنْتَ بِهِ عَلَى أَوْلِيَائِكَ وَأَهْلِ طَاعَتِكَ",
        bengali: "হে আল্লাহ! এটা মিনা, তাই আমার উপর সেই অনুগ্রহ করো যা তুমি তোমার বন্ধুদের ও তোমার অনুগতদের উপর করেছ।",
        english: "O Allah, this is Mina, so bestow upon me what You have bestowed upon Your friends and those who obey You.",
        reference: "মানাসিকুল হজ্জ"
      },
      {
        id: "special-25",
        titleBengali: "মুযদালিফায় দোয়া",
        titleEnglish: "At Muzdalifah Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ أَنْ تَرْزُقَنِي جَوَامِعَ الْخَيْرِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে সমস্ত কল্যাণ প্রদান করতে চাই।",
        english: "O Allah, I ask You to grant me comprehensive goodness.",
        reference: "হজ্জের কিতাবসমূহ"
      },
      {
        id: "special-26",
        titleBengali: "জমরায় পাথর মারার দোয়া",
        titleEnglish: "Stoning Jamarat Dua",
        arabic: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ وَحِزْبِهِ",
        bengali: "আল্লাহর নামে, আল্লাহ সবচেয়ে বড়। শয়তান ও তার দলের অপমানার্থে। (প্রতিটি পাথরে)",
        english: "In the name of Allah, Allah is the Greatest. To humiliate Satan and his party. (With each stone)",
        reference: "মানাসিকুল হজ্জ"
      },
      {
        id: "special-27",
        titleBengali: "বিদায়ী তাওয়াফের দোয়া",
        titleEnglish: "Farewell Tawaf Dua",
        arabic: "اللَّهُمَّ إِنَّ الْبَيْتَ بَيْتُكَ وَالْعَبْدَ عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ",
        bengali: "হে আল্লাহ! নিশ্চয়ই এই ঘর তোমার ঘর, বান্দা তোমার বান্দা, তোমার বান্দার সন্তান এবং তোমার বাঁদীর সন্তান।",
        english: "O Allah, indeed this House is Your House, and the servant is Your servant, the son of Your servant and the son of Your maidservant.",
        reference: "মানাসিকুল হজ্জ"
      },
      {
        id: "special-28",
        titleBengali: "নবীজির রওজা যিয়ারত",
        titleEnglish: "Visiting Prophet's Grave",
        arabic: "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ السَّلَامُ عَلَيْكَ يَا نَبِيَّ اللَّهِ",
        bengali: "আপনার উপর সালাম হে আল্লাহর রাসূল। আপনার উপর সালাম হে আল্লাহর নবী।",
        english: "Peace be upon you, O Messenger of Allah. Peace be upon you, O Prophet of Allah.",
        reference: "যিয়ারতের আদাব"
      },
      {
        id: "special-29",
        titleBengali: "বিয়ের অনুষ্ঠানের দোয়া",
        titleEnglish: "Wedding Ceremony Dua",
        arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        bengali: "আল্লাহ তোমাকে বরকত দিন, তোমার উপর বরকত দিন এবং তোমাদের উভয়কে কল্যাণের মধ্যে একত্রিত করুন। (বিবাহিতদের জন্য)",
        english: "May Allah bless you, send blessings upon you, and unite you both in goodness. (For the newlyweds)",
        reference: "সুনান তিরমিযী, হাদিস নং ১০৯১"
      },
      {
        id: "special-30",
        titleBengali: "বাসর রাতের দোয়া",
        titleEnglish: "Wedding Night Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে তার কল্যাণ ও তার স্বভাবের কল্যাণ চাই এবং তার অনিষ্ট ও তার স্বভাবের অনিষ্ট থেকে আশ্রয় চাই।",
        english: "O Allah, I ask You for her goodness and the goodness of her nature, and I seek refuge from her evil and the evil of her nature.",
        reference: "সুনান আবু দাউদ, হাদিস নং ২১৬০"
      },
      {
        id: "special-31",
        titleBengali: "আকীকার দোয়া",
        titleEnglish: "Aqiqah Dua",
        arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ اللَّهُمَّ مِنْكَ وَلَكَ هَذِهِ عَقِيقَةُ فُلَانٍ",
        bengali: "আল্লাহর নামে এবং আল্লাহ সবচেয়ে বড়। হে আল্লাহ! তোমার পক্ষ থেকে এবং তোমার জন্য, এটা (অমুকের) আকীকা।",
        english: "In the name of Allah and Allah is the Greatest. O Allah, from You and for You, this is the Aqiqah of (name).",
        reference: "সুনান আবু দাউদ, হাদিস নং ২৮৪২"
      },
      {
        id: "special-32",
        titleBengali: "খতনার দোয়া",
        titleEnglish: "Circumcision Dua",
        arabic: "اللَّهُمَّ اجْعَلْهُ مِنَ الْمُتَطَهِّرِينَ التَّائِبِينَ",
        bengali: "হে আল্লাহ! তাকে পবিত্র ও তাওবাকারীদের অন্তর্ভুক্ত কর।",
        english: "O Allah, make him among the purified and the repentant.",
        reference: "ফিকহী কিতাবসমূহ"
      },
      {
        id: "special-33",
        titleBengali: "সন্তানের নামকরণ",
        titleEnglish: "Naming Child",
        arabic: "اللَّهُمَّ اجْعَلْهُ بَارًّا تَقِيًّا، وَأَنْبِتْهُ فِي الْإِسْلَامِ نَبَاتًا حَسَنًا",
        bengali: "হে আল্লাহ! তাকে সৎ ও আল্লাহভীরু বানাও এবং ইসলামে তার সুন্দর প্রবৃদ্ধি দাও।",
        english: "O Allah, make him righteous and pious, and let him grow beautifully in Islam.",
        reference: "আল-আযকার, ইমাম নববী"
      },
      {
        id: "special-34",
        titleBengali: "গৃহপ্রবেশের দোয়া",
        titleEnglish: "Housewarming Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
        bengali: "হে আল্লাহ! আমি তোমার কাছে প্রবেশের কল্যাণ ও বের হওয়ার কল্যাণ চাই। আল্লাহর নামে প্রবেশ করলাম, আল্লাহর নামে বের হলাম এবং আমাদের রব আল্লাহর উপর ভরসা করলাম।",
        english: "O Allah, I ask You for the best of entering and the best of exiting. In the name of Allah we enter, in the name of Allah we exit, and upon Allah our Lord we rely.",
        reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৬"
      },
      {
        id: "special-35",
        titleBengali: "নতুন জামা পরার দোয়া",
        titleEnglish: "Wearing New Clothes",
        arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
        bengali: "হে আল্লাহ! তোমার জন্য সমস্ত প্রশংসা, তুমি আমাকে এটা পরিয়েছ। আমি তোমার কাছে এর কল্যাণ ও এটা যে জন্য তৈরি তার কল্যাণ চাই এবং এর অনিষ্ট ও এটা যে জন্য তৈরি তার অনিষ্ট থেকে আশ্রয় চাই।",
        english: "O Allah, for You is all praise, You have clothed me with it. I ask You for its goodness and the goodness for which it was made, and I seek refuge from its evil and the evil for which it was made.",
        reference: "সুনান আবু দাউদ, হাদিস নং ৪০২০"
      },
      {
        id: "special-36",
        titleBengali: "নতুন গাড়ির দোয়া",
        titleEnglish: "New Vehicle Dua",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        bengali: "পবিত্র সেই সত্তা যিনি এটাকে আমাদের অধীন করেছেন, অথচ আমরা এর সক্ষম ছিলাম না। এবং নিশ্চয়ই আমরা আমাদের রবের কাছে ফিরে যাব।",
        english: "Glory be to Him who has subjected this to us, and we could not have controlled it. And indeed, to our Lord we will return.",
        reference: "সূরা যুখরুফ ৪৩:১৩-১৪"
      },
      {
        id: "special-37",
        titleBengali: "পরীক্ষার আগে দোয়া",
        titleEnglish: "Before Exam",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
        bengali: "হে আমার রব! আমার বুক প্রশস্ত করে দাও, আমার কাজ সহজ করে দাও এবং আমার জিহ্বার জড়তা দূর করে দাও, যাতে তারা আমার কথা বুঝতে পারে।",
        english: "My Lord, expand my chest, ease my task, and untie the knot from my tongue so they may understand my speech.",
        reference: "সূরা ত্বহা ২০:২৫-২৮"
      },
      {
        id: "special-38",
        titleBengali: "চাকরির ইন্টারভিউ",
        titleEnglish: "Job Interview",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَلْ لِي مِنْ لَدُنْكَ سُلْطَانًا نَصِيرًا",
        bengali: "হে আমার রব! আমাকে সত্যের সাথে প্রবেশ করাও, সত্যের সাথে বের করো এবং তোমার পক্ষ থেকে আমার জন্য সাহায্যকারী শক্তি দাও।",
        english: "My Lord, cause me to enter a sound entrance and to exit a sound exit and grant me from Yourself a supporting authority.",
        reference: "সূরা ইসরা ১৭:৮০"
      },
      {
        id: "special-39",
        titleBengali: "ব্যবসা শুরুর দোয়া",
        titleEnglish: "Starting Business",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا حَلَالًا طَيِّبًا مُبَارَكًا فِيهِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে হালাল, পবিত্র ও বরকতময় রিজিক চাই।",
        english: "O Allah, I ask You for lawful, pure and blessed provision.",
        reference: "মুসনাদ আহমাদ"
      },
      {
        id: "special-40",
        titleBengali: "দোকান খোলার দোয়া",
        titleEnglish: "Opening Shop",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رِزْقِكَ الطَّيِّبِ",
        bengali: "হে আল্লাহ! আমার জন্য তোমার পবিত্র রিজিকের দরজা খুলে দাও।",
        english: "O Allah, open for me the doors of Your pure provision.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "special-41",
        titleBengali: "কৃষি/ফসল বোনার দোয়া",
        titleEnglish: "Planting Crops",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا زَرَعْنَا وَانْفَعْنَا بِهِ",
        bengali: "হে আল্লাহ! আমরা যা বপন করেছি তাতে আমাদের জন্য বরকত দাও এবং তা দ্বারা আমাদের উপকৃত কর।",
        english: "O Allah, bless us in what we have planted and benefit us from it.",
        reference: "কৃষি সংক্রান্ত দোয়া"
      },
      {
        id: "special-42",
        titleBengali: "ফসল তোলার দোয়া",
        titleEnglish: "Harvest Time",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদের মুসলিম বানালেন।",
        english: "All praise is to Allah who fed us, gave us drink, and made us Muslims.",
        reference: "সুনান আবু দাউদ"
      },
      {
        id: "special-43",
        titleBengali: "গ্র্যাজুয়েশনের দোয়া",
        titleEnglish: "Graduation Dua",
        arabic: "رَبِّ زِدْنِي عِلْمًا وَفَهْمًا وَارْزُقْنِي الْعَمَلَ بِهِ",
        bengali: "হে আমার রব! আমার জ্ঞান ও বুঝ বাড়িয়ে দাও এবং তা অনুযায়ী আমল করার তাওফীক দাও।",
        english: "My Lord, increase me in knowledge and understanding, and grant me the ability to act upon it.",
        reference: "সূরা ত্বহা ২০:১১৪ থেকে অনুসৃত"
      },
      {
        id: "special-44",
        titleBengali: "অবসর গ্রহণের দোয়া",
        titleEnglish: "Retirement Dua",
        arabic: "اللَّهُمَّ تَقَبَّلْ مِنِّي مَا قَدَّمْتُ وَاغْفِرْ لِي مَا أَخَّرْتُ",
        bengali: "হে আল্লাহ! আমি যা অগ্রিম পাঠিয়েছি তা কবুল কর এবং আমি যা বিলম্ব করেছি তা ক্ষমা কর।",
        english: "O Allah, accept what I have sent forth and forgive what I have delayed.",
        reference: "সহীহ মুসলিম থেকে অনুসৃত"
      },
      {
        id: "special-45",
        titleBengali: "সন্তান স্কুলে যাওয়ার আগে",
        titleEnglish: "Child Going to School",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، اللَّهُمَّ احْفَظْهُ وَارْزُقْهُ عِلْمًا نَافِعًا",
        bengali: "আল্লাহর নামে, আল্লাহর উপর ভরসা করলাম। হে আল্লাহ! তাকে হেফাজত কর এবং তাকে উপকারী জ্ঞান দান কর।",
        english: "In the name of Allah, I rely upon Allah. O Allah, protect him and grant him beneficial knowledge.",
        reference: "দোয়া সংকলন"
      },
      {
        id: "special-46",
        titleBengali: "রক্তদানের দোয়া",
        titleEnglish: "Blood Donation",
        arabic: "اللَّهُمَّ اجْعَلْهُ صَدَقَةً جَارِيَةً وَانْفَعْ بِهِ غَيْرِي",
        bengali: "হে আল্লাহ! এটাকে সাদকায়ে জারিয়া বানাও এবং এর দ্বারা অন্যদের উপকার কর।",
        english: "O Allah, make this an ongoing charity and benefit others through it.",
        reference: "সৎকর্ম সংক্রান্ত দোয়া"
      },
      {
        id: "special-47",
        titleBengali: "দাতব্য কাজের দোয়া",
        titleEnglish: "Charity Work",
        arabic: "اللَّهُمَّ تَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        bengali: "হে আল্লাহ! আমার থেকে কবুল কর, নিশ্চয়ই তুমি সর্বশ্রোতা, সর্বজ্ঞ।",
        english: "O Allah, accept from me, indeed You are the All-Hearing, All-Knowing.",
        reference: "সূরা আল-বাকারা ২:১২৭"
      },
      {
        id: "special-48",
        titleBengali: "মুসাফিরকে বিদায়",
        titleEnglish: "Bidding Farewell to Traveler",
        arabic: "أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ",
        bengali: "তোমার দ্বীন, তোমার আমানত ও তোমার শেষ আমল আল্লাহর কাছে সোপর্দ করছি।",
        english: "I entrust to Allah your religion, your trust, and your final deeds.",
        reference: "সুনান তিরমিযী, হাদিস নং ৩৪৪২"
      },
      {
        id: "special-49",
        titleBengali: "মেহমান বিদায়ের দোয়া",
        titleEnglish: "Farewell to Guest",
        arabic: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
        bengali: "হে আল্লাহ! তুমি তাদের যা দিয়েছ তাতে বরকত দাও, তাদের ক্ষমা কর এবং তাদের প্রতি রহম কর।",
        english: "O Allah, bless them in what You have provided them, forgive them and have mercy on them.",
        reference: "সহীহ মুসলিম, হাদিস নং ২০৪২"
      },
      {
        id: "special-50",
        titleBengali: "সফল সমাপ্তির শুকরিয়া",
        titleEnglish: "Gratitude for Success",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        bengali: "সমস্ত প্রশংসা আল্লাহর যাঁর নিয়ামতে সকল ভালো কাজ সম্পন্ন হয়।",
        english: "All praise is to Allah by whose grace all good things are completed.",
        reference: "সুনান ইবনে মাজাহ, হাদিস নং ৩৮০৩"
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
