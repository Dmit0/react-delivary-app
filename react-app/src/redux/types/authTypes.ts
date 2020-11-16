import { userForCreateAccont } from '../../interfaces/authentication';

export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';//чекает в сагах
export const AUTH_USER = 'AUTH_USER';//за этим будут смотреть саги
export const AUTH_START = 'AUTH_START';//начнет сага
export const AUTH_SUCCESS = 'AUTH_SUCCESS';//если +
export const AUTH_FAIL = 'AUTH_FAIL';//если -
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CHECK_EMAIL = 'AUTH_CHECK_EMAIL';
export const AUTH_ERRORS = 'AUTH_ERRORS';
export const IS_PASSWORD_FIELD = 'IS_PASSWORD_FIELD';

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SIGNUP_STEP_START = 'SIGNUP_START';
export const SIGNUP_STEP_SUCCESS = 'SIGNUP_FIRST_STEP_SUCCESS';
export const SIGNUP_STEP_FAIL = 'SIGNUP_FIRST_STEP_FAIL';
export const SIGNUP_FIRST_STEP_CANCEL = 'SIGNUP_FIRST_STEP_SUCCESS_CANCEL';
export const SIGNUP_FIRST_STEP_CONTINUE = 'SIGNUP_FIRST_STEP_SUCCESS_CONTINUE';

export interface AuthenticationState {
  token: number | null
  userId: string | null
  AuthError: string | null
  CreateAccError: string[] | null
  authRedirectPath: string
  isPasswordField: boolean
  isStepStart: boolean
  isStepFail: boolean
  isStepSuccess: boolean
  isSignUpStepCancel: boolean
  isSignUpSuccess: boolean | null
}

interface CREATE_ACCOUNT {
  type: typeof CREATE_ACCOUNT
  userForCreateAccount: userForCreateAccont
}

interface AUTH_ERRORS {
  type: typeof AUTH_ERRORS
  status: string | null
}

interface IS_PASSWORD_FIELD {
  type: typeof IS_PASSWORD_FIELD
  statusOfVerify: boolean
}

interface STEP_START {
  type: typeof SIGNUP_STEP_START
  status: boolean
}

interface STEP_SUCCESS {
  type: typeof SIGNUP_STEP_SUCCESS
  status: boolean
}

interface STEP_FIELD {
  type: typeof SIGNUP_STEP_FAIL
  status: boolean
}

interface STEP_CANCEL {
  type: typeof SIGNUP_FIRST_STEP_CANCEL
  status: boolean
}

interface STEP_CONTINUE {
  type: typeof SIGNUP_FIRST_STEP_CONTINUE
  status: boolean
}

export type AuthenticationActionTypes = CREATE_ACCOUNT
  | AUTH_ERRORS
  | IS_PASSWORD_FIELD
  | STEP_START
  | STEP_SUCCESS
  | STEP_FIELD
  | STEP_CANCEL
  | STEP_CONTINUE

