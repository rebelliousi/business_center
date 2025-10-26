import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// Discount tipini tanımla
export interface DiscountType {
  id: number;
  title: string;
  description: string;
  valid_until: string; // ISO date string: "2025-10-26"
  is_active: boolean;
}

// Discount'ları çeken fonksiyon
const getDiscounts = async (): Promise<DiscountType[]> => {
  const response = await api.get("/discount_item/"); // API endpointini kendi backend'ine göre düzelt!
  return response.data;
};

// React Query hook'u
export const useDiscounts = () => {
  return useQuery<DiscountType[]>({
    queryKey: ["discounts"],
    queryFn: getDiscounts,
  });
};