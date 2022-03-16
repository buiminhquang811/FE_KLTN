import apiBase from "../../../common/baseAPI";

const LOGIN_USER = "users/login";

const loginUser = (body) => {
  return new Promise((resolve, reject) => {
    return apiBase
    .post(`${LOGIN_USER}`, body)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  })
};

export {
  loginUser
}
