import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// TypeScript interface'i
export interface TeacherType {
  id: number;
  name: string;
  surname: string;
  role: string;
  expertise: string;
  experience: string;
  description: string;
  image: string;
  gender: "male" | "female" | string;
  color: string;
}

// Öğretmenleri getiren fonksiyon
const getTeachers = async (): Promise<TeacherType[]> => {
  const response = await api.get("/teacher/"); // endpointini backend'ine göre ayarla
  return response.data;
};

// React Query hook'u
export const useTeachers = () => {
  return useQuery<TeacherType[]>({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};