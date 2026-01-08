import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Printer, Loader2, Tag } from "lucide-react";
import { Language } from "@/types/language";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
      toast.error("মাসআলা লোড করা যায়নি");
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
            ফিরে যান
          </Button>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2 font-bengali">
              মাসআলা পাওয়া যায়নি
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
            <span className="font-bengali">ফিরে যান</span>
          </Button>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handlePrint} title="প্রিন্ট">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} title="শেয়ার">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-bengali leading-relaxed mb-4 text-center">
            {masail.title}
          </h1>

          {/* Category Badge */}
          {masail.category && (
            <div className="flex justify-center mb-8">
              <Badge variant="secondary" className="font-bengali text-sm px-3 py-1">
                <Tag className="h-3.5 w-3.5 mr-1.5" />
                {masail.category}
              </Badge>
            </div>
          )}

          {/* Question Section */}
          {masail.question && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-3 font-bengali bg-primary/10 inline-block px-3 py-1 rounded">
                প্রশ্ন:
              </h2>
              <div className="font-bengali text-foreground leading-[1.9] text-[17px] mt-3">
                {formatText(masail.question)}
              </div>
            </div>
          )}

          {/* Answer Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-3 font-bengali bg-primary/10 inline-block px-3 py-1 rounded">
              উত্তর:
            </h2>
            <div className="font-bengali text-foreground leading-[1.9] text-[17px] text-justify mt-3">
              {formatText(masail.answer)}
            </div>
          </div>

          {/* Author Section */}
          {masail.author && (
            <div className="mt-10 pt-6 border-t border-border">
              <h3 className="text-base font-bold text-foreground font-bengali bg-primary/20 inline-block px-3 py-1.5 rounded mb-2">
                লেখক/বক্তা:
              </h3>
              <p className="font-bengali text-foreground text-lg mt-2">
                {masail.author}
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
  );
};

export default MasailDetail;
