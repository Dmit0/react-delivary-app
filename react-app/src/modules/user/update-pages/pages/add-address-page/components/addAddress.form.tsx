import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InputField } from '../../../../../../core/components/form-fields/input-form-field/input';
import { SelectField } from '../../../../../../core/components/form-fields/select-form-field/selectField';
import { Links } from '../../../../../../core/enums';
import { Locality } from '../../../../../../core/enums/locality.enum';
import { set_current_country } from '../../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../../core/redux/countries/selectors';
import { fetchGeo, setCurrentRegion } from '../../../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../../../core/redux/geo/selectors';
import './addAddress.form.css'
import { addAddress } from '../../../../../../core/redux/user-page/address-module/actions/address-module.actions';
import { getIsNeedToRedirect } from '../../../../../../core/redux/user-page/page-module/selectors';
import { getIsLogIn } from '../../../../../../core/redux/user/selectors';
import { getRequiredValidation } from '../../../../../../core/utils/form-validation.utils';
interface formData {
  street: string,
  streetNumber: string
}

export const AddAddressFrom = () => {

  const dispatch = useDispatch()

  const isLogIn = useSelector(getIsLogIn);
  const selectCountries = useSelector(getSelectCountries);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry)
  const regions = useSelector(getRegions);
  const selectRegions = useSelector(getSelectRegions);
  const countries = useSelector(getCountries);
  const isNeedToRedirect = useSelector(getIsNeedToRedirect);

  const { register, handleSubmit, errors } = useForm<formData>();

  const handleChangeCountry = useCallback(({ value }: any) => {
    dispatch(setCurrentRegion(null))
    const country = countries.find((country) => country.dial_code === value);
    country && dispatch(set_current_country(country));
    country && dispatch(fetchGeo(Locality.REGION, country.code));
  }, [countries, dispatch]);

  const handleChangeRegion = useCallback(({ value }: any) => {
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
  }, [dispatch, regions]);

  const onSubmit = (data: formData) => {
      if (currentRegion &&  currentCountry) {
        const address = {
          country: currentCountry.name,
          countryCode: currentCountry.code,
          region: currentRegion.name,
          regionId: currentRegion.isoCode,
          street: data.street,
          streetNumber: data.streetNumber
        }
        isLogIn && dispatch(addAddress(address))
      }
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="update_form">
        <div className="update_user_form_fields">

          <SelectField
            name='country'
            label='Your country'
            options={selectCountries}
            changeSelectHandler={(event: any) => handleChangeCountry(event)}
          />

          <SelectField
            name='region'
            label='Your region'
            isDisabled={!regions?.length}
            currentSelectValue={{value: currentRegion?.name, label: currentRegion?.name}}
            options={selectRegions}
            changeSelectHandler={(event: any) => handleChangeRegion(event)}
          />

          <InputField
            label='Street'
            name='street'
            rules={getRequiredValidation()}
            register={register}
            errors={errors.street}
          />

          <InputField
            label='Street number'
            name='streetNumber'
            rules={getRequiredValidation()}
            register={register}
            errors={errors.streetNumber}
          />
        </div>
        <div className="update_user_form_controllers">
          { isNeedToRedirect && <Redirect to={ Links.USER }/> }
          <button
            disabled={!currentRegion}
            type="submit"
            className="btn btn-outline-warning update_user_form_controller">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};