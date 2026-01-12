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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all duas
    const { data: duas, error: duasError } = await supabase
      .from('duas')
      .select('dua_id, category_id, title_english, title_bengali, title_hindi, arabic, english, bengali, hindi, transliteration, transliteration_bengali, transliteration_hindi, reference')
      .order('category_id')
      .order('dua_id');

    if (duasError) {
      throw duasError;
    }

    // Format duas with null handling
    const formattedDuas = (duas || []).map(dua => ({
      dua_id: dua.dua_id,
      category_id: dua.category_id,
      title_english: dua.title_english,
      title_bengali: dua.title_bengali,
      title_hindi: dua.title_hindi || '',
      arabic: dua.arabic,
      english: dua.english,
      bengali: dua.bengali,
      hindi: dua.hindi || '',
      transliteration: dua.transliteration || '',
      transliteration_bengali: dua.transliteration_bengali || '',
      transliteration_hindi: dua.transliteration_hindi || '',
      reference: dua.reference || ''
    }));

    return new Response(
      JSON.stringify(formattedDuas, null, 2),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="duas-complete.json"'
        } 
      }
    );
  } catch (error: unknown) {
    console.error('Error exporting duas:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
