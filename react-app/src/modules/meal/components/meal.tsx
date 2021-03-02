import React from 'react';
import '../../../core/css/meals-content.css';
import { CartMealIcon } from '../../../core/components/icons';
import { Meal as MealType } from '../../../core/types';

interface MealProps {
  meal: MealType,
  onAdd(meal: MealType): void
}

export const Meal: React.FC<MealProps> = ({ meal, onAdd }) => {
  return (
    <div className="card-inline meal-card">
      <img src={ meal.picture } className="card-img-top" alt="..."/>
      <div className="App__content-main-card-info">
        <span className="card-inline-name">{ meal.name }</span>
        <span className="card-inline-price">{ meal.price } bun</span>
        <span className="meal-cart" onClick={ () => { onAdd(meal); } }>
            <CartMealIcon/>
          </span>
      </div>
    </div>
  );
};