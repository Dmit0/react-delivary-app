import { IHoleAddress } from '../../../types';
import { AddressActionTypes, SET_ADDRESS } from './address.types';

export const setCurrentAddress = (address: IHoleAddress): AddressActionTypes  => {
  return {
    type: SET_ADDRESS,
    address
  };
};