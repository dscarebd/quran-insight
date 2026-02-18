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
          className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-elevated hover:-translate-y-1"
        >
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300">
            {lmsContinueCourse.hasCertificate ? (
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </div>

          <div className="flex-1 text-left min-w-0 overflow-hidden">
            <p className={cn("text-xs font-medium text-muted-foreground truncate uppercase tracking-wide", language === "bn" && "font-bengali normal-case tracking-normal")}>
              {lmsContinueCourse.hasCertificate
                ? language === "bn" ? "সার্টিফিকেট দেখুন" : "View Certificate"
                : language === "bn" ? "শিখতে থাকুন" : "Continue Learning"}
            </p>
            <p className={cn("font-semibold text-foreground truncate text-sm sm:text-base leading-tight", language === "bn" && "font-bengali")}>
              {language === "bn" ? lmsContinueCourse.courseBn : lmsContinueCourse.courseName}
            </p>
            {!lmsContinueCourse.hasCertificate && (
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progress} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground shrink-0 font-medium">{progress}%</span>
              </div>
            )}
          </div>

          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-all duration-300">
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
        className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card border border-border shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden hover:shadow-elevated hover:-translate-y-1"
      >
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300">
          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex-1 text-left min-w-0 overflow-hidden">
          <p className={cn("text-xs font-medium text-muted-foreground truncate uppercase tracking-wide", language === "bn" && "font-bengali normal-case tracking-normal")}>
            {language === "bn" ? "এখনই শুরু করুন" : "Start Learning"}
          </p>
          <p className={cn("font-semibold text-foreground truncate text-sm sm:text-base leading-tight", language === "bn" && "font-bengali")}>
            {language === "bn" ? "২৭ দিনে কুরআন শিখুন" : "Learn Quran in 27 Days"}
          </p>
        </div>
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-all duration-300">
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </button>
    </div>
  );
};
