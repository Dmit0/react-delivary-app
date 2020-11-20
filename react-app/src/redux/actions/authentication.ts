import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ThunkAction } from 'redux-thunk';
import { errorEnum } from '../enums/errorEnum';
import { RootState } from '../reducers/rootReducer';
import { Action } from 'redux';
import { AuthenticationAPI } from '../../api/part_apis/authenticationApi';
import { loginData, userForCreateAccont } from '../../interfaces/authentication';
import {
  AUTH_CHECK_EMAIL,
  AUTH_ERRORS,
  AuthenticationActionTypes,
  IS_PASSWORD_FIELD,
  SIGNUP_FIRST_STEP_CANCEL,
  SIGNUP_FIRST_STEP_CONTINUE,
  SIGNUP_STEP_FAIL,
  SIGNUP_STEP_START,
  SIGNUP_STEP_SUCCESS,
} from '../types/authTypes';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const create_account = (user: userForCreateAccont): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    dispatch(setSignUpStart())
    try {
      let response = await AuthenticationAPI.createAccount(user);
      response ? dispatch(setSignUpStepSuccess()) :  dispatch(setSignUpStepFailed())
      console.log(response);
      dispatch(hideLoading());
    } catch (e) {
      dispatch(hideLoading());
      dispatch(setSignUpStepFailed())
    }
  };
};

export const verifyMail = (mail: string): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationAPI.verifyMail(mail);//сделать что б сбэка приходил нормальный респонс
      dispatch(setIsPasswordField(response));
      //let message = null;
      //if (!response) {
      //    message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
      ///} else message = errorEnum.NO_ERROR
      // dispatch(setStateAuthErrors(response, message));
      dispatch(hideLoading());
    } catch (e) {
      dispatch(hideLoading());
      //show some notification if mail is wrong
    }
  };
};

export const logIn = (data: loginData): ThunkType => {
  return async dispatch => {
    try {
      let response = await AuthenticationAPI.logIn(data);
      //dispatch(secondStepOfLogin(response));
    } catch (e) {

    }
  };
};

// export const secondStepOfLogin = (logInResponse:{token:string,name:string}) =>{
//     return{
//       type:,
//
//     }
// }

export const setIsPasswordField = (status: boolean) => {
  return {
    type: IS_PASSWORD_FIELD,
    statusOfVerify: status,
  };
};

export const setStateAuthErrors = (status: boolean, message: string | null): AuthenticationActionTypes => {
  return {
    type: AUTH_ERRORS,
    status: message,
  };
};

export const setSignUpStart = (status = true): AuthenticationActionTypes => {
  return {
    type: SIGNUP_STEP_START,
    status,
  };
};

export const setSignUpStepSuccess = (status = true): AuthenticationActionTypes => {
  return {
    type: SIGNUP_STEP_SUCCESS,
    status,
  };
};

export const setSignUpStepFailed = (status = true): AuthenticationActionTypes => {
  return {
    type: SIGNUP_STEP_FAIL,
    status,
  };
};

export const setSignUpStepCancel = (status = true): AuthenticationActionTypes => {
  return {
    type: SIGNUP_FIRST_STEP_CANCEL,
    status,
  };
};
export const setSignUpStepContinue = (status = true): AuthenticationActionTypes => {
  return {
    type: SIGNUP_FIRST_STEP_CONTINUE,
    status,
  };
};


