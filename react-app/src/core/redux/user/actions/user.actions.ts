import { Core } from '../../../enums/core.enum';
import { userToStore } from '../../../types';
import { setLocaleStorageItem } from '../../../utils/locale-storage.utils';
import { INITIAL_STATE, SET_AUTH_USER, SET_IS_USER_LOG_IN, SET_USER, UserActionTypes } from './user.types';

export const setIsUserLogInToken = (isLogIn: boolean): UserActionTypes => {
  return {
    type: SET_IS_USER_LOG_IN,
    isLogIn
  }
}

export const setUser = (user: userToStore): UserActionTypes => {
  return {
    type: SET_USER,
    user
  }
}

export const setAuthUser = (token: string, user: userToStore) => {
 setLocaleStorageItem(Core.Token, token)
  return {
    type: SET_AUTH_USER,
    data: {
      user
    }
  }
}

export const cleanUserData = () => {
  return {
    type: INITIAL_STATE
  }
}