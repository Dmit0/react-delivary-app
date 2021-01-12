import { ReactNode } from 'react';

export interface Popup {
  title?: {
    content: ReactNode,
    styles: string
  },
  body?: {
    content: ReactNode,
    styles: string
  },
  footer?: {
    content: ReactNode,
    styles: string
  }
  wrapperStyles?: string
}