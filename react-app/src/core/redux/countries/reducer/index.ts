import { CountryActionTypes, CountryState, SET_COUNTRIES, SET_CURRENT_COUNTRY } from '../actions';

const initialState: CountryState = {
  countries: [],
  country: null,
};

export const countryReducer = (state = initialState, action: CountryActionTypes): CountryState => {

  switch (action.type) {
    case SET_COUNTRIES:
      return { ...state, countries: action.countries };
    case SET_CURRENT_COUNTRY:
      return { ...state, country: action.country };
    default:
      return state;
  }
};