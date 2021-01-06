import { RootState } from '../../rootReducer';
import { AuthenticationState } from '../actions';

const getAuthState = (state: RootState): AuthenticationState => state.authentication;

export const getIsStepSuccess = (state: RootState) => getAuthState(state).isStepSuccess;
export const getIsPopupClose = (state: RootState) => getAuthState(state).isPopupClose;
export const getIsStepContinue = (state: RootState) => getAuthState(state).isStepContinue;