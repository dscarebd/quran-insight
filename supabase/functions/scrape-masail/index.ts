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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, url, urls, source } = await req.json();
    
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

    // ============ IslamQA.info Actions ============
    
    // Action: map-islamqa - Discover Bengali Q&A URLs from IslamQA.info
    if (action === 'map-islamqa') {
      console.log('Mapping IslamQA.info Bengali URLs...');
      
      // First get the category page to find all topic links
      const baseUrl = 'https://islamqa.info/bn/categories/topics';
      
      const response = await fetch('https://api.firecrawl.dev/v1/map', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: baseUrl,
          search: 'answers',
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

      // Filter URLs that match IslamQA Bengali answer pattern
      const answerUrls = (data.links || []).filter((link: string) => 
        link.includes('islamqa.info/bn/answers/') && 
        !link.includes('#') &&
        /\/answers\/\d+/.test(link)
      );

      // Remove duplicates
      const uniqueUrls = [...new Set(answerUrls)];

      console.log(`Found ${uniqueUrls.length} IslamQA Bengali answer URLs`);
      
      return new Response(
        JSON.stringify({ success: true, urls: uniqueUrls, total: uniqueUrls.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: batch-islamqa - Batch import from IslamQA.info
    if (action === 'batch-islamqa') {
      if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'URLs array is required for batch import' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Starting IslamQA batch import of ${urls.length} URLs`);
      
      const results = {
        imported: 0,
        skipped: 0,
        failed: 0,
        errors: [] as string[],
      };

      // Process URLs with rate limiting (max 3 per batch for IslamQA)
      const batchSize = Math.min(urls.length, 3);
      const batchUrls = urls.slice(0, batchSize);

      for (const masailUrl of batchUrls) {
        try {
          // Extract source_id from IslamQA URL (the number in /answers/123456)
          const urlMatch = masailUrl.match(/\/answers\/(\d+)/);
          const sourceId = urlMatch ? `islamqa-${urlMatch[1]}` : null;
          
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

          // Scrape with Firecrawl
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
          const masailData = parseIslamQAContent(markdown, masailUrl, sourceId);

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
            console.log(`Imported: ${masailData.title.substring(0, 50)}...`);
          }

          // Rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
        } catch (err) {
          results.failed++;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          results.errors.push(`Error processing ${masailUrl}: ${errorMessage}`);
        }
      }

      console.log(`IslamQA batch complete: ${results.imported} imported, ${results.skipped} skipped, ${results.failed} failed`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          results,
          remaining: urls.length - batchSize,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ============ Original islamijindegi.com Actions ============

    // Action: Map - Discover all masail URLs from islamijindegi
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
      
      const urlMatch = url.match(/\/masail\/([a-f0-9-]+)/);
      const sourceId = urlMatch ? urlMatch[1] : null;
      
      if (!sourceId) {
        return new Response(
          JSON.stringify({ success: false, error: 'Could not extract masail ID from URL' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

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

      const markdown = data.data?.markdown || '';
      const masailData = parseMasailContent(markdown, url, sourceId);
      
      if (!masailData) {
        console.log('Could not parse masail content from:', url);
        return new Response(
          JSON.stringify({ success: false, error: 'Could not parse masail content' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

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

    // Action: Batch import - Import multiple URLs (original islamijindegi)
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

      const batchSize = Math.min(urls.length, 5);
      const batchUrls = urls.slice(0, batchSize);

      for (const masailUrl of batchUrls) {
        try {
          const urlMatch = masailUrl.match(/\/masail\/([a-f0-9-]+)/);
          const sourceId = urlMatch ? urlMatch[1] : null;
          
          if (!sourceId) {
            results.failed++;
            results.errors.push(`Invalid URL format: ${masailUrl}`);
            continue;
          }

          const { data: existing } = await supabase
            .from('masail')
            .select('id')
            .eq('source_id', sourceId)
            .single();

          if (existing) {
            results.skipped++;
            continue;
          }

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

          const { error: insertError } = await supabase
            .from('masail')
            .insert(masailData);

          if (insertError) {
            results.failed++;
            results.errors.push(`Insert failed for ${masailUrl}: ${insertError.message}`);
          } else {
            results.imported++;
          }

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
      JSON.stringify({ success: false, error: 'Invalid action. Use: map, map-islamqa, scrape, batch, or batch-islamqa' }),
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

// Parse IslamQA.info Bengali content
function parseIslamQAContent(markdown: string, sourceUrl: string, sourceId: string): MasailData | null {
  if (!markdown || markdown.trim().length < 100) {
    return null;
  }

  const lines = markdown.split('\n');
  
  let title = '';
  let question = '';
  let answer = '';
  let author = '';
  let category = '';
  
  let inQuestion = false;
  let inAnswer = false;
  let questionLines: string[] = [];
  let answerLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines at the start
    if (!title && !trimmedLine) continue;
    
    // Extract title from first heading
    if (!title && trimmedLine.startsWith('#')) {
      title = trimmedLine.replace(/^#+\s*/, '').trim();
      continue;
    }
    
    // Look for question section - "প্রশ্ন" means "Question" in Bengali
    if (trimmedLine.includes('প্রশ্ন') && trimmedLine.startsWith('#')) {
      inQuestion = true;
      inAnswer = false;
      continue;
    }
    
    // Look for answer section - "উত্তর" means "Answer" in Bengali
    if ((trimmedLine.includes('উত্তর') || trimmedLine.includes('জবাব')) && trimmedLine.startsWith('#')) {
      inQuestion = false;
      inAnswer = true;
      continue;
    }
    
    // Look for author/scholar name patterns
    if (trimmedLine.includes('শায়খ') || trimmedLine.includes('মুফতী') || 
        trimmedLine.includes('ইবনে') || trimmedLine.includes('ইমাম')) {
      if (!author && trimmedLine.length < 100) {
        author = trimmedLine.replace(/^[-*•]+\s*/, '').trim();
      }
    }
    
    // Collect content
    if (inQuestion) {
      questionLines.push(line);
    } else if (inAnswer) {
      answerLines.push(line);
    }
  }

  // Build question and answer from collected lines
  question = questionLines.join('\n').trim();
  answer = answerLines.join('\n').trim();
  
  // If no clear question/answer structure, try alternative parsing
  if (!answer && markdown.length > 200) {
    // Use entire content as answer if no clear structure
    const allContent = lines.filter(l => l.trim() && !l.startsWith('#')).join('\n');
    answer = allContent.trim();
  }

  // If still no title, use first significant text
  if (!title) {
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.length > 10 && trimmed.length < 200) {
        title = trimmed.substring(0, 200);
        break;
      }
    }
  }

  // Clean up markdown artifacts
  answer = answer
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links but keep text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .trim();

  question = question
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim();

  // Validate we have enough content
  if (!title || answer.length < 50) {
    console.log(`Parse failed - title: "${title?.substring(0, 50)}", answer length: ${answer.length}`);
    return null;
  }

  return {
    title: title.substring(0, 500),
    question: question || null,
    answer,
    author: author || 'IslamQA',
    category: 'IslamQA Bengali',
    source_url: sourceUrl,
    source_id: sourceId,
  };
}

// Parse masail content from islamijindegi.com
function parseMasailContent(markdown: string, sourceUrl: string, sourceId: string): MasailData | null {
  if (!markdown || markdown.trim().length < 50) {
    return null;
  }

  const lines = markdown.split('\n').filter(line => line.trim());
  
  let title = '';
  let questionStart = -1;
  let answerStart = -1;
  let author = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#')) {
      if (!title) {
        title = line.replace(/^#+\s*/, '').trim();
      }
      continue;
    }
    
    if (line.includes('প্রশ্ন') || line.toLowerCase().includes('question')) {
      questionStart = i;
    }
    
    if (line.includes('উত্তর') || line.toLowerCase().includes('answer') || line.includes('জবাব')) {
      answerStart = i;
    }
    
    if (line.includes('মুফতি') || line.includes('শায়খ') || line.includes('উস্তাদ')) {
      author = line;
    }
  }

  if (!title && lines.length > 0) {
    title = lines[0].replace(/^#+\s*/, '').trim().substring(0, 200);
  }

  let question = '';
  let answer = '';
  
  if (questionStart >= 0 && answerStart > questionStart) {
    question = lines.slice(questionStart, answerStart).join('\n').trim();
    answer = lines.slice(answerStart).join('\n').trim();
  } else if (answerStart >= 0) {
    question = lines.slice(0, answerStart).join('\n').trim();
    answer = lines.slice(answerStart).join('\n').trim();
  } else {
    answer = markdown.trim();
  }

  if (author) {
    author = author.replace(/^[-*•]\s*/, '').trim();
  }

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
