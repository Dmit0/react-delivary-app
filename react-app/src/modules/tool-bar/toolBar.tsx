import React from 'react';
import { cuisine, restaurant } from '../../core/types';
import { FilterButtons } from './components/filterButtons';
import { SearchPanel } from './components/searchFilterPanel';

interface ToolBarProps {
  filterType: string
  cuisineTypes: cuisine[]
  currentCuisine: string
  fetched_restaurants: restaurant[]
  onSetSortType(type: string): void
}

export const ToolBar: React.FC<ToolBarProps> = ({
  filterType,
  cuisineTypes,
  onSetSortType,
  currentCuisine,
  fetched_restaurants
  }) => {
  return (
    <div className="App_header__secondary-wrapper">
      <div className="App_header__secondary">
        <nav className="navbar">
          <div className="container-fluid  App_header__secondary-container">
            <FilterButtons
              main_categories={ [ 'Opened', 'Loved' ] }
              onSetType={ onSetSortType }
              Type={ filterType }
              cuisineTypes={ cuisineTypes }
              fetched_restaurants={ fetched_restaurants }
              currentCuisine={ currentCuisine }
            />
            <div>
              <SearchPanel/>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};