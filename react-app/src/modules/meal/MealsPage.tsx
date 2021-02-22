import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../core/css/meals-content.css';
import { cartApi } from '../../core/api/apis/cart.api';
import { getCart } from '../../core/redux/cart/selectors';
import { getMeals } from '../../core/redux/restaurant/selectors';
import { getToken } from '../../core/redux/user/selectors';
import { meals } from '../../core/types';
import { set_meal_to_cart } from '../../core/redux/cart/actions';
import { rerender } from '../../core/utils/rerender/meal.rerender';

const MealsPage: React.FC = () => {
  const dispatch = useDispatch();
  const meals = useSelector(getMeals);
  const token = useSelector(getToken);
  const cart = useSelector(getCart);

  useEffect(() => {
    !token && localStorage.setItem('cart', JSON.stringify(cart));
  }, [ cart, token ]);

  const addMealToUserCart = async (token: string, meal: meals) => {
    const response = await cartApi.setMealToUserCart(token, meal._id);
    response && dispatch(set_meal_to_cart(meal, !!token));
  };

  const addHandler = useCallback((meal: meals) => {
    token
      ? addMealToUserCart(token, meal)
      : dispatch(set_meal_to_cart(meal, false));
  }, [ dispatch, token ]);

  return (
    <div className="App__meals-container">
      <div className="App__content-main">
        { rerender.meals(meals, addHandler) }
      </div>
    </div>
  );
};

export default MealsPage;