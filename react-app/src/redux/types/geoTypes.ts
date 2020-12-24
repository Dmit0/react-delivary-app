import { fetchGeoModel } from '../../interfaces/geo';

export const ADD_REGIONS = 'ADD_REGIONS';
export const ADD_CITIES = 'ADD_CITIES';

export interface GeoState {
  regions: fetchGeoModel[]
  cities: fetchGeoModel[]
}
interface ADD_REGIONS {
  type: typeof ADD_REGIONS
  regions: fetchGeoModel[]
}

interface ADD_CITIES {
  type: typeof ADD_CITIES
  cities: fetchGeoModel[]
}

export type GeoActionTypes = ADD_REGIONS | ADD_CITIES

