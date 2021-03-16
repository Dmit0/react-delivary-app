import React, { useCallback, useEffect } from 'react';
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
import { getCurrentDbClick } from '../../../../../core/redux/order/selectors';
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
    }
  }, [countries, dispatch, setValue])

  const handleChangeRegion = useCallback(({ label, value }) => {
    dispatch(createAddress({ region: label }));
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
    setValue('street', '')
    setValue('streetNumber', '')
  }, [dispatch, regions, setValue])

  const handleBlurStreet = useCallback((e) => {
    const street = e.target.value
    if (street !== dbClickGeocoderResult?.street) dispatch(createAddress({ street }))
  }, [dbClickGeocoderResult, dispatch])

  const handleBlurStreetNumber = useCallback((e) => {
    const streetNumber = e.target.value
    if (streetNumber !== dbClickGeocoderResult?.streetNumber) dispatch(createAddress({ streetNumber }))
  }, [dbClickGeocoderResult, dispatch])

  useEffect(() => {
    if (dbClickGeocoderResult) {
      setValue('street', dbClickGeocoderResult.street || '')
      setValue('streetNumber', dbClickGeocoderResult.streetNumber || '')
    }
  }, [dbClickGeocoderResult, setValue])

  useEffect(() => {
    DbClickCountry && dispatch(fetchGeo(Locality.REGION, DbClickCountry))
  }, [DbClickCountry, dispatch])

  const getIsFieldDisabled = useCallback((dependField: string) => {
    const isCountryDepend = dependField === 'country';
    if (dbClickGeocoderResult) {
      return isCountryDepend
        ? !dbClickGeocoderResult?.country
        : !dbClickGeocoderResult?.region;
    } else {
      return isCountryDepend
        ? !currentCountry?.name
        : !currentRegion?.name;
    }
  }, [currentCountry, currentRegion, dbClickGeocoderResult]);

  return (
    <div className='addressBody'>
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
          isDisabled={getIsFieldDisabled('country')}
        />
        <InputField
          label='Street'
          name='street'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.street}
          onBlur={(event: any) => handleBlurStreet(event)}
          isDisabled={getIsFieldDisabled('region')}
        />
        <InputField
          label='Street number'
          name='streetNumber'
          rules={getRequiredValidation()}
          register={register}
          errors={errors.streetNumber}
          onBlur={(event: any) => handleBlurStreetNumber(event)}
          isDisabled={!watch('street')}
        />
      </form>
    </div>
  );
};