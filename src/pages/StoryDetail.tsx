import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { ArrowLeft, ScrollText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryDetailProps {
  language: Language;
}

const StoryDetail = ({ language }: StoryDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
        <ScrollText className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-muted-foreground">Story not found</p>
        <Button variant="outline" onClick={() => navigate("/stories")}>
          Go Back
        </Button>
      </div>
    );
  }

  const title = language === "bn" ? story.title_bengali : story.title_english;
  const content = language === "bn" ? story.content_bengali : story.content_english;

  return (
    <div className="flex-1 overflow-y-auto max-w-full">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/stories")}
          className={cn("mb-4 -ml-2", language === "bn" && "font-bengali")}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          {language === "bn" ? "ফিরে যান" : "Back"}
        </Button>

        {/* Cover Image */}
        {story.cover_image_url && (
          <img
            src={story.cover_image_url}
            alt=""
            className="w-full max-h-64 object-cover rounded-xl mb-6"
          />
        )}

        {/* Title */}
        <h1 className={cn(
          "text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2",
          language === "bn" && "font-bengali"
        )}>
          {title}
        </h1>

        {/* Author */}
        {story.author && (
          <p className={cn(
            "text-sm text-primary mb-6",
            language === "bn" && "font-bengali"
          )}>
            {story.author}
          </p>
        )}

        {/* Content */}
        <div className={cn(
          "prose prose-sm sm:prose-base max-w-none text-foreground leading-relaxed whitespace-pre-wrap",
          language === "bn" && "font-bengali"
        )}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
