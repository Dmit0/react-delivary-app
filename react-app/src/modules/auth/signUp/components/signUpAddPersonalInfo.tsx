import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleButton } from '../../../../core/components/buttons';
import { LineThrew } from '../../../../core/components/decor/2-line/line';
import { InputField } from '../../../../core/components/form-fields/input-form-field/input';
import { PhoneField } from '../../../../core/components/form-fields/input-phone-field/input.phone';
import { SelectField } from '../../../../core/components/form-fields/select-form-field/selectField';
import { DeliveryIcon } from '../../../../core/components/icons';
import { create_account } from '../../../../core/redux/auth/actions';
import { getIsStepSuccess } from '../../../../core/redux/auth/selectors';
import { set_current_country } from '../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../core/redux/countries/selectors';
import { openPopup } from '../../../../core/redux/popup/actions';
import { userForCreateAccount } from '../../../../core/types';
import {
  getEmailValidation,
  getPasswordValidation,
  getPhoneValidation,
  getRequiredValidation,
} from '../../../../core/utils/form-validation.utils';
import { LogIn } from '../../signIn/signIn';
import { SignUpSelectStep } from './signUpSelectStep';

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

  useEffect(() => {
    isStepSuccess && dispatch(openPopup(<SignUpSelectStep/>));
  }, [ dispatch, isStepSuccess ]);

  const handleAuthOpen = () => {
    dispatch(openPopup(<LogIn/>));
  };

  const handleChange = useCallback(({ value }: any) => {
    const country = countries.find((country) => country.dial_code === value);
    country && dispatch(set_current_country(country));
  }, [countries, dispatch]);

  const createAccount = (user: userForCreateAccount) => {
    dispatch(create_account(user));
  };

  const {errors, register, handleSubmit} = useForm<formData>({ mode: 'onChange', reValidateMode: 'onChange' });

  const changeSelectHandler = useCallback(({value}) => {
    if (country?.dial_code !== value) {
      const newCountry = countries.find(c => c.dial_code === value)
      newCountry && dispatch(set_current_country(newCountry))
    }
  }, [countries, country, dispatch])

  const onSubmit = (data: formData) => {
    if (country && data.name) {
      createAccount({ ...data, country });
    }
  };

  const getPhoneValidationWithDepends = useCallback(() => {
    return getPhoneValidation(7, 11, country?.dial_code)
  }, [country])

  return (
    <div className="registrationPopup">
      <div className='main-auth-popup'>
        <div className="auth-title">
          <div className="auth-title-header">
            <DeliveryIcon height='30' width='30'/>
          </div>
        </div>
        <form className='Authentication_Form' onSubmit={ handleSubmit(onSubmit) }>
          <div>
            <div className="auth-body_Google_auth">
              <GoogleButton text='Sign in with Google'/>
            </div>
            <LineThrew/>
            <div className="auth-body_Mail_auth">
              <div className="auth-body_Mail_auth">

                <InputField
                  label='Your name'
                  name='name'
                  rules={ getRequiredValidation() }
                  register={ register }
                  errors={ errors.name }
                />

                <SelectField
                  name='country'
                  label='Your country'
                  currentSelectValue={ country && { value: country?.code, label: country?.name } }
                  selectPlaceHolder='Select...'
                  options={ selectCountries }
                  changeSelectHandler={ (event: any) => handleChange(event) }
                />

                <PhoneField
                  name='telephone'
                  selectName='code'
                  selectPlaceHolder='+ ...'
                  placeHolder={ !country ? 'Select country' : 'phone' }
                  label='Telephone number'
                  isDisabled={ !country }
                  register={ register }
                  currentSelectValue={ country?.dial_code ? { value: country?.dial_code, label: country?.dial_code } : null }
                  errors={ errors.telephone }
                  options={ selectCountries }
                  changeSelectHandler={ changeSelectHandler }
                  rules={ getPhoneValidationWithDepends() }
                />

                <InputField
                  name='email'
                  label='Email Address'
                  rules={ getEmailValidation() }
                  errors={ errors.email }
                  register={ register }
                />

                <InputField
                  name='password'
                  label='Password'
                  type='password'
                  rules={ getPasswordValidation(8, 30) }
                  errors={ errors.password }
                  register={ register }
                />
              </div>
            </div>
          </div>
          <div className="auth-reg-futer">
            <div className="auth-next-step">
              <button onClick={ handleAuthOpen } type="button" className="btn btn-outline-primary auth-prev-button ">Return</button>
            </div>
            <div className="auth-next-step">
              <button disabled={ !!Object.values(errors).length } type="submit" className="btn btn-outline-primary reg-next-step-button ">Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};