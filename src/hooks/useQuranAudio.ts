import { useState, useRef, useCallback, useEffect } from "react";
import { 
  getAudioUrl, 
  getCachedAudio, 
  cacheAudio, 
  isAudioCached 
} from "@/services/quranAudioService";
import { DEFAULT_RECITER_ID } from "@/data/reciters";

export type RepeatMode = "none" | "verse" | "surah" | "ab";

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSurah: number | null;
  currentVerse: number | null;
  progress: number;
  duration: number;
  error: string | null;
  repeatMode: RepeatMode;
  abRepeatStart: number | null;
  abRepeatEnd: number | null;
}

interface UseQuranAudioOptions {
  autoPlayNext?: boolean;
  onVerseEnd?: (surahNumber: number, verseNumber: number) => void;
  onVerseStart?: (surahNumber: number, verseNumber: number) => void;
}

export const useQuranAudio = (options: UseQuranAudioOptions = {}) => {
  const { autoPlayNext = true, onVerseEnd, onVerseStart } = options;
  
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentSurah: null,
    currentVerse: null,
    progress: 0,
    duration: 0,
    error: null,
    repeatMode: "none",
    abRepeatStart: null,
    abRepeatEnd: null
  });

  const [reciterId, setReciterId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("quran-reciter") || DEFAULT_RECITER_ID;
    }
    return DEFAULT_RECITER_ID;
  });

  const [totalVerses, setTotalVerses] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Persist reciter selection
  useEffect(() => {
    localStorage.setItem("quran-reciter", reciterId);
  }, [reciterId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      setState(prev => ({
        ...prev,
        progress: audioRef.current?.currentTime || 0,
        duration: audioRef.current?.duration || 0
      }));
    }
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgressTracking = useCallback(() => {
    stopProgressTracking();
    progressIntervalRef.current = window.setInterval(updateProgress, 100);
  }, [stopProgressTracking, updateProgress]);

  const playVerse = useCallback(async (
    surahNumber: number,
    verseNumber: number,
    versesCount?: number
  ) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null,
        currentSurah: surahNumber,
        currentVerse: verseNumber
      }));

      if (versesCount) {
        setTotalVerses(versesCount);
      }

      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        stopProgressTracking();
      }

      // Try to get cached audio first
      let audioSource: string;
      const cachedBlob = await getCachedAudio(surahNumber, verseNumber, reciterId);
      
      if (cachedBlob) {
        audioSource = URL.createObjectURL(cachedBlob);
      } else {
        audioSource = getAudioUrl(surahNumber, verseNumber, reciterId);
      }

      // Create audio element
      const audio = new Audio(audioSource);
      audioRef.current = audio;

      // Set up event listeners
      audio.onloadeddata = () => {
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          duration: audio.duration 
        }));
      };

      audio.onplay = () => {
        setState(prev => ({ ...prev, isPlaying: true }));
        startProgressTracking();
        onVerseStart?.(surahNumber, verseNumber);
      };

      audio.onpause = () => {
        setState(prev => ({ ...prev, isPlaying: false }));
        stopProgressTracking();
      };

      audio.onended = async () => {
        setState(prev => ({ ...prev, isPlaying: false, progress: 0 }));
        stopProgressTracking();
        onVerseEnd?.(surahNumber, verseNumber);

        // Cache the audio if it wasn't cached
        if (!cachedBlob) {
          try {
            const response = await fetch(audioSource);
            const blob = await response.blob();
            await cacheAudio(surahNumber, verseNumber, reciterId, blob);
          } catch {
            // Silently fail caching
          }
        }

        // Handle repeat modes
        const { repeatMode, abRepeatStart, abRepeatEnd } = state;

        if (repeatMode === "verse") {
          // Repeat current verse
          playVerse(surahNumber, verseNumber, versesCount);
        } else if (repeatMode === "ab" && abRepeatStart !== null && abRepeatEnd !== null) {
          // A-B repeat mode
          if (verseNumber < abRepeatEnd) {
            playVerse(surahNumber, verseNumber + 1, versesCount);
          } else {
            // Loop back to start
            playVerse(surahNumber, abRepeatStart, versesCount);
          }
        } else if (repeatMode === "surah") {
          // Repeat surah - go to next verse or loop to beginning
          if (versesCount && verseNumber < versesCount) {
            playVerse(surahNumber, verseNumber + 1, versesCount);
          } else {
            playVerse(surahNumber, 1, versesCount);
          }
        } else if (autoPlayNext && versesCount && verseNumber < versesCount) {
          // Normal auto-play next
          playVerse(surahNumber, verseNumber + 1, versesCount);
        }
      };

      audio.onerror = () => {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          isPlaying: false,
          error: "Failed to load audio" 
        }));
        stopProgressTracking();
      };

      // Play
      await audio.play();

    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isPlaying: false,
        error: error instanceof Error ? error.message : "Failed to play audio" 
      }));
    }
  }, [reciterId, autoPlayNext, onVerseEnd, onVerseStart, startProgressTracking, stopProgressTracking]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    stopProgressTracking();
    setState({
      isPlaying: false,
      isLoading: false,
      currentSurah: null,
      currentVerse: null,
      progress: 0,
      duration: 0,
      error: null,
      repeatMode: "none",
      abRepeatStart: null,
      abRepeatEnd: null
    });
  }, [stopProgressTracking]);

  const togglePlay = useCallback((
    surahNumber: number,
    verseNumber: number,
    versesCount?: number
  ) => {
    if (state.currentSurah === surahNumber && state.currentVerse === verseNumber) {
      if (state.isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      playVerse(surahNumber, verseNumber, versesCount);
    }
  }, [state.currentSurah, state.currentVerse, state.isPlaying, pause, resume, playVerse]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      updateProgress();
    }
  }, [updateProgress]);

  const playPrevious = useCallback(() => {
    if (state.currentSurah && state.currentVerse && state.currentVerse > 1) {
      playVerse(state.currentSurah, state.currentVerse - 1, totalVerses);
    }
  }, [state.currentSurah, state.currentVerse, totalVerses, playVerse]);

  const playNext = useCallback(() => {
    if (state.currentSurah && state.currentVerse && state.currentVerse < totalVerses) {
      playVerse(state.currentSurah, state.currentVerse + 1, totalVerses);
    }
  }, [state.currentSurah, state.currentVerse, totalVerses, playVerse]);

  const isCurrentVerse = useCallback((surahNumber: number, verseNumber: number) => {
    return state.currentSurah === surahNumber && state.currentVerse === verseNumber;
  }, [state.currentSurah, state.currentVerse]);

  // Repeat mode controls
  const setRepeatMode = useCallback((mode: RepeatMode) => {
    setState(prev => ({ 
      ...prev, 
      repeatMode: mode,
      // Clear A-B range when switching away from A-B mode
      abRepeatStart: mode === "ab" ? prev.abRepeatStart : null,
      abRepeatEnd: mode === "ab" ? prev.abRepeatEnd : null
    }));
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setState(prev => {
      const modes: RepeatMode[] = ["none", "verse", "surah", "ab"];
      const currentIndex = modes.indexOf(prev.repeatMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      return { 
        ...prev, 
        repeatMode: nextMode,
        abRepeatStart: nextMode === "ab" ? prev.currentVerse : null,
        abRepeatEnd: null
      };
    });
  }, []);

  const setABRepeatStart = useCallback((verse: number) => {
    setState(prev => ({ 
      ...prev, 
      abRepeatStart: verse,
      abRepeatEnd: prev.abRepeatEnd && prev.abRepeatEnd <= verse ? null : prev.abRepeatEnd
    }));
  }, []);

  const setABRepeatEnd = useCallback((verse: number) => {
    setState(prev => ({ 
      ...prev, 
      abRepeatEnd: verse >= (prev.abRepeatStart || 1) ? verse : prev.abRepeatEnd
    }));
  }, []);

  const clearABRepeat = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      repeatMode: "none",
      abRepeatStart: null, 
      abRepeatEnd: null 
    }));
  }, []);

  const isInABRange = useCallback((verseNumber: number) => {
    const { abRepeatStart, abRepeatEnd } = state;
    if (abRepeatStart === null) return false;
    if (abRepeatEnd === null) return verseNumber === abRepeatStart;
    return verseNumber >= abRepeatStart && verseNumber <= abRepeatEnd;
  }, [state.abRepeatStart, state.abRepeatEnd]);

  return {
    ...state,
    reciterId,
    setReciterId,
    playVerse,
    pause,
    resume,
    stop,
    togglePlay,
    seek,
    playPrevious,
    playNext,
    isCurrentVerse,
    canPlayPrevious: state.currentVerse !== null && state.currentVerse > 1,
    canPlayNext: state.currentVerse !== null && state.currentVerse < totalVerses,
    // Repeat controls
    setRepeatMode,
    cycleRepeatMode,
    setABRepeatStart,
    setABRepeatEnd,
    clearABRepeat,
    isInABRange
  };
};
