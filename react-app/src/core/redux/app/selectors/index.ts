import { RootState } from '../../rootReducer';
import { AppState } from '../actions';

const getAppState = (state: RootState): AppState => state.app;

export const getBanners = (state: RootState) => getAppState(state)?.banners;
export const getAddressByIp = (state: RootState) => getAppState(state)?.currentAddressByIp;

export const getCurrentIpAddressSelect = (state: RootState) => {
  const ipAddress = getAddressByIp(state);
  return (ipAddress && `${ipAddress?.country || ''}, ${ipAddress?.region || ''}, ${ipAddress?.street || ''}, ${ipAddress?.streetNumber || ''}`) || ''
}

export const getSelectIpAddress = (state: RootState) => {
  const ipAddress = getAddressByIp(state);
  return {value: ipAddress?.ip || '', label: (ipAddress && `${ipAddress?.country || ''}, ${ipAddress?.region || ''}, ${ipAddress?.street || ''}, ${ipAddress?.streetNumber || ''}`) || ''}
}