import { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, Loader2 } from "lucide-react";

interface LmsVideoPlayerProps {
  videoUrl: string;
  lessonId: string;
  courseId: string;
  studentId: string;
  durationSeconds: number | null;
  initialWatchedSeconds: number;
  isCompleted: boolean;
  hasNextLesson: boolean;
  onComplete: () => void;
  onNextLesson: () => void;
  language: Language;
}

export const LmsVideoPlayer = ({
  videoUrl,
  lessonId,
  courseId,
  studentId,
  durationSeconds,
  initialWatchedSeconds,
  isCompleted: initialCompleted,
  hasNextLesson,
  onComplete,
  onNextLesson,
  language,
}: LmsVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isSaving, setIsSaving] = useState(false);
  const lastSaveRef = useRef(0);

  const saveProgress = useCallback(
    async (currentTime: number, forceSave = false) => {
      const now = Date.now();
      if (!forceSave && now - lastSaveRef.current < 10000) return; // every 10s
      lastSaveRef.current = now;

      try {
        const { data } = await supabase.functions.invoke("lms-progress", {
          body: {
            student_id: studentId,
            lesson_id: lessonId,
            course_id: courseId,
            watched_seconds: Math.floor(currentTime),
            duration_seconds: durationSeconds,
          },
        });
        if (data?.is_completed && !isCompleted) {
          setIsCompleted(true);
          onComplete();
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    },
    [studentId, lessonId, courseId, durationSeconds, isCompleted, onComplete]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial position
    if (initialWatchedSeconds > 0 && !initialCompleted) {
      video.currentTime = initialWatchedSeconds;
    }

    const handleTimeUpdate = () => {
      saveProgress(video.currentTime);
    };

    const handleEnded = () => {
      saveProgress(video.duration || durationSeconds || 0, true);
    };

    const handlePause = () => {
      saveProgress(video.currentTime, true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("pause", handlePause);
      // Save on unmount
      if (video.currentTime > 0) {
        saveProgress(video.currentTime, true);
      }
    };
  }, [saveProgress, initialWatchedSeconds, initialCompleted, durationSeconds]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          controlsList="nodownload"
          className="w-full h-full"
          playsInline
        />
      </div>

      {isCompleted && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <span className={cn("font-medium", language === "bn" && "font-bengali")}>
              {language === "bn" ? "পাঠ সম্পন্ন!" : "Lesson Complete!"}
            </span>
          </div>
          {hasNextLesson && (
            <Button size="sm" onClick={onNextLesson}>
              <span className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" ? "পরবর্তী পাঠ" : "Next Lesson"}
              </span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
