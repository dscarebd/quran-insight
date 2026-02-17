import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export interface LmsProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  course_id: string;
  watched_seconds: number;
  is_completed: boolean;
  completed_at: string | null;
}

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

export function useLmsProgress(studentId: string | null, courseId?: string) {
  return useQuery({
    queryKey: ["lms-progress", studentId, courseId],
    queryFn: async () => {
      let query = supabase
        .from("lms_progress")
        .select("*")
        .eq("student_id", studentId!);
      if (courseId) query = query.eq("course_id", courseId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LmsProgress[];
    },
    enabled: !!studentId,
  });
}

export function useLmsCertificates(studentId: string | null) {
  return useQuery({
    queryKey: ["lms-certificates", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_certificates")
        .select("*")
        .eq("student_id", studentId!);
      if (error) throw error;
      return data as LmsCertificate[];
    },
    enabled: !!studentId,
  });
}
