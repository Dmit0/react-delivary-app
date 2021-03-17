import { IHoleAddress } from '../../../types';
import { getAddressByIp } from '../../app/selectors';
import { RootState } from '../../rootReducer';
import { userState } from '../actions';

const getUserState = (state: RootState): userState => state.user;

 export const getIsLogIn = (state: RootState) => getUserState(state)?.isLogIn;
export const getUserName = (state: RootState) => getUserState(state)?.user.userName;
export const getFirstAddress = (state: RootState) => getUserState(state).user.firstAddress;
export const getUserId = (state: RootState) => getUserState(state).user.userId;
export const getUser = (state: RootState) => getUserState(state).user;
export const getAllUserAddresses = (state: RootState) => getUserState(state).user.addresses;


export const getSelectAddresses = (state: RootState) => {
  const addresses = getAllUserAddresses(state);
  const ipAddress = getAddressByIp(state);
  const userAddresses =  addresses.map((address: IHoleAddress) => {
    return { value: address._id, label: `${address.country}, ${address.region}, ${address.street}, ${address.streetNumber}` };
  })
  return [{ value: ipAddress?.ip || '', label: `${ipAddress?.country || ''}, ${ipAddress?.region || ''}, ${ipAddress?.street || ''}, ${ipAddress?.streetNumber || ''}`}, ...userAddresses]
};