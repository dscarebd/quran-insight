import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { ScrollText, User, ChevronRight, ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";


interface StoriesListProps {
  language: Language;
}

const StoriesList = ({ language }: StoriesListProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const CATEGORIES = [
    { id: "all", labelEn: "All", labelBn: "সকল" },
    ...dbCategories.map((c) => ({ id: c.slug, labelEn: c.name_english, labelBn: c.name_bengali })),
  ];

  const getCategoryLabel = (categoryId: string) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return categoryId;
    return language === "bn" ? cat.labelBn : cat.labelEn;
  };

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

  // All stories use the same horizontal card layout

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

        {/* Category Filter - Dropdown on mobile, pills on sm+ */}
        <div className="relative sm:hidden flex justify-center mb-8">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground shadow-sm",
              language === "bn" && "font-bengali"
            )}
          >
            {getCategoryLabel(activeCategory === "all" ? "all" : activeCategory) || (language === "bn" ? "সকল" : "All")}
            <ChevronDown className={cn("h-4 w-4 transition-transform", dropdownOpen && "rotate-180")} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setDropdownOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg",
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent",
                    language === "bn" && "font-bengali"
                  )}
                >
                  {language === "bn" ? cat.labelBn : cat.labelEn}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide justify-center">
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
          <div className="space-y-4">
            {/* All stories in horizontal card layout */}
            {filtered.map((story) => {
              const title = language === "bn" ? story.title_bengali : story.title_english;
              const content = language === "bn" ? story.content_bengali : story.content_english;
              return (
                <button
                  key={story.id}
                  onClick={() => navigate(`/stories/${story.id}`)}
                  className="w-full text-left group"
                >
                  <div className="overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 flex flex-row">
                    {/* Cover Image: full width on mobile, 1:1 square on sm+ */}
                    <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 overflow-hidden">
                      {story.cover_image_url ? (
                        <img
                          src={story.cover_image_url}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                          <ScrollText className="h-8 w-8 text-primary/40" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center min-w-0">
                      <Badge variant="outline" className={cn("w-fit mb-1.5 text-[10px] sm:text-xs hidden sm:inline-flex", language === "bn" && "font-bengali")}>
                        {getCategoryLabel(story.category)}
                      </Badge>
                      <h3 className={cn(
                        "font-bold text-sm sm:text-base md:text-lg text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-snug",
                        language === "bn" && "font-bengali"
                      )}>
                        {title}
                      </h3>
                      <p className={cn(
                        "text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2",
                        language === "bn" && "font-bengali"
                      )}>
                        {content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-3 text-muted-foreground text-[10px] sm:text-xs">
                        {story.author && (
                          <span className={cn("flex items-center gap-1", language === "bn" && "font-bengali")}>
                            <User className="h-3 w-3" />
                            {story.author}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center pr-4">
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesList;
