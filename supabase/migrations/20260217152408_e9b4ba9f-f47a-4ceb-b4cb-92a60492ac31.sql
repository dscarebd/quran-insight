
-- LMS Courses table
CREATE TABLE public.lms_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_english TEXT NOT NULL,
  title_bengali TEXT NOT NULL,
  description_english TEXT NOT NULL DEFAULT '',
  description_bengali TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  total_lessons INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- LMS Lessons table
CREATE TABLE public.lms_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  title_english TEXT NOT NULL,
  title_bengali TEXT NOT NULL,
  description_english TEXT,
  description_bengali TEXT,
  video_url TEXT NOT NULL,
  duration_seconds INTEGER,
  lesson_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- LMS Students table (non-auth users)
CREATE TABLE public.lms_students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  device_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- LMS Progress table
CREATE TABLE public.lms_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.lms_students(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lms_lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  watched_seconds INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, lesson_id)
);

-- LMS Certificates table
CREATE TABLE public.lms_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.lms_students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  certificate_number TEXT NOT NULL UNIQUE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Storage bucket for videos
INSERT INTO storage.buckets (id, name, public) VALUES ('lms-videos', 'lms-videos', true);

-- RLS on lms_courses
ALTER TABLE public.lms_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published courses" ON public.lms_courses FOR SELECT USING (true);
CREATE POLICY "Admins can insert courses" ON public.lms_courses FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update courses" ON public.lms_courses FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete courses" ON public.lms_courses FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS on lms_lessons
ALTER TABLE public.lms_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read lessons" ON public.lms_lessons FOR SELECT USING (true);
CREATE POLICY "Admins can insert lessons" ON public.lms_lessons FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update lessons" ON public.lms_lessons FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete lessons" ON public.lms_lessons FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS on lms_students (service role for writes via edge function, admin can read)
ALTER TABLE public.lms_students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read all students" ON public.lms_students FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Service role can manage students" ON public.lms_students FOR ALL USING (true) WITH CHECK (true);

-- RLS on lms_progress (service role for writes via edge function, admin + public read)
ALTER TABLE public.lms_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read progress" ON public.lms_progress FOR SELECT USING (true);
CREATE POLICY "Service role can manage progress" ON public.lms_progress FOR ALL USING (true) WITH CHECK (true);

-- RLS on lms_certificates (service role for writes, public read)
ALTER TABLE public.lms_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read certificates" ON public.lms_certificates FOR SELECT USING (true);
CREATE POLICY "Service role can manage certificates" ON public.lms_certificates FOR ALL USING (true) WITH CHECK (true);

-- Storage policies for lms-videos
CREATE POLICY "Anyone can view lms videos" ON storage.objects FOR SELECT USING (bucket_id = 'lms-videos');
CREATE POLICY "Admins can upload lms videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'lms-videos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update lms videos" ON storage.objects FOR UPDATE USING (bucket_id = 'lms-videos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete lms videos" ON storage.objects FOR DELETE USING (bucket_id = 'lms-videos' AND public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_lms_courses_updated_at BEFORE UPDATE ON public.lms_courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lms_lessons_updated_at BEFORE UPDATE ON public.lms_lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lms_progress_updated_at BEFORE UPDATE ON public.lms_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
