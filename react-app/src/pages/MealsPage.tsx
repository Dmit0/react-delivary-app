import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/meals-content.css';
import { cartApi } from '../api/part_apis/cartApi';
import { set_meal_to_cart, set_meal_from_localestorage_to_cart } from '../redux/actions/cartActions';
import { get_meals_by_restaurant_id } from '../redux/actions/restaurants';
import { NavBar } from '../components/navbar/navbar';
import { Meal } from '../components/content/meal';
import { meals as Mealtype } from '../interfaces/meals';
import { getToken } from '../redux/selectors/auth.selectors';
import { getMeals } from '../redux/selectors/meal.selector';

export const MealsPage: React.FC = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const meals = useSelector(getMeals);
  const token = useSelector(getToken)

  useEffect(() => {
    dispatch(get_meals_by_restaurant_id(id));
  }, [id]);

  const addHandler = useCallback((meal: Mealtype) => {
    token
      ? addMealToUserCart(token, meal)
      : dispatch(set_meal_to_cart(meal));
  },[token]);

  const addMealToUserCart = async(token: string, meal: Mealtype) => {
    const response = await cartApi.setMealToUserCart(token, meal._id)
    response && dispatch(set_meal_to_cart(meal))
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