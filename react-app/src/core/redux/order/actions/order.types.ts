export const SET_ORDER_PERMISSION = 'SET_ORDER_PERMISSION';
export const START_TO_GET_PERMISSION = 'START_TO_GET_PERMISSION'

export interface OrderState {
  permission: boolean,
  isChangePermissionStart: boolean
}

interface SET_ORDER_PERMISSION {
  type: typeof SET_ORDER_PERMISSION,
  permission: boolean
}

interface START_TO_GET_PERMISSION {
  type: typeof START_TO_GET_PERMISSION,
  isChangePermissionStart: boolean
}


export type OrderActionTypes = SET_ORDER_PERMISSION | START_TO_GET_PERMISSION;