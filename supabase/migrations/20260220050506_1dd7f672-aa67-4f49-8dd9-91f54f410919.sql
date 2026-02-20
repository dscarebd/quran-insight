
-- Create stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_english TEXT NOT NULL,
  title_bengali TEXT NOT NULL,
  content_english TEXT NOT NULL DEFAULT '',
  content_bengali TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  cover_image_url TEXT,
  author TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read published stories"
ON public.stories FOR SELECT
USING (is_published = true);

-- Admin CRUD
CREATE POLICY "Admins can insert stories"
ON public.stories FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update stories"
ON public.stories FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete stories"
ON public.stories FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can also read unpublished
CREATE POLICY "Admins can read all stories"
ON public.stories FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
