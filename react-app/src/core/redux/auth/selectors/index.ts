import { RootState } from '../../rootReducer';
import { AuthenticationState } from '../actions';

const getAuthState = (state: RootState): AuthenticationState => state.authentication;

export const getToken = (state: RootState) => getAuthState(state)?.token;
export const getUserName = (state: RootState) => getAuthState(state)?.userName;
export const getIsStepSuccess = (state: RootState) => getAuthState(state).isStepSuccess;
export const getIsPopupClose = (state: RootState) => getAuthState(state).isPopupClose;
export const getIsStepContinue = (state: RootState) => getAuthState(state).isStepContinue;
export const getFirstAddress = (state: RootState) => getAuthState(state).firstAddress;
export const getUserId = (state: RootState) => getAuthState(state).userId