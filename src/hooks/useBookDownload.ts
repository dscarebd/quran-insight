import { useState, useEffect, useCallback } from "react";
import { 
  savePDFToCache, 
  getPDFFromCache, 
  isPDFCached, 
  deleteCachedPDF,
  getCachedBookIds,
  getReadingProgress,
  ReadingProgress
} from "@/services/pdfStorageService";

interface DownloadProgress {
  bookId: string;
  progress: number;
  isDownloading: boolean;
}

export const useBookDownload = () => {
  const [downloads, setDownloads] = useState<Map<string, DownloadProgress>>(new Map());
  const [cachedBooks, setCachedBooks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load cached book IDs on mount
  useEffect(() => {
    const loadCachedBooks = async () => {
      try {
        const ids = await getCachedBookIds();
        setCachedBooks(new Set(ids));
      } catch (error) {
        console.error("Error loading cached books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCachedBooks();
  }, []);

  const downloadBook = useCallback(async (bookId: string, pdfUrl: string, fileSizeMb?: number | null): Promise<boolean> => {
    // Check if already cached
    if (await isPDFCached(bookId)) {
      setCachedBooks(prev => new Set([...prev, bookId]));
      return true;
    }

    // Set initial progress
    setDownloads(prev => new Map(prev).set(bookId, {
      bookId,
      progress: 0,
      isDownloading: true
    }));

    try {
      return await new Promise<boolean>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";

        xhr.onprogress = (event) => {
          let progress: number;
          if (event.lengthComputable && event.total > 0) {
            progress = Math.min(Math.round((event.loaded / event.total) * 100), 99);
          } else if (fileSizeMb && fileSizeMb > 0) {
            const estimatedTotal = fileSizeMb * 1024 * 1024;
            progress = Math.min(Math.round((event.loaded / estimatedTotal) * 100), 99);
          } else {
            // Indeterminate: estimate based on loaded bytes (assume ~10MB)
            const assumedTotal = 10 * 1024 * 1024;
            progress = Math.min(Math.round((event.loaded / assumedTotal) * 90), 90);
          }
          setDownloads(prev => new Map(prev).set(bookId, {
            bookId,
            progress,
            isDownloading: true
          }));
        };

        xhr.onload = async () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const blob = xhr.response as Blob;
            await savePDFToCache(bookId, blob);
            setCachedBooks(prev => new Set([...prev, bookId]));
            setDownloads(prev => {
              const newMap = new Map(prev);
              newMap.delete(bookId);
              return newMap;
            });
            resolve(true);
          } else {
            console.error("Download failed with status:", xhr.status);
            setDownloads(prev => {
              const newMap = new Map(prev);
              newMap.delete(bookId);
              return newMap;
            });
            resolve(false);
          }
        };

        xhr.onerror = () => {
          console.error("Download network error");
          setDownloads(prev => {
            const newMap = new Map(prev);
            newMap.delete(bookId);
            return newMap;
          });
          resolve(false);
        };

        xhr.open("GET", pdfUrl);
        xhr.send();
      });
    } catch (error) {
      console.error("Download error:", error);
      setDownloads(prev => {
        const newMap = new Map(prev);
        newMap.delete(bookId);
        return newMap;
      });
      return false;
    }
  }, []);

  const deleteBook = useCallback(async (bookId: string): Promise<void> => {
    await deleteCachedPDF(bookId);
    setCachedBooks(prev => {
      const newSet = new Set(prev);
      newSet.delete(bookId);
      return newSet;
    });
  }, []);

  const isBookCached = useCallback((bookId: string): boolean => {
    return cachedBooks.has(bookId);
  }, [cachedBooks]);

  const getDownloadProgress = useCallback((bookId: string): DownloadProgress | undefined => {
    return downloads.get(bookId);
  }, [downloads]);

  const getPDFBlob = useCallback(async (bookId: string): Promise<Blob | null> => {
    return getPDFFromCache(bookId);
  }, []);

  const getProgress = useCallback(async (bookId: string): Promise<ReadingProgress | null> => {
    return getReadingProgress(bookId);
  }, []);

  const refreshCache = useCallback(async () => {
    const ids = await getCachedBookIds();
    setCachedBooks(new Set(ids));
  }, []);

  return {
    downloadBook,
    deleteBook,
    isBookCached,
    getDownloadProgress,
    getPDFBlob,
    getProgress,
    refreshCache,
    cachedBooks,
    isLoading,
    downloads
  };
};
