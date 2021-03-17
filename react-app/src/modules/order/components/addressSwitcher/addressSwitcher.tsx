import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillCheckIcon } from '../../../../core/components/icons';
import { getAddressByIp } from '../../../../core/redux/app/selectors';
import { getCoordinates } from '../../../../core/redux/order/actions';
import {
  getCreatedAddress,
  getCurrentOrderAddressLocation,
  getCurrentOrderPermission,
  getIsAddressConfirm,
  getStringAddress,
  getZoomPosition,
} from '../../../../core/redux/order/selectors';
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
  const currentAddressFromIp = useSelector(getAddressByIp);
  const isConfirmedAddress = useSelector(getIsAddressConfirm);
  const currentAddressObj = useSelector(getCreatedAddress)

  useEffect(() => {
    (currentAddress.trim() && !currentAddressObj?.isFromIp) && dispatch(getCoordinates(currentAddress));
  }, [currentAddress, currentAddressObj, dispatch])

  return (
    <div className='addressSwitcherBody'>
      { isConfirmedAddress &&
      <div className='addressMarker'>
        <FillCheckIcon fill={ '#43be12' } width={ 40 } height={ 40 }/>
      </div>
      }
      <MapBox position={currentPosition || { lng: currentAddressFromIp?.lng || 0, lat: currentAddressFromIp?.lat || 0 }} zoom={currentPosition ? zoom : 12}/>
      {
        permission
          ? <OrderAddressSelect/>
          : <OrderAddressCreate/>
      }
    </div>
  );
};