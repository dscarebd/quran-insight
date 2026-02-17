import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useLmsLessons, useLmsProgress, useLmsCertificates } from "@/hooks/useLmsCourses";
import { useLmsStudent } from "@/hooks/useLmsStudent";
import { LmsLessonItem } from "@/components/lms/LmsLessonItem";
import { LmsStudentRegistration } from "@/components/lms/LmsStudentRegistration";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface CourseDetailProps {
  language: Language;
}

const CourseDetail = ({ language }: CourseDetailProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { studentId, showRegistration, setShowRegistration, register, isRegistering } = useLmsStudent();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["lms-course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_courses")
        .select("*")
        .eq("id", courseId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const { data: lessons, isLoading: lessonsLoading } = useLmsLessons(courseId);
  const { data: progress } = useLmsProgress(studentId, courseId);
  const { data: certificates } = useLmsCertificates(studentId);

  const hasCert = certificates?.some((c) => c.course_id === courseId) || false;

  const isLessonUnlocked = (lessonOrder: number, lessonId: string) => {
    if (lessonOrder === 1) return true;
    if (!lessons || !progress) return false;
    const prevLesson = lessons.find((l) => l.lesson_order === lessonOrder - 1);
    if (!prevLesson) return true;
    return progress.some((p) => p.lesson_id === prevLesson.id && p.is_completed);
  };

  const completedCount = progress?.filter((p) => p.is_completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (courseLoading || lessonsLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-6" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-6">
        {/* Back button */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/courses")} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className={cn(language === "bn" && "font-bengali")}>
            {language === "bn" ? "ফিরে যান" : "Back"}
          </span>
        </Button>

        {/* Course info */}
        <div className="mb-6">
          <h1 className={cn("text-xl sm:text-2xl font-bold text-foreground mb-2", language === "bn" && "font-bengali")}>
            {language === "bn" ? course.title_bengali : course.title_english}
          </h1>
          <p className={cn("text-muted-foreground mb-4", language === "bn" && "font-bengali")}>
            {language === "bn" ? course.description_bengali : course.description_english}
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <Progress value={overallPercent} className="h-2 flex-1" />
            <span className={cn("text-sm font-medium text-muted-foreground", language === "bn" && "font-bengali")}>
              {completedCount}/{totalLessons} {language === "bn" ? "সম্পন্ন" : "completed"}
            </span>
          </div>

          {hasCert && (
            <Button
              variant="outline"
              className="mt-4 border-gold text-gold-dark"
              onClick={() => navigate(`/courses/${courseId}/certificate`)}
            >
              <Award className="h-4 w-4 mr-2" />
              <span className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" ? "সার্টিফিকেট দেখুন" : "View Certificate"}
              </span>
            </Button>
          )}
        </div>

        {/* Lessons */}
        <div className="space-y-2">
          <h2 className={cn("text-lg font-semibold mb-3", language === "bn" && "font-bengali")}>
            {language === "bn" ? "পাঠসমূহ" : "Lessons"}
          </h2>
          {lessons?.map((lesson) => (
            <LmsLessonItem
              key={lesson.id}
              lesson={lesson}
              progress={progress?.find((p) => p.lesson_id === lesson.id)}
              isUnlocked={isLessonUnlocked(lesson.lesson_order, lesson.id)}
              language={language}
              courseId={courseId!}
            />
          ))}
        </div>
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

export default CourseDetail;
