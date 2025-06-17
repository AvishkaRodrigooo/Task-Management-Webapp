import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE,
  GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  user: {},
  isLoggedIn: false,
  token: "",
  successMsg: "",
  errorMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GOOGLE_LOGIN_REQUEST:
      return { ...state, loading: true, errorMsg: "", successMsg: "" };

    case LOGIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.token,
        successMsg: action.payload.msg,
        errorMsg: "",
      };

    case LOGIN_FAILURE:
    case GOOGLE_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.msg,
        successMsg: "",
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    case SAVE_PROFILE:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.token,
        successMsg: "",
        errorMsg: "",
      };

    default:
      return state;
  }
};

export default authReducer;
