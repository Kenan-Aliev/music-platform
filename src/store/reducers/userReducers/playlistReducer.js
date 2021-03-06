// constants
const GET_USER_PLAYLISTS_LOADING = "GET_USER_PLAYLISTS_LOADING";
const GET_USER_PLAYLISTS_SUCCESS = "GET_USER_PLAYLISTS_SUCCESS";
const GET_USER_PLAYLISTS_FAILED = "GET_USER_PLAYLISTS_FAILED";
const GET_PLAYLIST_TRACKS_LOADING = "GET_PLAYLIST_TRACKS_LOADING";
const GET_PLAYLIST_TRACKS_SUCCESS = "GET_PLAYLIST_TRACKS_SUCCESS";
const GET_PLAYLIST_TRACKS_FAILED = "GET_PLAYLIST_TRACKS_FAILED";
const ADD_NEW_PLAYLIST_LOADING = "ADD_NEW_PLAYLIST_LOADING";
const ADD_NEW_PLAYLIST_SUCCESS = "ADD_NEW_PLAYLIST_SUCCESS";
const ADD_NEW_PLAYLIST_FAILED = "ADD_NEW_PLAYLIST_FAILED";
const ADD_NEW_TRACK_TO_PLAYLISTS_LOADING = "ADD_NEW_TRACK_TO_PLAYLISTS_LOADING";
const ADD_NEW_TRACK_TO_PLAYLISTS_SUCCESS = "ADD_NEW_TRACK_TO_PLAYLISTS_SUCCESS";
const ADD_NEW_TRACK_TO_PLAYLISTS_FAILED = "ADD_NEW_TRACK_TO_PLAYLISTS_FAILED";
const DELETE_PLAYLIST_LOADING = "DELETE_PLAYLIST_LOADING";
const DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS";
const DELETE_PLAYLIST_FAILED = "DELETE_PLAYLIST_FAILED";
const DELETE_TRACK_FROM_PLAYLIST_LOADING = "DELETE_TRACK_FROM_PLAYLIST_LOADING";
const DELETE_TRACK_FROM_PLAYLIST_SUCCESS = "DELETE_TRACK_FROM_PLAYLIST_SUCCESS";
const DELETE_TRACK_FROM_PLAYLIST_FAILED = "DELETE_TRACK_FROM_PLAYLIST_FAILED";

const initialState = {
  getUserPlaylists: {
    success: false,
    failed: false,
    loading: false,
    message: "",
  },
  getPlaylistTracks: {
    success: false,
    failed: false,
    loading: false,
    message: "",
  },
  addNewPlaylist: {
    success: false,
    failed: false,
    loading: false,
    message: "",
  },
  addNewTrackToPlaylists: {
    success: false,
    failed: false,
    loading: false,
    message: "",
  },
  deletePlaylist: {
    success: false,
    failed: false,
    loading: false,
    message: "",
  },
  deleteTrackFromPlaylist: {
    success: false,
    failed: false,
    loading: false,
    message: "",
  },
  userPlaylists: [],
  playlistTracks: [],
};

const playlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PLAYLISTS_LOADING:
      return {
        ...state,
        getUserPlaylists: {
          success: false,
          failed: false,
          loading: true,
          message: "",
        },
      };

    case GET_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        getUserPlaylists: {
          success: true,
          failed: false,
          loading: false,
          message: action.payload.message,
        },
        userPlaylists: action.payload.playlists,
      };

    case GET_USER_PLAYLISTS_FAILED:
      return {
        ...state,
        getUserPlaylists: {
          success: false,
          failed: true,
          loading: false,
          message: action.payload.message,
        },
      };
    case GET_PLAYLIST_TRACKS_LOADING:
      return {
        ...state,
        getPlaylistTracks: {
          success: false,
          failed: false,
          loading: true,
          message: "",
        },
      };
    case GET_PLAYLIST_TRACKS_SUCCESS:
      return {
        ...state,
        getPlaylistTracks: {
          success: true,
          failed: false,
          loading: false,
          message: action.payload.message,
        },
        playlistTracks: action.payload.tracks,
      };
    case GET_PLAYLIST_TRACKS_FAILED:
      return {
        ...state,
        getPlaylistTracks: {
          success: false,
          failed: true,
          loading: false,
          message: action.payload.message,
        },
      };
    case ADD_NEW_PLAYLIST_LOADING:
      return {
        ...state,
        addNewPlaylist: {
          success: false,
          failed: false,
          loading: true,
          message: "",
        },
      };

    case ADD_NEW_PLAYLIST_SUCCESS:
      return {
        ...state,
        addNewPlaylist: {
          success: true,
          failed: false,
          loading: false,
          message: action.payload.message,
        },
        userPlaylists: action.payload.playlists,
      };

    case ADD_NEW_PLAYLIST_FAILED:
      return {
        ...state,
        addNewPlaylist: {
          success: false,
          failed: true,
          loading: false,
          message: action.payload.message,
        },
      };
    case ADD_NEW_TRACK_TO_PLAYLISTS_LOADING:
      return {
        ...state,
        addNewTrackToPlaylists: {
          success: false,
          failed: false,
          loading: true,
          message: "",
        },
      };
    case ADD_NEW_TRACK_TO_PLAYLISTS_SUCCESS:
      return {
        ...state,
        addNewTrackToPlaylists: {
          success: true,
          failed: false,
          loading: false,
          message: action.payload.message,
        },
      };

    case ADD_NEW_TRACK_TO_PLAYLISTS_FAILED:
      return {
        ...state,
        addNewTrackToPlaylists: {
          success: false,
          failed: true,
          loading: false,
          message: action.payload.message,
        },
      };
    case DELETE_PLAYLIST_LOADING:
      return {
        ...state,
        deletePlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };

    case DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        deletePlaylist: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        userPlaylists: action.payload.playlists,
      };

    case DELETE_PLAYLIST_FAILED:
      return {
        ...state,
        deletePlaylist: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case DELETE_TRACK_FROM_PLAYLIST_LOADING:
      return {
        ...state,
        deleteTrackFromPlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case DELETE_TRACK_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        deleteTrackFromPlaylist: {
          success: true,
          loading: true,
          failed: false,
          message: action.payload.message,
        },
        playlistTracks: action.payload.tracks,
      };
    case DELETE_TRACK_FROM_PLAYLIST_FAILED:
      return {
        ...state,
        deleteTrackFromPlaylist: {
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
export const getUserPlaylistsLoading = () => ({
  type: GET_USER_PLAYLISTS_LOADING,
});

export const getUserPlaylistsSuccess = (payload) => ({
  type: GET_USER_PLAYLISTS_SUCCESS,
  payload,
});

export const getUserPlaylistsFailed = (payload) => ({
  type: GET_USER_PLAYLISTS_FAILED,
  payload,
});

export const getPlaylistTracksLoading = () => ({
  type: GET_PLAYLIST_TRACKS_LOADING,
});

export const getPlaylistTracksSuccess = (payload) => ({
  type: GET_PLAYLIST_TRACKS_SUCCESS,
  payload,
});

export const getPlaylistTracksFailed = (payload) => ({
  type: GET_PLAYLIST_TRACKS_FAILED,
  payload,
});

export const addNewPlayListLoading = () => ({ type: ADD_NEW_PLAYLIST_LOADING });

export const addnNewPLayListSuccess = (payload) => ({
  type: ADD_NEW_PLAYLIST_SUCCESS,
  payload,
});

export const addNewPlayListFailed = (payload) => ({
  type: ADD_NEW_PLAYLIST_FAILED,
  payload,
});

export const addNewTrackToPlaylistsLoading = () => ({
  type: ADD_NEW_TRACK_TO_PLAYLISTS_LOADING,
});

export const addNewTrackToPlaylistsSuccess = (payload) => ({
  type: ADD_NEW_TRACK_TO_PLAYLISTS_LOADING,
  payload,
});

export const addNewTrackToPlaylistsFailed = (payload) => ({
  type: ADD_NEW_TRACK_TO_PLAYLISTS_LOADING,
  payload,
});

export const deletePlaylistLoading = () => ({ type: DELETE_PLAYLIST_LOADING });

export const deletePlaylistSuccess = (payload) => ({
  type: DELETE_PLAYLIST_SUCCESS,
  payload,
});

export const deletePlaylistFailed = (payload) => ({
  type: DELETE_PLAYLIST_FAILED,
  payload,
});

export const deleteTrackFromPlaylistLoading = () => ({
  type: DELETE_TRACK_FROM_PLAYLIST_LOADING,
});

export const deleteTrackFromPlaylistSuccess = (payload) => ({
  type: DELETE_TRACK_FROM_PLAYLIST_SUCCESS,
  payload,
});

export const deleteTrackFromPlaylistFailed = (payload) => ({
  type: DELETE_TRACK_FROM_PLAYLIST_FAILED,
  payload,
});

export default playlistsReducer;
