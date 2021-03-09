import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToolBarSearchTypes } from '../../core/enums';
import { Core } from '../../core/enums/core.enum';
import { getIsLogIn } from '../../core/redux/user/selectors';
import { setLocaleStorageItem } from '../../core/utils/locale-storage.utils';
import { Banners } from '../banner/banners';
import { getBanners } from '../../core/redux/app/selectors';
import { getLovedRestaurants } from '../../core/redux/loveRestaurants/selectors';
import {
  loveHandler,
  set_current_restaurant,
  set_filtered_restaurants,
  setCurrentHomePageFilter,
} from '../../core/redux/restaurant/actions';
import {
  getCuisines,
  getCurrentFilterType,
  getReRenderedFilterRestaurants,
  getRestaurants,
} from '../../core/redux/restaurant/selectors';
import '../../core/css/content.css';
import '../../core/css/styles.css';
import { restaurant } from '../../core/types';
import { ToolBar } from '../tool-bar/toolBar';
import { rerender } from '../../core/utils/rerender/home.rerender';

const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  const fetchedRestaurants = useSelector(getRestaurants);
  const getRerenderFilteredRestaurant = useSelector(getReRenderedFilterRestaurants);
  const loveRestaurants = useSelector(getLovedRestaurants);
  const banners = useSelector(getBanners);
  const cuisineTypes = useSelector(getCuisines);
  const isLogIn = useSelector(getIsLogIn);
  const currentFilter = useSelector(getCurrentFilterType);

  useEffect(() => {
    if (loveRestaurants.length > 0 && !isLogIn) {
      setLocaleStorageItem(Core.Loved, loveRestaurants)
    }
  }, [ loveRestaurants, isLogIn ]);

  const sortTypeHandler = useCallback((type: any) => {
    dispatch(setCurrentHomePageFilter(type));
    if (Object.values(ToolBarSearchTypes).includes(type)) {
      dispatch(set_filtered_restaurants(fetchedRestaurants, type, loveRestaurants))
    } else {
      let cuisine = cuisineTypes.find(item => item.name === type);
      cuisine && dispatch(set_filtered_restaurants(fetchedRestaurants, cuisine))
    }
  }, [cuisineTypes, dispatch, fetchedRestaurants, loveRestaurants]);

  const restaurantHandler = useCallback((restaurant: restaurant) => {
    dispatch(set_current_restaurant(restaurant));
  }, [ dispatch ]);

  const loveHandlerAction = useCallback((restaurant: restaurant, value: boolean) => {
    dispatch(loveHandler(isLogIn, restaurant, value))
  }, [ dispatch, isLogIn ]);

  return (
    <div className="App">
      <div className="App__content">
        <Banners banners={ banners }/>
        <div className="App_content_part">
          <ToolBar
            onSetSortType={sortTypeHandler}
            cuisineTypes={cuisineTypes}
            filter={currentFilter}
          />
          <div className="App_content_part_main">
            <div className="App__content-main">
              { rerender.restaurant(
                getRerenderFilteredRestaurant,
                restaurantHandler,
                loveHandlerAction
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


