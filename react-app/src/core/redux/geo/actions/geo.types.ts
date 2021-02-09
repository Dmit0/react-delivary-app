import { fetchGeoModel } from '../../../types';

export const ADD_REGIONS = 'ADD_REGIONS';
export const ADD_CITIES = 'ADD_CITIES';
export const SET_CURRENT_REGION = 'SET_CURRENT_REGION'

export interface GeoState {
  regions: fetchGeoModel[]
  cities: fetchGeoModel[]
  region: fetchGeoModel | null
}
interface ADD_REGIONS {
  type: typeof ADD_REGIONS
  regions: fetchGeoModel[]
}

interface ADD_CITIES {
  type: typeof ADD_CITIES
  cities: fetchGeoModel[]
}

interface SET_CURRENT_REGION {
  type: typeof SET_CURRENT_REGION
  region: fetchGeoModel | null
}

export type GeoActionTypes = ADD_REGIONS | ADD_CITIES | SET_CURRENT_REGION

