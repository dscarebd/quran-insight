// Dua Audio Service - handles caching and playback of Hisnul Muslim audio

import { getDuaAudioUrl } from "@/data/duaAudioMapping";

const DB_NAME = "duaAudioCache";
const DB_VERSION = 1;
const STORE_NAME = "audioFiles";

// Open IndexedDB connection
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

// Check if audio is cached
export const isDuaAudioCached = async (audioNumber: number): Promise<boolean> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(`dua-${audioNumber}`);

      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
};

// Get cached audio blob
export const getCachedDuaAudio = async (audioNumber: number): Promise<Blob | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(`dua-${audioNumber}`);

      request.onsuccess = () => {
        if (request.result?.blob) {
          resolve(request.result.blob);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

// Cache audio blob
export const cacheDuaAudio = async (audioNumber: number, blob: Blob): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        id: `dua-${audioNumber}`,
        blob,
        cachedAt: Date.now(),
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to cache dua audio:", error);
  }
};

// Fetch audio from Archive.org (or cache)
export const fetchDuaAudio = async (audioNumber: number): Promise<Blob> => {
  // Check cache first
  const cached = await getCachedDuaAudio(audioNumber);
  if (cached) {
    return cached;
  }

  // Fetch from Archive.org
  const url = getDuaAudioUrl(audioNumber);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch audio: ${response.status}`);
  }

  const blob = await response.blob();

  // Cache for future use (don't await - do in background)
  cacheDuaAudio(audioNumber, blob).catch(console.error);

  return blob;
};

// Clear old cached audio (older than 30 days)
export const cleanupOldCache = async (): Promise<void> => {
  try {
    const db = await openDB();
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        if (cursor.value.cachedAt < thirtyDaysAgo) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  } catch (error) {
    console.error("Failed to cleanup old cache:", error);
  }
};
