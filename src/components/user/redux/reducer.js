import { 
  GET_LIST_PRODUCT, 
  GET_LIST_PRODUCT_ERROR, 
  GET_LIST_PRODUCT_SUCCESS,
  ADD_TO_CART,
  DELETE_ITEM_CART,
  DELETE_ALL_CART,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  // GET_DETAIL_PRODUCT, 
  // GET_DETAIL_PRODUCT_ERROR, 
  // GET_DETAIL_PRODUCT_SUCCESS,
  // CLEAR_PRODUCT, 
} from "./action";

const INIT_STATE = {
  listProduct: {},
  isLoadingListProduct: false,
  isSuccessCreateOrder: null,
  isLoadingCreateOrder: false,

  itemProduct: {},

  numberCart:0,
  Carts:[],
};

const UserReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
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
    case ADD_TO_CART: {
      if(state.numberCart==0){
        let cart = {
          id:action.payload.id,
          quantity:1,
          name:action.payload.name,
          image:action.payload.thumbnailImg,
          price:action.payload.price
        }
        state.Carts.push(cart);
      }
      else{
        let check = false;
        state.Carts.map((item,key)=>{
          if(item.id==action.payload.id){
            state.Carts[key].quantity++;
            check=true;
          }
        });
        if(!check){
          let _cart = {
            id:action.payload.id,
            quantity:1,
            name:action.payload.name,
            image:action.payload.thumbnailImg,
            price:action.payload.price
          }
          state.Carts.push(_cart);
        }
      }
      return{
        ...state,
        numberCart:state.numberCart+1
      }
    };

    case DELETE_ITEM_CART:
      let quantity_ = state.Carts[action.payload].quantity;
      return{
          ...state,
          numberCart:state.numberCart - quantity_,
          Carts: state.Carts.filter(item => item.id != state.Carts[action.payload].id
          )
      }

    case CREATE_ORDER: {
      return {
        ...state,
        isLoadingCreateOrder: true,
        isSuccessCreateOrder: null,
      }
    };
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccessCreateOrder: true,
        isLoadingCreateOrder: false,
      }
    };
    case CREATE_ORDER_ERROR: {
      return {
        ...state,
        isLoadingCreateOrder: false,
        isSuccessCreateOrder: false,
      }
    };
    // case GET_DETAIL_PRODUCT: {
    //   return {
    //     ...state,
    //   }
    // };
    // case GET_DETAIL_PRODUCT_SUCCESS: {
    //   return {
    //     ...state,
    //     itemProduct: action.payload,
    //   }
    // };
    // case GET_DETAIL_PRODUCT_ERROR: {
    //   return {
    //     ...state,
    //     itemProduct: {},
    //   }
    // };
    // case CLEAR_PRODUCT: {
    //   return {
    //     ...state,
    //     itemProduct: {},
    //   }
    // }
    default:
      return { ...state };
  }
};

export default UserReducer;