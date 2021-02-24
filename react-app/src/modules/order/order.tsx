import React from 'react';
import './order.css'
import { AddressSwitcher } from './components/addressSwitcher/addressSwitcher';
import { TimeSwitcher } from './components/timeSwitcher/timeSwitcher';

export const OrderPage = () => {

  return (
    <div className='orderPage'>
      <div className='orderTitle'>
        <span className='orderTitleText'>Order</span>
      </div>
      <div className='orderBody'>
        <div className='orderInfo'>
          <TimeSwitcher/>
          <AddressSwitcher/>
          <div className='orderUserInfo'/>
        </div>
        <div className='orderListItems'/>
      </div>
      <div className='orderPageFooter'/>
    </div>
  );
};