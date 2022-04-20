// constants
const GET_USER_PLAYLISTS_LOADING = "GET_USER_PLAYLISTS_LOADING";
const GET_USER_PLAYLISTS_SUCCESS = "GET_USER_PLAYLISTS_SUCCESS";
const GET_USER_PLAYLISTS_FAILED = "GET_USER_PLAYLISTS_FAILED";
const ADD_NEW_PLAYLIST_LOADING = "ADD_NEW_PLAYLIST_LOADING";
const ADD_NEW_PLAYLIST_SUCCESS = "ADD_NEW_PLAYLIST_SUCCESS";
const ADD_NEW_PLAYLIST_FAILED = "ADD_NEW_PLAYLIST_FAILED";

const initialState = {
  getUserPlaylists: {
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

export default playlistsReducer;
