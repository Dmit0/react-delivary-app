import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {ThunkAction} from 'redux-thunk'
import { RootState } from '../reducers/rootReducer'
import { Action } from 'redux'
import {AuthenticationAPI} from '../../api/authenticationApi'
import {userForCreateAccont} from '../../interfaces/authentication'

type ThunkType=ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const create_account=(user:userForCreateAccont):ThunkType=>{
    return async dispatch=>{
        dispatch(showLoading())
        try{
            let response=await AuthenticationAPI.createAccount(user)
            console.log(response)
            dispatch(hideLoading())
        }catch(e){
            dispatch(hideLoading())
        }
    }
}