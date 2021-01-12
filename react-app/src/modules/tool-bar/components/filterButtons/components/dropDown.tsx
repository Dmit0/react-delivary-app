import React from 'react';
import { cuisine } from '../../../../../core/types';

interface DropCuisineProps {
  cuisineTypes: cuisine[]
  currentCuisine: string
  Type: string
  onSetType(name: string): void
}

export const DropCuisine:React.FC<DropCuisineProps> = ({ currentCuisine, Type, cuisineTypes, onSetType }) => {
  return (
    <div className="dropdown navbar-brand-menu-switcher">
      <button
        className={ currentCuisine === '' ? `btn btn-secondary dropdown-toggle navbar-brand-menu-switcher-button` : `btn btn-secondary dropdown-toggle active-button` }
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-expanded="false">
        { Type === 'All' || Type === 'Loved' || Type === 'Opened' || Type === 'Switch'
          ? 'more Filters'
          : currentCuisine
        }
      </button>
      <ul className="dropdown-menu dropdown-menu-items" aria-labelledby="dropdownMenuButton">
        { cuisineTypes.map(cuisine => (
          <li
            onClick={ () => onSetType(cuisine.name) }
            key={ cuisine._id }>
            <span className="dropdown-item dropdown-menu-item">{ cuisine.name }</span>
          </li>)) }
      </ul>
    </div>
  );
};