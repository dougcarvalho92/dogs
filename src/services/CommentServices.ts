import { CommentProps } from "../objectType";
import api from "./api";

export const CommentServices = {
  commentPost: async (comment: string, id: string) => {
    return await api.post<CommentProps>(`/api/comment/${id}`, {
      comment: comment,
    });
  },
  commentGet: async (id: number) => {
    return await api.get(`/api/comment/${id}`);
  },
  statsGet: async (id: number) => {
    return await api.get(`/api/stats`);
  },
};
