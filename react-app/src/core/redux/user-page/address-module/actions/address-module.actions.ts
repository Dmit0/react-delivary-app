import { IHoleAddress } from '../../../../types';
import { SET_ADDRESSES, SET_PAGINATION_PAGE, UserPageActionTypes } from '../../types';

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