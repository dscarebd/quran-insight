import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Award, ChevronRight } from "lucide-react";
import { DesktopHeroSearch } from "@/components/desktop/DesktopHeroSearch";
import { QuickAccessCards } from "@/components/desktop/QuickAccessCards";
import { DesktopDailyContent } from "@/components/desktop/DesktopDailyContent";
import { AISearchResults } from "@/components/AISearchResults";
import { useAISearch } from "@/hooks/useAISearch";
import { useToast } from "@/hooks/use-toast";
import { useLmsCourses, useLmsProgress, useLmsCertificates } from "@/hooks/useLmsCourses";
import { Language } from "@/types/language";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface IndexProps {
  language: Language;
}

const Index = ({ language }: IndexProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { search, clear, isLoading, error, response, isOnline } = useAISearch();
  const { toast } = useToast();
  const { data: courses, isLoading: coursesLoading } = useLmsCourses();
  const { data: allProgress } = useLmsProgress(null);
  const { data: certificates } = useLmsCertificates(null);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    clear();
  }, [clear]);

  useEffect(() => {
    const handleClearSearch = () => clearSearch();
    window.addEventListener("clear-home-search", handleClearSearch);
    return () => window.removeEventListener("clear-home-search", handleClearSearch);
  }, [clearSearch]);

  useEffect(() => {
    if (error) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast, language]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await search(query, language);
  };

  const getCourseProg = (courseId: string) => {
    if (!allProgress) return { completed: 0 };
    const courseProg = (allProgress as any[]).filter((p) => p.course_id === courseId && p.is_completed);
    return { completed: courseProg.length };
  };

  const hasCert = (courseId: string) =>
    certificates?.some((c) => c.course_id === courseId) || false;

  const hasCourses = !coursesLoading && courses && courses.length > 0;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden max-w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 overflow-hidden">
        {/* Hero Search Section */}
        <DesktopHeroSearch
          language={language}
          onSearch={handleSearch}
          isLoading={isLoading}
          hasResults={!!searchQuery}
          onClear={clearSearch}
          isOnline={isOnline}
        />

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-6 sm:mt-8">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <div className="grid gap-3">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>
            ) : response ? (
              <AISearchResults response={response} language={language} />
            ) : null}
          </div>
        )}

        {!searchQuery && (
          <>
            {/* Courses Section */}
            {(coursesLoading || hasCourses) && (
              <div className="mt-8 sm:mt-10">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className={cn(
                    "text-lg sm:text-xl font-semibold text-foreground",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? "কোর্সসমূহ" : "Courses"}
                  </h2>
                  <button
                    onClick={() => navigate("/courses")}
                    className={cn(
                      "flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium",
                      language === "bn" && "font-bengali"
                    )}
                  >
                    {language === "bn" ? "সব দেখুন" : "View all"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {coursesLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-64 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {courses!.map((course) => {
                      const { completed } = getCourseProg(course.id);
                      const total = course.total_lessons;
                      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                      const certified = hasCert(course.id);

                      return (
                        <button
                          key={course.id}
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                        >
                          {/* Thumbnail */}
                          {course.thumbnail_url ? (
                            <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
                              <img
                                src={course.thumbnail_url}
                                alt={language === "bn" ? course.title_bengali : course.title_english}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video rounded-lg mb-3 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <GraduationCap className="h-10 w-10 text-primary/40" />
                            </div>
                          )}

                          {/* Completed Badge */}
                          {certified && (
                            <div className="absolute top-6 right-6 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                              <Award className="h-3 w-3" />
                              {language === "bn" ? "সম্পন্ন" : "Completed"}
                            </div>
                          )}

                          <h3 className={cn("font-semibold text-foreground mb-1", language === "bn" && "font-bengali")}>
                            {language === "bn" ? course.title_bengali : course.title_english}
                          </h3>
                          <p className={cn("text-sm text-muted-foreground line-clamp-2 mb-3", language === "bn" && "font-bengali")}>
                            {language === "bn" ? course.description_bengali : course.description_english}
                          </p>

                          {/* Progress */}
                          <div className="flex items-center gap-2">
                            <Progress value={percent} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0">
                              {completed}/{total}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quick Access Cards */}
            <div className="mt-8 sm:mt-10">
              <h2 className={cn(
                "mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "দ্রুত প্রবেশ" : "Quick Access"}
              </h2>
              <QuickAccessCards language={language} />
            </div>

            {/* Daily Content */}
            <div className="mt-8 sm:mt-10">
              <h2 className={cn(
                "mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "আজকের আয়াত, দোয়া ও হাদিস" : "Today's Verse, Dua & Hadith"}
              </h2>
              <DesktopDailyContent language={language} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
