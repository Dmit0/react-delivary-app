import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputField } from '../../../../../core/components/form-fields/input-form-field/input';
import { SelectField } from '../../../../../core/components/form-fields/select-form-field/selectField';
import { getSelectCountries } from '../../../../../core/redux/countries/selectors';
import { getRequiredValidation } from '../../../../../core/utils/form-validation.utils';

export const OrderAddressCreate = () => {
  const selectCountries = useSelector(getSelectCountries);

  const handleChangeCountry = useCallback((e) => {

  }, [])

  const { register, handleSubmit, errors } = useForm();
  return (
    <div className='addressBody'>
      <form onSubmit={()=>{}}>
        <SelectField
          name='country'
          label='Your country'
          options={selectCountries}
          changeSelectHandler={(event: any) => handleChangeCountry(event)}
        />
        <SelectField
          name='country'
          label='Your country'
          options={selectCountries}
          changeSelectHandler={(event: any) => handleChangeCountry(event)}
        />
        <InputField
          label='Street'
          name='street'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.street}
        />
        <InputField
          label='Street'
          name='street'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.street}
        />
      </form>
    </div>
  );
};