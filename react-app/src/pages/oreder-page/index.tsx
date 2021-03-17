import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Locality } from '../../core/enums/locality.enum';
import { getAddressByIp } from '../../core/redux/app/selectors';
import { set_current_country } from '../../core/redux/countries/actions';
import { getCurrentUserCountry } from '../../core/redux/countries/selectors';
import { fetchGeo, setCurrentRegion } from '../../core/redux/geo/actions';
import { getCurrentUserRegion } from '../../core/redux/geo/selectors';
import { createAddress, setOrderCart } from '../../core/redux/order/actions';
import { getIsLogIn } from '../../core/redux/user/selectors';
import { OrderPage } from '../../modules/order/order';

const Order = () => {
  const currentUserCountry = useSelector(getCurrentUserCountry);
  const currentUserRegion = useSelector(getCurrentUserRegion);
  const currentUserAddress = useSelector(getAddressByIp)
  const isLogIn = useSelector(getIsLogIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setOrderCart(isLogIn))

  }, [dispatch, isLogIn])

  useEffect(() => {
    currentUserCountry && dispatch(set_current_country(currentUserCountry));
    currentUserCountry && dispatch(fetchGeo(Locality.REGION, currentUserCountry.code));
  }, [currentUserCountry, dispatch])

  useEffect(() => {
    currentUserRegion && dispatch(setCurrentRegion(currentUserRegion));
  }, [currentUserRegion, dispatch])

  useEffect(() => {
    dispatch(createAddress({
      country: currentUserAddress?.country,
      region: currentUserAddress?.region,
      street: currentUserAddress?.street,
      streetNumber: currentUserAddress?.streetNumber,
    },true))
  }, [currentUserAddress, dispatch])

  return (
    <>
      <OrderPage/>
    </>
  );

};

export default Order;