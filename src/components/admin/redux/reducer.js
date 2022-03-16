import { 
  GET_LIST_CATEGORIES, 
  GET_LIST_CATEGORIES_ERROR, 
  GET_LIST_CATEGORIES_SUCCESS,
  CREATE_CATEGORY, 
  CREATE_CATEGORY_ERROR, 
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY, 
  UPDATE_CATEGORY_ERROR, 
  UPDATE_CATEGORY_SUCCESS,
  GET_LIST_PRODUCER, 
  GET_LIST_PRODUCER_ERROR, 
  GET_LIST_PRODUCER_SUCCESS,
  CREATE_PRODUCER, 
  CREATE_PRODUCER_ERROR, 
  CREATE_PRODUCER_SUCCESS,
  UPDATE_PRODUCER, 
  UPDATE_PRODUCER_ERROR, 
  UPDATE_PRODUCER_SUCCESS,
  CREATE_PRODUCT, 
  CREATE_PRODUCT_ERROR, 
  CREATE_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT, 
  GET_LIST_PRODUCT_ERROR, 
  GET_LIST_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT, 
  GET_DETAIL_PRODUCT_ERROR, 
  GET_DETAIL_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  GET_LIST_ORDER, 
  GET_LIST_ORDER_ERROR, 
  GET_LIST_ORDER_SUCCESS,
  GET_DETAIL_ORDER, 
  GET_DETAIL_ORDER_ERROR, 
  GET_DETAIL_ORDER_SUCCESS, } from "./action";

const INIT_STATE = {
  listCategories: {},
  isLoadingListCategories: false,
  isSuccessCreateCategory: null,
  isLoadingCreateCategory: false,
  isSuccessUpdateCategory: null,
  isLoadingUpdateCategory: false,

  listProducer: {},
  isLoadingListProducer: false,
  isSuccessCreateProducer: null,
  isLoadingCreateProducer: false,
  isSuccessUpdateProducer: null,
  isLoadingUpdateProducer: false,

  listProduct: {},
  isLoadingListProduct: false,
  isSuccessCreateProduct: null,
  isLoadingCreateProduct: false,

  listOrder: {},
  isLoadingListOrder: false,

  itemProduct: {},
  itemOrder: {},
};

const AdminReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
    case GET_LIST_CATEGORIES: {
      return {
        ...state,
        isLoadingListCategories: true,
      }
    };
    case GET_LIST_CATEGORIES_SUCCESS: {
      return {
        ...state,
        listCategories: action.payload,
        isLoadingListCategories: false,
      }
    };
    case GET_LIST_CATEGORIES_ERROR: {
      return {
        ...state,
        isLoadingListCategories: false,
        listCategories: {},
      }
    };

    case CREATE_CATEGORY: {
      return {
        ...state,
        isLoadingCreateCategory: true,
        isSuccessCreateCategory: null,
      }
    };
    case CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        isSuccessCreateCategory: true,
        isLoadingCreateCategory: false,
      }
    };
    case CREATE_CATEGORY_ERROR: {
      return {
        ...state,
        isLoadingCreateCategory: false,
        isSuccessCreateCategory: false,
      }
    };

    case UPDATE_CATEGORY: {
      return {
        ...state,
        isLoadingUpdateCategory: true,
        isSuccessUpdateCategory: null,
      }
    };
    case UPDATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        isSuccessUpdateCategory: true,
        isLoadingUpdateCategory: false,
      }
    };
    case UPDATE_CATEGORY_ERROR: {
      return {
        ...state,
        isLoadingUpdateCategory: false,
        isSuccessUpdateCategory: false,
      }
    };

    //PRODUCER
    case GET_LIST_PRODUCER: {
      return {
        ...state,
        isLoadingListProducer: true,
      }
    };
    case GET_LIST_PRODUCER_SUCCESS: {
      return {
        ...state,
        listProducer: action.payload,
        isLoadingListProducer: false,
      }
    };
    case GET_LIST_PRODUCER_ERROR: {
      return {
        ...state,
        isLoadingListProducer: false,
        listProducer: {},
      }
    };

    case CREATE_PRODUCER: {
      return {
        ...state,
        isLoadingCreateProducer: true,
        isSuccessCreateProducer: null,
      }
    };
    case CREATE_PRODUCER_SUCCESS: {
      return {
        ...state,
        isSuccessCreateProducer: true,
        isLoadingCreateProducer: false,
      }
    };
    case CREATE_PRODUCER_ERROR: {
      return {
        ...state,
        isLoadingCreateProducer: false,
        isSuccessCreateProducer: false,
      }
    };

    case UPDATE_PRODUCER: {
      return {
        ...state,
        isLoadingUpdateProducer: true,
        isSuccessUpdateProducer: null,
      }
    };
    case UPDATE_PRODUCER_SUCCESS: {
      return {
        ...state,
        isSuccessUpdateProducer: true,
        isLoadingUpdateProducer: false,
      }
    };
    case UPDATE_PRODUCER_ERROR: {
      return {
        ...state,
        isLoadingUpdateProducer: false,
        isSuccessUpdateProducer: false,
      }
    };

    //PRODUCT
    case GET_LIST_PRODUCT: {
      return {
        ...state,
        isLoadingListProduct: true,
      }
    };
    case GET_LIST_PRODUCT_SUCCESS: {
      return {
        ...state,
        listProduct: action.payload,
        isLoadingListProduct: false,
      }
    };
    case GET_LIST_PRODUCT_ERROR: {
      return {
        ...state,
        isLoadingListProduct: false,
        listProduct: {},
      }
    };
    case CREATE_PRODUCT: {
      return {
        ...state,
        isLoadingCreateProduct: true,
        isSuccessCreateProduct: null,
      }
    };
    case CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isSuccessCreateProduct: true,
        isLoadingCreateProduct: false,
      }
    };
    case CREATE_PRODUCT_ERROR: {
      return {
        ...state,
        isLoadingCreateProduct: false,
        isSuccessCreateProduct: false,
      }
    };
    case GET_DETAIL_PRODUCT: {
      return {
        ...state,
      }
    };
    case GET_DETAIL_PRODUCT_SUCCESS: {
      return {
        ...state,
        itemProduct: action.payload,
      }
    };
    case GET_DETAIL_PRODUCT_ERROR: {
      return {
        ...state,
        itemProduct: {},
      }
    };
    case CLEAR_PRODUCT: {
      return {
        ...state,
        itemProduct: {},
      }
    }

    //ORDER
    case GET_LIST_ORDER: {
      return {
        ...state,
        isLoadingListOrder: true,
      }
    };
    case GET_LIST_ORDER_SUCCESS: {
      return {
        ...state,
        listOrder: action.payload,
        isLoadingListOrder: false,
      }
    };
    case GET_LIST_ORDER_ERROR: {
      return {
        ...state,
        isLoadingListOrder: false,
        listOrder: {},
      }
    };

    case GET_DETAIL_ORDER: {
      return {
        ...state,
      }
    };
    case GET_DETAIL_ORDER_SUCCESS: {
      return {
        ...state,
        itemOrder: action.payload,
      }
    };
    case GET_DETAIL_ORDER_ERROR: {
      return {
        ...state,
        itemOrder: {},
      }
    };
    default:
      return { ...state };
  }
};

export default AdminReducer;