import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TrashIcon, CartIcon } from '../../core/components/icons';
import { Core } from '../../core/enums/core.enum';
import { remove_all_cart_restaurants, remove_cart_restaurant } from '../../core/redux/restaurant/actions';
import { getCartRestaurants } from '../../core/redux/restaurant/selectors';
import '../../core/css/cart.css';
import { Action, Links } from '../../core/enums';
import {
  cartAction,
  clean_cart, cleanUserCart, deleteItemFromCartAction, getMealsForCart, order,
  remove_item_from_cart,
  remove_one_meal_from_cart,
  set_meal_to_cart, setCartValues,
} from '../../core/redux/cart/actions';
import { getCart, getCartLength, getCartPrice, getIsRestaurantPricesCorrect } from '../../core/redux/cart/selectors';
import { getIsLogIn } from '../../core/redux/user/selectors';
import { Meal } from '../../core/types';
import { setLocaleStorageItem } from '../../core/utils/locale-storage.utils';
import { rerender } from '../../core/utils/rerender/cart.rerender';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartRestaurants = useSelector(getCartRestaurants);
  const cart = useSelector(getCart);
  const isLogIn = useSelector(getIsLogIn);
  const cartPrice = useSelector(getCartPrice);
  const cartLength = useSelector(getCartLength);
  const getIsRestaurantBlockPricesCorrect = useSelector(getIsRestaurantPricesCorrect);

  useEffect(() => {
    dispatch(getMealsForCart(isLogIn))
  }, [isLogIn, dispatch]);

  useEffect(() => {
    !isLogIn && setLocaleStorageItem(Core.Cart, cart);
  }, [ cart, isLogIn ]);

  useEffect(() => {
    dispatch(setCartValues(cart));
  }, [cart, dispatch])

  const deleteRestaurantIfNeed = useCallback((meal: Meal, cart: Meal[], deleteFullItem = false) => {
    if ((meal.count === 1 || deleteFullItem) && cart?.filter(item => item.restaurant === meal.restaurant).length === 1) {
      dispatch(remove_cart_restaurant(meal.restaurant));
    }
  }, [dispatch]);

  const deleteOneItem = useCallback((meal: Meal) => {
    deleteRestaurantIfNeed(meal, cart)
    isLogIn
      ? dispatch(cartAction({ action: Action.DECREMENT, mealId: meal._id }, meal))
      : dispatch(remove_one_meal_from_cart(meal));
  }, [deleteRestaurantIfNeed, cart, isLogIn, dispatch]);

  const deleteMealFromCart = useCallback((meal: Meal) => {
    deleteRestaurantIfNeed(meal, cart, true)
    isLogIn
      ? dispatch(deleteItemFromCartAction(meal))
      : dispatch(remove_item_from_cart(meal))
  }, [deleteRestaurantIfNeed, cart, isLogIn, dispatch]);

  const addMeal = useCallback((meal: Meal) => (
    isLogIn
      ? dispatch(cartAction({ action: Action.INCREMENT, mealId: meal._id }, meal))
      : dispatch(set_meal_to_cart(meal))
  ), [ isLogIn, dispatch ]);

  const clear_cart_Handler = useCallback(() => {
    dispatch(remove_all_cart_restaurants())
    isLogIn
      ? dispatch(cleanUserCart())
      : dispatch(clean_cart())
  }, [ isLogIn, dispatch ]);

  const orderItems = () => {
     if(getIsRestaurantBlockPricesCorrect && isLogIn) dispatch(order())
  }

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
              { rerender.mealsBlock(
                cartRestaurants,
                cart,
                deleteOneItem,
                deleteMealFromCart,
                addMeal
              )}
              <div className='info'>
                <span>Total Items : {cartLength}</span>
                <span>Total amount : <span className='total_sum'>{cartPrice} bun</span></span>
              </div>
            </div>
            <div className='cart-footer'>
              <Link to={ Links.HOME }>
                <button type="button" className="btn btn-outline-warning return_button">Return</button>
              </Link>
              <button onClick={orderItems} type="button" className="btn btn-outline-warning pay_button">Pay now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;