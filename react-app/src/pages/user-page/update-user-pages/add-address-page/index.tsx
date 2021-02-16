import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialGeoState } from '../../../../core/redux/geo/actions';
import AddAddressPage from '../../../../modules/user/update-pages/pages/add-address-page/addAddressPage';

const AddAddress = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setInitialGeoState())
  }, [])

  return (
    <>
      <AddAddressPage/>
    </>
  );

};

export default AddAddress;