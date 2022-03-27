import $api from "../../../http/index";
import apiRoutes from "../../api";
import { toast } from "react-toastify";
import {
  getAllGenresFailed,
  getAllGenresLoading,
  getAllGenresSuccess,
  addNewGenreFailed,
  addNewGenreLoading,
  addNewGenreSuccess,
} from "../../reducers/adminReducers/genreReducers";
import { logoutSuccess } from "../../reducers/authReducer";

export const getAllGenres = () => {
  return async (dispatch) => {
    dispatch(getAllGenresLoading());
    try {
      const genres = await $api.get(apiRoutes.admin.genres.getAll);
      dispatch(getAllGenresSuccess(genres.data));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(getAllGenresFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const addNewGenre = (genre) => {
  return async (dispatch) => {
    dispatch(addNewGenreLoading());
    try {
      const response = await $api.post(apiRoutes.admin.genres.new, {
        name: genre,
      });
      dispatch(addNewGenreSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewGenreFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
