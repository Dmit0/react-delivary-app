import { banner } from '../../../types';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const GET_BUNNERS = 'GET_BUNNERS';

interface GET_BANNERS {
  type: typeof GET_BUNNERS
  banners: banner[]
}

export interface AppState {
  banners: banner[]
}

export type AppActionTypes = GET_BANNERS