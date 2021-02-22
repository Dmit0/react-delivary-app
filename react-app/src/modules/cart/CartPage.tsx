import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { cartApi } from '../../core/api/apis/cart.api';
import { OrderAPI } from '../../core/api/apis/order.api';
import { restaurantAPI } from '../../core/api/apis/reastaurant.api';
import { Popup } from '../../core/components/basic-popup/popup';
import { CartIcon, TrashIcon } from '../../core/components/icons';
import '../../core/css/cart.css';
import { Action, Code, Links } from '../../core/enums';
import { PopupMessages } from '../../core/enums/popup-messages.enum';
import {
  clean_cart,
  remove_item_from_cart,
  remove_one_meal_from_cart,
  set_meal_from_localestorage_to_cart,
  set_meal_to_cart,
} from '../../core/redux/cart/actions';
import { getCart } from '../../core/redux/cart/selectors';
import { setOrderPermission, startToChangePermission } from '../../core/redux/order/actions';
import { openPopup } from '../../core/redux/popup/actions';
import { remove_all_cart_restaurants, remove_cart_restaurant, set_cart_restaurants } from '../../core/redux/restaurant/actions';
import { getCartRestaurants } from '../../core/redux/restaurant/selectors';
import { getToken } from '../../core/redux/user/selectors';
import { meals, restaurant } from '../../core/types';
import { rerender } from '../../core/utils/rerender/cart.rerender';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartRestaurants = useSelector(getCartRestaurants);
  const cart = useSelector(getCart);
  const token = useSelector(getToken);
  const [restaurantBlockSum, setRestaurantBlockSum] = useState<any>([])
  const [isNeedOrderRedirect, setIsNeedOrderRedirect] = useState<boolean>(false)

  const getMeals = useCallback(async (token: string | null): Promise<any> => {
    if (token) {
      return await cartApi.getUserCart(token);
    } else {
      const meals = JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
      const restaurants = await getRestaurants(meals.map(meal => meal.restaurant));
      dispatch(set_cart_restaurants(restaurants));
      return meals;
    }
  }, [dispatch]);

  useEffect(() => {
    getMeals(token).then((response) => {
      if (token && response) {
        dispatch(set_meal_from_localestorage_to_cart(response.meals));
        dispatch(set_cart_restaurants(response.restaurants))
      } else if (!token && response) {
        response && dispatch(set_meal_from_localestorage_to_cart(response));
      }
    });
  }, [token, dispatch, getMeals]);

  const getRestaurants = async(ids: string[]): Promise<restaurant[]> => {
    return await restaurantAPI.getRestaurants(ids)
  }

  useEffect(() => {
    !token && localStorage.setItem('cart', JSON.stringify(cart));
  }, [ cart, token ]);

  const changeItemInCart = useCallback(async (token: string, data: { action: Action, mealId: string }, meal: meals) => {
    const response = cartApi.changeItemInCart(token, data);
    switch (data.action) {
      case Action.DECREMENT:
        return response && dispatch(remove_one_meal_from_cart(meal));
      case Action.INCREMENT:
        return response && dispatch(set_meal_to_cart(meal, !!token));
    }
  }, [dispatch]);

  const deleteItemFromCart = useCallback(async (token: string, meal: meals) => {
    const response = cartApi.deleteItemFromCart(token, meal._id);
    return response && dispatch(remove_item_from_cart(meal));
  }, [dispatch]);

  const cleanUserCart = useCallback(async (token: string) => {
    const response = cartApi.cleanCart(token);
    return response && dispatch(clean_cart());
  }, [dispatch]);

  const deleteRestaurantIfNeed = useCallback((meal: meals, cart: meals[], deleteFullItem = false) => {
    if ((meal.count === 1 || deleteFullItem) && cart?.filter(item => item.restaurant === meal.restaurant).length === 1) {
      dispatch(remove_cart_restaurant(meal.restaurant));
    }
  },[dispatch])

  const deleteOneItem = useCallback((meal: meals) => {
    deleteRestaurantIfNeed(meal, cart)
    token
      ? changeItemInCart(token, { action: Action.DECREMENT, mealId: meal._id }, meal)
      : dispatch(remove_one_meal_from_cart(meal));
  }, [deleteRestaurantIfNeed, cart, token, changeItemInCart, dispatch]);

  const deleteMealFromCart = useCallback((meal: meals) => {
    deleteRestaurantIfNeed(meal, cart, true)
    token
      ? deleteItemFromCart(token, meal)
      : dispatch(remove_item_from_cart(meal))
  }, [deleteRestaurantIfNeed, cart, token, deleteItemFromCart, dispatch]);

  const addMeal = useCallback((meal: meals) => (
    token
      ? changeItemInCart(token, { action: Action.INCREMENT, mealId: meal._id }, meal)
      : dispatch(set_meal_to_cart(meal, false))
  ), [token, changeItemInCart, dispatch]);

  const clear_cart_Handler = useCallback(() => {
    dispatch(remove_all_cart_restaurants())
    token
      ? cleanUserCart(token)
      : dispatch(clean_cart())
  }, [dispatch, token, cleanUserCart]);

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
    const makeOrderResponse = (!isNotMinAmount && token) && await OrderAPI.order(token, cart)
    if (makeOrderResponse === Code.Forbidden) {
      dispatch(openPopup(
        <Popup
          title={PopupMessages.OrderPermissionTitle}
          subTitle={PopupMessages.OrderPermissionSubTitle}
          buttons={[{
              name: 'Yes',
              link: `${Links.USER}${Links.ADDRESS_ADD}`,
              action: () => {dispatch(startToChangePermission(true))}
            },
            {
              name: 'No',
              link: Links.ORDER
            }
            ]}
        />));
    }
    dispatch(setOrderPermission(!!makeOrderResponse.permission))
    setIsNeedOrderRedirect(!!makeOrderResponse || !token)
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
            addMeal,
          ) }
          <div className='info'>
            <span>Total Items : { count_items() }</span>
            <span>Total amount : <span className='total_sum'>{ count_total_price() } bun</span></span>
          </div>
        </div>
        <div className='cart-footer'>
          <Link to={ Links.HOME }>
            <button type="button" className="btn btn-outline-warning return_button">Return</button>
          </Link>
          { isNeedOrderRedirect && <Redirect to={ Links.ORDER }/> }
          <button onClick={ orderItems } type="button" className="btn btn-outline-warning pay_button">Order now</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;