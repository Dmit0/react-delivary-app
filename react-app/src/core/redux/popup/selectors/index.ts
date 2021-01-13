import { RootState } from '../../rootReducer';
import { PopupState } from '../actions/popup.types';

const getPopupState = (state: RootState): PopupState => state.popup;

export const getIsPopupOpen = (state: RootState) => getPopupState(state).isOpen
export const getPopup = (state: RootState) => getPopupState(state).popup