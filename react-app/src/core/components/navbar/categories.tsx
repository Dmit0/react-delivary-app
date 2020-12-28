import React from 'react';
import { cuisine, restaurant } from '../../types';

interface CategoriesProps {
  main_categories: string[]
  Type: string
  cuisineTypes: cuisine[]
  currentCuisine: string
  onSetType(name: string): void
  fetched_restaurants: restaurant[]
  //cuisine_categories:string[]
}

export const Categories: React.FC<CategoriesProps> = ({ main_categories, Type, currentCuisine, cuisineTypes, onSetType, fetched_restaurants }) => {

  const foundTypes = () => {
    let sortType: cuisine[] = [];
    if (fetched_restaurants && fetched_restaurants.length !== 0 && cuisineTypes && cuisineTypes.length !== 0) {
      cuisineTypes.forEach(cuisine => {
        fetched_restaurants.find(restaurant => {
          if (restaurant.selItems.find(selItem => selItem === cuisine._id)) {
            if (sortType.find(item => item._id === cuisine._id) === undefined) {
              sortType.push(cuisine);
            }
          }
          return null;
        });
      });
    }
    return sortType;
  };

  return (
    <div className="App_header__secondary-action">
      <span className={ Type === 'All' ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu' }
            onClick={ () => onSetType('All') }>All</span>
      { main_categories.map(categorie =>
        <span onClick={ () => onSetType(categorie) } key={ categorie }
              className={ Type === categorie ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu' }>{ categorie }</span>,
      ) }
      <div className="dropdown navbar-brand-menu-switcher">
        <button
          className={ currentCuisine === '' ? `btn btn-secondary dropdown-toggle navbar-brand-menu-switcher-button` : `btn btn-secondary dropdown-toggle active-button` }
          type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
          { Type === 'All' || Type === 'Loved' || Type === 'Opened' || Type === 'Switch'
            ? 'more Filters'
            : currentCuisine
          }
        </button>
        <ul className="dropdown-menu dropdown-menu-items" aria-labelledby="dropdownMenuButton">
          { foundTypes().map(cuisine => (
            <li onClick={ () => onSetType(cuisine.name) } key={ cuisine._id }><span className="dropdown-item dropdown-menu-item">{ cuisine.name }</span>
            </li>)) }
        </ul>
      </div>
    </div>
  );
};