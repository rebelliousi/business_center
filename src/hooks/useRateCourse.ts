import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

interface RatePayload {
  course: number; // Course ID
  rating: number; // 1-5
}

// Anonymous rating POST için uygun hook
export const useRateCourse = () => {
  return useMutation({
    mutationFn: async (payload: RatePayload) => {
      const res = await api.post("/course-rating/", payload);
      return res.data;
    },
  });
};