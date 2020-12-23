import {
  SET_MEAL_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ONE_MEAL_FROM_CART,
  SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  CLEAN_CART,
  cartActionTypes,
  CartState,
} from '../types/cartTypes';

const initialState: CartState = {
  cart: [],
};

export const cartReducer = (state = initialState, action: cartActionTypes): CartState => {
  switch (action.type) {
    case SET_MEAL_TO_CART:
      let Item = state.cart.find(item => (
        item._id === action.set_cart_meal._id
      ));
      if (Item === undefined) {
        return { ...state, cart: [ ...state.cart, action.set_cart_meal ] };
      }
      let newItems = state.cart.map(item => {
        if (item._id === action.set_cart_meal._id) {
          item.count += 1;
        }
        return item;
      });
      return { ...state, cart: [ ...newItems ] };
    case REMOVE_ONE_MEAL_FROM_CART:
      let checkItem = state.cart.find(item => (
        item._id === action.remove_one_cart_meal._id
      ));
      if (checkItem === undefined || checkItem.count === 1) {
        return { ...state, cart: state.cart.filter((item) => item._id !== action.remove_one_cart_meal._id) };
      }
      let newDelItems = state.cart.map(item => {
        if (item._id === action.remove_one_cart_meal._id) {
          item.count -= 1;
        }
        return item;
      });
      return { ...state, cart: [ ...newDelItems ] };
    case SET_MEAL_FROM_LOALESTORAGE_TO_CART:
      return { ...state, cart: action.lc_cart_items };
    case REMOVE_ITEM_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item._id !== action.remove_cart_meal._id) };
    case CLEAN_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};