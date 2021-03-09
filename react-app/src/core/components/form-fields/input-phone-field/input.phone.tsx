import React from 'react';
import { ValidationRules, FieldErrors } from 'react-hook-form';
import Select from 'react-select';
import '../form.css';
import './input.phone.css'
import { CurrentSelectType, SelectType } from '../../../types/select.types';

interface InputFieldProps {
  label: string,
  name: string,
  selectName: string,
  selectPlaceHolder?: string,
  options: SelectType[],
  rules: ValidationRules,
  errors: FieldErrors | undefined,
  register: any
  isDisabled?: boolean,
  placeHolder?: string,
  currentSelectValue: CurrentSelectType | null,
  defaultInputValue?: string
  changeSelectHandler?(e: any): void,
  changeInputHandler?(e: any): void,
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
    defaultInputValue,
  }: InputFieldProps) => {
    return (
      <div className="input_form_field">
        <div className="input__form_labels">
          <span className='input_label'>{ label }</span>
          { errors?.message && <span className='input_label'>{ errors.message }</span> }
        </div>
        <div className='phoneField'>
          <Select
            placeholder={ selectPlaceHolder }
            className='codeSelect'
            name={ selectName }
            options={ options }
            value={currentSelectValue && currentSelectValue}
            onChange={ changeSelectHandler }
          />
          <input
            className='input_form_phone_input'
            disabled={ isDisabled }
            name={ name }
            ref={ register(rules) }
            placeholder={ placeHolder }
            onChange={changeInputHandler}
            defaultValue={defaultInputValue}
          />
        </div>
      </div>
    );
  };