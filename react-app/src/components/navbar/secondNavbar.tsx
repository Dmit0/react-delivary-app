import React from 'react';
import { Categories } from './categories';
import '../../css/header.css';
import { List } from './list';
import { restaurant, cuisen } from '../../interfaces/restaurant';

interface SecondNavBarProps {
  value: string
  filterType: string
  cuisenTypes: cuisen[]
  currentCuisen: string
  FilteredList: restaurant[]
  fetched_restaurants: restaurant[]
  onFilterTextChange(filterText: string): void
  onSetSortType(type: string): void
}

export const SecondNavbar: React.FC<SecondNavBarProps> = ({ filterType, cuisenTypes, onSetSortType, currentCuisen, onFilterTextChange, value, FilteredList, fetched_restaurants }) => {
  return (
    <div className="App_header__secondary-wrapper">
      <div className="App_header__secondary">
        <nav className="navbar">
          <div className="container-fluid  App_header__secondary-container">
            <Categories
              main_categories={['Opened', 'Loved']}
              onSetType={onSetSortType}
              Type={filterType}
              cuisenTypes={cuisenTypes}
              fetched_restaurants={fetched_restaurants}
              currentCuisen={currentCuisen}
            />
            <div>
              <input className="form-control  App_header__secondary-input" value={value} type="search" placeholder="Search" aria-label="Search"
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFilterTextChange(event.target.value)}/>
              <div className="list-group">
                <List filterRestaurants={FilteredList} deleteFilterInput={onFilterTextChange}/>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};