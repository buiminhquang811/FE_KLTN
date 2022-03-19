import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { REGISTER } from "./action";
import {register, registerSucces, registerError} from "./action";

import {registerUser} from "./api";

import {openNotification} from '../../../common/notification';


function* registerUserSaga(action) {
  try {
    const response = yield call(registerUser, action.payload);
    if(response && response.status === 201 && response.data) {
      yield put(registerSucces(response.data));
      openNotification('success', 'Thông báo', 'Đăng ký tài khoản thành công')
    } else {
      yield put(registerError());
    }
  } catch (error){
    yield put(registerError());
    openNotification('error', 'Thông báo', 'Đăng ký tài khoản thất bại')
  }
};

function* defaultSaga() {
  yield takeEvery(REGISTER, registerUserSaga);
};


function* RegisterSaga() {
  yield all([fork(defaultSaga)]);
};

export default RegisterSaga;