-- Fix the login_attempts RLS policy to restrict access to service_role only
-- The current policy incorrectly allows public access despite being named "Service role can manage login attempts"

-- Drop the existing misconfigured policy
DROP POLICY IF EXISTS "Service role can manage login attempts" ON public.login_attempts;

-- Create the correct policy that only allows service_role access
CREATE POLICY "Service role can manage login attempts"
ON public.login_attempts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);