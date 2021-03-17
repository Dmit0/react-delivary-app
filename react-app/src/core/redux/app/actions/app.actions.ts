import publicIp from 'public-ip';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IpStack } from '../../../api/apis/ipStack';
import { YandexGeocoder } from '../../../api/apis/yaGeocoder';
import { currentIpAddress } from '../../../types';
import { GeoObjectComponent } from '../../../types/yandex.types';
import { getCoordinatesString } from '../../../utils/coordinate.utils';
import { RootState } from '../../rootReducer';
import { AppApi } from '../../../api/apis/app.api';
import { GET_BUNNERS, SET_CURRENT_IP_ADDRESS } from './app.types';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const get_banners = (): ThunkType => {
  return async dispatch => {
    let banners = await AppApi.get();
    dispatch({
      type: GET_BUNNERS,
      banners,
    });
  };
};

export const getCurrentUserLocation = (): ThunkType => {
  return async dispatch => {
    const currentIp = await publicIp.v4();
    const currentLocation = await IpStack.getLocation(currentIp)
    const yaGeocoderResponse = currentLocation && await YandexGeocoder.getAddressByStr(getCoordinatesString({lng: currentLocation?.longitude, lat: currentLocation?.latitude}), false)
    const geocodingComponents = yaGeocoderResponse?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components
    const currentUserAddress = {
      ip: currentIp,
      regionId: currentLocation?.region_code,
      countryCode: currentLocation?.country_code,
      country: geocodingComponents && geocodingComponents.find((item: GeoObjectComponent ) => item.kind === 'country')?.name,
      region: geocodingComponents && geocodingComponents.find((item: GeoObjectComponent ) => item.kind === 'province')?.name,
      street: geocodingComponents && geocodingComponents.find((item: GeoObjectComponent ) => item.kind === 'street')?.name,
      streetNumber: geocodingComponents && geocodingComponents.find((item: GeoObjectComponent ) => item.kind === 'house')?.name,
      lng: currentLocation?.longitude,
      lat: currentLocation?.latitude,
      exact: yaGeocoderResponse?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData.precision === 'exact'
    }
    dispatch(setCurrentAddressByIp(currentUserAddress));
  };
};

export const setCurrentAddressByIp = (address: currentIpAddress) => {
  return {
    type: SET_CURRENT_IP_ADDRESS,
    address
  }
}