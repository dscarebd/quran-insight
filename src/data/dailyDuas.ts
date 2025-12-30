export interface DailyDua {
  id: string;
  titleBn: string;
  titleEn: string;
  arabic: string;
  bengali: string;
  english: string;
  transliteration?: string;
  transliterationBn?: string;
  referenceBn?: string;
  referenceEn?: string;
}

export interface DailyDuaCategory {
  id: string;
  nameEnglish: string;
  nameBengali: string;
  icon: string;
  duas: DailyDua[];
}

export const dailyDuaCategories: DailyDuaCategory[] = [
  // ============ সালাত/নামাজের দোয়া - Salah Duas ============
  {
    id: "salah-namaz",
    nameEnglish: "Salah/Prayer Duas",
    nameBengali: "সালাত/নামাজের দোয়া",
    icon: "Bookmark",
    duas: [
      {
        id: "thana-sana",
        titleBn: "ছানা/সানা (নামাজ শুরুর দোয়া)",
        titleEn: "Thana/Sana (Opening Dua)",
        arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ",
        bengali: "হে আল্লাহ! তুমি পবিত্র, তোমার প্রশংসাসহ। তোমার নাম বরকতময়, তোমার মর্যাদা সুউচ্চ এবং তুমি ছাড়া কোন উপাস্য নেই।",
        english: "Glory be to You, O Allah, and praise be to You. Blessed is Your name, exalted is Your majesty, and there is no god but You.",
        transliteration: "Subḥānaka Allāhumma wa biḥamdika wa tabārakasmuka wa ta'ālā jadduka wa lā ilāha ghayruk",
        transliterationBn: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা ওয়া তাবারাকাসমুকা ওয়া তাআলা জাদ্দুকা ওয়া লা ইলাহা গাইরুক",
        referenceBn: "তিরমিযী ২৪২, আবু দাউদ ৭৭৫",
        referenceEn: "Tirmidhi 242, Abu Dawud 775"
      },
      {
        id: "ruku-dua",
        titleBn: "রুকুর তাসবীহ",
        titleEn: "Tasbeeh in Ruku",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        bengali: "আমার মহান রবের পবিত্রতা ঘোষণা করছি। (৩ বার)",
        english: "Glory be to my Lord, the Most Great. (3 times)",
        transliteration: "Subḥāna Rabbiyal-'Aẓīm",
        transliterationBn: "সুবহানা রাব্বিয়াল আযীম",
        referenceBn: "সহীহ মুসলিম ৭৭২",
        referenceEn: "Sahih Muslim 772"
      },
      {
        id: "ruku-rise-dua",
        titleBn: "রুকু থেকে উঠার দোয়া",
        titleEn: "Rising from Ruku",
        arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ",
        bengali: "আল্লাহ তার প্রশংসাকারীর প্রশংসা শোনেন। হে আমাদের রব, তোমার জন্যই সকল প্রশংসা।",
        english: "Allah hears those who praise Him. Our Lord, and to You is all praise.",
        transliteration: "Sami'allāhu liman ḥamidah, Rabbanā wa lakal-ḥamd",
        transliterationBn: "সামিআল্লাহু লিমান হামিদাহ, রাব্বানা ওয়া লাকাল হামদ",
        referenceBn: "সহীহ বুখারী ৭৮৯",
        referenceEn: "Sahih Bukhari 789"
      },
      {
        id: "sujud-dua",
        titleBn: "সিজদার তাসবীহ",
        titleEn: "Tasbeeh in Sujud",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
        bengali: "আমার সর্বোচ্চ রবের পবিত্রতা ঘোষণা করছি। (৩ বার)",
        english: "Glory be to my Lord, the Most High. (3 times)",
        transliteration: "Subḥāna Rabbiyal-A'lā",
        transliterationBn: "সুবহানা রাব্বিয়াল আ'লা",
        referenceBn: "সহীহ মুসলিম ৭৭২",
        referenceEn: "Sahih Muslim 772"
      },
      {
        id: "sujud-extra-dua",
        titleBn: "সিজদায় অতিরিক্ত দোয়া",
        titleEn: "Extra Dua in Sujud",
        arabic: "سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي",
        bengali: "হে আল্লাহ! তুমি পবিত্র, হে আমাদের রব। তোমার প্রশংসাসহ, হে আল্লাহ! আমাকে ক্ষমা করো।",
        english: "Glory be to You, O Allah, our Lord, and with Your praise. O Allah, forgive me.",
        transliteration: "Subḥānaka Allāhumma Rabbanā wa biḥamdik, Allāhumma-ghfir lī",
        transliterationBn: "সুবহানাকা আল্লাহুম্মা রাব্বানা ওয়া বিহামদিক, আল্লাহুম্মাগফির লী",
        referenceBn: "সহীহ বুখারী ৭৯৪",
        referenceEn: "Sahih Bukhari 794"
      },
      {
        id: "between-sujud-dua",
        titleBn: "দুই সিজদার মাঝের দোয়া",
        titleEn: "Dua Between Two Sujud",
        arabic: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
        bengali: "হে আমার রব! আমাকে ক্ষমা করো, হে আমার রব! আমাকে ক্ষমা করো।",
        english: "My Lord, forgive me. My Lord, forgive me.",
        transliteration: "Rabbighfir lī, Rabbighfir lī",
        transliterationBn: "রাব্বিগফির লী, রাব্বিগফির লী",
        referenceBn: "সুনান ইবনে মাজাহ ৮৯৭",
        referenceEn: "Sunan Ibn Majah 897"
      },
      {
        id: "tashahhud",
        titleBn: "তাশাহহুদ (আত্তাহিয়্যাতু)",
        titleEn: "Tashahhud (At-Tahiyyat)",
        arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        bengali: "সকল সম্মান, সকল ইবাদত ও সকল পবিত্রতা আল্লাহর জন্য। হে নবী! আপনার উপর শান্তি বর্ষিত হোক এবং আল্লাহর রহমত ও বরকত। আমাদের উপর এবং আল্লাহর সৎ বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই এবং মুহাম্মাদ তাঁর বান্দা ও রাসূল।",
        english: "All greetings, prayers and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah and that Muhammad is His servant and messenger.",
        transliteration: "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt, as-salāmu 'alayka ayyuhan-Nabiyyu wa raḥmatullāhi wa barakātuh, as-salāmu 'alaynā wa 'alā 'ibādillāhiṣ-ṣāliḥīn, ash-hadu an lā ilāha illallāh wa ash-hadu anna Muḥammadan 'abduhu wa rasūluh",
        transliterationBn: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু ওয়াত তাইয়্যিবাত, আস্সালামু আলাইকা আইয়ুহান নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ, আস্সালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহীন, আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহ",
        referenceBn: "সহীহ বুখারী ৮৩১",
        referenceEn: "Sahih Bukhari 831"
      },
      {
        id: "durood-ibrahim",
        titleBn: "দরূদ ইব্রাহীম",
        titleEn: "Durood Ibrahim",
        arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        bengali: "হে আল্লাহ! মুহাম্মাদ ও তাঁর পরিবারের উপর রহমত বর্ষণ করো, যেমন রহমত বর্ষণ করেছিলে ইব্রাহীম ও তাঁর পরিবারের উপর। নিশ্চয়ই তুমি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! মুহাম্মাদ ও তাঁর পরিবারের উপর বরকত দাও, যেমন বরকত দিয়েছিলে ইব্রাহীম ও তাঁর পরিবারের উপর। নিশ্চয়ই তুমি প্রশংসিত ও মহিমান্বিত।",
        english: "O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. You are indeed Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. You are indeed Praiseworthy, Glorious.",
        transliteration: "Allāhumma ṣalli 'alā Muḥammadin wa 'alā āli Muḥammad, kamā ṣallayta 'alā Ibrāhīma wa 'alā āli Ibrāhīm, innaka Ḥamīdun Majīd. Allāhumma bārik 'alā Muḥammadin wa 'alā āli Muḥammad, kamā bārakta 'alā Ibrāhīma wa 'alā āli Ibrāhīm, innaka Ḥamīdun Majīd",
        transliterationBn: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিও ওয়া আলা আলি মুহাম্মাদ, কামা সাল্লাইতা আলা ইব্রাহীমা ওয়া আলা আলি ইব্রাহীম, ইন্নাকা হামীদুম মাজীদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিও ওয়া আলা আলি মুহাম্মাদ, কামা বারাকতা আলা ইব্রাহীমা ওয়া আলা আলি ইব্রাহীম, ইন্নাকা হামীদুম মাজীদ",
        referenceBn: "সহীহ বুখারী ৩৩৭০",
        referenceEn: "Sahih Bukhari 3370"
      },
      {
        id: "before-salam-dua",
        titleBn: "সালামের আগে দোয়া",
        titleEn: "Dua Before Salam",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        bengali: "হে আল্লাহ! আমি তোমার কাছে জাহান্নামের আযাব থেকে, কবরের আযাব থেকে, জীবন ও মৃত্যুর ফিতনা থেকে এবং দাজ্জালের ফিতনার অনিষ্ট থেকে আশ্রয় চাই।",
        english: "O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.",
        transliteration: "Allāhumma innī a'ūdhu bika min 'adhābi jahannam, wa min 'adhābil-qabr, wa min fitnatil-maḥyā wal-mamāt, wa min sharri fitnatil-masīḥid-dajjāl",
        transliterationBn: "আল্লাহুম্মা ইন্নী আউযু বিকা মিন আযাবি জাহান্নাম, ওয়া মিন আযাবিল ক্বাবর, ওয়া মিন ফিতনাতিল মাহইয়া ওয়াল মামাত, ওয়া মিন শাররি ফিতনাতিল মাসীহিদ দাজ্জাল",
        referenceBn: "সহীহ বুখারী ১৩৭৭",
        referenceEn: "Sahih Bukhari 1377"
      }
    ]
  },

  // ============ নামাজের পরের দোয়া - After Salah Duas ============
  {
    id: "after-salah",
    nameEnglish: "After Salah Duas",
    nameBengali: "নামাজের পরের দোয়া",
    icon: "CheckCircle",
    duas: [
      {
        id: "astaghfirullah",
        titleBn: "আস্তাগফিরুল্লাহ (৩ বার)",
        titleEn: "Astaghfirullah (3 times)",
        arabic: "أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ",
        bengali: "আমি আল্লাহর কাছে ক্ষমা চাই। (তিনবার)",
        english: "I seek forgiveness from Allah. (3 times)",
        transliteration: "Astaghfirullāh, Astaghfirullāh, Astaghfirullāh",
        transliterationBn: "আস্তাগফিরুল্লাহ, আস্তাগফিরুল্লাহ, আস্তাগফিরুল্লাহ",
        referenceBn: "সহীহ মুসলিম ৫৯১",
        referenceEn: "Sahih Muslim 591"
      },
      {
        id: "antas-salam",
        titleBn: "আল্লাহুম্মা আনতাস সালাম",
        titleEn: "Allahumma Antas-Salam",
        arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        bengali: "হে আল্লাহ! তুমিই শান্তি এবং তোমার কাছ থেকেই শান্তি আসে। তুমি বরকতময়, হে মহিমা ও সম্মানের মালিক।",
        english: "O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Glory and Honor.",
        transliteration: "Allāhumma antas-salām wa minkas-salām tabārakta yā dhal-jalāli wal-ikrām",
        transliterationBn: "আল্লাহুম্মা আনতাস সালাম ওয়া মিনকাস সালাম তাবারাকতা ইয়া যাল জালালি ওয়াল ইকরাম",
        referenceBn: "সহীহ মুসলিম ৫৯২",
        referenceEn: "Sahih Muslim 592"
      },
      {
        id: "ayatul-kursi",
        titleBn: "আয়াতুল কুরসী",
        titleEn: "Ayatul Kursi",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        bengali: "আল্লাহ, তিনি ছাড়া কোনো উপাস্য নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তাঁকে তন্দ্রা বা নিদ্রা স্পর্শ করে না। আসমান ও জমিনে যা কিছু আছে সব তাঁরই। কে সে, যে তাঁর অনুমতি ছাড়া তাঁর কাছে সুপারিশ করবে? তিনি জানেন তাদের সামনে ও পেছনে যা আছে। তাঁর ইচ্ছা ছাড়া তাঁর জ্ঞানের কিছুই তারা আয়ত্ত করতে পারে না। তাঁর কুরসী আসমান ও জমিনকে পরিবেষ্টন করে আছে। এগুলোর রক্ষণাবেক্ষণ তাঁকে ক্লান্ত করে না। তিনি সর্বোচ্চ, মহান।",
        english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        transliteration: "Allāhu lā ilāha illā huwal-Ḥayyul-Qayyūm, lā ta'khudhuhu sinatun wa lā nawm, lahu mā fis-samāwāti wa mā fil-arḍ, man dhal-ladhī yashfa'u 'indahu illā bi'idhnih, ya'lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi shay'in min 'ilmihi illā bimā shā', wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhu ḥifẓuhumā, wahuwal-'Aliyyul-'Aẓīm",
        transliterationBn: "আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল ক্বাইয়্যুম, লা তা'খুযুহু সিনাতুও ওয়া লা নাওম, লাহু মা ফিস সামাওয়াতি ওয়া মা ফিল আরদ, মান যাল্লাযী ইয়াশফাউ ইনদাহু ইল্লা বিইযনিহ, ইয়া'লামু মা বাইনা আইদীহিম ওয়া মা খালফাহুম, ওয়া লা ইউহীতূনা বিশাইইম মিন ইলমিহী ইল্লা বিমা শা', ওয়াসিআ কুরসিয়্যুহুস সামাওয়াতি ওয়াল আরদ, ওয়া লা ইয়াউদুহু হিফযুহুমা, ওয়াহুওয়াল আলিয়্যুল আযীম",
        referenceBn: "সূরা বাক্বারা ২:২৫৫, নাসাঈ ৯৯২৮",
        referenceEn: "Surah Al-Baqarah 2:255, Nasa'i 9928"
      },
      {
        id: "tasbeeh-33",
        titleBn: "তাসবীহ (৩৩ বার করে)",
        titleEn: "Tasbeeh (33 times each)",
        arabic: "سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)",
        bengali: "সুবহানাল্লাহ (৩৩ বার), আলহামদুলিল্লাহ (৩৩ বার), আল্লাহু আকবার (৩৪ বার)",
        english: "SubhanAllah (33 times), Alhamdulillah (33 times), Allahu Akbar (34 times)",
        transliteration: "Subḥānallāh (33), Alḥamdulillāh (33), Allāhu Akbar (34)",
        transliterationBn: "সুবহানাল্লাহ (৩৩), আলহামদুলিল্লাহ (৩৩), আল্লাহু আকবার (৩৪)",
        referenceBn: "সহীহ মুসলিম ৫৯৭",
        referenceEn: "Sahih Muslim 597"
      },
      {
        id: "la-ilaha-illallah",
        titleBn: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু",
        titleEn: "La Ilaha Illallahu Wahdahu",
        arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        bengali: "আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই এবং প্রশংসাও তাঁরই। তিনি সব কিছুর উপর ক্ষমতাবান।",
        english: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He is over all things competent.",
        transliteration: "Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamd wa huwa 'alā kulli shay'in qadīr",
        transliterationBn: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহ, লাহুল মুলকু ওয়া লাহুল হামদু ওয়া হুওয়া আলা কুল্লি শাইইন ক্বাদীর",
        referenceBn: "সহীহ মুসলিম ৫৯৪",
        referenceEn: "Sahih Muslim 594"
      },
      {
        id: "la-hawla",
        titleBn: "লা হাওলা ওয়ালা কুওয়াতা",
        titleEn: "La Hawla Wala Quwwata",
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        bengali: "আল্লাহর সাহায্য ছাড়া কোন শক্তি ও ক্ষমতা নেই।",
        english: "There is no might or power except with Allah.",
        transliteration: "Lā ḥawla wa lā quwwata illā billāh",
        transliterationBn: "লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ",
        referenceBn: "সহীহ বুখারী ৬৩৮৪",
        referenceEn: "Sahih Bukhari 6384"
      }
    ]
  },

  // ============ ঈদের নামাজের দোয়া - Eid Prayer Duas ============
  {
    id: "eid-salah",
    nameEnglish: "Eid Prayer Duas",
    nameBengali: "ঈদের নামাজের দোয়া",
    icon: "Moon",
    duas: [
      {
        id: "eid-takbeer",
        titleBn: "ঈদের তাকবীর",
        titleEn: "Eid Takbeer",
        arabic: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
        bengali: "আল্লাহ মহান, আল্লাহ মহান। আল্লাহ ছাড়া কোন উপাস্য নেই। আল্লাহ মহান, আল্লাহ মহান এবং সমস্ত প্রশংসা আল্লাহর জন্য।",
        english: "Allah is the Greatest, Allah is the Greatest. There is no god but Allah. Allah is the Greatest, Allah is the Greatest, and to Allah belongs all praise.",
        transliteration: "Allāhu Akbar, Allāhu Akbar, Lā ilāha illallāh, Wallāhu Akbar, Allāhu Akbar, Wa lillāhil-ḥamd",
        transliterationBn: "আল্লাহু আকবার, আল্লাহু আকবার, লা ইলাহা ইল্লাল্লাহ, ওয়াল্লাহু আকবার, আল্লাহু আকবার, ওয়া লিল্লাহিল হামদ",
        referenceBn: "ইমাম বায়হাক্বী",
        referenceEn: "Imam Bayhaqi"
      },
      {
        id: "eid-greeting",
        titleBn: "ঈদের শুভেচ্ছা দোয়া",
        titleEn: "Eid Greeting Dua",
        arabic: "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
        bengali: "আল্লাহ আমাদের ও আপনাদের (ইবাদত) কবুল করুন।",
        english: "May Allah accept from us and from you.",
        transliteration: "Taqabbalallāhu minnā wa minkum",
        transliterationBn: "তাক্বাব্বালাল্লাহু মিন্না ওয়া মিনকুম",
        referenceBn: "সুনান বায়হাক্বী",
        referenceEn: "Sunan Bayhaqi"
      },
      {
        id: "qurbani-dua",
        titleBn: "কুরবানীর দোয়া",
        titleEn: "Qurbani/Sacrifice Dua",
        arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِنَّ هَٰذَا مِنْكَ وَلَكَ، اللَّهُمَّ تَقَبَّلْ مِنِّي",
        bengali: "আল্লাহর নামে, আল্লাহ মহান। হে আল্লাহ! এটি তোমার পক্ষ থেকে এবং তোমারই জন্য। হে আল্লাহ! আমার পক্ষ থেকে কবুল করো।",
        english: "In the name of Allah, Allah is the Greatest. O Allah, this is from You and for You. O Allah, accept this from me.",
        transliteration: "Bismillāhi wallāhu Akbar, Allāhumma inna hādhā minka wa laka, Allāhumma taqabbal minnī",
        transliterationBn: "বিসমিল্লাহি ওয়াল্লাহু আকবার, আল্লাহুম্মা ইন্না হাযা মিনকা ওয়া লাকা, আল্লাহুম্মা তাক্বাব্বাল মিন্নী",
        referenceBn: "সহীহ মুসলিম ১৯৬৭",
        referenceEn: "Sahih Muslim 1967"
      },
      {
        id: "eid-ul-fitr-dua",
        titleBn: "ঈদুল ফিতরের দোয়া",
        titleEn: "Eid ul Fitr Dua",
        arabic: "اللَّهُمَّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَلْ لِي مِنْ لَدُنْكَ سُلْطَانًا نَصِيرًا",
        bengali: "হে আল্লাহ! আমাকে সত্যের সাথে প্রবেশ করাও এবং সত্যের সাথে বের করো। আর তোমার পক্ষ থেকে আমার জন্য সাহায্যকারী ক্ষমতা দান করো।",
        english: "O Allah, admit me a goodly entrance and bring me forth a goodly exit, and grant me from Yourself supporting authority.",
        transliteration: "Allāhumma adkhilnī mudkhala ṣidqin wa akhrijnī mukhraja ṣidqin waj'al lī min ladunka sulṭānan naṣīrā",
        transliterationBn: "আল্লাহুম্মা আদখিলনী মুদখালা সিদক্বিও ওয়া আখরিজনী মুখরাজা সিদক্বিও ওয়াজ'আল লী মিন লাদুনকা সুলতানান নাসীরা",
        referenceBn: "সূরা বনী ইসরাঈল ১৭:৮০",
        referenceEn: "Surah Al-Isra 17:80"
      }
    ]
  },

  // ============ জানাজার নামাজের দোয়া - Funeral Prayer Duas ============
  {
    id: "janaza-salah",
    nameEnglish: "Funeral Prayer Duas",
    nameBengali: "জানাজার নামাজের দোয়া",
    icon: "Heart",
    duas: [
      {
        id: "janaza-adult-male",
        titleBn: "প্রাপ্তবয়স্ক মৃতের জন্য জানাজার দোয়া",
        titleEn: "Janaza Dua for Adult",
        arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيرِنَا وَكَبِيرِنَا وَذَكَرِنَا وَأُنْثَانَا، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيمَانِ",
        bengali: "হে আল্লাহ! আমাদের জীবিত ও মৃত, উপস্থিত ও অনুপস্থিত, ছোট ও বড়, পুরুষ ও নারী সকলকে ক্ষমা করো। হে আল্লাহ! আমাদের মধ্যে যাদের তুমি জীবিত রাখ তাদের ইসলামের উপর জীবিত রাখ এবং যাদের মৃত্যু দাও তাদের ঈমানের সাথে মৃত্যু দাও।",
        english: "O Allah, forgive our living and our dead, those present and those absent, our young and our old, our males and our females. O Allah, whomever among us You keep alive, let him live upon Islam, and whomever You cause to die, let him die upon faith.",
        transliteration: "Allāhumma-ghfir liḥayyinā wa mayyitinā wa shāhidinā wa ghā'ibinā wa ṣaghīrinā wa kabīrinā wa dhakarinā wa unthānā, Allāhumma man aḥyaytahu minnā fa aḥyihi 'alal-Islām wa man tawaffaytahu minnā fa tawaffahu 'alal-īmān",
        transliterationBn: "আল্লাহুম্মাগফির লিহাইয়িনা ওয়া মাইয়িতিনা ওয়া শাহিদিনা ওয়া গাইবিনা ওয়া সাগীরিনা ওয়া কাবীরিনা ওয়া যাকারিনা ওয়া উনসানা, আল্লাহুম্মা মান আহইয়াইতাহু মিন্না ফা আহয়িহি আলাল ইসলাম ওয়া মান তাওয়াফফাইতাহু মিন্না ফা তাওয়াফফাহু আলাল ঈমান",
        referenceBn: "সুনান আবু দাউদ ৩২০১",
        referenceEn: "Sunan Abu Dawud 3201"
      },
      {
        id: "janaza-child",
        titleBn: "শিশুর জানাজার দোয়া",
        titleEn: "Janaza Dua for Child",
        arabic: "اللَّهُمَّ اجْعَلْهُ فَرَطًا لِوَالِدَيْهِ وَسَلَفًا وَذُخْرًا وَعِظَةً وَاعْتِبَارًا وَشَفِيعًا وَثَقِّلْ بِهِ مَوَازِينَهُمَا وَأَفْرِغِ الصَّبْرَ عَلَىٰ قُلُوبِهِمَا",
        bengali: "হে আল্লাহ! এই শিশুকে তার পিতা-মাতার জন্য অগ্রগামী, পুরস্কার, সঞ্চয়, উপদেশ, শিক্ষা ও সুপারিশকারী বানাও। তার দ্বারা তাদের নেকীর পাল্লা ভারী করো এবং তাদের অন্তরে ধৈর্য ঢেলে দাও।",
        english: "O Allah, make this child a predecessor for his parents, a reward, a treasure, a lesson, a reminder, and an intercessor. Make heavy their scales of good deeds and pour patience into their hearts.",
        transliteration: "Allāhumma-j'alhu faraṭan liwālidayhi wa salafan wa dhukhran wa 'iẓatan wa'tibāran wa shafī'an wa thaqqil bihi mawāzīnahumā wa afrigh-iṣ-ṣabra 'alā qulūbihimā",
        transliterationBn: "আল্লাহুম্মাজ'আলহু ফারাতাল লিওয়ালিদাইহি ওয়া সালাফাও ওয়া যুখরাও ওয়া ইযাতাও ওয়া'তিবারাও ওয়া শাফীআও ওয়া সাক্বক্বিল বিহী মাওয়াযীনাহুমা ওয়া আফরিগিস সাবরা আলা ক্বুলূবিহিমা",
        referenceBn: "আল-মুগনী, ইবনে কুদামা",
        referenceEn: "Al-Mughni, Ibn Qudamah"
      },
      {
        id: "visiting-grave",
        titleBn: "কবর জিয়ারতের দোয়া",
        titleEn: "Dua for Visiting Grave",
        arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
        bengali: "হে মুমিন ও মুসলিম কবরবাসীগণ! তোমাদের উপর শান্তি বর্ষিত হোক। ইনশাআল্লাহ আমরাও তোমাদের সাথে মিলিত হব। আমরা আল্লাহর কাছে আমাদের ও তোমাদের জন্য মঙ্গল কামনা করি।",
        english: "Peace be upon you, O inhabitants of the graves from among the believers and Muslims. Indeed, if Allah wills, we will join you. We ask Allah for wellbeing for us and for you.",
        transliteration: "As-salāmu 'alaykum ahla-diyāri minal-mu'minīna wal-muslimīn, wa innā in shā' Allāhu bikum lāḥiqūn, nas'alullāha lanā wa lakumul-'āfiyah",
        transliterationBn: "আসসালামু আলাইকুম আহলাদ দিয়ারি মিনাল মু'মিনীনা ওয়াল মুসলিমীন, ওয়া ইন্না ইন শা'আল্লাহু বিকুম লাহিকূন, নাসআলুল্লাহা লানা ওয়া লাকুমুল আফিয়াহ",
        referenceBn: "সহীহ মুসলিম ৯৭৫",
        referenceEn: "Sahih Muslim 975"
      },
      {
        id: "lowering-into-grave",
        titleBn: "কবরে নামানোর সময় দোয়া",
        titleEn: "Dua When Lowering into Grave",
        arabic: "بِسْمِ اللَّهِ وَعَلَىٰ مِلَّةِ رَسُولِ اللَّهِ",
        bengali: "আল্লাহর নামে এবং রাসূলুল্লাহ (সা.)-এর ধর্মের উপর।",
        english: "In the name of Allah and upon the religion of the Messenger of Allah.",
        transliteration: "Bismillāhi wa 'alā millati Rasūlillāh",
        transliterationBn: "বিসমিল্লাহি ওয়া আলা মিল্লাতি রাসূলিল্লাহ",
        referenceBn: "সুনান তিরমিযী ১০৪৬",
        referenceEn: "Sunan Tirmidhi 1046"
      }
    ]
  },

  // ============ দৈনন্দিন দোয়া - Daily Life Duas ============
  {
    id: "daily-life",
    nameEnglish: "Daily Life Duas",
    nameBengali: "দৈনন্দিন দোয়া",
    icon: "Calendar",
    duas: [
      {
        id: "before-sleep",
        titleBn: "ঘুমানোর আগে",
        titleEn: "Before Sleeping",
        arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
        bengali: "হে আল্লাহ! তোমার নামেই মৃত্যুবরণ করি এবং জীবিত হই।",
        english: "O Allah, in Your name I die and I live.",
        transliteration: "Allahumma bismika amūtu wa aḥyā",
        transliterationBn: "আল্লাহুম্মা বিসমিকা আমুতু ওয়া আহইয়া",
        referenceBn: "সহীহ বুখারী ৬৩১২",
        referenceEn: "Sahih Bukhari 6312"
      },
      {
        id: "after-waking",
        titleBn: "ঘুম থেকে জাগার পর",
        titleEn: "After Waking Up",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        bengali: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের মৃত্যুর পর জীবিত করেছেন এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে।",
        english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
        transliteration: "Alḥamdu lillāhil-ladhī aḥyānā ba'da mā amātanā wa ilayhin-nushūr",
        transliterationBn: "আলহামদু লিল্লাহিল্লাযী আহইয়ানা বা'দা মা আমাতানা ওয়া ইলাইহিন নুশুর",
        referenceBn: "সহীহ বুখারী ৬৩১২",
        referenceEn: "Sahih Bukhari 6312"
      },
      {
        id: "before-eating",
        titleBn: "খাওয়ার আগে",
        titleEn: "Before Eating",
        arabic: "بِسْمِ اللَّهِ",
        bengali: "আল্লাহর নামে শুরু করছি।",
        english: "In the name of Allah.",
        transliteration: "Bismillāh",
        transliterationBn: "বিসমিল্লাহ",
        referenceBn: "সহীহ মুসলিম ২০২২",
        referenceEn: "Sahih Muslim 2022"
      },
      {
        id: "after-eating",
        titleBn: "খাওয়ার পর",
        titleEn: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        bengali: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাকে এই খাবার খাওয়ালেন এবং আমার কোন শক্তি ও সামর্থ্য ছাড়াই এটি দান করলেন।",
        english: "All praise is for Allah who fed me this and provided it for me without any might or power from myself.",
        transliteration: "Alḥamdu lillāhil-ladhī aṭ'amanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah",
        transliterationBn: "আলহামদু লিল্লাহিল্লাযী আত'আমানী হাযা ওয়া রাযাক্বানীহি মিন গাইরি হাওলিন মিন্নী ওয়া লা কুওয়াহ",
        referenceBn: "তিরমিযী ৩৪৫৮, আবু দাউদ ৪০২৩",
        referenceEn: "Tirmidhi 3458, Abu Dawud 4023"
      },
      {
        id: "entering-home",
        titleBn: "ঘরে প্রবেশের সময়",
        titleEn: "Entering Home",
        arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
        bengali: "আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে আমরা বের হলাম এবং আমাদের প্রতিপালক আল্লাহর উপর আমরা ভরসা করলাম।",
        english: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.",
        transliteration: "Bismillāhi walajnā, wa bismillāhi kharajnā, wa 'alā Allāhi rabbinā tawakkalnā",
        transliterationBn: "বিসমিল্লাহি ওয়ালাজনা, ওয়া বিসমিল্লাহি খারাজনা, ওয়া আলা আল্লাহি রাব্বিনা তাওয়াক্কালনা",
        referenceBn: "আবু দাউদ ৫০৯৬",
        referenceEn: "Abu Dawud 5096"
      },
      {
        id: "leaving-home",
        titleBn: "ঘর থেকে বের হওয়ার সময়",
        titleEn: "Leaving Home",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        bengali: "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করলাম। আল্লাহর সাহায্য ছাড়া কোন শক্তি ও ক্ষমতা নেই।",
        english: "In the name of Allah, I place my trust in Allah. There is no might or power except with Allah.",
        transliteration: "Bismillāhi tawakkaltu 'alallāhi wa lā ḥawla wa lā quwwata illā billāh",
        transliterationBn: "বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহি ওয়া লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ",
        referenceBn: "তিরমিযী ৩৪২৬, আবু দাউদ ৫০৯৫",
        referenceEn: "Tirmidhi 3426, Abu Dawud 5095"
      },
      {
        id: "entering-bathroom",
        titleBn: "বাথরুমে প্রবেশের সময়",
        titleEn: "Entering the Bathroom",
        arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        bengali: "আল্লাহর নামে। হে আল্লাহ! আমি তোমার কাছে পুরুষ ও মহিলা শয়তান থেকে আশ্রয় চাই।",
        english: "In the name of Allah. O Allah, I seek refuge in You from male and female evil spirits.",
        transliteration: "Bismillāh, Allāhumma innī a'ūdhu bika minal-khubuthi wal-khabā'ith",
        transliterationBn: "বিসমিল্লাহ, আল্লাহুম্মা ইন্নী আউযু বিকা মিনাল খুবুসি ওয়াল খাবাইস",
        referenceBn: "সহীহ বুখারী ১৪২, সহীহ মুসলিম ৩৭৫",
        referenceEn: "Sahih Bukhari 142, Sahih Muslim 375"
      },
      {
        id: "leaving-bathroom",
        titleBn: "বাথরুম থেকে বের হওয়ার সময়",
        titleEn: "Leaving the Bathroom",
        arabic: "غُفْرَانَكَ",
        bengali: "হে আল্লাহ! তোমার ক্ষমা চাই।",
        english: "I seek Your forgiveness.",
        transliteration: "Ghufrānak",
        transliterationBn: "গুফরানাকা",
        referenceBn: "তিরমিযী ৭, আবু দাউদ ৩০",
        referenceEn: "Tirmidhi 7, Abu Dawud 30"
      }
    ]
  },

  // ============ মসজিদের দোয়া - Mosque Duas ============
  {
    id: "mosque-duas",
    nameEnglish: "Mosque Duas",
    nameBengali: "মসজিদের দোয়া",
    icon: "Building",
    duas: [
      {
        id: "entering-mosque",
        titleBn: "মসজিদে প্রবেশের সময়",
        titleEn: "Entering the Mosque",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        bengali: "হে আল্লাহ! আমার জন্য তোমার রহমতের দরজাগুলো খুলে দাও।",
        english: "O Allah, open for me the gates of Your mercy.",
        transliteration: "Allāhumma-ftaḥ lī abwāba raḥmatik",
        transliterationBn: "আল্লাহুম্মাফতাহ লী আবওয়াবা রাহমাতিক",
        referenceBn: "সহীহ মুসলিম ৭১৩",
        referenceEn: "Sahih Muslim 713"
      },
      {
        id: "leaving-mosque",
        titleBn: "মসজিদ থেকে বের হওয়ার সময়",
        titleEn: "Leaving the Mosque",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        bengali: "হে আল্লাহ! আমি তোমার অনুগ্রহ প্রার্থনা করছি।",
        english: "O Allah, I ask You from Your bounty.",
        transliteration: "Allāhumma innī as'aluka min faḍlik",
        transliterationBn: "আল্লাহুম্মা ইন্নী আসআলুকা মিন ফাদলিক",
        referenceBn: "সহীহ মুসলিম ৭১৩",
        referenceEn: "Sahih Muslim 713"
      }
    ]
  },

  // ============ সকাল-সন্ধ্যার দোয়া - Morning Evening Duas ============
  {
    id: "morning-evening",
    nameEnglish: "Morning & Evening Duas",
    nameBengali: "সকাল-সন্ধ্যার দোয়া",
    icon: "Sun",
    duas: [
      {
        id: "morning-dua",
        titleBn: "সকালের দোয়া",
        titleEn: "Morning Dua",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        bengali: "আমরা সকালে উপনীত হলাম এবং সকল রাজত্ব ও প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই।",
        english: "We have reached the morning and the kingdom belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        transliteration: "Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah",
        transliterationBn: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ, ওয়াল হামদু লিল্লাহ, লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহ",
        referenceBn: "সহীহ মুসলিম ২৭২৩",
        referenceEn: "Sahih Muslim 2723"
      },
      {
        id: "evening-dua",
        titleBn: "সন্ধ্যার দোয়া",
        titleEn: "Evening Dua",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং সকল রাজত্ব ও প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই।",
        english: "We have reached the evening and the kingdom belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
        transliteration: "Amsaynā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah",
        transliterationBn: "আমসাইনা ওয়া আমসাল মুলকু লিল্লাহ, ওয়াল হামদু লিল্লাহ, লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহ",
        referenceBn: "সহীহ মুসলিম ২৭২৩",
        referenceEn: "Sahih Muslim 2723"
      },
      {
        id: "sayyidul-istighfar",
        titleBn: "সাইয়্যিদুল ইস্তিগফার",
        titleEn: "Sayyidul Istighfar",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        bengali: "হে আল্লাহ! তুমি আমার রব, তুমি ছাড়া কোন উপাস্য নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা। আমি যতটুকু সম্ভব তোমার অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে তোমার আশ্রয় চাই। আমি তোমার নিয়ামতের স্বীকারোক্তি করছি এবং আমার গুনাহের স্বীকারোক্তি করছি। তুমি আমাকে ক্ষমা করো, কেননা তুমি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না।",
        english: "O Allah, You are my Lord. There is no god but You. You created me and I am Your servant. I am upon Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin. So forgive me, for none forgives sins but You.",
        transliteration: "Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa ana 'abduk, wa ana 'alā 'ahdika wa wa'dika mastaṭa't, a'ūdhu bika min sharri mā ṣana't, abū'u laka bini'matika 'alayya wa abū'u bidhanbī, faghfir lī fa innahu lā yaghfirudh-dhunūba illā ant",
        transliterationBn: "আল্লাহুম্মা আনতা রাব্বী লা ইলাহা ইল্লা আনতা, খালাক্বতানী ওয়া আনা আবদুক, ওয়া আনা আলা আহদিকা ওয়া ওয়া'দিকা মাস্তাতা'ত, আউযু বিকা মিন শাররি মা সানা'ত, আবূউ লাকা বিনি'মাতিকা আলাইয়া ওয়া আবূউ বিযানবী, ফাগফির লী ফা ইন্নাহু লা ইয়াগফিরুয যুনূবা ইল্লা আনত",
        referenceBn: "সহীহ বুখারী ৬৩০৬",
        referenceEn: "Sahih Bukhari 6306"
      }
    ]
  },

  // ============ সফরের দোয়া - Travel Duas ============
  {
    id: "travel-duas",
    nameEnglish: "Travel Duas",
    nameBengali: "সফরের দোয়া",
    icon: "Plane",
    duas: [
      {
        id: "starting-journey",
        titleBn: "সফর শুরুর দোয়া",
        titleEn: "Starting a Journey",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
        bengali: "পবিত্র সেই সত্তা যিনি এটি আমাদের অধীন করে দিয়েছেন, আমরা এর সামর্থ্য রাখতাম না। আমাদের অবশ্যই আমাদের প্রতিপালকের কাছে ফিরে যেতে হবে।",
        english: "Glory to Him who has subjected this to us, and we could never have it. And indeed, to our Lord we will return.",
        transliteration: "Subḥānal-ladhī sakh-khara lanā hādhā wa mā kunnā lahu muqrinīn wa innā ilā rabbinā lamunqalibūn",
        transliterationBn: "সুবহানাল্লাযী সাখ্খারা লানা হাযা ওয়া মা কুন্না লাহু মুক্বরিনীন ওয়া ইন্না ইলা রাব্বিনা লামুনক্বালিবূন",
        referenceBn: "সূরা যুখরুফ ৪৩:১৩-১৪, সহীহ মুসলিম ১৩৪২",
        referenceEn: "Surah Az-Zukhruf 43:13-14, Sahih Muslim 1342"
      },
      {
        id: "travel-complete-dua",
        titleBn: "যানবাহনে উঠার সম্পূর্ণ দোয়া",
        titleEn: "Complete Travel Dua",
        arabic: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ",
        bengali: "আল্লাহ সবচেয়ে মহান (৩ বার)। পবিত্র সেই সত্তা যিনি এটি আমাদের অধীন করে দিয়েছেন, আমরা এর সামর্থ্য রাখতাম না। আমাদের অবশ্যই আমাদের রবের কাছে ফিরে যেতে হবে। হে আল্লাহ! আমরা এই সফরে তোমার কাছে নেকী ও তাকওয়া চাই।",
        english: "Allah is the Greatest (3 times). Glory to Him who has subjected this to us, and we could never have it. And indeed, to our Lord we will return. O Allah, we ask You in this journey of ours for righteousness and piety.",
        transliteration: "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, Subḥānal-ladhī sakh-khara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā lamunqalibūn, Allāhumma innā nas'aluka fī safarinā hādhal-birra wat-taqwā",
        transliterationBn: "আল্লাহু আকবার, আল্লাহু আকবার, আল্লাহু আকবার, সুবহানাল্লাযী সাখ্খারা লানা হাযা ওয়া মা কুন্না লাহু মুক্বরিনীন, ওয়া ইন্না ইলা রাব্বিনা লামুনক্বালিবূন, আল্লাহুম্মা ইন্না নাসআলুকা ফী সাফারিনা হাযাল বিররা ওয়াত তাক্বওয়া",
        referenceBn: "সহীহ মুসলিম ১৩৪২",
        referenceEn: "Sahih Muslim 1342"
      }
    ]
  },

  // ============ অযু ও পরিষ্কার-পরিচ্ছন্নতার দোয়া - Wudu Duas ============
  {
    id: "wudu-duas",
    nameEnglish: "Wudu & Cleanliness Duas",
    nameBengali: "অযুর দোয়া",
    icon: "Droplets",
    duas: [
      {
        id: "before-wudu",
        titleBn: "অযু শুরুর আগে",
        titleEn: "Before Wudu",
        arabic: "بِسْمِ اللَّهِ",
        bengali: "আল্লাহর নামে শুরু করছি।",
        english: "In the name of Allah.",
        transliteration: "Bismillāh",
        transliterationBn: "বিসমিল্লাহ",
        referenceBn: "আবু দাউদ ১০১, তিরমিযী ২৫",
        referenceEn: "Abu Dawud 101, Tirmidhi 25"
      },
      {
        id: "after-wudu",
        titleBn: "অযু শেষে",
        titleEn: "After Wudu",
        arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        bengali: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি একক, তাঁর কোন শরীক নেই এবং আমি সাক্ষ্য দিচ্ছি যে, মুহাম্মাদ তাঁর বান্দা ও রাসূল।",
        english: "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and Messenger.",
        transliteration: "Ash-hadu an lā ilāha illallāhu waḥdahu lā sharīka lahu wa ash-hadu anna Muḥammadan 'abduhu wa rasūluh",
        transliterationBn: "আশহাদু আন লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহ",
        referenceBn: "সহীহ মুসলিম ২৩৪",
        referenceEn: "Sahih Muslim 234"
      },
      {
        id: "after-wudu-complete",
        titleBn: "অযু শেষে সম্পূর্ণ দোয়া",
        titleEn: "Complete Dua After Wudu",
        arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
        bengali: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই এবং মুহাম্মাদ তাঁর বান্দা ও রাসূল। হে আল্লাহ! আমাকে তওবাকারীদের অন্তর্ভুক্ত করো এবং পবিত্রতা অর্জনকারীদের অন্তর্ভুক্ত করো।",
        english: "I bear witness that there is no god but Allah alone and that Muhammad is His servant and Messenger. O Allah, make me among those who repent and make me among those who purify themselves.",
        transliteration: "Ash-hadu an lā ilāha illallāhu waḥdahu lā sharīka lahu wa ash-hadu anna Muḥammadan 'abduhu wa rasūluh, Allāhummaj'alnī minat-tawwābīna waj'alnī minal-mutaṭahhirīn",
        transliterationBn: "আশহাদু আন লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহ, আল্লাহুম্মাজ'আলনী মিনাত তাওয়াবীন ওয়াজ'আলনী মিনাল মুতাতাহহিরীন",
        referenceBn: "তিরমিযী ৫৫",
        referenceEn: "Tirmidhi 55"
      }
    ]
  }
];
