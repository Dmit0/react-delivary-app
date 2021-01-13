import { meals } from '../../../types';

export const SET_MEAL_TO_CART = 'SET_MEAL_TO_CART';
export const REMOVE_ONE_MEAL_FROM_CART = 'REMOVE_ONE_MEAL_FROM_CART';
export const SET_MEAL_FROM_LOALESTORAGE_TO_CART = 'SET_MEAL_FROM_LOALESTORAGE_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CLEAN_CART = 'CLEAN_CART';
export const SET_CART_LENGTH = 'SET_CART_LENGTH';

export interface CartState {
  cart: meals[],
  cartLength: number,
  cartCost: number,
}

interface set_meal_to_cart {
  type: typeof SET_MEAL_TO_CART,
  set_cart_meal: {
    meal: meals,
    token: boolean
  }
}

interface remove_one_meal_from_cart {
  type: typeof REMOVE_ONE_MEAL_FROM_CART,
  remove_one_cart_meal: meals
}

interface remove_item_from_cart {
  type: typeof REMOVE_ITEM_FROM_CART,
  remove_cart_meal: meals
}

interface set_meal_from_localestorage_to_cart {
  type: typeof SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  lc_cart_items: meals[]
}

interface clean_cart {
  type: typeof CLEAN_CART
}

interface SET_CART_LENGTH {
  type: typeof SET_CART_LENGTH,
  length: number
}

export type cartActionTypes = set_meal_to_cart
  | remove_one_meal_from_cart
  | set_meal_from_localestorage_to_cart
  | remove_item_from_cart
  | clean_cart
  | SET_CART_LENGTH