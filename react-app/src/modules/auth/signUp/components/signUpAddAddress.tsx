import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputField } from '../../../../core/components/form-fields/input-form-field/input';
import { SelectField } from '../../../../core/components/form-fields/select-form-field/selectField';
import { DeliveryIcon } from '../../../../core/components/icons';
import { Locality } from '../../../../core/enums/locality.enum';
import { authClose, updateAddress } from '../../../../core/redux/auth/actions';
import { set_current_country } from '../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../core/redux/countries/selectors';
import { fetchGeo, setCurrentRegion } from '../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../core/redux/geo/selectors';
import { closePopup } from '../../../../core/redux/popup/actions';
import { getFirstAddress, getIsLogIn, getUserId } from '../../../../core/redux/user/selectors';
import { addressDataStep } from '../../../../core/types';
import { getRequiredValidation } from '../../../../core/utils/form-validation.utils';

interface formData {
  country: string,
  street: string,
  streetNumber: string
}

export const SignUpAddressStep: React.FC = () => {

  const dispatch = useDispatch();
  const firstUserCountry = useSelector(getFirstAddress);
  const selectCountries = useSelector(getSelectCountries);
  const countries = useSelector(getCountries);
  const selectRegions = useSelector(getSelectRegions);
  const regions = useSelector(getRegions);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry);
  const userId = useSelector(getUserId);
  const isLogIn = useSelector(getIsLogIn)

  useEffect(() => {
    firstUserCountry && dispatch(fetchGeo(Locality.REGION, firstUserCountry.code))
  }, [dispatch, firstUserCountry])

  const handleChangeCountry = useCallback(({ value }: any) => {
    const country = countries.find((country) => country.name === value);
    if (country) {
      dispatch(set_current_country(country));
      dispatch(fetchGeo(Locality.REGION, country.code))
    }
  },[countries, dispatch]);

  const handleChangeRegion = useCallback(({ value }: any) => {
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
  }, [dispatch, regions]);

  const onClose = () => {
    dispatch(closePopup());
    dispatch(authClose());
  };

  const onAddFirstAddress = (data: addressDataStep) => {
    isLogIn && dispatch(updateAddress(data));
  };

  const { register, handleSubmit, errors } = useForm<formData>();

  const onSubmit = (data: formData) => {
    if (currentCountry && currentRegion && userId && firstUserCountry?.addressId) {
      onAddFirstAddress({
        userId,
        addressId: firstUserCountry?.addressId,
        countryCode: currentCountry.code,
        country: (currentCountry && currentCountry.name) || firstUserCountry.country,
        region: currentRegion.name,
        street: data.street,
        streetNumber: data.streetNumber,
      });
    }
  };

  return (
    <div className="registrationPopup">
      <div className='main-auth-popup'>
        <div className="auth-title">
          <div className="auth-title-header">
            <DeliveryIcon height='30' width='30'/>
          </div>
        </div>
        <div className="reg-sub-title">Add Your Address</div>
        <form className='Authentication_Form' onSubmit={ handleSubmit(onSubmit) }>
          <div className="auth-body_Mail_auth">
            <div>
              <SelectField
                name='country'
                label='Your country'
                defaultValue={ { value: firstUserCountry?.country, label: firstUserCountry?.country } }
                currentSelectValue={ { value: currentCountry?.name, label: currentCountry?.name } }
                options={ selectCountries }
                changeSelectHandler={ (event: any) => handleChangeCountry(event) }
              />

              <SelectField
                name='region'
                label='Your Region'
                currentSelectValue={ { value: currentRegion?.name, label: currentRegion?.name } }
                isDisabled={ !regions?.length }
                options={ selectRegions }
                changeSelectHandler={ (event: any) => handleChangeRegion(event) }
              />

              <InputField
                label='Street'
                name='street'
                rules={ getRequiredValidation() }
                register={ register }
                errors={ errors.street }
              />

              <InputField
                label='Street number'
                name='streetNumber'
                rules={ getRequiredValidation() }
                register={ register }
                errors={ errors.streetNumber }
              />

            </div>
            <div className="auth-step-button">
              <div className="auth-next-step">
                <button onClick={ onClose } type="button" className="btn btn-outline-primary auth-prev-button ">Return</button>
              </div>
              <div className="auth-next-step">
                <button type="submit" className="btn btn-outline-primary reg-next-step-button ">Add Address</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};