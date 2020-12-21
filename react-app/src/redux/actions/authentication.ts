import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ThunkAction } from 'redux-thunk';
import { errorEnum } from '../enums/errorEnum';
import { RootState } from '../reducers/rootReducer';
import { Action } from 'redux';
import { AuthenticationAPI } from '../../api/part_apis/authenticationApi';
import { addressDataStep, loginData, userForCreateAccount, userToStore } from '../../interfaces/authentication';
import {
  AUTH_CLOSE,
  AUTH_END,
  AUTH_FAIL, AUTH_LAST_STEP_CLOSE,
  AUTH_SET_ERRORS,
  AUTH_STEP_CANCEL,
  AUTH_STEP_CONTINUE,
  AUTH_STEP_START,
  AUTH_STEP_SUCCESS,
  AuthenticationActionTypes,
  SET_TOKEN, SET_USER,
} from '../types/authTypes';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const create_account = (user: userForCreateAccount): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    dispatch(setAuthStepStart());
    try {
      let response = await AuthenticationAPI.createAccount(user);
      if (response) {
        await dispatch(logIn({ email: user.email, password: user.password }));
      } else {
        dispatch(setAuthFailed());
      }
      dispatch(hideLoading());
    } catch (e) {
      console.log(e);
      dispatch(hideLoading());
      dispatch(setAuthFailed());
    }
  };
};

export const updateAddress = (address: addressDataStep): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationAPI.addAddressStep(address);
      if (response) {
        dispatch(authLastStepClose());
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
      let response = await AuthenticationAPI.verifyMail(mail);
      if (response) {
        dispatch(setAuthStepSuccess(response));
      } else {
        const message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
        dispatch(setAuthErrors(message));
        dispatch(setAuthFailed());
      }
      dispatch(hideLoading());
    } catch (e) {
      console.log(e);
      dispatch(hideLoading());
      const message = errorEnum.ERROR_DUE_VERIFY_EMAIL;
      dispatch(setAuthErrors(message)); //TO DO REMOVE LOGIC OF ERROR INTO ANOTHER METHOD
      dispatch(setAuthFailed());//TO DO REMOVE LOGIC OF FAIL AUTH INTO ANOTHER METHOD
    }
  };
};

export const logIn = (data: loginData, isLogIn = false): ThunkType => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      let response = await AuthenticationAPI.logIn(data);
      if (response) {
        dispatch(setAuthStepSuccess(!!response));
        dispatch(setAuthSuccess(response.token, {
          userId: response.id,
          email: response.email,
          firstName: response.firstName,
          phone: response.phone,
          firstAddress: response.firstAddress,
        }));
        isLogIn && dispatch(authLastStepClose());
      } else {
        dispatch(hideLoading());
        dispatch(setAuthFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(hideLoading());
      dispatch(setAuthFailed());
    }
  };
};

export const setAuthSuccess = (token: string, userData: any) => {
  return {
    type: AUTH_END,
    data: {
      ...userData,
      token,
    },
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

export const setToken = (token: string): AuthenticationActionTypes => {
  return {
    type: SET_TOKEN,
    token
  }
}

export const setUser = (user: userToStore): AuthenticationActionTypes => {
  return {
    type: SET_USER,
    user
  }
}


