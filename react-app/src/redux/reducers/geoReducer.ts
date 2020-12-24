import { ADD_CITIES, ADD_REGIONS, GeoActionTypes, GeoState } from '../types/geoTypes';

const initialState: GeoState = {
  regions: [],
  cities: []
};

export const geoReducer = (state = initialState, action: GeoActionTypes): GeoState => {

  switch (action.type) {
    case ADD_REGIONS:
      return {...state, regions: action.regions }
    case ADD_CITIES:
      return {...state, cities: action.cities }
    default:
      return state;
  }
};