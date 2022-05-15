import axios from "axios";
import { toast } from "react-toastify";
import {
  getTracksLoading,
  getTracksSuccess,
  getTracksFailed,
  searchTracksFailed,
  searchTracksLoading,
  searchTracksSuccess,
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

export const searchTracks = (searchData) => {
  return async (dispatch) => {
    dispatch(searchTracksLoading());
    try {
      const response = await axios.get(
        `${apiRoutes.tracks.search}?name=${searchData.trackName}&authorId=${searchData.authorId}&genreId=${searchData.genreId}`
      );
      dispatch(searchTracksSuccess(response.data));
    } catch (err) {
      dispatch(searchTracksFailed(err.response.data));
      toast.error(err.response.data.message);
    }
  };
};
