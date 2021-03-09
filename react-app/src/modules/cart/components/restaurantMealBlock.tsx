import React from 'react';
import { useSelector } from 'react-redux';
import { getBlockSumByRestaurantId } from '../../../core/redux/cart/selectors';
import { RootState } from '../../../core/redux/rootReducer';
import { Meal, restaurant } from '../../../core/types';
import { rerender } from '../../../core/utils/rerender/cart.rerender';
import './meal-block.style.css'

interface RestaurantMealBlockProps {
  restaurant: restaurant
  restaurantBlock: Meal[]
  onDeleteOneItem(meal: Meal): void
  onDeleteMeal(meal: Meal): void
  onAddMeal(meal: Meal): void
}

export const RestaurantMealBlock: React.FC<RestaurantMealBlockProps> = ({
     restaurant,
     restaurantBlock,
     onDeleteOneItem,
     onDeleteMeal, onAddMeal,
  }) => {
  const currentBlockSum = useSelector((state: RootState) => getBlockSumByRestaurantId(state, restaurant._id));

  return (
      <div className='meal_block'>
        <div>{restaurant.name}</div>
        {
          rerender.cartItem(
            restaurantBlock,
            onDeleteOneItem,
            onDeleteMeal,
            onAddMeal
          )
        }
        <div className='meal_block_sum'>
          <span className='meal_block_item'>
            Order amount : <span className={ currentBlockSum > restaurant.minSumOfDelivery ? "Enough" : "notEnough"}>{currentBlockSum} bun</span>
        </span>
        </div>
      </div>
  );
};