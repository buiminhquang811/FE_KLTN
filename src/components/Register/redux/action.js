export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const register = (data) => {
  return {
    type: REGISTER,
    payload: data
  }
};

export const registerSucces = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  }
};

export const registerError = () => {
  return {
    type: REGISTER_ERROR,
  }
}