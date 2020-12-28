import { fetchGeoModel } from '../../../types';
import { ADD_CITIES, ADD_REGIONS, GeoActionTypes } from '../actions';

export const setRegions = (regions: fetchGeoModel[]): GeoActionTypes => {
  return {
    type: ADD_REGIONS,
    regions,
  };
};

export const setCities = (cities: fetchGeoModel[]): GeoActionTypes => {
  return {
    type: ADD_CITIES,
    cities,
  };
};