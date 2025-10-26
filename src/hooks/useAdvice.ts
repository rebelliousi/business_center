import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// TypeScript interface'i
export interface AdviceType {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  step: number;
}

// API'dan advice'ları getiren fonksiyon
const getAdvices = async (): Promise<AdviceType[]> => {
  const response = await api.get("/business-advice/"); // endpointini backend'ine göre ayarla
  return response.data;
};

// React Query hook'u
export const useAdvices = () => {
  return useQuery<AdviceType[]>({
    queryKey: ["advices"],
    queryFn: getAdvices,
  });
};