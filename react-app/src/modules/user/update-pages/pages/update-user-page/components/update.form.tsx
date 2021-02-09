import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthenticationApi } from '../../../../../../core/api/apis/authentication.api';
import { UserApi } from '../../../../../../core/api/apis/user.api';
import { CheckIcon, XIcon } from '../../../../../../core/components/icons/check.icon';
import { Links } from '../../../../../../core/enums';
import { getToken } from '../../../../../../core/redux/user/selectors';
import './update.form.css'
import { validateFormData } from '../../../../../../core/utils/form.utils';

export const UpdateUserFrom = () => {

  const token = useSelector(getToken);

  const [ isDataChanged, setIsDataChanged ] = useState<boolean>(false);
  const [ isPasswordChanged, setIsPasswordChanged ] = useState<boolean>(false);
  const [ isEmailValidated, setIsEmailValidated ] = useState<boolean>(false);
  const [ isNeedToRedirect, setIsNeedToRedirect ] = useState<boolean>(false);

  const f = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

  const comparePassword = useMemo(() => {
    if (!isPasswordChanged) {
      return true;
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
    setIsEmailValidated(!!validatedEmailResponse);
  };

  const onSubmit = useCallback(async (data: any) => {
    const updateData = validateFormData(data)
    const response = token && await UserApi.updateUser(token, updateData);
    setIsNeedToRedirect(!!response);
  }, [ token ]);

  useEffect(() => {
    const changedData = ((f.watch('name') !== '' || (f.watch('email') !== '' && !f.errors.email) || f.watch('phone') !== '') ||
      (f.watch('name') === '' && f.watch('email') === '' && f.watch('phone') === '' && isPasswordChanged && comparePassword)) &&
      comparePassword &&
      !isEmailValidated;
    setIsDataChanged(!!changedData);
  }, [comparePassword, f, f.watch, isEmailValidated, isPasswordChanged]);

  return (
    <form onSubmit={ f.handleSubmit(onSubmit) }>
      <div className="update_form">
        <div className="update_user_form_fields">
          <div className="update_user_form_field">
            <span>name</span>
            <input className="update_user_form_input" name='name' ref={ f.register }/>
          </div>
          <div className="update_user_form_field">
            <div className="update_user_form_labels">
              <span>email</span>
              { f.errors.email && f.errors.email.type === 'pattern' && isEmailValidated &&
              <span className="update_user_form_error">it isnt`t email</span> }
              { isEmailValidated && f.watch('email') !== '' && !f.errors.email &&
              <span className="update_user_form_error">email exist</span> }
            </div>
            <input
              className="update_user_form_input"
              name='email'
              onChange={ (e) => {validateEmailByKye(e)}}
              ref={ f.register({ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }) }
            />
          </div>
          <div className="update_user_form_field">
            <div className="update_user_form_labels">
              <span>password</span>
              { f.errors.password && f.errors.password.type === 'minLength' && <span>Required len more then 8</span> }
              { f.errors.password && f.errors.password.type === 'maxLength' && <span>Required len less then 8</span> }
              { f.errors.password && f.errors.password.type === 'pattern' && <span>Req Upper and Lower case</span> }
            </div>
            <div className="update_user_form_password">
              <input
                type="password"
                className="update_user_form_input"
                onChange={ (e) => {
                  changedPassword(e);
                } }
                name='password'
                ref={ f.register({ minLength: 8, maxLength: 30, pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/ }) }
              />
              { (isPasswordChanged && comparePassword) && <span className="update_user_form_password_ok"><CheckIcon/></span> }
              { (isPasswordChanged && !comparePassword) && <span className="update_user_form_cancel"><XIcon/></span> }
            </div>
          </div>
          <div className="update_user_form_field">
            <span>password again</span>
            <div className="update_user_form_password">
              <input
                type="password"
                disabled={ !isPasswordChanged }
                className="update_user_form_input"
                name='password_again'
                ref={ f.register({ minLength: 8, maxLength: 30, pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/ }) }
              />
              { (isPasswordChanged && comparePassword) && <span className="update_user_form_password_ok"><CheckIcon/></span> }
              { (isPasswordChanged && !comparePassword) && <span className="update_user_form_cancel"><XIcon/></span> }
            </div>
          </div>
          <div className="update_user_form_field">
            <span>phone</span>
            <input className="update_user_form_input" name='phone' ref={ f.register }/>
          </div>
        </div>
        <div className="update_user_form_controllers">
          { isNeedToRedirect && <Redirect to={ Links.USER }/> }
          <button
            disabled={ !isDataChanged || !!Object.keys(f.errors).length }
            type="submit"
            className="btn btn-outline-warning update_user_form_controller">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};