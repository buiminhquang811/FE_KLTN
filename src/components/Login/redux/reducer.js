import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "./action";

const INIT_STATE = {
  userLogin: null,
  isLoading: false,
};

const LoginReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoading: true,
      }
    };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userLogin: action.payload,
        isLoading: false,
      }
    };
    case LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
      }
    };
    default:
      return { ...state };
  }
};

export default LoginReducer;