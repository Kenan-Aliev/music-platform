import { toast } from "react-toastify";
import $api from "../../../http/index";
import {
  addMusicToTrackListLoading,
  addMusicToTrackListSuccess,
  addNewTrackToTrackListFailed,
  getMyTracksFailed,
  getMyTracksLoading,
  getMyTracksSuccess,
  deleteTrackFromTrackListFailed,
  deleteTrackFromTrackListLoading,
  deleteTrackFromTrackListSuccess,
} from "../../reducers/userReducers/trackReducer";
import { logoutSuccess } from "../../reducers/authReducer";
import apiRoutes from "../../api";

export const addNewMusicToTrackList = (trackId) => {
  return async (dispatch) => {
    dispatch(addMusicToTrackListLoading());
    try {
      const response = await $api.post(
        apiRoutes.user.tracks.addMusicToTrackList,
        {
          trackId,
        }
      );
      dispatch(addMusicToTrackListSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewTrackToTrackListFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const getMyTracks = () => {
  return async (dispatch) => {
    dispatch(getMyTracksLoading());
    try {
      const response = await $api.get(apiRoutes.user.tracks.getAll);
      dispatch(getMyTracksSuccess(response.data));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(getMyTracksFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const deleteTrackFromTrackList = (trackId) => {
  return async (dispatch) => {
    dispatch(deleteTrackFromTrackListLoading());
    try {
      const response = await $api.delete(
        `${apiRoutes.user.tracks.deleteMusicFromTrackList}/${trackId}`
      );
      dispatch(deleteTrackFromTrackListSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(deleteTrackFromTrackListFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};


