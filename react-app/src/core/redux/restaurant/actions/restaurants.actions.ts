import { ThunkAction } from 'redux-thunk';
import { MealAPI } from '../../../api/apis/meal.api';
import { ToolBarSearchTypes } from '../../../enums';
import { cuisine, restaurant } from '../../../types';
import { RootState } from '../../rootReducer';
import { Action } from 'redux';
import { Sorts } from '../../../utils/sorts';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { restaurantAPI } from '../../../api/apis/reastaurant.api';
import {
  restaurantActionTypes,
  SET_CURRENT_RESTAURANT,
  SET_REASTAURANTS,
  SET_MEALS,
  SET_CUISENS,
  SET_FILTER_RESTAURANTS,
  SET_INPUT_FILTER,
  DELETE_CURRENT_RESTAURANT_AND_MEALS,
  SET_CART_RESTAURANTS,
  REMOVE_CART_RESTAURANT,
  REMOVE_ALL_CART_RESTAURANTS,
} from '../actions';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const set_restaurants = (): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let restaurants = await restaurantAPI.get();
      let cuisineTypes = await restaurantAPI.getCuisineTypes();
      dispatch({
        type: SET_REASTAURANTS,
        restaurants,
      });
      dispatch({
        type: SET_CUISENS,
        cuisineTypes,
      });
      if (restaurants !== undefined) {
        dispatch(set_filtered_restaurants(restaurants, 'All'));
      }
      dispatch(hideLoading());
    } catch (e) {
      dispatch(hideLoading());
    }
  };
};
export const set_current_restaurant = (current_restaurant: restaurant): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      dispatch({
        type: SET_CURRENT_RESTAURANT,
        restaurant: current_restaurant,
      });
      let meals = await MealAPI.get(current_restaurant._id);
      dispatch(set_meals(meals));
      dispatch(hideLoading());
    } catch (e) {
      dispatch(hideLoading());
    }
  };
};

export const del_current_restaurant_and_meals = (): restaurantActionTypes => {
  return {
    type: DELETE_CURRENT_RESTAURANT_AND_MEALS,
  };
};

export const set_meals = (meals: any): restaurantActionTypes => {
  return {
    type: SET_MEALS,
    meals: meals,
  };
};

export const get_meals_by_restaurant_id = (id: string): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let meals = await MealAPI.get(id, true);
      dispatch(set_meals(meals));
      dispatch(hideLoading());
    } catch (e) {
      dispatch(hideLoading());
    }

  };
};

export const set_filtered_restaurants = (currentRestaurants: restaurant[], Filtertype: string | cuisine, loveRestaurants: string[] = []): restaurantActionTypes => {

  let sortedArray: restaurant[] = [];

  switch (Filtertype) {
    case ToolBarSearchTypes.ALL:
      sortedArray = currentRestaurants;
      break;
    case ToolBarSearchTypes.OPENED:
      sortedArray = Sorts.Opened(currentRestaurants);
      break;
    case ToolBarSearchTypes.LOVED:
      sortedArray = Sorts.GetLovedRestaurants(loveRestaurants, currentRestaurants);
      break;
    default:
      if (typeof Filtertype !== 'string') {
        sortedArray = Sorts.ByCuisen(currentRestaurants, Filtertype);
      }
      break;
  }
  return {
    type: SET_FILTER_RESTAURANTS,
    filter: sortedArray,
  };
};
export const set_input_filter = (currentRestaurants: restaurant[], str: string) => {
  let sortedArray: restaurant[] = [];
  sortedArray = Sorts.ByInputStr(currentRestaurants, str);
  return {
    type: SET_INPUT_FILTER,
    filteredRestaurants: sortedArray,
  };
};

export const set_cart_restaurants = (restaurants: restaurant[]): restaurantActionTypes => {
  return {
    type: SET_CART_RESTAURANTS,
    restaurants,
  };
};

export const remove_cart_restaurant = (restaurantId: string): restaurantActionTypes => {
  return {
    type: REMOVE_CART_RESTAURANT,
    restaurantId,
  };
};

export const remove_all_cart_restaurants = (): restaurantActionTypes => {
  return {
    type: REMOVE_ALL_CART_RESTAURANTS,
  };
};