import { useNavigate } from "react-router-dom";
import { Play, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Progress } from "@/components/ui/progress";
import { LmsLesson, LmsProgress } from "@/hooks/useLmsCourses";

interface LmsLessonItemProps {
  lesson: LmsLesson;
  progress?: LmsProgress;
  isUnlocked: boolean;
  language: Language;
  courseId: string;
}

export const LmsLessonItem = ({ lesson, progress, isUnlocked, language, courseId }: LmsLessonItemProps) => {
  const navigate = useNavigate();
  const isCompleted = progress?.is_completed || false;
  const watchedPercent =
    lesson.duration_seconds && progress
      ? Math.min(100, Math.round((progress.watched_seconds / lesson.duration_seconds) * 100))
      : 0;

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <button
      onClick={() => isUnlocked && navigate(`/courses/${courseId}/lesson/${lesson.id}`)}
      disabled={!isUnlocked}
      className={cn(
        "w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 text-left",
        isUnlocked
          ? "bg-card border-border hover:border-primary/30 hover:shadow-md cursor-pointer"
          : "bg-muted/50 border-border/50 opacity-60 cursor-not-allowed"
      )}
    >
      {/* Status icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          isCompleted
            ? "bg-primary text-primary-foreground"
            : isUnlocked
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : isUnlocked ? (
          <Play className="h-4 w-4 ml-0.5" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {language === "bn" ? `পাঠ ${lesson.lesson_order}` : `Lesson ${lesson.lesson_order}`}
          </span>
          {lesson.duration_seconds && (
            <span className="text-xs text-muted-foreground">• {formatDuration(lesson.duration_seconds)}</span>
          )}
        </div>
        <p className={cn("font-medium text-foreground truncate", language === "bn" && "font-bengali")}>
          {language === "bn" ? lesson.title_bengali : lesson.title_english}
        </p>
        {isUnlocked && !isCompleted && watchedPercent > 0 && (
          <Progress value={watchedPercent} className="h-1 mt-1.5" />
        )}
      </div>
    </button>
  );
};
