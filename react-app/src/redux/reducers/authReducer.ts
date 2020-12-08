import {
  AUTH_FAIL,
  AUTH_SET_ERRORS,
  AUTH_STEP_CANCEL,
  AUTH_STEP_CONTINUE,
  AUTH_STEP_START,
  AUTH_STEP_SUCCESS,
  AUTH_END,
  AuthenticationActionTypes,
  AuthenticationState,
} from '../types/authTypes';

const initialState: AuthenticationState = {
  token: null,
  userId: null,
  userName: null,
  userRole: null,
  userPhone: null,
  AuthErrors: null,
  isAuthSuccess: null,
  isAuthFail: false,
  isStepStart: false,
  isStepSuccess: false,
  isStepCancel: false,
  isStepContinue: false,
  authRedirectPath: "/",
};

export const authReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {

  switch (action.type) {
    case AUTH_END:
      console.log(action.data)
      return {...state, token: action.data.token, userId: action.data.id, userName: action.data.firstName, userPhone: action.data.phone, userRole: action.data.role }
    case AUTH_SET_ERRORS:
      return { ...state, AuthErrors:action.status };
    case AUTH_STEP_START:
      return { ...initialState, isStepStart:action.status }
    case AUTH_FAIL:
      return { ...state, isAuthFail: true }
    case AUTH_STEP_CANCEL:
      return { ...initialState, isStepCancel:action.status}
    case AUTH_STEP_CONTINUE:
      return { ...state, isStepContinue: true, isStepSuccess: true }
    case AUTH_STEP_SUCCESS:
      return { ...initialState, isStepSuccess: true }
    default:
      return state;
  }
};