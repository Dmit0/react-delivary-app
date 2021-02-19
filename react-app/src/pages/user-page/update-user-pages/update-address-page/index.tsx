import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCurrentAddress } from '../../../../core/redux/addresses/actions';
import { getCurrentPageAddresses } from '../../../../core/redux/user-page/address-module/selectors';
import UpdateAddressPage from '../../../../modules/user/update-pages/pages/update-address-page/updateAddressPage';

const UpdateAddress = () => {
  const userAddresses = useSelector(getCurrentPageAddresses);
  const { id } = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && userAddresses) {
      const currentAddress = userAddresses.find(address => address._id === id);
      currentAddress && dispatch(setCurrentAddress(currentAddress));
    }
  }, [id, dispatch, userAddresses]);

  return (
    <>
      <UpdateAddressPage/>
    </>
  );

};

export default UpdateAddress;