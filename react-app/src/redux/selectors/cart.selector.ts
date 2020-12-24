import { RootState } from '../reducers/rootReducer';
import { CartState } from '../types/cartTypes';

const getCartState = (state: RootState): CartState  => state.cart;

export const getCart = (state: RootState) => getCartState(state)?.cart;
export const getCartLength = (state: RootState) => getCartState(state)?.cartLength;