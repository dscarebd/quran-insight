import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, email, phone, device_id } = await req.json();

    if (!full_name || !email || !phone || !device_id) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone (basic)
    if (phone.length < 6 || phone.length > 20) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate name length
    if (full_name.length < 2 || full_name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be between 2 and 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if student already exists by email or device_id
    const { data: existing } = await supabase
      .from("lms_students")
      .select("id")
      .or(`email.eq.${email},device_id.eq.${device_id}`)
      .limit(1)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ student_id: existing.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("lms_students")
      .insert({ full_name: full_name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), device_id })
      .select("id")
      .single();

    if (error) {
      // Handle unique constraint violation
      if (error.code === "23505") {
        const { data: existingByEmail } = await supabase
          .from("lms_students")
          .select("id")
          .eq("email", email.trim().toLowerCase())
          .single();
        if (existingByEmail) {
          return new Response(
            JSON.stringify({ student_id: existingByEmail.id }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
      throw error;
    }

    return new Response(
      JSON.stringify({ student_id: data.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ error: "Registration failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
