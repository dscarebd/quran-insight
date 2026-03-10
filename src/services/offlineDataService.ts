// Offline Data Service - Uses IndexedDB for local caching

import { Verse } from "@/data/verses";

const DB_NAME = "quraninsight-offline";
const DB_VERSION = 4; // Upgraded from 3 to add stories store
const VERSES_STORE = "verses";
const HADITHS_STORE = "hadiths";
const MASAIL_STORE = "masail";
const DUAS_STORE = "duas";
const STORIES_STORE = "stories";
const STORY_CATEGORIES_STORE = "story_categories";
const META_STORE = "metadata";

export interface LocalHadith {
  book_slug: string;
  hadith_number: number;
  chapter_number: number | null;
  chapter_name_english: string | null;
  chapter_name_bengali: string | null;
  arabic: string | null;
  english: string | null;
  bengali: string | null;
  narrator_english: string | null;
  narrator_bengali: string | null;
  grade: string | null;
  grade_bengali: string | null;
}

export interface LocalMasail {
  id: string;
  title: string;
  question: string | null;
  answer: string;
  author: string | null;
  category: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocalStory {
  id: string;
  title_english: string;
  title_bengali: string;
  content_english: string;
  content_bengali: string;
  category: string;
  cover_image_url: string | null;
  author: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface LocalStoryCategory {
  id: string;
  name_english: string;
  name_bengali: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export interface LocalDua {
  id: string;
  dua_id: string;
  category_id: string;
  title_english: string;
  title_bengali: string;
  arabic: string;
  english: string;
  bengali: string;
  transliteration: string | null;
  transliteration_bengali: string | null;
  reference: string | null;
  created_at: string;
  updated_at: string;
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

      // Verses store with compound index
      if (!database.objectStoreNames.contains(VERSES_STORE)) {
        const versesStore = database.createObjectStore(VERSES_STORE, { 
          keyPath: ["surahNumber", "verseNumber"] 
        });
        versesStore.createIndex("surahNumber", "surahNumber", { unique: false });
      }

      // Hadiths store with compound index
      if (!database.objectStoreNames.contains(HADITHS_STORE)) {
        const hadithsStore = database.createObjectStore(HADITHS_STORE, { 
          keyPath: ["book_slug", "hadith_number"] 
        });
        hadithsStore.createIndex("book_slug", "book_slug", { unique: false });
        hadithsStore.createIndex("chapter", ["book_slug", "chapter_number"], { unique: false });
      }

      // Masail store with indexes for category, author, updated_at
      if (!database.objectStoreNames.contains(MASAIL_STORE)) {
        const masailStore = database.createObjectStore(MASAIL_STORE, { 
          keyPath: "id" 
        });
        masailStore.createIndex("category", "category", { unique: false });
        masailStore.createIndex("author", "author", { unique: false });
        masailStore.createIndex("updated_at", "updated_at", { unique: false });
      }

      // Duas store with indexes for category_id
      if (!database.objectStoreNames.contains(DUAS_STORE)) {
        const duasStore = database.createObjectStore(DUAS_STORE, { 
          keyPath: "id" 
        });
        duasStore.createIndex("category_id", "category_id", { unique: false });
        duasStore.createIndex("dua_id", "dua_id", { unique: false });
        duasStore.createIndex("updated_at", "updated_at", { unique: false });
      }

      // Metadata store for sync status
      if (!database.objectStoreNames.contains(META_STORE)) {
        database.createObjectStore(META_STORE, { keyPath: "key" });
      }
    };
  });
};

// Verses operations
export const getVersesBySurah = async (surahNumber: number): Promise<Verse[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VERSES_STORE, "readonly");
    const store = transaction.objectStore(VERSES_STORE);
    const index = store.index("surahNumber");
    const request = index.getAll(IDBKeyRange.only(surahNumber));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const verses = request.result as Verse[];
      verses.sort((a, b) => a.verseNumber - b.verseNumber);
      resolve(verses);
    };
  });
};

export const saveVerses = async (verses: Verse[]): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VERSES_STORE, "readwrite");
    const store = transaction.objectStore(VERSES_STORE);

    verses.forEach(verse => store.put(verse));

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getVerseCount = async (): Promise<number> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VERSES_STORE, "readonly");
    const store = transaction.objectStore(VERSES_STORE);
    const request = store.count();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getAllVerses = async (): Promise<Verse[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VERSES_STORE, "readonly");
    const store = transaction.objectStore(VERSES_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as Verse[]);
  });
};

export const getVerseByIndex = async (index: number): Promise<Verse | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VERSES_STORE, "readonly");
    const store = transaction.objectStore(VERSES_STORE);
    const request = store.openCursor();
    let count = 0;

    request.onerror = () => reject(request.error);
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        if (count === index) {
          resolve(cursor.value as Verse);
        } else {
          count++;
          cursor.continue();
        }
      } else {
        resolve(null);
      }
    };
  });
};

// Hadiths operations
export const getHadithsByBook = async (bookSlug: string): Promise<LocalHadith[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(HADITHS_STORE, "readonly");
    const store = transaction.objectStore(HADITHS_STORE);
    const index = store.index("book_slug");
    const request = index.getAll(IDBKeyRange.only(bookSlug));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const hadiths = request.result as LocalHadith[];
      hadiths.sort((a, b) => a.hadith_number - b.hadith_number);
      resolve(hadiths);
    };
  });
};

