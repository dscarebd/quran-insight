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

  const downloadBook = useCallback(async (bookId: string, pdfUrl: string): Promise<boolean> => {
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
      const response = await fetch(pdfUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status}`);
      }

      const contentLength = response.headers.get("content-length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        loaded += value.length;

        if (total > 0) {
          const progress = Math.round((loaded / total) * 100);
          setDownloads(prev => new Map(prev).set(bookId, {
            bookId,
            progress,
            isDownloading: true
          }));
        }
      }

      // Combine chunks into blob
      const combinedArray = new Uint8Array(loaded);
      let offset = 0;
      for (const chunk of chunks) {
        combinedArray.set(chunk, offset);
        offset += chunk.length;
      }
      const blob = new Blob([combinedArray], { type: "application/pdf" });
      
      // Save to IndexedDB
      await savePDFToCache(bookId, blob);
      
      // Update state
      setCachedBooks(prev => new Set([...prev, bookId]));
      setDownloads(prev => {
        const newMap = new Map(prev);
        newMap.delete(bookId);
        return newMap;
      });

      return true;
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
