-- Enable realtime for page_views table
ALTER TABLE public.page_views REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;