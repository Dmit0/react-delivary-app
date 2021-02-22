import { IHoleAddress } from '../../../types';

export const SET_ORDER_PERMISSION = 'SET_ORDER_PERMISSION';
export const START_TO_GET_PERMISSION = 'START_TO_GET_PERMISSION';
export const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS';

export interface OrderState {
  permission: boolean,
  isChangePermissionStart: boolean
  orderAddress: IHoleAddress | null
}

interface SET_ORDER_PERMISSION {
  type: typeof SET_ORDER_PERMISSION,
  permission: boolean
}

interface START_TO_GET_PERMISSION {
  type: typeof START_TO_GET_PERMISSION,
  isChangePermissionStart: boolean
}

interface SET_ORDER_ADDRESS {
  type: typeof SET_ORDER_ADDRESS
  address: IHoleAddress
}

export type OrderActionTypes = SET_ORDER_PERMISSION | START_TO_GET_PERMISSION | SET_ORDER_ADDRESS;