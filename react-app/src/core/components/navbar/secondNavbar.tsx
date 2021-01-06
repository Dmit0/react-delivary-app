import React from 'react';
import { cuisine, restaurant } from '../../types';
import { Categories } from './categories';
import '../../css/header.css';
import { List } from './list';

interface SecondNavBarProps {
  value: string
  filterType: string
  cuisineTypes: cuisine[]
  currentCuisine: string
  FilteredList: restaurant[]
  fetched_restaurants: restaurant[]
  onFilterTextChange(filterText: string): void
  onSetSortType(type: string): void
}

export const SecondNavbar: React.FC<SecondNavBarProps> = ({
     filterType,
     cuisineTypes,
     onSetSortType,
     currentCuisine,
     onFilterTextChange,
     value,
     FilteredList,
     fetched_restaurants
  }) => {
  return (
    <div className="App_header__secondary-wrapper">
      <div className="App_header__secondary">
        <nav className="navbar">
          <div className="container-fluid  App_header__secondary-container">
            <Categories
              main_categories={ [ 'Opened', 'Loved' ] }
              onSetType={ onSetSortType }
              Type={ filterType }
              cuisineTypes={ cuisineTypes }
              fetched_restaurants={ fetched_restaurants }
              currentCuisine={ currentCuisine }
            />
            <div>
              <input
                className="form-control  App_header__secondary-input"
                value={ value }
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => onFilterTextChange(event.target.value) }
              />
              <div className="list-group">
                <List filterRestaurants={ FilteredList } deleteFilterInput={ onFilterTextChange }/>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};