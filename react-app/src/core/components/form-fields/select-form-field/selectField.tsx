import React from 'react';
import Select from 'react-select';
import '../form.css';
import './selectField.css'
import { CurrentSelectType, SelectType } from '../../../types/select.types';

interface InputFieldProps {
  label: string,
  name: string,
  selectPlaceHolder?: string,
  options: SelectType[],
  placeHolder?: string,
  currentSelectValue?: CurrentSelectType | null,
  defaultValue?: CurrentSelectType,
  isDisabled?: boolean
  changeSelectHandler?(e: any): void,
}

export const SelectField = (
  {
    label,
    name,
    options,
    selectPlaceHolder = 'Select...',
    currentSelectValue,
    changeSelectHandler,
    defaultValue,
    isDisabled=false
  }: InputFieldProps) => {
  return (
    <div className="input_form_field">
      <div className="input__form_labels">
        <span className='input_label'>{ label }</span>
        {/*{ !currentSelectValue && <span className='input_label'>Select value</span> }*/}
      </div>
        <Select
          isDisabled={isDisabled}
          placeholder={selectPlaceHolder}
          name={name}
          options={options}
          value={currentSelectValue && currentSelectValue}
          onChange={changeSelectHandler}
          defaultValue={defaultValue}
        />
    </div>
  );
};