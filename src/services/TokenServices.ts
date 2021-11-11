import { UserCredentials } from "../objectType";
import api from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
export const TokenServices = {
  getToken: async (data: UserCredentials) => {
    return await api.post("/jwt-auth/v1/token", JSON.stringify(data));
  },
  validateToken: async () => {
    return await api.post("/jwt-auth/v1/token/validate");
  },
};
