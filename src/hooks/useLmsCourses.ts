import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLmsLocalProgress, LocalLessonProgress } from "./useLmsLocalProgress";

export interface LmsCourse {
  id: string;
  title_english: string;
  title_bengali: string;
  description_english: string;
  description_bengali: string;
  thumbnail_url: string | null;
  is_published: boolean;
  display_order: number;
  total_lessons: number;
}

export interface LmsLesson {
  id: string;
  course_id: string;
  title_english: string;
  title_bengali: string;
  description_english: string | null;
  description_bengali: string | null;
  video_url: string;
  duration_seconds: number | null;
  lesson_order: number;
  is_published: boolean;
}

// Re-export for backwards compat
export type LmsProgress = LocalLessonProgress & { id: string; student_id: string; updated_at?: string };

export interface LmsCertificate {
  id: string;
  student_id: string;
  course_id: string;
  certificate_number: string;
  completed_at: string;
}

export function useLmsCourses() {
  return useQuery({
    queryKey: ["lms-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_courses")
        .select("*")
        .eq("is_published", true)
        .order("display_order");
      if (error) throw error;
      return data as LmsCourse[];
    },
  });
}

export function useLmsAllCourses() {
  return useQuery({
    queryKey: ["lms-all-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_courses")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as LmsCourse[];
    },
  });
}

export function useLmsLessons(courseId: string | undefined) {
  return useQuery({
    queryKey: ["lms-lessons", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_lessons")
        .select("*")
        .eq("course_id", courseId!)
        .order("lesson_order");
      if (error) throw error;
      return data as LmsLesson[];
    },
    enabled: !!courseId,
  });
}

// Returns localStorage-backed progress as a hook (matches old API shape)
export function useLmsProgress(_studentId: string | null, courseId?: string) {
  const { getAllProgress } = useLmsLocalProgress();
  const progress = getAllProgress(courseId);
  // Shape to match old LmsProgress interface consumers expect
  const shaped = progress.map((p) => ({
    ...p,
    id: p.lesson_id,
    student_id: "local",
  }));
  return { data: shaped.length ? shaped : [] as any[] };
}

// Certificates stored in localStorage
const CERT_KEY = "lms-certificates";

export function useLmsCertificates(_studentId: string | null) {
  const getCerts = (): LmsCertificate[] => {
    try {
      return JSON.parse(localStorage.getItem(CERT_KEY) || "[]");
    } catch {
      return [];
    }
  };
  return { data: getCerts() };
}

export function saveLocalCertificate(cert: LmsCertificate) {
  try {
    const existing: LmsCertificate[] = JSON.parse(localStorage.getItem(CERT_KEY) || "[]");
    if (!existing.find((c) => c.course_id === cert.course_id)) {
      existing.push(cert);
      localStorage.setItem(CERT_KEY, JSON.stringify(existing));
    }
  } catch {}
}
