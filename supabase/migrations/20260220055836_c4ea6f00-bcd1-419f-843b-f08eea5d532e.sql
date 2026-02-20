
-- Create storage bucket for story cover images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-covers', 'story-covers', true);

-- Allow anyone to view story cover images
CREATE POLICY "Anyone can view story covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'story-covers');

-- Allow admins to upload story covers
CREATE POLICY "Admins can upload story covers"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'story-covers' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update story covers
CREATE POLICY "Admins can update story covers"
ON storage.objects FOR UPDATE
USING (bucket_id = 'story-covers' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete story covers
CREATE POLICY "Admins can delete story covers"
ON storage.objects FOR DELETE
USING (bucket_id = 'story-covers' AND public.has_role(auth.uid(), 'admin'));
