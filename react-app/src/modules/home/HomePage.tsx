import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationAPI } from '../../core/api/apis/authenticationApi';
import { UserAPI } from '../../core/api/apis/userApi';
import { Banners } from '../../core/components/content/banners';
import { Restaurant } from '../../core/components/content/restaurant';
import { getBanners } from '../../core/redux/app/selectors';
import { getToken } from '../../core/redux/auth/selectors';
import { get_countries } from '../../core/redux/countries/actions';
import { getLovedRestaurants } from '../../core/redux/restaurant/loveRestaurants/selectors';
import {
  set_restaurants,
  set_current_restaurant,
  set_filtered_restaurants,
  set_input_filter,
  del_current_restaurant_and_meals,
} from '../../core/redux/restaurant/actions';
import {
  add_restaurant_to_loved,
  remove_restaurant_from_loved,
  set_loved_restaurant_from_localeStorage,
} from '../../core/redux/restaurant/loveRestaurants/actions';
import { get_bunners } from '../../core/redux/app/actions';
import { getCuisines, getFilteredList, getFilteredRestaurants, getRestaurants } from '../../core/redux/restaurant/selectors';
import { SecondNavbar } from '../../core/components/navbar/secondNavbar';
import '../../core/css/content.css';
import '../../core/css/styles.css';
import { restaurant } from '../../core/types';

export const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  const fetchedRestaurants = useSelector(getRestaurants)
  const filteredRestaurants = useSelector(getFilteredRestaurants)
  const loveRestaurants = useSelector(getLovedRestaurants)
  const banners = useSelector(getBanners)
  const cuisineTypes = useSelector(getCuisines)
  const searchedRestaurants = useSelector(getFilteredList)
  const token = useSelector(getToken)

  const [ currentFilterText, setCurrentFilterText ] = useState<string>('');
  const [ currentSortType, setCurrentSortType ] = useState<string>('All');
  const [ currentCuisine, setCurrentCuisine ] = useState<string>('');

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

  }, [ cuisineTypes, fetchedRestaurants, loveRestaurants ]);

  const handleFilterTextChange = useCallback((valyStr: string) => {
    setCurrentFilterText(valyStr);
    dispatch(set_input_filter(fetchedRestaurants, valyStr));
  }, [ fetchedRestaurants ]);

  const restaurantHeandler = (restaurant: restaurant) => {
    dispatch(set_current_restaurant(restaurant));//чанком добавить милы ?
  };

  const loveHeandler = (restaurant: restaurant, value: boolean) => {
    token
      ? userLoveAction(restaurant._id, value, token)
      : value
        ? dispatch(add_restaurant_to_loved(restaurant._id))
        : dispatch(remove_restaurant_from_loved(restaurant._id));
  };

  const userLoveAction = async (restaurantId: string, action: boolean, token: string) => {
    const response = await UserAPI.loveRestaurantAction(token, { restaurantId, action });
    if (response) {
      action
        ? dispatch(add_restaurant_to_loved(restaurantId))
        : dispatch(remove_restaurant_from_loved(restaurantId));
    }
  };

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

  useEffect(() => {
    dispatch(set_restaurants());
  }, []);

  useEffect(() => {
    if (loveRestaurants.length > 0 && !token) {
      localStorage.setItem('loved', JSON.stringify(loveRestaurants));
    }
  }, [ loveRestaurants, token ]);

  useEffect(() => {
    dispatch(get_bunners());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(get_countries());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(del_current_restaurant_and_meals());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRestaurant(token).then((response) => {
      response && dispatch(set_loved_restaurant_from_localeStorage(response));
    });
  }, [ token ]);

  const getRestaurant = async (token: any) => {
    return token
      ? await AuthenticationAPI.getLoveUserRestaurants(token)
      : JSON.parse(localStorage.getItem('loved') || '[]') as string[];
  };

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
                  <Restaurant key={ item._id } restaurant={ item } onRestaurantClick={ restaurantHeandler } toggleLoved={ loveHeandler }
                              checked={ check(item._id) }/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="App__footer"></div>
    </div>
  );
};


