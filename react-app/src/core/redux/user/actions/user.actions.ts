import { userToStore } from '../../../types';
import { INITIAL_STATE, SET_AUTH_USER, SET_TOKEN, SET_USER, UserActionTypes } from './user.types';

export const setToken = (token: string): UserActionTypes => {
  return {
    type: SET_TOKEN,
    token
  }
}

export const setUser = (user: userToStore): UserActionTypes => {
  return {
    type: SET_USER,
    user
  }
}

export const setAuthUser = (token: string, user: userToStore) => {
  localStorage.setItem('token', JSON.stringify(token))
  return {
    type: SET_AUTH_USER,
    data: {
      token,
      user
    }
  }
}

export const cleanUserData = () => {
  return {
    type: INITIAL_STATE
  }
}