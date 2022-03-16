import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { REGISTER } from "./action";
import {register, registerSucces, registerError} from "./action";

import {registerUser} from "./api";

function* registerUserSaga(action) {
  try {
    const response = yield call(registerUser, action.payload);
    if(response && response.status === 201 && response.data) {
      yield put(registerSucces(response.data))
    } else {
      yield put(registerError());
    }
  } catch (error){
    yield put(registerError());
  }
};

function* defaultSaga() {
  yield takeEvery(REGISTER, registerUserSaga);
};


function* RegisterSaga() {
  yield all([fork(defaultSaga)]);
};

export default RegisterSaga;