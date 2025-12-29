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

    // Common transliteration variations mapping (English)
    // Maps common misspellings/variations to canonical forms
    const transliterationVariations: Record<string, string[]> = {
      'jannah': ['janat', 'jannat', 'janna', 'jana', 'janah', 'jennah', 'jennat', 'jenah'],
      'jahannam': ['jahannum', 'jahanam', 'jahanum', 'jahanem', 'jahnam', 'jahnnam'],
      'salat': ['salah', 'salaah', 'salaat', 'namaz', 'namaaz', 'solat', 'solah'],
      'sawm': ['saum', 'soum', 'siam', 'siyam', 'roza', 'rozah'],
      'hajj': ['haj', 'hadj', 'haaj', 'hadji'],
      'zakat': ['zakaat', 'zakah', 'zakaah', 'zekaat', 'zekat'],
      'quran': ['kuran', 'qoran', 'koran', 'quoran', 'qur\'an', 'quraan', 'coran'],
      'hadith': ['hadis', 'hadeeth', 'hadees', 'hadit', 'hadees'],
      'sunnah': ['sunna', 'sunnat', 'sunnet', 'sunat'],
      'dua': ['duaa', 'doaa', 'dowa', 'duah', 'doah'],
      'dhikr': ['zikr', 'zikir', 'thikr', 'dikir', 'dhikir', 'zeker'],
      'tawhid': ['tauhid', 'tawheed', 'tauheed', 'tohid', 'taohid'],
      'shirk': ['sherk', 'sirk', 'shrik'],
      'iman': ['eman', 'eeman', 'imaan', 'emaan'],
      'taqwa': ['takwa', 'taqwaa', 'takwaa', 'taqua'],
      'tawbah': ['taubah', 'tauba', 'tawba', 'tobah', 'toba'],
      'sabr': ['sabar', 'sabur', 'sobr', 'sobor'],
      'shukr': ['shukur', 'sukr', 'shokr', 'shokor'],
      'tawakkul': ['tawakul', 'tawakkal', 'tawakal', 'tawakkol'],
      'barakah': ['baraka', 'barkat', 'berkah', 'berkat', 'borkot'],
      'hidayah': ['hidaya', 'hidayat', 'hedaya', 'hedayat', 'hedayet'],
      'rahmat': ['rahma', 'rahmah', 'rohmat', 'rohma'],
      'maghfirah': ['magfirah', 'magfira', 'maghfira', 'mogferat'],
      'akhirah': ['akhira', 'aakhira', 'aakhirah', 'akherah', 'akherat'],
      'dunya': ['dunia', 'duniya', 'donya', 'donia'],
      'qiyamah': ['qiyama', 'qiyamat', 'kiyamat', 'kiamat', 'qayamat'],
      'malak': ['malak', 'malaikah', 'malaika', 'malaek'],
      'shaytan': ['shaitan', 'shaitaan', 'syaitan', 'setan', 'shaytaan'],
      'muhammad': ['mohammed', 'mohammad', 'muhammed', 'mohamad', 'muhamad'],
      'ibrahim': ['abraham', 'ibraham', 'ebrahim', 'ibraheem'],
      'musa': ['moses', 'mousa', 'mosa', 'moosa'],
      'isa': ['jesus', 'eesa', 'eisa', 'issa'],
      'fajr': ['fajar', 'fazar', 'fazr', 'fojr', 'fojor'],
      'dhuhr': ['zuhr', 'zohr', 'johor', 'duhr', 'zuhur'],
      'asr': ['asar', 'ashor', 'ashr'],
      'maghrib': ['magrib', 'magreb', 'magrhib', 'moghrib'],
      'isha': ['isha', 'ishaa', 'esha', 'eshaa', 'isya'],
      'tahajjud': ['tahajud', 'tahajjod', 'tehajjud', 'tohajjud'],
      'jumah': ['jummah', 'jumma', 'jumuah', 'juma'],
      'wudu': ['wudhu', 'wazu', 'wudoo', 'udhu', 'oju', 'ozu'],
      'ghusl': ['ghusul', 'gosl', 'gusl', 'gosol'],
      'sadaqah': ['sadaqa', 'sodqah', 'sedekah', 'sedaqah'],
      'itikaf': ['itikaaf', 'etikaf', 'itekaaf'],
      'umrah': ['umra', 'omrah', 'omra', 'oemrah'],
      'qurbani': ['kurbani', 'qorban', 'kurban', 'qourbani'],
      'nikah': ['nikka', 'nikaha', 'nikkah'],
      'talaq': ['talak', 'talaaq', 'talak'],
      'ramadan': ['ramzan', 'ramazan', 'ramadhan', 'romadon', 'romadan'],
      'eid': ['eed', 'id', 'iid'],
      'masjid': ['masjeed', 'masjit', 'mosjid', 'mesjid'],
      'imam': ['imaam', 'emam', 'imom'],
      'khalifa': ['khalifah', 'caliph', 'khilafa', 'kholifa'],
      'alim': ['aalim', 'alem', 'olim'],
      'mufti': ['mofti', 'muftee'],
      'sheikh': ['shaikh', 'shaykh', 'shekh', 'shayekh'],
      'rizq': ['rizk', 'rizik', 'rejek', 'rizqi'],
      'ruh': ['rooh', 'roh', 'rouh'],
      'qalb': ['kalb', 'kolb', 'qolb'],
      'nafs': ['nofs', 'nefs'],
      'ilm': ['elm', 'elom', 'ilom'],
      'hikmah': ['hikma', 'hekmat', 'hikmaat'],
      'aql': ['akl', 'aqal', 'oqol'],
      'jamaah': ['jamat', 'jamaat', 'jemaah', 'jemaat'],
      'ummah': ['umma', 'ummat', 'ommat', 'ommah'],
      'fiqh': ['fikah', 'fikh', 'fikih'],
      'sharia': ['shariah', 'syariah', 'syaria', 'shariat'],
      'halal': ['helal', 'halaal'],
      'haram': ['haraam', 'horom'],
      'fard': ['farz', 'fardh', 'farj', 'foroz'],
      'wajib': ['wazib', 'vajib', 'wajeb'],
      'sujud': ['sajda', 'sajdah', 'sijdah', 'sujood'],
      'ruku': ['rokoo', 'ruko', 'rukoo'],
      'ayah': ['ayat', 'aayah', 'aayat', 'ayaat'],
      'surah': ['sura', 'soorah', 'sora', 'suraa'],
      'tafsir': ['tafseer', 'tafseer', 'tafser'],
      'tilawat': ['tilawah', 'tilaawat', 'telaawat'],
      'miraj': ['meraj', 'meeraj', 'miiraaj'],
      'isra': ['israk', 'esra'],
      'laylatul': ['lailatul', 'lailatol', 'laylatol'],
      'qadr': ['kadr', 'qodr', 'kodr'],
      'ashura': ['aashura', 'ashoora', 'ashooraa'],
      'muharram': ['moharram', 'mohorrom', 'muharrom'],
      'allah': ['allaah', 'alloh'],
      'rabb': ['rob', 'rab'],
      'jibreel': ['jibril', 'jibrael', 'gabriel', 'jibraeel'],
      'mikail': ['mikael', 'michael', 'mikaeel'],
      'israfil': ['israfeel', 'esrafil'],
      'azrael': ['azrail', 'izrail', 'izraeel'],
    };

    // Bengali word variations (common misspellings/alternate spellings)
    const bengaliVariations: Record<string, string[]> = {
      // জান্নাত variations
      'জান্নাত': ['জান্নাত', 'জন্নাত', 'জান্নাতে', 'জান্নতে', 'জাননাত', 'জানাত', 'বেহেশত', 'বেহেস্ত'],
      'জাহান্নাম': ['জাহান্নাম', 'জাহন্নাম', 'জাহানাম', 'জাহানাম', 'দোযখ', 'দোজখ', 'জাহান্নামে'],
      // নামাজ variations
      'নামাজ': ['নামাজ', 'নামায', 'নামাজে', 'নামাযে', 'সালাত', 'সালাহ', 'নামাযের'],
      'সালাত': ['সালাত', 'সালাহ', 'সালাতে', 'নামাজ', 'নামায'],
      // রোজা variations
      'রোজা': ['রোজা', 'রোযা', 'সিয়াম', 'সাওম', 'রোজায়', 'রোযায়'],
      // হজ variations
      'হজ': ['হজ', 'হজ্জ', 'হাজ্জ', 'হজে', 'হজ্জে'],
      // কুরআন variations
      'কুরআন': ['কুরআন', 'কোরআন', 'কুরান', 'কোরান', 'আল-কুরআন', 'আলকুরআন', 'কুরআনে', 'কোরআনে'],
      // হাদিস variations
      'হাদিস': ['হাদিস', 'হাদীস', 'হাদীস', 'হাদিসে', 'হাদীসে'],
      // দোয়া variations
      'দোয়া': ['দোয়া', 'দোআ', 'দুআ', 'দুয়া', 'দোয়ায়', 'দোআয়', 'প্রার্থনা'],
      // তাওবা variations
      'তওবা': ['তওবা', 'তাওবা', 'তোবা', 'তাওবাহ', 'তওবাহ'],
      // সবর variations
      'সবর': ['সবর', 'সবুর', 'ধৈর্য', 'ধৈর্য্য', 'সবুরে'],
      // ইমান variations
      'ইমান': ['ইমান', 'ঈমান', 'ইমানে', 'ঈমানে', 'বিশ্বাস'],
      // তাকওয়া variations
      'তাকওয়া': ['তাকওয়া', 'তাক্বওয়া', 'তাকওয়ায়', 'পরহেজগারী'],
      // রহমত variations
      'রহমত': ['রহমত', 'রহমাত', 'রাহমাত', 'দয়া', 'করুণা', 'রহমতে'],
      // বরকত variations
      'বরকত': ['বরকত', 'বারাকাত', 'বরকতে', 'বারাকাহ'],
      // হেদায়েত variations
      'হেদায়েত': ['হেদায়েত', 'হিদায়াত', 'হিদায়াহ', 'হেদায়াত', 'পথপ্রদর্শন'],
      // মাগফিরাত variations
      'মাগফিরাত': ['মাগফিরাত', 'মাগফেরাত', 'মাগফিরাতে', 'ক্ষমা'],
      // আখিরাত variations
      'আখিরাত': ['আখিরাত', 'আখেরাত', 'আখিরাতে', 'পরকাল', 'পরলোক'],
      // কিয়ামত variations
      'কিয়ামত': ['কিয়ামত', 'কেয়ামত', 'কিয়ামাত', 'কেয়ামাত', 'কিয়ামতে'],
      // ফেরেশতা variations
      'ফেরেশতা': ['ফেরেশতা', 'ফিরিশতা', 'ফেরেশতায়', 'মালাইকা', 'মালাক'],
      // শয়তান variations
      'শয়তান': ['শয়তান', 'শয়তানে', 'ইবলিস', 'শয়তানের'],
      // মসজিদ variations
      'মসজিদ': ['মসজিদ', 'মাসজিদ', 'মসজিদে', 'মাসজিদে'],
      // রমজান variations
      'রমজান': ['রমজান', 'রমযান', 'রামাদান', 'রমজানে', 'রমযানে'],
      // ঈদ variations
      'ঈদ': ['ঈদ', 'ইদ', 'ঈদে', 'ঈদের'],
      // ফজর variations
      'ফজর': ['ফজর', 'ফযর', 'ফজরে', 'ফযরে', 'সুবহে সাদিক'],
      // যোহর variations
      'যোহর': ['যোহর', 'জোহর', 'যুহর', 'দুপুর', 'যোহরে'],
      // আসর variations
      'আসর': ['আসর', 'আছর', 'আসরে', 'বিকাল'],
      // মাগরিব variations
      'মাগরিব': ['মাগরিব', 'মাগরেব', 'মাগরিবে', 'সন্ধ্যা'],
      // ইশা variations
      'ইশা': ['ইশা', 'এশা', 'ইশায়', 'রাত'],
      // তাহাজ্জুদ variations
      'তাহাজ্জুদ': ['তাহাজ্জুদ', 'তাহাজ্জদ', 'তাহাজ্জুদে'],
      // জুমুআ variations
      'জুমুআ': ['জুমুআ', 'জুম্মা', 'জুমা', 'শুক্রবার'],
      // অযু variations
      'অযু': ['অযু', 'ওযু', 'উযু', 'অজু', 'ওজু'],
      // গোসল variations
      'গোসল': ['গোসল', 'গুসল', 'গোসলে'],
      // কুরবানি variations
      'কুরবানি': ['কুরবানি', 'কোরবানি', 'কুরবানী', 'কোরবানী'],
      // নিকাহ variations
      'নিকাহ': ['নিকাহ', 'নিকা', 'বিবাহ', 'বিয়ে', 'শাদি'],
      // জিকির variations
      'জিকির': ['জিকির', 'যিকির', 'যিক্‌র', 'জিকিরে'],
      // সাদাকা variations
      'সাদাকা': ['সাদাকা', 'সদকা', 'সাদাকাহ', 'দান'],
      // ইতিকাফ variations
      'ইতিকাফ': ['ইতিকাফ', 'ইতেকাফ', 'ই\'তিকাফ'],
      // উমরা variations
      'উমরা': ['উমরা', 'ওমরা', 'উমরাহ'],
      // হালাল variations
      'হালাল': ['হালাল', 'হেলাল', 'হালালে'],
      // হারাম variations
      'হারাম': ['হারাম', 'হারামে', 'হোরম'],
      // ফরজ variations
      'ফরজ': ['ফরজ', 'ফরয', 'ফরদ', 'ফরযে'],
      // সুন্নত variations
      'সুন্নত': ['সুন্নত', 'সুন্নাত', 'সুন্নাহ', 'সুন্নাতে'],
      // আয়াত variations
      'আয়াত': ['আয়াত', 'আয়াতে', 'আয়াতসমূহ'],
      // সূরা variations
      'সূরা': ['সূরা', 'সুরা', 'সূরাহ', 'সূরায়'],
      // তাফসীর variations
      'তাফসীর': ['তাফসীর', 'তাফসির', 'তাফসীরে'],
      // রিযিক variations
      'রিযিক': ['রিযিক', 'রিজিক', 'রিয্‌ক', 'জীবিকা'],
      // শাফায়াত variations
      'শাফায়াত': ['শাফায়াত', 'শাফাআত', 'সুপারিশ'],
      // তাওয়াক্কুল variations
      'তাওয়াক্কুল': ['তাওয়াক্কুল', 'তাওয়াকুল', 'ভরসা', 'নির্ভরতা'],
      // শুকর variations
      'শুকর': ['শুকর', 'শোকর', 'কৃতজ্ঞতা'],
      // ইখলাস variations
      'ইখলাস': ['ইখলাস', 'একলাস', 'আন্তরিকতা'],
      // Common search terms
      'আল্লাহ': ['আল্লাহ', 'আল্লাহ্', 'আল্লাহর', 'আল্লাহ্‌', 'আল্লাহতালা', 'আল্লাহ্তায়ালা'],
      'নবী': ['নবী', 'নবি', 'নবীজি', 'নবীর', 'রাসূল', 'রসূল'],
      'রাসূল': ['রাসূল', 'রসূল', 'রাসুল', 'রসুল', 'নবী'],
      'মুহাম্মদ': ['মুহাম্মদ', 'মুহাম্মাদ', 'মোহাম্মদ', 'মোহাম্মাদ', 'মুহাম্মদ'],
      'সাহাবা': ['সাহাবা', 'সাহাবী', 'সাহাবায়', 'সাহাবিগণ'],
      'উম্মাহ': ['উম্মাহ', 'উম্মত', 'উম্মতে', 'জাতি'],
    };

    // Arabic word variations (with/without diacritics, common forms)
    const arabicVariations: Record<string, string[]> = {
      'الجنة': ['الجنة', 'جنة', 'الجنه', 'جنه', 'جنّة'],
      'جهنم': ['جهنم', 'جهنّم', 'النار', 'نار'],
      'صلاة': ['صلاة', 'صلوة', 'الصلاة', 'صلاه'],
      'صوم': ['صوم', 'الصوم', 'صيام', 'الصيام'],
      'حج': ['حج', 'الحج', 'حجّ'],
      'زكاة': ['زكاة', 'الزكاة', 'زكاه'],
      'قرآن': ['قرآن', 'القرآن', 'قران', 'القران'],
      'حديث': ['حديث', 'الحديث', 'أحاديث'],
      'سنة': ['سنة', 'السنة', 'سنه'],
      'دعاء': ['دعاء', 'الدعاء', 'دعا'],
      'ذكر': ['ذكر', 'الذكر', 'اذكار', 'الأذكار'],
      'توحيد': ['توحيد', 'التوحيد'],
      'إيمان': ['إيمان', 'الإيمان', 'ايمان'],
      'تقوى': ['تقوى', 'التقوى'],
      'توبة': ['توبة', 'التوبة', 'توبه'],
      'صبر': ['صبر', 'الصبر'],
      'شكر': ['شكر', 'الشكر'],
      'توكل': ['توكل', 'التوكل'],
      'رحمة': ['رحمة', 'الرحمة', 'رحمه'],
      'بركة': ['بركة', 'البركة', 'بركه'],
      'هداية': ['هداية', 'الهداية', 'هدايه', 'هدى'],
      'مغفرة': ['مغفرة', 'المغفرة', 'مغفره'],
      'آخرة': ['آخرة', 'الآخرة', 'اخرة'],
      'دنيا': ['دنيا', 'الدنيا'],
      'قيامة': ['قيامة', 'القيامة', 'قيامه'],
      'ملائكة': ['ملائكة', 'الملائكة', 'ملاك', 'ملك'],
      'شيطان': ['شيطان', 'الشيطان', 'شياطين'],
      'نبي': ['نبي', 'النبي', 'انبياء', 'الأنبياء'],
      'رسول': ['رسول', 'الرسول', 'رسل'],
      'صحابة': ['صحابة', 'الصحابة', 'صحابي'],
      'أمة': ['أمة', 'الأمة', 'امة'],
      'حلال': ['حلال', 'الحلال'],
      'حرام': ['حرام', 'الحرام'],
      'فرض': ['فرض', 'الفرض', 'فروض'],
      'واجب': ['واجب', 'الواجب'],
      'سجدة': ['سجدة', 'السجدة', 'سجود'],
      'ركوع': ['ركوع', 'الركوع'],
      'آية': ['آية', 'الآية', 'آيات', 'الآيات', 'ايه', 'ايات'],
      'سورة': ['سورة', 'السورة', 'سور'],
      'تفسير': ['تفسير', 'التفسير'],
      'وضوء': ['وضوء', 'الوضوء'],
      'غسل': ['غسل', 'الغسل'],
      'صدقة': ['صدقة', 'الصدقة', 'صدقات'],
      'رمضان': ['رمضان', 'شهر رمضان'],
      'عيد': ['عيد', 'العيد', 'اعياد'],
      'فجر': ['فجر', 'الفجر'],
      'ظهر': ['ظهر', 'الظهر'],
      'عصر': ['عصر', 'العصر'],
      'مغرب': ['مغرب', 'المغرب'],
      'عشاء': ['عشاء', 'العشاء'],
      'جمعة': ['جمعة', 'الجمعة'],
      'مسجد': ['مسجد', 'المسجد', 'مساجد'],
      'إمام': ['إمام', 'الإمام', 'ائمة', 'امام'],
      'علم': ['علم', 'العلم'],
      'حكمة': ['حكمة', 'الحكمة', 'حكمه'],
      'عقل': ['عقل', 'العقل'],
      'قلب': ['قلب', 'القلب', 'قلوب'],
      'روح': ['روح', 'الروح', 'ارواح'],
      'نفس': ['نفس', 'النفس', 'انفس'],
      'ذنب': ['ذنب', 'الذنب', 'ذنوب'],
      'ثواب': ['ثواب', 'الثواب'],
      'عذاب': ['عذاب', 'العذاب'],
      'رزق': ['رزق', 'الرزق'],
      'شفاعة': ['شفاعة', 'الشفاعة'],
      'نور': ['نور', 'النور', 'انوار'],
      'الله': ['الله', 'اللّه', 'اللَّه'],
      'رب': ['رب', 'الرب', 'ربّ', 'ربنا'],
      'محمد': ['محمد', 'محمّد', 'النبي محمد'],
      'إبراهيم': ['إبراهيم', 'ابراهيم'],
      'موسى': ['موسى', 'موسي'],
      'عيسى': ['عيسى', 'عيسي'],
      'نوح': ['نوح'],
      'آدم': ['آدم', 'ادم'],
      'جبريل': ['جبريل', 'جبرائيل'],
    };

    // Normalize transliteration - convert variations to canonical form (all languages)
    const normalizeAllVariations = (term: string): string[] => {
      const normalized: string[] = [term];
      const termLower = term.toLowerCase();
      
      // Check English transliteration variations
      for (const [canonical, variations] of Object.entries(transliterationVariations)) {
        if (variations.some(v => v === termLower || termLower.includes(v) || v.includes(termLower))) {
          normalized.push(canonical);
          variations.forEach(v => normalized.push(v));
        }
        if (canonical === termLower || termLower.includes(canonical) || canonical.includes(termLower)) {
          normalized.push(canonical);
          variations.forEach(v => normalized.push(v));
        }
      }
      
      // Check Bengali variations
      for (const [canonical, variations] of Object.entries(bengaliVariations)) {
        if (variations.some(v => v === term || term.includes(v) || v.includes(term))) {
          normalized.push(canonical);
          variations.forEach(v => normalized.push(v));
        }
        if (canonical === term || term.includes(canonical) || canonical.includes(term)) {
          normalized.push(canonical);
          variations.forEach(v => normalized.push(v));
        }
      }
      
      // Check Arabic variations
      for (const [canonical, variations] of Object.entries(arabicVariations)) {
        if (variations.some(v => v === term || term.includes(v) || v.includes(term))) {
          normalized.push(canonical);
          variations.forEach(v => normalized.push(v));
        }
        if (canonical === term || term.includes(canonical) || canonical.includes(term)) {
          normalized.push(canonical);
          variations.forEach(v => normalized.push(v));
        }
      }
      
      return [...new Set(normalized)];
    };

    // Expand search terms with translations and fuzzy matching
    const expandSearchTerms = (query: string): string[] => {
      const terms = query.split(/\s+/).filter(t => t.length > 1);
      const expandedTerms = new Set<string>();
      
      terms.forEach(term => {
        // First normalize all language variations (English, Bengali, Arabic)
        const normalizedTerms: string[] = normalizeAllVariations(term);
        normalizedTerms.forEach((nt: string) => expandedTerms.add(nt));
        
        // Then check dictionary translations for each normalized term
        normalizedTerms.forEach((normalizedTerm: string) => {
          Object.entries(termTranslations).forEach(([key, translations]) => {
            if (key.toLowerCase().includes(normalizedTerm) || normalizedTerm.includes(key.toLowerCase())) {
              translations.forEach(t => expandedTerms.add(t.toLowerCase()));
              expandedTerms.add(key.toLowerCase());
            }
            translations.forEach(translation => {
              if (translation.toLowerCase().includes(normalizedTerm) || normalizedTerm.includes(translation.toLowerCase())) {
                expandedTerms.add(key.toLowerCase());
                translations.forEach(t => expandedTerms.add(t.toLowerCase()));
              }
            });
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

    // Detect if query is about a name (Prophet, Sahabi, Surah, Islamic figure)
    const isNameQuery = (q: string): boolean => {
      const lowerQ = q.toLowerCase();
      const namePatterns = [
        // === PROPHETS (25 Prophets mentioned in Quran) ===
        'muhammad', 'ibrahim', 'musa', 'isa', 'nuh', 'adam', 'yusuf', 'dawud', 'sulaiman', 'ayyub', 'yaqub', 'ismail', 'ishaq', 'idris', 'hud', 'salih', 'lut', 'shuayb', 'zakariya', 'yahya', 'ilyas', 'alyasa', 'dhulkifl', 'yunus', 'harun',
        'মুহাম্মদ', 'ইব্রাহিম', 'মুসা', 'ঈসা', 'নূহ', 'আদম', 'ইউসুফ', 'দাউদ', 'সুলাইমান', 'আইয়ুব', 'ইয়াকুব', 'ইসমাইল', 'ইসহাক', 'ইদ্রিস', 'হুদ', 'সালিহ', 'লুত', 'শুআইব', 'যাকারিয়া', 'ইয়াহইয়া', 'ইলিয়াস', 'আলইয়াসা', 'যুলকিফল', 'ইউনুস', 'হারুন',
        // Prophet name variations
        'mohammed', 'mohammad', 'muhammed', 'rasulullah', 'abraham', 'moses', 'jesus', 'noah', 'joseph', 'david', 'solomon', 'job', 'jacob', 'ishmael', 'isaac', 'jonah', 'aaron', 'elijah', 'elisha', 'ezekiel', 'john', 'zechariah',
        
        // === SAHABA (Major Companions) ===
        // Khulafa Rashidun
        'abu bakr', 'umar', 'uthman', 'ali', 'আবু বকর', 'উমর', 'উসমান', 'আলী', 'usman', 'omar', 'siddiq', 'সিদ্দিক', 'farooq', 'ফারুক',
        // Ashara Mubashara (10 promised paradise)
        'talha', 'zubair', 'saad ibn abi waqqas', 'said ibn zaid', 'abdur rahman ibn awf', 'abu ubaidah', 'তালহা', 'যুবাইর', 'সাদ', 'সাঈদ', 'আব্দুর রহমান', 'আবু উবাইদাহ',
        // Other major Sahaba
        'bilal', 'khalid', 'salman', 'ammar', 'hamza', 'zaid', 'muadh', 'hudhaifa', 'abdullah ibn masud', 'anas', 'abu hurairah', 'abu dharr', 'abu musa', 'muawiya', 'amr ibn al-as', 'abdullah ibn umar', 'abdullah ibn abbas', 'jabir', 'ubay ibn kaab', 'abdullah ibn amr',
        'বিলাল', 'খালিদ', 'সালমান', 'আম্মার', 'হামযা', 'যায়েদ', 'মুয়াজ', 'হুযাইফা', 'আবদুল্লাহ ইবনে মাসউদ', 'আনাস', 'আবু হুরায়রা', 'আবু যর', 'আবু মুসা', 'মুয়াবিয়া', 'আমর ইবনুল আস', 'জাবির', 'উবাই ইবনে কাব',
        // Female Sahaba
        'aisha', 'khadijah', 'fatimah', 'hafsa', 'zainab', 'umm salama', 'safiyya', 'juwayriya', 'maymuna', 'sawda', 'umm habiba', 'asma', 'sumayya', 'nusayba', 'umm ayman', 'ruqayyah', 'umm kulthum',
        'আয়েশা', 'খাদিজা', 'ফাতিমা', 'হাফসা', 'যয়নব', 'উম্মে সালামা', 'সাফিয়্যা', 'জুওয়াইরিয়া', 'মাইমুনা', 'সাওদা', 'উম্মে হাবিবা', 'আসমা', 'সুমাইয়া', 'নুসাইবা', 'উম্মে আইমান', 'রুকাইয়া', 'উম্মে কুলসুম',
        
        // === FAMILY OF PROPHET (Ahlul Bayt) ===
        'hasan', 'husain', 'hussain', 'hassan', 'হাসান', 'হুসাইন', 'হোসেন', 'abbas', 'আব্বাস', 'jafar', 'জাফর', 'aqeel', 'আকীল',
        
        // === TABI'IN (Successors) ===
        'hasan basri', 'হাসান বসরী', 'ibn sirin', 'ইবনে সিরিন', 'said ibn musayyib', 'সাঈদ ইবনুল মুসাইয়্যাব', 'urwah', 'উরওয়া', 'qatadah', 'কাতাদাহ', 'mujahid', 'মুজাহিদ', 'ikrimah', 'ইকরিমা', 'ata', 'আতা', 'tawus', 'তাউস', 'nafi', 'নাফি',
        
        // === GREAT SCHOLARS (Imams) ===
        'imam', 'ইমাম', 'abu hanifa', 'আবু হানিফা', 'hanafi', 'হানাফী', 'malik', 'মালিক', 'maliki', 'মালিকী', 'shafi', 'শাফিঈ', 'shafii', 'ahmad ibn hanbal', 'আহমদ ইবনে হাম্বল', 'hanbali', 'হাম্বলী',
        'bukhari', 'বুখারী', 'muslim', 'মুসলিম', 'tirmizi', 'তিরমিযী', 'abu dawud', 'আবু দাউদ', 'nasai', 'নাসাঈ', 'ibn majah', 'ইবনে মাজাহ',
        'ibn taymiyyah', 'ইবনে তাইমিয়া', 'ibn qayyim', 'ইবনে কাইয়্যিম', 'ghazali', 'গাজ্জালী', 'nawawi', 'নববী', 'ibn kathir', 'ইবনে কাসীর', 'tabari', 'তাবারী', 'qurtubi', 'কুরতুবী', 'suyuti', 'সুয়ুতী', 'ibn hajar', 'ইবনে হাজার',
        
        // === QURAN MENTIONED FIGURES ===
        'maryam', 'মারইয়াম', 'mary', 'মরিয়ম', 'asiya', 'আসিয়া', 'khidr', 'খিজির', 'dhulqarnain', 'যুলকারনাইন', 'luqman', 'লুকমান', 'talut', 'তালুত', 'saul', 'jalut', 'জালুত', 'goliath', 'qarun', 'কারুন', 'korah', 'haman', 'হামান',
        'firaun', 'pharaoh', 'ফিরাউন', 'ফেরাউন', 'namrud', 'nimrod', 'নমরুদ', 'azar', 'আযর', 'imran', 'ইমরান', 'hannah', 'হান্না',
        'sheba', 'সাবা', 'bilqis', 'বিলকিস', 'queen of sheba', 'uzair', 'উযায়ের', 'ezra',
        
        // === ANGELS ===
        'jibreel', 'jibril', 'gabriel', 'জিবরাঈল', 'জিবরীল', 'mikail', 'michael', 'মিকাঈল', 'israfil', 'ইসরাফীল', 'azrael', 'izrail', 'আযরাঈল', 'munkar', 'মুনকার', 'nakir', 'নাকীর', 'malik', 'মালিক', 'ridwan', 'রিদওয়ান', 'kiraman katibin', 'কিরামান কাতিবীন',
        
        // === JINN & SHAYTAN ===
        'iblis', 'ইবলিস', 'shaytan', 'শয়তান', 'satan', 'jinn', 'জিন',
        
        // === PEOPLE OF PREVIOUS NATIONS ===
        'aad', 'আদ', 'thamud', 'সামুদ', 'madyan', 'মাদইয়ান', 'midian', 'ashab al-kahf', 'আসহাবে কাহাফ', 'sleepers', 'ashab al-ukhdud', 'আসহাবুল উখদুদ', 'ashab al-fil', 'আসহাবুল ফীল', 'elephant',
        
        // === BATTLES & EVENTS ===
        'badr', 'বদর', 'uhud', 'উহুদ', 'khandaq', 'খন্দক', 'ahzab', 'আহযাব', 'trench', 'tabuk', 'তাবুক', 'hunain', 'হুনাইন', 'khaibar', 'খায়বার', 'muta', 'মুতা', 'yarmouk', 'ইয়ারমুক', 'qadisiyyah', 'কাদিসিয়্যা',
        'hudaybiyyah', 'হুদায়বিয়া', 'treaty', 'banu qaynuqa', 'বনু কাইনুকা', 'banu nadir', 'বনু নাদির', 'banu qurayza', 'বনু কুরায়যা',
        
        // === SIGNIFICANT EVENTS ===
        'hijrah', 'হিজরত', 'migration', 'isra', 'ইসরা', 'miraj', 'মিরাজ', 'night journey', 'ascension', 'fath makkah', 'ফাতহে মক্কা', 'conquest of mecca', 'মক্কা বিজয়',
        'hajjatul wida', 'হাজ্জাতুল বিদা', 'farewell pilgrimage', 'বিদায় হজ্জ', 'ghadir khumm', 'গাদীরে খুম',
        'aam ul huzn', 'আমুল হুযন', 'year of sorrow', 'শোকের বছর', 'boycott', 'বয়কট', 'shib abi talib', 'শিবে আবু তালিব',
        
        // === PLACES ===
        'makkah', 'mecca', 'মক্কা', 'madinah', 'medina', 'মদিনা', 'jerusalem', 'জেরুজালেম', 'quds', 'কুদস', 'baitul maqdis', 'বায়তুল মাকদিস', 'kaaba', 'কাবা', 'kaba', 'masjid', 'মসজিদ',
        'taif', 'তায়িফ', 'abyssinia', 'habasha', 'হাবশা', 'ethiopia', 'ইথিওপিয়া', 'najran', 'নাজরান', 'yathrib', 'ইয়াসরিব',
        'safa', 'সাফা', 'marwa', 'মারওয়া', 'mina', 'মিনা', 'arafat', 'আরাফাত', 'muzdalifah', 'মুযদালিফা', 'jamarat', 'জামারাত',
        
        // === SURAH INDICATORS ===
        'surah', 'sura', 'সূরা', 'সুরা', 'chapter',
        
        // === ISLAMIC KEYWORDS ===
        'prophet', 'messenger', 'sahabi', 'companion', 'নবী', 'রাসূল', 'সাহাবী', 'সাহাবা', 'tabi', 'তাবেঈ', 'wali', 'ওলী', 'saint', 'awliya', 'আউলিয়া',
        'caliph', 'khalifa', 'খলিফা', 'খেলাফত', 'caliphate', 'amir', 'আমীর', 'sultan', 'সুলতান',
        
        // === ISLAMIC DYNASTIES & ERAS ===
        'umayyad', 'উমাইয়া', 'abbasid', 'আব্বাসীয়', 'ottoman', 'উসমানীয়', 'mughal', 'মুঘল', 'fatimid', 'ফাতিমীয়', 'ayyubid', 'আইয়ুবীয়', 'saladin', 'সালাহউদ্দীন',
        
        // === QURANIC STORIES ===
        'ashab', 'আসহাব', 'people of', 'story of', 'কাহিনী', 'কিসসা', 'qissa', 'kisah'
      ];
      return namePatterns.some(pattern => lowerQ.includes(pattern));
    };

    const nameQueryDetected = isNameQuery(query);

    const systemPrompt = `You are an Islamic knowledge assistant for a Quran app. You help users find relevant Quran verses, Hadiths, and Duas.

IMPORTANT ISLAMIC ETIQUETTES - YOU MUST FOLLOW:
1. ALWAYS start your response with Islamic greeting: ${language === 'bn' ? '"আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু"' : '"Assalamu Alaikum wa Rahmatullahi wa Barakatuh"'}
2. Use "ইনশাআল্লাহ" (InshAllah) when mentioning future events or hopes
3. Say "সুবহানাল্লাহ" (SubhanAllah) when mentioning Allah's creation or blessings
4. Say "আলহামদুলিল্লাহ" (Alhamdulillah) when expressing gratitude
5. Use "ﷺ" (Sallallahu Alaihi Wasallam) after mentioning Prophet Muhammad's name
6. ALWAYS end your response with a relevant dua

${nameQueryDetected ? `
SPECIAL INSTRUCTION - NAME/STORY QUERY DETECTED:
The user is asking about a person (Prophet, Messenger, Sahabi, Islamic figure) or a Surah name or Islamic historical event.

YOU MUST FOLLOW THIS STRUCTURE:
1. **FIRST - TELL A COMPLETE STORY**: Before anything else, provide a full, authentic, and engaging story about the person/topic. Include:
   - Who they were and their significance in Islam
   - Key events from their life
   - Important miracles, lessons, or achievements
   - Their relationship with Allah and other prophets/companions
   - How their story ended or their legacy
   - Make the story detailed (at least 3-4 paragraphs) and inspiring

2. **AFTER THE STORY - Add References**:
   - Include 2-3 relevant Quran verses that mention or relate to this person/topic
   - Include 1-2 relevant Hadiths about this person/topic
   - Include a relevant Dua if applicable

3. **Conclude with a lesson**: What we can learn from their story

IMPORTANT: The story must be historically accurate according to Islamic sources. Do not make up details.
` : ''}

RESPONSE RULES:
1. Always respond in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}
2. When referencing content, use exact references from the database data provided
3. Provide accurate Islamic information based ONLY on authentic Islamic sources
4. Structure your response with clear sections
5. Always include specific references that users can look up in the app
6. Be warm, respectful, humble and helpful in your tone
7. Show reverence when discussing Allah, the Quran, and the Prophet ﷺ
8. End with a relevant dua like:
   ${language === 'bn' 
     ? '- "আল্লাহ আপনাকে হেদায়েত দান করুন"\n   - "আল্লাহ আপনার জ্ঞান বৃদ্ধি করুন"\n   - "জাযাকাল্লাহু খাইরান"' 
     : '- "May Allah guide you to the straight path"\n   - "May Allah increase your knowledge"\n   - "JazakAllahu Khairan"'}

DATABASE CONTEXT:
- Surahs available: ${JSON.stringify(surahsResult.data?.slice(0, 10) || [])}
- Relevant verses found: ${JSON.stringify(relevantVerses)}
- Relevant hadiths found: ${JSON.stringify(relevantHadiths)}
- Relevant duas found: ${JSON.stringify(relevantDuas)}

When responding, format references as:
- For Quran verses: [Surah Name, Ayah X] or সূরা [নাম], আয়াত [সংখ্যা]
- For Hadiths: [Book Name, Hadith X] or [বই নাম], হাদিস [সংখ্যা]
- For Duas: Reference the dua title

Provide helpful, accurate responses. If you cannot find relevant information in the provided data, use your knowledge of authentic Islamic sources but always be honest about the source.`;

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