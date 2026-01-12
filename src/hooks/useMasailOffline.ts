import { useState, useEffect, useCallback } from "react";
import { 
  saveMasail,
  getMasailCount,
  LocalMasail 
} from "@/services/offlineDataService";
import { 
  initializeMasailData,
  getAllBundledMasail,
  getBundledMasailById,
  isMasailDataLoaded,
  addMasailToCache,
  BundledMasail
} from "@/services/bundledDataLoader";
import { supabase } from "@/integrations/supabase/client";

export interface UseMasailOfflineResult {
  masailList: LocalMasail[];
  loading: boolean;
  isOffline: boolean;
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
  masailCount: number;
  newMasailCount: number;
  refresh: () => Promise<void>;
  getMasailById: (id: string) => Promise<LocalMasail | null>;
}

const MASAIL_SYNC_KEY = "last-masail-incremental-sync";
const BUNDLED_MASAIL_DATE = "2026-01-09T06:17:10.826965+00:00"; // Date of bundled data export

export const useMasailOffline = (): UseMasailOfflineResult => {
  const [masailList, setMasailList] = useState<LocalMasail[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [masailCount, setMasailCount] = useState(0);
  const [newMasailCount, setNewMasailCount] = useState(0);

  // Load last sync time on mount
  useEffect(() => {
    const lastSync = localStorage.getItem(MASAIL_SYNC_KEY);
    if (lastSync) {
      setLastSyncTime(new Date(lastSync).toLocaleString("bn-BD"));
    }
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Trigger incremental sync when coming back online
      syncNewMasail();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Initial load - load bundled data, then check for new masail
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Initialize bundled masail data
      await initializeMasailData();
      
      // Get bundled masail
      const bundled = getAllBundledMasail();
      setMasailList(bundled);
      setMasailCount(bundled.length);
      
      console.log(`Loaded ${bundled.length} bundled masail`);
      
      // Check for new masail in background if online
      if (navigator.onLine) {
        syncNewMasail();
      }
    } catch (error) {
      console.error("Error loading masail:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync only NEW masail (after bundled data date)
  const syncNewMasail = async () => {
    if (!navigator.onLine) {
      setIsOffline(true);
      return;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      // Get the latest updated_at from our cache or use bundled date
      const lastSync = localStorage.getItem(MASAIL_SYNC_KEY) || BUNDLED_MASAIL_DATE;
      
      // Fetch only masail created/updated after our last sync
      const { data: newMasail, error } = await supabase
        .from("masail")
        .select("*")
        .gt("updated_at", lastSync)
        .order("updated_at", { ascending: true });

      if (error) throw error;

      if (newMasail && newMasail.length > 0) {
        console.log(`Found ${newMasail.length} new/updated masail`);
        
        // Add to memory cache
        addMasailToCache(newMasail as BundledMasail[]);
        
        // Also save to IndexedDB for persistence across sessions
        await saveMasail(newMasail as LocalMasail[]);
        
        // Update local state
        const updatedList = getAllBundledMasail();
        setMasailList(updatedList);
        setMasailCount(updatedList.length);
        setNewMasailCount(prev => prev + newMasail.length);
        
        // Update last sync time to the most recent updated_at
        const latestUpdate = newMasail[newMasail.length - 1].updated_at;
        localStorage.setItem(MASAIL_SYNC_KEY, latestUpdate);
        setLastSyncTime(new Date(latestUpdate).toLocaleString("bn-BD"));
      } else {
        console.log("No new masail to sync");
        // Update last sync time even if no new data
        localStorage.setItem(MASAIL_SYNC_KEY, new Date().toISOString());
      }
    } catch (error) {
      console.error("Masail sync error:", error);
      setSyncError("নতুন মাসআলা সিঙ্ক করতে সমস্যা হয়েছে");
    } finally {
      setIsSyncing(false);
    }
  };

  const refresh = useCallback(async () => {
    await loadData();
  }, []);

  const getMasailById = useCallback(async (id: string): Promise<LocalMasail | null> => {
    // Try bundled cache first
    const bundled = getBundledMasailById(id);
    if (bundled) {
      return bundled;
    }

    // If not found locally and online, try Supabase
    if (navigator.onLine) {
      const { data, error } = await supabase
        .from("masail")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as LocalMasail;
      }
    }

    return null;
  }, []);

  return {
    masailList,
    loading,
    isOffline,
    isSyncing,
    lastSyncTime,
    syncError,
    masailCount,
    newMasailCount,
    refresh,
    getMasailById
  };
};
