import {restaurant,cuisen} from '../../interfaces/restaurant'
import {meals} from '../../interfaces/meals'

//export const RESTAURANTS ={
  export const SET_REASTAURANTS='SET_REASTAURANTS';
  export const SET_CURRENT_RESTAURANT='SET_CURRENT_RESTAURANT';
  export const SET_INTOSTORE_RESTAURANTS='SET_INTOSTORE_RESTAURANTS';
  export const SET_MEALS='SET_MEALS'
  export const SET_CUISENS='SET_CUISENS'
  export const SET_FILTER_RESTAURANTS='SET_FILTER_RESTAURANTS'
//}

interface SET_REASTAURANTS{
    type:typeof SET_REASTAURANTS
    restaurants:restaurant[]
}

interface SET_CURRENT_RESTAURANT{
    type:typeof SET_CURRENT_RESTAURANT
    restaurant:restaurant | null
}

interface SET_MEALS{
    type:typeof SET_MEALS
    meals:meals[]
}
interface SET_CUISENS{
    type:typeof SET_CUISENS
    cuisenTypes:cuisen[]
}
interface SET_FILTER_RESTAURANTS{
    type:typeof SET_FILTER_RESTAURANTS
    filter:restaurant[]
}


// interface SET_INTOSTORE_RESTAURANTS{
//     type:typeof SET_INTOSTORE_RESTAURANTS
//     payload_restaurants:[]
// }


export interface RestaurantState{
    restaurants:restaurant[]
    current_restaurant:restaurant | null
    current_meals:meals[]
    cuisen:cuisen[]
    filter_restaurants:restaurant[]
}

export type restaurantActionTypes = SET_CURRENT_RESTAURANT | SET_REASTAURANTS | SET_MEALS | SET_CUISENS | SET_FILTER_RESTAURANTS


