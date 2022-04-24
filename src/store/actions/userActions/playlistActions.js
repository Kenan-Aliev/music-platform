import { toast } from "react-toastify";
import $api from "../../../http/index";
import {
  getUserPlaylistsFailed,
  getUserPlaylistsLoading,
  getUserPlaylistsSuccess,
  addNewPlayListFailed,
  addNewPlayListLoading,
  addnNewPLayListSuccess,
  deletePlaylistFailed,
  deletePlaylistLoading,
  deletePlaylistSuccess,
} from "../../reducers/userReducers/playlistReducer.js";
import { logoutSuccess } from "../../reducers/authReducer";
import apiRoutes from "../../api";

export const getUserPlaylists = () => {
  return async (dispatch) => {
    dispatch(getUserPlaylistsLoading());
    try {
      const response = await $api.get(apiRoutes.user.playlists.getAll);
      dispatch(getUserPlaylistsSuccess(response.data));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(getUserPlaylistsFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const addNewPlaylist = (playlistName) => {
  return async (dispatch) => {
    dispatch(addNewPlayListLoading());
    try {
      const response = await $api.post(apiRoutes.user.playlists.new, {
        name: playlistName,
      });
      dispatch(addnNewPLayListSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewPlayListFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const deletePlaylist = (playlistId) => {
  return async (dispatch) => {
    dispatch(deletePlaylistLoading());
    try {
      const response = await $api.delete(
        `${apiRoutes.user.playlists.delete}/${playlistId}`
      );
      dispatch(deletePlaylistSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(deletePlaylistFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
