import React, { useMemo } from 'react';
import { ToolBarSearchTypes } from '../../core/enums';
import { cuisine } from '../../core/types';
import { FilterButtons } from './components/filterButtons';
import { SearchPanel } from './components/searchFilterPanel';

interface ToolBarProps {
  cuisineTypes: cuisine[]
  filter: string
  onSetSortType(type: string): void
}

export const ToolBar: React.FC<ToolBarProps> = ({
  cuisineTypes,
  onSetSortType,
  filter
  }) => {

  const categories = useMemo(() => {
    return [
      ToolBarSearchTypes.OPENED,
      ToolBarSearchTypes.LOVED
    ]
  }, [])

  return (
    <div className="App_header__secondary-wrapper">
      <div className="App_header__secondary">
        <nav className="navbar">
          <div className="container-fluid  App_header__secondary-container">
            <FilterButtons
              main_categories={categories}
              onSetType={onSetSortType}
              cuisineTypes={cuisineTypes}
              filter={filter}
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