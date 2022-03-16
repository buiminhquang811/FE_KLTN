export const GET_LIST_PRODUCT = "GET_LIST_PRODUCT";
export const GET_LIST_PRODUCT_SUCCESS = "GET_LIST_PRODUCT_SUCCESS";
export const GET_LIST_PRODUCT_ERROR = "GET_LIST_PRODUCT_ERROR";

export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_ITEM_CART = "DELETE_ITEM_CART";
export const DELETE_ALL_CART = "DELETE_ALL_CART";

export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";

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

export const addToCart = (data) => {
  return {
    type: ADD_TO_CART,
    payload: data,
  }
}

export const deleteCart = (data) => {
  return {
    type: DELETE_ITEM_CART,
    payload: data,
  }
}

export const createOrderRequest = (body) => {
  return {
    type: CREATE_ORDER,
    payload: body,
  }
};

export const createOrderSuccess = () => {
  return {
    type: CREATE_ORDER_SUCCESS,
  }
};

export const createOrderError = () => {
  return {
    type: CREATE_ORDER_ERROR,
  }
};