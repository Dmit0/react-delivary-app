import {RESTAURANTS,restaurantActionTypes,RestaurantState} from '../types/restaurantsTypes'


const initialState:RestaurantState={
    restaurants:[],
    current_restaurant:null
}

export const restaurantReducer=(state=initialState,action:restaurantActionTypes):RestaurantState=>{
    
    switch (action.type){
        case (RESTAURANTS.SET_REASTAURANTS):
            console.log(action)
            return {...state}
        case (RESTAURANTS.SET_CURRENT_RESTAURANT):
            console.log(action)
            return {...state}//,current_restaurant:action.}
        default:return state
    }
}