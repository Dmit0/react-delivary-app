 import { firstCountry, userForCreateAccount, userToStore } from '../../interfaces/authentication';

// export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
// export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
// export const AUTH_LOGOUT = 'AUTH_LOGOUT';
//
// //export const IS_PASSWORD_FIELD = 'IS_PASSWORD_FIELD';// === export const AUTH_VERIFY_SUCCESS = 'AUTH_VERIFY_SUCCESS'
//
// export const AUTH_VERIFY_START = 'AUTH_START';
// export const AUTH_VERIFY_SUCCESS = 'AUTH_VERIFY_SUCCESS'
// export const AUTH_CHECK_PASSWORD_START = 'AUTH_CHECK_PASSWORD_START'
// export const AUTH_SUCCESS = 'AUTH_SUCCESS'
// export const AUTH_FAIL = 'AUTH_VERIFY_FAIL'
// export const AUTH_ERRORS = 'AUTH_ERRORS';
// export const SIGNUP_STEP_START = 'SIGNUP_START';
// export const SIGNUP_STEP_SUCCESS = 'SIGNUP_FIRST_STEP_SUCCESS';
// export const SIGNUP_STEP_FAIL = 'SIGNUP_FIRST_STEP_FAIL';
// export const SIGNUP_FIRST_STEP_CANCEL = 'SIGNUP_FIRST_STEP_SUCCESS_CANCEL';
// export const SIGNUP_FIRST_STEP_CONTINUE = 'SIGNUP_FIRST_STEP_SUCCESS_CONTINUE';
// export const SIGNUP_ADD_ADDRESS_FAIL = 'SIGNUP_FIRST_STEP_SUCCESS_CONTINUE';
// export const SIGNUP_ADD_ADDRESS_SUCCESS = 'SIGNUP_FIRST_STEP_SUCCESS_CONTINUE';
// export const INITIAL_AUTH_STEP = 'INITIAL_AUTH_STEP'

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const AUTH_SET_ERRORS = 'AUTH_SET_ERRORS'
export const AUTH_STEP_START = 'AUTH_STEP_START';
export const AUTH_STEP_SUCCESS = 'AUTH_STEP_SUCCESS';
export const AUTH_END = 'AUTH_END';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_STEP_CANCEL = 'AUTH_STEP_CANCEL';
export const AUTH_STEP_CONTINUE = 'AUTH_STEP_CONTINUE';
export const AUTH_CLOSE = 'AUTH_CLOSE'
export const AUTH_LAST_STEP_CLOSE = 'AUTH_LAST_STEP_CLOSE'
export const AUTH_CHANGE_ROLE = 'AUTH_CHANGE_ROLE'


export interface AuthenticationState {
  token: string | null
  userId: string | null
  userName: string | null
  userRole: string | null
  userPhone: string | null
  firstAddress: firstCountry | null
  AuthErrors: string | null
  isAuthSuccess: boolean | null
  isAuthFail: boolean
  isStepStart: boolean
  isStepSuccess: boolean
  isStepCancel: boolean
  isStepContinue: boolean
  authRedirectPath: string
  isPopupClose: boolean
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
interface AUTH_CHANGE_ROLE {
  type: typeof AUTH_CHANGE_ROLE
}

interface AUTH_END {
  type: typeof AUTH_END
  data: userToStore
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
  | AUTH_END
  | STEP_START
  | STEP_SUCCESS
  | STEP_CANCEL
  | STEP_CONTINUE
  | AUTH_FAIL
  | AUTH_CLOSE
  | AUTH_LAST_STEP_CLOSE
  |AUTH_CHANGE_ROLE

