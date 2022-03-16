import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { 
  GET_LIST_CATEGORIES, 
  CREATE_CATEGORY, 
  UPDATE_CATEGORY,
  GET_LIST_PRODUCER, 
  CREATE_PRODUCER, 
  UPDATE_PRODUCER,
  GET_LIST_PRODUCT,
  CREATE_PRODUCT,
  GET_DETAIL_PRODUCT,
  GET_LIST_ORDER,
  GET_DETAIL_ORDER,
} from "./action";

import {
  getListCategoriesSucces, 
  getListCategoriesError,
  createCategorySucces,
  createCategoryError,
  updateCategorySucces,
  updateCategoryError,

  getListProducerSucces, 
  getListProducerError,
  createProducerSucces,
  createProducerError,
  updateProducerSucces,
  updateProducerError,

  getListProductSucces, 
  getListProductError,
  createProductSucces,
  createProductError,
  getDetailProductSucces, 
  getDetailProductError,

  getListOrderSucces, 
  getListOrderError,
  getDetailOrderSucces, 
  getDetailOrderError,
} from "./action";

import {
  getListCategories, 
  createCategory, 
  updateCategory,
  getListProducer, 
  createProducer, 
  updateProducer,
  createProduct,
  getListProduct,
  getDetailProduct,
  getListOrder,
  getDetailOrder
} from "./api";

function* getListCategoriesSaga(data) {
  try {
    const response = yield call(getListCategories, data);
    if(response &&  response.data) {
      yield put(getListCategoriesSucces(response.data));
    } else {
      yield put(getListCategoriesError());
    }
  } catch (error){
    yield put(getListCategoriesError());
  }
};

function* createCategorySaga(data) {
  try {
    const response = yield call(createCategory, data.payload);
    console.log(response);
    if(response &&  response.data) {
      yield put(createCategorySucces());
    } else {
      yield put(createCategoryError());
    }
  } catch (error){
    console.log(error);
    yield put(createCategoryError());
  }
};

function* updateCategorySaga(data) {
  try {
    const response = yield call(updateCategory, data.payload);
    console.log(response);
    if(response &&  response.data) {
      yield put(updateCategorySucces());
    } else {
      yield put(updateCategoryError());
    }
  } catch (error){
    console.log(error);
    yield put(updateCategoryError());
  }
};

function* getListProducerSaga(data) {
  try {
    const response = yield call(getListProducer, data);
    if(response &&  response.data) {
      yield put(getListProducerSucces(response.data));
    } else {
      yield put(getListProducerError());
    }
  } catch (error){
    yield put(getListProducerError());
  }
};

function* createProducerSaga(data) {
  try {
    const response = yield call(createProducer, data.payload);
    console.log(response);
    if(response &&  response.data) {
      yield put(createProducerSucces());
    } else {
      yield put(createProducerError());
    }
  } catch (error){
    console.log(error);
    yield put(createProducerError());
  }
};

function* updateProducerSaga(data) {
  try {
    const response = yield call(updateProducer, data.payload);
    console.log(response);
    if(response &&  response.data) {
      yield put(updateProducerSucces());
    } else {
      yield put(updateProducerError());
    }
  } catch (error){
    console.log(error);
    yield put(updateProducerError());
  }
};

function* createProductSaga(data) {
  try {
    const response = yield call(createProduct, data.payload);
    console.log(response);
    if(response &&  response.data) {
      yield put(createProductSucces());
    } else {
      yield put(createProductError());
    }
  } catch (error){
    console.log(error);
    yield put(createProductError());
  }
};

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

function* getDetailProductSaga(data) {
  try {
    const response = yield call(getDetailProduct, data);
    if(response &&  response.data) {
      yield put(getDetailProductSucces(response.data));
    } else {
      yield put(getDetailProductError());
    }
  } catch (error){
    yield put(getDetailProductError());
  }
};

//ORDER

function* getListOrderSaga(data) {
  try {
    const response = yield call(getListOrder, data);
    if(response &&  response.data) {
      yield put(getListOrderSucces(response.data));
    } else {
      yield put(getListOrderError());
    }
  } catch (error){
    yield put(getListOrderError());
  }
};

function* getDetailOrderSaga(data) {
  try {
    const response = yield call(getDetailOrder, data);
    if(response &&  response.data) {
      yield put(getDetailOrderSucces(response.data));
    } else {
      yield put(getDetailOrderError());
    }
  } catch (error){
    yield put(getDetailOrderError());
  }
};

function* defaultSaga() {
  yield takeEvery(GET_LIST_CATEGORIES, getListCategoriesSaga);
  yield takeEvery(CREATE_CATEGORY, createCategorySaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(GET_LIST_PRODUCER, getListProducerSaga);
  yield takeEvery(CREATE_PRODUCER, createProducerSaga);
  yield takeEvery(UPDATE_PRODUCER, updateProducerSaga);
  yield takeEvery(CREATE_PRODUCT, createProductSaga);
  yield takeEvery(GET_LIST_PRODUCT, getListProductSaga);
  yield takeEvery(GET_DETAIL_PRODUCT, getDetailProductSaga);
  yield takeEvery(GET_LIST_ORDER, getListOrderSaga);
  yield takeEvery(GET_DETAIL_ORDER, getDetailOrderSaga);

};


function* AdminSaga() {
  yield all([fork(defaultSaga)]);
};

export default AdminSaga;