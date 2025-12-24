-- Create dua_bookmarks table
CREATE TABLE public.dua_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id TEXT NOT NULL,
  dua_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, category_id, dua_id)
);

-- Enable Row Level Security
ALTER TABLE public.dua_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own dua bookmarks"
ON public.dua_bookmarks
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own dua bookmarks"
ON public.dua_bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own dua bookmarks"
ON public.dua_bookmarks
FOR DELETE
USING (auth.uid() = user_id);