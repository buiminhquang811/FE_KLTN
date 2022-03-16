import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { LOGIN } from "./action";
import {login, loginSucces, loginError} from "./action";

import {loginUser} from "./api";

function* loginUserSaga(action) {
  try {
    const response = yield call(loginUser, action.payload);
    if(response && response.status === 200 && response.data) {
      localStorage.setItem("authtoken", response.data.token);
      yield put(loginSucces(response.data));
      
    } else {
      yield put(loginError());
    }
  } catch (error){
    yield put(loginError());
  }
};

function* defaultSaga() {
  yield takeEvery(LOGIN, loginUserSaga);
};


function* LoginSaga() {
  yield all([fork(defaultSaga)]);
};

export default LoginSaga;