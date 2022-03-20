import axios from "axios";
import { toast } from "react-toastify";
import {
  registrationLoading,
  registrationSuccess,
  registrationFailed,
  loginLoading,
  loginSuccess,
  loginFailed,
  logoutFailed,
  logoutLoading,
  logoutSuccess,
} from "../reducers/authReducer";
import apiRoutes from "../api";

export const registration = (userData) => {
  return async (dispatch) => {
    dispatch(registrationLoading());
    try {
      const response = await axios.post(apiRoutes.auth.registration, userData);
      dispatch(registrationSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      dispatch(registrationFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const login = (userData) => {
  return async (dispatch) => {
    dispatch(loginLoading());
    try {
      const response = await axios.post(apiRoutes.auth.login, userData, {
        withCredentials: true,
      });
      dispatch(loginSuccess(response.data));
      localStorage.setItem("token", response.data.tokens.accessToken);
      toast.success(response.data.message);
    } catch (err) {
      dispatch(loginFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const response = await axios(apiRoutes.auth.refresh, {
        withCredentials: true,
      });
      dispatch(loginSuccess(response.data));
      localStorage.setItem("token", response.data.tokens.accessToken);
    } catch (err) {
      dispatch(loginFailed(err.response.data));
      localStorage.removeItem("token");
      toast.error(err.response.data.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutLoading());
    try {
      const response = await axios(apiRoutes.auth.logout, {
        withCredentials: true,
      });
      dispatch(logoutSuccess(response.data));
      localStorage.removeItem("token");
      toast.success(response.data.message);
    } catch (err) {
      dispatch(logoutFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
