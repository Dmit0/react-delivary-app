import {
  OrderActionTypes,
  OrderState,
  SET_CREATE_ORDER_ADDRESS,
  SET_CURRENT_ORDER_TIME, SET_GEOCODER_RESPONSE,
  SET_ORDER_ADDRESS,
  SET_ORDER_ADDRESS_LOCATION,
  SET_ORDER_PERMISSION,
  START_TO_GET_PERMISSION,
} from '../actions';

const initialState: OrderState = {
  permission: false,
  isChangePermissionStart: false,
  orderAddress: null,
  currentOrderTime: null,
  currentAddressLocation: null,
  createdOrderAddress: null,
  isCreateAddressStep: false,
  geocoderResponse: null
};

export const orderReducer = (state = initialState, action: OrderActionTypes): OrderState => {

  switch (action.type) {
    case SET_ORDER_PERMISSION:
      return { ...state, permission: action.permission };
    case START_TO_GET_PERMISSION:
      return {...state, isChangePermissionStart: action.isChangePermissionStart}
    case SET_ORDER_ADDRESS:
      return {...state, orderAddress: action.address, isCreateAddressStep: false}
    case SET_CURRENT_ORDER_TIME:
      return {...state, currentOrderTime: action.time}
    case SET_ORDER_ADDRESS_LOCATION:
      return { ...state, currentAddressLocation: action.currentAddressLocation }
    case SET_CREATE_ORDER_ADDRESS:
      return { ...state, createdOrderAddress: action.address ? { ...state.createdOrderAddress, ...action.address}: null, isCreateAddressStep: true }
    case SET_GEOCODER_RESPONSE:
      return {...state, geocoderResponse: action.response}
    default:
      return state;
  }
}