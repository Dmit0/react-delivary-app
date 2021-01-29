import React from 'react';
import '../../../../core/css/styles.css';
import '../../../../core/css/content.css';
import './update-user-page.css'
import { useForm } from 'react-hook-form';
import { ToolIcon } from '../../../../core/components/icons';

interface formData {
  country: string,
  street: string,
  streetNumber: string
}

const UpdateUserPage: React.FC = () => {

  const { register, handleSubmit } = useForm<formData>();

  const onSubmit = () => {

  }

  return (
    <div className="app">
      <div className="container">
        <div className ="row">
          <div className="col-4 update_page_background"/>
          <div className="col update_page_content">
            <div className="update_page_form">
              <div className="update_page_form_title">
                <span className="update_title_text">Update User</span>
                <ToolIcon/>
              </div>
              <div className="update_title_body">
                <form onSubmit={ handleSubmit(onSubmit) }>
                  <div className="update_form">
                    <div className="update_user_from_fields">
                      {/*<span className='Authentication-Label'>street</span>/!*Only belarus prefix +375*/ }
                      <div className="update_user_from_field">
                        <span>name</span>
                        <input className="update_user_from_input" name='name' ref={ register({ required: true }) }/>
                      </div>
                      <div className="update_user_from_field">
                        <span>email</span>
                        <input className="update_user_from_input" name='email' ref={ register({ required: true }) }/>
                      </div>
                      <div className="update_user_from_field">
                        <span>password</span>
                        <input className="update_user_from_input" name='password' ref={ register({ required: true }) }/>
                      </div>
                      <div className="update_user_from_field">
                        <span>password again</span>
                        <input className="update_user_from_input" name='password_again' ref={ register({ required: true }) }/>
                      </div>
                      <div className="update_user_from_field">
                        <span>phone</span>
                        <input className="update_user_from_input" name='phone' ref={ register({ required: true }) }/>
                      </div>
                      {/*{ errors.name && errors.name.type === 'required' && <span>This field is required</span> }*/ }
                    </div>
                   <div className="update_user_form_controllers">
                     <button
                       type="submit"
                       className="btn btn-outline-warning update_user_form_controller">
                       Update
                     </button>
                     {/*<button type="submit" className="btn btn-outline-primary reg-next-step-button ">Update</button>*/}
                   </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpdateUserPage