export const GET_LIST_CATEGORIES = "GET_LIST_CATEGORIES";
export const GET_LIST_CATEGORIES_SUCCESS = "GET_LIST_CATEGORIES_SUCCESS";
export const GET_LIST_CATEGORIES_ERROR = "GET_LIST_CATEGORIES_ERROR";

export const CREATE_CATEGORY = "CREATE_CATEGORY"
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_ERROR = "CREATE_CATEGORY_ERROR";

export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_ERROR = "UPDATE_CATEGORY_ERROR";

export const GET_LIST_PRODUCER = "GET_LIST_PRODUCER";
export const GET_LIST_PRODUCER_SUCCESS = "GET_LIST_PRODUCER_SUCCESS";
export const GET_LIST_PRODUCER_ERROR = "GET_LIST_PRODUCER_ERROR";

export const CREATE_PRODUCER = "CREATE_PRODUCER"
export const CREATE_PRODUCER_SUCCESS = "CREATE_PRODUCER_SUCCESS";
export const CREATE_PRODUCER_ERROR = "CREATE_PRODUCER_ERROR";

export const UPDATE_PRODUCER = "UPDATE_PRODUCER"
export const UPDATE_PRODUCER_SUCCESS = "UPDATE_PRODUCER_SUCCESS";
export const UPDATE_PRODUCER_ERROR = "UPDATE_PRODUCER_ERROR";

export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";

export const GET_LIST_PRODUCT = "GET_LIST_PRODUCT";
export const GET_LIST_PRODUCT_SUCCESS = "GET_LIST_PRODUCT_SUCCESS";
export const GET_LIST_PRODUCT_ERROR = "GET_LIST_PRODUCT_ERROR";

export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const GET_DETAIL_PRODUCT_SUCCESS = "GET_DETAIL_PRODUCT_SUCCESS";
export const GET_DETAIL_PRODUCT_ERROR = "GET_DETAIL_PRODUCT_ERROR";

export const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

export const GET_LIST_ORDER = "GET_LIST_ORDER";
export const GET_LIST_ORDER_SUCCESS = "GET_LIST_ORDER_SUCCESS";
export const GET_LIST_ORDER_ERROR = "GET_LIST_ORDER_ERROR";

export const GET_DETAIL_ORDER = "GET_DETAIL_ORDER";
export const GET_DETAIL_ORDER_SUCCESS = "GET_DETAIL_ORDER_SUCCESS";
export const GET_DETAIL_ORDER_ERROR = "GET_DETAIL_ORDER_ERROR";


export const getListCategoriesRequest = (params) => {
  return {
    type: GET_LIST_CATEGORIES,
    payload: params,
  }
};

export const getListCategoriesSucces = (data) => {
  return {
    type: GET_LIST_CATEGORIES_SUCCESS,
    payload: data,
  }
};

export const getListCategoriesError = () => {
  return {
    type: GET_LIST_CATEGORIES_ERROR,
  }
};

export const createCategoryRequest = (body) => {
  return {
    type: CREATE_CATEGORY,
    payload: body,
  }
};

export const createCategorySucces = () => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
  }
};

export const createCategoryError = () => {
  return {
    type: CREATE_CATEGORY_ERROR,
  }
};

export const updateCategoryRequest = (body) => {
  return {
    type: UPDATE_CATEGORY,
    payload: body,
  }
};

export const updateCategorySucces = () => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
  }
};

export const updateCategoryError = () => {
  return {
    type: UPDATE_CATEGORY_ERROR,
  }
};

export const getListProducerRequest = (params) => {
  return {
    type: GET_LIST_PRODUCER,
    payload: params,
  }
};

export const getListProducerSucces = (data) => {
  return {
    type: GET_LIST_PRODUCER_SUCCESS,
    payload: data,
  }
};

export const getListProducerError = () => {
  return {
    type: GET_LIST_PRODUCER_ERROR,
  }
};

export const createProducerRequest = (body) => {
  return {
    type: CREATE_PRODUCER,
    payload: body,
  }
};

export const createProducerSucces = () => {
  return {
    type: CREATE_PRODUCER_SUCCESS,
  }
};

export const createProducerError = () => {
  return {
    type: CREATE_PRODUCER_ERROR,
  }
};

export const updateProducerRequest = (body) => {
  return {
    type: UPDATE_PRODUCER,
    payload: body,
  }
};

export const updateProducerSucces = () => {
  return {
    type: UPDATE_PRODUCER_SUCCESS,
  }
};

export const updateProducerError = () => {
  return {
    type: UPDATE_PRODUCER_ERROR,
  }
};

export const createProductRequest = (body) => {
  return {
    type: CREATE_PRODUCT,
    payload: body,
  }
};

export const createProductSucces = () => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
  }
};

export const createProductError = () => {
  return {
    type: CREATE_PRODUCT_ERROR,
  }
};

export const getListProductRequest = (params) => {
  return {
    type: GET_LIST_PRODUCT,
    payload: params,
  }
};

export const getListProductSucces = (data) => {
  return {
    type: GET_LIST_PRODUCT_SUCCESS,
    payload: data,
  }
};

export const getListProductError = () => {
  return {
    type: GET_LIST_PRODUCT_ERROR,
  }
};

export const getDetailProductRequest = (params) => {
  return {
    type: GET_DETAIL_PRODUCT,
    payload: params,
  }
};

export const getDetailProductSucces = (data) => {
  return {
    type: GET_DETAIL_PRODUCT_SUCCESS,
    payload: data,
  }
};

export const getDetailProductError = () => {
  return {
    type: GET_DETAIL_PRODUCT_ERROR,
  }
};

export const clearDetailProduct = () => {
  return {
    type: CLEAR_PRODUCT,
  }
};

export const getListOrderRequest = (params) => {
  return {
    type: GET_LIST_ORDER,
    payload: params,
  }
};

export const getListOrderSucces = (data) => {
  return {
    type: GET_LIST_ORDER_SUCCESS,
    payload: data,
  }
};

export const getListOrderError = () => {
  return {
    type: GET_LIST_ORDER_ERROR,
  }
};

export const getDetailOrderRequest = (params) => {
  return {
    type: GET_DETAIL_ORDER,
    payload: params,
  }
};

export const getDetailOrderSucces = (data) => {
  return {
    type: GET_DETAIL_ORDER_SUCCESS,
    payload: data,
  }
};

export const getDetailOrderError = () => {
  return {
    type: GET_DETAIL_ORDER_ERROR,
  }
};
