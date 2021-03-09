import { hideLoading } from 'react-redux-loading-bar';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { geoApi } from '../../../api/apis/geo.api';
import { Locality } from '../../../enums/locality.enum';
import { fetchGeoModel } from '../../../types';
import { RootState } from '../../rootReducer';
import { ADD_CITIES, ADD_REGIONS, GeoActionTypes, SET_CURRENT_REGION, SET_INITIAL_STATE } from '../actions';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const fetchGeo = (localityName: string, code: string): ThunkType => {
  return async dispatch => {
    try {
      switch (localityName) {
        case(Locality.REGION):
          const regions = await geoApi.fetchRegions(code);
          regions && dispatch(setRegions(regions.data));break;
        default: break;
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

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