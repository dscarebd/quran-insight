-- Create masail table for Islamic rulings/fatwas
CREATE TABLE public.masail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  question TEXT,
  answer TEXT NOT NULL,
  author TEXT,
  category TEXT,
  source_url TEXT,
  source_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.masail ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can read masail"
ON public.masail
FOR SELECT
USING (true);

-- Create policies for admin management
CREATE POLICY "Admins can insert masail"
ON public.masail
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update masail"
ON public.masail
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete masail"
ON public.masail
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_masail_updated_at
BEFORE UPDATE ON public.masail
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster searches
CREATE INDEX idx_masail_source_id ON public.masail(source_id);
CREATE INDEX idx_masail_category ON public.masail(category);
CREATE INDEX idx_masail_author ON public.masail(author);