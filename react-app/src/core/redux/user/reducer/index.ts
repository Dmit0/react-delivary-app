import { DELETE_ADDRESS, INITIAL_STATE, SET_AUTH_USER, SET_TOKEN, SET_USER, UserActionTypes, userState } from '../actions';

const initialState: userState = {
  token: null,
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
        token: action.data.token
      }
    case INITIAL_STATE:
      return initialState
    case DELETE_ADDRESS:
      return {...state, user: {...state.user, addresses: state.user.addresses.filter(address => address._id !== action.addressId)} }
    default:
      return state;
  }
};