import { fetchGeoModel } from '../../../types';
import { ADD_CITIES, ADD_REGIONS, GeoActionTypes, SET_CURRENT_REGION } from '../actions';

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

export const setCurrentRegion = (region: fetchGeoModel): GeoActionTypes => {
  return {
    type: SET_CURRENT_REGION,
    region
  }
}