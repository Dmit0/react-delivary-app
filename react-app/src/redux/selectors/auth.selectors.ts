import { RootState } from '../reducers/rootReducer';
import { AuthenticationState } from '../types/authTypes';

const getAuthState = (state: RootState): AuthenticationState => state.authentication;

export const getToken = (state: RootState) => getAuthState(state)?.token;
export const getUserCartMealIds = (state: RootState) => getAuthState(state).cartMealId