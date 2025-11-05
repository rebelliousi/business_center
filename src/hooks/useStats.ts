import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// TypeScript interface for site stats
export interface SiteStats {
  teachers: number;
  courses: number;
  success_rate: string | number;
  avg_rating: string | number;
  updated_at: string;
}

// API fetch function
const getSiteStats = async (): Promise<SiteStats[]> => {
  const response = await api.get("/site-stats/");
  return response.data;
};

// React Query hook
export const useSiteStats = () => {
  return useQuery<SiteStats[]>({
    queryKey: ["siteStats"],
    queryFn: getSiteStats,
  });
};