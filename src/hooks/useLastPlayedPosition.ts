import { useState, useEffect, useCallback } from "react";
import { surahs } from "@/data/surahs";
import { getReciterById } from "@/data/reciters";

export interface LastPlayedPosition {
  surahNumber: number;
  verseNumber: number;
  reciterId: string;
  progress: number; // seconds into the verse
  timestamp: number; // when it was saved
}

const STORAGE_KEY = "quran-last-played-position";
const MAX_AGE_DAYS = 30; // Clear after 30 days

export const useLastPlayedPosition = () => {
  const [lastPosition, setLastPosition] = useState<LastPlayedPosition | null>(null);

  // Load last position from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const position: LastPlayedPosition = JSON.parse(stored);
        
        // Check if position is still valid (not too old)
        const ageInDays = (Date.now() - position.timestamp) / (1000 * 60 * 60 * 24);
        if (ageInDays < MAX_AGE_DAYS) {
          setLastPosition(position);
        } else {
          // Clear old position
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn("Failed to load last played position:", error);
    }
  }, []);

  // Save position
  const savePosition = useCallback((
    surahNumber: number,
    verseNumber: number,
    reciterId: string,
    progress: number = 0
  ) => {
    const position: LastPlayedPosition = {
      surahNumber,
      verseNumber,
      reciterId,
      progress,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      setLastPosition(position);
    } catch (error) {
      console.warn("Failed to save last played position:", error);
    }
  }, []);

  // Clear saved position
  const clearPosition = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastPosition(null);
    } catch (error) {
      console.warn("Failed to clear last played position:", error);
    }
  }, []);

  // Get formatted position info for display
  const getPositionInfo = useCallback(() => {
    if (!lastPosition) return null;

    const surah = surahs.find(s => s.number === lastPosition.surahNumber);
    const reciter = getReciterById(lastPosition.reciterId);

    if (!surah) return null;

    return {
      surah,
      verseNumber: lastPosition.verseNumber,
      reciter,
      progress: lastPosition.progress,
      timestamp: lastPosition.timestamp,
      // Time since saved
      timeAgo: getTimeAgo(lastPosition.timestamp),
    };
  }, [lastPosition]);

  return {
    lastPosition,
    positionInfo: getPositionInfo(),
    hasLastPosition: lastPosition !== null,
    savePosition,
    clearPosition,
  };
};

// Helper to format time ago
function getTimeAgo(timestamp: number): { en: string; bn: string } {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) {
    return { en: "Just now", bn: "এইমাত্র" };
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return { 
      en: `${minutes} min ago`, 
      bn: `${toBengaliNumber(minutes)} মিনিট আগে` 
    };
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return { 
      en: `${hours}h ago`, 
      bn: `${toBengaliNumber(hours)} ঘণ্টা আগে` 
    };
  }
  
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return { 
      en: `${days}d ago`, 
      bn: `${toBengaliNumber(days)} দিন আগে` 
    };
  }
  
  const weeks = Math.floor(days / 7);
  return { 
    en: `${weeks}w ago`, 
    bn: `${toBengaliNumber(weeks)} সপ্তাহ আগে` 
  };
}

// Convert to Bengali numerals
function toBengaliNumber(num: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
}
