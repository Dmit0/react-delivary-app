import { UserRedux, userToStore } from '../../../types';

export const SET_IS_USER_LOG_IN = 'SET_IS_USER_LOG_IN';
export const SET_USER = 'SET_USER';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const INITIAL_STATE = 'INITIAL_STATE';

export interface userState {
  isLogIn: boolean
  user: UserRedux
}

interface INITIAL_STATE {
  type: typeof INITIAL_STATE
}

interface SET_IS_USER_LOG_IN {
  type: typeof SET_IS_USER_LOG_IN
  isLogIn: boolean
}

interface SET_USER {
  type: typeof SET_USER
  user: userToStore
}

interface SET_AUTH_USER {
  type: typeof SET_AUTH_USER
  data: {
    user: userToStore
  }
}


export type UserActionTypes = SET_USER | SET_AUTH_USER | INITIAL_STATE | SET_IS_USER_LOG_IN