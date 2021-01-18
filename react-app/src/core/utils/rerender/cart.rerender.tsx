import React from 'react';
import { meals, restaurant } from '../../types';
import { CartItem } from '../../../modules/cart/components/cartItem';
import { RestaurantMealBlock } from '../../../modules/cart/components/restaurantMealBlock';

export const rerender = {
  mealsBlock(
    cartRestaurants: restaurant[],
    cart: meals[],
    setBlockSum: (restaurant: string, sum: number) => void,
    deleteOneItem: (meal: meals) => void,
    deleteMealFromCart: (meal: meals) => void,
    addMeal: (meal: meals) => void) {
    if (cartRestaurants.length !== 0) return cartRestaurants.map(restaurant => {
      const restaurantBlock = cart.filter(meal => meal.restaurant === restaurant._id);
      return (
        <RestaurantMealBlock
          setBlockSum={setBlockSum}
          restaurant={restaurant}
          restaurantBlock={ restaurantBlock }
          onDeleteOneItem={ deleteOneItem }
          onDeleteMeal={ deleteMealFromCart }
          onAddMeal={ addMeal }
        />
      );
    })
  },
  cartItem(
    restaurantBlock: meals[],
    onDeleteOneItem: (meal: meals) => void,
    onDeleteMeal: (meal: meals) => void,
    onAddMeal: (meal: meals) => void) {
    if (restaurantBlock.length !== 0) {
      return restaurantBlock.map(meal => (
        <CartItem
          key={ meal._id + Date.now() }
          meal={ meal }
          onDeleteOneItem={ onDeleteOneItem }
          onDeleteMeal={ onDeleteMeal }
          onAddMeal={ onAddMeal }/>
      ));
    }
  },
}