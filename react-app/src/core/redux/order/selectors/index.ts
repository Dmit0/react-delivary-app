import { RootState } from '../../rootReducer';
import { OrderState } from '../actions';

const getOrderState = (state: RootState): OrderState => state.order;

export const getCurrentOrderPermission = (state: RootState) => getOrderState(state).permission;
export const getIsChangePermissionStart = (state: RootState) => getOrderState(state).isChangePermissionStart;
export const getOrderAddress = (state: RootState) => getOrderState(state).orderAddress;