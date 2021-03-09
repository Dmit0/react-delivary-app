import React from 'react';
import { Link } from 'react-router-dom';
import '../../../core/css/content.css';
import { Links } from '../../../core/enums';
import { restaurant } from '../../../core/types';

interface RestaurantProps {
  restaurant: restaurant
  checked: boolean
  onRestaurantClick(restaurant: restaurant): void
  toggleLoved(restaurant: restaurant, value: boolean): void
}

export const Restaurant: React.FC<RestaurantProps> = ({ restaurant, onRestaurantClick, toggleLoved, checked }) => {
  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleLoved(restaurant, e.target.checked);
  };
  return (
    <>
      <div className="card-inline">
        <label className="check option">
          <input checked={ checked } type="checkbox" className="myCheckbox__input" onChange={ onToggle }/>
          <span className="check__box"/>
        </label>
        <Link to={ `${Links.MEALS_LINK}${ restaurant._id }` }>
          <div onClick={ () => onRestaurantClick(restaurant) }>
            <img src={ restaurant.picture } className="card-img-top" alt="..."/>
            <div className="App__content-main-card-info">
              <span className="card-inline-name">{ restaurant.name }</span>
              <span className="card-inline-content">{ restaurant.description }</span>
              <span className="card-inline-time">{ restaurant.working_time }</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};