-- Create hadith_books table
CREATE TABLE public.hadith_books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name_arabic TEXT NOT NULL,
  name_english TEXT NOT NULL,
  name_bengali TEXT NOT NULL,
  total_hadiths INTEGER NOT NULL DEFAULT 0,
  icon TEXT NOT NULL DEFAULT 'BookOpen',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hadiths table
CREATE TABLE public.hadiths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_slug TEXT NOT NULL REFERENCES public.hadith_books(slug) ON DELETE CASCADE,
  hadith_number INTEGER NOT NULL,
  arabic TEXT,
  english TEXT,
  bengali TEXT,
  narrator_english TEXT,
  narrator_bengali TEXT,
  grade TEXT,
  grade_bengali TEXT,
  chapter_number INTEGER,
  chapter_name_english TEXT,
  chapter_name_bengali TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(book_slug, hadith_number)
);

-- Create hadith_bookmarks table
CREATE TABLE public.hadith_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  book_slug TEXT NOT NULL,
  hadith_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_slug, hadith_number)
);

-- Enable RLS on all tables
ALTER TABLE public.hadith_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadith_bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies for hadith_books (public read, admin write)
CREATE POLICY "Anyone can read hadith_books" 
  ON public.hadith_books FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert hadith_books" 
  ON public.hadith_books FOR INSERT 
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hadith_books" 
  ON public.hadith_books FOR UPDATE 
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hadith_books" 
  ON public.hadith_books FOR DELETE 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for hadiths (public read, admin write)
CREATE POLICY "Anyone can read hadiths" 
  ON public.hadiths FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert hadiths" 
  ON public.hadiths FOR INSERT 
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hadiths" 
  ON public.hadiths FOR UPDATE 
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hadiths" 
  ON public.hadiths FOR DELETE 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for hadith_bookmarks (user-specific)
CREATE POLICY "Users can view own hadith bookmarks" 
  ON public.hadith_bookmarks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own hadith bookmarks" 
  ON public.hadith_bookmarks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own hadith bookmarks" 
  ON public.hadith_bookmarks FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_hadiths_book_slug ON public.hadiths(book_slug);
CREATE INDEX idx_hadiths_hadith_number ON public.hadiths(hadith_number);
CREATE INDEX idx_hadiths_chapter ON public.hadiths(book_slug, chapter_number);
CREATE INDEX idx_hadith_bookmarks_user ON public.hadith_bookmarks(user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_hadith_books_updated_at
  BEFORE UPDATE ON public.hadith_books
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hadiths_updated_at
  BEFORE UPDATE ON public.hadiths
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial hadith books data
INSERT INTO public.hadith_books (slug, name_arabic, name_english, name_bengali, total_hadiths, display_order) VALUES
  ('bukhari', 'صحيح البخاري', 'Sahih Bukhari', 'সহীহ বুখারী', 7563, 1),
  ('muslim', 'صحيح مسلم', 'Sahih Muslim', 'সহীহ মুসলিম', 3032, 2),
  ('abudawud', 'سنن أبي داود', 'Sunan Abu Dawud', 'সুনানে আবু দাউদ', 3998, 3),
  ('tirmidhi', 'جامع الترمذي', 'Jami at-Tirmidhi', 'জামে তিরমিযী', 3956, 4),
  ('nasai', 'سنن النسائي', 'Sunan an-Nasa''i', 'সুনানে নাসাঈ', 5662, 5),
  ('ibnmajah', 'سنن ابن ماجه', 'Sunan Ibn Majah', 'সুনানে ইবনে মাজাহ', 4342, 6);