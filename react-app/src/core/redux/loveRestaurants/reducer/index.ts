import {
  RESTAURANT_ADD_TO_LOVED,
  RESTAURANT_REMOVE_FROM_LOVED,
  SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE,
  lovedActionTypes,
  LovedState,
} from '../actions';

const initialState: LovedState = {
  loved_restaurants: [],
};

export const lovedReducer = (state = initialState, action: lovedActionTypes): LovedState => {

  switch (action.type) {
    case RESTAURANT_ADD_TO_LOVED:
      return { ...state, loved_restaurants: [...state.loved_restaurants, action.add_loved_restaurant] };
    case RESTAURANT_REMOVE_FROM_LOVED:
      return { ...state, loved_restaurants: [...state.loved_restaurants.filter(item => item !== action.remove_loved_restaurant)] };
    case SET_LOVED_RESTAURANT_FROM_LOCALESTORAGE:
      return { ...state, loved_restaurants: action.lc_restaurants };
    default:
      return state;
  }
};