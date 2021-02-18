import { act } from 'react-dom/test-utils';
import { IHoleAddress } from '../../../types';
import { SET_ADDRESSES, SET_PAGINATION_PAGE, UserPageActionTypes, userPageState } from '../types';

const initialState: userPageState = {
  currentAddressPage: 1,
  total: 0,
  addresses: []

};

export const userPageReducer = (state = initialState, action: UserPageActionTypes): userPageState => {

  switch (action.type) {
    case SET_PAGINATION_PAGE:
      return {...state, currentAddressPage: action.page}
    case SET_ADDRESSES:
      return {...state, total: action.data.total, addresses: action.data.addresses}
    default:
      return state;
  }
};