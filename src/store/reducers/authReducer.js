const REGISTRATION_LOADING = "REGISTRATION_LOADING";
const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
const REGISTRATION_FAILED = "REGISTRATION_FAILED";
const LOGIN_LOADING = "LOGIN_LOADING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const initialState = {
  registration: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  login: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_LOADING:
      return {
        ...state,
        registration: {
          success: false,
          loading: true,
          failed: false,
          message: "",
        },
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registration: {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        },
      };
    case REGISTRATION_FAILED:
      return {
        ...state,
        registration: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload.message,
        },
      };
    case LOGIN_LOADING:
      return {
        ...state,
        login: {
          loading: true,
          success: false,
          failed: false,
          message: "",
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
        },
        token: action.payload.token,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        login: {
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

export const registrationLoading = () => ({ type: REGISTRATION_LOADING });

export const registrationSuccess = (payload) => ({
  type: REGISTRATION_SUCCESS,
  payload,
});

export const registrationFailed = (payload) => ({
  type: REGISTRATION_FAILED,
  payload,
});

export const loginLoading = () => ({ type: LOGIN_LOADING });

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });

export const loginFailed = (payload) => ({ type: LOGIN_FAILED, payload });

export default authReducer;
