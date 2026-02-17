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
    const { student_id, lesson_id, course_id, watched_seconds, duration_seconds } = await req.json();

    if (!student_id || !lesson_id || !course_id || watched_seconds === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify student exists
    const { data: student } = await supabase
      .from("lms_students")
      .select("id")
      .eq("id", student_id)
      .single();

    if (!student) {
      return new Response(
        JSON.stringify({ error: "Student not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the lesson to check order and validate
    const { data: currentLesson } = await supabase
      .from("lms_lessons")
      .select("id, lesson_order, course_id, duration_seconds")
      .eq("id", lesson_id)
      .single();

    if (!currentLesson) {
      return new Response(
        JSON.stringify({ error: "Lesson not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if previous lesson is completed (if not first lesson)
    if (currentLesson.lesson_order > 1) {
      const { data: prevLesson } = await supabase
        .from("lms_lessons")
        .select("id")
        .eq("course_id", course_id)
        .eq("lesson_order", currentLesson.lesson_order - 1)
        .single();

      if (prevLesson) {
        const { data: prevProgress } = await supabase
          .from("lms_progress")
          .select("is_completed")
          .eq("student_id", student_id)
          .eq("lesson_id", prevLesson.id)
          .single();

        if (!prevProgress?.is_completed) {
          return new Response(
            JSON.stringify({ error: "Previous lesson not completed" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    // Determine completion (95% threshold)
    const effectiveDuration = duration_seconds || currentLesson.duration_seconds || 0;
    const isCompleted = effectiveDuration > 0 && watched_seconds >= effectiveDuration * 0.95;

    // Upsert progress
    const { data: progress, error } = await supabase
      .from("lms_progress")
      .upsert(
        {
          student_id,
          lesson_id,
          course_id,
          watched_seconds: Math.floor(watched_seconds),
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        },
        { onConflict: "student_id,lesson_id" }
      )
      .select()
      .single();

    if (error) throw error;

    // Check if all lessons in course are completed -> generate certificate
    let certificate = null;
    if (isCompleted) {
      const { data: allLessons } = await supabase
        .from("lms_lessons")
        .select("id")
        .eq("course_id", course_id)
        .eq("is_published", true);

      const { data: completedLessons } = await supabase
        .from("lms_progress")
        .select("lesson_id")
        .eq("student_id", student_id)
        .eq("course_id", course_id)
        .eq("is_completed", true);

      if (allLessons && completedLessons && completedLessons.length >= allLessons.length) {
        // Check if certificate already exists
        const { data: existingCert } = await supabase
          .from("lms_certificates")
          .select("*")
          .eq("student_id", student_id)
          .eq("course_id", course_id)
          .single();

        if (!existingCert) {
          const certNumber = `QI-CERT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
          const { data: newCert } = await supabase
            .from("lms_certificates")
            .insert({
              student_id,
              course_id,
              certificate_number: certNumber,
              completed_at: new Date().toISOString(),
            })
            .select()
            .single();
          certificate = newCert;
        } else {
          certificate = existingCert;
        }
      }
    }

    return new Response(
      JSON.stringify({ progress, certificate, is_completed: isCompleted }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Progress update error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update progress" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
