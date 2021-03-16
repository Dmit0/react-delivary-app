import { dbClickedAddress } from '../../../types';
import { RootState } from '../../rootReducer';
import { OrderState } from '../actions';

const getOrderState = (state: RootState): OrderState => state.order;

export const getCurrentOrderPermission = (state: RootState) => getOrderState(state).permission;
export const getIsChangePermissionStart = (state: RootState) => getOrderState(state).isChangePermissionStart;
export const getOrderAddress = (state: RootState) => getOrderState(state).orderAddress;
export const getCurrentOrderTime = (state: RootState) => getOrderState(state).currentOrderTime;
export const getCurrentOrderAddressLocation = (state: RootState) => getOrderState(state).currentAddressLocation;
export const getIsCreateStep = (state: RootState) => getOrderState(state).isCreateAddressStep;
export const getCreatedAddress = (state: RootState) => getOrderState(state).createdOrderAddress;
export const getGeocoderResult = (state: RootState) => getOrderState(state).geocoderResponse;
export const getDbGeocoderClickResult = (state: RootState) => getOrderState(state).dbClickAddress;
export const getIsAddressConfirm = (state: RootState) => getOrderState(state).isAddressConfirmed;


export const getCurrentDbClick = (state: RootState): dbClickedAddress | null => {
  const currentDbClickAddress = getDbGeocoderClickResult(state);
  const addressData = currentDbClickAddress?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address
  return currentDbClickAddress ? {
    country: addressData?.Components && addressData?.Components.find(item => item.kind === 'country')?.name,
    region: addressData?.Components && addressData?.Components.find(item => item.kind === 'province')?.name,
    street: addressData?.Components && addressData?.Components.find(item => item.kind === 'street')?.name,
    streetNumber: addressData?.Components && addressData?.Components.find(item => item.kind === 'house')?.name,
    countryCode: addressData?.Components && addressData?.country_code,
  } : null
}

const getCurrentOrderStringAddress = (state: RootState) => {
  const address = getOrderAddress(state);
  return {
    country: address?.country,
    region: address?.region,
    street: address?.street,
    streetNumber: address?.streetNumber
  }
}

export const getStringAddress = (state: RootState) => {
  const isCreatedStep = getIsCreateStep(state);
  const currentAddressForParse = isCreatedStep ? getCreatedAddress(state) : getCurrentOrderStringAddress(state);
  return currentAddressForParse && Object.values(currentAddressForParse).join(' ') || ''
}

export const getZoomPosition = (state: RootState) => {
  const isCreatedStep = getIsCreateStep(state);
  const dbClickGeocoderClick = getCurrentDbClick(state)
  const currentAddress = isCreatedStep
    ? dbClickGeocoderClick
      ? dbClickGeocoderClick
      : getCreatedAddress(state)
    : getOrderAddress(state);
  return currentAddress && Object.keys(currentAddress).reduce((acc, item) => {
    if (item === 'region') {
      return acc + 8;
    } else if (item === 'street') {
      return acc + 4;
    } else if (item === 'streetNumber') {
      return acc + 2;
    }
    return acc
  }, 4) || 4;
}

export const getIsChooseExactAddress = (state: RootState) => {
  const currentResult = getGeocoderResult(state);
  const precision = currentResult?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.precision;
  return precision === 'exact';
}