import { SET_IS_NEED_TO_REDIRECT, UserPageActionTypes } from '../../types';

export const setIsNeedToRedirect = (isNeedToRedirect: boolean): UserPageActionTypes => {
  return {
    type: SET_IS_NEED_TO_REDIRECT,
    isNeedToRedirect
  }
}