import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/meals-content.css';
import { set_meal_to_cart, set_meal_from_localestorage_to_cart } from '../redux/actions/cartActions';
import { get_meals_by_restaurant_id } from '../redux/actions/restaurants';
import { RootState } from '../redux/reducers/rootReducer';
import { NavBar } from '../components/navbar/navbar';
import { Meal } from '../components/content/meal';
import { meals as Mealtype } from '../interfaces/meals';

export const MealsPage: React.FC = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const { meals, cart } = useSelector((state: RootState) => {
    return {
      meals: state.restaurant.current_meals,
      cart: state.cart.cart,
    };
  });

  const addHeandler = (meal: Mealtype) => {
    dispatch(set_meal_to_cart(meal));
  };

  useEffect(() => {

    const cart_items = JSON.parse(localStorage.getItem('cart') || '[]') as Mealtype[];
    dispatch(set_meal_from_localestorage_to_cart(cart_items));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(get_meals_by_restaurant_id(id));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="App">
        <NavBar cart_length={cart}/>
        <div className="App__meals-container">
          <div className="App__content-main">
            {meals.map(meal => (
              <Meal key={meal._id} meal={meal} onAdd={addHeandler}/>
            ))}
          </div>
        </div>
        <div className="App__footer"></div>
      </div>
    </>
  );
};