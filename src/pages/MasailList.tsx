import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Scale, Search, Loader2, ChevronRight, User, Tag, ArrowLeft, Share2, Printer } from "lucide-react";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

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
  source_url: string | null;
  created_at: string;
}

const MasailList = ({ language }: MasailListProps) => {
  const navigate = useNavigate();
  const { id: selectedId } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  
  const [masailList, setMasailList] = useState<Masail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedMasail, setSelectedMasail] = useState<Masail | null>(null);

  useEffect(() => {
    fetchMasail();
  }, []);

  // Load selected masail when ID changes (for desktop direct linking)
  useEffect(() => {
    if (selectedId && masailList.length > 0) {
      const found = masailList.find(m => m.id === selectedId);
      if (found) {
        setSelectedMasail(found);
      }
    }
  }, [selectedId, masailList]);

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
      // Extract unique categories from data
      const uniqueCategories = [...new Set(
        (data || [])
          .map(m => m.category)
          .filter((c): c is string => c !== null && c.trim() !== '')
      )].sort();
      setCategories(uniqueCategories);
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

  const handleMasailClick = (masail: Masail) => {
    if (isMobile) {
      navigate(`/masail/${masail.id}`);
    } else {
      setSelectedMasail(masail);
      // Update URL without navigation
      window.history.replaceState(null, '', `/masail/${masail.id}`);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = selectedMasail?.title || "Islamic Masail";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("লিংক কপি করা হয়েছে");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Format text with proper paragraphs
  const formatText = (text: string) => {
    return text
      .split('\n')
      .filter(line => line.trim())
      .map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0 leading-[1.9]">
          {paragraph.replace(/^[-*•]\s*/, '').trim()}
        </p>
      ));
  };

  // Mobile Layout - Original
  if (isMobile) {
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

          {/* Search */}
          <div className="relative mb-4">
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

          {/* Category Pills */}
          <ScrollArea className="w-full mb-4">
            <div className="flex gap-2 pb-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={cn("shrink-0 font-bengali")}
              >
                {language === "bn" ? "সব" : "All"}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn("shrink-0 font-bengali whitespace-nowrap")}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </ScrollArea>

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
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-3 pb-6">
                {filteredMasail.map((masail) => (
                  <button
                    key={masail.id}
                    onClick={() => handleMasailClick(masail)}
                    className="w-full text-left rounded-xl border border-border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={cn(
                          "font-semibold text-foreground mb-1 line-clamp-2",
                          "font-bengali text-base leading-relaxed"
                        )}>
                          {masail.title}
                        </h3>
                        
                        {masail.category && (
                          <Badge variant="secondary" className="mb-2 font-bengali text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {masail.category}
                          </Badge>
                        )}
                        
                        {masail.author && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-bengali line-clamp-1">
                              {masail.author}
                            </span>
                          </div>
                        )}
                        
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
  }

  // Desktop/Tablet Layout - Sidebar with content
  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.3)]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 lg:w-96 shrink-0 bg-[hsl(155_30%_90%)] dark:bg-[hsl(155_20%_15%)] border-r border-border h-screen sticky top-0 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border/50">
            <div className="relative">
              <Input
                placeholder={language === "bn" ? "খুঁজুন..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "pr-10 h-10 bg-background",
                  language === "bn" && "font-bengali"
                )}
              />
              <Button 
                size="icon" 
                className="absolute right-0 top-0 h-10 w-10 rounded-l-none bg-primary hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-border/50">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors font-bengali",
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {language === "bn" ? "সব" : "All"}
            </button>
          </div>

          {/* Category List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg mb-1 transition-all font-bengali text-sm",
                    selectedCategory === cat
                      ? "bg-primary/20 text-primary font-medium border-l-4 border-primary"
                      : "hover:bg-muted/70 text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Masail List in Sidebar */}
          <div className="border-t border-border/50">
            <div className="p-3 bg-muted/30">
              <p className="text-xs text-muted-foreground font-bengali">
                {language === "bn" 
                  ? `${filteredMasail.length}টি মাসআলা`
                  : `${filteredMasail.length} masail`
                }
              </p>
            </div>
            <ScrollArea className="h-[40vh]">
              <div className="p-2 space-y-1">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredMasail.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground font-bengali text-sm">
                    {language === "bn" ? "কোন মাসআলা পাওয়া যায়নি" : "No masail found"}
                  </div>
                ) : (
                  filteredMasail.map((masail) => (
                    <button
                      key={masail.id}
                      onClick={() => handleMasailClick(masail)}
                      className={cn(
                        "w-full text-left px-3 py-3 rounded-lg transition-all font-bengali text-sm leading-relaxed",
                        selectedMasail?.id === masail.id
                          ? "bg-primary/15 text-primary border-l-4 border-primary"
                          : "hover:bg-muted/70 text-foreground"
                      )}
                    >
                      <span className="line-clamp-2">{masail.title}</span>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-screen">
          {selectedMasail ? (
            <div className="bg-[hsl(155_25%_92%)] dark:bg-background min-h-screen">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[hsl(155_25%_92%)]/95 dark:bg-background/95 backdrop-blur-md border-b border-border">
                <div className="px-6 lg:px-10 py-3 flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={handlePrint} title="প্রিন্ট">
                    <Printer className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleShare} title="শেয়ার">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-60px)]">
                <div className="px-6 lg:px-10 py-8 max-w-4xl">
                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-bengali leading-relaxed mb-4">
                    {selectedMasail.title}
                  </h1>

                  {/* Category Badge */}
                  {selectedMasail.category && (
                    <div className="mb-8">
                      <Badge variant="secondary" className="font-bengali text-sm px-3 py-1">
                        <Tag className="h-3.5 w-3.5 mr-1.5" />
                        {selectedMasail.category}
                      </Badge>
                    </div>
                  )}

                  {/* Question Section */}
                  {selectedMasail.question && (
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-foreground mb-3 font-bengali bg-primary/10 inline-block px-3 py-1 rounded">
                        প্রশ্ন:
                      </h2>
                      <div className="font-bengali text-foreground leading-[1.9] text-[17px] mt-3">
                        {formatText(selectedMasail.question)}
                      </div>
                    </div>
                  )}

                  {/* Answer Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-foreground mb-3 font-bengali bg-primary/10 inline-block px-3 py-1 rounded">
                      উত্তর:
                    </h2>
                    <div className="font-bengali text-foreground leading-[1.9] text-[17px] text-justify mt-3">
                      {formatText(selectedMasail.answer)}
                    </div>
                  </div>

                  {/* Author Section */}
                  {selectedMasail.author && (
                    <div className="mt-10 pt-6 border-t border-border">
                      <h3 className="text-base font-bold text-foreground font-bengali bg-primary/20 inline-block px-3 py-1.5 rounded mb-2">
                        লেখক/বক্তা:
                      </h3>
                      <p className="font-bengali text-foreground text-lg mt-2">
                        {selectedMasail.author}
                      </p>
                    </div>
                  )}

                  {/* Decorative Divider */}
                  <div className="flex justify-center mt-10 mb-6">
                    <div className="w-24 h-0.5 bg-border" />
                  </div>
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen text-center p-8">
              <Scale className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-semibold text-muted-foreground font-bengali mb-2">
                {language === "bn" ? "একটি মাসআলা নির্বাচন করুন" : "Select a masail"}
              </h2>
              <p className="text-muted-foreground font-bengali text-sm">
                {language === "bn" 
                  ? "বাম পাশের তালিকা থেকে একটি মাসআলা নির্বাচন করুন"
                  : "Choose a masail from the list on the left"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasailList;
