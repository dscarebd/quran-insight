-- Create duas table
CREATE TABLE public.duas (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id text NOT NULL,
  dua_id text NOT NULL,
  title_english text NOT NULL,
  title_bengali text NOT NULL,
  title_hindi text,
  arabic text NOT NULL,
  transliteration text,
  transliteration_bengali text,
  transliteration_hindi text,
  english text NOT NULL,
  bengali text NOT NULL,
  hindi text,
  reference text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(category_id, dua_id)
);

-- Create dua_categories table
CREATE TABLE public.dua_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id text NOT NULL UNIQUE,
  name_english text NOT NULL,
  name_bengali text NOT NULL,
  name_hindi text,
  icon text NOT NULL DEFAULT 'BookOpen',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.duas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dua_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for duas
CREATE POLICY "Anyone can read duas"
ON public.duas
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert duas"
ON public.duas
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update duas"
ON public.duas
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete duas"
ON public.duas
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for dua_categories
CREATE POLICY "Anyone can read dua_categories"
ON public.dua_categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert dua_categories"
ON public.dua_categories
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update dua_categories"
ON public.dua_categories
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete dua_categories"
ON public.dua_categories
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_duas_updated_at
BEFORE UPDATE ON public.duas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dua_categories_updated_at
BEFORE UPDATE ON public.dua_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();