import { SET_PAGINATION_PAGE, UserPageActionTypes } from '../../types';

export const setCurrentPage = (page: number): UserPageActionTypes => {
  return {
    type: SET_PAGINATION_PAGE,
    page
  }
}