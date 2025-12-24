import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language } = await req.json();
    console.log("Received search query:", query, "Language:", language);

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const systemPrompt = language === "bn" 
      ? `আপনি একজন ইসলামিক পণ্ডিত এবং কুরআন বিশেষজ্ঞ। ব্যবহারকারীর প্রশ্নের উত্তর দিন কুরআনের আয়াত এবং তাফসীর থেকে।

নিয়ম:
- সবসময় প্রাসঙ্গিক কুরআনের আয়াত উদ্ধৃত করুন (আরবি এবং বাংলা অনুবাদ সহ)
- সূরার নাম এবং আয়াত নম্বর উল্লেখ করুন
- সংক্ষিপ্ত কিন্তু তথ্যবহুল উত্তর দিন
- তাফসীর থেকে ব্যাখ্যা যোগ করুন
- উত্তর বাংলায় দিন`
      : `You are an Islamic scholar and Quran expert. Answer user questions using Quran verses and Tafsir.

Rules:
- Always quote relevant Quran verses (with Arabic and English translation)
- Mention Surah name and verse number
- Give concise but informative answers
- Add explanations from Tafsir
- Answer in English`;

    console.log("Making request to OpenAI API...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Successfully connected to OpenAI API, streaming response...");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in quran-search function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
