import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { ArrowLeft, ScrollText, Loader2, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

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

  const { data: dbCategories = [] } = useQuery({
    queryKey: ["story-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("story_categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
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
  const catEntry = dbCategories.find((c) => c.slug === story.category);
  const catLabel = catEntry ? { en: catEntry.name_english, bn: catEntry.name_bengali } : null;

  return (
    <div className="flex-1 overflow-y-auto max-w-full">
      {/* Hero Cover */}
      {story.cover_image_url && (
        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
          <img
            src={story.cover_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/stories")}
              className={cn("shadow-md", language === "bn" && "font-bengali")}
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              {language === "bn" ? "ফিরে যান" : "Back"}
            </Button>
          </div>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Back button if no cover */}
        {!story.cover_image_url && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/stories")}
            className={cn("mb-6 -ml-2", language === "bn" && "font-bengali")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            {language === "bn" ? "ফিরে যান" : "Back"}
          </Button>
        )}

        {/* Category Badge */}
        {catLabel && (
          <Badge variant="secondary" className={cn("mb-4", language === "bn" && "font-bengali")}>
            {language === "bn" ? catLabel.bn : catLabel.en}
          </Badge>
        )}

        {/* Title */}
        <h1 className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4",
          language === "bn" && "font-bengali"
        )}>
          {title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          {story.author && (
            <span className={cn("flex items-center gap-1.5", language === "bn" && "font-bengali")}>
              <User className="h-4 w-4" />
              {story.author}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {format(new Date(story.created_at), "MMMM d, yyyy")}
          </span>
        </div>

        <Separator className="mb-8" />

        {/* Content */}
        <div className={cn(
          "prose prose-sm sm:prose-base max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap",
          "prose-headings:text-foreground prose-p:text-foreground/90",
          language === "bn" && "font-bengali text-base sm:text-lg leading-loose"
        )}>
          {content}
        </div>

        {/* Footer nav */}
        <Separator className="mt-10 mb-6" />
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/stories")}
            className={cn(language === "bn" && "font-bengali")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            {language === "bn" ? "সকল গল্প দেখুন" : "View All Stories"}
          </Button>
        </div>
      </article>
    </div>
  );
};

export default StoryDetail;
