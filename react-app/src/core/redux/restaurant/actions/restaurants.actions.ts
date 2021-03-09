import { ThunkAction } from 'redux-thunk';
import { AuthenticationApi } from '../../../api/apis/authentication.api';
import { MealAPI } from '../../../api/apis/meal.api';
import { UserApi } from '../../../api/apis/user.api';
import { ToolBarSearchTypes } from '../../../enums';
import { Core } from '../../../enums/core.enum';
import { cuisine, restaurant } from '../../../types';
import { getLocaleStorageItem } from '../../../utils/locale-storage.utils';
import { add_restaurant_to_loved, remove_restaurant_from_loved, set_loved_restaurant } from '../../loveRestaurants/actions';
import { RootState } from '../../rootReducer';
import { Action } from 'redux';
import { Sorts } from '../../../utils/sorts';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { restaurantAPI } from '../../../api/apis/reastaurant.api';
import {
  restaurantActionTypes,
  SET_CURRENT_RESTAURANT,
  SET_MEALS,
  SET_FILTER_RESTAURANTS,
  SET_INPUT_FILTER,
  DELETE_CURRENT_RESTAURANT_AND_MEALS,
  SET_CART_RESTAURANTS,
  REMOVE_CART_RESTAURANT,
  REMOVE_ALL_CART_RESTAURANTS,
  SET_HOME_PAGE_FILTER,
  SET_CUISINES,
  SET_RESTAURANTS,
} from '../actions';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const set_restaurants = (): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let restaurants = await restaurantAPI.get();
      let cuisineTypes = await restaurantAPI.getCuisineTypes();
      dispatch({
        type: SET_RESTAURANTS,
        restaurants,
      });
      dispatch({
        type: SET_CUISINES,
        cuisineTypes,
      });
      if (restaurants) {
        dispatch(set_filtered_restaurants(restaurants, ToolBarSearchTypes.ALL));
      }
    } catch (e) {
      console.log(e);
    } finally {
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
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const getLoveRestaurant = (isLogIn: boolean): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const restaurants = isLogIn
        ? await AuthenticationApi.getLoveUserRestaurants()
        : getLocaleStorageItem(Core.Loved, '[]');
      restaurants && dispatch(set_loved_restaurant(restaurants));
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const loveHandler = (isLogIn: boolean, restaurant: restaurant, isAddAction: boolean): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const actionResponse = isLogIn ? await UserApi.loveRestaurantAction({ restaurantId: restaurant._id, action: isAddAction }) : true;
      if (isAddAction) {
        actionResponse && dispatch(add_restaurant_to_loved(restaurant._id))
      } else {
        actionResponse && dispatch(remove_restaurant_from_loved(restaurant._id));
      }
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
}

export const setCurrentHomePageFilter = (filter: string): restaurantActionTypes => {
  return {
    type: SET_HOME_PAGE_FILTER,
    filter
  }
}

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
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const set_filtered_restaurants = (currentRestaurants: restaurant[], FilterType: string | cuisine, loveRestaurants: string[] = []): restaurantActionTypes => {
  let sortedArray: restaurant[] = [];
  switch (FilterType) {
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
      if (typeof FilterType !== 'string') {
        sortedArray = Sorts.ByCuisine(currentRestaurants, FilterType);
      }
      break;
  }
  return {
    type: SET_FILTER_RESTAURANTS,
    filter: sortedArray,
  };
};

export const set_input_filter = (currentRestaurants: restaurant[], str: string) => {
  let sortedArray: restaurant[];
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