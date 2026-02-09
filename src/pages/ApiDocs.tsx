import { useState } from "react";
import { ArrowLeft, Copy, Check, Play, ChevronDown, Code, Database, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/types/language";
import { toast } from "sonner";

interface ApiDocsProps {
  language: Language;
}

const BASE_URL = "https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api";

const endpoints = [
  {
    name: "Surahs",
    nameBn: "সূরা সমূহ",
    path: "/surahs",
    description: "Get all 114 Surahs with metadata",
    descriptionBn: "সকল ১১৪ সূরার তথ্য",
    params: [],
    sampleResponse: {
      success: true,
      data: [
        {
          number: 1,
          name_arabic: "الفاتحة",
          name_english: "Al-Fatiha",
          name_bengali: "আল-ফাতিহা",
          meaning_english: "The Opening",
          meaning_bengali: "সূচনা",
          revelation_type: "meccan",
          total_verses: 7
        }
      ],
      meta: { total: 114, limit: 100, offset: 0 }
    }
  },
  {
    name: "Verses",
    nameBn: "আয়াত সমূহ",
    path: "/verses",
    description: "Get Quran verses with Arabic, Bengali, English translations and Tafsir",
    descriptionBn: "আরবি, বাংলা, ইংরেজি অনুবাদ ও তাফসির সহ কুরআনের আয়াত",
    params: [
      { name: "surah", type: "number", description: "Filter by surah number (1-114)", descriptionBn: "সূরা নম্বর দিয়ে ফিল্টার (১-১১৪)" },
      { name: "para", type: "number", description: "Filter by para/juz number (1-30)", descriptionBn: "পারা নম্বর দিয়ে ফিল্টার (১-৩০)" }
    ],
    sampleResponse: {
      success: true,
      data: [
        {
          surah_number: 1,
          verse_number: 1,
          arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          english: "In the name of Allah, the Most Gracious, the Most Merciful",
          bengali: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে",
          tafsir_bengali: "...",
          page_number: 1
        }
      ],
      meta: { total: 6236, limit: 100, offset: 0 }
    }
  },
  {
    name: "Hadiths",
    nameBn: "হাদিস সমূহ",
    path: "/hadiths",
    description: "Get Hadiths from various collections (Bukhari, Muslim, etc.)",
    descriptionBn: "বিভিন্ন সংকলন থেকে হাদিস (বুখারী, মুসলিম ইত্যাদি)",
    params: [
      { name: "book", type: "string", description: "Filter by book slug (bukhari, muslim, tirmidhi, etc.)", descriptionBn: "বইয়ের স্লাগ দিয়ে ফিল্টার" }
    ],
    sampleResponse: {
      success: true,
      data: [
        {
          hadith_number: 1,
          book_slug: "bukhari",
          chapter_number: 1,
          chapter_name_english: "Revelation",
          arabic: "...",
          english: "...",
          bengali: "...",
          narrator_english: "Umar bin Al-Khattab",
          grade: "Sahih"
        }
      ],
      meta: { total: 7563, limit: 100, offset: 0 }
    }
  },
  {
    name: "Hadith Books",
    nameBn: "হাদিস গ্রন্থ",
    path: "/hadith-books",
    description: "Get list of available Hadith collections",
    descriptionBn: "উপলব্ধ হাদিস সংকলনের তালিকা",
    params: [],
    sampleResponse: {
      success: true,
      data: [
        {
          slug: "bukhari",
          name_arabic: "صحيح البخاري",
          name_english: "Sahih al-Bukhari",
          name_bengali: "সহীহ বুখারী",
          total_hadiths: 7563
        }
      ],
      meta: { total: 10, limit: 100, offset: 0 }
    }
  },
  {
    name: "Duas",
    nameBn: "দোয়া সমূহ",
    path: "/duas",
    description: "Get Duas with Arabic, transliteration, and translations",
    descriptionBn: "আরবি, উচ্চারণ ও অনুবাদ সহ দোয়া",
    params: [
      { name: "category", type: "string", description: "Filter by category_id", descriptionBn: "ক্যাটাগরি আইডি দিয়ে ফিল্টার" }
    ],
    sampleResponse: {
      success: true,
      data: [
        {
          dua_id: "morning-1",
          category_id: "morning-evening",
          title_english: "Morning Supplication",
          title_bengali: "সকালের দোয়া",
          arabic: "...",
          transliteration: "...",
          english: "...",
          bengali: "...",
          reference: "Sahih Muslim"
        }
      ],
      meta: { total: 120, limit: 100, offset: 0 }
    }
  },
  {
    name: "Dua Categories",
    nameBn: "দোয়ার ক্যাটাগরি",
    path: "/dua-categories",
    description: "Get Dua categories for organization",
    descriptionBn: "দোয়ার শ্রেণীবিভাগ",
    params: [],
    sampleResponse: {
      success: true,
      data: [
        {
          category_id: "morning-evening",
          name_english: "Morning & Evening Dhikr",
          name_bengali: "সকাল-সন্ধ্যার যিকর",
          icon: "Sunrise",
          display_order: 1
        }
      ],
      meta: { total: 20, limit: 100, offset: 0 }
    }
  },
  {
    name: "Masail",
    nameBn: "মাসায়েল",
    path: "/masail",
    description: "Get Islamic rulings and fatwas",
    descriptionBn: "ইসলামিক মাসায়েল ও ফতোয়া",
    params: [],
    sampleResponse: {
      success: true,
      data: [
        {
          id: "uuid",
          title: "Ruling on...",
          question: "...",
          answer: "...",
          author: "Scholar Name",
          category: "Prayer"
        }
      ],
      meta: { total: 500, limit: 100, offset: 0 }
    }
  }
];

const stats = [
  { value: "6,236+", label: "Verses", labelBn: "আয়াত" },
  { value: "10,000+", label: "Hadiths", labelBn: "হাদিস" },
  { value: "120+", label: "Duas", labelBn: "দোয়া" },
  { value: "500+", label: "Masail", labelBn: "মাসায়েল" }
];

const ApiDocs = ({ language }: ApiDocsProps) => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [tryItResults, setTryItResults] = useState<Record<string, unknown>>({});
  const [loadingEndpoint, setLoadingEndpoint] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      toast.success(language === "bn" ? "কপি হয়েছে!" : "Copied!");
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করা যায়নি" : "Failed to copy");
    }
  };

  const tryEndpoint = async (path: string) => {
    setLoadingEndpoint(path);
    try {
      const response = await fetch(`${BASE_URL}${path}?limit=3`);
      const data = await response.json();
      setTryItResults(prev => ({ ...prev, [path]: data }));
    } catch {
      setTryItResults(prev => ({ ...prev, [path]: { error: "Failed to fetch" } }));
    }
    setLoadingEndpoint(null);
  };

  const quickStartCode = `// Fetch all Surahs
fetch("${BASE_URL}/surahs")
  .then(res => res.json())
  .then(data => console.log(data));

// Fetch verses of Surah Al-Fatiha
fetch("${BASE_URL}/verses?surah=1")
  .then(res => res.json())
  .then(data => console.log(data));`;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className={cn("text-lg font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
              {language === "bn" ? "API ডকুমেন্টেশন" : "API Documentation"}
            </h1>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Free
          </Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className={cn("text-2xl md:text-3xl", language === "bn" ? "font-bengali" : "font-sans")}>
              {language === "bn" ? "ইসলামিক ডাটা API" : "Islamic Data API"}
            </CardTitle>
            <CardDescription className={cn("text-base", language === "bn" ? "font-bengali" : "font-sans")}>
              {language === "bn" 
                ? "কুরআন, হাদিস, দোয়া এবং মাসায়েল - সব এক জায়গায়। আপনার অ্যাপে সহজেই ইন্টিগ্রেট করুন।"
                : "Quran, Hadith, Duas, and Masail - all in one place. Easily integrate into your apps."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" ? stat.labelBn : stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center gap-2", language === "bn" ? "font-bengali" : "font-sans")}>
              <Sparkles className="h-5 w-5 text-primary" />
              {language === "bn" ? "দ্রুত শুরু" : "Quick Start"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Base URL */}
            <div>
              <label className={cn("text-sm font-medium text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                Base URL
              </label>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 block p-3 rounded-lg bg-muted text-sm font-mono break-all">
                  {BASE_URL}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(BASE_URL, "baseUrl")}
                >
                  {copiedText === "baseUrl" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Code Example */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={cn("text-sm font-medium text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                  {language === "bn" ? "উদাহরণ কোড" : "Example Code"}
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(quickStartCode, "code")}
                  className="h-7 gap-1"
                >
                  {copiedText === "code" ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  {language === "bn" ? "কপি" : "Copy"}
                </Button>
              </div>
              <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                {quickStartCode}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="space-y-3">
          <h2 className={cn("text-xl font-semibold flex items-center gap-2", language === "bn" ? "font-bengali" : "font-sans")}>
            <Database className="h-5 w-5 text-primary" />
            {language === "bn" ? "এন্ডপয়েন্ট সমূহ" : "Endpoints"}
          </h2>

          {endpoints.map((endpoint) => (
            <Collapsible key={endpoint.path}>
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">GET</Badge>
                        <div className="text-left">
                          <CardTitle className={cn("text-base", language === "bn" ? "font-bengali" : "font-sans")}>
                            {language === "bn" ? endpoint.nameBn : endpoint.name}
                          </CardTitle>
                          <code className="text-xs text-muted-foreground font-mono">
                            {endpoint.path}
                          </code>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-4">
                    <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? endpoint.descriptionBn : endpoint.description}
                    </p>

                    {/* Parameters */}
                    {endpoint.params.length > 0 && (
                      <div>
                        <h4 className={cn("text-sm font-medium mb-2", language === "bn" ? "font-bengali" : "font-sans")}>
                          {language === "bn" ? "প্যারামিটার" : "Parameters"}
                        </h4>
                        <div className="space-y-2">
                          {endpoint.params.map((param) => (
                            <div key={param.name} className="flex items-start gap-2 text-sm">
                              <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">{param.name}</code>
                              <span className="text-xs text-muted-foreground">({param.type})</span>
                              <span className={cn("text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                                - {language === "bn" ? param.descriptionBn : param.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sample Response */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={cn("text-sm font-medium", language === "bn" ? "font-bengali" : "font-sans")}>
                          {language === "bn" ? "নমুনা রেসপন্স" : "Sample Response"}
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => tryEndpoint(endpoint.path)}
                          disabled={loadingEndpoint === endpoint.path}
                          className="h-7 gap-1"
                        >
                          <Play className="h-3 w-3" />
                          {loadingEndpoint === endpoint.path 
                            ? (language === "bn" ? "লোড হচ্ছে..." : "Loading...") 
                            : (language === "bn" ? "পরীক্ষা করুন" : "Try It")}
                        </Button>
                      </div>
                      <pre className="p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto max-h-48">
                        {JSON.stringify(
                          tryItResults[endpoint.path] || endpoint.sampleResponse,
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {/* Common Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center gap-2", language === "bn" ? "font-bengali" : "font-sans")}>
              <BookOpen className="h-5 w-5 text-primary" />
              {language === "bn" ? "সাধারণ প্যারামিটার" : "Common Parameters"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "limit", desc: "Number of results (default: 100, max: 1000)", descBn: "ফলাফলের সংখ্যা (ডিফল্ট: ১০০, সর্বোচ্চ: ১০০০)" },
                { name: "offset", desc: "Pagination offset (default: 0)", descBn: "পেজিনেশন অফসেট (ডিফল্ট: ০)" }
              ].map((param) => (
                <div key={param.name} className="flex items-start gap-2">
                  <code className="px-2 py-1 rounded bg-muted font-mono text-sm">{param.name}</code>
                  <span className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                    - {language === "bn" ? param.descBn : param.desc}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attribution */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <p className={cn("text-sm text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
                {language === "bn" 
                  ? "এই API ব্যবহার করলে অনুগ্রহ করে Quran Insight এর ক্রেডিট দিন"
                  : "Please credit Quran Insight when using this API"}
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                {language === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiDocs;
