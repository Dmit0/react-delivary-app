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

export interface AuthenticationState{
        token: number
        userId: string
        LoginError: string[] | null
        CreateAccError:string[] | null
        authRedirectPath: "/"
}

interface CREATE_ACCOUNT{
    type:typeof CREATE_ACCOUNT
    userForCreateAccount:userForCreateAccont
}

export type AuthenticationActionTypes=CREATE_ACCOUNT

