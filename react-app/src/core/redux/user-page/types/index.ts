export const SET_PAGINATION_PAGE = 'SET_PAGINATION_PAGE'

export interface userPageState {
  currentAddressPage: number
}

interface SET_PAGINATION_PAGE {
  type: typeof SET_PAGINATION_PAGE,
  page: number
}

export type UserPageActionTypes = SET_PAGINATION_PAGE