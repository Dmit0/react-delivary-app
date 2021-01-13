import { AppActionTypes, AppState, GET_BUNNERS } from '../actions';

const initialState: AppState = {
  banners: [],
};

export const appStateReducer = (state = initialState, action: AppActionTypes): AppState => {

  switch (action.type) {
    case GET_BUNNERS:
      return { ...state, banners: action.banners };
    default:
      return state;
  }
};