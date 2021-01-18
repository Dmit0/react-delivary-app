import { ThunkAction } from 'redux-thunk';
import { cuisine, restaurant } from '../../../types';
import { RootState } from '../../rootReducer';
import { Action } from 'redux';
import { Sorts } from '../../../utils/sorts';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { restaurantAPI, MealAPI } from '../../../api/apis/ReastaurantApi';
import {
  SET_CURRENT_RESTAURANT,
  SET_REASTAURANTS,
  SET_MEALS,
  restaurantActionTypes,
  SET_CUISENS,
  SET_FILTER_RESTAURANTS,
  SET_INPUT_FILTER,
  DELETE_CURRENT_RESTAURANT_AND_MEALS,
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
    case 'All':
      sortedArray = currentRestaurants;
      break;
    case 'Opened':
      sortedArray = Sorts.Opened(currentRestaurants);
      break;
    case 'Loved':
      sortedArray = Sorts.GetLovedRestaurants(loveRestaurants, currentRestaurants);
      break;//в зависимости от того зареган или нет пользователь
    default:
      if (typeof Filtertype !== 'string') {
        sortedArray = Sorts.ByCuisen(currentRestaurants, Filtertype);
      }
      ;
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