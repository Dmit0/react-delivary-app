import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartApi } from '../../core/api/apis/cartApi';
import { TrashIcon, CartIcon } from '../../core/components/icons';
import { Cart_item } from './cart_item';
import '../../core/css/cart.css';
import { Action, Links } from '../../core/enums';
import {
  clean_cart,
  remove_item_from_cart,
  remove_one_meal_from_cart,
  set_meal_from_localestorage_to_cart,
  set_meal_to_cart,
} from '../../core/redux/cart/actions';
import { getCart } from '../../core/redux/cart/selectors';
import { getToken } from '../../core/redux/user/selectors';
import { meals } from '../../core/types';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const token = useSelector(getToken);

  useEffect(() => {
    getMeals(token).then((response) => {
      response && dispatch(set_meal_from_localestorage_to_cart(response));
    });
  }, [ token, dispatch ]);

  const getMeals = async (token: string | null) => {
    return token
      ? await cartApi.getUserCart(token)
      : JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
  };

  useEffect(() => {
    !token && localStorage.setItem('cart', JSON.stringify(cart));
  }, [ cart, token ]);

  const changeItemInCart = async (token: string, data: { action: Action, mealId: string }, meal: meals) => {
    const response = cartApi.changeItemInCart(token, data);
    switch (data.action) {
      case Action.DECREMENT:
        return response && dispatch(remove_one_meal_from_cart(meal));
      case Action.INCREMENT:
        return response && dispatch(set_meal_to_cart(meal, !!token));
    }
  };

  const deleteItemFromCart = async (token: string, meal: meals) => {
    const response = cartApi.deleteItemFromCart(token, meal._id);
    return response && dispatch(remove_item_from_cart(meal));
  };

  const cleanUserCart = async (token: string) => {
    const response = cartApi.cleanCart(token);
    return response && dispatch(clean_cart());
  };

  const deleteOneItem = useCallback((meal: meals) => (
    token
      ? changeItemInCart(token, { action: Action.DECREMENT, mealId: meal._id }, meal)
      : dispatch(remove_one_meal_from_cart(meal))
  ), [ token, dispatch ]);

  const deleteMealFromCart = useCallback((meal: meals) => (
    token
      ? deleteItemFromCart(token, meal)
      : dispatch(remove_item_from_cart(meal))
  ), [ token, dispatch ]);

  const addMeal = useCallback((meal: meals) => (
    token
      ? changeItemInCart(token, { action: Action.INCREMENT, mealId: meal._id }, meal)
      : dispatch(set_meal_to_cart(meal, false))
  ), [ token, dispatch ]);

  const clear_cart_Handler = useCallback(() => (
    token
      ? cleanUserCart(token)
      : dispatch(clean_cart())
  ), [ token, dispatch ]);

  const count_items = useCallback((): Number => {
    return cart.reduce((sum, current) => (
      sum + current.count
    ), 0);
  }, [ cart ]);

  const count_total_price = useCallback((): Number => {
    return cart.reduce((sum, current) => (
      sum + current.price * current.count
    ), 0);
  }, [ cart ]);

  return (
    <>
      <div className="App">
        <div className="App__content">
          <div className="cart">
            <div className='cart-header'>
              <div className='cart-description'>
                <CartIcon/>
                <span className='car-item-description'>Cart</span>
              </div>
              <div className='delete-butoon-controller' onClick={ clear_cart_Handler }>
                <TrashIcon/>
                <span className='delete-block-name'>Clean cart</span>
              </div>
            </div>
            <div className='cart-body'>
              { cart.map(item => (
                <Cart_item
                  key={ item._id + Date.now() }
                  meal={ item }
                  onDeleteOneItem={ deleteOneItem }
                  onDeleteMeal={ deleteMealFromCart }
                  onAddMeal={ addMeal }/>
              )) }
              <div className='info'>
                <span>Total Items : { count_items() }</span>
                <span>Order amount : <span className='total_sum'>{ count_total_price() } bun</span></span>
              </div>
            </div>
            <div className='cart-footer'>
              <Link to={ Links.HOME }>
                <button type="button" className="btn btn-outline-warning return_button">Return</button>
              </Link>
              <button type="button" className="btn btn-outline-warning pay_button">Pay now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;