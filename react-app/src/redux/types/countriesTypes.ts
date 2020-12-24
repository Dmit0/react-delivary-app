import { country } from '../../interfaces/country';

export const GET_COUNTRIES = 'GET_COUNTRIES';

export const SET_COUNTRIES = 'SET_COUNTRIES';

export const SET_CURRENT_COUNTRY = 'SET_CURRENT_COUNTRY'

export interface CountryState {
  countries: country[]
  country:country | null
}

interface GET_COUNTRIES {
  type: typeof GET_COUNTRIES
}

interface SET_COUNTRIES {
  type: typeof SET_COUNTRIES
  countries: country[]
}

interface SET_CURRENT_COUNTRY {
  type: typeof SET_CURRENT_COUNTRY
  country: country
}

export type CountryActionTypes = GET_COUNTRIES | SET_COUNTRIES | SET_CURRENT_COUNTRY

