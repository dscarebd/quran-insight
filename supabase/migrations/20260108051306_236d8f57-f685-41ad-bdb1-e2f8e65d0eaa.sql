-- Create mushaf_words table to store word-level data with line positions
CREATE TABLE public.mushaf_words (
  id SERIAL PRIMARY KEY,
  page_number INTEGER NOT NULL,
  line_number INTEGER NOT NULL,
  surah_number INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  word_position INTEGER NOT NULL,
  text_v1 TEXT NOT NULL,
  verse_key TEXT NOT NULL,
  char_type TEXT DEFAULT 'word',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for efficient queries
CREATE INDEX idx_mushaf_words_page ON public.mushaf_words(page_number);
CREATE INDEX idx_mushaf_words_page_line ON public.mushaf_words(page_number, line_number);
CREATE INDEX idx_mushaf_words_verse ON public.mushaf_words(surah_number, verse_number);

-- Enable RLS
ALTER TABLE public.mushaf_words ENABLE ROW LEVEL SECURITY;

-- Anyone can read mushaf_words (public Quran data)
CREATE POLICY "Anyone can read mushaf_words"
ON public.mushaf_words
FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert mushaf_words"
ON public.mushaf_words
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update mushaf_words"
ON public.mushaf_words
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete mushaf_words"
ON public.mushaf_words
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));