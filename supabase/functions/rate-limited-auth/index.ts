import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Create admin client for database operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP from headers
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwarded?.split(",")[0]?.trim() || realIp || "unknown";

    const { email, password, action } = await req.json();

    console.log(`Auth attempt from IP: ${clientIp}, action: ${action}, email: ${email}`);

    // Check rate limit for this IP
    const cutoffTime = new Date(Date.now() - LOCKOUT_DURATION_MINUTES * 60 * 1000).toISOString();
    
    const { data: recentAttempts, error: attemptsError } = await supabaseAdmin
      .from("login_attempts")
      .select("id, success")
      .eq("ip_address", clientIp)
      .gte("attempt_time", cutoffTime)
      .eq("success", false);

    if (attemptsError) {
      console.error("Error checking attempts:", attemptsError);
    }

    const failedAttempts = recentAttempts?.length || 0;

    // Check if IP is locked out
    if (failedAttempts >= MAX_ATTEMPTS) {
      console.log(`IP ${clientIp} is locked out. ${failedAttempts} failed attempts.`);
      
      // Calculate remaining lockout time
      const { data: oldestAttempt } = await supabaseAdmin
        .from("login_attempts")
        .select("attempt_time")
        .eq("ip_address", clientIp)
        .gte("attempt_time", cutoffTime)
        .eq("success", false)
        .order("attempt_time", { ascending: true })
        .limit(1)
        .single();

      let remainingMinutes = LOCKOUT_DURATION_MINUTES;
      if (oldestAttempt) {
        const oldestTime = new Date(oldestAttempt.attempt_time).getTime();
        const unlockTime = oldestTime + LOCKOUT_DURATION_MINUTES * 60 * 1000;
        remainingMinutes = Math.ceil((unlockTime - Date.now()) / 60000);
      }

      return new Response(
        JSON.stringify({
          error: "Too many failed login attempts",
          locked: true,
          remainingMinutes: Math.max(1, remainingMinutes),
          message: `Too many failed attempts. Please try again in ${remainingMinutes} minutes.`,
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create anon client for auth operations
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    let authResult;

    if (action === "signin") {
      authResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Log the attempt
    const { error: logError } = await supabaseAdmin
      .from("login_attempts")
      .insert({
        ip_address: clientIp,
        email: email,
        success: !authResult.error,
      });

    if (logError) {
      console.error("Error logging attempt:", logError);
    }

    // If login failed, return error with remaining attempts
    if (authResult.error) {
      const newFailedCount = failedAttempts + 1;
      const remainingAttempts = MAX_ATTEMPTS - newFailedCount;

      console.log(`Failed login for ${email} from ${clientIp}. ${remainingAttempts} attempts remaining.`);

      return new Response(
        JSON.stringify({
          error: authResult.error.message,
          remainingAttempts: Math.max(0, remainingAttempts),
          locked: remainingAttempts <= 0,
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Successful login - clean up old attempts for this IP
    await supabaseAdmin
      .from("login_attempts")
      .delete()
      .eq("ip_address", clientIp)
      .eq("success", false);

    console.log(`Successful login for ${email} from ${clientIp}`);

    return new Response(
      JSON.stringify({
        user: authResult.data.user,
        session: authResult.data.session,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error in rate-limited-auth:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
