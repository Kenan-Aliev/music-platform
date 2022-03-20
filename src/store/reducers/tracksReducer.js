// action types
const GET_TRACKS_LOADING = "GET_TRACKS_LOADING";
const GET_TRACKS_SUCCESS = "GET_TRACKS_SUCCESS";
const GET_TRACKS_FAILED = "GET_TRACKS_FAILED";
const GET_MY_TRACKS_SUCCESS = "GET_MY_TRACKS_SUCCESS";
const GET_MY_TRACKS_LOADING = "GET_MY_TRACKS_LOADING";
const GET_MY_TRACKS_FAILED = "GET_MY_TRACKS_FAILED";
const ADD_NEW_TRACK_TO_TRACKLIST_SUCCESS = "ADD_NEW_TRACK_TO_TRACKLIST_SUCCESS";
const ADD_NEW_TRACK_TO_TRACKLIST_LOADING = "ADD_NEW_TRACK_TO_TRACKLIST_LOADING";
const ADD_NEW_TRACK_TO_TRACKLIST_FAILED = "ADD_NEW_TRACK_TO_TRACKLIST_FAILED";

const initialState = {
  getTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  getMyTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addNewTrackToTrackList: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  tracks: [],
  myTracks: [],
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
          message:""
        },
      };
    case GET_TRACKS_SUCCESS:
      return {
        ...state,
        getTracks: {
          loading: false,
          success: true,
          failed: false,
          message:""
        },
        tracks: action.payload,
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

    case GET_MY_TRACKS_LOADING:
      return {
        ...state,
        getMyTracks: {
          loading: true,
          success: false,
          failed: false,
          message: "",
        },
      };

    case GET_MY_TRACKS_SUCCESS:
      return {
        ...state,
        getMyTracks: {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        },
        myTracks: action.payload.tracks,
      };

    case GET_MY_TRACKS_FAILED:
      return {
        ...state,
        getMyTracks: {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        },
      };

    case ADD_NEW_TRACK_TO_TRACKLIST_LOADING:
      return {
        ...state,
        addNewTrack: {
          loading: true,
          success: false,
          failed: false,
          message: "",
        },
      };

    case ADD_NEW_TRACK_TO_TRACKLIST_SUCCESS:
      return {
        ...state,
        addNewTrack: {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        },
      };
    case ADD_NEW_TRACK_TO_TRACKLIST_FAILED:
      return {
        ...state,
        addNewTrack: {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        },
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

export const getMyTracksLoading = () => ({ type: GET_MY_TRACKS_LOADING });

export const getMyTracksSuccess = (payload) => ({
  type: GET_MY_TRACKS_SUCCESS,
  payload,
});

export const getMyTracksFailed = (payload) => ({
  type: GET_MY_TRACKS_FAILED,
  payload,
});

export const addMusicToTrackListLoading = () => ({
  type: ADD_NEW_TRACK_TO_TRACKLIST_LOADING,
});

export const addMusicToTrackListSuccess = (payload) => ({
  type: ADD_NEW_TRACK_TO_TRACKLIST_SUCCESS,
  payload,
});

export const addNewTrackToTrackListFailed = (payload) => ({
  type: ADD_NEW_TRACK_TO_TRACKLIST_FAILED,
  payload,
});

export default trackReducer;
