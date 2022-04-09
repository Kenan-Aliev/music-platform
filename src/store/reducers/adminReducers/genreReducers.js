// constants
const GET_ALL_GENRES_LOADING = "GET_ALL_GENRES_LOADING";
const GET_ALL_GENRES_SUCCESS = "GET_ALL_GENRES_SUCCESS";
const GET_ALL_GENRES_FAILED = "GET_ALL_GENRES_FAILED";
const ADD_NEW_GENRE_LOADING = "ADD_NEW_GENRE_LOADING";
const ADD_NEW_GENRE_SUCCESS = "ADD_NEW_GENRE_SUCCESS";
const ADD_NEW_GENRE_FAILED = "ADD_NEW_GENRE_FAILED";
const DELETE_GENRE_FAILED = "DELETE_GENRE_FAILED";
const DELETE_GENRE_SUCCESS = "DELETE_GENRE_SUCCESS";
const DELETE_GENRE_LOADING = "DELETE_GENRE_LOADING";

const initialState = {
  getAllGenres: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addNewGenre: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteGenre: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  genres: [],
};

const genresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GENRES_LOADING:
      return {
        ...state,
        getAllGenres: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case GET_ALL_GENRES_SUCCESS:
      return {
        ...state,
        getAllGenres: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        genres: action.payload.genres,
      };
    case GET_ALL_GENRES_FAILED:
      return {
        ...state,
        getAllGenres: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case ADD_NEW_GENRE_LOADING:
      return {
        ...state,
        addNewGenre: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case ADD_NEW_GENRE_SUCCESS:
      return {
        ...state,
        addNewGenre: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        genres: action.payload.genres,
      };
    case ADD_NEW_GENRE_FAILED:
      return {
        ...state,
        addNewGenre: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case DELETE_GENRE_LOADING:
      return {
        ...state,
        deleteGenre: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case DELETE_GENRE_SUCCESS:
      return {
        ...state,
        deleteGenre: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        genres: action.payload.genres,
      };
    case DELETE_GENRE_FAILED:
      return {
        ...state,
        deleteGenre: {
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
export const getAllGenresLoading = () => ({ type: GET_ALL_GENRES_LOADING });

export const getAllGenresSuccess = (payload) => ({
  type: GET_ALL_GENRES_SUCCESS,
  payload,
});

export const getAllGenresFailed = (payload) => ({
  type: GET_ALL_GENRES_FAILED,
  payload,
});

export const addNewGenreLoading = () => ({ type: ADD_NEW_GENRE_LOADING });

export const addNewGenreSuccess = (payload) => ({
  type: ADD_NEW_GENRE_SUCCESS,
  payload,
});

export const addNewGenreFailed = (payload) => ({
  type: ADD_NEW_GENRE_FAILED,
  payload,
});

export const deleteGenreFailed = (payload) => ({
  type: DELETE_GENRE_FAILED,
  payload,
});

export const deleteGenreSuccess = (payload) => ({
  type: DELETE_GENRE_SUCCESS,
  payload,
});

export const deleteGenreLoading = () => ({
  type: DELETE_GENRE_LOADING,
});

export default genresReducer;
