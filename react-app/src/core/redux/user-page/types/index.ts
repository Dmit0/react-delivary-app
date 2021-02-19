import { IHoleAddress } from '../../../types';

export const SET_PAGINATION_PAGE = 'SET_PAGINATION_PAGE';
export const SET_ADDRESSES = 'SET_ADDRESSES';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const ADD_ADDRESS_INTO_PAGINATED_PAGE = 'ADD_ADDRESS_INTO_PAGINATED_PAGE';
export const ADDRESSES_PER_PAGE = 3;

export interface userPageState {
  currentAddressPage: number,
  total: number,
  addresses: IHoleAddress[],
}

interface SET_PAGINATION_PAGE {
  type: typeof SET_PAGINATION_PAGE,
  page: number,
}

interface SET_ADDRESSES {
  type: typeof SET_ADDRESSES,
  data: {
    total: number,
    addresses: IHoleAddress[],
  }
}

interface DELETE_ADDRESS {
  type: typeof DELETE_ADDRESS,
  addressId: string,
}

interface ADD_ADDRESS_INTO_PAGINATED_PAGE {
  type: typeof ADD_ADDRESS_INTO_PAGINATED_PAGE,
  address: IHoleAddress,
}

export type UserPageActionTypes = SET_PAGINATION_PAGE | SET_ADDRESSES | DELETE_ADDRESS | ADD_ADDRESS_INTO_PAGINATED_PAGE;