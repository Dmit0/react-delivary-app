import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '../../../../core/components/time-picker/time-picker';
import { ASAP, setCurrentOrderTime } from '../../../../core/redux/order/actions';
import { getCurrentOrderTime } from '../../../../core/redux/order/selectors';
import { CurrentTime } from '../../../../core/types/time.types';
import './timeSwitcher.css'
import { TimeSwitcherItem } from './components/timeSwitcherItem';

interface TimeSwitcherProps {

}

export const TimeSwitcher: React.FC<TimeSwitcherProps> = () => {
  const dispatch = useDispatch();
  const currentOrderTime = useSelector(getCurrentOrderTime);
  const [currentSwitchItem, setCurrentSwitchItem] = useState<number>();

  const onCurrentTimeSelect = useCallback((selectedTime: CurrentTime) => {
    dispatch(setCurrentOrderTime(selectedTime))
  }, [dispatch])

  const switcherItems = useMemo(() => {
    return [
      ASAP,
      currentOrderTime && Object.values(currentOrderTime).join(':') || ''
    ]
  }, [currentOrderTime])

  const onSwitchItem = useCallback((item: number) => {
    setCurrentSwitchItem(item)
  }, [])

  return (
    <div className='orderTimePart'>
      <TimeSwitcherItem switchItems={switcherItems} currentActiveIndex={currentSwitchItem} onSwitchItem={onSwitchItem}/>
      <div className='orderTimeSchedule'>
        <TimePicker placeHolder='Select Time' onSelectEnd={onCurrentTimeSelect}/>
      </div>
    </div>
  );
};