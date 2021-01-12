import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../core/css/authenticationStyles.css';
import { closePopup } from '../../core/redux/popup/actions';
import { getIsPopupOpen, getPopup } from '../../core/redux/popup/selectors';

export const PopupContainer: React.FC = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(getIsPopupOpen);
  const popup = useSelector(getPopup);

  const onClose = useCallback(()=> dispatch(closePopup()),[dispatch])

  return (
    <>
      { isOpen
        ? <>
          <div className="popupOutside" onClick={ onClose }/>
            {popup}
          </>
        : null }
    </>
  );
};