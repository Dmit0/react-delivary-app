import {
  SET_MEAL_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ONE_MEAL_FROM_CART,
  SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  CLEAN_CART,
  cartActionTypes,
  CartState,
  SET_CART_LENGTH,
} from '../actions';

const initialState: CartState = {
  cart: [],
  cartLength: 0,
  cartCost: 0,
};

export const cartReducer = (state = initialState, action: cartActionTypes): CartState => {
  switch (action.type) {
    case SET_MEAL_TO_CART:
      let Item = state.cart.find(item => (
        item._id === action.set_cart_meal.meal._id
      ));
      if (Item === undefined) {
        return { ...state, cart: [ ...state.cart, { ...action.set_cart_meal.meal, count: 1 } ], cartLength: state.cartLength + 1 };
      }
      let newItems = state.cart.map(item => {
        if (item._id === action.set_cart_meal.meal._id) {
          item.count += 1;
        }
        return item;
      });
      return { ...state, cart: [ ...newItems ], cartLength: state.cartLength + 1 };
    case REMOVE_ONE_MEAL_FROM_CART:
      let checkItem = state.cart.find(item => (
        item._id === action.remove_one_cart_meal._id
      ));
      if (checkItem === undefined || checkItem.count === 1) {
        return { ...state, cart: state.cart.filter((item) => item._id !== action.remove_one_cart_meal._id), cartLength: state.cartLength - 1 };
      }
      let newDelItems = state.cart.map(item => {
        if (item._id === action.remove_one_cart_meal._id) {
          item.count -= 1;
        }
        return item;
      });
      return { ...state, cart: [ ...newDelItems ], cartLength: state.cartLength - 1 };
    case SET_MEAL_FROM_LOALESTORAGE_TO_CART:
      return { ...state, cart: action.lc_cart_items, cartLength: action.lc_cart_items.reduce((sum, current) => (
          sum + current.count
        ), 0) };
    case REMOVE_ITEM_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item._id !== action.remove_cart_meal._id), cartLength: state.cartLength - action.remove_cart_meal.count };
    case CLEAN_CART:
      return { ...state, cart: [], cartLength: 0 };
    case SET_CART_LENGTH:
      return {...state, cartLength: action.length}
    default:
      return state;
  }
};