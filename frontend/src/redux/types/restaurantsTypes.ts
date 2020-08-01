import {restaurant} from '../../interfaces/restaurant'

export const RESTAURANTS ={
    SET_REASTAURANTS:'SET_REASTAURANTS',
    SET_CURRENT_RESTAURANT:'SET_CURRENT_RESTAURANT'
}

interface SET_REASTAURANTS{
    type:typeof RESTAURANTS.SET_REASTAURANTS
    restaurants:restaurant[]
}

interface SET_CURRENT_RESTAURANT{
    type:typeof RESTAURANTS.SET_CURRENT_RESTAURANT
    restaurant:restaurant | null
}

export interface RestaurantState{
    restaurants:restaurant[],
    current_restaurant:restaurant | null
}

export type restaurantActionTypes = SET_CURRENT_RESTAURANT | SET_REASTAURANTS


