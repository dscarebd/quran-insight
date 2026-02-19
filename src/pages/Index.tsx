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
            {/* Courses floating card */}
            {(coursesLoading || hasCourses) && (
              <div className="mt-6 animate-fade-in">
                {coursesLoading ? (
                  <Skeleton className="h-[72px] w-full rounded-xl" />
                ) : (() => {
                  // Pick the first in-progress course, else first course
                  const activeCourse = courses!.find((c) => {
                    const { completed } = getCourseProg(c.id);
                    return completed > 0 && !hasCert(c.id);
                  }) || courses![0];
                  if (!activeCourse) return null;
                  const { completed } = getCourseProg(activeCourse.id);
                  const total = activeCourse.total_lessons;
                  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                  const certified = hasCert(activeCourse.id);

                  return (
                    <button
                      onClick={() => navigate(`/courses/${activeCourse.id}`)}
                      className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-elevated hover:-translate-y-1"
                    >
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300">
                        {certified ? (
                          <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                        ) : (
                          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                      </div>

                      <div className="flex-1 text-left min-w-0 overflow-hidden">
                        <p className={cn("text-xs font-medium text-muted-foreground truncate uppercase tracking-wide", language === "bn" && "font-bengali normal-case tracking-normal")}>
                          {certified
                            ? (language === "bn" ? "সার্টিফিকেট দেখুন" : "View Certificate")
                            : completed > 0
                              ? (language === "bn" ? "শিখতে থাকুন" : "Continue Learning")
                              : (language === "bn" ? "এখনই শুরু করুন" : "Start Learning")}
                        </p>
                        <p className={cn("font-semibold text-foreground truncate text-sm sm:text-base leading-tight", language === "bn" && "font-bengali")}>
                          {language === "bn" ? activeCourse.title_bengali : activeCourse.title_english}
                        </p>
                        {!certified && (
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={percent} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0 font-medium">{completed}/{total}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-all duration-300">
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    </button>
                  );
                })()}
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
