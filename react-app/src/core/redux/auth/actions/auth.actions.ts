import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import { errorEnum } from '../../../enums';
import { addressDataStep, loginData, userForCreateAccount } from '../../../types';
import { set_cart_length } from '../../cart/actions';
import { closePopup } from '../../popup/actions';
import { RootState } from '../../rootReducer';
import { Action } from 'redux';
import { AuthenticationApi } from '../../../api/apis/authentication.api';
import { setAuthUser } from '../../user/actions';
import {
  AUTH_CLOSE,
  AUTH_FAIL, AUTH_LAST_STEP_CLOSE,
  AUTH_SET_ERRORS,
  AUTH_STEP_CANCEL,
  AUTH_STEP_CONTINUE,
  AUTH_STEP_START,
  AUTH_STEP_SUCCESS,
  AuthenticationActionTypes,
} from '../actions';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const create_account = (user: userForCreateAccount): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    dispatch(setAuthStepStart());
    try {
      let response = await AuthenticationApi.createAccount(user);
      if (response) {
        await dispatch(logIn({ email: user.email, password: user.password }));
      } else {
        dispatch(setAuthFailed());
        toast.warn('auth error')
      }
      dispatch(hideLoading());
    } catch (e) {
      console.log(e);
      dispatch(hideLoading());
      dispatch(setAuthFailed());
      toast.warn('auth error')
    }
  };
};

export const updateAddress = (address: addressDataStep): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationApi.addAddressStep(address);
      if (response) {
        dispatch(closePopup());
      } else {
        dispatch(hideLoading());
        const message = errorEnum.ADD_ADDRESS_FAIL;
        dispatch(setAuthErrors(message));
      }
    } catch (e) {
      dispatch(hideLoading());
      const message = errorEnum.ADD_ADDRESS_FAIL;
      dispatch(setAuthErrors(message));
    }
  };
};

export const verifyMail = (mail: string): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationApi.verifyMail(mail);
      if (response) {
        toast.success('emil verified')
        dispatch(setAuthStepSuccess(response));
      } else {
        const message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
        toast.warn(errorEnum.ERROR_DUE_VERIFY_EMAIL)
        dispatch(setAuthErrors(message));
        dispatch(setAuthFailed());
      }
      dispatch(hideLoading());
    } catch (e) {
      console.log(e);
      dispatch(hideLoading());
      const message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
      toast.warn(message)
      dispatch(setAuthErrors(message)); //TO DO REMOVE LOGIC OF ERROR INTO ANOTHER METHOD
      dispatch(setAuthFailed());//TO DO REMOVE LOGIC OF FAIL AUTH INTO ANOTHER METHOD
    }
  };
};

export const logIn = (data: loginData, isLogIn = false): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationApi.logIn(data);
      if (response) {
        toast.success('auth success')
        dispatch(setAuthStepSuccess(!!response));
        dispatch(setAuthUser(response.token, {
          userId: response.id,
          email: response.email,
          firstName: response.firstName,
          firstAddress: response.firstAddress,
        }));
        dispatch(set_cart_length(response.cart))
        isLogIn && dispatch(authLastStepClose());
        isLogIn && dispatch(closePopup())
      } else {
        toast.warn('auth fail')
        dispatch(hideLoading());
        dispatch(setAuthFailed());
      }
    } catch (e) {
      console.log(e);
      toast.warn('auth fail')
      dispatch(hideLoading());
      dispatch(setAuthFailed());
    }
  };
};

export const setAuthErrors = (message: string | null): AuthenticationActionTypes => {
  return {
    type: AUTH_SET_ERRORS,
    status: message,
  };
};

export const setAuthStepStart = (status = true): AuthenticationActionTypes => {
  return {
    type: AUTH_STEP_START,
    status,
  };
};

export const setAuthStepSuccess = (status = true): AuthenticationActionTypes => {
  return {
    type: AUTH_STEP_SUCCESS,
    status,
  };
};

export const setAuthFailed = (): AuthenticationActionTypes => {
  return {
    type: AUTH_FAIL,
  };
};

export const authLastStepClose = (): AuthenticationActionTypes => {
  return {
    type: AUTH_LAST_STEP_CLOSE,
  };
};

export const authClose = (): AuthenticationActionTypes => {
  return {
    type: AUTH_CLOSE,
  };
};

export const setStepCancel = (status = true): AuthenticationActionTypes => {
  return {
    type: AUTH_STEP_CANCEL,
    status,
  };
};
export const setStepContinue = (): AuthenticationActionTypes => {
  return {
    type: AUTH_STEP_CONTINUE,
  };
};


