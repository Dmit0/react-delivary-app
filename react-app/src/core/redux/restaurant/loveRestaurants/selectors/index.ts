import { RootState } from '../../../rootReducer';
import { LovedState } from '../actions';

const getRestaurantState = (state: RootState): LovedState => state.loved;

export const getLovedRestaurants = (state: RootState) => getRestaurantState(state).loved_restaurants;