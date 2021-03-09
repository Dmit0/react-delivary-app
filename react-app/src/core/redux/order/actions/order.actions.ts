import { ReactNode } from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Action as reduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { cartApi } from '../../../api/apis/cart.api';
import { OrderAPI } from '../../../api/apis/order.api';
import { IHoleAddress, Meal } from '../../../types';
import { getLocaleStorageItem } from '../../../utils/locale-storage.utils';
import { set_meal_from_localestorage_to_cart, set_meal_to_cart } from '../../cart/actions';
import { openPopup } from '../../popup/actions';
import { RootState } from '../../rootReducer';
import { setIsNeedToRedirect } from '../../user-page/page-module/actions/user-page.actions';
import { OrderActionTypes, SET_CURRENT_ORDER_TIME, SET_ORDER_ADDRESS, SET_ORDER_PERMISSION, START_TO_GET_PERMISSION } from './order.types';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, reduxAction<string>>

export const sendOrderRequest = (popup: ReactNode): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const orderPermissionResponse = await OrderAPI.checkOrderPermission();
      console.log(orderPermissionResponse)
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

export const setOrderCart = (isLogIn: boolean): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let cart;
      if (isLogIn) {
          const orderPermission = await OrderAPI.checkOrderPermission();
          dispatch(setOrderPermission(orderPermission.permission))
          const useCart = await cartApi.getUserCart()
          cart = useCart
      } else {
        cart = getLocaleStorageItem('Cart', '[]')
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

export const setOrderAddress = (address: IHoleAddress): OrderActionTypes => {
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