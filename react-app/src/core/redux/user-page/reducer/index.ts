import {
  DELETE_ADDRESS,
  SET_ADDRESSES,
  SET_IS_NEED_TO_REDIRECT,
  SET_PAGINATION_PAGE,
  UserPageActionTypes,
  userPageState,
} from '../types';

const initialState: userPageState = {
  addressBlock: {
    currentAddressPage: 1,
    total: 0,
    addresses: []
  },
  isNeedToRedirect: false
};

export const userPageReducer = (state = initialState, action: UserPageActionTypes): userPageState => {

  switch (action.type) {
    case SET_PAGINATION_PAGE:
      return { ...state, addressBlock: { ...state.addressBlock, currentAddressPage: action.page } };
    case SET_ADDRESSES:
      return { ...state, addressBlock: { ...state.addressBlock, total: action.data.total, addresses: action.data.addresses } };
    case DELETE_ADDRESS:
      return {
        ...state,
        addressBlock: { ...state.addressBlock, addresses: state.addressBlock.addresses.filter(address => address._id !== action.addressId) },
      };
    case SET_IS_NEED_TO_REDIRECT:
      return { ...state, isNeedToRedirect: action.isNeedToRedirect }
    default:
      return state;
  }
};