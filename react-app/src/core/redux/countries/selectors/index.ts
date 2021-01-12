import { country, fetchGeoModel } from '../../../types';
import { getRegions } from '../../geo/selectors';
import { RootState } from '../../rootReducer';
import { CountryState } from '../actions';

const getCountryState = (state: RootState): CountryState => state.countries;

export const getCountry = (state: RootState) => getCountryState(state)?.country;
export const getCountries = (state: RootState) => getCountryState(state)?.countries;

export const getSelectCountries = (state: RootState) => {
  const countries = getCountries(state)
  return countries.map((country: country) => {
    return { value: country.name, label: country.name };
  })
};