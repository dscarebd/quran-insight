import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface DuaBookmark {
  id: string;
  category_id: string;
  dua_id: string;
  created_at: string;
}

const STORAGE_KEY = 'quran_dua_bookmarks';

export const useLocalDuaBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<DuaBookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch {
        setBookmarks([]);
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = useCallback((newBookmarks: DuaBookmark[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  }, []);

  const isBookmarked = useCallback((categoryId: string, duaId: string): boolean => {
    return bookmarks.some(b => b.category_id === categoryId && b.dua_id === duaId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((categoryId: string, duaId: string) => {
    const existing = bookmarks.find(b => b.category_id === categoryId && b.dua_id === duaId);

    if (existing) {
      const newBookmarks = bookmarks.filter(b => b.id !== existing.id);
      saveToStorage(newBookmarks);
      toast.success('Removed from favorites');
    } else {
      const newBookmark: DuaBookmark = {
        id: `${categoryId}-${duaId}-${Date.now()}`,
        category_id: categoryId,
        dua_id: duaId,
        created_at: new Date().toISOString(),
      };
      const newBookmarks = [newBookmark, ...bookmarks];
      saveToStorage(newBookmarks);
      toast.success('Added to favorites');
    }
  }, [bookmarks, saveToStorage]);

  const getBookmarkedDuas = useCallback(() => {
    return bookmarks;
  }, [bookmarks]);

  return {
    bookmarks,
    loading,
    isBookmarked,
    toggleBookmark,
    getBookmarkedDuas,
  };
};
