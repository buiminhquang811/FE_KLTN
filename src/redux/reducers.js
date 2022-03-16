import { combineReducers } from "redux";
import reducerRegistry from "./../helpers/ReducerRegistry";
import RegisterReducer from "../components/Register/redux/reducer";
import LoginReducer from "../components/Login/redux/reducer";
import AdminReducer from "../components/admin/redux/reducer";
import UserReducer from "../components/user/redux/reducer";

reducerRegistry.register("RegisterReducer", RegisterReducer);
reducerRegistry.register("LoginReducer", LoginReducer);
reducerRegistry.register("AdminReducer", AdminReducer);
reducerRegistry.register("UserReducer", UserReducer);

export default combineReducers({
    ...reducerRegistry.getReducers(),
});
