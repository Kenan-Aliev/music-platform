// constants
const GET_ALL_USERS_PLAYLISTS_LOADING = "GET_ALL_USERS_PLAYLISTS_LOADING";
const GET_ALL_USERS_PLAYLISTS_SUCCESS = "GET_ALL_USERS_PLAYLISTS_SUCCESS";
const GET_ALL_USERS_PLAYLISTS_FAILED = "GET_ALL_USERS_PLAYLISTS_FAILED";

const initialState = {
  getUsersPlaylists: {
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

export default usersPlaylistsReducer;
