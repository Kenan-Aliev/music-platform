import axios from "axios";
import { toast } from "react-toastify";
import {
  getTracksLoading,
  getTracksSuccess,
  getTracksFailed,
} from "../reducers/tracksReducer";
import apiRoutes from "../api";

export const getAllTracks = () => {
  return async (dispatch) => {
    dispatch(getTracksLoading());
    try {
      const response = await axios.get(apiRoutes.tracks.getAll);
      dispatch(getTracksSuccess(response.data));
    } catch (err) {
      dispatch(getTracksFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
