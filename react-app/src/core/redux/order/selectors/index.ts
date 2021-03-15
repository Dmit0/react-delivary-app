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
  return currentAddressForParse && Object.values(currentAddressForParse).join(' ') || 'Belarus'
}

export const getZoomPosition = (state: RootState) => {
  const isCreatedStep = getIsCreateStep(state);
  const currentAddress = isCreatedStep ? getCreatedAddress(state) : getOrderAddress(state);
  return currentAddress && Object.keys(currentAddress).reduce((acc, item) => {
    if (item === 'country') {
      return acc + 2;
    } else if (item === 'region') {
      return acc + 4;
    } else if (item === 'street') {
      return acc + 6;
    }
    return acc
  }, 2) || 3;
}

export const getIsChooseExactAddress = (state: RootState) => {
  const currentResult = getGeocoderResult(state);
  const precision = currentResult?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.precision;
  return precision === 'exact';
}