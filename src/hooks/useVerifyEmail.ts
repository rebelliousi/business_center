import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

// TypeScript arayüzü
export interface VerifyEmailPayload {
  gmail: string;
  verification_code: string;
}

// API'ya POST fonksiyonu
const postVerifyEmail = async (data: VerifyEmailPayload) => {
  const response = await api.post("/contacts/verify-email/", data); // endpoint'i backend'ine göre ayarla!
  return response.data;
};

// React Query mutation hook'u
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: postVerifyEmail,
  });
};