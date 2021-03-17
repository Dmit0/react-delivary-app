import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InputField } from '../../../../../../core/components/form-fields/input-form-field/input';
import { PhoneField } from '../../../../../../core/components/form-fields/input-phone-field/input.phone';
import { Links } from '../../../../../../core/enums';
import { getSelectCountries } from '../../../../../../core/redux/countries/selectors';
import { RootState } from '../../../../../../core/redux/rootReducer';
import { getIsNeedToRedirect } from '../../../../../../core/redux/user-page/page-module/selectors';
import { updateUser } from '../../../../../../core/redux/user/actions';
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

  const dispatch = useDispatch()
  const isLogIn = useSelector(getIsLogIn);
  const user = useSelector(getUser);
  const isNeedToRedirect = useSelector(getIsNeedToRedirect);
  const dealCountriesSelectCodes = useSelector((state: RootState) => getSelectCountries(state, true));

  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
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

  const onSubmit = useCallback((data: any) => {
    const updateData = {
      ...data,
      telephone: {
        phoneNumber: data.telephone,
        code: phonePrefix
      }
    }
    const validateData = validateFormData(updateData)
    isLogIn && dispatch(updateUser(validateData))
  }, [phonePrefix, isLogIn, dispatch]);

  useEffect(() => {
    const isChanged =
      f.watch('name') !== user.userName ||
      f.watch('email') !== user.email ||
      f.watch('telephone') !== user.phone?.phoneNumber ||
      phonePrefix !== user.phone?.code ||
      comparePassword
     setIsDataChanged(!!isChanged);
  }, [comparePassword, f, f.watch, isPasswordChanged, phonePrefix, user]);

  useEffect(() => {
    user.phone && setPhonePrefix(user.phone?.code)
  }, [user.phone])

  const subComponentStyles = useMemo(() => {
    if (isPasswordChanged && comparePassword) {
      return 'custom_form_field_success'
    } else if (isPasswordChanged && !comparePassword) {
      return 'custom_form_field_error'
    }
  }, [comparePassword, isPasswordChanged])

  const changeSelectHandler = useCallback(({value}) => {
    setPhonePrefix(value)
  }, [setPhonePrefix])

  const getPhoneValidationWithDepends = useCallback(() => {
    return getPhoneValidation(7, 11, phonePrefix)
  }, [phonePrefix])

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
            register={f.register}
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
            rules={getPhoneValidationWithDepends()}
            currentSelectValue={phonePrefix ? { value: phonePrefix, label: phonePrefix } : null}
            changeSelectHandler={(e) => changeSelectHandler(e)}
            defaultInputValue={user.phone ? user.phone.phoneNumber : ''}
          />

        </div>
        <div className="update_user_form_controllers">
          { isNeedToRedirect && <Redirect to={ Links.USER }/> }
          <button
            disabled={
              !isDataChanged ||
              !!Object.keys(f.errors).length
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