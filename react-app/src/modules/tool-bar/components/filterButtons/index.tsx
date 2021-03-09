import React from 'react';
import { ToolBarSearchTypes } from '../../../../core/enums';
import { cuisine } from '../../../../core/types';
import { DropCuisine } from './components/dropDown';
import { ToolBarItem } from './components/toolBarItem';

interface CategoriesProps {
  main_categories: string[]
  cuisineTypes: cuisine[]
  filter: string
  onSetType(name: string): void
}

export const FilterButtons: React.FC<CategoriesProps> =
  ({
     main_categories,
     cuisineTypes,
     onSetType,
     filter,
  }) => {
  return (
    <div className="App_header__secondary-action">
      <span
        className={ filter === ToolBarSearchTypes.ALL ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu' }
        onClick={ () => onSetType(ToolBarSearchTypes.ALL) }>
        All
      </span>
      { main_categories.map(category =>
        <ToolBarItem
          key={category}
          filter={filter}
          onSetType={onSetType}
          category={category}
        />,
      ) }
      <DropCuisine
        filter={filter}
        onSetType={onSetType}
        cuisineTypes={cuisineTypes}
      />
    </div>
  );
};