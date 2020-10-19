import {restaurant} from '../../interfaces/restaurant'
//import {meals} from '../../interfaces/meals'



export const RESTAURANT_ADD_TO_LOVED='ADD_RESTAURANT_TO_LOVED'
export const RESTAURANT_REMOVE_FROM_LOVED='REMOVE_RESTAURANT_TO_LOVED'
export const SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE='SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE'
// export const MEAL_ADD_TO_LOVED='ADD_RESTAURANT_TO_LOVED'
// export const MEAL_REMOVE_FROM_LOVED='REMOVE_RESTAURANT_TO_LOVED'

export interface LovedState{
    loved_restaurants:restaurant[],
   // loved_meals:meals[]
}



// interface add_meal_to_loved{
//     type:typeof MEAL_ADD_TO_LOVED,
//     add_loved_meal:meals
// }

// interface remove_meal_from_loved{
//     type:typeof MEAL_REMOVE_FROM_LOVED,
//     remove_loved_meal:meals
// }

interface add_restaurant_to_loved{
    type:typeof RESTAURANT_ADD_TO_LOVED,
    add_loved_restaurant:restaurant
}

interface remove_restaurant_from_loved{
    type:typeof RESTAURANT_REMOVE_FROM_LOVED,
    remove_loved_restaurant:restaurant
}
interface set_loved_restaurant_from_localeStorage{
    type:typeof SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE,
    lc_restaurants:restaurant[]
}

export type lovedActionTypes = add_restaurant_to_loved | remove_restaurant_from_loved | set_loved_restaurant_from_localeStorage// |add_meal_to_loved | remove_meal_from_loved 