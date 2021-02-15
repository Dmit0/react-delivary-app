import React from 'react';
import './input.css';
import { ValidationRules, FieldErrors } from 'react-hook-form';

interface InputFieldProps {
  label: string,
  name: string,
  isDisabled?: boolean,
  rules: ValidationRules,
  errors: FieldErrors | undefined,
  register: any,
  type?: string,
  value?: string,
  currentValue?: string,
  subExistErrors?: boolean,
  placeHolder?: string
  onChange?(event: any): void
}

export const InputField = (
  {
    label,
    name,
    isDisabled = false,
    rules, errors = {},
    register, type = 'text',
    value,
    onChange,
    subExistErrors = false,
    currentValue,
    placeHolder,
  }: InputFieldProps) => {
  return (
    <div className="input_form_field">
        <div className="input__form_labels">
          <span className='input_label'>{label}</span>
          {errors?.message && <span className='input_label'>{ errors.message }</span>}
          {subExistErrors && currentValue !== '' && !errors?.message && <span className="input_label">{name} exist</span>}
        </div>
        <input
          type={type}
          className='input_form_input'
          disabled={ isDisabled }
          name={name}
          ref={register(rules)}
          value={value}
          placeholder={placeHolder}
          onChange={onChange && onChange}
        />
    </div>
  );
};