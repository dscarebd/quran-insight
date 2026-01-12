import { useState, useEffect, useCallback } from "react";
import { syncAllData, syncMasail, syncDuas, SyncProgress } from "@/services/syncService";
import { getSyncStatus } from "@/services/offlineDataService";

export interface OfflineBundleStatus {
  verses: number;
  hadiths: number;
  masail: number;
  duas: number;
  isComplete: boolean;
  isSyncing: boolean;
  currentType: "verses" | "hadiths" | "masail" | "duas" | null;
  progress: number;
  total: number;
  error: string | null;
  lastSyncTime: string | null;
}

const BUNDLE_SYNC_KEY = "offline-bundle-last-sync";
const MIN_VERSES = 6200;
const MIN_HADITHS = 36000;
const MIN_MASAIL = 100;
const MIN_DUAS = 50;

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

  // Check current sync status
  const checkStatus = useCallback(async () => {
    try {
      const { verses, hadiths, masail, duas } = await getSyncStatus();
      const lastSync = localStorage.getItem(BUNDLE_SYNC_KEY);
      
      const isComplete = 
        verses >= MIN_VERSES && 
        hadiths >= MIN_HADITHS && 
        masail >= MIN_MASAIL && 
        duas >= MIN_DUAS;

      setStatus(prev => ({
        ...prev,
        verses,
        hadiths,
        masail,
        duas,
        isComplete,
        lastSyncTime: lastSync
      }));

      return { verses, hadiths, masail, duas, isComplete };
    } catch (e) {
      console.error("Error checking offline status:", e);
      return null;
    }
  }, []);

  // Progress callback for sync operations
  const handleProgress = useCallback((progress: SyncProgress) => {
    setStatus(prev => ({
      ...prev,
      currentType: progress.type,
      progress: progress.current,
      total: progress.total
    }));
  }, []);

  // Full sync of all data
  const syncAll = useCallback(async (force: boolean = false) => {
    if (!navigator.onLine) {
      console.log("Offline - cannot sync bundle");
      return { success: false, reason: "offline" };
    }

    // Check if already synced recently (within 24 hours) unless forced
    if (!force) {
      const lastSync = localStorage.getItem(BUNDLE_SYNC_KEY);
      if (lastSync) {
        const lastSyncTime = new Date(lastSync).getTime();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (now - lastSyncTime < oneDay) {
          const currentStatus = await checkStatus();
          if (currentStatus?.isComplete) {
            console.log("Bundle already synced within 24 hours");
            return { success: true, reason: "already-synced" };
          }
        }
      }
    }

    setStatus(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      // 1. Sync verses and hadiths (existing syncAllData)
      await syncAllData(handleProgress);

      // 2. Sync masail
      await syncMasail(handleProgress);

      // 3. Sync duas
      await syncDuas(handleProgress);

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

      console.log("Offline bundle sync complete");
      return { success: true };
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Sync failed";
      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        currentType: null,
        error: errorMessage
      }));
      console.error("Offline bundle sync error:", e);
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

  // Listen for online status changes
  useEffect(() => {
    const handleOnline = () => {
      if (autoSync) {
        syncAll(false);
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [autoSync, syncAll]);

  return {
    ...status,
    syncAll,
    checkStatus,
    refresh: checkStatus
  };
};
