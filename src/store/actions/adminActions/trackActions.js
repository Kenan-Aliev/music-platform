import $api from "../../../http/index";
import axios from "axios";
import apiRoutes from "../../api";
import { toast } from "react-toastify";
import {
  getAllTracksFailed,
  getAllTracksLoading,
  getAllTracksSuccess,
  addNewTrackFailed,
  addNewTrackLoading,
  addNewTrackSuccess,
  deleteTrackFailed,
  deleteTrackLoading,
  deleteTrackSuccess,
} from "../../reducers/adminReducers/trackReducer";
import { logoutSuccess } from "../../reducers/authReducer";

export const getAllTracks = () => {
  return async (dispatch) => {
    dispatch(getAllTracksLoading());
    try {
      const tracks = await axios.get(apiRoutes.admin.tracks.getAll);
      dispatch(getAllTracksSuccess(tracks.data));
    } catch (err) {
      dispatch(getAllTracksFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const addNewTrack = (trackData) => {
  return async (dispatch) => {
    dispatch(addNewTrackLoading());
    try {
      const tracks = await $api.post(apiRoutes.admin.tracks.new, trackData,{
        
      });
      dispatch(addNewTrackSuccess(tracks.data));
      toast.success(tracks.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(addNewTrackFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const deleteTracks = (tracks) => {
  return async (dispatch) => {
    dispatch(deleteTrackLoading());
    try {
      const response = await $api.delete(
        `${apiRoutes.admin.tracks.delete}/${JSON.stringify(tracks)}`
      );
      dispatch(deleteTrackSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutSuccess(err.response.data));
        localStorage.removeItem("token");
      }
      dispatch(deleteTrackFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
