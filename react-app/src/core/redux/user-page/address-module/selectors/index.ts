import { RootState } from '../../../rootReducer';
import { userPageState } from '../../types';

const getUserPageState = (state: RootState): userPageState => state.userPage;

export const getCurrentPage = (state: RootState) => getUserPageState(state).currentAddressPage