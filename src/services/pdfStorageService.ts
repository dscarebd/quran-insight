// PDF Storage Service - Uses IndexedDB for offline PDF caching

const DB_NAME = "quraninsight-pdf-books";
const DB_VERSION = 1;
const PDF_STORE = "pdf_cache";
const READING_PROGRESS_STORE = "reading_progress";

export interface CachedPDF {
  book_id: string;
  pdf_blob: Blob;
  downloaded_at: string;
  file_size: number;
}

export interface ReadingProgress {
  book_id: string;
  current_page: number;
  total_pages: number;
  last_read_at: string;
  scroll_position?: number;
}

let db: IDBDatabase | null = null;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // PDF cache store
      if (!database.objectStoreNames.contains(PDF_STORE)) {
        database.createObjectStore(PDF_STORE, { keyPath: "book_id" });
      }

      // Reading progress store
      if (!database.objectStoreNames.contains(READING_PROGRESS_STORE)) {
        const progressStore = database.createObjectStore(READING_PROGRESS_STORE, { 
          keyPath: "book_id" 
        });
        progressStore.createIndex("last_read_at", "last_read_at", { unique: false });
      }
    };
  });
};

// Save PDF to cache
export const savePDFToCache = async (bookId: string, blob: Blob): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE, "readwrite");
    const store = transaction.objectStore(PDF_STORE);
    
    const cachedPDF: CachedPDF = {
      book_id: bookId,
      pdf_blob: blob,
      downloaded_at: new Date().toISOString(),
      file_size: blob.size
    };
    
    const request = store.put(cachedPDF);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Get PDF from cache
export const getPDFFromCache = async (bookId: string): Promise<Blob | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE, "readonly");
    const store = transaction.objectStore(PDF_STORE);
    const request = store.get(bookId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result as CachedPDF | undefined;
      resolve(result?.pdf_blob || null);
    };
  });
};

// Check if PDF is cached
export const isPDFCached = async (bookId: string): Promise<boolean> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE, "readonly");
    const store = transaction.objectStore(PDF_STORE);
    const request = store.get(bookId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(!!request.result);
  });
};

// Delete cached PDF
export const deleteCachedPDF = async (bookId: string): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([PDF_STORE, READING_PROGRESS_STORE], "readwrite");
    const pdfStore = transaction.objectStore(PDF_STORE);
    const progressStore = transaction.objectStore(READING_PROGRESS_STORE);
    
    pdfStore.delete(bookId);
    progressStore.delete(bookId);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

// Get all cached book IDs
export const getCachedBookIds = async (): Promise<string[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE, "readonly");
    const store = transaction.objectStore(PDF_STORE);
    const request = store.getAllKeys();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as string[]);
  });
};

// Get cached PDF info (without blob for performance)
export const getCachedPDFInfo = async (bookId: string): Promise<Omit<CachedPDF, 'pdf_blob'> | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE, "readonly");
    const store = transaction.objectStore(PDF_STORE);
    const request = store.get(bookId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result as CachedPDF | undefined;
      if (result) {
        const { pdf_blob, ...info } = result;
        resolve(info);
      } else {
        resolve(null);
      }
    };
  });
};

// Save reading progress
export const saveReadingProgress = async (progress: ReadingProgress): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(READING_PROGRESS_STORE, "readwrite");
    const store = transaction.objectStore(READING_PROGRESS_STORE);
    const request = store.put(progress);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Get reading progress
export const getReadingProgress = async (bookId: string): Promise<ReadingProgress | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(READING_PROGRESS_STORE, "readonly");
    const store = transaction.objectStore(READING_PROGRESS_STORE);
    const request = store.get(bookId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
};

// Get all reading progress (for continue reading feature)
export const getAllReadingProgress = async (): Promise<ReadingProgress[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(READING_PROGRESS_STORE, "readonly");
    const store = transaction.objectStore(READING_PROGRESS_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const results = request.result as ReadingProgress[];
      // Sort by last read date descending
      results.sort((a, b) => new Date(b.last_read_at).getTime() - new Date(a.last_read_at).getTime());
      resolve(results);
    };
  });
};

// Update last page
export const updateLastPage = async (bookId: string, pageNumber: number, totalPages: number): Promise<void> => {
  const existing = await getReadingProgress(bookId);
  const progress: ReadingProgress = {
    book_id: bookId,
    current_page: pageNumber,
    total_pages: totalPages,
    last_read_at: new Date().toISOString(),
    scroll_position: existing?.scroll_position
  };
  await saveReadingProgress(progress);
};

// Get total cached storage size
export const getTotalCacheSize = async (): Promise<number> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE, "readonly");
    const store = transaction.objectStore(PDF_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const results = request.result as CachedPDF[];
      const totalSize = results.reduce((acc, pdf) => acc + pdf.file_size, 0);
      resolve(totalSize);
    };
  });
};

// Clear all cached PDFs
export const clearAllCachedPDFs = async (): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([PDF_STORE, READING_PROGRESS_STORE], "readwrite");
    const pdfStore = transaction.objectStore(PDF_STORE);
    const progressStore = transaction.objectStore(READING_PROGRESS_STORE);
    
    pdfStore.clear();
    progressStore.clear();

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};
