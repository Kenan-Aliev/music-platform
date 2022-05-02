import $api from "../../../http/index";
import apiRoutes from "../../api";
import { toast } from "react-toastify";
import {
  getUsersPlaylistsFailed,
  getUsersPlaylistsLoading,
  getUsersPlaylistsSuccess,
} from "../../reducers/adminReducers/usersPlaylistsReducers";
import { logoutSuccess } from "../../reducers/authReducer";

export const getUsersPlaylists = () => {
  return async (dispatch) => {
    dispatch(getUsersPlaylistsLoading());
    try {
      const response = await $api.get(apiRoutes.admin.users_playlists.getAll);
      dispatch(getUsersPlaylistsSuccess(response.data));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(getUsersPlaylistsFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
