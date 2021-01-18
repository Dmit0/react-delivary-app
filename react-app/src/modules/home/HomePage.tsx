import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToolBarSearchTypes } from '../../core/enums';
import { Banners } from '../banner/banners';
import { getBanners } from '../../core/redux/app/selectors';
import { getLovedRestaurants } from '../../core/redux/loveRestaurants/selectors';
import {
  set_current_restaurant,
  set_filtered_restaurants,
} from '../../core/redux/restaurant/actions';
import {
  add_restaurant_to_loved,
  remove_restaurant_from_loved,
  set_loved_restaurant,
} from '../../core/redux/loveRestaurants/actions';
import { getCuisines, getFilteredRestaurants, getRestaurants } from '../../core/redux/restaurant/selectors';
import '../../core/css/content.css';
import '../../core/css/styles.css';
import { getToken } from '../../core/redux/user/selectors';
import { restaurant } from '../../core/types';
import { ToolBar } from '../tool-bar/toolBar';
import { rerender } from '../../core/utils/rerender/home.rerender';
import { useHomeUtils } from './utils/home.utils';

const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  const fetchedRestaurants = useSelector(getRestaurants);
  const filteredRestaurants = useSelector(getFilteredRestaurants);
  const loveRestaurants = useSelector(getLovedRestaurants);
  const banners = useSelector(getBanners);
  const cuisineTypes = useSelector(getCuisines);
  const token = useSelector(getToken);

  const { getRestaurant, userLoveAction } = useHomeUtils();

  const [ currentSortType, setCurrentSortType ] = useState<string>('All');
  const [ currentCuisine, setCurrentCuisine ] = useState<string>('');

  useEffect(() => {
    if (loveRestaurants.length > 0 && !token) {
      localStorage.setItem('loved', JSON.stringify(loveRestaurants));
    }
  }, [ loveRestaurants, token ]);

  useEffect(() => {
    getRestaurant(token).then((response) => {
      response && dispatch(set_loved_restaurant(response));
    });
  }, [ token ]);

  const sortTypeHandler = useCallback((type: string) => {
    setCurrentSortType(type)
    switch(type) {
      case ToolBarSearchTypes.OPENED:
      case ToolBarSearchTypes.ALL:
        dispatch(set_filtered_restaurants(fetchedRestaurants, type));break;
      case ToolBarSearchTypes.LOVED:
        dispatch(set_filtered_restaurants(fetchedRestaurants, type, loveRestaurants));break;
      default:
        let cuisine = cuisineTypes.find(item => item.name === type);
        cuisine && dispatch(set_filtered_restaurants(fetchedRestaurants, cuisine)) && setCurrentCuisine(type);
    }
  }, [ cuisineTypes, dispatch, fetchedRestaurants, loveRestaurants ]);

  const restaurantHandler = useCallback((restaurant: restaurant) => {
    dispatch(set_current_restaurant(restaurant));
  }, [ dispatch ]);

  const loveHandler = useCallback((restaurant: restaurant, value: boolean) => {
    token
      ? userLoveAction(restaurant._id, value, token)
      : value
        ? dispatch(add_restaurant_to_loved(restaurant._id))
        : dispatch(remove_restaurant_from_loved(restaurant._id));
  }, [ dispatch, token, userLoveAction ]);

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
          <ToolBar
            filterType={ currentSortType }
            onSetSortType={ sortTypeHandler }
            cuisineTypes={ cuisineTypes }
            currentCuisine={ currentCuisine }
            fetched_restaurants={ fetchedRestaurants }
          />
          <div className="App_content_part_main">
            <div className="App__content-main">
              { rerender.restaurant(
                filteredRestaurants,
                restaurantHandler,
                loveHandler,
                check) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


