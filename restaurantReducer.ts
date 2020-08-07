import {SET_REASTAURANTS,SET_CURRENT_RESTAURANT,restaurantActionTypes,RestaurantState,SET_MEALS} from '../types/restaurantsTypes'


const initialState:RestaurantState={
    restaurants:[],
    current_restaurant:null,
    current_meals:[]
}

export const restaurantReducer=(state=initialState,action:restaurantActionTypes):RestaurantState=>{
    
    switch (action.type){
        case SET_REASTAURANTS:
            return {...state,restaurants:action.restaurants}
        case SET_CURRENT_RESTAURANT:
            return {...state,current_restaurant:action.restaurant}//,current_restaurant:action.}
        case SET_MEALS:
            return {...state,current_meals:action.meals}
        default:return state
    }
}