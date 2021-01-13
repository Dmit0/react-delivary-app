import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_meals_by_restaurant_id } from '../../core/redux/restaurant/actions';
import MealsPage from '../../modules/meal/MealsPage';


const Meal = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_meals_by_restaurant_id(id));
  }, [dispatch, id]);

  return (
    <>
      <MealsPage/>
    </>
  );

};

export default Meal;