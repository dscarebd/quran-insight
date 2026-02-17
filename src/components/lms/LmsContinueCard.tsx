import { useNavigate } from "react-router-dom";
import { GraduationCap, ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Progress } from "@/components/ui/progress";

interface LmsContinueCardProps {
  language: Language;
  courseName: string;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  hasCertificate: boolean;
}

export const LmsContinueCard = ({
  language,
  courseName,
  courseId,
  completedLessons,
  totalLessons,
  hasCertificate,
}: LmsContinueCardProps) => {
  const navigate = useNavigate();
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="mt-6 overflow-hidden">
      <button
        onClick={() => navigate(hasCertificate ? `/courses/${courseId}/certificate` : `/courses/${courseId}`)}
        className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-card hover:bg-card/90 border border-border shadow-lg rounded-xl transition-all duration-200 group overflow-hidden"
      >
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {hasCertificate ? (
            <Award className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </div>

        <div className="flex-1 text-left min-w-0 overflow-hidden">
          <p className={cn("text-sm sm:text-base text-muted-foreground truncate", language === "bn" && "font-bengali")}>
            {hasCertificate
              ? language === "bn" ? "সার্টিফিকেট দেখুন" : "View Certificate"
              : language === "bn" ? "শিখতে থাকুন" : "Continue Learning"}
          </p>
          <p className={cn("font-semibold text-foreground truncate text-base sm:text-lg", language === "bn" && "font-bengali")}>
            {courseName}
          </p>
          {!hasCertificate && (
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
};
