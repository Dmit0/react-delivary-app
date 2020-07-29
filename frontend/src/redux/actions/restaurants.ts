
import {RESTAURANTS} from './types'
import {restaurant} from '../../interfaces/restaurant'

export const set_restaurants=(restaurants:restaurant[])=>{
    return {
        type:RESTAURANTS.SET_REASTAURANTS,
        payload:restaurants
    }
}