import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { useLmsLocalProgress } from "@/hooks/useLmsLocalProgress";

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
  const lastSaveRef = useRef(0);
  const { saveProgress } = useLmsLocalProgress();

  const handleSaveProgress = useCallback(
    (currentTime: number, forceSave = false) => {
      const now = Date.now();
      if (!forceSave && now - lastSaveRef.current < 5000) return;
      lastSaveRef.current = now;

      const newlyCompleted = saveProgress(lessonId, courseId, currentTime, durationSeconds);
      if (newlyCompleted && !isCompleted) {
        setIsCompleted(true);
        onComplete();
      }
    },
    [lessonId, courseId, durationSeconds, isCompleted, onComplete, saveProgress]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (initialWatchedSeconds > 0 && !initialCompleted) {
      video.currentTime = initialWatchedSeconds;
    }

    const handleTimeUpdate = () => handleSaveProgress(video.currentTime);
    const handleEnded = () => handleSaveProgress(video.duration || durationSeconds || 0, true);
    const handlePause = () => handleSaveProgress(video.currentTime, true);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("pause", handlePause);
      if (video.currentTime > 0) handleSaveProgress(video.currentTime, true);
    };
  }, [handleSaveProgress, initialWatchedSeconds, initialCompleted, durationSeconds]);

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
