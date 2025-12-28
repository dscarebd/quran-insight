-- Remove the permissive "Anyone can insert page views" policy
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;

-- Create a new policy that only allows service role to insert (edge function uses service role)
CREATE POLICY "Service role can insert page views" 
ON public.page_views 
FOR INSERT 
TO service_role
WITH CHECK (true);