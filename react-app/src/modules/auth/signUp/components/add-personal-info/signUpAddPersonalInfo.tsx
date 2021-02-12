import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationApi } from '../../../../../core/api/apis/authentication.api';
import { GoogleButton } from '../../../../../core/components/buttons';
import { LineThrew } from '../../../../../core/components/decor/2-line/line';
import { DeliveryIcon } from '../../../../../core/components/icons';
import { create_account } from '../../../../../core/redux/auth/actions';
import { getIsStepSuccess } from '../../../../../core/redux/auth/selectors';
import { set_current_country } from '../../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../../core/redux/countries/selectors';
import { openPopup } from '../../../../../core/redux/popup/actions';
import { userForCreateAccount } from '../../../../../core/types';
import { Patterns } from '../../../../../core/utils/patterns';
import { LogIn } from '../../../signIn/signIn';
import { SignUpSelectStep } from '../signUpSelectStep';
import './addPersonalInfo.css'

interface formData {
  email: string,
  telephone: string,
  password: string,
  name: string,
  country: string,
}

export const SignUpPersonalForm: React.FC = () => {

  const dispatch = useDispatch();
  const selectCountries = useSelector(getSelectCountries);
  const countries = useSelector(getCountries);
  const country = useSelector(getCountry);
  const isStepSuccess = useSelector(getIsStepSuccess);

  const [ phone, setPhone ] = useState<any>();
  const [ currentChangeCountry, setCurrentChangeCountry ] = useState<any>(false);
  const [ isEmailExist, setIsEmailExist ] = useState<boolean>(false);
  const [ isPhoneExist, setIsPhoneExist ] = useState<boolean>(false);

  useEffect(() => {
    if (currentChangeCountry) {
      setPhone(country?.dial_code);
      setCurrentChangeCountry(false);
    }
  }, [ currentChangeCountry, country ]);

  useEffect(() => {
    isStepSuccess && dispatch(openPopup(<SignUpSelectStep/>));
  }, [ dispatch, isStepSuccess ]);

  const handleAuthOpen = () => {
    dispatch(openPopup(<LogIn/>));
  };

  const handleChange = ({ value }: any) => {
    const country = countries.find((country) => country.name === value);
    country && dispatch(set_current_country(country));
    setCurrentChangeCountry(true);
  };

  const createAccount = (user: userForCreateAccount) => {
    dispatch(create_account(user));
  };

  const {errors, watch, register, handleSubmit} = useForm<formData>({ mode: 'onChange', reValidateMode: 'onChange' });

  const changeHandler = useCallback(async(event: React.ChangeEvent<HTMLInputElement>) => {
    const setData = event.target.value;
    setPhone(country?.dial_code
      ? country.dial_code + setData.slice(country.dial_code.length)
      : '' + setData);
    setCurrentChangeCountry(false);

    const validatedEmailResponse =
      country?.dial_code &&
      setData &&
      !errors.telephone &&
      await AuthenticationApi.verifyPhone({
        code: country.dial_code ,
        number: setData.slice(country.dial_code.length)
      });

    setIsPhoneExist(!!validatedEmailResponse)
  }, [ country ]);

  const verifyEmail = async(e: any, errors: any) => {
    const setData = e.target.value;
    const validatedEmailResponse = (setData && !errors.email) && await AuthenticationApi.verifyMail(setData);
    setIsEmailExist(validatedEmailResponse);
  }

  const onSubmit = (data: formData) => {
    if (country && data.name) {
      createAccount({ ...data, country });
    }
  };
  return (
    <>
      <div className="registrationPopup">
        <div className='main-auth-popup'>
          <div className="auth-title">
            <div className="auth-title-header">
              <DeliveryIcon height={ '30' } width={ '30' }/>
            </div>
          </div>
          <form className='Authentication_Form' onSubmit={ handleSubmit(onSubmit) }>
            <div>
              <div className="auth-body_Google_auth">
                <GoogleButton text='Sign in with Google'/>
              </div>
              <LineThrew/>
              <div className="auth-body_Mail_auth">
                <div className="auth_user_form_field">
                  <div className="auth_user_form_labels">
                    <span className='Authentication-Label'>Your name</span>
                    { errors.name && errors.name.type === 'required' && <span className='Authentication-Label'>Required field</span> }
                  </div>
                  <input className='create_user_form_input' name='name' ref={ register({ required: true }) }/>
                </div>

                <div className="auth_user_form_field">
                <span className='Authentication-Label'>Your country</span>
                <Select menuColor={'red'} name='country' options={ selectCountries } onChange={ (event: any) => handleChange(event) }/>
                </div>

                <div className="auth_user_form_field">
                  <div className="auth_user_form_labels">
                    <span className='Authentication-Label'>Telephone number</span>
                    { errors.telephone && errors.telephone.type === 'required' && <span className='Authentication-Label'>Telephone is required</span> }
                    { errors.telephone && (errors.telephone.type === 'pattern' || errors.telephone.type === 'minLength' || errors.telephone.type === 'maxLength') && <span className='Authentication-Label'>it isnt`t telephon number</span> }
                    { isPhoneExist && watch('telephone') !== '' && !errors.email && <span className="update_user_form_error">phone exist</span> }
                  </div>
                  <Item register={ register } current_country_code={ phone } changeHandler={ changeHandler }/>
                </div>

                <div className="auth_user_form_field">
                  <div className="auth_user_form_labels">
                    <span className='Authentication-Label'>Email Address</span>
                    { errors.email && errors.email.type === 'required' && <span className='Authentication-Label'>Email is required</span> }
                    { errors.email && errors.email.type === 'pattern' && <span className='Authentication-Label'>it isnt`t email</span> }
                    { isEmailExist && watch('email') !== '' && !errors.email && <span className="update_user_form_error">email exist</span> }
                  </div>
                  <input
                    name='email'
                    onChange={(e) => verifyEmail(e, errors)}
                    ref={ register({ required: true, pattern: Patterns.mail }) }
                  />
                </div>

                <div className="auth_user_form_field">
                  <div className="auth_user_form_labels">
                    <span className='Authentication-Label'>Password</span>
                    { errors.password && errors.password.type === 'required' && <span className='Authentication-Label'>This field is required</span> }
                    { errors.password && errors.password.type === 'minLength' && <span className='Authentication-Label'>Required len more then 8</span> }
                    { errors.password && errors.password.type === 'maxLength' && <span className='Authentication-Label'>Required len less then 8</span> }
                    { errors.password && errors.password.type === 'pattern' && <span className='Authentication-Label'>Req Upper and Lower case</span> }
                  </div>
                  <input
                    type="password"
                    name='password'
                    ref={ register({ required: true, minLength: 8, maxLength: 30, pattern: Patterns.password }) }
                  />
                </div>
              </div>

            </div>
            <div className="auth-reg-futer">
              <div className="auth-next-step">
                <button onClick={ handleAuthOpen } type="button" className="btn btn-outline-primary auth-prev-button ">Return</button>
              </div>
              <div className="auth-next-step">
                <button disabled={isPhoneExist || isEmailExist} type="submit" className="btn btn-outline-primary reg-next-step-button ">Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Item = ({ register, current_country_code, changeHandler }: any) => {
  return (
    <>
      <input
        name='telephone'
        disabled={ !current_country_code }
        value={ current_country_code ? current_country_code : ' select country ' }
        onChange={ changeHandler }
        ref={ register({
          required: true,
          minLength: 11,
          maxLength: 15,
        }) }/>
    </>
  );
};