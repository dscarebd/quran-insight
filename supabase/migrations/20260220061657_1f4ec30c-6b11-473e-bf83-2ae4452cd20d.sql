
-- Create story_categories table
CREATE TABLE public.story_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name_english text NOT NULL,
  name_bengali text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.story_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read categories
CREATE POLICY "Anyone can read story_categories"
ON public.story_categories FOR SELECT
USING (true);

-- Admins can manage categories
CREATE POLICY "Admins can insert story_categories"
ON public.story_categories FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update story_categories"
ON public.story_categories FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete story_categories"
ON public.story_categories FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Seed existing categories
INSERT INTO public.story_categories (slug, name_english, name_bengali, display_order) VALUES
  ('prophets', 'Prophets', 'নবীদের কাহিনী', 1),
  ('tafsir', 'Tafsir', 'তাফসীর', 2),
  ('history', 'History', 'ইতিহাস', 3),
  ('moral', 'Moral', 'শিক্ষামূলক', 4),
  ('general', 'General', 'সাধারণ', 5);
