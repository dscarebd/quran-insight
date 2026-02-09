import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  meta?: {
    total: number;
    limit: number;
    offset: number;
    endpoint: string;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed. Use GET.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    // Get endpoint from path: /public-api/surahs -> surahs
    const endpoint = pathParts[pathParts.length - 1] || '';
    
    // Parse query parameters
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 1000);
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const surahNumber = url.searchParams.get('surah');
    const paraNumber = url.searchParams.get('para');
    const bookSlug = url.searchParams.get('book');
    const categoryId = url.searchParams.get('category');

    let response: ApiResponse;

    switch (endpoint) {
      case 'surahs': {
        const { data, error, count } = await supabase
          .from('surahs')
          .select('number, name_arabic, name_english, name_bengali, meaning_english, meaning_bengali, revelation_type, total_verses', { count: 'exact' })
          .order('number')
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'surahs' }
        };
        break;
      }

      case 'verses': {
        let query = supabase
          .from('verses')
          .select('surah_number, verse_number, arabic, english, bengali, tafsir_english, tafsir_bengali, page_number', { count: 'exact' });

        if (surahNumber) {
          query = query.eq('surah_number', parseInt(surahNumber));
        }

        // For para filtering, we need to check page ranges (each para has specific page ranges)
        if (paraNumber) {
          const paraNum = parseInt(paraNumber);
          // Para to page mapping (approximate - each para is roughly 20 pages)
          const paraStartPage = (paraNum - 1) * 20 + 1;
          const paraEndPage = paraNum * 20;
          query = query.gte('page_number', paraStartPage).lte('page_number', paraEndPage);
        }

        const { data, error, count } = await query
          .order('surah_number')
          .order('verse_number')
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'verses' }
        };
        break;
      }

      case 'hadiths': {
        let query = supabase
          .from('hadiths')
          .select('hadith_number, book_slug, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali', { count: 'exact' });

        if (bookSlug) {
          query = query.eq('book_slug', bookSlug);
        }

        const { data, error, count } = await query
          .order('book_slug')
          .order('hadith_number')
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'hadiths' }
        };
        break;
      }

      case 'hadith-books': {
        const { data, error, count } = await supabase
          .from('hadith_books')
          .select('slug, name_arabic, name_english, name_bengali, total_hadiths, display_order', { count: 'exact' })
          .order('display_order')
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'hadith-books' }
        };
        break;
      }

      case 'duas': {
        let query = supabase
          .from('duas')
          .select('dua_id, category_id, title_english, title_bengali, title_hindi, arabic, transliteration, transliteration_bengali, transliteration_hindi, english, bengali, hindi, reference', { count: 'exact' });

        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }

        const { data, error, count } = await query
          .order('category_id')
          .order('dua_id')
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'duas' }
        };
        break;
      }

      case 'dua-categories': {
        const { data, error, count } = await supabase
          .from('dua_categories')
          .select('category_id, name_english, name_bengali, icon, display_order', { count: 'exact' })
          .order('display_order')
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'dua-categories' }
        };
        break;
      }

      case 'masail': {
        const { data, error, count } = await supabase
          .from('masail')
          .select('id, title, question, answer, author, category, source_url', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);

        if (error) throw error;
        response = {
          success: true,
          data,
          meta: { total: count || 0, limit, offset, endpoint: 'masail' }
        };
        break;
      }

      default: {
        // Return API documentation for root endpoint
        response = {
          success: true,
          data: {
            name: "Quran Insight Public API",
            version: "1.0.0",
            description: "Free API for Islamic data - Quran, Hadith, Duas, and more",
            endpoints: {
              surahs: {
                path: "/public-api/surahs",
                description: "Get all 114 Surahs with metadata",
                params: ["limit", "offset"]
              },
              verses: {
                path: "/public-api/verses",
                description: "Get Quran verses with translations and tafsir",
                params: ["surah", "para", "limit", "offset"]
              },
              hadiths: {
                path: "/public-api/hadiths",
                description: "Get Hadiths from various collections",
                params: ["book", "limit", "offset"]
              },
              "hadith-books": {
                path: "/public-api/hadith-books",
                description: "Get list of available Hadith collections",
                params: ["limit", "offset"]
              },
              duas: {
                path: "/public-api/duas",
                description: "Get Duas with translations",
                params: ["category", "limit", "offset"]
              },
              "dua-categories": {
                path: "/public-api/dua-categories",
                description: "Get Dua categories",
                params: ["limit", "offset"]
              },
              masail: {
                path: "/public-api/masail",
                description: "Get Islamic rulings/fatwas",
                params: ["limit", "offset"]
              }
            },
            queryParameters: {
              limit: "Number of results (default: 100, max: 1000)",
              offset: "Pagination offset (default: 0)",
              surah: "Filter verses by surah number (1-114)",
              para: "Filter verses by para/juz number (1-30)",
              book: "Filter hadiths by book slug (e.g., bukhari, muslim)",
              category: "Filter duas by category_id"
            },
            attribution: "Data provided by Quran Insight - quraninsight.lovable.app"
          }
        };
      }
    }

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
