import { ToolBarSearchTypes } from '../../../enums';
import {
  SET_RESTAURANTS,
  SET_CURRENT_RESTAURANT,
  restaurantActionTypes,
  RestaurantState,
  SET_MEALS,
  SET_CUISINES,
  SET_FILTER_RESTAURANTS,
  SET_INPUT_FILTER,
  DELETE_CURRENT_RESTAURANT_AND_MEALS,
  SET_CART_RESTAURANTS,
  REMOVE_CART_RESTAURANT,
  REMOVE_ALL_CART_RESTAURANTS, SET_HOME_PAGE_FILTER,
} from '../actions';

const initialState: RestaurantState = {
  restaurants: [],
  current_restaurant: null,
  current_meals: [],
  cuisine: [],
  filter_restaurants: [],
  inputFilter: [],
  cartRestaurants: [],
  filterValue: ToolBarSearchTypes.ALL,
};

export const restaurantReducer = (state = initialState, action: restaurantActionTypes): RestaurantState => {

  switch (action.type) {
    case SET_RESTAURANTS:
      return { ...state, restaurants: action.restaurants };
    case SET_CURRENT_RESTAURANT:
      return { ...state, current_restaurant: action.restaurant };//,current_restaurant:action.}
    case SET_MEALS:
      return { ...state, current_meals: action.meals };
    case SET_CUISINES:
      return { ...state, cuisine: action.cuisineTypes };
    case SET_FILTER_RESTAURANTS:
      return { ...state, filter_restaurants: action.filter };
    case SET_INPUT_FILTER:
      return { ...state, inputFilter: action.filteredRestaurants };
    case DELETE_CURRENT_RESTAURANT_AND_MEALS:
      return { ...state, current_restaurant: null, current_meals: [] };
    case SET_CART_RESTAURANTS:
      return {...state, cartRestaurants: action.restaurants};
    case REMOVE_CART_RESTAURANT:
      return {...state, cartRestaurants: state.cartRestaurants.filter(item => item._id !== action.restaurantId)}
    case REMOVE_ALL_CART_RESTAURANTS:
      return {...state, cartRestaurants: []}
    case SET_HOME_PAGE_FILTER:
      return { ...state, filterValue: action.filter }
    default:
      return state;
  }
};