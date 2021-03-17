import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AddressApi } from '../../../../api/apis/address.api';
import { IAddAddress, IHoleAddress, IUpdateAddress } from '../../../../types';
import { Pagination } from '../../../../types/pagination.types';
import { RootState } from '../../../rootReducer';
import { setIsNeedToRedirect } from '../../page-module/actions/user-page.actions';
import { DELETE_ADDRESS, SET_ADDRESSES, SET_PAGINATION_PAGE, UserPageActionTypes } from '../../types';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const getPaginatedAddresses = (pagination?: Pagination): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const addresses = await AddressApi.getPaginatedAddresses(pagination);
      addresses && dispatch(setAddresses(addresses));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const deleteAddress = (addressId: string): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await AddressApi.deleteAddress(addressId)
      response && dispatch({
        type: DELETE_ADDRESS,
        addressId
      })
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const addAddress = (address: IAddAddress): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await AddressApi.addAddress(address)
      response && dispatch(setIsNeedToRedirect(!!response))
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const updateAddress = (address: IUpdateAddress): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await AddressApi.updateAddress(address)
      dispatch(setIsNeedToRedirect(!!response))
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const setCurrentPage = (page: number): UserPageActionTypes => {
  return {
    type: SET_PAGINATION_PAGE,
    page
  }
}

export const setAddresses = (data: {addresses: IHoleAddress[], total: number}): UserPageActionTypes  => {
  return {
    type: SET_ADDRESSES,
    data
  }
}