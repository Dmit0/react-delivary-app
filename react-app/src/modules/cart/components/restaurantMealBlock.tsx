import React, { useEffect, useMemo } from 'react';
import { meals, restaurant } from '../../../core/types';
import { rerender } from '../../../core/utils/rerender/cart.rerender';
import { CartItem } from './cartItem';
import './meal-block.style.css'

interface RestaurantMealBlockProps {
  restaurant: restaurant
  restaurantBlock: meals[]
  onDeleteOneItem(meal: meals): void
  onDeleteMeal(meal: meals): void
  onAddMeal(meal: meals): void
  setBlockSum(restaurant: string, sum: number): void
}

export const RestaurantMealBlock: React.FC<RestaurantMealBlockProps> = ({
     restaurant,
     restaurantBlock,
     onDeleteOneItem,
     onDeleteMeal, onAddMeal,
     setBlockSum
  }) => {

  const countOrderRestaurantSum = (): number => {
    return restaurantBlock.reduce((acc, el) => {
      return acc += el.count * el.price
    }, 0)
  }

  const blockSum = useMemo(() => {
    return countOrderRestaurantSum()
  },[countOrderRestaurantSum])

  useEffect(() => {
    setBlockSum(restaurant._id, blockSum)
  }, [blockSum, restaurant._id, setBlockSum])

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
            Order amount : <span className={ blockSum > restaurant.minSumOfDelivery ? "Enough" : "notEnough"}>{blockSum} bun</span>
        </span>
        </div>
      </div>
  );
};