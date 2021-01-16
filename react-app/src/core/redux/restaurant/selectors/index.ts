import { RootState } from '../../rootReducer';
import { RestaurantState } from '../actions';


const getRestaurantState = (state: RootState): RestaurantState => state.restaurant;

export const getMeals = (state: RootState) => getRestaurantState(state)?.current_meals;
export const getRestaurants = (state: RootState) => getRestaurantState(state).restaurants;
export const getFilteredRestaurants = (state: RootState) => getRestaurantState(state).filter_restaurants;
export const getCuisines = (state: RootState) => getRestaurantState(state).cuisine;
export const getFilteredList = (state: RootState) => getRestaurantState(state).inputFilter;
export const getCartRestaurants = (state: RootState) => getRestaurantState(state).cartRestaurants;

