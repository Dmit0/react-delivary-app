import React from 'react';
import '../time-picker.css'
import { TimePickerValues } from '../../../enums/time.enum';
import { createArrayFromNumbers } from '../../../utils/array.utils';

interface TimePickerTypes {
  currentTime: any
  onSelectItem(item: { value: any, rowName: string }): void
  onSubmit(): void
}

export const TimePicker = {
  M: 60,
  H: 13,
  P: ['AM', 'PM']
}

export const TimePopup = ({ currentTime, onSelectItem, onSubmit }: TimePickerTypes) => {
  const arr = ['H', 'M', 'P']

  const getArrayButtons = (rowName: TimePickerValues) => {
    return rowName === 'P'
      ?  TimePicker[rowName]
      :  createArrayFromNumbers(TimePicker[rowName], 0, true, true)
  }

  const renderButtons = (rowName: TimePickerValues): any => {
    return getArrayButtons(rowName).map((i: string) =>
       <span
        key={ i + rowName }
        onClick={ () => onSelectItem({ value: i, rowName }) }
        className={ `colElem ${ currentTime[rowName] === i && 'colActiveElem' }` }
      >{i}</span>
    )
  }

  return (
    <div className='currentTimeList'>
      <div className='currentTimeTitle'>Time: {currentTime && Object.values(currentTime).join(':')}</div>
      <div className='timePickerBody'>
      {arr.map((t: any, i, arr) => {
        return <div key={i} className={ `TimeColumn ${ arr.length - 1 > i && 'currentTimeColumn' }` }>{renderButtons(t)}</div>;
      })}
      </div>
      <div className='currentTimeFooter'>
        <button className="btn btn-outline-warning timePickerButton" onClick={onSubmit}>Apply</button>
      </div>
    </div>
  );
};
