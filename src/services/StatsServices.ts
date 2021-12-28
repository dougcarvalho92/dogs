import { StatsProps } from "../objectType";
import api from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
export const StatsServices = {
  getStats: async () => {
    return await api.get<StatsProps[]>("/api/stats");
  },
};
