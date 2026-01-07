import { useState, useRef, useCallback, useEffect } from "react";
import { fetchDuaAudio } from "@/services/duaAudioService";
import { 
  hasDuaAudio, 
  hasDailyDuaAudio, 
  getDuaAudioNumber, 
  getDailyDuaAudioNumber 
} from "@/data/duaAudioMapping";

export type PlaybackSpeed = 0.75 | 1 | 1.25;

interface DuaAudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentDuaId: string | null;
  progress: number;
  duration: number;
  playbackSpeed: PlaybackSpeed;
  error: string | null;
}

interface UseDuaAudioOptions {
  isDailyDua?: boolean; // Use dailyDuaAudioMapping instead of duaAudioMapping
}

export const useDuaAudio = (options: UseDuaAudioOptions = {}) => {
  const { isDailyDua = false } = options;
  
  const [state, setState] = useState<DuaAudioState>({
    isPlaying: false,
    isLoading: false,
    currentDuaId: null,
    progress: 0,
    duration: 0,
    playbackSpeed: 1,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Start progress tracking
  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        setState((prev) => ({
          ...prev,
          progress: audioRef.current?.currentTime || 0,
          duration: audioRef.current?.duration || 0,
        }));
      }
    }, 100);
  }, []);

  // Stop progress tracking
  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Check if dua has audio
  const hasAudio = useCallback((duaId: string): boolean => {
    return isDailyDua ? hasDailyDuaAudio(duaId) : hasDuaAudio(duaId);
  }, [isDailyDua]);

  // Get audio number for dua
  const getAudioNumber = useCallback((duaId: string): number | null => {
    return isDailyDua ? getDailyDuaAudioNumber(duaId) : getDuaAudioNumber(duaId);
  }, [isDailyDua]);

  // Play dua
  const playDua = useCallback(async (duaId: string) => {
    const audioNumber = getAudioNumber(duaId);
    
    if (!audioNumber) {
      setState((prev) => ({
        ...prev,
        error: "No audio available for this dua",
      }));
      return;
    }

    // If same dua is playing, just resume
    if (state.currentDuaId === duaId && audioRef.current && !state.isPlaying) {
      audioRef.current.play();
      setState((prev) => ({ ...prev, isPlaying: true }));
      startProgressTracking();
      return;
    }

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    stopProgressTracking();

    setState((prev) => ({
      ...prev,
      isLoading: true,
      currentDuaId: duaId,
      error: null,
      progress: 0,
      duration: 0,
    }));

    try {
      const audioBlob = await fetchDuaAudio(audioNumber);
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.playbackRate = state.playbackSpeed;
      audioRef.current = audio;

      // Set up event listeners
      audio.onloadedmetadata = () => {
        setState((prev) => ({
          ...prev,
          duration: audio.duration,
        }));
      };

      audio.onplay = () => {
        setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
        startProgressTracking();
      };

      audio.onpause = () => {
        setState((prev) => ({ ...prev, isPlaying: false }));
        stopProgressTracking();
      };

      audio.onended = () => {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          progress: 0,
        }));
        stopProgressTracking();
      };

      audio.onerror = () => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isPlaying: false,
          error: "Failed to play audio",
        }));
        stopProgressTracking();
      };

      await audio.play();
    } catch (error) {
      console.error("Failed to play dua audio:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: "Failed to load audio",
      }));
    }
  }, [state.currentDuaId, state.isPlaying, state.playbackSpeed, getAudioNumber, startProgressTracking, stopProgressTracking]);

  // Pause
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // Resume
  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  // Stop
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopProgressTracking();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      progress: 0,
      currentDuaId: null,
    }));
  }, [stopProgressTracking]);

  // Toggle play/pause
  const togglePlay = useCallback((duaId: string) => {
    if (state.currentDuaId === duaId && state.isPlaying) {
      pause();
    } else if (state.currentDuaId === duaId && !state.isPlaying) {
      resume();
    } else {
      playDua(duaId);
    }
  }, [state.currentDuaId, state.isPlaying, pause, resume, playDua]);

  // Set playback speed
  const setPlaybackSpeed = useCallback((speed: PlaybackSpeed) => {
    setState((prev) => ({ ...prev, playbackSpeed: speed }));
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  // Cycle playback speed
  const cyclePlaybackSpeed = useCallback(() => {
    const speeds: PlaybackSpeed[] = [0.75, 1, 1.25];
    const currentIndex = speeds.indexOf(state.playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  }, [state.playbackSpeed, setPlaybackSpeed]);

  // Seek to position
  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, progress: time }));
    }
  }, []);

  return {
    ...state,
    hasAudio,
    playDua,
    pause,
    resume,
    stop,
    togglePlay,
    setPlaybackSpeed,
    cyclePlaybackSpeed,
    seek,
  };
};
