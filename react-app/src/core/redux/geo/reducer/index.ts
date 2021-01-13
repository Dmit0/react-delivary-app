import { ADD_CITIES, ADD_REGIONS, GeoActionTypes, GeoState, SET_CURRENT_REGION } from '../actions';

const initialState: GeoState = {
  regions: [],
  cities: [],
  region: null
};

export const geoReducer = (state = initialState, action: GeoActionTypes): GeoState => {

  switch (action.type) {
    case ADD_REGIONS:
      return {...state, regions: action.regions }
    case ADD_CITIES:
      return {...state, cities: action.cities }
    case SET_CURRENT_REGION:
      return {...state, region: action.region}
    default:
      return state;
  }
};