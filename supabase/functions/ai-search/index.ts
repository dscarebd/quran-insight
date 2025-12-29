import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language = 'bn' } = await req.json();

    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('AI Search query:', query, 'Language:', language);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client to fetch relevant data
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch sample data to provide context to AI
    const [versesResult, hadithsResult, duasResult, surahsResult] = await Promise.all([
      supabase.from('verses').select('surah_number, verse_number, arabic, bengali, english').limit(50),
      supabase.from('hadiths').select('book_slug, hadith_number, arabic, bengali, english, grade').limit(50),
      supabase.from('duas').select('category_id, dua_id, title_bengali, title_english, arabic, bengali, english').limit(30),
      supabase.from('surahs').select('number, name_arabic, name_english, name_bengali, meaning_english, meaning_bengali, total_verses')
    ]);

    // Common Islamic term translations for better cross-language search
    const termTranslations: Record<string, string[]> = {
      // === CORE ISLAMIC CONCEPTS ===
      'জান্নাত': ['paradise', 'heaven', 'jannah', 'الجنة', 'garden'],
      'জাহান্নাম': ['hell', 'jahannam', 'جهنم', 'hellfire', 'fire'],
      'ইমান': ['faith', 'iman', 'إيمان', 'belief'],
      'ইসলাম': ['islam', 'إسلام', 'submission'],
      'ইহসান': ['ihsan', 'إحسان', 'excellence', 'perfection'],
      'তাওহীদ': ['tawhid', 'توحيد', 'monotheism', 'oneness'],
      'শিরক': ['shirk', 'شرك', 'polytheism', 'idolatry'],
      'কুফর': ['kufr', 'كفر', 'disbelief'],
      'নিফাক': ['nifaq', 'نفاق', 'hypocrisy'],
      
      // === PILLARS OF ISLAM ===
      'নামাজ': ['prayer', 'salat', 'salah', 'صلاة', 'namaz'],
      'সালাত': ['prayer', 'salat', 'salah', 'صلاة', 'নামাজ'],
      'রোজা': ['fasting', 'sawm', 'صوم', 'siam', 'রোযা'],
      'হজ': ['hajj', 'pilgrimage', 'حج', 'হজ্জ'],
      'যাকাত': ['zakat', 'charity', 'زكاة', 'zakah', 'alms'],
      'শাহাদা': ['shahada', 'شهادة', 'testimony', 'declaration'],
      
      // === PRAYER TIMES ===
      'ফজর': ['fajr', 'فجر', 'dawn', 'morning', 'সকাল'],
      'যোহর': ['dhuhr', 'ظهر', 'noon', 'zuhr', 'দুপুর'],
      'আসর': ['asr', 'عصر', 'afternoon', 'বিকাল'],
      'মাগরিব': ['maghrib', 'مغرب', 'sunset', 'evening', 'সন্ধ্যা'],
      'ইশা': ['isha', 'عشاء', 'night', 'রাত'],
      'তাহাজ্জুদ': ['tahajjud', 'تهجد', 'night prayer', 'qiyam'],
      'জুমুআ': ['jumah', 'جمعة', 'friday', 'জুম্মা'],
      
      // === SPIRITUAL QUALITIES ===
      'তওবা': ['repentance', 'tawbah', 'توبة', 'forgiveness'],
      'সবর': ['patience', 'sabr', 'صبر', 'perseverance'],
      'শুকর': ['gratitude', 'shukr', 'شكر', 'thankfulness'],
      'তাওয়াক্কুল': ['trust', 'tawakkul', 'توكل', 'reliance'],
      'তাকওয়া': ['piety', 'taqwa', 'تقوى', 'God-consciousness'],
      'খুশু': ['khushu', 'خشوع', 'humility', 'concentration'],
      'ইখলাস': ['ikhlas', 'إخلاص', 'sincerity', 'purity'],
      'রিজা': ['rida', 'رضا', 'contentment', 'acceptance'],
      'যুহদ': ['zuhd', 'زهد', 'asceticism', 'detachment'],
      
      // === BLESSINGS & MERCY ===
      'রহমত': ['mercy', 'rahmat', 'رحمة', 'compassion'],
      'বরকত': ['blessing', 'barakah', 'بركة', 'abundance'],
      'হেদায়েত': ['guidance', 'hidayah', 'هداية', 'direction'],
      'মাগফিরাত': ['forgiveness', 'maghfirah', 'مغفرة', 'pardon'],
      'নেয়ামত': ['blessing', 'nimat', 'نعمة', 'favor', 'gift'],
      'ফজল': ['grace', 'fadl', 'فضل', 'bounty'],
      'তাওফিক': ['success', 'tawfiq', 'توفيق', 'ability'],
      
      // === AFTERLIFE ===
      'আখিরাত': ['hereafter', 'akhirah', 'آخرة', 'afterlife'],
      'দুনিয়া': ['world', 'dunya', 'دنيا', 'worldly'],
      'কিয়ামত': ['judgment', 'qiyamah', 'قيامة', 'resurrection', 'দিবস'],
      'হাশর': ['hashr', 'حشر', 'gathering', 'assembly'],
      'মিজান': ['mizan', 'ميزان', 'scale', 'balance'],
      'সিরাত': ['sirat', 'صراط', 'bridge', 'path'],
      'হিসাব': ['hisab', 'حساب', 'account', 'reckoning'],
      'কবর': ['grave', 'qabr', 'قبر', 'tomb'],
      'বারযাখ': ['barzakh', 'برزخ', 'intermediate'],
      
      // === BEINGS ===
      'আল্লাহ': ['allah', 'الله', 'god', 'lord', 'রব'],
      'ফেরেশতা': ['angel', 'malak', 'ملائكة', 'ফিরিশতা'],
      'জিবরাইল': ['jibreel', 'جبريل', 'gabriel'],
      'মিকাইল': ['mikail', 'ميكائيل', 'michael'],
      'ইসরাফিল': ['israfil', 'إسرافيل'],
      'আযরাইল': ['azrael', 'عزرائيل', 'death angel'],
      'শয়তান': ['satan', 'shaytan', 'شيطان', 'devil', 'ইবলিস'],
      'জিন': ['jinn', 'جن', 'spirit'],
      'নবী': ['prophet', 'nabi', 'نبي'],
      'রাসূল': ['messenger', 'rasul', 'رسول'],
      'সাহাবা': ['companion', 'sahaba', 'صحابة', 'sahabi'],
      
      // === PROPHETS ===
      'মুহাম্মদ': ['muhammad', 'محمد', 'prophet', 'নবী'],
      'ইব্রাহিম': ['ibrahim', 'إبراهيم', 'abraham'],
      'মুসা': ['musa', 'موسى', 'moses'],
      'ঈসা': ['isa', 'عيسى', 'jesus'],
      'নূহ': ['nuh', 'نوح', 'noah'],
      'আদম': ['adam', 'آدم'],
      'ইউসুফ': ['yusuf', 'يوسف', 'joseph'],
      'দাউদ': ['dawud', 'داود', 'david'],
      'সুলাইমান': ['sulaiman', 'سليمان', 'solomon'],
      'আইয়ুব': ['ayyub', 'أيوب', 'job'],
      'ইয়াকুব': ['yaqub', 'يعقوب', 'jacob'],
      'ইসমাইল': ['ismail', 'إسماعيل', 'ishmael'],
      'ইসহাক': ['ishaq', 'إسحاق', 'isaac'],
      
      // === QURAN & HADITH ===
      'কুরআন': ['quran', 'قرآن', 'book', 'কোরআন'],
      'আয়াত': ['verse', 'ayah', 'آية', 'sign'],
      'সূরা': ['surah', 'chapter', 'سورة'],
      'হাদিস': ['hadith', 'حديث', 'tradition', 'হাদীস'],
      'সুন্নাহ': ['sunnah', 'سنة', 'tradition', 'practice'],
      'তাফসীর': ['tafsir', 'تفسير', 'exegesis', 'explanation'],
      'ফিকহ': ['fiqh', 'فقه', 'jurisprudence', 'law'],
      'শরিয়া': ['sharia', 'شريعة', 'law', 'শরীয়ত'],
      
      // === WORSHIP & DEEDS ===
      'দোয়া': ['dua', 'supplication', 'دعاء', 'prayer', 'প্রার্থনা'],
      'যিকির': ['dhikr', 'ذكر', 'remembrance', 'জিকির'],
      'তিলাওয়াত': ['tilawat', 'تلاوة', 'recitation', 'পড়া'],
      'সাজদা': ['sajdah', 'سجدة', 'prostration', 'সিজদা'],
      'রুকু': ['ruku', 'ركوع', 'bowing'],
      'উযু': ['wudu', 'وضوء', 'ablution', 'অযু'],
      'গোসল': ['ghusl', 'غسل', 'bath', 'ritual bath'],
      'তায়াম্মুম': ['tayammum', 'تيمم', 'dry ablution'],
      'সাদাকা': ['sadaqah', 'صدقة', 'charity', 'donation'],
      'ইতিকাফ': ['itikaf', 'اعتكاف', 'seclusion', 'retreat'],
      'উমরা': ['umrah', 'عمرة', 'minor pilgrimage'],
      'কুরবানি': ['qurbani', 'قربان', 'sacrifice', 'কোরবানি'],
      
      // === HALAL & HARAM ===
      'হালাল': ['halal', 'حلال', 'permissible', 'lawful'],
      'হারাম': ['haram', 'حرام', 'forbidden', 'unlawful'],
      'মাকরুহ': ['makruh', 'مكروه', 'disliked'],
      'মুস্তাহাব': ['mustahab', 'مستحب', 'recommended'],
      'ফরজ': ['fard', 'فرض', 'obligatory', 'mandatory'],
      'ওয়াজিব': ['wajib', 'واجب', 'necessary', 'required'],
      'সুন্নত': ['sunnah', 'سنة', 'recommended', 'tradition'],
      
      // === FAMILY & RELATIONS ===
      'নিকাহ': ['nikah', 'نكاح', 'marriage', 'wedding', 'বিবাহ'],
      'তালাক': ['talaq', 'طلاق', 'divorce'],
      'মাহর': ['mahr', 'مهر', 'dowry', 'দেনমোহর'],
      'পরিবার': ['family', 'أسرة', 'household'],
      'সন্তান': ['child', 'children', 'أولاد', 'offspring'],
      'পিতামাতা': ['parents', 'والدين', 'mother', 'father'],
      'স্বামী': ['husband', 'زوج', 'spouse'],
      'স্ত্রী': ['wife', 'زوجة', 'spouse'],
      
      // === TIMES & OCCASIONS ===
      'রমজান': ['ramadan', 'رمضان', 'রমযান', 'fasting month'],
      'ঈদ': ['eid', 'عيد', 'festival', 'celebration'],
      'লাইলাতুল কদর': ['laylatul qadr', 'ليلة القدر', 'night of power'],
      'শবে বরাত': ['shab e barat', 'ليلة البراءة', 'night of forgiveness'],
      'মিরাজ': ['miraj', 'معراج', 'ascension', 'isra'],
      'আশুরা': ['ashura', 'عاشوراء', 'muharram'],
      
      // === DAILY LIFE ===
      'সকাল': ['morning', 'صباح', 'dawn', 'ফজর'],
      'সন্ধ্যা': ['evening', 'مساء', 'sunset', 'মাগরিব'],
      'রাত': ['night', 'ليل', 'ইশা'],
      'ঘুম': ['sleep', 'نوم', 'নিদ্রা', 'rest'],
      'খাবার': ['food', 'طعام', 'আহার', 'meal', 'eating'],
      'পানি': ['water', 'ماء', 'drink'],
      'সফর': ['travel', 'سفر', 'journey', 'trip'],
      'অসুস্থ': ['sick', 'مريض', 'illness', 'disease'],
      'স্বাস্থ্য': ['health', 'صحة', 'সুস্থতা', 'wellness'],
      'হেফাজত': ['protection', 'حماية', 'সুরক্ষা', 'safety'],
      'সফলতা': ['success', 'نجاح', 'victory', 'achievement'],
      'বিপদ': ['danger', 'difficulty', 'مصيبة', 'trouble', 'problem'],
      'ঋণ': ['debt', 'دين', 'loan'],
      'রিযিক': ['rizq', 'رزق', 'sustenance', 'provision', 'জীবিকা'],
      
      // === EMOTIONS & STATES ===
      'ভয়': ['fear', 'خوف', 'afraid', 'scared'],
      'আশা': ['hope', 'أمل', 'expectation'],
      'ভালোবাসা': ['love', 'حب', 'affection', 'মহব্বত'],
      'শান্তি': ['peace', 'سلام', 'tranquility'],
      'দুশ্চিন্তা': ['worry', 'anxiety', 'قلق', 'stress'],
      'কষ্ট': ['hardship', 'difficulty', 'مشقة', 'suffering'],
      'সুখ': ['happiness', 'سعادة', 'joy'],
      'দুঃখ': ['sadness', 'حزن', 'grief', 'sorrow'],
      
      // === KNOWLEDGE ===
      'ইলম': ['ilm', 'علم', 'knowledge', 'জ্ঞান'],
      'হিকমা': ['hikmah', 'حكمة', 'wisdom'],
      'আকল': ['aql', 'عقل', 'intellect', 'reason'],
      'ফাহম': ['fahm', 'فهم', 'understanding'],
      
      // === COMMUNITY ===
      'উম্মাহ': ['ummah', 'أمة', 'community', 'nation'],
      'জামাত': ['jamaah', 'جماعة', 'congregation', 'group'],
      'মসজিদ': ['masjid', 'مسجد', 'mosque'],
      'মাদ্রাসা': ['madrasa', 'مدرسة', 'school', 'institution'],
      'ইমাম': ['imam', 'إمام', 'leader', 'prayer leader'],
      'খলিফা': ['khalifa', 'خليفة', 'caliph', 'successor'],
      'আলেম': ['alim', 'عالم', 'scholar', 'আলিম'],
      'মুফতি': ['mufti', 'مفتي', 'jurist'],
      'শেখ': ['sheikh', 'شيخ', 'elder', 'teacher'],
      
      // === ENGLISH TERMS (reverse lookup) ===
      'paradise': ['জান্নাত', 'jannah', 'الجنة', 'heaven'],
      'heaven': ['জান্নাত', 'jannah', 'الجنة'],
      'hell': ['জাহান্নাম', 'jahannam', 'جهنم'],
      'prayer': ['নামাজ', 'সালাত', 'صلاة', 'salat'],
      'fasting': ['রোজা', 'সাওম', 'صوم', 'sawm'],
      'charity': ['যাকাত', 'সাদাকা', 'زكاة', 'zakat'],
      'patience': ['সবর', 'ধৈর্য', 'صبر', 'sabr'],
      'faith': ['ইমান', 'বিশ্বাস', 'إيمان', 'iman'],
      'mercy': ['রহমত', 'দয়া', 'رحمة', 'rahmat'],
      'forgiveness': ['মাগফিরাত', 'ক্ষমা', 'مغفرة', 'maghfirah'],
      'guidance': ['হেদায়েত', 'পথপ্রদর্শন', 'هداية', 'hidayah'],
      'blessing': ['বরকত', 'নেয়ামত', 'بركة', 'barakah'],
      'repentance': ['তওবা', 'توبة', 'tawbah'],
      'angel': ['ফেরেশতা', 'ملائكة', 'malak'],
      'prophet': ['নবী', 'نبي', 'nabi'],
      'messenger': ['রাসূল', 'رسول', 'rasul'],
      'morning': ['সকাল', 'ফজর', 'صباح', 'fajr'],
      'evening': ['সন্ধ্যা', 'মাগরিব', 'مساء', 'maghrib'],
      'night': ['রাত', 'ইশা', 'ليل', 'isha'],
      'sleep': ['ঘুম', 'নিদ্রা', 'نوم'],
      'food': ['খাবার', 'আহার', 'طعام'],
      'travel': ['সফর', 'ভ্রমণ', 'سفر'],
      'health': ['স্বাস্থ্য', 'সুস্থতা', 'صحة'],
      'protection': ['হেফাজত', 'সুরক্ষা', 'حماية'],
      'success': ['সফলতা', 'কামিয়াবি', 'نجاح'],
      'death': ['মৃত্যু', 'موت', 'maut', 'passing'],
      'life': ['জীবন', 'حياة', 'hayat'],
      'heart': ['অন্তর', 'قلب', 'qalb', 'হৃদয়'],
      'soul': ['রূহ', 'روح', 'ruh', 'আত্মা'],
      'sin': ['গুনাহ', 'ذنب', 'পাপ', 'gunah'],
      'reward': ['সাওয়াব', 'ثواب', 'thawab', 'পুরস্কার'],
      'punishment': ['আযাব', 'عذاب', 'azab', 'শাস্তি'],
      'good': ['ভালো', 'خير', 'khair', 'নেক'],
      'evil': ['মন্দ', 'شر', 'sharr', 'bad'],
      'truth': ['সত্য', 'حق', 'haqq'],
      'false': ['মিথ্যা', 'باطل', 'batil'],
      'light': ['নূর', 'نور', 'nur', 'আলো'],
      'darkness': ['অন্ধকার', 'ظلمات', 'zulm'],
      'day': ['দিন', 'يوم', 'yawm'],
      'month': ['মাস', 'شهر', 'shahr'],
      'year': ['বছর', 'سنة', 'sanah'],
      'world': ['দুনিয়া', 'دنيا', 'পৃথিবী'],
      'creation': ['সৃষ্টি', 'خلق', 'khalq'],
      'lord': ['রব', 'رب', 'rabb', 'প্রভু'],
      'servant': ['বান্দা', 'عبد', 'abd', 'slave'],
      'worship': ['ইবাদত', 'عبادة', 'ibadah'],
      'obedience': ['আনুগত্য', 'طاعة', 'taat'],
      'disobedience': ['অবাধ্যতা', 'معصية', 'masiyah'],
      'test': ['পরীক্ষা', 'ابتلاء', 'ibtila', 'trial'],
      'victory': ['বিজয়', 'نصر', 'nasr', 'ফাতহ'],
      'help': ['সাহায্য', 'نصر', 'nasr', 'assistance'],
      'enemy': ['শত্রু', 'عدو', 'aduw'],
      'friend': ['বন্ধু', 'صديق', 'sadiq'],
      'brother': ['ভাই', 'أخ', 'akh'],
      'sister': ['বোন', 'أخت', 'ukht'],
      'mother': ['মা', 'أم', 'umm'],
      'father': ['বাবা', 'أب', 'ab'],
      'child': ['সন্তান', 'ولد', 'walad'],
      'wealth': ['সম্পদ', 'مال', 'mal', 'ধন'],
      'poor': ['গরিব', 'فقير', 'faqir', 'দরিদ্র'],
      'rich': ['ধনী', 'غني', 'ghani'],
      'orphan': ['এতিম', 'يتيم', 'yatim', 'ইয়াতিম'],
      'widow': ['বিধবা', 'أرملة'],
      'neighbor': ['প্রতিবেশী', 'جار', 'jar'],
      'guest': ['মেহমান', 'ضيف', 'daif'],
    };

    // Expand search terms with translations
    const expandSearchTerms = (query: string): string[] => {
      const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
      const expandedTerms = new Set<string>();
      
      terms.forEach(term => {
        expandedTerms.add(term);
        // Check if term matches any translation key
        Object.entries(termTranslations).forEach(([key, translations]) => {
          if (key.toLowerCase().includes(term) || term.includes(key.toLowerCase())) {
            translations.forEach(t => expandedTerms.add(t.toLowerCase()));
            expandedTerms.add(key.toLowerCase());
          }
          translations.forEach(translation => {
            if (translation.toLowerCase().includes(term) || term.includes(translation.toLowerCase())) {
              expandedTerms.add(key.toLowerCase());
              translations.forEach(t => expandedTerms.add(t.toLowerCase()));
            }
          });
        });
      });
      
      return Array.from(expandedTerms).filter(t => t.length > 1);
    };

    const searchTerms = expandSearchTerms(query);
    console.log('Expanded search terms:', searchTerms);
    
    // Search verses - include Arabic
    let relevantVerses: any[] = [];
    if (searchTerms.length > 0) {
      const orConditions = searchTerms.flatMap(term => [
        `bengali.ilike.%${term}%`,
        `english.ilike.%${term}%`,
        `arabic.ilike.%${term}%`
      ]).join(',');
      
      const { data: searchedVerses } = await supabase
        .from('verses')
        .select('surah_number, verse_number, arabic, bengali, english')
        .or(orConditions)
        .limit(10);
      relevantVerses = searchedVerses || [];
    }

    // Search hadiths - include Arabic
    let relevantHadiths: any[] = [];
    if (searchTerms.length > 0) {
      const orConditions = searchTerms.flatMap(term => [
        `bengali.ilike.%${term}%`,
        `english.ilike.%${term}%`,
        `arabic.ilike.%${term}%`
      ]).join(',');
      
      const { data: searchedHadiths } = await supabase
        .from('hadiths')
        .select('book_slug, hadith_number, arabic, bengali, english, grade, grade_bengali, narrator_bengali, narrator_english')
        .or(orConditions)
        .limit(10);
      relevantHadiths = searchedHadiths || [];
    }

    // Search duas - include Arabic
    let relevantDuas: any[] = [];
    if (searchTerms.length > 0) {
      const orConditions = searchTerms.flatMap(term => [
        `bengali.ilike.%${term}%`,
        `english.ilike.%${term}%`,
        `arabic.ilike.%${term}%`,
        `title_bengali.ilike.%${term}%`,
        `title_english.ilike.%${term}%`
      ]).join(',');
      
      const { data: searchedDuas } = await supabase
        .from('duas')
        .select('category_id, dua_id, title_bengali, title_english, arabic, bengali, english, reference')
        .or(orConditions)
        .limit(10);
      relevantDuas = searchedDuas || [];
    }

    const systemPrompt = `You are an Islamic knowledge assistant for a Quran app. You help users find relevant Quran verses, Hadiths, and Duas.

IMPORTANT ISLAMIC ETIQUETTES - YOU MUST FOLLOW:
1. ALWAYS start your response with Islamic greeting: ${language === 'bn' ? '"আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু"' : '"Assalamu Alaikum wa Rahmatullahi wa Barakatuh"'}
2. Use "ইনশাআল্লাহ" (InshAllah) when mentioning future events or hopes
3. Say "সুবহানাল্লাহ" (SubhanAllah) when mentioning Allah's creation or blessings
4. Say "আলহামদুলিল্লাহ" (Alhamdulillah) when expressing gratitude
5. Use "ﷺ" (Sallallahu Alaihi Wasallam) after mentioning Prophet Muhammad's name
6. ALWAYS end your response with a relevant dua like:
   ${language === 'bn' 
     ? '- "আল্লাহ আপনাকে হেদায়েত দান করুন" (May Allah guide you)\n   - "আল্লাহ আপনার জ্ঞান বৃদ্ধি করুন" (May Allah increase your knowledge)\n   - "জাযাকাল্লাহু খাইরান" (May Allah reward you with goodness)' 
     : '- "May Allah guide you to the straight path"\n   - "May Allah increase your knowledge"\n   - "JazakAllahu Khairan" (May Allah reward you with goodness)'}

RESPONSE RULES:
1. Always respond in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}
2. When referencing content, use exact references from the database data provided
3. Provide accurate Islamic information based ONLY on the data provided
4. Structure your response with clear sections
5. Always include specific references that users can look up in the app
6. Be warm, respectful, humble and helpful in your tone
7. Show reverence when discussing Allah, the Quran, and the Prophet ﷺ

DATABASE CONTEXT:
- Surahs available: ${JSON.stringify(surahsResult.data?.slice(0, 10) || [])}
- Relevant verses found: ${JSON.stringify(relevantVerses)}
- Relevant hadiths found: ${JSON.stringify(relevantHadiths)}
- Relevant duas found: ${JSON.stringify(relevantDuas)}

When responding, format references as:
- For Quran verses: [Surah Name, Ayah X] or সূরা [নাম], আয়াত [সংখ্যা]
- For Hadiths: [Book Name, Hadith X] or [বই নাম], হাদিস [সংখ্যা]
- For Duas: Reference the dua title

Provide helpful, accurate responses. If you cannot find relevant information in the provided data, say so honestly and still end with a dua.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service quota exceeded.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI service error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices?.[0]?.message?.content || '';

    console.log('AI Search successful');

    return new Response(
      JSON.stringify({
        success: true,
        answer: aiResponse,
        references: {
          verses: relevantVerses,
          hadiths: relevantHadiths,
          duas: relevantDuas,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('AI Search error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Search failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});