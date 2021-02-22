import React from 'react';
import { CurrentTime } from '../../../types/time.types';
import '../time-picker.css'

interface TimePickerTypes {
  currentTime?: CurrentTime
  onSelectItem(item: { value: any, rowName: string }): void
}

export const TimePopup = ({ currentTime }: TimePickerTypes) => {
  const arr = ['H','M', 'P']

  const renderButtons = (rowName: string): any => {
    let rowElem: any = []
    if (rowName === 'M') {
      for (let i = 1; i <= 60; i++) {
        if (i < 10) {
          rowElem.push(`0${i}`)
        }
        else rowElem.push(i)
      }
    } else if (rowName === 'H') {
      for (let i = 0; i <= 12; i++) {
        if (i < 10) {
          rowElem.push(`0${i}`)
        }
        else rowElem.push(i)
      }
    } else if (rowName === 'P') {
      rowElem = ['AM', 'PM']
    }
    return rowElem.map((i: any) => <span className='colElem'>{i}</span>)
  }

  return (
    <div className='currentTimeList'>
      {((currentTime && Object.keys(currentTime)) || arr).map((t, i, arr) => {
        return <div key={ i }  className={ `TimeColumn ${ arr.length - 1 > i && 'currentTimeColumn' }` }>{renderButtons(t)}</div>;
      })}
    </div>
  );
};
