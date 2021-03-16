import { AppActionTypes, AppState, GET_BUNNERS, SET_CURRENT_IP_ADDRESS } from '../actions';

const initialState: AppState = {
  banners: [],
  currentAddressByIp: null
};

export const appStateReducer = (state = initialState, action: AppActionTypes): AppState => {

  switch (action.type) {
    case GET_BUNNERS:
      return { ...state, banners: action.banners };
    case SET_CURRENT_IP_ADDRESS:
      return { ...state, currentAddressByIp: action.address }
    default:
      return state;
  }
};