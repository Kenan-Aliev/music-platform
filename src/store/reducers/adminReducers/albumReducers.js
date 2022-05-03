// constants
const GET_ALL_ALBUMS_LOADING = "GET_ALL_ALBUMS_LOADING";
const GET_ALL_ALBUMS_SUCCESS = "GET_ALL_ALBUMS_SUCCESS";
const GET_ALL_ALBUMS_FAILED = "GET_ALL_ALBUMS_FAILED";
const ADD_NEW_ALBUM_LOADING = "ADD_NEW_ALBUM_LOADING";
const ADD_NEW_ALBUM_SUCCESS = "ADD_NEW_ALBUM_SUCCESS";
const ADD_NEW_ALBUM_FAILED = "ADD_NEW_ALBUM_FAILED";

const initialState = {
  getAlbums: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addNewAlbum: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  albums: [],
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ALBUMS_LOADING:
      return {
        ...state,
        getAlbums: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case GET_ALL_ALBUMS_SUCCESS:
      return {
        ...state,
        getAlbums: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        albums: action.payload.albums,
      };
    case GET_ALL_ALBUMS_FAILED:
      return {
        ...state,
        getAlbums: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case ADD_NEW_ALBUM_LOADING:
      return {
        ...state,
        addNewAlbum: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case ADD_NEW_ALBUM_SUCCESS:
      return {
        ...state,
        addNewAlbum: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        albums: action.payload.albums,
      };
    case ADD_NEW_ALBUM_FAILED:
      return {
        ...state,
        addNewAlbum: {
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
export const getAllAlbumsLoading = () => ({ type: GET_ALL_ALBUMS_LOADING });

export const getAllAlbumsSuccess = (payload) => ({
  type: GET_ALL_ALBUMS_SUCCESS,
  payload,
});

export const getAllAlbumsFailed = (payload) => ({
  type: GET_ALL_ALBUMS_FAILED,
  payload,
});

export const addNewAlbumLoading = () => ({ type: ADD_NEW_ALBUM_LOADING });

export const addNewAlbumSuccess = (payload) => ({
  type: ADD_NEW_ALBUM_SUCCESS,
  payload,
});

export const addNewAlbumFailed = (payload) => ({
  type: ADD_NEW_ALBUM_FAILED,
  payload,
});
export default albumsReducer;
