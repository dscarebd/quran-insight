import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Language } from '@/types/language';

interface VerseBookmark {
  id: string;
  surah_number: number;
  verse_number: number;
  created_at: string;
}

const STORAGE_KEY = 'quran_verse_bookmarks';

export const useLocalBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch {
        setBookmarks([]);
      }
    }
  }, []);

  const saveToStorage = useCallback((newBookmarks: VerseBookmark[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  }, []);

  const isBookmarked = useCallback((surahNumber: number, verseNumber: number): boolean => {
    return bookmarks.some(b => b.surah_number === surahNumber && b.verse_number === verseNumber);
  }, [bookmarks]);

  const toggleBookmark = useCallback((surahNumber: number, verseNumber: number, language: Language = 'en') => {
    const existing = bookmarks.find(b => b.surah_number === surahNumber && b.verse_number === verseNumber);

    if (existing) {
      const newBookmarks = bookmarks.filter(b => b.id !== existing.id);
      saveToStorage(newBookmarks);
      const msg = language === 'bn' ? 'বুকমার্ক মুছে ফেলা হয়েছে' : language === 'hi' ? 'बुकमार्क हटाया गया' : 'Bookmark Removed';
      toast.success(msg);
    } else {
      const newBookmark: VerseBookmark = {
        id: `${surahNumber}-${verseNumber}-${Date.now()}`,
        surah_number: surahNumber,
        verse_number: verseNumber,
        created_at: new Date().toISOString(),
      };
      const newBookmarks = [newBookmark, ...bookmarks];
      saveToStorage(newBookmarks);
      const msg = language === 'bn' ? 'বুকমার্ক করা হয়েছে' : language === 'hi' ? 'बुकमार्क किया गया' : 'Bookmarked';
      toast.success(msg);
    }
  }, [bookmarks, saveToStorage]);

  const removeBookmark = useCallback((id: string, language: Language = 'en') => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    saveToStorage(newBookmarks);
    const msg = language === 'bn' ? 'বুকমার্ক মুছে ফেলা হয়েছে' : language === 'hi' ? 'बुकमार्क हटाया गया' : 'Bookmark Removed';
    toast.success(msg);
  }, [bookmarks, saveToStorage]);

  const getBookmarkedVerseKeys = useCallback((): Set<string> => {
    return new Set(bookmarks.map(b => `${b.surah_number}-${b.verse_number}`));
  }, [bookmarks]);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    getBookmarkedVerseKeys,
  };
};
