import {ThunkAction} from 'redux-thunk'
import { RootState } from '../reducers/rootReducer'
import { Action } from 'redux'
import {restaurant} from '../../interfaces/restaurant'
import {show_loading,hide_loading} from './appActions'
import {restaurantAPI} from '../../api/ReastaurantApi'
import {RESTAURANTS,restaurantActionTypes} from '../types/restaurantsTypes'



type ThunkType=ThunkAction<Promise<void>, RootState, unknown, Action<string>>



export const set_restaurants=():ThunkType=>{
    return async dispatch=>{
        dispatch(show_loading())
        let restaurants=await restaurantAPI.get()
        dispatch(hide_loading())
        dispatch({
           type:RESTAURANTS.SET_REASTAURANTS,
           restaurants
       })
    }
}

export const set_current_restaurant=(current_restaurant:restaurant):restaurantActionTypes=>{
    return{
        type:RESTAURANTS.SET_CURRENT_RESTAURANT,
        restaurant:current_restaurant
    }
}