import { useState, useCallback } from "react";
import { duaAudioMapping, dailyDuaAudioMapping, getDuaAudioUrl } from "@/data/duaAudioMapping";
import { cacheDuaAudio, isDuaAudioCached } from "@/services/duaAudioService";

export interface DownloadProgress {
  total: number;
  downloaded: number;
  failed: number;
  inProgress: boolean;
  currentFile: string | null;
}

// Get all unique audio numbers from both mappings
const getAllAudioNumbers = (): number[] => {
  const mainNumbers = Object.values(duaAudioMapping);
  const dailyNumbers = Object.values(dailyDuaAudioMapping);
  // Remove duplicates
  return [...new Set([...mainNumbers, ...dailyNumbers])];
};

export const useDuaOfflineDownload = () => {
  const [progress, setProgress] = useState<DownloadProgress>({
    total: 0,
    downloaded: 0,
    failed: 0,
    inProgress: false,
    currentFile: null,
  });

  const [cachedCount, setCachedCount] = useState<number>(0);
  const [isCheckingCache, setIsCheckingCache] = useState(false);

  // Check how many files are already cached
  const checkCachedFiles = useCallback(async () => {
    setIsCheckingCache(true);
    const audioNumbers = getAllAudioNumbers();
    let cached = 0;

    for (const num of audioNumbers) {
      const isCached = await isDuaAudioCached(num);
      if (isCached) cached++;
    }

    setCachedCount(cached);
    setIsCheckingCache(false);
    return cached;
  }, []);

  // Download all audio files
  const downloadAllAudio = useCallback(async () => {
    const audioNumbers = getAllAudioNumbers();
    
    setProgress({
      total: audioNumbers.length,
      downloaded: 0,
      failed: 0,
      inProgress: true,
      currentFile: null,
    });

    let downloaded = 0;
    let failed = 0;

    for (const audioNumber of audioNumbers) {
      // Check if already cached
      const isCached = await isDuaAudioCached(audioNumber);
      if (isCached) {
        downloaded++;
        setProgress(prev => ({
          ...prev,
          downloaded,
          currentFile: `n${audioNumber}.mp3 (cached)`,
        }));
        continue;
      }

      // Download and cache
      const url = getDuaAudioUrl(audioNumber);
      setProgress(prev => ({
        ...prev,
        currentFile: `n${audioNumber}.mp3`,
      }));

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        await cacheDuaAudio(audioNumber, blob);
        downloaded++;
      } catch (error) {
        console.error(`Failed to download n${audioNumber}.mp3:`, error);
        failed++;
      }

      setProgress(prev => ({
        ...prev,
        downloaded,
        failed,
      }));
    }

    setProgress(prev => ({
      ...prev,
      inProgress: false,
      currentFile: null,
    }));

    setCachedCount(downloaded);
    return { downloaded, failed };
  }, []);

  // Cancel download (just stops the flag - actual cancellation requires AbortController)
  const cancelDownload = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      inProgress: false,
      currentFile: null,
    }));
  }, []);

  // Clear all cached audio
  const clearCache = useCallback(async () => {
    try {
      const request = indexedDB.deleteDatabase("duaAudioCache");
      return new Promise<void>((resolve, reject) => {
        request.onsuccess = () => {
          setCachedCount(0);
          resolve();
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }, []);

  const totalAudioFiles = getAllAudioNumbers().length;

  return {
    progress,
    cachedCount,
    totalAudioFiles,
    isCheckingCache,
    downloadAllAudio,
    cancelDownload,
    clearCache,
    checkCachedFiles,
  };
};
