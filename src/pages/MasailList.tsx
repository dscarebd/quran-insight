import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Search, Loader2, ChevronRight, User, Filter } from "lucide-react";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Categories matching admin panel
const MASAIL_CATEGORIES = [
  { value: "all", label: "সকল বিভাগ", labelEn: "All Categories" },
  { value: "ঈমান ও আকীদা", label: "ঈমান ও আকীদা", labelEn: "Faith & Creed" },
  { value: "তাহারাত ও পবিত্রতা", label: "তাহারাত ও পবিত্রতা", labelEn: "Purification" },
  { value: "নামায", label: "নামায", labelEn: "Prayer" },
  { value: "রোযা", label: "রোযা", labelEn: "Fasting" },
  { value: "যাকাত", label: "যাকাত", labelEn: "Zakat" },
  { value: "হজ্জ ও উমরাহ", label: "হজ্জ ও উমরাহ", labelEn: "Hajj & Umrah" },
  { value: "কুরআন ও তিলাওয়াত", label: "কুরআন ও তিলাওয়াত", labelEn: "Quran & Recitation" },
  { value: "দোয়া ও যিকির", label: "দোয়া ও যিকির", labelEn: "Dua & Dhikr" },
  { value: "বিবাহ ও পরিবার", label: "বিবাহ ও পরিবার", labelEn: "Marriage & Family" },
  { value: "তালাক ও ইদ্দত", label: "তালাক ও ইদ্দত", labelEn: "Divorce & Iddah" },
  { value: "ব্যবসা ও লেনদেন", label: "ব্যবসা ও লেনদেন", labelEn: "Business & Trade" },
  { value: "হালাল ও হারাম", label: "হালাল ও হারাম", labelEn: "Halal & Haram" },
  { value: "পোশাক ও পর্দা", label: "পোশাক ও পর্দা", labelEn: "Clothing & Hijab" },
  { value: "জানাযা ও কবর", label: "জানাযা ও কবর", labelEn: "Funeral & Burial" },
  { value: "কুরবানী ও আকীকা", label: "কুরবানী ও আকীকা", labelEn: "Sacrifice & Aqiqah" },
  { value: "সামাজিক বিষয়", label: "সামাজিক বিষয়", labelEn: "Social Issues" },
  { value: "বিবিধ", label: "বিবিধ", labelEn: "Miscellaneous" },
];

interface MasailListProps {
  language: Language;
}

interface Masail {
  id: string;
  title: string;
  question: string | null;
  answer: string;
  author: string | null;
  category: string | null;
  created_at: string;
}

const MasailList = ({ language }: MasailListProps) => {
  const navigate = useNavigate();
  const [masailList, setMasailList] = useState<Masail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchMasail();
  }, []);

  const fetchMasail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('masail')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching masail:', error);
    } else {
      setMasailList(data || []);
    }
    setLoading(false);
  };

  const filteredMasail = masailList.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.question && m.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.author && m.author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || m.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Extract a preview from the answer
  const getPreview = (text: string, maxLength: number = 120) => {
    const cleaned = text.replace(/[#*_\n]+/g, ' ').trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className={cn(
              "text-2xl font-bold text-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "মাসআলা" : "Masail"}
            </h1>
            <p className={cn(
              "text-sm text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ইসলামিক মাসআলা ও ফতোয়া" : "Islamic Rulings & Fatwas"}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={language === "bn" ? "মাসআলা খুঁজুন..." : "Search masail..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 h-12 text-base",
                language === "bn" && "font-bengali"
              )}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className={cn(
              "w-full sm:w-[200px] h-12",
              language === "bn" && "font-bengali"
            )}>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={language === "bn" ? "বিভাগ" : "Category"} />
            </SelectTrigger>
            <SelectContent>
              {MASAIL_CATEGORIES.map((cat) => (
                <SelectItem 
                  key={cat.value} 
                  value={cat.value}
                  className={cn(language === "bn" && "font-bengali")}
                >
                  {language === "bn" ? cat.label : cat.labelEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        {!loading && (
          <p className={cn(
            "text-sm text-muted-foreground mb-4",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? `${filteredMasail.length}টি মাসআলা পাওয়া গেছে`
              : `${filteredMasail.length} masail found`
            }
          </p>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredMasail.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
            <Scale className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h2 className={cn(
              "text-xl font-semibold text-foreground mb-2",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "কোন মাসআলা পাওয়া যায়নি" : "No masail found"}
            </h2>
            <p className={cn(
              "text-muted-foreground max-w-md",
              language === "bn" && "font-bengali"
            )}>
              {searchQuery 
                ? (language === "bn" ? "অন্য কিছু দিয়ে খুঁজুন" : "Try a different search term")
                : (language === "bn" ? "মাসআলা শীঘ্রই যোগ করা হবে" : "Masail will be added soon")
              }
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-3 pb-6">
              {filteredMasail.map((masail) => (
                <button
                  key={masail.id}
                  onClick={() => navigate(`/masail/${masail.id}`)}
                  className="w-full text-left rounded-xl border border-border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-md hover:-translate-y-0.5 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        "font-semibold text-foreground mb-1 line-clamp-2",
                        "font-bengali text-base leading-relaxed"
                      )}>
                        {masail.title}
                      </h3>
                      
                      {/* Author */}
                      {masail.author && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-bengali line-clamp-1">
                            {masail.author}
                          </span>
                        </div>
                      )}
                      
                      {/* Preview */}
                      <p className={cn(
                        "text-sm text-muted-foreground line-clamp-2",
                        "font-bengali leading-relaxed"
                      )}>
                        {getPreview(masail.answer)}
                      </p>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default MasailList;
