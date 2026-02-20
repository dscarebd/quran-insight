import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { ScrollText, Clock, User, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface StoriesListProps {
  language: Language;
}

const CATEGORIES = [
  { id: "all", labelEn: "All", labelBn: "সকল" },
  { id: "prophets", labelEn: "Prophets", labelBn: "নবীদের কাহিনী" },
  { id: "tafsir", labelEn: "Tafsir", labelBn: "তাফসীর" },
  { id: "history", labelEn: "History", labelBn: "ইতিহাস" },
  { id: "moral", labelEn: "Moral", labelBn: "শিক্ষামূলক" },
  { id: "general", labelEn: "General", labelBn: "সাধারণ" },
];

const getCategoryLabel = (categoryId: string, language: Language) => {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return categoryId;
  return language === "bn" ? cat.labelBn : cat.labelEn;
};

const StoriesList = ({ language }: StoriesListProps) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    if (activeCategory === "all") return stories;
    return stories.filter((s) => s.category === activeCategory);
  }, [stories, activeCategory]);

  // Featured story is the first one
  const featured = filtered.length > 0 ? filtered[0] : null;
  const rest = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <div className="flex-1 overflow-y-auto max-w-full">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "ইসলামিক গল্প সমূহ" : "Islamic Stories"}
          </h1>
          <p className={cn(
            "text-muted-foreground text-sm sm:text-base",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn"
              ? "নবীদের কাহিনী, ইতিহাস এবং শিক্ষামূলক গল্প"
              : "Stories of prophets, history, and moral lessons"}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-muted-foreground border-border hover:bg-accent",
                language === "bn" && "font-bengali"
              )}
            >
              {language === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Stories */}
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <ScrollText className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className={cn(
              "text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "কোনো গল্প পাওয়া যায়নি" : "No stories found"}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured / Hero Post */}
            {featured && (
              <button
                onClick={() => navigate(`/stories/${featured.id}`)}
                className="w-full text-left group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                  {featured.cover_image_url ? (
                    <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                      <img
                        src={featured.cover_image_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {getCategoryLabel(featured.category, language)}
                        </Badge>
                        <h2 className={cn(
                          "text-xl sm:text-2xl font-bold text-white leading-tight mb-2",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === "bn" ? featured.title_bengali : featured.title_english}
                        </h2>
                        <p className={cn(
                          "text-white/80 text-sm line-clamp-2",
                          language === "bn" && "font-bengali"
                        )}>
                          {(language === "bn" ? featured.content_bengali : featured.content_english).substring(0, 180)}...
                        </p>
                        <div className="flex items-center gap-3 mt-3 text-white/60 text-xs">
                          {featured.author && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {featured.author}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(featured.created_at), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 sm:p-6">
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {getCategoryLabel(featured.category, language)}
                      </Badge>
                      <h2 className={cn(
                        "text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors",
                        language === "bn" && "font-bengali"
                      )}>
                        {language === "bn" ? featured.title_bengali : featured.title_english}
                      </h2>
                      <p className={cn(
                        "text-muted-foreground text-sm line-clamp-3 mb-3",
                        language === "bn" && "font-bengali"
                      )}>
                        {(language === "bn" ? featured.content_bengali : featured.content_english).substring(0, 250)}...
                      </p>
                      <div className="flex items-center gap-3 text-muted-foreground text-xs">
                        {featured.author && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {featured.author}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(featured.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            )}

            {/* Grid of remaining posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => navigate(`/stories/${story.id}`)}
                    className="w-full text-left group"
                  >
                    <div className="h-full overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 flex flex-col">
                      {story.cover_image_url ? (
                        <div className="relative h-36 sm:h-40 overflow-hidden">
                          <img
                            src={story.cover_image_url}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-28 bg-gradient-to-br from-rose-500/10 to-pink-600/10 flex items-center justify-center">
                          <ScrollText className="h-8 w-8 text-rose-500/50" />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col">
                        <Badge variant="outline" className="w-fit mb-2 text-xs">
                          {getCategoryLabel(story.category, language)}
                        </Badge>
                        <h3 className={cn(
                          "font-semibold text-sm sm:text-base text-foreground line-clamp-2 mb-1.5 group-hover:text-primary transition-colors",
                          language === "bn" && "font-bengali"
                        )}>
                          {language === "bn" ? story.title_bengali : story.title_english}
                        </h3>
                        <p className={cn(
                          "text-xs text-muted-foreground line-clamp-2 flex-1",
                          language === "bn" && "font-bengali"
                        )}>
                          {(language === "bn" ? story.content_bengali : story.content_english).substring(0, 120)}...
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            {story.author && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {story.author}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(new Date(story.created_at), "MMM d")}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesList;
