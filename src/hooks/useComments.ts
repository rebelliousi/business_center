import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// Yorum tipi
export interface CommentType {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  is_active: boolean;
  created_at: string;
}

// Yorumları çeken fonksiyon
const getComments = async (): Promise<CommentType[]> => {
  const response = await api.get("/comments/"); // API endpoint'ini gerektiği gibi ayarlayabilirsin
  return response.data;
};

// React Query hook'u
export const useComments = () => {
  return useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: getComments,
  });
};