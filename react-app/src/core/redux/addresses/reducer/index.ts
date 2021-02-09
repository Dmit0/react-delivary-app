import { AddressActionTypes, AddressState, SET_ADDRESS } from '../actions';

const initialState: AddressState = {
  address: null,
};

export const addressStateReducer = (state = initialState, action: AddressActionTypes): AddressState => {

  switch (action.type) {
    case SET_ADDRESS:
      return { ...state, address: action.address };
    default:
      return state;
  }
};