import { INITIAL_STATE, SET_AUTH_USER, SET_IS_USER_LOG_IN, SET_USER, UserActionTypes, userState } from '../actions';

const initialState: userState = {
  isLogIn: false,
  user: {
    userId: null,
    userName: null,
    email: null,
    firstAddress: null,
    addresses: [],
    createdAt: null,
    status: null,
    phone: null,
    role: null
  }
};
export const userReducer = (state = initialState, action: UserActionTypes): userState => {

  switch (action.type) {
    case SET_IS_USER_LOG_IN:
      return { ...state, isLogIn: action.isLogIn };
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          userId: action.user.userId,
          userName: action.user.firstName,
          email: action.user.email,
          createdAt: action.user.createdAt || null,
          addresses: action.user.addresses || [],
          phone: action.user.phone || null,
          role: action.user.role || null
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
          firstAddress: action.data.user.firstAddress || null
        },
        isLogIn: true
      }
    case INITIAL_STATE:
      return initialState
    default:
      return state;
  }
};