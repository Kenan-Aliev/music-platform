import axios from "axios";
import { toast } from "react-toastify";
import $api from "../../http/index";
import {
  getTracksLoading,
  getTracksSuccess,
  getTracksFailed,
  addMusicToTrackListLoading,
  addMusicToTrackListSuccess,
  addNewTrackToTrackListFailed,
  getMyTracksFailed,
  getMyTracksLoading,
  getMyTracksSuccess,
} from "../reducers/tracksReducer";
import apiRoutes from "../api";

export const getAllTracks = () => {
  return async (dispatch) => {
    dispatch(getTracksLoading());
    try {
      const response = await axios.get(apiRoutes.tracks.getALl);
      dispatch(getTracksSuccess(response.data));
    } catch (err) {
      dispatch(getTracksFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};

export const addNewMusicToTrackList = (trackId) => {
  return async (dispatch) => {
    dispatch(addMusicToTrackListLoading());
    try {
      const response = await $api.post(apiRoutes.tracks.addMusicToTrackList, {
        trackId,
      });
      dispatch(addMusicToTrackListSuccess(response.data));
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      dispatch(addNewTrackToTrackListFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
