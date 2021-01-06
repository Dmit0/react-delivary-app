import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_bunners } from '../../core/redux/app/actions';
import { del_current_restaurant_and_meals, set_restaurants } from '../../core/redux/restaurant/actions';
import HomePage from '../../modules/home/HomePage'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_restaurants());
    dispatch(get_bunners());
    dispatch(del_current_restaurant_and_meals());
  }, []);

  return (
    <>
      <HomePage />
    </>
  )

}

export default Home