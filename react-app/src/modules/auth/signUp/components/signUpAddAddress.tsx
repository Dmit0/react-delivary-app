import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { geoApi } from '../../../../core/api/apis/geo.api';
import { DeliveryIcon } from '../../../../core/components/icons';
import { Locality } from '../../../../core/enums/locality.enum';
import { authClose, setStepCancel, updateAddress } from '../../../../core/redux/auth/actions';
import { set_current_country } from '../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../core/redux/countries/selectors';
import { setCurrentRegion, setRegions } from '../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../core/redux/geo/selectors';
import { closePopup } from '../../../../core/redux/popup/actions';
import { getFirstAddress, getToken, getUserId } from '../../../../core/redux/user/selectors';
import { addressDataStep } from '../../../../core/types';

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
  const token = useSelector(getToken)

  useEffect(() => {
    firstUserCountry && fetchGeo(Locality.REGION, firstUserCountry.code)
  }, [])

  const handleChangeCountry = async ({ value }: any) => {
    const country = countries.find((country) => country.name === value);
    country && dispatch(set_current_country(country));
    country && await fetchGeo(Locality.REGION, country.code)
  };

  const fetchGeo = async (localityName: string, code: string) => {
    switch (localityName) {
      case(Locality.REGION):
        const regions = await geoApi.fetchRegions(code);
        regions && dispatch(setRegions(regions.data));break;
      default: return null
    }
  }

  const handleChangeRegion = ({ value }: any) => {
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
  };

  const onClose = () => { // TODO: `FIX THIS METHOD AND LOGIC`
    dispatch(setStepCancel());
    dispatch(closePopup());
    dispatch(authClose());
  };

  const onAddFirstAddress = async (data: addressDataStep) => {
    token && dispatch(updateAddress(data, token));
  };

  const { register, handleSubmit } = useForm<formData>();

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
    <>
      <div className="registrationPopup">
        <div className='main-auth-popup'>
          <div className="auth-title">
            <div className="auth-title-header">
              <DeliveryIcon height={ '30' } width={ '30' }/>
            </div>
          </div>
          <div className="reg-sub-title">Add Your Address</div>
          <form className='Authentication_Form' onSubmit={ handleSubmit(onSubmit) }>
            <div className="auth-body_Mail_auth">
              <div>
                <span className='Authentication-Label'>Your Country</span>
                <Select
                  name='country'
                  defaultValue={ { value: firstUserCountry?.country, label: firstUserCountry?.country } }
                  options={ selectCountries }
                  onChange={ (event: any) => handleChangeCountry(event) }
                />
                <span className='Authentication-Label'>Your Region</span>
                <Select
                  name='region'
                  value={ { value: currentRegion?.name, label: currentRegion?.name } }
                  disabled={ !!regions }
                  options={ selectRegions }
                  onChange={ (event: any) => handleChangeRegion(event) }
                />
                <span className='Authentication-Label'>street</span>{/*Only belarus prefix +375*/ }
                <input name='street' ref={ register({ required: true }) }/>
                {/*{ errors.name && errors.name.type === 'required' && <span>This field is required</span> }*/}

                <span className='Authentication-Label'>street number</span>
                <input name='streetNumber' ref={ register({ required: true }) }/>
                {/*{ errors.name && errors.name.type === 'required' && <span>This field is required</span> }*/}
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
    </>
  );
};