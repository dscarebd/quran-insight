// All LMS progress is stored in localStorage.
// Structure: { [lessonId]: { watched_seconds, is_completed, completed_at } }

import { useState, useCallback } from "react";

const PROGRESS_KEY = "lms-progress";

export interface LocalLessonProgress {
  lesson_id: string;
  course_id: string;
  watched_seconds: number;
  is_completed: boolean;
  completed_at: string | null;
}

function readAll(): Record<string, LocalLessonProgress> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, LocalLessonProgress>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function useLmsLocalProgress() {
  const [, forceUpdate] = useState(0);

  const getProgress = useCallback(
    (lessonId: string): LocalLessonProgress | undefined => readAll()[lessonId],
    []
  );

  const getAllProgress = useCallback(
    (courseId?: string): LocalLessonProgress[] => {
      const all = Object.values(readAll());
      if (courseId) return all.filter((p) => p.course_id === courseId);
      return all;
    },
    []
  );

  const saveProgress = useCallback(
    (
      lessonId: string,
      courseId: string,
      watchedSeconds: number,
      durationSeconds: number | null
    ): boolean => {
      const all = readAll();
      const existing = all[lessonId];

      // Mark complete if watched >= 95% of duration
      const threshold = durationSeconds ? durationSeconds * 0.95 : null;
      const wasCompleted = existing?.is_completed || false;
      const isCompleted =
        wasCompleted ||
        (threshold !== null && watchedSeconds >= threshold);

      all[lessonId] = {
        lesson_id: lessonId,
        course_id: courseId,
        watched_seconds: Math.max(watchedSeconds, existing?.watched_seconds || 0),
        is_completed: isCompleted,
        completed_at:
          isCompleted && !wasCompleted
            ? new Date().toISOString()
            : existing?.completed_at || null,
      };

      writeAll(all);
      forceUpdate((n) => n + 1);
      return isCompleted && !wasCompleted; // true = newly completed
    },
    []
  );

  const markComplete = useCallback((lessonId: string, courseId: string) => {
    const all = readAll();
    all[lessonId] = {
      lesson_id: lessonId,
      course_id: courseId,
      watched_seconds: all[lessonId]?.watched_seconds || 0,
      is_completed: true,
      completed_at: all[lessonId]?.completed_at || new Date().toISOString(),
    };
    writeAll(all);
    forceUpdate((n) => n + 1);
  }, []);

  return { getProgress, getAllProgress, saveProgress, markComplete };
}
