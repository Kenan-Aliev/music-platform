// action types
const GET_TRACKS_LOADING = "GET_TRACKS_LOADING";
const GET_TRACKS_SUCCESS = "GET_TRACKS_SUCCESS";
const GET_TRACKS_FAILED = "GET_TRACKS_FAILED";

const initialState = {
  getTracks: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  tracks: [],
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

export default trackReducer;
