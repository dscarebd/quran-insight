import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Scale, ArrowLeft, User, ExternalLink, Share2, Loader2 } from "lucide-react";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface MasailDetailProps {
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

const MasailDetail = ({ language }: MasailDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [masail, setMasail] = useState<Masail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchMasail(id);
    }
  }, [id]);

  const fetchMasail = async (masailId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('masail')
      .select('*')
      .eq('id', masailId)
      .single();

    if (error) {
      console.error('Error fetching masail:', error);
      toast.error(language === "bn" ? "মাসআলা লোড করা যায়নি" : "Failed to load masail");
    } else {
      setMasail(data);
    }
    setLoading(false);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = masail?.title || "Islamic Masail";
    
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
      toast.success(language === "bn" ? "লিংক কপি করা হয়েছে" : "Link copied");
    }
  };

  // Format text with proper paragraphs
  const formatText = (text: string) => {
    return text
      .split('\n')
      .filter(line => line.trim())
      .map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0 leading-relaxed">
          {paragraph.replace(/^[-*•]\s*/, '').trim()}
        </p>
      ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!masail) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/masail')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === "bn" ? "ফিরে যান" : "Back"}
          </Button>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
            <Scale className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h2 className={cn(
              "text-xl font-semibold text-foreground mb-2",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "মাসআলা পাওয়া যায়নি" : "Masail not found"}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/masail')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "ফিরে যান" : "Back"}
            </span>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            {masail.source_url && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(masail.source_url!, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {/* Title Card */}
          <div className="rounded-xl border border-border bg-card p-5 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shrink-0">
                <Scale className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold text-foreground font-bengali leading-relaxed">
                {masail.title}
              </h1>
            </div>
            
            {masail.author && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm font-bengali">{masail.author}</span>
              </div>
            )}
          </div>

          {/* Question Section */}
          {masail.question && (
            <div className="mb-6">
              <h2 className={cn(
                "text-lg font-semibold text-foreground mb-3 flex items-center gap-2",
                language === "bn" && "font-bengali"
              )}>
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                {language === "bn" ? "প্রশ্ন" : "Question"}
              </h2>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="font-bengali text-foreground leading-relaxed">
                  {formatText(masail.question)}
                </div>
              </div>
            </div>
          )}

          {/* Answer Section */}
          <div className="mb-6">
            <h2 className={cn(
              "text-lg font-semibold text-foreground mb-3 flex items-center gap-2",
              language === "bn" && "font-bengali"
            )}>
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              {language === "bn" ? "উত্তর" : "Answer"}
            </h2>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="font-bengali text-foreground leading-relaxed text-justify">
                {formatText(masail.answer)}
              </div>
            </div>
          </div>

          {/* Category Tag */}
          {masail.category && (
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bengali">
                {masail.category}
              </span>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MasailDetail;
