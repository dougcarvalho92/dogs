import { UserCredentials } from "../objectType";
import api from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
export const TokenServices = {
  getToken: async (data: UserCredentials) => {
    console.log(data);
    return await api.post("/jwt-auth/v1/token", JSON.stringify(data));
  },
  validateToken: async (token: string) => {
    return await api.post("/jwt-auth/v1/token/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
