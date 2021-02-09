import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UserApi } from '../../../../../../core/api/apis/user.api';
import { Links } from '../../../../../../core/enums';
import { getToken } from '../../../../../../core/redux/user/selectors';
import './update.form.css'
import { validateFormData } from '../../../../../../core/utils/form.utils';

export const UpdateAddressFrom = () => {

  const token = useSelector(getToken);

  const [ isDataChanged, setIsDataChanged ] = useState<boolean>(false);
  const [ isNeedToRedirect, setIsNeedToRedirect ] = useState<boolean>(false);

  const f = useForm({ mode: 'onChange', reValidateMode: 'onChange' });


  const onSubmit = useCallback(async (data: any) => {
    const updateData = validateFormData(data)
    const response = token && await UserApi.updateUser(token, updateData);
    setIsNeedToRedirect(!!response);
  }, [ token ]);

  useEffect(() => {
    const changedData = true;
    setIsDataChanged(changedData);
  }, [f, f.watch]);

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
              { f.errors.email && f.errors.email.type === 'pattern'  &&
              <span className="update_user_form_error">it isnt`t email</span> }
              {/*{ isEmailValidated && f.watch('email') !== '' && !f.errors.email &&*/}
              {/*<span className="update_user_form_error">email exist</span> }*/}
            </div>
            <input
              className="update_user_form_input"
              name='email'
              // onChange={ (e) => {validateEmailByKye(e)}}
              ref={ f.register({ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }) }
            />
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