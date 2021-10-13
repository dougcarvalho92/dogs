import api from "./api";

export const DogsServices = {
  comentPost: async (id: number) => {
    return await api.post(`/api/comment/${id}`, {
      data: {
        comment: "",
      },
    });
  },
  comentGet: async (id: number) => {
    return await api.get(`/api/comment/${id}`);
  },
  statsGet: async (id: number) => {
    return await api.get(`/api/stats`);
  },
};
