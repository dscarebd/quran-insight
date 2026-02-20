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
      {/* Mobile: full-width image on top */}
      {story.cover_image_url && (
        <div className="relative w-full overflow-hidden md:hidden">
          <img
            src={story.cover_image_url}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <article className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Desktop: side-by-side layout - image left, meta right */}
        {story.cover_image_url && (
          <div className="hidden md:flex gap-8 mb-8">
            {/* Left: Cover Image */}
            <div className="shrink-0 w-80 lg:w-96 overflow-hidden rounded-xl">
              <img
                src={story.cover_image_url}
                alt=""
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Right: Meta info */}
            <div className="flex-1 flex flex-col justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/stories")}
                className={cn("mb-4 -ml-2 w-fit", language === "bn" && "font-bengali")}
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                {language === "bn" ? "ফিরে যান" : "Back"}
              </Button>

              {catLabel && (
                <Badge
                  variant="secondary"
                  className={cn("mb-3 w-fit cursor-pointer hover:bg-secondary/80 transition-colors", language === "bn" && "font-bengali")}
                  onClick={() => navigate(`/stories?category=${story.category}`)}
                >
                  {language === "bn" ? catLabel.bn : catLabel.en}
                </Badge>
              )}

              <h1 className={cn(
                "text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight mb-4",
                language === "bn" && "font-bengali"
              )}>
                {title}
              </h1>

              {story.author && (
                <span className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                  <User className="h-4 w-4" />
                  {story.author}
                </span>
              )}

              <span className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <Clock className="h-4 w-4" />
                {format(new Date(story.created_at), "MMMM d, yyyy")}
              </span>
            </div>
          </div>
        )}

        {/* Desktop: back button when no cover */}
        {!story.cover_image_url && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/stories")}
            className={cn("mb-6 -ml-2 hidden md:inline-flex", language === "bn" && "font-bengali")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            {language === "bn" ? "ফিরে যান" : "Back"}
          </Button>
        )}

        {/* Mobile-only meta (below image) */}
        <div className="md:hidden">
          {catLabel && (
            <Badge
              variant="secondary"
              className={cn("mb-4 cursor-pointer hover:bg-secondary/80 transition-colors", language === "bn" && "font-bengali")}
              onClick={() => navigate(`/stories?category=${story.category}`)}
            >
              {language === "bn" ? catLabel.bn : catLabel.en}
            </Badge>
          )}

          <h1 className={cn(
            "text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4",
            language === "bn" && "font-bengali"
          )}>
            {title}
          </h1>

          {story.author && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className={cn("flex items-center gap-1.5", language === "bn" && "font-bengali")}>
                <User className="h-4 w-4" />
                {story.author}
              </span>
            </div>
          )}
        </div>

        {/* Desktop: no-cover meta */}
        {!story.cover_image_url && (
          <div className="hidden md:block mb-6">
            {catLabel && (
              <Badge
                variant="secondary"
                className={cn("mb-4 cursor-pointer hover:bg-secondary/80 transition-colors", language === "bn" && "font-bengali")}
                onClick={() => navigate(`/stories?category=${story.category}`)}
              >
                {language === "bn" ? catLabel.bn : catLabel.en}
              </Badge>
            )}
            <h1 className={cn(
              "text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4",
              language === "bn" && "font-bengali"
            )}>
              {title}
            </h1>
            {story.author && (
              <span className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                <User className="h-4 w-4" />
                {story.author}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
              <Clock className="h-4 w-4" />
              {format(new Date(story.created_at), "MMMM d, yyyy")}
            </span>
          </div>
        )}

        <Separator className="mb-8" />

        {/* Content */}
        <div className={cn(
          "prose prose-sm sm:prose-base max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap",
          "prose-headings:text-foreground prose-p:text-foreground/90",
          language === "bn" && "font-bengali text-base sm:text-lg leading-loose"
        )}>
          {content}
        </div>
      </article>
    </div>
  );
};

export default StoryDetail;
