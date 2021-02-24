import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SelectField } from '../../../../../core/components/form-fields/select-form-field/selectField';
import { getSelectCountries } from '../../../../../core/redux/countries/selectors';


export const OrderAddressSelect = () => {
  const selectCountries = useSelector(getSelectCountries);
  const handleChangeCountry = useCallback((e) => {

  }, [])

  return (
     <div className='addressSelectBody'>
       <SelectField
         name='country'
         label='Your country'
         options={selectCountries}
         changeSelectHandler={(event: any) => handleChangeCountry(event)}
       />
    </div>
  );
};