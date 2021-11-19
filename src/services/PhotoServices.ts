import { PhotoSelectedProps } from "../objectType";
import api from "./api";

const PhotoServices = {
  addPhoto: async (formData: FormData) => {
    return await api.post("/api/photo", formData);
  },
  getPhotos: async () => {
    return await api.post("/api/photo");
  },
  filterPhotos: async (_total: number, _page: number, _user: number) => {
    return await api.get(
      `api/photo?_page=${_page}&_total=${_total}&_user=${_user}`
    );
  },
  getPhotoById: async (id: number) => {
    return await api.get<PhotoSelectedProps>(`/api/photo/${id}`);
  },
  deletePhoto: async (id: number) => {
    return await api.delete(`/api/photo/${id}`);
  },
};
export default PhotoServices;
