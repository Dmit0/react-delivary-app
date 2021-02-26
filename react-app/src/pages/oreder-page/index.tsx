import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../core/api/apis/cart.api';
import { OrderAPI } from '../../core/api/apis/order.api';
import { set_meal_from_localestorage_to_cart } from '../../core/redux/cart/actions';
import { setOrderPermission } from '../../core/redux/order/actions';
import { meals, restaurant } from '../../core/types/index';
import { getToken } from '../../core/redux/user/selectors';
import { OrderPage } from '../../modules/order/order';


const Order = () => {

  const token = useSelector(getToken)
  const dispatch = useDispatch()

  useEffect(() => {
    getOrderCart(token).then(res => (res && dispatch(set_meal_from_localestorage_to_cart(res))))
  }, [])

  const getUserCartAndPermission = async(token: string): Promise<meals[]> => {
    const orderPermission = await OrderAPI.checkOrderPermission(token);
    dispatch(setOrderPermission(orderPermission.permission))
    const useCart = await cartApi.getUserCart(token)
    return useCart.meals
  }

  const getOrderCart = async(token: string | null): Promise<meals[]> => {
    return token
      ? getUserCartAndPermission(token)
      : JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
  }

  return (
    <>
      <OrderPage/>
    </>
  );

};

export default Order;