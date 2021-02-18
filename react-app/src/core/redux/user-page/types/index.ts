import { IHoleAddress } from '../../../types';

export const SET_PAGINATION_PAGE = 'SET_PAGINATION_PAGE';
export const SET_ADDRESSES = 'SET_ADDRESSES';
export const ADDRESSES_PER_PAGE = 3;

export interface userPageState {
  currentAddressPage: number,
  total: number,
  addresses: IHoleAddress[]
}

interface SET_PAGINATION_PAGE {
  type: typeof SET_PAGINATION_PAGE,
  page: number
}

interface SET_ADDRESSES {
  type: typeof SET_ADDRESSES,
  data: {
    total: number,
    addresses: IHoleAddress[]
  }
}

export type UserPageActionTypes = SET_PAGINATION_PAGE | SET_ADDRESSES