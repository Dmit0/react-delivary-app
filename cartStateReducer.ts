import {SET_MEAL_TO_CART,REMOVE_MEAL_FROM_CART,SET_MEAL_FROM_LOALESTORAGE_TO_CART,cartActionTypes,CartState} from '../types/cartTypes'




const initialState:CartState={
    cart:[],
}



export const cartReducer=(state=initialState,action:cartActionTypes):CartState=>{
    
    switch (action.type){
        case SET_MEAL_TO_CART:
            return {...state,cart:[...state.cart,action.set_cart_meal]}
        case REMOVE_MEAL_FROM_CART:
            return {...state,cart:state.cart.filter((item)=>item._id!==action.remove_cart_meal._id)}
        case SET_MEAL_FROM_LOALESTORAGE_TO_CART:
            return {...state,cart:action.lc_cart_items}
        default:return state
    }
}