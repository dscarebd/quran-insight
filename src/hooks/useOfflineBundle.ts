import { useState, useEffect, useCallback } from "react";
import { 
  getBundledDataStatus, 
  initializeVersesData, 
  initializeHadithsData,
  initializeDuasData,
  initializeMasailData
} from "@/services/bundledDataLoader";

export interface OfflineBundleStatus {
  verses: number;
  hadiths: number;
  masail: number;
  duas: number;
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useOfflineBundle = (autoLoad: boolean = true) => {
  const [status, setStatus] = useState<OfflineBundleStatus>({
    verses: 0,
    hadiths: 0,
    masail: 0,
    duas: 0,
    isComplete: false,
    isLoading: true,
    error: null
  });

  // Load all bundled data
  const loadBundledData = useCallback(async () => {
    try {
      setStatus(prev => ({ ...prev, isLoading: true, error: null }));

      // Initialize all bundled data loaders in parallel
      await Promise.all([
        initializeVersesData(),
        initializeHadithsData(),
        initializeDuasData(),
        initializeMasailData()
      ]);

      // Get bundled data counts
      const bundledStatus = getBundledDataStatus();
      
      // Complete if all bundled data is loaded
      const isComplete = 
        bundledStatus.versesCount >= 6200 && 
        bundledStatus.hadithsCount >= 36000 && 
        bundledStatus.duasCount >= 50 &&
        bundledStatus.masailCount >= 100;

      setStatus({
        verses: bundledStatus.versesCount,
        hadiths: bundledStatus.hadithsCount,
        duas: bundledStatus.duasCount,
        masail: bundledStatus.masailCount,
        isComplete,
        isLoading: false,
        error: null
      });

      console.log(`Bundled data loaded: ${bundledStatus.versesCount} verses, ${bundledStatus.hadithsCount} hadiths, ${bundledStatus.duasCount} duas, ${bundledStatus.masailCount} masail`);

      return { 
        verses: bundledStatus.versesCount, 
        hadiths: bundledStatus.hadithsCount, 
        duas: bundledStatus.duasCount,
        masail: bundledStatus.masailCount, 
        isComplete 
      };
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to load bundled data";
      console.error("Error loading bundled data:", e);
      setStatus(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return null;
    }
  }, []);

  // Load bundled data on mount
  useEffect(() => {
    if (autoLoad) {
      loadBundledData();
    }
  }, [autoLoad, loadBundledData]);

  return {
    ...status,
    refresh: loadBundledData,
    checkStatus: loadBundledData
  };
};
