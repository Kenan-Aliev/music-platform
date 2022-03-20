import axios from "axios";
import { rootApi } from "../store/api";
import { loginSuccess, loginFailed } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
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
      const dispatch = useDispatch();
      try {
        const response = await axios(`${rootApi}/token/refresh`, {
          withCredentials: true,
        });
        dispatch(loginSuccess(response.data));
        localStorage.setItem("token", response.data.token);
        return $api.request(originalRequest);
      } catch (err) {
        dispatch(loginFailed(err.response.data));
        localStorage.removeItem("token");
        toast.error(err.response.data.message);
      }
    }
    throw error;
  }
);

export default $api;
