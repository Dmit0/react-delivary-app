import { RootState } from '../../rootReducer';
import { AuthenticationState } from '../actions';

const getAuthState = (state: RootState): AuthenticationState => state.authentication;

export const getIsStepSuccess = (state: RootState) => getAuthState(state).isStepSuccess;
export const getIsStepContinue = (state: RootState) => getAuthState(state).isStepContinue;