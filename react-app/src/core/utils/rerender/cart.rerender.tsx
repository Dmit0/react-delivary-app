import React from 'react';
import { Meal, restaurant } from '../../types';
import { CartItem } from '../../../modules/cart/components/cartItem';
import { RestaurantMealBlock } from '../../../modules/cart/components/restaurantMealBlock';

export const rerender = {
  mealsBlock(
    cartRestaurants: restaurant[],
    cart: Meal[],
    deleteOneItem: (meal: Meal) => void,
    deleteMealFromCart: (meal: Meal) => void,
    addMeal: (meal: Meal) => void) {
    if (cartRestaurants.length !== 0) return cartRestaurants.map(restaurant => {
      const restaurantBlock = cart.filter(meal => meal.restaurant === restaurant._id);
      return (
        <RestaurantMealBlock
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
    restaurantBlock: Meal[],
    onDeleteOneItem: (meal: Meal) => void,
    onDeleteMeal: (meal: Meal) => void,
    onAddMeal: (meal: Meal) => void) {
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