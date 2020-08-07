import {ThunkAction} from 'redux-thunk'
import { RootState } from '../reducers/rootReducer'
import { Action } from 'redux'
import {restaurant} from '../../interfaces/restaurant'
//import {meals} from '../../interfaces/meals'
import {show_loading,hide_loading} from './appActions'
import {restaurantAPI,MealAPI} from '../../api/ReastaurantApi'
import {SET_CURRENT_RESTAURANT,SET_REASTAURANTS,SET_MEALS,restaurantActionTypes} from '../types/restaurantsTypes'



type ThunkType=ThunkAction<Promise<void>, RootState, unknown, Action<string>>



export const set_restaurants=():ThunkType=>{
    return async dispatch=>{
        dispatch(show_loading())
        let restaurants=await restaurantAPI.get()
        dispatch(hide_loading())
        //dispatch(set_intoStore_restaurants(restaurants))
        dispatch({
           type:SET_REASTAURANTS,
           restaurants
       })
    }
}

// export const set_intoStore_restaurants=(restaurants:any):restaurantActionTypes=>{
//     return{
//         type:SET_INTOSTORE_RESTAURANTS,
//         payload_restaurants:restaurants
//     }
// }

export const set_current_restaurant=(current_restaurant:restaurant):ThunkAction<Promise<void>, RootState, unknown, restaurantActionTypes>=>{

return async dispatch=>{
    dispatch({
        type:SET_CURRENT_RESTAURANT,
        restaurant:current_restaurant
    })

    let meals = await MealAPI.get(current_restaurant._id)
    dispatch(set_meals(meals))
    }
}

export const set_meals=(meals:any):restaurantActionTypes=>{
    return{
        type:SET_MEALS,
        meals:meals
    }
}