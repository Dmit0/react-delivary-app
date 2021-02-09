import { IHoleAddress } from '../../../types';

export const SET_ADDRESS = 'SET_ADDRESS';

interface SET_ADDRESS {
  type: typeof SET_ADDRESS
  address: IHoleAddress
}

export interface AddressState {
  address: IHoleAddress | null
}

export type AddressActionTypes = SET_ADDRESS