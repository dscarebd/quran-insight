import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limit: max 30 page views per visitor per minute
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 30;

// In-memory rate limit store (per edge function instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(visitorId: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(visitorId);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(visitorId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// Validate page path - only allow known route patterns
function isValidPagePath(pagePath: string): boolean {
  if (!pagePath || typeof pagePath !== 'string') return false;
  if (pagePath.length > 200) return false;
  
  // Must start with /
  if (!pagePath.startsWith('/')) return false;
  
  // No suspicious patterns
  const suspiciousPatterns = [
    /javascript:/i,
    /<script/i,
    /\.\./,
    /[<>'"]/,
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(pagePath));
}

// Validate visitor ID format
function isValidVisitorId(visitorId: string): boolean {
  if (!visitorId || typeof visitorId !== 'string') return false;
  if (visitorId.length > 50) return false;
  
  // Should match the format: timestamp-randomstring
  const validFormat = /^[a-z0-9]+-[a-z0-9]+$/i;
  return validFormat.test(visitorId);
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { visitor_id, page_path, user_agent, referrer } = body;

    // Validate required fields
    if (!visitor_id || !page_path) {
      console.log('Missing required fields:', { visitor_id: !!visitor_id, page_path: !!page_path });
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate visitor ID
    if (!isValidVisitorId(visitor_id)) {
      console.log('Invalid visitor ID format:', visitor_id);
      return new Response(JSON.stringify({ error: 'Invalid visitor ID' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate page path
    if (!isValidPagePath(page_path)) {
      console.log('Invalid page path:', page_path);
      return new Response(JSON.stringify({ error: 'Invalid page path' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check rate limit
    if (isRateLimited(visitor_id)) {
      console.log('Rate limited visitor:', visitor_id);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Sanitize optional fields
    const sanitizedUserAgent = user_agent && typeof user_agent === 'string' 
      ? user_agent.substring(0, 500) 
      : null;
    const sanitizedReferrer = referrer && typeof referrer === 'string'
      ? referrer.substring(0, 500)
      : null;

    // Insert page view
    const { error } = await supabase.from('page_views').insert({
      visitor_id,
      page_path,
      user_agent: sanitizedUserAgent,
      referrer: sanitizedReferrer,
    });

    if (error) {
      console.error('Database insert error:', error);
      return new Response(JSON.stringify({ error: 'Failed to track page view' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Page view tracked:', { visitor_id, page_path });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});