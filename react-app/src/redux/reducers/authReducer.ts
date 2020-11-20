import {
  AUTH_ERRORS,
  AuthenticationActionTypes,
  AuthenticationState,
  IS_PASSWORD_FIELD,
  SIGNUP_FIRST_STEP_CANCEL,
  SIGNUP_FIRST_STEP_CONTINUE,
  SIGNUP_STEP_FAIL,
  SIGNUP_STEP_START,
  SIGNUP_STEP_SUCCESS,
} from '../types/authTypes';

const initialState: AuthenticationState = {
  token: null,
  userId: null,
  AuthError: null,
  CreateAccError: null,
  authRedirectPath: "/",
  isPasswordField: false,
  isStepStart: false,
  isStepFail: false,
  isStepSuccess: false,
  isSignUpStepCancel: false,
  isSignUpSuccess: null
};

export const authReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {

  switch (action.type) {
    case AUTH_ERRORS:
      return { ...state, AuthError:action.status };
    case IS_PASSWORD_FIELD:
      return { ...state, isPasswordField:action.statusOfVerify }
    case SIGNUP_STEP_START:
      return { ...state, isStepStart:action.status, isStepFail: false, isStepSuccess: false, isSignUpStepCancel: false, isSignUpSuccess: null }
    case SIGNUP_STEP_SUCCESS:
      return { ...state, isStepSuccess:action.status }
    case SIGNUP_STEP_FAIL:
      return { ...state, isStepFail:action.status }
    case SIGNUP_FIRST_STEP_CANCEL:
      return { ...state, isSignUpStepCancel:action.status, isStepStart:false, isStepFail: false, isStepSuccess: false, isSignUpSuccess: true}
    case SIGNUP_FIRST_STEP_CONTINUE:
      return { ...state, isSignUpSuccess:action.status, isStepSuccess: true}
    default:
      return state;
  }
};