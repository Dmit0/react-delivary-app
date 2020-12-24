import { RootState } from '../reducers/rootReducer';
import { RestaurantState } from '../types/restaurantsTypes';

const getAuthState = (state: RootState): RestaurantState => state.restaurant;

export const getMeals = (state: RootState) => getAuthState(state)?.current_meals;