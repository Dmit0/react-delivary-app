import { getCartRestaurants } from '../../restaurant/selectors';
import { RootState } from '../../rootReducer';
import { CartState, RestaurantBlock } from '../actions';

const getCartState = (state: RootState): CartState  => state.cart;

export const getCart = (state: RootState) => getCartState(state)?.cart;
export const getCartLength = (state: RootState) => getCartState(state)?.cartTotalItemsCount;
export const getCartPrice = (state: RootState) => getCartState(state)?.cartTotalCost;
export const getRestaurantBlocks = (state: RootState) => getCartState(state)?.restaurantBlocks;


export const getBlockSumByRestaurantId = (state: RootState, restaurant: string) => {
  const currentBlock = getRestaurantBlocks(state).find(item => item.restaurant === restaurant)
  return currentBlock?.totalItemPrice ?? 0
}

export const getIsRestaurantPricesCorrect = (state: RootState) => {
  return !getRestaurantBlocks(state).some((restaurantToCheck: RestaurantBlock) => {
    const restaurant = getCartRestaurants(state).find(restaurant => restaurantToCheck.restaurant === restaurant._id);
    return restaurant && restaurantToCheck.totalItemPrice < restaurant.minSumOfDelivery
  })
}