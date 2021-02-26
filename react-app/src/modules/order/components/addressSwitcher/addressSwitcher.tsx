import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrderPermission, getOrderAddress } from '../../../../core/redux/order/selectors';
import { OrderAddressCreate } from './components/orderAddressCreate';
import { OrderAddressSelect } from './components/orderAddressSelect';
import './addressSwitcher.css'

export const AddressSwitcher = () => {
  const dispatch = useDispatch();
  const permission = useSelector(getCurrentOrderPermission);
  const addressForOrder = useSelector(getOrderAddress);

  return (
    <div className='addressSwitcherBody'>
      <div className='mapPart'>
        <img src="/assets/map.png" width='100%' height='100%' alt="MapIcon" loading="lazy"/>
      </div>
      {
        permission
          ? <OrderAddressSelect/>
          : <OrderAddressCreate/>
      }
    </div>
  );
};