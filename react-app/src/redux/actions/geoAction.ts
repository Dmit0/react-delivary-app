import { addressDataStep } from '../../interfaces/authentication';
import { fetchGeoModel } from '../../interfaces/geo';
import { ADD_CITIES, ADD_REGIONS, GeoActionTypes } from '../types/geoTypes';

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