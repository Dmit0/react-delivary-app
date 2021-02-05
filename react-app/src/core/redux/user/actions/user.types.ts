import { UserRedux, userToStore } from '../../../types';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const INITIAL_STATE = 'INITIAL_STATE';
export const DELETE_ADDRESS = 'DELETE_ADDRESS'

export interface userState {
  token: string | null
  user: UserRedux
}

interface INITIAL_STATE {
  type: typeof INITIAL_STATE
}

interface SET_TOKEN {
  type: typeof SET_TOKEN
  token: string
}

interface SET_USER {
  type: typeof SET_USER
  user: userToStore
}

interface SET_AUTH_USER {
  type: typeof SET_AUTH_USER
  data: {
    token: string,
    user: userToStore
  }
}

interface DELETE_ADDRESS {
  type: typeof DELETE_ADDRESS,
  addressId: string
}


export type UserActionTypes = SET_TOKEN | SET_USER | SET_AUTH_USER | INITIAL_STATE | DELETE_ADDRESS