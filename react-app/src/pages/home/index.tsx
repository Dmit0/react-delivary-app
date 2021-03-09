import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../../core/redux/app/actions';
import { del_current_restaurant_and_meals, getLoveRestaurant, set_restaurants } from '../../core/redux/restaurant/actions';
import { getIsLogIn } from '../../core/redux/user/selectors';
import HomePage from '../../modules/home/HomePage'

const Home = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn)

  useEffect(() => {
    dispatch(set_restaurants());
    dispatch(get_banners());
    dispatch(del_current_restaurant_and_meals());
    dispatch(getLoveRestaurant(isLogIn));
  }, [dispatch, isLogIn]);

  return (
    <>
      <HomePage />
    </>
  )

}

export default Home