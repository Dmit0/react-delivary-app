import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { countriesAPI } from '../../api/part_apis/countries.api';
import { country } from '../../interfaces/country';
import { RootState } from '../reducers/rootReducer';
import { SET_COUNTRIES, SET_CURRENT_COUNTRY } from '../types/countriesTypes';


type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const get_countries = (): ThunkType => {
  return async dispatch => {
    try {
      let countries = await countriesAPI.get();
      dispatch(set_countries(countries))
      set_countries(countries)
    } catch (e) {
      console.log(e)
    }
  };
};

export const set_countries = (countries: country[]) => {
  return {
    type: SET_COUNTRIES,
    countries
  }
}

export const set_current_country = (country:country) => {
  return {
    type: SET_CURRENT_COUNTRY,
    country
  }
}