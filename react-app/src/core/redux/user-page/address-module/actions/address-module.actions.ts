import { IHoleAddress } from '../../../../types';
import { ADD_ADDRESS_INTO_PAGINATED_PAGE, DELETE_ADDRESS, SET_ADDRESSES, SET_PAGINATION_PAGE, UserPageActionTypes } from '../../types';

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

export const deleteAddress = (addressId: string): UserPageActionTypes => {
  return {
    type: DELETE_ADDRESS,
    addressId
  }
}

export const addAddress = (address: IHoleAddress): UserPageActionTypes => {
  return {
    type: ADD_ADDRESS_INTO_PAGINATED_PAGE,
    address
  }
}