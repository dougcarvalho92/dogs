import { UserCredentials, UserProps } from "../objectType";
import api from "./api";

export const UserServices = {
  login: async (credentials: UserCredentials) => {
    return await api.post("/jwt-auth/v1/token", JSON.stringify(credentials));
  },
  addUser: async (data: UserCredentials) => {
    return await api.post("/api/user/", JSON.stringify(data));
  },
  getUser: async () => {
    return await api.get<UserProps>("/api/user");
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
