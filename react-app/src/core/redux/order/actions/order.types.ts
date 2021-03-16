import { currentIpAddress, IHoleAddress, IPrepareAddressForApi } from '../../../types';
import { YandexGeocodeResultType } from '../../../types/yandex.types';

export const SET_ORDER_PERMISSION = 'SET_ORDER_PERMISSION';
export const START_TO_GET_PERMISSION = 'START_TO_GET_PERMISSION';
export const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS';
export const SET_CREATE_ORDER_ADDRESS = 'SET_CREATE_ORDER_ADDRESS';
export const SET_CURRENT_ORDER_TIME = 'SET_CURRENT_ORDER_TIME';
export const SET_ORDER_ADDRESS_LOCATION = 'SET_ORDER_ADDRESS_LOCATION';
export const SET_GEOCODER_RESPONSE = 'SET_GEOCODER_RESPONSE';
export const SET_GEOCODER_DBCLICK_RESPONSE = 'SET_GEOCODER_DBCLICK_RESPONSE';
export const SET_ADDRESS_CONFIRM = 'SET_ADDRESS_CONFIRM';

export const ASAP = 'As soon as possible'

export interface OrderState {
  permission: boolean,
  isChangePermissionStart: boolean
  orderAddress: IHoleAddress | currentIpAddress | null,
  createdOrderAddress: IPrepareAddressForApi | null,
  isCreateAddressStep: boolean,
  currentOrderTime: any,
  geocoderResponse: YandexGeocodeResultType | null,
  currentAddressLocation: { lat: number, lng: number } | null,
  dbClickAddress: YandexGeocodeResultType | null,
  isAddressConfirmed: boolean
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
  address: IHoleAddress | currentIpAddress | null
}

interface SET_CURRENT_ORDER_TIME {
  type: typeof SET_CURRENT_ORDER_TIME
  time: any
}

interface SET_ORDER_ADDRESS_LOCATION {
  type: typeof SET_ORDER_ADDRESS_LOCATION
  currentAddressLocation: { lat: number, lng: number },
}

interface SET_CREATE_ORDER_ADDRESS {
  type: typeof SET_CREATE_ORDER_ADDRESS,
  address: IPrepareAddressForApi | null
}

interface SET_GEOCODER_RESPONSE {
  type: typeof SET_GEOCODER_RESPONSE,
  response: YandexGeocodeResultType | null
}

interface SET_GEOCODER_DBCLICK_RESPONSE {
  type: typeof SET_GEOCODER_DBCLICK_RESPONSE,
  response: YandexGeocodeResultType | null
}

interface SET_ADDRESS_CONFIRM {
  type: typeof SET_ADDRESS_CONFIRM,
  isConfirm: boolean
}

export type OrderActionTypes = SET_ORDER_PERMISSION
  | START_TO_GET_PERMISSION
  | SET_CURRENT_ORDER_TIME
  | SET_ORDER_ADDRESS
  | SET_ORDER_ADDRESS_LOCATION
  | SET_CREATE_ORDER_ADDRESS
  | SET_GEOCODER_RESPONSE
  | SET_GEOCODER_DBCLICK_RESPONSE
  | SET_ADDRESS_CONFIRM;