export const getHadithsByBookAndChapter = async (bookSlug: string, chapterNumber: number): Promise<LocalHadith[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(HADITHS_STORE, "readonly");
    const store = transaction.objectStore(HADITHS_STORE);
    const index = store.index("chapter");
    const request = index.getAll(IDBKeyRange.only([bookSlug, chapterNumber]));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const hadiths = request.result as LocalHadith[];
      hadiths.sort((a, b) => a.hadith_number - b.hadith_number);
      resolve(hadiths);
    };
  });
};

export const saveHadiths = async (hadiths: LocalHadith[]): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(HADITHS_STORE, "readwrite");
    const store = transaction.objectStore(HADITHS_STORE);

    hadiths.forEach(hadith => store.put(hadith));

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getHadithCount = async (): Promise<number> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(HADITHS_STORE, "readonly");
    const store = transaction.objectStore(HADITHS_STORE);
    const request = store.count();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getHadithByIndex = async (index: number): Promise<LocalHadith | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(HADITHS_STORE, "readonly");
    const store = transaction.objectStore(HADITHS_STORE);
    const request = store.openCursor();
    let count = 0;

    request.onerror = () => reject(request.error);
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        if (count === index) {
          resolve(cursor.value as LocalHadith);
        } else {
          count++;
          cursor.continue();
        }
      } else {
        resolve(null);
      }
    };
  });
};

// Metadata operations
export const getMetadata = async (key: string): Promise<any> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(META_STORE, "readonly");
    const store = transaction.objectStore(META_STORE);
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result?.value);
  });
};

export const setMetadata = async (key: string, value: any): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(META_STORE, "readwrite");
    const store = transaction.objectStore(META_STORE);
    const request = store.put({ key, value });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Masail operations
export const saveMasail = async (masailList: LocalMasail[]): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MASAIL_STORE, "readwrite");
    const store = transaction.objectStore(MASAIL_STORE);

    masailList.forEach(masail => store.put(masail));

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getAllMasail = async (): Promise<LocalMasail[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MASAIL_STORE, "readonly");
    const store = transaction.objectStore(MASAIL_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const masail = request.result as LocalMasail[];
      // Sort by created_at descending (newest first)
      masail.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      resolve(masail);
    };
  });
};

export const getMasailById = async (id: string): Promise<LocalMasail | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MASAIL_STORE, "readonly");
    const store = transaction.objectStore(MASAIL_STORE);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
};

export const getMasailCount = async (): Promise<number> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MASAIL_STORE, "readonly");
    const store = transaction.objectStore(MASAIL_STORE);
    const request = store.count();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getMasailByCategory = async (category: string): Promise<LocalMasail[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MASAIL_STORE, "readonly");
    const store = transaction.objectStore(MASAIL_STORE);
    const index = store.index("category");
    const request = index.getAll(IDBKeyRange.only(category));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const masail = request.result as LocalMasail[];
      masail.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      resolve(masail);
    };
  });
};

export const clearMasailStore = async (): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MASAIL_STORE, "readwrite");
    const store = transaction.objectStore(MASAIL_STORE);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Check if data is synced
export const isDataSynced = async (): Promise<boolean> => {
  const verseCount = await getVerseCount();
  const hadithCount = await getHadithCount();
  return verseCount >= 6200 && hadithCount >= 36000;
};

// Get sync status
export const getSyncStatus = async (): Promise<{ verses: number; hadiths: number; masail: number; duas: number }> => {
  const verses = await getVerseCount();
  const hadiths = await getHadithCount();
  const masail = await getMasailCount();
  const duas = await getDuaCount();
  return { verses, hadiths, masail, duas };
};

// Duas operations
export const saveDuas = async (duasList: LocalDua[]): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DUAS_STORE, "readwrite");
    const store = transaction.objectStore(DUAS_STORE);

    duasList.forEach(dua => store.put(dua));

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getAllDuas = async (): Promise<LocalDua[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DUAS_STORE, "readonly");
    const store = transaction.objectStore(DUAS_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const duas = request.result as LocalDua[];
      resolve(duas);
    };
  });
};

export const getDuasByCategory = async (categoryId: string): Promise<LocalDua[]> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DUAS_STORE, "readonly");
    const store = transaction.objectStore(DUAS_STORE);
    const index = store.index("category_id");
    const request = index.getAll(IDBKeyRange.only(categoryId));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const duas = request.result as LocalDua[];
      resolve(duas);
    };
  });
};

export const getDuaById = async (id: string): Promise<LocalDua | null> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DUAS_STORE, "readonly");
    const store = transaction.objectStore(DUAS_STORE);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
};

export const getDuaCount = async (): Promise<number> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DUAS_STORE, "readonly");
    const store = transaction.objectStore(DUAS_STORE);
    const request = store.count();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const clearDuasStore = async (): Promise<void> => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(DUAS_STORE, "readwrite");
    const store = transaction.objectStore(DUAS_STORE);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};
