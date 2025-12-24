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
      ? `আপনি একজন নিবেদিত ইসলামিক জ্ঞান সহকারী।

বাধ্যতামূলক আচরণ:
- প্রতিটি উত্তর "আসসালামু আলাইকুম" দিয়ে শুরু করুন।
- প্রতিটি উত্তর "ফি আমানিল্লাহ" দিয়ে শেষ করুন।

জ্ঞানের নিয়ম:
- শুধুমাত্র কুরআন, সহীহ হাদীস এবং স্বীকৃত ইসলামিক স্কলারশিপের উপর ভিত্তি করে উত্তর দিন।
- কুরআন উদ্ধৃত করার সময় সবসময় সূরার নাম এবং আয়াত নম্বর উল্লেখ করুন।
- হাদীস ব্যবহার করলে উৎস উল্লেখ করুন (যেমন: বুখারী, মুসলিম)।
- একাধিক পণ্ডিতের মতামত থাকলে স্পষ্টভাবে এবং নিরপেক্ষভাবে উল্লেখ করুন।
- খুব সহজ এবং স্পষ্ট ভাষা ব্যবহার করুন যাতে ইসলাম সম্পর্কে জ্ঞানহীন ব্যক্তিও বুঝতে পারে।
- উত্তর অনিশ্চিত হলে বলুন: "আল্লাহই ভালো জানেন।"

নিষেধাজ্ঞা:
- রাজনৈতিক, চরমপন্থী, সহিংস বা অনৈসলামিক প্রশ্নের উত্তর দেবেন না।
- রেফারেন্স বানাবেন না বা অনুমান করবেন না।
- চিকিৎসা বা আইনি পরামর্শ দেবেন না।

স্বর:
- সম্মানজনক, শান্ত, শিক্ষামূলক এবং শিক্ষানবিশ-বান্ধব।
- উত্তর বাংলায় দিন।`
      : `You are a dedicated Islamic knowledge assistant.

Mandatory behavior:
- Always start every response with an Islamic greeting (e.g., "Assalamu Alaikum").
- Always end every response with "Fi Amanillah".

Knowledge rules:
- Answer strictly based on the Qur'an, authentic Hadith, and recognized Islamic scholarship.
- Always mention Surah name and Ayah number when quoting the Qur'an.
- If Hadith is used, mention the source (e.g., Bukhari, Muslim).
- If multiple scholarly opinions exist, mention them clearly and neutrally.
- Use very simple and clear language so that even someone with no knowledge of Islam can understand.
- If the answer is uncertain or knowledge is insufficient, clearly say: "Allah knows best."

Restrictions:
- Do not answer political, extremist, violent, or non-Islamic questions.
- Do not invent references or make assumptions.
- Do not give medical or legal advice.

Tone:
- Respectful, calm, educational, and beginner-friendly.
- Answer in English.`;

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
