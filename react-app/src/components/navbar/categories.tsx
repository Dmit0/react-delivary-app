import React from 'react';
import { restaurant, cuisen } from '../../interfaces/restaurant';

interface CategoriesProps {
  main_categories: string[]
  Type: string
  cuisenTypes: cuisen[]
  currentCuisen: string

  onSetType(name: string): void

  fetched_restaurants: restaurant[]
  //cuisine_categories:string[]

}

export const Categories: React.FC<CategoriesProps> = ({ main_categories, Type, currentCuisen, cuisenTypes, onSetType, fetched_restaurants }) => {

  const foundTypes = () => {
    let sortType: cuisen[] = [];
    if (fetched_restaurants.length !== 0 && cuisenTypes.length !== 0) {
      cuisenTypes.forEach(cuisen => {
        fetched_restaurants.find(restaurant => {
          if (restaurant.selItems.find(selItem => selItem === cuisen._id)) {
            if (sortType.find(item => item._id === cuisen._id) === undefined) {
              sortType.push(cuisen);
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
      <span className={Type === 'All' ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu'}
            onClick={() => onSetType('All')}>All</span>
      {main_categories.map(categorie =>
        <span onClick={() => onSetType(categorie)} key={categorie}
              className={Type === categorie ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu'}>{categorie}</span>,
      )}
      <div className="dropdown navbar-brand-menu-switcher">
        <button
          className={currentCuisen === '' ? `btn btn-secondary dropdown-toggle navbar-brand-menu-switcher-button` : `btn btn-secondary dropdown-toggle active-button`}
          type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
          {Type === 'All' || Type === 'Loved' || Type === 'Opened' || Type === 'Switch'
            ? 'more Filters'
            : currentCuisen
          }
        </button>
        <ul className="dropdown-menu dropdown-menu-items" aria-labelledby="dropdownMenuButton">
          { foundTypes().map(cuisen => (
          <li onClick={ () => onSetType(cuisen.name) } key={ cuisen._id }><span className="dropdown-item dropdown-menu-item">{ cuisen.name }</span>
          </li>)) }
        </ul>
      </div>
    </div>
  );
};