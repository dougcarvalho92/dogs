import api from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
export const StatsServices = {
  tokenPost: async () => {
    return await api.post("/jwt-auth/v1/token", {
      data: {
        username: "",
        password: "",
      },
    });
  },
  tokenValidatePost: async () => {
    return await api.post("/jwt-auth/v1/token/validate");
  },
};
