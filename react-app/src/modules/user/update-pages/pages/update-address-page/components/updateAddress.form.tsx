import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import { AddressApi } from '../../../../../../core/api/apis/address.api';
import { geoApi } from '../../../../../../core/api/apis/geo.api';
import { Links } from '../../../../../../core/enums';
import { set_current_country } from '../../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../../core/redux/countries/selectors';
import { setCurrentRegion, setRegions } from '../../../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../../../core/redux/geo/selectors';
import { getToken, getUser } from '../../../../../../core/redux/user/selectors';
import './updateAddress.form.css'
import { IHoleAddress } from '../../../../../../core/types';

interface formData {
  street: string,
  streetNumber: string
}

export const UpdateAddressFrom = ({currentAddress}: { currentAddress: IHoleAddress | null }) => {
  const dispatch = useDispatch()
  const token = useSelector(getToken);
  const selectCountries = useSelector(getSelectCountries);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry)
  const regions = useSelector(getRegions);
  const selectRegions = useSelector(getSelectRegions);
  const countries = useSelector(getCountries);


  const [ isNeedToRedirect, setIsNeedToRedirect ] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const f = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

  const handleChangeCountry = async({ value }: any) => {
    const country = countries.find((country) => country.name === value);
    country && dispatch(set_current_country(country));
    const regions = country && await geoApi.fetchRegions(country.code)
    regions && dispatch(setRegions(regions.data))
    regions && dispatch(setCurrentRegion(null))
  }

  const handleChangeRegion = ({ value }: any) => {
    const region = regions.find((country) => country.name === value);
    region && dispatch(setCurrentRegion(region));
  };

  const onSubmit = async (data: formData) => {
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
      const response = token && await AddressApi.updateAddress(token, address)
      setIsNeedToRedirect(!!response)
    }
  };

  useEffect(() => {
    const isChanged =
      f.watch('street') !== currentAddress?.street ||
      f.watch('streetNumber') !== currentAddress?.streetNumber ||
      currentCountry?.code !== currentAddress?.countryCode ||
      currentRegion?.isoCode !== currentAddress?.regionId
    setIsChanged(isChanged)
  }, [f.watch, currentCountry, currentRegion])

  return (
    <form onSubmit={ f.handleSubmit(onSubmit) }>
      <div className="update_form">
        <div className="update_user_form_fields">
          <div className="update_user_form_field">
            <span>country</span>
            <Select
              name='country'
              value={{value: currentCountry?.code, label: currentCountry?.name}}
              options={ selectCountries }
              onChange={ (event: any) => handleChangeCountry(event) }
            />
          </div>
          <div className="update_user_form_field">
            <span>region</span>
            <Select
              name='region'
              value={ { value: currentRegion?.name, label: currentRegion?.name } }
              disabled={ !!regions?.length }
              options={ selectRegions }
              onChange={ (event: any) => handleChangeRegion(event) }
            />
          </div>
          <div className="update_user_form_field">
            <div className="update_user_form_labels">
              <span>street</span>
              { f.errors.street && f.errors.street.type === 'required' && <span>required field</span> }
            </div>
            <input
              defaultValue={currentAddress?.street}
              className="update_user_form_input"
              name='street'
              ref={ f.register({ required: true }) }
            />
          </div>
          <div className="update_user_form_field">
            <div className="update_user_form_labels">
              <span>streetNumber</span>
              { f.errors.streetNumber && f.errors.streetNumber.type === 'required' && <span>required field</span> }
            </div>
            <input
              defaultValue={currentAddress?.streetNumber}
              className="update_user_form_input"
              name='streetNumber'
              ref={ f.register({ required: true }) }
            />
          </div>
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