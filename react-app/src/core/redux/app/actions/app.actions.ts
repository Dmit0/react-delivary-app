import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../rootReducer';
import { AppApi } from '../../../api/apis/app.api';
import { AppActionTypes, GET_BUNNERS } from './app.types';

export const get_bunners = (): ThunkAction<Promise<void>, RootState, unknown, AppActionTypes> => {
  return async dispatch => {
    let banners = await AppApi.get();
    dispatch({
      type: GET_BUNNERS,
      banners,
    });
  };
};