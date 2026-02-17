import { useParams, useNavigate } from "react-router-dom";
import { Award, ArrowLeft, Download, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import { useLmsCertificates } from "@/hooks/useLmsCourses";
import { useLmsStudent } from "@/hooks/useLmsStudent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import { useCallback, useRef } from "react";

interface CertificatePageProps {
  language: Language;
}

const CertificatePage = ({ language }: CertificatePageProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { studentId } = useLmsStudent();

  const { data: course } = useQuery({
    queryKey: ["lms-course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase.from("lms_courses").select("*").eq("id", courseId!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const { data: certificates } = useLmsCertificates(studentId);
  const cert = certificates?.find((c) => c.course_id === courseId);

  const { data: student } = useQuery({
    queryKey: ["lms-student-info", studentId],
    queryFn: async () => {
      const { data, error } = await supabase.from("lms_students").select("*").eq("id", studentId!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!studentId,
  });

  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, backgroundColor: null });
    const link = document.createElement("a");
    link.download = `certificate-${cert?.certificate_number || "download"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [cert]);

  if (!cert || !course) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/courses/${courseId}`)} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className={cn(language === "bn" && "font-bengali")}>{language === "bn" ? "ফিরে যান" : "Back"}</span>
          </Button>
          <div className="text-center py-16">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কোর্স সম্পন্ন করে সার্টিফিকেট পান" : "Complete the course to earn your certificate"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/courses/${courseId}`)} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className={cn(language === "bn" && "font-bengali")}>{language === "bn" ? "ফিরে যান" : "Back"}</span>
        </Button>

        {/* Certificate Card */}
        <div
          ref={certRef}
          id="lms-certificate"
          className="relative overflow-hidden rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-card via-card to-accent/20 p-8 sm:p-12 text-center"
          style={{ boxShadow: "var(--shadow-gold)" }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-gold/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-gold/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-gold/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-gold/40 rounded-br-2xl" />

          {/* Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-white mb-4">
            <Award className="h-8 w-8" />
          </div>

          <h2 className={cn("text-sm uppercase tracking-widest text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
            {language === "bn" ? "সম্পন্নতার সার্টিফিকেট" : "Certificate of Completion"}
          </h2>

          <p className={cn("text-lg text-muted-foreground mb-1", language === "bn" && "font-bengali")}>
            {language === "bn" ? "এই সার্টিফিকেট প্রদান করা হচ্ছে" : "This certifies that"}
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {student?.full_name || "Student"}
          </h1>

          <p className={cn("text-muted-foreground mb-2", language === "bn" && "font-bengali")}>
            {language === "bn" ? "সফলভাবে সম্পন্ন করেছেন" : "has successfully completed"}
          </p>

          <h3 className={cn("text-xl font-semibold text-primary mb-6", language === "bn" && "font-bengali")}>
            {language === "bn" ? course.title_bengali : course.title_english}
          </h3>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div>
              <p className={cn("font-medium", language === "bn" && "font-bengali")}>
                {language === "bn" ? "তারিখ" : "Date"}
              </p>
              <p>{new Date(cert.completed_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className={cn("font-medium", language === "bn" && "font-bengali")}>
                {language === "bn" ? "সার্টিফিকেট নম্বর" : "Certificate No."}
              </p>
              <p className="font-mono text-xs">{cert.certificate_number}</p>
            </div>
        </div>

        {/* Download Button */}
        <div className="mt-4 flex justify-center">
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            <span className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "সার্টিফিকেট ডাউনলোড করুন" : "Download Certificate"}
            </span>
          </Button>
        </div>
        </div>

        {/* Achievement Badge */}
        <div className="mt-6 flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className={cn("font-semibold text-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কোর্স চ্যাম্পিয়ন!" : "Course Champion!"}
            </p>
            <p className={cn("text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "আপনি এই কোর্স সফলভাবে সম্পন্ন করেছেন" : "You've successfully completed this course"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
