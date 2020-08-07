import {SET_MEAL_TO_CART,REMOVE_MEAL_FROM_CART,SET_MEAL_FROM_LOALESTORAGE_TO_CART,cartActionTypes} from '../types/cartTypes'
import {meals} from '../../interfaces/meals'


export const set_meal_to_cart=(meal:meals):cartActionTypes=>{
    return{
        type:SET_MEAL_TO_CART,
        set_cart_meal:meal
    }
}

export const remove_meal_from_cart=(meal:meals):cartActionTypes=>{
    return{
        type:REMOVE_MEAL_FROM_CART,
        remove_cart_meal:meal
    }
}

export const set_meal_from_localestorage_to_cart=(cart_items:meals[]):cartActionTypes=>{
    return {
        type:SET_MEAL_FROM_LOALESTORAGE_TO_CART,
        lc_cart_items:cart_items
    }
}



