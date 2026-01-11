import { useState, useEffect, useCallback } from "react";
import { 
  getAllMasail, 
  getMasailById as getLocalMasailById,
  getMasailCount,
  LocalMasail 
} from "@/services/offlineDataService";
import { syncMasail, getLastMasailSync } from "@/services/syncService";
import { supabase } from "@/integrations/supabase/client";

export interface UseMasailOfflineResult {
  masailList: LocalMasail[];
  loading: boolean;
  isOffline: boolean;
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
  masailCount: number;
  refresh: () => Promise<void>;
  getMasailById: (id: string) => Promise<LocalMasail | null>;
}

export const useMasailOffline = (): UseMasailOfflineResult => {
  const [masailList, setMasailList] = useState<LocalMasail[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [masailCount, setMasailCount] = useState(0);

  // Load last sync time on mount
  useEffect(() => {
    const loadLastSync = async () => {
      const lastSync = await getLastMasailSync();
      if (lastSync) {
        setLastSyncTime(new Date(lastSync).toLocaleString("bn-BD"));
      }
    };
    loadLastSync();
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Trigger sync when coming back online
      syncData();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // If online, sync first
      if (navigator.onLine) {
        await syncData();
      }
      
      // Always load from IndexedDB (source of truth for display)
      const local = await getAllMasail();
      setMasailList(local);
      setMasailCount(local.length);
    } catch (error) {
      console.error("Error loading masail:", error);
      // Try loading from IndexedDB even if sync failed
      try {
        const local = await getAllMasail();
        setMasailList(local);
        setMasailCount(local.length);
      } catch (e) {
        console.error("Error loading from IndexedDB:", e);
      }
    } finally {
      setLoading(false);
    }
  };

  const syncData = async () => {
    if (!navigator.onLine) {
      setIsOffline(true);
      return;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await syncMasail();
      
      if (!result.isOffline) {
        // Reload from IndexedDB after sync
        const local = await getAllMasail();
        setMasailList(local);
        setMasailCount(local.length);
        
        // Update last sync time
        const lastSync = await getLastMasailSync();
        if (lastSync) {
          setLastSyncTime(new Date(lastSync).toLocaleString("bn-BD"));
        }
      }
    } catch (error) {
      console.error("Sync error:", error);
      setSyncError("সিঙ্ক করতে সমস্যা হয়েছে");
    } finally {
      setIsSyncing(false);
    }
  };

  const refresh = useCallback(async () => {
    await loadData();
  }, []);

  const getMasailById = useCallback(async (id: string): Promise<LocalMasail | null> => {
    // Try IndexedDB first
    const local = await getLocalMasailById(id);
    if (local) {
      return local;
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
    refresh,
    getMasailById
  };
};
