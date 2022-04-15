// constants
const GET_ALL_TRACKS_LOADING = "GET_ALL_TRACKS_LOADING";
const GET_ALL_TRACKS_SUCCESS = "GET_ALL_TRACKS_SUCCESS";
const GET_ALL_TRACKS_FAILED = "GET_ALL_TRACKS_FAILED";
const ADD_NEW_TRACK_FAILED = "ADD_NEW_TRACK_FAILED";
const ADD_NEW_TRACK_LOADING = "ADD_NEW_TRACK_LOADING";
const ADD_NEW_TRACK_SUCCESS = "ADD_NEW_TRACK_SUCCESS";
const DELETE_TRACK_SUCCESS = "DELETE_TRACK_SUCCESS";
const DELETE_TRACK_LOADING = "DELETE_TRACK_LOADING";
const DELETE_TRACK_FAILED = "DELETE_TRACK_FAILED";

const initialState = {
  getAllTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addNewTrack: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  tracks: [],
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRACKS_LOADING:
      return {
        ...state,
        getAllTracks: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };

    case GET_ALL_TRACKS_SUCCESS:
      return {
        ...state,
        getAllTracks: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        tracks: action.payload.tracks,
      };

    case GET_ALL_TRACKS_FAILED:
      return {
        ...state,
        getAllTracks: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };

    case ADD_NEW_TRACK_LOADING:
      return {
        ...state,
        addNewTrack: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case ADD_NEW_TRACK_SUCCESS:
      return {
        ...state,
        addNewTrack: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        tracks: action.payload.tracks,
      };
    case ADD_NEW_TRACK_FAILED:
      return {
        ...state,
        addNewTrack: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };

    case DELETE_TRACK_LOADING:
      return {
        ...state,
        deleteTracks: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };

    case DELETE_TRACK_SUCCESS:
      return {
        ...state,
        deleteTracks: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        tracks: action.payload.tracks,
      };
    case DELETE_TRACK_FAILED:
      return {
        ...state,
        deleteTracks: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
};

// action creators
export const getAllTracksLoading = () => ({ type: GET_ALL_TRACKS_LOADING });

export const getAllTracksSuccess = (payload) => ({
  type: GET_ALL_TRACKS_SUCCESS,
  payload,
});

export const getAllTracksFailed = (payload) => ({
  type: GET_ALL_TRACKS_FAILED,
  payload,
});

export const addNewTrackLoading = () => ({
  type: ADD_NEW_TRACK_LOADING,
});

export const addNewTrackSuccess = (payload) => ({
  type: ADD_NEW_TRACK_SUCCESS,
  payload,
});

export const addNewTrackFailed = (payload) => ({
  type: ADD_NEW_TRACK_FAILED,
  payload,
});

export const deleteTrackFailed = (payload) => ({
  type: DELETE_TRACK_FAILED,
  payload,
});

export const deleteTrackLoading = () => ({
  type: DELETE_TRACK_LOADING,
});

export const deleteTrackSuccess = (payload) => ({
  type: DELETE_TRACK_SUCCESS,
  payload,
});

export default tracksReducer;
