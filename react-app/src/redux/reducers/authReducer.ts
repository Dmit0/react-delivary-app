import {
  AUTH_ERRORS,
  AuthenticationActionTypes,
  AuthenticationState, IS_PASSWORD_FIELD,
} from '../types/authTypes';

const initialState: AuthenticationState = {
  token: null,
  userId: null,
  AuthError: null,
  CreateAccError: null,
  authRedirectPath: "/",
  isPasswordField: false
};

export const authReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {

  switch (action.type) {
    case AUTH_ERRORS:
      return { ...state, AuthError:action.status };
    case IS_PASSWORD_FIELD:
      return { ...state, isPasswordField:action.statusOfVerify }
    default:
      return state;
  }
};