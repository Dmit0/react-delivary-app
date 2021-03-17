import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../core/css/meals-content.css';
import { Core } from '../../core/enums/core.enum';
import { getCart } from '../../core/redux/cart/selectors';
import { getMeals } from '../../core/redux/restaurant/selectors';
import { getIsLogIn } from '../../core/redux/user/selectors';
import { Meal } from '../../core/types';
import { setMealToCart } from '../../core/redux/cart/actions';
import { setLocaleStorageItem } from '../../core/utils/locale-storage.utils';
import { rerender } from '../../core/utils/rerender/meal.rerender';

const MealsPage: React.FC = () => {
  const dispatch = useDispatch();
  const meals = useSelector(getMeals);
  const isLogIn = useSelector(getIsLogIn);
  const cart = useSelector(getCart);

  useEffect(() => {
    !isLogIn && setLocaleStorageItem(Core.Cart, cart);
  }, [ cart, isLogIn ]);

  const addHandler = useCallback((meal: Meal) => {
    dispatch(setMealToCart(isLogIn, meal))
  }, [dispatch, isLogIn]);

  return (
    <div className="App__meals-container">
      <div className="App__content-main">
        { rerender.meals(meals, addHandler) }
      </div>
    </div>
  );
};

export default MealsPage;