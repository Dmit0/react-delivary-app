import React from 'react';


interface TimeSwitcherItemProps {
  switchItems: string[]
  onSwitchItem(index: number): void
  currentActiveIndex?: number
}

export const TimeSwitcherItem: React.FC<TimeSwitcherItemProps> = ({switchItems, onSwitchItem, currentActiveIndex}) => {

  return (
    <div className='orderTimePartSwitchers'>
    {switchItems.map((item, index) => (
      <span
        className={`orderTimeSwitcher ${currentActiveIndex === index && 'orderTimeSwitcherActive'}`}
        onClick={() => onSwitchItem(index)}>{item}
      </span>
    ))}
    </div>
  );
};