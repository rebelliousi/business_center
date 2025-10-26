import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// About tipini tanımla
export interface AboutType {
  id: number;
  main_title: string;
  main_subtitle: string;
  main_body: string;
  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;
  values_title: string;
  values_text: string;
}

// About bilgisini çeken fonksiyon
const getAbout = async (): Promise<AboutType[]> => {
  const response = await api.get("/about/"); // endpoint'i backend'ine göre güncelle!
  return response.data;
};

// React Query hook'u
export const useAbout = () => {
  return useQuery<AboutType[]>({
    queryKey: ["about"],
    queryFn: getAbout,
  });
};