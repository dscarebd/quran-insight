import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PDFBook {
  id: string;
  title_english: string;
  title_bengali: string;
  author_english: string | null;
  author_bengali: string | null;
  description_english: string | null;
  description_bengali: string | null;
  cover_image_url: string | null;
  pdf_url: string;
  file_size_mb: number | null;
  total_pages: number | null;
  category: string | null;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export const useBookLibrary = () => {
  return useQuery({
    queryKey: ["pdf-books"],
    queryFn: async (): Promise<PDFBook[]> => {
      const { data, error } = await supabase
        .from("pdf_books")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBookById = (bookId: string | undefined) => {
  return useQuery({
    queryKey: ["pdf-book", bookId],
    queryFn: async (): Promise<PDFBook | null> => {
      if (!bookId) return null;
      
      const { data, error } = await supabase
        .from("pdf_books")
        .select("*")
        .eq("id", bookId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }
      return data;
    },
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedBooks = () => {
  return useQuery({
    queryKey: ["pdf-books-featured"],
    queryFn: async (): Promise<PDFBook[]> => {
      const { data, error } = await supabase
        .from("pdf_books")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBooksByCategory = (category: string | undefined) => {
  return useQuery({
    queryKey: ["pdf-books-category", category],
    queryFn: async (): Promise<PDFBook[]> => {
      if (!category) return [];
      
      const { data, error } = await supabase
        .from("pdf_books")
        .select("*")
        .eq("category", category)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};
