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

    // Search in database for relevant content
    const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    
    // Search verses
    let relevantVerses: any[] = [];
    if (searchTerms.length > 0) {
      const { data: searchedVerses } = await supabase
        .from('verses')
        .select('surah_number, verse_number, arabic, bengali, english')
        .or(searchTerms.map(term => `bengali.ilike.%${term}%,english.ilike.%${term}%`).join(','))
        .limit(10);
      relevantVerses = searchedVerses || [];
    }

    // Search hadiths
    let relevantHadiths: any[] = [];
    if (searchTerms.length > 0) {
      const { data: searchedHadiths } = await supabase
        .from('hadiths')
        .select('book_slug, hadith_number, arabic, bengali, english, grade')
        .or(searchTerms.map(term => `bengali.ilike.%${term}%,english.ilike.%${term}%`).join(','))
        .limit(10);
      relevantHadiths = searchedHadiths || [];
    }

    // Search duas
    let relevantDuas: any[] = [];
    if (searchTerms.length > 0) {
      const { data: searchedDuas } = await supabase
        .from('duas')
        .select('category_id, dua_id, title_bengali, title_english, arabic, bengali, english')
        .or(searchTerms.map(term => `bengali.ilike.%${term}%,english.ilike.%${term}%,title_bengali.ilike.%${term}%,title_english.ilike.%${term}%`).join(','))
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