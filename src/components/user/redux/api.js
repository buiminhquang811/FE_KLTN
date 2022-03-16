import apiBase from "../../../common/baseAPI";
import { ParseSimpleEndpoint } from "../../../helpers/ParseEndpoint";

const PRODUCT = "products";
const ORDER = "orders";

const getListProduct = (data) => {
  return new Promise((resolve, reject) => {
    return apiBase
    .get(`${PRODUCT}/all-products?${ParseSimpleEndpoint(data.payload)}`)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  })
};

const getDetailProduct = (data) => {
  return new Promise((resolve, reject) => {
    return apiBase
    .get(`${PRODUCT}/${(data.payload)}`)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  })
};

const createOrder = (data) => {
  return new Promise((resolve, reject) => {
    return apiBase
    .post(`${ORDER}/create`, data)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  })
};

export {
  getListProduct,
  getDetailProduct,
  createOrder
}