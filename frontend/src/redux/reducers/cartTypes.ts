
import {meals} from '../../interfaces/meals'


export const SET_MEAL_TO_CART='SET_MEAL_TO_CART'
export const REMOVE_MEAL_FROM_CART='REMOVE_MEAL_FROM_CART'
export const SET_MEAL_FROM_LOALESTORAGE_TO_CART='SET_MEAL_FROM_LOALESTORAGE_TO_CART'


export interface CartState{
    cart:meals[],
}

interface set_meal_to_cart{
    type:typeof SET_MEAL_TO_CART,
    set_cart_meal:meals
}

interface remove_meal_from_cart{
    type:typeof REMOVE_MEAL_FROM_CART,
    remove_cart_meal:meals
}

interface set_meal_from_localestorage_to_cart{
    type:typeof SET_MEAL_FROM_LOALESTORAGE_TO_CART,
    lc_cart_items:meals[]
}



export type cartActionTypes=set_meal_to_cart | remove_meal_from_cart |set_meal_from_localestorage_to_cart