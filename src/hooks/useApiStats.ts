import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ApiStats {
  verses: number;
  hadiths: number;
  duas: number;
  masail: number;
}

export const useApiStats = () => {
  return useQuery({
    queryKey: ["api-stats"],
    queryFn: async (): Promise<ApiStats> => {
      const [versesResult, hadithsResult, duasResult, masailResult] = await Promise.all([
        supabase.from("verses").select("*", { count: "exact", head: true }),
        supabase.from("hadiths").select("*", { count: "exact", head: true }),
        supabase.from("duas").select("*", { count: "exact", head: true }),
        supabase.from("masail").select("*", { count: "exact", head: true }),
      ]);

      return {
        verses: versesResult.count || 0,
        hadiths: hadithsResult.count || 0,
        duas: duasResult.count || 0,
        masail: masailResult.count || 0,
      };
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

export const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${Math.floor(count / 1000).toLocaleString()},${String(count % 1000).padStart(3, '0').slice(0, -2)}00+`;
  }
  return `${count}+`;
};
