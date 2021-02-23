import React from 'react';
import {useSelector } from 'react-redux';
import { getCurrentOrderPermission, getOrderAddress } from '../../core/redux/order/selectors';
import './order.css'
import { TimeSwitcher } from './components/timeSwitcher/timeSwitcher';

export const OrderPage = () => {
  const permission = useSelector(getCurrentOrderPermission)
  const addressForOrder = useSelector(getOrderAddress)

  return (
    <div className='orderPage'>
      <div className='orderTitle'>
        <span className='orderTitleText'>Order</span>
      </div>
      <div className='orderBody'>
        <div className='orderInfo'>
          <TimeSwitcher/>
          { permission
            ? <div className='orderPageSetAddress'/>
            : <div className='orderPageChooseAddress'/>
          }
          {/*TODO 'implement map api'*/}
          {/*{addressForOrder && <div className='acceptYourCurrentAddressOnMap'/>}*/}
          <div className='orderUserInfo'/>
        </div>
        <div className='orderListItems'/>
      </div>
      <div className='orderPageFooter'/>
    </div>
  );
};