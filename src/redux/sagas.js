import { all } from "redux-saga/effects";
import RegisterSaga from "../components/Register/redux/saga";
import LoginSaga from "../components/Login/redux/saga";
import AdminSaga from "../components/admin/redux/saga";
import UserSaga from "../components/user/redux/saga";


export default function* rootSaga(getState) {
    yield all([
        RegisterSaga(),
        LoginSaga(),
        AdminSaga(),
        UserSaga(),
    ]);
}
