import { OrderActionTypes, SET_ORDER_PERMISSION, START_TO_GET_PERMISSION } from './order.types';

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