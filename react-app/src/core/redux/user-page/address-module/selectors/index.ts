import { RootState } from '../../../rootReducer';
import { AddressBlockState } from '../../types';

const getUserAddressBlockState = (state: RootState): AddressBlockState => state.userPage.addressBlock;

export const getCurrentPage = (state: RootState) => getUserAddressBlockState(state).currentAddressPage;
export const getAddressesTotal = (state: RootState) => getUserAddressBlockState(state).total;
export const getCurrentPageAddresses = (state: RootState) => getUserAddressBlockState(state).addresses;