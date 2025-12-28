import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language, bookFilter } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!query || typeof query !== "string" || query.length > 500) {
      return new Response(
        JSON.stringify({ error: "Invalid query" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch hadith books for context
    const { data: books } = await supabase
      .from("hadith_books")
      .select("slug, name_english, name_bengali");

    const booksList = books?.map(b => `${b.slug}: ${b.name_english} (${b.name_bengali})`).join(", ") || "";

    const systemPrompt = language === "bn" 
      ? `আপনি একজন ইসলামিক হাদিস বিশেষজ্ঞ সহকারী। ব্যবহারকারীর প্রশ্নের উপর ভিত্তি করে প্রাসঙ্গিক হাদিস খুঁজে পেতে সাহায্য করুন।

আপনার কাজ হল ব্যবহারকারীর প্রশ্ন বিশ্লেষণ করা এবং একটি JSON অবজেক্ট ফেরত দেওয়া যাতে থাকবে:
1. "keywords": প্রাসঙ্গিক ইংরেজি ও আরবি কীওয়ার্ডের অ্যারে যা ডাটাবেসে হাদিস খুঁজতে ব্যবহার করা যাবে
2. "explanation": বাংলায় সংক্ষিপ্ত ব্যাখ্যা কেন এই কীওয়ার্ডগুলি প্রাসঙ্গিক
3. "suggested_books": প্রাসঙ্গিক হাদিস গ্রন্থের slug অ্যারে (যদি প্রযোজ্য হয়)

উপলব্ধ গ্রন্থ: ${booksList}

শুধুমাত্র বৈধ JSON ফেরত দিন, অন্য কোনো টেক্সট নয়।`
      : `You are an Islamic hadith expert assistant. Help users find relevant hadiths based on their questions.

Your task is to analyze the user's question and return a JSON object containing:
1. "keywords": An array of relevant English and Arabic keywords that can be used to search hadiths in the database
2. "explanation": A brief explanation of why these keywords are relevant
3. "suggested_books": An array of relevant hadith book slugs (if applicable)

Available books: ${booksList}

Return ONLY valid JSON, no other text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const aiContent = aiData.choices?.[0]?.message?.content || "";
    
    console.log("AI Response:", aiContent);

    // Parse AI response
    let parsedResponse;
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanContent = aiContent.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      parsedResponse = JSON.parse(cleanContent.trim());
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      parsedResponse = { keywords: [query], explanation: "", suggested_books: [] };
    }

    const keywords = parsedResponse.keywords || [query];
    const explanation = parsedResponse.explanation || "";
    const suggestedBooks = parsedResponse.suggested_books || [];

    // Build search query using keywords
    const searchConditions = keywords.map((kw: string) => 
      `arabic.ilike.%${kw}%,english.ilike.%${kw}%,bengali.ilike.%${kw}%`
    ).join(",");

    let queryBuilder = supabase
      .from("hadiths")
      .select("id, book_slug, hadith_number, arabic, english, bengali, grade")
      .or(searchConditions)
      .order("book_slug", { ascending: true })
      .order("hadith_number", { ascending: true })
      .limit(20);

    if (bookFilter && bookFilter !== "all") {
      queryBuilder = queryBuilder.eq("book_slug", bookFilter);
    } else if (suggestedBooks.length > 0) {
      queryBuilder = queryBuilder.in("book_slug", suggestedBooks);
    }

    const { data: hadiths, error } = await queryBuilder;

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    return new Response(
      JSON.stringify({
        hadiths: hadiths || [],
        explanation,
        keywords,
        suggestedBooks
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in hadith-ai-search:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
