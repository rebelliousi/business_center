import { useQuery } from "@tanstack/react-query";
import { api } from "../api"; // Axios veya fetch wrapper

// API'den dönen rating tipi
export interface MultiCourseRating {
  course_id: number;
  average_rating: number;
  rating_count: number;
}

// Toplu kurs rating datası çeken fonksiyon
const getMultiCourseRatings = async (courseIds: number[]): Promise<MultiCourseRating[]> => {
  if (!courseIds.length) return [];
  const qs = courseIds.join(",");
  const response = await api.get(`/course-rating/multi/?course_ids=${qs}`);
  return response.data; // Array<MultiCourseRating>
};

// React Query hook'u
export const useMultiCourseRatings = (courseIds: number[]) => {
  return useQuery<MultiCourseRating[]>({
    queryKey: ["multi-course-ratings", courseIds],
    queryFn: () => getMultiCourseRatings(courseIds),
    enabled: !!courseIds && courseIds.length > 0, // courseIds varsa fetch et
    staleTime: 5 * 60 * 1000, // Örnek: 5dk cache
  });
};