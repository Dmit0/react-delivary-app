import { RootState } from '../../rootReducer';
import { userState } from '../actions';

const getUserState = (state: RootState): userState => state.user;

export const getToken = (state: RootState) => getUserState(state)?.token;
export const getUserName = (state: RootState) => getUserState(state)?.user.userName;
export const getFirstAddress = (state: RootState) => getUserState(state).user.firstAddress;
export const getUserId = (state: RootState) => getUserState(state).user.userId;
export const getUser = (state: RootState) => getUserState(state).user;
export const getAddresses = (state: RootState) => getUserState(state).user.addresses;