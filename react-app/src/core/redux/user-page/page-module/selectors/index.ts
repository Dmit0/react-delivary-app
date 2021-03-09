import { RootState } from '../../../rootReducer';
import { userPageState } from '../../types';

const getUserAddressBlockState = (state: RootState): userPageState => state.userPage;

export const getIsNeedToRedirect = (state: RootState) => getUserAddressBlockState(state).isNeedToRedirect;