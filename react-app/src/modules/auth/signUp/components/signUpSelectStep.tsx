import React from 'react';
import { useDispatch } from 'react-redux';
import { DeliveryIcon } from '../../../../core/components/icons';
import { authClose, setStepCancel, setStepContinue } from '../../../../core/redux/auth/actions';
import { closePopup, openPopup } from '../../../../core/redux/popup/actions';
import { SignUpAddressStep } from './signUpAddAddress';

export const SignUpSelectStep: React.FC = () => {

  const dispatch = useDispatch();

  const authStepStop = () => { // TODO: `FIX THIS METHOD AND LOGIC`
    dispatch(setStepCancel());
    dispatch(closePopup());
    dispatch(authClose());
  };

  const authStepContinue = () => {
    dispatch(setStepContinue());
    dispatch(openPopup(<SignUpAddressStep/>));
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
          <div className="reg-step-title">
            Want to continue sign up ?
            <br/>
            Need To Add Address of Delivery
          </div>
          <div className="auth-step-futer">
            <div className="auth-continue-step-button">
              <button onClick={ authStepStop } type="button" className="btn btn-outline-primary">No, Return</button>
            </div>
            <div className="auth-continue-step-button">
              <button onClick={ authStepContinue } type="submit" className="btn btn-outline-primary ">Next step</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};