import { ReactNode } from 'react';
import { Popup } from '../../../types/popup.types';
import { CLOSE_POPUP, OPEN_POPUP, PopupActionTypes } from './popup.types';

export const openPopup = (popup: ReactNode): PopupActionTypes => {
  return {
    type: OPEN_POPUP,
    popup,
  };
};

export const closePopup = (): PopupActionTypes => {
  return {
    type: CLOSE_POPUP,
  };
};