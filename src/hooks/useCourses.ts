import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// Yeni CourseType interface'i (senin örneğine göre)
export interface CourseType {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration_weeks: number;
  students: number;
  rating: number | string; // API'dan string geliyorsa string de olabilir
  color: string;
  image: string;
  is_active: boolean;
  price:string
}

// Kursları çeken fonksiyon
const getCourses = async (): Promise<CourseType[]> => {
  const response = await api.get("/course/"); // API endpointini gerektiği gibi ayarla
  return response.data;
};

// React Query hook'u
export const useCourses = () => {
  return useQuery<CourseType[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
};