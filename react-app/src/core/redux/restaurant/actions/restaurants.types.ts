import { restaurant, meals, cuisine } from '../../../types';

//export const RESTAURANTS ={
export const SET_REASTAURANTS = 'SET_REASTAURANTS';
export const SET_CURRENT_RESTAURANT = 'SET_CURRENT_RESTAURANT';
export const SET_INTOSTORE_RESTAURANTS = 'SET_INTOSTORE_RESTAURANTS';
export const SET_MEALS = 'SET_MEALS';
export const SET_CUISENS = 'SET_CUISENS';
export const SET_FILTER_RESTAURANTS = 'SET_FILTER_RESTAURANTS';
export const SET_INPUT_FILTER = 'SET_INPUT_FILTER';
export const DELETE_CURRENT_RESTAURANT_AND_MEALS = 'DELETE_CURRENT_RESTAURANT_AND_MEALS';
export const SET_CART_RESTAURANTS = 'SET_CART_RESTAURANTS';
export const REMOVE_CART_RESTAURANT = 'REMOVE_CART_RESTAURANT';
export const REMOVE_ALL_CART_RESTAURANTS = 'REMOVE_ALL_CART_RESTAURANTS'

//}

interface SET_REASTAURANTS {
  type: typeof SET_REASTAURANTS
  restaurants: restaurant[]
}

interface SET_CURRENT_RESTAURANT {
  type: typeof SET_CURRENT_RESTAURANT
  restaurant: restaurant | null
}

interface SET_CART_RESTAURANTS {
  type: typeof SET_CART_RESTAURANTS,
  restaurants: restaurant[]
}

interface REMOVE_CART_RESTAURANT {
  type: typeof REMOVE_CART_RESTAURANT
  restaurantId: string
}

interface REMOVE_ALL_CART_RESTAURANTS {
  type: typeof REMOVE_ALL_CART_RESTAURANTS
}

interface SET_MEALS {
  type: typeof SET_MEALS
  meals: meals[]
}

interface SET_CUISENS {
  type: typeof SET_CUISENS
  cuisineTypes: cuisine[]
}

interface SET_FILTER_RESTAURANTS {
  type: typeof SET_FILTER_RESTAURANTS
  filter: restaurant[]
}

interface SET_INPUT_FILTER {
  type: typeof SET_INPUT_FILTER
  filteredRestaurants: restaurant[]
}

// interface SET_INTOSTORE_RESTAURANTS{
//     type:typeof SET_INTOSTORE_RESTAURANTS
//     payload_restaurants:[]
// }
interface DELETE_CURRENT_RESTAURANT_AND_MEALS {
  type: typeof DELETE_CURRENT_RESTAURANT_AND_MEALS
}

export interface RestaurantState {
  restaurants: restaurant[]
  current_restaurant: restaurant | null
  current_meals: meals[]
  cuisine: cuisine[]
  filter_restaurants: restaurant[]
  inputFilter: restaurant[]
  cartRestaurants: restaurant[]
}

export type restaurantActionTypes =
  SET_CURRENT_RESTAURANT
  | SET_REASTAURANTS
  | SET_MEALS
  | SET_CUISENS
  | SET_FILTER_RESTAURANTS
  | SET_INPUT_FILTER
  | DELETE_CURRENT_RESTAURANT_AND_MEALS
  | SET_CART_RESTAURANTS
  | REMOVE_CART_RESTAURANT
  | REMOVE_ALL_CART_RESTAURANTS


