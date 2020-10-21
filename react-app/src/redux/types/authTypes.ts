import {userForCreateAccont} from '../../interfaces/authentication'
export const CREATE_ACCOUNT="CREATE_ACCOUNT"

export const AUTH_CHECK_STATE = "AUTH_CHECK_STATE";//чекает в сагах

export const AUTH_USER = "AUTH_USER";//за этим будут смотреть саги 

export const AUTH_START = "AUTH_START";//начнет сага

export const AUTH_SUCCESS = "AUTH_SUCCESS";//если +

export const AUTH_FAIL = "AUTH_FAIL";//если -

export const AUTH_CHECK_TIMEOUT = "AUTH_CHECK_TIMEOUT";

export const AUTH_INITIATE_LOGOUT = "AUTH_INITIATE_LOGOUT";

export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const AUTH_CHECK_EMAIL = 'AUTH_CHECK_EMAIL'

export const AUTH_ERRORS = 'AUTH_ERRORS'

export const IS_PASSWORD_FIELD = 'IS_PASSWORD_FIELD'

export interface AuthenticationState{
        token: number | null
        userId: string| null
        AuthError: string | null
        CreateAccError:string[] | null
        authRedirectPath: string
        isPasswordField: boolean
}

interface CREATE_ACCOUNT{
    type:typeof CREATE_ACCOUNT
    userForCreateAccount:userForCreateAccont
}

interface AUTH_ERRORS{
  type: typeof AUTH_ERRORS
  status:string | null
}

interface IS_PASSWORD_FIELD{
  type:typeof IS_PASSWORD_FIELD
  statusOfVerify:boolean
}

export type AuthenticationActionTypes=CREATE_ACCOUNT | AUTH_ERRORS | IS_PASSWORD_FIELD

