import api from "./api";

export const PhotoServices = {
  addPhoto: async () => {
    return await api.post("/api/photo", {
      data: {
        img: "FORM_DATA",
        nome: "",
        peso: "",
        idade: "",
      },
    });
  },
  getPhotos: async () => {
    return await api.post("/api/photo");
  },
  filterPhotos: async (_total: number, _page: number, _user: number) => {
    return await api.post("/api/photo", {
      data: {
        _total,
        _page,
        _user,
      },
    });
  },
  getPhotoById: async (id: number) => {
    return await api.post(`/api/photo/${id}`);
  },
  deletePhoto: async (id: number) => {
    return await api.delete(`/api/photo/${id}`);
  },
};
