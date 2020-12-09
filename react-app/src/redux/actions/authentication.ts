import jwt from 'jsonwebtoken';
import { env } from '../../env'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ThunkAction } from 'redux-thunk';
import { errorEnum } from '../enums/errorEnum';
import { RootState } from '../reducers/rootReducer';
import { Action } from 'redux';
import { AuthenticationAPI } from '../../api/part_apis/authenticationApi';
import { loginData, userForCreateAccount, userToStore } from '../../interfaces/authentication';
import {
  AUTH_CLOSE,
  AUTH_END,
  AUTH_FAIL,
  AUTH_SET_ERRORS,
  AUTH_STEP_CANCEL,
  AUTH_STEP_CONTINUE,
  AUTH_STEP_START,
  AUTH_STEP_SUCCESS,
  AuthenticationActionTypes,
} from '../types/authTypes';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const create_account = (user: userForCreateAccount): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    dispatch(setAuthStepStart())
    try {
      console.log('step start')
      let response = await AuthenticationAPI.createAccount(user);
      if(response) {
        await dispatch(logIn({ email:user.email, password: user.password }))
      } else dispatch(setAuthFailed())
      dispatch(hideLoading());
    } catch (e) {
      console.log(e)
      dispatch(hideLoading());
      dispatch(setAuthFailed())
      //add errors to banner
    }
  };
};

export const verifyMail = (mail: string): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationAPI.verifyMail(mail);
      if(response){
        dispatch(setAuthStepSuccess(response));
      } else {
        const message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
        dispatch(setAuthErrors(message));
        dispatch(setAuthFailed())
      }
      dispatch(hideLoading());
    } catch (e) {
      console.log(e)
      dispatch(hideLoading());
      const message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
      dispatch(setAuthErrors(message)); //TO DO REMOVE LOGIC OF ERROR INTO ANOTHER METHOD
      dispatch(setAuthFailed())//TO DO REMOVE LOGIC OF FAIL AUTH INTO ANOTHER METHOD
    }
  };
};

export const logIn = (data: loginData): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationAPI.logIn(data);
      console.log(response)
      if (response) {
        dispatch(setAuthStepSuccess(!!response));
        const decodedToken = jwt.verify(response.token, env.JWT_SECRET_KEY)
        dispatch(setAuthSuccess(response.token, decodedToken))
      } else {
        dispatch(hideLoading());
        dispatch(setAuthFailed());
      }
    } catch (e) {
      console.log(e)
      dispatch(hideLoading());
      dispatch(setAuthFailed());
    }
  };
};

export const setAuthSuccess = ( token: string, userData: any) => {
  return {
    type: AUTH_END,
    data: {
      ...userData,
      token
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

export const authClose = (): AuthenticationActionTypes => {
  return {
    type: AUTH_CLOSE
  }
}

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


