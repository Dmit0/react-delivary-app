import { ReactNode } from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Action as reduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { cartApi } from '../../../api/apis/cart.api';
import { OrderAPI } from '../../../api/apis/order.api';
import { YandexGeocoder } from '../../../api/apis/yaGeocoder';
import { Core } from '../../../enums/core.enum';
import { currentIpAddress, IHoleAddress, IPrepareAddressForApi } from '../../../types';
import { YandexGeocodeResultType } from '../../../types/yandex.types';
import { getLocaleStorageItem } from '../../../utils/locale-storage.utils';
import { set_meal_from_localestorage_to_cart } from '../../cart/actions';
import { openPopup } from '../../popup/actions';
import { RootState } from '../../rootReducer';
import { setIsNeedToRedirect } from '../../user-page/page-module/actions/user-page.actions';
import {
  OrderActionTypes, SET_ADDRESS_CONFIRM, SET_CREATE_ORDER_ADDRESS,
  SET_CURRENT_ORDER_TIME, SET_GEOCODER_DBCLICK_RESPONSE, SET_GEOCODER_RESPONSE,
  SET_ORDER_ADDRESS,
  SET_ORDER_ADDRESS_LOCATION,
  SET_ORDER_PERMISSION,
  START_TO_GET_PERMISSION,
} from './order.types';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, reduxAction<string>>

export const sendOrderRequest = (popup: ReactNode): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const orderPermissionResponse = await OrderAPI.checkOrderPermission();
      dispatch(setOrderPermission(!!orderPermissionResponse))
      dispatch(setIsNeedToRedirect(!!orderPermissionResponse))
      if (!orderPermissionResponse) dispatch(openPopup(popup))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const getCoordinates = (address: string, exactStreetType = true): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const searchResult = await YandexGeocoder.getAddressByStr(address, exactStreetType);
      dispatch(setGeocoderResponse(searchResult.response))
      exactStreetType ? dispatch(setExactStreet(null)) : dispatch(setExactStreet(searchResult.response))
      const currentPosition = searchResult?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos.split(' ');
      currentPosition && dispatch(setCurrentLocation({ lat: Number(currentPosition[1]), lng: Number(currentPosition[0]) }))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const setOrderCart = (isLogIn: boolean): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let cart;
      if (isLogIn) {
          const orderPermission = await OrderAPI.checkOrderPermission();
          dispatch(setOrderPermission(orderPermission.permission))
          const useCart = await cartApi.getUserCart()
          cart = useCart.meals
      } else {
        cart = getLocaleStorageItem(Core.Cart, '[]')
      }
      dispatch(set_meal_from_localestorage_to_cart(cart))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const setOrderPermission = (permission: boolean): OrderActionTypes => {
  return {
    type: SET_ORDER_PERMISSION,
    permission
  }
}

export const startToChangePermission = (isChangePermissionStart: boolean): OrderActionTypes => {
  return {
    type: START_TO_GET_PERMISSION,
    isChangePermissionStart
  }
}

export const setOrderAddress = (address: IHoleAddress | currentIpAddress | null): OrderActionTypes => {
  return {
    type: SET_ORDER_ADDRESS,
    address
  }
}

export const setCurrentOrderTime = (time: any): OrderActionTypes => {
  return {
    type: SET_CURRENT_ORDER_TIME,
    time
  }
}

export const setCurrentLocation = (currentAddressLocation: { lat: number, lng: number }): OrderActionTypes => {
  return {
    type: SET_ORDER_ADDRESS_LOCATION,
    currentAddressLocation
  }
}

export const createAddress = (address: IPrepareAddressForApi | null, isFromIp = false): OrderActionTypes => {
  return {
    type: SET_CREATE_ORDER_ADDRESS,
    address: {
      ...address,
      isFromIp
    }
  }
}

export const setGeocoderResponse = (address: YandexGeocodeResultType | null) => {
  return {
    type: SET_GEOCODER_RESPONSE,
    response: address
  }
}

export const setExactStreet = (address: YandexGeocodeResultType | null) => {
  return {
    type: SET_GEOCODER_DBCLICK_RESPONSE,
    response: address
  }
}

export const setIsAddressConfirm = (isConfirm: boolean) => {
  return {
    type: SET_ADDRESS_CONFIRM,
    isConfirm
  }
}