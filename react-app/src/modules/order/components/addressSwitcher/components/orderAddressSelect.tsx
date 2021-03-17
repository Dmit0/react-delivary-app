import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectField } from '../../../../../core/components/form-fields/select-form-field/selectField';
import { getAddressByIp, getSelectIpAddress } from '../../../../../core/redux/app/selectors';
import { setExactStreet, setGeocoderResponse, setIsAddressConfirm, setOrderAddress } from '../../../../../core/redux/order/actions';
import {
  getCreatedAddress,
  getCurrentDbClick, getCurrentOrderSelectAddress, getIsAddressConfirm,
  getIsChooseExactAddress,
  getOrderAddress,
} from '../../../../../core/redux/order/selectors';
import { getSelectAddresses, getUser } from '../../../../../core/redux/user/selectors';
import { OrderAddressCreate } from './orderAddressCreate';


export const OrderAddressSelect = () => {
  const dispatch = useDispatch();
  const userAllAddresses = useSelector(getSelectAddresses);
  const user = useSelector(getUser);
  const currentOpenedAddress = useSelector(getOrderAddress);
  const IsChooseExactAddress = useSelector(getIsChooseExactAddress);
  const createdAddress = useSelector(getCreatedAddress);
  const dbGeocoderClick = useSelector(getCurrentDbClick);
  const currentIpAddress = useSelector(getAddressByIp);
  const isConfirmedAddress = useSelector(getIsAddressConfirm);
  const ipSelectAddress = useSelector(getSelectIpAddress);
  const selectAddress = useSelector(getCurrentOrderSelectAddress);

  const [needNewAddress, setIsNeedNewAddress] = useState<boolean>(false)

  const handleChangeCountry = useCallback(({ value }) => {
    const currentAddress = user.addresses.find(item => item._id === value);
    dispatch(setOrderAddress(currentAddress || currentIpAddress))
    dispatch(setIsAddressConfirm(false));
  }, [currentIpAddress, dispatch, user.addresses])

  const confirmAddressClick = () => {
    dispatch(setIsAddressConfirm(true))
  }

  const manageAddressSwitcher = (operation: boolean) => {
    setIsNeedNewAddress(operation);
    dispatch(setGeocoderResponse(null));
    dispatch(setExactStreet(null));
    dispatch(setIsAddressConfirm(false));
  }

  return (
    <div className='addressSelect'>
      <div className='addressSelectBody'>
        {
          needNewAddress
            ? <OrderAddressCreate/>
            : <SelectField
              name='address'
              label='Your address'
              options={[...userAllAddresses]}
              currentSelectValue={ selectAddress || ipSelectAddress }
              changeSelectHandler={ (event: any) => handleChangeCountry(event) }
            />
        }
      </div>
      <div className='addressSelectFooter'>
        { needNewAddress
           ? <button className="btn btn-outline-primary" onClick={() => manageAddressSwitcher(false)}>return to select</button>
           : <button className="btn btn-outline-primary" onClick={() => manageAddressSwitcher(true)}>Other address</button>
        }
        { ((createdAddress || currentOpenedAddress || (dbGeocoderClick && needNewAddress)) && !isConfirmedAddress) && <button className="btn btn btn-outline-success" onClick={confirmAddressClick} disabled={!IsChooseExactAddress}>confirm address</button> }
      </div>
    </div>
  );
};
