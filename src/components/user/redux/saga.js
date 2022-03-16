import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { 
  GET_LIST_PRODUCT,
  CREATE_ORDER
} from "./action";

import {
  getListProductSucces, 
  getListProductError,
  createOrderSuccess,
  createOrderError,
  // createProductSucces,
  // createProductError,
  // getDetailProductSucces, 
  // getDetailProductError,
} from "./action";

import {
  getListProduct,
  getDetailProduct,
  createOrder
} from "./api";

function* getListProductSaga(data) {
  try {
    const response = yield call(getListProduct, data);
    if(response &&  response.data) {
      yield put(getListProductSucces(response.data));
    } else {
      yield put(getListProductError());
    }
  } catch (error){
    yield put(getListProductError());
  }
};

function* createOrderSaga(data) {
  console.log({data});
  try {
    const response = yield call(createOrder, data.payload);
    if(response &&  response.data) {
      yield put(createOrderSuccess());
    } else {
      yield put(createOrderError());
    }
  } catch (error){
    yield put(createOrderError());
  }
};

// function* getDetailProductSaga(data) {
//   try {
//     const response = yield call(getDetailProduct, data);
//     if(response &&  response.data) {
//       yield put(getDetailProductSucces(response.data));
//     } else {
//       yield put(getDetailProductError());
//     }
//   } catch (error){
//     yield put(getDetailProductError());
//   }
// };

function* defaultSaga() {
  // yield takeEvery(GET_LIST_CATEGORIES, getListCategoriesSaga);
  yield takeEvery(CREATE_ORDER, createOrderSaga);
  // yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  // yield takeEvery(GET_LIST_PRODUCER, getListProducerSaga);
  // yield takeEvery(CREATE_PRODUCER, createProducerSaga);
  // yield takeEvery(UPDATE_PRODUCER, updateProducerSaga);
  // yield takeEvery(CREATE_PRODUCT, createProductSaga);
  yield takeEvery(GET_LIST_PRODUCT, getListProductSaga);

  // yield takeEvery(GET_DETAIL_PRODUCT, getDetailProductSaga);

};


function* AdminSaga() {
  yield all([fork(defaultSaga)]);
};

export default AdminSaga;