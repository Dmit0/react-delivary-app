import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleButton } from '../../../core/components/buttons';
import { LineThrew } from '../../../core/components/decor/2-line/line';
import { InputField } from '../../../core/components/form-fields/input-form-field/input';
import { DeliveryIcon } from '../../../core/components/icons';
import { authClose, logIn, verifyMail } from '../../../core/redux/auth/actions';
import { getIsStepSuccess } from '../../../core/redux/auth/selectors';
import { openPopup } from '../../../core/redux/popup/actions';
import { loginData } from '../../../core/types';
import { getEmailValidation, getPasswordValidation } from '../../../core/utils/form-validation.utils';
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
    dispatch(authClose());
    dispatch(openPopup(<SignUpPersonalForm/>));
  };
  const verifyEMail = useCallback((mail: string) => {
    dispatch(verifyMail(mail));
  }, [ dispatch ]);

  const signIn = useCallback((data: loginData) => {
    dispatch(logIn(data, true));
  }, [ dispatch ]);

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
            <DeliveryIcon height='30'  width='30'/>
          </div>
          <div className="auth-sub-title">
            Log in to your account
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-body">
            <div className="auth-body_Google_auth">
              <GoogleButton text='Sign in with Google'/>
            </div>
            <LineThrew/>
            <div className="auth-body_Mail_auth">
              <InputField
                name='email'
                label='Email Address'
                isDisabled={isEmailVerified}
                rules={getEmailValidation()}
                errors={errors.email}
                register={register}
              />
            </div>
            { isEmailVerified &&
              <div className="auth-body_Mail_auth">
                <InputField
                  name='password'
                  label='Password'
                  type='password'
                  rules={getPasswordValidation(8, 30)}
                  errors={errors.password}
                  register={register}
                />
              </div>
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
              <span onClick={registrationHandler}>Sign Up</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};