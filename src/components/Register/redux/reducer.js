import { REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from "./action";

const INIT_STATE = {
  userRegister: null,
  isLoading: false,
};

const RegisterReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
    case REGISTER: {
      return {
        ...state,
        isLoading: true,
      }
    };
    case REGISTER_SUCCESS: {
      return {
        ...state,
        userRegister: action.payload,
        isLoading: false,
      }
    };
    case REGISTER_ERROR: {
      return {
        ...state,
        isLoading: false,
      }
    };
    default:
      return { ...state };
  }
};

export default RegisterReducer;