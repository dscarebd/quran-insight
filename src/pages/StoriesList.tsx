import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";
import { ScrollText, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="flex-1 overflow-y-auto max-w-full">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md">
            <ScrollText className="h-5 w-5" />
          </div>
          <h1 className={cn(
            "text-xl sm:text-2xl font-bold text-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "গল্প সমূহ" : "Stories"}
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
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

        {/* Stories List */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
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
          <div className="space-y-3">
            {filtered.map((story) => (
              <button
                key={story.id}
                onClick={() => navigate(`/stories/${story.id}`)}
                className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-xl transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 text-left group"
              >
                {story.cover_image_url ? (
                  <img
                    src={story.cover_image_url}
                    alt=""
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-600/20 flex items-center justify-center shrink-0">
                    <ScrollText className="h-6 w-6 text-rose-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-semibold text-sm sm:text-base text-foreground line-clamp-1",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? story.title_bengali : story.title_english}
                  </h3>
                  <p className={cn(
                    "text-xs text-muted-foreground line-clamp-2 mt-0.5",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn"
                      ? story.content_bengali.substring(0, 120)
                      : story.content_english.substring(0, 120)}
                    {((language === "bn" ? story.content_bengali : story.content_english).length > 120) && "..."}
                  </p>
                  {story.author && (
                    <p className={cn(
                      "text-xs text-primary mt-1",
                      language === "bn" && "font-bengali"
                    )}>
                      {story.author}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesList;
