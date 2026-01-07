-- Add columns for QPC V1 (King Fahad Complex) font glyph text and page number
ALTER TABLE public.verses ADD COLUMN IF NOT EXISTS text_v1 TEXT;
ALTER TABLE public.verses ADD COLUMN IF NOT EXISTS page_number INTEGER;

-- Add index on page_number for efficient page-based queries
CREATE INDEX IF NOT EXISTS idx_verses_page_number ON public.verses(page_number);

-- Add comment explaining the columns
COMMENT ON COLUMN public.verses.text_v1 IS 'QPC V1 glyph-based text for King Fahad Complex font rendering';
COMMENT ON COLUMN public.verses.page_number IS 'Mushaf page number (1-604) based on Medina Mushaf';