import { UserProps } from "../objectType";
import api from "./api";

export const UserServices = {
  addUser: async (data: UserProps) => {
    return await api.post("/api/user/", JSON.stringify(data));
  },
  getUser: async () => {
    return await api.get("/api/user");
  },
  lostPassword: async (id: number) => {
    return await api.post(`/api/password/lost`, {
      data: {
        login: "",
        url: "",
      },
    });
  },
  resetPassword: async (id: number) => {
    return await api.post(`/api/password/reset`, {
      data: {
        login: "",
        password: "",
        key: "",
      },
    });
  },
};
