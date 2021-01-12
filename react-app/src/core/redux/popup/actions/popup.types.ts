import { ReactNode } from 'react';
import { Popup } from '../../../types/popup.types';

export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';

export interface PopupState {
  isOpen: boolean
  popup: ReactNode
}

interface CLOSE_POPUP {
  type: typeof CLOSE_POPUP
}

interface OPEN_POPUP {
  type: typeof OPEN_POPUP
  popup: ReactNode
}

export type PopupActionTypes = OPEN_POPUP | CLOSE_POPUP

