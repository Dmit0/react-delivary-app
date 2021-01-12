import { CLOSE_POPUP, OPEN_POPUP, PopupActionTypes, PopupState } from '../actions/popup.types';

const initialState: PopupState = {
  isOpen: false,
  popup: {}
};

export const popupReducer = (state = initialState, action: PopupActionTypes): PopupState => {

  switch (action.type) {
    case OPEN_POPUP:
      return {...state, isOpen: true, popup: action.popup }
    case CLOSE_POPUP:
      return initialState
    default:
      return state;
  }
};