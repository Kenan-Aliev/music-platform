// constants
const GET_ALL_USERS_PLAYLISTS_LOADING = "GET_ALL_USERS_PLAYLISTS_LOADING";
const GET_ALL_USERS_PLAYLISTS_SUCCESS = "GET_ALL_USERS_PLAYLISTS_SUCCESS";
const GET_ALL_USERS_PLAYLISTS_FAILED = "GET_ALL_USERS_PLAYLISTS_FAILED";
const DELETE_USER_PLAYLIST_LOADING = "DELETE_USER_PLAYLIST_LOADING";
const DELETE_USER_PLAYLIST_SUCCESS = "DELETE_USER_PLAYLIST_SUCCESS";
const DELETE_USER_PLAYLIST_FAILED = "DELETE_USER_PLAYLIST_FAILED";

const initialState = {
  getUsersPlaylists: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteUserPlaylist: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  users_playlists: [],
};

const usersPlaylistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_PLAYLISTS_LOADING:
      return {
        ...state,
        getUsersPlaylists: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };

    case GET_ALL_USERS_PLAYLISTS_SUCCESS:
      return {
        ...state,
        getUsersPlaylists: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        users_playlists: action.payload.users_playlists,
      };
    case GET_ALL_USERS_PLAYLISTS_FAILED:
      return {
        ...state,
        getUsersPlaylists: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case DELETE_USER_PLAYLIST_LOADING:
      return {
        ...state,
        deleteUserPlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case DELETE_USER_PLAYLIST_SUCCESS:
      return {
        ...state,
        deleteUserPlaylist: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        users_playlists: state.users_playlists.map((user) =>
          user.id === action.payload.user_playlists.id
            ? action.payload.user_playlists
            : user
        ),
      };
    case DELETE_USER_PLAYLIST_FAILED:
      return {
        ...state,
        deleteUserPlaylist: {
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
export const getUsersPlaylistsLoading = () => ({
  type: GET_ALL_USERS_PLAYLISTS_LOADING,
});

export const getUsersPlaylistsSuccess = (payload) => ({
  type: GET_ALL_USERS_PLAYLISTS_SUCCESS,
  payload,
});

export const getUsersPlaylistsFailed = (payload) => ({
  type: GET_ALL_USERS_PLAYLISTS_FAILED,
  payload,
});

export const deleteUserPlaylistLoading = () => ({
  type: DELETE_USER_PLAYLIST_LOADING,
});

export const deleteUserPlaylistSuccess = (payload) => ({
  type: DELETE_USER_PLAYLIST_SUCCESS,
  payload,
});

export const deleteUserPlaylistFailed = (payload) => ({
  type: DELETE_USER_PLAYLIST_FAILED,
  payload,
});

export default usersPlaylistsReducer;
