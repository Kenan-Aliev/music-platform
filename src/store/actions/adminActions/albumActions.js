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
  addNewTracksToAlbumFailed,
  addNewTracksToAlbumLoaading,
  addNewTracksToAlbumSuccess,
  deleteTrackFromAlbumFailed,
  deleteTrackFromAlbumLoading,
  deleteTrackFromAlbumSuccess,
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
      dispatch(addNewAlbumSuccess(response.data));
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

export const addNewTracksToAlbum = (data) => {
  return async (dispatch) => {
    dispatch(addNewAlbumLoading());
    try {
      const response = await $api.post(
        apiRoutes.admin.albums.addNewTracksToAlbum,
        data
      );
      dispatch(addNewTracksToAlbumSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewTracksToAlbumFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const deleteAlbumTrack = (albumId, trackId) => {
  return async (dispatch) => {
    dispatch(deleteTrackFromAlbumLoading());
    try {
      const response = await $api.delete(
        `${apiRoutes.admin.albums.deleteTrackFromAlbum}/${albumId}/${trackId}`
      );
      dispatch(deleteTrackFromAlbumSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(deleteTrackFromAlbumFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
