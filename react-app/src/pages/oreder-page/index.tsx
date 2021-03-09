import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../core/api/apis/cart.api';
import { OrderAPI } from '../../core/api/apis/order.api';
import { set_meal_from_localestorage_to_cart } from '../../core/redux/cart/actions';
import { setOrderCart, setOrderPermission } from '../../core/redux/order/actions';
import { Meal, restaurant } from '../../core/types/index';
import { getIsLogIn } from '../../core/redux/user/selectors';
import { OrderPage } from '../../modules/order/order';


const Order = () => {

  const isLogIn = useSelector(getIsLogIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setOrderCart(isLogIn))
  }, [dispatch, isLogIn])

  return (
    <>
      <OrderPage/>
    </>
  );

};

export default Order;