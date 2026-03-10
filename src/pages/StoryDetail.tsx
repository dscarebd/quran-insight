import { useParams, useNavigate } from "react-router-dom";
import { useRef, useCallback, useState, useEffect } from "react";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { ArrowLeft, ScrollText, Loader2, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useStoriesOffline } from "@/hooks/useStoriesOffline";
import { LocalStory } from "@/services/offlineDataService";

interface StoryDetailProps {
  language: Language;
}

const StoryDetail = ({ language }: StoryDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const [story, setStory] = useState<LocalStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { storiesList, categories: dbCategories, getStoryById } = useStoriesOffline();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getStoryById(id).then((s) => {
      setStory(s);
      setIsLoading(false);
    });
  }, [id, getStoryById]);

  const allPublished = storiesList.filter((s) => s.is_published);
  const currentIndex = allPublished.findIndex((s) => s.id === id);
  const prevStory = currentIndex > 0 ? allPublished[currentIndex - 1] : null;
  const nextStory = currentIndex < allPublished.length - 1 ? allPublished[currentIndex + 1] : null;

  const goToPrev = useCallback(() => {
    if (prevStory) navigate(`/stories/${prevStory.id}`);
  }, [prevStory, navigate]);

  const goToNext = useCallback(() => {
    if (nextStory) navigate(`/stories/${nextStory.id}`);
  }, [nextStory, navigate]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 80) return;
    if (diff > 0) goToPrev();
    else goToNext();
  }, [goToPrev, goToNext]);

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
    <div className="flex-1 overflow-y-auto max-w-full" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {story.cover_image_url && (
        <div className="relative w-full overflow-hidden md:hidden">
          <img src={story.cover_image_url} alt="" className="w-full h-auto object-contain" />
        </div>
      )}

      <article className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/stories")}
          className={cn("mb-4 -ml-2 w-fit hidden md:inline-flex", language === "bn" && "font-bengali")}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          {language === "bn" ? "ফিরে যান" : "Back"}
        </Button>

        {story.cover_image_url && (
          <div className="hidden md:flex gap-8 mb-8">
            <div className="flex-1 flex flex-col justify-center">
              {catLabel && (
                <Badge
                  variant="secondary"
                  className={cn("mb-3 w-fit cursor-pointer hover:bg-secondary/80 transition-colors", language === "bn" && "font-bengali")}
                  onClick={() => navigate(`/stories?category=${story.category}`)}
                >
                  {language === "bn" ? catLabel.bn : catLabel.en}
                </Badge>
              )}
              <h1 className={cn("text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight mb-4", language === "bn" && "font-bengali")}>
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
            <div className="shrink-0 w-80 lg:w-96 overflow-hidden rounded-xl">
              <img src={story.cover_image_url} alt="" className="w-full h-auto object-contain rounded-xl" />
            </div>
          </div>
        )}

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
          <h1 className={cn("text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4", language === "bn" && "font-bengali")}>
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
            <h1 className={cn("text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4", language === "bn" && "font-bengali")}>
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

        <div className={cn(
          "w-full text-foreground/90 leading-relaxed whitespace-pre-wrap text-sm sm:text-base",
          language === "bn" && "font-bengali text-base sm:text-lg leading-loose"
        )}>
          {content}
          {(prevStory || nextStory) && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <Button variant="ghost" size="sm" onClick={goToPrev} disabled={!prevStory} className={cn("gap-1.5", language === "bn" && "font-bengali")}>
                <ChevronLeft className="h-4 w-4" />
                {language === "bn" ? "আগের গল্প" : "Previous"}
              </Button>
              <Button variant="ghost" size="sm" onClick={goToNext} disabled={!nextStory} className={cn("gap-1.5", language === "bn" && "font-bengali")}>
                {language === "bn" ? "পরের গল্প" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default StoryDetail;
