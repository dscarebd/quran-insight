import { useState, useEffect, useCallback } from "react";
import {
  saveStories,
  getAllStories,
  getStoryById as getStoryByIdFromDB,
  saveStoryCategories,
  getAllStoryCategories,
  LocalStory,
  LocalStoryCategory,
} from "@/services/offlineDataService";
import { supabase } from "@/integrations/supabase/client";

export interface UseStoriesOfflineResult {
  storiesList: LocalStory[];
  categories: LocalStoryCategory[];
  loading: boolean;
  isOffline: boolean;
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
  refresh: () => Promise<void>;
  getStoryById: (id: string) => Promise<LocalStory | null>;
}

const STORIES_SYNC_KEY = "last-stories-daily-sync";
const CATEGORIES_SYNC_KEY = "last-story-categories-sync";

const shouldSyncToday = (key: string): boolean => {
  const last = localStorage.getItem(key);
  if (!last) return true;
  return new Date(last).toDateString() !== new Date().toDateString();
};

export const useStoriesOffline = (): UseStoriesOfflineResult => {
  const [storiesList, setStoriesList] = useState<LocalStory[]>([]);
  const [categories, setCategories] = useState<LocalStoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    const last = localStorage.getItem(STORIES_SYNC_KEY);
    if (last) setLastSyncTime(new Date(last).toLocaleString("bn-BD"));
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (shouldSyncToday(STORIES_SYNC_KEY)) syncStories();
    };
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load from IndexedDB first
      const [localStories, localCategories] = await Promise.all([
        getAllStories(),
        getAllStoryCategories(),
      ]);

      if (localStories.length > 0) {
        setStoriesList(localStories);
        setCategories(localCategories);
        console.log(`Loaded ${localStories.length} stories from IndexedDB`);
      }

      // Sync if online and haven't synced today
      if (navigator.onLine && (shouldSyncToday(STORIES_SYNC_KEY) || localStories.length === 0)) {
        await syncStories();
      }
    } catch (error) {
      console.error("Error loading stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const syncStories = async () => {
    if (!navigator.onLine) {
      setIsOffline(true);
      return;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      // Sync categories
      const { data: catData, error: catError } = await supabase
        .from("story_categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (catError) throw catError;
      if (catData && catData.length > 0) {
        await saveStoryCategories(catData as LocalStoryCategory[]);
        setCategories(catData as LocalStoryCategory[]);
      }

      // Incremental sync for stories
      const lastSync = localStorage.getItem(STORIES_SYNC_KEY);
      
      let query = supabase
        .from("stories")
        .select("*")
        .order("updated_at", { ascending: true });

      if (lastSync) {
        query = query.gt("updated_at", lastSync);
      }

      const { data: newStories, error } = await query;
      if (error) throw error;

      if (newStories && newStories.length > 0) {
        console.log(`Synced ${newStories.length} new/updated stories`);
        await saveStories(newStories as LocalStory[]);
      } else {
        console.log("No new stories to sync");
      }

      // Update sync timestamp
      const now = new Date().toISOString();
      localStorage.setItem(STORIES_SYNC_KEY, now);
      localStorage.setItem(CATEGORIES_SYNC_KEY, now);
      setLastSyncTime(new Date(now).toLocaleString("bn-BD"));

      // Reload full list from IndexedDB
      const updatedList = await getAllStories();
      setStoriesList(updatedList);
    } catch (error) {
      console.error("Stories sync error:", error);
      setSyncError("তাফসীর সিঙ্ক করতে সমস্যা হয়েছে");
    } finally {
      setIsSyncing(false);
    }
  };

  const refresh = useCallback(async () => {
    // Force sync regardless of daily check
    await syncStories();
  }, []);

  const getStoryById = useCallback(async (id: string): Promise<LocalStory | null> => {
    // Try IndexedDB first
    const local = await getStoryByIdFromDB(id);
    if (local) return local;

    // Fallback to network
    if (navigator.onLine) {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) return data as LocalStory;
    }

    return null;
  }, []);

  return {
    storiesList,
    categories,
    loading,
    isOffline,
    isSyncing,
    lastSyncTime,
    syncError,
    refresh,
    getStoryById,
  };
};
