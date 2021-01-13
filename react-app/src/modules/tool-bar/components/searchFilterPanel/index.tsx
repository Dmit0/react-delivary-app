import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_input_filter } from '../../../../core/redux/restaurant/actions';
import { getRestaurants } from '../../../../core/redux/restaurant/selectors';
import { List } from './components/searchFilterList';
import { SearchInput } from './components/searchInput';


export const SearchPanel: React.FC = () => {

  const dispatch = useDispatch();
  const [ currentFilterText, setCurrentFilterText ] = useState<string>('');

  const fetchedRestaurants = useSelector(getRestaurants)

  const handleFilterTextChange = useCallback((valueStr: string) => {
    setCurrentFilterText(valueStr);
    dispatch(set_input_filter(fetchedRestaurants, valueStr));
  }, [dispatch, fetchedRestaurants]);

  return (
  <>
    <SearchInput
      currentFilterText={currentFilterText}
      handleFilterTextChange={handleFilterTextChange}
    />
    <div className="list-group">
      <List deleteFilterInput={handleFilterTextChange}/>
    </div>
  </>
  );
};