import {RESTAURANT_ADD_TO_LOVED,RESTAURANT_REMOVE_FROM_LOVED,SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE,lovedActionTypes} from '../types/loveTypes'
import {restaurant as restaurantType} from '../../interfaces/restaurant' 


export const add_restaurant_to_loved=(restaurant: string):lovedActionTypes=>{
    return{
        type:RESTAURANT_ADD_TO_LOVED,
        add_loved_restaurant:restaurant
    }
}
export const remove_restaurant_from_loved=(restaurant: string):lovedActionTypes=>{
    return{
        type:RESTAURANT_REMOVE_FROM_LOVED,
        remove_loved_restaurant:restaurant
    }
}
export const set_loved_restaurant_from_localeStorage=(restaurants: string[]):lovedActionTypes=>{
    return{
        type:SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE,
        lc_restaurants:restaurants
    }
}