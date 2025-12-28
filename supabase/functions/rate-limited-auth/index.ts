import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

// Admin email for lockout notifications
const ADMIN_EMAIL = "support@annurdigital.com";

// Send lockout notification email
async function sendLockoutNotification(
  ipAddress: string,
  attemptedEmail: string,
  lockoutMinutes: number
) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  if (!resendApiKey) {
    console.log("RESEND_API_KEY not configured, skipping email notification");
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    const now = new Date().toISOString();
    
    const { error } = await resend.emails.send({
      from: "Security Alert <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: "🚨 Admin Login Lockout Alert",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc2626; margin-bottom: 20px;">⚠️ Security Alert: IP Locked Out</h1>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            An IP address has been temporarily locked out due to too many failed login attempts on your admin panel.
          </p>
          
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #991b1b; margin-top: 0;">Lockout Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">IP Address:</td>
                <td style="padding: 8px 0; color: #111827;">${ipAddress}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Attempted Email:</td>
                <td style="padding: 8px 0; color: #111827;">${attemptedEmail || "Unknown"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0; color: #111827;">${now}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Failed Attempts:</td>
                <td style="padding: 8px 0; color: #111827;">${MAX_ATTEMPTS}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Lockout Duration:</td>
                <td style="padding: 8px 0; color: #111827;">${lockoutMinutes} minutes</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #374151; font-size: 14px; line-height: 1.6;">
            This could indicate a brute force attack. If you don't recognize this activity, consider:
          </p>
          <ul style="color: #374151; font-size: 14px; line-height: 1.8;">
            <li>Reviewing your server logs for suspicious patterns</li>
            <li>Implementing additional security measures</li>
            <li>Changing your admin password if concerned</li>
          </ul>
          
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            This is an automated security notification from your Quran app admin panel.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send lockout notification email:", error);
    } else {
      console.log(`Lockout notification sent to ${ADMIN_EMAIL} for IP: ${ipAddress}`);
    }
  } catch (error) {
    console.error("Error sending lockout notification:", error);
  }
}

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

    // If login failed, check if this triggers a lockout
    if (authResult.error) {
      const newFailedCount = failedAttempts + 1;
      const remainingAttempts = MAX_ATTEMPTS - newFailedCount;

      console.log(`Failed login for ${email} from ${clientIp}. ${remainingAttempts} attempts remaining.`);

      // Send email notification when lockout is triggered
      if (newFailedCount >= MAX_ATTEMPTS) {
        console.log(`Lockout triggered for IP ${clientIp}, sending notification email...`);
        // Send email in background (don't await to avoid blocking response)
        sendLockoutNotification(clientIp, email, LOCKOUT_DURATION_MINUTES);
      }

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
