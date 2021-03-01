import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../core/css/meals-content.css';
import { cartApi } from '../../core/api/apis/cart.api';
import { Core } from '../../core/enums/core.enum';
import { getCart } from '../../core/redux/cart/selectors';
import { getMeals } from '../../core/redux/restaurant/selectors';
import { getIsLogIn } from '../../core/redux/user/selectors';
import { meals } from '../../core/types';
import { set_meal_to_cart } from '../../core/redux/cart/actions';
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

  const addMealToUserCart = async (meal: meals) => {
    const response = await cartApi.setMealToUserCart(meal._id);
    response && dispatch(set_meal_to_cart(meal));
  };

  const addHandler = useCallback((meal: meals) => {
    isLogIn
      ? addMealToUserCart(meal)
      : dispatch(set_meal_to_cart(meal));
  }, [ dispatch, isLogIn ]);

  return (
    <>
      <div className="App">
        <div className="App__meals-container">
          <div className="App__content-main">
            {rerender.meals(meals, addHandler)}
          </div>
        </div>
      </div>
    </>
  );
};

export default MealsPage;