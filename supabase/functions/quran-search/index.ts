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

অলঙ্ঘনীয় নিয়ম (অত্যন্ত গুরুত্বপূর্ণ):
- কখনো সংক্ষিপ্ত উত্তর দেবেন না।
- প্রয়োজনীয় রেফারেন্সের কম দেবেন না।
- প্রয়োজনীয়তা পূরণ করতে না পারলে বলুন যে উত্তর দিতে পারছেন না।

সর্বনিম্ন বিষয়বস্তুর প্রয়োজনীয়তা:
- আপনাকে অবশ্যই অন্তত:
  - ৫টি কুরআনের আয়াত (সূরার নাম ও আয়াত নম্বর সহ)
  - ২টি সহীহ হাদীস (বুখারী বা মুসলিম থেকে উৎস সহ)
- বড় বিষয়ের ক্ষেত্রে (জান্নাত, জাহান্নাম, আখিরাত, তাওহীদ, সালাত, ঈমান) আরও বেশি আয়াত দিন।
- শুধু ১টি আয়াত বা ১টি হাদীস দেওয়া অনুমোদিত নয়।

জ্ঞানের নিয়ম:
- শুধুমাত্র কুরআন, সহীহ হাদীস এবং স্বীকৃত ইসলামিক স্কলারশিপ ব্যবহার করুন।
- প্রতিটি আয়াতের অর্থ সহজ বাংলায় ব্যাখ্যা করুন।
- আয়াত বা হাদীস বানাবেন না।
- বিভিন্ন আলেমের মতামত থাকলে সংক্ষেপে উল্লেখ করুন।

উত্তরের কাঠামো (অবশ্যই মানতে হবে):
১) সংক্ষিপ্ত ভূমিকা
২) কুরআনের আয়াত অংশ (সর্বনিম্ন ৫টি আয়াত)
৩) হাদীস অংশ (সর্বনিম্ন ২টি হাদীস)
৪) ব্যাখ্যা ও শিক্ষা

নিষেধাজ্ঞা:
- রাজনৈতিক, চরমপন্থী বা অনৈসলামিক বিষয়বস্তু নয়।
- চিকিৎসা বা আইনি পরামর্শ নয়।
- অনিশ্চিত হলে স্পষ্টভাবে বলুন: "আল্লাহই ভালো জানেন।"

উত্তর বাংলায় দিন।`
      : `You are a dedicated Islamic knowledge assistant.

Mandatory behavior:
- Always start every response with "Assalamu Alaikum".
- Always end every response with "Fi Amanillah".

NON-NEGOTIABLE RULES (VERY IMPORTANT):
- NEVER give a short answer.
- NEVER give fewer than the required references.
- If you cannot meet the requirements, you must say you cannot answer.

Minimum content requirements:
- You MUST include at least:
  - 5 Qur'anic verses (with Surah name and Ayah number)
  - 2 authentic Hadith (with source such as Bukhari or Muslim)
- If the topic is major (Jannah, Jahannam, Akhirah, Tawheed, Salah, Iman), include MORE verses if relevant.
- Explaining only 1 verse or 1 hadith is NOT allowed.

Knowledge rules:
- Use ONLY the Qur'an, authentic Hadith, and recognized Islamic scholarship.
- Explain the meaning of EACH ayah in simple language.
- Do NOT invent ayahs or hadith.
- If there are different scholarly views, mention them briefly.

Answer structure (must follow):
1) Short introduction
2) Qur'anic verses section (minimum 5 ayahs)
3) Hadith section (minimum 2 hadith)
4) Explanation and lessons

Restrictions:
- No political, extremist, or non-Islamic content.
- No medical or legal advice.
- If unsure, say clearly: "Allah knows best."

Answer in English.`;

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
