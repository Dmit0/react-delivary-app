import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Action as reduxAction} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { cartApi } from '../../../api/apis/cart.api';
import { OrderAPI } from '../../../api/apis/order.api';
import { restaurantAPI } from '../../../api/apis/reastaurant.api';
import { Action } from '../../../enums';
import { Core } from '../../../enums/core.enum';
import { Meal } from '../../../types';
import { getLocaleStorageItem } from '../../../utils/locale-storage.utils';
import { set_cart_restaurants } from '../../restaurant/actions';
import { RootState } from '../../rootReducer';
import {
  SET_MEAL_TO_CART,
  REMOVE_ONE_MEAL_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  SET_MEAL_FROM_LOALESTORAGE_TO_CART,
  CLEAN_CART,
  cartActionTypes,
  SET_CART_LENGTH, SET_CART_VALUES,
} from '../actions';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, reduxAction<string>>

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

export const cartAction = (data: { action: Action, mealId: string }, meal: Meal): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await cartApi.changeItemInCart(data);
      switch (data.action) {
        case Action.DECREMENT:
           response && dispatch(remove_one_meal_from_cart(meal));break;
        case Action.INCREMENT:
           response && dispatch(set_meal_to_cart(meal));break;
      }
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const order = (): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      await OrderAPI.order({})
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const deleteItemFromCartAction = (meal: Meal): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await cartApi.deleteItemFromCart(meal._id);
      response && dispatch(remove_item_from_cart(meal));
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const cleanUserCart = (): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await cartApi.cleanCart();
      response && dispatch(clean_cart());
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const getMealsForCart = (isLogIn: boolean): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let meals;
      let restaurants;
      if (isLogIn) {
        const response = await cartApi.getUserCart();
        meals = response.meals
        restaurants = response.restaurants
      } else {
        meals = getLocaleStorageItem(Core.Cart,'[]') as Meal[];
        restaurants = await restaurantAPI.getRestaurants(meals.map(meal => meal.restaurant))
      }
      dispatch(set_meal_from_localestorage_to_cart(meals));
      dispatch(set_cart_restaurants(restaurants));
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

export const setCartValues = (cart: Meal[]): cartActionTypes => {
  return {
    type: SET_CART_VALUES,
    cart
  }
}

