export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data
  }
};

export const loginSucces = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  }
};

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
  }
}