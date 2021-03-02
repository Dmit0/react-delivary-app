import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { cartApi } from '../../../api/apis/cart.api';
import { Meal } from '../../../types';
import { RootState } from '../../rootReducer';
import {
  SET_MEAL_TO_CART,
  REMOVE_ONE_MEAL_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  CLEAN_CART,
  cartActionTypes,
  SET_CART_LENGTH,
} from '../actions';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const setMealToCart = (isLogin: boolean, meal: Meal): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const setMealToCartResponse = isLogin ? await cartApi.setMealToUserCart(meal._id) : true;
      if (setMealToCartResponse) dispatch(set_meal_to_cart(meal))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const set_meal_to_cart = (meal: Meal): cartActionTypes => {
  return {
    type: SET_MEAL_TO_CART,
    set_cart_meal: {
      meal
    },
  };
};

export const remove_one_meal_from_cart = (meal: Meal): cartActionTypes => {
  return {
    type: REMOVE_ONE_MEAL_FROM_CART,
    remove_one_cart_meal: meal,
  };
};

export const set_meal_from_localestorage_to_cart = (cart_items: Meal[]): cartActionTypes => {
  return {
    type: SET_MEAL_FROM_LOALESTORAGE_TO_CART,
    lc_cart_items: cart_items,
  };
};

export const remove_item_from_cart = (meal: Meal): cartActionTypes => {
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

