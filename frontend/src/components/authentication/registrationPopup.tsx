import React from 'react'
import { useForm } from "react-hook-form";
import {userForCreateAccont} from '../../interfaces/authentication'

interface RegistrationProps{
    handleAuthOpen():void
    createAccount(user:userForCreateAccont):void
}
interface formData{
    Email:string,
    Telephone:string,
    Password:string,
    Name:string,
}

export const  RegistrationPopup:React.FC<RegistrationProps>=({handleAuthOpen,createAccount})=>{
    
    const { register, handleSubmit, watch, errors } = useForm<formData>();
    const onSubmit = (data:formData) =>{
        createAccount(data)
    }
    
    
    return(
            <div className='main-auth-popup'>
                <div className="auth-title">
                    <div className="auth-title-header">
                    <img src="http://localhost:3000/assets/leaf.svg" width="30" height="30" alt="" loading="lazy"/>
                        Delivary
                    </div>
                    <div className="reg-sub-title">
                        Create your account
                    </div>
                </div>
                <form className='Authentication_Form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="auth-body">
                        <div className="auth-body_Google_auth">
                        <button type="button" className="google-button">
                            <span className="google-button__icon">
                            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
                            </span>
                            <span className="google-button__text">Sign up with Google</span>
                        </button>
                        </div>
                        <div className='line'>
                        <span>or</span>
                        </div>
                        <div className="auth-body_Mail_auth">
                            
                            
                            <span className='Authentication-Label' >Your name</span>
                            <input  name='Name' ref={register({ required: true })}/>
                            {errors.Name && errors.Name.type==='required' && <span>This field is required</span>}                         
                            <span className='Authentication-Label'>Telephone number</span>{/*Only belarus prefix +375*/}
                            
                            <span>+375</span><input  name='Telephone' ref={register({ required: true,minLength:11,maxLength:13,pattern:/^((8|\+375)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/})}/>
                            {errors.Telephone && errors.Telephone.type==='required' && <span>Telephone is required</span>}
                            {errors.Telephone &&( errors.Telephone.type==='pattern' || errors.Telephone.type==='minLength' || errors.Telephone.type==='maxLength') && <span>it isnt`t telephon number</span>}
                            
                            <span className='Authentication-Label'>Email Adress</span>
                            <input name='Email' ref={register({required:true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}/>
                            {errors.Email && errors.Email.type==='required' && <p>Email is required</p>}
                            {errors.Email && errors.Email.type==='pattern' && <p>it isnt`t email</p>}
                            
                            <span className='Authentication-Label' >Password</span>
                            <input type="password"  name='Password' ref={register({ required: true, minLength: 8,maxLength:30 , pattern:/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/})}/>
                            {errors.Password && errors.Password.type==='required' && <span>This field is required</span>}
                            {errors.Password && errors.Password.type==='minLength' && <span>The minimal length of password should be more than 8</span>}
                            {errors.Password && errors.Password.type==='maxLength' && <span>The minimal length of password should less than 30</span>}
                            {errors.Password && errors.Password.type==='pattern' && <span>The password should contain letters Upper and Lower case</span>}
                        </div>
                    </div>
                    <div className="auth-reg-futer">
                        <div className="auth-next-step">
                        <button onClick={handleAuthOpen} type="button" className="btn btn-outline-primary auth-prev-button ">Return</button>
                        </div>
                        <div className="auth-next-step">
                        <button type="submit" className="btn btn-outline-primary reg-next-step-button ">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
  )}