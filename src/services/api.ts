import axios from "axios";

const api = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
