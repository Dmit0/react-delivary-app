import React from 'react';
import { ValidationRules, FieldErrors } from 'react-hook-form';
import Select from 'react-select';
import '../input-form-field/input.css';
import './input.phone.css'

interface InputFieldProps {
  label: string,
  name: string,
  selectName: string,
  selectPlaceHolder?: string,
  options: {label: string; value: string}[],
  rules: ValidationRules,
  errors: FieldErrors | undefined,
  register: any
  isDisabled?: boolean,
  placeHolder?: string,
  currentSelectValue: string,
  isPhoneExist: boolean,
  currentValue: string,
  changeSelectHandler(e: any): void,
  changeInputHandler(e: any): void,
}

export const PhoneField = (
  {
    label,
    name,
    selectName,
    errors,
    isDisabled = false,
    register,
    rules,
    options,
    placeHolder = '',
    selectPlaceHolder,
    currentSelectValue,
    changeSelectHandler,
    changeInputHandler,
    isPhoneExist,
    currentValue
  }: InputFieldProps) => {
    return (
      <div className="input_form_field">
        <div className="input__form_labels">
          <span className='input_label'>{ label }</span>
          { errors?.message && <span className='input_label'>{ errors.message }</span> }
          { isPhoneExist && currentValue && !errors?.message && <span className='input_label'>Phone exist</span> }
        </div>
        <div className='phoneField'>
          <Select
            placeholder={ selectPlaceHolder }
            className='codeSelect'
            name={ selectName }
            options={ options }
            value={ currentSelectValue && { value: currentSelectValue, label: currentSelectValue } || { label: selectPlaceHolder } }
            onChange={ changeSelectHandler }
          />
          <input
            className='input_form_input'
            disabled={ isDisabled }
            name={ name }
            ref={ register(rules) }
            placeholder={ placeHolder }
            onChange={changeInputHandler}
          />
        </div>
      </div>
    );
  };