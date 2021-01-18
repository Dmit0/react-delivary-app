import React from 'react';

export const SearchInput = ({ currentFilterText, handleFilterTextChange }: any) => {
  return (
      <input
        className="form-control  App_header__secondary-input"
        value={ currentFilterText }
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => handleFilterTextChange(event.target.value) }
      />
  );
};