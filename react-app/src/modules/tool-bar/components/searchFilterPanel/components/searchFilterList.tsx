import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFilteredList } from '../../../../../core/redux/restaurant/selectors';

interface ListProps {
  deleteFilterInput(filterText: string): void
}

export const List: React.FC<ListProps> = ({ deleteFilterInput }) => {
  const searchedRestaurants = useSelector(getFilteredList)

  return (
    <>
      { searchedRestaurants.map(restaurant => (
        <Link to={ `/MealsPage/${ restaurant._id }` }>
          <li onClick={ () => deleteFilterInput('') } className={ 'list-group-item list_item' } data-category={ restaurant.name }
              key={ restaurant._id }>
            <span className='search_description_name'>{ restaurant.name }</span>
            <span className='search_description_content'>{ restaurant.description }</span>
          </li>
        </Link>
      )) }
    </>
  );
};