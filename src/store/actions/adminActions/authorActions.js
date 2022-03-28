import { toast } from "react-toastify";
import $api from "../../../http/index";
import apiRoutes from "../../api";
import {
  getAllAuthorsLoading,
  getAllAuthorsSuccess,
  getAllAuthorsFailed,
  addNewAuthorFailed,
  addNewAuthorLoading,
  addNewAuthorSuccess,
} from "../../reducers/adminReducers/authorReducers";
import { logoutSuccess } from "../../reducers/authReducer";

export const getAllAuthors = () => {
  return async (dispatch) => {
    dispatch(getAllAuthorsLoading());
    try {
      const response = await $api(apiRoutes.admin.authors.getAll);
      dispatch(getAllAuthorsSuccess(response.data));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(getAllAuthorsFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const addNewAuthor = (author) => {
  return async (dispatch) => {
    dispatch(addNewAuthorLoading());
    try {
      const response = await $api.post(apiRoutes.admin.authors.new, {
        name: author,
      });
      dispatch(addNewAuthorSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewAuthorFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
