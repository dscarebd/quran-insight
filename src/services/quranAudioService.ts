import { reciters, getReciterById, DEFAULT_RECITER_ID } from "@/data/reciters";

const AUDIO_BASE_URL = "https://everyayah.com/data";
const AUDIO_CACHE_STORE = "audio_cache";

// Build audio URL for a specific verse
export const buildAudioUrl = (
  surahNumber: number,
  verseNumber: number,
  reciterFolder: string
): string => {
  const surah = surahNumber.toString().padStart(3, "0");
  const verse = verseNumber.toString().padStart(3, "0");
  return `${AUDIO_BASE_URL}/${reciterFolder}/${surah}${verse}.mp3`;
};

// Get audio URL using reciter ID
export const getAudioUrl = (
  surahNumber: number,
  verseNumber: number,
  reciterId: string = DEFAULT_RECITER_ID
): string => {
  const reciter = getReciterById(reciterId) || reciters[0];
  return buildAudioUrl(surahNumber, verseNumber, reciter.folder);
};

// Audio cache key format
export const getAudioCacheKey = (
  surahNumber: number,
  verseNumber: number,
  reciterId: string
): string => {
  return `${reciterId}_${surahNumber}_${verseNumber}`;
};

// IndexedDB operations for audio caching
let audioDb: IDBDatabase | null = null;

const openAudioDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (audioDb) {
      resolve(audioDb);
      return;
    }

    const request = indexedDB.open("quraninsight-audio", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      audioDb = request.result;
      resolve(audioDb);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(AUDIO_CACHE_STORE)) {
        const store = database.createObjectStore(AUDIO_CACHE_STORE, { keyPath: "id" });
        store.createIndex("surah_reciter", ["surahNumber", "reciterId"], { unique: false });
      }
    };
  });
};

export interface CachedAudio {
  id: string;
  surahNumber: number;
  verseNumber: number;
  reciterId: string;
  audioBlob: Blob;
  downloadedAt: number;
}

// Check if audio is cached
export const isAudioCached = async (
  surahNumber: number,
  verseNumber: number,
  reciterId: string
): Promise<boolean> => {
  try {
    const db = await openAudioDB();
    const key = getAudioCacheKey(surahNumber, verseNumber, reciterId);
    
    return new Promise((resolve) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readonly");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const request = store.get(key);

      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
};

// Get cached audio blob
export const getCachedAudio = async (
  surahNumber: number,
  verseNumber: number,
  reciterId: string
): Promise<Blob | null> => {
  try {
    const db = await openAudioDB();
    const key = getAudioCacheKey(surahNumber, verseNumber, reciterId);
    
    return new Promise((resolve) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readonly");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result as CachedAudio | undefined;
        resolve(result?.audioBlob || null);
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

// Cache audio blob
export const cacheAudio = async (
  surahNumber: number,
  verseNumber: number,
  reciterId: string,
  audioBlob: Blob
): Promise<void> => {
  try {
    const db = await openAudioDB();
    const key = getAudioCacheKey(surahNumber, verseNumber, reciterId);
    
    const cachedAudio: CachedAudio = {
      id: key,
      surahNumber,
      verseNumber,
      reciterId,
      audioBlob,
      downloadedAt: Date.now()
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readwrite");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const request = store.put(cachedAudio);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to cache audio:", error);
  }
};

// Check if entire surah is downloaded
export const isSurahDownloaded = async (
  surahNumber: number,
  totalVerses: number,
  reciterId: string
): Promise<boolean> => {
  try {
    const db = await openAudioDB();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readonly");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const index = store.index("surah_reciter");
      const request = index.getAll(IDBKeyRange.only([surahNumber, reciterId]));

      request.onsuccess = () => {
        const results = request.result as CachedAudio[];
        resolve(results.length >= totalVerses);
      };
      request.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
};

// Get download progress for a surah
export const getSurahDownloadProgress = async (
  surahNumber: number,
  reciterId: string
): Promise<number> => {
  try {
    const db = await openAudioDB();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readonly");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const index = store.index("surah_reciter");
      const request = index.getAll(IDBKeyRange.only([surahNumber, reciterId]));

      request.onsuccess = () => {
        const results = request.result as CachedAudio[];
        resolve(results.length);
      };
      request.onerror = () => resolve(0);
    });
  } catch {
    return 0;
  }
};

// Download audio file and return blob
export const downloadAudioFile = async (
  surahNumber: number,
  verseNumber: number,
  reciterId: string
): Promise<Blob> => {
  const url = getAudioUrl(surahNumber, verseNumber, reciterId);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to download audio: ${response.status}`);
  }
  
  return response.blob();
};

// Download entire surah audio files
export const downloadSurahAudio = async (
  surahNumber: number,
  totalVerses: number,
  reciterId: string,
  onProgress?: (downloaded: number, total: number) => void
): Promise<void> => {
  for (let verse = 1; verse <= totalVerses; verse++) {
    // Check if already cached
    const isCached = await isAudioCached(surahNumber, verse, reciterId);
    
    if (!isCached) {
      try {
        const blob = await downloadAudioFile(surahNumber, verse, reciterId);
        await cacheAudio(surahNumber, verse, reciterId, blob);
      } catch (error) {
        console.error(`Failed to download verse ${verse}:`, error);
        throw error;
      }
    }
    
    onProgress?.(verse, totalVerses);
  }
};

// Delete surah audio from cache
export const deleteSurahAudio = async (
  surahNumber: number,
  reciterId: string
): Promise<void> => {
  try {
    const db = await openAudioDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readwrite");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const index = store.index("surah_reciter");
      const request = index.getAllKeys(IDBKeyRange.only([surahNumber, reciterId]));

      request.onsuccess = () => {
        const keys = request.result;
        keys.forEach(key => store.delete(key));
        transaction.oncomplete = () => resolve();
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to delete surah audio:", error);
  }
};

// Get total cached audio size (approximate)
export const getCachedAudioSize = async (): Promise<number> => {
  try {
    const db = await openAudioDB();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(AUDIO_CACHE_STORE, "readonly");
      const store = transaction.objectStore(AUDIO_CACHE_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as CachedAudio[];
        const totalSize = results.reduce((sum, item) => sum + item.audioBlob.size, 0);
        resolve(totalSize);
      };
      request.onerror = () => resolve(0);
    });
  } catch {
    return 0;
  }
};
