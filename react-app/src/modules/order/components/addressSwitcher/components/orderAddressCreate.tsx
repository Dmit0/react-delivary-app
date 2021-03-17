import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputField } from '../../../../../core/components/form-fields/input-form-field/input';
import { SelectField } from '../../../../../core/components/form-fields/select-form-field/selectField';
import { Locality } from '../../../../../core/enums/locality.enum';
import { getAddressByIp } from '../../../../../core/redux/app/selectors';
import { set_current_country } from '../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../core/redux/countries/selectors';
import { fetchGeo, setCurrentRegion } from '../../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../../core/redux/geo/selectors';
import { createAddress, setIsAddressConfirm } from '../../../../../core/redux/order/actions';
import { getCurrentDbClick, getIsAddressConfirm, getIsChooseExactAddress } from '../../../../../core/redux/order/selectors';
import { getIsLogIn } from '../../../../../core/redux/user/selectors';
import { getRequiredValidation } from '../../../../../core/utils/form-validation.utils';

export const OrderAddressCreate = () => {
  const dispatch = useDispatch()
  const selectCountries = useSelector(getSelectCountries);
  const countries = useSelector(getCountries);
  const selectRegions = useSelector(getSelectRegions);
  const regions = useSelector(getRegions);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry);
  const dbClickGeocoderResult = useSelector(getCurrentDbClick);
  const currentIpAddress = useSelector(getAddressByIp);
  const isLogIn = useSelector(getIsLogIn);
  const isConfirmedAddress = useSelector(getIsAddressConfirm);
  const IsChooseExactAddress = useSelector(getIsChooseExactAddress);

  const DbClickCountry = dbClickGeocoderResult?.countryCode;

  const { register, errors, setValue, watch } = useForm();

  const handleChangeCountry = useCallback(({ label }) => {
    dispatch(createAddress({ country: label }))
    const country = countries.find((country) => country.name === label)
    if (country) {
      dispatch(set_current_country(country));
      dispatch(setCurrentRegion(null));
      dispatch(fetchGeo(Locality.REGION, country.code))
      setValue('street', '')
      setValue('streetNumber', '')
      dispatch(setIsAddressConfirm(false));
    }
  }, [countries, dispatch, setValue])

  const handleChangeRegion = useCallback(({ label, value }) => {
    dispatch(createAddress({ region: label }));
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
    setValue('street', '')
    setValue('streetNumber', '')
    dispatch(setIsAddressConfirm(false));
  }, [dispatch, regions, setValue])

  const handleBlurStreet = useCallback((e) => {
    const street = e.target.value
    if (street !== dbClickGeocoderResult?.street) {
      dispatch(setIsAddressConfirm(false));
      dispatch(createAddress({ street }));
    }
  }, [dbClickGeocoderResult, dispatch])

  const handleBlurStreetNumber = useCallback((e) => {
    const streetNumber = e.target.value
    if (streetNumber !== dbClickGeocoderResult?.streetNumber) {
      dispatch(setIsAddressConfirm(false));
      dispatch(createAddress({ streetNumber }));
    }
  }, [dbClickGeocoderResult, dispatch])

  useEffect(() => {
    if (dbClickGeocoderResult) {
      setValue('street', dbClickGeocoderResult.street || '')
      setValue('streetNumber', dbClickGeocoderResult.streetNumber || '')
    }
    if (!dbClickGeocoderResult && !watch('street') && !watch('streetNumber') && currentIpAddress) {
      setValue('street', currentIpAddress.street);
      setValue('streetNumber', currentIpAddress.streetNumber);
    }
  }, [currentIpAddress, dbClickGeocoderResult, setValue, watch])

  useEffect(() => {
    DbClickCountry && dispatch(fetchGeo(Locality.REGION, DbClickCountry))
  }, [DbClickCountry, dispatch])

  const confirmAddressClick = () => {
    dispatch(setIsAddressConfirm(true))
  }

  return (
    <div className={ `addressBody ${!isLogIn && (dbClickGeocoderResult || currentCountry) && 'addressBodyExtended'}` }>
      <form onSubmit={()=>{}}>
        <SelectField
          name='country'
          label='Your country'
          options={selectCountries}
          currentSelectValue={ dbClickGeocoderResult
            ? { value: dbClickGeocoderResult?.country || '', label: dbClickGeocoderResult?.country }
            : { value: currentCountry?.name, label: currentCountry?.name }
          }
          changeSelectHandler={(event: any) => handleChangeCountry(event)}
        />
        <SelectField
          name='region'
          label='Your region'
          options={ selectRegions }
          currentSelectValue={ dbClickGeocoderResult
            ? { value: dbClickGeocoderResult?.region || '', label: dbClickGeocoderResult?.region }
            : { value: currentRegion?.name, label: currentRegion?.name }
          }
          changeSelectHandler={(event: any) => handleChangeRegion(event)}
        />
        <InputField
          label='Street'
          name='street'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.street}
          onBlur={(event: any) => handleBlurStreet(event)}
        />
        <InputField
          label='Street number'
          name='streetNumber'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.streetNumber}
          onBlur={(event: any) => handleBlurStreetNumber(event)}
        />
        <div className='confirmCreateAddressBlock'>
          {
            (!isLogIn && !isConfirmedAddress && (dbClickGeocoderResult || currentCountry)) && <button className="btn btn btn-outline-success btnConfirmCreatAddress" onClick={confirmAddressClick} disabled={!IsChooseExactAddress && !currentIpAddress?.exact}>confirm address</button>
          }
        </div>
      </form>
    </div>
  );
};