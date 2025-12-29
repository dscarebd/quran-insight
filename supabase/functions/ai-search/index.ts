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
      // Bengali to English/Arabic concepts
      'জান্নাত': ['paradise', 'heaven', 'jannah', 'الجنة'],
      'জাহান্নাম': ['hell', 'jahannam', 'جهنم'],
      'নামাজ': ['prayer', 'salat', 'salah', 'صلاة'],
      'রোজা': ['fasting', 'sawm', 'صوم'],
      'হজ': ['hajj', 'pilgrimage', 'حج'],
      'যাকাত': ['zakat', 'charity', 'زكاة'],
      'তওবা': ['repentance', 'tawbah', 'توبة'],
      'সবর': ['patience', 'sabr', 'صبر'],
      'শুকর': ['gratitude', 'shukr', 'شكر'],
      'তাওয়াক্কুল': ['trust', 'tawakkul', 'توكل'],
      'ইমান': ['faith', 'iman', 'إيمان'],
      'তাকওয়া': ['piety', 'taqwa', 'تقوى'],
      'রহমত': ['mercy', 'rahmat', 'رحمة'],
      'বরকত': ['blessing', 'barakah', 'بركة'],
      'হেদায়েত': ['guidance', 'hidayah', 'هداية'],
      'মাগফিরাত': ['forgiveness', 'maghfirah', 'مغفرة'],
      'আখিরাত': ['hereafter', 'akhirah', 'آخرة'],
      'দুনিয়া': ['world', 'dunya', 'دنيا'],
      'কিয়ামত': ['judgment', 'qiyamah', 'قيامة'],
      'ফেরেশতা': ['angel', 'malak', 'ملائكة'],
      'শয়তান': ['satan', 'shaytan', 'شيطان'],
      'নবী': ['prophet', 'nabi', 'نبي'],
      'রাসূল': ['messenger', 'rasul', 'رسول'],
      'সাহাবা': ['companion', 'sahaba', 'صحابة'],
      'উম্মাহ': ['ummah', 'community', 'أمة'],
      'হালাল': ['halal', 'permissible', 'حلال'],
      'হারাম': ['haram', 'forbidden', 'حرام'],
      'সুন্নাহ': ['sunnah', 'tradition', 'سنة'],
      'হাদিস': ['hadith', 'tradition', 'حديث'],
      'কুরআন': ['quran', 'قرآن'],
      'আয়াত': ['verse', 'ayah', 'آية'],
      'সূরা': ['surah', 'chapter', 'سورة'],
      'দোয়া': ['dua', 'supplication', 'دعاء'],
      'যিকির': ['dhikr', 'remembrance', 'ذكر'],
      'তাফসীর': ['tafsir', 'exegesis', 'تفسير'],
      'শাফায়াত': ['intercession', 'shafaat', 'شفاعة'],
      // English to Bengali/Arabic
      'paradise': ['জান্নাত', 'jannah', 'الجنة'],
      'heaven': ['জান্নাত', 'jannah', 'الجنة'],
      'hell': ['জাহান্নাম', 'jahannam', 'جهنم'],
      'prayer': ['নামাজ', 'সালাত', 'صلاة'],
      'fasting': ['রোজা', 'সাওম', 'صوم'],
      'charity': ['যাকাত', 'সাদাকা', 'زكاة'],
      'patience': ['সবর', 'ধৈর্য', 'صبر'],
      'faith': ['ইমান', 'বিশ্বাস', 'إيمان'],
      'mercy': ['রহমত', 'দয়া', 'رحمة'],
      'forgiveness': ['মাগফিরাত', 'ক্ষমা', 'مغفرة'],
      'guidance': ['হেদায়েত', 'পথপ্রদর্শন', 'هداية'],
      'blessing': ['বরকত', 'নেয়ামত', 'بركة'],
      'repentance': ['তওবা', 'توبة'],
      'angel': ['ফেরেশতা', 'ملائكة'],
      'prophet': ['নবী', 'نبي'],
      'messenger': ['রাসূল', 'رسول'],
      'morning': ['সকাল', 'ফজর', 'صباح'],
      'evening': ['সন্ধ্যা', 'মাগরিব', 'مساء'],
      'sleep': ['ঘুম', 'নিদ্রা', 'نوم'],
      'food': ['খাবার', 'আহার', 'طعام'],
      'travel': ['সফর', 'ভ্রমণ', 'سفر'],
      'health': ['স্বাস্থ্য', 'সুস্থতা', 'صحة'],
      'protection': ['হেফাজত', 'সুরক্ষা', 'حماية'],
      'success': ['সফলতা', 'কামিয়াবি', 'نجاح'],
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