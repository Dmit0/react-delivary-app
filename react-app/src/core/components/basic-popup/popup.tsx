import React, { useEffect, useState } from 'react';
import './popup.css'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { closePopup } from '../../redux/popup/actions';
import { Divider } from '../decor';

interface PopupTypes {
  title: string,
  subTitle?: string
  buttons: {
    name: string,
    link: string,
    action?(): void
  }[],
}

export const Popup = ({ title, buttons, subTitle }: PopupTypes) => {
  const dispatch = useDispatch()
  const [currentLink, setCurrentLink] = useState<string>('')

  const onPopupButtonClick = (button: any) => {
    button.action && button.action();
    button.link && setCurrentLink(button.link);
  }

  useEffect(() => {
    currentLink && dispatch(closePopup())
  }, [currentLink, dispatch])

  return (
    <div className='popupLayout'>
      <div className='popupHeader'>
        <span className='popupTitle'>{title}</span>
        <span className='popupSubTitle'>{subTitle}</span>
      </div>
      <Divider/>
      {currentLink && (<Redirect to={currentLink}/>)}
      <div className='popupActionPart'>
        {buttons.map(button => <button className="btn btn-outline-primary popupButton" onClick={() => onPopupButtonClick(button)}>{`${button.name}`}</button>)}
      </div>
    </div>
  );
};