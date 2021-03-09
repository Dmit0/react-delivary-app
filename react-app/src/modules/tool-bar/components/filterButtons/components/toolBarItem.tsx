import React from 'react';
import { ToolBarSearchTypes } from '../../../../../core/enums';

interface DropCuisineProps {
  category: string
  filter: any
  onSetType(name: string): void
}

export const ToolBarItem:React.FC<DropCuisineProps> = ({ category, onSetType, filter }) => {
  return (
    <span
      onClick={() => onSetType(category) }
      key={ category }
      className={ Object.values(ToolBarSearchTypes).includes(filter) && filter === category ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu' }>
      {category}
    </span>
  );
};