import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InputField } from '../../../../../../core/components/form-fields/input-form-field/input';
import { SelectField } from '../../../../../../core/components/form-fields/select-form-field/selectField';
import { Links } from '../../../../../../core/enums';
import { Locality } from '../../../../../../core/enums/locality.enum';
import { getCurrentAddress } from '../../../../../../core/redux/addresses/selectors';
import { set_current_country } from '../../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../../core/redux/countries/selectors';
import { fetchGeo, setCurrentRegion } from '../../../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../../../core/redux/geo/selectors';
import './updateAddress.form.css'
import { updateAddress } from '../../../../../../core/redux/user-page/address-module/actions/address-module.actions';
import { getIsNeedToRedirect } from '../../../../../../core/redux/user-page/page-module/selectors';
import { getIsLogIn } from '../../../../../../core/redux/user/selectors';
import { getRequiredValidation } from '../../../../../../core/utils/form-validation.utils';

interface formData {
  street: string,
  streetNumber: string
}

export const UpdateAddressFrom = () => {
  const dispatch = useDispatch()
  const isLogIn = useSelector(getIsLogIn);
  const selectCountries = useSelector(getSelectCountries);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry)
  const regions = useSelector(getRegions);
  const selectRegions = useSelector(getSelectRegions);
  const countries = useSelector(getCountries);
  const currentAddress = useSelector(getCurrentAddress);
  const isNeedToRedirect = useSelector(getIsNeedToRedirect);

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const f = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

  const handleChangeCountry = useCallback(({ value }: any) => {
    const country = countries.find((country) => country.name === value);
    country && dispatch(set_current_country(country));
    country && dispatch(fetchGeo(Locality.REGION, country.code))
    dispatch(setCurrentRegion(null))
  }, [countries, dispatch]);

  const handleChangeRegion = useCallback(({ value }: any) => {
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
  }, [dispatch, regions]);

  const onSubmit = (data: formData) => {
    if (currentRegion &&  currentCountry && currentAddress) {
      const address = {
        addressId: currentAddress?._id,
        country: currentCountry.name,
        countryCode: currentCountry.code,
        region: currentRegion.name,
        regionId: currentRegion.isoCode,
        street: data.street,
        streetNumber: data.streetNumber
      }
      setCurrentRegion(null)
      isLogIn && dispatch(updateAddress(address))
    }
  };

  useEffect(() => {
    const isChanged =
      f.watch('street') !== currentAddress?.street ||
      f.watch('streetNumber') !== currentAddress?.streetNumber ||
      currentCountry?.code !== currentAddress?.countryCode ||
      currentRegion?.isoCode !== currentAddress?.regionId
    setIsChanged(isChanged)
  }, [f.watch, currentCountry, currentRegion, f, currentAddress])

  return (
    <form onSubmit={ f.handleSubmit(onSubmit) }>
      <div className="update_form">
        <div className="update_user_form_fields">
          <SelectField
            name='country'
            label='Your country'
            currentSelectValue={{value: currentCountry?.code, label: currentCountry?.name}}
            options={selectCountries}
            changeSelectHandler={(event: any) => handleChangeCountry(event)}
          />

          <SelectField
            name='region'
            label='Your region'
            currentSelectValue={{value: currentRegion?.name, label: currentRegion?.name}}
            isDisabled={!regions?.length}
            options={selectRegions}
            changeSelectHandler={(event: any) => handleChangeRegion(event)}
          />

          <InputField
            label='Street'
            name='street'
            rules={getRequiredValidation()}
            register={f.register}
            errors={f.errors.street}
            defaultValue={currentAddress?.street && currentAddress?.street}
          />

          <InputField
            label='Street number'
            name='streetNumber'
            rules={getRequiredValidation()}
            register={f.register}
            errors={f.errors.streetNumber}
            defaultValue={currentAddress?.streetNumber && currentAddress?.streetNumber}
          />
        </div>
        <div className="update_user_form_controllers">
          { isNeedToRedirect && <Redirect to={ Links.USER }/> }
          <button
            disabled={!currentRegion || !isChanged}
            type="submit"
            className="btn btn-outline-warning update_user_form_controller">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};