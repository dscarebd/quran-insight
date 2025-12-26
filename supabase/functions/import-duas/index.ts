import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Full dua categories data imported from the local file
const duaCategories = [
  {
    id: "daily-life",
    nameEnglish: "Daily Life Duas",
    nameBengali: "দৈনন্দিন দোয়া",
    nameHindi: "दैनिक दुआएं",
    icon: "Calendar",
    duas: [
      { id: "daily-1", titleBengali: "রাগ নিয়ন্ত্রণের দোয়া", titleEnglish: "Anger Control", titleHindi: "क्रोध नियंत्रण की दुआ", arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", transliteration: "A'udhu billahi minash-shaytanir-rajim", transliterationBengali: "আ'ঊযু বিল্লাহি মিনাশ শাইতানির রাজীম", transliterationHindi: "अऊज़ु बिल्लाहि मिनश्-शैतानिर्-रजीम", bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই", english: "I seek refuge in Allah from the accursed Satan", hindi: "मैं शैतान मरदूद से अल्लाह की पनाह माँगता हूँ", reference: "সহীহ বুখারী, হাদিস নং ৩২৮২" },
      { id: "daily-2", titleBengali: "খাবার শুরুর দোয়া", titleEnglish: "Before Eating", titleHindi: "खाना खाने से पहले की दुआ", arabic: "بِسْمِ اللَّهِ", transliteration: "Bismillah", transliterationBengali: "বিসমিল্লাহ", transliterationHindi: "बिस्मिल्लाह", bengali: "আল্লাহর নামে (খাবার শুরু করছি)", english: "In the name of Allah", hindi: "अल्लाह के नाम से (खाना शुरू करता हूँ)", reference: "সহীহ মুসলিম, হাদিস নং ২০১৮" },
      { id: "daily-3", titleBengali: "খাবার শেষে দোয়া", titleEnglish: "After Eating", titleHindi: "खाना खाने के बाद की दुआ", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا", transliteration: "Alhamdulillahilladhi at'amani hadha", transliterationBengali: "আলহামদুলিল্লাহিল্লাযী আত'আমানী হাযা", transliterationHindi: "अल्हम्दुलिल्लाहिल्लज़ी अत्अमनी हाज़ा", bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাকে এই খাবার দিয়েছেন", english: "Praise be to Allah who fed me this", hindi: "सभी तारीफ़ अल्लाह की जिसने मुझे यह खाना खिलाया", reference: "সুনান তিরমিযী, হাদিস নং ৩৪৫৮" },
      { id: "daily-4", titleBengali: "ঘুমানোর আগে দোয়া", titleEnglish: "Before Sleeping", titleHindi: "सोने से पहले की दुआ", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", transliteration: "Bismika Allahumma amutu wa ahya", transliterationBengali: "বিসমিকা আল্লাহুম্মা আমূতু ওয়া আহইয়া", transliterationHindi: "बिस्मिका अल्लाहुम्मा अमूतु व अह्या", bengali: "হে আল্লাহ আপনার নামে আমি ঘুমাই ও জাগি", english: "In Your name I die and live", hindi: "ऐ अल्लाह तेरे नाम से मैं सोता और जागता हूँ", reference: "সহীহ বুখারী, হাদিস নং ৬৩২৪" },
      { id: "daily-5", titleBengali: "ঘুম থেকে ওঠার দোয়া", titleEnglish: "After Waking Up", titleHindi: "उठने के बाद की दुआ", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا", transliteration: "Alhamdulillahil-ladhi ahyana", transliterationBengali: "আলহামদুলিল্লাহিল্লাযী আহইয়ানা", transliterationHindi: "अल्हम्दुलिल्लाहिल्लज़ी अह्यानना", bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের জীবিত করেছেন", english: "Praise be to Allah who gave us life", hindi: "सभी तारीफ़ अल्लाह की जिसने हमें ज़िंदा किया", reference: "সহীহ বুখারী, হাদিস নং ৬৩১২" },
      { id: "daily-6", titleBengali: "টয়লেটে প্রবেশের দোয়া", titleEnglish: "Entering Toilet", titleHindi: "शौचालय में प्रवेश की दुआ", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ", transliteration: "Allahumma inni a'udhu bika minal-khubthi", transliterationBengali: "আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিনাল খুবুসি", transliterationHindi: "अल्लाहुम्मा इन्नी अऊज़ु बिका मिनल खुबसि", bengali: "হে আল্লাহ অপবিত্রতা থেকে আপনার আশ্রয় চাই", english: "O Allah I seek refuge in You from impurity", hindi: "ऐ अल्लाह मैं तेरी पनाह माँगता हूँ नापाकी से", reference: "সহীহ বুখারী, হাদিস নং ১৪২" },
      { id: "daily-7", titleBengali: "টয়লেট থেকে বের হওয়ার দোয়া", titleEnglish: "Leaving Toilet", titleHindi: "शौचालय से बाहर निकलने की दुआ", arabic: "غُفْرَانَكَ", transliteration: "Ghufranak", transliterationBengali: "গুফরানাক", transliterationHindi: "ग़ुफ़रानक", bengali: "হে আল্লাহ আপনার ক্ষমা চাই", english: "I seek Your forgiveness", hindi: "ऐ अल्लाह मैं तेरी माफ़ी चाहता हूँ", reference: "সুনান আবু দাউদ, হাদিস নং ৩০" },
      { id: "daily-8", titleBengali: "বাড়ি থেকে বের হওয়ার দোয়া", titleEnglish: "Leaving Home", titleHindi: "घर से निकलने की दुआ", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ", transliteration: "Bismillahi tawakkaltu 'alallah", transliterationBengali: "বিসমিল্লাহি তাওয়াক্কালতু 'আলাল্লাহ", transliterationHindi: "बिस्मिल्लाहि तवक्कल्तु अलल्लाह", bengali: "আল্লাহর উপর ভরসা করে বের হচ্ছি", english: "In the name of Allah I trust in Allah", hindi: "अल्लाह के नाम से, अल्लाह पर भरोसा करके निकलता हूँ", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৫" },
      { id: "daily-9", titleBengali: "বাড়িতে প্রবেশের দোয়া", titleEnglish: "Entering Home", titleHindi: "घर में प्रवेश की दुआ", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ", transliteration: "Allahumma inni as'aluka khayral-mawlij", transliterationBengali: "আল্লাহুম্মা ইন্নী আস'আলুকা খাইরাল মাওলিজ", transliterationHindi: "अल्लाहुम्मा इन्नी अस्अलुका खैरल मौलिज", bengali: "হে আল্লাহ উত্তম প্রবেশ চাই", english: "O Allah I ask You for a good entry", hindi: "ऐ अल्लाह मैं तुझसे अच्छे प्रवेश की दुआ करता हूँ", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯৬" },
      { id: "daily-10", titleBengali: "নতুন জামা পরার দোয়া", titleEnglish: "Wearing New Clothes", arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي", transliteration: "Alhamdulillahil-ladhi kasani", transliterationBengali: "আলহামদুলিল্লাহিল্লাযী কাসানী", bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাকে পরিধান করিয়েছেন", english: "Praise be to Allah who clothed me", reference: "সুনান আবু দাউদ, হাদিস নং ৪০২০" }
    ]
  },
  {
    id: "morning-evening",
    nameEnglish: "Morning & Evening",
    nameBengali: "সকাল-সন্ধ্যা",
    nameHindi: "सुबह-शाम की दुआएं",
    icon: "Sun",
    duas: [
      { id: "morning-1", titleBengali: "সকালের জিকির", titleEnglish: "Morning Remembrance", titleHindi: "सुबह का ज़िक्र", arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ", transliteration: "Asbahna wa asbahal-mulku lillah", transliterationBengali: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ", transliterationHindi: "असबहना व असबहल मुल्कु लिल्लाह", bengali: "আমরা সকালে উপনীত হলাম এবং রাজত্ব আল্লাহর", english: "We have reached the morning and the kingdom belongs to Allah", hindi: "हम सुबह में आए और बादशाही अल्लाह की है", reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩" },
      { id: "morning-2", titleBengali: "সন্ধ্যার জিকির", titleEnglish: "Evening Remembrance", titleHindi: "शाम का ज़िक्र", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ", transliteration: "Amsayna wa amsal-mulku lillah", transliterationBengali: "আমসাইনা ওয়া আমসাল মুলকু লিল্লাহ", transliterationHindi: "अम्सैना व अम्सल मुल्कु लिल्लाह", bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং রাজত্ব আল্লাহর", english: "We have reached the evening and the kingdom belongs to Allah", hindi: "हम शाम में आए और बादशाही अल्लाह की है", reference: "সহীহ মুসলিম, হাদিস নং ২৭২৩" },
      { id: "morning-3", titleBengali: "সুরক্ষার দোয়া", titleEnglish: "Protection Dua", titleHindi: "सुरक्षा की दुआ", arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ", transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'", transliterationBengali: "বিসমিল্লাহিল্লাযী লা ইয়াদুররু মা'আসমিহী শাই'", transliterationHindi: "बिस्मिल्लाहिल्लज़ी ला यज़ुर्रु माअस्मिही शैइन", bengali: "আল্লাহর নামে যার নামের সাথে কোনো কিছু ক্ষতি করতে পারে না", english: "In the name of Allah with whose name nothing can harm", hindi: "अल्लाह के नाम से जिसके नाम के साथ कुछ भी नुकसान नहीं कर सकता", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৮৮" },
      { id: "morning-4", titleBengali: "তাওবার দোয়া", titleEnglish: "Repentance Dua", arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", transliteration: "Astaghfirullaha wa atubu ilayh", transliterationBengali: "আস্তাগফিরুল্লাহা ওয়া আতুবু ইলাইহি", bengali: "আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তওবা করি", english: "I seek Allah's forgiveness and turn to Him", reference: "সহীহ বুখারী, হাদিস নং ৬৩০৭" },
      { id: "morning-5", titleBengali: "সকাল-সন্ধ্যার সাইয়িদুল ইস্তিগফার", titleEnglish: "Master of Forgiveness", arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ", transliteration: "Allahumma anta rabbi la ilaha illa anta", transliterationBengali: "আল্লাহুম্মা আনতা রব্বী লা ইলাহা ইল্লা আনতা", bengali: "হে আল্লাহ তুমি আমার রব, তুমি ছাড়া কোনো ইলাহ নেই", english: "O Allah You are my Lord, there is no god but You", reference: "সহীহ বুখারী, হাদিস নং ৬৩০৬" }
    ]
  },
  {
    id: "protection",
    nameEnglish: "Protection Duas",
    nameBengali: "সুরক্ষার দোয়া",
    nameHindi: "सुरक्षा की दुआएं",
    icon: "Shield",
    duas: [
      { id: "protection-1", titleBengali: "আয়াতুল কুরসী", titleEnglish: "Ayatul Kursi", titleHindi: "आयतुल कुर्सी", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", transliteration: "Allahu la ilaha illa huwal hayyul qayyum", transliterationBengali: "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়্যুল কাইয়্যূম", transliterationHindi: "अल्लाहु ला इलाहा इल्ला हुवल हय्युल क़य्यूम", bengali: "আল্লাহ, তিনি ছাড়া কোনো ইলাহ নেই, তিনি চিরঞ্জীব ও সর্বসত্তার ধারক", english: "Allah, there is no god but He, the Ever-Living, the Self-Subsisting", hindi: "अल्लाह, उसके सिवा कोई माबूद नहीं, वह हमेशा जीने वाला, सब को संभालने वाला है", reference: "সূরা আল-বাক়ারাহ ২:২৫৫" },
      { id: "protection-2", titleBengali: "সূরা ইখলাস", titleEnglish: "Surah Ikhlas", titleHindi: "सूरह इख्लास", arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwa Allahu ahad", transliterationBengali: "কুল হুয়াল্লাহু আহাদ", transliterationHindi: "क़ुल हुवल्लाहु अहद", bengali: "বলুন, তিনি আল্লাহ, এক", english: "Say: He is Allah, the One", hindi: "कहो, वह अल्लाह एक है", reference: "সূরা আল-ইখলাস ১১২:১" },
      { id: "protection-3", titleBengali: "সূরা ফালাক", titleEnglish: "Surah Falaq", titleHindi: "सूरह फ़लक़", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'udhu bi rabbil-falaq", transliterationBengali: "কুল আ'ঊযু বি রব্বিল ফালাক", transliterationHindi: "क़ुल अऊज़ु बि रब्बिल फ़लक़", bengali: "বলুন, আমি আশ্রয় চাই প্রভাতের রবের কাছে", english: "Say: I seek refuge with the Lord of the daybreak", hindi: "कहो, मैं सुबह के रब की पनाह चाहता हूँ", reference: "সূরা আল-ফালাক ১১৩:১" },
      { id: "protection-4", titleBengali: "সূরা নাস", titleEnglish: "Surah Nas", titleHindi: "सूरह नास", arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'udhu bi rabbin-nas", transliterationBengali: "কুল আ'ঊযু বি রব্বিন নাস", transliterationHindi: "क़ुल अऊज़ु बि रब्बिन्नास", bengali: "বলুন, আমি আশ্রয় চাই মানুষের রবের কাছে", english: "Say: I seek refuge with the Lord of mankind", hindi: "कहो, मैं इंसानों के रब की पनाह चाहता हूँ", reference: "সূরা আন-নাস ১১৪:১" },
      { id: "protection-5", titleBengali: "বিপদ থেকে সুরক্ষা", titleEnglish: "Protection from Harm", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ", transliteration: "A'udhu bikalimati llahit-tammati", transliterationBengali: "আ'ঊযু বিকালিমাতিল্লাহিত তাম্মাতি", bengali: "আল্লাহর পূর্ণ বাণীসমূহের আশ্রয় নিচ্ছি", english: "I seek refuge in the perfect words of Allah", reference: "সহীহ মুসলিম, হাদিস নং ২৭০৮" }
    ]
  },
  {
    id: "salah",
    nameEnglish: "Prayer (Salah)",
    nameBengali: "নামাজের দোয়া",
    nameHindi: "नमाज़ की दुआएं",
    icon: "Heart",
    duas: [
      { id: "salah-1", titleBengali: "নামাজ শুরুর দোয়া", titleEnglish: "Opening Dua of Prayer", arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ", transliteration: "Subhanaka Allahumma wa bihamdik", transliterationBengali: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা", bengali: "হে আল্লাহ আপনি পবিত্র এবং আপনার প্রশংসা", english: "Glory be to You O Allah and praise be to You", reference: "সহীহ বুখারী, হাদিস নং ৭৪৪" },
      { id: "salah-2", titleBengali: "রুকুর তাসবীহ", titleEnglish: "Tasbeeh in Ruku", arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", transliteration: "Subhana rabbiyal 'azim", transliterationBengali: "সুবহানা রব্বিয়াল 'আযীম", bengali: "পবিত্র আমার মহান রব", english: "Glory be to my Lord the Most Great", reference: "সহীহ মুসলিম, হাদিস নং ৭৭২" },
      { id: "salah-3", titleBengali: "সিজদার তাসবীহ", titleEnglish: "Tasbeeh in Sujood", arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى", transliteration: "Subhana rabbiyal a'la", transliterationBengali: "সুবহানা রব্বিয়াল আ'লা", bengali: "পবিত্র আমার সর্বোচ্চ রব", english: "Glory be to my Lord the Most High", reference: "সহীহ মুসলিম, হাদিস নং ৭৭২" },
      { id: "salah-4", titleBengali: "তাশাহহুদ", titleEnglish: "Tashahhud", arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ", transliteration: "At-tahiyyatu lillahi was-salawat", transliterationBengali: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াত", bengali: "সমস্ত অভিবাদন আল্লাহর জন্য এবং সকল সালাত", english: "All greetings are for Allah and all prayers", reference: "সহীহ বুখারী, হাদিস নং ৮৩১" },
      { id: "salah-5", titleBengali: "দরূদ শরীফ", titleEnglish: "Durood Shareef", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", transliteration: "Allahumma salli 'ala Muhammad", transliterationBengali: "আল্লাহুম্মা সাল্লি 'আলা মুহাম্মাদ", bengali: "হে আল্লাহ মুহাম্মাদের উপর দরূদ পাঠান", english: "O Allah send blessings upon Muhammad", reference: "সহীহ বুখারী, হাদিস নং ৩৩৭০" }
    ]
  },
  {
    id: "quran",
    nameEnglish: "Quranic Duas",
    nameBengali: "কুরআনের দোয়া",
    nameHindi: "कुरआन की दुआएं",
    icon: "BookOpen",
    duas: [
      { id: "quran-1", titleBengali: "সূরা ফাতিহা", titleEnglish: "Surah Fatiha", titleHindi: "सूरह फातिहा", arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Alhamdu lillahi rabbil 'alamin", transliterationBengali: "আলহামদু লিল্লাহি রব্বিল 'আলামীন", transliterationHindi: "अलहम्दु लिल्लाहि रब्बिल आलमीन", bengali: "সমস্ত প্রশংসা আল্লাহর যিনি বিশ্বজগতের রব", english: "Praise be to Allah, Lord of all the worlds", hindi: "सभी तारीफ़ अल्लाह की जो सारे जहानों का रब है", reference: "সূরা আল-ফাতিহা ১:২" },
      { id: "quran-2", titleBengali: "হেদায়েতের দোয়া", titleEnglish: "Guidance Dua", titleHindi: "हिदायत की दुआ", arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا", transliteration: "Rabbana la tuzigh qulubana", transliterationBengali: "রব্বানা লা তুযিগ কুলুবানা", transliterationHindi: "रब्बना ला तुज़िग़ क़ुलूबना", bengali: "হে আমাদের রব আমাদের অন্তর বিপথগামী করো না", english: "Our Lord do not let our hearts deviate", hindi: "ऐ हमारे रब हमारे दिलों को गुमराह मत कर", reference: "সূরা আলে ইমরান ৩:৮" },
      { id: "quran-3", titleBengali: "দুনিয়া ও আখিরাতের দোয়া", titleEnglish: "Dunya and Akhirah Dua", titleHindi: "दुनिया और आखिरत की दुआ", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", transliteration: "Rabbana atina fid-dunya hasanah", transliterationBengali: "রব্বানা আতিনা ফিদ দুনইয়া হাসানাহ", transliterationHindi: "रब्बना आतिना फ़िद्दुनिया हसनतन", bengali: "হে আমাদের রব দুনিয়াতে কল্যাণ দাও", english: "Our Lord give us good in this world", hindi: "ऐ हमारे रब हमें दुनिया में भलाई दे", reference: "সূরা আল-বাক়ারাহ ২:২০১" },
      { id: "quran-4", titleBengali: "ধৈর্যের দোয়া", titleEnglish: "Patience Dua", titleHindi: "सब्र की दुआ", arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا", transliteration: "Rabbana afrigh 'alayna sabra", transliterationBengali: "রব্বানা আফরিগ 'আলাইনা সাবরা", transliterationHindi: "रब्बना अफ़रिग़ अलैना सब्रन", bengali: "হে আমাদের রব আমাদের ধৈর্য দান করো", english: "Our Lord pour upon us patience", hindi: "ऐ हमारे रब हम पर सब्र नाज़िल फ़रमा", reference: "সূরা আল-বাক়ারাহ ২:২৫০" },
      { id: "quran-5", titleBengali: "ক্ষমার দোয়া", titleEnglish: "Forgiveness Dua", titleHindi: "माफ़ी की दुआ", arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا", transliteration: "Rabbanagh-fir lana dhunubana", transliterationBengali: "রব্বানাগফির লানা যুনূবানা", transliterationHindi: "रब्बनग़्फ़िर लना ज़ुनूबना", bengali: "হে আমাদের রব আমাদের গুনাহ ক্ষমা করো", english: "Our Lord forgive us our sins", hindi: "ऐ हमारे रब हमारे गुनाहों को माफ़ कर", reference: "সূরা আলে ইমরান ৩:১৪৭" }
    ]
  },
  {
    id: "travel",
    nameEnglish: "Travel Duas",
    nameBengali: "ভ্রমণের দোয়া",
    nameHindi: "सफ़र की दुआएं",
    icon: "Plane",
    duas: [
      { id: "travel-1", titleBengali: "সফর শুরুর দোয়া", titleEnglish: "Starting Journey", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا", transliteration: "Subhanal-ladhi sakhkhara lana hadha", transliterationBengali: "সুবহানাল্লাযী সাখখারা লানা হাযা", bengali: "পবিত্র তিনি যিনি এটি আমাদের বশীভূত করে দিয়েছেন", english: "Glory to Him who has subjected this to us", reference: "সূরা আয-যুখরুফ ৪৩:১৩" },
      { id: "travel-2", titleBengali: "যানবাহনে চড়ার দোয়া", titleEnglish: "Boarding Vehicle", arabic: "بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ", transliteration: "Bismillahi wal hamdulillah", transliterationBengali: "বিসমিল্লাহি ওয়াল হামদুলিল্লাহ", bengali: "আল্লাহর নামে এবং সমস্ত প্রশংসা আল্লাহর", english: "In the name of Allah and praise be to Allah", reference: "সুনান আবু দাউদ, হাদিস নং ২৬০২" },
      { id: "travel-3", titleBengali: "সফরের সুরক্ষা", titleEnglish: "Travel Protection", arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا", transliteration: "Allahumma inna nas'aluka fi safarina", transliterationBengali: "আল্লাহুম্মা ইন্না নাস'আলুকা ফী সাফারিনা", bengali: "হে আল্লাহ আমরা এই সফরে তোমার কাছে চাই", english: "O Allah we ask You in our journey", reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২" },
      { id: "travel-4", titleBengali: "সফর থেকে ফেরার দোয়া", titleEnglish: "Returning from Journey", arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ", transliteration: "Ayibuna ta'ibuna 'abidun", transliterationBengali: "আয়িবুনা তা'ইবুনা 'আবিদুন", bengali: "আমরা ফিরছি, তওবা করছি, ইবাদত করছি", english: "We return repentant worshipping", reference: "সহীহ বুখারী, হাদিস নং ১৭৯৭" },
      { id: "travel-5", titleBengali: "নতুন শহরে প্রবেশ", titleEnglish: "Entering New City", arabic: "اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ", transliteration: "Allahumma rabbas-samawatis-sab'", transliterationBengali: "আল্লাহুম্মা রব্বাস সামাওয়াতিস সাব'", bengali: "হে আল্লাহ সাত আসমানের রব", english: "O Allah Lord of the seven heavens", reference: "ইবনে হিব্বান, হাদিস নং ২৭০৭" }
    ]
  },
  {
    id: "health",
    nameEnglish: "Health & Healing",
    nameBengali: "সুস্থতার দোয়া",
    nameHindi: "स्वास्थ्य की दुआएं",
    icon: "Activity",
    duas: [
      { id: "health-1", titleBengali: "অসুস্থতায় দোয়া", titleEnglish: "When Sick", titleHindi: "बीमारी में दुआ", arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ", transliteration: "Allahumma rabban-nasi adhhibil-ba's", transliterationBengali: "আল্লাহুম্মা রব্বান নাসি আযহিবিল বা'স", transliterationHindi: "अल्लाहुम्मा रब्बन्नासि अज़हिबिल बा'स", bengali: "হে আল্লাহ মানুষের রব কষ্ট দূর করুন", english: "O Allah Lord of people remove the affliction", hindi: "ऐ अल्लाह लोगों के रब तकलीफ़ दूर कर दे", reference: "সহীহ বুখারী, হাদিস নং ৫৭৫০" },
      { id: "health-2", titleBengali: "রোগীকে দেখতে গিয়ে দোয়া", titleEnglish: "Visiting the Sick", titleHindi: "बीमार की तीमारदारी में दुआ", arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", transliteration: "La ba'sa tahurun in sha'Allah", transliterationBengali: "লা বা'সা তাহুরুন ইন শা'আল্লাহ", transliterationHindi: "ला बा'स तहूरुन इन शा अल्लाह", bengali: "কোনো সমস্যা নেই, ইনশাআল্লাহ পবিত্রতা হবে", english: "No harm, it is a purification if Allah wills", hindi: "कोई बात नहीं, इंशाअल्लाह पाक हो जाओगे", reference: "সহীহ বুখারী, হাদিস নং ৫৬৫৬" },
      { id: "health-3", titleBengali: "ব্যথার জায়গায় দোয়া", titleEnglish: "For Pain", titleHindi: "दर्द के लिए दुआ", arabic: "بِسْمِ اللَّهِ ثَلَاثًا", transliteration: "Bismillahi thalathan", transliterationBengali: "বিসমিল্লাহি সালাসান", transliterationHindi: "बिस्मिल्लाहि सलासन", bengali: "তিনবার আল্লাহর নামে", english: "In the name of Allah three times", hindi: "तीन बार अल्लाह के नाम से", reference: "সহীহ মুসলিম, হাদিস নং ২২০২" },
      { id: "health-4", titleBengali: "সুস্থতার জন্য দোয়া", titleEnglish: "For Good Health", titleHindi: "अच्छी सेहत के लिए दुआ", arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي", transliteration: "Allahumma 'afini fi badani", transliterationBengali: "আল্লাহুম্মা 'আফিনী ফী বাদানী", transliterationHindi: "अल्लाहुम्मा आफ़िनी फ़ी बदनी", bengali: "হে আল্লাহ আমার শরীরে সুস্থতা দাও", english: "O Allah grant me health in my body", hindi: "ऐ अल्लाह मुझे मेरे जिस्म में सेहत दे", reference: "সুনান আবু দাউদ, হাদিস নং ৫০৯০" },
      { id: "health-5", titleBengali: "চোখের সুরক্ষা", titleEnglish: "Eye Protection", arabic: "اللَّهُمَّ مَتِّعْنِي بِسَمْعِي وَبَصَرِي", transliteration: "Allahumma matti'ni bisam'i wa basari", transliterationBengali: "আল্লাহুম্মা মাত্তি'নী বিসাম'ঈ ওয়া বাসারী", bengali: "হে আল্লাহ আমাকে শ্রবণ ও দৃষ্টি দ্বারা উপকৃত কর", english: "O Allah let me enjoy my hearing and sight", reference: "সুনান তিরমিযী, হাদিস নং ৩৫০২" }
    ]
  }
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting dua import process...');
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let categoriesImported = 0;
    let duasImported = 0;
    let errors: string[] = [];

    // Import categories first
    for (let i = 0; i < duaCategories.length; i++) {
      const category = duaCategories[i];
      
      console.log(`Importing category: ${category.nameEnglish}`);
      
      // Insert or update category
      const { error: categoryError } = await supabase
        .from('dua_categories')
        .upsert({
          category_id: category.id,
          name_english: category.nameEnglish,
          name_bengali: category.nameBengali,
          name_hindi: category.nameHindi || null,
          icon: category.icon,
          display_order: i
        }, {
          onConflict: 'category_id'
        });

      if (categoryError) {
        console.error(`Error importing category ${category.id}:`, categoryError);
        errors.push(`Category ${category.id}: ${categoryError.message}`);
        continue;
      }

      categoriesImported++;

      // Import duas for this category
      for (const dua of category.duas) {
        const { error: duaError } = await supabase
          .from('duas')
          .upsert({
            category_id: category.id,
            dua_id: dua.id,
            title_english: dua.titleEnglish || dua.id,
            title_bengali: dua.titleBengali || '',
            title_hindi: dua.titleHindi || null,
            arabic: dua.arabic,
            transliteration: dua.transliteration || null,
            transliteration_bengali: dua.transliterationBengali || null,
            transliteration_hindi: dua.transliterationHindi || null,
            english: dua.english,
            bengali: dua.bengali,
            hindi: dua.hindi || null,
            reference: dua.reference || null
          }, {
            onConflict: 'category_id,dua_id'
          });

        if (duaError) {
          console.error(`Error importing dua ${dua.id}:`, duaError);
          errors.push(`Dua ${dua.id}: ${duaError.message}`);
          continue;
        }

        duasImported++;
      }
    }

    console.log(`Import complete. Categories: ${categoriesImported}, Duas: ${duasImported}, Errors: ${errors.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Imported ${categoriesImported} categories and ${duasImported} duas`,
        categoriesImported,
        duasImported,
        errors: errors.length > 0 ? errors : undefined
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
