import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserApi } from '../../../api/apis/user.api';
import { Core } from '../../../enums/core.enum';
import { IUpdateUser, userToStore } from '../../../types';
import { setLocaleStorageItem } from '../../../utils/locale-storage.utils';
import { set_cart_length } from '../../cart/actions';
import { RootState } from '../../rootReducer';
import { setIsNeedToRedirect } from '../../user-page/page-module/actions/user-page.actions';
import { INITIAL_STATE, SET_AUTH_USER, SET_IS_USER_LOG_IN, SET_USER, UserActionTypes } from './user.types';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const getUser = (): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const userData = await UserApi.getUser();
      if (userData) {
        const { cart, user, role, addresses, phone } = userData;
        dispatch(setUser({
          email: user.email,
          firstName: user.name,
          userId: user._id,
          createdAt: user.createdAt,
          role,
          addresses,
          phone,
        }));
        dispatch(set_cart_length(cart.countOfItems));
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const updateUser = (user: IUpdateUser): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const response = await UserApi.updateUser(user);
      dispatch(setIsNeedToRedirect(!!response));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoading());
    }
  };
};

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