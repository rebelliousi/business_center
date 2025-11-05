import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// Ratinglerin listesi
interface RatingItem {
  id: number;
  course: number;
  rating: number;
  created_at: string;
}

// Bir kursa ait tüm ratingleri çekmek için:
// GET /api/v1/school/course-rating/?course=ID
export const useCourseRatings = (courseId: number | string) => {
  return useQuery<RatingItem[]>({
    queryKey: ["course-rating-list", courseId],
    queryFn: async () => {
      const res = await api.get("/course-rating/", {
        params: { course: courseId },
      });
      return res.data;
    },
    enabled: !!courseId
  });
};