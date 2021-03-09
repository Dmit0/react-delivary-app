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
  AuthenticationState, ROOT_TOKEN_VALIDATE,
} from '../actions';

const initialState: AuthenticationState = {
  rootTokeValidate: false,
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
    case AUTH_SET_ERRORS:
      return { ...state, AuthErrors:action.status };
    case AUTH_STEP_START:
      return { ...initialState, isStepStart:action.status, rootTokeValidate: state.rootTokeValidate }
    case AUTH_FAIL:
      return { ...state, isAuthFail: true }
    case AUTH_STEP_CANCEL:
      return { ...initialState, isStepCancel:action.status, rootTokeValidate: state.rootTokeValidate }
    case AUTH_STEP_CONTINUE:
      return { ...state, isStepContinue: true, isStepSuccess: true }
    case AUTH_STEP_SUCCESS:
      return { ...initialState, isStepSuccess: true, rootTokeValidate: state.rootTokeValidate }
    case AUTH_CLOSE:
      return { ...initialState, rootTokeValidate: state.rootTokeValidate }
    case AUTH_LAST_STEP_CLOSE:
      return { ...initialState, rootTokeValidate: state.rootTokeValidate }
    case ROOT_TOKEN_VALIDATE:
      return {...state, rootTokeValidate: true}
    default:
      return state;
  }
};