import { useNavigate } from "react-router-dom";
import { ChevronRight, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Language } from "@/types/language";

interface LmsContinueCourse {
  courseId: string;
  courseName: string;
  courseBn: string;
  completedLessons: number;
  totalLessons: number;
  hasCertificate: boolean;
}

interface ContinueReadingProps {
  language: Language;
  lmsContinueCourse?: LmsContinueCourse | null;
}

export const ContinueReading = ({ language, lmsContinueCourse }: ContinueReadingProps) => {
  const navigate = useNavigate();

  if (lmsContinueCourse) {
    const progress = lmsContinueCourse.totalLessons > 0
      ? Math.round((lmsContinueCourse.completedLessons / lmsContinueCourse.totalLessons) * 100)
      : 0;

    return (
      <div className="mt-6 animate-fade-in">
        <button
          onClick={() =>
            navigate(
              lmsContinueCourse.hasCertificate
                ? `/courses/${lmsContinueCourse.courseId}/certificate`
                : `/courses/${lmsContinueCourse.courseId}`
            )
          }
          className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-elevated hover:-translate-y-1"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {lmsContinueCourse.hasCertificate ? (
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </div>

          <div className="flex-1 text-left min-w-0 overflow-hidden">
            <p className={cn("text-sm sm:text-base text-muted-foreground truncate", language === "bn" && "font-bengali")}>
              {lmsContinueCourse.hasCertificate
                ? language === "bn" ? "সার্টিফিকেট দেখুন" : "View Certificate"
                : language === "bn" ? "শিখতে থাকুন" : "Continue Learning"}
            </p>
            <p className={cn("font-semibold text-foreground truncate text-base sm:text-lg", language === "bn" && "font-bengali")}>
              {language === "bn" ? lmsContinueCourse.courseBn : lmsContinueCourse.courseName}
            </p>
            {!lmsContinueCourse.hasCertificate && (
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progress} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground shrink-0">{progress}%</span>
              </div>
            )}
          </div>

          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 animate-fade-in">
      <button
        onClick={() => navigate("/courses")}
        className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-elevated hover:-translate-y-1"
      >
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 text-left min-w-0 overflow-hidden">
          <p className={cn("text-sm sm:text-base text-muted-foreground truncate", language === "bn" && "font-bengali")}>
            {language === "bn" ? "এখনই শুরু করুন" : "Start Learning"}
          </p>
          <p className={cn("font-semibold text-foreground truncate text-sm sm:text-base", language === "bn" && "font-bengali")}>
            {language === "bn" ? "৩০ দিনে কুরআন শিখুন" : "Learn Quran in 30 Days"}
          </p>
        </div>
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </button>
    </div>
  );
};
