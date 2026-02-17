import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLmsLessons, useLmsProgress } from "@/hooks/useLmsCourses";
import { useLmsStudent } from "@/hooks/useLmsStudent";
import { LmsVideoPlayer } from "@/components/lms/LmsVideoPlayer";
import { LmsStudentRegistration } from "@/components/lms/LmsStudentRegistration";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

interface LessonPlayerProps {
  language: Language;
}

const LessonPlayer = ({ language }: LessonPlayerProps) => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { studentId, isRegistered, showRegistration, setShowRegistration, register, isRegistering, requireRegistration } = useLmsStudent();

  // Redirect if not registered
  useEffect(() => {
    if (!isRegistered) {
      requireRegistration();
    }
  }, [isRegistered, requireRegistration]);

  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: ["lms-lesson", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_lessons")
        .select("*")
        .eq("id", lessonId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!lessonId,
  });

  const { data: lessons } = useLmsLessons(courseId);
  const { data: progress } = useLmsProgress(studentId, courseId);

  const currentProgress = progress?.find((p) => p.lesson_id === lessonId);

  // Check if lesson is unlocked
  const isUnlocked = (() => {
    if (!lesson || !lessons) return false;
    if (lesson.lesson_order === 1) return true;
    const prevLesson = lessons.find((l) => l.lesson_order === lesson.lesson_order - 1);
    if (!prevLesson) return true;
    return progress?.some((p) => p.lesson_id === prevLesson.id && p.is_completed) || false;
  })();

  const nextLesson = lessons?.find((l) => l.lesson_order === (lesson?.lesson_order || 0) + 1);

  const handleComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["lms-progress"] });
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/courses/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/courses/${courseId}/certificate`);
    }
  };

  if (lessonLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 py-6">
          <Skeleton className="aspect-video w-full rounded-xl mb-4" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 py-6">
        {/* Back */}
        <Button variant="ghost" size="sm" onClick={() => navigate(`/courses/${courseId}`)} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className={cn(language === "bn" && "font-bengali")}>
            {language === "bn" ? "পাঠ তালিকা" : "Lessons"}
          </span>
        </Button>

        {!isUnlocked ? (
          <div className="text-center py-16">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={cn("text-lg font-medium text-foreground mb-2", language === "bn" && "font-bengali")}>
              {language === "bn" ? "এই পাঠটি লক করা আছে" : "This lesson is locked"}
            </p>
            <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "আগের পাঠটি সম্পন্ন করুন" : "Complete the previous lesson first"}
            </p>
          </div>
        ) : (
          <>
            {/* Video */}
            {studentId && (
              <LmsVideoPlayer
                videoUrl={lesson.video_url}
                lessonId={lesson.id}
                courseId={courseId!}
                studentId={studentId}
                durationSeconds={lesson.duration_seconds}
                initialWatchedSeconds={currentProgress?.watched_seconds || 0}
                isCompleted={currentProgress?.is_completed || false}
                hasNextLesson={!!nextLesson}
                onComplete={handleComplete}
                onNextLesson={handleNextLesson}
                language={language}
              />
            )}

            {/* Lesson info */}
            <div className="mt-6">
              <h1 className={cn("text-xl sm:text-2xl font-bold text-foreground mb-2", language === "bn" && "font-bengali")}>
                {language === "bn" ? lesson.title_bengali : lesson.title_english}
              </h1>
              {(lesson.description_english || lesson.description_bengali) && (
                <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? lesson.description_bengali : lesson.description_english}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <LmsStudentRegistration
        open={showRegistration}
        onOpenChange={setShowRegistration}
        onRegister={register}
        isRegistering={isRegistering}
        language={language}
      />
    </div>
  );
};

export default LessonPlayer;
