import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DuaBookmark {
  id: string;
  category_id: string;
  dua_id: string;
  created_at: string;
}

export const useDuaBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<DuaBookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('dua_bookmarks')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching dua bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const isBookmarked = (categoryId: string, duaId: string): boolean => {
    return bookmarks.some(b => b.category_id === categoryId && b.dua_id === duaId);
  };

  const toggleBookmark = async (categoryId: string, duaId: string) => {
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }

    const existing = bookmarks.find(b => b.category_id === categoryId && b.dua_id === duaId);

    if (existing) {
      // Remove bookmark
      try {
        const { error } = await supabase
          .from('dua_bookmarks')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        setBookmarks(prev => prev.filter(b => b.id !== existing.id));
        toast.success('Removed from favorites');
      } catch (error) {
        console.error('Error removing bookmark:', error);
        toast.error('Failed to remove from favorites');
      }
    } else {
      // Add bookmark
      try {
        const { data, error } = await supabase
          .from('dua_bookmarks')
          .insert({
            user_id: user.id,
            category_id: categoryId,
            dua_id: duaId
          })
          .select()
          .single();

        if (error) throw error;
        setBookmarks(prev => [...prev, data]);
        toast.success('Added to favorites');
      } catch (error) {
        console.error('Error adding bookmark:', error);
        toast.error('Failed to add to favorites');
      }
    }
  };

  const getBookmarkedDuas = () => {
    return bookmarks;
  };

  return {
    bookmarks,
    loading,
    isBookmarked,
    toggleBookmark,
    getBookmarkedDuas
  };
};
