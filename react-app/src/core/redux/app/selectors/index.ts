import { RootState } from '../../rootReducer';
import { AppState } from '../actions';

const getAppState = (state: RootState): AppState => state.app;

export const getBanners = (state: RootState) => getAppState(state)?.banners;
