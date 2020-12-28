import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../core/css/meals-content.css';
import { cartApi } from '../../core/api/apis/cartApi';
import { getToken } from '../../core/redux/auth/selectors';
import { getCart } from '../../core/redux/cart/selectors';
import { getMeals } from '../../core/redux/restaurant/selectors';
import { meals } from '../../core/types';
import { set_meal_to_cart } from '../../core/redux/cart/actions/cart.actions';
import { get_meals_by_restaurant_id } from '../../core/redux/restaurant/actions/restaurants.actions';
import { Meal } from '../../core/components/content/meal';


export const MealsPage: React.FC = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const meals = useSelector(getMeals);
  const token = useSelector(getToken);
  const cart = useSelector(getCart)

  useEffect(() => {
    dispatch(get_meals_by_restaurant_id(id));
  }, [id]);

  useEffect(() => {
    !token && localStorage.setItem('cart', JSON.stringify(cart));
  },[cart, token])

  const addHandler = useCallback((meal: meals) => {
    token
      ? addMealToUserCart(token, meal)
      : dispatch(set_meal_to_cart(meal, false));
  },[token]);

  const addMealToUserCart = async(token: string, meal: meals) => {
    const response = await cartApi.setMealToUserCart(token, meal._id)
    response && dispatch(set_meal_to_cart(meal, !!token))
  }

  return (
    <>
      <div className="App">
        <div className="App__meals-container">
          <div className="App__content-main">
            { meals.map(meal => (
              <Meal key={ meal._id } meal={ meal } onAdd={ addHandler }/>
            )) }
          </div>
        </div>
        <div className="App__footer"></div>
      </div>
    </>
  );
};