import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleButton } from '../../../core/components/buttons';
import { LineThrew } from '../../../core/components/decor/2-line/line';
import { DeliveryIcon } from '../../../core/components/icons';
import { authClose, logIn, verifyMail } from '../../../core/redux/auth/actions';
import { getIsStepSuccess } from '../../../core/redux/auth/selectors';
import { openPopup } from '../../../core/redux/popup/actions';
import { loginData } from '../../../core/types';
import { Patterns } from '../../../core/utils/patterns';
import { SignUpPersonalForm } from '../signUp/components/add-personal-info/signUpAddPersonalInfo';

interface formData {
  email: string,
  password: string,
  samePassword: string,
}

export const LogIn: React.FC = () => {
  const dispatch = useDispatch();
  const isEmailVerified = useSelector(getIsStepSuccess);

  const registrationHandler = () => {
    dispatch(authClose())
    dispatch(openPopup(<SignUpPersonalForm/>));
  };
  const verifyEMail = useCallback((mail: string) => {
    dispatch(verifyMail(mail));
  },[dispatch]);

  const signIn = useCallback((data: loginData) => {
    dispatch(logIn(data, true));
  },[dispatch]);

  const { register, handleSubmit, errors, watch } = useForm<formData>();

  const onSubmit = (data: formData) => {
    isEmailVerified
      ? signIn(watch())
      : verifyEMail(data.email);
  };

  return (
    <div className="authPopup">
      <div className='main-auth-popup'>
        <div className="auth-title">
          <div className="auth-title-header">
            <DeliveryIcon height={ '30' } width={ '30' }/>
          </div>
          <div className="auth-sub-title">
            Log in to your account
          </div>
        </div>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="auth-body">
            <div className="auth-body_Google_auth">
              <GoogleButton text='Sign in with Google'/>
            </div>
            <LineThrew/>
            <div className="auth-body_Mail_auth">
              <div className='auth_user_form_field'>
                <div className="auth_user_form_labels">
                  <span className='Username-Label'>Email Address</span>
                  { errors.email && errors.email.type === 'required' && <span className='signIn-Label'>Email is required</span> }
                  { errors.email && errors.email.type === 'pattern' && <span className='signIn-Label'>it isnt`t email</span> }
                </div>
                <input
                  disabled={ isEmailVerified }
                  name='email'
                  ref={ register({ required: true, pattern: Patterns.mail }) }
                />
              </div>
            </div>
            { isEmailVerified
              ? <div className="auth-body_Mail_auth">
                <div className='auth_user_form_field'>
                  <div className="auth_user_form_labels">
                    <span className='Username-Label'>Password</span>
                    { errors.password && errors.password.type === 'required' && <span>This field is required</span> }
                    { errors.password && errors.password.type === 'minLength' && <span>Required len more then 8</span> }
                    { errors.password && errors.password.type === 'maxLength' && <span>Required len less then 8</span> }
                    { errors.password && errors.password.type === 'pattern' && <span>Req Upper and Lower case</span> }
                  </div>
                  <input
                    type="password"
                    name='password'
                    ref={ register({ required: true, minLength: 8, maxLength: 30, pattern: Patterns.password }) }
                  />
                </div>
              </div>
              : null
            }
          </div>
          <div className="auth-futer">
            <div className="auth-next-step">
              <button type="submit" className="btn btn-outline-primary auth-next-step-button ">
                { isEmailVerified
                  ? 'SignIn'
                  : 'Next'
                }
              </button>
            </div>
            <div className="auth-redirect-to-Registration">
              Dont`t have an account?
              <span onClick={ registrationHandler }>Sign Up</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};