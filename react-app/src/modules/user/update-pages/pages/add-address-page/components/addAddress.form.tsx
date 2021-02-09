import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import { AddressApi } from '../../../../../../core/api/apis/address.api';
import { geoApi } from '../../../../../../core/api/apis/geo.api';
import { Links } from '../../../../../../core/enums';
import { Locality } from '../../../../../../core/enums/locality.enum';
import { set_current_country } from '../../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../../core/redux/countries/selectors';
import { setCurrentRegion, setRegions } from '../../../../../../core/redux/geo/actions';
import { getCurrentRegion, getRegions, getSelectRegions } from '../../../../../../core/redux/geo/selectors';
import { getToken, getUser } from '../../../../../../core/redux/user/selectors';
import './addAddress.form.css'
interface formData {
  street: string,
  streetNumber: string
}

export const AddAddressFrom = () => {

  const dispatch = useDispatch()

  const token = useSelector(getToken);
  const selectCountries = useSelector(getSelectCountries);
  const currentRegion = useSelector(getCurrentRegion);
  const currentCountry = useSelector(getCountry)
  const regions = useSelector(getRegions);
  const selectRegions = useSelector(getSelectRegions);
  const countries = useSelector(getCountries);

  const [ isNeedToRedirect, setIsNeedToRedirect ] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<formData>();

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
      if (currentRegion &&  currentCountry) {
        const address = {
          country: currentCountry.name,
          countryCode: currentCountry.code,
          region: currentRegion.name,
          street: data.street,
          streetNumber: data.streetNumber
        }
        const response = token && await AddressApi.addAddress(token, address)
        setIsNeedToRedirect(!!response)
      }
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="update_form">
        <div className="update_user_form_fields">
          <div className="update_user_form_field">
            <span>country</span>
            <Select
              name='country'
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
              { errors.street && errors.street.type === 'required' && <span>required field</span> }
            </div>
            <input className="update_user_form_input" name='street' ref={ register({ required: true }) }/>
          </div>
          <div className="update_user_form_field">
            <div className="update_user_form_labels">
              <span>streetNumber</span>
              { errors.streetNumber && errors.streetNumber.type === 'required' && <span>required field</span> }
            </div>
            <input className="update_user_form_input" name='streetNumber' ref={ register({ required: true }) }/>
          </div>
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