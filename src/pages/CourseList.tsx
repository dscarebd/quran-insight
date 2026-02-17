import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Progress } from "@/components/ui/progress";
import { useLmsCourses, useLmsProgress, useLmsCertificates } from "@/hooks/useLmsCourses";
import { useLmsStudent } from "@/hooks/useLmsStudent";
import { LmsStudentRegistration } from "@/components/lms/LmsStudentRegistration";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseListProps {
  language: Language;
}

const CourseList = ({ language }: CourseListProps) => {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useLmsCourses();
  const { studentId, isRegistered, showRegistration, setShowRegistration, register, isRegistering, requireRegistration } = useLmsStudent();
  const { data: progress } = useLmsProgress(studentId);
  const { data: certificates } = useLmsCertificates(studentId);

  const getCourseProg = (courseId: string) => {
    if (!progress) return { completed: 0 };
    const courseProg = progress.filter((p) => p.course_id === courseId && p.is_completed);
    return { completed: courseProg.length };
  };

  const hasCert = (courseId: string) => certificates?.some((c) => c.course_id === courseId) || false;

  const handleCourseClick = (courseId: string) => {
    if (!requireRegistration()) return;
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className={cn("text-xl sm:text-2xl font-bold text-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কোর্সসমূহ" : "Courses"}
            </h1>
            <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "আপনার শেখার যাত্রা শুরু করুন" : "Start your learning journey"}
            </p>
          </div>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : !courses?.length ? (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "এখনো কোনো কোর্স নেই" : "No courses available yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const { completed } = getCourseProg(course.id);
              const total = course.total_lessons;
              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
              const certified = hasCert(course.id);

              return (
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
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

                  {/* Badge */}
                  {certified && (
                    <div className="absolute top-6 right-6 flex items-center gap-1 bg-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
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
                    <span className="text-xs text-muted-foreground">
                      {completed}/{total}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
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

export default CourseList;
