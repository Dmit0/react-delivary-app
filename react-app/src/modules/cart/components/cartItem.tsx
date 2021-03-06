import React from 'react';
import { DeleteIcon, MinusIcon, PlusIcon } from '../../../core/components/icons';
import { Meal } from '../../../core/types';

interface CartProps {
  meal: Meal
  onDeleteOneItem(meal: Meal): void
  onDeleteMeal(meal: Meal): void
  onAddMeal(meal: Meal): void
}

export const CartItem: React.FC<CartProps> = ({ meal, onDeleteOneItem, onDeleteMeal, onAddMeal }) => {
  const countPrice = (): Number => (meal.count * meal.price);
  return (
    <>
      <div className='cart-item'>
        <div className='item-description'>
          <div>
            <img className='cart-img' src={ meal.picture } alt=""/>
          </div>
          <div className='detalic-item-description'>
            <span className='item-description-name'>{ meal.name } </span>
            <span className='item-description-price'>{ meal.price } bun</span>
          </div>
        </div>
        <div className='item-button-controller'>
          <span className='plusButton' onClick={() => {onAddMeal(meal)}}>
            <PlusIcon/>
          </span>
          <span className='count_of_item'>{ meal.count } </span>
          <span className='minusButton' onClick={() => {onDeleteOneItem(meal)}}>
            <MinusIcon/>
          </span>
        </div>
        <span className='total-price'> price : { countPrice() } bun</span>
        <span className='delete-button' onClick={() => onDeleteMeal(meal)}>
          <DeleteIcon/>
        </span>
      </div>
    </>
  );
};