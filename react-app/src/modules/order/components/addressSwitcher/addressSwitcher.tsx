import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoordinates } from '../../../../core/redux/order/actions';
import { getCurrentOrderAddressLocation, getCurrentOrderPermission, getStringAddress, getZoomPosition } from '../../../../core/redux/order/selectors';
import MapBox from '../../../map';
import { OrderAddressCreate } from './components/orderAddressCreate';
import { OrderAddressSelect } from './components/orderAddressSelect';
import './addressSwitcher.css'

export const AddressSwitcher = () => {
  const dispatch = useDispatch();
  const permission = useSelector(getCurrentOrderPermission);
  const currentAddress = useSelector(getStringAddress);
  const currentPosition = useSelector(getCurrentOrderAddressLocation);
  const zoom = useSelector(getZoomPosition);

  useEffect(() => {
    currentAddress.trim() && dispatch(getCoordinates(currentAddress));
  }, [currentAddress, dispatch])

  return (
    <div className='addressSwitcherBody'>
      <MapBox position={currentPosition || { lat: 27.701393, lng: 52.858248 }} zoom={currentPosition ? zoom : 3}/>
      {
        permission
          ? <OrderAddressSelect/>
          : <OrderAddressCreate/>
      }
    </div>
  );
};