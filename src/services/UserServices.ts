import { ErrorResponse, UserCredentials, UserProps } from "../objectType";
import api from "./api";

export const UserServices = {
  login: async (credentials: UserCredentials) => {
    return await api.post("/jwt-auth/v1/token", JSON.stringify(credentials));
  },
  addUser: async (data: UserCredentials) => {
    return await api.post("/api/user/", JSON.stringify(data));
  },
  getUser: async () => {
    return await api.get<UserProps | ErrorResponse>("/api/user");
  },
  lostPassword: async (id: string) => {
    const data = {
      login: id,
      url: window.location.href.replace("lost", "reset"),
    };
    return await api.post<string>(`/api/password/lost`, JSON.stringify(data));
  },
  resetPassword: async (login: string, key: string, password: string) => {
    return await api.post(`/api/password/reset`, {
      data: {
        login,
        password,
        key,
      },
    });
  },
};
