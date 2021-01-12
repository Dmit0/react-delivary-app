import React from 'react';
import { cuisine, restaurant } from '../../../../core/types';
import { DropCuisine } from './components/dropDown';
import { ToolBarItem } from './components/toolBarItem';

interface CategoriesProps {
  main_categories: string[]
  Type: string
  cuisineTypes: cuisine[]
  currentCuisine: string
  onSetType(name: string): void
  fetched_restaurants: restaurant[]
}

export const FilterButtons: React.FC<CategoriesProps> = ({ main_categories, Type, currentCuisine, cuisineTypes, onSetType, fetched_restaurants }) => {

  return (
    <div className="App_header__secondary-action">
      <span
        className={ Type === 'All' ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu' }
        onClick={ () => onSetType('All') }>
        All
      </span>
      { main_categories.map(category =>
        <ToolBarItem
          onSetType={ onSetType }
          category={ category }
          Type={ Type }
        />,
      ) }
      <DropCuisine
        Type={ Type }
        currentCuisine={ currentCuisine }
        onSetType={ onSetType }
        cuisineTypes={ cuisineTypes }
      />
    </div>
  );
};