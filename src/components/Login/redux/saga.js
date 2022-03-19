import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { LOGIN } from "./action";
import {login, loginSucces, loginError} from "./action";

import {loginUser} from "./api";
import {openNotification} from '../../../common/notification';

function* loginUserSaga(action) {
  try {
    const response = yield call(loginUser, action.payload);
    if(response && response.status === 200 && response.data) {
      localStorage.setItem("authtoken", response.data.token);
      openNotification('success', 'Thông báo', 'Đăng nhập thành công');
      yield put(loginSucces(response.data));
    } else {
      yield put(loginError());
    }
  } catch (error){
    yield put(loginError());
    openNotification('error', 'Thông báo', 'Tài khoản hoặc mật khẩu không đúng');
  }
};

function* defaultSaga() {
  yield takeEvery(LOGIN, loginUserSaga);
};


function* LoginSaga() {
  yield all([fork(defaultSaga)]);
};

export default LoginSaga;