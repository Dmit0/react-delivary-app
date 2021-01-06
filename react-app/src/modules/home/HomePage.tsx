import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banners } from '../banner/banners';
import { Restaurant } from '../../core/components/content/restaurant';
import { getBanners } from '../../core/redux/app/selectors';
import { getLovedRestaurants } from '../../core/redux/loveRestaurants/selectors';
import {
  set_current_restaurant,
  set_filtered_restaurants,
  set_input_filter,
} from '../../core/redux/restaurant/actions';
import {
  add_restaurant_to_loved,
  remove_restaurant_from_loved,
  set_loved_restaurant_from_localeStorage,
} from '../../core/redux/loveRestaurants/actions';
import { getCuisines, getFilteredList, getFilteredRestaurants, getRestaurants } from '../../core/redux/restaurant/selectors';
import { SecondNavbar } from '../../core/components/navbar/secondNavbar';
import '../../core/css/content.css';
import '../../core/css/styles.css';
import { getToken } from '../../core/redux/user/selectors';
import { restaurant } from '../../core/types';
import { useHomeUtils } from './utils/home.utils';

const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  const fetchedRestaurants = useSelector(getRestaurants)
  const filteredRestaurants = useSelector(getFilteredRestaurants)
  const loveRestaurants = useSelector(getLovedRestaurants)
  const banners = useSelector(getBanners)
  const cuisineTypes = useSelector(getCuisines)
  const searchedRestaurants = useSelector(getFilteredList)
  const token = useSelector(getToken)

  const { getRestaurant, userLoveAction } = useHomeUtils()

  const [ currentFilterText, setCurrentFilterText ] = useState<string>('');
  const [ currentSortType, setCurrentSortType ] = useState<string>('All');
  const [ currentCuisine, setCurrentCuisine ] = useState<string>('');

  useEffect(() => {
    if (loveRestaurants.length > 0 && !token) {
      localStorage.setItem('loved', JSON.stringify(loveRestaurants));
    }
  }, [ loveRestaurants, token ]);

  useEffect(() => {
    getRestaurant(token).then((response) => {
      response && dispatch(set_loved_restaurant_from_localeStorage(response));
    });
  }, [ token ]);

  const sortTypeHandler = useCallback((type: string) => {
    setCurrentSortType(type);
    setCurrentCuisine('');
    if (type !== 'All' && type !== 'Opened' && type !== 'Loved') {
      setCurrentCuisine(type);
      let cuisine = cuisineTypes.find(item => item.name === type);
      if (cuisine) {
        dispatch(set_filtered_restaurants(fetchedRestaurants, cuisine));
      }
    } else if (type === 'Loved') {
      dispatch(set_filtered_restaurants(fetchedRestaurants, type, loveRestaurants));
    } else {
      dispatch(set_filtered_restaurants(fetchedRestaurants, type));
    }
  }, [cuisineTypes, dispatch, fetchedRestaurants, loveRestaurants]);

  const handleFilterTextChange = useCallback((valueStr: string) => {
    setCurrentFilterText(valueStr);
    dispatch(set_input_filter(fetchedRestaurants, valueStr));
  }, [dispatch, fetchedRestaurants]);

  const restaurantHandler = useCallback((restaurant: restaurant) => {
    dispatch(set_current_restaurant(restaurant));
  },[dispatch]);

  const loveHandler = useCallback((restaurant: restaurant, value: boolean) => {
    token
      ? userLoveAction(restaurant._id, value, token)
      : value
        ? dispatch(add_restaurant_to_loved(restaurant._id))
        : dispatch(remove_restaurant_from_loved(restaurant._id));
  },[dispatch, token, userLoveAction]);

  const check = useCallback((id: string) => {
    if (loveRestaurants.length) {
      let checked = loveRestaurants.find((item) => {
        return item === id;
      });
      return !!checked;
    } else {
      return false;
    }
  }, [ loveRestaurants ]);

  return (
    <div className="App">
      <div className="App__content">
        <Banners banners={ banners }/>
        <div className="App_content_part">
          <SecondNavbar
            onFilterTextChange={ handleFilterTextChange }
            filterType={ currentSortType }
            value={ currentFilterText }
            onSetSortType={ sortTypeHandler }
            cuisineTypes={ cuisineTypes }
            currentCuisine={ currentCuisine }
            FilteredList={ searchedRestaurants }
            fetched_restaurants={ fetchedRestaurants }
          />
          <div className="App_content_part_main">
            <div className="App__content-main">
              {
                filteredRestaurants.map(item => (
                  <Restaurant
                    key={ item._id }
                    restaurant={ item }
                    onRestaurantClick={ restaurantHandler }
                    toggleLoved={ loveHandler }
                    checked={ check(item._id) }
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage


