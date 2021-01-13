import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleButton } from '../../../../core/components/buttons';
import { DeliveryIcon } from '../../../../core/components/icons';
import { create_account } from '../../../../core/redux/auth/actions';
import { getIsStepSuccess } from '../../../../core/redux/auth/selectors';
import { set_current_country } from '../../../../core/redux/countries/actions';
import { getCountries, getCountry, getSelectCountries } from '../../../../core/redux/countries/selectors';
import { openPopup } from '../../../../core/redux/popup/actions';
import { userForCreateAccount } from '../../../../core/types';
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

  const [ phone, setPhone ] = useState<any>();
  const [ currentChangeCountry, setCurrentChangeCountry ] = useState<any>(false);

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

  const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(
      country?.dial_code
        ? country.dial_code + event.target.value.slice(country.dial_code.length)
        : '' + event.target.value,
    );
    setCurrentChangeCountry(false);
  }, [ country ]);

  const { register, handleSubmit, errors } = useForm<formData>();

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
              <div className='line'>
                <span>or</span>
              </div>
              <div className="auth-body_Mail_auth">
                <span className='Authentication-Label'>Your name</span>
                <input name='name' ref={ register({ required: true }) }/>
                { errors.name && errors.name.type === 'required' && <span>This field is required</span> }

                <span className='Authentication-Label'>Your country</span>
                <Select name='country' options={ selectCountries } onChange={ (event: any) => handleChange(event) }/>

                <span className='Authentication-Label'>Telephone number</span>
                <Item register={ register } current_country_code={ phone } changeHandler={ changeHandler }/>
                { errors.telephone && errors.telephone.type === 'required' && <span>Telephone is required</span> }
                { errors.telephone && (errors.telephone.type === 'pattern' || errors.telephone.type === 'minLength' || errors.telephone.type === 'maxLength') &&
                <span>it isnt`t telephon number</span> }

                <span className='Authentication-Label'>Email Adress</span>
                <input name='email'
                       ref={ register({ required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }) }/>
                { errors.email && errors.email.type === 'required' && <p>Email is required</p> }
                { errors.email && errors.email.type === 'pattern' && <p>it isnt`t email</p> }

                <span className='Authentication-Label'>Password</span>
                <input type="password" name='password'
                       ref={ register({ required: true, minLength: 8, maxLength: 30, pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/ }) }/>
                { errors.password && errors.password.type === 'required' && <span>This field is required</span> }
                { errors.password && errors.password.type === 'minLength' && <span>The minimal length of password should be more than 8</span> }
                { errors.password && errors.password.type === 'maxLength' && <span>The minimal length of password should less than 30</span> }
                { errors.password && errors.password.type === 'pattern' && <span>The password should contain letters Upper and Lower case</span> }
              </div>
            </div>
            <div className="auth-reg-futer">
              <div className="auth-next-step">
                <button onClick={ handleAuthOpen } type="button" className="btn btn-outline-primary auth-prev-button ">Return</button>
              </div>
              <div className="auth-next-step">
                <button type="submit" className="btn btn-outline-primary reg-next-step-button ">Next</button>
              </div>
            </div>
          </form>
          )
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