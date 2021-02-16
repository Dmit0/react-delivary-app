import { fetchGeoModel } from '../../../types';
import { ADD_CITIES, ADD_REGIONS, GeoActionTypes, SET_CURRENT_REGION, SET_INITIAL_STATE } from '../actions';

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

export const setCurrentRegion = (region: fetchGeoModel | null): GeoActionTypes => {
  return {
    type: SET_CURRENT_REGION,
    region
  }
}

export const setInitialGeoState = (): GeoActionTypes => {
  return {
    type: SET_INITIAL_STATE
  }
}