import { useState, useEffect, useCallback } from "react";
import { syncMasail, SyncProgress } from "@/services/syncService";
import { getMasailCount } from "@/services/offlineDataService";
import { 
  getBundledDataStatus, 
  initializeVersesData, 
  initializeHadithsData,
  initializeDuasData
} from "@/services/bundledDataLoader";

export interface OfflineBundleStatus {
  verses: number;
  hadiths: number;
  masail: number;
  duas: number;
  isComplete: boolean;
  isSyncing: boolean;
  currentType: "masail" | null;
  progress: number;
  total: number;
  error: string | null;
  lastSyncTime: string | null;
}

const BUNDLE_SYNC_KEY = "offline-bundle-last-sync";
const MIN_MASAIL = 100;

export const useOfflineBundle = (autoSync: boolean = true) => {
  const [status, setStatus] = useState<OfflineBundleStatus>({
    verses: 0,
    hadiths: 0,
    masail: 0,
    duas: 0,
    isComplete: false,
    isSyncing: false,
    currentType: null,
    progress: 0,
    total: 0,
    error: null,
    lastSyncTime: null
  });

  // Check current sync status - get bundled data counts + synced masail count
  const checkStatus = useCallback(async () => {
    try {
      // Initialize bundled data loaders if not already done
      await Promise.all([
        initializeVersesData(),
        initializeHadithsData(),
        initializeDuasData()
      ]);

      // Get bundled data counts
      const bundledStatus = getBundledDataStatus();
      
      // Get synced masail count from IndexedDB
      const masailCount = await getMasailCount();
      
      const lastSync = localStorage.getItem(BUNDLE_SYNC_KEY);
      
      // Complete if bundled data is loaded and masail is synced
      const isComplete = 
        bundledStatus.versesCount >= 6200 && 
        bundledStatus.hadithsCount >= 36000 && 
        bundledStatus.duasCount >= 50 &&
        masailCount >= MIN_MASAIL;

      setStatus(prev => ({
        ...prev,
        verses: bundledStatus.versesCount,
        hadiths: bundledStatus.hadithsCount,
        duas: bundledStatus.duasCount,
        masail: masailCount,
        isComplete,
        lastSyncTime: lastSync
      }));

      return { 
        verses: bundledStatus.versesCount, 
        hadiths: bundledStatus.hadithsCount, 
        duas: bundledStatus.duasCount,
        masail: masailCount, 
        isComplete 
      };
    } catch (e) {
      console.error("Error checking offline status:", e);
      return null;
    }
  }, []);

  // Progress callback for sync operations
  const handleProgress = useCallback((progress: SyncProgress) => {
    setStatus(prev => ({
      ...prev,
      currentType: progress.type as "masail" | null,
      progress: progress.current,
      total: progress.total
    }));
  }, []);

  // Sync only masail (verses, hadiths, duas are bundled)
  const syncAll = useCallback(async (force: boolean = false) => {
    if (!navigator.onLine) {
      console.log("Offline - cannot sync");
      return { success: false, reason: "offline" };
    }

    // Check if already synced today (same calendar day) unless forced
    if (!force) {
      const lastSync = localStorage.getItem(BUNDLE_SYNC_KEY);
      if (lastSync) {
        const lastSyncDate = new Date(lastSync).toDateString();
        const todayDate = new Date().toDateString();
        
        // Skip if already synced today
        if (lastSyncDate === todayDate) {
          console.log("Already synced today");
          await checkStatus();
          return { success: true, reason: "already-synced-today" };
        }
      }
    }

    setStatus(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      // Only sync masail - verses, hadiths, duas are bundled in APK
      await syncMasail(handleProgress);

      // Update last sync time
      const now = new Date().toISOString();
      localStorage.setItem(BUNDLE_SYNC_KEY, now);

      // Refresh status
      await checkStatus();

      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        currentType: null,
        lastSyncTime: now
      }));

      console.log("Offline sync complete (masail only)");
      return { success: true };
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Sync failed";
      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        currentType: null,
        error: errorMessage
      }));
      console.error("Offline sync error:", e);
      return { success: false, reason: errorMessage };
    }
  }, [checkStatus, handleProgress]);

  // Auto-sync on mount if enabled
  useEffect(() => {
    checkStatus();

    if (autoSync && navigator.onLine) {
      // Delay sync to not block initial render
      const timer = setTimeout(() => {
        syncAll(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [autoSync, checkStatus, syncAll]);

  return {
    ...status,
    syncAll,
    checkStatus,
    refresh: checkStatus
  };
};
