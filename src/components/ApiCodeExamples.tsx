import { useState } from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Language } from "@/types/language";
import { toast } from "sonner";

interface ApiCodeExamplesProps {
  language: Language;
  baseUrl: string;
}

const languages = [
  { id: "javascript", name: "JavaScript", icon: "JS" },
  { id: "python", name: "Python", icon: "PY" },
  { id: "curl", name: "cURL", icon: "SH" },
  { id: "php", name: "PHP", icon: "PHP" },
  { id: "go", name: "Go", icon: "GO" },
];

const getCodeExamples = (baseUrl: string) => ({
  javascript: {
    basic: `// Fetch all Surahs
const response = await fetch("${baseUrl}/surahs");
const data = await response.json();
console.log(data);`,
    filtered: `// Fetch verses of Surah Al-Fatiha
const response = await fetch("${baseUrl}/verses?surah=1");
const { data, meta } = await response.json();

data.forEach(verse => {
  console.log(\`\${verse.verse_number}: \${verse.bengali}\`);
});`,
    full: `// Complete example with error handling
async function fetchSurahs() {
  try {
    const response = await fetch("${baseUrl}/surahs");
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const { data, meta } = await response.json();
    console.log(\`Total Surahs: \${meta.total}\`);
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

fetchSurahs();`
  },
  python: {
    basic: `# Fetch all Surahs
import requests

response = requests.get("${baseUrl}/surahs")
data = response.json()
print(data)`,
    filtered: `# Fetch verses of Surah Al-Fatiha
import requests

response = requests.get(
    "${baseUrl}/verses",
    params={"surah": 1}
)
result = response.json()

for verse in result["data"]:
    print(f"{verse['verse_number']}: {verse['bengali']}")`,
    full: `# Complete example with error handling
import requests

def fetch_surahs():
    try:
        response = requests.get("${baseUrl}/surahs")
        response.raise_for_status()
        
        result = response.json()
        print(f"Total Surahs: {result['meta']['total']}")
        return result["data"]
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch: {e}")
        return None

surahs = fetch_surahs()
if surahs:
    for surah in surahs[:5]:
        print(f"{surah['number']}. {surah['name_english']}")`
  },
  curl: {
    basic: `# Fetch all Surahs
curl -X GET "${baseUrl}/surahs"`,
    filtered: `# Fetch verses of Surah Al-Fatiha
curl -X GET "${baseUrl}/verses?surah=1"`,
    full: `# Fetch hadiths from Bukhari with pagination
curl -X GET "${baseUrl}/hadiths?book=bukhari&limit=10&offset=0"

# Fetch all duas
curl -X GET "${baseUrl}/duas"

# Fetch duas by category
curl -X GET "${baseUrl}/duas?category=morning-evening"`
  },
  php: {
    basic: `<?php
// Fetch all Surahs
$response = file_get_contents("${baseUrl}/surahs");
$data = json_decode($response, true);
print_r($data);`,
    filtered: `<?php
// Fetch verses of Surah Al-Fatiha
$url = "${baseUrl}/verses?" . http_build_query([
    "surah" => 1
]);

$response = file_get_contents($url);
$result = json_decode($response, true);

foreach ($result["data"] as $verse) {
    echo $verse["verse_number"] . ": " . $verse["bengali"] . "\\n";
}`,
    full: `<?php
// Complete example with error handling
function fetchSurahs() {
    $url = "${baseUrl}/surahs";
    
    $context = stream_context_create([
        "http" => [
            "method" => "GET",
            "header" => "Accept: application/json"
        ]
    ]);
    
    $response = @file_get_contents($url, false, $context);
    
    if ($response === false) {
        throw new Exception("Failed to fetch data");
    }
    
    return json_decode($response, true);
}

try {
    $result = fetchSurahs();
    echo "Total Surahs: " . $result["meta"]["total"] . "\\n";
    
    foreach (array_slice($result["data"], 0, 5) as $surah) {
        echo $surah["number"] . ". " . $surah["name_english"] . "\\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}`
  },
  go: {
    basic: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    // Fetch all Surahs
    resp, err := http.Get("${baseUrl}/surahs")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
    filtered: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Verse struct {
    VerseNumber int    \`json:"verse_number"\`
    Bengali     string \`json:"bengali"\`
}

type Response struct {
    Data []Verse \`json:"data"\`
}

func main() {
    // Fetch verses of Surah Al-Fatiha
    resp, _ := http.Get("${baseUrl}/verses?surah=1")
    defer resp.Body.Close()
    
    var result Response
    json.NewDecoder(resp.Body).Decode(&result)
    
    for _, verse := range result.Data {
        fmt.Printf("%d: %s\\n", verse.VerseNumber, verse.Bengali)
    }
}`,
    full: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

type Surah struct {
    Number      int    \`json:"number"\`
    NameEnglish string \`json:"name_english"\`
    NameArabic  string \`json:"name_arabic"\`
}

type Meta struct {
    Total int \`json:"total"\`
}

type SurahResponse struct {
    Success bool    \`json:"success"\`
    Data    []Surah \`json:"data"\`
    Meta    Meta    \`json:"meta"\`
}

func fetchSurahs() (*SurahResponse, error) {
    resp, err := http.Get("${baseUrl}/surahs")
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var result SurahResponse
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }
    
    return &result, nil
}

func main() {
    result, err := fetchSurahs()
    if err != nil {
        log.Fatal("Failed to fetch:", err)
    }
    
    fmt.Printf("Total Surahs: %d\\n", result.Meta.Total)
    
    for _, surah := range result.Data[:5] {
        fmt.Printf("%d. %s (%s)\\n", 
            surah.Number, surah.NameEnglish, surah.NameArabic)
    }
}`
  }
});

const exampleTabs = [
  { id: "basic", labelEn: "Basic", labelBn: "সাধারণ" },
  { id: "filtered", labelEn: "With Filters", labelBn: "ফিল্টার সহ" },
  { id: "full", labelEn: "Full Example", labelBn: "সম্পূর্ণ উদাহরণ" },
];

const ApiCodeExamples = ({ language, baseUrl }: ApiCodeExamplesProps) => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [selectedExample, setSelectedExample] = useState("basic");
  const [copiedCode, setCopiedCode] = useState(false);

  const codeExamples = getCodeExamples(baseUrl);

  const copyCode = async () => {
    const code = codeExamples[selectedLang as keyof typeof codeExamples][selectedExample as keyof (typeof codeExamples)["javascript"]];
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast.success(language === "bn" ? "কোড কপি হয়েছে!" : "Code copied!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করা যায়নি" : "Failed to copy");
    }
  };

  const currentCode = codeExamples[selectedLang as keyof typeof codeExamples][selectedExample as keyof (typeof codeExamples)["javascript"]];

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("flex items-center gap-2", language === "bn" ? "font-bengali" : "font-sans")}>
          <Terminal className="h-5 w-5 text-primary" />
          {language === "bn" ? "কোড উদাহরণ" : "Code Examples"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Tabs */}
        <Tabs value={selectedLang} onValueChange={setSelectedLang}>
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            {languages.map((lang) => (
              <TabsTrigger
                key={lang.id}
                value={lang.id}
                className="gap-1.5 shrink-0"
              >
                <span className="text-xs font-bold opacity-60">{lang.icon}</span>
                <span className="hidden sm:inline">{lang.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Example Type Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {exampleTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={selectedExample === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedExample(tab.id)}
              className={cn("text-xs", language === "bn" ? "font-bengali" : "font-sans")}
            >
              {language === "bn" ? tab.labelBn : tab.labelEn}
            </Button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyCode}
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
          >
            {copiedCode ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto whitespace-pre-wrap max-h-80">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Usage Tips */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <Code2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <p className={cn("text-xs text-muted-foreground", language === "bn" ? "font-bengali" : "font-sans")}>
            {language === "bn"
              ? "এই API সম্পূর্ণ বিনামূল্যে এবং কোনো API key প্রয়োজন নেই। সরাসরি ব্যবহার করুন!"
              : "This API is completely free with no API key required. Use it directly in your projects!"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiCodeExamples;
