import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthenticationApi } from '../../../../../../core/api/apis/authentication.api';
import { UserApi } from '../../../../../../core/api/apis/user.api';
import { InputField } from '../../../../../../core/components/form-fields/input-form-field/input';
import { PhoneField } from '../../../../../../core/components/form-fields/input-phone-field/input.phone';
import { Links } from '../../../../../../core/enums';
import { getCountries } from '../../../../../../core/redux/countries/selectors';
import { getIsLogIn, getUser } from '../../../../../../core/redux/user/selectors';
import './update.form.css'
import {
  getEmailValidation,
  getPasswordValidation,
  getPhoneValidation,
  getRequiredValidation,
} from '../../../../../../core/utils/form-validation.utils';
import { validateFormData } from '../../../../../../core/utils/form.utils';

export const UpdateUserFrom = () => {

  const isLogIn = useSelector(getIsLogIn);
  const countries = useSelector(getCountries);
  const user = useSelector(getUser)

  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const [isEmailExist, setIsEmailExist] = useState<boolean>(false);
  const [isNeedToRedirect, setIsNeedToRedirect] = useState<boolean>(false);
  const [isPhoneExist, setIsPhoneExist] = useState<boolean>(false);
  const [phonePrefix, setPhonePrefix] = useState<string>('')

  const f = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

  const comparePassword = useMemo(() => {
    if (!isPasswordChanged) {
      return false;
    }
    return !f.errors.password_again &&
      !f.errors.password &&
      f.watch('password') &&
      f.watch('password').length &&
      f.watch('password_again') &&
      f.watch('password_again').length &&
      (f.watch('password') === f.watch('password_again'));
  }, [f, isPasswordChanged]);

  const changedPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const setData = e.target.value !== '';
    setIsPasswordChanged(setData);
  };

  const validateEmailByKye = async (e: ChangeEvent<HTMLInputElement>) => {
    const setData = e.target.value;
    const validatedEmailResponse = (setData && !f.errors.email) && await AuthenticationApi.verifyMail(setData);
    setIsEmailExist(!!validatedEmailResponse);
  };

  const onSubmit = useCallback(async (data: any) => {
    const updateData = {
      ...data,
      telephone: {
        phoneNumber: data.telephone,
        code: phonePrefix
      }
    }
    const validateData = validateFormData(updateData)
    const response = isLogIn && await UserApi.updateUser(validateData);
    setIsNeedToRedirect(!!response);
  }, [phonePrefix, isLogIn]);

  useEffect(() => {
    const isChanged =
      f.watch('name') !== user.userName ||
      f.watch('email') !== user.email ||
      f.watch('telephone') !== user.phone?.phoneNumber ||
      phonePrefix !== user.phone?.code ||
      comparePassword
     setIsDataChanged(!!isChanged);
  }, [comparePassword, f, f.watch, isEmailExist, isPasswordChanged, phonePrefix, user]);

  useEffect(() => {
    user.phone && setPhonePrefix(user.phone?.code)
  }, [])

  const subComponentStyles = useMemo(() => {
    if (isPasswordChanged && comparePassword) {
      return 'custom_form_field_success'
    } else if (isPasswordChanged && !comparePassword) {
      return 'custom_form_field_error'
    }
  }, [comparePassword, isPasswordChanged])

  const dealCountriesSelectCodes = useMemo(() => {
    return countries.map(item => ({value: item?.dial_code || '', label: item?.dial_code || ''}))
  }, [countries])

  const changeSelectHandler = useCallback(({value}) => {
    setPhonePrefix(value)
  }, [setPhonePrefix])

  const changeInputHandler = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const setData = event.target.value;
    const validatedEmailResponse =
      phonePrefix &&
      setData &&
      !f.errors.telephone &&
      await AuthenticationApi.verifyPhone({
        code: phonePrefix,
        number: setData,
      });
    setIsPhoneExist(!!validatedEmailResponse);
  }, [ phonePrefix, f.errors.telephone, setIsPhoneExist ]);

  return (
    <form onSubmit={ f.handleSubmit(onSubmit) }>
      <div className="update_form">
        <div className="update_user_form_fields">
          <InputField
            label='Your name'
            name='name'
            defaultValue={user.userName ? user.userName : '' }
            rules={getRequiredValidation()}
            register={f.register}
            errors={f.errors.name}
          />

          <InputField
            name='email'
            label='Email Address'
            defaultValue={user.email ? user.email : '' }
            rules={getEmailValidation()}
            errors={f.errors.email}
            subExistErrors={isEmailExist}
            currentValue={f.watch('email')}
            register={f.register}
            onChange={(e) => validateEmailByKye(e)}
          />

          <InputField
            name='password'
            label='Password'
            type='password'
            rules={f.watch('password') &&  getPasswordValidation(8, 30)}
            errors={f.errors.password}
            subComponentStyles={subComponentStyles}
            register={f.register}
            onChange={(e) => changedPassword(e)}
          />

          <InputField
            name='password_again'
            label='Password again'
            type='password'
            rules={f.watch('password') && getPasswordValidation(8, 30)}
            errors={f.errors.password}
            subComponentStyles={subComponentStyles}
            register={f.register}
            onChange={(e) => changedPassword(e)}
          />

          <PhoneField
            name='telephone'
            selectName='telephone'
            selectPlaceHolder='+ ...'
            label='Telephone number'
            register={f.register}
            errors={f.errors.telephone}
            options={dealCountriesSelectCodes}
            rules={getPhoneValidation(7, 11)}
            currentValue={f.watch('telephone')}
            currentSelectValue={phonePrefix ? { value: phonePrefix, label: phonePrefix } : null}
            isPhoneExist={isPhoneExist}
            changeSelectHandler={(e) => changeSelectHandler(e)}
            changeInputHandler={(e) => changeInputHandler(e)}
            defaultInputValue={user.phone ? user.phone.phoneNumber : ''}
          />

        </div>
        <div className="update_user_form_controllers">
          { isNeedToRedirect && <Redirect to={ Links.USER }/> }
          <button
            disabled={
              !isDataChanged ||
              !!Object.keys(f.errors).length ||
              (isEmailExist && user.email!==f.watch('email')) ||
              (isPhoneExist && (user.phone?.phoneNumber!==f.watch('telephone') && phonePrefix !== user.phone?.code))
            }
            type="submit"
            className="btn btn-outline-warning update_user_form_controller">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};