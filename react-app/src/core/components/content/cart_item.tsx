import React from 'react';
import { meals } from '../../types';

interface CartProps {
  meal: meals
  onDeleteOneItem(meal: meals): void
  onDeleteMeal(meal: meals): void
  onAddMeal(meal: meals): void
}

export const Cart_item: React.FC<CartProps> = ({ meal, onDeleteOneItem, onDeleteMeal, onAddMeal }) => {
  const countPrice = (): Number => {
    let totalPrice = meal.count * meal.price;
    return totalPrice;
  };
  return (
    <>
      <div className='cart-item'>
        <div className='item-description'>
          <div>
            <img className='cart-img' src={ meal.picture } alt=""></img>
          </div>
          <div className='detalic-item-description'>
            <span className='item-description-name'>{ meal.name } </span>
            <span className='item-description-price'>{ meal.price } bun</span>
          </div>
        </div>
        <div className='item-button-controller'>
                <span className='plusButton' onClick={ () => {
                  onAddMeal(meal);
                } }>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                        <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                </span>
          <span className='count_of_item'>{ meal.count } </span>
          <span className='minusButton' onClick={ () => {
            onDeleteOneItem(meal);
          } }>
                    <svg width="1.7em" height="1.5em" viewBox="0 0 16 16" className="bi bi-dash-circle" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </span>
        </div>
        <span className='total-price'> price : { countPrice() } bun</span>
        <span className='delete-button' onClick={ () => onDeleteMeal(meal) }>
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-x-circle" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </span>
      </div>
    </>
  );
};