import { SET_PAGINATION_PAGE, UserPageActionTypes, userPageState } from '../types';

const initialState: userPageState = {
  currentAddressPage: 1
};

export const userPageReducer = (state = initialState, action: UserPageActionTypes): userPageState => {

  switch (action.type) {
    case SET_PAGINATION_PAGE:
      return {...state, currentAddressPage: action.page}
    default:
      return state;
  }
};