import {RESTAURANT_ADD_TO_LOVED,RESTAURANT_REMOVE_FROM_LOVED,SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE,lovedActionTypes,LovedState} from '../types/loveTypes'




const initialState:LovedState={
    loved_restaurants:[],
    //loved_meals:[]
}



export const lovedReducer=(state=initialState,action:lovedActionTypes):LovedState=>{
    
    switch (action.type){
        case RESTAURANT_ADD_TO_LOVED:
            return {...state,loved_restaurants:[...state.loved_restaurants,action.add_loved_restaurant]}
        case RESTAURANT_REMOVE_FROM_LOVED:
            return {...state,loved_restaurants:[...state.loved_restaurants.filter(item=>item._id!==action.remove_loved_restaurant._id)]}
        case SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE:
            return {...state,loved_restaurants:action.lc_restaurants}
        default:return state
    }
}