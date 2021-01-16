import React from 'react';
import { meals, restaurant } from '../../../core/types';
import { CartItem } from './cartItem';

interface RestaurantMealBlockProps {
  restaurant: restaurant
  restaurantBlock: meals[]
  onDeleteOneItem(meal: meals): void
  onDeleteMeal(meal: meals): void
  onAddMeal(meal: meals): void
}

export const RestaurantMealBlock: React.FC<RestaurantMealBlockProps> = ({restaurant, restaurantBlock, onDeleteOneItem, onDeleteMeal, onAddMeal}) => {
  return (
      <div>
        <div>{restaurant.name}</div>
        {restaurantBlock.map(meal => (
          <CartItem
            key={meal._id + Date.now()}
            meal={meal}
            onDeleteOneItem={onDeleteOneItem}
            onDeleteMeal={onDeleteMeal}
            onAddMeal={onAddMeal}/>
        ))}
      </div>
  );
};