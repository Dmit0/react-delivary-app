import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { countriesAPI } from '../../../api/apis/countries.api';
import { country } from '../../../types';
import { RootState } from '../../rootReducer';
import { SET_COUNTRIES, SET_CURRENT_COUNTRY } from '../actions';


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