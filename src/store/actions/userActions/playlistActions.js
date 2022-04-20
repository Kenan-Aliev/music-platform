import { toast } from "react-toastify";
import $api from "../../../http/index";
import {
  getUserPlaylistsFailed,
  getUserPlaylistsLoading,
  getUserPlaylistsSuccess,
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
