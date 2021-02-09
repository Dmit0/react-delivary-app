import { RootState } from '../../rootReducer';
import { AddressState } from '../actions';

const getAddressState = (state: RootState): AddressState => state.address;

export const getCurrentAddress = (state: RootState) => getAddressState(state)?.address;