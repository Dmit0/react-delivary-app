import { RootState } from '../../../rootReducer';
import { userPageState } from '../../types';

const getUserPageState = (state: RootState): userPageState => state.userPage;

export const getCurrentPage = (state: RootState) => getUserPageState(state).currentAddressPage;
export const getAddressesTotal = (state: RootState) => getUserPageState(state).total;
export const getCurrentPageAddresses = (state: RootState) => getUserPageState(state).addresses;