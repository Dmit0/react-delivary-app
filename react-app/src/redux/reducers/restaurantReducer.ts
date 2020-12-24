import {SET_REASTAURANTS,SET_CURRENT_RESTAURANT,restaurantActionTypes,RestaurantState,SET_MEALS,SET_CUISENS,SET_FILTER_RESTAURANTS,SET_INPUT_FILTER,DELETE_CURRENT_RESTAURANT_AND_MEALS} from '../types/restaurantsTypes'


const initialState: RestaurantState={
    restaurants:[],
    current_restaurant: null,
    current_meals:[],
    cuisen:[],
    filter_restaurants:[],
    inputFilter:[]
}

export const restaurantReducer=(state=initialState,action:restaurantActionTypes):RestaurantState=>{
    
    switch (action.type){
        case SET_REASTAURANTS:
            return {...state,restaurants:action.restaurants}
        case SET_CURRENT_RESTAURANT:
            return {...state,current_restaurant:action.restaurant}//,current_restaurant:action.}
        case SET_MEALS:
            return {...state,current_meals:action.meals}
        case SET_CUISENS:
            return{...state,cuisen:action.cuisenTypes}
        case SET_FILTER_RESTAURANTS:
            return{...state,filter_restaurants:action.filter}
        case SET_INPUT_FILTER:
            return{...state,inputFilter:action.filteredRestaurants}
        case DELETE_CURRENT_RESTAURANT_AND_MEALS:
            return{...state,current_restaurant:null,current_meals:[]}
        default:return state
    }
}