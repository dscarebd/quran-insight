import { useState, useEffect, useCallback } from "react";
import { syncDuas, getDuaSyncStatus } from "@/services/syncService";
import { getDuaCount } from "@/services/offlineDataService";

export interface DuaSyncStatus {
  count: number;
  lastSync: string | null;
  isSyncing: boolean;
  error: string | null;
}

export const useDuasOfflineSync = (autoSync: boolean = true) => {
  const [status, setStatus] = useState<DuaSyncStatus>({
    count: 0,
    lastSync: null,
    isSyncing: false,
    error: null
  });

  // Load initial status
  const loadStatus = useCallback(async () => {
    try {
      const { count, lastSync } = await getDuaSyncStatus();
      setStatus(prev => ({ ...prev, count, lastSync }));
    } catch (e) {
      console.error("Error loading dua sync status:", e);
    }
  }, []);

  // Sync duas from database
  const sync = useCallback(async () => {
    if (!navigator.onLine) {
      console.log("Offline - skipping dua sync");
      return;
    }

    setStatus(prev => ({ ...prev, isSyncing: true, error: null }));
    
    try {
      const result = await syncDuas();
      const newCount = await getDuaCount();
      
      setStatus(prev => ({
        ...prev,
        count: newCount,
        lastSync: new Date().toISOString(),
        isSyncing: false
      }));
      
      if (result.synced > 0) {
        console.log(`Synced ${result.synced} duas to IndexedDB`);
      }
      
      return result;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Sync failed";
      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        error: errorMessage
      }));
      console.error("Dua sync error:", e);
    }
  }, []);

  // Auto-sync on mount if enabled and online
  useEffect(() => {
    loadStatus();
    
    if (autoSync && navigator.onLine) {
      // Delay sync slightly to not block initial render
      const timer = setTimeout(() => {
        sync();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoSync, loadStatus, sync]);

  return {
    ...status,
    sync,
    refresh: loadStatus
  };
};
