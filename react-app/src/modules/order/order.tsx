import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { TimePicker } from '../../core/components/time-picker/time-picker';
import { getCurrentOrderPermission, getOrderAddress } from '../../core/redux/order/selectors';
import './order.css'

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
          <div className='orderTimePart'>
            <span className='orderTimeSwitcher'>as soon as possible</span>
            <div className='orderTimeSchedule'>
              <TimePicker placeHolder='select time'/>
            </div>
          </div>
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