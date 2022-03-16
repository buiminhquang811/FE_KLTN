import apiBase from "../../../common/baseAPI";

const REGISTER_URL = "users/register";

const registerUser = (body) => {
  return new Promise((resolve, reject) => {
    return apiBase
    .post(`${REGISTER_URL}`, body)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  })
};

export {
  registerUser
}
