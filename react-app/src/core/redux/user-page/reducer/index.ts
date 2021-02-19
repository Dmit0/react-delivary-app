import { ADD_ADDRESS_INTO_PAGINATED_PAGE, DELETE_ADDRESS, SET_ADDRESSES, SET_PAGINATION_PAGE, UserPageActionTypes, userPageState } from '../types';

const initialState: userPageState = {
  currentAddressPage: 1,
  total: 0,
  addresses: []

};

export const userPageReducer = (state = initialState, action: UserPageActionTypes): userPageState => {

  switch (action.type) {
    case SET_PAGINATION_PAGE:
      return {...state, currentAddressPage: action.page};
    case SET_ADDRESSES:
      return {...state, total: action.data.total, addresses: action.data.addresses};
    case DELETE_ADDRESS:
      return {...state, addresses: state.addresses.filter(address => address._id !== action.addressId)};
    case ADD_ADDRESS_INTO_PAGINATED_PAGE:
      return {...state, addresses: [action.address, ...state.addresses].slice(0, state.addresses.length)}
    default:
      return state;
  }
};