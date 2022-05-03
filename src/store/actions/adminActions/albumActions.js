import { toast } from "react-toastify";
import $api from "../../../http/index";
import apiRoutes from "../../api";
import {
  getAllAlbumsFailed,
  getAllAlbumsLoading,
  getAllAlbumsSuccess,
  addNewAlbumFailed,
  addNewAlbumLoading,
  addNewAlbumSuccess,
} from "../../reducers/adminReducers/albumReducers";
import { logoutSuccess } from "../../reducers/authReducer";

export const getAllAlbums = () => {
  return async (dispatch) => {
    dispatch(getAllAlbumsLoading());
    try {
      const response = await $api.get(apiRoutes.admin.albums.getAll);
      dispatch(getAllAlbumsSuccess(response.data));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(getAllAlbumsFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const addNewAlbum = (albumData) => {
  return async (dispatch) => {
    dispatch(addNewAlbumLoading());
    try {
      const response = await $api.post(apiRoutes.admin.albums.new, albumData);
      dispatch(getAllAlbumsSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewAlbumFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
