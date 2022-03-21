import axios from "axios";
import { rootApi } from "../store/api";
import { toast } from "react-toastify";

const $api = axios.create({
  withCredentials: true,
  baseURL: rootApi,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios(`${rootApi}/token/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.tokens.accessToken);
        return $api.request(originalRequest);
      } catch (err) {
        console.log("Вы не авторизованы");
      }
    }
    throw error;
  }
);

export default $api;
