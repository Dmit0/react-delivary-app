import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../rootReducer';
import { AppAPI } from '../../../api/apis/appApi';
import { AppActionTypes, GET_BUNNERS } from './app.types';

export const get_bunners = (): ThunkAction<Promise<void>, RootState, unknown, AppActionTypes> => {
  return async dispatch => {
    let banners = await AppAPI.get();
    dispatch({
      type: GET_BUNNERS,
      banners,
    });
  };
};