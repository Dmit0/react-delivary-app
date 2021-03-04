import React from 'react';
import '../form.css';
import { ValidationRules, FieldErrors } from 'react-hook-form';

interface InputFieldProps {
  label: string,
  name: string,
  isDisabled?: boolean,
  rules: ValidationRules,
  errors?: FieldErrors,
  register: any,
  type?: string,
  value?: string,
  defaultValue?: string,
  placeHolder?: string,
  subComponentErrors?: any,
  subComponentStyles?: string
  onChange?(event: any): void
}

export const InputField = (
  {
    label,
    name,
    isDisabled = false,
    rules,
    errors = {},
    register,
    type = 'text',
    value,
    onChange,
    placeHolder,
    defaultValue,
    subComponentErrors,
    subComponentStyles
  }: InputFieldProps) => {
  return (
    <div className={ subComponentStyles ? subComponentStyles : `input_form_field`}>
        <div className="input__form_labels">
          <span className='input_label'>{label}</span>
          {errors?.message && <span className='input_label'>{ errors.message }</span>}
          {subComponentErrors && subComponentErrors}
        </div>
        <input
          type={type}
          className={`input_form_input ${subComponentStyles}`}
          disabled={ isDisabled }
          name={name}
          ref={register(rules)}
          value={value}
          placeholder={placeHolder}
          onChange={onChange && onChange}
          defaultValue={defaultValue}
        />
    </div>
  );
};