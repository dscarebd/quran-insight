import { useState, useEffect, useCallback } from "react";
import { 
  getBundledDataStatus, 
  initializeVersesData, 
  initializeHadithsData,
  initializeDuasData,
  initializeMasailData,
  addMasailToCache
} from "@/services/bundledDataLoader";
import { saveMasail, LocalMasail } from "@/services/offlineDataService";
import { supabase } from "@/integrations/supabase/client";

export interface OfflineBundleStatus {
  verses: number;
  hadiths: number;
  masail: number;
  duas: number;
  isComplete: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  currentType: "masail" | null;
  progress: number;
  total: number;
  error: string | null;
  lastSyncTime: string | null;
}

const MASAIL_SYNC_KEY = "last-masail-incremental-sync";
const BUNDLED_MASAIL_DATE = "2026-01-09T06:17:10.826965+00:00";

export const useOfflineBundle = (autoSync: boolean = true) => {
  const [status, setStatus] = useState<OfflineBundleStatus>({
    verses: 0,
    hadiths: 0,
    masail: 0,
    duas: 0,
    isComplete: false,
    isLoading: true,
    isSyncing: false,
    currentType: null,
    progress: 0,
    total: 0,
    error: null,
    lastSyncTime: localStorage.getItem(MASAIL_SYNC_KEY)
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

      setStatus(prev => ({
        ...prev,
        verses: bundledStatus.versesCount,
        hadiths: bundledStatus.hadithsCount,
        duas: bundledStatus.duasCount,
        masail: bundledStatus.masailCount,
        isComplete,
        isLoading: false,
        error: null
      }));

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

  // Sync new masail from server (incremental)
  const syncAll = useCallback(async (force: boolean = false) => {
    if (!navigator.onLine) {
      console.log("Offline - cannot sync");
      return { success: false, reason: "offline" };
    }

    // Check if already synced today unless forced
    if (!force) {
      const lastSync = localStorage.getItem(MASAIL_SYNC_KEY);
      if (lastSync) {
        const lastSyncDate = new Date(lastSync).toDateString();
        const todayDate = new Date().toDateString();
        if (lastSyncDate === todayDate) {
          console.log("Already synced today");
          return { success: true, reason: "already-synced-today" };
        }
      }
    }

    setStatus(prev => ({ ...prev, isSyncing: true, currentType: "masail", error: null }));

    try {
      // Get the latest sync timestamp or use bundled date
      const lastSync = localStorage.getItem(MASAIL_SYNC_KEY) || BUNDLED_MASAIL_DATE;
      
      // Get count of new masail first
      const { count: totalNew } = await supabase
        .from("masail")
        .select("*", { count: "exact", head: true })
        .gt("updated_at", lastSync);

      setStatus(prev => ({ ...prev, total: totalNew || 0, progress: 0 }));

      // Fetch new masail
      const { data: newMasail, error } = await supabase
        .from("masail")
        .select("*")
        .gt("updated_at", lastSync)
        .order("updated_at", { ascending: true });

      if (error) throw error;

      if (newMasail && newMasail.length > 0) {
        console.log(`Found ${newMasail.length} new/updated masail`);
        
        // Add to memory cache
        addMasailToCache(newMasail as LocalMasail[]);
        
        // Save to IndexedDB for persistence
        await saveMasail(newMasail as LocalMasail[]);
        
        setStatus(prev => ({ ...prev, progress: newMasail.length }));
        
        // Update last sync time
        const latestUpdate = newMasail[newMasail.length - 1].updated_at;
        localStorage.setItem(MASAIL_SYNC_KEY, latestUpdate);
      } else {
        console.log("No new masail to sync");
        localStorage.setItem(MASAIL_SYNC_KEY, new Date().toISOString());
      }

      // Refresh bundled data status
      const bundledStatus = getBundledDataStatus();
      
      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        currentType: null,
        masail: bundledStatus.masailCount,
        lastSyncTime: localStorage.getItem(MASAIL_SYNC_KEY)
      }));

      return { success: true };
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Sync failed";
      console.error("Masail sync error:", e);
      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        currentType: null,
        error: errorMessage
      }));
      return { success: false, reason: errorMessage };
    }
  }, []);

  // Load bundled data on mount, then sync new masail
  useEffect(() => {
    const init = async () => {
      await loadBundledData();
      
      // Auto-sync new masail if enabled and online
      if (autoSync && navigator.onLine) {
        // Delay sync to not block initial render
        setTimeout(() => {
          syncAll(false);
        }, 3000);
      }
    };
    
    init();
  }, [autoSync, loadBundledData, syncAll]);

  return {
    ...status,
    syncAll,
    refresh: loadBundledData,
    checkStatus: loadBundledData
  };
};
