import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment'
import { CurrentTime } from '../../types/time.types';
import { TimePopup } from './components/timePickerPopup';

interface TimePickerTypes {
  placeHolder: string
  currentTime?: CurrentTime
  onSelectEnd(time: CurrentTime ): void
}

const getCurrentTime = (): CurrentTime => {
  const date = new Date()
  const arr = moment(date).add(moment.duration(1, 'hours')).format("hh:mm:A").split(':');
  return {
    H: arr[0],
    M: arr[1],
    P: arr[2]
  }
}

export const TimePicker = ({ placeHolder, currentTime = getCurrentTime(), onSelectEnd}: TimePickerTypes) => {

  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [selectCurrentTime, setCurrentTime] = useState<any>(currentTime);

  const datePickerClick = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  const onSelectItem = useCallback((item: { value: any, rowName: string }) => {
    setCurrentTime({ ...selectCurrentTime, [item.rowName]: item.value });
  }, [selectCurrentTime]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
  });

  const onSubmit = useCallback(() => {
    if(parseInt(selectCurrentTime.H) - parseInt(moment(new Date()).format("0h")) >= 1) {
      onSelectEnd(selectCurrentTime);
      setIsTimePickerOpen(false);
    }
  }, [onSelectEnd, selectCurrentTime]);

  const handleClick = useCallback((e) => {
    if (!['btn btn-outline-primary timePickerButton', 'datePicker', 'currentTimeList', 'currentTimeTitle', 'timePickerBody', 'currentTimeFooter', 'TimeColumn currentTimeColumn', 'colElem', 'timePickerButton', 'colElem colActiveElem']
        .includes(e.target.classList.value) &&
      e.target.classList.length > 0) {
      isTimePickerOpen && setIsTimePickerOpen(false);
      isTimePickerOpen && onSubmit();
    }
  }, [ isTimePickerOpen, onSubmit ]);

  return (
    <>
      <div className='datePicker' onClick={datePickerClick}>{placeHolder}</div>
      {isTimePickerOpen && <TimePopup currentTime={selectCurrentTime} onSelectItem={onSelectItem} onSubmit={onSubmit}/>}
    </>
  );
};