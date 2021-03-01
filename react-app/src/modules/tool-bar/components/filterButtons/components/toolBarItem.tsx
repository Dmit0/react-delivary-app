import React from 'react';

interface DropCuisineProps {
  category: string
  Type: string
  onSetType(name: string): void
}

export const ToolBarItem:React.FC<DropCuisineProps> = ({ category, onSetType, Type }) => {
  return (
    <span
      onClick={() => onSetType(category) }
      key={ category }
      className={ Type === category ? 'navbar-brand-menu navbar-brand-menu-active' : 'navbar-brand-menu' }>
      {category}
    </span>
  );
};