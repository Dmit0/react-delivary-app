import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartApi } from '../../core/api/apis/cart.api';
import { OrderAPI } from '../../core/api/apis/order.api';
import { restaurantAPI } from '../../core/api/apis/reastaurant.api';
import { TrashIcon, CartIcon } from '../../core/components/icons';
import { Core } from '../../core/enums/core.enum';
import { remove_all_cart_restaurants, remove_cart_restaurant, set_cart_restaurants } from '../../core/redux/restaurant/actions';
import { getCartRestaurants } from '../../core/redux/restaurant/selectors';
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
import { getIsLogIn } from '../../core/redux/user/selectors';
import { meals, restaurant } from '../../core/types';
import { setLocaleStorageItem } from '../../core/utils/locale-storage.utils';
import { rerender } from '../../core/utils/rerender/cart.rerender';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartRestaurants = useSelector(getCartRestaurants);
  const cart = useSelector(getCart);
  const isLogIn = useSelector(getIsLogIn);
  const [restaurantBlockSum, setRestaurantBlockSum] = useState<any>([])
  useEffect(() => {
    getMeals(isLogIn).then((response) => {
      if (isLogIn && response) {
        dispatch(set_meal_from_localestorage_to_cart(response.meals));
        dispatch(set_cart_restaurants(response.restaurants))
      } else if (!isLogIn && response) {
        response && dispatch(set_meal_from_localestorage_to_cart(response));
      }
    });
  }, [ isLogIn, dispatch ]);

  const getRestaurants = async(ids: string[]): Promise<restaurant[]> => {
    return await restaurantAPI.getRestaurants(ids)
  }

  const getMeals = async (isLogIn: boolean): Promise<any> => {
    if (isLogIn) {
      return await cartApi.getUserCart();
    } else {
      const meals = JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
      const restaurants = await getRestaurants(meals.map(meal => meal.restaurant));
      dispatch(set_cart_restaurants(restaurants));
      return meals;
    }
  };

  useEffect(() => {
    !isLogIn && setLocaleStorageItem(Core.Cart, cart);
  }, [ cart, isLogIn ]);

  const changeItemInCart = async (data: { action: Action, mealId: string }, meal: meals) => {
    const response = cartApi.changeItemInCart(data);
    switch (data.action) {
      case Action.DECREMENT:
        return response && dispatch(remove_one_meal_from_cart(meal));
      case Action.INCREMENT:
        return response && dispatch(set_meal_to_cart(meal));
    }
  };

  const deleteItemFromCart = async (meal: meals) => {
    const response = cartApi.deleteItemFromCart(meal._id);
    return response && dispatch(remove_item_from_cart(meal));
  };

  const cleanUserCart = async () => {
    const response = cartApi.cleanCart();
    return response && dispatch(clean_cart());
  };

  const deleteRestaurantIfNeed = (meal: meals, cart: meals[], deleteFullItem = false) => {
    if ((meal.count === 1 || deleteFullItem) && cart?.filter(item => item.restaurant === meal.restaurant).length === 1) {
      dispatch(remove_cart_restaurant(meal.restaurant));
    }
  }

  const deleteOneItem = useCallback((meal: meals) => {
    deleteRestaurantIfNeed(meal, cart)
    isLogIn
      ? changeItemInCart({ action: Action.DECREMENT, mealId: meal._id }, meal)
      : dispatch(remove_one_meal_from_cart(meal));
  }, [ isLogIn, dispatch, cart ]);

  const deleteMealFromCart = useCallback((meal: meals) => {
    deleteRestaurantIfNeed(meal, cart, true)
    isLogIn
      ? deleteItemFromCart(meal)
      : dispatch(remove_item_from_cart(meal))
  }, [ isLogIn, dispatch, cart ]);

  const addMeal = useCallback((meal: meals) => (
    isLogIn
      ? changeItemInCart({ action: Action.INCREMENT, mealId: meal._id }, meal)
      : dispatch(set_meal_to_cart(meal))
  ), [ isLogIn, dispatch ]);

  const clear_cart_Handler = useCallback(() => {
    dispatch(remove_all_cart_restaurants())
    isLogIn
      ? cleanUserCart()
      : dispatch(clean_cart())
  }, [ isLogIn, dispatch ]);

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

  const orderItems = async() => {
    const isNotMinAmount = restaurantBlockSum.some((restaurantToCheck: any) => {
      const restaurant = cartRestaurants.find(restaurant => restaurantToCheck.restaurant === restaurant._id);
      return restaurant && restaurantToCheck.sum < restaurant.minSumOfDelivery
    })
    if(!isNotMinAmount && isLogIn) await OrderAPI.order({})
  }
  const setBlockSum = useCallback((restaurant: string, sum: number) => {
    setRestaurantBlockSum(((prev: any) => {
      const res = prev && prev.find((item: any) => item.restaurant === restaurant);
      if (res) {
        return [ ...prev.map((item: any) => {
          if (item.restaurant === restaurant) {
            return { restaurant: item.restaurant, sum };
          }
          return item;
        }) ];
      }
      return [ ...prev, { restaurant, sum } ]
    }))
  }, [ setRestaurantBlockSum ])
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
                setBlockSum,
                deleteOneItem,
                deleteMealFromCart,
                addMeal
              )}
              <div className='info'>
                <span>Total Items : { count_items() }</span>
                <span>Total amount : <span className='total_sum'>{ count_total_price() } bun</span></span>
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