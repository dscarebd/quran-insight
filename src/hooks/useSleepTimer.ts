import { useState, useRef, useCallback, useEffect } from "react";

export type SleepTimerDuration = 5 | 10 | 15 | 30 | 60 | null;

interface SleepTimerState {
  isActive: boolean;
  duration: SleepTimerDuration;
  remainingSeconds: number;
}

interface UseSleepTimerOptions {
  onTimerEnd?: () => void;
}

export const useSleepTimer = (options: UseSleepTimerOptions = {}) => {
  const { onTimerEnd } = options;
  
  const [state, setState] = useState<SleepTimerState>({
    isActive: false,
    duration: null,
    remainingSeconds: 0,
  });

  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    endTimeRef.current = null;
  }, []);

  const stopTimer = useCallback(() => {
    clearTimer();
    setState({
      isActive: false,
      duration: null,
      remainingSeconds: 0,
    });
  }, [clearTimer]);

  const startTimer = useCallback((minutes: SleepTimerDuration) => {
    if (!minutes) {
      stopTimer();
      return;
    }

    clearTimer();

    const totalSeconds = minutes * 60;
    endTimeRef.current = Date.now() + totalSeconds * 1000;

    setState({
      isActive: true,
      duration: minutes,
      remainingSeconds: totalSeconds,
    });

    // Update remaining time every second
    intervalRef.current = window.setInterval(() => {
      if (!endTimeRef.current) return;

      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      
      if (remaining <= 0) {
        stopTimer();
        onTimerEnd?.();
      } else {
        setState(prev => ({
          ...prev,
          remainingSeconds: remaining,
        }));
      }
    }, 1000);
  }, [clearTimer, stopTimer, onTimerEnd]);

  const toggleTimer = useCallback((minutes: SleepTimerDuration) => {
    if (state.isActive && state.duration === minutes) {
      stopTimer();
    } else {
      startTimer(minutes);
    }
  }, [state.isActive, state.duration, startTimer, stopTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  // Format remaining time as MM:SS
  const formatRemainingTime = useCallback((): string => {
    const mins = Math.floor(state.remainingSeconds / 60);
    const secs = state.remainingSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, [state.remainingSeconds]);

  return {
    isActive: state.isActive,
    duration: state.duration,
    remainingSeconds: state.remainingSeconds,
    formattedTime: formatRemainingTime(),
    startTimer,
    stopTimer,
    toggleTimer,
  };
};

export const SLEEP_TIMER_OPTIONS: { value: SleepTimerDuration; label: string; labelBn: string }[] = [
  { value: 5, label: "5 min", labelBn: "৫ মিনিট" },
  { value: 10, label: "10 min", labelBn: "১০ মিনিট" },
  { value: 15, label: "15 min", labelBn: "১৫ মিনিট" },
  { value: 30, label: "30 min", labelBn: "৩০ মিনিট" },
  { value: 60, label: "60 min", labelBn: "৬০ মিনিট" },
];
