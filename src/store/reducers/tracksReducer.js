// action types
const GET_TRACKS_LOADING = "GET_TRACKS_LOADING";
const GET_TRACKS_SUCCESS = "GET_TRACKS_SUCCESS";
const GET_TRACKS_FAILED = "GET_TRACKS_FAILED";
const SEARCH_TRACKS_LOADING = "SEARCH_TRACKS_LOADING";
const SEARCH_TRACKS_SUCCESS = "SEARCH_TRACKS_SUCCESS";
const SEARCH_TRACKS_FAILED = "SEARCH_TRACKS_FAILED";
const RESET_SEARCH_TRACKS = "RESET_SEARCH_TRACKS";
const SET_ACTIVE_TRACK = "SET_ACTIVE_TRACK";

const initialState = {
  getTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  searchTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  activeTrack: {
    trackID: 0,
    trackName: "",
    activeTrackArray: "allTracks",
    trackIndex: 0,
    isPlaying: false,
  },
  audioPlayerIsActive: false,
  tracks: [],
  searchedTracks: [],
};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRACKS_LOADING:
      return {
        ...state,
        getTracks: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case GET_TRACKS_SUCCESS:
      return {
        ...state,
        getTracks: {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        },
        tracks: action.payload.tracks,
      };
    case GET_TRACKS_FAILED:
      return {
        ...state,
        getTracks: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case SEARCH_TRACKS_LOADING:
      return {
        ...state,
        searchTracks: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
        activeTrack: {
          trackID: 0,
          trackName: "",
          activeTrackArray: "searchedTracks",
          trackIndex: 0,
          isPlaying: false,
        },
        audioPlayerIsActive: false,
      };
    case SEARCH_TRACKS_SUCCESS:
      return {
        ...state,
        searchTracks: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        searchedTracks: action.payload.tracks,
      };
    case SEARCH_TRACKS_FAILED:
      return {
        ...state,
        searchTracks: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case RESET_SEARCH_TRACKS:
      return {
        ...state,
        searchTracks: {
          success: false,
          loading: false,
          failed: false,
          message: "",
        },
        searchedTracks: [],
      };
    case SET_ACTIVE_TRACK:
      return {
        ...state,
        activeTrack: action.payload,
        audioPlayerIsActive: true,
      };
    default:
      return state;
  }
};

// action creators
export const getTracksLoading = () => ({ type: GET_TRACKS_LOADING });

export const getTracksSuccess = (payload) => ({
  type: GET_TRACKS_SUCCESS,
  payload,
});

export const getTracksFailed = (payload) => ({
  type: GET_TRACKS_FAILED,
  payload,
});

export const searchTracksLoading = () => ({ type: SEARCH_TRACKS_LOADING });

export const searchTracksSuccess = (payload) => ({
  type: SEARCH_TRACKS_SUCCESS,
  payload,
});

export const searchTracksFailed = (payload) => ({
  type: SEARCH_TRACKS_FAILED,
  payload,
});

export const setActiveTrack = (track) => ({
  type: SET_ACTIVE_TRACK,
  payload: track,
});

export const resetSearchTracks = () => ({ type: RESET_SEARCH_TRACKS });

export default trackReducer;
