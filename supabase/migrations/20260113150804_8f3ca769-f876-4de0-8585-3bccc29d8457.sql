-- Create pdf_books table for storing book metadata
CREATE TABLE public.pdf_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_english TEXT NOT NULL,
  title_bengali TEXT NOT NULL,
  author_english TEXT,
  author_bengali TEXT,
  description_english TEXT,
  description_bengali TEXT,
  cover_image_url TEXT,
  pdf_url TEXT NOT NULL,
  file_size_mb DECIMAL(10, 2),
  total_pages INTEGER,
  category TEXT DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pdf_books ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read pdf_books"
ON public.pdf_books FOR SELECT
USING (true);

CREATE POLICY "Admins can insert pdf_books"
ON public.pdf_books FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update pdf_books"
ON public.pdf_books FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete pdf_books"
ON public.pdf_books FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for PDF files
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdf-books', 'pdf-books', true);

-- Storage policies for public read access
CREATE POLICY "Public can read PDFs"
ON storage.objects FOR SELECT
USING (bucket_id = 'pdf-books');

-- Admins can upload PDFs
CREATE POLICY "Admins can upload PDFs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'pdf-books' AND has_role(auth.uid(), 'admin'::app_role));

-- Admins can update PDFs
CREATE POLICY "Admins can update PDFs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'pdf-books' AND has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete PDFs
CREATE POLICY "Admins can delete PDFs"
ON storage.objects FOR DELETE
USING (bucket_id = 'pdf-books' AND has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_pdf_books_updated_at
BEFORE UPDATE ON public.pdf_books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();