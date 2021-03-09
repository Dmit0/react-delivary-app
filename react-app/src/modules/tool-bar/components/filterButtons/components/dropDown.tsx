import React, { useMemo } from 'react';
import { ToolBarSearchTypes } from '../../../../../core/enums';
import { cuisine } from '../../../../../core/types';

interface DropCuisineProps {
  cuisineTypes: cuisine[]
  filter: any
  onSetType(name: string): void
}

export const DropCuisine:React.FC<DropCuisineProps> = ({ cuisineTypes, onSetType, filter }) => {

  const isCuisineFilter = useMemo(() => {
    return !Object.values(ToolBarSearchTypes).includes(filter)
  }, [filter])

  return (
    <div className="dropdown navbar-brand-menu-switcher">
      <button
        className={ !isCuisineFilter ? `btn btn-secondary dropdown-toggle navbar-brand-menu-switcher-button` : `btn btn-secondary dropdown-toggle active-button` }
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-expanded="false">
        { isCuisineFilter
          ? filter
          : 'more Filters'
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