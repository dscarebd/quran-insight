import { useState, useEffect, useCallback } from "react";

const RATE_LIMIT_KEY = "auth_rate_limit";
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface RateLimitState {
  attempts: number;
  lockoutUntil: number | null;
}

export const useRateLimit = () => {
  const [state, setState] = useState<RateLimitState>(() => {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if lockout has expired
        if (parsed.lockoutUntil && Date.now() > parsed.lockoutUntil) {
          return { attempts: 0, lockoutUntil: null };
        }
        return parsed;
      } catch {
        return { attempts: 0, lockoutUntil: null };
      }
    }
    return { attempts: 0, lockoutUntil: null };
  });

  const [remainingTime, setRemainingTime] = useState<number>(0);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
  }, [state]);

  // Countdown timer for lockout
  useEffect(() => {
    if (state.lockoutUntil) {
      const updateRemainingTime = () => {
        const remaining = Math.max(0, state.lockoutUntil! - Date.now());
        setRemainingTime(remaining);
        
        if (remaining === 0) {
          setState({ attempts: 0, lockoutUntil: null });
        }
      };

      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(interval);
    } else {
      setRemainingTime(0);
    }
  }, [state.lockoutUntil]);

  const isLocked = state.lockoutUntil !== null && Date.now() < state.lockoutUntil;
  const attemptsRemaining = MAX_ATTEMPTS - state.attempts;

  const recordAttempt = useCallback(() => {
    setState((prev) => {
      const newAttempts = prev.attempts + 1;
      if (newAttempts >= MAX_ATTEMPTS) {
        return {
          attempts: newAttempts,
          lockoutUntil: Date.now() + LOCKOUT_DURATION_MS,
        };
      }
      return { ...prev, attempts: newAttempts };
    });
  }, []);

  const resetAttempts = useCallback(() => {
    setState({ attempts: 0, lockoutUntil: null });
  }, []);

  const formatRemainingTime = useCallback(() => {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [remainingTime]);

  return {
    isLocked,
    attemptsRemaining,
    remainingTime,
    formatRemainingTime,
    recordAttempt,
    resetAttempts,
  };
};
