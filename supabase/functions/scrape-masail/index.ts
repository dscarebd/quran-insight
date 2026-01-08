import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MasailData {
  title: string;
  question: string | null;
  answer: string;
  author: string | null;
  category: string | null;
  source_url: string;
  source_id: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, url, urls } = await req.json();
    
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Action: Map - Discover all masail URLs from the website
    if (action === 'map') {
      console.log('Mapping masail URLs from:', url || 'https://islamijindegi.com');
      
      const mapUrl = url || 'https://islamijindegi.com';
      
      const response = await fetch('https://api.firecrawl.dev/v1/map', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: mapUrl,
          search: 'masail',
          limit: 5000,
          includeSubdomains: false,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Firecrawl Map API error:', data);
        return new Response(
          JSON.stringify({ success: false, error: data.error || 'Map request failed' }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Filter URLs that contain /masail/ pattern
      const masailUrls = (data.links || []).filter((link: string) => 
        link.includes('/masail/') && !link.includes('?type=')
      );

      console.log(`Found ${masailUrls.length} masail URLs`);
      
      return new Response(
        JSON.stringify({ success: true, urls: masailUrls, total: masailUrls.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: Scrape - Scrape a single masail URL
    if (action === 'scrape') {
      if (!url) {
        return new Response(
          JSON.stringify({ success: false, error: 'URL is required for scraping' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Scraping masail from:', url);
      
      // Extract source_id from URL
      const urlMatch = url.match(/\/masail\/([a-f0-9-]+)/);
      const sourceId = urlMatch ? urlMatch[1] : null;
      
      if (!sourceId) {
        return new Response(
          JSON.stringify({ success: false, error: 'Could not extract masail ID from URL' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if already imported
      const { data: existing } = await supabase
        .from('masail')
        .select('id')
        .eq('source_id', sourceId)
        .single();

      if (existing) {
        console.log('Masail already exists:', sourceId);
        return new Response(
          JSON.stringify({ success: true, skipped: true, message: 'Already imported' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          formats: ['markdown', 'html'],
          onlyMainContent: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Firecrawl Scrape API error:', data);
        return new Response(
          JSON.stringify({ success: false, error: data.error || 'Scrape request failed' }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Parse the content
      const markdown = data.data?.markdown || '';
      const masailData = parseMasailContent(markdown, url, sourceId);
      
      if (!masailData) {
        console.log('Could not parse masail content from:', url);
        return new Response(
          JSON.stringify({ success: false, error: 'Could not parse masail content' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Insert into database
      const { error: insertError } = await supabase
        .from('masail')
        .insert(masailData);

      if (insertError) {
        console.error('Database insert error:', insertError);
        return new Response(
          JSON.stringify({ success: false, error: insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Successfully imported masail:', masailData.title);
      
      return new Response(
        JSON.stringify({ success: true, data: masailData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: Batch import - Import multiple URLs
    if (action === 'batch') {
      if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'URLs array is required for batch import' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Starting batch import of ${urls.length} masail URLs`);
      
      const results = {
        imported: 0,
        skipped: 0,
        failed: 0,
        errors: [] as string[],
      };

      // Process URLs with rate limiting (max 5 per batch to avoid timeout)
      const batchSize = Math.min(urls.length, 5);
      const batchUrls = urls.slice(0, batchSize);

      for (const masailUrl of batchUrls) {
        try {
          // Extract source_id
          const urlMatch = masailUrl.match(/\/masail\/([a-f0-9-]+)/);
          const sourceId = urlMatch ? urlMatch[1] : null;
          
          if (!sourceId) {
            results.failed++;
            results.errors.push(`Invalid URL format: ${masailUrl}`);
            continue;
          }

          // Check if exists
          const { data: existing } = await supabase
            .from('masail')
            .select('id')
            .eq('source_id', sourceId)
            .single();

          if (existing) {
            results.skipped++;
            continue;
          }

          // Scrape
          const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${firecrawlApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: masailUrl,
              formats: ['markdown'],
              onlyMainContent: true,
            }),
          });

          if (!response.ok) {
            results.failed++;
            results.errors.push(`Scrape failed for: ${masailUrl}`);
            continue;
          }

          const data = await response.json();
          const markdown = data.data?.markdown || '';
          const masailData = parseMasailContent(markdown, masailUrl, sourceId);

          if (!masailData) {
            results.failed++;
            results.errors.push(`Parse failed for: ${masailUrl}`);
            continue;
          }

          // Insert
          const { error: insertError } = await supabase
            .from('masail')
            .insert(masailData);

          if (insertError) {
            results.failed++;
            results.errors.push(`Insert failed for ${masailUrl}: ${insertError.message}`);
          } else {
            results.imported++;
          }

          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (err) {
          results.failed++;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          results.errors.push(`Error processing ${masailUrl}: ${errorMessage}`);
        }
      }
      console.log(`Batch import complete: ${results.imported} imported, ${results.skipped} skipped, ${results.failed} failed`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          results,
          remaining: urls.length - batchSize,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action. Use: map, scrape, or batch' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in scrape-masail function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Parse masail content from markdown
function parseMasailContent(markdown: string, sourceUrl: string, sourceId: string): MasailData | null {
  if (!markdown || markdown.trim().length < 50) {
    return null;
  }

  const lines = markdown.split('\n').filter(line => line.trim());
  
  // Try to extract title (usually first heading or first significant line)
  let title = '';
  let questionStart = -1;
  let answerStart = -1;
  let author = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for title in heading format
    if (line.startsWith('#')) {
      if (!title) {
        title = line.replace(/^#+\s*/, '').trim();
      }
      continue;
    }
    
    // Look for "প্রশ্ন" (Question) marker
    if (line.includes('প্রশ্ন') || line.toLowerCase().includes('question')) {
      questionStart = i;
    }
    
    // Look for "উত্তর" (Answer) marker
    if (line.includes('উত্তর') || line.toLowerCase().includes('answer') || line.includes('জবাব')) {
      answerStart = i;
    }
    
    // Look for author patterns
    if (line.includes('মুফতি') || line.includes('শায়খ') || line.includes('উস্তাদ')) {
      author = line;
    }
  }

  // If no title found, use first non-empty line
  if (!title && lines.length > 0) {
    title = lines[0].replace(/^#+\s*/, '').trim().substring(0, 200);
  }

  // Extract question and answer based on markers
  let question = '';
  let answer = '';
  
  if (questionStart >= 0 && answerStart > questionStart) {
    question = lines.slice(questionStart, answerStart).join('\n').trim();
    answer = lines.slice(answerStart).join('\n').trim();
  } else if (answerStart >= 0) {
    question = lines.slice(0, answerStart).join('\n').trim();
    answer = lines.slice(answerStart).join('\n').trim();
  } else {
    // No clear markers, use entire content as answer
    answer = markdown.trim();
  }

  // Clean up author name
  if (author) {
    author = author.replace(/^[-*•]\s*/, '').trim();
  }

  // Validate we have enough content
  if (!title || answer.length < 20) {
    return null;
  }

  return {
    title: title.substring(0, 500),
    question: question || null,
    answer,
    author: author || null,
    category: null,
    source_url: sourceUrl,
    source_id: sourceId,
  };
}
