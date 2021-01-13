import { meals } from '../../../types';
import {
  SET_MEAL_TO_CART,
  REMOVE_ONE_MEAL_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  CLEAN_CART,
  cartActionTypes, SET_CART_LENGTH,
} from '../actions';

export const set_meal_to_cart = (meal: meals, token: boolean): cartActionTypes => {
  return {
    type: SET_MEAL_TO_CART,
    set_cart_meal: {
      meal,
      token
    },
  };
};

export const remove_one_meal_from_cart = (meal: meals): cartActionTypes => {
  return {
    type: REMOVE_ONE_MEAL_FROM_CART,
    remove_one_cart_meal: meal,
  };
};

export const set_meal_from_localestorage_to_cart = (cart_items: meals[]): cartActionTypes => {
  return {
    type: SET_MEAL_FROM_LOALESTORAGE_TO_CART,
    lc_cart_items: cart_items,
  };
};

export const remove_item_from_cart = (meal: meals): cartActionTypes => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    remove_cart_meal: meal,
  };
};
export const clean_cart = (): cartActionTypes => {
  return {
    type: CLEAN_CART,
  };
};

export const set_cart_length = (length: number): cartActionTypes => {
  return {
    type: SET_CART_LENGTH,
    length,
  };
};

