import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputField } from '../../../../../core/components/form-fields/input-form-field/input';
import { SelectField } from '../../../../../core/components/form-fields/select-form-field/selectField';
import { Locality } from '../../../../../core/enums/locality.enum';
import { set_current_country } from '../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../core/redux/countries/selectors';
import { fetchGeo, setCurrentRegion } from '../../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../../core/redux/geo/selectors';
import { createAddress } from '../../../../../core/redux/order/actions';
import { getCreatedAddress } from '../../../../../core/redux/order/selectors';
import { getRequiredValidation } from '../../../../../core/utils/form-validation.utils';

export const OrderAddressCreate = () => {
  const dispatch = useDispatch()
  const selectCountries = useSelector(getSelectCountries);
  const countries = useSelector(getCountries);
  const selectRegions = useSelector(getSelectRegions);
  const regions = useSelector(getRegions);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry);
  const createdAddress = useSelector(getCreatedAddress);

  const handleChangeCountry = useCallback(({ label }) => {
    dispatch(createAddress({ country: label }))
    const country = countries.find((country) => country.name === label)
    if (country) {
      dispatch(set_current_country(country));
      dispatch(setCurrentRegion(null));
      dispatch(fetchGeo(Locality.REGION, country.code))
    }
  }, [countries, dispatch])

  const handleChangeRegion = useCallback(({ label, value }) => {
    dispatch(createAddress({ region: label }));
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
  }, [dispatch, regions])

  const handleChangeStreet = useCallback((e) => {
    const street = e.target.value
    dispatch(createAddress({ street: street }))
  }, [dispatch])

  const handleChangeStreetNumber = useCallback((e) => {
    const streetNumber = e.target.value
    dispatch(createAddress({ streetNumber: streetNumber }))
  }, [dispatch])

  const { register, handleSubmit, errors } = useForm();
  return (
    <div className='addressBody'>
      <form onSubmit={()=>{}}>
        <SelectField
          name='country'
          label='Your country'
          options={selectCountries}
          currentSelectValue={ { value: currentCountry?.name, label: currentCountry?.name } }
          changeSelectHandler={(event: any) => handleChangeCountry(event)}

        />
        <SelectField
          name='country'
          label='Your region'
          options={ selectRegions }
          currentSelectValue={ { value: currentRegion?.name, label: currentRegion?.name } }
          changeSelectHandler={(event: any) => handleChangeRegion(event)}
          isDisabled={!currentCountry}
        />
        <InputField
          label='Street'
          name='street'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.street}
          onBlur={(event: any) => handleChangeStreet(event)}
          isDisabled={!currentRegion}
        />
        <InputField
          label='Street number'
          name='street'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.street}
          onBlur={(event: any) => handleChangeStreetNumber(event)}
          isDisabled={!createdAddress?.street}
        />
      </form>
    </div>
  );
};