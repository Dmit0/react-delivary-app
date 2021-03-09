import {
  SET_MEAL_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ONE_MEAL_FROM_CART,
  SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  CLEAN_CART,
  cartActionTypes,
  CartState,
  SET_CART_LENGTH, SET_CART_VALUES, RestaurantBlock,
} from '../actions';

const initialState: CartState = {
  cart: [],
  cartTotalItemsCount: 0,
  cartTotalCost: 0,
  restaurantBlocks: []
};

export const cartReducer = (state = initialState, action: cartActionTypes): CartState => {
  switch (action.type) {
    case SET_MEAL_TO_CART:
      let Item = state.cart.find(item => (
        item._id === action.set_cart_meal.meal._id
      ));
      if (!Item) {
        return { ...state, cart: [ ...state.cart, { ...action.set_cart_meal.meal, count: 1 } ], cartTotalItemsCount: state.cartTotalItemsCount + 1 };
      }
      let newItems = state.cart.map(item => {
        if (item._id === action.set_cart_meal.meal._id) {
          item.count += 1;
        }
        return item;
      });
      return { ...state, cart: [ ...newItems ], cartTotalItemsCount: state.cartTotalItemsCount + 1 };
    case REMOVE_ONE_MEAL_FROM_CART:
      let checkItem = state.cart.find(item => (
        item._id === action.remove_one_cart_meal._id
      ));
      if (!checkItem || checkItem.count === 1) {
        return { ...state, cart: state.cart.filter((item) => item._id !== action.remove_one_cart_meal._id), cartTotalItemsCount: state.cartTotalItemsCount - 1 };
      }
      let newDelItems = state.cart.map(item => {
        if (item._id === action.remove_one_cart_meal._id) {
          item.count -= 1;
        }
        return item;
      });
      return { ...state, cart: [ ...newDelItems ], cartTotalItemsCount: state.cartTotalItemsCount - 1 };
    case SET_MEAL_FROM_LOALESTORAGE_TO_CART:
      return { ...state, cart: action.lc_cart_items, cartTotalItemsCount: action.lc_cart_items.reduce((sum, current) => (
          sum + current.count
        ), 0) };
    case REMOVE_ITEM_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item._id !== action.remove_cart_meal._id), cartTotalItemsCount: state.cartTotalItemsCount - action.remove_cart_meal.count };
    case CLEAN_CART:
      return { ...state, cart: [], cartTotalItemsCount: 0 };
    case SET_CART_LENGTH:
      return {...state, cartTotalItemsCount: action.length};
    case SET_CART_VALUES:
      const cartLength = action.cart.reduce((acc, current) => (
        acc + current.count
      ), 0);
      const cartPrice = action.cart.reduce((acc, current) => (
        acc + current.price * current.count
    ), 0);
      const cartRestaurantBlocks = action.cart.reduce((acc: RestaurantBlock[], current) => {
        if (acc.find(item => item.restaurant === current.restaurant)) {
          return [...acc.map(item => {
            if (item.restaurant === current.restaurant) {
              return {
                ...item, totalItemPrice: item.totalItemPrice + (current.count * current.price)
              }
            }
            return item
          })]
        }
        return [...acc, {
          restaurant: current.restaurant,
          totalItemPrice: current.count * current.price
        }]
      }, [])
      return { ...state, cartTotalItemsCount: cartLength, cartTotalCost: cartPrice, restaurantBlocks: cartRestaurantBlocks }
    default:
      return state;
  }
};