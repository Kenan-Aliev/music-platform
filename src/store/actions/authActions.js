import axios from "axios";
import { toast } from "react-toastify";
import {
  registrationLoading,
  registrationSuccess,
  registrationFailed,
  loginLoading,
  loginSuccess,
  loginFailed,
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
      const response = await axios.post(apiRoutes.auth.login, userData);
      dispatch(loginSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      dispatch(loginFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
