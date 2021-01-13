import { userForCreateAccount, userToStore } from '../../../types';

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const AUTH_SET_ERRORS = 'AUTH_SET_ERRORS'
export const AUTH_STEP_START = 'AUTH_STEP_START';
export const AUTH_STEP_SUCCESS = 'AUTH_STEP_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_STEP_CANCEL = 'AUTH_STEP_CANCEL';
export const AUTH_STEP_CONTINUE = 'AUTH_STEP_CONTINUE';
export const AUTH_CLOSE = 'AUTH_CLOSE';
export const AUTH_LAST_STEP_CLOSE = 'AUTH_LAST_STEP_CLOSE';


export interface AuthenticationState {
  AuthErrors: string | null
  isAuthSuccess: boolean | null
  isAuthFail: boolean
  isStepStart: boolean
  isStepSuccess: boolean
  isStepCancel: boolean
  isStepContinue: boolean
  authRedirectPath: string
}
interface CREATE_ACCOUNT {
  type: typeof CREATE_ACCOUNT
  userForCreateAccount: userForCreateAccount
}

interface AUTH_LAST_STEP_CLOSE {
  type: typeof AUTH_LAST_STEP_CLOSE
}

interface AUTH_CLOSE {
  type: typeof AUTH_CLOSE
}
interface AUTH_ERRORS {
  type: typeof AUTH_SET_ERRORS
  status: string | null
}

interface STEP_START {
  type: typeof AUTH_STEP_START
  status: boolean
}

interface STEP_SUCCESS {
  type: typeof AUTH_STEP_SUCCESS
  status: boolean
}

interface AUTH_FAIL {
  type: typeof AUTH_FAIL
}

interface STEP_CANCEL {
  type: typeof AUTH_STEP_CANCEL
  status: boolean
}

interface STEP_CONTINUE {
  type: typeof AUTH_STEP_CONTINUE
}

export type AuthenticationActionTypes = CREATE_ACCOUNT
  | AUTH_ERRORS
  | STEP_START
  | STEP_SUCCESS
  | STEP_CANCEL
  | STEP_CONTINUE
  | AUTH_FAIL
  | AUTH_CLOSE
  | AUTH_LAST_STEP_CLOSE

