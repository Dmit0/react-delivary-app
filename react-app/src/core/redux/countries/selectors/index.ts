import { country } from '../../../types';
import { RootState } from '../../rootReducer';
import { CountryState } from '../actions';

const getCountryState = (state: RootState): CountryState => state.countries;

export const getCountry = (state: RootState) => getCountryState(state)?.country;
export const getCountries = (state: RootState) => getCountryState(state)?.countries;

export const getSelectCountries = (state: RootState, byDealCode = false) => {
  const countries = getCountries(state)
  return countries.map((country: country) => {
    return { value: country?.dial_code || '', label: byDealCode ? (country.dial_code || country.name) : country.name };
  })
};