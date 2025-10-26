import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface FooterDataType {
  id: number;
  name: string;
  gmail: string;
  phone: string;
  address: string;
  work_time: string;
  instagram: string;
  tiktok: string;
}

// Array dönen endpoint için:
const getFooterData = async (): Promise<FooterDataType | null> => {
  const response = await api.get("/footerdata/");
  // Eğer array boşsa null, doluysa ilk eleman döner
  return Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
};

export const useFooterData = () => {
  return useQuery<FooterDataType | null>({
    queryKey: ["footer-data"],
    queryFn: getFooterData,
  });
};