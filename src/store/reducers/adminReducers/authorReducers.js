// constants
const GET_ALL_AUTHORS_LOADING = "GET_ALL_AUTHORS_LOADING";
const GET_ALL_AUTHORS_SUCCESS = "GET_ALL_AUTHORS_SUCCESS";
const GET_ALL_AUTHORS_FAILED = "GET_ALL_AUTHORS_FAILED";
const ADD_NEW_AUTHOR_FAILED = "ADD_NEW_AUTHOR_FAILED";
const ADD_NEW_AUTHOR_SUCCESS = "ADD_NEW_AUTHOR_SUCCESS";
const ADD_NEW_AUTHOR_LOADING = "ADD_NEW_AUTHOR_LOADING";

const initialState = {
  getAllAuthors: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addNewAuthor: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  authors: [],
};

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AUTHORS_LOADING:
      return {
        ...state,
        getAllAuthors: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case GET_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        getAllAuthors: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        authors: action.payload.authors,
      };
    case GET_ALL_AUTHORS_FAILED:
      return {
        ...state,
        getAllAuthors: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case ADD_NEW_AUTHOR_LOADING:
      return {
        ...state,
        getAllAuthors: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case ADD_NEW_AUTHOR_SUCCESS:
      return {
        ...state,
        getAllAuthors: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        authors: action.payload.authors,
      };
    case ADD_NEW_AUTHOR_FAILED:
      return {
        ...state,
        getAllAuthors: {
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
export const getAllAuthorsLoading = () => ({ type: GET_ALL_AUTHORS_LOADING });
export const getAllAuthorsSuccess = (payload) => ({
  type: GET_ALL_AUTHORS_SUCCESS,
  payload,
});
export const getAllAuthorsFailed = (payload) => ({
  type: GET_ALL_AUTHORS_FAILED,
  payload,
});

export const addNewAuthorLoading = () => ({ type: ADD_NEW_AUTHOR_LOADING });

export const addNewAuthorSuccess = (payload) => ({
  type: ADD_NEW_AUTHOR_SUCCESS,
  payload,
});

export const addNewAuthorFailed = (payload) => ({
  type: ADD_NEW_AUTHOR_FAILED,
  payload,
});

export default authorReducer;
