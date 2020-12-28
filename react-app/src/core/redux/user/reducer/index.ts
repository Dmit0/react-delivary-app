import { INITIAL_STATE, SET_AUTH_USER, SET_TOKEN, SET_USER, UserActionTypes, userState } from '../actions';

const initialState: userState = {
  token: null,
  user: {
    userId: null,
    userName: null,
    email: null,
    userPhone: null,
    firstAddress: null,
    addresses: [],
    status: null,
  }
};
export const authReducer = (state = initialState, action: UserActionTypes): userState => {

  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          userId: action.user.userId,
          userName: action.user.firstName,
          email: action.user.email,
        },
      };
    case SET_AUTH_USER:
      return {
        ...state,
        user: {
          ...state.user,
          userId: action.data.user.userId,
          userName: action.data.user.firstName,
          email: action.data.user.email,
        },
        token: action.data.token
      }
    case INITIAL_STATE:
      return initialState
    default:
      return state;
  }
};