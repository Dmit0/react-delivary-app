import { fetchGeoModel } from '../../../types';
import { getAddressByIp } from '../../app/selectors';
import { RootState } from '../../rootReducer';
import { GeoState } from '../actions';

const getGeoState = (state: RootState): GeoState => state.geo;

export const getRegions = (state: RootState) => getGeoState(state)?.regions
export const getCurrentRegion = (state: RootState) => getGeoState(state)?.region

export const getCurrentUserRegion = (state: RootState) => {
  const regions = getRegions(state);
  const ipAddress = getAddressByIp(state);
  return regions?.find(item => item.isoCode === ipAddress?.regionId)
}

export const getSelectRegions = (state: RootState) => {
  const regions = getRegions(state)
  return regions.map((region: fetchGeoModel) => {
    return { value: region.name, label: region.name };
  })
};