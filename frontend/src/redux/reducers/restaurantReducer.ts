import {RESTAURANTS} from '../actions/types'

const initialState={
    restaurants:[]
}

export const restaurantReducer=(state=initialState,action:any)=>{
    
    switch (action.type){
        case (RESTAURANTS.SET_REASTAURANTS):
            return {restaurants:action.payload}
        default:return state
    }
}