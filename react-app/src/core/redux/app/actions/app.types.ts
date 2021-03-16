import { banner, currentIpAddress } from '../../../types';

export const SET_CURRENT_IP_ADDRESS = 'SET_CURRENT_IP_ADDRESS'
export const GET_BUNNERS = 'GET_BUNNERS';

interface GET_BANNERS {
  type: typeof GET_BUNNERS
  banners: banner[]
}

export interface AppState {
  banners: banner[]
  currentAddressByIp: currentIpAddress | null
}

export interface SET_CURRENT_IP_ADDRESS {
  type: typeof SET_CURRENT_IP_ADDRESS
  address: currentIpAddress
}

export type AppActionTypes = GET_BANNERS | SET_CURRENT_IP_ADDRESS