export const RESTAURANT_ADD_TO_LOVED = 'ADD_RESTAURANT_TO_LOVED';
export const RESTAURANT_REMOVE_FROM_LOVED = 'REMOVE_RESTAURANT_TO_LOVED';
export const SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE = 'SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE';

export interface LovedState {
  loved_restaurants: string[],
}

interface add_restaurant_to_loved {
  type: typeof RESTAURANT_ADD_TO_LOVED,
  add_loved_restaurant: string
}

interface remove_restaurant_from_loved {
  type: typeof RESTAURANT_REMOVE_FROM_LOVED,
  remove_loved_restaurant: string
}

interface set_loved_restaurant_from_localeStorage {
  type: typeof SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE,
  lc_restaurants: string[]
}

export type lovedActionTypes = add_restaurant_to_loved | remove_restaurant_from_loved | set_loved_restaurant_from_localeStorage// |add_meal_to_loved | remove_meal_from_loved