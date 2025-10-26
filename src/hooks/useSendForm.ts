import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

// TypeScript arayüzü
export interface SendFormPayload {
  username: string;
  gmail: string;
  comment: string;
}

// API'ya form POST fonksiyonu
const postSendForm = async (data: SendFormPayload) => {
  const response = await api.post("/contacts/", data); // endpointini backend'ine göre ayarla!
  return response.data;
};

// React Query mutation hook'u
export const useSendForm = () => {
  return useMutation({
    mutationFn: postSendForm,
  });
};