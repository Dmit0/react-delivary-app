import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderCart } from '../../core/redux/order/actions';
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