import axios from "axios";

const api = axios.create({
  baseURL: "https://sisda.bwssumatera1.net/api",
});

export default api;
