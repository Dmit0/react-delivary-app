import React, { useCallback, useState } from 'react';
import { CurrentTime } from '../../types/time.types';
import { TimePopup } from './components/timePickerPopup';

interface TimePickerTypes {
  placeHolder: string
  currentTime?: CurrentTime
  onSelectEnd?(time: CurrentTime ): void
  isOpen?: boolean
}

export const TimePicker = ({ placeHolder, currentTime, onSelectEnd, isOpen = false }: TimePickerTypes) => {

  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(isOpen);
  const [selectCurrentTime, setCurrentTime] = useState<CurrentTime | undefined>(currentTime);

  const datePickerClick = () => {
    setIsTimePickerOpen(!isTimePickerOpen)
  }

  const onSelectItem = useCallback((item: { value: any, rowName: string }) => {

  }, [])

  return (
    <>
      <div className='datePicker' onClick={datePickerClick}>{placeHolder}</div>
      {isTimePickerOpen && <TimePopup currentTime={currentTime} onSelectItem={onSelectItem}/>}
    </>
  );
};