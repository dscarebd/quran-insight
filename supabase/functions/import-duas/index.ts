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
      { id: "salah-2", titleBengali: "রুকুর দোয়া", titleEnglish: "Ruku Dua", arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", transliteration: "Subhana rabbiyal-azim", transliterationBengali: "সুবহানা রব্বিয়াল আযীম", bengali: "আমার মহান রব পবিত্র", english: "Glory be to my Lord the Almighty", reference: "সহীহ মুসলিম, হাদিস নং ৭৭২" },
      { id: "salah-3", titleBengali: "সিজদার দোয়া", titleEnglish: "Sujud Dua", arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى", transliteration: "Subhana rabbiyal-a'la", transliterationBengali: "সুবহানা রব্বিয়াল আ'লা", bengali: "আমার সর্বোচ্চ রব পবিত্র", english: "Glory be to my Lord the Most High", reference: "সহীহ মুসলিম, হাদিস নং ৭৭২" },
      { id: "salah-4", titleBengali: "তাশাহহুদ", titleEnglish: "Tashahhud", arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ", transliteration: "At-tahiyyatu lillahi was-salawatu", transliterationBengali: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু", bengali: "সকল সম্মান ও নামাজ আল্লাহর জন্য", english: "All greetings and prayers are for Allah", reference: "সহীহ বুখারী, হাদিস নং ৮৩১" },
      { id: "salah-5", titleBengali: "দুরুদ শরীফ", titleEnglish: "Durood Sharif", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", transliteration: "Allahumma salli ala Muhammad", transliterationBengali: "আল্লাহুম্মা সাল্লি 'আলা মুহাম্মাদ", bengali: "হে আল্লাহ মুহাম্মাদের উপর রহমত বর্ষণ করুন", english: "O Allah send blessings upon Muhammad", reference: "সহীহ বুখারী, হাদিস নং ৩৩৭০" }
    ]
  },
  {
    id: "travel",
    nameEnglish: "Travel Duas",
    nameBengali: "সফরের দোয়া",
    nameHindi: "सफ़र की दुआएं",
    icon: "MapPin",
    duas: [
      { id: "travel-1", titleBengali: "যানবাহনে ওঠার দোয়া", titleEnglish: "Upon Boarding Vehicle", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا", transliteration: "Subhanal-ladhi sakh-khara lana hadha", transliterationBengali: "সুবহানাল্লাযী সাখখারা লানা হাযা", bengali: "পবিত্র সেই সত্তা যিনি এটা আমাদের অধীন করে দিয়েছেন", english: "Glory be to Him who has subjected this to us", reference: "সূরা যুখরুফ ৪৩:১৩-১৪" },
      { id: "travel-2", titleBengali: "সফর শুরুর দোয়া", titleEnglish: "Starting Journey", arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا", transliteration: "Allahumma hawwin alayna safarana", transliterationBengali: "আল্লাহুম্মা হাওয়িন 'আলাইনা সাফারানা", bengali: "হে আল্লাহ আমাদের সফর সহজ করে দিন", english: "O Allah make our journey easy for us", reference: "সহীহ মুসলিম, হাদিস নং ১৩৪২" },
      { id: "travel-3", titleBengali: "সফর থেকে ফেরার দোয়া", titleEnglish: "Returning from Journey", arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ", transliteration: "Ayibuna ta'ibuna 'abidun", transliterationBengali: "আইবূনা তা'ইবূনা 'আবিদূন", bengali: "আমরা প্রত্যাবর্তনকারী তওবাকারী ইবাদতকারী", english: "We return repenting worshipping", reference: "সহীহ বুখারী, হাদিস নং ১৭৯৭" }
    ]
  },
  {
    id: "health",
    nameEnglish: "Health & Healing",
    nameBengali: "স্বাস্থ্য ও রোগমুক্তি",
    nameHindi: "स्वास्थ्य की दुआएं",
    icon: "Heart",
    duas: [
      { id: "health-1", titleBengali: "রোগ থেকে মুক্তির দোয়া", titleEnglish: "Healing Dua", arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ", transliteration: "Allahumma rabban-nasi adhhibil-ba's", transliterationBengali: "আল্লাহুম্মা রব্বান নাসি আযহিবিল বা'স", bengali: "হে আল্লাহ মানুষের রব কষ্ট দূর করে দিন", english: "O Allah Lord of mankind remove the affliction", reference: "সহীহ বুখারী, হাদিস নং ৫৭৫০" },
      { id: "health-2", titleBengali: "অসুস্থ দেখে দোয়া", titleEnglish: "Visiting the Sick", arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", transliteration: "La ba'sa tahur in sha Allah", transliterationBengali: "লা বা'সা তাহূর ইন শা আল্লাহ", bengali: "কোনো ক্ষতি নেই ইনশাআল্লাহ পবিত্রতা হবে", english: "No worry it is a purification if Allah wills", reference: "সহীহ বুখারী, হাদিস নং ৩৬১৬" }
    ]
  }
];

async function verifyAdminRole(supabase: any, authHeader: string): Promise<{ isAdmin: boolean; error?: string }> {
  try {
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return { isAdmin: false, error: 'Invalid or expired token' };
    }

    const { data: hasRole, error: roleError } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError) {
      console.error('Role check error:', roleError);
      return { isAdmin: false, error: 'Failed to verify admin role' };
    }

    return { isAdmin: !!hasRole };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { isAdmin: false, error: 'Authentication failed' };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    // Create client with anon key for auth verification
    const authClient = createClient(supabaseUrl, supabaseAnonKey)
    
    // Verify admin role
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { isAdmin, error: authError } = await verifyAdminRole(authClient, authHeader)
    if (!isAdmin) {
      console.log('Admin access denied:', authError)
      return new Response(
        JSON.stringify({ error: authError || 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Admin access verified, proceeding with import...')
    
    // Use service role client for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    let categoriesImported = 0;
    let duasImported = 0;
    const errors: string[] = [];

    // Import each category and its duas
    for (const category of duaCategories) {
      // Upsert the category
      const { error: categoryError } = await supabase
        .from('dua_categories')
        .upsert({
          category_id: category.id,
          name_english: category.nameEnglish,
          name_bengali: category.nameBengali,
          name_hindi: category.nameHindi,
          icon: category.icon
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
