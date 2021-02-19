import { OrderActionTypes, OrderState, SET_ORDER_PERMISSION, START_TO_GET_PERMISSION } from '../actions';

const initialState: OrderState = {
  permission: false,
  isChangePermissionStart: false
};

export const orderReducer = (state = initialState, action: OrderActionTypes): OrderState => {

  switch (action.type) {
    case SET_ORDER_PERMISSION:
      return { ...state, permission: action.permission };
    case START_TO_GET_PERMISSION:
      return {...state, isChangePermissionStart: action.isChangePermissionStart}
    default:
      return state;
  }
}