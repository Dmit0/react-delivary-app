import { RootState } from '../../rootReducer';
import { CountryState } from '../actions';

const getCountryState = (state: RootState): CountryState => state.countries;

export const getCountry = (state: RootState) => getCountryState(state)?.country;