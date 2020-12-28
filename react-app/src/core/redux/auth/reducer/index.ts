import {
  AUTH_CLOSE,
  AUTH_FAIL,
  AUTH_LAST_STEP_CLOSE,
  AUTH_SET_ERRORS,
  AUTH_STEP_CANCEL,
  AUTH_STEP_CONTINUE,
  AUTH_STEP_START,
  AUTH_STEP_SUCCESS,
  AuthenticationActionTypes,
  AuthenticationState,
} from '../actions';

const initialState: AuthenticationState = {
  AuthErrors: null,
  isAuthSuccess: null,
  isAuthFail: false,
  isStepStart: false,
  isStepSuccess: false,
  isStepCancel: false,
  isStepContinue: false,
  authRedirectPath: "/",
  isPopupClose: false,
};

export const authReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {

  switch (action.type) {
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
    case AUTH_CLOSE:
      return initialState
    case AUTH_LAST_STEP_CLOSE:
      return {...state, isPopupClose: true}
    default:
      return state;
  }
};